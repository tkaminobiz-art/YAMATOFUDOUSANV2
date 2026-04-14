"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

const QUALITY_CARDS = [
  {
    number: "10",
    unit: "年保証",
    title: "塗り替え不要の外壁",
    desc: "ニチハ16mm窯業系サイディング。一般的な住宅の塗り替えサイクルは10年。やまとの外壁はその先も保ちます。",
  },
  {
    number: "12",
    unit: "貫",
    title: "業界推奨を超える塗料量",
    desc: "推奨量10貫に対し、12貫を塗布。見えない部分の厚みが10年後の差。",
  },
  {
    number: "100",
    unit: "%自社",
    title: "設計から施工まで一貫体制",
    desc: "下請けなし。全工程を自社で管理するから、品質のバラつきが出ません。",
  },
] as const;

export default function QualitySection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* 非対称レイアウト: 左テキスト固定 + 右数字カード */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
          {/* 左: テキストブロック（PCではsticky） */}
          <div className="lg:sticky lg:top-[120px]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              QUALITY
            </p>
            <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
              旭化成、TOTO、クリナップ。全部、標準です。
            </h2>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9] max-w-[640px]">
              大手と同じ素材を使っています。価格が違う理由は、展示場を持たず、広告費をかけず、自社で全てやっているから。
            </p>
          </div>

          {/* 右: 3枚の数字カード（縦スタック） */}
          <div className="flex flex-col gap-[var(--card-gap)]">
            {QUALITY_CARDS.map((card) => (
              <div
                key={card.number}
                className="scroll-in bg-bg-secondary rounded-lg p-[var(--card-p)] card-shadow"
              >
                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className="text-main font-light text-[clamp(40px,5vw,72px)]"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {card.number}
                  </span>
                  <span
                    className="text-text-primary font-normal text-lg md:text-xl"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {card.unit}
                  </span>
                </div>
                <h3
                  className="text-text-primary font-medium text-base mb-2"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {card.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-[640px]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
