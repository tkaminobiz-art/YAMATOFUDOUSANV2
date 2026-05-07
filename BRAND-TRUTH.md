# Brand Truth — やまと不動産

**This file is the single source of truth.** When a generated image, AI suggestion, or
old comment conflicts with this file, **this file wins**. Always.

Generated comp images (under `/hero-review/`, `/buttons-lab/`, etc.) are reference for
**layout / spacing / mood / color / photo treatment only**. The logo, copy, photos,
numbers, and CTAs they contain are placeholders — never trust them, never copy them
into the implementation.

Last updated: 2026-05-08

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

### Typography
- Headings (Hero confirmed): **Shippori Mincho** weight 600
- Body: **Noto Sans JP**
- Numbers: **Oswald**
- `/money` page is the exception — see `project_money_font_lock.md`. There: 和文ゴシック + Inter + Oswald, **no Mincho**.

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

These are **must follow** — copy憲法 from past memory, integrated.

### Frame
- 「安い」を主訴求にしない。代わりに「他社が無駄をしている／やまとは無駄を削った」フレームで言う。
- 価格メカニズムは抽象化禁止。**3つの具体事実**で説明: ①展示場の二重利用 ②自社一貫体制 ③広告最小限。
- つなぎ融資は「発生しない」と断定で訴求してよい（30〜80万円の節約として）。「条件次第で抑えられる」等の弱腰NG。

### Voice
- 一人称: **「僕」**。「俺」「私」NG。過剰敬語不要。フランクに。
- 古谷社長・小林専務の公式メッセージは原文厳守。改変・要約禁止。

### Forbidden assertions（過剰断定）
以下のような断定はNG：
- 「動きません」「絶対」「追加費用なし」「どこよりも」等の例外を許さない断定
- 「大手は◯◯」「他社は◯◯」など競合一括り化
- 「◯◯でOK」など格不一致

### Customer emotion
- 「こわくない」「悩まないで」等、お客様の感情を断定する表現はNG。
- やまとの動詞（整える／お見せします／一緒に考える）で寄り添う。

### Staff
- 役職でサイズ差NG。古谷社長と小林専務も完全同格。

### Detailed canonical files (in repo memory, do not duplicate here)
- `feedback_first_person.md`, `feedback_frame_change_cheap_to_waste.md`,
  `feedback_mechanism_fact_core.md`, `feedback_no_emotion_assumptions.md`,
  `feedback_no_over_assertion.md`, `feedback_staff_equality.md`,
  `feedback_copy_ownership_rules.md` (already integrated in copywriter skill).

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

## 6. Approved Hero copy (current)

```
標準仕様まで、しっかり比べてください。
家そのものに、しっかり費用をかけています。

2,280万円〜（京モデル）
税込・建物本体と付帯工事まで含みます
```

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
