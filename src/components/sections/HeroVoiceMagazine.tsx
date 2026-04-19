"use client";

/**
 * HeroVoiceMagazine — v20「静かな信頼」編集型（CSS Grid 12×16 baseline）
 * ----------------------------------------------------------------------
 * 方針:
 *   - タイポグラフィ: Noto Serif JP 400-500 (感情) × Noto Sans JP 400 (観察) × Inter 500 (メタ)
 *   - カラー: Oak Brown / Warm Amber / Forest Green / Charcoal / Linen White (やまとブランド)
 *   - レイアウト: CSS Grid 12 col × 16 row baseline（absolute 寄せ集め廃止）
 *   - 2026 trend: 既存 grain-overlay (noise) を継承。追加装飾なし = 静けさ
 *
 * 感情導線:
 *   Pain (Oak 過去) → Decision (Amber 黄金) → After (Forest 継続) → 結論 (Charcoal 縦組 spine)
 *
 * design-critic 改善項目 (v19 → v20):
 *   - Noto Sans JP 900 一辺倒 → Serif × Sans 2 フォント対比
 *   - Neo Japan ビビッド信号色 → やまと和モダンパレット
 *   - absolute 寄せ集め → CSS Grid 12×16 baseline
 */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";

/* ---------- prefers-reduced-motion ---------- */
const PREFERS_REDUCED_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(PREFERS_REDUCED_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function getReducedMotionSnapshot() {
  return window.matchMedia(PREFERS_REDUCED_QUERY).matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

/* ---------- reveal hook ---------- */
function useRevealContainer<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return { ref, visible: reduced || visible };
}

/* ---------- デザイントークン（やまと F-1〜F-8 準拠） ---------- */
const TOKENS = {
  // Colors
  bg:      "#FAFAF7",
  ink:     "#1C1C1C",
  sub:     "#777777",
  line:    "#D9D0BE",
  oak:     "#7B6544",   // Pain — 時間の重み
  amber:   "#C4851F",   // Decision — 黄金の瞬間
  forest:  "#6B8F71",   // After — 継続の安心

  // Font families
  serif:   "var(--font-noto-serif), 'Noto Serif JP', 'Hiragino Mincho ProN', 'Yu Mincho', serif",
  sans:    "var(--font-noto), 'Noto Sans JP', sans-serif",
  latin:   "var(--font-inter-var), 'Inter', sans-serif",
} as const;

/* ---------- アニメーション遅延（stagger） ---------- */
const DELAY = {
  headerL: 0,
  headerR: 80,
  pain1:   180,
  pain2:   260,
  hero1:   420,
  hero2:   540,
  attr:    700,
  spineMeta: 380,
  spine:   500,
  sat1:    760,
  sat2:    820,
  sat3:    880,
  sat4:    940,
  sat5:    1000,
  sat6:    1060,
  footer:  1160,
  cta:     1220,
} as const;

/* ---------- Reveal スタイルヘルパー ---------- */
function revealStyle(visible: boolean, delay: number, translateY = 12): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${translateY}px,0)`,
    transition:
      "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 800ms cubic-bezier(0.16,1,0.3,1)",
    transitionDelay: `${delay}ms`,
  };
}

/* =============================================================================
   PC レイアウト: CSS Grid 12 col × 16 row
   ========================================================================== */
function VoiceGridPC({ visible }: { visible: boolean }) {
  return (
    <div
      className="relative hidden h-full w-full md:block"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        gridTemplateRows: "repeat(17, 1fr)",
        columnGap: "clamp(12px, 1.4vw, 24px)",
        rowGap: "0",
        padding: "clamp(20px, 3vw, 56px) clamp(20px, 4vw, 72px)",
      }}
    >
      {/* ===== ヘッダー: Latin caps + JP subtitle ===== */}
      <div style={{ gridColumn: "1 / 5", gridRow: "1", alignSelf: "end", ...revealStyle(visible, DELAY.headerL) }}>
        <div
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: TOKENS.sub,
          }}
        >
          Voice — Testimonials
        </div>
        <div
          style={{
            fontFamily: TOKENS.serif,
            fontSize: "clamp(18px, 1.6vw, 22px)",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: TOKENS.ink,
            marginTop: 4,
          }}
        >
          お客様の声
        </div>
      </div>

      <div style={{ gridColumn: "8 / 13", gridRow: "1", alignSelf: "end", textAlign: "right", ...revealStyle(visible, DELAY.headerR) }}>
        <div
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "11px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: TOKENS.sub,
          }}
        >
          No. 04 — 2026 Spring
        </div>
        <div
          style={{
            fontFamily: TOKENS.serif,
            fontSize: "13px",
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: TOKENS.ink,
            marginTop: 4,
          }}
        >
          やまと不動産 / 奈良・京都
        </div>
      </div>

      {/* 区切り罫線（row 2 下部、全幅） */}
      <div
        style={{
          gridColumn: "1 / 13",
          gridRow: "2",
          alignSelf: "end",
          borderBottom: `1px solid ${TOKENS.line}`,
          ...revealStyle(visible, 150),
        }}
      />

      {/* ============================================================
         Chapter 1 ── 問題: 「2 年探したが、見つからなかった」
         Pain 1 = 物語の起点（問題提起）
         Pain 2 = whisper echo（Pain 1 の補足 / 比較）
         ============================================================ */}
      <Link
        href="/voice/199927"
        style={{
          gridColumn: "1 / 8",
          gridRow: "4 / 5",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(26px, 2.8vw, 40px)",
          fontWeight: 400,
          lineHeight: 1.25,
          letterSpacing: "0.01em",
          color: TOKENS.oak,
          textDecoration: "none",
          ...revealStyle(visible, DELAY.pain1),
        }}
      >
        「2年、見つからなかった。」
      </Link>

      <Link
        href="/voice/279070"
        style={{
          gridColumn: "1 / 7",
          gridRow: "5 / 6",
          alignSelf: "start",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(13px, 1.1vw, 16px)",
          fontWeight: 400,
          lineHeight: 1.4,
          letterSpacing: "0.04em",
          color: TOKENS.oak,
          opacity: 0.7,
          textDecoration: "none",
          paddingLeft: "clamp(14px, 1.4vw, 24px)",
          ...revealStyle(visible, DELAY.pain2),
        }}
      >
        ──── 「他社は、標準が低かった。」
      </Link>

      {/* ============================================================
         Chapter 2 ── 転機: 諦めかけた時、やまとに 出会えた。
         pivot を 76px で Hero の次に大きく。物語の 2 つ目の punch
         ============================================================ */}
      <div
        style={{
          gridColumn: "1 / 5",
          gridRow: "7 / 8",
          alignSelf: "center",
          fontFamily: TOKENS.sans,
          fontSize: "clamp(13px, 1.1vw, 15px)",
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: TOKENS.sub,
          ...revealStyle(visible, 620),
        }}
      >
        諦めかけた時、
      </div>

      <Link
        href="/voice/216803"
        style={{
          gridColumn: "1 / 8",
          gridRow: "7 / 9",
          alignSelf: "end",
          justifySelf: "start",
          marginLeft: "clamp(60px, 8vw, 140px)",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(40px, 4.8vw, 76px)",
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          color: TOKENS.amber,
          textDecoration: "none",
          ...revealStyle(visible, 700, 18),
        }}
      >
        出会えた。
      </Link>

      {/* ============================================================
         Chapter 3 ── 感情の頂点（HERO）: 「ここに住みたい、」
         主役は line 1（欲求の表明）。line 2「と思えた。」は反芻として 1/3 サイズ
         narrative 接続詞「そして、」を小さく前置きして 2→3 章の繋ぎに
         ============================================================ */}
      <div
        style={{
          gridColumn: "1 / 5",
          gridRow: "9 / 10",
          alignSelf: "end",
          fontFamily: TOKENS.sans,
          fontSize: "clamp(13px, 1.1vw, 15px)",
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: TOKENS.sub,
          marginTop: "clamp(12px, 1.2vw, 20px)",
          ...revealStyle(visible, 820),
        }}
      >
        そして、初めての見学で。
      </div>

      <div
        style={{
          gridColumn: "1 / 12",
          gridRow: "10 / 13",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(72px, 9vw, 132px)",
          fontWeight: 500,
          lineHeight: 1.02,
          letterSpacing: "-0.01em",
          color: TOKENS.ink,
          ...revealStyle(visible, DELAY.hero1, 24),
        }}
      >
        「ここに住みたい、
      </div>

      <Link
        href="/voice/202180"
        style={{
          gridColumn: "3 / 10",
          gridRow: "13 / 14",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(28px, 3vw, 44px)",
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: "0em",
          color: TOKENS.amber,
          textDecoration: "none",
          ...revealStyle(visible, DELAY.hero2, 20),
        }}
      >
        と思えた。」
      </Link>

      <div
        style={{
          gridColumn: "3 / 9",
          gridRow: "14 / 15",
          alignSelf: "start",
          fontFamily: TOKENS.sans,
          fontSize: "12px",
          fontWeight: 400,
          letterSpacing: "0.08em",
          color: TOKENS.sub,
          paddingTop: 6,
          ...revealStyle(visible, DELAY.attr),
        }}
      >
        — 奈良市 M様邸（30代ご夫婦・土地探し 2年）
      </div>

      {/* ===== 縦組 spine: 「正解だったと、言える。」 ===== */}
      <div
        style={{
          gridColumn: "11 / 13",
          gridRow: "3 / 15",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          paddingRight: "clamp(4px, 0.6vw, 10px)",
          borderRight: `1px solid ${TOKENS.line}`,
          ...revealStyle(visible, DELAY.spineMeta),
        }}
      >
        <div
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: TOKENS.sub,
            marginBottom: 16,
            writingMode: "horizontal-tb",
          }}
        >
          結論 · Conclusion
        </div>
        <Link
          href="/voice/199927"
          style={{
            writingMode: "vertical-rl",
            textOrientation: "mixed",
            fontFamily: TOKENS.serif,
            fontSize: "clamp(36px, 4vw, 58px)",
            fontWeight: 600,
            lineHeight: 1.6,
            letterSpacing: "0.08em",
            color: TOKENS.ink,
            textDecoration: "none",
            ...revealStyle(visible, DELAY.spine, 0),
          }}
        >
          正解だったと、言える。
        </Link>
      </div>

      {/* ============================================================
         Chapter 4 ── 理由: なぜ「住みたい」と思えたのか
         「なぜなら、」で因果を明示。2 つの理由を並列表示
         ============================================================ */}
      <div
        style={{
          gridColumn: "1 / 4",
          gridRow: "15 / 16",
          alignSelf: "start",
          fontFamily: TOKENS.sans,
          fontSize: "clamp(13px, 1.1vw, 15px)",
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: TOKENS.sub,
          ...revealStyle(visible, 1040),
        }}
      >
        なぜなら、
      </div>

      <Link
        href="/voice/208787"
        style={{
          gridColumn: "1 / 5",
          gridRow: "15 / 16",
          alignSelf: "end",
          fontFamily: TOKENS.sans,
          fontSize: "clamp(17px, 1.5vw, 22px)",
          fontWeight: 500,
          lineHeight: 1.35,
          letterSpacing: "0.03em",
          color: TOKENS.ink,
          textDecoration: "none",
          ...revealStyle(visible, DELAY.sat2),
        }}
      >
        嘘のない、標準仕様だった。
      </Link>

      <Link
        href="/voice/208787"
        style={{
          gridColumn: "5 / 8",
          gridRow: "15 / 16",
          alignSelf: "end",
          fontFamily: TOKENS.sans,
          fontSize: "clamp(16px, 1.4vw, 20px)",
          fontWeight: 400,
          letterSpacing: "0.03em",
          color: TOKENS.forest,
          textDecoration: "none",
          ...revealStyle(visible, DELAY.sat3),
        }}
      >
        追加費用は、ゼロだった。
      </Link>

      {/* ============================================================
         Chapter 5 ── アフター: 建てた後も、続く安心
         「そして今も、」で時間の継続を示す narrative 接続
         ============================================================ */}
      <div
        style={{
          gridColumn: "1 / 4",
          gridRow: "16 / 17",
          alignSelf: "start",
          fontFamily: TOKENS.sans,
          fontSize: "clamp(13px, 1.1vw, 15px)",
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: TOKENS.sub,
          paddingTop: "clamp(4px, 0.6vw, 8px)",
          ...revealStyle(visible, 1100),
        }}
      >
        そして今も、
      </div>

      <Link
        href="/voice/256807"
        style={{
          gridColumn: "1 / 7",
          gridRow: "16 / 17",
          alignSelf: "end",
          fontFamily: TOKENS.sans,
          fontSize: "clamp(17px, 1.5vw, 22px)",
          fontWeight: 500,
          letterSpacing: "0.03em",
          color: TOKENS.forest,
          textDecoration: "underline",
          textDecorationColor: TOKENS.forest,
          textDecorationThickness: "2px",
          textUnderlineOffset: "0.25em",
          ...revealStyle(visible, DELAY.sat4),
        }}
      >
        いつでも、駆けつけてくれる。
      </Link>

      {/* ===== フッター罫線 ===== */}
      <div
        style={{
          gridColumn: "1 / 13",
          gridRow: "17",
          alignSelf: "start",
          borderTop: `1px solid ${TOKENS.line}`,
          ...revealStyle(visible, DELAY.footer),
        }}
      />

      {/* ===== フッター左: 出典 ===== */}
      <div
        style={{
          gridColumn: "1 / 8",
          gridRow: "17",
          alignSelf: "center",
          fontFamily: TOKENS.sans,
          fontSize: "12px",
          fontWeight: 400,
          letterSpacing: "0.06em",
          color: TOKENS.sub,
          paddingTop: 12,
          ...revealStyle(visible, DELAY.footer),
        }}
      >
        奈良市・斑鳩町・京田辺市・生駒市 ほか、お客様 9 組の声より（2024–2026 竣工）
      </div>

      {/* ===== CTA: すべての声を読む → ===== */}
      <Link
        href="/voice"
        style={{
          gridColumn: "8 / 13",
          gridRow: "17",
          alignSelf: "center",
          justifySelf: "end",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(14px, 1.2vw, 17px)",
          fontWeight: 500,
          letterSpacing: "0.06em",
          color: TOKENS.ink,
          textDecoration: "none",
          borderBottom: `1.5px solid ${TOKENS.amber}`,
          paddingTop: 12,
          paddingBottom: 4,
          transition: "color 400ms cubic-bezier(0.16,1,0.3,1)",
          ...revealStyle(visible, DELAY.cta),
        }}
        className="voice-cta-link"
      >
        すべての声を読む <span style={{ fontFamily: TOKENS.latin, color: TOKENS.amber, marginLeft: 6 }}>→</span>
      </Link>
    </div>
  );
}

/* =============================================================================
   Mobile レイアウト: CSS Grid 6 col × 18 row
   ========================================================================== */
function VoiceGridMB({ visible }: { visible: boolean }) {
  return (
    <div
      className="relative h-full w-full md:hidden"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridTemplateRows: "repeat(18, 1fr)",
        columnGap: "8px",
        rowGap: 0,
        padding: "clamp(16px, 5vw, 24px) clamp(16px, 5vw, 20px)",
      }}
    >
      {/* ===== ヘッダー ===== */}
      <div style={{ gridColumn: "1 / 4", gridRow: "1 / 2", alignSelf: "end", ...revealStyle(visible, DELAY.headerL) }}>
        <div
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: TOKENS.sub,
          }}
        >
          Voice
        </div>
        <div
          style={{
            fontFamily: TOKENS.serif,
            fontSize: "15px",
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: TOKENS.ink,
            marginTop: 2,
          }}
        >
          お客様の声
        </div>
      </div>

      <div style={{ gridColumn: "4 / 7", gridRow: "1 / 2", alignSelf: "end", textAlign: "right", ...revealStyle(visible, DELAY.headerR) }}>
        <div
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: TOKENS.sub,
          }}
        >
          No. 04 / 2026
        </div>
      </div>

      {/* 罫線 */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "2",
          alignSelf: "end",
          borderBottom: `1px solid ${TOKENS.line}`,
          ...revealStyle(visible, 150),
        }}
      />

      {/* ============ Ch.1 問題 ============ */}
      <Link
        href="/voice/199927"
        style={{
          gridColumn: "1 / 7",
          gridRow: "3 / 4",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(22px, 6vw, 28px)",
          fontWeight: 400,
          lineHeight: 1.25,
          letterSpacing: "0.01em",
          color: TOKENS.oak,
          textDecoration: "none",
          ...revealStyle(visible, DELAY.pain1),
        }}
      >
        「2年、見つからなかった。」
      </Link>

      <Link
        href="/voice/279070"
        style={{
          gridColumn: "1 / 7",
          gridRow: "4 / 5",
          alignSelf: "start",
          fontFamily: TOKENS.serif,
          fontSize: "13px",
          fontWeight: 400,
          lineHeight: 1.4,
          letterSpacing: "0.04em",
          color: TOKENS.oak,
          opacity: 0.75,
          textDecoration: "none",
          paddingLeft: "10%",
          ...revealStyle(visible, DELAY.pain2),
        }}
      >
        ──── 「他社は、標準が低かった。」
      </Link>

      {/* ============ Ch.2 転機: 諦めかけた時 → 出会えた。 ============ */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "5 / 6",
          alignSelf: "center",
          fontFamily: TOKENS.sans,
          fontSize: "12px",
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: TOKENS.sub,
          ...revealStyle(visible, 560),
        }}
      >
        諦めかけた時、
      </div>

      <Link
        href="/voice/216803"
        style={{
          gridColumn: "1 / 7",
          gridRow: "6 / 8",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(40px, 12vw, 58px)",
          fontWeight: 500,
          lineHeight: 1.05,
          letterSpacing: "-0.01em",
          color: TOKENS.amber,
          textDecoration: "none",
          paddingLeft: "8%",
          ...revealStyle(visible, 640, 20),
        }}
      >
        出会えた。
      </Link>

      {/* ============ Ch.3 頂点: 「ここに住みたい、」(主) + と思えた。(従) ============ */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "8 / 9",
          alignSelf: "end",
          fontFamily: TOKENS.sans,
          fontSize: "12px",
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: TOKENS.sub,
          ...revealStyle(visible, 780),
        }}
      >
        そして、初めての見学で。
      </div>

      {/* HERO line 1-a: 「ここに (主役の 1 行目) */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "9 / 10",
          alignSelf: "end",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(44px, 15vw, 62px)",
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.01em",
          color: TOKENS.ink,
          whiteSpace: "nowrap",
          ...revealStyle(visible, DELAY.hero1, 24),
        }}
      >
        「ここに
      </div>

      {/* HERO line 1-b: 住みたい、(主役の 2 行目) */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "10 / 11",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(44px, 15vw, 62px)",
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.01em",
          color: TOKENS.ink,
          whiteSpace: "nowrap",
          paddingLeft: "8%",
          ...revealStyle(visible, DELAY.hero1 + 60, 24),
        }}
      >
        住みたい、
      </div>

      {/* HERO line 2: と思えた。」(反芻・小・Amber) */}
      <Link
        href="/voice/202180"
        style={{
          gridColumn: "1 / 7",
          gridRow: "11 / 12",
          alignSelf: "start",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(22px, 6.5vw, 28px)",
          fontWeight: 400,
          lineHeight: 1.2,
          letterSpacing: "0em",
          color: TOKENS.amber,
          textDecoration: "none",
          whiteSpace: "nowrap",
          paddingLeft: "16%",
          paddingTop: 8,
          ...revealStyle(visible, DELAY.hero2, 18),
        }}
      >
        と思えた。」
      </Link>

      {/* Hero attribution */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "12 / 13",
          alignSelf: "center",
          fontFamily: TOKENS.sans,
          fontSize: "11px",
          letterSpacing: "0.08em",
          color: TOKENS.sub,
          paddingLeft: "12%",
          ...revealStyle(visible, DELAY.attr),
        }}
      >
        — 奈良市 M様邸（30代ご夫婦・土地探し 2年）
      </div>

      {/* ============ Ch.4 理由 ============ */}
      <div
        style={{
          gridColumn: "1 / 4",
          gridRow: "13 / 14",
          alignSelf: "start",
          fontFamily: TOKENS.sans,
          fontSize: "12px",
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: TOKENS.sub,
          ...revealStyle(visible, 960),
        }}
      >
        なぜなら、
      </div>

      <Link
        href="/voice/208787"
        style={{
          gridColumn: "1 / 7",
          gridRow: "13 / 14",
          alignSelf: "end",
          fontFamily: TOKENS.sans,
          fontSize: "17px",
          fontWeight: 500,
          letterSpacing: "0.03em",
          color: TOKENS.ink,
          textDecoration: "none",
          ...revealStyle(visible, DELAY.sat2),
        }}
      >
        嘘のない、標準仕様だった。
      </Link>

      <Link
        href="/voice/208787"
        style={{
          gridColumn: "1 / 7",
          gridRow: "14 / 15",
          alignSelf: "center",
          fontFamily: TOKENS.sans,
          fontSize: "16px",
          fontWeight: 400,
          letterSpacing: "0.03em",
          color: TOKENS.forest,
          textDecoration: "none",
          paddingLeft: "6%",
          ...revealStyle(visible, DELAY.sat3),
        }}
      >
        追加費用は、ゼロだった。
      </Link>

      {/* ============ Ch.5 アフター ============ */}
      <div
        style={{
          gridColumn: "1 / 4",
          gridRow: "15 / 16",
          alignSelf: "start",
          fontFamily: TOKENS.sans,
          fontSize: "12px",
          fontWeight: 400,
          letterSpacing: "0.12em",
          color: TOKENS.sub,
          ...revealStyle(visible, 1020),
        }}
      >
        そして今も、
      </div>

      <Link
        href="/voice/256807"
        style={{
          gridColumn: "1 / 7",
          gridRow: "15 / 16",
          alignSelf: "end",
          fontFamily: TOKENS.sans,
          fontSize: "18px",
          fontWeight: 500,
          letterSpacing: "0.03em",
          color: TOKENS.forest,
          textDecoration: "underline",
          textDecorationColor: TOKENS.forest,
          textDecorationThickness: "2px",
          textUnderlineOffset: "0.25em",
          ...revealStyle(visible, DELAY.sat4),
        }}
      >
        いつでも、駆けつけてくれる。
      </Link>

      {/* ===== 縦組 spine 「正解だったと、言える。」モバイル版は横書きで "結論" を示す ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "16 / 17",
          alignSelf: "center",
          display: "flex",
          alignItems: "baseline",
          gap: 12,
          paddingTop: 16,
          borderTop: `1px solid ${TOKENS.line}`,
          ...revealStyle(visible, DELAY.spine),
        }}
      >
        <span
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: TOKENS.sub,
            whiteSpace: "nowrap",
          }}
        >
          結論
        </span>
        <Link
          href="/voice/199927"
          style={{
            fontFamily: TOKENS.serif,
            fontSize: "26px",
            fontWeight: 600,
            letterSpacing: "0.02em",
            color: TOKENS.ink,
            textDecoration: "none",
          }}
        >
          正解だったと、言える。
        </Link>
      </div>

      {/* ===== Footer ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "17 / 18",
          alignSelf: "center",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          paddingTop: 16,
          borderTop: `1px solid ${TOKENS.line}`,
          ...revealStyle(visible, DELAY.footer),
        }}
      >
        <span
          style={{
            fontFamily: TOKENS.sans,
            fontSize: "10px",
            letterSpacing: "0.06em",
            color: TOKENS.sub,
          }}
        >
          奈良・京都／お客様 9 組より
        </span>
        <Link
          href="/voice"
          style={{
            fontFamily: TOKENS.serif,
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            color: TOKENS.ink,
            textDecoration: "none",
            borderBottom: `1.5px solid ${TOKENS.amber}`,
            paddingBottom: 2,
          }}
        >
          すべて読む <span style={{ color: TOKENS.amber, fontFamily: TOKENS.latin }}>→</span>
        </Link>
      </div>
    </div>
  );
}

/* =============================================================================
   Main
   ========================================================================== */
export default function HeroVoiceMagazine() {
  const { ref: pcRef, visible: pcVisible } = useRevealContainer<HTMLDivElement>();
  const { ref: mbRef, visible: mbVisible } = useRevealContainer<HTMLDivElement>();

  return (
    <section
      aria-label="VOICE — やまと不動産 お客様の声"
      className="relative w-full"
      style={{
        backgroundColor: TOKENS.bg,
        color: TOKENS.ink,
        paddingTop: "110px",
      }}
    >
      {/* PC */}
      <div
        ref={pcRef}
        className="relative mx-auto hidden h-[calc(100svh-110px)] min-h-[720px] w-full max-w-[1600px] overflow-hidden md:block"
      >
        <VoiceGridPC visible={pcVisible} />
      </div>

      {/* Mobile */}
      <div
        ref={mbRef}
        className="relative h-[calc(100svh-110px)] min-h-[640px] w-full overflow-hidden md:hidden"
      >
        <VoiceGridMB visible={mbVisible} />
      </div>

      {/* CTA hover style */}
      <style jsx>{`
        :global(.voice-cta-link:hover) {
          color: ${TOKENS.amber};
        }
      `}</style>
    </section>
  );
}
