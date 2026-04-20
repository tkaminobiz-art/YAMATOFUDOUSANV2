"use client";

import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";

/*
  MechanismEnhanced — Plan B 用
  - Concept の「予算で、理想を諦めなくていい。」を冒頭エピグラフとして吸収
  - 既存 MechanismSection の図解(大手vs.やまと)を主役のまま使用
  - 末尾に「やまとは、家そのものに、お金を使う。」の宣言で閉じる
*/

export default function MechanismEnhanced() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#FBF8F2] py-[var(--section-py)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_-10%,rgba(125,68,39,0.10),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(43,43,43,0.02), rgba(43,43,43,0.02) 1px, transparent 1px, transparent 28px)",
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
        {/* === エピグラフ(吸収した Concept メッセージ) === */}
        <div className="max-w-[720px] mb-12 md:mb-16">
          <p
            className="font-section-label text-main text-xs md:text-sm tracking-[0.18em] mb-4"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            WHY YAMATO
          </p>
          <p
            className="text-[clamp(22px,2.8vw,36px)] font-light leading-[1.55] tracking-[0.04em] text-text-primary mb-5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            予算で、理想を諦めなくていい。
          </p>
          <p className="text-[14px] md:text-[15px] leading-[1.95] text-text-secondary">
            素材も性能も、大手と変わりません。違うのは、お家の周りにある費用です。
          </p>
        </div>

        <SectionHeaderCentered
          label="MECHANISM"
          ghostText="MECHANISM"
          title="安いのではなく、無駄がない。"
          lead="同じ仕様・同じ品質でも、価格が違って見える理由があります。結論からお見せします。"
          align="left"
          className="mb-10 md:mb-12"
        />

        {/* 結論カード */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-white/70 p-6 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.18)] md:p-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-text-secondary">結論</p>
              <p
                className="mt-4 text-[clamp(18px,2.2vw,26px)] font-semibold leading-[1.55] tracking-[0.05em] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                お家そのものの原価は、削りません。
                <br />
                「家に関係のないお金」だけを、削ります。
              </p>

              <div className="mt-6 rounded-xl border border-border/80 bg-bg-secondary/60 px-5 py-4">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-text-secondary">
                  その結果、この差になります
                </p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-text-secondary">参考：大手</p>
                    <p
                      className="mt-1 text-3xl font-semibold tracking-tight text-text-primary md:text-[40px]"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      4,000<span className="ml-1 text-base font-medium text-text-secondary">万円〜</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-medium text-text-secondary">やまと不動産</p>
                    <p
                      className="mt-1 text-3xl font-semibold tracking-tight text-main md:text-[44px]"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      2,480<span className="ml-1 text-base font-semibold text-main-dark">万円〜</span>
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-main/10 px-4 py-3">
                  <span className="text-sm font-semibold text-text-primary">差額</span>
                  <span
                    className="tabular-nums text-lg font-semibold tracking-tight text-text-primary"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    -1,520万円
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 内訳バー(右側) */}
          <div className="lg:col-span-7 space-y-6">
            <BreakdownBar
              title="参考：大手の費用構造"
              items={[
                { label: "ブランド代・広告費", pct: 35, color: "bg-text-secondary/50" },
                { label: "展示場・モデル維持費", pct: 10, color: "bg-text-secondary/40" },
                { label: "仲介・中間マージン", pct: 10, color: "bg-text-secondary/30" },
                { label: "原価(素材・施工)", pct: 45, color: "bg-text-secondary/70" },
              ]}
            />
            <BreakdownBar
              title="やまとの費用構造"
              items={[
                { label: "原価(素材・施工)", pct: 90, color: "bg-main" },
                { label: "自社運営費", pct: 10, color: "bg-main/50" },
              ]}
              accent
            />
          </div>
        </div>

        {/* 閉じの宣言 */}
        <div className="mt-14 md:mt-20 max-w-[720px] mx-auto text-center">
          <p
            className="text-[clamp(20px,2.4vw,30px)] font-light leading-[1.6] tracking-[0.04em] text-text-primary"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            やまとは、家そのものに、
            <br className="md:hidden" />
            お金を使います。
          </p>
        </div>
      </div>
    </section>
  );
}

function BreakdownBar({
  title,
  items,
  accent = false,
}: {
  title: string;
  items: { label: string; pct: number; color: string }[];
  accent?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-6 md:p-7 ${
        accent
          ? "border-main/30 bg-main/[0.04] shadow-[0_10px_28px_-18px_rgba(72,107,0,0.25)]"
          : "border-border bg-white/70 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.12)]"
      }`}
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-text-secondary mb-4">
        {title}
      </p>
      <div className="flex h-6 w-full overflow-hidden rounded-full bg-bg-secondary">
        {items.map((item, i) => (
          <div
            key={i}
            className={`${item.color} h-full transition-all`}
            style={{ width: `${item.pct}%` }}
            aria-label={`${item.label} ${item.pct}%`}
          />
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-[13px] text-text-primary"
          >
            <span className="flex items-center gap-2">
              <span className={`inline-block w-3 h-3 rounded ${item.color}`} aria-hidden />
              {item.label}
            </span>
            <span
              className="tabular-nums text-text-secondary"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              {item.pct}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 末尾の /zero placeholder link は ZeroTeaser 側で扱う
export function ZeroLinkHint() {
  return (
    <div className="text-center mt-8">
      <Link href="/concept-lab" className="text-main text-sm hover:underline">
        ↓ 続きを見る
      </Link>
    </div>
  );
}
