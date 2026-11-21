#!/usr/bin/env python3
"""Browse a local immutable Lean declaration graph over a loopback connection."""
import argparse
from contextlib import closing
from html import escape
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import sqlite3
from urllib.parse import parse_qs, urlencode, urlparse

PAGE_SIZE = 60
KIND_LABELS = {
    "axiom": "公理", "theorem": "定理或引理", "definition": "定义", "opaque": "不透明定义",
    "quotient": "商类型内核原语", "inductive": "归纳类型", "constructor": "构造子", "recursor": "递归子",
}
EDGE_LABELS = {
    "type": "声明类型", "value": "证明体或定义体", "constructor": "归纳类型的构造子",
    "inductive-owner": "所属归纳类型", "mutual": "同组声明", "recursor-constructor": "递归规则的构造子",
}

STYLE = """
body{max-width:1160px;margin:28px auto;padding:0 18px;color:#1d3248;background:#f3f6f9;font:15px/1.55 system-ui,sans-serif}
a{color:#175c81;text-underline-offset:3px}
h1{font-size:28px}h2{font-size:19px}h3{font-size:15px}
code{overflow-wrap:anywhere}
p{margin:6px 0 12px}.muted{color:#526775;font-size:13px}.notice{color:#81501b}
input{font:inherit;max-width:75vw;width:36rem;padding:6px 9px;border:1px solid #bdcdda;border-radius:5px}
button{font:inherit;padding:6px 12px;border:1px solid #bdcdda;border-radius:5px;background:white;cursor:pointer}
.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:12px}
section{margin-top:12px;padding:12px 17px;border:1px solid #d7e2e8;border-radius:8px;background:#fff;overflow-wrap:anywhere}
ul{margin:8px 0;padding-left:20px}li{margin:7px 0}.unknown{color:#8e520d}
.neighborhood{overflow:auto;margin-top:12px;padding:10px 12px;background:#fafcfe;border:1px solid #d7e2e8;border-radius:8px}
.neighborhood svg{width:100%;min-width:690px;display:block}
.neighborhood rect{fill:#eff7fb;stroke:#a9bfd0;rx:6}
.neighborhood a:hover rect,.neighborhood a:focus-visible rect{stroke:#175c81;stroke-width:2}
.neighborhood text{fill:#1d3248;font:14px system-ui,sans-serif;pointer-events:none}
.neighborhood path{fill:none;stroke:#748d9e;stroke-width:1.2}
.neighborhood path.type{stroke-dasharray:4 4}
@media(max-width:700px){.grid{grid-template-columns:1fr}h1{font-size:23px}}
"""


def link(label, href):
    return f'<a href="{escape(href, quote=True)}">{escape(label)}</a>'


def local_link(label, **query):
    return link(label, "/?" + urlencode(query))


def source_link(base, first, last=None):
    if base is None:
        return ""
    url = base
    if first:
        url += f"#L{first}"
        if last and last > first:
            url += f"-L{last}"
    return link("Lean 源码", url)


def edge_kind(kind):
    if kind.startswith("recursor-rule:"):
        return "递归规则的值 · " + kind.split(":", 1)[1]
    return EDGE_LABELS[kind]


def rows(conn, name, outgoing, offset):
    current, adjacent = ("consumer", "dependency") if outgoing else ("dependency", "consumer")
    return conn.execute(
        f"SELECT d.name,l.name,e.line,d.kind,m.source,c.first_line,c.last_line "
        f"FROM edge_ids AS e JOIN node_ids AS d ON d.id=e.{adjacent} "
        "JOIN labels AS l ON l.id=e.kind JOIN node_ids AS c ON c.id=e.consumer "
        "JOIN module_ids AS m ON m.id=c.module_id "
        f"WHERE e.{current}=(SELECT id FROM node_ids WHERE name=?) "
        f"ORDER BY e.{adjacent},e.kind LIMIT ? OFFSET ?",
        (name, PAGE_SIZE + 1, offset),
    ).fetchall()


def neighborhood(conn, name, out_offset, in_offset):
    limit = 7
    outbound = rows(conn, name, True, out_offset)[:limit]
    inbound = rows(conn, name, False, in_offset)[:limit]
    height = max(len(outbound), len(inbound), 1) * 46 + 55
    center_y = height / 2
    result = [
        f'<section class="neighborhood"><h3>当前声明的直接依赖图</h3><svg viewBox="0 0 900 {height}" '
        'xmlns="http://www.w3.org/2000/svg" aria-label="左侧为依赖项，右侧为使用者">'
        '<defs><marker id="end" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" '
        'markerHeight="7" orient="auto"><polygon points="0,0 8,4 0,8" fill="#748d9e"/></marker></defs>'
    ]
    def box(label, x, y, clickable):
        short = label.rsplit(".",1)[-1]
        short = short if len(short) <= 23 else short[:21] + "…"
        node = f'<g><title>{escape(label)}</title><rect x="{x}" y="{y - 16}" width="206" height="32"/>'
        node += f'<text x="{x+103}" y="{y+5}" text-anchor="middle">{escape(short)}</text></g>'
        if clickable:
            node = f'<a href="/?{escape(urlencode({"name":label}),quote=True)}">{node}</a>'
        return node
    boxes = [box(name,347,center_y,False)]
    for is_dependency, items in ((True,outbound),(False,inbound)):
        x = 25 if is_dependency else 669
        for index, (other, role, _, kind, src, first, last) in enumerate(items):
            y = 34 + index * 46
            boxes.append(box(other,x,y,bool(kind)))
            x1,y1,x2,y2 = (x+206,y,347,center_y) if is_dependency else (553,center_y,x,y)
            mid=(x1+x2)/2
            diagram_edge = (
                f'<path class="{escape(role,quote=True)}" marker-end="url(#end)" d="M{x1} {y1} C{mid} {y1},'
                f'{mid} {y2},{x2} {y2}"><title>{escape(edge_kind(role))}</title></path>'
            )
            if src is not None:
                fragment = f"#L{first}-L{last}" if first and last and first != last else f"#L{first}" if first else ""
                diagram_edge = f'<a href="{escape(src + fragment, quote=True)}">{diagram_edge}</a>'
            result.append(diagram_edge)
    result.extend(boxes)
    result.append('</svg><p class="muted">每侧显示当前页最前面的 7 条边。下方可以继续翻页查看其他引用。</p></section>')
    return "".join(result)


def group(conn, name, outgoing, offset, field):
    title = "它使用的声明" if outgoing else "使用它的声明"
    adjacent = rows(conn, name, outgoing, offset)
    items = []
    for other, role, line, kind, src, first, last in adjacent[:PAGE_SIZE]:
        declaration = local_link(other, name=other) if kind else f'<span class="unknown">{escape(other)}［尚无节点证据］</span>'
        items.append(f"<li><code>{declaration}</code><br>"
                     f'<span class="muted">{escape(edge_kind(role))} · {source_link(src, first, last)}{f" · 同名源码引用第 {line} 行" if line else ""}</span></li>')
    paging = []
    if offset:
        paging.append(local_link("上一页", name=name, **{field: max(0, offset - PAGE_SIZE)}))
    if len(adjacent) > PAGE_SIZE:
        paging.append(local_link("下一页", name=name, **{field: offset + PAGE_SIZE}))
    content = f"<ul>{''.join(items)}</ul>" if items else '<p class="muted">这里没有可显示的引用。</p>'
    return f"<section><h3>{title}</h3>{content}<p>{' · '.join(paging)}</p></section>"


def page(conn, query):
    summary = json.loads(conn.execute("SELECT data FROM summary").fetchone()[0])
    root = summary["root"]
    name = query.get("name", [root])[0]
    roots = local_link("最终定理", name=root)
    status = "传递依赖已闭合" if summary["complete"] else f'本库为部分提取，尚有 {summary["unresolved"]:,} 个未展开的直接引用目标'
    start = (
        "<!doctype html><html lang='zh-Hans'><meta charset='utf-8'>"
        "<meta name='viewport' content='width=device-width,initial-scale=1'>"
        f"<title>Lean 证明声明浏览器</title><style>{STYLE}</style><body>"
        "<h1>Lean 证明声明浏览器</h1>"
        '<p class="muted">本交互网站发明人：Aaron Wu。© 2026 Aaron Wu，版权所有，不得侵权。'
        '原始 Lean 形式化证明由 Levent Alpöge 发布。</p>'
        f'<p class="notice">{status}。{summary["reachable"]:,} 个可达节点 · {summary["edge_groups"]:,} 条分类型引用。</p>'
        f'<form method="get"><input name="name" aria-label="Lean 声明全名" value="{escape(name, quote=True)}" '
        f'placeholder="Lean 声明全名"><button type="submit">查找</button></form><p>{roots}</p>'
    )
    record = conn.execute(
        "SELECT d.kind,d.module,d.first_line,d.last_line,d.source,d.has_exact_range "
        "FROM declarations AS d JOIN reached AS r USING(name) WHERE d.name=?", (name,)
    ).fetchone()
    if record is None:
        if not name:
            return start + "<section><p>请输入 Lean 声明名称。</p></section>"
        matches = conn.execute(
            "SELECT name FROM reached WHERE name LIKE ? ESCAPE '\\' ORDER BY name LIMIT 20",
            ("%" + name.replace("\\","\\\\").replace("%","\\%").replace("_","\\_") + "%",)
        ).fetchall()
        result = "".join("<li><code>" + local_link(candidate, name=candidate) + "</code></li>" for [candidate] in matches)
        return start + f"<section><p>未找到完全匹配的可达声明。</p><ul>{result}</ul></section>"
    kind, module, first, last, src, exact = record
    artifact = conn.execute("SELECT artifact FROM modules WHERE name=?", (module,)).fetchone()[0]
    body = (
        f"<section><h2><code>{escape(name)}</code></h2><p>{KIND_LABELS[kind]} · <code>{escape(module)}</code></p>"
        f'<p>{source_link(src, first, last)}{"" if exact else " · 仅有上级声明或文件定位"}</p>'
        f'<details><summary>模块证据</summary><code>{escape(artifact)}</code></details></section>'
    )
    left = max(0, int(query.get("deps", ["0"])[0]))
    right = max(0, int(query.get("uses", ["0"])[0]))
    diagram = neighborhood(conn, name, left, right)
    return start + body + diagram + '<div class="grid">' + group(conn,name,True,left,"deps") + group(conn,name,False,right,"uses") + "</div>"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("database", type=Path, nargs="?",
                        default=Path(__file__).resolve().parent.parent / "proof-topology.sqlite")
    parser.add_argument("--port", type=int, default=8769)
    args = parser.parse_args()
    url = args.database.resolve(strict=True).as_uri() + "?mode=ro"
    with closing(sqlite3.connect(url, uri=True)) as conn:
        conn.execute("SELECT data FROM summary").fetchone()
    class Server(BaseHTTPRequestHandler):
        def do_GET(self):
            target = urlparse(self.path)
            if target.path != "/":
                self.send_error(404)
                return
            try:
                with closing(sqlite3.connect(url, uri=True)) as conn:
                    encoded = page(conn, parse_qs(target.query)).encode()
            except ValueError:
                self.send_error(400)
                return
            self.send_response(200)
            self.send_header("Content-Type","text/html; charset=utf-8")
            self.send_header("Content-Length",str(len(encoded)))
            self.end_headers()
            self.wfile.write(encoded)
    with ThreadingHTTPServer(("127.0.0.1",args.port),Server) as server:
        print(f"http://127.0.0.1:{server.server_port}/",flush=True)
        server.serve_forever()


if __name__ == "__main__":
    main()
