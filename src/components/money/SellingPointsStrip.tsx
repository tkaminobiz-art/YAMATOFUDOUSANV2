"use client";

/*
  SellingPointsStrip — /money のすぐ下「やまとが、できること」3つ
  v3: より短く。各カードは1〜2文で完結。下のアコーディオンに詳細を任せる。
*/

const FOREST = "#486B00";
const ACCENT = "#A2C523";

const POINTS = [
  {
    no: "01",
    label: "つなぎ融資",
    headline: "ゼロ円",
    sub: "30〜80万円が、家計に戻ります",
    href: "#ch-questions",
  },
  {
    no: "02",
    label: "自社の土地",
    headline: "500万円台〜",
    sub: "大和郡山市矢田町ほか、奈良・京都で76区画の実績",
    href: "#ch-questions",
  },
  {
    no: "03",
    label: "FP相談",
    headline: "中立",
    sub: "やまと社内ではなく、提携先のFP事務所",
    href: "#ch-questions",
  },
] as const;

export default function SellingPointsStrip() {
  return (
    <section className="relative bg-[#FAF8F3] border-y border-text-primary/10 py-10 md:py-14">
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        <p
          className="text-[12px] md:text-[13px] tracking-[0.06em] font-bold mb-6 md:mb-8"
          style={{ color: FOREST }}
        >
          やまとが、できること。お金の売りは3つ。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/15">
          {POINTS.map((p) => (
            <a
              key={p.no}
              href={p.href}
              className="group bg-white p-6 md:p-8 flex flex-col transition-colors hover:bg-bg-secondary/30"
            >
              <div className="flex items-baseline gap-3 mb-3">
                <span
                  className="font-oswald tabular-nums leading-none"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(24px, 2.2vw, 32px)",
                    color: "rgba(43,43,43,0.4)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p.no}
                </span>
                <span className="text-[13px] md:text-[14px] tracking-[0.06em] text-text-secondary font-medium">
                  {p.label}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span
                  className="font-oswald tabular-nums leading-none"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(44px, 5vw, 72px)",
                    letterSpacing: "-0.03em",
                    color: FOREST,
                  }}
                >
                  {p.headline}
                </span>
              </div>

              <p className="mt-3 text-text-primary text-[13px] md:text-[15px] leading-[1.6]">
                {p.sub}
              </p>

              <span
                className="mt-4 inline-flex items-center gap-1 text-[12px] font-medium transition-colors"
                style={{ color: FOREST }}
              >
                詳しく
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
