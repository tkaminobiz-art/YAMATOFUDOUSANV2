# Bプラン v2 デザイン再設計スペック（検証バリアント）

2026-05-29。design-research workflow(23エージェント/80技法)＋敵対的検証3本を蒸留し、実コードを精査して確定した実装スペック。
**目的＝検証**：既存 `/b-plan`(=B, design-critic 57/100) に対し、クリーンルームで再設計した `/b-plan-v2`(=C) を建て、**スコアで勝敗をつける**。

> 社内呼称「Cプラン」。ただしルート名は商品ライン(花/風/京)との誤読を避け `/b-plan-v2`。納品前に削除する lab 運用に準拠。

---

## 0. 検証設計（これを外すと"ただの別バージョン"になる）

- **変数を1つに絞る**：C は B と**コピー・データ・写真・数字・ブランド・CTA導線を完全固定**。変えるのは**デザインシステム/UI/レイアウト/モーションだけ**。
- **合格基準（B→C）**：
  - design-critic：57 → **75+（B+）**、全軸13以上
  - lp-psych-audit：62 → **75+**、特に段階3信頼・段階4欲求が向上
  - a11y-audit：新規配色すべて WCAG AA（コントラスト＝検証が突いた弱点）
  - 5つの穴が閉じる：①ヒエラルキー ②背景単調 ③クライマックス不在 ④低エネルギー ⑤モーション皆無
  - **温度維持**：「Apple/SaaSサイトに置けてしまう」なら失格（冷たいSaaS化＝最大の罠）
- **判定**：C が基準を満たし B に勝てば昇格、負ければ破棄。

---

## 1. 固定する資産（C は B から流用・改変禁止）

実コード `src/app/b-plan/page.tsx` から確定：
- **コピー**：先日"素の説明体"で確定した全文言（見出し/リード/お客様の声/仕組み説明/要確認）。新規UI文言は commit 前にユーザー提示（AGENTS.md）。
- **データ**：`paymentCases`(3件: 奈良Aさん/橿原Bさん/木津川Cさん、income 550/680/480万、total/borrowing/monthly/ratio/breakdown/image)、customer voices、要確認費用項目、`BRAND_FACTS`(600棟/14年/1,000件/保証20・10年/宅建番号)、代表2名。
- **ブランド**：`P`(ink #181714 / white #fffdfa / paper #f4efe6 / smoke #ece6db / green #195842 / red #ea4b2a / rust #a66b48)。**実写真のみ（AI完成予想図禁止）**。
- **CTA導線（既存・正しい）**：固定ボトムナビ＝電話 / **総額(LINE)** / 見学。inline `Cta`＝LINE「土地込み総額を出す」＋ /reserve。**LINE主導線は既にある**ので壊さず踏襲。

---

## 2. デザインシステム（C で再設計する部分）

### 2-1. 声量3段階（穴①③）— トークン駆動で"今度こそ効く"
> 検証の発見：B の h2 は **inline `text-[clamp]` が4箇所(L809/845/874/897)でトークンを無視**して肥大。token化済み3つ(voice-proof/payment-main/cost)は既に42px。
> ∴ C ではクリーン実装なので**全 h2 をトークン消費に統一**できる（B の轍を踏まない）。

```css
--bp-voice-shout: clamp(56px, 8vw, 104px);  /* Oswald数字専用・ページに1〜2回だけ */
--bp-voice-talk:  clamp(28px, 1.6rem + 0.8vw, 40px); /* 各セクション見出し(明朝) */
--bp-voice-whisper: clamp(13px, …, 14px);   /* eyebrow/lead/caption */
/* 段差は最低1.6倍を死守 */
```
- 数字=Oswald light(300)、見出し=Shippori Mincho medium、添え=Inter bold uppercase。
- **クライマックス(PaymentCases)以外の見出しは talk 固定**。shout は数字とクライマックスのみ。

### 2-2. カラー：彩度/エネルギーの足し方（穴④）— 検証の修正を採用
> 検証却下：低彩度の暖色3色(beige/clay/smoke)は背景・赤に溶けてエネルギーを足せない。
> **採用＝深緑(#195842)の濃淡＋生成りで段差**を作る。アクセントは既存 green/red の範囲を磨く。青・水色・蛍光は禁止（SaaS化）。
- 内訳の段差は「深緑→中緑→薄緑（明度3段）」で表現。赤(#ea4b2a)は要確認/総額診断のみ（死守）。

### 2-3. 背景リズム（穴②）
- `BlueprintLayer` を全セクションから外し、**ink/paper 背景の2〜3か所のみ・連続2セクション禁止**。
- 全面ドットノイズ(B の L966 `.bplan::before`)は **C では使わない**（"white=クリーン"を殺すため）。
- 明度を波打たせる：暗(Hero)→white(Trust)→暗(Voice)→paper(Truth)→**white・無地(PaymentCases=クライマックス)**→smoke(Cost)→white(Gallery)→smoke(要確認)→ink反転(誇り)→white(Action)。

### 2-4. モーション（穴⑤）
- `AnimatedNumber`（数字カウントアップ）を新規。**流用元は `ReasonReveal`（reduced-motion を JS で見ている）。`VoiceProofObserver` は不可（未対応）**。
- 規律：≤0.6s（カウントは1.2s easeOut）/ バウンス・回転・色フラッシュ禁止 / `prefers-reduced-motion`で即時表示（CSS＋JS両系統）/ `tabular-nums`＋桁幅min-width で CLS 防止。
- **適用は PaymentCard の月々だけ**に絞る（"叫ぶのは1〜2回"原則・検証C-3）。Hero/Trust は据え置き。

---

## 3. レイアウト／セクション設計（C のクリーン構造）

クライマックス＝**PaymentCases**（総額・月々の"答え"が解放される頂点）。

| セクション | 埋める穴 | C での設計 |
|---|---|---|
| Hero | ④⑤ | 既存動画FV踏襲。`2,280` は既存サイズ維持（116px化しない＝検証B-3）。下に小声で月々の入口 |
| Trust | ①④ | metric rail＋`600`/`14` カウントアップ。白・無地（B で実装済みを継承） |
| Voice Proof | ⑤ | お客様の声。温度の核。動き最小 |
| Truth | ②④ | paper背景。図面ループ回避 |
| **PaymentCases ★クライマックス** | ①②③④⑤ | **ガラスカードは廃し、白地に映える実体カードへ再設計**（白×ガラスで消える検証A-1を回避）。横スライダーは**縦スタック or 1枚主役+サブ**へ再考（sticky/可視性のため）。`breakdown` を **`{building,land,fee}` に構造化**して**深緑濃淡の段積みバー**＋月々を shout＋前後に大余白。末尾CTA＝LINE |
| Cost Logic | ②④ | 非対称比較。要確認=赤、やまと=緑。smoke背景 |
| Gallery | ② | 実写bento。white・図面なし |
| 要確認費用 | ③④ | 赤大型「要確認」＋グリッド。smoke |
| 誇り＋Action | ②③ | ink反転で余韻＋CTA階段(LINE>見学>フォーム) |

**データ改修（必須・検証A-4）**：`paymentCases[].breakdown` を文字列配列→`{building:2280,land:650,fee:250}` 等の数値へ。C専用データなので B を壊さない。

---

## 4. アセット生成計画（画像/動画MCP）

**鉄則**：生成してよいのは**非写真のオーナメント／テクスチャ／図版のみ**。**実在の家の外観・内観・人物のフェイク生成は禁止**（実写真のみ＝BRAND-TRUTH/AI完成予想図禁止）。

- ✅ 生成可：和紙/木目/生成りの背景テクスチャ、セクション区切りの抽象モチーフ、内訳バー用の装飾、アイコン、クライマックスの抽象的な"光"演出、（動画）テクスチャのループ・微細パララックス素材。
- ❌ 生成不可：住宅の外観/内観/施工写真/お客様/スタッフ → 既存の実写真(`/images/bplan/...`)を使う。
- コードで質が出る部分はコード優先、質が落ちる装飾はMCP生成で補う。

---

## 5. ビルド体制（A フェーズ・サブエージェント編成）

承認後の実装オーケストレーション：
1. **基盤**：design-tokens＋web-design-creation で 2章のトークンを `/b-plan-v2` に実装（声量/背景/motion/深緑濃淡）。
2. **セクション実装**：frontend-design 規律でクリーン構築。`AnimatedNumber` 新規(ReasonReveal流用)。PaymentCases を最重点。
3. **アセット**：image/video MCP で 4章の装飾を生成・配置。
4. **計測ゲート（並列）**：design-critic＋lp-psych-audit＋a11y-audit で **B vs C を採点**。
5. **反復**：最低スコア軸を潰すまで2〜3周。
6. **perf-design**：カウントアップ/画像/モーションで LCP・CLS を割らないか最終確認。

---

## 6. 着手順（A 開始時）
1. `/b-plan-v2` ルート複製（B のコピー/データ/CTAを固定流用）＋C専用データ(breakdown数値化)。
2. トークン実装 → 全h2をtalk統一 → PaymentCasesクライマックス化 → 背景リズム → AnimatedNumber。
3. アセット生成・差し込み。
4. B/C 採点 → 反復 → perf確認 → ユーザー目視。
