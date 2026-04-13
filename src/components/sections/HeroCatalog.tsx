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

        {/* 暗幕オーバーレイ（テキスト可読性用） */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* テキストオーバーレイ */}
        <div className="absolute inset-0 flex items-end pb-12 md:pb-16 lg:pb-20">
          <div className="w-full max-w-7xl mx-auto px-5 md:px-8">
            {/* シリーズ名 */}
            <p className="font-section-label text-white/80 text-xs md:text-sm tracking-[0.15em] mb-2">
              KACHOUFUUGETSU — YAMATO NO IE
            </p>
            <p className="text-white/90 text-sm md:text-base mb-4">
              花鳥風月　やまとの家
            </p>

            {/* 価格（主役） */}
            <div className="flex items-baseline gap-1 mb-3">
              <span
                className="text-white font-bold text-5xl md:text-6xl lg:text-7xl tracking-tight"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                }}
              >
                2,480
              </span>
              <span className="text-white/90 text-lg md:text-xl font-medium">
                万円〜
              </span>
              <span className="text-white/60 text-xs md:text-sm ml-2">
                （税込・建物本体）
              </span>
            </div>

            {/* キャッチ */}
            <p className="text-white text-base md:text-lg lg:text-xl font-medium mb-6">
              見積もりから、増えない家。
            </p>

            {/* CTA */}
            <div className="flex gap-3">
              <a
                href="#contact"
                className="px-6 py-3 rounded bg-main text-white text-sm font-bold hover:bg-main-dark transition-colors"
              >
                資料請求
              </a>
              <a
                href="#reservation"
                className="px-6 py-3 rounded bg-accent text-white text-sm font-bold hover:opacity-90 transition-opacity"
              >
                来店予約
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ===== 3モデル補足カード ===== */}
      <div className="bg-bg-secondary border-t border-border">
        <div className="max-w-7xl mx-auto px-5 md:px-8 py-8 md:py-10">
          <p className="font-section-label text-text-secondary text-xs mb-5 tracking-[0.12em]">
            PRODUCT LINEUP
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {MODELS.map((m) => (
              <div
                key={m.reading}
                className={`
                  bg-white rounded-lg p-5 md:p-6
                  border-2 transition-shadow
                  ${
                    m.highlight
                      ? "border-main shadow-sm"
                      : "border-border hover:border-main/30"
                  }
                `}
              >
                {/* 花だけ「推奨」バッジ */}
                {m.highlight && (
                  <span className="inline-block bg-main text-white text-[10px] font-bold px-2 py-0.5 rounded mb-3 tracking-wider">
                    RECOMMEND
                  </span>
                )}

                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-2xl md:text-3xl font-bold text-text-primary">
                    {m.name}
                  </span>
                  <span className="text-text-secondary text-sm">
                    {m.reading}
                  </span>
                </div>

                <p className="text-text-secondary text-xs mb-3">{m.label}</p>

                <div className="flex items-baseline gap-3 mb-2">
                  <span
                    className="text-text-primary font-bold text-xl md:text-2xl"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                    }}
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
            ※
            すべて建物本体価格（税込）。付帯工事・諸費用を含むコミコミ価格です。
          </p>
        </div>
      </div>
    </section>
  );
}
