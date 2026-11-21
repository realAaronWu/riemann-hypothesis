# 黎曼猜想候选证明：中文导读

**本交互网站发明人：Aaron Wu。© 2026 Aaron Wu，版权所有，不得侵权。** [版权与来源](COPYRIGHT.md)

## 使用交互式依赖图

打开 [线上主线图](https://realaaronwu.github.io/riemann-hypothesis/)。页面从最终定理 `riemannHypothesis` 打开，主线图展示 46 个声明和 53 条直接引用，无需下载数据。

蓝色是 Mathlib 的定义或定理，绿色是 Alpöge 原稿中的声明，灰色是 Lean 核心声明，金色是公理。粗边框标出最终定理。

1. **读一个节点。** 点击「黎曼猜想」，侧栏会说明它的数学内容、在证明中的作用，并链接到对应 Lean 声明。可以从「它使用的声明」沿输入向上追溯，也可以从「使用它的声明」看结论怎样传到下游。
2. **读一条箭头。** 箭头从被引用的声明指向使用它的声明。实线表示定义体或证明体中的引用，虚线表示声明类型中的引用。点击箭头可看到具体的数学关系和使用者的源码。窄屏上，点击后会跳到图下方的说明。
3. **从公理追到结论。** 点击任意公理按钮，查看该公理到最终定理的一条实际引用路径。侧栏的有序列表可以逐步打开路径上的声明。

[主线边表](docs/edges.tsv) · [全量图验证摘要](docs/verification.json)

### 浏览完整依赖图

完整图有 1,478,280 个可达声明和 158,686,420 条分类引用边。以下命令适用于 macOS 和 Linux，需要 Python 3.7 或更新版本、Zstandard 命令行工具和至少 6 GiB 的可用磁盘空间。使用 GitHub 上的 **Download ZIP** 下载并解压本仓库，或克隆仓库。把 [Release 的 10 个数据分卷](https://github.com/realAaronWu/riemann-hypothesis/releases/tag/proof-topology-v1)（文件名从 `proof-topology.sqlite.zst.part-aa` 到 `proof-topology.sqlite.zst.part-aj`）下载到仓库根目录。已安装 GitHub CLI 的读者可以在该目录运行这条命令一次下载全部分卷。

```bash
gh release download proof-topology-v1 --repo realAaronWu/riemann-hypothesis --pattern 'proof-topology.sqlite.zst.part-*'
```

下载完成后，在同一目录运行以下命令。校验时，每个文件都应显示 `OK`。

```bash
cat proof-topology.sqlite.zst.part-?? | zstd -d -o proof-topology.sqlite &&
  shasum -a 256 -c tools/SHA256SUMS &&
  python3 tools/browse.py proof-topology.sqlite
```

打开 [本机依赖浏览器](http://127.0.0.1:8769/)。在搜索框输入 `funext`，可以找到它引用的 `Quot.sound`。点击任意相邻声明继续展开。若默认端口已被占用，运行时添加 `--port 8770`，并打开终端打印的地址。若解压或校验失败，重新下载出错的分卷，移开已有的 `proof-topology.sqlite`，再运行上述命令。

## 阅读中文导读

这份导读面向学过**复分析、抽象代数和基础数论**的数学系研究生。我们从一个问题开始：为什么能用素数和的增长速度排除 $L$ 函数的零点？接着再问，这份候选证明怎样尝试通过格、周期和自守形式得到所需的估计。

材料依据 Levent Alpöge 公布的 Lean 源码。导读解释的是**这份候选论证在做什么**，其中最深的数学环节仍有待重建。阅读源码、理解数学、独立检查完整证明分别需要自己的证据。哪些步骤已经局部重跑，哪些只追到了源码接口，见[版本与证据范围](SOURCES.md)。

**第一次读，按下面这条路线走。** 每章的入口先讲清上一章交来什么、这一章交出什么。

1. 读[全局路线](chapters/00-roadmap.md)和[第 1 章](chapters/01-analytic.md)的 1.1 至[窗口判据](chapters/01-analytic.md#window-criterion)。读到「进阶推导」时，先跳到[指数选择](chapters/01-analytic.md#choose-exponent)，再读[函数方程和结论](chapters/01-analytic.md#reflection)。第 1.5 节是另一条路线，可以略过。
2. 依次读[第 2 章的小群算例](chapters/02-comparison.md)、[第 3 章的误差算例](chapters/03-errors.md)、[第 4 章的面积算例](chapters/04-periods.md)、[第 5 章的两个门槛](chapters/05-families.md)和[第 6 章的两条输入](chapters/06-automorphic.md)。每章读到「进阶」标记就可转到下一章。遇到陌生对象，先看本章链接的背景例子。
3. 用[串讲练习](chapters/07-throughline.md)带着同一个特征走完全程。然后回头选读你想补证的那一段。

| 章节 | 从哪个问题开始 |
|---|---|
| [全局路线](chapters/00-roadmap.md) | 假设发现一个实部为 $0.6$ 的零点，整份论证如何试图排除它？ |
| [1. 素数和怎么排除零点](chapters/01-analytic.md) | 为什么单侧上界就能用，为什么需要整个窗口？ |
| [2. 怎么把算术数据读成素数和](chapters/02-comparison.md) | 几何估计控制的量，和最后需要的素数和有什么关系？ |
| [3. 误差怎么保住平方根指数](chapters/03-errors.md) | 哪些损失进入指数，什么时候能把指数压到 $1/2$ 附近？ |
| [4. 周期怎样进入主项](chapters/04-periods.md) | 同一个算术量里，有限素数处的贡献和复周期怎样对上？ |
| [5. 对象族如何构造](chapters/05-families.md) | 给定特征和参数，源码在哪里保证有满足全部条件的对象？ |
| [6. 自守和伽罗瓦输入](chapters/06-automorphic.md) | 这些深层输入供给了哪个具体环节？ |
| [串讲练习](chapters/07-throughline.md) | 用同一个模 4 特征检验各章能否接起来。 |

背景章可以按需阅读：[Dirichlet 特征与欧拉乘积](chapters/background/01-analysis.md) · [格、局部与整体](chapters/background/02-arithmetic.md) · [自守与伽罗瓦入门](chapters/background/03-automorphic.md) · [素数的标签与有限群平均](chapters/background/04-finite-labels.md) · [一次上同调和局部消失](chapters/background/05-cohomology.md)。

源代码由原发布方和公开镜像提供。本仓库收录原创导读、交互式依赖图和核查记录。
