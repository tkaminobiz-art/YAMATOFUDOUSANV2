"use client";

import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";
import {
  FONT_VARIANTS,
  BODY_VARIANTS,
  type HeroFontVariant,
  type HeroBodyVariant,
} from "./HeroMagazine.fonts";

// 後方互換: 既存の import 経路を維持
export { FONT_VARIANTS, BODY_VARIANTS };
export type { HeroFontVariant, HeroBodyVariant };

/*
  HeroMagazine v5 — 2026-04-21
  - 主見出しを事実の核へ: 「同じ素材、同じ性能。」→「家そのものの、価格。」
    (design-critic 指摘#2: 詩的抽象→事実直撃)
  - 主見出しからLIME除去(design-critic 指摘#3: アクセント節約)
  - 縦組「花鳥風月の家」のLIMEのみ残す(ブランドマーク1箇所)
*/

type SlideCategory = "exterior" | "interior";

type HeroSlide = {
  src: string;
  alt: string;
  category: SlideCategory; // exterior=外観(写真主役・オーバーレイ薄く) / interior=室内(雰囲気重視・オーバーレイ厚く)
};

const HERO_SLIDES: HeroSlide[] = [
  {
    src: "/images/newsozai/hero-miyamaki-mountain.webp",
    alt: "三山木モデルハウス 山並みと青空",
    category: "exterior",
  },
  {
    src: "/images/newsozai/interior-kitchen-01.webp",
    alt: "内観 キッチン",
    category: "interior",
  },
  {
    src: "/images/newsozai/hero-day-green-exterior.webp",
    alt: "外観 緑と青空",
    category: "exterior",
  },
  {
    src: "/images/newsozai/interior-ldk-01.webp",
    alt: "内観 LDK",
    category: "interior",
  },
];

// スライド種別ごとのオーバーレイ
// exterior: HM業界の標準(底35〜40%) / 写真主役・呼吸を確保
// interior: 雰囲気重視で現状維持(底62%) / 編集誌的なドラマ感
function SlideOverlay({ category }: { category: SlideCategory }) {
  if (category === "exterior") {
    return (
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/38 via-black/6 to-transparent"
      />
    );
  }
  // interior(現状維持・vignette は右側に反転=テキストを右に移したため)
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/18 to-transparent"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-l from-black/25 via-transparent to-transparent"
      />
    </>
  );
}

// グレイン: baseFrequency 0.9→0.7 で粒子を少し大きく(印刷物風)
// numOctaves 2→3 で粒子の自然さを増す
const GRAIN_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='280' height='280'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/></filter>
      <rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/>
    </svg>`
  );

// 2026-04-20 ブランドパレット刷新: lime を #A2C523 に統一
const ACCENT_LIME = "#A2C523";

export default function HeroMagazine({
  variant = FONT_VARIANTS[0],
  bodyVariant = BODY_VARIANTS[0],
}: {
  variant?: HeroFontVariant;
  bodyVariant?: HeroBodyVariant;
}) {
  return (
    <section className="relative w-full min-h-[100svh] overflow-hidden bg-text-primary">
      {/* ===== 背景: スライドショー(オーバーレイは各スライドに内包) ===== */}
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
            {/* スライド種別ごとに濃度を変える(exterior=薄/interior=現状) */}
            <SlideOverlay category={slide.category} />
          </div>
        ))}
      </div>

      {/* グレイン: 全スライド共通(オーバーレイの上に乗せて印刷感を出す) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.07] mix-blend-soft-light pointer-events-none"
        style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
      />

      {/* ===== コンテンツ ===== */}
      <div className="relative z-10 min-h-[100svh] flex flex-col">
        <div className="flex-1 flex flex-col justify-center px-[var(--page-px)] pt-24 md:pt-28 lg:pt-32 pb-10">
          <div className="max-w-[1400px] mx-auto w-full text-right">
            {/* 主見出し(右寄せ) */}
            <h1
              className="text-white font-normal mb-10 md:mb-14"
              style={{
                fontFamily: variant.fontFamily,
                letterSpacing: variant.letterSpacing,
                lineHeight: 1.15,
              }}
            >
              {/* PC: 1行 / SP: 2行 */}
              <span
                className="block text-white/90 md:whitespace-nowrap"
                style={{
                  fontSize: "clamp(28px, 4.6vw, 68px)",
                  fontWeight: variant.weightSubLines,
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                素材も性能も、<br className="md:hidden" />大手と同じです。
              </span>
              <span
                className="block text-white md:whitespace-nowrap"
                style={{
                  fontSize: "clamp(56px, 9.5vw, 128px)",
                  fontWeight: variant.weightBigLine,
                  textShadow: "0 3px 22px rgba(0,0,0,0.6)",
                  marginTop: "0.12em",
                }}
              >
                家そのものを、<br className="md:hidden" />届けています。
              </span>
            </h1>

            {/* 価格(右寄せ) */}
            <div className="flex items-end gap-2 md:gap-4 leading-none justify-end">
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
              <div className="flex flex-col gap-1 pb-2 md:pb-3 lg:pb-4 text-left">
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
                  税込・建物本体と付帯工事まで含みます
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 下段: 権威バッジ + CTA */}
        <div className="pb-8 md:pb-14 px-[var(--page-px)]">
          <div className="max-w-[1400px] mx-auto">
            <div className="flex flex-wrap items-baseline gap-x-5 md:gap-x-6 gap-y-2 mb-6 md:mb-8 text-white/90 [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)] justify-end">
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

            {/* CTA — フォント切替範囲外(CtaButton側で固定)・右寄せ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:items-stretch max-w-2xl ml-auto">
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

        {/* 縦組キャプション — ブランドマーク(ページ内LIME唯一の装飾色) */}
        <aside
          aria-hidden="false"
          className="hidden md:flex absolute left-6 lg:left-12 top-[42%] -translate-y-1/2 z-20 flex-col items-center gap-5"
        >
          <span aria-hidden className="block w-px h-20 bg-white/60" />
          <p
            className="text-[38px] lg:text-[42px] tracking-[0.12em] [writing-mode:vertical-rl]"
            style={{
              fontFamily: variant.fontFamily,
              fontWeight: 500,
              color: ACCENT_LIME,
              textShadow:
                "0 2px 14px rgba(0,0,0,0.7), 0 0 4px rgba(0,0,0,0.55)",
            }}
          >
            花鳥風月の家
          </p>
        </aside>
      </div>
    </section>
  );
}
