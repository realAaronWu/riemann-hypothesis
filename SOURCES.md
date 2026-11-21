# 版本与证据范围

本文按以下不可变版本定位声明：

- [作者公告](https://alpo.ge/remark.pdf)。本地读取的 SHA-256 为 `3fc97784b71ddd44ff8aa0a177e99622a1c61b13cfa843a0989ee4a7a0cfeb8d`。
- 公告脚注给出 14 个 Lean 源码分卷。本地下载、按卷号合并并检查 gzip，SHA-256 为 `9631b4f020199e580ba86178cb56c6e9b09f690c2369a80dc4334aa93f49c7fc`。[原始目录的固定镜像](https://github.com/leanprover-community/riemann-hypothesis/tree/40e56bab026552e089d7afcfeff08d2defb9c005/src) · [公开归档核对记录](https://github.com/leanprover-community/riemann-hypothesis/blob/4286c9ca372a512a43eb66262cf87cbb814c0038/verification/NOTES.md#source)
- 源码指定 Lean `v4.33.1`、Mathlib `0df444a360eaa60ab8c11dca51a86af692955474`。[Lean 发布版本](https://github.com/leanprover/lean4/releases/tag/v4.33.1) · [Mathlib 的 RH 定义](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/RiemannZeta.lean#L185)

| 已做的检查 | 能支持的结论 |
|---|---|
| 14 卷归档核对、文件清点、定理入口和选定调用链的源码阅读 | 入口指向哪些命题，选定声明有什么假设或调用，证据可追到具体字节。 |
| Apple Silicon 上用原生 Lean 4.33.1 和指定 Mathlib 重跑 `rh_of_right`、`rh_of_every`、`critLine`，保留原证明体并缩小导入 | 三条从无零结论出发的推导已局部验证，所列公理只有 `propext`、`Classical.choice`、`Quot.sound`。 |
| 在同一环境缩小导入后重跑 `HasWindows.mono`、`hasWindows_of_large`、`exists_small_eps` | 窗口截断和误差参数选择三条辅助引理局部通过，公理仍只列三项标准公理。 |
| 同一 Lean 版本的小型正反例和 `kexactB` 类型错误试验 | 该试验能拒绝这些样例中的错误命题、类型错误、`sorryAx` 和自定义公理。 |
| 整份 `Main` 的独立构建、全量证明项导出、独立内核复核 | 本项目未运行。 |

[公开 Comparator 验证方案](https://github.com/leanprover-community/riemann-hypothesis/blob/4286c9ca372a512a43eb66262cf87cbb814c0038/README.md#checking-it)和[公开源码阅读地图](https://github.com/leanprover-community/riemann-hypothesis/issues/5)提供进一步核对入口。阅读地图里的数学解释和未闭合问题需要各自回到源码论证。导读里的小数值案例用于教学，不能作为全称命题的验证结果。

## 本文如何标记证据

- **源码路径**：在固定版本找到的声明、定义或明示调用。引用一条声明并不会自动证明该声明闭合。
- **局部 Lean 检查**：明确列在上表中的重跑结果。
- **教学例子**：用来说明机制的简化算例。
- **待追**：目前只解释到接口、有条件使用，或仍需核对与经典数学对象的对应关系。
