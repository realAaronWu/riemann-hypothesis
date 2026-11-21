# 从计数差到窗口上的素数和上界

本章要把上游估计换写成第 1 章需要的素数和。先把两者写成可比较的式子，再用有限群平均筛出所需项，最后给留下的误差单独记账。若不熟悉惯性群、Frobenius 或特征平均，可先读[背景四](background/04-finite-labels.md)。

为了看懂计数差怎么变成一个有用的素数和，先算一遍有限群上的平均。取 $H=\mathbb Z/4\mathbb Z$，沿两个平移位置 $A_0=\{0,2\}$ 平均。四个特征写成 $\psi_j(h)=i^{jh}$，其中 $j=0,1,2,3$。它们在这两个位置的值分别是 $(1,1),(1,-1),(1,1),(1,-1)$。所以只留下 $\psi_0,\psi_2$。如果只在位置 $0$ 取值，四个特征都等于 $1$，消去就失败了。候选证明用这种平均，从很长的求和式中筛出可以控制的特征。源码的群有两个额外的二元坐标，这个算例只演示沿 $A_0$ 平均的那一步。 [`sum_A` 和 `sum_Th`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L22-L73)

## 把各项拉到可比较的尺度

先看计数里的一个截断项。记 $u_+=\max(u,0)$。当扣减量 $w>0$ 时，可以写成

$$
(a/p^j-w)_+=w\left(a/(wp^j)-1\right)_+ .
$$

取 $a=18,p^j=3,w=2$，左边是 $6-2=4$，右边是 $2(3-1)=4$。于是原来的截断方式变成了分析章的斜坡权重，新的截断点是 $a/w=9$。不同标签的 $w$ 不同，所以下一步还要估计把各个截断点拉到同一尺度的代价。

## 两次平均各解决一个问题

继续用上面的四阶群。假设一个函数的四个特征系数是 $8,10,-7,4$。先沿 $A_0=\{0,2\}$ 平均。奇数编号的特征消失，只剩常数 $8$ 和随平移 $t$ 改变符号的 $-7(-1)^t$。

再看第二批位置的份额。假设偶位置占 $4/7$，奇位置占 $3/7$，那么 $(-1)^t$ 的加权平均是 $4/7-3/7=1/7$。因此两次平均后总和是 $8-1=7$。如果只想保留常数项，从这个总和的上界 $7$ 不能直接得到常数项也至多 $7$。还要给被剔除的项补上它的绝对值 $1$，才得到 $8$。这解释了正文的余项 $\Sigma_A$ 为什么不能直接删掉。这里的系数是小群算例，不是原稿的实际参数。

实际证明还要确保平均用的是同一截断尺度，且每个留用特征的系数符合分析章的要求。第 3 章说明上游怎样控制计数差，第 5 章补上这组对象真的能在整段窗口内使用的条件。第一遍已经可以转到[第 3 章](03-errors.md)。下文是把这个小模型对应到源码的进阶推导。

## 进阶：先看源码中的计数差

假设在一个尺度上，实际计数给出 120，主项预测 110，差就是 10。在另一个尺度上，计数为 80，预测仍是 110，差是 −30。单侧上界 12 允许这两种情形。候选证明里，计数和主项换成源码的 `ASK` 与 `MAIN`。给出这个差的上界是上游的任务。本章问的是怎样从这个差里取出我们要的特征。

源码的 $D$ 给每个素数附上惯性子群和 Frobenius 标签。把这些标签理解成记录素数在数域中如何分解的数据。标签落在有限加法群 $E_0\times H$，其中 $E_0=(\mathbb Z/2\mathbb Z)^2$，`PhiSet` 是指定的一组标签。

`ASK` 是实数计数和。它在选定的惰性素数幂和一个指定的分歧素数 $D.d$ 上累计贡献，惰性素数项以 $2\log p$ 加权，指定分歧素数项以 $\log d$ 加权；截断贡献的形状类似 $\max(a/p^i-w(\rho),0)$。$a$ 是长度参数，$w(\rho)$ 是随标签变化的扣减量，$N$ 截断有限求和。

`MAIN` 是比较用的计算主项，包含 $a\log a$、欧拉常数、一个特征常数和 $\log w$ 的平均。 [`ASK`、`MAIN` 与 `De`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/FirstPrimeNeSecondPrime.lean#L38-L101)

`gapA` 把这项差在若干位置上相加。固定平移 $u\in A_0$，取有限指标集 $TT\subseteq H$，每个 $t\in TT$ 有长度 $a(t)$，另有 $m$ 个编号 $j$。用 $w_{u,j}$ 代表标签到实数的函数，得到

$$
\mathrm{gapA}(u)=\sum_{t\in TT}\sum_{j=0}^{m-1}
 \bigl(\mathrm{ASK}(D,N,a(t),t,w_{u,j})
      -\operatorname{Re}\mathrm{MAIN}(\ell,a(t),w_{u,j})\bigr).
$$

这一层需要每个 $u\in A_0$ 的**单边**上界。`ch_top` 先用 `IdentU` 核对计数、主项和索引，得到 $\mathrm{gapA}(\mathrm{tr}(v))=Dd.\mathrm{ASK}(v)-Dd.\mathrm{Main}(v)$。`Dd` 存储第 3 章所用数据，$\mathrm{tr}$ 把记录的指标映到 $H$。`ch_top` 调用 `each_unit_bound_statement` 和 `errX5at_le`，再用 `BNBoundsU` 替换误差中的两个预算。`core_gm` 用「对每个 $u\in A_0$ 都有 $v$ 使 $\mathrm{tr}(v)=u$」把该界送给 `ch_core`。若少覆盖一个 $u$，后面的平均便缺了一条上界。 [`gapA`、`IdentU` 与 `BNBoundsU`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/SplitInertia.lean#L50-L77) · [`ch_top` 的等式和误差链](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChTop.lean#L37-L72) · [`core_gm` 如何取得每个平移的上界](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreGm.lean#L46-L60)

## 哪些特征留下，怎样处理其余特征

`GPsi` 是按群特征 $\psi$ 分量记录的平滑素数和余项。Lean 中加法特征 $0$ 表示处处取值 $1$ 的平凡特征。它对应的余项是 zeta 的 $G_z(x)$。对于非平凡特征，`GPsi` 给 $\sum_{1\le n\le x}\Lambda_{\mathrm{vM}}(n)\,\mathrm{primVal}(D,\psi,n)(x/n-1)$ 加上 $x\ell(\psi)$。$\Lambda_{\mathrm{vM}}$ 是 von Mangoldt 函数，`primVal` 在素数幂处是相应 Frobenius 陪集上的特征平均。$\ell$ 是线性校正常数。到了实际的数域构造，`HostAddCharCompatible` 和 `prim_read` 把它与对应本原 Dirichlet 特征的 $L'/L(1)$ 对齐，并把 `GPsi` 识别为该特征的 `gChi`。 [`primVal` 与 `GPsi`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/FirstPrimeNeSecondPrime.lean#L61-L70) · [`HostAddCharCompatible`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreAtH.lean#L14-L27) · [`prim_read` 在换写中的使用](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/GmAEq.lean#L129-L146)

一个 `ASK` 与 `MAIN` 的差，如何变成关于这些特征的式子？`ch_balance` 给出复数等式 $\mathrm{ASK}-\mathrm{MAIN}=\mathrm{De}$。`De` 用共轭特征值 $\overline{\psi(g)}$ 作为系数，并有公共的归一化 $1/|\mathrm{PhiSet}|$，把 $w(\rho)\,\mathrm{GPsi}(\psi,a/w(\rho))$ 加起来。计算使用惯性与 Frobenius 的条件，要求 $a>0$，并要求允许的标签满足 $w(\rho)>0$ 以及 $a/w(\rho)\le N$。这样才能把 `ASK` 的截断范围换成 `GPsi` 的截断范围。 [`ch_balance`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChBalance.lean#L200-L245)

下一步是把因标签而异的输入 $a/w$ 拉回同一尺度。令 $b>0$ 为共同的权重尺度。「厚」标签是从 $T_2+u$ 选出的标签，权重在 $[b,b+\eta+1]$ 内，源码用 `LipW` 控制换成 $b$ 的代价。其余允许的标签叫「薄」标签，$w\le 2b'$。小权重让 $a/w$ 变大，于是 `ThinScales` 可以给出 $|\mathrm{GPsi}(\psi,y)|\le y\vartheta$，对每个 $\psi$ 和每个 $y\ge X'/3$ 成立。`CostWindows` 把两类换尺度的代价合在一起，给出每个 $(t,j)$ 至多 $2b/x$ 的上界。这里的 $\vartheta$ 约束薄项，稍后的解析指数记作 $\beta$。 [`SizesA`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/SplitInertia.lean#L42-L48) · [`ThinScales` 与 `LipW`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/GrowthBoundGivesRiemannHypothesis.lean#L55-L64) · [`CostWindows`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/SChain.lean#L50-L58) · [`core` 如何使用 `th_le`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L283-L338)

现在回到开头的平均。沿 $A_0$ 平移只留下

$$
\Psi_A=\{\psi:\ \psi(0,s)=1\ \text{对每个 }s\in A_0\}.
$$

平移平均与对 $t\in TT$ 求和是两步。第一步用 $T_2\subseteq A_0$ 消去不在 $\Psi_A$ 的项。第二步要控制剩下的相位，并把 $a(t)/b$ 移到 $x$。这些截断点都满足 $|a(t)/b-x|\le1$。对选入 $K_p\subseteq\Psi_A$ 的特征，源码要求它在固定标签 `sgc0` 上取值 $1$，所以相位可写成 $\psi(0,t)$。若 $\psi$ 在整个 $H$ 分量上都取值 $1$，其 $TT$ 平均恒为 $1$。其余选入的特征，`CharsA` 要求

$$
\left|\sum_{t\in TT}\psi(0,t)-c\,|TT|\right|\le M x^{-1+\varepsilon}|TT|.
$$

这个平均给出两个权重 $w_A(c,\psi)\in\{1,c\}$。实际的 $c=1/(3o+1)$ 来自 `Shares` 的陪集计数，这里的 $o$ 是 $H/A_0$ 的阶。若有两个陪集，并且它们分别占 $4/7$ 和 $3/7$，则它们在取值 $1,-1$ 的特征上的平均是 $4/7-3/7=1/7$。若两个陪集份额相等，这个系数会变成零。 [`PsiA`、`wtA` 与 `CharsA`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/SplitInertia.lean#L24-L62) · [`Shares` 的定义](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L129-L151) · [`tops_sum` 如何推出平均值](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/TopsSum.lean#L75-L103)

选入的特征组成

$$
G_{m,A}(x)=\sum_{\psi\in K_p}w_A(c,\psi)\operatorname{Re}\mathrm{GPsi}(D,\ell,\psi,x).
$$

其余仍在 $\Psi_A$ 内的特征，用模控制可能的负贡献，记 $\Sigma_A(x)=\sum_{\psi\in\Psi_A\setminus K_p}|\mathrm{GPsi}(D,\ell,\psi,x)|$。继续用开头的小群想象，若只保留 $\psi_0$，其余留下的 $\psi_2$ 可能贡献 $-3$。即使原来的总贡献至多 $7$，$\psi_0$ 仍有可能贡献 $10$。因此 `sum_vv` 右边是 $G_{m,A}-\Sigma_A$，移项后上界必须加回 $\Sigma_A$。`one_char` 分平凡、选入的非平凡和未选入三种情形控制移动到 $x$ 的误差。对选入项用上述平均值，对未选入项用 $\operatorname{Re}z\ge-|z|$。`CharsA` 另有三条要求。平凡特征必须选入，$|\Psi_A|\le M$，而 $|\ell(\psi)|$ 的上界在选入的非平凡项用 $Ko$，在剩余项用 $CE\log x$。这些条件用于把相位误差与移动截断点的误差一起界住。 [`GmA` 和 `SigA`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/SplitInertia.lean#L28-L40) · [`sum_vv` 与 `one_char`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L183-L281)

## 从 `ch_core` 到实际使用的加权和

记 $Q=|TT|mb$，以及厚标签占比 $\delta_2=|T_2|/|H|$。`ch_core` 的核心一步是

$$
Q\,\frac{\delta_2}{2}
 \bigl(G_{m,A}(x)-\Sigma_A(x)-4x^{1/2+\varepsilon}\bigr)
 \;\le\; \mathrm{Err}+\frac{2Q}{x}.
$$

这里 $\mathrm{Err}$ 是对**每个**平移 $u\in A_0$ 的 `gapA` 上界。做平移平均时，$|A_0|$ 消去，$Q\delta_2/2$ 则保留下来。若 $\delta_2$ 很小，除以它会放大误差。`RestSize` 让 $\delta_2\ge x^{-\varepsilon}$，并给出 $m$ 和 $TT$ 基数的下界，从而可以用正的系数归一化。 [`core` 的平均与消去](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L283-L338) · [`ch_core` 代入 $G_{m,A}-\Sigma_A$](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L419-L442) · [`RestSize`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/SChain.lean#L50-L58)

误差括号有四项。用其中一项看指数怎样出现。令 $n=|H|$，把 $m(2n)mbx^\varepsilon$ 除以 $Q$，得到 $2(n/|TT|)mx^\varepsilon$。`RestSize` 给 $n/|TT|\le 2x^{\varepsilon/8}$，`ch_core` 的输入给 $m\le x^{1/2+\varepsilon/2}$，所以这一项至多 $4x^{1/2+13\varepsilon/8}$。`proposition_size_bound` 把四项合起来，归一化的误差括号至多 $10x^{1/2+13\varepsilon/8}$。随后除以 $\delta_2/2$，并用足够大的 $x$ 吸收固定常数。具体地，源码得到 $26x^{1/2+(C+21/8)\varepsilon}$，再用 $26\le x^{3\varepsilon/8}$ 把指数加到 $1/2+(C+3)\varepsilon$。 [`errorBracketSizeWindows`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ErrorFormsWeakWindowsFalse.lean#L128-L139) · [`proposition_size_bound` 的除法和指数](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/LipschitzWeightAndMinimum.lean#L507-L592)

**精确接口。** 先固定实数 $C,\varepsilon,CE,Ko,c,M$，满足 $C\ge0,\ \varepsilon>0,\ |c|\le1$。`ch_core` 给出 $x_1$。对每个 $x\ge x_1$，再取任意符合签名的有限交换群、算术数据、索引和权重。它要求 `HostFactsS`（分歧与分裂条件）、$b>0,\ a_E\ge0,\ k>0,\ m\le x^{1/2+\varepsilon/2},\ xm\le k$，以及 `SizesA`、`ThinScales`、`CostWindows`、`RestSize`、$T_2\subseteq A_0$ 和 `CharsA`。其中 $a_E$ 是误差预算标量，$k$ 是预算公式中的尺度参数。最后一项假设是对每个 $u\in A_0$，$\mathrm{gapA}(u)\le x^{C\varepsilon}\,\mathrm{errorBracketSizeWindows}(x,\varepsilon,|H|,|TT|,|T_2|,m,b,k,a_E)$。结论是

$$
G_{m,A}(x)\le x^{1/2+(C+3)\varepsilon}+\Sigma_A(x).
$$

门槛 $x_1$ 先于这些随 $x$ 变化的数据选定。 [`ch_core` 声明与门槛选择](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChCore.lean#L342-L370)

实际要交给解析步骤的对象是 `Level.Gm`。一个 `Level` $\Lambda$ 携带有限个本原 Dirichlet 特征 `KEPT`、一个自然数 $o$，以及可选的指定特征 `psK`。在 `Level.Gm` 中，平凡特征的 $G_z$ 和指定特征若存在的贡献都取权重 $1$，其余取 $1/(3o+1)$。`gmA_eq` 逐项识别群特征和本原特征。它验证宿主读取映射的像恰为 `KEPT`，并检查单射、权重和 `GPsi` 数值，得到对每个 $y$ 的等式 $G_{m,A}(y)=\Lambda.\mathrm{Gm}(y)$。 [`Level.Gm` 与权重](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L8-L38) · [`gmA_eq` 的求和换元](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/GmAEq.lean#L61-L149)

`sigA_le` 单独控制余项。`prim_read` 先把余项中的 `GPsi` 换成本原特征对应的 `gChi`，`chr_bounded` 验证它属于宿主有上界的特征类，`EAtH.bdG` 再对每项给出 $x^{1/2+\varepsilon}$ 的界。`PsiA` 是 $E_0\times(H/A_0)$ 上的特征提升回来的集合，在当前框架里恰有 $4o$ 个元素。故 $\Sigma_A\le4o\,x^{1/2+\varepsilon}$。这是需要宿主提供的逐项上界，子群平均只解释哪些项留下。 [`EAtH` 的字段](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L144-L151) · [`card_PsiA`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/CardPsiA.lean#L27-L63) · [`sigA_le`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/SigALe.lean#L38-L60)

`core_gm` 合并这些输入。源码把 `ch_top` 的误差系数压到 $C=e_D+e_L+3$，应用 `ch_core` 后首项成为 $x^{1/2+(e_D+e_L+6)\varepsilon}$。两项相加至多是这一首项乘以 $1+4o$。因为 $\varepsilon>0$，可以加大门槛，使 $x^\varepsilon\ge1+4o$，最终得到

$$
\Lambda.\mathrm{Gm}(x)\le x^{1/2+(e_D+e_L+7)\varepsilon}.
$$

其精确顺序是对每个 $\Lambda,e_D,e_L,K,c_{\rm HH},e_K,C_E,\varepsilon$ 且 $\varepsilon>0$，存在 $x_1$，对所有 $x\ge x_1$ 和所有框架、宿主 `HostAx` 与 $TT$，若 `EAtH` 和 `CoreAtH` 成立，则有此上界。`CoreAtH` 提供上文需要的计数误差、尺度和兼容性见证，其中 $e_D,e_L$ 分别上界记录里的两个损失系数。 [`CoreAtH` 的见证](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreAtH.lean#L29-L41) · [`CErr` 的定义](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ErrorFormsWeakWindowsFalse.lean#L19) · [`core_gm` 及吸收常数](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreGm.lean#L12-L74)

## 从逐点估计到解析可用的整段窗口

逐点上界到这里已经具备所需的形状。接下来必须让它在一整段尺度上同时适用。源码把所需的三个输入放到 `level_of_tiedWin` 的三个参数里。

1. **窗口点上的估计。** `level_gm_le_on_family_scales` 固定 $\Lambda$。对任意 $e_D,e_L$ 和正的 $\varepsilon$，再取对象族 $Fm$。若 `EFamC` 和 `ChebyshevInequalityOnFamilyWindows` 成立，则存在 $x_1$，使上式对每个 $x\ge x_1$ 且 $x\in Fm.\mathrm{Win}$ 成立。前一假设给足够大的 $x$ 处所有族指标的 `EAtH`，后一假设给统一的 $K,c_{\rm HH},e_K,CL,x_0$，使每个 $x\ge x_0$ 的窗口点都有 `ChainTied`。`tiedCore_of_chainTied` 从这个见证挑出一个族指标，给它装配 `CoreAtH`。这个指标同时已有 `EAtH`，因此能调用 `core_gm`。 [`tiedCore_of_chainTied` 和实际定理](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/LevelGmLeOnFamilyScales.lean#L13-L30) · [`windowInequality_of_artinInputs`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/WindowInequalityOfArtinInputs.lean#L17-L25) · [`EFamC`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopDefs.lean#L13-L16)
2. **族存在且覆盖整段。** `ChebyshevInequalityAtWindowScale` 先固定 $e_D,e_L,\varepsilon_1$，其中 $\varepsilon_1>0$。每选 $0<\varepsilon<\varepsilon_1$，必须有一个**同一**对象族同时满足 `EFamC`、上述 `ChainTied` 的窗口条件和 `Windows λ`。后者展开为 $\forall Y_0\in\mathbb R,\ \exists Y\ge Y_0,\ \forall x\in[Y,Y^\lambda],\ x\in Fm.\mathrm{Win}$。比如 $\lambda=3/2$、$Y=100$ 对应整段 $[100,1000]$。只有 $100,1000$ 两个端点满足估计，$x=500$ 处便缺少所需证据。固定门槛可以通过要求 $Y_0$ 更大来避开。 [`ChebyshevInequalityAtWindowScale`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L23-L32) · [`HasWindows` 与提高门槛](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Window.lean#L7-L15)
3. **解析判据。** `FormBAt λ` 对每个 $0<\beta<1$，把 $\Lambda.\mathrm{Gm}(x)\le x^\beta$ 在任意高处整段窗口上的成立，变成 `KEPT` 中**每个**特征的 $L(s,\chi)$ 在 $\operatorname{Re}s>\beta$ 无零。`formB` 对每个 $\lambda>1$ 提供这个判据。其代码另走一条路。`level_family` 把 `KEPT` 做成 `Deduction.CharFamily`，逐项权重严格为正，验证两个加权和相等及两种无零命题等价。再把 $\delta=\lambda-1$、乘数 $1$ 传给 `zeroFree_of_rpow_window`。这是与第 1 章解析论证的连接。 [`FormBAt` 的声明](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/Window.lean#L24-L33) · [`level_family` 的构造与等价](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/LevelFamily.lean#L8-L52) · [`formB` 的调用](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/Imports.lean#L8-L19) · [`zeroFree_of_rpow_window`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ZeroFreeOfRpowWindow.lean#L11-L14)

把这三个输入连起来，做一次参数选择。设待排除点的实部为 $\sigma>1/2$。令 $d=\min(\sigma-1/2,1/2)$，选择 $\beta=1/2+d/2$。它满足 $0<\beta<1$ 和 $\beta<\sigma$。再从已经固定的 $e_D,e_L,\varepsilon_1$ 选 $0<\varepsilon<\varepsilon_1$，使 $(e_D+e_L+7)\varepsilon\le d/2$。例如 $\sigma=0.6$、$e_D+e_L+7=10$、$\varepsilon_1=0.01$ 时，可取 $\beta=0.55$ 和 $\varepsilon=0.004$。逐点估计的指数为 $0.54$，在 $x\ge1$ 上有 $x^{0.54}\le x^{0.55}$。若改选 $\varepsilon=0.02$，指数升到 $0.70$，而且已超出对象族的存在范围。源码用 $\min(\varepsilon_1/2,(d/2)/(|e_D+e_L+7|+1))$ 给出一个统一可行的选择。然后取 $Y\ge\max(Y_0,x_1,1)$，在整段窗口上传递不等式，最后把 $\beta<\sigma$ 交给无零结论。 [`exists_small_eps` 与 `level_of_tiedWin`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/TopWin.lean#L59-L81)

**上游要兑现的条件。** `zeroFreeAll_of_topG` 对每个目标本原特征 $\psi$ 用 `Level.cyc ψ`，其中保留集包含 $\psi$。它把上面第一、第三项传给 `zeroFreeOn_of_tiedWin_cyc`，再以 `TopG`、针对目标特征的 `HostExW` 和从 `GChi` 类取出的条件组装第二项。实际调用 `zero_free_all_of_green_v_win` 选的是 $\lambda=3/2$。后续章节会追 `CoreAtH` 的误差和归一化输入，以及对象族如何同时提供 `EAtH`、`ChainTied` 与完整窗口。本章的证据范围是固定版的源码走读，局部内核重检为 NOT RUN。 [`cyc` 与成员关系](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/RamificationFrobenius/TotientGaloisClasses/ExplicitFormulaErrorOfHostConditions.lean#L105-L124) · [`zeroFreeAll_of_topG`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/CharacterBoxes/ZeroFreeAllOfTopG.lean#L12-L34) · [实际使用的窗口指数](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopPlug.lean#L12-L18)

**自检。** 设某份数据在每个大窗口点都给出 `gapA` 的上界，并满足 `ch_core` 的其余输入，但在当前 $x$ 缺少对 $K_p$ 外特征的逐项模估计。写出 `ch_core` 能得到的结论，指出还缺哪条界。再假定这条界也补齐，只知道 $\mathrm{Win}$ 含任意大的整数。能否调用 `formB`？

第一问需保留 $+\Sigma_A$。还需逐项估计 $\Psi_A\setminus K_p$ 里的模，才能按源码吸收余项。第二问还需要实区间的覆盖，因为整数点之间也有待估计的尺度。
