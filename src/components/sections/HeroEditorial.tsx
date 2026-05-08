import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  HeroEditorial — 2026-05-08 v2 (W2 採用版 / Architectural Drawing-frame)
  ---------------------------------------------------------------
  /hero-wireframes 比較で W2 (建築図面) が選定された後の実装。

  方針:
  - 写真を「FIG.01 LIVING & DINING」の elevation frame として中央に置く
  - frame の上下に scale ticks (定規目盛)
  - 見出し・コピーは frame の下に置き、編集誌の図版+キャプション構造を再現
  - 価格・実績・CTA は建築タイトルブロック表組として整理
    (PROJECT / PRICE / RECORDS / ACTION の 4 行)
  - 数字や仕様が「営業実績」でなく「建築仕様」として読める

  実装手順 (memory: feedback_design_first_photo_last_grey_box_test.md 準拠):
  1. グレーボックステストでワイヤフレームを実装 (済 /hero-wireframes W2)
  2. 採用案に実写を入れる (本コミット)
  3. 違和感があれば W2 の中で構造を磨く (3 案比較・別構造には戻らない)

  写真:
  - FIG.01 LIVING & DINING = /images/newsozai/interior-ldk-01.webp (2400x1600)
    → 自然光のあるLDK。BRAND-TRUTH §1 Photo allowlist 内
*/

const PALETTE = {
  paper: "#FFFFFF",
  paperWarm: "#F8F7F4",
  sumi: "#1A1815",
  hairline: "#DED8C8",
  muted: "#5E5A50",
} as const;

const HERO = {
  src: "/images/newsozai/interior-ldk-01.webp",
  alt: "やまと不動産が手がけた住まい — 自然光の差し込む LDK",
};

const COPY = {
  brand: "株式会社やまと不動産　─　奈良・京都南部の家づくり",
  fig: "FIG. 01",
  figCaption: "LIVING & DINING",
  scale: "SCALE 1 : 50",
  region: "NARA · KYOTO",
  h1: ["土地を読み、", "暮らしを建てる。"],
  subcopy: [
    "奈良・京都南部で、土地探しから資金計画、建物まで。",
    "総額で見える家づくりを、地域密着で支えます。",
  ],
  price: {
    label: "京モデル",
    value: "2,280",
    unit: "万円〜",
    footnote: "税込・建物本体＋標準付帯工事込み",
  },
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
      {/* TOP META STRIP — 図面の上部 metadata */}
      <div className="border-b" style={{ borderColor: PALETTE.hairline }}>
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

      {/* MAIN BODY */}
      <div className="mx-auto max-w-[1240px] px-[var(--page-px)] pt-10 md:pt-14 lg:pt-16 pb-12 md:pb-16">
        {/* Scale ticks (top) */}
        <ScaleRuler position="top" />

        {/* ELEVATION FRAME — double hairline */}
        <figure
          className="relative"
          style={{
            border: `1px solid ${PALETTE.sumi}`,
            padding: 7,
          }}
        >
          {/* FIG tag — drawing convention */}
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

        {/* HEADLINE + SUBCOPY (図版キャプション扱い) */}
        <div className="mt-12 md:mt-16 max-w-[820px]">
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

        {/* TITLE BLOCK */}
        <div
          className="mt-10 md:mt-14"
          style={{ border: `1px solid ${PALETTE.sumi}` }}
        >
          <Row label="PROJECT">
            <span
              style={{ color: PALETTE.sumi }}
              className="text-[13px] tracking-[0.04em]"
            >
              株式会社やまと不動産 &nbsp;·&nbsp; 奈良・京都南部
            </span>
          </Row>

          <Row label="PRICE">
            <span
              className="inline-flex items-baseline flex-wrap gap-x-2 gap-y-1"
              style={{ color: PALETTE.sumi }}
            >
              <span className="text-[12.5px] tracking-[0.04em]">
                {COPY.price.label}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontSize: 22,
                  fontWeight: 300,
                  letterSpacing: "0.02em",
                }}
              >
                {COPY.price.value}
              </span>
              <span className="text-[13px]">{COPY.price.unit}</span>
              <span
                className="ml-1 text-[11px]"
                style={{ color: PALETTE.muted }}
              >
                {COPY.price.footnote}
              </span>
            </span>
          </Row>

          <Row label="RECORDS">
            <span className="inline-flex flex-wrap gap-x-6 gap-y-1.5">
              {COPY.metrics.map((m) => (
                <span
                  key={m.label}
                  className="inline-flex items-baseline gap-1.5"
                  style={{ color: PALETTE.sumi }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-oswald)",
                      fontSize: 18,
                      fontWeight: 300,
                    }}
                  >
                    {m.value}
                  </span>
                  <span className="text-[11.5px]">{m.unit}</span>
                  <span
                    className="text-[10.5px] tracking-[0.06em]"
                    style={{ color: PALETTE.muted }}
                  >
                    / {m.label}
                  </span>
                </span>
              ))}
            </span>
          </Row>

          <Row label="ACTION" last>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <Link
                href={COPY.primaryCta.href}
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 px-5 text-[12.5px] tracking-[0.04em] font-medium text-white transition-colors hover:bg-black"
                style={{ background: PALETTE.sumi }}
              >
                {COPY.primaryCta.label}
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
              <Link
                href={COPY.secondaryCta.href}
                className="group inline-flex min-h-[44px] items-center justify-center gap-2 px-5 border text-[12.5px] tracking-[0.04em] font-medium transition-colors hover:bg-[#1A1815] hover:text-white"
                style={{ borderColor: PALETTE.sumi, color: PALETTE.sumi }}
              >
                {COPY.secondaryCta.label}
                <ArrowRight
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </Row>
        </div>
      </div>
    </section>
  );
}

// ─── ScaleRuler: 定規目盛 (md+ のみ) ──────────────────────────
function ScaleRuler({ position }: { position: "top" | "bottom" }) {
  const ticks = 25; // 5 メジャー × 5
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

// ─── Row: TITLE BLOCK の 1 行 ───────────────────────────────
function Row({
  label,
  children,
  last,
}: {
  label: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-[120px_1fr]"
      style={{
        borderBottom: last ? undefined : `1px solid ${PALETTE.hairline}`,
      }}
    >
      <div
        className="px-4 py-3 text-[10px] tracking-[0.22em]"
        style={{
          background: PALETTE.paperWarm,
          color: PALETTE.muted,
          fontFamily: "var(--font-inter)",
        }}
      >
        {label}
      </div>
      <div
        className="px-4 py-3 border-t md:border-t-0 md:border-l"
        style={{ borderColor: PALETTE.hairline }}
      >
        {children}
      </div>
    </div>
  );
}
