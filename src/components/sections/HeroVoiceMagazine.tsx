"use client";

/**
 * HeroVoiceMagazine — プレミアム・ボイス型（v11・密度ある誌面）
 * ----------------------------------------------------------------------
 * 2026-04-18 方針再刷新（リファレンス: プレミアム・ボイス｜お客様の声）:
 *   - 白背景 × 密度の中の呼吸（ミニマルではない）
 *   - 中央に最大の「悩み/不安の言葉」を赤で特大（× 解決ではなく課題を真ん中に）
 *   - 周囲に「答え」の声 7-8 個を青・緑・黒で散らす
 *   - ！マーク 3 個（赤・赤・ピンク）を装飾アンカーとして配置
 *   - 結論風の一言「これが正解だった」を右下に再掲
 *
 * 使用色:
 *   black #0A0A0A / red #FF2D2D / blue #002FA7 / green #00A870 / pink #FF0080
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

/* PC サイズ定義（プレミアム・ボイス型：中央大 PAIN、周囲 md 声群） */
const SIZE_PC: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "clamp(80px, 9vw, 132px)",   weight: 900, lh: 0.92, ls: "-0.05em" },
  xxl:  { fontSize: "clamp(56px, 6.2vw, 96px)",  weight: 900, lh: 1.0,  ls: "-0.04em" },
  xl:   { fontSize: "clamp(32px, 3.4vw, 52px)",  weight: 900, lh: 1.1,  ls: "-0.03em" },
  lg:   { fontSize: "clamp(22px, 2.2vw, 32px)",  weight: 900, lh: 1.25, ls: "-0.02em" },
  md:   { fontSize: "clamp(16px, 1.5vw, 22px)",  weight: 700, lh: 1.5,  ls: "0em" },
  sm:   { fontSize: "clamp(13px, 1.1vw, 15px)",  weight: 500, lh: 1.6,  ls: "0em" },
  xs:   { fontSize: "12px",                       weight: 500, lh: 1.7,  ls: "0.04em" },
};

/* Mobile サイズ定義 */
const SIZE_MB: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "40px", weight: 900, lh: 0.95, ls: "-0.05em" },
  xxl:  { fontSize: "32px", weight: 900, lh: 1.0,  ls: "-0.04em" },
  xl:   { fontSize: "22px", weight: 900, lh: 1.2,  ls: "-0.02em" },
  lg:   { fontSize: "17px", weight: 900, lh: 1.3,  ls: "-0.01em" },
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
  { key: "p-label", text: "プレミアム・ボイス｜お客様の声", size: "xs", color: "black", pos: { top: "4%", left: "4%" }, delay: 0, zIndex: 2 },
  { key: "p-label-r", text: "Testimonials — Vol. 04", size: "xs", color: "black", textAlignRight: true, pos: { top: "4%", right: "4%" }, delay: 0, zIndex: 2 },

  // ===== 上段 3 つの声（密度高く） =====
  { key: "p-v1", text: "「諦めかけた時、出会えた。」", size: "md", color: "blue", pos: { top: "11%", left: "4%" }, delay: 200, voiceId: "216803", zIndex: 2 },
  { key: "p-v2", text: "嘘のない、標準仕様。", size: "md", color: "black", pos: { top: "11%", left: "34%" }, delay: 250, voiceId: "208787", zIndex: 2 },
  { key: "p-v3", text: "「これが正解だった」と、心から言える。", size: "md", color: "blue", textAlignRight: true, pos: { top: "11%", right: "4%" }, delay: 300, voiceId: "199927", zIndex: 2 },

  // ===== 装飾 ! (1) 右上 =====
  { key: "p-excl-1", text: "！", size: "xxl", color: "red", pos: { top: "17%", right: "28%" }, delay: 400, zIndex: 1, rotate: -6 },

  // ===== 中央: PAIN POINT（HUGE RED・2 行、行間 mega lh 0.92 分を確保） =====
  { key: "p-pain-lead", text: "2年近く、", size: "xl", color: "black", pos: { top: "24%", left: "4%" }, delay: 500, zIndex: 2 },
  { key: "p-pain-1", text: "土地が、", size: "mega", color: "red", pos: { top: "32%", left: "4%" }, delay: 600, zIndex: 2 },
  { key: "p-pain-2", text: "見つからなかった。", size: "mega", color: "red", pos: { top: "50%", left: "4%" }, delay: 650, voiceId: "199927", zIndex: 2 },

  // ===== 装飾 ! (2) PAIN の右隣（最大） =====
  { key: "p-excl-2", text: "！", size: "mega", color: "red", pos: { top: "38%", right: "6%" }, delay: 700, zIndex: 1, rotate: 8 },

  // ===== PAIN の発話者名 =====
  { key: "p-pain-attr", text: "— 奈良市 M様邸（30代ご夫婦・土地探し 2年）", size: "xs", color: "black", pos: { top: "66%", left: "4%" }, delay: 1100, zIndex: 2 },

  // ===== 下段: 解決・満足の声（緑・黒・青のグループ） =====
  { key: "p-v4", text: "どんな時も、駆けつけてくれた。", size: "md", color: "green", pos: { top: "72%", left: "4%" }, delay: 800, voiceId: "256807", zIndex: 2 },
  { key: "p-v5", text: "追加費用は、ゼロ。", size: "md", color: "green", pos: { top: "72%", left: "36%" }, delay: 850, voiceId: "208787", zIndex: 2 },

  // ===== 装飾 ! (3) ピンク =====
  { key: "p-excl-3", text: "！", size: "lg", color: "pink", pos: { top: "70%", left: "58%" }, delay: 900, zIndex: 1, rotate: -12 },

  // ===== 下段 2 段目 =====
  { key: "p-v6", text: "「標準設備に、震えた。」", size: "md", color: "black", pos: { top: "81%", left: "4%" }, delay: 950, voiceId: "279070", zIndex: 2 },
  { key: "p-v7", text: "やっと、ここに決められた。", size: "md", color: "blue", pos: { top: "81%", left: "36%" }, delay: 1000, voiceId: "202180", zIndex: 2 },

  // ===== 下段 右下: 結論風の再掲（青・2 行） =====
  { key: "p-v8-1", text: "「これが正解だった」と、", size: "md", color: "blue", textAlignRight: true, pos: { top: "75%", right: "4%" }, delay: 1050, zIndex: 2 },
  { key: "p-v8-2", text: "心から言える。", size: "lg", color: "blue", textAlignRight: true, pos: { top: "79%", right: "4%" }, delay: 1080, voiceId: "199927", zIndex: 2 },
];

/* =============================================================================
   Mobile レイアウト（375 × 700）— PC と同じ広告ポスター構造を縦方向に圧縮
   ========================================================================== */
const TEXT_BLOCKS_MB: TextBlock[] = [
  // ===== ヘッダー =====
  { key: "m-label", text: "プレミアム・ボイス｜お客様の声", size: "xs", color: "black", pos: { top: "3%", left: "4%" }, delay: 0, zIndex: 2 },

  // ===== 上段の声 2 つ =====
  { key: "m-v1", text: "「諦めかけた時、出会えた。」", size: "sm", color: "blue", pos: { top: "8%", left: "4%" }, delay: 200, voiceId: "216803", zIndex: 2 },
  { key: "m-v2", text: "嘘のない、標準仕様。", size: "sm", color: "black", pos: { top: "12%", right: "4%" }, delay: 250, voiceId: "208787", textAlignRight: true, zIndex: 2 },

  // ===== 装飾 ! 右 =====
  { key: "m-excl-1", text: "！", size: "xxl", color: "red", pos: { top: "17%", right: "10%" }, delay: 400, zIndex: 1, rotate: -6 },

  // ===== 中央: PAIN（HUGE 赤・2 行） =====
  { key: "m-pain-lead", text: "2年近く、", size: "xl", color: "black", pos: { top: "22%", left: "4%" }, delay: 500, zIndex: 2 },
  { key: "m-pain-1", text: "土地が、", size: "mega", color: "red", pos: { top: "28%", left: "4%" }, delay: 600, zIndex: 2 },
  { key: "m-pain-2", text: "見つからなかった。", size: "mega", color: "red", pos: { top: "38%", left: "4%" }, delay: 650, voiceId: "199927", zIndex: 2 },

  // ===== 装飾 ! ピンク =====
  { key: "m-excl-2", text: "！", size: "xl", color: "pink", pos: { top: "48%", right: "6%" }, delay: 900, zIndex: 1, rotate: -10 },

  // ===== PAIN 発話者 =====
  { key: "m-pain-attr", text: "— 奈良市 M様邸（30代ご夫婦・土地探し 2年）", size: "xs", color: "black", pos: { top: "55%", left: "4%" }, delay: 1100, zIndex: 2 },

  // ===== 下段の解決の声 =====
  { key: "m-v4", text: "どんな時も、駆けつけてくれた。", size: "sm", color: "green", pos: { top: "62%", left: "4%" }, delay: 800, voiceId: "256807", zIndex: 2 },
  { key: "m-v5", text: "追加費用は、ゼロ。", size: "sm", color: "green", pos: { top: "66%", left: "4%" }, delay: 850, voiceId: "208787", zIndex: 2 },
  { key: "m-v6", text: "「標準設備に、震えた。」", size: "sm", color: "black", pos: { top: "70%", left: "4%" }, delay: 950, voiceId: "279070", zIndex: 2 },
  { key: "m-v7", text: "やっと、ここに決められた。", size: "sm", color: "black", pos: { top: "74%", left: "4%" }, delay: 1000, voiceId: "202180", zIndex: 2 },

  // ===== 下段 右下: 結論風（青・2 行） =====
  { key: "m-v8-1", text: "「これが正解だった」と、", size: "sm", color: "blue", textAlignRight: true, pos: { top: "80%", right: "4%" }, delay: 1050, zIndex: 2 },
  { key: "m-v8-2", text: "心から言える。", size: "lg", color: "blue", textAlignRight: true, pos: { top: "84%", right: "4%" }, delay: 1080, voiceId: "199927", zIndex: 2 },
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
