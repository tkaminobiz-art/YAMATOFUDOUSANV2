"use client";

import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";

// Heroスライドショー4枚（28秒周期・7秒表示+1秒フェード）
// 色温度リズム: cool → warm → cool → warm でビジュアルの緩急をつける
const HERO_SLIDES = [
  { src: "/images/newsozai/hero-miyamaki-mountain.webp", alt: "三山木モデルハウス 山並みと青空" },
  { src: "/images/newsozai/interior-kitchen-01.webp", alt: "内観 キッチン" },
  { src: "/images/newsozai/hero-day-green-exterior.webp", alt: "外観 緑と青空" },
  { src: "/images/newsozai/interior-ldk-01.webp", alt: "内観 LDK" },
] as const;

export default function HeroCatalog() {
  return (
    <section>
      {/* ===== メインヒーロー ===== */}
      <div className="relative w-full min-h-[100svh] overflow-hidden">
        {/* スライドショー4枚 — 各 7s表示 + 1s クロスフェード、計 28s ループ */}
        {/* delay: i*7 - 1 でslide 0が即表示（fade-in状態を飛ばして始まる） */}
        <div className="absolute inset-0">
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className="hero-slide absolute inset-0"
              style={{
                animationDelay: `${i * 7 - 1}s`,
              }}
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

        {/* 写真を活かす薄手オーバーレイ（テキスト可読性の最低限のみ） */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent z-[1]" />

        {/* ===== コンテンツレイヤー ===== */}
        <div className="relative z-10 min-h-[100svh] flex flex-col">
          {/* 上部: シリーズ名 */}
          <div className="pt-24 md:pt-28 lg:pt-32 px-[var(--page-px)]">
            <div className="max-w-[1400px] mx-auto">
              <p className="font-section-label text-white/80 text-xs md:text-sm tracking-[0.2em] mb-3 [text-shadow:_0_1px_8px_rgba(0,0,0,0.7)]">
                KACHOUFUUGETSU — YAMATO NO IE
              </p>
              <p
                className="text-white text-base md:text-lg mt-1 tracking-[0.12em] [text-shadow:_0_1px_8px_rgba(0,0,0,0.7)] font-medium"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                奈良の注文住宅 花鳥風月 やまとの家
              </p>
            </div>
          </div>

          {/* 中央: オーバーサイズ価格 */}
          <div className="flex-1 flex items-center px-[var(--page-px)] py-12">
            <div className="max-w-[1400px] mx-auto w-full">
              {/* items-end で「万円〜」と補足を数字のベースラインに揃える */}
              <div className="flex items-end gap-2 md:gap-4 leading-none">
                <span
                  className="text-white font-light whitespace-nowrap"
                  style={{
                    fontFamily: "var(--font-inter), Inter, sans-serif",
                    fontSize: "clamp(72px, 22vw, 320px)",
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
                  <span className="text-white/65 text-[10px] md:text-xs leading-tight [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]">
                    税込・建物本体・付帯工事込み
                  </span>
                </div>
              </div>

              <p
                className="text-white text-xl md:text-3xl lg:text-[2.125rem] font-medium mt-8 md:mt-10 lg:mt-12 max-w-2xl leading-[1.65] tracking-[0.08em] [text-shadow:_0_2px_16px_rgba(0,0,0,0.6)]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                見積もりが、最終価格です。
              </p>
              <p className="text-white/75 text-xs md:text-sm mt-3 max-w-xl leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]">
                ※ 土地代・登記費用・引越し代を除く、建物本体と標準設備のすべてを含んだ価格です。
              </p>
            </div>
          </div>

          {/* 下部: 権威バッジ + CTA */}
          <div className="pb-10 md:pb-16 px-[var(--page-px)]">
            <div className="max-w-[1400px] mx-auto">
              {/* 権威バッジ — 縦棒セパレータを常時表示 */}
              <div className="flex flex-wrap items-center gap-x-5 md:gap-x-6 gap-y-3 mb-6 text-white/90 text-xs md:text-sm [text-shadow:_0_1px_6px_rgba(0,0,0,0.5)]">
                <span
                  className="flex items-baseline gap-1.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span className="text-white font-light text-xl md:text-2xl">
                    90
                  </span>
                  <span className="text-white/80">区画以上の分譲実績</span>
                </span>
                <span className="w-px h-4 bg-white/30 inline-block" />
                <span
                  className="flex items-baseline gap-1.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span className="text-white font-light text-xl md:text-2xl">
                    50
                  </span>
                  <span className="text-white/80">組以上のお客様の声</span>
                </span>
                <span className="w-px h-4 bg-white/30 inline-block" />
                <span
                  className="flex items-baseline gap-1.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span className="text-white font-light text-xl md:text-2xl">
                    14
                  </span>
                  <span className="text-white/80">年の実績（2011年創立）</span>
                </span>
              </div>

              {/* CTA — 案B統一版（CtaButton 経由） */}
              <div className="flex flex-col sm:flex-row gap-3 sm:items-stretch">
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
        </div>
      </div>

      {/* FV直下：PRICING の導入（#product と同一ラベル・続きの話として認知させる） */}
      <div className="relative border-t border-border/80 bg-bg-secondary">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/[0.04] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-main/20 to-transparent"
        />
        <div className="relative mx-auto flex max-w-[1240px] flex-col gap-6 px-[var(--page-px)] py-8 md:flex-row md:items-end md:justify-between md:gap-10 md:py-10">
          <div className="min-w-0 flex-1">
            <SectionHeaderCentered
              noMargin
              compact
              align="left"
              label="PRICING"
              ghostText="PRICING"
              title="3つのプランと価格"
              lead="各プランの目安と、コミコミに含まれる範囲をこの下でご紹介します。"
            />
          </div>
          <a
            href="#product"
            className="inline-flex shrink-0 items-center gap-2 self-start text-sm font-medium text-main underline decoration-main/35 underline-offset-4 transition-colors hover:text-main-dark hover:decoration-main md:self-auto"
          >
            価格・比較表へ
            <span aria-hidden className="text-base leading-none">
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
