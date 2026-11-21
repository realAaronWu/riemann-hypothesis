# 误差怎么保住平方根指数

[第 2 章](02-comparison.md)把计数差 `gapA` 转成加权素数和的上界。那一步需要在每个平移位置都有计数差的单边上界。本章从这个要求倒着问：原来的计数差是许多项之和，为什么除去共同的计数规模之后，误差还能接近平方根量级？

## 先算一次除法

固定尺度 $x$。计数差对 $TT$ 中的标签和 $m$ 个提升编号求和。记 $n_T=|TT|$，再记共同的权重尺度为 $b>0$。归一化时除以 $Q=n_Tmb$。误差的一项是 $n_Ta_E$，其中 $a_E$ 是长度型预算，装配时取记录中的 `Dd.a`。源码取 $a_E=xb$，于是

$$
\frac{n_Ta_E}{Q}=\frac{x}{m}.
$$

例如，取 $x=10^4$、$`b=100`$、$`n_T=400`$ 和 $m=100$。分子是 $400\times 10^6$，分母是 $400\times100\times100$，所得是 $100=\sqrt{x}$。这是代数算例。实际记录的 $b=\exp(x^\varepsilon)$，同一个 $b$ 仍会在除法中消去。 [`linkCore` 中的长度选择](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/LossesSmallShares.lean#L103-L125) · [`T1` 的长度项估计](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/LipschitzWeightAndMinimum.lean#L31-L39)

这个除法也说明 $m$ 的选择为什么重要。若其余数值照旧，只取 $m=1$，则归一化后是 $10^4$。把 $m$ 增大能压低这一项，但稍后会遇到随 $m$ 增大的误差。源码留出一个带小余量的范围。先固定 $\varepsilon>0$，再要求

$$
x^{1/2-\varepsilon}\le m\le x^{1/2+\varepsilon/2}.
$$

左边保证 $x/m\le x^{1/2+\varepsilon}$。右边用来控制随 $m$ 增大的项。同一个 $m$ 要满足两个方向的要求。 [`RestSize` 中的下界](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/SChain.lean#L53-L58) · [`ErrWindows0` 中的上界](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ErrorFormsWeakWindowsFalse.lean#L28-L41)

## 计数差的两道估计

固定一个平移位置 $u_0$。格和计数数据都写入同一份记录 `Dd`。`each_unit_bound_statement` 给出

$$
\mathrm{ASK}(u_0)\le \mathrm{Main}(u_0)+\mathrm{ErrX5at}(u_0).
$$

这里的 `ErrX5at` 是对这个位置的细项误差。第一道估计用各条算术不等式解释它为什么能界住差。第二道 `errX5at_le` 检查各项的大小，得到

```math
\mathrm{ErrX5at}(u_0)\le
 x^{(C.\mathrm{eDiv}+C.\mathrm{eLoss}+3)\varepsilon}\,\mathrm{ErrText}.
```

$C$ 是存常数和指数参数的记录。`ErrText` 是由所有位置共用的四个预算项之和。两个幂系数 `C.eDiv`、`C.eLoss` 分别来自整除估计和局部损失估计。`ch_top` 接起这两道估计，再用 `BNBoundsU` 把 `ErrText` 写成第 2 章需要的显式括号上界。 [`PointwiseBoundVariant`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/QuotientSlopeBoundsWith.lean#L45-L75) · [`errX5at_le`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/PChain.lean#L613-L672) · [`ch_top` 接起两道估计](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChTop.lean#L37-L72)

第一道估计可以从中间量 `Ga` 看懂。`Ga` 按素位点把各次提升的局部增益加起来，并减去局部扣减。写 `ASK − Main = (ASK − Ga) + (Ga − Main)`。第一个差由 `LossBounds` 控制。第二个差用格的斜率估计，并用 `LossBounds` 的另一条界处理其中一个局部加权和。斜率是把度数除以秩得到的大小指标。它为何同时读到素数处和度量处的信息，可先读[格的大小背景](background/02-arithmetic.md)。在 `each_unit_bound_statement` 中，`Ga_bound5` 提供 `Ga` 的上界，`weighted_mean_lower_bound_le` 及 `LossBounds` 代入剩余两处，最后合成逐位置的界。 [`Ga` 的定义](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/LocalRingCardinality/DataParams%E2%82%82.lean#L212-L230) · [`LossBounds` 的两条不等式和 `ErrX5at`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/QuotientSlopeBoundsWith.lean#L34-L54) · [`each_unit_bound_statement` 的三步](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/LevelOfCongruence.lean#L162-L197)

## 小误差乘上大尺度之后

`Ga` 的斜率估计会用到 `Frame_at`。可以把它看作这么一个比较。先对各个格的斜率减去高度校正，再按秩取平均。`Frame_at` 用这个平均值给共同对偶格的斜率一个下界。要从平均值中扣除若干项，其中一项含有 $(\eta+4\sqrt{e})HH$。$`\eta,e`$ 是此位置的非负误差参数，$`HH`$ 是一个正的上界尺度。只有控制乘积，才能控制这个扣减。 [`sFrame`、`uFrame` 的定义](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/LocalRingCardinality/DataArith.lean#L123-L135) · [`Frame_at` 的下界](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/QuadraticLogDerivCongr.lean#L188-L193)

在装配好的记录里，$`HH=x^{C_H}b`$。跨位置的统一误差上限记作 $\bar\eta,\bar e$。`FrameF` 在每个足够大的 $x$ 给出同一对上限，并要求 $(\bar\eta+4\sqrt{\bar e})x^{C_H}\le6$。乘以 $b$ 后，需支付的量至多 $6b$，可以纳入 `ErrWindows` 要求的 $Kx^\varepsilon n_Ta_E$。这一步用 $K\ge6$、$`x^\varepsilon\ge1`$ 和 $b\le n_Ta_E$。上游的 `LinkS` 控制不同块相互作用的平方范数、对角块偏离恒等算子的平方范数以及总维数。它给这三种控制中的误差参数指数衰减的上界。这个输入还要经过秩缺失和格的比较，才能得到 `FrameF` 的乘积界。 [`LinkS_at`、`LinkS`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalTheoremInputs.lean#L142-L156) · [`FrameF` 的统一上界](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/QuadraticLogDerivCongr.lean#L258-L267) · [`linkCore` 把乘积界写入 `ErrWindows`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/LossesSmallShares.lean#L219-L248)

**如果只限制误差参数本身呢？** 源码有一个可手算的反例。取 $x=10^5$、$`\varepsilon=1`$、$`C_H=10`$、$`b=1`$、$`\bar\eta=1`$、$`\bar e=0`$。误差参数都至多 $1$，乘积却是 $x^{10}=10^{50}$。源码的模型还取 $n_T=m=1$、$`a_E=k=x`$、$`B_0=N_c=1`$，于是 `ErrText` 恰为 $x(1+1/x)+2=100003$。当两个幂损失系数都等于 $1$，目标上界只有 $x^5\cdot100003<10^{31}$。`error_sizes_weak_false` 用这个数据反驳以 `ErrWindowsWeak` 代替 `ErrWindows` 后的**平均误差公式** `errorTermWith`。这里检验的是抽象误差命题。 [`弱条件与目标式`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ErrorFormsWeakWindowsFalse.lean#L43-L70) · [`modelD` 和 `error_sizes_weak_false`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/SubThreeMulLogTwoLe.lean#L405-L488)

主路线的两个固定损失系数是 $e_D=2,e_L=0$，加上后续换算的 $7\varepsilon$，得到指数 $1/2+9\varepsilon$。系数固定后，再回到第 1 章按候选零点的实部选择 $\varepsilon$。

**先做一题。** 若共同尺度为 $Q=100$，未归一化的误差为 $350$，交给比较步骤的是多少？答案是 $350/100=3.5$。若同时要除去一个只有 $1/4$ 的有效份额，界会放大到 $14$。所以 $Q>0$ 与份额有下界分别承担不同任务。

第一次读到这里，可以接着看[第 4 章](04-periods.md)的周期例子。现在要带走的是：把计数差除以主规模以后，仍要给每个误差单独留空间。单说某个原始误差「很小」无法完成这一比较。

## 进阶核对一：四项预算和指数

`ErrText` 写成 $n_Ta_E(1+m^2/k)+m(B_0+N_c)$。$`k`$ 是尺度记录中的参数。$`B_0,N_c`$ 分别记录整体大小预算和厚标签相关的秩预算。`ErrX5at` 则是前面逐位置得到的误差公式。`BNBoundsU` 分别用群大小 $n=|H|$ 和厚标签数 $n_2=|T_2|$ 写出上界。下面逐项代入，再除以 $Q=n_Tmb>0$。 [`ErrText` 和显式括号](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ErrorFormsWeakWindowsFalse.lean#L16-L19) · [`BNBoundsU`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/SplitInertia.lean#L74-L77)

| 括号中的来源 | 替换预算并除以 $Q$ 后 | 所需尺度及所得上界 |
| --- | --- | --- |
| $n_Ta_E$ | $a_E/(mb)$ | $a_E\le2xb$、$`m\ge x^{1/2-\varepsilon}`$，给 $2x^{1/2+\varepsilon}$ |
| $n_Ta_E m^2/k$ | $a_E m/(bk)$ | $a_E\le2xb$、$`k\ge xm`$，给 $2$ |
| $mB_0$ | $2(n/n_T)mx^\varepsilon$ | $`n/n_T\le2x^{\varepsilon/8}`$、$`m\le x^{1/2+\varepsilon/2}`$，给 $4x^{1/2+13\varepsilon/8}$ |
| $mN_c$ | $(n_2/n_T)(k/n^2)x^{2\varepsilon}$ | $n_2\le n$、$`n/n_T\le2x^{\varepsilon/8}`$、$`k/n^2\le x^{1/2-\varepsilon}`$，给 $2x^{1/2+9\varepsilon/8}$ |

最后一行的第二个 $x^\varepsilon$ 来自分母的 $x^{-\varepsilon}$。表中的四个上界统一到 $Y=x^{1/2+13\varepsilon/8}$，相加得 $10Y$。这里用了厚标签数的**上界**。第 2 章再除以厚标签占比时，需要这个占比的**下界**。 [`T1`–`T4` 的逐项代数](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/LipschitzWeightAndMinimum.lean#L31-L113) · [合计与厚标签占比](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/LipschitzWeightAndMinimum.lean#L527-L558)

还要把这四项乘以前一道给出的幂。令 $y=x^\varepsilon$，`errX5at_le` 调用 `core_ineq` 时先用 $`P=x^{C.\mathrm{eDiv}\varepsilon}x^{C.\mathrm{eLoss}\varepsilon}y\,\mathrm{ErrText}`$ 界住细项的基本规模，带对数的格误差再用一个 $y$，固定系数用 `LargeX` 的另一个 $y$ 吸收。`LargeX` 要求 $\log x\le y$ 并要求 $200(1+K)^2(1+C.\mathrm{cHH})(1+e_K)\le y$。其中 $K$ 约束误差系数，$`C.\mathrm{cHH}`$ 控制格比较尺度的幂，$`e_K`$ 满足 $k\le x^{e_K}$。这些参数和两种幂损失是不同的量。 [`LargeX` 和 `ErrWindows0`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ErrorFormsWeakWindowsFalse.lean#L21-L58) · [`core_ineq` 定义 `P`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/SubThreeMulLogTwoLe.lean#L46-L84) · [对数与最后的系数](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/SubThreeMulLogTwoLe.lean#L157-L207)

给定上界 $C.\mathrm{eDiv}\le e_D$ 和 $C.\mathrm{eLoss}\le e_L$，`core_gm` 把括号前的幂系数放宽为 $e_D+e_L+3$。[第 2 章](02-comparison.md)接着用 `ch_core` 完成归一化、厚标签占比的除法和常数吸收，合计再加 $3\varepsilon$。最后吸收未选中特征的估计，再加 $\varepsilon$。因此加权和 $\Lambda.\mathrm{Gm}(x)$ 的指数是 $1/2+(e_D+e_L+7)\varepsilon$。 [`core_gm` 的幂比较和最终指数](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreGm.lean#L30-L74)

## 进阶核对二：数据怎样对齐

- **从斜率下界读到记录。** `linkGLOBAL7_items` 把 `LinkS` 与整除、满秩、码和其他输入送入 `frameRealF_of''`、`frameF_of`。对每个够大的 $x$，先有共享的 $\bar\eta,\bar e$，再对每个位置选 `Frame_at` 的 $\eta(u_0),e(u_0)$。这对数先选，随后其不等式对每个满足假设的 $`HH`$ 成立。`linkCore` 将逐位置的见证交给 `data_SlopeIneq`，由 `FParams` 保存误差参数的界，再用 `HHBound` 给出所需的 $`HH=x^{C_H}b`$。 [`LinkS` 到 `FrameF` 的调用](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/LinkMin.lean#L701-L721) · [`data_SlopeIneq`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/QuadraticLogDerivCongr.lean#L687-L711) · [`linkCore` 的逐位置见证及参数界](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/LossesSmallShares.lean#L86-L101)
- **让各个平移共用同一批长度。** `Loss_at` 的两条界用同一个 $`C_{\mathrm{loss}}n_Tmb\,x^{e_L\varepsilon}`$。第一条控制 `IOsum`，即按有限素位点加权的局部贡献之和。第二条控制 `ASK − Ga`，要先核对长度、权重、宿主算术数据和截断。`LossFS` 在每个足够大的窗口点挑一对整值函数 `av,bv`，给出至少一个实现这对函数的记录，并对所有同样实现它们的记录提供 `Loss_at`。`coverS_carry` 再为每个平移选出使用同一对函数的记录。装配时选截断 $N=\lceil2a_E\rceil$，因为此处 $a(t)\le 2a_E$ 且允许的权重 $w\ge1$。`linkCore` 用这些事实把两条界填进 `LossBounds`。在实际顶层分支里 $e_L=0$，此时预算写成 $C_{\mathrm{loss}}Q$。 [`Loss_at` 的前提与结论](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/QuadraticLogDerivCongr.lean#L195-L209) · [`LossFS`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/LossesSmallShares.lean#L13-L21) · [`linkCore` 选记录、验证截断、填入损失界](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/LossesSmallShares.lean#L86-L138) · [填入 `LossBounds` 和 `FParams`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/LossesSmallShares.lean#L194-L211)
- **从对象族交给逐点定理。** `linkCore` 先给出统一的 $K,c_{\mathrm{HH}},e_K,CL,x_0$，再对每个 $x\ge x_0$ 且 $x\in Fm.\mathrm{Win}$ 装出 `ChainTied`。见证中有共享的 `Dd`、常数记录 $C$ 和索引识别等式。`SizeData₂` 把 `SlopeIneq`、`HHBound`、`FParams`、`LossBounds` 与其余算术界送给第一道估计。`ErrWindows` 交给第二道，`BNBounds` 和 `RestSize` 负责后面的括号替换与尺度归一化。`tiedCore_of_chainTied` 把这一组见证交给 `CoreAtH` 所需的族接口。 [`linkCore` 先选常数和门槛](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/LossesSmallShares.lean#L38-L61) · [`ChainTied` 字段](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/TieGlobal.lean#L97-L114) · [`SizeData₂` 的十一项](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/SChain.lean#L13-L20) · [`tiedCore_of_chainTied`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/LevelGmLeOnFamilyScales.lean#L13-L26)

**为什么先固定幂损失上限？** 顶层 `shape_closed_link_n_of_green` 给 `topDesWin` 的 $e_D,e_L$ 是 $2,0$。`link_gl` 用 `FamGLmin.link8` 接到刚才的装配分支。于是可以先选一个小的 $\varepsilon$，再找适合它的族和门槛。若允许 $e_D$ 随 $\varepsilon$ 变成 $1/\varepsilon$，则 $e_D\varepsilon=1$，再缩小 $\varepsilon$ 也排除不了那一个整幂的误差。`core_gm` 的门槛同样在随 $x$ 的记录被交入之前选好。 [`顶层固定参数`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/TopShape.lean#L33-L55) · [`topDesWin` 的选择次序](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/CharacterBoxes/DesWin.lean#L23-L31) · [`link_gl`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/Proofs/GlobalInterpolation/LinkGl.lean#L14-L31) · [`FamGLmin.link8`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/LogXLowerFamilyOfTheorems.lean#L56-L75) · [`core_gm` 先取门槛](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/PrimitiveCosets/CoreGm.lean#L12-L31)

**自检。** 假设 $m$ 加倍，$`x,n_T,b,k`$ 和其余预算参数固定。表中第一项和第三项各怎样变化？如果加倍前刚有 $k=xm$，第二项的上界会怎样？第一项减半，第三项加倍。加倍后的 $m$ 使 $`k\ge xm`$ 失效，因此第二项的上界 $2$ 缺少一个前提。用开头的数字，再取加倍前的 $k=10^6$ 和允许的 $a_E=2xb$，第二项从 $2$ 升到 $4$。

本章的证据是固定版源码的选定调用链，以及可手算的误差公式。`LinkS` 和局部损失估计的构造，本章追到它们在族装配中的输入接口。整份候选证明的内核复核状态见[版本与证据范围](../SOURCES.md)。
