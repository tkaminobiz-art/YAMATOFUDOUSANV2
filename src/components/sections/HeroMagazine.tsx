"use client";

import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";

/*
  HeroMagazine v4 — 2026-04-20
  - 「標準になる」を #A9D159 (lime green) で着色
  - bodyVariant 追加: 数字+日本語小テキストのフォント切替可能
  - 装飾ゼロ・サブ行強調(68/64) は v3 から継続
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

const ACCENT_LIME = "#A9D159";

// === 見出し用フォントバリアント ===
export type HeroFontVariant = {
  id: string;
  label: string;
  description: string;
  fontFamily: string;
  weightSubLines: number;
  weightBigLine: number;
  letterSpacing: string;
};

export const FONT_VARIANTS: HeroFontVariant[] = [
  {
    id: "noto-serif",
    label: "A. Noto Serif JP",
    description: "現行baseline / Web普及型・無難で読みやすい",
    fontFamily: "var(--font-noto-serif), 'Noto Serif JP', 'Hiragino Mincho ProN', serif",
    weightSubLines: 400,
    weightBigLine: 700,
    letterSpacing: "-0.02em",
  },
  {
    id: "shippori",
    label: "B. Shippori Mincho",
    description: "出版・雑誌系 / 紙面に強い・落ち着いた現代の太明朝",
    fontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
    weightSubLines: 400,
    weightBigLine: 700,
    letterSpacing: "-0.02em",
  },
  {
    id: "zen-old",
    label: "C. Zen Old Mincho",
    description: "情緒・伝統 / オールド系で和の格調・文芸的",
    fontFamily: "var(--font-zen-old), 'Zen Old Mincho', serif",
    weightSubLines: 400,
    weightBigLine: 700,
    letterSpacing: "-0.01em",
  },
  {
    id: "kaisei",
    label: "D. Kaisei Tokumin",
    description: "個性派 / 力強い字面・古い印刷物のような独特の重み",
    fontFamily: "var(--font-kaisei), 'Kaisei Tokumin', serif",
    weightSubLines: 500,
    weightBigLine: 700,
    letterSpacing: "0em",
  },
  {
    id: "tegomin",
    label: "E. New Tegomin",
    description: "筆勢・手書き感 / 情緒重視・雑誌の特集タイトル風",
    fontFamily: "var(--font-tegomin), 'New Tegomin', serif",
    weightSubLines: 400,
    weightBigLine: 400,
    letterSpacing: "0em",
  },
];

// === ボディ(数字+日本語小テキスト)バリアント ===
export type HeroBodyVariant = {
  id: string;
  label: string;
  description: string;
  numberFontFamily: string;
  numberWeight: number;
  numberLetterSpacing: string;
  jaFontFamily: string;
  jaWeight: number;
};

export const BODY_VARIANTS: HeroBodyVariant[] = [
  {
    id: "modern",
    label: "I. Modern Sans (現行)",
    description: "Inter Light + Noto Sans JP / モダン・ニュートラル",
    numberFontFamily: "var(--font-inter), Inter, sans-serif",
    numberWeight: 300,
    numberLetterSpacing: "-0.04em",
    jaFontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
    jaWeight: 400,
  },
  {
    id: "magazine-serif",
    label: "II. Magazine Serif",
    description: "Bodoni Moda + Noto Serif JP / 高級雑誌のオール明朝・セリフ",
    numberFontFamily: "var(--font-bodoni), 'Bodoni Moda', serif",
    numberWeight: 400,
    numberLetterSpacing: "-0.02em",
    jaFontFamily: "var(--font-noto-serif), 'Noto Serif JP', serif",
    jaWeight: 400,
  },
  {
    id: "editorial-mix",
    label: "III. Editorial Mix",
    description: "Playfair Display + Shippori Mincho / 編集誌の優雅さ",
    numberFontFamily: "var(--font-playfair), 'Playfair Display', serif",
    numberWeight: 400,
    numberLetterSpacing: "-0.02em",
    jaFontFamily: "var(--font-shippori), 'Shippori Mincho', serif",
    jaWeight: 400,
  },
  {
    id: "industrial-bold",
    label: "IV. Industrial",
    description: "Oswald Light + Noto Sans JP 500 / コンデンス・力強い",
    numberFontFamily: "var(--font-oswald), 'Oswald', sans-serif",
    numberWeight: 300,
    numberLetterSpacing: "-0.01em",
    jaFontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
    jaWeight: 500,
  },
];

export default function HeroMagazine({
  variant = FONT_VARIANTS[0],
  bodyVariant = BODY_VARIANTS[0],
}: {
  variant?: HeroFontVariant;
  bodyVariant?: HeroBodyVariant;
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

      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
      />
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
              {/* PC: 1行 / SP: 2行 (br className="md:hidden" で切替) */}
              <span
                className="block text-white/90 md:whitespace-nowrap"
                style={{
                  fontSize: "clamp(28px, 4.6vw, 68px)",
                  fontWeight: variant.weightSubLines,
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                諦めたもの、<br className="md:hidden" />そのすべてが、
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
                <span style={{ color: ACCENT_LIME }}>標準になる</span>
                <span>家。</span>
              </span>
            </h1>

            {/* 価格 */}
            <div className="flex items-end gap-2 md:gap-4 leading-none">
              <span
                className="text-white font-light whitespace-nowrap"
                style={{
                  fontFamily: bodyVariant.numberFontFamily,
                  fontWeight: bodyVariant.numberWeight,
                  fontSize: "clamp(72px, 20vw, 300px)",
                  letterSpacing: bodyVariant.numberLetterSpacing,
                  lineHeight: 0.85,
                  textShadow: "0 2px 20px rgba(0,0,0,0.5)",
                }}
              >
                2,280
              </span>
              <div className="flex flex-col gap-1 pb-2 md:pb-3 lg:pb-4">
                <span
                  className="text-white/90 text-lg md:text-2xl lg:text-3xl font-normal leading-none [text-shadow:_0_1px_10px_rgba(0,0,0,0.5)]"
                  style={{
                    fontFamily: bodyVariant.jaFontFamily,
                    fontWeight: bodyVariant.jaWeight,
                  }}
                >
                  万円〜
                  <span
                    className="ml-1.5 text-[11px] md:text-sm align-baseline text-white/70 font-normal tracking-[0.04em]"
                    style={{ fontFamily: bodyVariant.jaFontFamily }}
                  >
                    （京モデル）
                  </span>
                </span>
                <span
                  className="text-white/65 text-[10px] md:text-xs leading-tight tracking-[0.05em] [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]"
                  style={{ fontFamily: bodyVariant.jaFontFamily }}
                >
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
                  className="text-white text-xl md:text-2xl tabular-nums"
                  style={{
                    fontFamily: bodyVariant.numberFontFamily,
                    fontWeight: bodyVariant.numberWeight,
                  }}
                >
                  90
                </span>
                <span
                  className="text-white/80 text-[11px] md:text-sm"
                  style={{
                    fontFamily: bodyVariant.jaFontFamily,
                    fontWeight: bodyVariant.jaWeight,
                  }}
                >
                  区画以上の分譲実績
                </span>
              </span>
              <span aria-hidden className="w-px h-3.5 bg-white/30" />
              <span className="flex items-baseline gap-1.5">
                <span
                  className="text-white text-xl md:text-2xl tabular-nums"
                  style={{
                    fontFamily: bodyVariant.numberFontFamily,
                    fontWeight: bodyVariant.numberWeight,
                  }}
                >
                  50
                </span>
                <span
                  className="text-white/80 text-[11px] md:text-sm"
                  style={{
                    fontFamily: bodyVariant.jaFontFamily,
                    fontWeight: bodyVariant.jaWeight,
                  }}
                >
                  組以上のお客様の声
                </span>
              </span>
              <span aria-hidden className="w-px h-3.5 bg-white/30" />
              <span className="flex items-baseline gap-1.5">
                <span
                  className="text-white text-xl md:text-2xl tabular-nums"
                  style={{
                    fontFamily: bodyVariant.numberFontFamily,
                    fontWeight: bodyVariant.numberWeight,
                  }}
                >
                  14
                </span>
                <span
                  className="text-white/80 text-[11px] md:text-sm"
                  style={{
                    fontFamily: bodyVariant.jaFontFamily,
                    fontWeight: bodyVariant.jaWeight,
                  }}
                >
                  年の実績(2011年創立)
                </span>
              </span>
            </div>

            {/* CTA — フォント切替範囲外(CtaButton側で固定) */}
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
