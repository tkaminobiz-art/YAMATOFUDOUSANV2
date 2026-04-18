"use client";

/**
 * HeroVoiceMagazine — カオス・タイポグラフィ（v9）
 * ----------------------------------------------------------------------
 * 2026-04-17 最終方針:
 *   - 文字だけで勝負（画像・ウォーターマーク全廃）
 *   - サイズ階層 7段（mega / xxl / xl / lg / md / sm / xs）
 *   - 文節分解：1文を複数パーツに切って色・サイズを変える
 *   - 意図的な重なり・回転で密度を上げる
 *   - 縦書きの巨大漢字を背景風レイヤーに
 *   - 記号（、 。 ！ →）を単独で特大配置
 *   - PC / Mobile 両方 100svh 1画面カオス（モバイル専用座標）
 *
 * Neo Japan 5色（メイン Electric Red）
 *   red #FF2D2D / blue #002FA7 / pink #FF0080 / yellow #FFD600 / green #00A870
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

/* PC サイズ定義（6段 + mega） */
const SIZE_PC: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "clamp(120px, 14vw, 220px)", weight: 900, lh: 0.88, ls: "-0.06em" },
  xxl:  { fontSize: "clamp(72px, 8.4vw, 132px)", weight: 900, lh: 0.94, ls: "-0.05em" },
  xl:   { fontSize: "clamp(44px, 5vw, 80px)",    weight: 900, lh: 1.0,  ls: "-0.04em" },
  lg:   { fontSize: "clamp(28px, 3vw, 48px)",    weight: 900, lh: 1.08, ls: "-0.03em" },
  md:   { fontSize: "clamp(16px, 1.6vw, 22px)",  weight: 700, lh: 1.5,  ls: "0em" },
  sm:   { fontSize: "clamp(12px, 1.1vw, 15px)",  weight: 500, lh: 1.6,  ls: "0.01em" },
  xs:   { fontSize: "10.5px",                     weight: 700, lh: 1.4,  ls: "0.22em" },
};

/* Mobile サイズ定義（375 × 700 最適化） */
const SIZE_MB: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "72px", weight: 900, lh: 0.9,  ls: "-0.05em" },
  xxl:  { fontSize: "36px", weight: 900, lh: 0.98, ls: "-0.04em" },
  xl:   { fontSize: "24px", weight: 900, lh: 1.05, ls: "-0.03em" },
  lg:   { fontSize: "18px", weight: 900, lh: 1.1,  ls: "-0.02em" },
  md:   { fontSize: "12px", weight: 700, lh: 1.4,  ls: "0em" },
  sm:   { fontSize: "10.5px", weight: 500, lh: 1.5, ls: "0em" },
  xs:   { fontSize: "8.5px", weight: 700, lh: 1.3, ls: "0.2em" },
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
   PC レイアウト（1440 × 790 相当、12列×10行の仮想グリッドで再計算）

   ┌ Row1-2  (0-12%)  Zone H : 大見出し
   ├ Row3-5  (14-44%) Zone A : 01 ANXIETY 左・02 STANDARD 右
   ├ Row5-7  (44-60%) Zone X : 中央装飾（！・→）+ 非公開縦書き右
   ├ Row7-9  (60-80%) Zone B : 03 COMPARISON 左・04 RESCUE 中・05 DISCOVERY 右
   └ Row10   (85-96%) Zone C : 06・07・08 下段 1 行ずつ

   zIndex 体系:
     0: 背景の巨大漢字「諦」
     1: 装飾記号「！」「→」「非公開」
     2: 主要テキスト
     3: 大見出し
   ========================================================================== */
const TEXT_BLOCKS_PC: TextBlock[] = [
  // ===== Zone H: 大見出し（コンパクト、下段に主役を譲る） =====
  { key: "p-h-a", text: "「諦めかけていた」", size: "lg", color: "black", pos: { top: "1%", left: "4%" }, delay: 0, zIndex: 3 },
  { key: "p-h-b", text: "から、", size: "md", color: "black", pos: { top: "2.5%", left: "30%" }, delay: 50, zIndex: 3 },
  { key: "p-h-c", text: "「やまとでよかった」", size: "xl", color: "red", pos: { top: "6%", left: "6%" }, delay: 100, zIndex: 3, rotate: -1 },
  { key: "p-h-d", text: "まで。", size: "md", color: "black", pos: { top: "9%", right: "6%" }, delay: 150, zIndex: 3 },

  // ===== Zone A-LEFT: 01 ANXIETY（真の主役） =====
  { key: "p-01-mega", text: "諦", size: "mega", color: "red", opacity: 0.08, pos: { top: "18%", left: "-2%" }, delay: 200, zIndex: 0 },
  { key: "p-01-a", text: "2年近く", size: "lg", color: "black", rotate: -3, pos: { top: "18%", left: "12%" }, delay: 250, zIndex: 2 },
  { key: "p-01-b", text: "土地が", size: "xl", color: "black", pos: { top: "23%", left: "16%" }, delay: 300, zIndex: 2 },
  { key: "p-01-c", text: "見つからなかった。", size: "xxl", color: "red", pos: { top: "32%", left: "10%" }, delay: 350, zIndex: 2, voiceId: "199927" },
  { key: "p-01-d", text: "やっと", size: "lg", color: "yellow", pos: { top: "48%", left: "14%" }, delay: 400, zIndex: 2, rotate: -2 },
  { key: "p-01-e", text: "納得できたのが、", size: "md", color: "black", pos: { top: "50%", left: "24%" }, delay: 450, zIndex: 2 },
  { key: "p-01-f", text: "やまとの分譲地でした。", size: "xl", color: "blue", pos: { top: "54%", left: "12%" }, delay: 500, zIndex: 2, voiceId: "199927" },

  // ===== Zone A-RIGHT: 02 STANDARD =====
  { key: "p-02-a", text: "他社のオプションが、", size: "md", color: "black", pos: { top: "18%", right: "4%" }, delay: 550, zIndex: 2 },
  { key: "p-02-b", text: "やまとでは", size: "lg", color: "black", pos: { top: "21%", right: "4%" }, delay: 600, zIndex: 2 },
  { key: "p-02-c", text: "標準。", size: "xl", color: "blue", pos: { top: "26%", right: "4%" }, delay: 650, voiceId: "208787", rotate: -2, zIndex: 2 },
  { key: "p-02-d", text: "追加費用、", size: "md", color: "black", pos: { top: "38%", right: "4%" }, delay: 700, zIndex: 2 },
  { key: "p-02-e", text: "ゼロ。", size: "lg", color: "green", pos: { top: "41%", right: "4%" }, delay: 750, voiceId: "208787", rotate: 2, zIndex: 2 },

  // ===== Zone X: 中央装飾 =====
  { key: "p-excl", text: "！", size: "xxl", color: "pink", pos: { top: "49%", left: "48%" }, delay: 800, zIndex: 1, rotate: 6 },
  { key: "p-05-vert", text: "非公開", size: "lg", color: "yellow", vertical: true, pos: { top: "54%", right: "30%" }, delay: 850, zIndex: 1 },

  // ===== Zone B-LEFT: 03 COMPARISON =====
  { key: "p-03-a", text: "他社の標準は", size: "md", color: "black", pos: { top: "66%", left: "12%" }, delay: 900, zIndex: 2 },
  { key: "p-03-b", text: "グレードが", size: "lg", color: "black", pos: { top: "69%", left: "14%" }, delay: 950, rotate: -1, zIndex: 2 },
  { key: "p-03-c", text: "低い。", size: "xl", color: "green", pos: { top: "73%", left: "24%" }, delay: 1000, voiceId: "279070", zIndex: 2 },

  // ===== Zone B-CENTER: 04 RESCUE =====
  { key: "p-04-a", text: "諦めかけた時に、", size: "md", color: "black", pos: { top: "66%", left: "40%" }, delay: 1050, zIndex: 2 },
  { key: "p-04-b", text: "出会えた。", size: "xl", color: "pink", pos: { top: "70%", left: "42%" }, delay: 1100, voiceId: "216803", rotate: 3, zIndex: 2 },

  // ===== Zone B-RIGHT: 05 DISCOVERY =====
  { key: "p-05-a", text: "ドンピシャを、", size: "md", color: "black", pos: { top: "66%", right: "4%" }, delay: 1150, zIndex: 2 },
  { key: "p-05-b", text: "紹介してくれた。", size: "lg", color: "black", pos: { top: "69%", right: "4%" }, delay: 1200, voiceId: "240061", zIndex: 2 },

  // ===== Zone C: 06/07/08 下段（1行ずつ、色でアクセント） =====
  { key: "p-06", text: "やまとの土地は、どこも住みやすい。", size: "md", color: "green", pos: { top: "88%", left: "12%" }, delay: 1250, voiceId: "276882", zIndex: 2 },
  { key: "p-arrow", text: "→", size: "xl", color: "red", pos: { top: "87%", left: "38%" }, delay: 1300, rotate: -8, zIndex: 1 },
  { key: "p-07", text: "「ここに建てたい」土地に、旗が。", size: "md", color: "blue", pos: { top: "88%", left: "44%" }, delay: 1350, voiceId: "202180", zIndex: 2 },
  { key: "p-08", text: "建てた後も、すぐ駆けつけてくれる。", size: "md", color: "red", pos: { top: "88%", right: "4%" }, delay: 1400, voiceId: "256807", zIndex: 2 },
];

/* =============================================================================
   Mobile レイアウト（375 × 700 相当、10 行に正確分割）

   Row 1-2  (0-13%)   Zone H : 大見出し
   Row 3-5  (16-40%)  Zone A : 01 ANXIETY（右寄り）+ 諦 mega 左背景
   Row 5-7  (40-58%)  Zone B : 02 STANDARD（左）+ ！（右中央アクセント）
   Row 7-8  (58-70%)  Zone C : 03 COMPARISON（左）+ 04 RESCUE（右）
   Row 8-9  (68-80%)  Zone D : 05 DISCOVERY + 非公開 縦書き
   Row 10   (80-95%)  Zone E : 06/07/08 下段 + → アクセント
   ========================================================================== */
const TEXT_BLOCKS_MB: TextBlock[] = [
  // ===== Zone H: 大見出し =====
  { key: "m-h-a", text: "「諦めかけ」", size: "xxl", color: "black", pos: { top: "1%", left: "4%" }, delay: 0, zIndex: 3 },
  { key: "m-h-b", text: "から、", size: "lg", color: "black", pos: { top: "2%", right: "4%" }, delay: 50, zIndex: 3 },
  { key: "m-h-c", text: "「やまとで", size: "xl", color: "red", pos: { top: "7.5%", left: "14%" }, delay: 100, zIndex: 3 },
  { key: "m-h-d", text: "よかった」", size: "xl", color: "red", pos: { top: "11.5%", left: "22%" }, delay: 150, zIndex: 3, rotate: -2 },
  { key: "m-h-e", text: "まで。", size: "lg", color: "black", pos: { top: "11.5%", right: "4%" }, delay: 200, zIndex: 3 },

  // ===== Zone A: 01 ANXIETY =====
  { key: "m-01-mega", text: "諦", size: "mega", color: "red", opacity: 0.1, pos: { top: "20%", left: "-4%" }, delay: 250, zIndex: 0 },
  { key: "m-01-a", text: "2年近く", size: "md", color: "black", rotate: -2, pos: { top: "19%", right: "4%" }, delay: 300, zIndex: 2 },
  { key: "m-01-b", text: "土地が", size: "lg", color: "black", pos: { top: "23%", right: "4%" }, delay: 350, zIndex: 2 },
  { key: "m-01-c", text: "見つからなかった。", size: "lg", color: "red", pos: { top: "28%", right: "4%" }, delay: 400, voiceId: "199927", zIndex: 2 },
  { key: "m-01-d", text: "やまとの分譲地で解決。", size: "sm", color: "blue", pos: { top: "34%", right: "4%" }, delay: 450, voiceId: "199927", zIndex: 2 },

  // ===== Zone B: 02 STANDARD + ! =====
  { key: "m-02-a", text: "他社のオプションが、", size: "md", color: "black", pos: { top: "42%", left: "4%" }, delay: 500, zIndex: 2 },
  { key: "m-02-b", text: "やまとは標準。", size: "lg", color: "blue", pos: { top: "45%", left: "4%" }, delay: 550, voiceId: "208787", rotate: -1, zIndex: 2 },
  { key: "m-02-c", text: "追加費用", size: "md", color: "black", pos: { top: "52%", left: "4%" }, delay: 600, zIndex: 2 },
  { key: "m-02-d", text: "ゼロ。", size: "lg", color: "green", pos: { top: "51%", left: "38%" }, delay: 650, rotate: -3, voiceId: "208787", zIndex: 2 },
  { key: "m-excl", text: "！", size: "xxl", color: "pink", pos: { top: "44%", right: "4%" }, delay: 700, zIndex: 1, rotate: 8 },

  // ===== Zone C: 03 + 04 =====
  { key: "m-03-a", text: "他社の標準は", size: "sm", color: "black", pos: { top: "60%", left: "4%" }, delay: 750, zIndex: 2 },
  { key: "m-03-b", text: "グレードが低い。", size: "lg", color: "green", pos: { top: "62%", left: "4%" }, delay: 800, voiceId: "279070", rotate: -1, zIndex: 2 },
  { key: "m-04-a", text: "諦めかけた時に、", size: "sm", color: "black", pos: { top: "67%", right: "4%" }, delay: 850, zIndex: 2 },
  { key: "m-04-b", text: "出会えた。", size: "lg", color: "pink", pos: { top: "69%", right: "4%" }, delay: 900, voiceId: "216803", rotate: 3, zIndex: 2 },

  // ===== Zone D: 05 DISCOVERY + 非公開 =====
  { key: "m-05-vert", text: "非公開", size: "md", color: "yellow", vertical: true, pos: { top: "62%", right: "38%" }, delay: 950, zIndex: 1 },
  { key: "m-05-a", text: "ドンピシャの土地を、", size: "sm", color: "black", pos: { top: "76%", left: "4%" }, delay: 1000, zIndex: 2 },
  { key: "m-05-b", text: "紹介してくれた。", size: "md", color: "black", pos: { top: "78.5%", left: "4%" }, delay: 1050, voiceId: "240061", zIndex: 2 },

  // ===== Zone E: 06/07/08 下段（FloatingCta と衝突しないよう top を圧縮） =====
  { key: "m-06", text: "やまとの土地は、どこも住みやすい。", size: "sm", color: "green", pos: { top: "83%", left: "4%" }, delay: 1100, voiceId: "276882", zIndex: 2 },
  { key: "m-07", text: "「ここに建てたい」土地に、旗が。", size: "sm", color: "blue", pos: { top: "86%", left: "4%" }, delay: 1150, voiceId: "202180", zIndex: 2 },
  { key: "m-08", text: "建てた後も、すぐ駆けつけてくれる。", size: "sm", color: "red", pos: { top: "89%", left: "4%" }, delay: 1200, voiceId: "256807", zIndex: 2 },
  { key: "m-arrow", text: "→", size: "xl", color: "red", pos: { top: "83%", right: "4%" }, delay: 1250, rotate: -8, zIndex: 1 },
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
