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
        {/* 見出し（資料1枚のように中央揃え） */}
        <div className="relative mb-10 md:mb-14 text-center">
          {/* 埋もるテキスト */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-6 md:-top-10 select-none text-[clamp(56px,9vw,120px)] font-semibold tracking-[0.22em] text-text-primary/5"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            MECHANISM
          </div>

          <span className="inline-flex items-center justify-center rounded-full bg-main/15 px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-main">
            MECHANISM
          </span>
          <h2 className="mt-6 text-[clamp(28px,4.2vw,56px)] font-semibold tracking-[0.06em] text-text-primary">
            価格の中身が、違います。
          </h2>
        </div>

        {/* 比較図（左右カード＋中央矢印） */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-[1fr_auto_1fr] md:gap-8">
          {/* 左：大手 */}
          <article className="rounded-xl bg-bg-secondary p-7 md:p-8 card-shadow">
            <p className="text-center text-sm font-semibold text-text-secondary">
              大手ハウスメーカー
            </p>

            <div className="mt-4 text-center">
              <div className="inline-flex items-baseline gap-1">
                <span
                  className="text-5xl font-semibold tracking-tight text-text-primary md:text-6xl"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  4,000
                </span>
                <span className="text-base text-text-secondary">万円</span>
              </div>
              <div className="mx-auto mt-4 h-px w-[78%] bg-border" />
            </div>

            <div className="mt-5">
              <ul className="space-y-2.5 text-[12px] text-text-secondary">
                {OTHERS.map((item) => (
                  <li key={item.label} className="flex items-baseline gap-3">
                    <span className="flex-1">{item.label}</span>
                    <span
                      className="w-12 text-right font-semibold text-text-primary"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {item.pct}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          {/* 中央：矢印＋カット額 */}
          <div className="flex items-center justify-center">
            <div className="relative flex w-full max-w-[420px] items-center justify-center md:max-w-none md:w-[220px]">
              <div className="absolute inset-x-0 top-1/2 h-[3px] -translate-y-1/2 bg-main/55" />
              <div className="absolute right-0 top-1/2 h-0 w-0 -translate-y-1/2 border-y-[12px] border-y-transparent border-l-[18px] border-l-main/70" />
              <span
                className="relative inline-flex items-center justify-center rounded-md bg-main px-4 py-2 text-sm font-semibold text-white shadow-[0_12px_28px_-14px_rgba(0,0,0,0.35)]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                -1,520万円カット
              </span>
            </div>
          </div>

          {/* 右：やまと */}
          <article className="rounded-xl bg-main/55 p-7 md:p-8 card-shadow">
            <p className="text-center text-sm font-semibold text-text-primary">
              やまと不動産
            </p>

            <div className="mt-4 text-center">
              <div className="inline-flex items-baseline gap-1">
                <span
                  className="text-5xl font-semibold tracking-tight text-text-primary md:text-6xl"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  2,480
                </span>
                <span className="text-base text-text-primary/90">万円</span>
              </div>
              <div className="mx-auto mt-4 h-px w-[78%] bg-black/15" />
            </div>

            <div className="mt-5">
              <ul className="space-y-2.5 text-[12px] text-text-primary">
                {YAMATO.map((item) => (
                  <li key={item.label} className="flex items-baseline gap-3">
                    <span className="flex-1 font-semibold">{item.label}</span>
                    <span
                      className="w-12 text-right font-semibold"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {item.pct}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>

        {/* 下部ステートメント（画像通り：一文のみ） */}
        <div className="mt-8 rounded-xl bg-bg-secondary px-6 py-5 text-center md:mt-10 md:px-10 md:py-6 card-shadow">
          <p className="text-[clamp(18px,2vw,24px)] font-semibold tracking-[0.06em] text-text-primary">
            安いのではありません。無駄がないだけです。
          </p>
        </div>
      </div>
    </section>
  );
}
