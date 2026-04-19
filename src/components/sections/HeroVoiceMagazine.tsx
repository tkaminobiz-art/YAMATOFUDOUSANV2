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

/* PC サイズ定義（3×3 グリッド・誌面ヘッドライン調） */
const SIZE_PC: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "clamp(80px, 9vw, 132px)",   weight: 900, lh: 0.92, ls: "-0.05em" },
  xxl:  { fontSize: "clamp(56px, 6.2vw, 96px)",  weight: 900, lh: 1.0,  ls: "-0.04em" },
  xl:   { fontSize: "clamp(32px, 3.4vw, 52px)",  weight: 900, lh: 1.1,  ls: "-0.03em" },
  lg:   { fontSize: "clamp(22px, 2.0vw, 28px)",  weight: 900, lh: 1.22, ls: "-0.03em" },
  md:   { fontSize: "clamp(14px, 1.3vw, 18px)",  weight: 500, lh: 1.55, ls: "0em" },
  sm:   { fontSize: "clamp(12px, 1.0vw, 14px)",  weight: 500, lh: 1.6,  ls: "0em" },
  xs:   { fontSize: "11px",                       weight: 500, lh: 1.7,  ls: "0.08em" },
};

/* Mobile サイズ定義（縦 1 列、誌面調・参照画像準拠） */
const SIZE_MB: Record<Size, { fontSize: string; weight: number; lh: number; ls: string }> = {
  mega: { fontSize: "52px", weight: 900, lh: 0.92, ls: "-0.05em" }, // 縦組 spine 専用の大判
  xxl:  { fontSize: "42px", weight: 900, lh: 0.95, ls: "-0.04em" }, // Hero 3 行用
  xl:   { fontSize: "28px", weight: 900, lh: 1.1,  ls: "-0.03em" }, // 「出会えた。」mini-hero
  lg:   { fontSize: "19px", weight: 900, lh: 1.25, ls: "-0.02em" }, // Pain 1・強 satellite
  md:   { fontSize: "14px", weight: 700, lh: 1.45, ls: "0em" },     // 通常 satellite
  sm:   { fontSize: "11px", weight: 500, lh: 1.5,  ls: "0em" },     // minor
  xs:   { fontSize: "10px", weight: 500, lh: 1.6,  ls: "0.08em" },  // 属性・ヘッダー
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
  /** 下線装飾（1 箇所のアクセント用・色指定） */
  underline?: Color;
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
  // ===== ヘッダー（左: 誌面タイトル Latin+JP の 2 段、右: 号数） =====
  { key: "p-label-en", text: "VOICE", size: "xs", color: "black", uppercase: true, pos: { top: "4%", left: "3%" }, delay: 0, zIndex: 3 },
  { key: "p-label-jp", text: "お客様の声", size: "sm", color: "black", pos: { top: "7%", left: "3%" }, delay: 50, zIndex: 3 },
  { key: "p-label-r",  text: "Testimonials — Vol. 04", size: "xs", color: "black", uppercase: true, textAlignRight: true, pos: { top: "4%", right: "3%" }, delay: 0, zIndex: 3 },
  { key: "p-label-r2", text: "2026 Spring / Yamato Real Estate", size: "xs", color: "black", textAlignRight: true, pos: { top: "7%", right: "3%" }, delay: 50, zIndex: 3 },

  // ===== 上部左: PAIN（赤・xl・2 行）=====
  { key: "p-r1-a", text: "「2年、",                   size: "xl", color: "red", pos: { top: "15%", left: "3%" }, delay: 200, zIndex: 2 },
  { key: "p-r1-b", text: "見つからなかった。」",       size: "xl", color: "red", pos: { top: "22%", left: "3%" }, delay: 240, voiceId: "199927", zIndex: 2 },

  // ===== 上部中右: PAIN 2（赤・xl・2 行）=====
  { key: "p-r2-a", text: "「他社は、",                 size: "xl", color: "red", pos: { top: "15%", left: "38%" }, delay: 280, zIndex: 2 },
  { key: "p-r2-b", text: "標準が低かった。」",         size: "xl", color: "red", pos: { top: "22%", left: "38%" }, delay: 320, voiceId: "279070", zIndex: 2 },

  // ===== 上部右小: After 1（緑・md）=====
  { key: "p-g1", text: "「追加費用は、ゼロだった。」", size: "md", color: "green", pos: { top: "32%", left: "38%" }, delay: 360, voiceId: "208787", zIndex: 2 },

  // ===== HERO: Decision の頂点（青・mega・2 行、左寄り大判）=====
  { key: "p-hero-a", text: "「ここに住みたい、",       size: "mega", color: "blue", pos: { top: "36%", left: "1%" },  delay: 420, zIndex: 3 },
  { key: "p-hero-b", text: "と思えた。」",             size: "mega", color: "blue", pos: { top: "53%", left: "6%" },  delay: 480, voiceId: "202180", zIndex: 3 },

  // ===== 右 spine: 黒縦組（Neutral 結論）— 縦書きは右から読むので 正解だったと、を右端に =====
  { key: "p-vert-1", text: "正解だったと、", size: "xxl", color: "black", vertical: true, pos: { top: "12%", right: "3%" },  delay: 540, zIndex: 1 },
  { key: "p-vert-2", text: "言える。",       size: "xxl", color: "black", vertical: true, pos: { top: "12%", right: "12%" }, delay: 580, voiceId: "199927", zIndex: 1 },

  // ===== 中段右: Decision satellite（青・md）=====
  { key: "p-sat-b", text: "諦めかけた時、出会えた。", size: "lg", color: "blue", pos: { top: "72%", left: "44%" }, delay: 620, voiceId: "216803", zIndex: 2 },

  // ===== 下部左: Neutral（黒・lg）=====
  { key: "p-black-1", text: "嘘のない、標準仕様だった。", size: "lg", color: "black", pos: { top: "81%", left: "3%" }, delay: 660, voiceId: "208787", zIndex: 2 },

  // ===== 下部中: Minor（黒・sm）=====
  { key: "p-black-2", text: "やっと、決められた。", size: "md", color: "black", pos: { top: "90%", left: "38%" }, delay: 700, voiceId: "199927", zIndex: 2 },

  // ===== 下部右: After 2（緑・lg・下線アクセント）=====
  { key: "p-g2", text: "いつでも駆けつけてくれる。", size: "lg", color: "green", underline: "green", pos: { top: "90%", left: "58%" }, delay: 740, voiceId: "256807", zIndex: 2 },

  // ===== フッター =====
  { key: "p-footer-l", text: "奈良市・斑鳩町・京田辺市・生駒市 ほか、お客様 9 組の声より", size: "xs", color: "black", pos: { top: "96%", left: "3%" }, delay: 900, zIndex: 3 },
  { key: "p-footer-r", text: "Editorial / Yamato Real Estate, 2026", size: "xs", color: "black", textAlignRight: true, pos: { top: "96%", right: "3%" }, delay: 950, zIndex: 3 },
];

/* =============================================================================
   Mobile レイアウト（375 × 700）— PC と同じ広告ポスター構造を縦方向に圧縮
   ========================================================================== */
const TEXT_BLOCKS_MB: TextBlock[] = [
  // ===== ヘッダー =====
  { key: "m-label-en", text: "VOICE", size: "xs", color: "black", uppercase: true, pos: { top: "2%", left: "4%" }, delay: 0, zIndex: 3 },
  { key: "m-label-jp", text: "お客様の声", size: "xs", color: "black", pos: { top: "4.5%", left: "4%" }, delay: 50, zIndex: 3 },
  { key: "m-label-r",  text: "Vol. 04 — 2026", size: "xs", color: "black", uppercase: true, textAlignRight: true, pos: { top: "3%", right: "4%" }, delay: 0, zIndex: 3 },

  // ===== 右 spine: 黒縦組 mega・単一列 — ページを貫通する巨大 spine =====
  { key: "m-vert", text: "正解だったと、言える。", size: "mega", color: "black", vertical: true, pos: { top: "8%", right: "4%" }, delay: 540, voiceId: "199927", zIndex: 1 },

  // ===== PAIN 1（赤・xl・1 行）Tier 2 = ストーリー冒頭 punch =====
  { key: "m-r1", text: "「2年、見つからなかった」", size: "xl", color: "red", pos: { top: "10%", left: "1%" }, delay: 200, voiceId: "199927", zIndex: 2 },

  // ===== PAIN 2（赤・md・2 行・中央右寄り）Tier 4 = 補足 =====
  { key: "m-r2-a", text: "「他社は、標準が",   size: "md", color: "red", pos: { top: "16%", left: "44%" }, delay: 280, zIndex: 2 },
  { key: "m-r2-b", text: "低かった。」",       size: "md", color: "red", pos: { top: "19%", left: "52%" }, delay: 320, voiceId: "279070", zIndex: 2 },

  // ===== HERO（青・xxl・3 行）Tier 1 =====
  { key: "m-hero-a", text: "「ここに",     size: "xxl", color: "blue", pos: { top: "24%", left: "1%" }, delay: 420, zIndex: 3 },
  { key: "m-hero-b", text: "住みたい、",    size: "xxl", color: "blue", pos: { top: "30%", left: "4%" }, delay: 460, zIndex: 3 },
  { key: "m-hero-c", text: "と思えた。」",  size: "xxl", color: "blue", pos: { top: "36%", left: "7%" }, delay: 500, voiceId: "202180", zIndex: 3 },

  // ===== Satellites（Tier 3 に底上げして誌面の punch を増やす） =====

  // Block A: 諦めかけた時、(Tier 4 minor) / 出会えた。(Tier 2 sub-hero)
  { key: "m-sat-b",   text: "諦めかけた時、",   size: "md", color: "blue",  pos: { top: "44%", left: "3%" }, delay: 620, zIndex: 2 },
  { key: "m-sat-b2",  text: "出会えた。",       size: "xl", color: "blue",  pos: { top: "47.5%", left: "8%" }, delay: 640, voiceId: "216803", zIndex: 2 },

  // Block B: 追加費用（緑 Tier 3）
  { key: "m-g1", text: "「追加費用は、ゼロだった。」", size: "lg", color: "green", pos: { top: "55%", left: "3%" }, delay: 700, voiceId: "208787", zIndex: 2 },

  // Block C: 嘘のない、/ 標準仕様だった。（黒 Tier 3 2 行）
  { key: "m-black-1",  text: "嘘のない、",       size: "lg", color: "black", pos: { top: "61%", left: "3%" }, delay: 660, zIndex: 2 },
  { key: "m-black-1b", text: "標準仕様だった。", size: "lg", color: "black", pos: { top: "65%", left: "3%" }, delay: 680, voiceId: "208787", zIndex: 2 },

  // Block D: いつでも駆けつけてくれる。（緑 Tier 3・下線アクセント）
  { key: "m-g2", text: "いつでも駆けつけてくれる。", size: "lg", color: "green", underline: "green", pos: { top: "71%", left: "3%" }, delay: 740, voiceId: "256807", zIndex: 2 },

  // Block E: やっと、決められた。（黒 Tier 2・結末 punch）
  { key: "m-black-2", text: "やっと、決められた。", size: "xl", color: "black", pos: { top: "77%", left: "8%" }, delay: 780, voiceId: "199927", zIndex: 2 },

  // ===== フッター（右側は spine と x 衝突するため削除。header の Vol.04—2026 と情報的にも冗長） =====
  { key: "m-footer-l", text: "奈良・京都／お客様 9 組の声より", size: "xs", color: "black", pos: { top: "87%", left: "4%" }, delay: 900, zIndex: 3 },
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
  if (block.underline) {
    baseStyle.textDecoration = "underline";
    baseStyle.textDecorationColor = COLOR[block.underline];
    baseStyle.textDecorationThickness = "3px";
    baseStyle.textUnderlineOffset = "0.2em";
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
