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
      {/* ===== メインヒーロー ===== */}
      <div className="relative w-full h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
        {/* 背景画像 */}
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

        {/* 暗幕オーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* テキストオーバーレイ */}
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16 lg:pb-20">
          <div className="w-full max-w-[1200px] mx-auto px-[var(--page-px)]">
            {/* シリーズ名 */}
            <p className="font-section-label text-white/80 text-xs md:text-sm tracking-[0.15em] mb-2">
              KACHOUFUUGETSU — YAMATO NO IE
            </p>
            <p className="text-white/90 text-sm md:text-base mb-4" style={{ fontFamily: "var(--font-sans)" }}>
              花鳥風月　やまとの家
            </p>

            {/* 価格（主役） */}
            <div className="flex items-baseline gap-1 mb-3">
              <span
                className="text-white font-light text-5xl md:text-6xl lg:text-7xl tracking-tight"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                2,480
              </span>
              <span className="text-white/90 text-lg md:text-xl font-normal">
                万円〜
              </span>
              <span className="text-white/60 text-xs md:text-sm ml-2">
                （税込・建物本体）
              </span>
            </div>

            {/* キャッチ */}
            <p className="text-white text-base md:text-lg lg:text-xl font-normal mb-6" style={{ fontFamily: "var(--font-sans)" }}>
              見積もりから、増えない家。
            </p>

            {/* 権威バッジ */}
            <div className="flex items-center gap-4 mb-6 text-white/80 text-xs md:text-sm">
              <span
                className="flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span className="text-white font-light text-lg md:text-xl">90</span>
                <span>区画以上の分譲実績</span>
              </span>
              <span className="w-px h-4 bg-white/30" />
              <span
                className="flex items-center gap-1.5"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span className="text-white font-light text-lg md:text-xl">50</span>
                <span>組のお客様の声</span>
              </span>
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <a
                href="#contact"
                className="flex items-center justify-center min-h-[44px] px-6 py-3 rounded bg-main text-white text-sm font-medium transition-all hover:bg-main-dark hover:-translate-y-0.5"
              >
                資料請求
              </a>
              <a
                href="#reservation"
                className="flex items-center justify-center min-h-[44px] px-6 py-3 rounded bg-accent text-white text-sm font-medium transition-all hover:opacity-90 hover:-translate-y-0.5"
              >
                来店予約
              </a>
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
                {/* 花だけ「推奨」バッジ */}
                {m.highlight && (
                  <span className="inline-block bg-main text-white text-[10px] font-medium px-2 py-0.5 rounded mb-3 tracking-wider">
                    RECOMMEND
                  </span>
                )}

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl md:text-3xl text-text-primary" style={{ fontFamily: "var(--font-serif)" }}>
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
