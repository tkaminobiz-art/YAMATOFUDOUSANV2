"use client";

/**
 * HeroVoiceMagazine — 感情のタイポグラフィ（v10・広告ポスター型）
 * ----------------------------------------------------------------------
 * 2026-04-18 方針刷新:
 *   - 白背景 × 大きな余白 × 3 色（黒・赤・青）のみ
 *   - レビュー一覧ではなく「感情のタイポグラフィ」として見せる
 *   - 中央に最大コピー「諦めかけた時に、出会えた。」
 *   - 周辺に短い声の断片を 4 つ散らす（強弱でリズム）
 *   - 下部に属性行（誰の声か、小さく）+ 右下 CTA
 *   - 回転・装飾記号・緑/黄/ピンクは廃止（ノイズ除去）
 *
 * 使用色:
 *   black #0A0A0A（本体）/ red #FF2D2D（感情ピーク 1 箇所）/ blue #002FA7（信頼 1 箇所）
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

/* PC サイズ定義（広告ポスター型） */
const SIZE_PC: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "clamp(96px, 11vw, 168px)", weight: 900, lh: 0.88, ls: "-0.06em" },
  xxl:  { fontSize: "clamp(72px, 8.4vw, 132px)", weight: 900, lh: 0.94, ls: "-0.05em" },
  xl:   { fontSize: "clamp(36px, 4vw, 64px)",    weight: 900, lh: 1.2,  ls: "-0.03em" },
  lg:   { fontSize: "clamp(24px, 2.4vw, 36px)",  weight: 900, lh: 1.2,  ls: "-0.02em" },
  md:   { fontSize: "clamp(16px, 1.5vw, 20px)",  weight: 500, lh: 1.6,  ls: "0em" },
  sm:   { fontSize: "clamp(13px, 1.1vw, 15px)",  weight: 500, lh: 1.6,  ls: "0em" },
  xs:   { fontSize: "12px",                       weight: 500, lh: 1.7,  ls: "0.04em" },
};

/* Mobile サイズ定義（375 × 700 最適化） */
const SIZE_MB: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "56px", weight: 900, lh: 0.9,  ls: "-0.05em" },
  xxl:  { fontSize: "36px", weight: 900, lh: 0.98, ls: "-0.04em" },
  xl:   { fontSize: "22px", weight: 900, lh: 1.25, ls: "-0.02em" },
  lg:   { fontSize: "17px", weight: 900, lh: 1.3,  ls: "-0.01em" },
  md:   { fontSize: "13px", weight: 500, lh: 1.5,  ls: "0em" },
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
  // ===== ラベル =====
  { key: "p-label", text: "VOICE / お客様の声", size: "xs", color: "black", uppercase: false, pos: { top: "3%", left: "4%" }, delay: 0, zIndex: 2 },

  // ===== 中央の最大コピー =====
  { key: "p-lead", text: "諦めかけた時に、", size: "xl", color: "black", pos: { top: "22%", left: "16%" }, delay: 150, zIndex: 2 },
  { key: "p-hero", text: "出会えた。", size: "mega", color: "red", pos: { top: "30%", left: "14%" }, delay: 300, voiceId: "216803", zIndex: 2 },

  // ===== 周辺の断片（上部右・中部右・左下） =====
  { key: "p-s1", text: "標準で、十分だった。", size: "md", color: "black", pos: { top: "20%", right: "6%" }, delay: 500, voiceId: "208787", zIndex: 2 },
  { key: "p-s2", text: "建てた後も、安心。", size: "lg", color: "blue", pos: { top: "52%", right: "8%" }, delay: 650, voiceId: "256807", zIndex: 2 },
  { key: "p-s3", text: "ここに住みたい、と思えた。", size: "md", color: "black", pos: { top: "66%", left: "14%" }, delay: 800, voiceId: "202180", zIndex: 2 },
  { key: "p-s4", text: "すぐ駆けつけてくれる。", size: "md", color: "black", pos: { top: "72%", right: "12%" }, delay: 950, voiceId: "256807", zIndex: 2 },

  // ===== 下部の属性行（誰の声か・小さく、トラスト補強） =====
  { key: "p-a1", text: "30代ご夫婦／土地探し 2年／奈良市 M様邸", size: "xs", color: "black", pos: { top: "85%", left: "4%" }, delay: 1100, zIndex: 2 },
  { key: "p-a2", text: "40代ご夫婦／他社比較 半年／斑鳩町 I様邸", size: "xs", color: "black", pos: { top: "89%", left: "4%" }, delay: 1150, zIndex: 2 },
  { key: "p-a3", text: "引き渡し後 5年／京田辺市 K様邸", size: "xs", color: "black", pos: { top: "93%", left: "4%" }, delay: 1200, zIndex: 2 },
];

/* =============================================================================
   Mobile レイアウト（375 × 700）— PC と同じ広告ポスター構造を縦方向に圧縮
   ========================================================================== */
const TEXT_BLOCKS_MB: TextBlock[] = [
  // ===== ラベル =====
  { key: "m-label", text: "VOICE / お客様の声", size: "xs", color: "black", pos: { top: "3%", left: "4%" }, delay: 0, zIndex: 2 },

  // ===== 中央の最大コピー =====
  { key: "m-lead", text: "諦めかけた時に、", size: "xl", color: "black", pos: { top: "15%", left: "4%" }, delay: 150, zIndex: 2 },
  { key: "m-hero", text: "出会えた。", size: "mega", color: "red", pos: { top: "22%", left: "4%" }, delay: 300, voiceId: "216803", zIndex: 2 },

  // ===== 周辺の断片（4 つ、縦にリズム） =====
  { key: "m-s1", text: "標準で、十分だった。", size: "md", color: "black", pos: { top: "42%", left: "4%" }, delay: 500, voiceId: "208787", zIndex: 2 },
  { key: "m-s2", text: "建てた後も、安心。", size: "lg", color: "blue", pos: { top: "50%", left: "4%" }, delay: 650, voiceId: "256807", zIndex: 2 },
  { key: "m-s3", text: "ここに住みたい、と思えた。", size: "md", color: "black", pos: { top: "60%", left: "4%" }, delay: 800, voiceId: "202180", zIndex: 2 },
  { key: "m-s4", text: "すぐ駆けつけてくれる。", size: "md", color: "black", pos: { top: "67%", left: "4%" }, delay: 950, voiceId: "256807", zIndex: 2 },

  // ===== 下部属性行（FloatingCta 上に収まる top） =====
  { key: "m-a1", text: "30代ご夫婦／土地探し 2年／奈良市 M様邸", size: "xs", color: "black", pos: { top: "80%", left: "4%" }, delay: 1100, zIndex: 2 },
  { key: "m-a2", text: "40代ご夫婦／他社比較／斑鳩町 I様邸", size: "xs", color: "black", pos: { top: "84%", left: "4%" }, delay: 1150, zIndex: 2 },
  { key: "m-a3", text: "引き渡し後 5年／京田辺市 K様邸", size: "xs", color: "black", pos: { top: "88%", left: "4%" }, delay: 1200, zIndex: 2 },
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

  const baseStyle: React.CSSProperties = {
    position: "absolute",
    ...block.pos,
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
    transform: visible
      ? `translateY(0) rotate(${block.rotate ?? 0}deg)`
      : `translateY(12px) rotate(${block.rotate ?? 0}deg)`,
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
