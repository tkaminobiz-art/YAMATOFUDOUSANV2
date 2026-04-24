import CtaButton from "@/components/ui/CtaButton";

/*
  PriceSection — 2026-04-24 v3 (案A shukobuild型 カタログ)
  ---------------------------------------------------------------
  v2(v1は明朝+非対称) で残っていた:
  - Shippori Mincho (明朝) 見出し "三タイプ、ご用意しています。"
  - Shippori 900 漢字 花/風/京
  - "Pricing" 英字kicker
  - 非対称 1.4fr:1fr ヘッダー
  - 背景画像(exterior-terrace)ウォーターマーク
  を撤去。3プランの"並列フラット"原則は維持。

  v3 本実装: 一言 heading + 3プラン横並びフラット + 含む/別途 2列
*/

type Plan = {
  id: "hana" | "kaze" | "miyako";
  name: string;
  reading: string;
  tagline: string;
  price: string;
  tsubo: string;
  layout: string;
};

const PLANS: readonly Plan[] = [
  {
    id: "hana",
    name: "花",
    reading: "HANA",
    tagline: "4LDK・33坪、ゆとりのある間取りです。",
    price: "2,480",
    tsubo: "33坪（109㎡）",
    layout: "4LDK",
  },
  {
    id: "kaze",
    name: "風",
    reading: "KAZE",
    tagline: "30坪で、家事動線を整えています。",
    price: "2,480",
    tsubo: "30坪",
    layout: "4LDK",
  },
  {
    id: "miyako",
    name: "京",
    reading: "MIYAKO",
    tagline: "3LDK・28坪、必要な広さに絞りました。",
    price: "2,280",
    tsubo: "28坪",
    layout: "3LDK",
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

function PlanCard({ plan }: { plan: Plan }) {
  const isHeadliner = plan.price === "2,280";

  return (
    <article className="group relative flex flex-col bg-white border border-text-primary/10 p-6 md:p-9 md:min-h-[480px] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]">
      {/* 漢字 1 文字(Noto Sans 900, lime-deep) + ローマ字 */}
      <div className="flex items-end gap-3">
        <span
          className="font-sans leading-[0.85]"
          style={{
            fontWeight: 900,
            fontSize: "clamp(52px, 5.5vw, 84px)",
            color: "var(--color-lime-deep)",
            letterSpacing: "0.02em",
          }}
        >
          {plan.name}
        </span>
        <span
          className="font-inter text-text-secondary pb-2 md:pb-2.5"
          style={{
            fontWeight: 600,
            fontSize: "clamp(11px, 0.85vw, 13px)",
            letterSpacing: "0.22em",
          }}
        >
          {plan.reading}
        </span>
      </div>

      {/* 仕様 — Inter tabular */}
      <dl className="font-inter flex items-center gap-3 mt-6 md:mt-7 text-[11px] md:text-[12px] tracking-[0.12em] text-text-secondary font-bold">
        <dt className="sr-only">間取り</dt>
        <dd>{plan.layout}</dd>
        <span aria-hidden className="w-px h-3 bg-text-primary/20" />
        <dt className="sr-only">延床</dt>
        <dd>{plan.tsubo}</dd>
      </dl>

      {/* タグライン — Noto Sans 400 */}
      <p className="font-sans text-text-primary/80 text-[clamp(13px,1vw,15px)] leading-[1.95] mt-4 max-w-[22rem]">
        {plan.tagline}
      </p>

      {/* 価格(底) */}
      <div className="mt-6 md:mt-auto pt-6 md:pt-10 border-t border-text-primary/10">
        <div className="flex items-baseline gap-2 md:gap-3">
          <span
            className="font-oswald tabular-nums leading-[0.85]"
            style={{
              fontWeight: 300,
              fontSize: "clamp(48px, 6vw, 84px)",
              letterSpacing: "-0.03em",
              color: isHeadliner ? "var(--color-lime-deep)" : undefined,
            }}
          >
            {plan.price}
          </span>
          <span className="font-sans text-text-primary/70 text-[clamp(13px,1vw,16px)] font-medium pb-1.5 md:pb-2">
            万円〜
          </span>
        </div>
        <p className="font-inter text-[10px] md:text-[11px] tracking-[0.14em] text-text-secondary mt-3">
          税込・建物本体と付帯工事まで含む
        </p>
      </div>
    </article>
  );
}

export default function PriceSection() {
  return (
    <section
      id="product"
      className="relative scroll-mt-20 bg-bg-secondary text-text-primary py-[var(--section-py)] md:scroll-mt-24"
    >
      <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ========== Heading ========== */}
        <header className="mb-12 md:mb-16 max-w-[860px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "var(--display-lg)" }}
          >
            三タイプ、ご用意しています。
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[2.0] max-w-[680px]">
            京モデルは、
            <span className="font-bold text-lime-deep">2,280万円</span>
            から始まります。
            <br className="hidden md:inline" />
            税込で、建物本体と付帯工事まで含みます。土地や登記は別途です。
          </p>
        </header>

        {/* ========== 3 プラン ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>

        {/* ========== 含む / 別途 ========== */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 lg:gap-20 pt-10 md:pt-14 border-t border-text-primary/15">
          <div>
            <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-lime-deep mb-5">
              Included · 含まれるもの
            </p>
            <ul className="space-y-3">
              {INCLUDED.map((t) => (
                <li
                  key={t}
                  className="font-sans flex items-baseline gap-3 text-text-primary text-[clamp(13px,1vw,15px)] leading-[1.75]"
                >
                  <span
                    aria-hidden
                    className="font-oswald shrink-0 pt-[2px] text-lime-deep"
                    style={{ fontWeight: 500, fontSize: "14px" }}
                  >
                    +
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l md:border-text-primary/15 md:pl-10 lg:pl-14">
            <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.26em] uppercase text-text-secondary mb-5">
              Excluded · 別途となるもの
            </p>
            <ul className="space-y-3">
              {EXCLUDED.map((t) => (
                <li
                  key={t}
                  className="font-sans flex items-baseline gap-3 text-text-primary/85 text-[clamp(13px,1vw,15px)] leading-[1.75]"
                >
                  <span
                    aria-hidden
                    className="font-oswald text-text-secondary/50 shrink-0 pt-[2px]"
                    style={{ fontWeight: 300, fontSize: "12px" }}
                  >
                    —
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ========== 注記 + CTA ========== */}
        <div className="mt-12 md:mt-16 flex flex-col gap-8 pt-10 border-t border-text-primary/15 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-12">
          <p className="font-sans max-w-[44rem] text-[11px] md:text-[12px] leading-[1.95] text-text-secondary">
            ※ 広さ・間取り・価格帯の目安です。間取り・坪数・設備はご家族に合わせて設計します。
            <br />
            ※ 表示価格は建物本体(税込)に付帯工事まで含む目安です。土地・登記等は別途です。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end shrink-0">
            <CtaButton
              href="/money"
              variant="secondary"
              size="md"
              label="資金計画を詳しく見る"
              sublabel="月々のお支払いの目安まで"
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
