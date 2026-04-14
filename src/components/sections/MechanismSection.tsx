"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

// 大手とやまとのコスト構造比較（イメージ図）
const OTHERS = [
  { label: "ブランド代・広告費", pct: 35, color: "bg-text-secondary/70" },
  { label: "展示場・モデルハウス維持費", pct: 10, color: "bg-text-secondary/50" },
  { label: "仲介手数料・中間マージン", pct: 10, color: "bg-text-secondary/40" },
  { label: "原価（素材・施工）", pct: 45, color: "bg-main/70" },
] as const;

const YAMATO = [
  { label: "原価（素材・施工）", pct: 90, color: "bg-main" },
  { label: "自社運営費", pct: 10, color: "bg-main/50" },
] as const;

export default function MechanismSection() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <div className="mb-10 md:mb-14 max-w-[640px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            MECHANISM
          </p>
          <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
            価格の中身が、違います。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
            大手とやまとで、同じ素材・同じ品質でもなぜ金額に差が出るのか。そのカラクリです。
          </p>
        </div>

        {/* 比較図 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-10 md:mb-14">
          {/* 大手 */}
          <div className="bg-bg-secondary rounded-lg p-[var(--card-p)]">
            <div className="flex items-baseline justify-between mb-6">
              <h3
                className="text-text-primary text-lg font-medium"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                大手ハウスメーカー
              </h3>
              <span
                className="text-text-primary font-light text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                4,000<span className="text-base">万</span>
              </span>
            </div>

            {/* 構成比率バー */}
            <div className="flex h-3 rounded overflow-hidden mb-4">
              {OTHERS.map((item) => (
                <div
                  key={item.label}
                  className={item.color}
                  style={{ width: `${item.pct}%` }}
                  title={item.label}
                />
              ))}
            </div>

            <ul className="space-y-2 text-xs">
              {OTHERS.map((item) => (
                <li key={item.label} className="flex items-baseline gap-2">
                  <span className={`w-2 h-2 rounded-sm shrink-0 translate-y-0.5 ${item.color}`} />
                  <span className="text-text-secondary flex-1">{item.label}</span>
                  <span
                    className="text-text-primary font-medium"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {item.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* やまと */}
          <div className="bg-main-light rounded-lg p-[var(--card-p)] relative">
            <span className="absolute top-3 right-3 bg-main text-white text-[10px] font-medium px-2 py-0.5 rounded tracking-wider">
              YAMATO
            </span>
            <div className="flex items-baseline justify-between mb-6">
              <h3
                className="text-text-primary text-lg font-medium"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                やまと不動産
              </h3>
              <span
                className="text-main font-light text-3xl md:text-4xl"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                2,480<span className="text-base">万</span>
              </span>
            </div>

            <div className="flex h-3 rounded overflow-hidden mb-4">
              {YAMATO.map((item) => (
                <div
                  key={item.label}
                  className={item.color}
                  style={{ width: `${item.pct}%` }}
                  title={item.label}
                />
              ))}
            </div>

            <ul className="space-y-2 text-xs">
              {YAMATO.map((item) => (
                <li key={item.label} className="flex items-baseline gap-2">
                  <span className={`w-2 h-2 rounded-sm shrink-0 translate-y-0.5 ${item.color}`} />
                  <span className="text-text-secondary flex-1">{item.label}</span>
                  <span
                    className="text-text-primary font-medium"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {item.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 説明 */}
        <div className="bg-bg-secondary rounded-lg p-[var(--card-p)]">
          <h3 className="text-text-primary text-base md:text-lg font-medium mb-3">
            安いのではありません。無駄がないだけです。
          </h3>
          <p className="text-text-secondary text-sm md:text-base leading-[1.9] max-w-[720px]">
            展示場を持たず、広告費をかけず、設計から施工まで完全自社体制。大量仕入れで原価を圧縮し、卸先まで直接交渉。結果、お客様に届くのは「原価に近い価格」です。使っている素材は、大手と変わりません。
          </p>
        </div>
      </div>
    </section>
  );
}
