<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Brand Truth is the source of truth — not generated images

**Read [`BRAND-TRUTH.md`](./BRAND-TRUTH.md) before implementing any UI.**

Comp images under `/hero-review/`, `/buttons-lab/`, `/map-lab/`, `/concept-lab/`, etc. are
**reference for layout / spacing / mood / color / photo treatment only**. The logo,
copy, photos, numbers, CTAs in those images are placeholders — the image-gen model
fabricates them. Never copy them into implementation.

When a comp conflicts with BRAND-TRUTH.md, BRAND-TRUTH.md wins.

Run the §8 implementation checklist in BRAND-TRUTH.md before every section PR.

# Shared Git Operations — push completed work, protect other edits

Codex / Claude / any other agent working in this repository must follow the same Git
workflow.

- After completing an instructed task, commit the relevant changes and push the branch
  unless the user explicitly says not to.
- Before committing, always inspect `git status --short` and the relevant `git diff`.
- Never discard, reset, checkout, overwrite, or "clean up" uncommitted changes you did
  not make.
- If uncommitted changes look like another agent's or the user's work, do not silently
  include or remove them. Escalate to the user with the exact files and the proposed
  scope before committing.
- Commit only the files required for the current task. Keep generated screenshots,
  experiments, and unrelated working files out of the commit unless the user asks for
  them.
- Role ownership matters: split work by page/section/module when multiple agents are
  active, and adapt to nearby changes instead of reverting them.

# Brand facts have one canonical source

`BRAND-TRUTH.md` is the single canonical source for brand facts: prices, plan names,
numbers, company information, CTA hierarchy, approved copy, logo/photo rules, and
forbidden claims. Do not duplicate competing facts in prompts, docs, comments, or
implementation. If a fact changes, update `BRAND-TRUTH.md` first, then update the
consuming code.

# Design Guardrails — also read [`DESIGN_GUARDRAILS.md`](./DESIGN_GUARDRAILS.md)

W2 系 (建築図面アートディレクション) のセクションでは、generic な table/card に
逃げず、`PriceSpec` / `MetricRail` / `ActionLine` 等の役割別コンポーネントで
組む。`DESIGN_GUARDRAILS.md` の AI smell check 10 項目を毎 PR 前に通すこと。

# Project Context — read [`docs/project-context/`](./docs/project-context/) for strategy

ブランド事実 (`BRAND-TRUTH.md`) では捕捉しきれない「**戦略・関係者の意思決定・歴史的経緯**」
は `docs/project-context/` に集約。実装判断の前提として参照すること。

- `kobayashi-review-20260428.md` — 専務レビュー結果と 8 つの原則 (FV 物件出し禁止 / バーン配置 / 投資エッセンス温存 etc.)
- `12-rate-gaps.md` — 年 12 棟達成のギャップ分析 (LP 改修より優先 ROI が高い 3 動線)
- `line-first-cta-strategy.md` — LINE 主導線方針 (CTA 階層と禁じ手)
- `gbp-status-and-strategy.md` — GBP 評価★3.6 で公開ブリッジ凍結中 (★4.5+ 達成後再公開)
- `top-section-structure.md` — TOP の 10 セクション構成方針と削除/統合の指針

判断の優先順位:
1. `BRAND-TRUTH.md` (ブランド事実)
2. `DESIGN_GUARDRAILS.md` (デザインルール)
3. `docs/project-context/` (戦略・歴史的経緯)
