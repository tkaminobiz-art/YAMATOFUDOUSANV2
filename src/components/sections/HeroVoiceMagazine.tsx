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

/* ---------- 9 組の声データ（スライダー用） ----------
   Hero 色は役割別:
   - amber: decision/encounter (決断の瞬間)
   - oak:   pain (過去の時間の重み)
   - ink:   neutral / conclusion (客観的事実)
   - forest: after (継続の安心)
   写真は 4 種を循環で使用
---------- */
type HeroColor = "amber" | "oak" | "ink" | "forest";

type Voice = {
  id: number;
  metaLocation: string;       // "NARA / M-TEI"
  photoUrl: string;
  photoAlt: string;
  hero1: string;              // 前半フレーズ (カンマ終わり)
  hero2: string;              // 後半フレーズ (句点終わり)
  heroColor: HeroColor;       // hero2 のアクセント色
  subText: string;            // サブテキスト（自然な wrap）
  attribution: string;        // "奈良市 M様邸 ／ 30代ご夫婦 ／ 土地探し 2年"
  voiceId: string;            // /voice/xxxx へのリンク
};

/* 実際のお客様宅写真を使用 (`/images/voices/[id]_1.webp`)
   口コミの voiceId = 写真の id なので、文言と写真が必ず一致する */
const voicePhoto = (id: string) => `/images/voices/${id}_1.webp`;

const VOICES: Voice[] = [
  {
    id: 1,
    metaLocation: "NARA / I-TEI",
    photoUrl: voicePhoto("202180"),
    photoAlt: "奈良市 I様邸 — やまと不動産の旗が立っていた土地に建てた家",
    hero1: "ここに住みたい、",
    hero2: "と思えた。",
    heroColor: "amber",
    subText: "夫婦で話していた土地に、やまとの旗が立っていた。ここで建てよう、と自然に決められました。",
    attribution: "奈良市 I様邸",
    voiceId: "202180",
  },
  {
    id: 2,
    metaLocation: "NARA / M-TEI",
    photoUrl: voicePhoto("199927"),
    photoAlt: "奈良市 M様邸 — 2年探して出会えた分譲地",
    hero1: "2年、",
    hero2: "見つからなかった。",
    heroColor: "oak",
    subText: "2年近く土地を探し続けて、やっと見つかった納得の土地。それがやまと不動産の分譲地でした。",
    attribution: "奈良市 M様邸",
    voiceId: "199927",
  },
  {
    id: 3,
    metaLocation: "IKARUGA / I-TEI",
    photoUrl: voicePhoto("279070"),
    photoAlt: "斑鳩町 I様邸 — 他社と比較して標準仕様の差を実感した家",
    hero1: "他社は、",
    hero2: "標準が低かった。",
    heroColor: "oak",
    subText: "他社の標準仕様は、私たちが求めるグレードに達していなかった。やまとは、はじめから基準が違いました。",
    attribution: "斑鳩町 I様邸",
    voiceId: "279070",
  },
  {
    id: 4,
    metaLocation: "IKOMA / I-TEI",
    photoUrl: voicePhoto("216803"),
    photoAlt: "生駒市 I様邸 — 諦めかけた時にネットで出会った家",
    hero1: "諦めかけた時、",
    hero2: "出会えた。",
    heroColor: "amber",
    subText: "もう無理かと思い始めていた年末。何気なく開いたネットで、やまと不動産に出会いました。",
    attribution: "生駒市 I様邸",
    voiceId: "216803",
  },
  {
    id: 5,
    metaLocation: "NARA / I-TEI",
    photoUrl: voicePhoto("208787"),
    photoAlt: "奈良市 I様邸 — モデルルーム訪問で担当と再会した家",
    hero1: "嘘のない、",
    hero2: "標準仕様だった。",
    heroColor: "ink",
    subText: "看板を見て訪れたモデルルームで、小中学校の後輩が担当に。標準仕様のまま、希望の家が建ちました。",
    attribution: "奈良市 I様邸",
    voiceId: "208787",
  },
  {
    id: 6,
    metaLocation: "KIZUGAWA / H-TEI",
    photoUrl: voicePhoto("239137"),
    photoAlt: "木津川市 H様邸 — 花シリーズ・風シリーズから選んで建てた家",
    hero1: "予算で、",
    hero2: "花鳥風月が叶った。",
    heroColor: "forest",
    subText: "「花」「風」の2つのシリーズから選べて、予算とデザインの両方が理想通り。無理のない家づくりでした。",
    attribution: "木津川市 H様邸",
    voiceId: "239137",
  },
  {
    id: 7,
    metaLocation: "NARA / M-TEI",
    photoUrl: voicePhoto("225612"),
    photoAlt: "奈良市 M様邸 — 担当者の人柄に惹かれて建てた家",
    hero1: "担当者の、",
    hero2: "人柄だった。",
    heroColor: "amber",
    subText: "西口さんの軽快なトークに魅了されて、一気に購入へ。約半年間の打ち合わせも、ずっと誠実でした。",
    attribution: "奈良市 M様邸",
    voiceId: "225612",
  },
  {
    id: 8,
    metaLocation: "NARA / O-TEI",
    photoUrl: voicePhoto("242157"),
    photoAlt: "奈良市 O様邸 — 賃貸の近所で偶然出会ったやまと不動産",
    hero1: "年末に、",
    hero2: "偶然見つけた。",
    heroColor: "amber",
    subText: "新築を一度諦めていた年末。偶然ネットで見つけた土地が、賃貸のすぐ近くにあるやまと不動産でした。",
    attribution: "奈良市 O様邸",
    voiceId: "242157",
  },
  {
    id: 9,
    metaLocation: "IKARUGA / K-TEI",
    photoUrl: voicePhoto("239226"),
    photoAlt: "斑鳩町 K様邸 — 営業と設計が親身に寄り添った家",
    hero1: "親身に、",
    hero2: "聞いてくれた。",
    heroColor: "forest",
    subText: "標準グレードの高さに加えて、間取りの自由度も高かった。営業と設計の方が、親身に相談に乗ってくれました。",
    attribution: "斑鳩町 K様邸",
    voiceId: "239226",
  },
];

const heroColorMap: Record<HeroColor, string> = {
  amber: TOKENS.amber,
  oak: TOKENS.oak,
  ink: TOKENS.ink,
  forest: TOKENS.forest,
};

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

/* ---------- Reveal スタイルヘルパー ----------
   - 入場時 (visible=true) は delay を効かせてスタガー
   - 退場時 (visible=false) は delay 0 で即座にリセット → 重ねて消えない */
function revealStyle(visible: boolean, delay: number, translateY = 12): React.CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? "translate3d(0,0,0)" : `translate3d(0,${translateY}px,0)`,
    transition:
      "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 900ms cubic-bezier(0.16,1,0.3,1)",
    transitionDelay: visible ? `${delay}ms` : "0ms",
  };
}

/* =============================================================================
   PC レイアウト: Pattern 1 (Hero Split 見開き型) × スライダー
   ───────────────────────────────────────────────────────────────
   Grid: 12 col × 17 row
   左 cols 1-5: 写真（voice.photoUrl）
   右 cols 6-12: テキスト（voice ごとに切り替え）
   ========================================================================== */
function VoiceGridPC({
  visible,
  active,
  voice,
  isReversed,
}: {
  visible: boolean;
  active: boolean;
  voice: Voice;
  isReversed: boolean;
}) {
  const heroColor = heroColorMap[voice.heroColor];
  // スライダー切替のスタガー: visible=初期スクロールイン、active=現在表示中
  // 両方満たすときだけ内側要素が段階的に入場する
  const show = visible && active;

  // hero2 は文字数により写真領域に食い込む（"駆けつけてくれる。" / "見つからなかった。" 等 9 文字）
  // 7 cols (≈ 690px @1440) に paddingLeft 57px を加味すると 8 文字以上は clamp 6.8vw で overflow する。
  // 文字数に応じて段階的に縮小して必ず写真側へ食い込まないようにする。
  const hero1Len = voice.hero1.length;
  const hero2Len = voice.hero2.length;
  const hero1FontSize =
    hero1Len >= 8 ? "clamp(44px, 5.0vw, 80px)"
    : hero1Len >= 7 ? "clamp(48px, 5.6vw, 88px)"
    : "clamp(52px, 6vw, 92px)";
  const hero2FontSize =
    hero2Len >= 9 ? "clamp(40px, 4.6vw, 72px)"
    : hero2Len >= 8 ? "clamp(48px, 5.4vw, 84px)"
    : hero2Len >= 7 ? "clamp(54px, 6vw, 94px)"
    : "clamp(60px, 6.8vw, 108px)";

  // Asymmetric layout: 奇数 index では写真左/テキスト右、偶数 index では写真右/テキスト左
  const photoCol = isReversed ? "8 / 13" : "1 / 6";
  // テキストエリアの各要素の grid-column 定義
  const textCols = isReversed
    ? {
        meta:    "1 / 6",
        heroL1:  "1 / 8",
        heroL2:  "1 / 8",
        sub:     "1 / 7",
        attr:    "1 / 7",
        cta:     "1 / 5",
      }
    : {
        meta:    "6 / 11",
        heroL1:  "6 / 13",
        heroL2:  "6 / 13",
        sub:     "6 / 12",
        attr:    "6 / 12",
        cta:     "6 / 10",
      };

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
      {/* ===== 背景装飾 1: 巨大な声番号（誌面の章扉）===== */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          ...(isReversed
            ? { left: "clamp(20px, 4vw, 72px)", transform: "translateY(-50%)" }
            : { right: "clamp(20px, 4vw, 72px)", transform: "translateY(-50%)" }),
          top: "50%",
          fontFamily: TOKENS.latin,
          fontSize: "clamp(200px, 26vw, 380px)",
          fontWeight: 200,
          lineHeight: 0.82,
          letterSpacing: "-0.06em",
          color: heroColor,
          opacity: 0.08,
          pointerEvents: "none",
          zIndex: 0,
          fontVariantNumeric: "tabular-nums",
          transition:
            "opacity 900ms cubic-bezier(0.16,1,0.3,1), color 900ms cubic-bezier(0.16,1,0.3,1)",
          mixBlendMode: "multiply",
          userSelect: "none",
        }}
      >
        {String(voice.id).padStart(2, "0")}
      </div>

      {/* ===== 背景装飾 2: エッジ縦色帯（hero color）===== */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: 4,
          ...(isReversed ? { left: 0 } : { right: 0 }),
          backgroundColor: heroColor,
          opacity: show ? 0.55 : 0,
          transform: show ? "scaleY(1)" : "scaleY(0.3)",
          transformOrigin: "center",
          transition:
            "opacity 900ms cubic-bezier(0.16,1,0.3,1), transform 1100ms cubic-bezier(0.16,1,0.3,1), background-color 900ms",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* ===== 背景装飾 3: hero2 背後のアンビエントグロー ===== */}
      <div
        aria-hidden
        style={{
          gridColumn: textCols.heroL2,
          gridRow: "8 / 13",
          alignSelf: "center",
          justifySelf: isReversed ? "start" : "end",
          width: "70%",
          height: "70%",
          background: `radial-gradient(ellipse at center, ${heroColor}33 0%, ${heroColor}00 65%)`,
          opacity: show ? 1 : 0,
          transition: "opacity 1200ms cubic-bezier(0.16,1,0.3,1), background 900ms",
          zIndex: 1,
          pointerEvents: "none",
          filter: "blur(24px)",
        }}
      />

      {/* ===== 写真（isReversed で左右交互に・rows 3-15、4:5 縦長） ===== */}
      <div
        style={{
          gridColumn: photoCol,
          gridRow: "3 / 16",
          position: "relative",
          overflow: "hidden",
          backgroundColor: TOKENS.bg,
          zIndex: 2,
          ...revealStyle(show, 60),
        }}
        className="voice-photo-hover"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={voice.photoUrl}
          alt={voice.photoAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "saturate(0.94) contrast(1.02)",
            display: "block",
            transform: show ? "scale(1)" : "scale(1.04)",
            transition: "transform 1400ms cubic-bezier(0.16,1,0.3,1)",
          }}
          loading="lazy"
        />
      </div>

      {/* ===== ヘッダー: Latin caps + JP subtitle ===== */}
      <div style={{ gridColumn: "1 / 6", gridRow: "1", alignSelf: "end", zIndex: 3, ...revealStyle(show, DELAY.headerL) }}>
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

      <div style={{ gridColumn: "8 / 13", gridRow: "1", alignSelf: "end", textAlign: "right", zIndex: 3, ...revealStyle(show, DELAY.headerR) }}>
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
          zIndex: 3,
          ...revealStyle(show, 120),
        }}
      />

      {/* ============================================================
         HERO — 1 メッセージ・ドカン型（TORICHŌ / Full Editorial 思想）
         ============================================================ */}
      {/* エディトリアルメタ: 章番号 + 発話者地域 + hero カラーのドット */}
      <div
        style={{
          gridColumn: textCols.meta,
          gridRow: "4 / 5",
          alignSelf: "end",
          display: "flex",
          alignItems: "center",
          gap: 12,
          zIndex: 3,
          ...revealStyle(show, 220),
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            backgroundColor: heroColor,
            borderRadius: 0,
            transition: "background-color 900ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
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
          No. {String(voice.id).padStart(2, "0")} / {String(VOICES.length).padStart(2, "0")}
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
          {voice.metaLocation}
        </span>
      </div>

      {/* HERO Line 1: voice.hero1 */}
      <div
        style={{
          gridColumn: textCols.heroL1,
          gridRow: "6 / 9",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: hero1FontSize,
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: TOKENS.ink,
          zIndex: 3,
          whiteSpace: "nowrap",
          ...revealStyle(show, 360, 20),
        }}
      >
        {voice.hero1}
      </div>

      {/* HERO Line 2: voice.hero2 (accent color) */}
      <Link
        href={`/voice/${voice.voiceId}`}
        style={{
          gridColumn: textCols.heroL2,
          gridRow: "9 / 12",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: hero2FontSize,
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: heroColor,
          textDecoration: "none",
          zIndex: 3,
          whiteSpace: "nowrap",
          paddingLeft: "clamp(32px, 4vw, 72px)",
          ...revealStyle(show, 520, 24),
        }}
      >
        {voice.hero2}
      </Link>

      {/* サブテキスト（自然な行送り・wordBreak auto-phrase で意味単位で改行） */}
      <div
        style={{
          gridColumn: textCols.sub,
          gridRow: "12 / 13",
          alignSelf: "end",
          fontFamily: TOKENS.serif,
          fontSize: "clamp(15px, 1.3vw, 18px)",
          fontWeight: 400,
          lineHeight: 1.9,
          letterSpacing: "0.03em",
          color: TOKENS.ink,
          paddingTop: 24,
          paddingLeft: "clamp(32px, 4vw, 72px)",
          paddingRight: "clamp(24px, 3vw, 48px)",
          textWrap: "pretty",
          wordBreak: "auto-phrase",
          lineBreak: "strict",
          zIndex: 3,
          ...revealStyle(show, 680),
        }}
      >
        {voice.subText}
      </div>

      {/* Magazine caption 風 attribution */}
      <div
        style={{
          gridColumn: textCols.attr,
          gridRow: "13 / 14",
          alignSelf: "center",
          display: "flex",
          alignItems: "center",
          gap: 10,
          paddingLeft: "clamp(32px, 4vw, 72px)",
          zIndex: 3,
          ...revealStyle(show, 820),
        }}
      >
        <span
          style={{
            width: 24,
            height: 1,
            backgroundColor: heroColor,
            opacity: 0.7,
            flexShrink: 0,
            transition: "background-color 900ms cubic-bezier(0.16,1,0.3,1)",
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
          {voice.attribution}
        </span>
      </div>

      {/* 矩形 CTA ボタン (TORICHŌ 風 Amber) — 写真の下部と揃える */}
      <Link
        href="/voice"
        style={{
          gridColumn: textCols.cta,
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
          zIndex: 3,
          transition: "background-color 400ms cubic-bezier(0.16,1,0.3,1), transform 400ms cubic-bezier(0.16,1,0.3,1), box-shadow 400ms",
          ...revealStyle(show, 960),
        }}
        className="voice-primary-cta"
      >
        すべての声を読む
        <span style={{ fontFamily: TOKENS.latin }}>→</span>
      </Link>
    </div>
  );
}

/* =============================================================================
   Mobile レイアウト: CSS Grid 6 col × 18 row
   ========================================================================== */
function VoiceGridMB({
  visible,
  active,
  voice,
}: {
  visible: boolean;
  active: boolean;
  voice: Voice;
}) {
  const heroColor = heroColorMap[voice.heroColor];
  const show = visible && active;
  // Mobile 375px でも 9 文字の hero2 は 14vw (52px) で画面幅を越える。文字数で縮小。
  const hero1Len = voice.hero1.length;
  const hero2Len = voice.hero2.length;
  const hero1FontSizeMB =
    hero1Len >= 8 ? "clamp(30px, 8.6vw, 46px)"
    : hero1Len >= 7 ? "clamp(34px, 10vw, 52px)"
    : "clamp(40px, 12vw, 60px)";
  const hero2FontSizeMB =
    hero2Len >= 9 ? "clamp(32px, 9vw, 50px)"
    : hero2Len >= 8 ? "clamp(38px, 10.5vw, 58px)"
    : hero2Len >= 7 ? "clamp(44px, 12vw, 64px)"
    : "clamp(48px, 14vw, 72px)";
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
      {/* ===== 背景装飾: 巨大な声番号（hero color で切替）===== */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          right: 8,
          bottom: "12%",
          fontFamily: TOKENS.latin,
          fontSize: "clamp(140px, 44vw, 220px)",
          fontWeight: 200,
          lineHeight: 0.82,
          letterSpacing: "-0.06em",
          color: heroColor,
          opacity: 0.07,
          pointerEvents: "none",
          zIndex: 0,
          fontVariantNumeric: "tabular-nums",
          mixBlendMode: "multiply",
          transition: "color 900ms cubic-bezier(0.16,1,0.3,1)",
          userSelect: "none",
        }}
      >
        {String(voice.id).padStart(2, "0")}
      </div>

      {/* ===== 背景装飾: エッジ横色帯（上辺、hero color）===== */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          backgroundColor: heroColor,
          opacity: show ? 0.6 : 0,
          transform: show ? "scaleX(1)" : "scaleX(0.3)",
          transformOrigin: "left center",
          transition:
            "opacity 800ms cubic-bezier(0.16,1,0.3,1), transform 1000ms cubic-bezier(0.16,1,0.3,1), background-color 900ms",
          zIndex: 4,
          pointerEvents: "none",
        }}
      />

      {/* ===== ヘッダー ===== */}
      <div style={{ gridColumn: "1 / 4", gridRow: "1 / 2", alignSelf: "end", zIndex: 3, ...revealStyle(show, DELAY.headerL) }}>
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

      <div style={{ gridColumn: "4 / 7", gridRow: "1 / 2", alignSelf: "end", textAlign: "right", zIndex: 3, ...revealStyle(show, DELAY.headerR) }}>
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
          zIndex: 3,
          ...revealStyle(show, 150),
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
          zIndex: 2,
          ...revealStyle(show, 120),
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={voice.photoUrl}
          alt={voice.photoAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            filter: "saturate(0.94) contrast(1.02)",
            display: "block",
            transform: show ? "scale(1)" : "scale(1.05)",
            transition: "transform 1300ms cubic-bezier(0.16,1,0.3,1)",
          }}
          loading="lazy"
        />
      </div>

      {/* ===== メタ: No.XX / metaLocation + color dot ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "8 / 9",
          alignSelf: "end",
          display: "flex",
          alignItems: "center",
          gap: 10,
          zIndex: 3,
          ...revealStyle(show, 260),
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            backgroundColor: heroColor,
            transition: "background-color 900ms cubic-bezier(0.16,1,0.3,1)",
          }}
        />
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
          No. {String(voice.id).padStart(2, "0")} / {String(VOICES.length).padStart(2, "0")}
        </span>
        <span
          style={{
            width: 24,
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
          {voice.metaLocation}
        </span>
      </div>

      {/* ===== HERO Line 1 ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "9 / 11",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: hero1FontSizeMB,
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: TOKENS.ink,
          whiteSpace: "nowrap",
          zIndex: 3,
          ...revealStyle(show, 380, 20),
        }}
      >
        {voice.hero1}
      </div>

      {/* ===== HERO Line 2 (accent) ===== */}
      <Link
        href={`/voice/${voice.voiceId}`}
        style={{
          gridColumn: "1 / 7",
          gridRow: "11 / 13",
          alignSelf: "center",
          fontFamily: TOKENS.serif,
          fontSize: hero2FontSizeMB,
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: heroColor,
          textDecoration: "none",
          whiteSpace: "nowrap",
          paddingLeft: "10%",
          zIndex: 3,
          ...revealStyle(show, 540, 24),
        }}
      >
        {voice.hero2}
      </Link>

      {/* ===== サブテキスト（自然な wrap） ===== */}
      <div
        style={{
          gridColumn: "1 / 7",
          gridRow: "13 / 14",
          alignSelf: "end",
          fontFamily: TOKENS.serif,
          fontSize: "14px",
          fontWeight: 400,
          lineHeight: 1.9,
          letterSpacing: "0.03em",
          color: TOKENS.ink,
          paddingTop: 16,
          paddingRight: "4%",
          textWrap: "pretty",
          wordBreak: "auto-phrase",
          lineBreak: "strict",
          zIndex: 3,
          ...revealStyle(show, 700),
        }}
      >
        {voice.subText}
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
          zIndex: 3,
          ...revealStyle(show, 840),
        }}
      >
        <span
          style={{
            width: 20,
            height: 1,
            backgroundColor: heroColor,
            opacity: 0.7,
            flexShrink: 0,
            transition: "background-color 900ms cubic-bezier(0.16,1,0.3,1)",
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
          {voice.attribution}
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
          zIndex: 3,
          transition: "background-color 400ms cubic-bezier(0.16,1,0.3,1)",
          ...revealStyle(show, 980),
        }}
      >
        すべての声を読む
        <span style={{ fontFamily: TOKENS.latin }}>→</span>
      </Link>
    </div>
  );
}

/* =============================================================================
   Main
   ========================================================================== */
export default function HeroVoiceMagazine() {
  const { ref: pcRef, visible: pcVisible } = useRevealContainer<HTMLDivElement>();
  const { ref: mbRef, visible: mbVisible } = useRevealContainer<HTMLDivElement>();

  /* スライダー状態 */
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  /* auto-rotate: 4.5 秒ごとに次の voice へ
     - paused 中は停止（ホバー or タッチ）
     - prefers-reduced-motion は自動切替なし */
  useEffect(() => {
    if (paused || reduced) return;
    if (!pcVisible && !mbVisible) return;
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % VOICES.length);
    }, 4500);
    return () => clearInterval(id);
  }, [paused, reduced, pcVisible, mbVisible]);

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
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {VOICES.map((voice, idx) => (
          <div
            key={voice.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: idx === currentIndex ? 1 : 0,
              pointerEvents: idx === currentIndex ? "auto" : "none",
              transition: "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <VoiceGridPC visible={pcVisible} active={idx === currentIndex} voice={voice} isReversed={idx % 2 === 1} />
          </div>
        ))}

        {/* プログレスバー: 4.5s かけて amber が左→右へ充填。currentIndex 変化で再スタート */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: `${TOKENS.line}66`,
            zIndex: 15,
            pointerEvents: "none",
          }}
        >
          <div
            key={`pcprog-${currentIndex}-${paused ? "p" : "r"}`}
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: TOKENS.amber,
              transformOrigin: "left center",
              animation:
                paused || reduced
                  ? "none"
                  : "voiceProgress 4500ms linear forwards",
            }}
          />
        </div>

        {/* インジケータ（右下の小さなドット） */}
        <div
          style={{
            position: "absolute",
            bottom: "clamp(16px, 2.4vw, 40px)",
            right: "clamp(24px, 4vw, 72px)",
            display: "flex",
            gap: 8,
            zIndex: 20,
          }}
        >
          {VOICES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`声 ${idx + 1} に切り替え`}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? 24 : 8,
                height: 2,
                backgroundColor: idx === currentIndex ? TOKENS.amber : TOKENS.line,
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 500ms cubic-bezier(0.16,1,0.3,1), background-color 400ms",
              }}
            />
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div
        ref={mbRef}
        className="relative h-[calc(100svh-110px)] min-h-[640px] w-full overflow-hidden md:hidden"
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {VOICES.map((voice, idx) => (
          <div
            key={voice.id}
            style={{
              position: "absolute",
              inset: 0,
              opacity: idx === currentIndex ? 1 : 0,
              pointerEvents: idx === currentIndex ? "auto" : "none",
              transition: "opacity 900ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <VoiceGridMB visible={mbVisible} active={idx === currentIndex} voice={voice} />
          </div>
        ))}

        {/* Mobile プログレスバー */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            backgroundColor: `${TOKENS.line}66`,
            zIndex: 15,
            pointerEvents: "none",
          }}
        >
          <div
            key={`mbprog-${currentIndex}-${paused ? "p" : "r"}`}
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: TOKENS.amber,
              transformOrigin: "left center",
              animation:
                paused || reduced
                  ? "none"
                  : "voiceProgress 4500ms linear forwards",
            }}
          />
        </div>

        {/* Mobile インジケータ（下部中央） */}
        <div
          style={{
            position: "absolute",
            bottom: 88,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 6,
            zIndex: 20,
          }}
        >
          {VOICES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-label={`声 ${idx + 1} に切り替え`}
              onClick={() => setCurrentIndex(idx)}
              style={{
                width: idx === currentIndex ? 20 : 6,
                height: 2,
                backgroundColor: idx === currentIndex ? TOKENS.amber : TOKENS.line,
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 500ms cubic-bezier(0.16,1,0.3,1), background-color 400ms",
              }}
            />
          ))}
        </div>
      </div>

      {/* アニメーション: プログレスバー + CTA hover + 写真 hover zoom */}
      <style jsx>{`
        @keyframes voiceProgress {
          from {
            transform: scaleX(0);
          }
          to {
            transform: scaleX(1);
          }
        }
        :global(.voice-primary-cta:hover) {
          background-color: #a06b15 !important;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(196, 133, 31, 0.24);
        }
        :global(.voice-photo-hover img) {
          transition:
            transform 1400ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        :global(.voice-photo-hover:hover img) {
          transform: scale(1.03) !important;
          filter: saturate(1.02) contrast(1.03) brightness(1.02);
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes voiceProgress {
            from {
              transform: scaleX(1);
            }
            to {
              transform: scaleX(1);
            }
          }
        }
      `}</style>
    </section>
  );
}
