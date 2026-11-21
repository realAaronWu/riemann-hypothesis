# 第 4 章　从 CM 周期到几何主项

第 2 章的 `gapA` 要从一个素数和里减去解析主项。第 3 章用于给这个差设上界的几何不等式，也有一个主项，其中却出现了周期。两边怎样用到同一个 $L$ 函数的对数导数？差别藏在一个很具体的地方。椭圆曲线的周期由虚二次域 $K$ 给出，几何估计里的线格还带有较大的宿主数域 $E$ 的算术数据。

## 先量一次面积

取周期格 $\Lambda=\mathbf Z+3i\mathbf Z$。基向量 $1$ 与 $3i$ 张成一个面积为 $3$ 的长方形。把格乘以 $2$，两条边都加倍，面积变成 $12$，所以 $\log(\mathrm{area}/\pi)$ 增加 $\log(12/3)=2\log 2$。复环面 $\mathbf C/\Lambda$ 与 $\mathbf C/(2\Lambda)$ 同构，但选定坐标下的面积有这个差值。故使用周期公式时，必须核对格的缩放和采用的度量。[背景二的余体积例子](background/02-arithmetic.md)

实际代码取虚二次域 $K=\mathbf Q(\sqrt{-d})$，判别式为 $-d$。**CM** 指复乘，这里可把曲线的周期格想成 $K$ 的一个理想嵌入复平面后再缩放得到的格。缩放固定下来之后，逐个复嵌入读取曲线的共轭周期格。记 $\gamma$ 为欧拉常数，令 $\lambda_d=\Re (L'(1,\chi_d)/L(1,\chi_d))$，其中 $\chi_d$ 是 $K$ 的二次特征。Chowla–Selberg 给出这个面积平均，右边正是曲线侧 `logOmCurve` 的表达式。

$$
\ell_K=\gamma+\log(2\pi/\sqrt d)-\lambda_d .
$$

这里的平均是先取 $\log(\mathrm{area}/\pi)$，再对所有复嵌入求平均。对各嵌入的面积先求平均再取对数，会得到另一个量。[曲线与宿主常数的定义](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/BlockTheory/HeightDefect/LinePeriodExponential.lean#L13-L32) · [共轭周期面积平均](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/Proofs/FoundationProofs/MeanLogPeriodConjugatesEqChowlaSelberg.lean#L175-L202)

## 为什么宿主只扣一次对数差

宿主的根判别式 $`r_E=|\mathrm{disc}\,E|^{1/[E:\mathbf Q]}`$ 把判别式换算为每个嵌入的尺度。写 $v=r_E/2$，则宿主的周期常数是

```math
\ell_E=\gamma+\log(\pi/v)-\lambda_d
       =\ell_K-\log(r_E/\sqrt d).
```

`IsLogOmEta` 也显式减去这一项。它先在 $K$ 的理想类上平均 $`\log(4\pi\Im \tau\,|\eta(\tau)|^4)`$。这里的 $\tau$ 是该类格的形状，$`\eta`$ 是 Dedekind eta 函数。这个定义写出了修正的方向。要验证宿主线格里真的只有一份修正，还要看那条线的有限指数。[宿主尺度的定义](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/LocalRingCardinality/DataHost.lean#L140-L145) · [`logOmVal_eq` 的换算](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/BlockTheory/GlobalSignature/MeanPeriodLogarithms.lean#L11-L25) · [`IsLogOmEta` 的修正](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/BlockTheory/CMModuli/EllipticFibrePrincipalData.lean#L19-L27)

在源码的宿主数据中，$`\mathfrak D_{E/K}`$ 是相对不同理想，记录 $E/K$ 的分歧，并通过范数进入判别式公式。它分解为 $\mathfrak b\overline{\mathfrak b}$，代码选择 $\mathfrak A_0=\mathfrak b^{-1}$。设 $B=N(\mathfrak A_0\mathfrak D_{E/K})$，其中 $N$ 取绝对理想范数。因为 $\mathfrak A_0$ 抵消一个因子，且共轭理想的范数相同，$`B^2=N(\mathfrak D_{E/K})`$。`br_meanLogOm_eq` 从面积平均里扣掉 $(2/[E:\mathbf Q])\log B$，`two_log_brN` 证明这恰好是 $\log(r_E/\sqrt d)$。[逆理想的选择](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/LocalRingCardinality/DataHost.lean#L149-L157) · [宿主的不同理想分解](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/LocalToGlobal/GlobalTheory/GL3/CubicFields/PeriodRelations/LeadingConstantNeZero.lean#L85-L86) · [范数平方与判别式公式](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/LocalToGlobal/GlobalTheory/GL3/CubicFields/DifferentIdeal/AbsNormInvMulDifferent.lean#L15-L43) · [有限项与面积项](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/LocalToGlobal/GlobalTheory/GL3/CubicFields/PeriodRelations/Period.lean#L39-L45) · [`two_log_brN`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/MeanLogPeriodChowlaSelberg.lean#L17-L56)

用一组数验算系数。假设 $[E:\mathbf Q]=4$、$`r_E/\sqrt d=2`$，只代入公式查看算术，不要求构造这样的宿主。判别式公式给 $N(\mathfrak D_{E/K})=2^4=16$，所以 $B=4$，扣掉的是 $(2/4)\log 4=\log 2$。若把 $B$ 当成相对不同理想本身的范数，就会扣 $(2/4)\log16=2\log2$，让宿主周期少 $\log 2$。这份差会乘上几何主项的规模系数。

## 从同一个导数得到两个主项

在几何记录 `SizeData₂.MAIN u` 中，$`j`$ 枚举提升步，$`m`$ 是步数。对一个顶部标签 $t$ 写 $a=a_T(t)$，$`T(u)`$ 是所选词 $u$ 的水平参数。该标签的贡献是

$$
m\bigl(a\log a-a-a\ell_E\bigr)-a\log T(u).
$$

代入 $\ell_E$，每步括号变成 $a(\log a-1-\gamma+\lambda_d-\log(\pi/v))$。这解释了为什么几何式里周期前面是负号，而展开后导数项带正号。若误用 $\ell_K=\ell_E+\log 2$，上述玩具参数下取 $m=3,a=5$，几何主项对这个标签就少 $15\log 2$。[`SizeData₂.logOm` 与几何 `MAIN`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/LocalRingCardinality/DataParams₂.lean#L224-L234)

解析侧 `ASK` 对惰性素数的截断贡献乘 $2\log p$，并单列分歧素数 $d$。解析的 `MAIN` 对每个 $(j,t)$ 使用 $`a(\log a-1-\gamma+\lambda_d-\mathrm{avg}_{\rho}\log w_{j,\rho})`$，其中 $w_{j,\rho}$ 是第 2 章的权重。代码称这份求和的记录版为 `MainC`，共用比较记录中的对应定义为 `Data.Main`。解析侧保留权重对数，几何侧保留宿主尺度与 $`T(u)`$。每一步有两个带宿主尺度的对数，它们消去之后才和解析主项对齐：

```math
-a\log(\pi/v)-a\mathrm{avg}_{\rho}\log(w_{j,\rho}v/\pi)
=-a\mathrm{avg}_{\rho}\log w_{j,\rho}.
```

这条等式只识别主项。之后还要用独立的计数下界去控制有限增益，才能得到不等式。

`data_DIV` 把几何不等式送入比较记录。在 `key_identity5` 里，几何主项的周期部分先保留在 `SDiv`。处理 $\log T(u)$ 的下界时，从 `SDiv` 中减去含有 $`\mathrm{avg}_{\rho}\log(w_{j,\rho}v/\pi)`$ 的计数项。拆开它，每步多出 $-a\log(v/\pi)$，正好消去几何式中的 $-a\log(\pi/v)$，留下 $`-a\mathrm{avg}_{\rho}\log w_{j,\rho}`$。`Ga_bound5` 用这个恒等式把有限增益 `Ga` 控制在 `Data.Main` 加余量之内。随后 `ch_top_main_eq` 依据 `IdentU` 逐项对齐解析主项，`ch_top` 把比较界转成 $\mathrm{gapA}(u)=\mathrm{ASK}(u)-\mathrm{Main}(u)$ 的上界。[算术 `ASK` 与 `MainC`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/Divisibility/LocalQuadraticParts.lean#L466-L479) · [解析侧逐项公式](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/FirstPrimeNeSecondPrime.lean#L72-L91) · [计数项与 `key_identity5`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/LevelOfCongruence.lean#L17-L27) · [`Ga_bound5` 使用恒等式](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SizeWindowBrackets/ChainSlopeWindows/LevelOfCongruence.lean#L105-L128) · [`data_DIV` 的重写](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/QuadraticLogDerivCongr.lean#L580-L591) · [`ch_top` 的识别与差值上界](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/DedekindLFunctions/LandauTheorems/ChTop.lean#L11-L54)

**自检。** 若只把几何式的 $\ell_E$ 增加 $\log2$，在 $m=3,a=5$ 时，两侧主项各改变多少？几何主项减少 $15\log2$，解析主项仍由原来的特征导数和权重给定。要重做的是依赖几何式的比较，解析端的权重平均无需随之重定义。

第一次读可以停在这里，转到[第 5 章](05-families.md)。下一章用的是满足前面条件的对象族。这个周期换算只确认计数比较使用的主项如何对齐，还要另行取得构造用的余体积估计。

## 进阶：沿源码复核这条等式

1. **从面积到线格。** `logMet` 取 $\log(\pi|\rho(s)|^2/\mathrm{area}(\rho\Lambda))$。`meanLogOm` 用两倍的有限指数对数减去各嵌入的 `logMet` 之和，再除以 $[M:\mathbf Q]$。`br_meanLogOm_eq` 用主子格的指数与生成元范数的关系，消掉生成元 $s$。`meanPeriodAt` 再用 `mean_log_period` 把面积平均换成 $\ell_K$，以 `two_log_brN` 扣去 $\log(r_E/\sqrt d)$，得到 $\ell_E$。[度量与平均的定义](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/GeneralLinearActions/IsDiscriminantTwelfthRootOfIdealLattice.lean#L153-L165) · [消去生成元的推导](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/LocalToGlobal/GlobalTheory/GL3/CubicFields/PeriodRelations/Period.lean#L46-L93) · [`meanPeriodAt` 的重写](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/MeanLogPeriodChowlaSelberg.lean#L58-L85)
2. **接口及实际消费。** 对由合格理想和判别式十二次根构造的 $T=\mathrm{tor0}(D,cc,\delta)$，`MeanPeriodAt` 与 `per22 D T` 有同一个结论。对每个容纳所需嵌入和值的数域 $M$ 以及每个标记宿主选定嵌入的 $\tau$，线格的 `meanLogOm` 等于 $\ell_E$。另一接口 `OmLink` 给出某个这样的 $M$，把记录 `D.gx.logOmMean τ` 识别为该线格的 `meanLogOm`。`omValue_of` 将两条等式串起来得到 `GlobalExtra.OmValue`。可直接定位的一处调用是 `kerSide_chainS`，它把 `meanLogPeriod_chowlaSelberg` 交给范数界，并用 `mean_logMetric_generator_eq_meanPeriod` 兑现 `kerSide_of_meansS` 所需的平均值。[两个周期命题](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/BlockTheory/GlobalSignature/MeanPeriodLogarithms.lean#L11-L17) · [`per22` 的量词](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/TaylorLogMetric.lean#L18-L20) · [`OmLink` 到 `OmValue`](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/GlobalSchurBounds/Joints.lean#L545-L557) · [对象族上的周期条件](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Formalism/SharpRestriction/Divisibility/WeightFamilies.lean#L486-L495) · [链范数的输入](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/KernelHalfChainNumbersAnyLevelPrime.lean#L219-L228) · [平均值的实际使用](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AbelianVarietyTheory/Proofs/DivisorProofs/KernelHalfChainNumbersAnyLevelPrime.lean#L315-L325)
3. **族构造中的另一项输入。** `CovolumeBoundOfX` 给统一常数门槛，使充分大尺度下对象族各点满足 `L3` 余体积界。`every_character_of_literature_of_vWin` 把 `topCovolSlim2_use_alt_alt` 的结论传入后续构造。`nonempty_hyps_definite_side_of_closed_bound` 用这项界组装 `linked_bundles_l3_of_open_alt`，然后得到定号侧假设的存在性。这里消费的是一个族上的不等式，周期等式则把线格的平均值固定到解析公式。[余体积界的量词](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/LiftLambdaBound.lean#L60-L63) · [上层调用](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/EveryCharacterOfLiteratureOfVWin.lean#L810-L813) · [族构造读取该界](https://github.com/leanprover-community/riemann-hypothesis/blob/40e56bab026552e089d7afcfeff08d2defb9c005/src/Development/AutomorphicArithmetic/ThetaCorrespondence/ThetaPairLifts/ThirdPlaceSeries/SiegelEisensteinSecondTermHypotheses.lean#L63-L73)

本章按固定提交核对公式与上列调用点。从 `Main` 追出的编译后常量级依赖，以及本章等式的本地 Lean 内核重检，均为 NOT RUN。
