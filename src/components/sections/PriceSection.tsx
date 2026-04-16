import SectionHeaderCentered from "@/components/SectionHeaderCentered";
import CtaButton from "@/components/ui/CtaButton";

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
        <div className="mb-12 md:mb-16 lg:mb-20">
          <SectionHeaderCentered
            noMargin
            label="PRICING"
            ghostText="PRICING"
            title="価格の目安と、コミコミに含まれる範囲"
            lead="まずは「いくらくらい？」の目安を。建物本体・標準設備・付帯工事まで含めた税込の目安を示します。"
          />
        </div>

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
                  コミコミ価格の目安（建物）
                </p>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  建物本体・標準設備・付帯工事まで含んだ税込表示です。
                </p>
                <div className="mt-6 rounded-xl border border-border/80 bg-bg-secondary/60 px-5 py-4">
                  <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">
                    まずはこの範囲で考えてください
                  </p>
                  <p
                    className="mt-2 text-[clamp(18px,2vw,22px)] font-semibold leading-[1.6] tracking-[0.05em] text-text-primary"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    目安は <span className="tabular-nums">2,280</span>万円〜
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-text-secondary">
                    花・風は 2,480万円〜（目安）
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 lg:items-end lg:text-right">
                <div className="flex items-end gap-2 md:gap-3">
                  <span
                    className="font-light tabular-nums tracking-[-0.04em] text-text-primary"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "clamp(52px,11vw,112px)",
                      lineHeight: 0.88,
                    }}
                  >
                    2,280
                  </span>
                  <span
                    className="pb-2 text-2xl font-normal text-text-primary md:pb-3 md:text-3xl"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    万円〜
                  </span>
                </div>
                <p className="mt-2 text-xs text-text-secondary md:text-sm">
                  ※ 土地代・登記等は別途です
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 含む/別途 — いちばん大事な確定事項 */}
        <div className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-bg-primary p-6 md:p-7">
                <p className="text-xs font-semibold tracking-[0.14em] text-main">
                  コミコミに含まれるもの（例）
                </p>
                <ul className="mt-5 grid grid-cols-1 gap-3 text-sm text-text-secondary md:grid-cols-2">
                  {[
                    "建物本体",
                    "標準設備（キッチン・浴室など）",
                    "付帯工事",
                    "設計・申請に関わる費用",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-main" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[12px] leading-relaxed text-text-secondary">
                  含まれる範囲はプランと敷地条件で確定します。詳細は来場時に一覧でご説明します。
                </p>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-bg-secondary/70 p-6 md:p-7">
                <p className="text-xs font-semibold tracking-[0.14em] text-text-primary">
                  別途になりやすいもの（例）
                </p>
                <ul className="mt-5 space-y-3 text-sm text-text-secondary">
                  {[
                    "土地代",
                    "登記費用",
                    "引越し費用",
                    "外構工事（内容により）",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-text-secondary/60" />
                      <span className="leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[12px] leading-relaxed text-text-secondary">
                  別途がどれくらい必要かは、土地とご要望次第。お金の相談で一緒に整理しましょう。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3プラン — カード */}
        <div className="mb-16 md:mb-20">
          <p className="mb-6 text-xs font-semibold tracking-[0.14em] text-main md:mb-8 md:text-sm">
            3つの基本プラン（目安）
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
                  <p className="mt-5 text-[12px] leading-relaxed text-text-secondary">
                    ※ 間取り・坪数・設備はご家族に合わせて設計します。金額は条件により変動します。
                  </p>
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

        <div className="mt-10 flex flex-col gap-4 md:mt-12 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[52rem] text-[11px] leading-[1.9] text-text-secondary md:text-xs">
            ※ 表示価格は建物本体（税込）＋付帯工事込みの目安です。土地・登記等は別途です。
            <br />
            ※ 仕様の差分や、あなた仕様への組み替えは来場時に一覧でご説明します。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaButton
              href="#money-talk"
              variant="secondary"
              size="md"
              label="お金の相談へ"
              sublabel="払えるか不安な方へ"
            />
            <CtaButton
              href="/reserve"
              variant="primary"
              size="md"
              label="来場予約"
              sublabel="ご相談は無料です"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
