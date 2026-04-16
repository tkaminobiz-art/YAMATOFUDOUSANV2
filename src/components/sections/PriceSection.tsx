const PLANS = [
  {
    id: "hana" as const,
    name: "花",
    reading: "hana",
    tagline: "ゆとりのある4LDK",
    price: "2,480",
    priceYen: "2,480万円",
    tsubo: "33坪（109㎡）",
    layout: "4LDK",
    featured: true,
  },
  {
    id: "kaze" as const,
    name: "風",
    reading: "kaze",
    tagline: "暮らしやすい4LDK",
    price: "2,480",
    priceYen: "2,480万円",
    tsubo: "30坪",
    layout: "4LDK",
    featured: false,
  },
  {
    id: "miyako" as const,
    name: "京",
    reading: "miyako",
    tagline: "コンパクトな3LDK",
    price: "2,280",
    priceYen: "2,280万円",
    tsubo: "28坪",
    layout: "3LDK",
    featured: false,
  },
] as const;

const MATRIX_ROWS = [
  { label: "価格（税込・コミコミ）", key: "priceYen" as const },
  { label: "延床面積（目安）", key: "tsubo" as const },
  { label: "間取り（目安）", key: "layout" as const },
];

export default function PriceSection() {
  return (
    <section
      id="product"
      className="relative scroll-mt-20 overflow-hidden bg-bg-secondary py-[var(--section-py)] md:scroll-mt-24"
    >
      {/* 奥行き：ごく薄い緑のグラデーション */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_-15%,rgba(90,138,74,0.09),transparent_58%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-main/25 to-transparent"
      />

      <div className="relative mx-auto max-w-[1240px] px-[var(--page-px)]">
        {/* マストヘッド */}
        <header className="mb-12 md:mb-16 lg:mb-20">
          <p className="font-section-label text-main text-xs tracking-[0.22em] md:text-sm">
            PRICING
          </p>
          <div
            className="mt-5 h-[2px] w-20 bg-gradient-to-r from-main via-main/70 to-transparent md:w-28"
            aria-hidden
          />
          <h2
            className="mt-8 max-w-[22em] text-[clamp(26px,4vw,42px)] font-medium leading-[1.35] tracking-[0.02em] text-text-primary md:mt-10"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            花・風・京
            <span className="text-text-secondary/90"> — </span>
            参考プランと価格帯
          </h2>
          <p className="mt-6 max-w-[36rem] text-[clamp(15px,1.15vw,17px)] leading-[1.85] text-text-secondary">
            税込・建物本体・付帯工事込みのコミコミ価格で、3モデルを並べて比較できます。土地代・登記等は含みません。間取りや坪数は、ご家族に合わせて設計します。
          </p>
        </header>

        {/* 価格レンジ — ヒーローブロック */}
        <div className="relative mb-14 md:mb-20">
          <div className="rounded-2xl border border-border/80 bg-bg-primary p-8 shadow-[0_20px_60px_-24px_rgba(43,43,43,0.14)] md:p-10 lg:p-12 lg:px-14">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
              <div className="max-w-md">
                <p
                  className="text-[11px] font-semibold tracking-[0.18em] text-main/90 md:text-xs"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  価格帯
                </p>
                <p
                  className="mt-3 text-lg font-medium leading-snug text-text-primary md:text-xl"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  コミコミ価格の目安
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  建物本体と標準設備・付帯工事まで含んだ、税込表示です。
                </p>
              </div>
              <div className="flex flex-col items-start gap-1 lg:items-end lg:text-right">
                <span className="text-sm text-text-secondary md:text-base">
                  2,280万円から
                </span>
                <div className="flex items-end gap-2 md:gap-3">
                  <span
                    className="font-light tabular-nums tracking-[-0.04em] text-text-primary"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "clamp(56px,12vw,120px)",
                      lineHeight: 0.88,
                    }}
                  >
                    2,480
                  </span>
                  <span
                    className="pb-2 text-2xl font-normal text-text-primary md:pb-3 md:text-3xl"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    万円〜
                  </span>
                </div>
                <p className="mt-2 text-xs text-text-secondary md:text-sm">
                  花・風のライン／京は別価格帯
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3プラン — カード */}
        <div className="mb-16 md:mb-20">
          <p
            className="mb-6 text-xs font-medium tracking-[0.12em] text-text-secondary md:mb-8 md:text-sm"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            3つの出発プラン
          </p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {PLANS.map((p) => (
              <article
                key={p.id}
                className={[
                  "relative flex flex-col rounded-xl border bg-bg-primary p-6 md:p-7",
                  "transition-shadow duration-300",
                  p.featured
                    ? "border-main shadow-[0_16px_48px_-20px_rgba(90,138,74,0.35)] ring-1 ring-main/25"
                    : "border-border card-shadow hover:-translate-y-0.5 hover:shadow-md",
                ].join(" ")}
              >
                {p.featured && (
                  <span className="absolute -top-2.5 left-5 bg-main px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white">
                    Recommend
                  </span>
                )}
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-medium text-text-primary md:text-4xl"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {p.name}
                  </span>
                  <span className="text-sm text-text-secondary">{p.reading}</span>
                </div>
                <p className="mt-2 min-h-[2.75rem] text-sm leading-relaxed text-text-secondary">
                  {p.tagline}
                </p>
                <div className="mt-6 border-t border-border/90 pt-6">
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="text-3xl font-light tabular-nums text-text-primary md:text-[2.125rem]"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {p.price}
                    </span>
                    <span className="text-sm text-text-secondary">万円〜</span>
                  </div>
                  <dl className="mt-5 space-y-2.5 text-sm">
                    <div className="flex justify-between gap-4 border-b border-border/60 pb-2">
                      <dt className="text-text-secondary">延床（目安）</dt>
                      <dd className="text-right font-medium text-text-primary">{p.tsubo}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-text-secondary">間取り</dt>
                      <dd className="text-right font-medium text-text-primary">{p.layout}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* 比較マトリクス */}
        <div className="overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-sm">
          <div className="border-b border-border bg-main-light/80 px-4 py-3 md:px-6">
            <p
              className="text-xs font-medium tracking-[0.08em] text-text-primary md:text-sm"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              スペック比較
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-main text-left text-white">
                  <th className="w-[38%] px-4 py-4 text-xs font-normal opacity-95 md:px-6 md:text-sm">
                    項目
                  </th>
                  {PLANS.map((p) => (
                    <th
                      key={p.id}
                      className="px-3 py-4 text-center font-normal md:px-5"
                    >
                      <span className="text-lg font-medium md:text-xl">{p.name}</span>
                      <span className="ml-1 text-xs font-normal opacity-90">
                        {p.reading}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX_ROWS.map((row, i) => (
                  <tr
                    key={row.label}
                    className={
                      i % 2 === 0 ? "bg-bg-primary" : "bg-bg-secondary/80"
                    }
                  >
                    <td className="border-b border-border px-4 py-3.5 text-xs text-text-secondary md:px-6 md:text-sm">
                      {row.label}
                    </td>
                    {PLANS.map((p) => (
                      <td
                        key={`${p.id}-${row.key}`}
                        className="border-b border-border px-3 py-3.5 text-center text-sm font-medium text-text-primary md:px-5 md:text-base"
                      >
                        {p[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-8 max-w-[52rem] text-[11px] leading-[1.9] text-text-secondary md:text-xs">
          ※ 建物本体価格（税込）、付帯工事込みのコミコミ価格です。土地は別途です。
          <br />
          ※ 間取り・坪数は参考値です。仕様の差分や、あなた仕様への組み替えはショールームでご説明します。
        </p>
      </div>
    </section>
  );
}
