# 合起来走一遍：从模 $4$ 特征到一个候选零点

这是一道串讲题。它检验前面各章能否交接，用的是同一个特征和同一个候选零点。下面把源码的接口连起来。涉及对象存在性和几何估计的步骤仍需依照各章所标明的证据来读。

## 第一步：把特征放进分析论证所用的集合

沿用[背景一](background/01-analysis.md)的 $\chi_4$。它只在奇数上非零，且 $1,3$ 的取值不同，因此不能由模 $1$ 或模 $2$ 的特征诱导，是本原特征。另一方面，$\chi_4^{-1}=\chi_4$。候选论证给定一个本原特征 $\psi$，先用 `Level.cyc ψ` 定义它所在的有限组合，并保证 $\psi$ 在要检查的集合中。后续估计针对这个组合对应的函数 $G_\Lambda$。如果给出的组合里没有 $\chi_4$，即使上界成立，也无法从中排除 $L(s,\chi_4)$ 的零点。[选定层级与包含性的调用](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L90-L94)

## 第二步：按候选零点的实部选择误差容许值

令 $s=0.6+it$，其中 $t$ 任意。我们只需给出一个介于 $0.5$ 与 $0.6$ 之间的上界指数，例如 $\beta=0.55$。源码把这一点做成参数选择：先从对象族结论取得两个固定常数 $e_D,e_L$ 和允许的 $\varepsilon$ 范围，再取足够小的正 $\varepsilon$，使

$$
(e_D+e_L+7)\varepsilon\le0.05.
$$

主路线使用 $e_D=2,e_L=0$，系数因此为 $9$。设对象族结论给定的阈值为 $\varepsilon_1>0$。取 $\varepsilon=\min(\varepsilon_1/2,0.005)$，就能同时满足 $\varepsilon<\varepsilon_1$ 和 $1/2+9\varepsilon\le0.545<0.55$。若 $e_D,e_L$ 可以在选择 $\varepsilon$ 之后随意变大，这个推理就不能成立。[源码中的选择次序](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L55-L81)

## 第三步：用同一族对象兑现上界

先把 $\chi_4$ 交给[第 6 章](06-automorphic.md)的两类输入。算术输入给出可用宿主的窗口供给。对选出来的宿主，针对 $\chi_4$ 的要求 `GChi` 有两个条件：`EAtH` 留住所需的特征并使比较公式适用，`VVle` 控制后续需要的上同调量。另外还有与这些数据相容的几何条件。只知道 `VVle` 时，还不能断言这个宿主能供给素数和比较所需的特征。

[第 5 章](05-families.md)用这些输入选同一个对象族，既交出窗口条件，也交出把算术和几何数据接在一起的条件。[第 3 章](03-errors.md)和[第 4 章](04-periods.md)分别检查误差与周期，再由[第 2 章](02-comparison.md)换成 $G_\Lambda(x)$ 的上界。比如，从族甲拿窗口，从族乙拿误差界，无法推出甲的每个窗口内估计都成立。

用数字演一遍交接。**假设**所有门槛都不超过 $100$，并且选定的族提供一个从 $Y=256$ 开始的可用窗口。由于 $\lambda=3/2$，在整个 $[256,4096]$ 上都要使用同一估计，得到 $G_\Lambda(x)\le x^{0.545}\le x^{0.55}$，例如 $x=500$ 也包括在内。这只是模拟一次交接，$\chi_4$ 的实际宿主和这个数值窗口没有在此构造。要调用第 1 章的判据，还需要知道：把起点下限提高到任意大，仍可找到一个完整窗口。源码的窗口条件正是给出这一点。[窗口阈值与比较定理](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Window.lean#L7-L13)

## 第四步：把上界交给分析结论

窗口论证将上界转成 $\operatorname{Re}(s)>\beta$ 的无零结论。因此它能排除 $0.6+it$。对于临界带内左侧的点，再用函数方程。如果 $s=0.4+it$ 是本原 Dirichlet $L$ 函数的零点，与它对应的是**逆特征**在 $1-s=0.6-it$ 的值。这里 $\chi_4$ 恰好等于其逆特征。一般情况下，不能把逆特征省略。这正是对象族构造必须能覆盖任意本原特征的原因之一。[原稿的函数方程步骤](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/GammaFactorNonvanishing/CritLine.lean#L11-L27)

## 自检

1. 如果只知道单个 $L(s,\chi_4)$ 的无零结论，能推出普通 RH 吗？不能。但如果对整组 $\mathrm{Level.cyc}(\chi_4)$，能为任意趋近 $1/2$ 的指数 $\beta>1/2$ 在任意远处找到满足 $G_\Lambda(x)\le x^\beta$ 的整段窗口，就可对其中的模 $1$ 项应用无零判据，再由函数方程得到普通 RH。一个固定指数 $0.55$ 的界只给出较窄的无零区。
2. 如果已经有 $\beta=0.55$ 的窗口估计，但只知道窗口里某一个点满足上界，可以排除 $0.6+it$ 吗？源码里的分析接口要求整个窗口，现有信息不足。
3. 如果想排除 $0.5001+it$，还能用 $\beta=0.55$ 吗？不能。需重选更靠近 $1/2$ 的指数并重新取得相应参数和对象族。这里再次用到先固定 $e_D,e_L$，再选 $\varepsilon$ 的顺序。

[回到全局路线](00-roadmap.md) · [证据与验证边界](../SOURCES.md)
