"use client";

/*
  SellingPointsStrip — /money Hero直下「やまとが、できること。3つあります。」
  v2: 英字tag(Tsunagi-Yusi/Land/Neutral FP)・抽象headline(¥0/直販/外部)を整理。
      初見ユーザーが3秒で意味を取れるよう、日本語tag + 具体数字 + 短い説明。
*/

const FOREST = "#486B00";
const ACCENT = "#A2C523";

const POINTS = [
  {
    no: "01",
    tag: "つなぎ融資",
    headline: "ゼロ円",
    sub: "30〜80万円が、家計に戻る",
    body: "土地と建物を、自社で一貫して進めます。だから一般的に発生する つなぎ融資の利息と手数料が、まるごとかかりません。",
    href: "#ch-bridge",
  },
  {
    no: "02",
    tag: "自社の土地",
    headline: "800万円〜",
    sub: "矢田町ほか、奈良・京都の自社分譲地",
    body: "中間業者を挟まず、やまとが直接ご紹介。仲介手数料も発生しません。土地と建物を一本の段取りで進められます。",
    href: "#ch-land",
  },
  {
    no: "03",
    tag: "FP相談",
    headline: "中立",
    sub: "やまと社内ではなく、提携先のFP事務所",
    body: "ファイナンシャルプランナーは社内にいません。「家を売るためのFP」ではなく、独立した事務所がご家族のライフプランを軸に、率直にお話しします。",
    href: "#ch-fp",
  },
] as const;

export default function SellingPointsStrip() {
  return (
    <section className="relative bg-[#FAF8F3] border-y border-text-primary/10 py-12 md:py-16">
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        <div className="mb-8 md:mb-10">
          <p
            className="text-[10px] md:text-[11px] tracking-[0.18em] font-bold mb-3"
            style={{ color: FOREST }}
          >
            やまとが、できること。
          </p>
          <h2
            className="text-text-primary leading-[1.2] tracking-[-0.01em]"
            style={{ fontWeight: 500, fontSize: "clamp(24px, 3vw, 40px)" }}
          >
            お金まわりの売りは、3つあります。
          </h2>
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
                <span className="text-[12px] md:text-[13px] tracking-[0.06em] text-text-secondary font-medium">
                  {p.tag}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mt-2">
                <span
                  className="font-oswald tabular-nums leading-none"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(48px, 5.5vw, 80px)",
                    letterSpacing: "-0.03em",
                    color: FOREST,
                  }}
                >
                  {p.headline}
                </span>
              </div>

              <p
                className="mt-4 text-text-primary text-[clamp(14px,1.2vw,17px)] font-medium tracking-[0.04em] leading-[1.55]"
              >
                {p.sub}
              </p>

              <p className="mt-4 text-[13px] leading-[1.95] text-text-secondary flex-1">
                {p.body}
              </p>

              <span
                className="mt-6 inline-flex items-center gap-1 text-[12px] md:text-[13px] font-medium transition-colors"
                style={{ color: FOREST }}
              >
                詳しく見る
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
