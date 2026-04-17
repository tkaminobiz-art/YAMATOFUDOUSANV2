"use client";

/**
 * HeroEmaki v3 — 絵巻 × 5幕物語 × GSAP駆動
 * ----------------------------------------------------------------------
 * FV 直下の "絵巻" セクション（HeroCatalog の下）。
 * 19件 killer list を 5幕（悩み→発見→比較→決断→約束）に配置。
 *
 * v3 の変更点:
 *   - CSS marquee → GSAP timeline 駆動に換装
 *   - 速度の"うねり"（timeScale 0.7〜1.4 を sine.inOut で揺らす）
 *   - Y軸の"波"（各行独立位相、sine.inOut）
 *   - hover で滑らかに減速（abrupt な pause ではなく）
 *   - すべての行が異なる速度・波位相で動き、川の流れのような多層感
 *
 * プラン: ~/.claude/plans/wiggly-inventing-plum.md
 * データ: @/data/voiceHome.ts KILLER_LINES / ACTS_ORDER / ACT_META
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CtaButton from "@/components/ui/CtaButton";
import {
  KILLER_LINES,
  ACTS_ORDER,
  ACT_META,
  type ActKey,
  type KillerLine,
} from "@/data/voiceHome";

/* -----------------------------------------------------------------------
   ユーティリティ
   -------------------------------------------------------------------- */

/** suffix 付き id から数値 id を抽出（/voice/[id] 用） */
const voicePathOf = (id: string) => `/voice/${id.split("-")[0]}`;

/** prefers-reduced-motion 判定 */
const isReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -----------------------------------------------------------------------
   マーキー駆動 hook（GSAP）— うねる速度 + Y軸の波
   -------------------------------------------------------------------- */

type MarqueeConfig = {
  /** loop 基準時間（秒） */
  durationSec: number;
  /** "left" → x: 0 → -w/2、"right" → x: -w/2 → 0 */
  direction: "left" | "right";
  /** Y軸の波の振幅（px） */
  waveAmp?: number;
  /** 波の周期（秒） */
  wavePeriodSec?: number;
  /** 速度のうねり幅（0〜0.5） */
  speedSwing?: number;
  /** 速度うねりの周期（秒） */
  speedPeriodSec?: number;
  /** オフセット位相（0〜1、行ごとに変えるとリズムが豊かに） */
  phase?: number;
};

function useMarqueeMotion(
  trackRef: React.RefObject<HTMLDivElement | null>,
  config: MarqueeConfig,
) {
  const {
    durationSec,
    direction,
    waveAmp = 0,
    wavePeriodSec = 4.5,
    speedSwing = 0.35,
    speedPeriodSec = 6,
    phase = 0,
  } = config;

  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      if (!track) return;
      if (isReducedMotion()) return;

      // 複製済みコンテンツの幅を測定
      const contentWidth = track.scrollWidth / 2;
      if (!contentWidth) return;

      const fromX = direction === "left" ? 0 : -contentWidth;
      const toX = direction === "left" ? -contentWidth : 0;

      gsap.set(track, { x: fromX, y: 0, willChange: "transform" });

      // ===== メインスクロール =====
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(
        track,
        { x: fromX },
        { x: toX, duration: durationSec, ease: "none" },
      );
      mainTimelineRef.current = tl;

      // ===== 速度のうねり（timeScale 1 ⇄ 1+speedSwing） =====
      gsap.to(tl, {
        timeScale: 1 + speedSwing,
        duration: speedPeriodSec,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: phase * speedPeriodSec,
      });

      // ===== Y軸の波 =====
      if (waveAmp > 0) {
        gsap.to(track, {
          y: waveAmp,
          duration: wavePeriodSec,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: phase * wavePeriodSec,
        });
      }

      return () => {
        tl.kill();
      };
    },
    { scope: trackRef, dependencies: [] },
  );

  return mainTimelineRef;
}

/** hover 時に滑らかに timeScale を落とす（pointer 離脱で戻す） */
function useHoverDecelerate(
  containerRef: React.RefObject<HTMLDivElement | null>,
  timelineRef: React.RefObject<gsap.core.Timeline | null>,
) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleEnter = () => {
      const tl = timelineRef.current;
      if (!tl) return;
      gsap.to(tl, { timeScale: 0.08, duration: 1.4, ease: "power2.out" });
    };
    const handleLeave = () => {
      const tl = timelineRef.current;
      if (!tl) return;
      gsap.to(tl, { timeScale: 1, duration: 1.8, ease: "power2.inOut" });
    };

    el.addEventListener("pointerenter", handleEnter);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointerenter", handleEnter);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [containerRef, timelineRef]);
}

/* -----------------------------------------------------------------------
   背景
   -------------------------------------------------------------------- */

function EmakiBackdrop() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          background:
            "radial-gradient(55% 35% at 50% 50%, rgba(196,112,63,0.42), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 right-0 mx-auto opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, transparent 0, transparent 239px, #E8DFCF 240px, transparent 241px)",
        }}
      />
    </>
  );
}

/* -----------------------------------------------------------------------
   Edge Row（上下の小サイズ・GSAP駆動）
   -------------------------------------------------------------------- */

function EdgeRow({
  lines,
  direction,
  durationSec,
  phase,
  waveAmp,
}: {
  lines: readonly KillerLine[];
  direction: "left" | "right";
  durationSec: number;
  phase: number;
  waveAmp: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const doubled = [...lines, ...lines];

  const timelineRef = useMarqueeMotion(trackRef, {
    direction,
    durationSec,
    waveAmp,
    wavePeriodSec: 5.5,
    speedSwing: 0.3,
    speedPeriodSec: 7,
    phase,
  });
  useHoverDecelerate(containerRef, timelineRef);

  return (
    <div ref={containerRef} className="relative overflow-hidden py-2">
      <div
        ref={trackRef}
        className="inline-flex will-change-transform"
        style={{ backfaceVisibility: "hidden" }}
      >
        {doubled.map((w, i) => (
          <Link
            key={`${w.id}-${i}`}
            href={voicePathOf(w.id)}
            className="
              whitespace-nowrap px-6 md:px-10 font-light
              text-[#8E7E5F] transition-colors duration-500 hover:text-[#D7CDBB]
              text-[clamp(13px,1.1vw,16px)]
            "
            style={{ fontFamily: "var(--font-serif)" }}
          >
            <span aria-hidden className="mr-2 text-[#5F513D]/70">—</span>
            {w.line}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
   Center Track（1幕ぶん・GSAP駆動）
   -------------------------------------------------------------------- */

function CenterTrack({
  act,
  isActive,
}: {
  act: ActKey;
  isActive: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const actLines = KILLER_LINES.filter((l) => l.act === act);

  // 少ない件数でも流れ続けるよう 3 倍化して複製
  const tripled = [...actLines, ...actLines, ...actLines];

  const timelineRef = useMarqueeMotion(trackRef, {
    direction: "right",
    durationSec: 42,
    waveAmp: 10,
    wavePeriodSec: 5.5,
    speedSwing: 0.35,
    speedPeriodSec: 8,
    phase: ACTS_ORDER.indexOf(act) / 5,
  });
  useHoverDecelerate(containerRef, timelineRef);

  // 非アクティブ時はタイムラインをポーズしつつゆっくり elongate
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isActive) {
      gsap.to(tl, { timeScale: 1, duration: 1, ease: "power2.out" });
    } else {
      gsap.to(tl, { timeScale: 0.15, duration: 1.5, ease: "power2.out" });
    }
  }, [isActive, timelineRef]);

  return (
    <div
      ref={containerRef}
      className={`
        absolute inset-0 flex items-center
        transition-opacity duration-[1400ms] ease-out
        ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div
        ref={trackRef}
        className="inline-flex will-change-transform"
        style={{ backfaceVisibility: "hidden" }}
      >
        {tripled.map((w, i) => (
          <Link
            key={`${w.id}-${i}`}
            href={voicePathOf(w.id)}
            className="
              whitespace-nowrap px-10 md:px-16 lg:px-20
              font-light text-[#F7EFDF]
              text-[clamp(36px,6.2vw,104px)]
              leading-[1.15] tracking-[0.06em]
              transition-colors duration-500 hover:text-white
            "
            style={{
              fontFamily: "var(--font-serif)",
              textShadow:
                "0 0 40px rgba(10,7,4,0.45), 0 1px 0 rgba(0,0,0,0.3)",
            }}
          >
            {w.line}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
   Center Stage（5幕レイヤー）
   -------------------------------------------------------------------- */

function CenterStage({ currentAct }: { currentAct: ActKey }) {
  return (
    <div className="relative w-full overflow-hidden">
      {ACTS_ORDER.map((act) => (
        <CenterTrack key={act} act={act} isActive={act === currentAct} />
      ))}
      {/* 高さ確保用プレースホルダー */}
      <div
        aria-hidden
        className="invisible whitespace-nowrap px-10 font-light"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(36px, 6.2vw, 104px)",
          lineHeight: "1.15",
        }}
      >
        placeholder
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
   幕インジケータ
   -------------------------------------------------------------------- */

function ActIndicator({ currentAct }: { currentAct: ActKey }) {
  const meta = ACT_META[currentAct];
  const idx = ACTS_ORDER.indexOf(currentAct);

  return (
    <div className="flex items-center gap-5">
      <div className="flex gap-2" aria-hidden>
        {ACTS_ORDER.map((act, i) => (
          <span
            key={act}
            className={`
              h-[1px] transition-all duration-700
              ${i === idx ? "w-7 bg-accent" : "w-3 bg-[#5F513D]/60"}
            `}
          />
        ))}
      </div>
      <div
        className="text-[#B9A985]"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        <p className="text-[10px] tracking-[0.24em] md:text-[11px]">
          {meta.subtitle}
        </p>
        <p
          className="mt-1 text-xs tracking-[0.2em] text-[#E8DFCF] md:text-sm"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {meta.ordinal}　{meta.label}
        </p>
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
   モバイル：縦書き幕名
   -------------------------------------------------------------------- */

function MobileActName({ currentAct }: { currentAct: ActKey }) {
  const meta = ACT_META[currentAct];
  return (
    <div
      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 md:hidden"
      aria-hidden
    >
      <div
        className="relative transition-opacity duration-[1200ms]"
        style={{
          writingMode: "vertical-rl",
          fontFamily: "var(--font-serif)",
          fontSize: "14px",
          letterSpacing: "0.32em",
          color: "#B9A985",
        }}
      >
        {meta.ordinal}　{meta.label}
      </div>
    </div>
  );
}

/* -----------------------------------------------------------------------
   メイン
   -------------------------------------------------------------------- */

export default function HeroEmaki() {
  const [actIdx, setActIdx] = useState(0);
  const currentAct = ACTS_ORDER[actIdx];

  /* 自動幕切替 */
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isReducedMotion()) return;
    const duration = ACT_META[currentAct].durationMs;
    const id = window.setTimeout(() => {
      setActIdx((i) => (i + 1) % ACTS_ORDER.length);
    }, duration);
    return () => window.clearTimeout(id);
  }, [actIdx, currentAct]);

  /* 上下行に流す全声（混合） */
  const topRowLines = useMemo(() => KILLER_LINES, []);
  const bottomRowLines = useMemo(() => [...KILLER_LINES].reverse(), []);

  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden text-[#E8DFCF]"
      aria-label="お客様の声 — 五幕の物語"
      style={{
        background:
          "radial-gradient(ellipse at 50% 45%, #1F1611 0%, #14100B 55%, #0B0907 100%)",
      }}
    >
      <EmakiBackdrop />

      {/* ヘッダ */}
      <header className="relative z-10 mx-auto w-full max-w-[1400px] px-[var(--page-px)] pt-20 md:pt-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[560px]">
            <p
              className="mb-3 text-[10px] tracking-[0.28em] text-[#B9A985] md:text-xs"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              VOICE ── 五十組、五つの幕
            </p>
            <h2
              className="text-[clamp(22px,2.8vw,38px)] font-light leading-[1.35] text-[#F7EFDF]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              やまと不動産で家を建てた、
              <br className="hidden md:inline" />
              五十組の物語。
            </h2>
          </div>
          <div className="hidden md:block">
            <ActIndicator currentAct={currentAct} />
          </div>
        </div>
      </header>

      {/* 絵巻ゾーン */}
      <div className="relative z-[1] mt-12 flex-1 md:mt-20">
        <MobileActName currentAct={currentAct} />

        <div className="flex flex-col justify-center gap-3 md:gap-6">
          <div className="hidden md:block">
            <EdgeRow
              lines={topRowLines}
              direction="left"
              durationSec={76}
              phase={0.15}
              waveAmp={7}
            />
          </div>

          <CenterStage currentAct={currentAct} />

          <div className="hidden md:block">
            <EdgeRow
              lines={bottomRowLines}
              direction="left"
              durationSec={68}
              phase={0.55}
              waveAmp={8}
            />
          </div>
        </div>
      </div>

      {/* フッタ */}
      <footer className="relative z-10 mx-auto mb-10 mt-12 flex w-full max-w-[1400px] flex-col gap-6 px-[var(--page-px)] pb-10 md:mb-16 md:mt-16 md:flex-row md:items-end md:justify-between">
        <div className="md:hidden">
          <ActIndicator currentAct={currentAct} />
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <CtaButton
            href="/voice"
            variant="dark-bg-primary"
            size="md"
            label="五十組の声をすべて読む"
          />
          <CtaButton
            href="/reserve"
            variant="dark-bg-secondary"
            size="md"
            label="モデルハウスを予約する"
          />
        </div>
      </footer>
    </section>
  );
}
