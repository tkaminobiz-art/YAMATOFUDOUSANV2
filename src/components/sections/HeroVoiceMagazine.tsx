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
   PC レイアウト: Pattern 1 (Hero Split 見開き型)
   ───────────────────────────────────────────────────────────────
   Grid: 12 col × 17 row
   左 cols 1-5: 写真（4:5 縦長ポートレイト、rows 3-15）
   右 cols 6-12: テキスト（Pain / Hero / 物語 / 結論 spine / CTA）
   col 13 の代わりに text 内で右寄せで spine を配置
   ───────────────────────────────────────────────────────────────
   写真: Pexels ID 6633448 by Cup of Couple
   https://www.pexels.com/photo/6633448/
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
      {/* ===== 写真（左 40%・rows 3-15、4:5 縦長・Pexels プレースホルダー） ===== */}
      <div
        style={{
          gridColumn: "1 / 6",
          gridRow: "3 / 16",
          position: "relative",
          overflow: "hidden",
          backgroundColor: TOKENS.bg,
          ...revealStyle(visible, 80),
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/6633448/pexels-photo-6633448.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800"
          alt="やまと不動産の施主邸イメージ — 和モダンな木のインテリア"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.94) contrast(1.02)",
            display: "block",
          }}
          loading="lazy"
        />
      </div>
      {/* ===== ヘッダー: Latin caps + JP subtitle ===== */}
      <div style={{ gridColumn: "1 / 6", gridRow: "1", alignSelf: "end", ...revealStyle(visible, DELAY.headerL) }}>
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
         HERO — 1 メッセージ・ドカン型（TORICHŌ / Full Editorial 思想）
         ============================================================ */}
      {/* エディトリアルメタ: 章番号 + 発話者地域 */}
      <div
        style={{
          gridColumn: "6 / 11",
          gridRow: "4 / 5",
          alignSelf: "end",
          display: "flex",
          alignItems: "center",
          gap: 12,
          ...revealStyle(visible, 200),
        }}
      >
        <span
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "11px",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "0.12em",
            color: TOKENS.sub,
          }}
        >
          No. 01 / 09
        </span>
        <span
          style={{
            width: 48,
            height: 1,
            backgroundColor: TOKENS.line,
          }}
        />
        <span
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: TOKENS.sub,
          }}
        >
          Nara / M-tei
        </span>
      </div>

      {/* HERO Line 1: ここに住みたい、 (photo と被らないよう col 6 開始) */}
      <div
        style={{
          gridColumn: "6 / 13",
          gridRow: "6 / 9",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(52px, 6vw, 92px)",
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: TOKENS.ink,
          zIndex: 3,
          whiteSpace: "nowrap",
          ...revealStyle(visible, 360, 24),
        }}
      >
        ここに住みたい、
      </div>

      {/* HERO Line 2: と思えた。(Amber・Hero の punch) */}
      <Link
        href="/voice/202180"
        style={{
          gridColumn: "6 / 13",
          gridRow: "9 / 12",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(60px, 6.8vw, 108px)",
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: TOKENS.amber,
          textDecoration: "none",
          zIndex: 3,
          whiteSpace: "nowrap",
          paddingLeft: "clamp(32px, 4vw, 72px)",
          ...revealStyle(visible, 460, 24),
        }}
      >
        と思えた。
      </Link>

      {/* サブ一行: 物語を一言で要約 */}
      <div
        style={{
          gridColumn: "6 / 12",
          gridRow: "12 / 13",
          alignSelf: "end",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(15px, 1.3vw, 18px)",
          fontWeight: 400,
          lineHeight: 1.7,
          letterSpacing: "0.03em",
          color: TOKENS.ink,
          paddingTop: 24,
          paddingLeft: "clamp(32px, 4vw, 72px)",
          ...revealStyle(visible, 600),
        }}
      >
        2年探して、ようやく出会えた。<br />
        土地も標準仕様も、全てが納得の住まいでした。
      </div>

      {/* Magazine caption 風 attribution */}
      <div
        style={{
          gridColumn: "6 / 12",
          gridRow: "13 / 14",
          alignSelf: "center",
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingLeft: "clamp(32px, 4vw, 72px)",
          ...revealStyle(visible, 700),
        }}
      >
        <span
          style={{
            width: 24,
            height: 1,
            backgroundColor: TOKENS.line,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: TOKENS.serif,
            fontSize: "12px",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "0.04em",
            color: TOKENS.sub,
          }}
        >
          奈良市 M様邸　／　30代ご夫婦　／　土地探し 2年
        </span>
      </div>

      {/* 矩形 CTA ボタン (TORICHŌ 風 Amber) — 写真の下部と揃える */}
      <Link
        href="/voice"
        style={{
          gridColumn: "6 / 10",
          gridRow: "15 / 16",
          alignSelf: "end",
          justifySelf: "start",
          marginLeft: "clamp(32px, 4vw, 72px)",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 28px",
          backgroundColor: TOKENS.amber,
          color: "#FFFFFF",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(14px, 1.2vw, 16px)",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textDecoration: "none",
          transition: "background-color 400ms cubic-bezier(0.16,1,0.3,1)",
          ...revealStyle(visible, 800),
        }}
        className="voice-primary-cta"
      >
        すべての声を読む
        <span style={{ fontFamily: TOKENS.latin }}>→</span>
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

      {/* ===== フッター右: 発行情報 ===== */}
      <div
        style={{
          gridColumn: "8 / 13",
          gridRow: "17",
          alignSelf: "center",
          justifySelf: "end",
          fontFamily: TOKENS.latin,
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: TOKENS.sub,
          paddingTop: 12,
          ...revealStyle(visible, DELAY.cta),
        }}
      >
        Editorial / Yamato Real Estate, 2026
      </div>
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

      {/* ===== 写真 (Mobile 全幅バンド、16:9) ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "3 / 7",
          position: "relative",
          overflow: "hidden",
          backgroundColor: TOKENS.bg,
          ...revealStyle(visible, 180),
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/6633448/pexels-photo-6633448.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=600&w=900"
          alt="やまと不動産の施主邸イメージ"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.94) contrast(1.02)",
            display: "block",
          }}
          loading="lazy"
        />
      </div>

      {/* ===== メタ: No.01 / NARA M-TEI ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "8 / 9",
          alignSelf: "end",
          display: "flex",
          alignItems: "center",
          gap: 10,
          ...revealStyle(visible, 260),
        }}
      >
        <span
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "10px",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "0.12em",
            color: TOKENS.sub,
          }}
        >
          No. 01 / 09
        </span>
        <span
          style={{
            width: 32,
            height: 1,
            backgroundColor: TOKENS.line,
          }}
        />
        <span
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: TOKENS.sub,
          }}
        >
          Nara / M-tei
        </span>
      </div>

      {/* ===== HERO Line 1 ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "9 / 11",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(40px, 12vw, 60px)",
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: TOKENS.ink,
          whiteSpace: "nowrap",
          ...revealStyle(visible, 380, 24),
        }}
      >
        ここに住みたい、
      </div>

      {/* ===== HERO Line 2 (Amber) ===== */}
      <Link
        href="/voice/202180"
        style={{
          gridColumn: "1 / 7",
          gridRow: "11 / 13",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(48px, 14vw, 72px)",
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: TOKENS.amber,
          textDecoration: "none",
          whiteSpace: "nowrap",
          paddingLeft: "10%",
          ...revealStyle(visible, 480, 24),
        }}
      >
        と思えた。
      </Link>

      {/* ===== サブ一行 ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "13 / 14",
          alignSelf: "end",
          fontFamily: TOKENS.serif,
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: 1.7,
          letterSpacing: "0.03em",
          color: TOKENS.ink,
          paddingTop: 16,
          ...revealStyle(visible, 620),
        }}
      >
        2年探して、ようやく出会えた。<br />
        土地も標準仕様も、全てが納得の住まいでした。
      </div>

      {/* ===== Attribution caption ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "14 / 15",
          alignSelf: "center",
          display: "flex",
          alignItems: "center",
          gap: 8,
          ...revealStyle(visible, 700),
        }}
      >
        <span
          style={{
            width: 20,
            height: 1,
            backgroundColor: TOKENS.line,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontFamily: TOKENS.serif,
            fontSize: "11px",
            fontWeight: 400,
            fontStyle: "italic",
            letterSpacing: "0.04em",
            color: TOKENS.sub,
          }}
        >
          奈良市 M様邸　／　30代ご夫婦　／　土地探し 2年
        </span>
      </div>

      {/* ===== Amber CTA ボタン ===== */}
      <Link
        href="/voice"
        style={{
          gridColumn: "1 / 7",
          gridRow: "15 / 17",
          alignSelf: "center",
          justifySelf: "start",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "13px 22px",
          backgroundColor: TOKENS.amber,
          color: "#FFFFFF",
          fontFamily: TOKENS.serif,
          fontSize: "14px",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textDecoration: "none",
          transition: "background-color 400ms cubic-bezier(0.16,1,0.3,1)",
          ...revealStyle(visible, 820),
        }}
      >
        すべての声を読む
        <span style={{ fontFamily: TOKENS.latin }}>→</span>
      </Link>

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
        <span
          style={{
            fontFamily: TOKENS.latin,
            fontSize: "10px",
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: TOKENS.sub,
          }}
        >
          Editorial / Yamato, 2026
        </span>
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
