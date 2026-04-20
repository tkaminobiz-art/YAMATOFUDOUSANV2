"use client";

import Link from "next/link";
import { Handshake, FileCheck, Home, type LucideIcon } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  WhyYamato — Plan C 用(統合・大胆合体)
  Concept + Mechanism + Zero teaser を 1セクションに統合。
  読者の問い「なぜ安い→追加なし」を1スクロールで完結させる。
*/

type ZeroItem = {
  num: string;
  chapter: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

const FEATURED_ZEROS: ZeroItem[] = [
  {
    num: "01",
    chapter: "Before",
    title: "仲介手数料",
    desc: "自社分譲のため、仲介会社を挟みません。",
    Icon: Handshake,
  },
  {
    num: "06",
    chapter: "During",
    title: "不透明な追加費用",
    desc: "あとから上乗せはありません。一枚の見積もりで全体が分かります。",
    Icon: FileCheck,
  },
  {
    num: "08",
    chapter: "After",
    title: "モデルハウスとのギャップ",
    desc: "モデルハウスの設備を、オプションではなく標準仕様で揃えています。",
    Icon: Home,
  },
];

export default function WhyYamato() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#FBF8F2] py-[var(--section-py)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_18%_-10%,rgba(125,68,39,0.10),transparent_62%)]"
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
        {/* ===== Act 1: Concept(哲学) ===== */}
        <div className="max-w-[760px] mb-16 md:mb-24">
          <p
            className="font-section-label text-main text-xs md:text-sm tracking-[0.2em] mb-5"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            WHY YAMATO
          </p>
          <h2
            className="text-[clamp(28px,4vw,52px)] font-light leading-[1.4] tracking-[0.04em] text-text-primary mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            予算で、理想を
            <br className="md:hidden" />
            諦めなくていい。
          </h2>
          <p className="text-[15px] md:text-[16px] leading-[2] text-text-secondary">
            素材も性能も、大手と変わりません。
            <br />
            違うのは、お家の周りにある費用です。
          </p>
        </div>

        {/* ===== Act 2: Mechanism(図解) ===== */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-baseline gap-4 mb-8">
            <span
              className="text-main/40 font-light text-3xl md:text-5xl leading-none"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              01
            </span>
            <h3
              className="text-[clamp(20px,2.4vw,28px)] font-light leading-tight text-text-primary"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              無駄を、削っただけです。
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-border bg-white/70 p-6 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.18)] md:p-7">
                <div className="rounded-xl border border-border/80 bg-bg-secondary/60 px-5 py-4">
                  <p className="text-[11px] font-semibold tracking-[0.2em] text-text-secondary">
                    その結果、この差になります
                  </p>
                  <div className="mt-3 flex items-end justify-between gap-4">
                    <div>
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
                <p
                  className="mt-5 text-[13px] leading-[1.95] text-text-secondary"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  「家に関係のないお金」を削っただけで、家そのものの原価は削っていません。
                </p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
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
        </div>

        {/* ===== Act 3: Zero teaser ===== */}
        <div>
          <div className="flex items-baseline gap-4 mb-8">
            <span
              className="text-main/40 font-light text-3xl md:text-5xl leading-none"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              02
            </span>
            <h3
              className="text-[clamp(20px,2.4vw,28px)] font-light leading-tight text-text-primary"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              「あとから出る費用」も、出しません。
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {FEATURED_ZEROS.map((z) => {
              const Icon = z.Icon;
              return (
                <article
                  key={z.num}
                  className="rounded-2xl border border-border bg-white/70 p-6 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.12)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[10px] font-semibold tracking-[0.22em] text-text-secondary"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      {z.chapter} · {z.num}
                    </span>
                    <span
                      className="inline-flex items-center border border-main/30 bg-main/10 px-2.5 py-0.5 text-[10px] font-semibold tracking-[0.22em] text-main"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      ¥0
                    </span>
                  </div>
                  <Icon className="w-6 h-6 mb-4 text-main" strokeWidth={1.5} />
                  <h4
                    className="text-[17px] md:text-[19px] font-light leading-snug mb-2 text-text-primary"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {z.title}
                  </h4>
                  <p className="text-text-secondary text-[13px] leading-[1.85]">{z.desc}</p>
                </article>
              );
            })}
          </div>

          {/* 残り5項目への誘導 */}
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-text-secondary text-sm md:text-base mb-5">
              「つなぎ融資負担」「地盤改良費」「搬入費用」など全8項目は別ページに。
            </p>
            <Link
              href="/zero"
              className="group inline-flex items-center gap-2 text-text-primary text-sm font-medium border-b border-text-primary/30 pb-1 transition-colors hover:text-main hover:border-main"
            >
              <span>8つのゼロ宣言を、すべて見る</span>
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            <p className="text-text-secondary/50 text-xs mt-3 italic">
              (※ /zero ページは未作成・現在はリンク先未設置の prototype 状態)
            </p>
          </div>
        </div>

        {/* 閉じの宣言 */}
        <div className="mt-20 md:mt-28 max-w-[720px] mx-auto text-center">
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
      className={`rounded-2xl border p-5 md:p-6 ${
        accent
          ? "border-main/30 bg-main/[0.04]"
          : "border-border bg-white/70"
      }`}
    >
      <p className="text-xs font-semibold tracking-[0.18em] text-text-secondary mb-3">
        {title}
      </p>
      <div className="flex h-6 w-full overflow-hidden rounded-full bg-bg-secondary">
        {items.map((item, i) => (
          <div
            key={i}
            className={`${item.color} h-full`}
            style={{ width: `${item.pct}%` }}
            aria-label={`${item.label} ${item.pct}%`}
          />
        ))}
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-center justify-between text-[12px] text-text-primary"
          >
            <span className="flex items-center gap-2">
              <span className={`inline-block w-2.5 h-2.5 rounded ${item.color}`} aria-hidden />
              <span className="truncate">{item.label}</span>
            </span>
            <span
              className="tabular-nums text-text-secondary shrink-0"
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
