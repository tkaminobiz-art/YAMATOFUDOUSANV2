# やまとTOP「見ただけで分かるLP」改善 マスタープラン（2026-07-01）

## 確定事項（2026-07-01 AD承認）
1. **進め方=Phase1クイックウィン先行**。14→11統合は最終フェーズ（Phase3）へ。
2. **FV=明度改善のみ先行**（総額試算カードは効果検証後・憲法4.1配慮）。
3. **大見出し5本=FV／不安の代弁／月々事例／費用透明性／最終CTA**。他9本はラベル/図解タイトルへ降格。
4. **黒面(ink)=反復CTA帯3本を明地化し、黒は FV/Budget/Mechanism/FinalCta の4節に限定**。緑はCTAと重要数字へ集約。

**Phase1 実装バンドル**: (a)FV明度 (b)反復CTA帯の明地化=黒面7→4 (c)大見出し以外9本の語気ダウン (d)図解の受け皿新設(本文はまだ削らない)。

## Context（なぜ）
新14セクションTOP（見えてから決める軸）はコンセプト・素材は強いが、**「説明資料をWebに並べた」状態＝読ませすぎ**。神野さん(AD)方針: **読ませるLP→見ただけで分かるLPへ。説明を"削る"のではなく"図解に置換"**。文章半減・1セクション1メッセージ・強調緑はCTAと重要数字だけ・表を減らす・黒面を絞る・"上質な建築メディア風"（写真大きく・余白と数字を整理）。

正本の優先: `BRAND-TRUTH.md` > `DESIGN_GUARDRAILS.md` > `docs/project-context/`。主軸コピー「土地も、建物も、月々も。見えてから決める家づくり。」とcanonical数字・確定コピー・CTA階層・写真allowlistは**不変**。

## 成功基準
- 体感の縦長を **30〜40%短縮**（本文半減・図解置換で理解度はむしろ上げる）。
- 大見出し(フルパワー)を **5箇所**に限定、他は図解タイトル/分類ラベルへ降格。
- 各セクション**本文≤120字・1メッセージ**。重複メッセージ（総額/標準仕様/増えやすい費用/月々の考え方）を各1箇所へ。
- 黒面(ink)を **現7 → 3〜4**。緑を **CTA＋重要数字**へ集約。
- 図解8種で「費用・流れ・仕様・事例」を可視化。写真を各セクションへ分散＋FVを明るく。

---

## 責任者(オーナー) × スキル
| # | ワークストリーム | 責任者 | 実装エージェント | スキル |
|---|---|---|---|---|
| WS1 | 情報設計（統合・見出し階層・CTA配置） | 情報設計オーナー | feature-dev:code-architect | lp-os-master / copywriter / natural-japanese |
| WS2 | コピー圧縮（≤120字・1メッセージ・重複削除） | コピー圧縮オーナー | general-purpose→code-architect | copywriter / natural-japanese |
| WS3 | 図解8種（費用/流れ/仕様/事例の可視化） | 図解オーナー | feature-dev:code-architect | frontend-design / web-design-creation / a11y-audit |
| WS4 | デザインシステム/美学（黒面配分・緑集約・数字統一・カード洗練） | デザインシステムオーナー | feature-dev:code-architect | web-design-creation / design-tokens |
| WS5 | 写真戦略・FV明度改善 | 写真/ADオーナー | code-architect＋general-purpose(監査) | web-design-creation / design-critic / a11y-audit |
| — | 横断QA（整合・順序・逸脱監査） | 統合Critic | code-reviewer / design-critic | — |

各実装後の検証: `npm run build`／`natural-japanese`(translation-tells 20項目)／`design-critic`(5軸)／`a11y-audit`(overlay/アコーディオン)／ブラウザ目視。

---

## 現状の正しい理解（着工前の前提・Critic是正済）
実 `page.tsx` の描画順（**この実順を唯一の起点にする**）:
**Hero → Anxiety → Promise → [CTA帯] → StandardSpec → Estimate → Budget → [CTA帯] → RentVsLoan → Models → Land → Mechanism → Trust → Voices → Faq → FinalCta → [CTA帯]**

- **Estimate(id=costs) は Budget(id=payment) の前**。
- **黒面(surface-ink)は実7つ**＝Hero/Budget/Mechanism/FinalCta の4セクション＋反復CTA帯3本。
- **countUpは Budget月々／Trust600 の2箇所のみ**（二度打ち規律・維持）。
- id: hero/costs/payment/product/land/mechanism/trust/voice/faq/final-cta（統合・降格でも**維持必須**＝ナビ/サイトマップが依存）。

---

## ワークストリーム要点

### WS1 情報設計（優先: 最終フェーズ）
- **統合(14→11)写像**: 〔総額とは何か〕=Anxiety+Promise / 〔月々事例〕=Budget+RentVsLoan / 〔事例・声〕=Trust+Voices を各1本へ。他は据置。
- **大見出し5本**（下記AD論点⑤で確定）。他9本は t-h3+t-eyebrow の図解タイトル/分類ラベルへ降格（=削除でなく格下げ）。
- **反復CTA 3→2本**（月々事例クライマックス直後＝最強発火点／最終）。CTA帯の黒面化は明度ウェーブから外して数える。
- **新規**: `MergedSectionShell`（大見出しを親に集約）/ `SectionLabel`（降格見出し用）/ `SpCollapse`（SP折りたたみ）。
- ⚠️ Critic指摘: Budget(ink)とRentVsLoan(base)の**surfaceが違う縦連結**は視覚破綻→merge時は明度を揃えるか非merge。id保持必須。

### WS2 コピー圧縮（優先: 高／図解の後に本文削除）
- **本文半減 before→after を全セクション逐語確定**（例 Hero sub 102字→58字、Promise 2段落→1段落54字、Estimate/Budget/Mechanism/StandardSpec/Land/RentVsLoan/Voices/FinalCta も同様）。
- **重複統合マップ**: 標準仕様の設備列挙→StandardSpec 1箇所／1,000件→Trust 1箇所／つなぎ融資・地盤改良→Estimate主・他は1文言及／月々の考え方→Budget(年収でなく月々)とRentVsLoan(家賃比較)で役割分離。
- 禁: 賢い言い換え（「立ち会ってきた」型・**Trust現行文に既存の是正対象あり→修正**）／過剰詩化（体言止め連発）／感情断定／過剰断定。実声(_data)は不変。

### WS3 図解8種（優先: 高／本文削除より先に受け皿を作る）
1. **TotalBreakdownBar**（総額内訳・Budget段積みバー強化・parts算出・静止）
2. **GeneralVsYamato**（一般vsやまと左右対比・costCompareRows・グレー→緑）
3. **RentVsLoanBar**（家賃vs月々 同一スケール水平2バー・静止）
4. **BuildFlowSteps**（家づくり6ステップ横スクロール・新規 buildSteps）
5. **StandardSpecCards**（標準仕様アイコンカード8枚＋詳細アコーディオン）
6. **LandSearchFlow**（土地探し3-4ステップ・BuildFlowSteps再利用）
7. **CostChecklist**（費用✓リスト・zeroItems/含む・別途・景表注記保持）
8. **WorksCards**（施工事例カード・写真大・concern→headlineをBefore/After流用・捏造禁止）
- 全図: @themeトークンのみ（新hex禁止）・canonical値は_data算出（直書き禁止）・countUp足さない・a11y。**図解は本文の"置換"であり追加ではない＝対応本文を必ず削る**。

### WS4 デザインシステム/美学（優先: 高・独立着手可）
- **パレットは新色不要**＝既存 ink(#1D1D18チャコール)/cream(#F5EEE2生成り)/main(#486B00オリーブ深緑)/lime/paper/base が既に"建築メディア風"。変えるのは**黒面の面積配分**。
- **黒面 7→3〜4**: 反復CTA帯3本を明地(base/ivory)化しCTAだけ緑に。黒残しは FV/Budget(クライマックス)/FinalCta（＋任意で1）。
- **緑をCTAと重要数字だけに**: 現状の見出し下線・ラベル・面の緑を棚卸しし、装飾緑を deep-green罫/ink文字へ置換。
- **数字ディスプレイ統一**: 600/1,000/150/2,280/月々を同一ルールのカード(Oswald tabular・ラベル位置固定)で。
- **カード洗練**: 角丸小(≤6px・既存準拠)・薄罫・影最小(shadow-md禁止・既存準拠)・余白増。見出しウェイト階層(大900/中/本文軽/数字Oswald)。
- BRAND-TRUTH §1 の色定義**更新不要**（面積配分のみ）。DESIGN_GUARDRAILS整合。

### WS5 写真・FV明度（優先: 高・FV明度は独立着手可）
- **FV明度**: overlay を `rgba(29,29,24,0.96→0.64)` → **非対称 `100deg, 0.86→0.66→0.30→0.08`**（左28-40%だけ濃く文字可読、右は写真が明るく抜ける）。a11y実測ゲート（左帯≥0.66）。SPは縦グラデへ出し分け検討。
- **背景ソース**: 暗い夜景素材を避け、明るい昼外観/暮らし(newsozai/hero-day系, fv/hero-03-living等)へ。
- **写真分散**: photo-lessの Promise/StandardSpec 等へallowlist写真を意味づけて添える（Promiseに打合せ/図面、StandardSpecに設備質感サムネ小、Landに分譲地/道路/区画図/地図の4点、Voicesに打合せ/引渡し）。
- **FV総額試算カード**（AD論点③）: 追加は憲法4.1(安さ非訴求)と緊張→**明度改善のみ先行、カードは効果検証後**を推奨。
- AIレタッチ許容(露出/時間帯/色)・禁止(建物改変)・allowlist厳守(偽物件/偽顧客/AI外観禁止)。不足は「要撮影」フラグ。

---

## フェーズ計画（Criticの依存解析に基づく・順序厳守）

**Phase 0 — 着工前（ブロッカー解除）**
1. 実 page.tsx 描画順を起点に写像を確定（本書の「現状の正しい理解」）。
2. AD判断5件（下記）を確定。
3. copywriter+natural-japanese で**大見出し5本**を確定（WS2の起点）。

**Phase 1 — 高優先・独立・低リスク（推奨: 最初の着工バンドル）**
- WS5 **FV明度改善のみ**（overlayグラデ差替1点・総額カードは除外）。
- WS3 **図解の受け皿を新設**（本文は削らない・データ接続のみ）。
- WS2 **大見出し以外9本のトーンダウン**（図解非依存の語気調整）。
- WS4 **黒面削減（反復CTA帯の明地化）＋緑の集約**（面積配分・独立着手可）。

**Phase 2 — 図解完成後に本文削除**
- 図解が視認確認できた**後**、WS2が対応本文を削除（情報欠落防止・図解→本文削除の順厳守）。
- _data.ts に buildSteps/landSteps 追加（図解4/6）。

**Phase 3 — 構造再編（最高リスク・最後）**
- WS1 統合(14→11)・見出し降格の親集約・反復CTA 3→2本。id保持。Mechanism移動を含めるかは論点②。

**逆流禁止**: 統合(Phase3)を先にやると WS2/3/5 の対象ファイルが移動しコンフリクト多発。**統合は最後**。

---

## AD判断が要る論点 Top5（推奨つき）
1. **パレット**: 「新色追加」でなく「黒面の面積再配分＋緑の用途限定」と読み替えてよいか（BRAND-TRUTH §1更新なし）。→ **推奨: OK**。
2. **統合(14→11)とMechanism移動**: → **推奨: 統合はPhase3最後に回す／Mechanismは現位置維持（動かさない）**。今回14維持で見た目改善だけ先行も可。
3. **FV総額試算カード**: → **推奨: Phase1は明度改善のみ／カードは効果検証後**（憲法4.1配慮）。
4. **黒面を3箇所に**: → **推奨: 反復CTA帯3本を明地化し、黒はFV/Budget/FinalCta（＋任意でMechanism）に限定**。
5. **大見出し5本の選定**（WS1とWS2で不一致）: 案A=FV/総額とは何か/月々事例/費用透明性/最終CTA、案B=Hero/Anxiety(不安)/Budget/Trust(実績)/FinalCta。→ **推奨: FV/不安の代弁/月々事例/費用透明性/最終CTA**（不安→総額→月々→費用→行動の背骨）。

---

## 優先度（ADの優先表に整合）
- **高**: 文章半減／総額内訳の図解／FV明るく整理／標準仕様カード化／月々事例強化 → **Phase 1〜2**。
- **中**: 写真分散／黒背景削減／事例カード化／CTA整理 → **Phase 1（黒面・CTA）〜2（写真・事例）**。

## 不変（守る）
主軸コピー／canonical数字（京2,280・花風2,480・600棟・常時150区画程度・15年・1,000件・50組・月々86,944/95,413/81,298・返済比率・内訳）／確定コピー・実声(_data)／CTA階層(LINE>見学>資料>電話)／写真allowlist(偽物件・偽顧客・AI外観禁止)／countUp2箇所／id。
