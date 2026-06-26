# Brand Truth — やまと不動産

**This file is the single source of truth.** When a generated image, AI suggestion, or
old comment conflicts with this file, **this file wins**. Always.

Generated comp images (under `/hero-review/`, `/buttons-lab/`, etc.) are reference for
**layout / spacing / mood / color / photo treatment only**. The logo, copy, photos,
numbers, and CTAs they contain are placeholders — never trust them, never copy them
into the implementation.

Last updated: 2026-05-09

---

## 1. Brand assets (never invent)

### Logo
- Path: `public/images/logo.png`
- Component: existing `<Header />` already renders it. Always import the component or use the asset path. **Never re-render or re-letter the brand mark in code.**
- Do not write the brand as plain text "YAMATO" / "やまと" in the header — always image asset.

### Brand colors
Use only these tokens. New colors require explicit approval.

**2026-05-09 update:** the headquarters signboard photo confirmed that red is a real
Yamato visual asset, not an off-brand invention. Red may be used on conversion pages
when the page needs to name risk, late-added costs, urgency, or the primary diagnostic
action. Green remains the solution / proof color.

| Token | Hex | Use |
|-------|-----|-----|
| `--brand-lime` | `#A2C523` | Brand accent / ボタン下地（=live `--color-lime`）。旧 `#A9D159` から実働値へ統一（2026-06-26 決定A）。Use sparingly. |
| `--brand-deep-green` | `#486B00` | 深緑（テキスト/罫線・解決/証明・=live `--color-main`）。旧 `#2F4A2C` から実働値へ統一（2026-06-26 決定A）。暗面fillは `--color-main-dark #2E4600`。 |
| `--brand-base` | `#F7F4EC` | Warm off-white background |
| `--brand-ivory` | `#FBF8EE` | Surface (slightly lighter than base) |
| `--brand-text` | `#1D1D18` | Body text |
| `--brand-text-muted` | `#5E5A50` | Sub text |
| `--brand-border` | `#DED8C8` | Hairlines, card borders |
| `--brand-gold` | `#9A7A3F` | Muted gold accent |
| `--brand-line-green` | `#06C755` | LINE service color (CTAs only) |
| `--brand-sign-red` | `#E84336` | Headquarters signage red. Use for risk, hidden costs, urgency, and diagnostic CTA. |
| `--brand-sign-red-dark` | `#8F211B` | Red text / dark contrast variant. |
| `--brand-sign-red-soft` | `#FFF0EE` | Light red surface for warning and comparison areas. |

### Typography (2026-06-26 — Gothic Catalog 確定／TOP ゴシック転換)

2026-06-25〜26 のリブートで **TOP は明朝（旧 B 案 Editorial Mincho）からゴシックへ正式転換**。
専務承認文法（ゴシック・カタログ・数字バーン・選ばせる）。`/b-plan-v3` を `/` へ昇格（2026-06-26）。
明朝への回帰は「迷子の核心」として禁止（`docs/notes/2026-06-10-bplan-diagnosis.md`）。階層は次の通り。

| 役割 | フォント | ウェイト | 用途 |
|---|---|---|---|
| 主要見出し (h1/h2) | **Zen Kaku Gothic New** (`font-zen-kaku-new`) | 900 | 太角ゴシック。カタログの潔さで目を引く（`.t-display`/`.t-h1`/`.t-h2`）※Zen Kaku に 800 は無く 900 が確定 |
| 小見出し (h3) / リード | **Zen Kaku Gothic New** 700 / **Murecho** 500 | — | 階層は太さ＋サイズで作る |
| 本文 | **Murecho** | 400 | line-height 1.85 / ls 0.025em |
| 大型数字バーン | **Oswald** | 600 | 価格・実績の巨大数字（`.t-burn`/`.t-burn-sub`・`.money-burn-display`）。tabular |
| 欧文 eyebrow / ラベル | **Inter** | 600 caps + tracking | eyebrow・注記・数字補助 |

**TOP で撤去（下層・`/money` 互換のためフォントのロードは残置）**: Zen Old Mincho・
Shippori Mincho・Noto Serif（明朝全般）・Fraunces italic・縦書き長文。

**`/money` ページは元からゴシック**で本転換の影響を受けない（`project_money_font_lock.md`）。

**Tailwind ユーティリティ対応表**:
- `font-zen-kaku-new` ← `var(--font-zen-kaku-new-var)`（TOP 主見出し・2026-06-25 新設。`--font-money` は同フォント別名だが流用しない＝命名分離）
- `font-murecho` ← `var(--font-murecho-var)` / `font-inter`・`font-oswald` は既存
- 旧 `font-zen-old`・`font-shippori`・`font-fraunces`・`font-sans` は下層／後方互換用に残置

### Photo allowlist
Only these directories contain real, approved photography. **Do not use AI-generated
photos as if they were real properties.** Comp images under `/hero-review/` etc. are
**not** allowed in implementation.

- `public/images/newsozai/` — main library (model house, exteriors, interiors)
- `public/images/works/` — completed-property photos (施工事例)
- `public/images/staff/` — staff portraits (real people only)
- `public/images/voices/` — customer photos (real customers only)
- `public/images/lots/` `public/images/lots-hero/` — land/area photos
- `public/images/standard/` — standard equipment photos
- `public/images/hero/` — hero slide variants
- `public/images/badges/` — earned-trust badges
- `public/images/sections/` `public/images/design/` `public/images/floorplans/` `public/images/works-parts/` `public/images/fv/`

If a section needs new photography that doesn't exist in this allowlist, **ask** before
generating. Never use AI-rendered house exteriors as if they were real homes.

### AI retouching of real property photos

When a section uses a building, exterior, interior, lot, or model-house image, start
from a real approved Yamato photo in the allowlist above. Image generation may be used
only as retouching / art direction support:

- Allowed: exposure, color grading, sky replacement, weather / time-of-day mood,
  lens correction, crop / extension, removal of distracting nonessential clutter, and
  subtle atmosphere that makes the original photo more polished.
- Not allowed: changing the building architecture, plan, materials, windows, exterior
  shape, neighboring site conditions, legal / location facts, signage, staff, customers,
  or anything that would make the photo describe a different property.
- "Location" improvements must mean visual cleanup or framing of the existing scene,
  not moving the property to a different place or inventing a more premium setting.
- Any AI-retouched property photo used in implementation must remain traceable to its
  original source photo path.

---

## 2. Numbers (canonical)

| Fact | Canonical value | Source |
|------|-----------------|--------|
| 引渡し件数 | **600棟以上** | 2026-05-03 専務確認 |
| 自社分譲地（常時保有） | **常時150区画程度** | 公式（2026-06-23 神野さん指示で旧90→公式150に統一） |
| お客様の声 | **50組以上** | customer detail HTML |
| 業歴 | **15年**（2011年11月30日創立） | 公式（2026-06-26 神野さん確定で旧14→15） |
| 資金計画作成実績 | **1,000件以上** | 2026-05-03 専務確認 |
| スタッフ | 19名 | staff data |
| 地盤保証 | 20年 | 公式 |
| しろあり保証 | 10年 | 公式 |
| 京モデル価格 | **2,280万円〜** (税込・建物本体＋付帯工事込み) | PriceSection |
| 風モデル価格 | **2,480万円〜** | PriceSection |
| 花モデル価格 | **2,480万円〜** | PriceSection (※花標準仕様) |

If a comp image shows different numbers (e.g. "2,480" in Hero, "12,000棟"), it is wrong.
Implement the canonical values above.

### 2.1 商品ライン (花・風・京 — 3 モデル)

| モデル | 読み (display) | 内部 id | 価格 | 坪数 | 間取り | 想定客層 |
|---|---|---|---|---|---|---|
| **花** | HANA | `hana` | 2,480万円〜 | 33坪 (109㎡) | 4LDK | ゆとりを持たせたいご家族 |
| **風** | KAZE | `kaze` | 2,480万円〜 | 30坪 | 4LDK | バランス重視のご家族 |
| **京** | **KYO** | `miyako` | 2,280万円〜 | 28坪 | 3LDK | 総額を抑えやすいご家族 |

**重要 (2026-05-09 確定):**
- 京の display は **`KYO`** (`MIYAKO` 表記禁止)。内部 `id` と画像ファイル名 (`plan-miyako.webp`) は歴史的経緯で `miyako` のまま保持
- **「いちばん選ばれています」バッジは 花** に付く (専務一押し)。花の価格は Lime `#A2C523`(=`--brand-lime`) で強調
- 京は entry 役割で white、Lime tint なし
- 並び順は **花 → 風 → 京** で固定 (PriceSection の PLANS 配列順)
- 「京/奈良/プレミアム」のような generic tier 名は誤り。「廉価版」表現も禁止

**反例 (やってはいけない):**
- ❌ `MIYAKO` の display 表記
- ❌ 「いちばん選ばれています」を 京 や 風 に付ける
- ❌ 京 = 廉価版という見せ方
- ❌ 花/風/京 の順序を入れ替える

---

## 3. Company information

- 商号: 株式会社やまと不動産
- 代表取締役社長: 古谷 泰彦
- 代表取締役専務: 小林 敬昌
- 創立: 2011年11月30日
- 資本金: 900万円
- 宅建番号: **国土交通大臣 (1) 第10516号**
- 本社: 奈良県奈良市大宮町1丁目6番21 / TEL 0742-36-1123 / FAX 0742-36-1888
- 京都支店: 京都府宇治市小倉町西山67-5 / TEL 0774-25-1123 / FAX 0774-25-3131
- 営業時間: 9:00〜19:00 / 定休: 火・水
- 関連会社: やまとグローバル開発、やまと総合技建
- SNS: Instagram `@yamatonoie` / TikTok `@yamatofudosan` / YouTube `@user-ed2cw4tx9o`

---

## 4. Copy constitution (compliance, not style)

These are **must follow** — copy憲法。違反したら本番に出さない。

### 4.1 Frame ─「安い」否定 → 「他社が無駄を乗せている」転換

**やまとは安い会社ではない。他社が無駄を乗せているだけ。** このフレームを全コピーに徹底する。

**Why:** 「安い=安物」の連想が起きると品質を疑われ、価格競争に巻き込まれ、大手との検討土俵に上がれなくなる。やまとは「適正価格の誠実な会社」として認識されたい。2026-04-20 確立。

**How to apply:**
1. 「安い」を否定から入る (例: 「やまとは安い？いいえ、違います。」)
2. 他社の高さの正体を名指し (「販売会社が家を売るためにかかるお金」「大手の運営費」)
3. 数字で他社側の無駄を見せる
4. やまと側は「含めない」「入っていない」の能動否定 — 削ったのではなく、はじめから入れていない
5. 論理接続で納得のステップを踏ませる

**禁則:**
- ❌「安い」「お得」「リーズナブル」「コスパ」 — 品質疑念を誘発
- ✅「適正価格」「無駄がない」「家そのものの値段」 — 誠実軸に乗せる

### 4.2 価格メカニズムの事実核 (抽象化禁止)

「販売会社のお金」「家に関係のないお金」のような乱暴な抽象化は全セクションで禁止。**3 つの具体事実**で説明する。

1. **自社分譲地のモデルハウス二重利用** — 展示場専用の物件を持たない。分譲地に建てた家をそのままモデルハウスにし、最終的に販売する。一軒が「展示場+商品」の二役。**最大の差別化**
2. **自社一貫体制** — 土地分譲・設計・施工・販売まで自社。中間マージンなし
3. **広告費は必要最小限** — SNS/SUMOは使う。TV CM・大型広告はない (強調しすぎない)

**数字の扱い:** やまとの内訳%(「原価80%」等) はウェブに出さない。「2,280万円で家が建つ」事実自体で十分。

**禁止表現 → 具体に直す:**
- ❌「販売会社のお金」 → ✅「広告費・展示場の維持費・仲介マージン」
- ❌「家に関係のないお金」 → ✅「家の原価に含まれない、販売運営のための費用」
- ❌「無駄」「削った」 (大手攻撃の響き) → ✅「必要最小限」「乗せない」「含めない」

### 4.3 つなぎ融資 ─「発生しない」と断定で訴求

やまとは土地分譲と建物施工を自社で一貫するため、土地購入と建物着工のタイムラグを埋める必要がない → **つなぎ融資は原則発生しない** (一般的に 30〜80 万円の上乗せ)。

**How to apply:**
- 「発生しない」「原則発生しない」を主軸に
- 30〜80 万円の節約を具体数として併記
- エッジケース (ご家族独自の土地で建てる/特殊な金融機関条件) のみ「別途相談」で逃がす
- ❌「条件次第で負担を抑えられる」「ケースがあります」等の弱腰表現

### 4.4 地盤改良費 ─ 自社分譲地では「かからない」、限定は小さな注記で（2026-06-26 神野さん確定で改訂）

やまと不動産の**自社分譲地では、地盤改良費はかからない**（地盤を整えてからお渡しするため）。
ユーザーが「見積もり後に追加されるのでは」と不安になりやすい費用として、03 / why possible では強く扱ってよい。
ただし対象は自社分譲地。お客様持ち込みの土地等は地盤次第で発生しうるため、**無条件の「一切」断定はしない**。

**How to apply:**
- 主文は「地盤改良費はかかりません」を主軸に（「一切」は付けない）
- 「自社分譲地が対象です」を**小さな注記**で添える（限定を隠さず、簡潔に）
- つなぎ融資と並べて、あとから出やすい不安を先に消す
- 価格訴求ではなく「総額の見通しが崩れにくい」意味へ接続する
- 旧版（無条件「一切かからない」）は撤回。4.6「一切ない」禁止の例外扱いも解除

### 4.5 Voice (語り方)

- 一人称: **「僕」** (「俺」「私」NG)。過剰敬語不要、フランクに
- 古谷社長・小林専務の公式メッセージは原文厳守 (改変・要約禁止)
- 「だ・である調」と「です・ます調」を文脈に応じて混ぜる
- ※ この「僕」「フランク」は神野さん (AD) との会話用ルール。**サイト本文の語り口は別途検討**

### 4.6 Forbidden assertions (過剰断定の禁止)

守り切れない断定、競合の一括り化、商材の格と合わない軽口を使わない。

**Why:** 住宅のような数千万円の商材では、読者は一つひとつの断定をチェックしに来る。守れない約束や反証しやすい一般化は、その場では強く響いても、疑い深い購入者の信頼を静かに削る。

**禁止 → 言い換え:**
- ❌「動きません」「絶対」「一切ない」「必ず」「最後まで」「ゼロ」
   → ✅「目安」「〜のまま」「〜場合が多い」
- ❌「追加費用なしで入れています」 → ✅「プランの標準仕様としてご用意しています」
- ❌「価格は最後まで動きません」 → ✅「ご契約までの目安になります」
- ❌「大手は◯◯」「他社は◯◯」(一括り化) → ✅「〜になりやすい」「〜が多い」
- ❌「◯◯でOK」「大丈夫」「とりあえず」(軽口) → 商材の格に合った語尾に
- ❌「予約不要・無料でOK」 → ✅「ご予約なしでも見学可・無料」

**自己検閲ルール:** 強く言いたい衝動が出たら「この断定、明日の打合せで専務が否定したら恥ずかしくないか」を問う。

**ビジュアルでも同原則:** 大手 vs やまとの絵で大手側を「没個性な箱」「クリップアート」等に貶めない。両方を同じレベルの建築立面図/写真で揃え、差は意匠の方向性 or 価格の透明度で語る。

### 4.7 Customer emotion (お客様の感情を勝手に決めない)

「家のお金、こわくない。」のようなコピーは、お客様が「こわい」と感じている前提で書き、それを上から否定する形になり、結果として「子供扱い・無神経・上から目線」のトーンを生む。

**How to apply:**
- お客様の感情 (こわい/不安/悩み等) を勝手に断定しない
- 否定形 (〜じゃない / 〜ない) で安心を売らない
- 代わりに**やまとの動詞**で書く: 「ご一緒に整えます」「お見せします」「整えてまいります」「ほどく」
- ❌「こわくない」「悩まないで」「迷わなくていい」「不安は要りません」
- ✅「家のお金、ご一緒に整えます。」「家のお金、ぜんぶお見せします。」

### 4.8 Staff (役職でサイズ差をつけない・全員平等)

スタッフ紹介で、役職や勤続年数を理由にカードサイズ・写真サイズ・タイポグラフィのスケールに差をつけることは禁止。**古谷社長と小林専務も完全同格**で表示する。

**How to apply:**
1. スタッフ表示は全員同一の UnifiedCard で並べる (Featured/Standard/Compact 分類禁止)
2. 写真の aspect ratio・サイズ・トリミング・フィルターを全員一致
3. 名前・英字・役職・引用のフォントサイズ・余白を全員一致
4. 部門ごとのカラー差別化は OK (罫線・kicker など装飾レベルのみ)
5. 代表者は別セクションに分けてもよいが、同じカード形状で 2 人並べる
6. 「Spotlight」「Featured」「Lead」「Best Value」バッジ系は人物に対して禁止 (商品プランへのバッジは可)
7. 縦書き引用ブロック・大判フルブリードなどの「特別扱い」を 1 人にだけ適用しない

**重要な区別 — 表示原則 ≠ コピー文言:**
表示は完全平等にする一方、**コピーは普通に「社長 / 専務」と書く**。「同格の二人」「対等な代表 2 名」のような文言を公開コピーに書かない (社長＞専務は登記上の正式な序列)。
- ❌ 公開コピー: 「会社を背負う、同格の二人。」
- ✅ 公開コピー: 「会社を背負う、二人。」「代表」「代表取締役 2 名」

---

## 5. CTA hierarchy (LINE-first, 2026-05-05 confirmed)

Apply on every page:

1. **Primary** — `LINEで相談` (color `--brand-line-green` `#06C755`)
2. **Secondary** — `モデルハウスを見学する` / `来場予約` (color `--brand-deep-green` or `--brand-lime`)
3. **Tertiary** — `資料請求` (text-link or quiet outlined)
4. **Tertiary** — 電話 (footer / contact only)

Hero internal CTAs: **2 max**. LINE can live in the header or floating CTA instead of inside Hero.
Do not put 資料請求 as a primary in the Hero.

LINE link: `LINE_ADD_FRIEND_URL` from `src/data/line.ts`. Never hardcode.

---

## 6. Approved Hero copy (current — 2026-06-26 Phase 2＋スパース再設計)

本番トップ `/`(=`/b-plan-v3`) の FV は **①ループ動画モンタージュ(脇役の地) → ②ステートメント** の
2 部構成（`src/app/b-plan-v3/sections/S01.tsx`）。②は **xmobile式スパース 2ビート**（2026-06-26 神野さん指示・
正本 `docs/notes/2026-06-26-fv2-sparse-redesign.md`）= Beat1 性能「3」1発／Beat2 価格「2,280」1発を厚い黒余白で
分離（1ビュー1巨大数字）＋標準仕様帯は Zone2 へ降格。②の確定コピー（すべてゴシック・明朝禁止）:

- **eyebrow**（Inter caps）: `standard, not optional`
- **h1**（Zen Kaku Gothic New 900・主役・タイトル＝句読点なし1行）: **標準装備がとにかくすごい**（「すごい」に lime 下線・点）
  ※ 旧承認値「標準装備が、とにかくすごい。」を神野さんのタイトル方針（句読点なし1行）で改訂。**小林専務の再確認推奨**。
- **証拠リード**（Murecho・h1 直下に密着＝主観を即客観化）: 耐震等級3に対応する構造。制震ダンパーは全モデル標準。標準で、ここまで入っています。
- **標準グレード帯**（全モデル共通項目のみ・実在ブランドは plain text）:
  耐震＝**等級3に対応する構造**（「3」＝Oswald 600 巨大・FV 主役数字・S03 の 132px 未満）／外壁＝旭化成 ヘーベルパワーボード／制震＝ミライエ 全モデル標準／キッチン＝クリナップ／浴室・洗面・トイレ＝TOTO／窓・玄関＝YKK AP／保証＝地盤20年・しろあり10年
- **橋**（Zen Kaku Gothic New）: 大手の高い水準を、はじめから標準に。
- **価格バーン**（Oswald 600・降格＝「3」より小）: 京モデル **2,280** 万円〜。
- **翻訳句**（Murecho）: この水準を、家そのものの値段で。
- **sub**（Murecho）: 土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。
- **注記**: ※標準仕様は全モデル共通項目を掲載。花・風・京で一部仕様が異なります。価格は税込・建物本体＋付帯工事込み。登記費用などは別途発生します。
- **CTA**: LINEで相談 ／ モデルハウスを見学する（「実物の質感は、モデルハウスで。」）

**禁則・整合**: 「低価格/安い/お得/コスパ」禁止（憲法4.1）→「現実の総額/家そのものの値段」。耐震は「**対応する構造**」（「取得」と断言しない＝景表）。実績4数字（600棟・150区画・50組・15年）は ② に置かず **S03 専管**（専務③二度打ち回避。FV 主役数字は「3」と「2,280」のみ）。標準仕様の固有名詞は事実摘示（他社ロゴ画像・AI 生成ロゴは不使用）。

**履歴**: 旧 h1（Phase1・2026-06-25〜26）「奈良・京都南部で、土地から考える家づくり。」→ Phase2 で ② h1 を標準装備訴求へ差替（2026-06-26 専務 sign-off）→ **xmobile式スパース再設計で ② を 2ビート化＋仕様帯を Zone2 降格、h1 を句読点なし1行「標準装備がとにかくすごい」へ改訂（2026-06-26 神野さん指示・専務再確認推奨）**。さらに旧: HeroVideo overlay の Mincho 版（2026-05-09）。

If the redesign changes this, the new copy goes here first, then to implementation.

---

## 7. Image-gen prompt guard (apply to every comp)

### 7.1 Reference media (uploaded to Higgsfield 2026-05-08)

Pass these `media_id` values into `medias[]` of `generate_image` so Nano Banana Pro
preserves the real logo and real photography instead of fabricating them. Models that
support `medias` (e.g. `nano_banana_2`) accept role `"image"`.

| Asset | Source path | Higgsfield media_id |
|-------|-------------|---------------------|
| Yamato logo (PNG, 293×65) | `public/images/logo.png` | `e4354de4-5a8a-4940-9a54-d6ea2bd7a0fa` |
| 三山木モデル外観 | `public/images/newsozai/exterior-miyamaki-front.webp` | `56466d7e-a9f1-408f-ae5b-0dad6dd15c0b` |
| 左京モデル外観 | `public/images/newsozai/exterior-sakyo-clean.webp` | `2f4b22d6-243b-4bde-963d-bbcaf195ea63` |
| 内観 LDK 01 | `public/images/newsozai/interior-ldk-01.webp` | `433c0c54-d048-4e7d-917c-a934e43d40eb` |

When the comp shows a hero with **logo + interior photo**, pass the logo media_id and
the interior media_id together. When showing **exterior**, swap in one of the exterior
media_ids. This eliminates "fake YAMATO logo" and "AI-rendered fake home" failures.

If a section needs reference media not on this list, upload it once via
`mcp__higgsfield__media_upload` + `media_confirm`, add it here, and reuse the id.

### 7.2 Prompt guards (always include)

**Must say**: "Use the provided logo asset as-is at the top-left, do not redraw it",
"Use the provided photography for the right-side interior/exterior frame, do not
generate a fake home", "Use placeholder Japanese text only — do not invent specific
prices, address, contact numbers, or copy", "Photo edges 12px rounded, no overlay",
"Editorial housing catalog mood", "Off-white + deep green + muted gold + natural wood".

**Must forbid**: "SaaS landing page", "glassmorphism", "neon", "flashy gradients",
"glowing CTA", "fake AI-rendered exteriors", "fake customer faces",
"oversized rounded SaaS cards", "rewriting the logotype".

The reusable Hero prompts live in `project_image_gen_prompts.md` (memory).

---

## 8. Implementation checklist (run before every section PR)

```
[ ] Logo is the existing <Header /> import or <Image src="/images/logo.png" /> — not redrawn
[ ] All Japanese text matches BRAND-TRUTH.md (or its referenced memory files)
[ ] All photo paths are inside the allowlist in §1; no comp images leaked
[ ] All numbers (price, 棟, 区画, 組, 年) match §2
[ ] CTA labels & order follow §5; LINE_ADD_FRIEND_URL imported, not hardcoded
[ ] Colors via tokens in §1; no inline raw hex unless it's the same value as a token
[ ] No new design tokens added without note in commit
[ ] PR touches only the section's files — no scope creep into adjacent sections
```

---

## 9. Lab pages (deletable before delivery)

> **2026-06-26 昇格**: `/b-plan-v3`（ゴシック・動画FV＋直下ステートメント）を **`/` の本命トップへ昇格**
> （`src/app/page.tsx` が `./b-plan-v3/page` を再エクスポート）。LabDisclaimer は撤去・robots index 済。
> 旧 `/b-plan-v2`（明朝）は superseded として残置（必要なら後日削除可）。よって `/b-plan-v3` は
> 下記の「削除すべき lab」では**ない**（=本番）。FV案B比較用の `/b-plan-v3-a`(静止背景) は撤去済。

Routes under the following are scratch / review-only and must be removed before
production:

- `/hero-review` — Hero A/B/C comp comparison
- `/hero-lab`, `/buttons-lab`, `/map-lab`, `/concept-lab` — earlier labs
- `public/hero-review/` — comp images for /hero-review

A `<LabDisclaimer />` banner must be visible at the top of every `*-review` /
`*-lab` page, stating that comp images are direction-only and the implementation
follows BRAND-TRUTH.md.
