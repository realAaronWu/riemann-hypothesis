# 黎曼猜想候选证明：中文导读

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

源代码由原发布方和公开镜像提供。本仓库收录原创导读、定位链接和核查记录。
