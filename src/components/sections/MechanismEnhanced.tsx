"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  MechanismEnhanced — 2026-05-04 v3 (比較ダッシュボード + 標準仕様チップ)
  ---------------------------------------------------------------
  v2: 横帯比較 + 3つの仕組みカード(明朝ゼロ路線)
  v3: 「参考差額 約1,720万円」を主役KPIに昇格、標準仕様チップを新規追加。
      「展示場を二重利用」「外に投げていません」など硬い表現を排除。

  ユーザー指摘(2026-05-04):
  - 価格差・標準仕様・条件・理由が同じ重さで散らばっていて瞬間理解が難しい
  - 「価格だけでなく標準仕様まで比べてください」と言いながら標準仕様の証拠が薄い
  - 「差額 −1,720万円」のマイナス記号は誤読の元 → 「参考差額 約1,720万円」へ

  新構成:
  1. ヘッダー
  2. 比較ダッシュボード(横棒2本 + 大型参考差額カード)
  3. 標準仕様チップ8項目(新規)
  4. 比較条件(含まれるもの / 別途のもの)
  5. 価格を抑えられる3つの理由
*/

// ────────────────────────────────────────────────
// データ
// ────────────────────────────────────────────────

const COMPARE_MAX = 4000; // 大手の参考値(万円)

const COMPARISON = [
  {
    id: "majors",
    label: "大手ハウスメーカー参考価格",
    sub: "広告費・展示場維持費・仲介マージンを含む",
    amount: 4000,
    tone: "muted" as const,
  },
  {
    id: "yamato",
    label: "やまと不動産 京モデル",
    sub: "建物本体と、付帯工事まで",
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
    title: "モデルハウスを、販売住宅として活用",
    summary:
      "展示専用の建物を持たず、分譲地に建てた住宅をモデルハウスとしてご案内。",
    body: "展示場の維持費を抑え、その分を価格に反映しています。",
  },
  {
    num: "02",
    title: "土地・設計・施工を、自社で連携",
    summary:
      "土地探しから設計、施工、アフターまで自社で連携しています。",
    body: "間に入る会社が少ない分、中間コストを抑えています。",
  },
  {
    num: "03",
    title: "広告費を、地域に必要な範囲へ",
    summary:
      "全国向けの大きな広告ではなく、奈良・京都南部のお客様に届く範囲で。",
    body: "過度な広告費を抑え、適正価格を実現しています。",
  },
] as const;

const INCLUDED_ITEMS = [
  "建物本体(京モデル30坪・4LDK)",
  "標準付帯工事",
  "地盤改良費(最大150万円まで当社負担)",
  "仲介手数料(当社分譲地の場合)",
  "設計・申請費用／消費税",
] as const;

const EXCLUDED_ITEMS = [
  "土地代(エリアにより500万円台〜)",
  "登記費用・印紙税・ローン手数料",
  "外構工事(ご要望の内容により)",
  "引越し費用・家具家電",
] as const;

// ────────────────────────────────────────────────
// 比較ダッシュボード
// ────────────────────────────────────────────────

function ComparisonDashboard() {
  // 画面入域でバーを 0% → pct% にイージングで伸ばす
  const containerRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setAnimate(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.25) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold: [0, 0.25, 1] },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="bg-white border border-text-primary/10 rounded-lg p-6 md:p-10 shadow-[0_8px_24px_-16px_rgba(0,0,0,0.08)]">
      {/* 条件ラベル */}
      <p className="font-inter text-[10px] md:text-[11px] tracking-[0.18em] uppercase text-text-secondary font-bold mb-5 md:mb-6">
        同条件30坪・4LDKで比較(建物本体＋標準付帯工事)
      </p>

      {/* 横棒2本 */}
      <div className="space-y-5 md:space-y-7 mb-8 md:mb-10">
        {COMPARISON.map((c, i) => {
          const pct = (c.amount / COMPARE_MAX) * 100;
          const isHero = c.tone === "hero";
          return (
            <div key={c.id}>
              <div className="flex items-baseline justify-between gap-3 mb-2">
                <div className="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-3 min-w-0">
                  <span
                    className={`font-sans whitespace-nowrap ${
                      isHero
                        ? "text-text-primary text-[14px] md:text-[16px] font-bold"
                        : "text-text-primary/80 text-[13px] md:text-[15px] font-medium"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span className="font-sans text-text-secondary text-[10.5px] md:text-[11px] leading-[1.6]">
                    {c.sub}
                  </span>
                </div>
                <div className="flex items-baseline gap-1 shrink-0">
                  <span
                    className={`font-oswald tabular-nums ${
                      isHero
                        ? "text-[26px] md:text-[34px] text-lime-deep"
                        : "text-[22px] md:text-[28px] text-text-primary/55"
                    }`}
                    style={{
                      fontWeight: 400,
                      letterSpacing: "-0.02em",
                      lineHeight: 0.9,
                    }}
                  >
                    {c.amount.toLocaleString()}
                  </span>
                  <span className="font-sans text-text-primary/70 text-xs md:text-sm">
                    万円〜
                  </span>
                </div>
              </div>
              <div className="relative h-2.5 md:h-3 bg-text-primary/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    isHero ? "bg-lime-deep" : "bg-text-primary/30"
                  } transition-[width] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
                  style={{
                    width: animate ? `${pct}%` : "0%",
                    transitionDelay: `${i * 200 + 200}ms`,
                  }}
                  aria-label={`${c.label} ${c.amount}万円`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* 参考差額 — 主役KPI */}
      <div
        className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-center pt-7 md:pt-9 border-t-2"
        style={{ borderColor: "rgba(72,107,0,0.18)" }}
      >
        <div className="flex items-baseline gap-2 md:gap-3">
          <span
            className="inline-flex items-center justify-center px-2.5 py-1 text-[10px] md:text-[11px] font-bold tracking-[0.08em] rounded shrink-0"
            style={{
              background: "rgba(72,107,0,0.10)",
              color: "#486B00",
            }}
          >
            参考差額
          </span>
          <span className="font-sans text-text-primary/80 text-[14px] md:text-[16px] font-bold">
            約
          </span>
          <span
            className="font-oswald tabular-nums text-lime-deep"
            style={{
              fontWeight: 400,
              fontSize: "clamp(36px, 5.5vw, 76px)",
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
            }}
          >
            1,720
          </span>
          <span className="font-sans font-bold text-text-primary text-lg md:text-2xl">
            万円
          </span>
        </div>
        <p className="font-sans text-text-secondary text-[11px] md:text-[12px] leading-[1.85]">
          京モデル30坪の場合、当社試算で大手ハウスメーカー参考価格と比べたときの差額の目安です。
          価格は仕様・敷地条件・時期により異なります。
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 含まれるもの・別途のもの
// ────────────────────────────────────────────────

function ConditionLists() {
  return (
    <div className="bg-bg-primary border border-text-primary/10 rounded-lg p-6 md:p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div>
          <p className="font-sans font-bold text-lime-deep text-[13px] md:text-[14px] mb-4">
            2,280万円に含まれるもの
          </p>
          <ul className="space-y-2.5">
            {INCLUDED_ITEMS.map((t) => (
              <li
                key={t}
                className="font-sans flex items-baseline gap-2.5 text-text-primary text-[13px] md:text-[14px] leading-[1.7]"
              >
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-lime-deep text-white"
                  style={{ fontSize: "10px", fontWeight: 700 }}
                >
                  ✓
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:border-l md:border-text-primary/10 md:pl-12">
          <p className="font-sans font-bold text-text-secondary text-[13px] md:text-[14px] mb-4">
            別途となるもの
          </p>
          <ul className="space-y-2.5">
            {EXCLUDED_ITEMS.map((t) => (
              <li
                key={t}
                className="font-sans flex items-baseline gap-2.5 text-text-primary/85 text-[13px] md:text-[14px] leading-[1.7]"
              >
                <span
                  aria-hidden
                  className="shrink-0 inline-flex items-center justify-center w-4 h-4 rounded-full bg-text-primary/10 text-text-secondary"
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  −
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="font-sans text-text-secondary text-[12px] md:text-[12.5px] mt-6 pt-5 border-t border-text-primary/10 leading-[1.95]">
        ※ 大手の4,000万円は、大手ハウスメーカー数社の公表坪単価から試算した参考値です。各社の仕様・地域・商品ラインにより異なります。
      </p>
    </div>
  );
}

// ────────────────────────────────────────────────
// 3つの理由カード
// ────────────────────────────────────────────────

function MechanismCard({ m }: { m: Mechanism }) {
  return (
    <article className="scroll-in group flex flex-col p-7 md:p-8 bg-white border border-text-primary/10 rounded-lg transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_20px_40px_-24px_rgba(0,0,0,0.12)]">
      <span
        className="font-oswald font-light leading-none tabular-nums text-lime-deep"
        style={{
          fontSize: "clamp(24px, 2.2vw, 34px)",
          letterSpacing: "-0.02em",
        }}
      >
        {m.num}
      </span>
      <h3 className="mt-5 md:mt-6 font-sans font-bold text-text-primary text-[15px] md:text-[17px] leading-[1.55] tracking-[0.01em]">
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
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-bg-secondary text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
        {/* ========== ヘッダー ========== */}
        <header className="mb-10 md:mb-14 max-w-[860px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "var(--display-lg)" }}
          >
            価格だけでなく、
            <br className="sm:hidden" />
            標準仕様まで比べてください。
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[2.0] max-w-[680px]">
            キッチン、浴室、窓、外壁、断熱、耐震性能まで。
            やまと不動産では、暮らしの快適さと安心に関わる部分を、
            <span className="font-bold">標準仕様</span>
            として大切にしています。
            <br />
            見直しているのは、家そのものではなく、
            <span className="font-bold">広告費・展示場維持費・中間コスト</span>
            です。
          </p>
        </header>

        {/* ========== 比較ダッシュボード(主役) ========== */}
        <ComparisonDashboard />

        {/* ========== 含まれるもの・別途のもの ========== */}
        <div className="mt-8 md:mt-10">
          <ConditionLists />
        </div>

        {/* 標準仕様の証拠は、PerformanceGrid セクションで設備+性能を一括提示 */}

        {/* ========== 価格を抑えられる、3つの理由 ========== */}
        <div className="mt-20 md:mt-28">
          <header className="mb-10 md:mb-14 max-w-[860px]">
            <h3
              className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
              style={{ fontSize: "var(--display-md)" }}
            >
              価格を抑えられる、3つの理由。
            </h3>
            <p className="mt-4 md:mt-5 font-sans text-text-secondary text-[clamp(14px,1.05vw,16px)] leading-[1.95] max-w-[580px]">
              家づくりに直接関係しないコストを、できる限り抑えています。
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
            {MECHANISMS.map((m) => (
              <MechanismCard key={m.num} m={m} />
            ))}
          </div>
        </div>

        {/* ========== 注記 ========== */}
        <div className="mt-12 md:mt-16 pl-3 border-l-2 border-text-primary/15 font-sans text-text-secondary text-[12px] md:text-[12.5px] leading-[1.95] space-y-1.5">
          <p>※ やまとの2,280万円は、京モデル30坪・4LDKの税込・建物本体＋付帯工事の価格です。</p>
          <p>※ 比較条件と「含まれるもの／別途費用」は、上の比較条件ブロックをご参照ください。</p>
        </div>
      </div>
    </section>
  );
}
