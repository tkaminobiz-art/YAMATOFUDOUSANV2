"use client";

import Image from "next/image";
import CtaButton from "@/components/ui/CtaButton";

const MODELS = [
  {
    name: "花",
    reading: "hana",
    label: "ゆとりのある4LDK",
    size: "33坪",
    plan: "4LDK",
    price: "2,480",
    highlight: true,
  },
  {
    name: "風",
    reading: "kaze",
    label: "暮らしやすい4LDK",
    size: "30坪",
    plan: "4LDK",
    price: "2,480",
    highlight: false,
  },
  {
    name: "京",
    reading: "miyako",
    label: "コンパクトな3LDK",
    size: "28坪",
    plan: "3LDK",
    price: "2,280",
    highlight: false,
  },
] as const;

// Heroスライドショー5枚（30秒周期・6秒表示+1秒フェード）
const HERO_SLIDES = [
  { src: "/images/fv/hero-01-exterior-miyamaki.webp", alt: "三山木モデル外観" },
  { src: "/images/fv/hero-02-exterior-sakyo.webp", alt: "左京モデル外観" },
  { src: "/images/fv/hero-03-living.webp", alt: "花鳥風月 リビング" },
  { src: "/images/fv/hero-04-kitchen.webp", alt: "花鳥風月 キッチン" },
  { src: "/images/fv/hero-05-washitsu.webp", alt: "花鳥風月 和室" },
] as const;

export default function HeroCatalog() {
  return (
    <section>
      {/* ===== メインヒーロー ===== */}
      <div className="relative w-full min-h-[100svh] overflow-hidden">
        {/* スライドショー5枚 — 各 5s表示 + 1s クロスフェード、計 25s ループ */}
        {/* delay: i*5 - 1 でslide 0が即表示（fade-in状態を飛ばして始まる） */}
        <div className="absolute inset-0">
          {HERO_SLIDES.map((slide, i) => (
            <div
              key={slide.src}
              className="hero-slide absolute inset-0"
              style={{
                animationDelay: `${i * 5 - 1}s`,
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

        {/* シネマティック用ヴィネット（上下・左右で奥行き） */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/35 to-black/20 z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/25 z-[1]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_45%,transparent_30%,rgba(0,0,0,0.45)_100%)] z-[1]" />

        {/* ===== コンテンツレイヤー ===== */}
        <div className="relative z-10 min-h-[100svh] flex flex-col">
          {/* 上部: シリーズ名 */}
          <div className="pt-24 md:pt-28 lg:pt-32 px-[var(--page-px)]">
            <div className="max-w-[1400px] mx-auto">
              <p className="font-section-label text-white/75 text-xs md:text-sm tracking-[0.2em] mb-3 drop-shadow-md">
                KACHOUFUUGETSU — YAMATO NO IE
              </p>
              <p
                className="text-white/92 text-base md:text-lg mt-1 tracking-[0.12em] drop-shadow-md font-medium"
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
                  }}
                >
                  2,480
                </span>
                <div className="flex flex-col gap-1 pb-2 md:pb-3 lg:pb-4">
                  <span className="text-white/90 text-lg md:text-2xl lg:text-3xl font-normal leading-none">
                    万円〜
                  </span>
                  <span className="text-white/60 text-[10px] md:text-xs leading-tight">
                    税込・建物本体・付帯工事込み
                  </span>
                </div>
              </div>

              <p
                className="text-white text-xl md:text-3xl lg:text-[2.125rem] font-medium mt-8 md:mt-10 lg:mt-12 max-w-2xl leading-[1.65] tracking-[0.08em] drop-shadow-lg"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                見積もりが、最終価格です。
              </p>
              <p className="text-white/65 text-xs md:text-sm mt-3 max-w-xl leading-relaxed">
                ※ 土地代・登記費用・引越し代を除く、建物本体と標準設備のすべてを含んだ価格です。
              </p>
            </div>
          </div>

          {/* 下部: 権威バッジ + CTA */}
          <div className="pb-10 md:pb-16 px-[var(--page-px)]">
            <div className="max-w-[1400px] mx-auto">
              {/* 権威バッジ — 縦棒セパレータを常時表示 */}
              <div className="flex flex-wrap items-center gap-x-5 md:gap-x-6 gap-y-3 mb-6 text-white/85 text-xs md:text-sm">
                <span
                  className="flex items-baseline gap-1.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span className="text-white font-light text-xl md:text-2xl">
                    90
                  </span>
                  <span className="text-white/70">区画以上の分譲実績</span>
                </span>
                <span className="w-px h-4 bg-white/30 inline-block" />
                <span
                  className="flex items-baseline gap-1.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span className="text-white font-light text-xl md:text-2xl">
                    50
                  </span>
                  <span className="text-white/70">組以上のお客様の声</span>
                </span>
                <span className="w-px h-4 bg-white/30 inline-block" />
                <span
                  className="flex items-baseline gap-1.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span className="text-white font-light text-xl md:text-2xl">
                    14
                  </span>
                  <span className="text-white/70">年の実績（2011年創立）</span>
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

      {/* ===== 参考プラン（FV直下・編集スペック帯） ===== */}
      <div className="relative border-t border-border/80 bg-bg-secondary">
        {/* ヒーローからの視線を落とす極薄グラデーション */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/[0.04] to-transparent"
        />
        <section
          aria-labelledby="reference-plans-heading"
          className="relative max-w-[1200px] mx-auto px-[var(--page-px)] py-12 md:py-16 lg:py-[4.5rem]"
        >
          <header className="mb-10 md:mb-12 lg:mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p
                className="text-[11px] font-semibold tracking-[0.38em] text-text-secondary md:text-xs"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                REFERENCE PLANS
              </p>
              <div
                className="mt-4 h-px w-16 bg-gradient-to-r from-main/55 to-transparent md:w-20"
                aria-hidden
              />
              <h2
                id="reference-plans-heading"
                className="mt-6 text-[clamp(22px,3.2vw,34px)] font-medium leading-snug tracking-[0.04em] text-text-primary md:mt-7"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                参考プラン
              </h2>
            </div>
            <p className="max-w-[26rem] text-sm leading-[1.75] text-text-secondary md:text-right">
              出発点の3プランです。間取り・坪数・仕様は、ご家族に合わせて組み直します。
            </p>
          </header>

          <ul className="border-y border-border">
            {MODELS.map((m, i) => (
              <li
                key={m.reading}
                className={[
                  "grid gap-6 border-b border-border py-8 last:border-b-0 md:grid-cols-12 md:items-baseline md:gap-x-8 md:py-9 lg:gap-x-10",
                  m.highlight
                    ? "relative bg-gradient-to-r from-main-light/70 via-bg-primary/80 to-bg-primary md:rounded-sm md:px-6 md:py-9 md:before:absolute md:before:inset-y-3 md:before:left-0 md:before:z-0 md:before:w-1 md:before:rounded-full md:before:bg-main"
                    : "md:px-2",
                ].join(" ")}
              >
                {m.highlight && (
                  <span className="font-section-label mb-1 inline-flex w-fit items-center bg-main px-2 py-0.5 text-[10px] tracking-[0.14em] text-white md:absolute md:left-6 md:top-6 md:mb-0">
                    Recommend
                  </span>
                )}

                <div
                  className={`md:col-span-4 ${m.highlight ? "md:mt-5 md:pl-2" : ""}`}
                >
                  <p
                    className="text-[11px] tabular-nums text-text-secondary/80"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <span
                      className="text-[clamp(26px,3.6vw,36px)] font-medium text-text-primary"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {m.name}
                    </span>
                    <span className="text-sm text-text-secondary">{m.reading}</span>
                  </div>
                </div>

                <div
                  className={`md:col-span-5 ${m.highlight ? "md:mt-5" : ""}`}
                >
                  <p className="text-[15px] leading-relaxed text-text-primary md:text-base">
                    {m.label}
                  </p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-secondary">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="h-px w-4 bg-accent-soft/90"
                        aria-hidden
                      />
                      {m.size}
                    </span>
                    <span className="text-border" aria-hidden>
                      |
                    </span>
                    <span>{m.plan}</span>
                  </p>
                </div>

                <div
                  className={`flex items-baseline gap-2 border-t border-border/70 pt-5 md:col-span-3 md:border-t-0 md:pt-0 md:text-right ${m.highlight ? "md:mt-5" : ""}`}
                >
                  <span
                    className="text-[clamp(28px,4vw,40px)] font-light tabular-nums tracking-tight text-text-primary"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {m.price}
                  </span>
                  <span className="text-sm text-text-secondary">万円〜</span>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[52rem] text-[11px] leading-[1.85] text-text-secondary md:text-xs">
            ※
            ベースとなる3つの基本プランです。ここから、ご家族の理想に合わせて設計します。表示は建物本体価格（税込）に、付帯工事・諸費用を含んだ目安です。
          </p>
        </section>
      </div>
    </section>
  );
}
