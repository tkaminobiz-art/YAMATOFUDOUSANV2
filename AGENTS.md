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
