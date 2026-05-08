import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  HeroEditorial — 2026-05-08 v3 (W2 採用版 / 表 UI 撤去)
  ---------------------------------------------------------------
  v2 で TITLE BLOCK を 4 行均等表として実装したところ「Web 管理画面風カクカク
  = AI 臭い」と判断されたため、価格 / 実績 / CTA を役割別に分離した v3。
  詳細は DESIGN_GUARDRAILS.md / memory: feedback_w2_no_uniform_table_ai_smell_check.md

  構造:
  - META STRIP (上部メタデータ)
  - ELEVATION FRAME + scale ticks (写真は建築図面の elevation 風)
  - HEADLINE + SUBCOPY (図版キャプション扱い)
  - PriceSpec   — Open Spec パターン (上下線だけ・PRICE 強)
  - MetricRail  — 実績は箱に入れず横一列の静かなレール
  - ActionLine  — CTA は表に閉じ込めず独立配置

  禁止 (DESIGN_GUARDRAILS §3):
  - 価格 / 実績 / CTA を同じ表に入れる
  - 四辺すべて border の枠
  - rounded-lg 以上
  - 強い border / shadow
  - bg-white card 量産

  写真:
  - FIG.01 LIVING & DINING = /images/newsozai/interior-ldk-01.webp (2400x1600)
*/

const PALETTE = {
  paper: "#FFFFFF",
  paperWarm: "#F8F7F4",
  sumi: "#1A1815",
  muted: "#5E5A50",
  rule: "rgba(28, 27, 24, 0.16)",
  ruleStrong: "rgba(28, 27, 24, 0.32)",
  ruleFaint: "rgba(28, 27, 24, 0.08)",
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
      {/* META STRIP — 図面の上部 metadata */}
      <div className="border-b" style={{ borderColor: PALETTE.rule }}>
        <div
          className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-1.5 px-[var(--page-px)] py-3 text-[10px] tracking-[0.22em]"
          style={{ fontFamily: "var(--font-inter)", color: PALETTE.muted }}
        >
          <span style={{ color: PALETTE.sumi }} className="tracking-[0.16em]">
            {COPY.brand}
          </span>
          <span className="hidden md:inline">
            {COPY.fig} &nbsp;·&nbsp; {COPY.figCaption}
          </span>
          <span className="hidden lg:inline" style={{ color: PALETTE.sumi }}>
            {COPY.scale}
          </span>
          <span>{COPY.region}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-[var(--page-px)] pt-10 md:pt-14 lg:pt-16 pb-16 md:pb-20">
        {/* Scale ticks (top) */}
        <ScaleRuler position="top" />

        {/* ELEVATION FRAME — double hairline, FIG.01 黒タグ overhang */}
        <figure
          className="relative"
          style={{
            border: `1px solid ${PALETTE.sumi}`,
            padding: 7,
          }}
        >
          <span
            className="absolute z-10 inline-block px-2 py-0.5 text-[9.5px] tracking-[0.32em] uppercase text-white"
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
            className="relative aspect-[16/9]"
            style={{ outline: `1px solid ${PALETTE.sumi}` }}
          >
            <Image
              src={HERO.src}
              alt={HERO.alt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 92vw, 1200px"
              className="object-cover"
            />
          </div>
        </figure>

        {/* Scale ticks (bottom) */}
        <ScaleRuler position="bottom" />

        {/* 図版下の小さい architectural caption (Annotation Note 風) */}
        <p
          className="mt-3 text-right text-[10.5px] tracking-[0.18em]"
          style={{ color: PALETTE.muted, fontFamily: "var(--font-inter)" }}
        >
          ─── {COPY.figCaption} &nbsp;/&nbsp; INTERIOR &nbsp;/&nbsp; YAMATO HOUSE
        </p>

        {/* HEADLINE + SUBCOPY (図版キャプション扱い) */}
        <div className="mt-14 md:mt-20 max-w-[820px]">
          <h1
            id="hero-editorial-heading"
            style={{
              fontFamily: "var(--font-shippori)",
              fontSize: "clamp(36px, 5vw, 60px)",
              fontWeight: 500,
              lineHeight: 1.4,
              letterSpacing: "0.02em",
              color: PALETTE.sumi,
            }}
          >
            {COPY.h1[0]}
            <br className="md:hidden" />
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
        </div>

        {/* ─── 役割別の3ブロック (表 UI で囲わない) ─── */}
        <PriceSpec />
        <MetricRail />
        <ActionLine />
      </div>
    </section>
  );
}

/* ─── ScaleRuler: 定規目盛 (md+ のみ) ─────────────────────── */
function ScaleRuler({ position }: { position: "top" | "bottom" }) {
  const ticks = 25;
  return (
    <div
      aria-hidden
      className={`hidden md:flex justify-between ${
        position === "top" ? "items-end mb-1.5" : "items-start mt-1.5"
      }`}
      style={{ height: 12 }}
    >
      {Array.from({ length: ticks }).map((_, i) => (
        <span
          key={i}
          className="block w-px"
          style={{
            background: PALETTE.sumi,
            height: i % 5 === 0 ? 12 : 5,
            opacity: i % 5 === 0 ? 0.85 : 0.4,
          }}
        />
      ))}
    </div>
  );
}

/* ─── PriceSpec: Pattern A (Open Spec) ───────────────────
   上下線だけ。中身に視覚重みを集中させる (PRICE 強)。
   左右は閉じない。max-width で幅を抑え、左寄せで読ませる。 */
function PriceSpec() {
  return (
    <section
      aria-labelledby="hero-price-eyebrow"
      className="mt-14 md:mt-16 max-w-[680px] py-7 md:py-8"
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
      <div className="mt-4 flex items-baseline flex-wrap gap-x-3 gap-y-1">
        <span
          className="text-[14px] tracking-[0.04em]"
          style={{ color: PALETTE.sumi }}
        >
          {COPY.price.label}
        </span>
        <span
          style={{
            fontFamily: "var(--font-oswald)",
            fontSize: "clamp(48px, 7vw, 80px)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "0.02em",
            color: PALETTE.sumi,
          }}
        >
          {COPY.price.value}
        </span>
        <span className="text-[16px]" style={{ color: PALETTE.sumi }}>
          {COPY.price.unit}
        </span>
      </div>
      <p
        className="mt-3 text-[11.5px] tracking-[0.04em]"
        style={{ color: PALETTE.muted }}
      >
        {COPY.price.footnote}
      </p>
    </section>
  );
}

/* ─── MetricRail: Pattern B (Quiet Rail) ────────────────
   箱なし。横一列に静かに並べ、下に微弱な hairline 一本だけ。
   数字は visible だが PriceSpec より控えめ (重みを差をつける)。 */
function MetricRail() {
  return (
    <section
      aria-labelledby="hero-records-eyebrow"
      className="mt-12 md:mt-14 max-w-[940px]"
    >
      <p
        id="hero-records-eyebrow"
        className="text-[10px] tracking-[0.32em] uppercase"
        style={{ color: PALETTE.muted, fontFamily: "var(--font-inter)" }}
      >
        {COPY.metricsEyebrow}
      </p>
      <ul className="mt-4 flex flex-wrap items-baseline gap-x-7 gap-y-3 list-none">
        {COPY.metrics.map((m) => (
          <li
            key={m.label}
            className="inline-flex items-baseline gap-1.5"
          >
            <span
              style={{
                fontFamily: "var(--font-oswald)",
                fontSize: 26,
                fontWeight: 300,
                lineHeight: 1,
                color: PALETTE.sumi,
              }}
            >
              {m.value}
            </span>
            <span className="text-[12px]" style={{ color: PALETTE.sumi }}>
              {m.unit}
            </span>
            <span
              className="text-[10px] tracking-[0.08em] ml-1"
              style={{ color: PALETTE.muted, fontFamily: "var(--font-inter)" }}
            >
              / {m.label}
            </span>
          </li>
        ))}
      </ul>
      <div
        aria-hidden
        className="mt-4 h-px w-full"
        style={{ background: PALETTE.ruleFaint }}
      />
    </section>
  );
}

/* ─── ActionLine: 独立した行動導線 ────────────────────
   表/カードに閉じ込めない。breathing space を多めに取り、
   建築図面の "ACTION" としてではなく、独立したナビゲーション要素として配置。 */
function ActionLine() {
  return (
    <div
      aria-label="主要 CTA"
      className="mt-12 md:mt-14 flex flex-col sm:flex-row gap-3"
    >
      <Link
        href={COPY.primaryCta.href}
        className="group inline-flex min-h-[52px] items-center justify-center gap-2 px-7 text-[13px] tracking-[0.04em] font-medium text-white transition-colors hover:bg-black"
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
        className="group inline-flex min-h-[52px] items-center justify-center gap-2 px-7 border text-[13px] tracking-[0.04em] font-medium transition-colors hover:bg-[#1A1815] hover:text-white"
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
