"use client";

import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";

/*
  HeroMagazine v2 — 2026-04-20 A+B(装飾全削除 + サイズ階層)
  反省:
  - v1 は装飾盛り盛りの「AI製雑誌風テンプレ」でダサかった
  - ISSUE / [01][02] / 英字ラベル / 下線 すべて AI パターンの典型
  v2 方針:
  - 装飾ゼロ。主見出しと価格とバッジと縦組キャプションのみ
  - Noto Serif JP weight 700 の太明朝で雑誌カバーの重み
  - 字間 -0.02em に詰める / 行間 1.15 / サイズ階層 3倍
  - 左揃えブロック(進行インデント廃止)
  - 「標準」下線は廃止。代わりに最終行をサイズで圧倒
  - 権威バッジは日本語に戻す(90区画 · 50組 · 14年)
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

      {/* 雑誌印刷感のグレイン(極薄) */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("${GRAIN_DATA_URI}")` }}
      />

      {/* オーバーレイ(下方重め) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10 z-[2]" />

      {/* ===== コンテンツ ===== */}
      <div className="relative z-10 min-h-[100svh] flex flex-col">
        {/* ── 中段: 主見出し + 価格 ── */}
        <div className="flex-1 flex flex-col justify-center px-[var(--page-px)] pt-24 md:pt-28 lg:pt-32 pb-10">
          <div className="max-w-[1400px] mx-auto w-full">
            {/* 主見出し(A+B: 左揃えブロック・サイズ階層・太明朝) */}
            <h1
              className="text-white font-normal mb-10 md:mb-14"
              style={{
                fontFamily: "var(--font-serif)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              <span
                className="block text-white/85"
                style={{
                  fontSize: "clamp(24px, 3.5vw, 48px)",
                  fontWeight: 400,
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                諦めたもの、
              </span>
              <span
                className="block text-white/85"
                style={{
                  fontSize: "clamp(22px, 3.2vw, 44px)",
                  fontWeight: 400,
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                そのすべてが、
              </span>
              <span
                className="block text-white"
                style={{
                  fontSize: "clamp(48px, 8.5vw, 116px)",
                  fontWeight: 700,
                  textShadow: "0 3px 22px rgba(0,0,0,0.6)",
                  marginTop: "0.15em",
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

        {/* ── 下段: 権威バッジ(日本語) + CTA ── */}
        <div className="pb-8 md:pb-14 px-[var(--page-px)]">
          <div className="max-w-[1400px] mx-auto">
            {/* 権威バッジ(日本語・縦罫区切り) */}
            <div
              className="flex flex-wrap items-baseline gap-x-5 md:gap-x-6 gap-y-2 mb-6 md:mb-8 text-white/90 [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]"
            >
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

        {/* ── 右端縦組キャプション(効いているので残す) ── */}
        <aside
          aria-hidden="false"
          className="hidden md:block absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20"
        >
          <p
            className="text-white/70 text-[11px] lg:text-xs tracking-[0.35em] [writing-mode:vertical-rl] [text-shadow:_0_1px_6px_rgba(0,0,0,0.7)]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            花鳥風月&nbsp;の家
          </p>
        </aside>
      </div>
    </section>
  );
}
