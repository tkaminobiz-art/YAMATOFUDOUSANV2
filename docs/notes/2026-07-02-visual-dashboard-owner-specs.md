# ダッシュボード化リデザイン — オーナー別詳細仕様（付録・2026-07-02）

正本の計画は 2026-07-02-visual-dashboard-redesign-plan.md。本書は5オーナー＋統合Criticの全出力（Workflow wf_8af39230-14b）。

---

# ◆ synthesis

検証読了（page.tsx / globals.css / DESIGN_GUARDRAILS.md / 全14セクション実コードの該当行）。5計画を統合裁定した最終骨子を返す。

---

# 統合Critic 兼 チーフAD 最終裁定 — /b-plan-v3 ダッシュボード化計画

## 1. 統合ビジュアルコンセプト（1文）

**「一冊の建築仕様書として組んだ編集的データダッシュボード — 全ての数字と日本語はライブHTMLのまま、罫の太さ・面積差・余白だけで区切り、図の語彙をドット/積層帯/引出し線の3語に制限した、非対称カタログ紙面」**。

SaaSに見えない担保3点:
- **色**: 地は paper-warm＋ink4節のみ。データ色は main深緑濃淡/ink/risk の3値固定（risk は面塗りせず斜線ハッチと点）。グラデ・グロー・蛍光ゼロ。
- **区切り**: 影ゼロ・radius≤4px。`--color-rule` 3段階の hairline を gap-px 開放罫（外周開放・四辺閉じ禁止）で使い、箱ではなく「罫の太さ差＋セル面積差＋padding3段」で階層を作る（S02CostDiagram / StandardSpec の既存文法の一般化）。
- **図の出自感**: チャートライブラリ・目盛・ツールチップ・円/ドーナツ禁止。数字は本文と同じ Oswald tabular のライブHTML直書き＝「手組みのデータジャーナリズム図版」。

## 2. オーナー間の矛盾・重複と裁定（10件）

| # | 矛盾 | 裁定 |
|---|---|---|
| 1 | **画像点数**: 圧縮仕様「生成1点のみ」vs 画像計画A-01〜A-14(28枚+) | **段階制で両立**。Phase A/B は画像ゼロで成立させる（グレーボックス先行原則=feedback_design_first_photo_last）。画像は Phase C で「なくても成立する補助」として後入れ。初回バッチは§7の5点のみ |
| 2 | **ChipRow定義**: ベント=角2pxボーダーチップ+dot vs 圧縮=左罫のみ枠なし | **用途で二分**。データ判定チップ（zeroItems/凡例3値）=ベント式角2px正方マーク。発言・状況の引用（Anxiety/honestFeelings）=圧縮式左罫のみ（枠に入れると声が「商品」に見える）。丸ピルの新規増殖は禁止 |
| 3 | **DataBar発火**: トレンド技法3=scroll-driven積み上げ vs モーション=IO once 980ms「scroll-drivenにしない」 | **モーション仕様が勝ち**（比率は1回で読ませる）。scroll-driven はモーション仕様の採用A（Estimate進捗ラダー）/採用B（FlowRail自己進捗）の装飾2箇所限定。sticky/pin 長回しは再提案禁止を追認 |
| 4 | **StandardSpec**: ベント§8「維持」vs 圧縮「BentoBoard化−45%」vs トレンド技法4 sticky点灯 | **圧縮案採用**（−45%はページ体感に必須）。ただしアイコンなしのグレーボックスで先に成立させる（§6論点1）。技法4 sticky点灯は不採用（モーション仕様の sticky 制限と衝突） |
| 5 | **Models SP**: ベント=FlowRail横送り＋Active Grid hover開示 vs 圧縮=縦積み維持「選択肢を隠さない」 | **圧縮勝ち**。3モデル比較は縦積み常時可視。技法8 Active Grid は不採用（hover でのみ開く情報はタップ環境で常時表示になる＝最初から出せばよい。「動くのは押せるものだけ」原則とも衝突） |
| 6 | **Anxiety SP**: ベント§8=FlowRail横レール vs 圧縮=縦積みチップ壁 | **圧縮勝ち**。不安の代弁は読み順が命。FlowRail は工程・ステップ系（Budget冒頭/Voices dl）専用に限定 |
| 7 | **rounded-full 現存**: Budget工程ピル(149-163行)・Faq ボタン(87行) | Budget 工程ピルは「フロー専用・現状維持」（ベント裁定を採用、既承認実装）。Faq ボタンはインタラクティブ要素でありW2情報整理規定の対象外＝**現状維持・是正不要**（圧縮仕様の「D-5違反」は DESIGN_GUARDRAILS に実在しない条項のため棄却） |
| 8 | **A-09 Budget凡例グリフ** vs StatCard「アイコン禁止」型 | **A-09 不採用**。凡例は正方色マーク（現行 rounded-[2px] chip）で十分。icon+number+text 量産の入口を作らない |
| 9 | **技法2ユニットチャート**: Land 150セルグリッド | **Land は不採用**。「常時150区画程度」は目安数であり150個の正確な図示は断定超え（feedback_no_over_assertion）。Trust600 背景ドットのみ P2 試作可（§6論点3） |
| 10 | **Voices**: ベント§8「維持」vs 圧縮「−40%水平化」 | **圧縮採用**（Phase B）。ただし Codrops Sticky Grid 系は不採用確定（GSAP依存・JS 0KB予算違反） |

重複の統一: BentoBoard/StatCard/DataBar/ChipRow/LedgerRow/PhotoTile/ArtTile/FlowRail の8モジュール定義は**ベントシステム仕様を正**とし、圧縮仕様の器指定はこれに読み替える。モーション値はモーション仕様の表が唯一の正。

## 3. ガードレール監査（実ファイル裏取り済み）

**既存違反（Phase A で是正・全て実在確認済み）**:
- `sections/S04.client.tsx:24` rounded-2xl、`:29` `:48` rounded-xl → 4px 以下へ（Promise 改修に内包）
- `sections/S08.client.tsx:104` rounded-2xl → rounded-[4px]（Models 改修に内包）
- `sections/Budget.tsx:41,58,198` rounded-[6px] → ガードレール「0〜4px」超過。4px へ
- `sections/Estimate.client.tsx:59` `border border-[color:var(--color-border)] rounded-sm` の**四辺閉じ枠** → LedgerRow.Compare の開放罫（gap-px・外周撤去）へ
- `sections/Estimate.tsx:66` `hover:opacity-70` → color 遷移（text-main→main-dark）へ統一
- `Mechanism.tsx:36` / `Estimate.client.tsx:17` の同一 useReveal 重複 → `_shared/RevealGroup.tsx`（S02.client 昇格）に一本化
- `Mechanism.tsx:151` の真円3連（rounded-full 大円）→ 均等カードの変奏＝底面レール(LedgerRow 3行)へ（圧縮案どおり）

**提案側の抵触リスク（実装前に封じる）**:
- 不変リスト: countUp は StatCard の discriminated union で型封じ（tier="hero" 以外で countUp 不可）採用。id 10個・CTA階層・ink4節（page.tsx:41 コメントと一致確認済み）・確定コピーは全オーナー遵守。**コピー逐語検証を各PRゲートに追加**（改修前後でテキストノード diff ゼロを機械確認）
- 画像ルール: 全プロンプト no text 系ネガティブ確認済み。A-12/13 レタッチは建物1px不変+ファイル名追跡で BRAND-TRUTH §AI retouching 適合。A-02 の「吹き出し=LINE想起」は緑面を使わない線画なら可
- AI smell: Budget 3列ボードは「行=指標の1枚台帳」であり均等カード3枚ではない（列見出し・月々帯を行として全幅に通す構造を守ること）。StandardSpec アイコン列は smell 8 と接触＝§6論点1へ
- 字詰め: 全モジュール props `lines: string[]` 方式・40em/ic measure・直書き br 排除 → 承認。SP で景表注記/caveat を隠す UI 禁止（列スワイプ時も注記は列外全幅固定）

## 4. 実装フェーズ計画

**Phase A — 基盤＋パイロット2.5セクション**
- 対象: `globals.css` 末尾追加のみ（モーショントークン5種＋ベントユーティリティ7種）／`_shared/bento/` 8モジュール新設／`_shared/RevealGroup.tsx` 昇格＋ローカル useReveal 2コピー廃止／上記既存違反7件の是正／**Estimate.tsx+Estimate.client.tsx+S02CostDiagram.tsx、Budget.tsx、RentVsLoan.tsx** の載せ替え
- ゲート: `npm run build` 緑／コピー逐語 diff ゼロ／countUp 2箇所・id・ink4 不変／AI smell 10項目／reduced-motion 全静止・全情報表示／Lighthouse mobile Perf≥90・CLS 0

**Phase B — 全セクション展開**（順: StandardSpec → Voices → Mechanism(SVGフォールバック図で先行) → Land → Anxiety → Promise → Trust → Models → Faq/FinalCta 微調整）
- 対象: sections/ 残り11ファイル＋S04/S07/S08/S11.client
- ゲート: Phase A と同一＋高さ収支実測（目標 PC 25.0vp→16.3vp・−35%）＋グレーボックステスト（画像ゼロで全セクション成立）

**Phase C — 画像生成と差し込み**（§7バッチ→AD選定→webp化→差し込み）
- 対象: `public/images/genart/`（新設）、Hero poster、Mechanism ArtTile、Land AreaMap 背景、Estimate 補助図
- ゲート: BRAND-TRUTH §8チェックリスト／文字焼き込みゼロ目視／poster≤120KB・LCP≤2.5s 維持／design-critic 通過（特にテクスチャ系）

**Phase D — モーション研磨**
- 対象: scroll-driven 2箇所（Estimate 進捗ラダー/FlowRail 自己進捗・`@supports` ガード）／KineticHeading を大見出し5本に限定・降格9本は .scroll-in のみ／hover/focus 統一6ルール
- ゲート: DevTools Paint flashing ゼロ／INP≤200ms／IO 総数≤16／JS 追加 0KB／JS 無効で本文消失なし

## 5. パイロット3セクション

1. **Estimate**（最優先）— 最長 2.8vp で「同じ費用の白黒が図と表で二度流れる」冗長の典型＝統合効果が最も見える。S02CostDiagram という文法の規範実装が既にあり、LedgerRow/ChipRow/開放罫の全てを既存流儀の延長で検証できる。既存違反（四辺閉じ枠・hover:opacity）の是正も内包。
2. **Budget**（同時）— ページ最大重量 3.2vp・ink面・countUp・StackBar・StatCard hero・FlowRail・SP列スワイプと、新モジュールと不変条件の**全リスクを一度に踏む**。ここが通れば残りは低リスク。
3. **RentVsLoan**（軽量サイド）— CompareBar（比較レール＋riskハッチ）単体を小さく検証。0.65vp 目標で工数最小、失敗しても切り戻し容易。

## 6. AD判断が要る論点 Top5（推奨つき）

1. **StandardSpec 行アイコン（A-03線画8種）の採否** — 推奨: **保留**。まずアイコンなしベントで成立させ（グレーボックス原則）、smell 8「icon+number+text 量産」に接触しないか実物で判定。採るなら最終 SVG 化必須。
2. **Budget SP の列スワイプ（scroll-snap 84vw）vs 縦積み** — 推奨: **列スワイプ採用**。ただし月々帯・試算注記・main帯は列外全幅で常時固定、非タッチ/reduced-motion は縦積みフォールバック必須。
3. **Trust600 背景ユニットドット（技法2）** — 推奨: **P2で試作のみ**（ink 8%・faint）。Land150 セルは不採用確定（「程度」との矛盾）。効果が薄ければ Metric Rail だけで十分。
4. **紙テクスチャ A-10/A-11** — 推奨: **不採用寄り保留**。「生成り×緑」AI平均値の再侵入リスクが利得を上回る。導入するなら opacity 3%上限＋design-critic 通過を条件に P3。
5. **Mechanism 等角図の発注方式** — 推奨: **純SVG自前を主に昇格**（フォールバックではなく第一案）。Higgsfield A-05 は比較生成して勝った方を採用。黒地線画は生成破綻が多く、SVG なら線色・線幅がトークン直結で管理できる。

## 7. Higgsfield 初回バッチ（5点以内・優先度順）

1. **A-12 FVポスター空レタッチ**（実写 image-to-image・独立タスクで即実行可・LCP面の実利大。`yamato-fv-montage-poster__sky-am.webp`）
2. **A-05 Mechanism 鳥瞰線画**（16:9・cream線 on ink。§6論点5の SVG 案との比較材料として2〜3バリアント生成）
3. **A-07 AreaMap 等高線テクスチャ**（4:3・地名なし・現行CSSグラデの置換候補。Land 改修と同期）
4. **A-04 費用2層構造 分解等角図**（4:3・Estimate パイロット補強。mix-blend-multiply 前提の白背景）
5. **A-01① スタイル確定パイロット1枚のみ**（資金計画机の等角線画。6枚セット/A-02 の量産はこの1枚のトーンをADが承認してから。受け皿 BuildFlowSteps は WS1 確定待ちのため量産を急がない）

A-03（アイコン）・A-09（グリフ）・A-06/A-08（スポット）・A-10/11/14 は初回バッチ外（§6の裁定待ち・P2/P3）。

---
主要参照: `YAMATOFUDOUSANV2/src/app/b-plan-v3/page.tsx`（14セクション順・ink4・countUp2 註記確認）／`src/app/globals.css`（rule 3段階:71-73行・t-burn:842行・rule-draw:383行・surface-ink/base:885-889行）／`DESIGN_GUARDRAILS.md`（radius 0-4px:58行・禁止リスト:67-80行・smell 10:99-112行）／違反実在行は §3 に列挙のとおり。
---

# ◆ scout

# トレンド採集レポート — 「読ませるLP→見ただけで伝わるLP」技法11選（2026実例ベース）

対象: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/b-plan-v3/`（14セクション実装を読了済み）。トークンは `src/app/globals.css`（--color-rule 3段階 / --color-ink / --color-main / --color-risk / --font-mono / --font-oswald / --font-zen-kaku-new を確認済み）。全技法は DESIGN_GUARDRAILS.md の Pattern A〜D / AI smell check 10項目、確定コピー・canonical数字・countUp 2箇所・黒地4節の不変条件を前提に翻訳済み。

---

## 技法1: ヘアライン・ベント（Hairline Bento＝gap をなくしたベントグリッド）
- **何をするか**: 2026年主流のベントグリッド（SaaS上位100の67%が採用）の「サイズ＝重要度」原理だけを移植する。原理: 最重要コンテンツに最大セル（視線固定は大セルで2.6倍）、1×1=補助 / 2×1=中位 / 2×2=主役。ただし本家の「gap 16-24px + rounded 12-24px + hover浮き」は捨て、**セル間 gap=0、境界は border 1本（hairline）で共有**する。新聞の段組み／建築図面の区画割りに近い見た目になる。
- **効くセクション**: Promise（3つの約束を均等に並べず、約束①を2×2主役セル・②③を1×1に非対称配置）、Trust（実績群の器）。ファイル: `sections/Promise.tsx` / `sections/Trust.tsx`。
- **専務文法への翻訳**: 罫は `--color-rule`（rgba(28,27,24,0.16)）のみ・四辺閉じ禁止のため**外周罫は上下だけ残し左右を開放**（Pattern A の格子拡張）。radius 0。背景はセル毎に塗り分けず `surface-base` 一枚。セル内 padding を均等にしない（heavy/medium/light の3段、StandardSpec の SpecGroup weight 方式を流用）。
- **出典**: https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide ／ https://mockuuups.studio/blog/post/best-bento-grid-design-examples/ ／ https://desinance.com/design/bento-grid-web-design/

## 技法2: ユニットチャート（ワッフル／ピクトグラム＝数を「数えられる面」にする）
- **何をするか**: 大きい数を1個=1ドットの反復図形で見せるデータジャーナリズムの定番。ワッフルチャートは「角度比較（円グラフ）より面積比較の方が脳に速い」が根拠。600棟=600ドットの静的フィールド、常時150区画程度=150セルのグリッド、50組=50マークで「規模が一瞬で伝わる」。
- **効くセクション**: Trust（600棟 countUp の**背景**に600ドットの faint フィールドを敷く。countUp は既存のまま＝二度打ち規律不変）、Land（150区画バーンの脇に10×15セルの区画図。「常時150区画程度」の文言は不変、図は約数表現である旨の注記併設）。ファイル: `sections/Trust.tsx` / `sections/Land.tsx`。データ源: `@/data/brand-facts` の PARCELS_HELD、Trust の600は既存 canonical 値。
- **専務文法への翻訳**: ドットは SVG/CSS grid のライブ描画（画像化禁止リスト遵守・Higgsfield 不使用）。色は `--color-ink` 8〜16% と `--color-main` の2値のみ、SaaS のカラフルドット禁止。凡例は `--font-mono` の小ラベル＋hairline 1本（Pattern B Metric Rail の下に従属させる）。
- **出典**: https://baryon.be/uncommon-chart-types-waffle-charts/ ／ https://flourish.studio/visualisations/pictogram-charts/ ／ https://www.storybench.org/pudding-structures-stories-visual-essays/

## 技法3: CSS Scroll-Driven 積み上げコストスタック（JSなしスクロール図解）
- **何をするか**: 2026年に native CSS 化が完了した scroll-driven animations（`animation-timeline: view()`、Chrome 145 で scroll-triggered も着地、caniuse 約85%）で、スクロール位置に同期して「土地→建物→諸費用」の帯が順に積み上がる棒を描く。読者は読まずに「総額の構成」を体感する。IntersectionObserver 不要・reduced-motion は `@media` で静止フォールバック。
- **効くセクション**: Estimate の S02CostDiagram（現在は S02Reveal の一括 reveal）を、層②→層①の順に積み上がる scroll-driven 化。Budget の内訳段積みバー（SEG_META: 建物/土地/諸費用）にも同型適用可。ファイル: `sections/S02CostDiagram.tsx` / `sections/Budget.tsx`。データ源: `_data.ts` paymentCases.parts（数値不変・ライブHTML）。
- **専務文法への翻訳**: イージングは linear〜ease-out 短距離のみ、バウンス/グロー禁止。帯色は既存の bg-main-dark / bg-main / bg-main-light 濃淡3値（Budget で実装済みの色役割をそのまま使う）。「他社なら増える分」だけ `--color-risk` で1帯追加し、色の意味を Estimate の3列表と揃える。
- **出典**: https://developer.chrome.com/docs/css-ui/scroll-driven-animations ／ https://developer.chrome.com/blog/scroll-triggered-animations ／ https://www.joshwcomeau.com/animation/scroll-driven-animations/

## 技法4: Scroll-Driven Sticky Heading（左見出し固定＋右リスト点灯）
- **何をするか**: CSS-Tricks 2026 の型。左カラムに分類見出しを sticky 固定し、右カラムの項目行がスクロールで焦点位置を通過する時だけ dimmed→点灯する。長いスペック列挙が「今どの分類を読んでいるか」を見ただけで分かる器になる。
- **効くセクション**: StandardSpec（構造の安心/暮らしの品質/建てた後の安心 の3分類。現在の SpecGroup 縦積みを、md以上で `grid-cols-[240px_1fr]`＋左sticky に）。Faq（5問の Q を左に固定するのも可）。ファイル: `sections/StandardSpec.tsx`。
- **専務文法への翻訳**: 点灯表現は color: `--color-ink-muted`→`--color-ink` と左罫 `--color-rule-faint`→`--color-main` の遷移のみ。ハイライト背景色・グロー禁止。sticky 見出しには既存の連番 eyebrow（01/02/03）を残し建築図面の章番号として機能させる。
- **出典**: https://css-tricks.com/scroll-driven-sticky-heading/ ／ https://rebeccamdeprey.com/blog/scroll-driven-animations-css

## 技法5: ドット移動ナラティブ（The Pudding 型「行き先が見える」比較）
- **何をするか**: The Pudding の代表技法＝「7,000個のドットがスクロールで別の円へ移動し、残る数が一目で分かる」。これを家賃比較に転用: 左「今の家賃（例）90,000円」のドット群はスクロールで薄く消えていき、右「やまとの月々」のドット群は下から積層して残る。「支払い続けても手元には残らない」の一文（既存コピー不変）が図で先に伝わる。
- **効くセクション**: RentVsLoan（既存の Open Spec 2カラム比較の直下に図解の受け皿を追加）。ファイル: `sections/RentVsLoan.tsx`。データ源: RENT_EXAMPLE=90,000 と paymentCases 由来の 81,298〜95,413（すべて既存定数・countUp 禁止規律は維持＝ドットは opacity 遷移のみで数字は静止）。
- **専務文法への翻訳**: 消える側を `--color-risk` にしない（他社攻撃ではなく事実の性質差なので、消える=ink 20%・残る=main）。感情断定コピー追加禁止。scroll-driven CSS（技法3と同基盤）で実装し GSAP を持ち込まない。試算前提注記（既存）を図の直下に維持（景表）。
- **出典**: https://www.storybench.org/pudding-structures-stories-visual-essays/ ／ https://pudding.cool/process/how-to-make-dope-shit-part-3/

## 技法6: モノクロ等角線画（アイソメトリック図解）で価格メカニズムを1枚絵に
- **何をするか**: 2026年もB2B/複雑構造の説明で最有効とされる isometric 2.5D を、「展示場二重利用（分譲地内モデルハウス）」「自社一貫体制」「広告費最小限」の3事実の図解に使う。土地区画の上にモデルハウスが建ち、それがそのまま販売される流れを俯瞰1枚で見せる＝文章3段落が図1枚になる。
- **効くセクション**: Mechanism（costMechanisms 3事実の各解説に添える小図。既存ピラミッド・価値3円図は不変で、①の「二重利用」にだけ追加が最効率）。ファイル: `sections/Mechanism.tsx`。
- **専務文法への翻訳**: Higgsfield 生成は「抽象/等角イラスト・アートパーツ」枠でOKだが、**日本語ラベルは絶対に画像に焼かず**、図の上に HTML の Annotation Note（Pattern C: 引出し線＋mono 小注釈）を重ねる。画風はカラフル SaaS 3D を拒否し、線画1色（ink）＋面2値（cream/main 薄ティント）の「建築アクソメ図」として発注。黒地(ink)面なので線は cream 系で反転。
- **出典**: https://getillustrations.com/blog/emerging-illustration-styles-to-watch-in-2026/ ／ https://darvideo.tv/blog/isometric-animation-trends-for-tech-saas-in-2026/ ／ https://elements.envato.com/learn/isometric-design-trend-web-design

## 技法7: 実写真への引出し線アノテーション（annotated photo＝図面キャプションのライブ版）
- **何をするか**: データジャーナリズムの annotated visuals（地図・写真に注釈レイヤーを重ねて「どこを見るか」を指定する）を、実写真 allowlist の施工写真に適用。リビング写真の上に「制震ダンパー MIRAIE」「APW330 樹脂サッシ」等の canonical 仕様名を引出し線付き HTML テキストで重ね、仕様表と写真を1枚に統合する。
- **効くセクション**: StandardSpec（仕様行の隣に注釈付き実写真1枚）、Voices（A様邸/B様邸写真に「土地込み総額を一枚の表で」等の decision trigger を注記）、Land（既存 AREA_PINS 抽象地図の拡張）。ファイル: `sections/StandardSpec.tsx` / `sections/Voices.tsx`。
- **専務文法への翻訳**: DESIGN_GUARDRAILS Pattern C（Annotation Note）そのもの＝ガードレール既認可の型をトレンドが後押しする構図。引出し線は `--color-rule-strong` 1px 直線（曲線・ふきだし禁止）、ラベルは `--font-mono` 11px tracking あり。注釈は3個まで（smell check 10「図面風装飾が意味なく増えていないか」）。
- **出典**: https://www.vev.design/blog/data-visualization-ideas/ ／ https://www.vev.design/blog/web-editorial-design/

## 技法8: Active Grid（hover/tap で2層目のデータを開くセル）
- **何をするか**: 2026年ベントの進化形「Active Grid」＝タイルが hover で色変化ではなく**2層目の情報を開示**する。3モデル（花/風/京）の各セルに、hover/focus で標準仕様の差分チップ（花: いちばん選ばれています 等の既存文言）が現れる。タップ環境では常時表示にフォールバック。
- **効くセクション**: Models（現在51行の薄いセクション。カード量産に逃げず、hairline 区切りの3面＋2層目開示で情報密度を上げる）。ファイル: `sections/Models.tsx`。データ源: BRAND-TRUTH の HANA/KAZE/KYO display 名と 京2,280/花風2,480（不変・ライブテキスト）。
- **専務文法への翻訳**: 本家の「expand・動画再生・squishy アニメ」は拒否。開示は opacity 0→1 と上罫 `--color-rule-faint`→`--color-rule` の強調のみ、200ms ease-out、transform なし。価格は Pattern A（Open Spec: 上下罫・Oswald 大数字・小注釈）で各セル内に組む。
- **出典**: https://desinance.com/design/bento-grid-web-design/ ／ https://writerdock.in/blog/bento-grids-and-beyond-7-ui-trends-dominating-web-design-2026

## 技法9: エディトリアル・データレポート帯（不動産×データレポートの実在例に倣う）
- **何をするか**: Swire Properties「SPROPS SD Report 2025」（Awwwards ノミネート・Real Estate×Data Visualization タグ）のように、企業の実績数字を「年次レポートの1見開き」の文法で組む: 大数字＋定義行＋出所注記＋細い時系列。信頼セクションを「言われる信頼」から「監査可能な定点観測」の見た目に変える。
- **効くセクション**: Trust（600棟 countUp・15年・1,000件・50組を Metric Rail＋「創業からの15年」を hairline 年表1本で。代表2名の正規メッセージは不変のまま同居）。ファイル: `sections/Trust.tsx`。
- **専務文法への翻訳**: レポート文法の核は「数字に必ず定義と出所を添える」こと＝景表対策と同一方向で相性が良い。各数字の下に `--font-mono` 10px で集計基準（例: 施工実績/業歴/相談件数）を付す。チャート装飾は年表 hairline 1本まで。黒面ではなく明面（Trust は現在明面）で紙のレポート感を出す。
- **出典**: https://www.awwwards.com/sites/sprops-sd-report-2025 ／ https://winners.webbyawards.com/winners/websites-and-mobile-sites/features-design/best-data-visualization

## 技法10: ビューポートスケール数字（typography as the interface）
- **何をするか**: 2026年トレンドの中核「型はコンテンツの器ではなくコンテンツそのもの」＝1語/1数字を画面幅いっぱいにスケールさせ、ヒーロー画像の代わりに注意を掴む。数字が主役のこのLPと文法が一致する。
- **効くセクション**: Budget（クライマックス。月々 countUp の burnClassName 現行 clamp(46px,8vw,82px) を、SP でさらに攻めた clamp 上限へ＝xmobile 型「写真脇役+巨大メッセージ」の既定方針とも一致）、Hero。ファイル: `sections/Budget.tsx` / `sections/Hero.tsx`。countUp の位置・回数は不変（スケールだけ変える）。
- **専務文法への翻訳**: 数字は Oswald（`--font-oswald`・/money フォント固定ルールと同系）、和文見出しは `--font-zen-kaku-new` 太角ゴシックのまま。エッジで clip する演出は可読性を損なうので不採用、代わりに measure 規約（見出し measure・本文40字上限）内で最大化。
- **出典**: https://line25.com/articles/web-design-trends-2026/ ／ https://www.figma.com/resource-library/web-design-trends/ ／ https://uxpilot.ai/blogs/web-design-trends-2026

## 技法11: カテゴリカル凡例チップ（含まれる/別途/発生しない の3値エンコード）
- **何をするか**: ダッシュボード/データビジュアルの基本「同じ意味には常に同じ色」を LP 全体の規約に昇格させる。Estimate リード文の3語（含まれるもの。別途必要なもの。発生しないもの。＝コピー不変）を色付き凡例チップ化し、以降の費用開示表・S02CostDiagram・Faq 回答内で同じ3値マークを反復する。読者は2回目以降「色を見るだけ」で判定できる。
- **効くセクション**: Estimate 主管（`sections/Estimate.tsx` / `Estimate.client.tsx`）、参照側として Mechanism の断定2件（つなぎ融資/地盤改良費=「発生しない」チップ）と Faq。
- **専務文法への翻訳**: 3値は既存トークンに厳密対応: 含まれる=`--color-main`(深緑)/別途=`--color-ink-muted`/発生しない・他社なら増える=`--color-risk` 系。チップは pill 型 rounded-full を避け、**正方マーク(6px)＋mono ラベル**の図例（legend）形式＝地図・図面の凡例の見た目にする。凡例行は各図の下に hairline 1本で従属配置。
- **出典**: https://muz.li/blog/best-dashboard-design-examples-inspirations-for-2026/ ／ https://think.design/blog/dashboard-design-in-2026-dos-and-donts/

### 補助技法（採否は AD 判断・重量級）
- **Sticky Grid Scroll**（Codrops 2026-03-02: sticky 425vh 内で写真グリッドが段階 reveal→zoom）: Voices の写真マーキー代替候補。ただし GSAP+ScrollTrigger+Lenis 依存で本サイトの純CSS方針と衝突するため、採るなら技法3の CSS scroll-driven に翻訳して縮退実装。出典: https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/

---

## 必須考察: 「ダッシュボード風だがSaaSに見えない」差別化ポイント

| 軸 | SaaSダッシュボード（避ける） | やまと翻訳（編集的データダッシュボード） |
|---|---|---|
| **色** | ダーク地+蛍光アクセント（cyan/purple グラデ）、カテゴリ7色 | 地は paper-warm（#FAFAF7 / surface-base）と ink 4節のみ。データ色は3値固定（main深緑/ink/risk赤）＋濃淡。グラデ・グロー全面禁止 |
| **罫** | 1px solid gray の四辺カード枠＋gap、影で区切る | 罫だけで区切る（影ゼロ）。`--color-rule` 3段階の hairline を「開いた罫」（上下のみ/左のみ）で使う。純黒罫禁止。太さの差（border-t-2/1）で重量リズムを作る＝StandardSpec 実装済みの文法を全図解に展開 |
| **角丸** | Bento 2.0 の 12〜24px、pill ボタン、squishy hover | radius 0〜4px 厳守（rounded-xs 以下）。チップ/凡例も正方マーク。hover は浮かせない（transform/shadow なし、opacity と罫強調のみ） |
| **密度** | 全セル同サイズ・同 padding・icon+number+text の均等 KPI カード量産 | 非対称が正体: 主役1つ（2×2級）＋従属（1×1級）の面積差、padding も heavy/medium/light の3段。数字は役割で重さを変える（PRICE 強・RECORDS 静・ACTION 独立）。ラベルは mono 小英字、値は Oswald 大＝「建築図面のタイトル欄」の密度感 |
| **図の出自感** | チャートライブラリ既製品（Recharts 風の目盛・ツールチップ） | 目盛・軸・ツールチップを消し、数字は本文と同じライブ HTML で直接大書き。図はドット/帯/引出し線の3語彙に制限＝「データジャーナリズムの手組み図版」に見せる |

**一言で**: SaaS は「箱と影とアクセント色」で区切るが、やまとは「罫の太さと面積差と余白」で区切る。図解語彙をユニットドット・積層帯・引出し線の3つに絞り、全図の凡例を3値固定にすれば、14セクション全体が1冊の建築仕様書/年次レポートとして統一される。

**優先順位の提案**: 即効=技法11（凡例チップ・既存トークンのみ）→技法3（Estimate スクロール積層・純CSS）→技法2（Trust/Land ユニットチャート）。中期=技法4/5/8。要 AD 発注=技法6（等角線画）。技法10は既存 KineticHeading/BurnNumber の調整のみ。

Sources: [saasframe bento guide](https://www.saasframe.io/blog/designing-bento-grids-that-actually-work-a-2026-practical-guide), [mockuuups bento examples](https://mockuuups.studio/blog/post/best-bento-grid-design-examples/), [desinance bento](https://desinance.com/design/bento-grid-web-design/), [writerdock 7 UI trends](https://writerdock.in/blog/bento-grids-and-beyond-7-ui-trends-dominating-web-design-2026), [Chrome scroll-driven animations](https://developer.chrome.com/docs/css-ui/scroll-driven-animations), [Chrome scroll-triggered](https://developer.chrome.com/blog/scroll-triggered-animations), [Josh Comeau](https://www.joshwcomeau.com/animation/scroll-driven-animations/), [CSS-Tricks sticky heading](https://css-tricks.com/scroll-driven-sticky-heading/), [Codrops sticky grid scroll](https://tympanus.net/codrops/2026/03/02/sticky-grid-scroll-building-a-scroll-driven-animated-grid/), [Baryon waffle charts](https://baryon.be/uncommon-chart-types-waffle-charts/), [Flourish pictogram](https://flourish.studio/visualisations/pictogram-charts/), [Storybench on The Pudding](https://www.storybench.org/pudding-structures-stories-visual-essays/), [The Pudding process](https://pudding.cool/process/how-to-make-dope-shit-part-3/), [getillustrations 2026](https://getillustrations.com/blog/emerging-illustration-styles-to-watch-in-2026/), [darvideo isometric](https://darvideo.tv/blog/isometric-animation-trends-for-tech-saas-in-2026/), [envato isometric](https://elements.envato.com/learn/isometric-design-trend-web-design), [vev data viz ideas](https://www.vev.design/blog/data-visualization-ideas/), [vev editorial design](https://www.vev.design/blog/web-editorial-design/), [Awwwards SPROPS SD Report 2025](https://www.awwwards.com/sites/sprops-sd-report-2025), [Awwwards real estate](https://www.awwwards.com/websites/real-estate/), [Webby data viz winners](https://winners.webbyawards.com/winners/websites-and-mobile-sites/features-design/best-data-visualization), [line25 trends 2026](https://line25.com/articles/web-design-trends-2026/), [Figma trends](https://www.figma.com/resource-library/web-design-trends/), [uxpilot trends](https://uxpilot.ai/blogs/web-design-trends-2026), [muz.li dashboards](https://muz.li/blog/best-dashboard-design-examples-inspirations-for-2026/), [think.design dashboards](https://think.design/blog/dashboard-design-in-2026-dos-and-donts/), [SANKOU! infographics](https://sankoudesign.com/category/nice-infographics/), [MUUUUU infographic](https://muuuuu.org/category/taglist/infographic)
---

# ◆ system

読み込み完了。以下、実装可能仕様として返す。

---

# ベントモジュールシステム設計仕様 — /b-plan-v3「編集的データダッシュボード」

## 0. 前提・配置・不変の担保

- **配置**: 新規モジュールは `src/app/b-plan-v3/_shared/bento/` に集約（`BentoBoard.tsx` / `StatCard.tsx` / `DataBar.tsx` / `ChipRow.tsx` / `LedgerRow.tsx` / `PhotoTile.tsx` / `ArtTile.tsx` / `FlowRail.tsx`）。CSSは `globals.css` 末尾に `/* === bento (additive) === */` ブロックを**追加のみ**（既存 `.t-*` `.surface-*` は1字も変更しない。v3 の既存流儀「追加のみ・`.v3-scope` 隔離」を踏襲）。
- **不変の担保**: 全モジュールは「器」であり、文言・数値は props で受けて `_data.ts` / `@/data/brand-facts` から供給。モジュール内にコピー・数値のリテラルを持たせない（数値ドリフト封じ）。id 10個・CTA階層・countUp 2箇所（Budget月々 / Trust600）・黒地ink4節（Hero/Budget/Mechanism/FinalCta）は現 `page.tsx` / `SectionShell` の構造をそのまま使う＝モジュールはセクション内部の「本文の器」だけを置き換える。
- **文法の translate**: 「ベント/ダッシュボード」を SaaS 文法（角丸カード・影・グロー）ではなく、**建築仕様書＋データジャーナリズム**（hairline・非対称スパン・外周開放・Oswald tabular の数字・墨とcreamの2値）として実装する。既存の `S02CostDiagram`（寸法線・連番アノテーション・mix-blend-multiply）が既にこの文法の先行実装であり、本システムはその一般化。

---

## 1. BentoBoard — 非対称グリッド基盤

**役割**: 縦積みの長文（読ませる）を、1画面に収まる情報ボード（見ただけで伝わる）へ置換する土台。1セクションに最大1枚。

**構造**:
```
<BentoBoard tone="light|dark" mode="rule|air" as="div|dl|ul">
  <BentoCell span="span-{4..12}" rowSpan? priority={1..n}>…</BentoCell>
```
- グリッド: `grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12`（SP4/タブレット8/PC12）。
- **span 比率の設計（均等禁止）**: 1ボードに必ず「主役セル」1個＝PC で `col-span-7` 以上（面積40%以上）。許可レシピは `7+5` / `8+4` / `7+5 / 4+4+4(下段のみ)` / `5+4+3`。**禁止**: `6+6`、`4+4+4` の2段以上連続、`3×4` 均等。セル数はPC最大6・SP最大表示は1スクリーン2セルまで。
- **罫の引き方（四辺閉じ枠禁止）**: `mode="rule"`（高密度）は **gap-1px＋地色透かし**方式 — ボード側 `gap-px bg-[color:var(--bento-hair)]`、各セルが surface 色（`bg-paper` / `bg-ink`）を持つ。gap にだけ hairline が現れる＝**内側罫のみ・外周は開放**（枠が閉じない。`EstimateDisclosure` の `md:gap-px md:bg-border` と同系で実績あり）。`mode="air"`（編集呼吸）は `gap-[clamp(16px,2vw,28px)]`・罫なし。
- **tone 変数**: light面 `--bento-hair: var(--color-rule-faint)`（rgba(28,27,24,.08)）／ink面 `--bento-hair: rgba(245,238,226,0.14)`（既存 `border-cream/15` 相当）。強調区切りだけ `var(--color-rule)`。
- セル内 padding: `p-[clamp(16px,1.6vw,28px)]`（`--card-p` より一段圧縮＝ダッシュボード密度）。radius: セルは 0。角丸は写真タイルのみ（§5）。

**AI-smell 回避**: ①同型セル3連禁止＝隣接セルは必ず「内容型」を変える（数字/バー/写真/台帳/テキストのうち2種以上混在を lint 的にレビュー項目化）。②影ゼロ・`shadow-*` 不使用。③外周 border を張らない（開放）。④セルに均等 padding を機械適用しない — 主役セルのみ `p-[clamp(24px,2.4vw,40px)]` に増量し重量差を作る。⑤グレーボックステスト: 写真セルをグレーにしても span 比率だけで階層が読めること。

---

## 2. StatCard — 数字主役モジュール

**役割**: 600 / 1,000 / 150 / 15 / 50 / 20 / 10 / 月々3値を**同一ルール**で置く数字の器。既存 `BurnNumber` を内包ラップ（再実装しない＝countUp 規律を物理的に一本化）。

**構造（ラベル位置固定・上→下）**:
```
t-eyebrow ラベル（例: Track Record / Parcels Held / monthly payment）
数字 + 単位（baseline揃え・単位は t-burn-sub / text-[13px]）
注記 t-body 12〜13px text-ink-muted（景表注記・「〜以上」「程度」はここ）
```
- **3階級**（これ以外のサイズ禁止）:
  - `tier="hero"` = 既存 `.t-burn`（clamp(64px,13vw,132px)）。**使用は Trust600 と Budget月々の2箇所のみ**。lime 下線（`border-bottom:6px solid var(--color-lime)`）はこの階級専用。
  - `tier="lead"` = 新 `.stat-lead`: Oswald 600 / `clamp(40px,5vw,72px)` / line-height 0.9 / tabular / nowrap。Land の 150、RentVsLoan の家賃・月々レンジ（現 `!text-[clamp(38px,6vw,60px)]` の場当たり override をこれに正規化）。
  - `tier="rail"` = 既存 `.t-burn-sub`。Trust の 15/1,000/50、保証 20/10、Models の価格 2,280/2,480。
- **countUp 規律**: `countUp` prop は `tier="hero"` のときのみ型で許可（`tier!=="hero"` で渡したら TS エラーになる discriminated union）。既定 false・静止。呼び出しは Budget（`paymentCases[].monthlyNum`）と Trust（`DELIVERED_HOMES`）だけ。
- a11y: `BurnNumber` 準拠（`role="img"` + `aria-label`、内部 aria-hidden）。
- **データ源**: `@/data/brand-facts`（DELIVERED_HOMES / PARCELS_HELD / FUNDING_PLANS / CUSTOMER_VOICES / BUSINESS_YEARS / GROUND_WARRANTY_YEARS / TERMITE_WARRANTY_YEARS）、`_data.ts` の `paymentCases`。

**AI-smell 回避**: 「icon+number+text」量産UIの禁止＝**StatCard 内部にアイコンを置けない**（props に存在させない）。箱に入れない — StatCard 自体は背景・枠を持たず、置かれた BentoCell の面に直接立つ（Metric Rail の思想）。数字より大きいラベル禁止（階層固定）。

---

## 3. DataBar / MiniChart — 純CSSデータビジュアル

**役割**: 文章で説明していた量関係を、軸・箱・ライブラリなしの棒で見せる。3変種。全て**サーバーコンポーネント・JS不要**（値は静的データ→width% をサーバーで算出）。数字は**必ずバーの外にライブHTML**（画像化禁止リスト遵守）。

- **`StackBar`（積み上げ・総額内訳用）**: Budget の SEG_META を一般化。`segments: {label, value(万円), cls}[]`。高さ `h-9`、radius `rounded-[4px]` 上限、色は**深緑濃淡3値のみ** `bg-main-dark / bg-main / bg-main-light`（ink面は文字 cream / main-light 上は lime-darker）。ratio>0.13 でラベル内表示、未満は下部レジェンド（`ChipRow` の dot 型）。データ源: `paymentCases[].parts`。
- **`CompareBar`（比較・家賃vs月々／一般vsやまと用）**: 共通スケール（max値=スケール上限を明示 prop）に対する横棒2本。「今の家賃（例）90,000」= 墨の細バー `h-3 bg-ink/70`、「やまとの月々目安」= **レンジ帯**（81,298–95,413 を `left/width %` で示す `h-3 bg-main` + 両端 tick `w-px h-2.5 bg-main`）。バー下に hairline `border-b border-[color:var(--color-rule-faint)]` 1本のみ（軸箱なし）。risk 系（一般的には〜）を面で塗らない — 一般側は `repeating-linear-gradient(45deg, var(--color-risk-dark) 0 1px, transparent 1px 6px)` の**斜線ハッチ**で「不確かさ」を表現し、赤ベタ面積を作らない。既存の試算前提注記（金利1.0%・35年…）は必ず併設。データ源: `paymentCases[].monthlyNum` の min/max、RENT_EXAMPLE。
- **`RatioLine`（寸法線・関係式用）**: S02 の figcaption 寸法線（端tick＋細線＋中央ラベル）を部品化。「総額＝本体価格＋販売運営費」等の関係を寸法線文法で示す。
- **モーション**: 新 `.bento-bar-grow { transform-origin:left; animation: rule-draw 700ms cubic-bezier(0.16,1,0.3,1) both; }`（既存 rule-draw keyframe 流用・`animation-timeline: view()` を `@supports` で載せ、非対応と `prefers-reduced-motion` は静止表示）。countUp とは無関係＝二度打ち規律を侵さない。

**AI-smell 回避**: recharts/Chart.js 等の generic チャート禁止。グリッド線・目盛箱・凡例ボックス禁止（hairline 1本＋ライブ数字で読む）。1チャート=緑濃淡＋risk ハッチの2系統まで。円グラフ・ドーナツ禁止（SaaS 臭）。

---

## 4. ChipRow / LedgerRow — チップ列と台帳行

**`ChipRow`（費用開示・状況語の圧縮用）**:
- チップ仕様: `inline-flex items-center gap-2 border px-3 py-1.5 text-[12px] font-bold tracking-[0.02em]`、**radius 2px**（`rounded-[2px]`。既存 Budget の工程ピル rounded-full は「フロー」専用として区別し、**データチップは角**）。色: 明面 `border-[color:var(--color-rule)] text-ink`／ink面 `border-cream/25 text-cream`。先頭 dot `h-1.5 w-1.5 bg-lime`（意味: 「発生しない/含む」の解決印）または `bg-risk`（「増えやすい」警告印）。
- **強調は1列に1個まで**: `bg-main text-cream`（塗りチップ）。それ以外は線のみ。
- 用途/データ源: `zeroItems`6件（つなぎ融資〜標準との差額＝Estimate 締め部を文章→チップ列へ）、`honestFeelings[].category`5件、`customIdeas` の項目名。

**`LedgerRow`（台帳行）**: `S02CostDiagram.AnnotationRow` の一般化。
- グリッド: `grid grid-cols-[2.25rem_1fr] sm:grid-cols-[2.5rem_minmax(0,12rem)_1fr] items-baseline gap-x-4 sm:gap-x-7 py-5 border-b border-[color:var(--color-rule-faint)]`。連番= Oswald tabular（`t-burn-sub` or clamp(16px,1.5vw,22px)）、用語 dt=`t-h3`＋`keep-all`、説明 dd=`t-body`。
- 3列比較変種 `LedgerRow.Compare`（costCompareRows 用・現 EstimateDisclosure の後継）: `grid md:grid-cols-[200px_1fr_1fr] gap-px bg-[color:var(--bento-hair)]`、費用名セル `bg-paper`／「一般的には」セル `bg-risk-soft`（面はセル内限定・dot `bg-risk`）／「やまとは」セル `bg-paper`・answer=`t-h3 text-main`。**外周 border は撤去**（現行の `border border-border rounded-sm` をやめ、BentoBoard の開放罫に統一）。
- 用途/データ源: `costCompareRows`6件（Estimate）、`honestFeelings`5件（Anxiety・feeling 原文不変）、StandardSpec の SpecRow（現 SpecGroup は既にこの文法＝改修不要、命名だけ寄せる）。

**AI-smell 回避**: ゼブラ縞禁止・全行同 padding 禁止（重量差は `weight` prop: heavy=py-6/上罫2px、light=py-4/上罫 rule-faint。StandardSpec の実装を規範化）。チップを3行以上折返す長リスト化禁止（6個超は台帳行へ逃がす）。

---

## 5. PhotoTile / ArtTile — 実写と生成アートの使い分け

**`PhotoTile`（実写・allowlist専用）**:
- radius **4px 統一**（`rounded-[4px]`・上限6px）。`aspect-[4/3]` 既定、bento 内は `aspect-[16/9]`（横長セル）/`aspect-[3/4]`（縦セル）の3種のみ。`object-cover` + `sizes` 必須 + FV以外 lazy。
- **overlay ルール**: 文字を載せる時のみ `linear-gradient(180deg, transparent 55%, rgba(29,29,24,0.66) 100%)` の下部帯。キャプションは**必ずライブテキスト**（on-image 左下 `t-eyebrow text-cream` か、タイル下 `DrawingCaption` 式の図版キャプション）。数字・コピーを画像に焼かない。
- 供給源: `public/images/works-parts/**`、`lots/**`、`fv/plan-*.webp`、`works/case*.webp`、`staff/*.webp`、`bplan/payment-cases/*.png`（BRAND-TRUTH §1 allowlist）。
- **既存違反の是正指示**: `S08.client.tsx` PlanCard の `rounded-2xl` はガードレール違反（rounded-lg 以上禁止）→ `rounded-[4px]` へ。

**`ArtTile`（Higgsfield 生成アート・図解パーツ専用）**:
- 許可用途: 等角（アイソメ）イラスト＝「自社分譲地×モデルハウス二重利用」の図解（Mechanism）、抽象テクスチャ、立面線画（S02 の後継）、アイコン風グラフィック。**日本語テキストなし・実在風の物件外観なし・人物顔なし**で生成。
- 生成プロンプト固定句: 「line drawing / isometric, ink line #1D1D18 on warm paper #F5EEE2, accents only #486B00 / #A2C523, no text, no watermark」。保存先 `public/images/bplan/art/*.webp`。
- 溶かし込み: 明面では **`mix-blend-multiply`**（S02 立面の実績手法＝「枠に貼った感」回避）。ink面では線画を cream 化した別書き出しを使い blend しない。ラベル・数字は `RatioLine`／絶対配置のライブHTML注釈（Pattern C Annotation Note）で重ねる。
- 制限: 1セクション1枚まで。装飾のみの ArtTile は `aria-hidden` とし SP で非表示可（コンテンツは隠さない）。

---

## 6. FlowRail — 横スクロール工程レール

**役割**: SP で縦に長くなる連続項目（状況語5件・3モデル・工程）を横レール1画面に畳む。純CSS・client 化不要。

**構造・具体値**:
- ビューポート: `overflow-x-auto -mx-5 px-5 flex gap-4 snap-x snap-mandatory scroll-px-5`＋`tabIndex={0} role="group" aria-label`（キーボード横スクロール可）。端フェード: 既存 s09 と同じ `mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent)`。
- アイテム: `snap-start shrink-0 w-[78vw] max-w-[340px]`。工程連結は背面の hairline（`::before` で `border-t border-[color:var(--color-rule)]`）＋各項目上端の tick（`h-2 w-px bg-[color:var(--color-rule)]`）＝寸法線文法。連番は Oswald tabular `01…`。
- **PC では消える**: `lg:` で `overflow-visible mask-none grid`（項目≤4なら BentoBoard の1行に昇格）。FlowRail は SP/タブレットの折り畳み装置であって PC の主役ではない。
- **reduced-motion**: 自動送り・auto-advance は実装禁止（ユーザー駆動のみ）。`scroll-behavior: smooth` は `@media (prefers-reduced-motion: no-preference)` 内のみ。スクロールバーは `scrollbar-width: thin` で消さない（a11y）。

**AI-smell 回避**: カルーセルUI（ドット・矢印ボタン・ループJS）を付けない。カードを枠で閉じず、tick＋余白で区切る。

---

## 7. 密度とリズム — 2レジスターの切替規則

- **編集レジスター**（余白・読む）: セクション頭は必ずこれ。`Eyebrow` → `KineticHeading`/`t-h2`（measure 20〜24ic・`text-wrap:balance`）→ リード `t-body max-w-[40em]`（40ic フォールバック em・40字上限・`<br>` 直書き禁止＝現行規約のまま）。
- **ダッシュボードレジスター**（密・見る）: BentoBoard 内のみ。セル内 line-height 1.5〜1.6、ラベル11px、行 padding py-4〜6。**1セクション1ボード上限**。ボード連続禁止＝間に必ず編集の呼吸（全幅ステートメント `t-h3`、写真帯、または `mt-[clamp(56px,6vw,96px)]` の素の余白）を挟む。
- ヘッダー→ボード間: `mt-[clamp(48px,5vw,80px)]`。セクション外殻は現 `SectionShell`（px-5/md:px-10/xl:px-14・py-20/lg:py-28・max-w-1380px）を不変で使う。
- **SP 折り畳み規則**: ①DOM順=読み順（a11y。grid の視覚並び替えで意味順を壊さない）②主役セル先頭 ③3件以上の同型列は FlowRail へ変換 ④`display:none` によるコンテンツ隠しは禁止（装飾 ArtTile のみ例外）⑤SP1スクリーンの数字モジュールは2個まで（数字の渋滞防止）。
- 明度ウェーブ不変: ink 4節。ink面ボードは `tone="dark"`（hair=cream14%・StackBar は main 濃淡が沈むため文字 cream 必須）。

---

## 8. セクション別適用マップ（データ源つき・優先順）

| # | セクション | 置換内容 → モジュール | データ源 |
|---|---|---|---|
| P1 | **Estimate** (id=costs) | 締めの文章「地盤改良費は…」→ `ChipRow`（zeroItems 6チップ・lime dot）。EstimateDisclosure → `LedgerRow.Compare`（外周枠撤去・開放罫化）。S02CostDiagram はそのまま（既に本文法） | `zeroItems` / `costCompareRows` |
| P1 | **RentVsLoan** | Open Spec 2カラム数字 → `CompareBar`（家賃90,000 墨バー vs 月々レンジ81,298–95,413 緑帯）＋ `StatCard tier="lead"` 併記。注記不変 | `paymentCases[].monthlyNum` / RENT_EXAMPLE |
| P1 | **Anxiety** | 5状況グリッド → SPのみ `FlowRail`（カテゴリ=ChipRow 風ヘッダ＋feeling 原文）。PC は現行左罫グリッド維持 | `honestFeelings`（原文不変） |
| P2 | **Trust** (id=trust) | 従属数字レール＋保証 → `BentoBoard mode="rule" 7+5`（主役セル=StatCard hero 600 countUp 維持、副セル=StatCard rail ×5） | brand-facts 一式 |
| P2 | **Land** (id=land) | 150バーン＋注記カード＋地図＋CTA → `BentoBoard 7+5`（主役=StatCard lead 150＋AreaMap、副=運用事実帯＋LINE CTA。CTAはセルに閉じ込めず ActionLine として罫外配置） | PARCELS_HELD 他 |
| P2 | **Mechanism** (id=mechanism・ink) | 均等2枚+土台のピラミッド → `tone="dark"` BentoBoard `8+4`（土台=col-span-8 主役・上段2つ=4+4は1段のみ許容）＋ ArtTile（二重利用の等角イラスト・cream線画）。価値3円図の真円3連は円をやめ `LedgerRow` 3行へ（円3連は均等カードの変奏＝AI smell） | `costMechanisms` / FUNDING_PLANS |
| P3 | **Budget** (id=payment・ink) | PaymentCard 内部を正規化: 月々=StatCard hero countUp（不変）、内訳バー=StackBar 部品化、家族/年収/プラン3セル=`gap-px` 開放罫化。カード外周 `border-cream/15` は BentoBoard 罫へ | `paymentCases`（改変禁止） |
| P3 | **Models** (id=product) | PlanCard の `rounded-2xl`→4px 是正、価格=StatCard rail、写真=PhotoTile。SP は FlowRail（3枚横送り） | S08.client PLANS |
| 維持 | Hero / Promise / StandardSpec / Voices / Faq / FinalCta | 器の置換なし（Hero=コピー聖域、StandardSpec=既に台帳文法、Voices=物語、FinalCta=数字ゼロ方針）。命名整合のみ | — |

---

## 9. 整合の明記

- **.t-burn**: StatCard `tier="hero"` の内部実装としてのみ登場。サイズ・font 定義は globals の既存値を参照し複製しない。countUp 2箇所は型レベルで封じる（§2）。
- **.surface-***: BentoBoard は surface を持たず、`tone` で hairline 色だけ切替。セルの地は親 surface を継承（ink面セルのみ `bg-white/[0.03]` の既存流儀を許容）。
- **字詰め規約**: セル内本文も `max-width:40em`（`40ic` 優先・fb em）を適用。セル見出しは `t-h3`（28ic）。チップ・ラベルは折返さない（`keep-all`/nowrap）。`<br>` 直書きは全モジュールで props 型から排除（`lines: string[]` 方式＝KineticHeading 踏襲）。
- **DESIGN_GUARDRAILS 対応**: 罫は `--color-rule*` 系のみ・2方向以内 or gap-px 開放罫、radius 0〜6px（写真4px）、shadow なし、generic Table/Card 不使用、CTA は常にボード外の ActionLine。AI smell check 10項目を各セクションPR前に通す。
- **新規に発見した既存違反（要修正）**: `S08.client.tsx` の `rounded-2xl`（guardrail 3 違反）、`Faq.tsx` の `rounded-full` ボタン（999px 禁止・D-5）— 本システム導入時に併せて是正。

**globals.css 追加ユーティリティ（追加のみ・7個）**: `.bento-hair`（tone変数）/ `.stat-lead`（Oswald 600・clamp(40px,5vw,72px)・lh0.9・tnum・nowrap）/ `.bento-bar-grow`（rule-draw 流用700ms・reduced-motion無効）/ `.bento-hatch-risk`（repeating-linear-gradient 45° risk-dark）/ `.flow-rail`（snap＋mask＋lg解除）/ `.flow-tick`（寸法線tick）/ `.bento-chip`（radius2px・border rule）。

関連ファイル（正本・参照）:
- `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/globals.css`（トークン・追加先）
- `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/b-plan-v3/_data.ts`（数値・文言の単一参照点）
- `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/b-plan-v3/sections/S02CostDiagram.tsx`（先行実装＝文法の規範）
- `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/DESIGN_GUARDRAILS.md` / `BRAND-TRUTH.md`
- `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/docs/notes/2026-07-01-japanese-typography-linelength-rules.md`
---

# ◆ compaction

# /b-plan-v3 セクション圧縮設計仕様書 — 「読ませるLP → 見ただけで伝わるLP」

対象: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/b-plan-v3/`
基準環境: PC=1440×900（1vp=900px）/ SP=390×844。高さは SectionShell padding（py-20/lg:py-28）込みの体感値。
不変条件の再確認: 確定コピー逐語維持・canonical数字・CTA階層（LINE>見学>資料>電話）・id 10個・countUp 2箇所（Budget月々/Trust600）・ink4節（Hero/Budget/Mechanism/FinalCta）は本設計で一切変更しない。surface 配色・明度ウェーブも現状維持。

---

## 0. 新設する共有モジュール（`_shared/` に追加・全セクション共通の器）

デザイン文法の translate: 「ベントグリッド/ダッシュボード」は SaaS 風でなく**編集的データダッシュボード＝建築仕様書・データジャーナリズムの文法**で組む。具体規格:

| モジュール | 仕様（DESIGN_GUARDRAILS 準拠の確定値） |
|---|---|
| **BentoBoard** | `grid grid-cols-12 gap-px` ＋ 地色 `bg-[--color-rule-faint]`（＝内部線は hairline 1px の升目）。**外周は開放**（`border-t-2 border-ink/80` の上罫のみ。四辺閉じ禁止）。タイル＝`bg-paper`（明面）/`bg-ink`（暗面）、`p-5 md:p-6`、radius 0。col-span は必ず非対称（7/5、8/4、12帯）。既存 `Estimate.client.tsx` の `gap-px md:bg-[color:var(--color-border)]` 技法の一般化 |
| **StatCard** | タイル内スタット: `t-eyebrow` ラベル ＋ `t-burn-sub` 数字（tabular）＋ 単位13px ＋ キャプション12px。枠なし（BentoBoard のセルに座る）。countUp は既存 `BurnNumber` を呼ぶ（新規 countUp 追加禁止） |
| **DataBar** | Budget の深緑段積みバー（`SEG_META` 実装）を一般化。h-9、`bg-main-dark/main/main-light` 濃淡のみ、radius 4px、凡例チップ併設。比率は実データから算出 |
| **ChipRow** | `flex flex-wrap` の発言/状況チップ。各チップ＝`border-l-2 border-main/30 pl-3 py-1` の**左罫のみ**（Anxiety 既存文法の高密度化）。カテゴリ＝`t-eyebrow text-main`、本文＝`t-body`。丸ピル面塗り禁止 |
| **FlowRail** | Budget 冒頭の 土地↔建物→総額→月々 チップ列（既存実装）を共有化。1行水平・矢印は lucide・lime 点 |
| **LedgerRow** | 台帳行: `grid grid-cols-[8rem_1fr_1fr] border-b border-[--color-rule-faint] py-3`。連番＝Oswald tabular。S02CostDiagram の AnnotationRow の低身長版（py-5→py-3） |
| **PhotoTile** | `relative aspect-[3/2] overflow-hidden rounded-[4px]`。実写真 allowlist のみ。日本語・数字の焼き込み禁止 |

画像生成（Higgsfield）の使用点は**本計画で1点のみ**（§10 Mechanism の等角線画）。それ以外は全てライブHTML＋lucide ストロークアイコン＋実写真。

---

## 1. Hero（`sections/Hero.tsx`・id=hero・ink①）

- **(a) 現状**: min-h-[92vh] の巨大ステートメント型。約 **1.0vp**。2026-07-01 FV明度改修済み。
- **(b) 載せ替え**: **変更なし（現状維持）**。すでに「見ただけで伝わる」1画面完結。唯一の任意改善: 京モデル価格アンカー（2,280万円〜）を Oswald の裸置きから **StatCard ミニ版**（eyebrow「京モデル」＋数字＋注記を hairline 上罫 1 本で束ねる）へ揃え、下流セクションと数字の器を統一する。
- **(c) 目標高さ**: 1.0vp（**100%＝圧縮対象外**）。
- **(d) コピー座席**: 全文現位置のまま。h1/サブ/補助/CTA2本/価格アンカー、1字も動かさない。
- **(e) SP**: 現行の縦グラデ・全幅ステートメントを維持。

---

## 2. Anxiety（`sections/Anxiety.tsx`）★注力: 5状況→チップ壁1画面

- **(a) 現状**: 見出し(2行 t-h2-display) → 4段落リード(縦積み) → 罫区切り → eyebrow → 5状況の2colグリッド(gap-y-8・各行 border-l-2)。縦一列の読ませ構造で PC **約1.1vp** / SP 約1.9vp。
- **(b) 載せ替え**: **2カラム分割＋チップ壁**。左（5/12）＝見出し＋リード前3文を「不安チップ」化（ChipRow 縦積み・左罫 risk トーン `border-risk/30`）。右（7/12）＝5状況チップ壁（ChipRow・左罫 main トーン・gap-y-4 に圧縮）。結びの1文だけ全幅で底面に敷き、Promise への橋にする。

```
┌──────────5──────────┬───────────7────────────────┐
│ 家づくりが不安なのは、    │ 家を考えるとき、こんな状況が…(eyebrow)│
│ 総額が見えないから。(t-h2)│ 01 自由設計 ▍注文住宅だから、希望は…  │
│                       │ 02 総額    ▍でも、総額はできるだけ…  │
│ ▍展示場で聞いた建物価格に…│ 03 追加費用 ▍見積もりに出ていない…   │
│ ▍標準だと思っていたものが…│ 04 標準仕様 ▍標準仕様は充実して…    │
│ ▍土地が決まらないまま…   │ 05 自社分譲地 ▍土地探しで、家づくりを…│
├──────────────────────┴────────────────────────────┤
│ そんな不安を残したまま、契約へ進んでほしくありません。(t-h3・全幅結び) │
└───────────────────────────────────────────────────┘
```

- **(c) 目標**: PC **0.7vp（−36%）** / SP 1.3vp（−32%）。
- **(d) コピー座席（全文逐語）**: 見出し2行→左上 KineticHeading 現状のまま。「展示場で聞いた…」「標準だと思っていた…」「土地が決まらないまま…」→左カラムの不安チップ3本（各1チップ、`t-body` のまま）。「そんな不安を残したまま、契約へ進んでほしくありません。」→底面全幅の結び行（t-h3 格上げ・字句不変）。eyebrow「家を考えるとき、こんな状況が重なります」→右カラム冒頭。honestFeelings の number/category/feeling 5件→右チップ壁に verbatim（response は現状同様非表示のまま）。
- **(e) SP**: 左→右の順で縦積み。チップ壁は gap-y-3・py-1 に詰め、5チップで約1画面半に収める。結び行は最後。S02Reveal の stagger は維持。

---

## 3. Promise（`sections/Promise.tsx`）

- **(a) 現状**: max-w-920 の1カラム。h2 → 2段落 → ReversalBridge（rounded-2xl の大箱＋2カード＋矢印＋相互証明ピル＋補足文）。PC **約1.1vp** / SP 約1.8vp。※`S04.client.tsx` の `rounded-2xl`/`rounded-xl` は現ガードレール（rounded-lg以上禁止）違反のため、この載せ替えで同時解消する。
- **(b) 載せ替え**: **左テキスト（5/12）＋右・見方の台帳図（7/12）**。ReversalBridge の大箱を解体し、「一般的な見方」「やまとの見方」を上下 2 行の **LedgerRow**（hairline 区切り・箱なし）へ。相互証明ペア（土地↔建物 ＋ 総額↔月々）は **FlowRail** 1 行にし、補足文を direct 下に 40em で敷く。

```
┌────────5────────┬──────────────7──────────────────┐
│ Our Promise      │ 一般的な見方│建物の価格だけ│あとから土地や…│
│ 最初に見せるのは、家│ ──────────hairline────────────── │
│ の値段ではなく、暮ら│ やまとの見方│土地込みの総額│土地・外構・諸費用…│
│ しの総額です。(t-h2)│ ──────────────────────────────  │
│ p1 建物価格だけでは…│ 互いに支え合う: [土地↔建物] ＋ [総額↔月々●]│
│ p2 やまと不動産では…│ 土地と建物を合わせて、はじめて「総額」に…  │
└──────────────────┴──────────────────────────────────┘
```

- **(c) 目標**: PC **0.65vp（−41%）** / SP 1.15vp（−36%）。
- **(d) コピー座席**: h2（下線装飾含む）→左。「建物価格だけでは、毎月の支払いは…」「やまと不動産では、土地と建物を切り離さず…」→左 p1/p2。「一般的な見方」「建物の価格だけ」「あとから土地や諸費用が乗り、毎月の支払いが見えないまま進む。」→台帳1行目の3セル。「やまとの見方」「土地込みの総額」「土地・外構・諸費用まで含めた総額を先に。だから毎月の支払いまで見えます。」→台帳2行目。「互いに支え合う」「土地」「建物」「＋」「総額」「月々」→FlowRail。「土地と建物を合わせて、はじめて「総額」になります。だから、別々ではなく一緒にお見せします。」→FlowRail 直下 40em。
- **(e) SP**: 見出し＋2段落→台帳2行（セルは2行折返し: ラベル行＋本文）→FlowRail（横スクロールなしで折返し）→補足文。

---

## 4. StandardSpec（`sections/StandardSpec.tsx`）★注力: 3分類17項目→アイコン付きベント

- **(a) 現状**: 見出し＋3段落 → SpecGroup×3 縦積み（9行×py-5/6、群間 mt-14/16）→注記→CTA。PC **約2.0vp** / SP 約3.2vp。縦リズムは美しいが完全な「読ませ」構造。
- **(b) 載せ替え**: **BentoBoard（12col・非対称・アイコン付き）**。重量リズムはタイル面積で翻訳: 構造=最大タイル(7/12)、暮らし=中タイル(5/12)、保証=最薄の全幅帯(12/12 DataBar 風)。各仕様行はアイコン（lucide stroke: 耐震=Landmark系/制震=Activity/外壁=Layers/断熱=Thermometer/キッチン=CookingPot/浴室=Bath/窓=AppWindow/保証=ShieldCheck。線画・main色・20px）＋ラベル＋vendor太字＋spec の**1行構成**（note は2行目13px）、行間 hairline・py-2.5。

```
見学した安心を、そのまま標準仕様に。(t-h2)   p1(40em)
p2「耐震等級3に対応する構造、制震ダンパー、…保証まで。」(ボード目次キャプション・太字)
━━━━━━━━━━━━━━━━(上罫 2px＝開放フレーム)━━━━━━━━━━━━━
┌──────────────7──────────────────┬─────────5──────────┐
│ 01 構造の安心                     │ 02 暮らしの品質        │
│    見えない部分こそ、家族の安全を…   │    毎日ふれる設備を…    │
│ ⛨ 耐震 ─ 等級3に対応する構造        │ ⌂ キッチン クリナップ … │
│         木造軸組+金物…約1.5倍強度   │ ⌂ 浴室・洗面・トイレ ＴＯＴＯ…│
│ ⚡ 制震 ─ MIRAIE 制震ダンパー(住友ゴム製)・全モデル標準│ ⌂ 窓・玄関 ＹＫＫ ＡＰ…│
│ ▤ 外壁 ─ 旭化成 ヘーベルパワーボード…│                      │
│ ≋ 断熱・構造躯体 ─ クレタン吹付…    │                      │
├─────────────────────────────────┴──────────────────────┤
│ 03 建てた後の安心 お引き渡しのあとも…  ● 地盤保証 20年   ● しろあり保証 10年│(StatCard×2)
└────────────────────────────────────────────────────────┘
p3「見た目だけではなく…」＋ ※注記 ＋ 実物はモデルハウスで。→ (1行に横並び)
```

- **(c) 目標**: PC **1.1vp（−45%）** / SP 1.9vp（−40%）。
- **(d) コピー座席**: 見出し2行→現状のまま。p1「これはオプションです」と後から増えるのではなく…→リード。p2「耐震等級3に対応する構造、制震ダンパー、…保証まで。」→**ボード直上の目次キャプション**（font-bold 格上げ・字句不変）。p3「見た目だけではなく、住んでからの安心まで…」→ボード直下の締め行。分類見出し3組（01構造の安心/02暮らしの品質/03建てた後の安心＋各キャプション）→各タイルのヘッダ。SpecRow 9行の label/vendor/spec/note→各タイル内の行に verbatim（vendor 太字 Zen Kaku は維持）。※注記→締め行に併置。「実物はモデルハウスで。」→同行右端 text-link（唯一のCTAのまま）。
- **(e) SP**: 構造タイル→暮らしタイル→保証帯（StatCard 2つを横並びのまま）の縦積み。行は py-2 でアイコン込み1項目≒56px。アコーディオン化しない（全項目常時可視＝「標準」の証明なので隠さない）。

---

## 5. Estimate（`sections/Estimate.tsx`・id=costs）★注力: 2層図+開示表→台帳ダッシュボード

- **(a) 現状**: 見出し＋リード＋3語＋締め → S02CostDiagram（別途いただかない3行 py-5/6 → 立面図＋関係式＋上乗せ3行 → 結び）→ 罫 → 開示表6行（各行が3セル箱・gap-4 で分離・計約800px）→ 締め段落＋link。**最長セクション。PC 約2.8vp** / SP 約4.5vp。同じ「費用の白黒」が2つの器（図と表）で二度流れているのが冗長の正体。
- **(b) 載せ替え**: **1枚の費用台帳ダッシュボード**に統合。構成4ゾーン:
  - **Z1 ヘッダーレール**: 見出し左・右に3語を**ステータス凡例チップ**化（● 含まれるもの。／◐ 別途必要なもの。／○ 発生しないもの。＝台帳の判例。glyph は CSS 丸点、色は main/ink-muted/risk-dark）。
  - **Z2 仕組み図パネル（左 5/12）**: 立面図（mix-blend-multiply 現行のまま）＋寸法線「本体価格」＋関係式「総額 ＝ 本体価格 ＋ 販売運営費」＋上乗せ3行（広告費/展示場の維持費/仲介マージン）を **LedgerRow py-3** に圧縮。
  - **Z3 安心台帳（右 7/12）**: 「やまとが別途いただかない費用」3行（地盤改良費/運搬費/工事中の駐車場代）＋開示表6行を**同一台帳**に縦連結。行フォーマット統一: `[連番] [費用名 t-h3縮小] [一般的には(risk-dark 小・面塗り廃止→左罫 border-risk/40 のみ)] [やまとは: 結論太字＋根拠12px]`。gap-4 の箱分離を廃し hairline 行 py-3 へ（1行 ≒72px×9行）。
  - **Z4 フッター判定行**: 「契約前に見た総額のまま、家が建ちます。」を台帳の**判定行**（t-h3・main・全幅）に。締め段落＋「費用の内訳を見る→」を最終行に。
- **(c) 目標**: PC **1.6vp（−43%）** / SP 2.6vp（−42%）。
- **(d) コピー座席（全文逐語）**: 見出し2行→Z1左。「家づくりで怖いのは…一つずつ確認します。」→Z1 リード(40em)。「含まれるもの。」「別途必要なもの。」「発生しないもの。」→Z1 凡例チップ3つ（句点ごと1チップ・font-bold 維持）。「すべてを見たうえで、納得して進めていただきます。」→凡例直下1行。S02CostDiagram 側: eyebrow「やまとが別途いただかない費用」＋「他社では、見積もりのあとから…別途いただきません。」→Z3 上段ヘッダ。notBilledParts 3件の label/note/caveat→Z3 行1-3（caveat「※自社分譲地が対象です」は同一行内厳守＝景表）。eyebrow「家の原価に上乗せされる費用」＋「総額をふくらませているのは…販売運営のための費用です。」→Z2 ヘッダ。関係式・「本体価格」寸法線→Z2。overheadParts 3件→Z2 行1-3。「契約前に見た総額のまま、家が建ちます。」→Z4 判定行。eyebrow「契約前に、同じ表で確認する費用」→Z3 下段（開示6行）の小見出し。costCompareRows 6件の label/general/answer/reason→Z3 行4-9。「地盤改良費はかかりません（自社分譲地が対象です）。つなぎ融資も原則、発生しません。そのほかの項目も…ご契約に進みます。」→Z4 締め段落。「費用の内訳を見る→」→Z4 右端。
- **(e) SP**: Z1（凡例チップは横1行折返し）→Z3 安心3行→Z2 図パネル（立面は幅70%へ縮小）→Z3 開示6行→Z4。台帳行は SP で2段組（1段目=費用名＋やまとは結論、2段目=一般的には・根拠 12px）。**隠さない**（アコーディオン不可・景表配慮）。reveal は現行 useReveal/S02Reveal を行単位で流用。

---

## 6. Budget（`sections/Budget.tsx`・id=payment・ink②）★注力: 3事例→スタットボード

- **(a) 現状**: FlowRail＋見出し＋リード＋link → **巨大 PaymentCard×3 縦積み**（各カード左テキスト＋右写真で 600〜700px）→注記→運用事実帯。PC **約3.2vp** / SP 約5vp。ページ最大の重量物。
- **(b) 載せ替え**: **3列比較スタットボード（データジャーナリズムの比較表）**。カード3枚を解体し、行=指標・列=Case の1枚ボードへ。「均等カード3枚」ではなく「1枚の台帳に3列」なので AI smell 回避と整合。列見出しに PhotoTile（実例写真 3:2・小）を敷き実例感を維持。

```
[土地]↔[建物]→[土地込み総額]→[月々] (FlowRail)
年収ではなく、月々の無理なさで考える。(t-h2)  リードp(40em)  詳しい試算の例を見る→
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            │ Case01 奈良市Aさん…  │ Case02 橿原市Bさん… │ Case03 木津川市Cさん…
photo       │ [PhotoTile 3:2]     │ [PhotoTile]        │ [PhotoTile]
monthly     │ 86,944円/月(countUp) │ 95,413円/月         │ 81,298円/月   ←bg-main結論帯・行ごと全幅
総額/比率    │ 3,180万円・19.0%     │ 3,580万円・16.8%    │ 2,980万円・20.3%
内訳        │ [DataBar+凡例]       │ [DataBar]          │ [DataBar]
家族/年収/プラン│ 3行小            │ …                  │ …
ひとこと     │ “土地と建物を合わせた…”(headline t-h3小) │ … │ …
きっかけ     │ concern(12px muted) │ …                  │ …
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
※試算注記(11px・常設)
[今ご確認いただけること│土地込み総額の試算 ・ 月々の目安 ・ 諸費用まで含めたお見積り](main帯・ボード基底行)
```

  月々行だけ `bg-main` の結論帯を**行として全幅に通し**、3つの BurnNumber（countUp・burnClassName は clamp(40px,4.5vw,64px) へ縮小）を置く＝クライマックスの「叫び」は1回の帯として維持。
- **(c) 目標**: PC **1.5vp（−53%）** / SP 2.6vp（−48%）。
- **(d) コピー座席**: FlowRail チップ（土地/建物/土地込み総額/月々）→現状のまま最上段。eyebrow・h2・リード「家を建てられるかどうかは…ご一緒に確認します。」・「詳しい試算の例を見る」→ヘッダー行。paymentCases 各件: no＋customer→列見出し。image→PhotoTile。monthly/monthlyNum→月々帯（countUp 維持・aria-label 現行踏襲）。total・ratio→総額行「土地込み総額 {total}万円」「返済比率 {ratio}」の字句のまま。parts 建物/土地/諸費用→DataBar＋凡例（{n}万円 表記維持）。family/income/plan→属性3行（ラベル「家族」「年収」「プラン」維持）。headline→「ひとこと」行に verbatim。concern→その下に verbatim。※試算注記全文→ボード直下・常設。「今ご確認いただけること」「土地込み総額の試算 ・ 月々の目安 ・ 諸費用まで含めたお見積り」→基底の main 帯（`data-slot="quick-estimate-input"` の空スロットも帯内に温存）。
- **(e) SP**: 3列を **scroll-snap-x の列スワイプ**（各列=84vw・snap-center・右端に次列を12vwのぞかせてスワイプ可視化）。月々帯・注記・main帯は列外の全幅で常時表示。reduced-motion/非タッチ環境では縦積みフォールバック（Case01→02→03、各列は圧縮済みなので1列≒0.8vp）。

---

## 7. RentVsLoan（`sections/RentVsLoan.tsx`）

- **(a) 現状**: 見出し＋3段落 → 2カラム比較（家賃90,000 vs 目安81,298〜95,413）→左罫引用段落→注記。PC **約1.0vp** / SP 約1.6vp。
- **(b) 載せ替え**: **1本の比較レール**へ。左（4/12）＝見出し＋p1、そして p2・p3 の短文2本を **縦積みステートメント**（t-h3 格上げ・宣言として見せる）。右（8/12）＝Open Spec 比較（現行の2枚組を維持しつつ py 圧縮）＋その真下に解説段落（40em）＋注記。
- **(c) 目標**: PC **0.65vp（−35%）** / SP 1.1vp（−31%）。
- **(d) コピー座席**: h2→左上。「家を買うことが、すべてのご家庭にとって…一緒に確認します。」→左 p1。「背伸びして買うのではなく、続けられる総額で考える。」「それが、やまと不動産の資金計画です。」→左下2行ステートメント（t-h3・字句不変）。「今の家賃（例）」90,000＋「支払い続けても手元には残らない金額です。金額は説明用の一例です。」／「やまとの月々目安」81,298〜95,413＋「土地込み総額から試算した、上の事例3件の月々の範囲です。」→右比較レール（BurnNumber static 現行のまま）。「低金利と長期の借入れを賢く使えば…ご一緒に整えていきます。」→比較直下 40em。※注記全文→最下1行・常設。
- **(e) SP**: 見出し→p1→比較2連（横並び維持: 数字は clamp で 2up が入る）→ステートメント2行→解説→注記。

---

## 8. Models（`sections/Models.tsx`・id=product）

- **(a) 現状**: 見出し＋リード → 3カード（写真4:3＋本文 px-6 py-7）→注記。PC **約1.3vp** / SP 約2.5vp。すでにカタログ文法で健全。
- **(b) 載せ替え**: 器の微修正のみ。①カード下部の本文ブロックを圧縮: モデル名行・fit・価格・広さ/間取り dl・link の5段（≒260px）を「モデル名＋display」「価格レール（t-burn-sub＋万円〜）」「spec チップ（広さ・間取りを1行インライン: `33坪（109㎡）・4LDK`…※字句は現行 dl の値をそのまま並置し中黒で区切るだけ）」「fit 1行」「link」の詰め組（≒180px）へ。②`rounded-2xl` → `rounded-[4px]` にガードレール整合。花の非対称（lime tint・バッジ・価格 lime）は不変。
- **(c) 目標**: PC **1.05vp（−20%）** / SP 2.0vp（−20%）。
- **(d) コピー座席**: h2「広さも、予算も、あきらめ方ではなく選び方で決める。」・リード・PLANS 全フィールド（jp/display/price/area/rooms/fit/バッジ「いちばん選ばれています」）・※注記と「資金計画」link→全て現位置の器内で verbatim。順序 花→風→京 固定。
- **(e) SP**: 縦積み維持（3モデルの選択はスワイプで隠さない）。写真を aspect-[16/10] に浅くして1カード≒0.65vp。

---

## 9. Land（`sections/Land.tsx`・id=land）

- **(a) 現状**: header → 150バーン＋ドリフト封じ箱 → マーキー → 地図＋（運用事実帯＋LINE箱）。PC **約2.2vp** / SP 約3.5vp。
- **(b) 載せ替え**: **上下2段のベント構成**に再配置。上段（12col）: 左 7/12=見出し＋リード＋**150 StatCard**（BurnNumber static 現行）＋ドリフト封じ文（箱を廃し hairline 上罫＋13pxテキストのみ＝高さ半減）。右 5/12=AreaMap（現行の抽象ピン図・aspect-[4/3]→[16/11] へ浅く）。下段: マーキー1行（フルブリード・h≒170px）→ その直下に 運用事実帯＋LINE CTA を**1つの横長帯**（左=「サイトに出していない土地も…」文一式、右=CTA2本）に統合。
- **(c) 目標**: PC **1.4vp（−36%）** / SP 2.4vp（−31%）。
- **(d) コピー座席**: h2「土地がまだなくても、家づくりは始められます。」・リード4文→左上。eyebrow「Parcels Held」・150区画程度・「＝会社全体で常時持っている区画数の目安です。」→StatCard。「この150区画程度は、いま会社が常に持っている…数え方が違うのでご注意ください。」→StatCard 直下の注釈行（verbatim・76区画の文脈語も不変）。「Our Land」→マーキー小見出し。「Now Available」「サイトに出していない土地も、動いています。」「公開前の区画は…お知らせできます。」→下段帯・左。「土地はこれから、でも大丈夫です。ご希望だけ先にお預かりします。」→CTA直上マイクロコピー。「土地から相談する」（LINE）＞「自社分譲地を見る」→CTA階層不変。AreaMap 内キャプション「奈良市・大和郡山市を中心に…ご一緒にお探しします。」→地図フッター現行のまま。
- **(e) SP**: 見出し→150 StatCard→注釈→マーキー→地図→帯→CTA。マーキーは現行 S07.client（hover停止・reduced-motion 対応）を流用。

---

## 10. Mechanism（`sections/Mechanism.tsx`・id=mechanism・ink③）★注力: 3根拠→図1枚

- **(a) 現状**: header 3段落＋1,000件行 → ピラミッド（箱3つ＋補足）→ ValueCircles（巨大円3つ＝空白の主因）。PC **約2.0vp** / SP 約3.0vp。
- **(b) 載せ替え**: **図1枚＝連番アノテーション付き構造図**（Pattern C・建築図面 callout 文法）。ピラミッドの「箱」と円形を全廃し、左=テキストゾーン、右=**等角線画イラスト＋3根拠アノテーション**。イラストは Higgsfield で1点生成: 「自社分譲地とモデルハウスの等角線画（isometric line drawing・単色ストローク・**文字なし・数字なし**・背景透過）」→ cream 単色線に着色して ink 面に置く（実物件の偽装にならない抽象線画＝allowlist 範囲）。生成不調時のフォールバックは純SVGの等角ダイアグラム（自前ストローク）。ValueCircles は円を捨て、**底面の3項アノテーション・レール**（番号＋head 太字＋sub 13px・hairline 区切り）へ。

```
┌────────5─────────┬──────────────7─────────────────┐
│ Cost Logic        │   [等角線画: 分譲地×モデルハウス]      │
│ 安く見せるのではなく、│  01─ 自社分譲地と建物を一体で計画      │
│ 余計な費用を重ねない。│     「最大の差別化」＋説明文          │
│ p1 / p2           │  02─ 土地・設計・施工・販売まで自社でつなぐ│
│ 資金計画 1,000件…   │  03─ 専用展示場に大きく頼らない        │
│ (limeの数字は現行)   │  つなぎ融資は「原則、発生しません」。…   │
├───────────────────┴─────────────────────────────────┤
│ やまとが選ばれる理由 ／ 総額を整えても、手放さないもの。(t-h3)   │
│ ① モデルハウスが、そのまま標準仕様 ─sub ② 土地込みの総額が、見える ─sub ③ 建てたあとも、近くで支える ─sub │
└──────────────────────────────────────────────────────┘
```

- **(c) 目標**: PC **1.1vp（−45%）** / SP 1.9vp（−37%）。
- **(d) コピー座席**: h2・p1「総額を抑えられる理由は…費用を抑える。」・p2「その分、構造、外壁、設備、保証など…整えています。」・「資金計画は1,000件以上を作成してきました。総額の組み立ては、その積み重ねでお見せします。」→左ゾーン（1,000 の lime 表示は現行のまま・countUp なし）。costMechanisms 3件→アノテーション 01/02/03（01=「自社分譲地と建物を一体で計画」を最重量: 番号大・「01 ・ 最大の差別化」ラベルと説明文「専用展示場を建てて維持する代わりに…いちばん大きな理由です。」を verbatim で従える）。「つなぎ融資は「原則、発生しません」。土地を先に買う場合の30〜80万円ほどを、抱えずに済みます。地盤改良費はかかりません（自社分譲地が対象です）。」→図の脚注行（断定2件の憲法例外・字句不変）。「やまとが選ばれる理由」「総額を整えても、手放さないもの。」→底面レール見出し。ValueCircles の head 3本（改行 \n 含む）＋ sub 3本→底面レール①②③に verbatim（head の whitespace-pre-line は解除し1行組でも可＝改行はコピーでなく器由来のため。文字は不変）。
- **(e) SP**: 左ゾーン→イラスト（幅60%・上部）→アノテーション01→02→03→脚注→底面レール縦積み。reveal は現行 useReveal 流用。

---

## 11. Trust（`sections/Trust.tsx`・id=trust）★注力: 数字の密度設計

- **(a) 現状**: 左=見出し＋pre-line 導入＋600バーン＋2文、右=SUB_STATS 3＋保証2（2群に分裂）→ 代表2名 → 免許。PC **約1.5vp** / SP 約2.5vp。
- **(b) 載せ替え**: **権威ダッシュボード**。上段: 左 7/12=h2＋導入（pre-line 維持）＋**600 バーン（countUp 現行のまま・lime 下線）**＋「この600棟は…」。右 5/12 を廃止し、代わりに 600 の直下へ **Metric Rail 1本**（Pattern B: `15年 ・ 1,000件以上 ・ 50組以上 ・ 20年 ・ 10年` を faint hairline 1本の上に横一列、ラベル 12px を下段に。箱・グリッド廃止）。下段: 代表2名を左右 2 カラム（完全同格・写真 96px・quote verbatim）で現行より py 圧縮、右肩に「スタッフ→」link、基底に免許番号。
- **(c) 目標**: PC **1.05vp（−30%）** / SP 1.9vp（−24%）。
- **(d) コピー座席**: h2「600棟以上の家づくりと、1,000件以上の資金計画。」→上段。導入 pre-line 全文→h2 直下 38ch。600 BurnNumber＋「棟以上」→countUp 維持（唯一のもう1箇所）。「この600棟は、600組のご家族が…立ち会ってきた数です。」→バーン直下。「引渡し600棟以上（1993年創業〜2026年時点・累計）」（FOUNDED_YEAR 実値）→Metric Rail の脚注。SUB_STATS（業歴15年※brand-facts 実値/資金計画1,000件以上/お客様の声50組以上）＋WARRANTIES（地盤保証20年/しろあり保証10年）→Metric Rail 1本に統合（値・単位・ラベル字句不変・countUp なし）。「私たちが大切にしているのは、契約前に納得できる総額をお見せすることです。」→代表ブロックのリード。REPRESENTATIVES の role/name/quote→verbatim・同格。「宅地建物取引業　{REAL_ESTATE_LICENSE_NO}」→基底。
- **(e) SP**: h2→導入→600バーン→Metric Rail（2行折返し可・箱にしない）→代表2名縦積み→免許。

---

## 12. Voices（`sections/Voices.tsx`・id=voice）★注力: 物語の密度設計

- **(a) 現状**: header → StoryCase×2（各≒1vp: 写真4:3 半面＋t-h2 引用＋縦 dl＋総額/月々）→ 緑面5声 → マーキー2行 → 下層動線＋GBP。PC **約3.0vp** / SP 約4.5vp。
- **(b) 載せ替え**: 物語の**深さ（項目数）は維持し、組みを水平化**して高さだけ落とす。
  - StoryCase: 写真を col-span-4（3:2）へ縮小、テキスト col-span-8。引用 blockquote は t-h2→**t-h3 スケール**（字句不変・器のみ縮小）。Before/葛藤/決め手の縦 dl を **3列 FlowRail**（横並び・各列上部にラベル・between に hairline 縦罫）へ。総額/月々は右端の **StatCard ミニ2連**として同じ行に吸収。1事例 ≒850px→480px。左右交互（flip）は維持。
  - 緑面「届いた言葉から、いくつか。」: py-12/16→py-8/10、5声は lg:3col 2行のまま行間圧縮。
  - マーキー: PC 2行→**1行**（rowA+rowB を连結した1トラック）、SP も1行。
  - 下層動線＋GBP 2文: 1行の基底レールに統合。
- **(c) 目標**: PC **1.8vp（−40%）** / SP 2.8vp（−38%）。
- **(d) コピー座席**: h2「最初から自信があったご家族ばかりではありません。」・リード→header 現状。各 StoryCase: region・name・family/income/plan 行・pc.headline（blockquote）・Before=pc.concern・葛藤=struggle・決め手=trigger・総額 {total}万円・月々 {monthly}円→全て verbatim、器のみ上記へ。緑面 eyebrow「In their words」・「届いた言葉から、いくつか。」・featuredVoiceProofs 5件 label/quote→verbatim。「お客様の声をもっと見る→」「施工事例を見る→」「Googleの口コミは、ただいま準備中です。」「建てたお客様からのご紹介も、静かに続いています。」→基底レール（GBP 凍結状態のまま）。
- **(e) SP**: StoryCase は写真上・引用・FlowRail は縦 3 項に戻す（ただし py-2 圧縮）・総額/月々は横2連。マーキー1行。声5件は1col。

---

## 13. Faq（`sections/Faq.tsx`・id=faq）

- **(a) 現状**: 4/8 分割・5問アコーディオン・最重要1問 defaultOpen。PC **約0.9vp**。すでに機能的。
- **(b) 載せ替え**: 構造維持。微調整のみ: 左カラムの見出し＋リード＋ボタンの間隔を詰め、アコーディオン行の py を1段圧縮。defaultOpen・aria 要件・reduced-motion 対応（S11.client）は不変。
- **(c) 目標**: PC **0.8vp（−10%）** / SP 現状比 −10%。
- **(d) コピー座席**: h2・リード・「よくある質問をすべて見る」・faqItems 5問の Q/A 全文→現位置 verbatim。
- **(e) SP**: 現行どおり縦積み。

---

## 14. FinalCta（`sections/FinalCta.tsx`・id=final-cta・ink④）

- **(a) 現状**: t-display → 本文 → マイクロコピー＋CTA階段 → after contact / by phone の2col開示。PC **約0.9vp**。決断マスターとして概ね適正。
- **(b) 載せ替え**: 微調整のみ。開示 dl（after contact/by phone）を CTA 直下の **1行2セル台帳**（hairline 上罫・py-6）へ詰め、mt-12×2 を mt-8 へ。CTA階段・文言・順序は不変。
- **(c) 目標**: PC **0.85vp（−10%）**。
- **(d) コピー座席**: 全文現位置 verbatim（h2/本文/マイクロコピー/LINE/見学/資料請求/after contact 文/電話番号/営業時間）。
- **(e) SP**: 現行どおり。BottomCtaBar との重複余白だけ pb を1段減。

---

## 全体収支と実装ノート

**高さ収支（PC）**: 現状合計 ≈25.0vp（反復CTA帯3本≈1.05vp 含む）→ 設計後 ≈**16.3vp = 約35%圧縮**（目標30〜40%内）。SP: ≈40vp → ≈26vp（−35%）。最大貢献: Budget −1.7vp / Estimate −1.2vp / Voices −1.2vp / StandardSpec −0.9vp / Mechanism −0.9vp / Land −0.8vp。

**実装順（推奨）**: ① Estimate ② Budget ③ StandardSpec ④ Voices ⑤ Mechanism ⑥ Land ⑦ Anxiety ⑧ Promise ⑨ RentVsLoan ⑩ Trust ⑪ Models ⑫ Faq/FinalCta。①〜③だけで体感の半分が変わる。共有モジュール（BentoBoard/StatCard/DataBar/ChipRow/FlowRail/LedgerRow/PhotoTile）は `_shared/` へ先行追加し、FlowRail は Budget 現行実装の抽出、LedgerRow は `S02CostDiagram.tsx` AnnotationRow の低身長派生、DataBar は Budget SEG_META の一般化とする（データ源はすべて `_data.ts`・`@/data/brand-facts`・`@/data/staff` 現行 import のまま）。

**ガードレール同時解消**: `S04.client.tsx` の rounded-2xl/xl、`S08.client.tsx`・`Budget.tsx` PaymentCard の rounded-2xl/[6px] は radius ≤4px へ（本載せ替えに内包）。Estimate 開示表の `bg-risk-soft` 面塗りは左罫＋risk-dark 文字の「点」運用へ降格（sign-red は面と点のみ規約の範囲内でより軽く）。

**画像生成の使用点**: Mechanism の等角線画1点のみ（文字・数字なし・抽象線画・背景透過→cream 単色着色。純SVG フォールバック併記）。他は全てライブHTML・lucide stroke アイコン・実写真 allowlist。数字と日本語コピーの画像焼き込みはゼロ。

**字詰め規約適用**: 全リード 40em measure・見出し t-h2/t-h2-display の 20〜24ic measure 維持・新規直書き `<br>` なし（チップ/台帳の改行は全て構造由来）。SP で景表注記・caveat を隠す UI（アコーディオン/トグル）は全セクションで禁止のまま。
---

# ◆ imagery

計画を確定するために必要なファイルはすべて確認済み（14セクション全実装・photo allowlist・BRAND-TRUTH §1/§8・DESIGN_GUARDRAILS・globals.css トークン・2026-07-01 glanceable 計画のWS3図解8種）。以下が Higgsfield 生成アセット計画の最終版です。

---

# Higgsfield 画像生成 計画表（本番TOP /b-plan-v3・READ ONLY計画）

## 0. 全体規約（全アセット共通・生成前に毎回適用）

- **保存先**: `public/images/genart/{セクション名}/`（allowlist写真ディレクトリと物理分離。webp変換・実装は別担当）
- **文字ゼロ原則**: 数字・日本語・英語ラベルは一切画像に焼かない。ラベル/数字/寸法値はすべてライブHTML（Oswald tabular / Zen Kaku）でオーバーレイ。全プロンプトに no text 系ネガティブを必ず含める（下記各プロンプトに記載済）
- **禁止**: 偽物件外観（実在と誤認しうる写実の家）・人物の顔・日本語文字・SaaSネオン/グロー/派手グラデ・3Dプラスチック質感。人物は描かない（オブジェクトのみで工程を表現）
- **パレット固定**（@themeトークンをプロンプトへ直訳）: ink `#1D1D18` / cream `#F5EEE2` / deep olive green `#486B00` / lime `#A2C523`（点でのみ）/ paper `#FAFAFA`。新色を発生させない
- **世界観**: 編集誌 × 建築図面（hairline・非対称・余白）。「編集的データダッシュボード」= 建築仕様書/データジャーナリズムの文法として描く
- **モデル選定**: 日本語文字を入れない前提のため文字精度制約なし。**生成直前に必ず `models_explore(action:'recommend')` で当日の推奨モデルを確認**してから `generate_image` を叩く（下記の推奨は方向性の目安）。実写レタッチは generate ではなく image-to-image 編集系（+必要なら `upscale_image`）
- **納品ゲート**: DESIGN_GUARDRAILS「AI smell check」・BRAND-TRUTH §8チェックリスト・「大手側を貶める絵にしない」（§4ビジュアル同原則）を1点ずつ通す。実写レタッチは元写真パスをファイル名で追跡可能に（§AI retouching規定）

---

## A-01 家づくり6ステップ 等角ミニイラスト（6枚セット）— 優先P1

| 項目 | 内容 |
|---|---|
| 用途/配置 | WS3図解4 **BuildFlowSteps**（横スクロール6ステップ・新設受け皿）。想定配置=Promise末尾またはModels後（WS1確定待ち）。各ステップのビジュアルアンカー。ステップ名・説明文はHTML |
| 種別 | 純イラスト（等角アイソメ） |
| スタイル | 建築線画・等角アイソメ・インク線+生成り地+深緑1色差し。人物なし=モノで語る（①机上の資金計画書類 ②区画杭と巻尺 ③製図板と間取り図 ④モデルハウス玄関ドアと巻尺 ⑤軸組の骨組み ⑥鍵と植木鉢）。世界観=編集誌×建築図面。AIっぽい3Dグラデ・プラ質感禁止 |
| プロンプト（例=①。②〜⑥は括弧内の被写体だけ差し替え） | `Minimal isometric line illustration of (a consultation desk with folded documents, a calculator and a rolled floor plan), architectural drafting style, thin charcoal ink lines (#1D1D18) on warm cream paper background (#F5EEE2), one accent element in deep olive green (#486B00), flat matte editorial magazine illustration, generous negative space, precise hairline linework like a Japanese architecture spec sheet. --no text, letters, words, numbers, Japanese characters, kanji, typography, labels, watermark, logo, people, human figures, faces, neon colors, glow, gradients, 3D render, plastic sheen, drop shadows, photorealism` |
| AR/サイズ | 1:1・1024×1024（表示160〜220px想定） |
| 推奨モデル | フラットイラスト系（GPT Image系 or Seedream系。6枚のスタイル一貫性重視→同一モデル・同一プロンプト骨格で連続生成。models_exploreで当日確認） |
| 差し替え対象 | 現状受け皿なし（新規図解）。現在この情報は Promise/FinalCta の本文テキストのみ |

## A-02 土地探しフロー 等角イラスト（3枚セット）— 優先P1

| 項目 | 内容 |
|---|---|
| 用途/配置 | WS3図解6 **LandSearchFlow**（Land・id=land）。「希望を預ける→区画が出る→総額で見る」3ステップの図解アンカー |
| 種別 | 純イラスト（等角アイソメ・A-01と同一シリーズ） |
| スタイル | A-01と完全同スタイル（線幅・パレット・アングル統一）。①メッセージ吹き出し+地図ピン（LINEを想起させるが緑面は使わない・線画のみ）②区画割りされた分譲地ブロック ③一枚の集計表と家の輪郭 |
| プロンプト | `Minimal isometric line illustration of (a subdivided residential land plot with surveyor stakes and one highlighted parcel), architectural drafting style, thin charcoal ink lines (#1D1D18) on warm cream paper (#F5EEE2), single accent in deep olive green (#486B00), flat matte editorial illustration, hairline precision, generous white space. --no text, letters, numbers, Japanese characters, typography, watermark, logo, people, faces, buildings that look like real photographs, neon, glow, gradient, 3D render, photorealism` |
| AR/サイズ | 1:1・1024×1024 |
| 推奨モデル | A-01と同一モデル（シリーズ一貫性のため同セッションで生成） |
| 差し替え対象 | 現在Landは本文+実写マーキー+CSS AreaMapのみ。フロー図は存在しない（新規） |

## A-03 標準仕様 線画アイコンセット（8枚）— 優先P1

| 項目 | 内容 |
|---|---|
| 用途/配置 | WS3図解5 **StandardSpecCards**（StandardSpec）。8カードのヘッダアイコン: 耐震構造/制震ダンパー/外壁/断熱/キッチン/浴室・洗面/窓・玄関/保証。メーカー名・型番・「等級3に対応する構造」等の文言は全てHTML逐語（画像化禁止リスト） |
| 種別 | アイコン風グラフィック（単色線画） |
| スタイル | 建築図面のステンシル/凡例記号風。均一1.5pt相当のink単色線・塗りなし・角の丸め最小。icon+number+text量産UIに見えないよう、カード側は非対称レイアウトで受ける前提。生成後は `image_vectorize` またはSVGトレースで先鋭化を推奨（最終実装はSVGが理想） |
| プロンプト（例=制震ダンパー） | `Single minimal technical line icon of (a seismic damper device, two plates with a diagonal absorber), architectural blueprint legend style, uniform thin charcoal stroke (#1D1D18) on plain white background, no fill, geometric, engineering stencil aesthetic, centered, generous padding. --no text, letters, numbers, Japanese characters, typography, labels, watermark, color, shading, gradient, 3D, perspective, photorealism, people, faces` |
| AR/サイズ | 1:1・1024×1024（表示40〜64px） |
| 推奨モデル | 線画/アイコンに強いモデル（models_exploreで「minimal line icon」適性を確認）。8枚一括同スタイル |
| 差し替え対象 | 現在StandardSpecは罫線dlのテキスト行のみ。`newsozai/spec/icon-*.webp` は**実写設備写真**（8枚・下層で使用）でありTOPカード用線画とは役割が別＝重複しない |

## A-04 費用の2層構造 抽象等角アート（1枚）— 優先P1

| 項目 | 内容 |
|---|---|
| 用途/配置 | Estimate（id=costs）。S02CostDiagram の層①「総額＝本体価格＋販売運営費」の脇、または新CostChecklistの図解アンカー。家の原価ブロックの上に"外付けの薄い層"が積まれる抽象図。費目名・金額は全てHTML連番注釈が持つ |
| 種別 | 純イラスト（抽象図解アート） |
| スタイル | 分解等角図（exploded axonometric）。下段=家の輪郭ブロック（ink線画・安定）、上に浮く2〜3枚の薄い透過プレート（risk側だが**赤は使わない**=中立描写・ink 40%線）。mix-blend-multiply で生成り地に溶かす前提の白背景。大手を貶める記号（崩れた家・ガラクタ等）禁止 |
| プロンプト | `Exploded axonometric diagram illustration: a simple house volume drawn in thin charcoal ink lines (#1D1D18), with two or three thin abstract rectangular layers floating above it connected by fine hairline leader lines, architectural drawing aesthetic, on plain white background, flat matte, precise, editorial data-journalism style, calm and neutral. --no text, letters, numbers, Japanese characters, typography, labels, arrows with words, watermark, logo, red color, neon, glow, gradient, 3D render, plastic, photorealism, people, faces` |
| AR/サイズ | 4:3・1536×1152 |
| 推奨モデル | 線画図解に強い高精細モデル（models_explore確認） |
| 差し替え対象 | 現在は `bplan/s02-house-elevation-v2.webp`（立面線画・**継続使用**）のみ。本アセットは層①の関係式の視覚補強として追加（立面と競合しない別アングル） |

## A-05 Mechanism黒地用 分譲地×モデルハウス鳥瞰線画（1枚）— 優先P1

| 項目 | 内容 |
|---|---|
| 用途/配置 | Mechanism（id=mechanism・ink面）。SupportPyramid土台「自社分譲地モデルハウス二重利用」の背景/脇に置く白線アート。「展示場を建てない代わりに分譲地の実物を見せる」を絵で一発化 |
| 種別 | 純イラスト（黒地用・白線画） |
| スタイル | 鳥瞰アイソメの区画割り分譲地＋その一角の家1棟だけをlime点（面塗りせず輪郭+小さな点アクセント）。cream 80%の細線 on 透過/ink地。建築図面の敷地図(site plan)文法。光らせない・グロー禁止 |
| プロンプト | `Aerial isometric site plan line drawing of a small residential subdivision with parcel division lines and one single house volume subtly highlighted, drawn in thin warm off-white lines (#F5EEE2 at low opacity) on a very dark charcoal background (#1D1D18), architectural site-plan aesthetic, hairline precision, flat matte, editorial, quiet and restrained. --no text, letters, numbers, Japanese characters, typography, watermark, logo, people, faces, neon, glow effects, light rays, gradients, 3D render, photorealism, cars` |
| AR/サイズ | 16:9・2048×1152（右側非対称配置・上下フェード前提） |
| 推奨モデル | ダーク背景線画の破綻が少ないモデル（models_explore確認・黒地は苦手なモデルが多いので比較生成推奨） |
| 差し替え対象 | 現在Mechanismは図版ゼロ（CSSピラミッド+CSS円のみ）。新規追加 |

## A-06 「点線→実線」の家 スポットアート（1枚）— 優先P2

| 項目 | 内容 |
|---|---|
| 用途/配置 | Anxiety→Promise の接合部（Anxiety末尾 or Promise冒頭）。「見えないまま進む（点線）→見えてから決める（実線）」の主軸メタファーを1枚で。感情断定コピーは添えない（既存逐語のみ） |
| 種別 | 純イラスト（編集誌スポットイラスト） |
| スタイル | 家の輪郭の左半分が点線・右半分が実線+deep green の下線1本。1オブジェクト・余白極大。ink線 on cream |
| プロンプト | `Minimal editorial spot illustration: outline of a simple gabled house where the left half is drawn in dashed broken lines and the right half in solid confident lines, thin charcoal ink (#1D1D18) on warm cream paper (#F5EEE2), one short deep olive green underline stroke (#486B00) beneath the solid half, huge negative space, Japanese architecture magazine aesthetic, flat matte. --no text, letters, numbers, Japanese characters, typography, watermark, logo, people, faces, neon, glow, gradient, 3D, shading, photorealism` |
| AR/サイズ | 3:2・1536×1024 |
| 推奨モデル | フラットイラスト系（A-01と同系でトーン統一） |
| 差し替え対象 | 現在Anxietyは完全テキスト（状況グリッド5件）。新規 |

## A-07 対応エリア地形テクスチャ（AreaMap背景・1枚）— 優先P1

| 項目 | 内容 |
|---|---|
| 用途/配置 | Land の `AreaMap`。現在のCSS radial+linear グリッド背景を、等高線+区画の線画テクスチャへ差し替え。**地名ピン（奈良市/大和郡山市等）は現行HTMLピンをそのまま重ねる**＝画像に地名は入れない。実在地図の正確再現ではなく抽象地形（誤認防止のためrole=imgのaria-labelは現行文言維持） |
| 種別 | テクスチャ（図解用アートパーツ） |
| スタイル | 国土地理院図/データジャーナリズムの等高線文法。main 10%相当の極薄オリーブ線 on paper。盆地状の同心等高線+川筋1本+微細グリッド |
| プロンプト | `Abstract topographic map texture: gentle concentric contour lines forming a wide basin valley, one thin meandering river line, faint square survey grid, drawn in very light olive green hairlines (#486B00 at low opacity) on near-white paper background (#FAFAFA), cartographic minimalism, data journalism aesthetic, flat, subtle, seamless composition. --no text, letters, numbers, place names, Japanese characters, typography, labels, pins, icons, watermark, logo, roads network detail, satellite imagery, 3D relief shading, colors other than pale olive on white, photorealism` |
| AR/サイズ | 4:3・1600×1200（現行 `aspect-[4/3]` に一致） |
| 推奨モデル | テクスチャ/パターンに強いモデル（models_explore確認） |
| 差し替え対象 | 現在は CSS `radial-gradient` + `linear-gradient` グリッド（Land.tsx AreaMap内） |

## A-08 家賃と持ち家 抽象スポットアート（1枚）— 優先P2

| 項目 | 内容 |
|---|---|
| 用途/配置 | RentVsLoan。Open Spec比較（家賃例90,000/月々81,298〜95,413=HTML静止数字）の脇。左=流れて消える水流モチーフではなく**中立描写**: 左=積まれない硬貨列、右=硬貨が家の輪郭に積み上がる等角図。「家賃は消える」を主役化しない規律に合わせ小さめ・補助扱い |
| 種別 | 純イラスト（抽象図解） |
| スタイル | ink線+deep green 1差し。等角ミニ。挑発的・煽り記号（燃える金・ゴミ箱等）禁止 |
| プロンプト | `Minimal isometric line illustration, two-part composition: on the left a short neat row of flat coins lying on the ground, on the right coins gently stacked forming the stepped silhouette of a small house, thin charcoal ink lines (#1D1D18) on warm cream paper (#F5EEE2), one deep olive green accent line (#486B00), flat matte editorial style, calm, neutral, generous spacing. --no text, letters, numbers, currency symbols, Japanese characters, typography, watermark, logo, people, faces, fire, trash, negative symbols, neon, glow, gradient, 3D render, photorealism` |
| AR/サイズ | 3:2・1536×1024 |
| 推奨モデル | A-01同系 |
| 差し替え対象 | 現在RentVsLoanは図版ゼロ（BurnNumber静止数字のみ）。新規 |

## A-09 総額内訳ミニグリフ 3点（建物/土地/諸費用）— 優先P2

| 項目 | 内容 |
|---|---|
| 用途/配置 | Budget（id=payment・ink面）の段積みバー凡例 + WS3図解1 TotalBreakdownBar。現在の色チップ■の代替。金額(万円)は現行HTML維持 |
| 種別 | アイコン風グラフィック（3枚） |
| スタイル | A-03と同一線画言語のcream白線版（ink面用）。①家の軸組 ②区画ブロック ③書類スタック |
| プロンプト（例=③） | `Single minimal technical line glyph of (a small stack of paper documents with one folded corner), blueprint legend style, uniform thin warm off-white stroke (#F5EEE2) on very dark charcoal background (#1D1D18), no fill, geometric, centered, generous padding. --no text, letters, numbers, Japanese characters, typography, watermark, color accents, shading, gradient, glow, 3D, photorealism, people` |
| AR/サイズ | 1:1・512〜1024px（表示20〜28px。最終はSVG化推奨） |
| 推奨モデル | A-03と同一 |
| 差し替え対象 | Budget SEG_META の色チップ（`h-2.5 w-2.5` の正方形）。※置換は任意・A/B判断はAD |

## A-10 生成り和紙テクスチャ（ivory面用・タイル1枚）— 優先P3

| 項目 | 内容 |
|---|---|
| 用途/配置 | ivory面（Promise/StandardSpec/Models/Trust/Voices）の背景に不透明度3〜5%で敷く微細紙目。フラット面の"AIっぽい無菌さ"を消す。**「生成り×緑×LDK」のAI平均値回避のため、質感は視認限界ギリギリに留める**（design-critic通過必須） |
| 種別 | テクスチャ |
| スタイル | 和紙の繊維ムラのみ。柄・模様・雲紋なし |
| プロンプト | `Seamless tileable texture of plain warm washi paper, extremely subtle fiber grain and slight tonal unevenness, uniform warm cream color (#F5EEE2), no pattern, no motif, flat lighting, high resolution scan aesthetic. --no text, letters, Japanese characters, typography, watermark, visible seams, folds, wrinkles, stains, decorative patterns, flowers, gradients, vignette, 3D, shadows` |
| AR/サイズ | 1:1・2048×2048（タイル・webp圧縮で50KB以下目標） |
| 推奨モデル | テクスチャ系（シームレス指定可否をmodels_exploreで確認） |
| 差し替え対象 | 現在フラット単色 `#F5EEE2`（`breath/material-band.png` は/breath用の帯素材で用途別＝重複しない） |

## A-11 チャコール紙目テクスチャ（ink面用・タイル1枚）— 優先P3

| 項目 | 内容 |
|---|---|
| 用途/配置 | ink面4節（Hero/Budget/Mechanism/FinalCta）に不透明度2〜4%。真っ黒フラット面の平板さを消す |
| 種別 | テクスチャ |
| スタイル | A-10のチャコール版。粒子は微細・グロー厳禁 |
| プロンプト | `Seamless tileable texture of deep charcoal paper, very subtle fine grain and faint fiber structure, uniform near-black warm charcoal (#1D1D18), matte, flat even lighting, archival paper scan aesthetic. --no text, letters, Japanese characters, watermark, visible seams, scratches, dust sparkle, glow, vignette, gradients, patterns, 3D, photorealistic objects` |
| AR/サイズ | 1:1・2048×2048 |
| 推奨モデル | A-10と同一 |
| 差し替え対象 | 現在フラット単色 `#1D1D18`（surface-ink） |

## A-12 FVポスター 空・時間帯レタッチ（実写・1枚）— 優先P1

| 項目 | 内容 |
|---|---|
| 用途/配置 | Hero（id=hero）。`public/videos/fv/yamato-fv-montage-poster.webp`（reduced-motion/Save-Data時とロード中の静止背景）。WS5「FV明度改善」＝overlay変更(実装済bbb2752)に加え、**元素材自体を明るい朝〜午前光へ**。建物・外構・形状は1pxも変えない（BRAND-TRUTH §AI retouching: 空/光/色温度のみ可・改変禁止・元パス追跡必須） |
| 種別 | 実写レタッチ（image-to-image） |
| スタイル | 空の入れ替え(晴天薄雲)+露出+色温度のみ。ファイル名 `yamato-fv-montage-poster__sky-am.webp` で出所追跡 |
| プロンプト | `Photo retouch only: brighten this exterior photograph to clear late-morning daylight, replace overcast sky with a soft blue sky with thin high clouds, slightly warmer color temperature, natural exposure lift on the facade. Keep the building, windows, materials, landscaping and composition exactly identical. --no text, letters, Japanese characters, watermark, no changes to architecture or structures, no added objects, no people, no lens flare, no HDR halo, no oversaturation` |
| AR/サイズ | 元ポスターと同寸（16:9系）。仕上げに `upscale_image` で2K確保 |
| 推奨モデル | 編集系image-to-image（media_upload/media_import_url→編集モデル。models_exploreで「photo edit / relight」適性確認） |
| 差し替え対象 | 現行 `yamato-fv-montage-poster.webp`（暗め・ink overlayと重なり沈む） |

## A-13 Hero外観2枚の時間帯統一レタッチ（実写・2枚）— 優先P2

| 項目 | 内容 |
|---|---|
| 用途/配置 | FVモンタージュ再エンコード用素材更新: `fv/hero-01-exterior-miyamaki.webp`・`fv/hero-02-exterior-sakyo.webp` を A-12 と同一の朝光トーンへ統一（動画再生成はSeedance担当へ引き継ぎ・本計画は静止素材まで） |
| 種別 | 実写レタッチ（image-to-image） |
| スタイル | A-12と同一指示・同一色温度値。`hero-01-exterior-miyamaki__sky-am.webp` 等で追跡 |
| プロンプト | A-12と同文（対象写真差し替えのみ） |
| AR/サイズ | 元画像と同寸維持→`upscale_image` |
| 推奨モデル | A-12と同一 |
| 差し替え対象 | 現行 `fv/hero-01`・`fv/hero-02`（モンタージュ内で暗部が重い2カット） |

## A-14 稜線ラインアート（セクション区切り・1枚）— 優先P3（任意）

| 項目 | 内容 |
|---|---|
| 用途/配置 | Trust→Voices間 または V3Footer直上の編集的アクセント帯（高さ80〜120px・1箇所のみ）。「奈良の山並み」の抽象稜線＝地域性を偽物件なしで示す |
| 種別 | 純イラスト（ワイド線画） |
| スタイル | 連続する1本線の山並み稜線+極薄の等高線2本。ink 20%線 on 透過。装飾は本1点のみ（量産禁止） |
| プロンプト | `Ultra-wide minimal line art of a gentle mountain ridge silhouette of a Japanese basin landscape, one continuous thin charcoal contour line (#1D1D18 at low opacity) with two fainter parallel contour echoes below, on plain white background, huge horizontal negative space, architectural section-drawing aesthetic. --no text, letters, Japanese characters, typography, watermark, logo, sun, clouds, birds, trees detail, buildings, color, gradient, 3D, photorealism` |
| AR/サイズ | 21:9・2560×1080（横トリミング前提） |
| 推奨モデル | 線画系（models_explore確認） |
| 差し替え対象 | 現在該当位置は罫線のみ。新規・AD承認後のみ実装 |

---

## 実行順序と重複回避サマリ

- **P1（Phase1図解受け皿と同期）**: A-03 → A-01 → A-02 → A-07 → A-04 → A-05 → A-12（計28枚+レタッチ1）
- **P2**: A-06 / A-08 / A-09 / A-13、**P3（AD承認後）**: A-10 / A-11 / A-14
- **既存と重複させない確認済事項**: 立面線画は `s02-house-elevation-v2.webp` 継続使用（再生成しない）／`newsozai/spec/` は実写・A-03は線画で役割分離／`house-generic/house-yamato`・`blueprint-bg`・`voice-bubbles`・`breath/` は他用途資産のため触らない／Models のカバーは実写 `fv/plan-*.webp` 維持（生成物で置換しない）
- **不変ガード再掲**: 確定コピー・canonical数字（京2,280/花風2,480/600棟/常時150区画程度/15年/1,000件/50組/月々86,944・95,413・81,298）・CTA階層・id 10種・countUp2箇所・黒地ink4節はこの計画で一切触れない。全数字・全日本語はHTMLレイヤーが持ち、生成画像は「文字なしの器」のみ供給する

参照ファイル: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/b-plan-v3/`（page.tsx・sections/*）、`BRAND-TRUTH.md` §Photo allowlist/§AI retouching、`DESIGN_GUARDRAILS.md`、`docs/notes/2026-07-01-lp-glanceable-redesign-plan.md`（WS3図解8種）、`src/app/globals.css`（トークン）
---

# ◆ motion

以下、READ ONLY 監査に基づくモーション/インタラクション実装可能仕様です。現状コード（`src/app/b-plan-v3/` 全14セクション＋`_shared`＋`src/hooks/useScrollIn.ts`/`useCountUp.ts`＋`globals.css` 161–475行・778–964行の v3 ブロック）と正本（DESIGN_GUARDRAILS.md、docs/notes/2026-06-25-top-reboot-framework.md §4 モーション憲法 M1–M17、docs/notes/2026-07-01-lp-glanceable-redesign-plan.md WS3 図解8種）を突合済み。

---

# ダッシュボード化後モーション設計仕様（/b-plan-v3・Phase2図解受け皿用）

## 前提（変えない土台）
- モーション憲法: transform/opacity のみ・CLS 0・叫ぶ=countUp は Budget月々（M16）と Trust600（M4）の2箇所固定・グロー/パルス/蛍光禁止・reduced-motion 完全対応。
- 既存確定値を継承: ease-burn=`cubic-bezier(0.16,1,0.3,1)`／バー専用=`cubic-bezier(0.2,0.82,0.18,1)`（M10）／マーキー PC36s/SP44s／FAQ 250–350ms（M15）／CTA hover 矢印X+4px 180–240ms（M17）。
- 新規トークン（globals.css v3ブロックに**追加のみ**）: `--dur-micro:200ms` `--dur-reveal:640ms` `--dur-bar:980ms` `--ease-burn` `--ease-bar`。以後の新モジュールは全てこの5トークン参照（直書きms禁止）。

## (1) モジュール別モーション表

| モジュール | 挙動 | 移動量 | 時間 | イージング | 発火条件 | 備考 |
|---|---|---|---|---|---|---|
| **BentoBoard**（StandardSpecCards 8枚・WorksCards 等の非対称盤面。`sections/_parts/` 配置） | 盤面は不動、子タイルのみ opacity 0→1 + translateY | Y+16→0 | 各640ms | ease-burn | 親 RevealGroup の IO once（rootMargin `0 0 10%`） | stagger=DOM順 cascade 70ms・**遅延上限560ms**（8枚目以降は同値に丸め）。盤面自体の scale/枠アニメ禁止（CLS 0・カタログの潔さ） |
| **StatCard**（WS4 数字統一カード: 600/1,000/150/2,280/月々） | カード1体で fade+上昇（内部micro-stagger禁止=1カード1到着） | Y+8→0 | 560ms | ease-burn | 親 RevealGroup | 数字は**静止**（countUp 追加厳禁）。lime 下線を持つ場合のみ既存 `.rule-draw`（scaleX 0→1・460ms）を到着+120ms 後に。blur-in/グロー禁止 |
| **DataBar**（TotalBreakdownBar / RentVsLoanBar / GeneralVsYamato のバー） | **scaleX 0→1**（width 直アニメ禁止=M10）。Budget段積みバーは3セグメントを**ラッパー1本ごと**伸長（セグメント個別だと比率が読めない） | scaleX 0→1・origin: left（比較2本は共通基線） | 980ms | `--ease-bar` | 親 RevealGroup の IO once（「見えた瞬間に1回で比率を教える」を優先し scroll-driven にしない） | 数値ラベルはバーの**外**に静止配置＝transform でラベルが動かない構造。バー完了後にセグメント名 opacity 0→1（240ms・delay 720ms）。reduced-motion: scaleX(1) 即時 |
| **ChipRow**（Budget 相互証明チップ列・Estimate「含まれる/別途/発生しない」3語・CostChecklist ✓行） | チップ逐次 opacity 0→1 + translateY。チップ間矢印はチップ i 完了後に opacity のみ | Y+6→0（矢印は移動なし） | チップ320ms／矢印120ms | ease-out | 親 RevealGroup・stagger 80ms | 「土地→建物→総額→月々」の読み順を一度だけ動きで教える役。✓アイコンは stroke 線描でなく **opacity+scale(0.9→1) 240ms**（transform/opacity 縛り遵守） |
| **FlowRail**（BuildFlowSteps / LandSearchFlow 横レール） | スナップ=**CSSネイティブ** `scroll-snap-type: x mandatory`＋子 `snap-align: start`（JS 0）。入場はレール全体1回の fade+Y+12→0（ステップ個別staggerはSPで見えず過剰） | Y+12→0 | 600ms | ease-burn | 親 RevealGroup | 進捗 hairline は (2)-B 参照。端は既存マーキーと同型の mask-image グラデでアフォーダンス。左右ボタンを置く場合 hover は M17 準拠 |
| **PhotoTile**（写真分散: Promise/StandardSpec 追加写真・WorksCards・StoryCase 大写真） | **常時ループ Ken Burns は不可**。①Hero動画＋マーキー3本で常時動き予算満了 ②ゴシック/カタログ文法と衝突。許可は **hover 時のみ** scale 1→1.04（`@media (hover:hover)` 限定・SPは無し）。入場は opacity のみ 0→1（translateYなし＝写真は「地」） | scale 1→1.04／入場 opacityのみ | hover 700ms／入場480ms | ease-burn | hover / 親 RevealGroup | StoryCase 実写真に clip-path・パン等の演出禁止（実写真の誠実さ）。既存 `.hero-ken-burns` を新規流用しない |

既存モジュールは現行値を凍結: KineticHeading（820ms/90ms行stagger）、マーキー（Land 1本＋Voices 2本・hover/focus-within 停止・reduced-motion `overflow-x:auto`）、FAQ grid-rows 0fr→1fr、countUp 2箇所（1400/1600ms・IO≥0.4）。**追加ルール1件**: KineticHeading は「大見出し5本」（FV/Anxiety/Budget/Estimate/FinalCta 相当）にのみ許可。語気ダウンされる降格9本の見出しは行マスクを外し RevealGroup の `.scroll-in` のみ（見出しヒエラルキーを動きでも表現）。

## (2) スクロールテリング候補（2箇所・これ以外は入れない）

**採用A — Estimate（id=costs）「費用開示の進捗ラダー」**: EstimateDisclosure 6行の左に垂直 hairline（`--color-border`→main）を置き、**CSS scroll-driven**（`animation-timeline: view()`＋`animation-range: entry 20% cover 75%`）で scaleY 0→1（origin: top・linear=スクロール従属）。「契約前に一つずつ全部見る」を読む速度と同期した1本の線で可視化する。実装方式: `@supports (animation-timeline: view())` でネイティブ、非対応・reduced-motion・JS無効は**線を静的全表示**（装飾なのでJSフォールバック不要＝IO追加ゼロ）。行本体の reveal は既存どおり（統合後は RevealGroup）。

**採用B — FlowRail の自己進捗バー**: レール上端の hairline を `animation-timeline: scroll(self inline)` で scaleX 0→1（横スクロール量に従属・時間なし）。ユーザー主導なので憲法の「scroll-driven > time-driven」に合致。非対応は非表示、reduced-motion は animation none＋全幅表示。IO 0・JS 0。

**不採用と理由（再提案禁止）**: sticky/pin の長回し比較（Budget 3事例や Mechanism ピラミッドの scrub 積み上げ）は、①SP の可変ビューポートで pin が CLS/操作事故源 ②countUp（叫ぶ②）と競合し「叫ぶのは2箇所」が崩れる ③専務承認文法=カタログの潔さと衝突、のため導入しない。sticky を使うなら**モーションでなくレイアウト**（EstimateDisclosure の列ヘッダ `position: sticky`・アニメなし）まで。

## (3) hover / focus 統一ルール（全モジュール共通・唯一の正）
1. **動くのは「押せるもの」だけ**。非インタラクティブなカード・図解の hover lift（translateY/shadow/scale）禁止。
2. 面ボタン（LINE/見学/資料）: `transition-colors 200ms`＋内包矢印 `translateX(4px) 200ms`（M17 帯域内）。背景色以外を動かさない。
3. text-link: 下線 on/off（即時）＋矢印 X+4。**opacity hover は廃止方向**（Estimate.tsx:66 の `hover:opacity-70` は `text-main→text-main-dark` の color 遷移へ統一。数字・本文の透過は可読性低下）。
4. PhotoTile: `@media (hover:hover)` でのみ scale 1.04／700ms（上記表）。
5. focus-visible: globals.css `.v3-scope` 規定（明地=main 2px／暗地・bg-line=cream 2px・offset 2px）を唯一の正とし、コンポーネント側の個別 ring 定義を追加しない。**hover で起きる矢印移動は `group-focus-visible:` でも発火**させる（キーボード同等性）。
6. マーキーの hover/focus-within 停止は現行維持（唯一許可される「hoverで止まる」パターン）。

## (4) 既存 useScrollIn / S02Reveal / KineticHeading との統合方針（IO 乱立回避）
現状 IO は4系統: `useScrollIn`（hooks・S02Reveal/S04/S08/KineticHeading が使用）／`Mechanism.tsx:36` ローカル `useReveal`／`Estimate.client.tsx:17` ローカル `useReveal`（**同一実装の重複コピー2つ**）／`useCountUp` 内蔵 IO。統合仕様:

1. **`S02Reveal` を `_shared/RevealGroup.tsx` へ昇格・改名**（実体は現 `useScrollIn(true)` ラッパのまま）。命名から S02 依存を外し、全14セクションの reveal 発火点をこれ1本に。
2. **ローカル `useReveal` 2コピーを廃止**し、Mechanism/Estimate.client の inline style 直書き（opacity/transform/transitionDelay の JS 計算）を `.scroll-in`＋CSS変数 `--reveal-delay`（子側で指定・未指定時は useScrollIn の 50ms 自動採番）に置換。挙動・値は現行と同一（Y+20→0/760ms 等はクラス側 modifier で維持）。
3. **KineticHeading の二重 IO 解消**: RevealGroup 内に置く場合は `observe={false}` variant を追加し、globals.css に親起点セレクタ `.is-visible .kin-line { transform: translateY(0) }`（追加のみ）で親の `.is-visible` を継承。単独使用時のみ自前 IO。
4. **新モジュール（BentoBoard/StatCard/DataBar/ChipRow/FlowRail/PhotoTile）は個別 IO 新設禁止**。全て親 RevealGroup の `.is-visible` 子孫セレクタ＋`--reveal-delay` で駆動。scroll-driven 2箇所（(2)A/B）は IO 自体不要。
5. 上限規律: **1セクション=IO最大1（RevealGroup）**＋countUp 専用 IO 2（threshold 0.4 が異なるため統合しない）＝ページ全体で観測者 ≤16。`useCountUp` は変更しない（SSR実数・in-viewport skip の既存挙動が正）。

## (5) パフォーマンス予算（合格ゲート）
- **LCP ≤ 2.5s（モバイル p75・目標 2.2s）**: LCP候補は Hero poster webp / h1。**LCP要素に entrance アニメを付けない**（現行 h1 は無アニメ＝維持。opacity:0 開始は全域禁止）。poster ≤120KB・`preload="metadata"` 維持・above-the-fold への画像/動画追加禁止。poster に `fetchpriority="high"` を実装時検討。
- **CLS = 0.00（モーション起因）**: transform/opacity 限定・バー/ラダーは scale 方式で領域確保済み・写真は aspect-ratio 予約（既存踏襲）・`t-burn` の `contain:layout` 維持。sticky 導入時も高さ固定要素のみ。
- **INP ≤ 200ms**: hover/reveal は全てコンポジタ処理。rAF+setState は countUp 2箇所のみ（追加禁止）。
- **JS 追加 0KB**: GSAP/Lenis/Motion 不採用。全て CSS＋既存 IO＋ネイティブ scroll-snap/scroll-driven。
- **常時アニメ上限**: 無限ループは Hero動画＋マーキー3本（Land1/Voices2）で満了。新規常時ループ（Ken Burns 含む）追加禁止。`will-change` はアニメ対象トラック/行のみ（恒常付与しない・現行準拠）。
- 検証: `npm run build` 緑／Lighthouse mobile Perf ≥90／DevTools Paint flashing でアニメ中の再ペイントなし／reduced-motion エミュレーションで「全静止＋全情報即表示＋マーキー手動スクロール可」／JS無効で本文消失なし（`.scroll-in` の scripting フォールバック確認）。

**実装順序**: ①トークン5種＋RevealGroup 昇格＋useReveal 重複解消（挙動不変のリファクタ）→ ②WS3 図解が入るたび本表の値を適用 → ③scroll-driven 2箇所は図解安定後に最後（装飾レイヤ）。

主要参照ファイル: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/hooks/useScrollIn.ts`・`src/hooks/useCountUp.ts`・`src/app/b-plan-v3/sections/S02.client.tsx`（RevealGroup昇格元）・`src/app/b-plan-v3/sections/Mechanism.tsx:36` と `sections/Estimate.client.tsx:17`（useReveal重複）・`src/app/b-plan-v3/_shared/KineticHeading.tsx`・`src/app/globals.css:161-475, 778-964`・`docs/notes/2026-07-01-lp-glanceable-redesign-plan.md`（WS3図解8種=本仕様の載せ先）。