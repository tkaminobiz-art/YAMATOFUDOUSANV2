"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  StickyMechanismPin — 2026-05-04 v3 (1-DOM 統合 + a11y 強化)
  ------------------------------------------------------------------
  v2 の課題:
    - PC sticky pin と SP static stack が別 DOM(PANELS×2)で重複
    - SEO 上の重複コンテンツ + 保守時に同期ズレリスク
  v3 の方針:
    - PANELS を 1 度だけ render(<article data-panel> ×3)
    - SP: 各 article は relative + min-h-[80vh] で自然 flow stack
    - PC(lg+): lg:absolute lg:inset-0 で同位置に重ね、GSAP で
      opacity crossfade(scrub:1.5)
    - 装飾英語 eyebrow と巨大 number は aria-hidden(意味は h3 が持つ)
    - prefers-reduced-motion: GSAP を起動せず mobile 同様の natural stack 表示

  AT-003 anti-pattern 対策(v2 から継続):
    - horizontal reveal なし、vertical scrub のみ
    - pin 期間 3 viewport、ホバー装飾なし
*/

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ACCENT = "#A2C523";

type Panel = {
  num: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

const PANELS: readonly Panel[] = [
  {
    num: "01",
    title: "モデルハウスを、\n販売住宅として活用",
    body: "展示専用の建物を持たず、分譲地に建てた住宅をそのままご案内します。展示場の維持費を抱えない分を、価格に反映しています。",
    image: "/images/newsozai/exterior-miyamaki-front.webp",
    alt: "やまと不動産のモデルハウス外観 — 赤い玄関と切妻屋根の正面",
  },
  {
    num: "02",
    title: "土地・設計・施工を、\n自社で連携",
    body: "土地探しから設計、施工、アフターまで自社で連携しています。間に入る会社が少ない分、中間コストを抑えています。",
    image: "/images/newsozai/exterior-texture-detail-01.webp",
    alt: "やまと不動産が手がけた住宅の素材ディテール — 木目とサイディングの納まり",
  },
  {
    num: "03",
    title: "広告費を、\n地域に必要な範囲へ",
    body: "全国向けの大きな広告ではなく、奈良・京都南部のお客様に届く範囲で。過度な広告費を抑え、適正価格でご提供しています。",
    image: "/images/newsozai/hero-miyamaki-mountain.webp",
    alt: "奈良の山並みを背景にした、やまとの住まい",
  },
] as const;

export default function StickyMechanismPin() {
  const sectionRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const el = sectionRef.current;
    if (!el) return;
    const lgBreakpoint = window.matchMedia("(min-width: 1024px)");
    if (!lgBreakpoint.matches) return;

    const panels = el.querySelectorAll<HTMLElement>("[data-panel]");
    if (panels.length === 0) return;

    const ctx = gsap.context(() => {
      // PC 初期: 1枚目だけ表示、他は透明
      gsap.set(panels, { opacity: (i) => (i === 0 ? 1 : 0) });

      const N = PANELS.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 1.5,
          start: "top top",
          end: () => `+=${N * 100}%`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(N - 1, Math.floor(self.progress * N));
            setActiveIndex(i);
          },
        },
      });

      // 連続 crossfade: 各 transition 1 単位、pause なし
      for (let i = 0; i < N - 1; i++) {
        tl.to(panels[i], { opacity: 0, ease: "none", duration: 1 }, i)
          .to(panels[i + 1], { opacity: 1, ease: "none", duration: 1 }, i);
      }
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  // PC で GSAP pin する際だけ section に h-screen + overflow-hidden を当てる。
  // reduced-motion 時は SP と同じ natural stack を全幅で出す。
  const enablePin = !reducedMotion;

  return (
    <section
      ref={sectionRef}
      aria-label="価格を抑えられる、3つの理由"
      className={`relative bg-text-primary text-white ${
        enablePin ? "lg:h-screen lg:overflow-hidden" : ""
      }`}
    >
      {PANELS.map((p, i) => (
        <article
          key={p.num}
          data-panel
          className={`
            relative flex items-end overflow-hidden
            min-h-[80vh]
            ${enablePin ? "lg:absolute lg:inset-0 lg:min-h-0" : ""}
            ${enablePin && i !== 0 ? "lg:opacity-0" : ""}
          `}
          style={
            enablePin
              ? {
                  willChange: "opacity",
                  transform: "translateZ(0)",
                  backfaceVisibility: "hidden",
                }
              : undefined
          }
        >
          <Image
            src={p.image}
            alt={p.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* 暗グラデ + 弱vignette: SP は下→上、PC は左→右で読みやすく */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/85 via-black/40 to-transparent lg:bg-[linear-gradient(to_right,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.55)_35%,rgba(0,0,0,0.20)_65%,rgba(0,0,0,0.05)_100%)]"
          />
          {/* グレイン(編集誌のフィルム感) — PC のみ */}
          <div
            aria-hidden
            className="hidden lg:block absolute inset-0 mix-blend-soft-light opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
            }}
          />
          {/* 前面テキスト */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-[var(--page-px)] py-14 lg:py-0 lg:flex lg:items-end lg:h-full lg:pb-[10vh] lg:pt-[18vh]">
            <div className="w-full lg:max-w-[660px]">
              <PanelText panel={p} />
            </div>
          </div>
        </article>
      ))}

      {/* 進行インジケータ — PC pin 時のみ表示 */}
      {enablePin && (
        <div className="hidden lg:block">
          <ProgressDots activeIndex={activeIndex} />
        </div>
      )}
    </section>
  );
}

// ── 個別パネル本文 ──
// 2026-05-06 装飾英語 eyebrow(Mechanism One/Two/Three)は撤去。
// 巨大 number 01/02/03 + 日本語タイトルだけで構成し、テンプレ感を抜く。
function PanelText({ panel }: { panel: Panel }) {
  return (
    <div className="text-white">
      {/* 巨大 Number(01/02/03) — 視覚装飾、意味は下の h3 が持つ */}
      <div
        aria-hidden="true"
        className="font-oswald tabular-nums leading-[0.78] mb-3 md:mb-4"
        style={{
          fontWeight: 200,
          fontSize: "clamp(96px, 14vw, 220px)",
          letterSpacing: "-0.04em",
          color: "rgba(255,255,255,0.96)",
          textShadow: "0 4px 28px rgba(0,0,0,0.4)",
        }}
      >
        {panel.num}
      </div>

      {/* 細い lime ライン */}
      <div
        aria-hidden
        className="h-[2px] w-12 md:w-16 mb-7 md:mb-9"
        style={{ background: ACCENT }}
      />

      {/* タイトル — 主要な heading として screen reader が読む */}
      <h3
        className="font-sans whitespace-pre-line mb-5 md:mb-6"
        style={{
          fontSize: "clamp(22px, 2.6vw, 38px)",
          fontWeight: 700,
          letterSpacing: "0.01em",
          lineHeight: 1.4,
          textShadow: "0 2px 18px rgba(0,0,0,0.45)",
        }}
      >
        {panel.title}
      </h3>

      {/* 本文 */}
      <p
        className="text-white/85 leading-[2] max-w-[520px]"
        style={{
          fontSize: "clamp(13px, 1vw, 15px)",
          textShadow: "0 1px 10px rgba(0,0,0,0.45)",
        }}
      >
        {panel.body}
      </p>
    </div>
  );
}

// ── 右下の進行ドット(縦) ──
function ProgressDots({ activeIndex }: { activeIndex: number }) {
  return (
    <ol
      aria-hidden
      className="absolute right-[var(--page-px)] bottom-[12vh] flex flex-col gap-3 z-20"
    >
      {PANELS.map((p, i) => {
        const isActive = i === activeIndex;
        return (
          <li
            key={p.num}
            className="flex items-center gap-3 transition-opacity duration-500"
            style={{ opacity: isActive ? 1 : 0.45 }}
          >
            <span
              className="font-oswald text-white/80 tabular-nums"
              style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.08em" }}
            >
              {p.num}
            </span>
            <span
              className="block transition-[width,background] duration-500"
              style={{
                height: "1px",
                width: isActive ? "44px" : "20px",
                background: isActive ? ACCENT : "rgba(255,255,255,0.5)",
              }}
            />
          </li>
        );
      })}
    </ol>
  );
}
