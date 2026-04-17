"use client";

/**
 * HeroBubbles — 声の風船
 * ----------------------------------------------------------------------
 * FV(HeroCatalog) 直下の 2 枚目セクション。
 * 19 件の killer line を "吹き出し（speech bubble）" として配置し、
 * 風と sine 波の合成でゆるやかに漂わせる。
 *
 * デザイン決定（Designer X × Y ディスカッション合意）:
 *   - 背景：温かいオフホワイト #FDF9F1（純白ではない）
 *   - 色3色：若菜 #DDEBCC（悩み・比較）/ 桜 #FADADD（発見・決断）/ 柿渋 #F5D7B8（約束）
 *   - 吹き出しは四角の角丸を四隅微妙にずらして "切り紙" の手作り感
 *   - 3ティア（Hero 5 / Featured 9 / Accent 5）で階層
 *   - 独立 sine 波 × 回転揺れ × hover スケールで "浮遊"
 *   - hover で他が opacity 0.35 に沈む（focus の誘導）
 *   - `prefers-reduced-motion: reduce` で静止
 *
 * データ: @/data/voiceHome.ts KILLER_LINES（参照のみ、本コンポーネント用に再構成）
 * プラン: ~/.claude/plans/wiggly-inventing-plum.md（一部踏襲）
 */

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
} from "react";
import Link from "next/link";
import CtaButton from "@/components/ui/CtaButton";
import type { ActKey } from "@/data/voiceHome";

/* =========================================================================
   型
   ====================================================================== */

type Tier = "hero" | "featured" | "accent";
type TailDirection = "down" | "up" | "left" | "right";

type BubbleColor = {
  bg: string;
  border: string;
  glow: string;
  /** ビビッド色の上でのテキスト色（コントラスト比 WCAG AA 確保） */
  text: string;
};

type BubbleConfig = {
  /** /voice/[id] リンクの id（数値部分） */
  voiceId: string;
  /** React key（原文 id の suffix 含む） */
  key: string;
  /** 表示テキスト（KILLER_LINES と同一） */
  line: string;
  act: ActKey;
  tier: Tier;
  /** 初期位置（コンテナ比） 0.08〜0.92 に収めるのが安全 */
  xRatio: number;
  yRatio: number;
  /** 揺れ振幅 px */
  ampX: number;
  ampY: number;
  /** 揺れ周期 秒 */
  periodX: number;
  periodY: number;
  /** 回転振幅 deg / 周期 秒 */
  rotAmp: number;
  rotPeriod: number;
  /** 初期位相 0..1（波の重なり調整） */
  phase: number;
  /** 吹き出しの尻尾方向（Accent は undefined で尻尾なし） */
  tailDirection?: TailDirection;
  /** モバイル(<768)で非表示 */
  hiddenOnMobile?: boolean;
  /** 見た目の手作り感：四隅の border-radius（px） */
  borderRadius: string;
};

/* =========================================================================
   カラー（幕 → 3色に集約）
   ====================================================================== */

/**
 * Japanese Pop（日本の伝統色のビビッド版）
 * - 露草 anxiety   #5AA9E6（悩みからの解放＝空のような青）
 * - 山吹 discovery #F4C542（発見の黄金色）
 * - 若草 comparison #7FB069（比較の爽やかな緑）
 * - 緋色 decision  #E63946（決断の鮮烈な赤）
 * - 橙   promise   #F28C38（約束の温かい橙）
 *
 * 新しい act キー（anxiety / standard / partner / tochi / after）も同じ5色をマップ。
 * voiceHome.ts 側の act 定義と同期させること。
 */
const COLORS: Record<ActKey, BubbleColor> = {
  // 旧定義（互換維持）— 新しい KILLER_LINES が入っても壊れないよう 5 色フル定義
  anxiety: {
    bg: "#5AA9E6",
    border: "#3B8BC7",
    glow: "rgba(90,169,230,0.55)",
    text: "#1A1A1A",
  },
  discovery: {
    bg: "#F4C542",
    border: "#D4A524",
    glow: "rgba(244,197,66,0.55)",
    text: "#1A1A1A",
  },
  comparison: {
    bg: "#7FB069",
    border: "#5A8F48",
    glow: "rgba(127,176,105,0.55)",
    text: "#1A1A1A",
  },
  decision: {
    bg: "#E63946",
    border: "#C42A36",
    glow: "rgba(230,57,70,0.50)",
    text: "#FFFFFF", // 緋色上は白で WCAG AA 確保（5.02）
  },
  promise: {
    bg: "#F28C38",
    border: "#D27020",
    glow: "rgba(242,140,56,0.55)",
    text: "#1A1A1A",
  },
};

/* =========================================================================
   ティア別スタイル
   ====================================================================== */

const TIER_STYLES: Record<
  Tier,
  {
    widthClass: string;
    paddingClass: string;
    fontClass: string;
    fontFamily: string;
    fontWeight: number;
  }
> = {
  hero: {
    widthClass: "w-[min(52vw,200px)] md:w-[340px]",
    paddingClass: "px-4 py-3 md:px-8 md:py-6",
    fontClass: "text-[clamp(15px,2.2vw,28px)]",
    fontFamily: "var(--font-serif)",
    fontWeight: 400,
  },
  featured: {
    widthClass: "w-[min(48vw,180px)] md:w-[260px]",
    paddingClass: "px-3.5 py-2.5 md:px-6 md:py-4",
    fontClass: "text-[clamp(12px,1.3vw,18px)]",
    fontFamily: "var(--font-sans)",
    fontWeight: 400,
  },
  accent: {
    widthClass: "w-[min(40vw,150px)] md:w-[180px]",
    paddingClass: "px-3 py-2 md:px-4 md:py-3",
    fontClass: "text-[clamp(11px,1vw,14px)]",
    fontFamily: "var(--font-sans)",
    fontWeight: 300,
  },
};

/* =========================================================================
   吹き出し配置（19件）
   - 位置は 0.08〜0.92 で画面端からクリアランス
   - 振幅 16〜28px / 周期 7〜14s / phase 0..1 で個別リズム
   - 角丸は各吹き出しで微妙にずらし "手作り感"
   ====================================================================== */

const BUBBLES: readonly BubbleConfig[] = [
  // ======== Hero 5（Z字配置） ========
  {
    voiceId: "242157",
    key: "242157-hero",
    line: "今日は誰に合いに行くの？",
    act: "promise",
    tier: "hero",
    xRatio: 0.28,
    yRatio: 0.2,
    ampX: 22,
    ampY: 14,
    periodX: 9,
    periodY: 12,
    rotAmp: 2.5,
    rotPeriod: 8,
    phase: 0.05,
    tailDirection: "down",
    borderRadius: "28px 40px 24px 36px",
  },
  {
    voiceId: "216803",
    key: "216803-hero",
    line: "一度　諦めようと思っていた時に",
    act: "anxiety",
    tier: "hero",
    xRatio: 0.68,
    yRatio: 0.16,
    ampX: 18,
    ampY: 16,
    periodX: 11,
    periodY: 10,
    rotAmp: 2,
    rotPeriod: 9,
    phase: 0.23,
    tailDirection: "down",
    borderRadius: "36px 24px 32px 22px",
  },
  {
    voiceId: "202180",
    key: "202180-hero",
    line: "やまと不動産の旗が立っていて",
    act: "discovery",
    tier: "hero",
    xRatio: 0.44,
    yRatio: 0.48,
    ampX: 26,
    ampY: 12,
    periodX: 10,
    periodY: 14,
    rotAmp: 3,
    rotPeriod: 7,
    phase: 0.47,
    tailDirection: "right",
    borderRadius: "24px 34px 28px 38px",
  },
  {
    voiceId: "279070",
    key: "279070-hero",
    line: "他社様の標準仕様は　グレードが低い",
    act: "comparison",
    tier: "hero",
    xRatio: 0.74,
    yRatio: 0.68,
    ampX: 20,
    ampY: 18,
    periodX: 12,
    periodY: 11,
    rotAmp: 2.5,
    rotPeriod: 9,
    phase: 0.68,
    tailDirection: "up",
    borderRadius: "32px 28px 40px 24px",
  },
  {
    voiceId: "256834",
    key: "256834-hero",
    line: "あとは直観！",
    act: "decision",
    tier: "hero",
    xRatio: 0.26,
    yRatio: 0.8,
    ampX: 28,
    ampY: 18,
    periodX: 8,
    periodY: 13,
    rotAmp: 3.5,
    rotPeriod: 6,
    phase: 0.88,
    tailDirection: "up",
    borderRadius: "36px 28px 24px 40px",
  },

  // ======== Featured 9 ========
  {
    voiceId: "199927",
    key: "199927-feat",
    line: "2年近く　土地を探していた",
    act: "anxiety",
    tier: "featured",
    xRatio: 0.4,
    yRatio: 0.08,
    ampX: 18,
    ampY: 14,
    periodX: 10,
    periodY: 12,
    rotAmp: 2,
    rotPeriod: 8,
    phase: 0.14,
    tailDirection: "up",
    borderRadius: "22px 28px 20px 24px",
  },
  {
    voiceId: "240061",
    key: "240061-anx-feat",
    line: "もう妥協していかないと進まないなぁと",
    act: "anxiety",
    tier: "featured",
    xRatio: 0.88,
    yRatio: 0.38,
    ampX: 16,
    ampY: 20,
    periodX: 11,
    periodY: 13,
    rotAmp: 2,
    rotPeriod: 9,
    phase: 0.32,
    tailDirection: "left",
    hiddenOnMobile: true,
    borderRadius: "24px 22px 28px 20px",
  },
  {
    voiceId: "265580",
    key: "265580-feat",
    line: "たまたま通りがかり　モデルハウスを見に",
    act: "discovery",
    tier: "featured",
    xRatio: 0.1,
    yRatio: 0.4,
    ampX: 20,
    ampY: 16,
    periodX: 9,
    periodY: 14,
    rotAmp: 2.5,
    rotPeriod: 7,
    phase: 0.42,
    tailDirection: "right",
    hiddenOnMobile: true,
    borderRadius: "20px 24px 22px 28px",
  },
  {
    voiceId: "240061",
    key: "240061-disc-feat",
    line: "非公開の　お勧め物件があると",
    act: "discovery",
    tier: "featured",
    xRatio: 0.26,
    yRatio: 0.3,
    ampX: 22,
    ampY: 14,
    periodX: 10,
    periodY: 11,
    rotAmp: 2,
    rotPeriod: 8,
    phase: 0.52,
    tailDirection: "down",
    hiddenOnMobile: true,
    borderRadius: "28px 22px 24px 20px",
  },
  {
    voiceId: "239243",
    key: "239243-feat",
    line: "他の不動業者には　類を見ない",
    act: "comparison",
    tier: "featured",
    xRatio: 0.32,
    yRatio: 0.64,
    ampX: 20,
    ampY: 16,
    periodX: 11,
    periodY: 13,
    rotAmp: 2.5,
    rotPeriod: 9,
    phase: 0.58,
    tailDirection: "up",
    borderRadius: "22px 26px 20px 24px",
  },
  {
    voiceId: "208787",
    key: "208787-cmp-feat",
    line: "他社でオプション設定なのが　標準内に",
    act: "comparison",
    tier: "featured",
    xRatio: 0.56,
    yRatio: 0.88,
    ampX: 18,
    ampY: 14,
    periodX: 12,
    periodY: 10,
    rotAmp: 2,
    rotPeriod: 8,
    phase: 0.72,
    tailDirection: "up",
    hiddenOnMobile: true,
    borderRadius: "24px 22px 26px 20px",
  },
  {
    voiceId: "225610",
    key: "225610-feat",
    line: "標準かオプションか　はっきり教えてくれた",
    act: "comparison",
    tier: "featured",
    xRatio: 0.6,
    yRatio: 0.36,
    ampX: 22,
    ampY: 16,
    periodX: 9,
    periodY: 14,
    rotAmp: 2.5,
    rotPeriod: 7,
    phase: 0.18,
    tailDirection: "right",
    hiddenOnMobile: true,
    borderRadius: "26px 20px 22px 28px",
  },
  {
    voiceId: "240061",
    key: "240061-dec-feat",
    line: "ずっと探していた　ドンピシャの場所",
    act: "decision",
    tier: "featured",
    xRatio: 0.92,
    yRatio: 0.26,
    ampX: 16,
    ampY: 18,
    periodX: 11,
    periodY: 12,
    rotAmp: 2,
    rotPeriod: 8,
    phase: 0.86,
    tailDirection: "left",
    hiddenOnMobile: true,
    borderRadius: "20px 28px 24px 22px",
  },
  {
    voiceId: "276846",
    key: "276846-feat",
    line: "途方に暮れているでしょう",
    act: "promise",
    tier: "featured",
    xRatio: 0.1,
    yRatio: 0.62,
    ampX: 16,
    ampY: 14,
    periodX: 10,
    periodY: 11,
    rotAmp: 2,
    rotPeriod: 8,
    phase: 0.78,
    tailDirection: "right",
    hiddenOnMobile: true,
    borderRadius: "22px 20px 26px 24px",
  },

  // ======== Accent 5（モバイル非表示） ========
  {
    voiceId: "212487",
    key: "212487-acc",
    line: "土地（立地）！！",
    act: "decision",
    tier: "accent",
    xRatio: 0.04,
    yRatio: 0.5,
    ampX: 26,
    ampY: 18,
    periodX: 7,
    periodY: 10,
    rotAmp: 4,
    rotPeriod: 5,
    phase: 0.02,
    hiddenOnMobile: true,
    borderRadius: "18px 22px 20px 24px",
  },
  {
    voiceId: "276882",
    key: "276882-acc",
    line: "賃貸派で　家を買うつもりは",
    act: "anxiety",
    tier: "accent",
    xRatio: 0.06,
    yRatio: 0.1,
    ampX: 22,
    ampY: 14,
    periodX: 9,
    periodY: 11,
    rotAmp: 3,
    rotPeriod: 6,
    phase: 0.2,
    hiddenOnMobile: true,
    borderRadius: "20px 18px 22px 16px",
  },
  {
    voiceId: "208787",
    key: "208787-acc",
    line: "小中学校の後輩が担当で",
    act: "discovery",
    tier: "accent",
    xRatio: 0.92,
    yRatio: 0.08,
    ampX: 20,
    ampY: 16,
    periodX: 8,
    periodY: 12,
    rotAmp: 3,
    rotPeriod: 7,
    phase: 0.38,
    hiddenOnMobile: true,
    borderRadius: "22px 20px 18px 24px",
  },
  {
    voiceId: "237073",
    key: "237073-acc",
    line: "このデザインのほうが合う",
    act: "decision",
    tier: "accent",
    xRatio: 0.4,
    yRatio: 0.92,
    ampX: 18,
    ampY: 14,
    periodX: 10,
    periodY: 13,
    rotAmp: 2.5,
    rotPeriod: 6,
    phase: 0.6,
    hiddenOnMobile: true,
    borderRadius: "22px 16px 20px 24px",
  },
  {
    voiceId: "239226",
    key: "239226-acc",
    line: "打ち合わせが　楽しみに",
    act: "promise",
    tier: "accent",
    xRatio: 0.92,
    yRatio: 0.92,
    ampX: 22,
    ampY: 16,
    periodX: 9,
    periodY: 12,
    rotAmp: 3,
    rotPeriod: 7,
    phase: 0.8,
    hiddenOnMobile: true,
    borderRadius: "20px 24px 22px 18px",
  },
];

/* =========================================================================
   吹き出しの尻尾（SVG・asymmetric triangle で手作り感）
   ====================================================================== */

const TAIL_STYLES: Record<TailDirection, CSSProperties> = {
  down: { bottom: -13, left: "30%", transform: "rotate(4deg)" },
  up: { top: -13, left: "65%", transform: "rotate(184deg)" },
  left: { left: -13, top: "58%", transform: "rotate(94deg)" },
  right: { right: -13, top: "42%", transform: "rotate(-86deg)" },
};

function BubbleTail({
  direction,
  fill,
}: {
  direction: TailDirection;
  fill: string;
}) {
  return (
    <svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      aria-hidden
      style={{ position: "absolute", pointerEvents: "none", ...TAIL_STYLES[direction] }}
    >
      <path d="M 1 0 Q 8 3 10 13 Q 14 4 21 1 Z" fill={fill} />
    </svg>
  );
}

/* =========================================================================
   Bubble コンポーネント
   ====================================================================== */

function Bubble({
  config,
  isDimmed,
  reducedMotion,
  onEnter,
  onLeave,
}: {
  config: BubbleConfig;
  isDimmed: boolean;
  reducedMotion: boolean;
  onEnter: (key: string) => void;
  onLeave: () => void;
}) {
  const anchorRef = useRef<HTMLAnchorElement>(null);

  /* ========== 浮遊アニメ（requestAnimationFrame） ========== */
  useEffect(() => {
    if (reducedMotion) return;
    const el = anchorRef.current;
    if (!el) return;

    let rafId = 0;
    const startTime = performance.now() - config.phase * 10000;
    const basePhase = config.phase * Math.PI * 2;

    const tick = (now: number) => {
      const t = (now - startTime) / 1000;
      const x =
        config.ampX * Math.sin((t / config.periodX) * Math.PI * 2 + basePhase);
      const y =
        config.ampY *
        Math.sin((t / config.periodY) * Math.PI * 2 + basePhase * 1.3);
      const rot =
        config.rotAmp *
        Math.sin((t / config.rotPeriod) * Math.PI * 2 + basePhase * 0.7);
      el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(
        2,
      )}px, 0) rotate(${rot.toFixed(2)}deg)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [config, reducedMotion]);

  const color = COLORS[config.act];
  const tier = TIER_STYLES[config.tier];

  return (
    <Link
      ref={anchorRef}
      href={`/voice/${config.voiceId}`}
      className={`
        group absolute block
        ${config.hiddenOnMobile ? "hidden md:block" : ""}
        ${tier.widthClass}
        ${
          config.tier === "hero"
            ? "z-[30]"
            : config.tier === "featured"
              ? "z-[20]"
              : "z-[10]"
        }
        transition-opacity duration-[600ms] ease-out
        ${isDimmed ? "opacity-35" : "opacity-100"}
      `}
      style={{
        left: `${config.xRatio * 100}%`,
        top: `${config.yRatio * 100}%`,
        translate: "-50% -50%",
        willChange: "transform",
      }}
      onMouseEnter={() => onEnter(config.key)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(config.key)}
      onBlur={onLeave}
      aria-label={`${config.line} — 詳細を読む`}
    >
      {/* ふんわりグロー（hover時） */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus:opacity-100"
        style={{
          backgroundColor: color.glow,
          filter: "blur(34px)",
          transform: "translate(-50%, -50%) scale(1.35)",
          borderRadius: "inherit",
        }}
      />

      <div
        className={`
          relative ${tier.paddingClass} ${tier.fontClass}
          leading-[1.55]
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          group-hover:scale-[1.08] group-focus:scale-[1.08]
        `}
        style={{
          fontFamily: tier.fontFamily,
          fontWeight: tier.fontWeight,
          color: color.text,
          backgroundColor: color.bg,
          border: `1px solid ${color.border}`,
          borderRadius: config.borderRadius,
          boxShadow:
            "0 10px 28px rgba(58,46,36,0.07), 0 2px 8px rgba(58,46,36,0.05)",
        }}
      >
        {config.line}
        {config.tailDirection && (
          <BubbleTail direction={config.tailDirection} fill={color.bg} />
        )}
      </div>
    </Link>
  );
}

/* =========================================================================
   背景（和紙ファイバー texture）
   ====================================================================== */

function PaperBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-multiply"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 360 360' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.85  0 0 0 0 0.78  0 0 0 0 0.62  0 0 0 0.06 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
        backgroundSize: "240px 240px",
      }}
    />
  );
}

/* =========================================================================
   メイン
   ====================================================================== */

/** prefers-reduced-motion を useSyncExternalStore で購読（React 19 の推奨パターン） */
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}
function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

export default function HeroBubbles() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  return (
    <section
      aria-label="お客様の声 — 声の風船"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
      style={{ backgroundColor: "#FEFCF5" }}
    >
      <PaperBackdrop />

      {/* ======= ヘッダ ======= */}
      <header className="relative z-10 mx-auto w-full max-w-[1400px] px-[var(--page-px)] pt-20 md:pt-28">
        <p
          className="font-section-label mb-4 text-xs tracking-[0.22em] text-[#C42A36] md:text-sm"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          VOICE ── お客様の声
        </p>
        <h2
          className="text-[clamp(28px,4vw,56px)] font-light leading-[1.35] text-[#1A1A1A]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          五十組のご家族が、
          <br className="hidden md:inline" />
          こう言っています。
        </h2>
        <p className="mt-4 max-w-[44ch] text-[clamp(13px,1.05vw,15px)] leading-[1.95] text-[#4A4A4A] md:mt-5">
          やまと不動産で家を建てたご家族から、そのまま届いた言葉を吹き出しに。
          <br className="hidden md:inline" />
          気になる声をクリックすると、その家族の詳しいお話がご覧いただけます。
        </p>
      </header>

      {/* ======= 吹き出し漂流エリア ======= */}
      <div className="relative z-[1] mx-auto w-full max-w-[1400px] flex-1 px-[var(--page-px)]">
        <div className="relative h-[min(78vh,780px)] w-full md:h-[min(80vh,860px)]">
          {BUBBLES.map((config) => (
            <Bubble
              key={config.key}
              config={config}
              isDimmed={hoveredKey !== null && hoveredKey !== config.key}
              reducedMotion={reducedMotion}
              onEnter={setHoveredKey}
              onLeave={() => setHoveredKey(null)}
            />
          ))}
        </div>
      </div>

      {/* ======= フッタ：CTA ======= */}
      <footer className="relative z-10 mx-auto mb-12 mt-6 w-full max-w-[1400px] px-[var(--page-px)] pb-10 md:mb-16 md:mt-10">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <CtaButton
            href="/reserve"
            variant="primary"
            size="md"
            label="モデルハウスを予約する"
            sublabel="無料・10秒で完了"
          />
          <CtaButton
            href="/voice"
            variant="secondary"
            size="md"
            label="五十組の声をすべて読む"
          />
        </div>
      </footer>
    </section>
  );
}
