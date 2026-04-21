import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";

/*
  PriceSection — 2026-04-21 全面リニューアル(Plan A 継承: カタログ 3プラン)
  -----------------------------------------------------------------
  旧: 389行 / ダークスラブ(#252623)価格ロックアップ / 2280ウォーターマーク /
       gridline + radial-gradient 背景 / 花プラン全幅 + 風京2列の非対称 /
       BUILDING・TAX IN・SCOPE・INCLUDED・NOT IN BUILDING・PLANS の英字ラベル

  新: 約200行 / 暖白 #FAF8F3 (Mechanism + Zero と連続) /
       非対称ヘッダー(1.4fr:1fr / border-t-[3px]) /
       3プラン完全フラット同粒子 / 含む・別途の罫線のみ2列

  設計哲学:
  - ZeroDeclaration と同じ「同粒子で刻む」カタログ思想
  - 「軸となる一つのプラン」等の編集フレーズを排し、3プランを並列に
  - LIME不使用(Zero と統一)
  - 漢字1文字(花/風/京)を Shippori 900 で主役級に
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
    reading: "hana",
    tagline: "部屋数と収納に、ゆとりを。",
    price: "2,480",
    tsubo: "33坪（109㎡）",
    layout: "4LDK",
  },
  {
    id: "kaze",
    name: "風",
    reading: "kaze",
    tagline: "家事も、広さも。",
    price: "2,480",
    tsubo: "30坪",
    layout: "4LDK",
  },
  {
    id: "miyako",
    name: "京",
    reading: "miyako",
    tagline: "必要なものだけを、コンパクトに。",
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
  // Hero のメインメッセージ「2,280万円〜」と呼応する最安プラン(京)の
  // 価格数字のみ LIME で着色。ブランド色の継承で視線を誘導。
  const isHeadliner = plan.price === "2,280";

  return (
    <article className="group relative flex flex-col bg-white border border-text-primary/10 p-7 md:p-9 min-h-[520px] md:min-h-[560px] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]">
      {/* 漢字 — Shippori Black 主役 */}
      <div className="flex items-end gap-3 md:gap-4">
        <span
          className="font-shippori text-text-primary leading-[0.85] tracking-[0.02em]"
          style={{
            fontWeight: 900,
            fontSize: "clamp(80px, 9vw, 140px)",
          }}
        >
          {plan.name}
        </span>
        <span
          className="font-oswald text-text-secondary pb-2 md:pb-3 uppercase"
          style={{
            fontWeight: 300,
            fontSize: "clamp(13px, 1vw, 15px)",
            letterSpacing: "0.18em",
          }}
        >
          {plan.reading}
        </span>
      </div>

      {/* 仕様 — Inter tabular */}
      <dl className="font-inter flex items-center gap-3 mt-8 md:mt-10 text-[12px] md:text-[13px] tracking-[0.08em] text-text-secondary font-medium">
        <dt className="sr-only">間取り</dt>
        <dd>{plan.layout}</dd>
        <span aria-hidden className="w-px h-3 bg-text-primary/20" />
        <dt className="sr-only">延床</dt>
        <dd>{plan.tsubo}</dd>
      </dl>

      {/* タグライン */}
      <p className="font-shippori text-text-primary/80 text-[clamp(14px,1.05vw,16px)] leading-[1.95] mt-4 max-w-[20rem]">
        {plan.tagline}
      </p>

      {/* 価格(底) — 京(2,280)のみ LIME で Hero 連動 */}
      <div className="mt-auto pt-10 md:pt-12 border-t border-text-primary/10">
        <div className="flex items-baseline gap-2 md:gap-3">
          <span
            className="font-oswald tabular-nums leading-[0.85]"
            style={{
              fontWeight: 300,
              fontSize: "clamp(64px, 8vw, 112px)",
              letterSpacing: "-0.03em",
              color: isHeadliner ? "#A2C523" : undefined,
            }}
          >
            {plan.price}
          </span>
          <span className="font-shippori text-text-primary/70 text-[clamp(14px,1.1vw,18px)] font-medium pb-2 md:pb-3">
            万円〜
          </span>
        </div>
        <p className="font-inter text-[10px] md:text-[11px] tracking-[0.12em] text-text-secondary mt-3">
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
      className="relative scroll-mt-20 overflow-hidden bg-[#FAF8F3] text-text-primary py-[var(--section-py)] md:scroll-mt-24"
    >
      {/* ========== 背景画像レイヤー ==========
          外観テラス(exterior-terrace-01)を薄く透かして「紙の下で写真が呼吸する」誌面感。
          - 画像 opacity 0.22 + 編集誌フィルター(低彩度/低コントラスト/微セピア)
          - 暖白オーバーレイ /55 で本文視認性を確保
          - 上下グラデ(中央透明→端 /40)で本文域を優先
          - カード(bg-white)は画像を完全に隠す → カード間のgap と余白に写真がうっすら透ける */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <Image
          src="/images/newsozai/exterior-terrace-01.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          style={{
            opacity: 0.22,
            filter: "saturate(0.82) contrast(0.98) sepia(0.08) brightness(1.06)",
          }}
        />
        <div className="absolute inset-0 bg-[#FAF8F3]/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F3]/40 via-transparent to-[#FAF8F3]/55" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ================= HEADER (非対称) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end mb-16 md:mb-24">
          {/* Left: 看板 */}
          <div>
            <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
              Pricing
            </p>
            <h2
              className="font-shippori text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                fontSize: "clamp(44px, 8vw, 120px)",
              }}
            >
              三つの、家。
            </h2>
          </div>

          {/* Right: LEAD */}
          <aside className="lg:pt-4">
            <div className="border-t-[3px] border-text-primary pt-6">
              <p className="font-shippori font-bold text-[clamp(22px,2.2vw,32px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                <span style={{ color: "#A2C523" }}>2,280</span>万円から。
              </p>
              <p className="mt-5 md:mt-6 font-shippori font-medium text-[clamp(17px,1.5vw,22px)] leading-[1.8] max-w-[480px] text-text-primary/90">
                税込・建物本体と付帯工事まで込み。
                <br />
                土地や登記は別途です。
              </p>
            </div>
          </aside>
        </div>

        {/* ================= 3プランカード ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {PLANS.map((p) => (
            <PlanCard key={p.id} plan={p} />
          ))}
        </div>

        {/* ================= 含むもの / 別途 ================= */}
        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 pt-10 md:pt-14 border-t border-text-primary/15">
          <div>
            <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-text-secondary mb-6">
              含まれるもの
            </p>
            <ul className="space-y-3.5">
              {INCLUDED.map((t) => (
                <li
                  key={t}
                  className="font-shippori flex items-baseline gap-3 text-text-primary text-[clamp(14px,1.05vw,16px)] leading-[1.75]"
                >
                  <span
                    aria-hidden
                    className="font-oswald shrink-0 pt-[2px]"
                    style={{ fontWeight: 500, fontSize: "14px", color: "#A2C523" }}
                  >
                    +
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l md:border-text-primary/15 md:pl-10 lg:pl-16">
            <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-text-secondary mb-6">
              別途となるもの
            </p>
            <ul className="space-y-3.5">
              {EXCLUDED.map((t) => (
                <li
                  key={t}
                  className="font-shippori flex items-baseline gap-3 text-text-primary/85 text-[clamp(14px,1.05vw,16px)] leading-[1.75]"
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

        {/* ================= 注記 + CTA ================= */}
        <div className="mt-14 md:mt-20 flex flex-col gap-8 pt-10 border-t border-text-primary/15 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-12">
          <p className="font-shippori max-w-[44rem] text-[11px] md:text-[12px] leading-[1.95] text-text-secondary">
            ※ 広さ・間取り・価格帯の目安です。間取り・坪数・設備はご家族に合わせて設計します。
            <br />
            ※ 表示価格は建物本体(税込)に付帯工事まで含む目安です。土地・登記等は別途です。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end shrink-0">
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
