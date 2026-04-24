"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

/*
  MechanismEnhanced — 2026-04-24 v2 (案A shukobuild型 カタログ)
  ---------------------------------------------------------------
  v1(編集誌)で使っていた要素 = 全て撤去:
  - BLEED 21:9 中扉 + 明朝大判「違うのは〜費用です」
  - 非対称 1.4fr:1fr 看板「やまとは安い？」(8vw 明朝)
  - 別背景 manifesto block (#F0EBE0) + pull quote + 4/5 sidecar

  v2 本実装: "価格の仕組みを、帯で見せる"
  - Heading 一言「やまとは、安くない。」
  - 価格比較の横帯(大手 vs やまと = 1,720万の差)
  - 3つの仕組みを横3列のフラットカード(展示場二重利用/自社一貫/広告最小限)
  - 明朝ゼロ、BLEEDなし、pull quoteなし、非対称なし
*/

// ────────────────────────────────────────────────
// データ
// ────────────────────────────────────────────────

const COMPARE_MAX = 4000; // 大手の参考値(万円)。ここを軸に幅を決める

const COMPARISON = [
  {
    id: "majors",
    label: "大手の場合",
    sub: "広告費・展示場維持費・仲介マージンを含む",
    amount: 4000,
    tone: "muted" as const,
  },
  {
    id: "yamato",
    label: "やまとの場合",
    sub: "家そのものと、付帯工事まで",
    amount: 2280,
    tone: "hero" as const,
  },
] as const;

type Mechanism = {
  num: string;
  title: string;
  summary: string;
  body: string;
};

const MECHANISMS: readonly Mechanism[] = [
  {
    num: "01",
    title: "展示場を、二重利用しています。",
    summary: "分譲地に建てた家をそのままモデルハウスにし、いずれ販売します。",
    body: "専用の展示場は持ちません。維持費が、家の価格に乗りません。",
  },
  {
    num: "02",
    title: "設計から施工まで、自社で進めます。",
    summary: "土地の分譲・設計・施工・アフターを、外に投げていません。",
    body: "間に入る会社がないので、仲介マージンも乗りません。",
  },
  {
    num: "03",
    title: "広告は、地元だけ。",
    summary: "全国TVCM、全国紙、折込広告の全国展開は行っていません。",
    body: "届けるべき人に届く範囲だけで出しています。",
  },
] as const;

// ────────────────────────────────────────────────
// Compare Bar
// ────────────────────────────────────────────────

function CompareBar() {
  return (
    <div className="relative">
      <div className="space-y-7 md:space-y-9">
        {COMPARISON.map((c) => {
          const pct = (c.amount / COMPARE_MAX) * 100;
          const isHero = c.tone === "hero";
          return (
            <div key={c.id}>
              {/* ラベル行 — mobile: ラベル+サブラベル縦積み、右に金額 / desktop: 1行 */}
              <div className="flex items-start md:items-baseline justify-between gap-3 mb-2.5">
                <div className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-3 min-w-0">
                  <span
                    className={`font-sans font-bold whitespace-nowrap ${
                      isHero
                        ? "text-text-primary text-[15px] md:text-[17px]"
                        : "text-text-primary/80 text-[14px] md:text-[15px]"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span className="font-sans text-text-secondary text-[11px] md:text-[12px] leading-[1.6]">
                    {c.sub}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 shrink-0">
                  <span
                    className={`font-oswald font-light tabular-nums ${
                      isHero
                        ? "text-[28px] md:text-[40px] text-lime-deep"
                        : "text-[22px] md:text-[30px] text-text-primary/60"
                    }`}
                    style={{ letterSpacing: "-0.02em", lineHeight: 0.9 }}
                  >
                    {c.amount.toLocaleString()}
                  </span>
                  <span className="font-sans text-text-primary/70 text-xs md:text-sm">万円〜</span>
                </div>
              </div>
              {/* 帯 */}
              <div className="relative h-3.5 md:h-4 bg-text-primary/5">
                <div
                  className={`h-full ${
                    isHero ? "bg-lime-deep" : "bg-text-primary/35"
                  } transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
                  style={{ width: `${pct}%` }}
                  aria-label={`${c.label} ${c.amount}万円`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 差額 */}
      <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-text-primary/15 flex items-baseline justify-end gap-2 md:gap-3">
        <span className="font-sans text-text-secondary text-xs md:text-sm pr-3 md:pr-4">差額</span>
        <span
          className="font-oswald font-light tabular-nums text-lime-deep"
          style={{
            fontSize: "clamp(36px, 5vw, 72px)",
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
          }}
        >
          −1,720
        </span>
        <span className="font-sans font-bold text-text-primary text-lg md:text-2xl">
          万円
        </span>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// Mechanism Card
// ────────────────────────────────────────────────

function MechanismCard({ m }: { m: Mechanism }) {
  return (
    <article className="scroll-in group flex flex-col p-7 md:p-8 bg-white border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.12)]">
      <span
        className="font-oswald font-light leading-none tabular-nums text-lime-deep"
        style={{
          fontSize: "clamp(24px, 2.2vw, 34px)",
          letterSpacing: "-0.02em",
        }}
      >
        {m.num}
      </span>
      <h3 className="mt-5 md:mt-6 font-sans font-bold text-text-primary text-[16px] md:text-[18px] leading-[1.55] tracking-[0.01em]">
        {m.title}
      </h3>
      <p className="mt-4 font-sans text-text-primary/80 text-[13px] md:text-[14px] leading-[1.95]">
        {m.summary}
      </p>
      <p className="mt-3 font-sans text-text-secondary text-[12px] md:text-[13px] leading-[1.95]">
        {m.body}
      </p>
    </article>
  );
}

// ────────────────────────────────────────────────
// メイン
// ────────────────────────────────────────────────

export default function MechanismEnhanced() {
  // 3 つの MechanismCard に .scroll-in が付いているため stagger=true で子要素も観測
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-bg-secondary text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
        {/* ========== Heading ========== */}
        <header className="mb-12 md:mb-16 max-w-[860px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "var(--display-lg)" }}
          >
            当社が特別安いわけではありません
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[2.0] max-w-[680px]">
            大手と同じ素材、同じ性能です。
            違うのは、<span className="font-bold">届けるまでの費用</span>だけ。
            <br className="hidden md:inline" />
            京モデル30坪で、その差は
            <span className="font-bold text-lime-deep">1,720万円</span>
            になります。
          </p>
        </header>

        {/* ========== 比較バー ========== */}
        <div className="mt-6">
          <CompareBar />
        </div>

        {/* ========== 3つの仕組み ========== */}
        <div className="mt-24 md:mt-32">
          <header className="mb-10 md:mb-14 max-w-[860px]">
            <h3
              className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
              style={{ fontSize: "var(--display-md)" }}
            >
              この差は、3 つの仕組みから。
            </h3>
            <p className="mt-4 md:mt-5 font-sans text-text-secondary text-[clamp(14px,1.05vw,16px)] leading-[1.95] max-w-[580px]">
              後から削るのではなく、最初から、家そのもの以外を乗せていません。
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {MECHANISMS.map((m) => (
              <MechanismCard key={m.num} m={m} />
            ))}
          </div>
        </div>

        {/* ========== 注記 ========== */}
        <div className="mt-10 md:mt-14 font-sans text-text-secondary text-[11px] md:text-[12px] leading-[1.9]">
          <p>※ 大手 4,000万円は業界平均の費用構造試算による参考値です。</p>
          <p>※ やまと 2,280万円は京モデル30坪・4LDKの税込・建物本体 + 付帯工事価格です。</p>
        </div>
      </div>
    </section>
  );
}
