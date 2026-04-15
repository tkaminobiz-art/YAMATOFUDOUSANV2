"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

// 大手とやまとのコスト構造比較（イメージ図）
const OTHERS = [
  { label: "ブランド代・広告費", pct: 35, color: "bg-text-secondary/50" },
  { label: "展示場・モデルハウス維持費", pct: 10, color: "bg-text-secondary/40" },
  { label: "仲介手数料・中間マージン", pct: 10, color: "bg-text-secondary/30" },
  { label: "原価（素材・施工）", pct: 45, color: "bg-text-secondary/70" },
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
            大手とやまとで、同じ素材・同じ品質でもなぜ金額に差が出るのか。その安さの仕組みです。
          </p>
        </div>

        {/* 比較図 — 非対称（大手2 : やまと3）で優位側を際立たせる */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-5 md:gap-8 mb-10 md:mb-14 items-start">
          {/* 大手（控えめ・グレートーン） */}
          <div className="bg-bg-secondary rounded-lg p-6 md:p-7 opacity-80">
            <p className="text-text-secondary text-xs tracking-wider mb-3">
              大手ハウスメーカー
            </p>
            <div className="flex items-baseline gap-1 mb-5">
              <span
                className="text-text-secondary font-light text-2xl md:text-3xl line-through decoration-[1.5px] decoration-text-secondary/60"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                4,000
              </span>
              <span className="text-text-secondary text-sm">万円</span>
            </div>

            {/* 構成比率バー（控えめ） */}
            <div className="flex h-2 rounded overflow-hidden mb-4">
              {OTHERS.map((item) => (
                <div
                  key={item.label}
                  className={item.color}
                  style={{ width: `${item.pct}%` }}
                  title={item.label}
                />
              ))}
            </div>

            <ul className="space-y-1.5 text-[11px]">
              {OTHERS.map((item) => (
                <li key={item.label} className="flex items-baseline gap-2">
                  <span className={`w-1.5 h-1.5 rounded-sm shrink-0 translate-y-0.5 ${item.color}`} />
                  <span className="text-text-secondary flex-1">{item.label}</span>
                  <span
                    className="text-text-secondary"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {item.pct}%
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* やまと（主役・強調） */}
          <div className="relative bg-main-light rounded-lg p-7 md:p-9 border-l-4 border-main card-shadow">
            {/* YAMATO バッジ */}
            <span className="absolute top-4 right-4 bg-main text-white text-[10px] font-medium px-2.5 py-1 rounded tracking-wider">
              YAMATO
            </span>

            <p className="text-main text-xs md:text-sm tracking-wider mb-3 font-medium">
              やまと不動産
            </p>

            {/* 金額（超大判） */}
            <div className="flex items-baseline gap-2 mb-2">
              <span
                className="text-main font-light tracking-tight"
                style={{
                  fontFamily: "var(--font-inter), Inter, sans-serif",
                  fontSize: "clamp(48px, 7vw, 88px)",
                  lineHeight: 0.9,
                }}
              >
                2,480
              </span>
              <span className="text-main text-lg md:text-xl font-normal">
                万円
              </span>
            </div>

            {/* カット額訴求 */}
            <div className="inline-flex items-baseline gap-1.5 bg-main text-white px-3 py-1.5 rounded mb-6 mt-2">
              <span
                className="font-medium"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                −1,520
              </span>
              <span className="text-xs">万円カット</span>
            </div>

            {/* 構成比率バー（濃く） */}
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

            <ul className="space-y-2 text-xs md:text-sm">
              {YAMATO.map((item) => (
                <li key={item.label} className="flex items-baseline gap-2">
                  <span className={`w-2 h-2 rounded-sm shrink-0 translate-y-0.5 ${item.color}`} />
                  <span className="text-text-primary flex-1 font-medium">{item.label}</span>
                  <span
                    className="text-main font-medium"
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
