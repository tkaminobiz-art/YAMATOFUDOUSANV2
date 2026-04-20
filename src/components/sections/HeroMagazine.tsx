"use client";

import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";

/*
  HeroMagazine — 2026-04-20 C-2 Magazine Editorial 版
  方針:
  - 雑誌カバー型タイポグラフィ(Noto Serif JP 400 / 意味改行 / 進行インデント)
  - 主見出し「諦めたもの、そのすべてが、標準になる家。」(copywriter A案)
  - 価格 2,280 は主役維持(ユーザー判断)
  - 権威バッジは FV 内に残しつつ編集誌的に小型化
  - 右端に縦組キャプション「花鳥風月の家」
  - 四隅にページナンバー風マーカー [01] [02]
  - グレイン(SVGインライン)で雑誌の印刷感
*/

const HERO_SLIDES = [
  { src: "/images/newsozai/hero-miyamaki-mountain.webp", alt: "三山木モデルハウス 山並みと青空" },
  { src: "/images/newsozai/interior-kitchen-01.webp", alt: "内観 キッチン" },
  { src: "/images/newsozai/hero-day-green-exterior.webp", alt: "外観 緑と青空" },
  { src: "/images/newsozai/interior-ldk-01.webp", alt: "内観 LDK" },
] as const;

// グレイン: 雑誌の印刷感を出す薄いノイズ
const GRAIN_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'>
      <filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter>
      <rect width='100%' height='100%' filter='url(%23n)' opacity='0.55'/>
    </svg>`
  );

export default function HeroMagazine() {
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

      {/* グレイン(雑誌印刷感) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
      />

      {/* オーバーレイ: 非対称・下方重め */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10 z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/40 z-[2]" />

      {/* ===== コンテンツ ===== */}
      <div className="relative z-10 min-h-[100svh] flex flex-col">
        {/* ── 上段: ISSUE メタ + シリーズラベル + [01] ── */}
        <div className="pt-20 md:pt-24 lg:pt-28 px-[var(--page-px)]">
          <div className="max-w-[1400px] mx-auto">
            {/* 上部ルール + メタ */}
            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-8">
              <span aria-hidden className="h-px w-8 md:w-14 bg-white/50" />
              <p
                className="text-white/90 text-[10px] md:text-[11px] tracking-[0.22em] whitespace-nowrap uppercase [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                Issue <span className="text-accent">014</span>
                <span className="mx-2 text-white/40">/</span>
                Apr 2026
                <span className="mx-2 text-white/40">/</span>
                Nara
              </p>
              <span aria-hidden className="h-px flex-1 bg-white/30" />
              <span
                className="hidden md:inline-block text-white/50 text-[10px] tracking-[0.25em]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                [01]
              </span>
            </div>

            {/* シリーズラベル */}
            <p className="font-section-label text-white/85 text-[11px] md:text-sm tracking-[0.2em] [text-shadow:_0_1px_8px_rgba(0,0,0,0.6)]">
              KACHOUFUUGETSU — YAMATO NO IE
            </p>
          </div>
        </div>

        {/* ── 中段: 主見出し + 価格 ── */}
        <div className="flex-1 flex flex-col justify-center px-[var(--page-px)] py-8 md:py-12">
          <div className="max-w-[1400px] mx-auto w-full">
            {/* 主見出し(雑誌カバー型・進行インデント) */}
            <h1
              className="text-white font-normal mb-10 md:mb-14 max-w-[18ch]"
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(36px, 6.8vw, 96px)",
                letterSpacing: "0.06em",
                lineHeight: 1.3,
                textShadow: "0 2px 20px rgba(0,0,0,0.55)",
              }}
            >
              <span className="block">諦めたもの、</span>
              <span className="block md:pl-[1.2em]">そのすべてが、</span>
              <span className="block md:pl-[2.4em]">
                <span className="relative inline-block">
                  標準
                  <span
                    aria-hidden
                    className="absolute left-0 right-0 -bottom-[0.12em] h-[0.08em] bg-accent"
                  />
                </span>
                <span>になる家。</span>
              </span>
            </h1>

            {/* 価格ブロック(主役維持・320px級) */}
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

        {/* ── 下段: 権威バッジ(編集誌型) + CTA + [02] ── */}
        <div className="pb-8 md:pb-14 px-[var(--page-px)]">
          <div className="max-w-[1400px] mx-auto">
            {/* 権威バッジ: 編集誌型・左ルール+タイポ */}
            <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
              <span aria-hidden className="h-px w-6 md:w-10 bg-white/40 shrink-0" />
              <div
                className="flex flex-wrap items-baseline gap-x-4 md:gap-x-6 gap-y-2 text-white/85 [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span className="flex items-baseline gap-1.5">
                  <span className="text-white font-light text-xl md:text-2xl tabular-nums">
                    90
                  </span>
                  <span className="text-white/70 text-[10px] md:text-xs tracking-[0.15em] uppercase">
                    Lots
                  </span>
                </span>
                <span aria-hidden className="w-px h-3 bg-white/25" />
                <span className="flex items-baseline gap-1.5">
                  <span className="text-white font-light text-xl md:text-2xl tabular-nums">
                    50
                  </span>
                  <span className="text-white/70 text-[10px] md:text-xs tracking-[0.15em] uppercase">
                    Voices
                  </span>
                </span>
                <span aria-hidden className="w-px h-3 bg-white/25" />
                <span className="flex items-baseline gap-1.5">
                  <span className="text-white font-light text-xl md:text-2xl tabular-nums">
                    14
                  </span>
                  <span className="text-white/70 text-[10px] md:text-xs tracking-[0.15em] uppercase">
                    Years
                  </span>
                </span>
              </div>
              <span
                aria-hidden
                className="hidden md:block ml-auto text-white/45 text-[10px] tracking-[0.25em]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                [02]
              </span>
            </div>

            {/* CTA */}
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

        {/* ── 右端縦組キャプション(和雑誌感の要) ── */}
        <aside
          aria-hidden="false"
          className="hidden md:block absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20"
        >
          <p
            className="text-white/80 text-[11px] lg:text-xs tracking-[0.35em] [writing-mode:vertical-rl] [text-shadow:_0_1px_6px_rgba(0,0,0,0.7)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            花鳥風月&nbsp;の家
          </p>
        </aside>
      </div>
    </section>
  );
}
