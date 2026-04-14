"use client";

import Image from "next/image";

const MODELS = [
  {
    name: "花",
    reading: "hana",
    label: "最上位モデル",
    size: "33坪",
    plan: "4LDK",
    price: "2,480",
    highlight: true,
  },
  {
    name: "風",
    reading: "kaze",
    label: "標準モデル",
    size: "30坪",
    plan: "4LDK",
    price: "2,480",
    highlight: false,
  },
  {
    name: "京",
    reading: "miyako",
    label: "狭小地向け",
    size: "28坪",
    plan: "3LDK",
    price: "2,280",
    highlight: false,
  },
] as const;

export default function HeroCatalog() {
  return (
    <section>
      {/* ===== メインヒーロー — フルブリード写真 + オーバーサイズ数字 ===== */}
      <div className="relative w-full min-h-[100svh] overflow-hidden">
        {/* 背景画像 — ゆっくりズームで「生きた」感じ */}
        <div className="absolute inset-0 hero-zoom">
          <picture>
            <source
              srcSet="/images/fv/hero-pc.webp"
              media="(min-width: 1024px)"
              type="image/webp"
            />
            <source
              srcSet="/images/fv/hero-tablet.webp"
              media="(min-width: 640px)"
              type="image/webp"
            />
            <source srcSet="/images/fv/hero-sp.webp" type="image/webp" />
            <Image
              src="/images/fv/hero-pc.jpg"
              alt="花鳥風月やまとの家「花」モデル外観"
              fill
              priority
              className="object-cover"
            />
          </picture>
        </div>

        {/* グラデーション — 下と左に深いフェード */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent lg:from-black/30" />

        {/* ===== コンテンツレイヤー ===== */}
        <div className="relative z-10 min-h-[100svh] flex flex-col">
          {/* 上部: シリーズ名 */}
          <div className="pt-24 md:pt-28 lg:pt-32 px-[var(--page-px)]">
            <div className="max-w-[1400px] mx-auto">
              <p className="font-section-label text-white/80 text-xs md:text-sm tracking-[0.2em] mb-2">
                KACHOUFUUGETSU — YAMATO NO IE
              </p>
              <p className="text-white/90 text-sm md:text-base" style={{ fontFamily: "var(--font-sans)" }}>
                奈良の注文住宅 花鳥風月 やまとの家
              </p>
            </div>
          </div>

          {/* 中央: オーバーサイズ価格 */}
          <div className="flex-1 flex items-center px-[var(--page-px)] py-12">
            <div className="max-w-[1400px] mx-auto w-full">
              <div className="flex items-start gap-2 md:gap-4 leading-none">
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
                <div className="flex flex-col justify-end pb-2 md:pb-4 lg:pb-8">
                  <span className="text-white/90 text-lg md:text-2xl lg:text-3xl font-normal">
                    万円〜
                  </span>
                  <span className="text-white/60 text-[10px] md:text-xs mt-1">
                    税込・建物本体・付帯工事込み
                  </span>
                </div>
              </div>

              <p
                className="text-white text-lg md:text-2xl lg:text-3xl font-normal mt-4 md:mt-6 max-w-xl"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                見積もりから、増えない家。
              </p>
            </div>
          </div>

          {/* 下部: 権威バッジ + CTA */}
          <div className="pb-10 md:pb-16 px-[var(--page-px)]">
            <div className="max-w-[1400px] mx-auto">
              {/* 権威バッジ */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6 text-white/85 text-xs md:text-sm">
                <span
                  className="flex items-baseline gap-1.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span className="text-white font-light text-xl md:text-2xl">90+</span>
                  <span className="text-white/70">区画の分譲実績</span>
                </span>
                <span className="w-px h-4 bg-white/30 hidden sm:inline-block" />
                <span
                  className="flex items-baseline gap-1.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span className="text-white font-light text-xl md:text-2xl">50</span>
                  <span className="text-white/70">組のお客様の声</span>
                </span>
                <span className="w-px h-4 bg-white/30 hidden sm:inline-block" />
                <span
                  className="flex items-baseline gap-1.5"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  <span className="text-white font-light text-xl md:text-2xl">14</span>
                  <span className="text-white/70">年の実績（2011年創立）</span>
                </span>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3">
                <a
                  href="/reserve"
                  className="flex items-center justify-center min-h-[52px] px-8 py-3.5 rounded bg-accent text-white text-base font-medium transition-all hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(196,112,63,0.4)]"
                >
                  来店予約（無料）
                </a>
                <a
                  href="/contact"
                  className="flex items-center justify-center min-h-[52px] px-8 py-3.5 rounded bg-main text-white text-base font-medium transition-all hover:bg-main-dark hover:-translate-y-0.5"
                >
                  資料請求（無料）
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 3モデル補足カード ===== */}
      <div className="bg-bg-secondary border-t border-border">
        <div className="max-w-[1200px] mx-auto px-[var(--page-px)] py-8 md:py-10">
          <p className="font-section-label text-text-secondary text-xs mb-5 tracking-[0.12em]">
            PRODUCT LINEUP
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--card-gap)]">
            {MODELS.map((m) => (
              <div
                key={m.reading}
                className={`
                  bg-bg-primary rounded-lg p-[var(--card-p)]
                  card-shadow transition-all
                  ${m.highlight ? "ring-2 ring-main" : "hover:-translate-y-1"}
                `}
              >
                {m.highlight && (
                  <span className="inline-block bg-main text-white text-[10px] font-medium px-2 py-0.5 rounded mb-3 tracking-wider">
                    RECOMMEND
                  </span>
                )}

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl md:text-3xl text-text-primary" style={{ fontFamily: "var(--font-sans)" }}>
                    {m.name}
                  </span>
                  <span className="text-text-secondary text-sm">
                    {m.reading}
                  </span>
                </div>

                <p className="text-text-secondary text-xs mb-3">{m.label}</p>

                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-text-primary font-light text-xl md:text-2xl"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {m.price}
                  </span>
                  <span className="text-text-secondary text-sm">万円</span>
                </div>

                <p className="text-text-secondary text-sm">
                  {m.size}｜{m.plan}
                </p>
              </div>
            ))}
          </div>

          <p className="text-text-secondary text-[11px] mt-4">
            ※ すべて建物本体価格（税込）。付帯工事・諸費用を含むコミコミ価格です。
          </p>
        </div>
      </div>
    </section>
  );
}
