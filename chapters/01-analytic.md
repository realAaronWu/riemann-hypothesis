# 第 1 章　从素数和的上界到零点

假设有人给我们一个候选零点 $s=0.6+it$。要用这份源码的办法排除它，需要估计一个取实值的加权素数和。对包含目标特征的固定组合，只要能在任意远处找到整段幂次窗口，在其中把和压到 $x^{0.55}$ 以下，解析步骤就能把候选零点排除。这里的 $t$ 是复数的虚部，$x$ 是素数和的截断尺度。它们是两种独立的量。

本章把这条推理走到底。我们先找出素数和的变换，再解释为什么一侧上界能检测复数零点，最后用函数方程把结论从临界线右侧推到左侧。遇到特征、欧拉积或临界带，可以先读[分析背景](background/01-analysis.md)。

## 1.1　让一个素数幂进入和式

记 $\Lambda(p^j)=\log p$，其中 $p$ 是素数且 $j\ge1$，其他整数的 $\Lambda$ 值为零。这是冯·曼戈尔特函数。给定狄利克雷特征 $\chi$，令

$$
S_\chi(x)=\sum_{n\le x}\Lambda(n)\chi(n)\left(\frac{x}{n}-1\right).
$$

$n$ 一到截断点 $x$，权重恰好为零。$x$ 继续增大，权重才逐渐增大。这让新进来的项连续接上前一段。源码把这种权重写成 $(x/n-1)_+=\max(x/n-1,0)$，函数名叫 `ramp`。[和式定义](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/CharFamily.lean#L9-L22)

取模 $4$ 的非主特征，奇数 $n$ 在 $n\equiv1\pmod{4}$ 时取 $1$，在 $n\equiv3\pmod{4}$ 时取 $-1$，偶数取 $0$。当 $x=6$，$2,4$ 被特征去掉，$6$ 的 $\Lambda$ 值为零，和式只剩 $3,5$ 两项。

$$
S_\chi(6)=-(\log 3)(6/3-1)+(\log 5)(6/5-1)
=-\log 3+\tfrac15\log 5\approx -0.7767.
$$

这个例子说明单侧上界允许什么：带特征的和可能为负，而给上界时不必同时控制它有多负。到进阶的窗口推导中，会用 $|g|+g$ 只留下正部，解释为什么这一侧的信息足够。

## 1.2　从斜坡权重得到 Mellin 变换

给和式乘上 $x^{-s-1}$，再从 $1$ 积到无穷，这种变换称为 Mellin 变换。先只看 $n$ 这一项。它从 $x=n$ 才开始贡献。在 $\operatorname{Re}s>1$ 时，可以分别积分两项。

$$
\int_n^\infty (x/n-1)x^{-s-1}\,dx
= \frac{n^{-s}}{s-1}-\frac{n^{-s}}{s}
= \frac{n^{-s}}{s(s-1)}.
$$

因此变换后的和带有 $\sum_n\Lambda(n)\chi(n)n^{-s}$。在 $\operatorname{Re}s>1$ 内，绝对收敛允许交换求和和积分。对 $L(s,\chi)$ 的欧拉积取对数导数，素数 $p$ 的因子贡献 $-(\log p)\sum_{j\ge1}\chi(p)^jp^{-js}$。各素数加起来，正好得到 $S_\chi$ 的变换。

$$
\mathcal M S_\chi(s)
= \frac{-L'(s,\chi)/L(s,\chi)}{s(s-1)}.
$$

这一步把整数上的和与复平面上的零点接上了。如果 $f(s)=(s-\rho)^m h(s)$，其中 $h$ 在 $\rho$ 附近全纯而且 $h(\rho)\ne 0$，那么 $f'/f=m/(s-\rho)+h'/h$。原来难以直接控制的 $m$ 重零点，现在表现为一个简单极点，系数里带有正整数 $m$。[Mathlib 的对数导数公式](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/Dirichlet.lean) · [斜坡 Mellin 积分](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/MellinRamp.lean)

分母里的 $s-1$ 也会制造奇性，先把它去掉才能用变换检测零点。对非主特征，$L(1,\chi)\ne 0$，加入一项与 $x$ 成正比的修正即可。

$$
\begin{aligned}
E_\chi(x)&=S_\chi(x)+x\,\frac{L'(1,\chi)}{L(1,\chi)},\\
\mathcal M E_\chi(s)
&=\frac{-L'(s,\chi)/L(s,\chi)+s L'(1,\chi)/L(1,\chi)}{s(s-1)}.
\end{aligned}
$$

分子在 $s=1$ 为零，所以那里是可去奇点。对模 $1$ 的特征，$L=\zeta$，$\zeta$ 在 $1$ 本身有极点。记 $Z(s)=(s-1)\zeta(s)$，把 $Z$ 在 $1$ 的值延拓为 $1$，且 $Z'(1)=\gamma$，这里 $\gamma$ 是欧拉常数。取 $E_1(x)=S_1(x)-x\log x+(1+\gamma)x$。因为 $x\log x$ 与 $x$ 的变换分别是 $1/(s-1)^2$ 和 $1/(s-1)$，整理后得到

$$
\mathcal M E_1(s)
=\frac{-Z'(s)/Z(s)-1+(1+\gamma)s}{s(s-1)}.
$$

这个分子在 $1$ 也为零。开临界带 $0<\operatorname{Re}s<1$ 内，一个 $m$ 重零点仍会留下系数为 $-m/[\rho(\rho-1)]$ 的极点。Mathlib 把 $\zeta$ 表示为 $\mathbb C\to\mathbb C$ 的全定义函数，$s=1$ 的取值约定与极点附近的发散是两件事。教材里说的 $\zeta$ 极点始终指后者。[非主特征的修正](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/mellinGchiOfNeOne.lean) · [模 $1$ 的修正](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L137-L239) · [Mathlib 在 $1$ 的约定](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/Harmonic/ZetaAsymp.lean#L441)

## 1.3　为什么要成族，为什么极点不会相消

上游给出的估计针对一个组合 $G_m(x)$，其中包括 $\zeta$ 的修正和以及若干个特征的修正和。源码分别记作 `Gz` 和 `An.gChi`，后者取实部。源码的 `Level` 用 `KEPT` 表示要保留的有限特征集，`Nt` 是去掉模 $1$ 特征的集合。主线取目标特征 $\psi$ 的各次幂，再取这些特征的本原代表。若忘了「本原」的含义，可以回看[背景一的换模例子](background/01-analysis.md)。比如模 $4$ 的 $\chi_4$ 的阶为 $2$，组合里有模 $1$ 的特征和 $\chi_4$，权重分别是 $1$ 与 $1/(3\cdot2+1)=1/7$。一般主路线也用相同规则，$o$ 为生成的循环子群的阶。第 1.5 节再处理 `psK` 指定额外权重的版本。[特征集、权重与循环族](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L8-L45) · [循环族构造](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L96-L124)

窗口判据用 `CharFamily` 接收这个和。它允许一般的有限指标集与正权重 $a_i>0$，且主特征只允许出现在模 $1$。写 $G_m(x)=\sum_i a_i\operatorname{Re}E_{\chi_i}(x)$。$\chi^{-1}(n)$ 是 $\overline{\chi(n)}$。在与模数不互素的整数上，二者都为零。因此在做变换前，可以把每个实部写成 $\bigl(E_\chi(x)+E_{\chi^{-1}}(x)\bigr)/2$。在复数 $s$ 上，这两个变换分别取值再求和。直接取一个复变量全纯函数的实部会失去全纯性。[族的接口与实部处理](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L241-L303)

这样在任一候选零点 $\rho$ 处，变换的留数是

$$
-\frac{1}{\rho(\rho-1)}
\sum_i \frac{a_i}{2}\bigl(m_i(\rho)+m_i^{-}(\rho)\bigr).
$$

这里 $m_i,m_i^{-}$ 是 $\chi_i,\chi_i^{-1}$ 对应 $L$ 函数在 $\rho$ 的零点阶数，无零点就取 $0$。所有阶数非负，只要一项有零点，和就严格为正。因子 $-1/[\rho(\rho-1)]$ 对所有项都相同，所以即使 $\rho$ 是复数，留数也无法相消。若 $\rho$ 是实数且 $0<\rho<1$，留数还严格为正。

例如用权重 $1,1/7$ 的模 $1$ 和二次特征，假设后者在 $\rho=0.6$ 有一个二重零点，前者在此处阶数为零。二次特征等于自身的逆，和式中的贡献是 $(1/14)(2+2)=2/7$。留数等于 $(2/7)/(0.6\cdot0.4)=25/21$。这是用来检查符号的假设例子。真实论证恰恰要排除这样的零点。[留数求和与实极点符号](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/poleData.lean#L336-L400)

<a name="window-criterion"></a>

## 1.4　任意远的幂次窗口

现在把前面算出的变换记作 $\Phi$。它在右半平面除上述极点外全纯。在初始区域 $\operatorname{Re}s>2$ 内，置 $u=\log x$、$g(u)=G_m(e^u)$，就有

$$
\Phi(s)=\int_0^\infty g(u)e^{-su}\,du.
$$

窗口判据的输入由两部分组成。第一部分是上节那样的固定正权特征族。第二部分是这样的增长界。给定指数 $0<\beta<1$、固定 $\lambda=1+\delta>1$，对每个起点下限 $Y_0$，都能找到 $Y\ge Y_0$，满足

$$
G_m(x)\le C x^\beta \qquad\text{对整个 }[Y,Y^\lambda].
$$

$C$ 对这些窗口固定。对数坐标中，窗口变成 $[U,(1+\delta)U]$，其中 $U=\log Y$。取非负包络 $R(u)=|C|e^{\beta u}$，则 $g\le R$，而且 $\int_U^{(1+\delta)U} R(u)e^{-\beta u}\,du=|C|\delta U$。任给 $\eta>0$，窗口取得足够远，这个线性量就小于 $e^{\eta U}$。这个积分只要控制长为 $\delta U$ 的窗口。它给出源码 `WindowHypU` 所需的积分上界。[窗口输入 `theta`、`delta`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ZeroFreeOfRpowWindow.lean#L11-L14) · [包络估计和换元](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/WindowHypOfRpow.lean#L27-L57)

判据输出是族中每个 $L$ 函数在 $\operatorname{Re}s>\beta$ 无零点。回到最初的 $s=0.6+it$，若得到了指数 $\beta=0.55$ 的窗口上界，就能排除它。第一次读可以直接跳到[怎样把指数推到临界线](#choose-exponent)，再读[函数方程和结论](#reflection)。第 1.5 节给出另一个充分条件。接下来是一段可选的推导。

### 进阶推导：高阶导数怎样只看窗口附近

只知道这些窗口的上界，不能直接断言整个 Mellin 积分在 $\operatorname{Re}s>\beta$ 收敛。原稿的办法是在已经收敛的区域高阶求导。取固定的 $\sigma>2$，把第 $k$ 阶导数除以 $k!$ 并乘上 $(-1)^k$，记为 $A_k(s)$。求导给积分加上 $u^k/k!$。在 $s=\sigma+i\tau$ 时，积分变为

$$
A_k(\sigma+i\tau)=\int_0^\infty g(u)e^{-i\tau u}\,w_k(u)\,du,
\qquad w_k(u)=u^k e^{-\sigma u}/k!.
$$

权重 $w_k$ 在 $u=k/\sigma$ 最大。选 $k=\lceil(1+\delta/2)\sigma U\rceil$，峰值就靠近窗口的中点。窗口外只能使用粗界 $|g(u)|\le C_0 e^{2u}$。源码另选足够大的 $\sigma$，对这条粗界乘权后的两个尾部用指数估计，证明其积分至多为常数乘 $\sigma^{-k}$。峰值位置解释了选 $k$ 的动机，真正保证尾部小的是 `landau_tails` 的不等式。[尾部估计和 $k$ 的选择](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauTails.lean#L80-L131)

窗口内怎样只用上界？用三角不等式界 $|A_k(\sigma+i\tau)|$，然后加上 $\operatorname{Re} A_k(\sigma)$。积分里的 $|g|$ 变成 $|g|+g=2\max(g,0)\le 2R$。例如 $g=-7$、$R=2$ 时，$|g|=7$ 已经大过包络，$|g|+g=0$ 仍受控。结合 $w_k(u)\le e^{-\beta u}/(\sigma-\beta)^k$ 和窗口外的尾估计，得到一个对所有 $\tau$ 同时成立的上界。

$$
|A_k(\sigma+i\tau)|+\operatorname{Re} A_k(\sigma)
\le \frac{C_1 e^{\eta U}}{(\sigma-\beta)^k},
\qquad k\ge U.
$$

这里 $\sigma,C_1$ 先固定，再给定 $\eta>0$ 和窗口下限。这个次序让后面的反证可以先由极点确定需要多小的 $\eta$，随后再找窗口。[单侧上界如何进入导数估计](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindowIneq.lean#L75-L100) · [导数估计的量词](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L40-L73)

最后看极点对这些导数的影响。距展开中心 $z$ 为 $d$ 的单极点 $c/(s-\rho)$，对 $A_k(z)$ 的贡献是 $c/(z-\rho)^{k+1}$。如果它是唯一最近的极点，减掉它后剩余函数在更大的圆盘里全纯。取介于 $d$ 和该圆盘半径之间的 $r_1$，Cauchy 估计给余项上界 $M/r_1^k$。源码分两种情况处理。

1. 以实数 $\sigma$ 为中心，有半径 $D\le \sigma-\beta$ 的无极点开圆盘，但存在极点的横向距离 $\sigma-\operatorname{Re}\rho<D$。沿虚方向移动中心，并避开有限个等距位置，可以得到一个距离 $d<D$ 的唯一最近极点。复中心处的绝对值含有 $|c|/d^{k+1}$ 的贡献。实中心处的修正项由无极点圆盘的 Cauchy 估计控制。
2. 否则以 $\sigma$ 为中心的一个圆盘内，唯一最近的极点就在实轴上，且实部大于 $\beta$。它的留数为正，于是实中心的 $\operatorname{Re} A_k(\sigma)$ 就含有 $c/d^{k+1}$ 的正贡献。这里 $|A_k(\sigma+i\tau)|\ge0$ 足够。

两边比较都归结为 $c_0/d^k\le M/r_1^k+C_1e^{\eta U}/(\sigma-\beta)^k$，其中 $c_0>0, d<r_1\le \sigma-\beta$。这个不等式无法在任意大的 $U$ 上保持。举例说，若 $d=2, r_1=2.1, \sigma-\beta=2.3$，乘以 $2^k$ 后，右边第一项带因子 $(2/2.1)^k$，第二项至多带因子 $e^{\eta U}(2/2.3)^U$。取 $\eta=0.05<\log(2.3/2)$，两项都趋于零，左边常数 $c_0$ 仍为正。于是不存在实部大于 $\beta$ 的极点，也就排除了相应的零点。[两种位置的判定](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/LandauDichotomy.lean#L24-L86) · [两次反证](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/landauWindow.lean#L83-L166)

<a name="choose-exponent"></a>

### 怎样把指数推到临界线

沿本原特征的主调用链读源码，可从 `zeroFreeAll_of_topG` 进入 `zeroFreeOn_of_tiedWin_cyc`，再进 `level_of_tiedWin`。它用 `formB` 把 `Level` 转成 `CharFamily`，保留同一个 $G_m$ 并对应无零点命题，然后调用 `zeroFree_of_rpow_window`。这一段使用 $\lambda=3/2$，上游交出的上界常数是 $C=1$。要从 $x^{1/2+(e_D+e_L+7)\varepsilon}$ 得到临界线右侧无零点，先固定候选点的实部 $\sigma_0>1/2$，取

$$
\beta=\tfrac12+\tfrac12\min(\sigma_0-\tfrac12,\tfrac12).
$$

于是 $1/2<\beta<\sigma_0$ 且 $\beta<1$。再固定上游给的 $e_D,e_L$，选 $\varepsilon$ 使 $1/2+(e_D+e_L+7)\varepsilon\le\beta$。例如 $\sigma_0=0.6$、$e_D+e_L+7=10$，$\beta=0.55$，$\varepsilon=0.004$ 给指数 $0.54$，前提是它也小于上游允许的阈值。$x\ge1$ 时 $x^{0.54}\le x^{0.55}$。窗口可以移到所有大小阈值之后。离散点上的上界无法满足窗口条件。若固定 $\varepsilon$，且所得指数严格大于 $1/2$，这个指数也无法覆盖所有任意靠近临界线的候选点。[窗口与阈值调用链](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L59-L93) · [`formB` 适配](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/Imports.lean#L8-L19) · [主线入口](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/CharacterBoxes/ZeroFreeAllOfTopG.lean#L19-L34)

## 1.5　进阶阅读：充分大尺度上的统一上界

源码还给出一条相邻的推理 `landau_family`。这条路线要求 $G_m(x)\le x^\beta$ 对所有充分大的 $x$ 成立。在 `TopWin.lean` 中，由 `level_of_tiedAll` 使用它。主入口使用的是上一节的窗口路线。[相邻调用链](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L117-L134)

先把权重乘以 $R=3o+1$。$\zeta$ 项得到整数重数 $R$，其余项各出现一次，`psK` 若指定了一个特征则该项也出现 $R$ 次。源码用二元指标 $(\chi,j)$ 保存重复次数，$(\chi,j)\mapsto(\chi^{-1},j)$ 给出指标集上的对合。特殊特征若存在是实值的，因此取逆保留次数。令 $P=Z^R\prod_{(\chi,j)}L(s,\chi)$。取实部时本来要平均 $\chi$ 和 $\chi^{-1}$ 的变换，有了保持重数的对合，重排后只需 $P'/P$ 的一个式子。[整数化、取逆和重数](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Landau.lean#L538-L588) · [乘积与重排](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Landau.lean#L380-L434)

令 $B(x)=R G_m(x)$。在原来上界还没开始生效的紧区间上，$B$ 有界，所以可增大常数 $C$，使 $H(x)=Cx^\beta-B(x)$ 在 $x\ge1$ 都非负。注意此处的符号。差 $H$ 的 Mellin 变换在初始收敛区等于

$$
\Phi_H(s)=\frac{C}{s-\beta}+\frac{P'(s)/P(s)-(a+bs)}{s(s-1)}.
$$

这里 $a=-R$，$b=R(1+\gamma)+\sum_{(\chi,j)}L'(1,\chi)/L(1,\chi)$，且 $a+b=P'(1)/P(1)$。减去 $a+bs$ 消去 $1$ 处的奇点，源码用可延拓的差商写这一步。减去 $B$ 使对数导数前的符号变成正号，下面的反证依赖这个符号。[非负差与 Mellin 恒等式](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Landau.lean#L436-L507)

Landau 的非负性引理用于把积分收敛范围沿实轴向左推进。大意是，如果非负被积函数的 Mellin 变换在实轴一段上可以全纯延拓，那么积分本身也能沿这段继续收敛。原因是，以实点为中心向左做 Taylor 展开时，乘进积分的 $(\log x)^k$ 是非负的，可以用单调收敛把级数和积分换序。若 $P$ 在 $(\beta,1)$ 有实零点，取最靠右的一个 $b_0$。引理让实积分在 $s>b_0$ 成立，因此 $(s-b_0)\Phi_H(s)$ 从右趋近 $b_0$ 时保持非负。但它的极限是 $m/[b_0(b_0-1)]<0$，其中 $m\ge1$ 是该零点的阶数，产生矛盾。排除实零点后，再把 Mellin 积分的全纯域推进到整个 $\operatorname{Re}s>\beta$。在消去分母后，用恒等定理得到 $P'=qP$，其中 $q$ 在该半平面全纯。若 $P$ 在某点有正的零点阶数，$P'$ 的阶数会少一阶，$qP$ 至少有原来的阶数，故二者不可能相等。这样也排除了非实零点。[Landau 积分引理](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/ZetaNonvanishing/LandauEq.lean#L34) · [实轴反证与全纯延拓](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Landau.lean#L115-L280)

<a name="reflection"></a>

## 1.6　从右半平面走到 RH 和 Dirichlet GRH

一个模 $N$ 的狄利克雷特征，可能原本就能由更小的模数决定。能诱导出它的最小模数是导子 $d\mid N$，相应的特征记为 $\chi^\ast$。当 $d=N$，特征称为本原。对右半平面的结论，源码先证明所有本原特征的 $L$ 函数无零，再用有限个欧拉因子处理任意模 $N$ 的特征。

$$
L(s,\chi)=L(s,\chi^\ast)\prod_{p\mid N}\bigl(1-\chi^\ast(p)p^{-s}\bigr).
$$

对 $p\mid d$，因子自动为 $1$。对其他 $p$，当 $\operatorname{Re}s>0$ 时，$|\chi^\ast(p)p^{-s}|\le p^{-\operatorname{Re}s}<1$，因而因子非零。比如把上文的模 $4$ 特征诱导到模 $12$，增加一个 $p=3$ 的因子 $1+3^{-s}$。当 $\operatorname{Re}s=0.6$，$|3^{-s}|=3^{-0.6}\approx0.5173$，抵消不了常数 $1$。在 $s=i\pi/\log3$，该因子确实为零。这也让人看到为什么把结论写在开临界带 $0<\operatorname{Re}s<1$ 内很重要。源码在右半平面使用换模恒等式时显式排除了主特征在 $s=1$ 的情形。[换模恒等式](https://github.com/leanprover-community/mathlib4/blob/0df444a360eaa60ab8c11dca51a86af692955474/Mathlib/NumberTheory/LSeries/DirichletContinuation.lean#L146-L153) · [右半平面的换模](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/CharacterBoxes/Imprimitive.lean#L5-L35)

对本原 $\chi$，由开临界带内的一个零点 $s$ 出发。补上无零的 Gamma 因子后仍是零点，再用本原特征的函数方程，得到逆特征 $\chi^{-1}$ 在 $1-s$ 的零点。若原来 $\operatorname{Re}s<1/2$，反射后 $\operatorname{Re}(1-s)>1/2$，与右半平面无零矛盾。原本就在 $1/2$ 右边的零点已直接排除，只余临界线。对于非本原特征，先用上面的有限乘积把临界带零点传给 $\chi^\ast$，再做反射。源码在最后一步使用的是 $\chi^{-1}$ 和 $1-s$，并用 `conductor_inv` 保证逆特征仍本原。[本原反射](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/GammaFactorNonvanishing/CritLine.lean#L6-L27) · [任意模数的开带结论](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/CharacterBoxes/ClaimStrip.lean#L7-L73)

模 $1$ 的 $L$ 函数就是 $\zeta$。原稿的 `rh_of_right` 还显式覆盖了开临界带之外的 $\zeta$ 零点。对 $s$ 在临界线左侧，令 $t=1-s$，函数方程把 $\zeta(s)$ 写成 $2(2\pi)^{-t}\Gamma(t)\cos(\pi t/2)\zeta(t)$。$\operatorname{Re}t>1/2$ 给出 Gamma 因子非零，且在 $t\ne 1$ 时可应用右半平面无零。$t=1$ 对应 $s=0$，已有 $\zeta(0)=-1/2$。余弦在这一区域的零点只可能使 $s=0,-2,-4,\ldots$，其中负偶数是 RH 命题排除的平凡零点。于是满足 RH 所述条件的零点都在临界线上。入口 `Main.lean` 分别提供 RH、任意狄利克雷特征的右半平面无零、开临界带 GRH 及本原特征版本。这里的 GRH 范围是狄利克雷 $L$ 函数。[RH 的反射与例外](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/GammaFactorNonvanishing/RhOfRight.lean#L5-L62) · [最终命题](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Statements.lean#L3-L16) · [调用入口](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Main.lean#L1-L12)

## 1.7　把分析结论交回上游

分析部分交出的接口是，一个含目标特征的固定 $G_m$，若在任意远的整段幂次窗口上获得一个指数 $\beta<\operatorname{Re}s$ 的单侧上界，就能排除 $s$ 为零点。现在的问题是怎样为每个目标特征和允许的小 $\varepsilon$ 制造这样的窗口，并保证窗口上的上界适用于**同一个** $G_m$。[第 2 章](02-comparison.md)沿着这个接口回到算术比较式。

本章的窗口、最终增长条件与换模论证来自固定版源码阅读。已有的本机 Lean 重跑覆盖了从右半平面无零到 RH 与本原临界线的条件桥梁。对窗口判据及其上游比较、选族和构造，整条链的 Lean 重跑仍为 **NOT RUN**。解析判据说明了需要哪种上界，上界在完整证明中如何交付仍要沿后续章节核对。

## 自检

1. **只找到好点会怎样？** 假设对每个整数 $n\ge1$，在 $x=e^{2^n}$ 有 $G_m(x)\le x^{0.54}$。你能否排除 $s=0.6+it$？如果能把同一估计扩展到任意远处的整段 $[Y,Y^{3/2}]$，$\beta$ 怎样取？
2. **正权重有什么用？** 假设两个变换在同一 $\rho$ 处各有一个二重零点所产生的极点，且两项是实特征对应的变换。权重为 $1,1/7$ 时留数如何相加？若允许权重 $1,-1$，会发生什么？
3. **为什么非本原反射要先降模？** 对由上文模 $4$ 特征诱导出的模 $12$ 特征，若 $s=0.4+it$ 是零点，写出从这个零点到右半平面矛盾的每一步。

<details>
<summary>参考推理</summary>

1. 离散点不给出窗口积分的包络估计，因此不能用窗口判据。若整段都有同一个上界，可取 $\beta=0.54$，或取 $0.54\le\beta<0.6$ 并把窗口移到 $Y\ge1$。
2. 实特征等于自身的逆。两项各有阶数 $2$，正权重把共同因子 $-1/[\rho(\rho-1)]$ 乘以 $2+2/7=16/7$。权重 $1,-1$ 则使这两项的留数之和为零，原来的两个零点将无法通过该点的极点检测出来。
3. 有限因子 $1+3^{-s}$ 的第二项模长严格小于 $1$，所以模 $4$ 本原特征在 $s$ 处也为零。开带内可乘上无零的 Gamma 因子，用本原函数方程反射到逆特征在 $1-s=0.6-it$ 的零点，再除去反射点的无零 Gamma 因子。这个新的零点已经被右半平面结论排除。

</details>
