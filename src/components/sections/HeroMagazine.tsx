"use client";

import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";

/*
  HeroMagazine v3 — 2026-04-20
  - lines 1, 2 を強調(48→68 / 44→64)
  - フォント可変(variant prop で切替)
  - 装飾ゼロ(v2 の方針継続)
*/

const HERO_SLIDES = [
  { src: "/images/newsozai/hero-miyamaki-mountain.webp", alt: "三山木モデルハウス 山並みと青空" },
  { src: "/images/newsozai/interior-kitchen-01.webp", alt: "内観 キッチン" },
  { src: "/images/newsozai/hero-day-green-exterior.webp", alt: "外観 緑と青空" },
  { src: "/images/newsozai/interior-ldk-01.webp", alt: "内観 LDK" },
] as const;

const GRAIN_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter>
      <rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/>
    </svg>`
  );

export type HeroFontVariant = {
  id: string;
  label: string;
  description: string;
  fontFamily: string;       // CSS font-family value
  weightSubLines: number;   // 諦めたもの / そのすべてが
  weightBigLine: number;    // 標準になる家
  letterSpacing: string;    // CSS letter-spacing
};

export const FONT_VARIANTS: HeroFontVariant[] = [
  {
    id: "noto-serif",
    label: "A. Noto Serif JP",
    description: "現行baseline / Google Fonts標準・Web普及型・無難で読みやすい",
    fontFamily: "var(--font-noto-serif), 'Noto Serif JP', 'Hiragino Mincho ProN', serif",
    weightSubLines: 400,
    weightBigLine: 700,
    letterSpacing: "-0.02em",
  },
  {
    id: "shippori",
    label: "B. Shippori Mincho",
    description: "出版・雑誌系 / 紙面に強い / 落ち着いた現代の太明朝",
    fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
    weightSubLines: 400,
    weightBigLine: 700,
    letterSpacing: "-0.02em",
  },
  {
    id: "zen-old",
    label: "C. Zen Old Mincho",
    description: "情緒・伝統 / オールド系で和の格調 / 文芸的な印象",
    fontFamily: "var(--font-zen-old), 'Zen Old Mincho', serif",
    weightSubLines: 400,
    weightBigLine: 700,
    letterSpacing: "-0.01em",
  },
  {
    id: "kaisei",
    label: "D. Kaisei Tokumin",
    description: "個性派 / 力強い字面 / 古い印刷物のような独特の重み",
    fontFamily: "var(--font-kaisei), 'Kaisei Tokumin', serif",
    weightSubLines: 500,
    weightBigLine: 700,
    letterSpacing: "0em",
  },
  {
    id: "tegomin",
    label: "E. New Tegomin",
    description: "筆勢・手書き感 / 情緒重視 / 雑誌の特集タイトル風",
    fontFamily: "var(--font-tegomin), 'New Tegomin', serif",
    weightSubLines: 400,
    weightBigLine: 400,
    letterSpacing: "0em",
  },
];

export default function HeroMagazine({
  variant = FONT_VARIANTS[0],
}: {
  variant?: HeroFontVariant;
}) {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-text-primary">
      {/* ===== 背景: スライドショー ===== */}
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className="hero-slide absolute inset-0"
            style={{ animationDelay: `${i * 7 - 1}s` }}
          >
            <div className="hero-ken-burns absolute inset-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        ))}
      </div>

      {/* グレイン */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
      />

      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10 z-[2]" />

      {/* ===== コンテンツ ===== */}
      <div className="relative z-10 min-h-[100svh] flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-[var(--page-px)] pt-24 md:pt-28 lg:pt-32 pb-10">
          <div className="max-w-[1400px] mx-auto w-full">
            {/* 主見出し */}
            <h1
              className="text-white font-normal mb-10 md:mb-14"
              style={{
                fontFamily: variant.fontFamily,
                letterSpacing: variant.letterSpacing,
                lineHeight: 1.15,
              }}
            >
              <span
                className="block text-white/90"
                style={{
                  fontSize: "clamp(32px, 4.8vw, 68px)",
                  fontWeight: variant.weightSubLines,
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                諦めたもの、
              </span>
              <span
                className="block text-white/90"
                style={{
                  fontSize: "clamp(30px, 4.5vw, 64px)",
                  fontWeight: variant.weightSubLines,
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                そのすべてが、
              </span>
              <span
                className="block text-white"
                style={{
                  fontSize: "clamp(56px, 9.5vw, 128px)",
                  fontWeight: variant.weightBigLine,
                  textShadow: "0 3px 22px rgba(0,0,0,0.6)",
                  marginTop: "0.12em",
                }}
              >
                標準になる家。
              </span>
            </h1>

            {/* 価格(主役維持) */}
            <div className="flex items-end gap-2 md:gap-4 leading-none">
              <span
                className="text-white font-light whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "clamp(72px, 20vw, 300px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 0.85,
                  textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                }}
              >
                2,280
              </span>
              <div className="flex flex-col gap-1 pb-2 md:pb-3 lg:pb-4">
                <span className="text-white/90 text-lg md:text-2xl lg:text-3xl font-normal leading-none [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]">
                  万円〜
                  <span className="ml-1.5 text-[11px] md:text-sm align-baseline text-white/70 font-normal tracking-[0.04em]">
                    （京モデル）
                  </span>
                </span>
                <span className="text-white/65 text-[10px] md:text-xs leading-tight tracking-[0.05em] [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]">
                  税込・建物本体・付帯工事込み
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 下段: 権威バッジ + CTA */}
        <div className="pb-8 md:pb-14 px-[var(--page-px)]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap items-baseline gap-x-5 md:gap-x-6 gap-y-2 mb-6 md:mb-8 text-white/90 [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]">
              <span className="flex items-baseline gap-1.5">
                <span
                  className="text-white font-light text-xl md:text-2xl tabular-nums"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  90
                </span>
                <span className="text-white/80 text-[11px] md:text-sm">
                  区画以上の分譲実績
                </span>
              </span>
              <span aria-hidden className="w-px h-3.5 bg-white/30" />
              <span className="flex items-baseline gap-1.5">
                <span
                  className="text-white font-light text-xl md:text-2xl tabular-nums"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  50
                </span>
                <span className="text-white/80 text-[11px] md:text-sm">
                  組以上のお客様の声
                </span>
              </span>
              <span aria-hidden className="w-px h-3.5 bg-white/30" />
              <span className="flex items-baseline gap-1.5">
                <span
                  className="text-white font-light text-xl md:text-2xl tabular-nums"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  14
                </span>
                <span className="text-white/80 text-[11px] md:text-sm">
                  年の実績(2011年創立)
                </span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-stretch max-w-2xl">
              <CtaButton
                href="/reserve"
                variant="dark-bg-primary"
                size="md"
                label="来場予約"
                sublabel="ご予約不要・無料"
                className="flex-1 sm:min-w-[200px] px-8 py-4"
              />
              <CtaButton
                href="/contact"
                variant="dark-bg-secondary"
                size="md"
                label="資料請求"
                sublabel="無料・1分で完了"
                className="flex-1 sm:min-w-[200px] px-8 py-4"
              />
            </div>
          </div>
        </div>

        {/* 縦組キャプション */}
        <aside
          aria-hidden="false"
          className="hidden md:block absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20"
        >
          <p
            className="text-white/70 text-[11px] lg:text-xs tracking-[0.35em] [writing-mode:vertical-rl] [text-shadow:_0_1px_6px_rgba(0,0,0,0.7)]"
            style={{ fontFamily: variant.fontFamily }}
          >
            花鳥風月&nbsp;の家
          </p>
        </aside>
      </div>
    </section>
  );
}
