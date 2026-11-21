window.proofAnnotations = {
  "nodes": {
    "riemannHypothesis": [
      "每个 ζ 的非平凡零点都满足 Re(s) = 1/2。这里的精确命题由 Mathlib 给出。",
      "原稿在 Main 中以这个名字交付最终定理，证明直接采用 rhOfAll。"
    ],
    "RiemannHypothesis": [
      "逐个考虑复数 s。若 ζ(s) = 0、s 不是负偶整数且 s ≠ 1，则 Re(s) = 1/2。",
      "提供终点的精确含义。沿蓝色节点的类型箭头可核对最后证明的是哪个命题。"
    ],
    "rhOfAll": [
      "把任意 Dirichlet 特征的右半平面无零结论 allChi 代入解析桥梁，得到 ζ 的全部非平凡零点位于临界线。",
      "在最终声明之前把算术部分的输出和解析部分的推论合在一起。"
    ],
    "allChi": [
      "对每个正模数 N 和模 N 的 Dirichlet 特征 χ，若 Re(s) > 1/2，则 L(χ,s) ≠ 0。这里排除了主特征在 s = 1 时的极点。",
      "把上游的完整无零结论交给 rh_of_every。经典黎曼猜想只需其中模数为 1 的情形。"
    ],
    "Formalism.VW.rh_of_every": [
      "假设所有 Dirichlet L 函数都有所需的右半平面无零结论。选择模 1 的主特征，用 L(χ,s) = ζ(s) 得到 ζ 的对应结论。",
      "把关于一族 L 函数的定理缩到 ζ，再交给 rh_of_right 处理临界线两侧。"
    ],
    "Formalism.VW.rh_of_right": [
      "假设 ζ 在 Re(s) > 1/2 且 s ≠ 1 时无零点。若某非平凡零点 s 在左侧，则其反射点 1−s 在右侧。函数方程把 ζ(s) 写成 ζ(1−s) 与其他非零因子的乘积，这与 ζ(s) = 0 矛盾。",
      "完成从右侧无零到临界线结论的最后推理。源码单独处理 s = 0、函数方程的例外和负偶整数。"
    ],
    "riemannZeta_one_sub": [
      "在 s ≠ 1 且 s 不是非正整数时，函数方程把 ζ(1−s) 写成 ζ(s) 乘以含伽马函数和余弦的显式因子。",
      "rh_of_right 对反射点 1−s 应用这个等式，用右侧的无零条件和各因子的非零性排除左侧的候选零点 s。"
    ],
    "DirichletCharacter.LFunction_modOne_eq": [
      "模 1 的 Dirichlet 特征只有一个，其延拓后的 L 函数与 ζ 是同一个函数。",
      "提供代换等式，使模 1 的无零结论成为 ζ 的右半平面无零结论。"
    ],
    "UpperTheory.FinalTheorems.everyCharacter": [
      "对任意正模数的 Dirichlet 特征 χ，L(χ,s) 在 Re(s) > 1/2 时非零，唯一排除的情形是 χ 为主特征且 s = 1。",
      "把 theta 提升所得的整体伽罗瓦表示定理代入 everyCharacter_of_row，得到 allChi 直接引用的结论。"
    ],
    "UpperTheory.FinalTheorems.everyCharacter_of_row": [
      "假定 Row0b，即指定的自守表示具有带局部相容条件的整体伽罗瓦表示，则所有 Dirichlet L 函数在右半平面满足 EveryCharacter。",
      "用同一份 Row0b 填入两项整体条件并推出窗口界 VWin，再用 recTExists 填入局部参数的存在性。"
    ],
    "UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter": [
      "对 CM 数域上满足正则代数性和极化条件的尖点表示，Row0b 给出连续半单的整体 ℓ 进伽罗瓦表示、权重，以及在指定局部条件下的参数比较。",
      "把源码已给出的 theta 提升 tLiftK 代入构造定理，为 everyCharacter_of_row 提供所需的 Row0b。"
    ],
    "UpperTheory.Gal.Int.galoisRepresentations_of_thetaLift": [
      "假定指定的 theta 提升成立，即可用 theta 积分在两个幺正群之间转移自守表示，并控制所得的权重及分裂处的局部参数。结合权重一的几何实现，得到整体伽罗瓦表示和局部相容性（Row0b）。",
      "这一步把 theta 提升转成整体伽罗瓦表示及局部相容性，上一层以 tLiftK 提供提升前提。"
    ],
    "UpperTheory.Zero.LLC.recTExists": [
      "在数域的每个指定有限处，存在把局部一般线性群的不可约表示送到 Weil–Deligne 参数的映射，满足 IsRecT 所列的维数、秩一 Artin 互反等规则。",
      "从尖点表示的参数赋值延拓出局部参数映射，填入全局装配所需的独立存在性条件。"
    ],
    "UpperTheory.One.vwin_of_row": [
      "从整体伽罗瓦相容性（Row0b）得到 VWin。对每个本原特征和足够小的 ε，可以找到整段 [Y, Y²]。在其中的每个尺度 x，指定数域中局部限制为零的伽罗瓦上同调群有有限长度，各素数处的长度按 log p 加权求和，可用 exp(x^ε/2) 统一控制。",
      "把整体相容性和由它导出的基变换条件交给窗口定理。下游 supplyChi 利用这一界，经尺度换算，在新的窗口 [Z, Z^(3/2)] 中选择算术数据。"
    ],
    "UpperTheory.One.Join.automorphic_window_of_inputs": [
      "从整体相容性和自守表示的基变换条件出发，汇集局部表示论、整体自守、伽罗瓦上同调与复乘几何的输入，推出上同调窗口界 VWin。",
      "vwin_of_row 调用这个入口，把一份 Row0b 同时用于 OpenImageCondition 和显式的整体伽罗瓦条件。"
    ],
    "UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin": [
      "给定整体表示与局部参数存在性的三项输入，以及上同调窗口界 VWin，推出所有 Dirichlet L 函数的右半平面无零结论 EveryCharacter。",
      "将两组表示论输入、theta 积分比较、余体积界和局部参数存在性连同 VWin 一起交给下一步。"
    ],
    "UpperTheory.LiteratureTheorems.published_results_eigen": [
      "把极化尖点表示的伽罗瓦表示、幺正群基变换、Green 特征公式等结果组装成 UnitaryGroupThirdPlaceHypotheses。",
      "为下一步生成 Green 条件和相容的对象族准备输入，其中两项伽罗瓦条件读取传入的 Row0b 数据。"
    ],
    "UpperTheory.LiteratureTheorems.published_results_first": [
      "把 Green 级数、Weil 表示和 Siegel–Weil 公式等结果组装成 ThetaLocalInputs，供 theta 积分和局部表示的构造使用。",
      "下一步用这组条件拼合测试向量并建立求值数据。"
    ],
    "UpperTheory.LiteratureTheorems.theta_integrals_agree_and_local_matching_of_literature": [
      "两套用于构造 theta 积分的 Weil 模型在无穷处和有限处都有明确的匹配映射。匹配后的积分相差一个唯一的非零比例常数，同时满足衰减与改变秩时的比较公式。",
      "通过 Eisenstein 级数和 Siegel–Weil 公式的源码结果得到一对结论，下游分别取积分比较和局部匹配。"
    ],
    "SelfIntersectionVolumeEstimates.topCovolSlim2_use_alt_alt": [
      "从算术几何和交数估计出发，控制一族格的余体积，即格的基本域的体积。把余体积除以源码指定的归一化量后，在充分大尺度上对每个格都有逐项上界。",
      "为连接几何丛和构造后续对象族提供所需的统一余体积界。"
    ],
    "UpperTheory.Lit.every_character_of_theta_integrals_local_matching": [
      "用 theta 积分把两套表示论数据对齐，并结合余体积上界和局部参数的存在性，构造下游需要的几何对象族条件。",
      "把这套几何条件与有限群的特征公式、数域的上同调窗口界合在一起，推出任意 Dirichlet 特征的右侧无零结论。"
    ],
    "UpperTheory.Top.every_character_of_green_v_win": [
      "给定 Green 的有限一般线性群尖点特征公式、数域的上同调窗口界（VWin），以及用于定号情形的几何条件（HypsAlt），就得到所有 Dirichlet L 函数的右侧无零结论，排除主特征在 s = 1 的情形。",
      "先得到本原特征的无零结论，再用换模公式推广到任意模数。"
    ],
    "UpperTheory.Top.imprimitive": [
      "任意 Dirichlet 特征 χ 都由其最小模数（导子）上的本原特征 χ₀ 诱导。在排除主特征的极点之后，换模公式把 L(χ,s) 写成 L(χ₀,s) 乘上有限个欧拉因子 1 − χ₀(p)p^(−s)。若 Re(s) > 1/2，则 |χ₀(p)p^(−s)| < 1，新因子都非零。",
      "把本原情形推广到任意特征，沿用主特征取 s = 1 的例外。"
    ],
    "UpperTheory.Top.zero_free_all_of_green_v_win": [
      "给定 Green、VWin 和满足定号侧条件及局部贡献总量界（LinkN）的几何数据，得到所有本原特征的右侧无零结论（ZeroFreeAll）。模 1 对应的 ζ 在经典意义下于 s = 1 有极点，Mathlib 在该点为其函数定义指定了一个非零值。",
      "取窗口指数 λ = 3/2，把足以构造对象族的 TopG 和逐特征的宿主供给送入无零点定理。"
    ],
    "UpperTheory.Top.shape_closed_link_n_of_green": [
      "Green 的有限域特征公式提供不可约性相关的估计。局部贡献总量的界（LinkN）利用上同调群的长度控制一项误差。结合族存在性和其他估计，就有了构造所需对象族的统一条件（TopG）。",
      "把这些估计交给 topDesWin，使同一族在同一批尺度上满足下游比较所需的约束。"
    ],
    "UpperTheory.Top.topDesWin": [
      "固定充分小的误差参数 ε。合并九项估计的门槛，再用族存在性条件（DesignExists）选出同一个族。结合上同调界，在这个族的充分大窗口点得到相容的计数、权重和误差界（ChainTied）。",
      "把分别证明的估计装到同一个对象族上，得到 FamilyClassConnected。"
    ],
    "UpperTheory.Top.supplyChi": [
      "宿主是为某个尺度选取的一组算术数据，包括数域、秩参数和辅助素数。给定特征 ψ 的数域上同调窗口界，就能在任意远的 [Y, Y^(3/2)] 内逐点提供宿主，同时保住 ψ 的特征比较条件和所需的上同调界。",
      "提供后续对象族在整段尺度上要用到的算术数据。"
    ],
    "UpperTheory.Top.zeroFreeAll_of_topG": [
      "固定窗口指数 λ > 1。若在每个本原特征的远处窗口上都能供应宿主数据，且可以用这些数据构造满足比较约束的族，就能把整窗存在性、逐尺度上界和解析判据接起来，推出所有本原特征的右侧无零结论。",
      "针对 ψ，选出共同分析的一组特征（Level.cyc ψ），即诱导出 ψ 的各次幂的本原特征。这组特征包含 ψ 本身。"
    ],
    "UpperTheory.Comparison₂.level_gm_le_on_family_scales": [
      "固定层级 Λ 和具有算术条件 EFamC 的 FamP 族。若大的窗口尺度 x 上有 ChainTied，就能在充分大的窗口点上界住 Λ.Gm(x)，其上界为 x^(1/2 + (eD + eL + 7)ε)。",
      "把具体族的链式数据转成一般逐尺度比较所需的输入。"
    ],
    "UpperTheory.Comparison₂.windowInequality_of_artinInputs": [
      "固定一个对象族。在该族窗口内充分大的尺度上，如果算术条件成立，并能挑出成员提供可比较的计数、权重和误差界（CoreAtH），就能用 core_gm 得到该点的幂次上界。",
      "提供逐尺度估计。下游还要另外证明同一个族的有效尺度中包含足够远的整段窗口，才能应用解析判据。"
    ],
    "Formalism.HC.zeroFreeOn_of_tiedWin_cyc": [
      "固定 λ > 1。对每个符合 Q 的本原特征 ψ，若其循环层级有逐尺度上界、整窗族见证和 FormB 判据，则 L(ψ,s) 在 Re(s) > 1/2 非零。",
      "用 ψ 属于自己生成的循环层级这一事实，补齐一般层级判据的成员条件。"
    ],
    "Formalism.HC.zeroFreeOn_of_tiedWin": [
      "若每个符合 Q 的本原特征 ψ 都属于某个层级 Λ，且该层级有 λ > 1 对应的整窗族见证、逐尺度上界和 FormB 判据，则 Q 中每个特征在 Re(s) > 1/2 无零点。",
      "先对每个选出的层级证明其保留特征都无零，再取其中的 ψ。"
    ],
    "Formalism.HC.level_of_tiedWin": [
      "固定层级 Λ，假设逐尺度估计、同一族的整窗存在性以及解析判据 FormBAt λ。对任意 Re(s) > 1/2，选 1/2 < θ < min(Re(s), 1)，再取足够小的 ε，使窗口上的估计不超过 x^θ。",
      "例如要排除实部为 0.6 的零点，就取 θ = 0.55，令误差指数至多为 0.05。充分远的整段窗口上的 x^0.55 上界排除了实部大于 0.55 的零点。"
    ],
    "UpperTheory.Comparison₂.formB": [
      "对任意层级 Λ、λ > 1 和 0 < θ < 1，若任意远处都有整段 [Y, Y^λ] 满足 Λ.Gm(x) ≤ x^θ，则 Λ 保留的每个特征在 Re(s) > θ 无零点。",
      "把 Λ 的加权素数和改写为解析特征族的和，以 δ = λ − 1 和常数 C = 1 调用幂次窗口定理。"
    ],
    "UpperTheory.Comparison₂.level_family": [
      "把 Λ.KEPT 的本原特征组成有限解析族，使用严格为正的权重。两种加权素数和逐点相等，且对任意 θ，族的无零命题等价于 Λ 在 Re(s) > θ 的无零命题。",
      "让同一条上界和无零结论在两种表述间传递。和式用 von Mangoldt 权重挑出素数幂（n = p^k 时取 log p，其余取 0），另乘尺度和特征权重，修正主项后取实部。"
    ],
    "Deduction.zeroFree_of_rpow_window": [
      "给定有限正权特征族（主特征只允许模 1）、0 < θ < 1 和 δ > 0。若存在固定常数 C，使任意远处都有整段 [Y, Y^(1+δ)] 满足 Gm(y) ≤ Cy^θ，则族中每个 L 函数在 Re(s) > θ 非零。",
      "先把逐点幂次上界变成可积包络条件，再调用 Landau 型无零判据。"
    ],
    "Deduction.lemmaL": [
      "在 0 < θ < 1、δ > 0 下，一个有限正权特征族（主特征只允许模 1）若满足整窗的积分包络条件（WindowHyp），则族中各 L 函数在 Re(s) > θ 非零。临界带的零点会给正权和的 Mellin 变换留下极点，Landau 窗口估计排除了这些极点。",
      "将解析排极点的结果写回 L 函数的无零结论，Re(s) ≥ 1 的部分另用已有非零结果。"
    ],
    "Deduction.windowHyp_of_rpow": [
      "从任意远整窗上的单侧界 Gm(y) ≤ Cy^θ 构造非负包络 R(y) = |C|y^θ。乘上积分权 y^(−θ−1) 后，整窗积分为 |C|δ log Y，对每个 η > 0 都能让它不超过 Y^η。",
      "把算术端的逐点上界转成 lemmaL 所需的 WindowHyp。"
    ],
    "Classical.propDecidable": [
      "对任意命题 P，提供 Lean 用于分情况的 Decidable P 实例，其中包含 P 成立或 P 不成立的证明。",
      "让 Lean 可以用条件表达式按「是否为可逆元」定义主乘法特征的取值。"
    ],
    "MulChar.trivial": [
      "主乘法特征把可逆元映到 1，把不可逆元映到 0。对模 N 的剩余类，可逆等价于与 N 互素。",
      "Mathlib 用这个定义解释 Dirichlet 特征中的主特征，供模 1 化简及换模时识别极点例外。"
    ],
    "MulChar.hasOne": [
      "把主乘法特征设为乘法特征类型的 1，因此 χ = 1 表示 χ 是主特征。",
      "在模 1 约化和换模的非零论证中，为主特征的记号与比较提供同一个定义。"
    ],
    "funext": [
      "函数外延定理说，如果 f 与 g 在每个输入上取值相同，那么 f = g。",
      "模 1 的 L 函数等式先逐点证明，再用函数外延得到可直接重写的函数等式。"
    ],
    "Formalism.HC.exists_small_eps": [
      "给定实数 C、δ > 0 及 ε₁ > 0，取 ε = min(ε₁/2, δ/(|C|+1))。于是 0 < ε < ε₁ 且 Cε ≤ δ。",
      "同时满足对象族的存在范围和比较指数的误差预算。"
    ],
    "propext": [
      "命题外延公理说，如果 P 与 Q 双向蕴含，则它们在 Lean 中可视为相等的命题。",
      "使双向蕴含能够用于命题重写。图中若干分析估计的编译证明项引用了它。"
    ],
    "Classical.choice": [
      "选择公理允许从一个类型非空的证明中选取该类型的一个元素。",
      "这条可见路径用它从经典二分中取得 Decidable 实例，从而写出主乘法特征的分情况定义。"
    ],
    "Quot.sound": [
      "如果 a 与 b 满足关系 R，那么它们在商类型 Quot R 中的像相等。",
      "Lean 核心把函数按逐点相等取商，用这个公理推出函数外延。"
    ]
  },
  "edges": {
    "RiemannHypothesis|riemannHypothesis|type": "最终定理的类型直接写作 Mathlib 的 RiemannHypothesis。",
    "rhOfAll|riemannHypothesis|value": "Main 直接用 rhOfAll 作最终定理的证明体，无须再作数学推导。",
    "Formalism.VW.rh_of_every|rhOfAll|value": "rhOfAll 调用这个解析桥梁，把全体特征的无零结论转换成 ζ 的临界线结论。",
    "RiemannHypothesis|rhOfAll|type": "rhOfAll 的结论类型采用 Mathlib 对黎曼猜想的精确定义。",
    "allChi|rhOfAll|value": "把对所有特征成立的右侧无零定理作为 rh_of_every 的实参。",
    "UpperTheory.FinalTheorems.everyCharacter|allChi|value": "allChi 直接采用已装配好的 EveryCharacter 结论。",
    "DirichletCharacter.LFunction_modOne_eq|Formalism.VW.rh_of_every|value": "在模 1 的无零断言中用恒等式把 L(χ,s) 改写为 ζ(s)。",
    "Formalism.VW.rh_of_right|Formalism.VW.rh_of_every|value": "把模 1 情形得出的 ζ 右侧无零结论作为 rh_of_right 的假设，进而排除左侧零点。",
    "MulChar.hasOne|Formalism.VW.rh_of_every|value": "证明选取模 1 的 1 作为特征，Lean 通过该实例把 1 解释为主特征。",
    "RiemannHypothesis|Formalism.VW.rh_of_every|type": "模 1 约化所得的最终命题在类型中写作 RiemannHypothesis。",
    "RiemannHypothesis|Formalism.VW.rh_of_right|type": "从右侧无零推出的结论，在类型中表述为 RiemannHypothesis。",
    "RiemannHypothesis|Formalism.VW.rh_of_right|value": "证明展开 RiemannHypothesis，才能逐个处理满足条件的零点。",
    "propext|Formalism.VW.rh_of_right|value": "编译后的反射证明含有命题外延引用，这是 Lean 处理命题等价的基础步骤。",
    "riemannZeta_one_sub|Formalism.VW.rh_of_right|value": "函数方程在反射点 1−s 处把左侧 ζ(s) 写成右侧 ζ(1−s) 与显式因子的乘积。",
    "funext|DirichletCharacter.LFunction_modOne_eq|value": "源码用 ext 将函数等式化为逐点等式，编译证明因此引用函数外延。",
    "UpperTheory.FinalTheorems.everyCharacter_of_row|UpperTheory.FinalTheorems.everyCharacter|value": "最终入口调用这条条件定理，从给定的 Row0b 取得 EveryCharacter。",
    "UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter|UpperTheory.FinalTheorems.everyCharacter|value": "以整体伽罗瓦表示及其局部相容性满足 everyCharacter_of_row 所需的 Row0b 前提。",
    "UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin|UpperTheory.FinalTheorems.everyCharacter_of_row|value": "把三项整体和局部条件及 VWin 交给这里的装配定理，取回 EveryCharacter。",
    "UpperTheory.One.vwin_of_row|UpperTheory.FinalTheorems.everyCharacter_of_row|value": "用同一份 Row0b 推出装配所需的上同调窗口界 VWin。",
    "UpperTheory.Zero.LLC.recTExists|UpperTheory.FinalTheorems.everyCharacter_of_row|value": "为三项输入中的第二项提供满足 IsRecT 的局部参数映射的存在性。",
    "UpperTheory.Gal.Int.galoisRepresentations_of_thetaLift|UpperTheory.Gal.Int.galoisLocalGlobalStrong_recParameter|value": "将 tLiftK 作为构造定理的提升实参，得到所需的 Row0b。",
    "UpperTheory.One.Join.automorphic_window_of_inputs|UpperTheory.One.vwin_of_row|value": "从 Row0b 装出 OpenImageCondition 与基变换条件，并将 Row0b 本身一并传入，得到 VWin。",
    "SelfIntersectionVolumeEstimates.topCovolSlim2_use_alt_alt|UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin|value": "将算术几何装配所得的格余体积界作为后续对象族构造的实参。",
    "UpperTheory.Lit.every_character_of_theta_integrals_local_matching|UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin|value": "把各组输入汇入 theta 积分与局部匹配的装配定理，得到 EveryCharacter。",
    "UpperTheory.LiteratureTheorems.published_results_eigen|UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin|value": "提供幺正群表示及相关伽罗瓦、解析条件组成的输入包。",
    "UpperTheory.LiteratureTheorems.published_results_first|UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin|value": "提供拼合测试向量和局部 theta 数据所需的输入包。",
    "UpperTheory.LiteratureTheorems.theta_integrals_agree_and_local_matching_of_literature|UpperTheory.LiteratureTheorems.every_character_of_literature_of_vWin|value": "取这项合取的两个分量，分别提供积分比较与局部匹配。",
    "UpperTheory.Top.every_character_of_green_v_win|UpperTheory.Lit.every_character_of_theta_integrals_local_matching|value": "将 Green 条件、VWin 和定号侧对象族条件交给下游，取得 EveryCharacter。",
    "UpperTheory.Top.imprimitive|UpperTheory.Top.every_character_of_green_v_win|value": "用本原特征的无零结论和有限欧拉因子公式，得到包含非本原特征的 EveryCharacter。",
    "UpperTheory.Top.zero_free_all_of_green_v_win|UpperTheory.Top.every_character_of_green_v_win|value": "把 Green、VWin 和 HypsAlt 交给该定理，取得换模步骤所需的本原特征无零结论。",
    "MulChar.hasOne|UpperTheory.Top.imprimitive|type": "定理的类型用此实例将 χ ≠ 1 中的 1 解释为主特征，从而表明 s = 1 的例外。",
    "MulChar.hasOne|UpperTheory.Top.imprimitive|value": "证明项用该实例解释主特征，换模时用到本原主特征升模后仍是主特征。",
    "UpperTheory.Top.shape_closed_link_n_of_green|UpperTheory.Top.zero_free_all_of_green_v_win|value": "把 Green 导出的 TopShapeAlt 与 HypsAlt 中的几何条件配对，取得 TopG。",
    "UpperTheory.Top.supplyChi|UpperTheory.Top.zero_free_all_of_green_v_win|value": "对每个 ψ，把 hV ψ 的上同调窗口界转成指数为 3/2 的宿主供给。",
    "UpperTheory.Top.zeroFreeAll_of_topG|UpperTheory.Top.zero_free_all_of_green_v_win|value": "用 λ = 3/2、构造得到的 TopG 及逐特征宿主供给，推出 ZeroFreeAll。",
    "UpperTheory.Top.topDesWin|UpperTheory.Top.shape_closed_link_n_of_green|value": "将几何估计和族存在性一起交给 topDesWin，得到目标族类 G.cls λ 的 FamilyClassConnected。",
    "Formalism.HC.zeroFreeOn_of_tiedWin_cyc|UpperTheory.Top.zeroFreeAll_of_topG|value": "对每个 ψ 将逐尺度上界、FormB 和同一族的整窗见证代入其循环层级，得到本原无零点结论。",
    "UpperTheory.Comparison₂.formB|UpperTheory.Top.zeroFreeAll_of_topG|value": "给每个循环层级提供把整窗幂次上界转成无零半平面的解析判据。",
    "UpperTheory.Comparison₂.level_gm_le_on_family_scales|UpperTheory.Top.zeroFreeAll_of_topG|value": "给每个循环层级提供具体对象族窗口点上的加权素数和上界。",
    "UpperTheory.Comparison₂.windowInequality_of_artinInputs|UpperTheory.Comparison₂.level_gm_le_on_family_scales|value": "把从 ChainTied 取得 CoreAtH 的方法作为实参，特化一般的窗口比较。",
    "Formalism.HC.zeroFreeOn_of_tiedWin|Formalism.HC.zeroFreeOn_of_tiedWin_cyc|value": "取 Λ = Level.cyc ψ，并用 ψ 属于其保留集的证明调用一般层级定理。",
    "Formalism.HC.level_of_tiedWin|Formalism.HC.zeroFreeOn_of_tiedWin|value": "用选出的层级、逐尺度界、特化到 λ 的 FormB 及整窗族见证证明该层级无零。",
    "Formalism.HC.exists_small_eps|Formalism.HC.level_of_tiedWin|value": "取 C = eD + eL + 7，使选出的 ε 对应的比较指数不超过解析判据所用的 θ。",
    "Deduction.zeroFree_of_rpow_window|UpperTheory.Comparison₂.formB|value": "用 δ = λ − 1 和 C = 1 将整窗上界交给解析定理，取得特征族无零。",
    "UpperTheory.Comparison₂.level_family|UpperTheory.Comparison₂.formB|value": "用加权和恒等式改写窗口条件，再用无零命题的等价将结论传回层级。",
    "propext|UpperTheory.Comparison₂.formB|value": "编译后的 formB 证明项含有命题外延公理引用，语义是双向蕴含的命题可以取为相等。",
    "Deduction.lemmaL|Deduction.zeroFree_of_rpow_window|value": "把已得到的积分包络条件交给 lemmaL，推出每个族成员的 L 函数在 Re(s) > θ 非零。",
    "Deduction.windowHyp_of_rpow|Deduction.zeroFree_of_rpow_window|value": "把给定的逐点幂次界转成 lemmaL 要求的积分包络条件 WindowHyp。",
    "Classical.choice|Classical.propDecidable|value": "从 P 或非 P 的经典二分得到一个非空类型，再通过选择取出 Decidable P 的元素。",
    "Classical.propDecidable|MulChar.trivial|value": "在条件表达式中按 IsUnit x 分支，经典实例提供这个命题所需的可判定性。",
    "MulChar.trivial|MulChar.hasOne|value": "Mathlib 将已经定义的 trivial 指定为乘法特征类型中的 1。",
    "Quot.sound|funext|value": "逐点相等的两个函数在商类型中的像相等。对这个等式应用从商上恢复的求值映射，得到原函数的等式。",
    "propext|Formalism.HC.exists_small_eps|value": "编译后的 exists_small_eps 证明项含有命题外延公理引用，语义是双向蕴含的命题可以取为相等。"
  }
};
