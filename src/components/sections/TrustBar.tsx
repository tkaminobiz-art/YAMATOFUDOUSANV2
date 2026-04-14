"use client";

const TRUST_ITEMS = [
  { num: "14", unit: "年", label: "創立2011年" },
  { num: "90+", unit: "区画", label: "自社分譲の実績" },
  { num: "50+", unit: "組", label: "お客様の声" },
  { num: "19", unit: "名", label: "自社スタッフ" },
  { num: "20", unit: "年", label: "地盤保証" },
  { num: "10", unit: "年", label: "しろあり保証" },
  { num: "10516", unit: "号", label: "宅建 国土交通大臣" },
  { num: "2", unit: "店舗", label: "奈良本社・京都支店" },
] as const;

export default function TrustBar() {
  // マーキーは同じ配列を2回レンダリングして無限スクロール風に
  const items = [...TRUST_ITEMS, ...TRUST_ITEMS];

  return (
    <section
      className="bg-text-primary py-6 md:py-8 overflow-hidden relative"
      aria-label="会社の信頼情報"
    >
      {/* ノイズテクスチャで質感 */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="flex animate-marquee gap-10 md:gap-16 whitespace-nowrap">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-baseline gap-2 shrink-0"
            aria-hidden={i >= TRUST_ITEMS.length ? "true" : undefined}
          >
            <span
              className="text-bg-primary font-light text-2xl md:text-3xl lg:text-4xl"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {item.num}
            </span>
            <span className="text-bg-primary/80 text-xs md:text-sm">
              {item.unit}
            </span>
            <span className="text-bg-primary/60 text-xs md:text-sm ml-2">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
