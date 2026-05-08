import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";
import { FLOORPLANS } from "@/data/floorplans";

// 各プランに対応する間取り例(旧サイト /blog 間取り事例 から)
// 実邸宅の設計例で、各プランに合わせた目安
const PLAN_FLOORPLAN_MAP: Record<"hana" | "kaze" | "miyako", number> = {
  hana: 472977,    // entry-05: LDK20+吹抜+和室4.5+4寝室 = 花(4LDK/33坪/ゆとり)
  kaze: 472979,    // entry-07: LDK18.7+土間収納+4寝室 = 風(4LDK/30坪/家事動線)
  miyako: 472975,  // entry-03: 平屋+ロフト+LDK24.5+3寝室+書庫 = 京(3LDK/28坪/コンパクト)
};

/*
  PriceSection — 2026-04-25 v4 (Full-bleed Cover Card)
  ---------------------------------------------------------------
  v3 の白背景ミニマルカードがシンプルすぎるとのフィードバックを受け、
  v4 は編集誌カバー型: 実邸宅写真をフルブリードで敷き、
  グラデーションオーバーレイ + 巨大漢字 + 巨大価格の3要素でカッコ良さに振る。

  - 各プランに異なる外観写真を設定(差別化と信頼感)
  - 上: 漢字(白 900)+ローマ字+スペック
  - 下: タグライン + 価格(京のみ lime)
  - Headliner(京) は lime tint + lime price でシグナル
*/

type Plan = {
  id: "hana" | "kaze" | "miyako";
  name: string;
  reading: string;
  /** プランカード(価格カード)で表示する「誰向け」コピー */
  audience: string;
  /** 間取り例カードで表示する技術的な特徴説明 */
  tagline: string;
  price: string;
  tsubo: string;
  layout: string;
  bgImage: string;
  alt: string;
};

const PLANS: readonly Plan[] = [
  {
    id: "hana",
    name: "花",
    reading: "HANA",
    audience: "広さと仕様にゆとりを持たせたいご家族へ。",
    tagline: "4LDK・33坪、ゆとりのある間取りです。",
    price: "2,480",
    tsubo: "33坪（109㎡）",
    layout: "4LDK",
    bgImage: "/images/fv/plan-hana.webp",
    alt: "花モデルの邸宅外観イメージ — 山並みと整った前庭",
  },
  {
    id: "kaze",
    name: "風",
    reading: "KAZE",
    audience: "暮らしやすさと価格のバランスを大切にしたいご家族へ。",
    tagline: "30坪で、家事動線を整えています。",
    price: "2,480",
    tsubo: "30坪",
    layout: "4LDK",
    bgImage: "/images/fv/plan-kaze.webp",
    alt: "風モデルの邸宅外観イメージ — 整った正面と芝生のアプローチ",
  },
  {
    id: "miyako",
    name: "京",
    reading: "MIYAKO",
    audience: "必要な広さに絞り、総額を抑えやすいプランです。",
    tagline: "3LDK・28坪、必要な広さに絞りました。",
    price: "2,280",
    tsubo: "28坪",
    layout: "3LDK",
    bgImage: "/images/fv/plan-miyako.webp",
    alt: "京モデルの端正な玄関まわり — 木目スリットと石畳のアプローチ",
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

function PlanCard({ plan, priority = false }: { plan: Plan; priority?: boolean }) {
  const isHeadliner = plan.price === "2,280";
  // 京(headliner)はやまとブランドのLime、他2プランは白
  const priceColor = isHeadliner ? "#A9D159" : "#FFFFFF";

  return (
    <article className="group relative flex flex-col overflow-hidden aspect-[3/4] md:aspect-auto md:min-h-[560px] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_32px_56px_-24px_rgba(0,0,0,0.35)]">
      {/* 背景: 邸宅写真フルブリード */}
      <Image
        src={plan.bgImage}
        alt={plan.alt}
        fill
        priority={priority}
        className="object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      {/* グラデーション: 上(漢字可読) + 下(価格可読) */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/85"
      />

      {/* Headlinerのみ Lime tint の薄い信号 */}
      {isHeadliner && (
        <div
          aria-hidden
          className="absolute inset-0 mix-blend-soft-light"
          style={{ background: "linear-gradient(180deg, rgba(169,209,89,0.18) 0%, transparent 40%, rgba(72,107,0,0.12) 100%)" }}
        />
      )}

      {/* Headliner ラベル: 右上に小さく */}
      {isHeadliner && (
        <div
          className="absolute top-5 right-5 md:top-6 md:right-6 z-10 font-murecho font-bold text-[10px] md:text-[11px] tracking-[0.06em] px-2.5 py-1 border"
          style={{ color: "#A9D159", borderColor: "rgba(169,209,89,0.5)", background: "rgba(0,0,0,0.35)", backdropFilter: "blur(4px)" }}
        >
          いちばん選ばれています
        </div>
      )}

      {/* コンテンツ */}
      <div className="relative z-[5] h-full flex flex-col justify-between p-6 md:p-8">
        {/* Top: 漢字 + ローマ字 + スペック */}
        <div>
          <div className="flex items-end gap-3">
            <span
              className="font-murecho leading-[0.82] text-white"
              style={{
                fontWeight: 900,
                fontSize: "clamp(68px, 7.2vw, 116px)",
                letterSpacing: "0.02em",
                textShadow: "0 4px 24px rgba(0,0,0,0.35)",
              }}
            >
              {plan.name}
            </span>
            <span
              className="font-inter text-white/75 pb-2 md:pb-3"
              style={{
                fontWeight: 600,
                fontSize: "clamp(11px, 0.85vw, 13px)",
                letterSpacing: "0.26em",
              }}
            >
              {plan.reading}
            </span>
          </div>

          <dl className="font-inter flex items-center gap-3 mt-5 md:mt-6 text-[11px] md:text-[12px] tracking-[0.14em] text-white/85 font-bold">
            <dt className="sr-only">間取り</dt>
            <dd>{plan.layout}</dd>
            <span aria-hidden className="w-px h-3 bg-white/35" />
            <dt className="sr-only">延床</dt>
            <dd>{plan.tsubo}</dd>
          </dl>
        </div>

        {/* Bottom: 誰向けコピー (caption + mincho 本文・panel なし) + 価格 */}
        <div>
          {/* 「こんなご家族に」 — clean caption + mincho 本文 */}
          <div className="mb-7 md:mb-8 max-w-[26rem]">
            <p className="font-murecho text-[10.5px] md:text-[11px] tracking-[0.18em] text-white/65 font-bold mb-2.5">
              こんなご家族に
            </p>
            <p
              className="font-zen-old text-white leading-[1.7] tracking-[0.02em]"
              style={{
                fontSize: "clamp(13.5px, 1.05vw, 16.5px)",
                fontWeight: 500,
                textShadow: "0 2px 12px rgba(0,0,0,0.55)",
              }}
            >
              {plan.audience}
            </p>
          </div>

          <div className="pt-5 md:pt-6 border-t border-white/25">
            <div className="flex items-baseline gap-2 md:gap-3">
              <span
                className="font-oswald tabular-nums leading-[0.82]"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(56px, 7vw, 100px)",
                  letterSpacing: "-0.03em",
                  color: priceColor,
                  textShadow: "0 4px 20px rgba(0,0,0,0.45)",
                }}
              >
                {plan.price}
              </span>
              <span className="font-murecho text-white/85 text-[clamp(13px,1vw,16px)] font-medium pb-1.5 md:pb-2">
                万円〜
              </span>
            </div>
            <p className="font-inter text-[10px] md:text-[11px] tracking-[0.14em] text-white/65 mt-3">
              税込・建物本体と付帯工事まで含む
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PriceSection() {
  return (
    <section
      id="product"
      className="relative scroll-mt-20 bg-[#F7F5F0] text-text-primary py-[var(--section-py)] md:scroll-mt-24"
    >
      <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ========== Heading ========== */}
        <header className="mb-12 md:mb-16 max-w-[860px]">
          {/* eyebrow — クラスタ統一 (FIG.01 / FIG.02 と並列の編集誌マーカー) */}
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-text-primary/55 font-mono mb-5">
            <span>Plans</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>HANA / KAZE / MIYAKO</span>
          </div>
          <h2
            className="font-zen-old text-text-primary leading-[1.32] tracking-[0.02em]"
            style={{ fontWeight: 700, fontSize: "var(--display-lg)" }}
          >
            暮らし方に合わせて、<br className="sm:hidden" />選べる3つのプラン。
          </h2>
          <p className="mt-5 md:mt-6 font-murecho text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[2.0] max-w-[680px]">
            京モデルは、
            <span className="font-bold text-lime-deep nowrap">2,280万円</span>
            から始まります。
            <br />
            税込で、建物本体と付帯工事まで含みます。
            <br className="sm:hidden" />
            土地や登記は別途です。
          </p>
        </header>

        {/* ========== 3 プラン ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {PLANS.map((p, i) => (
            <PlanCard key={p.id} plan={p} priority={i === 0} />
          ))}
        </div>

        {/* ========== 間取り例(2026-04-25 追加): 3プランに対応する実設計図 ========== */}
        <div className="mt-14 md:mt-20">
          <header className="mb-8 md:mb-10 max-w-[860px]">
            <p className="font-murecho font-bold text-[11px] md:text-[12px] tracking-[0.06em] text-lime-deep mb-3">
              間取り例
            </p>
            <h3
              className="font-zen-old text-text-primary leading-[1.32] tracking-[0.02em]"
              style={{ fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 34px)" }}
            >
              この価格で叶う、<br className="sm:hidden" />間取りの一例をご紹介します。
            </h3>
            <p className="mt-4 md:mt-5 font-murecho text-text-primary/80 text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[620px]">
              過去の設計事例から、各プランに近い間取りをご紹介します。実際の間取りはご家族の暮らし方・敷地条件に合わせて、一から設計します。
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {PLANS.map((plan) => {
              const entryId = PLAN_FLOORPLAN_MAP[plan.id];
              const floorplan = FLOORPLANS.entryExamples.find((e) => e.sourceEntryId === entryId);
              if (!floorplan) return null;
              return (
                <article
                  key={plan.id}
                  className="bg-white border border-text-primary/10 overflow-hidden"
                >
                  {/* 間取り図本体(portrait) */}
                  <div className="relative aspect-[4/5] bg-bg-secondary/50">
                    <Image
                      src={floorplan.image}
                      alt={`過去の設計事例(${plan.layout}・${plan.tsubo})`}
                      fill
                      className="object-contain p-3 md:p-4"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                  </div>
                  {/* ラベル(ブランド表記なし — 過去事例で仕様が異なるため) */}
                  <div className="px-5 py-4 md:px-6 md:py-5 border-t border-text-primary/10">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-murecho font-bold text-text-primary leading-none"
                        style={{ fontSize: "clamp(16px, 1.4vw, 20px)" }}
                      >
                        {plan.layout}
                      </span>
                      <span className="font-inter text-text-secondary text-[11px] md:text-[12px] tracking-[0.08em]">
                        {plan.tsubo}
                      </span>
                    </div>
                    <p className="mt-2 font-murecho text-text-primary/70 text-[11px] md:text-[12px] leading-[1.7]">
                      {plan.tagline}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="mt-5 md:mt-6 font-murecho text-text-secondary text-[12px] md:text-[12.5px] leading-[1.95] pl-3 border-l-2 border-text-primary/15">
            ※ 間取りはご家族の暮らし・敷地条件に合わせて、一から設計します。掲載は過去事例の一例です。
          </p>
        </div>

        {/* ========== 土地込み 総額モデルケース（2026-04-24 追加） ========== */}
        <div className="mt-16 md:mt-24">
          <header className="mb-8 md:mb-10 max-w-[860px]">
            <p className="font-murecho font-bold text-[11px] md:text-[12px] tracking-[0.06em] text-lime-deep mb-3">
              土地込みの総額目安
            </p>
            <h3
              className="font-zen-old text-text-primary leading-[1.32] tracking-[0.02em]"
              style={{ fontWeight: 700, fontSize: "clamp(22px, 2.6vw, 34px)" }}
            >
              土地と建物を合わせた、<br className="sm:hidden" />総額の目安。
            </h3>
            <p className="mt-4 md:mt-5 font-murecho text-text-primary/80 text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[620px]">
              建物だけでなく、土地も含めた目安を出します。実際のお見積りは、ご来場時にエリアとご希望に合わせてお出しします。
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* ケースA: お手頃エリア */}
            <article className="bg-white border border-text-primary/10 p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-murecho font-bold text-lime-deep" style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}>
                  ケースA
                </span>
                <span className="font-murecho text-[11px] md:text-[12px] tracking-[0.04em] text-text-secondary">
                  総額を抑えやすいエリア
                </span>
              </div>
              <h4 className="mt-3 font-murecho font-bold text-text-primary text-[15px] md:text-[17px] leading-[1.55]">
                大和郡山市矢田町 ＋ 京モデル
              </h4>
              <p className="mt-2 font-murecho text-text-secondary text-[11px] md:text-[12px] leading-[1.7]">
                やまと自社分譲地（矢田町エリア）＋3LDK・28坪の京モデル。
              </p>
              <dl className="mt-5 pt-4 border-t border-text-primary/10 space-y-2.5 font-murecho text-[12px] md:text-[13px] leading-[1.7]">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-text-secondary">土地（自社分譲）</dt>
                  <dd className="font-oswald tabular-nums text-text-primary">500<span className="font-murecho text-[11px] ml-1">万円台〜</span></dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-text-secondary">建物（京モデル）</dt>
                  <dd className="font-oswald tabular-nums text-text-primary">2,280<span className="font-murecho text-[11px] ml-1">万円〜</span></dd>
                </div>
              </dl>
              <div className="mt-4 pt-4 border-t border-text-primary/10">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-murecho font-bold text-text-primary text-[12px] md:text-[13px]">合計目安</span>
                  <span className="font-oswald font-light text-lime-deep tabular-nums" style={{ fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.02em" }}>
                    2,800
                    <span className="font-murecho text-[12px] md:text-[14px] ml-1 text-text-primary/70">万円台〜</span>
                  </span>
                </div>
                <p className="mt-3 font-murecho text-text-secondary text-[11px] leading-[1.7]">
                  月々のご返済目安：<span className="font-bold text-text-primary">7万円台〜</span>（頭金ゼロ・金利1.0%・35年で試算）
                </p>
              </div>
            </article>

            {/* ケースB: 利便性重視 */}
            <article className="bg-white border border-text-primary/10 p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-murecho font-bold text-text-primary/70" style={{ fontSize: "clamp(15px, 1.4vw, 18px)" }}>
                  ケースB
                </span>
                <span className="font-murecho text-[11px] md:text-[12px] tracking-[0.04em] text-text-secondary">
                  利便性を重視するエリア
                </span>
              </div>
              <h4 className="mt-3 font-murecho font-bold text-text-primary text-[15px] md:text-[17px] leading-[1.55]">
                奈良市内 ＋ 花モデル
              </h4>
              <p className="mt-2 font-murecho text-text-secondary text-[11px] md:text-[12px] leading-[1.7]">
                奈良市内の駅近・利便性重視エリア＋4LDK・33坪の花モデルを想定。
              </p>
              <dl className="mt-5 pt-4 border-t border-text-primary/10 space-y-2.5 font-murecho text-[12px] md:text-[13px] leading-[1.7]">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-text-secondary">土地（エリアにより）</dt>
                  <dd className="font-oswald tabular-nums text-text-primary">1,500<span className="font-murecho text-[11px] ml-1">万円台〜</span></dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-text-secondary">建物（花モデル）</dt>
                  <dd className="font-oswald tabular-nums text-text-primary">2,480<span className="font-murecho text-[11px] ml-1">万円〜</span></dd>
                </div>
              </dl>
              <div className="mt-4 pt-4 border-t border-text-primary/10">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="font-murecho font-bold text-text-primary text-[12px] md:text-[13px]">合計目安</span>
                  <span className="font-oswald font-light text-text-primary tabular-nums" style={{ fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.02em" }}>
                    4,000
                    <span className="font-murecho text-[12px] md:text-[14px] ml-1 text-text-primary/70">万円台〜</span>
                  </span>
                </div>
                <p className="mt-3 font-murecho text-text-secondary text-[11px] leading-[1.7]">
                  月々のご返済目安：<span className="font-bold text-text-primary">11万円台〜</span>（頭金ゼロ・金利1.0%・35年で試算）
                </p>
              </div>
            </article>
          </div>

          <div className="mt-6 md:mt-8 pl-3 border-l-2 border-text-primary/15 font-murecho text-text-secondary text-[12px] md:text-[12.5px] leading-[1.95] space-y-1.5">
            <p>※ 土地代は自社分譲地の参考レンジ、建物は各プランの最低価格(税込・建物本体＋付帯工事)です。登記・外構・引越し等の諸費用は別途となります。</p>
            <p>※ 月々のご返済額は、頭金なし・金利1.0%・35年・元利均等で機械的に試算した目安です。実際の金利・借入額・返済額はご相談時にご案内します。</p>
          </div>

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 sm:justify-end">
            <CtaButton
              href="/money"
              variant="secondary"
              size="md"
              label="他のモデルケースを見る"
              sublabel="土地込み・月々のお支払いまで"
            />
          </div>
        </div>

        {/* ========== 含む / 別途 ==========
            モバイル: 2列グリッドでコンパクト
            デスクトップ: 従来の2カラム縦リスト */}
        <div className="mt-10 md:mt-20 grid grid-cols-2 gap-5 md:gap-14 lg:gap-20 pt-8 md:pt-14 border-t border-text-primary/15">
          <div>
            <p className="font-murecho font-bold text-[11px] md:text-[12px] tracking-[0.06em] text-lime-deep mb-3 md:mb-5">
              価格に含まれるもの
            </p>
            <ul className="space-y-2 md:space-y-3">
              {INCLUDED.map((t) => (
                <li
                  key={t}
                  className="font-murecho flex items-baseline gap-2 md:gap-3 text-text-primary text-[12px] md:text-[clamp(13px,1vw,15px)] leading-[1.6] md:leading-[1.75]"
                >
                  <span
                    aria-hidden
                    className="font-oswald shrink-0 pt-[2px] text-lime-deep"
                    style={{ fontWeight: 500, fontSize: "12px" }}
                  >
                    +
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:border-l md:border-text-primary/15 md:pl-10 lg:pl-14">
            <p className="font-murecho font-bold text-[11px] md:text-[12px] tracking-[0.06em] text-text-secondary mb-3 md:mb-5">
              別途となるもの
            </p>
            <ul className="space-y-2 md:space-y-3">
              {EXCLUDED.map((t) => (
                <li
                  key={t}
                  className="font-murecho flex items-baseline gap-2 md:gap-3 text-text-primary/85 text-[12px] md:text-[clamp(13px,1vw,15px)] leading-[1.6] md:leading-[1.75]"
                >
                  <span
                    aria-hidden
                    className="font-oswald text-text-secondary/50 shrink-0 pt-[2px]"
                    style={{ fontWeight: 300, fontSize: "11px" }}
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
          <div className="font-murecho max-w-[44rem] pl-3 border-l-2 border-text-primary/15 text-[12px] md:text-[12.5px] leading-[1.95] text-text-secondary space-y-1.5">
            <p>※ 広さ・間取り・価格帯の目安です。間取り・坪数・設備は、ご家族に合わせて設計します。</p>
            <p>※ 表示価格は、建物本体(税込)に標準付帯工事まで含む目安です。土地代・登記費用等は別途となります。</p>
          </div>
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
