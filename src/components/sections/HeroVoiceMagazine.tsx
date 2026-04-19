"use client";

/**
 * HeroVoiceMagazine — 3×3 グリッド型（v12・全声同サイズ・色分けの序列）
 * ----------------------------------------------------------------------
 * 2026-04-18 設計思想の転換:
 *   - サイズで強弱を付けるのではなく、同サイズで並べて「色」で意味を分類する
 *   - スイス・タイポグラフィ（Müller-Brockmann）に近い厳格なグリッド
 *   - PC: 3 列 × 3 行 = 9 スロット、全声 lg サイズ、weight 900
 *   - Mobile: 縦 1 列スタック（3×3 は幅不足）、同サイズ同色分類
 *
 * 色の意味づけ（ストーリーを色が語る）:
 *   赤 #FF2D2D  = 課題・不安（Pain）
 *   青 #002FA7  = 決断・出会い（Decision）
 *   緑 #00A870  = 満足・安心（After）
 *   黒 #0A0A0A  = 事実・観察（Neutral）
 *
 * 並び順（9 マスの色配置）— 左→右・上→下で「Pain → Decision → After」が流れる:
 *   Row 1 :  赤 ──  赤 ──  青
 *   Row 2 :  青 ──  青 ──  黒
 *   Row 3 :  緑 ──  緑 ──  黒
 */

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { MAGAZINE_FIGURES } from "@/data/voiceHome";

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
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);
  return { ref, visible: reduced || visible };
}

/* ---------- 型 ---------- */
type Size = "mega" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
type Color = "black" | "red" | "blue" | "pink" | "yellow" | "green";

const COLOR: Record<Color, string> = {
  black: "#0A0A0A",
  red: "#FF2D2D",
  blue: "#002FA7",
  pink: "#FF0080",
  yellow: "#FFD600",
  green: "#00A870",
};

/* PC サイズ定義（3×3 グリッド・全声同サイズ方針） */
const SIZE_PC: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "clamp(80px, 9vw, 132px)",   weight: 900, lh: 0.92, ls: "-0.05em" },
  xxl:  { fontSize: "clamp(56px, 6.2vw, 96px)",  weight: 900, lh: 1.0,  ls: "-0.04em" },
  xl:   { fontSize: "clamp(32px, 3.4vw, 52px)",  weight: 900, lh: 1.1,  ls: "-0.03em" },
  lg:   { fontSize: "clamp(20px, 1.9vw, 27px)",  weight: 900, lh: 1.3,  ls: "-0.02em" },
  md:   { fontSize: "clamp(16px, 1.5vw, 22px)",  weight: 700, lh: 1.5,  ls: "0em" },
  sm:   { fontSize: "clamp(13px, 1.1vw, 15px)",  weight: 500, lh: 1.6,  ls: "0em" },
  xs:   { fontSize: "12px",                       weight: 500, lh: 1.7,  ls: "0.04em" },
};

/* Mobile サイズ定義（3×3 ではなく縦 1 列、全声同サイズ） */
const SIZE_MB: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "40px", weight: 900, lh: 0.95, ls: "-0.05em" },
  xxl:  { fontSize: "32px", weight: 900, lh: 1.0,  ls: "-0.04em" },
  xl:   { fontSize: "22px", weight: 900, lh: 1.2,  ls: "-0.02em" },
  lg:   { fontSize: "16px", weight: 900, lh: 1.35, ls: "-0.01em" },
  md:   { fontSize: "13px", weight: 700, lh: 1.5,  ls: "0em" },
  sm:   { fontSize: "11px", weight: 500, lh: 1.5,  ls: "0em" },
  xs:   { fontSize: "10px", weight: 500, lh: 1.6,  ls: "0.02em" },
};

type BlockPos = {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
};

type TextBlock = {
  key: string;
  text: string;
  size: Size;
  color?: Color;
  vertical?: boolean;
  rotate?: number;
  uppercase?: boolean;
  opacity?: number;
  pos: BlockPos;
  delay?: number;
  voiceId?: string;
  zIndex?: number;
  /** 水平中央揃え（left:50% + translateX(-50%)） */
  centerX?: boolean;
  /** 右揃え（テキストを右端基準で揃える） */
  textAlignRight?: boolean;
};

/* =============================================================================
   PC レイアウト（1440 × 790）— 感情のタイポグラフィ・広告ポスター型
   ----------------------------------------------------------------------------
   方針:
     - 白背景 × 大きな余白 × 黒+赤+青の 3 色のみ
     - 「諦めかけた時に、」→「出会えた。」を中央の最大コピーに
     - 周辺に短いフレーズ 4 つを散らす（強弱でリズム）
     - 最下部に属性行（誰の声か）と CTA
     - 回転・装飾記号（！・→・非公開）・緑・黄・ピンクは廃止
   ----------------------------------------------------------------------------
   Zone 配置:
     [TL] VOICE ラベル          [TR] なし
     [ML 上] 諦めかけた時に、    [MR] 標準で、十分だった。
     [M 中央] 出会えた。 ← mega / red（感情ピーク）
     [ML 下] ここに住みたい。    [MR 下] 建てた後も、安心。 (blue)
     [BL] 属性行 3 つ            [BR] CTA
   ========================================================================== */
const TEXT_BLOCKS_PC: TextBlock[] = [
  // ===== ヘッダーラベル =====
  { key: "p-label",   text: "VOICE｜お客様の声", size: "xs", color: "black", pos: { top: "6%", left: "5%" }, delay: 0, zIndex: 2 },
  { key: "p-label-r", text: "Testimonials — Vol. 04", size: "xs", color: "black", textAlignRight: true, pos: { top: "6%", right: "5%" }, delay: 0, zIndex: 2 },

  // ===== Row 1 （赤・赤・青） — Pain から最初の Decision へ =====
  { key: "p-v1", text: "「2年、見つからなかった。」",       size: "lg", color: "red",   pos: { top: "27%", left: "5%" },  delay: 200, voiceId: "199927", zIndex: 2 },
  { key: "p-v2", text: "「他社は、標準が低かった。」",       size: "lg", color: "red",   pos: { top: "27%", left: "37%" }, delay: 260, voiceId: "279070", zIndex: 2 },
  { key: "p-v3", text: "「ここに住みたい、と思えた。」",     size: "lg", color: "blue",  pos: { top: "27%", left: "69%" }, delay: 320, voiceId: "202180", zIndex: 2 },

  // ===== Row 2 （青・青・黒） — Decision が 2 段重なり、Neutral で締める =====
  { key: "p-v4", text: "「諦めかけた時、出会えた。」",       size: "lg", color: "blue",  pos: { top: "47%", left: "5%" },  delay: 380, voiceId: "216803", zIndex: 2 },
  { key: "p-v5", text: "「やっと、決められた。」",           size: "lg", color: "blue",  pos: { top: "47%", left: "37%" }, delay: 440, voiceId: "199927", zIndex: 2 },
  { key: "p-v6", text: "「嘘のない、標準仕様だった。」",     size: "lg", color: "black", pos: { top: "47%", left: "69%" }, delay: 500, voiceId: "208787", zIndex: 2 },

  // ===== Row 3 （緑・緑・黒） — After サービス満足 → 結論 =====
  { key: "p-v7", text: "「追加費用は、ゼロだった。」",       size: "lg", color: "green", pos: { top: "67%", left: "5%" },  delay: 560, voiceId: "208787", zIndex: 2 },
  { key: "p-v8", text: "「いつでも駆けつけてくれる。」",     size: "lg", color: "green", pos: { top: "67%", left: "37%" }, delay: 620, voiceId: "256807", zIndex: 2 },
  { key: "p-v9", text: "「正解だったと、言える。」",         size: "lg", color: "black", pos: { top: "67%", left: "69%" }, delay: 680, voiceId: "199927", zIndex: 2 },

  // ===== 最下部: 出典行（9 組の声の出所を一行で明示） =====
  { key: "p-footer", text: "— 奈良市・斑鳩町・京田辺市・生駒市 ほか、お客様 9 組の声より（2026 現在）", size: "xs", color: "black", pos: { top: "88%", left: "5%" }, delay: 900, zIndex: 2 },
];

/* =============================================================================
   Mobile レイアウト（375 × 700）— PC と同じ広告ポスター構造を縦方向に圧縮
   ========================================================================== */
const TEXT_BLOCKS_MB: TextBlock[] = [
  // ===== ヘッダー =====
  { key: "m-label",   text: "VOICE｜お客様の声", size: "xs", color: "black", pos: { top: "3%", left: "4%" }, delay: 0, zIndex: 2 },
  { key: "m-label-r", text: "Vol. 04", size: "xs", color: "black", textAlignRight: true, pos: { top: "3%", right: "4%" }, delay: 0, zIndex: 2 },

  // ===== 9 声を縦 1 列に同サイズでスタック（PC と同じ色リズム） =====
  { key: "m-v1", text: "「2年、見つからなかった。」",       size: "lg", color: "red",   pos: { top: "11%", left: "4%" }, delay: 200, voiceId: "199927", zIndex: 2 },
  { key: "m-v2", text: "「他社は、標準が低かった。」",       size: "lg", color: "red",   pos: { top: "19%", left: "4%" }, delay: 260, voiceId: "279070", zIndex: 2 },
  { key: "m-v3", text: "「ここに住みたい、と思えた。」",     size: "lg", color: "blue",  pos: { top: "27%", left: "4%" }, delay: 320, voiceId: "202180", zIndex: 2 },
  { key: "m-v4", text: "「諦めかけた時、出会えた。」",       size: "lg", color: "blue",  pos: { top: "35%", left: "4%" }, delay: 380, voiceId: "216803", zIndex: 2 },
  { key: "m-v5", text: "「やっと、決められた。」",           size: "lg", color: "blue",  pos: { top: "43%", left: "4%" }, delay: 440, voiceId: "199927", zIndex: 2 },
  { key: "m-v6", text: "「嘘のない、標準仕様だった。」",     size: "lg", color: "black", pos: { top: "51%", left: "4%" }, delay: 500, voiceId: "208787", zIndex: 2 },
  { key: "m-v7", text: "「追加費用は、ゼロだった。」",       size: "lg", color: "green", pos: { top: "59%", left: "4%" }, delay: 560, voiceId: "208787", zIndex: 2 },
  { key: "m-v8", text: "「いつでも駆けつけてくれる。」",     size: "lg", color: "green", pos: { top: "67%", left: "4%" }, delay: 620, voiceId: "256807", zIndex: 2 },
  { key: "m-v9", text: "「正解だったと、言える。」",         size: "lg", color: "black", pos: { top: "75%", left: "4%" }, delay: 680, voiceId: "199927", zIndex: 2 },

  // ===== 出典行 =====
  { key: "m-footer", text: "— 奈良・京都 / お客様 9 組の声より（2026）", size: "xs", color: "black", pos: { top: "85%", left: "4%" }, delay: 900, zIndex: 2 },
];

/* ---------- TextBlock 描画 ---------- */
function TextBlockEl({
  block,
  visible,
  sizeMap,
}: {
  block: TextBlock;
  visible: boolean;
  sizeMap: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }>;
}) {
  const s = sizeMap[block.size];
  const color = COLOR[block.color ?? "black"];

  // centerX: left 50% + translateX(-50%) で水平中央に揃える
  const posForCenter = block.centerX ? { ...block.pos, left: "50%" } : block.pos;

  // textAlignRight: right 基準で text-align:right にする（行末を右に揃えたい時）
  const textAlignStyle: Pick<React.CSSProperties, "textAlign"> = block.textAlignRight
    ? { textAlign: "right" }
    : {};

  // transform: センタリング用の translateX(-50%) と rotate を合成
  const translateXForCenter = block.centerX ? "-50%" : "0";
  const baseTransform = `translate3d(${translateXForCenter}, 0, 0) rotate(${block.rotate ?? 0}deg)`;
  const hiddenTransform = `translate3d(${translateXForCenter}, 12px, 0) rotate(${block.rotate ?? 0}deg)`;

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    ...posForCenter,
    ...textAlignStyle,
    fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
    fontSize: s.fontSize,
    fontWeight: s.weight,
    lineHeight: s.lh,
    letterSpacing: s.ls,
    color,
    wordBreak: "keep-all",
    whiteSpace: "nowrap",
    zIndex: block.zIndex ?? 1,
    pointerEvents: block.voiceId ? "auto" : "none",
    transition:
      "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
    transitionDelay: `${block.delay ?? 0}ms`,
    opacity: visible ? (block.opacity ?? 1) : 0,
    transform: visible ? baseTransform : hiddenTransform,
    userSelect: block.voiceId ? "auto" : "none",
  };

  if (block.vertical) {
    baseStyle.writingMode = "vertical-rl";
    baseStyle.textOrientation = "mixed";
  }
  if (block.uppercase) {
    baseStyle.textTransform = "uppercase";
    baseStyle.fontFamily = "var(--font-inter), Inter, sans-serif";
  }

  if (block.voiceId) {
    return (
      <Link
        href={`/voice/${block.voiceId}`}
        style={baseStyle}
        className="hover:underline hover:decoration-2 hover:underline-offset-4"
      >
        {block.text}
      </Link>
    );
  }
  return <span style={baseStyle}>{block.text}</span>;
}

/* ---------- CTA（PC, Mobile 共通で右下に固定） ---------- */
function MagazineCta() {
  return (
    <div className="absolute bottom-[2%] right-[3%] z-[5] flex items-center gap-2 md:gap-3">
      <Link
        href="/voice"
        className="border-b-2 pb-0.5"
        style={{
          fontFamily: "var(--font-inter), Inter, sans-serif",
          fontSize: "10.5px",
          fontWeight: 700,
          letterSpacing: "0.22em",
          color: COLOR.black,
          textTransform: "uppercase",
          borderColor: COLOR.red,
        }}
      >
        すべて読む
      </Link>
      <Link
        href="/reserve"
        className="inline-block hover:opacity-90"
        style={{
          padding: "10px 16px",
          backgroundColor: COLOR.red,
          color: "#FFFFFF",
          fontFamily: "var(--font-noto), 'Noto Sans JP', sans-serif",
          fontSize: "12px",
          fontWeight: 900,
          letterSpacing: "0.04em",
        }}
      >
        モデルハウス予約 →
      </Link>
    </div>
  );
}

/* ---------- メイン ---------- */
export default function HeroVoiceMagazine() {
  // PC・Mobile 別々に reveal — 分割代入で ref と visible を取り出す
  const { ref: pcRef, visible: pcVisible } = useRevealContainer<HTMLDivElement>();
  const { ref: mbRef, visible: mbVisible } = useRevealContainer<HTMLDivElement>();

  /* MAGAZINE_FIGURES は将来の拡張用（現在は直接テキスト埋め込み） */
  void MAGAZINE_FIGURES;

  return (
    <section
      aria-label="VOICE — やまと不動産 お客様の声"
      className="relative w-full pt-[110px]"
      style={{ backgroundColor: "var(--voice-bg)", color: "var(--voice-text)" }}
    >
      {/* ===== PC（md 以上） ===== */}
      <div
        ref={pcRef}
        className="relative mx-auto hidden h-[calc(100svh-110px)] min-h-[680px] w-full max-w-[1600px] overflow-hidden px-[clamp(20px,2.4vw,48px)] py-[clamp(12px,1.5vw,24px)] md:block"
      >
        {TEXT_BLOCKS_PC.map((b) => (
          <TextBlockEl key={b.key} block={b} visible={pcVisible} sizeMap={SIZE_PC} />
        ))}
        <MagazineCta />
      </div>

      {/* ===== Mobile（md 未満、1画面カオス） ===== */}
      <div
        ref={mbRef}
        className="relative h-[calc(100svh-110px)] min-h-[600px] w-full overflow-hidden md:hidden"
      >
        {TEXT_BLOCKS_MB.map((b) => (
          <TextBlockEl key={b.key} block={b} visible={mbVisible} sizeMap={SIZE_MB} />
        ))}
        <MagazineCta />
      </div>
    </section>
  );
}
