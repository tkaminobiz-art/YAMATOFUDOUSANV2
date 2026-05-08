import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  HeroEditorial — 2026-05-08 v4 (W2 採用版 / 2カラム統合レイアウト)
  ---------------------------------------------------------------
  v3 で表 UI 撤去後も「Hero が上下分離している / 写真がファーストビュー外」と
  ユーザー判断。v4 で 2 カラム (左テキスト 42% + 右 ELEVATION FRAME 58%) に
  統合し、ファーストビュー内で写真とコピーが対話する構成へ。

  主要変更点:
  - 左カラム (lg+): H1 + subcopy + PriceSpec + ActionLine
  - 右カラム (lg+): ELEVATION FRAME + scale ticks + 図版キャプション
  - 下部: MetricRail を full-width thin band として独立配置
  - mobile: 写真 → テキスト の順で stack (写真を最初に見せる)
  - ELEVATION FRAME のラインを softer (rgba 0.28 / 0.16) に
  - scale ticks 半減 (25 → 13)
  - FIG.01 タグを小さく
  - META STRIP は brand + scale + region のみ (FIG/LIVING は右カラムキャプションに移動)

  詳細: DESIGN_GUARDRAILS.md / memory: feedback_w2_no_uniform_table_ai_smell_check.md
*/

const PALETTE = {
  paper: "#FFFFFF",
  paperWarm: "#F8F7F4",
  sumi: "#1A1815",
  muted: "#5E5A50",
  rule: "rgba(20, 20, 20, 0.16)",
  ruleStrong: "rgba(20, 20, 20, 0.28)",
  ruleFaint: "rgba(20, 20, 20, 0.08)",
} as const;

const HERO = {
  src: "/images/newsozai/interior-ldk-01.webp",
  alt: "やまと不動産が手がけた住まい — 自然光の差し込む LDK",
};

const COPY = {
  brand: "株式会社やまと不動産　─　奈良・京都南部の家づくり",
  fig: "FIG. 01",
  figCaption: "LIVING & DINING",
  scale: "SCALE 1 : 50",
  region: "NARA · KYOTO",
  h1: ["土地を読み、", "暮らしを建てる。"],
  subcopy: [
    "奈良・京都南部で、土地探しから資金計画、建物まで。",
    "総額で見える家づくりを、地域密着で支えます。",
  ],
  price: {
    eyebrow: "STARTING PRICE",
    label: "京モデル",
    value: "2,280",
    unit: "万円〜",
    footnote: "税込・建物本体＋標準付帯工事込み",
  },
  metricsEyebrow: "RECORDS",
  metrics: [
    { value: "600", unit: "棟以上", label: "施工実績" },
    { value: "90", unit: "区画以上", label: "分譲・土地" },
    { value: "50", unit: "組以上", label: "お客様の声" },
    { value: "14", unit: "年", label: "業歴" },
  ],
  primaryCta: { label: "総額の目安を相談する", href: "/money" },
  secondaryCta: { label: "モデルハウスを見学する", href: "/reserve" },
} as const;

export default function HeroEditorial() {
  return (
    <section
      aria-labelledby="hero-editorial-heading"
      className="relative w-full"
      style={{ background: PALETTE.paper }}
    >
      {/* ─── META STRIP ──────────────────────────────────────── */}
      <div className="border-b" style={{ borderColor: PALETTE.rule }}>
        <div
          className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-[var(--page-px)] py-3 text-[10px] tracking-[0.22em]"
          style={{ fontFamily: "var(--font-inter)", color: PALETTE.muted }}
        >
          <span style={{ color: PALETTE.sumi }} className="tracking-[0.16em]">
            {COPY.brand}
          </span>
          <span className="hidden lg:inline" style={{ color: PALETTE.sumi }}>
            {COPY.scale}
          </span>
          <span className="hidden md:inline">{COPY.region}</span>
        </div>
      </div>

      {/* ─── HERO BODY: 2 カラム統合 ─────────────────────────── */}
      <div className="mx-auto max-w-[1320px] px-[var(--page-px)] py-10 md:py-14 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[42fr_58fr] lg:gap-12 xl:gap-16 lg:items-center lg:min-h-[640px]">
          {/* RIGHT (lg+): ELEVATION FRAME / mobile はここが先頭 */}
          <div className="order-1 lg:order-2">
            <ScaleRuler position="top" />

            <figure
              className="relative"
              style={{
                border: `1px solid ${PALETTE.ruleStrong}`,
                padding: 6,
              }}
            >
              <span
                className="absolute z-10 inline-block px-1.5 py-0.5 text-[8.5px] tracking-[0.32em] uppercase text-white"
                style={{
                  top: -1,
                  left: -1,
                  background: PALETTE.sumi,
                  fontFamily: "var(--font-inter)",
                }}
                aria-hidden
              >
                {COPY.fig}
              </span>
              <div
                className="relative aspect-[3/2]"
                style={{ outline: `1px solid ${PALETTE.rule}` }}
              >
                <Image
                  src={HERO.src}
                  alt={HERO.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 720px"
                  className="object-cover"
                />
              </div>
            </figure>

            <ScaleRuler position="bottom" />

            {/* 図版キャプション — 右寄せの架空寸法引き出し */}
            <p
              className="mt-3 text-right text-[10px] tracking-[0.22em] uppercase"
              style={{ color: PALETTE.muted, fontFamily: "var(--font-inter)" }}
            >
              ─── {COPY.figCaption} &nbsp;/&nbsp; INTERIOR &nbsp;/&nbsp; YAMATO HOUSE
            </p>
          </div>

          {/* LEFT (lg+): COPY + PRICE + CTAs / mobile では下に来る */}
          <div className="order-2 lg:order-1 lg:pr-2 xl:pr-4">
            <h1
              id="hero-editorial-heading"
              style={{
                fontFamily: "var(--font-shippori)",
                fontSize: "clamp(34px, 4.6vw, 56px)",
                fontWeight: 500,
                lineHeight: 1.4,
                letterSpacing: "0.02em",
                color: PALETTE.sumi,
              }}
            >
              {COPY.h1[0]}
              <br />
              {COPY.h1[1]}
            </h1>
            <p
              className="mt-5 text-[14px] md:text-[15px]"
              style={{ color: PALETTE.muted, lineHeight: 1.95 }}
            >
              {COPY.subcopy[0]}
              <br />
              {COPY.subcopy[1]}
            </p>

            <PriceSpec />
            <ActionLine />
          </div>
        </div>
      </div>

      {/* ─── METRIC RAIL: full-width thin band ───────────────── */}
      <div className="border-t" style={{ borderColor: PALETTE.rule }}>
        <div
          className="mx-auto max-w-[1320px] px-[var(--page-px)] py-6 md:py-7"
        >
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2.5">
            <span
              className="text-[9.5px] tracking-[0.32em] uppercase mr-3"
              style={{ color: PALETTE.muted, fontFamily: "var(--font-inter)" }}
            >
              {COPY.metricsEyebrow}
            </span>
            {COPY.metrics.map((m, i) => (
              <span
                key={m.label}
                className="inline-flex items-baseline gap-1.5"
              >
                {i > 0 && (
                  <span
                    aria-hidden
                    className="mx-3 inline-block w-px h-3 self-center"
                    style={{ background: PALETTE.ruleFaint }}
                  />
                )}
                <span
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontSize: 22,
                    fontWeight: 300,
                    lineHeight: 1,
                    color: PALETTE.sumi,
                  }}
                >
                  {m.value}
                </span>
                <span className="text-[11.5px]" style={{ color: PALETTE.sumi }}>
                  {m.unit}
                </span>
                <span
                  className="text-[10px] tracking-[0.06em] ml-0.5"
                  style={{
                    color: PALETTE.muted,
                    fontFamily: "var(--font-inter)",
                  }}
                >
                  / {m.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── ScaleRuler: ticks 半減 (25 → 13) / 透明度ダウン ─── */
function ScaleRuler({ position }: { position: "top" | "bottom" }) {
  const ticks = 13;
  return (
    <div
      aria-hidden
      className={`hidden md:flex justify-between ${
        position === "top" ? "items-end mb-1.5" : "items-start mt-1.5"
      }`}
      style={{ height: 10 }}
    >
      {Array.from({ length: ticks }).map((_, i) => (
        <span
          key={i}
          className="block w-px"
          style={{
            background: PALETTE.sumi,
            height: i % 4 === 0 ? 10 : 4,
            opacity: i % 4 === 0 ? 0.55 : 0.25,
          }}
        />
      ))}
    </div>
  );
}

/* ─── PriceSpec: Pattern A (Open Spec) ─── */
function PriceSpec() {
  return (
    <section
      aria-labelledby="hero-price-eyebrow"
      className="mt-9 md:mt-10 py-6 md:py-7"
      style={{
        borderTop: `1px solid ${PALETTE.rule}`,
        borderBottom: `1px solid ${PALETTE.rule}`,
      }}
    >
      <p
        id="hero-price-eyebrow"
        className="text-[10px] tracking-[0.32em] uppercase"
        style={{ color: PALETTE.muted, fontFamily: "var(--font-inter)" }}
      >
        {COPY.price.eyebrow}
      </p>
      <div className="mt-3 flex items-baseline flex-wrap gap-x-3 gap-y-1">
        <span className="text-[14px] tracking-[0.04em]" style={{ color: PALETTE.sumi }}>
          {COPY.price.label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-oswald)",
            fontSize: "clamp(44px, 5.2vw, 68px)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            color: PALETTE.sumi,
          }}
        >
          {COPY.price.value}
        </span>
        <span className="text-[15px]" style={{ color: PALETTE.sumi }}>
          {COPY.price.unit}
        </span>
      </div>
      <p
        className="mt-2.5 text-[11.5px] tracking-[0.04em]"
        style={{ color: PALETTE.muted }}
      >
        {COPY.price.footnote}
      </p>
    </section>
  );
}

/* ─── ActionLine: 独立配置 ─── */
function ActionLine() {
  return (
    <div
      aria-label="主要 CTA"
      className="mt-7 md:mt-8 flex flex-col sm:flex-row gap-3"
    >
      <Link
        href={COPY.primaryCta.href}
        className="group inline-flex min-h-[50px] items-center justify-center gap-2 px-6 text-[13px] tracking-[0.04em] font-medium text-white transition-colors hover:bg-black"
        style={{ background: PALETTE.sumi }}
      >
        {COPY.primaryCta.label}
        <ArrowRight
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </Link>
      <Link
        href={COPY.secondaryCta.href}
        className="group inline-flex min-h-[50px] items-center justify-center gap-2 px-6 border text-[13px] tracking-[0.04em] font-medium transition-colors hover:bg-[#1A1815] hover:text-white"
        style={{ borderColor: PALETTE.sumi, color: PALETTE.sumi }}
      >
        {COPY.secondaryCta.label}
        <ArrowRight
          className="w-4 h-4 transition-transform group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </Link>
    </div>
  );
}
