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

| Token | Hex | Use |
|-------|-----|-----|
| `--brand-lime` | `#A9D159` | Brand accent (logo leaf, key highlights). Use sparingly. |
| `--brand-deep-green` | `#2F4A2C` | Primary CTA, main brand voice |
| `--brand-base` | `#F7F4EC` | Warm off-white background |
| `--brand-ivory` | `#FBF8EE` | Surface (slightly lighter than base) |
| `--brand-text` | `#1D1D18` | Body text |
| `--brand-text-muted` | `#5E5A50` | Sub text |
| `--brand-border` | `#DED8C8` | Hairlines, card borders |
| `--brand-gold` | `#9A7A3F` | Muted gold accent |
| `--brand-line-green` | `#06C755` | LINE service color (CTAs only) |

### Typography (2026-05-08 — B 案 Editorial Mincho 採用)

`/font-lab` の 5 案比較を経て **B. Editorial Mincho** を確定。階層は次の通り。

| 役割 | フォント | ウェイト | 用途 |
|---|---|---|---|
| 主要見出し (h1/h2) | **Zen Old Mincho** | 600-700 | 編集誌の太明朝として目を引く |
| 小見出し (h3) / リード本文 | **Murecho** | 500 | 温度感のある現代ゴシック |
| 本文 | **Murecho** | 400 | 〃 |
| 欧文 utility caps | **Inter** | 500-600 | FIG ラベル、eyebrow、注記、数字補助 |
| 大型数字 | **Oswald** | 300-500 | 価格、実績数字 |
| 欧文 italic アクセント | **Fraunces** (variable opsz 144) | 400 italic | 「Difference」など editorial キャプション |

旧構成(2026-05-08 以前): Shippori Mincho + Noto Sans JP + Inter + Oswald。
2026-05-08 に Phase 1〜6 で TOP 全セクション + Header / Footer / FloatingCta を
新構成に統一。詳細は git log の `feat(typography/phase-N)` コミットを参照。

**`/money` ページは引き続き例外**(`project_money_font_lock.md`):
和文ゴシック (`font-sans` = Noto Sans JP) + Inter + Oswald、**Mincho 禁止**。
`/money` の `<main>` にハードコードされた `font-sans` が継続して効くため、
B 案展開後も影響は受けない。

**Tailwind ユーティリティ対応表**:
- `font-zen-old` ← `var(--font-zen-old-var)`
- `font-murecho` ← `var(--font-murecho-var)`
- `font-fraunces` ← `var(--font-fraunces-var)` (italic は `font-fraunces italic`)
- `font-inter`, `font-oswald` は既存のまま
- `font-shippori`, `font-sans` は既存のまま残置(/money・後方互換用)

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
| 分譲実績 | **90区画以上** | 旧サイト |
| お客様の声 | **50組以上** | customer detail HTML |
| 業歴 | **14年**（2011年11月30日創立） | 公式 |
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
- **「いちばん選ばれています」バッジは 花** に付く (専務一押し)。花の価格は Lime `#A9D159` で強調
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

### 4.4 Voice (語り方)

- 一人称: **「僕」** (「俺」「私」NG)。過剰敬語不要、フランクに
- 古谷社長・小林専務の公式メッセージは原文厳守 (改変・要約禁止)
- 「だ・である調」と「です・ます調」を文脈に応じて混ぜる
- ※ この「僕」「フランク」は神野さん (AD) との会話用ルール。**サイト本文の語り口は別途検討**

### 4.5 Forbidden assertions (過剰断定の禁止)

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

### 4.6 Customer emotion (お客様の感情を勝手に決めない)

「家のお金、こわくない。」のようなコピーは、お客様が「こわい」と感じている前提で書き、それを上から否定する形になり、結果として「子供扱い・無神経・上から目線」のトーンを生む。

**How to apply:**
- お客様の感情 (こわい/不安/悩み等) を勝手に断定しない
- 否定形 (〜じゃない / 〜ない) で安心を売らない
- 代わりに**やまとの動詞**で書く: 「ご一緒に整えます」「お見せします」「整えてまいります」「ほどく」
- ❌「こわくない」「悩まないで」「迷わなくていい」「不安は要りません」
- ✅「家のお金、ご一緒に整えます。」「家のお金、ぜんぶお見せします。」

### 4.7 Staff (役職でサイズ差をつけない・全員平等)

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

## 6. Approved Hero copy (current — 2026-05-09 Step 4)

`HeroVideo` overlay (動画 FV 上の主役コピー):

```
[h1 — Mincho 26-56px]
奈良・京都南部で、土地から考える家づくり。

[lead — Mincho + Fraunces italic '2,280']
京モデル 2,280 万円〜。

[sub — Murecho]
土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。
```

下部 overlay には Track Record 4 指標 (600棟・90区画・50組・14年) を継続表示。

旧コピー (削除済): 「標準仕様まで、しっかり比べてください。」「家そのものに、しっかり費用をかけています。」

If the redesign changes this, the new copy goes here first, then to implementation.
The /hero-review comps show placeholder copy — they are not the spec.

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

Routes under the following are scratch / review-only and must be removed before
production:

- `/hero-review` — Hero A/B/C comp comparison
- `/hero-lab`, `/buttons-lab`, `/map-lab`, `/concept-lab` — earlier labs
- `public/hero-review/` — comp images for /hero-review

A `<LabDisclaimer />` banner must be visible at the top of every `*-review` /
`*-lab` page, stating that comp images are direction-only and the implementation
follows BRAND-TRUTH.md.
