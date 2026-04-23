"use client";

/*
  SellingPointsStrip — /money Hero直下の「やまとの3つの売り」
  - つなぎ融資 ¥0
  - 自社分譲の土地 直販
  - 中立な提携FP 売り場の外
  3カラム横並び。1pxグリッド分割で編集誌的に。
*/

const FOREST = "#486B00";
const ACCENT = "#A2C523";

const POINTS = [
  {
    no: "01",
    tag: "Tsunagi-Yusi",
    label: "つなぎ融資",
    headline: "¥0",
    body: "土地と建物を、自社で一貫して進めるから。一般的に発生する 30〜80万円の利息と手数料が、まるごと家計に戻ります。",
    href: "#ch-bridge",
    cta: "詳しく見る",
  },
  {
    no: "02",
    tag: "Land",
    label: "自社分譲の土地",
    headline: "直販",
    body: "矢田町ほか、奈良・京都の自社分譲地を中間業者なしで直接ご紹介。仲介手数料も発生しません。",
    href: "#ch-land",
    cta: "詳しく見る",
  },
  {
    no: "03",
    tag: "Neutral FP",
    label: "中立な提携FP",
    headline: "外部",
    body: "やまと社内にFPはいません。独立した提携先のFP事務所が、家を売る前提ではない目線でお話しします。",
    href: "#ch-fp",
    cta: "詳しく見る",
  },
] as const;

export default function SellingPointsStrip() {
  return (
    <section className="relative bg-[#FAF8F3] border-y border-text-primary/10 py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        <div className="flex items-baseline justify-between gap-4 flex-wrap mb-8 md:mb-10">
          <p
            className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-bold"
            style={{ color: FOREST }}
          >
            Yamato — three edges · 3つの売り
          </p>
          <p className="font-inter text-[10px] md:text-[11px] tracking-[0.18em] text-text-secondary uppercase">
            Real, not marketing speak
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/15">
          {POINTS.map((p) => (
            <a
              key={p.no}
              href={p.href}
              className="group bg-white p-7 md:p-9 flex flex-col transition-colors hover:bg-bg-secondary/30"
            >
              <div className="flex items-baseline gap-3 mb-5">
                <span
                  className="font-oswald tabular-nums leading-none"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(28px, 2.6vw, 38px)",
                    color: "rgba(43,43,43,0.4)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p.no}
                </span>
                <span className="font-inter text-[10px] tracking-[0.22em] uppercase text-text-secondary font-bold">
                  {p.tag}
                </span>
              </div>

              <p className="text-text-primary text-[clamp(15px,1.3vw,18px)] font-medium tracking-[0.04em] leading-[1.5]">
                {p.label}
              </p>

              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className="font-oswald tabular-nums leading-none"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(56px, 6vw, 88px)",
                    letterSpacing: "-0.04em",
                    color: FOREST,
                  }}
                >
                  {p.headline}
                </span>
              </div>

              <p className="mt-5 text-[13px] leading-[1.95] text-text-secondary flex-1">
                {p.body}
              </p>

              <span
                className="mt-6 inline-flex items-center gap-1 font-inter text-[11px] tracking-[0.18em] uppercase font-bold transition-colors"
                style={{ color: FOREST }}
              >
                {p.cta}
                <span
                  className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                  style={{ color: ACCENT }}
                >
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
