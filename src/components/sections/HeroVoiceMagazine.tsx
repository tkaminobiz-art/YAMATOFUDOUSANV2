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

/* 和モダンスタイルの 3 枚を循環使用
   A: Japandi 椅子 + テーブル + 植物
   B: 窓辺 + 茶器 + 木棚
   C: 障子 + 山並み + 和室の木テーブル */
const PHOTOS = {
  A: "https://images.pexels.com/photos/6633448/pexels-photo-6633448.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  B: "https://images.pexels.com/photos/33375085/pexels-photo-33375085.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  C: "https://images.pexels.com/photos/13129824/pexels-photo-13129824.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
} as const;

const VOICES: Voice[] = [
  {
    id: 1,
    metaLocation: "NARA / M-TEI",
    photoUrl: PHOTOS.A,
    photoAlt: "Japandi 調の温かい木の内観",
    hero1: "ここに住みたい、",
    hero2: "と思えた。",
    heroColor: "amber",
    subText: "2年探して、ようやく出会えた。土地も標準仕様も、全てが納得の住まいでした。",
    attribution: "奈良市 M様邸　／　30代ご夫婦　／　土地探し 2年",
    voiceId: "202180",
  },
  {
    id: 2,
    metaLocation: "NARA / Y-TEI",
    photoUrl: PHOTOS.B,
    photoAlt: "窓から光が差し込む木造リビング",
    hero1: "2年、",
    hero2: "見つからなかった。",
    heroColor: "oak",
    subText: "希望の条件で探し続けて、見つからずにいた。やまとの分譲地で、ようやく決められました。",
    attribution: "奈良市 Y様邸　／　30代ご夫婦　／　分譲地 購入",
    voiceId: "199927",
  },
  {
    id: 3,
    metaLocation: "IKARUGA / I-TEI",
    photoUrl: PHOTOS.C,
    photoAlt: "暖かな木質のダイニング",
    hero1: "他社は、",
    hero2: "標準が低かった。",
    heroColor: "oak",
    subText: "スペックを比較してはじめて気づく差。やまとの標準仕様は、他社の上位グレード相当でした。",
    attribution: "斑鳩町 I様邸　／　40代ご夫婦　／　他社比較 半年",
    voiceId: "279070",
  },
  {
    id: 4,
    metaLocation: "KYOTANABE / K-TEI",
    photoUrl: PHOTOS.C,
    photoAlt: "椅子と木の質感が印象的な空間",
    hero1: "諦めかけた時、",
    hero2: "出会えた。",
    heroColor: "amber",
    subText: "もう無理かと思い始めていた、ちょうどその頃。やまとの現場見学が、全てのきっかけでした。",
    attribution: "京田辺市 K様邸　／　30代ご夫婦　／　諦めからの再起",
    voiceId: "216803",
  },
  {
    id: 5,
    metaLocation: "NARA / A-TEI",
    photoUrl: PHOTOS.A,
    photoAlt: "落ち着いた木質の空間",
    hero1: "嘘のない、",
    hero2: "標準仕様だった。",
    heroColor: "ink",
    subText: "必要な設備が、はじめから揃っている安心感。追加の見積もりを求められることは一度もありませんでした。",
    attribution: "奈良市 A様邸　／　40代ご夫婦　／　追加費用ゼロ",
    voiceId: "208787",
  },
  {
    id: 6,
    metaLocation: "IKOMA / U-TEI",
    photoUrl: PHOTOS.B,
    photoAlt: "光と木の温もりのあるインテリア",
    hero1: "いつでも、",
    hero2: "駆けつけてくれる。",
    heroColor: "forest",
    subText: "些細な相談にも、翌日には対応してくれる。建てて終わりではなく、暮らしが続く関係性です。",
    attribution: "生駒市 U様邸　／　30代ご夫婦　／　竣工後 3年",
    voiceId: "256807",
  },
  {
    id: 7,
    metaLocation: "NARA / S-TEI",
    photoUrl: PHOTOS.C,
    photoAlt: "柔らかな光の差し込む室内",
    hero1: "正解だったと、",
    hero2: "言える。",
    heroColor: "ink",
    subText: "数年住んでもなお、決めてよかったと実感する。暮らしの隅々に、設計の思いやりを感じます。",
    attribution: "奈良市 S様邸　／　40代ご夫婦　／　竣工後 5年",
    voiceId: "199927",
  },
  {
    id: 8,
    metaLocation: "IKARUGA / T-TEI",
    photoUrl: PHOTOS.C,
    photoAlt: "木の梁が活きる居住空間",
    hero1: "建てたあとも、",
    hero2: "安心。",
    heroColor: "forest",
    subText: "地震の備えも、断熱性能も、想像以上。季節が巡るほど、住み心地の良さが実感できます。",
    attribution: "斑鳩町 T様邸　／　40代ご夫婦　／　竣工後 2年",
    voiceId: "256807",
  },
  {
    id: 9,
    metaLocation: "KYOTANABE / N-TEI",
    photoUrl: PHOTOS.A,
    photoAlt: "静謐な日本の住空間",
    hero1: "やっと、",
    hero2: "決められた。",
    heroColor: "amber",
    subText: "家族で悩み抜いて、最後にたどり着いた答え。納得するまで寄り添ってくれた営業さんに、感謝しています。",
    attribution: "京田辺市 N様邸　／　30代ご夫婦　／　検討期間 1年半",
    voiceId: "202180",
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
   PC レイアウト: Pattern 1 (Hero Split 見開き型) × スライダー
   ───────────────────────────────────────────────────────────────
   Grid: 12 col × 17 row
   左 cols 1-5: 写真（voice.photoUrl）
   右 cols 6-12: テキスト（voice ごとに切り替え）
   ========================================================================== */
function VoiceGridPC({ visible, voice, isReversed }: { visible: boolean; voice: Voice; isReversed: boolean }) {
  const heroColor = heroColorMap[voice.heroColor];

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
      {/* ===== 写真（isReversed で左右交互に・rows 3-15、4:5 縦長） ===== */}
      <div
        style={{
          gridColumn: photoCol,
          gridRow: "3 / 16",
          position: "relative",
          overflow: "hidden",
          backgroundColor: TOKENS.bg,
          ...revealStyle(visible, 80),
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
          gridColumn: textCols.meta,
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
          ...revealStyle(visible, 360, 24),
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
          ...revealStyle(visible, 460, 24),
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
          ...revealStyle(visible, 600),
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
          transition: "background-color 400ms cubic-bezier(0.16,1,0.3,1)",
          ...revealStyle(visible, 800),
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
function VoiceGridMB({ visible, voice }: { visible: boolean; voice: Voice }) {
  const heroColor = heroColorMap[voice.heroColor];
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
          src={voice.photoUrl.replace("h=1200&w=800", "h=600&w=900")}
          alt={voice.photoAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 40%",
            filter: "saturate(0.94) contrast(1.02)",
            display: "block",
          }}
          loading="lazy"
        />
      </div>

      {/* ===== メタ: No.XX / metaLocation ===== */}
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
          No. {String(voice.id).padStart(2, "0")} / {String(VOICES.length).padStart(2, "0")}
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
          ...revealStyle(visible, 380, 24),
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
          ...revealStyle(visible, 480, 24),
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
          ...revealStyle(visible, 620),
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
          transition: "background-color 400ms cubic-bezier(0.16,1,0.3,1)",
          ...revealStyle(visible, 820),
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
            <VoiceGridPC visible={pcVisible} voice={voice} isReversed={idx % 2 === 1} />
          </div>
        ))}

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
            <VoiceGridMB visible={mbVisible} voice={voice} />
          </div>
        ))}

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

      {/* CTA hover style */}
      <style jsx>{`
        :global(.voice-cta-link:hover) {
          color: ${TOKENS.amber};
        }
      `}</style>
    </section>
  );
}
