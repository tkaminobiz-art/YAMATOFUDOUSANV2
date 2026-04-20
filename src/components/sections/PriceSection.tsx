import SectionHeaderCentered from "@/components/SectionHeaderCentered";
import CtaButton from "@/components/ui/CtaButton";

const PLANS = [
  {
    id: "hana" as const,
    name: "花",
    reading: "hana",
    tagline: "部屋数と収納に、ゆとりをお求めのご家族に。",
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
    tagline: "家事のしやすさと、広さを両立させたいご家族に。",
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
    tagline: "必要なものを、コンパクトに。ご夫婦や少人数のご家族に。",
    price: "2,280",
    priceYen: "2,280万円",
    tsubo: "28坪",
    layout: "3LDK",
    featured: false,
  },
] as const;

const INCLUDED = [
  "建物本体",
  "標準設備（キッチン クリナップ・浴室 TOTO など）",
  "付帯工事",
  "設計・申請に関わる費用",
] as const;

const EXCLUDED = [
  "土地代",
  "登記費用",
  "引越し費用",
  "外構工事（ご要望の内容により）",
] as const;

export default function PriceSection() {
  const featured = PLANS.find((p) => p.featured)!;
  const rest = PLANS.filter((p) => !p.featured);

  return (
    <section
      id="product"
      className="relative scroll-mt-20 overflow-hidden bg-bg-primary py-[var(--section-py)] md:scroll-mt-24"
    >
      {/* 紙面のような極薄グリッド（装飾） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(43,43,43,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,43,43,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_100%_0%,rgba(90,138,74,0.07),transparent_55%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="relative mx-auto max-w-[1240px] px-[var(--page-px)]">
        <SectionHeaderCentered
          align="left"
          noMargin
          label="PRICING"
          ghostText="PRICE"
          title="価格の前提は、最初にそろえておきます。"
          lead="建物本体・標準設備・付帯工事まで含めた税込の目安です。土地や登記は別途になるので、その前提もここでそろえます。"
          className="mb-12 md:mb-16 lg:mb-20"
        />

        {/* 価格ロックアップ：編集誌の見開き＋ダークスラブ */}
        <div className="mb-14 overflow-hidden rounded-[2rem] border border-border shadow-[0_32px_80px_-40px_rgba(43,43,43,0.25)] md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="relative flex min-h-[280px] flex-col justify-between bg-[#252623] p-8 text-[#F4F3EE] md:p-10 lg:col-span-7 lg:min-h-[320px] lg:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none text-[clamp(120px,28vw,280px)] font-light leading-none tracking-[-0.06em] text-white/[0.04]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                2280
              </div>
              <div className="relative">
                <p
                  className="text-[10px] font-semibold tracking-[0.28em] text-white/45"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  BUILDING / TAX IN
                </p>
                <p
                  className="mt-5 max-w-[20ch] text-[clamp(22px,2.4vw,30px)] font-semibold leading-snug tracking-[0.04em]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  建物まわりすべて込み・税込の目安
                </p>
              </div>
              <div className="relative mt-10 lg:mt-0">
                <div className="flex flex-wrap items-end gap-3 md:gap-4">
                  <span
                    className="tabular-nums tracking-[-0.05em] text-[#FAFAF7]"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "clamp(56px,12vw,118px)",
                      lineHeight: 0.9,
                    }}
                  >
                    2,280
                  </span>
                  <span
                    className="pb-2 text-lg font-medium text-white/70 md:pb-3 md:text-xl"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    万円〜
                  </span>
                </div>
                <p
                  className="mt-5 max-w-prose text-sm leading-relaxed text-white/55 md:text-[15px]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  花・風は{" "}
                  <span className="font-medium text-white/80">2,480万円〜</span>
                  が目安です。坪数・間取り・設備はご家族に合わせて変わります。
                </p>
                <p className="mt-4 text-[11px] leading-relaxed text-white/40">
                  ※ 土地代・登記等は別途です
                </p>
              </div>
              <div
                aria-hidden
                className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-main via-main/60 to-transparent"
              />
            </div>

            <div className="flex flex-col justify-between border-t border-border bg-bg-secondary/50 p-8 md:p-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:bg-bg-secondary/30">
              <div>
                <p
                  className="text-[10px] font-semibold tracking-[0.22em] text-text-secondary"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  SCOPE
                </p>
                <p
                  className="mt-4 text-base font-medium leading-relaxed text-text-primary md:text-lg"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  いま見ているのは、建物本体の総額の目安です。
                </p>
                <p className="mt-4 text-sm leading-[1.9] text-text-secondary">
                  敷地や仕様で前後しますが、まずはこの枠で家計の見通しを立てます。細部は来場時に一覧でご説明します。
                </p>
              </div>
              <dl className="mt-10 grid gap-3 border-t border-border/80 pt-8 text-sm">
                <div className="flex items-baseline justify-between gap-6 border-b border-border/60 pb-3">
                  <dt className="text-text-secondary">表記</dt>
                  <dd className="text-right font-medium text-text-primary">税込で、建物と付帯工事まで</dd>
                </div>
                <div className="flex items-baseline justify-between gap-6">
                  <dt className="text-text-secondary">別途</dt>
                  <dd className="text-right font-medium text-text-primary">土地・登記・外構など</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* 含む / 別途 — 罫線のみの編集レイアウト */}
        <div className="mb-16 border-y border-border md:mb-20">
          <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-2 md:divide-x md:divide-y-0">
            <div className="px-0 py-10 md:py-12 md:pr-10 lg:pr-14">
              <p
                className="text-[10px] font-semibold tracking-[0.26em] text-main"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                INCLUDED
              </p>
              <p
                className="mt-4 text-lg font-semibold text-text-primary md:text-xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                価格に含まれるもの、たとえば
              </p>
              <ul className="mt-8 space-y-4 text-sm leading-relaxed text-text-secondary md:text-[15px]">
                {INCLUDED.map((t) => (
                  <li key={t} className="flex gap-4">
                    <span
                      className="mt-0.5 shrink-0 font-medium tabular-nums text-main/80"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      ＋
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[12px] leading-relaxed text-text-secondary">
                含む範囲は、プランと敷地条件で決まります。
              </p>
            </div>
            <div className="px-0 py-10 md:border-l md:py-12 md:pl-10 lg:pl-14">
              <p
                className="text-[10px] font-semibold tracking-[0.26em] text-text-secondary"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                NOT IN BUILDING
              </p>
              <p
                className="mt-4 text-lg font-semibold text-text-primary md:text-xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                別途となりやすいもの、たとえば
              </p>
              <ul className="mt-8 space-y-4 text-sm leading-relaxed text-text-secondary md:text-[15px]">
                {EXCLUDED.map((t) => (
                  <li key={t} className="flex gap-4">
                    <span
                      className="mt-0.5 shrink-0 font-medium text-text-secondary/70"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      —
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[12px] leading-relaxed text-text-secondary">
                別途の目安は、土地条件とご要望で変わります。お金の相談で一緒に整理します。
              </p>
            </div>
          </div>
        </div>

        {/* プラン：花＝全幅、風・京＝2列（同型3カードを避ける） */}
        <div>
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
            <p
              className="text-[10px] font-semibold tracking-[0.26em] text-text-secondary"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              PLANS
            </p>
            <p className="text-xs text-text-secondary md:text-sm">
              広さ・間取り・価格帯の目安です。実際のプランは、ご家族に合わせて設計します。
            </p>
          </div>

          {/* A案：装飾より刷り物。左ルールのみで格を出す */}
          <article className="relative mb-5 flex overflow-hidden rounded-xl border border-border bg-bg-primary md:mb-6">
            <div className="w-[3px] shrink-0 bg-main" aria-hidden />
            <div className="grid flex-1 grid-cols-1 gap-8 p-6 md:grid-cols-12 md:gap-10 md:p-8 lg:p-10">
              <div className="flex flex-col justify-between md:col-span-5">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.12em] text-text-secondary">
                    軸となる、一つのプラン
                  </p>
                  <div className="mt-4 flex items-end gap-3">
                    <span
                      className="text-[clamp(40px,6vw,64px)] font-semibold leading-none text-text-primary"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {featured.name}
                    </span>
                    <span className="pb-1 text-sm text-text-secondary">{featured.reading}</span>
                  </div>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary md:text-[15px]">
                    {featured.tagline}
                  </p>
                </div>
                <dl className="mt-8 grid gap-3 text-sm md:mt-0">
                  <div className="flex justify-between gap-6 border-b border-border pb-2">
                    <dt className="text-text-secondary">延床（目安）</dt>
                    <dd className="text-right font-medium text-text-primary">{featured.tsubo}</dd>
                  </div>
                  <div className="flex justify-between gap-6">
                    <dt className="text-text-secondary">間取り</dt>
                    <dd className="text-right font-medium text-text-primary">{featured.layout}</dd>
                  </div>
                </dl>
              </div>
              <div className="flex flex-col justify-end border-t border-border pt-8 md:col-span-7 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:pl-12">
                <p className="text-xs text-text-secondary">税込目安（建物まわり、すべて込み）</p>
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span
                    className="text-[clamp(36px,7vw,72px)] font-light tabular-nums tracking-[-0.04em] text-text-primary"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {featured.price}
                  </span>
                  <span className="text-lg text-text-secondary md:text-xl">万円〜</span>
                </div>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {rest.map((p) => (
              <article
                key={p.id}
                className="flex flex-col rounded-xl border border-border bg-bg-primary p-6 md:p-7"
              >
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-3xl font-semibold text-text-primary md:text-4xl"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {p.name}
                  </span>
                  <span className="text-sm text-text-secondary">{p.reading}</span>
                </div>
                <p className="mt-3 min-h-[2.5rem] text-sm leading-relaxed text-text-secondary">
                  {p.tagline}
                </p>
                <div className="mt-auto border-t border-border pt-6">
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-3xl font-light tabular-nums text-text-primary md:text-[2rem]"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {p.price}
                    </span>
                    <span className="text-sm text-text-secondary">万円〜</span>
                  </div>
                  <dl className="mt-5 space-y-2 text-sm">
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

          <p className="mt-8 max-w-[62rem] text-[12px] leading-[1.9] text-text-secondary md:text-[13px]">
            ※ こちらは広さ・間取り・価格帯の目安です。間取り・坪数・設備はご家族に合わせて設計します。価格は条件により変わります。
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-8 border-t border-border pt-10 md:mt-16 md:flex-row md:items-end md:justify-between md:pt-12">
          <p className="max-w-[52rem] text-[11px] leading-[1.9] text-text-secondary md:text-xs">
            ※ 表示価格は建物本体（税込）に付帯工事まで含む目安です。土地・登記等は別途です。
            <br />
            ※ 仕様の違いや、ご家族に合わせた調整は、来場時にご説明します。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <CtaButton
              href="#money-talk"
              variant="secondary"
              size="md"
              label="お金のご相談、承ります"
              sublabel="不安なことは、こちらから"
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
