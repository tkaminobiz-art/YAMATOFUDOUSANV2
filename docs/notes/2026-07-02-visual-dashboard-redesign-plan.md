# ビジュアル・ダッシュボード化 マスタープラン（2026-07-02）

**目的**: コピーを1字も変えずに、「読ませるLP」の器を「見ただけで伝わる器」へ載せ替える。最新トレンド（ベントグリッド/ダッシュボード/データビジュアル）を、専務承認のカタログ文法の内側に翻訳する。
**成果物の正本**: 本書。オーナー別詳細は `2026-07-02-visual-dashboard-owner-specs.md`（トレンド11技法・8モジュール仕様・14セクション圧縮設計・画像14点計画・モーション表・統合裁定10件の全文）。
**前段**: `2026-07-01-lp-glanceable-redesign-plan.md`（Phase1第1弾済=FV明度/黒面7→4）と `2026-07-01-japanese-typography-linelength-rules.md`（字詰め規約）の上に積む。

---

## 1. 統合ビジュアルコンセプト（統合Critic裁定）

> **「一冊の建築仕様書として組んだ編集的データダッシュボード」** — 全ての数字と日本語はライブHTMLのまま、罫の太さ・面積差・余白だけで区切り、図の語彙を**ドット／積層帯／引出し線の3語**に制限した、非対称カタログ紙面。

**SaaSに見えない担保3点**:
1. **色** — 地は paper-warm＋ink4節のみ。データ色は main深緑濃淡/ink/risk の3値固定（riskは面塗りせず斜線ハッチと点）。グラデ・グロー・蛍光ゼロ。
2. **区切り** — 影ゼロ・radius≤4px。hairline 3段階の**開放罫**（外周開放・四辺閉じ禁止）。箱でなく「罫の太さ差＋セル面積差＋padding3段」で階層。
3. **図の出自感** — チャートライブラリ・目盛・ツールチップ・円/ドーナツ禁止。数字は Oswald tabular のライブHTML直書き＝手組みのデータジャーナリズム図版。

## 2. 8モジュール（`_shared/bento/` 新設・仕様の正はベントシステム章）

| モジュール | 役割 | 使う所 |
|---|---|---|
| BentoBoard | 非対称グリッド基盤（gap=0・hairline共有・span比率で重要度） | Promise/Trust/StandardSpec |
| StatCard | 数字主役（Oswald tabular・**tier="hero"以外countUp不可を型で封じ**） | Trust/Budget/Land |
| DataBar/StackBar | 純CSS積み上げ・比較バー | Budget内訳/RentVsLoan/Estimate |
| ChipRow | データ判定チップ=角2px正方マーク／**引用系は左罫のみ**（声を商品化しない） | Estimate/Anxiety |
| LedgerRow | 台帳行（開放罫・比較3列） | Estimate開示表/Mechanism底面 |
| PhotoTile/ArtTile | 実写タイル/生成アートタイル（radius≤4px・overlayルール） | Voices/Land/Mechanism |
| FlowRail | 横スクロール工程レール（scroll-snap・**工程系専用**） | Budget冒頭/Voices dl |
| RevealGroup | S02Reveal昇格の共通reveal（ローカルuseReveal 2コピー廃止） | 全所 |

**採用トレンド技法**（詳細＝付録scout章）: ヘアライン・ベント／ユニットチャート（Trust600背景のみP2試作）／scroll-driven積層（装飾2箇所限定）／実写真への引出し線アノテーション（Pattern C準拠）／エディトリアル・データレポート帯（Trust）／ビューポートスケール数字（Budget）。**不採用**: Active Grid hover開示・sticky点灯・Land150セル図・GSAP系。

## 3. 実装フェーズ（統合Critic裁定・ゲート付き）

**Phase A — 基盤＋パイロット**（Estimate＋Budget＋RentVsLoan）
- globals.css 末尾にモーショントークン5種＋ベントユーティリティ7種のみ追加／`_shared/bento/` 8モジュール新設／既存ガードレール違反7件の是正（S04.client rounded-2xl・S08.client rounded-2xl・Budget rounded-6px・Estimate.client四辺閉じ枠・hover:opacity・useReveal重複・Mechanism真円3連）。
- ゲート: build緑／**コピー逐語diff=ゼロ（機械検証）**／countUp2・id10・ink4不変／AI smell 10項目／reduced-motion全静止全表示／Lighthouse mobile Perf≥90・CLS 0。

**Phase B — 全セクション展開**（StandardSpec→Voices→Mechanism(SVG図先行)→Land→Anxiety→Promise→Trust→Models→Faq/FinalCta）
- ゲート: Phase A同＋**高さ実測 PC 25.0vp→16.3vp（−35%）**＋グレーボックステスト（画像ゼロで成立）。

**Phase C — Higgsfield画像生成と差し込み**（`public/images/genart/` 新設）
- 初回バッチ5点（下記§5）→AD選定→webp化→差し込み。
- ゲート: BRAND-TRUTH §8／文字焼き込みゼロ目視／poster≤120KB・LCP≤2.5s／design-critic通過。

**Phase D — モーション研磨**
- scroll-driven 2箇所（@supportsガード）／KineticHeadingを大見出し5本に限定／hover/focus統一。
- ゲート: Paint flashingゼロ／INP≤200ms／IO総数≤16／**JS追加0KB**／JS無効で本文消失なし。

**パイロット選定理由**: Estimate=冗長の典型で統合効果が最も見える＋既存違反是正を内包／Budget=ink面・countUp・StackBar・SPスワイプ等**全リスクを一度に踏む**／RentVsLoan=CompareBar単体の軽量検証（切り戻し容易）。

## 4. 画像ルール（Higgsfield・全プロンプト確定済＝付録imagery章）

- 数字・日本語コピーは**画像に焼かない**（ライブHTML）。生成画像に日本語テキスト禁止（negative指定済）。
- **偽物件外観・偽顧客/スタッフの顔は生成禁止**。用途は: 等角線画イラスト／テクスチャ／図解アートパーツ／実写のスカイ・時間帯レタッチ（建物1px不変・元パス追跡）。
- 画風: 建築アクソメ図・線画1色＋面2値。カラフルSaaS 3D拒否。生成時に models_explore でモデル確認。

## 5. Higgsfield 初回バッチ（5点・優先度順）

1. **FVポスター空レタッチ**（実写i2i・LCP実利・`yamato-fv-montage-poster__sky-am.webp`）
2. **Mechanism 鳥瞰線画**（16:9・cream線 on ink・SVG自前案との比較用2〜3バリアント）
3. **AreaMap 等高線テクスチャ**（4:3・地名なし・Land改修と同期）
4. **費用2層構造 分解等角図**（4:3・白背景 mix-blend-multiply 前提）
5. **工程イラスト スタイル確定1枚**（資金計画机の等角線画。トーンAD承認後に6枚量産）

## 6. AD判断論点 Top5（推奨つき）

1. StandardSpec 行アイコン8種 → **保留**（アイコンなしで成立させてから判定・グレーボックス原則）
2. Budget SPの列スワイプ vs 縦積み → **列スワイプ採用**（月々帯・試算注記は列外全幅固定・非タッチ/reduced-motionは縦積み）
3. Trust600 背景ユニットドット → **P2で試作のみ**（ink8% faint）。Land150セルは不採用確定（「程度」との矛盾）
4. 紙テクスチャ → **不採用寄り保留**（「生成り×緑」AI平均値の再侵入リスク）
5. Mechanism等角図 → **純SVG自前を第一案に昇格**。Higgsfieldは比較生成して勝った方

## 7. 不変条件（全フェーズ共通）
確定コピー逐語（**改修前後でテキストノードdiffゼロを機械確認**）／canonical数字／CTA階層／id10個／countUp2箇所／ink4節／字詰め規約（measure・br禁止）／写真allowlist。
