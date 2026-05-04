"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/*
  StickyMechanismPin — 2026-05-04 v1
  ------------------------------------------------------------------
  「価格を抑えられる、3つの理由」を sticky pin + 背景写真クロスフェードで
  編集誌的に語るセクション。MechanismEnhanced 内の 3 cards を置換。

  設計指針(world-class designer level):
  - 1 panel = 100vh のスクロール幅(計300vh)— 読む時間を確保
  - 背景3枚を crossfade(opacity 0↔1)、scrub:1 で慣性連動
  - 前面: 巨大 Oswald number(01/02/03) + Title + Body + Progress dots
  - 全要素が text/photo セットで同期フェード(ジャダーなし)
  - 進行インジケータ: 縦の3点とアクティブ拡大
  - 写真の上に左→右の暗グラデで読みやすさ確保(光は写真側に残す)
  - prefers-reduced-motion: pin 無効化、3panel を縦に static stack 表示
  - sm(<lg) は static stack にして mobile pin 罠を回避

  Anti-pattern AT-003 回避:
  - horizontal reveal なし(縦スクロールのみ)
  - 3 panel = 3 viewport(過剰スクロールジャック禁止)
  - ホバー装飾なし、追加モーションは text crossfade のみ
*/

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FOREST = "#486B00";
const ACCENT = "#A2C523";

type Panel = {
  num: string;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

const PANELS: readonly Panel[] = [
  {
    num: "01",
    eyebrow: "Mechanism One",
    title: "モデルハウスを、\n販売住宅として活用",
    body: "展示専用の建物を持たず、分譲地に建てた住宅をそのままご案内します。展示場の維持費を抱えない分を、価格に反映しています。",
    image: "/images/newsozai/exterior-miyamaki-front.webp",
    alt: "やまと不動産のモデルハウス外観 — 赤い玄関と切妻屋根の正面",
  },
  {
    num: "02",
    eyebrow: "Mechanism Two",
    title: "土地・設計・施工を、\n自社で連携",
    body: "土地探しから設計、施工、アフターまで自社で連携しています。間に入る会社が少ない分、中間コストを抑えています。",
    image: "/images/newsozai/exterior-texture-detail-01.webp",
    alt: "やまと不動産が手がけた住宅の素材ディテール — 木目とサイディングの納まり",
  },
  {
    num: "03",
    eyebrow: "Mechanism Three",
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

  // prefers-reduced-motion 検知
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
    // SP/Tablet では pin を発火させない(<lg = 1024px)
    const lgBreakpoint = window.matchMedia("(min-width: 1024px)");
    if (!lgBreakpoint.matches) return;

    const photos = el.querySelectorAll<HTMLElement>("[data-bg-photo]");
    const panels = el.querySelectorAll<HTMLElement>("[data-text-panel]");
    if (photos.length === 0 || panels.length === 0) return;

    const ctx = gsap.context(() => {
      // 初期状態: 1枚目以外は opacity 0
      gsap.set(photos, { opacity: (i) => (i === 0 ? 1 : 0) });
      gsap.set(panels, { opacity: (i) => (i === 0 ? 1 : 0), y: (i) => (i === 0 ? 0 : 12) });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${PANELS.length * 100}%`,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const i = Math.min(
              PANELS.length - 1,
              Math.floor(self.progress * PANELS.length),
            );
            setActiveIndex(i);
          },
        },
      });

      // 各遷移: 1panel → 2panel, 2 → 3 で crossfade
      for (let i = 1; i < PANELS.length; i++) {
        const segment = `+=${100 / (PANELS.length - 1)}%`;
        tl.to(
          photos[i - 1],
          { opacity: 0, duration: 1, ease: "power2.inOut" },
          `>${i === 1 ? "0" : ""}`,
        )
          .to(
            photos[i],
            { opacity: 1, duration: 1, ease: "power2.inOut" },
            "<",
          )
          .to(
            panels[i - 1],
            { opacity: 0, y: -12, duration: 0.7, ease: "power2.in" },
            "<",
          )
          .to(
            panels[i],
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
            "<+0.1",
          )
          .to({}, { duration: 0.6 }); // 各panelで読む間
        // 上の `segment` 変数は意図的に未使用 — scrub:1 + pin range で時間を吸収
      }
    }, el);
    return () => ctx.revert();
  }, [reducedMotion]);

  // ── reduced-motion / SP-Tablet: 縦に静的 stack ──
  if (reducedMotion) {
    return (
      <section className="relative bg-text-primary text-white">
        {PANELS.map((p) => (
          <div
            key={p.num}
            className="relative min-h-[80vh] flex items-end overflow-hidden"
          >
            <Image
              src={p.image}
              alt={p.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
            <div className="relative max-w-[1200px] mx-auto w-full px-[var(--page-px)] py-14">
              <PanelText panel={p} />
            </div>
          </div>
        ))}
      </section>
    );
  }

  return (
    <>
      {/* ── Desktop (lg+): pin + crossfade ── */}
      <section
        ref={sectionRef}
        className="relative hidden lg:block w-full h-screen overflow-hidden bg-text-primary text-white"
        aria-label="価格を抑えられる、3つの理由"
      >
        {/* === 背景写真レイヤー(stack) === */}
        <div className="absolute inset-0">
          {PANELS.map((p, i) => (
            <div
              key={p.num}
              data-bg-photo
              className="absolute inset-0 will-change-[opacity]"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <Image
                src={p.image}
                alt={p.alt}
                fill
                priority={i === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
          {/* 左→右の暗グラデ(可読性) + 上→下の弱vignette */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.20) 65%, rgba(0,0,0,0.05) 100%), linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.25) 100%)",
            }}
          />
          {/* グレイン(編集誌のフィルム感) */}
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-soft-light opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
            }}
          />
        </div>

        {/* === 前面テキスト群(stack) === */}
        <div className="relative h-full max-w-[1400px] mx-auto px-[var(--page-px)] flex items-end pb-[10vh] pt-[18vh]">
          <div className="relative w-full max-w-[660px]">
            {PANELS.map((p, i) => (
              <div
                key={p.num}
                data-text-panel
                className="absolute inset-0 will-change-[opacity,transform]"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <PanelText panel={p} />
              </div>
            ))}
            {/* spacer to give the absolute children a height to fill */}
            <div className="invisible" aria-hidden>
              <PanelText panel={PANELS[0]} />
            </div>
          </div>

          {/* === 進行インジケータ(右下) === */}
          <ProgressDots activeIndex={activeIndex} />
        </div>
      </section>

      {/* ── Mobile/Tablet (<lg): static stack(pin なし) ── */}
      <section className="relative block lg:hidden bg-text-primary text-white">
        {PANELS.map((p) => (
          <div
            key={p.num}
            className="relative min-h-[80vh] flex items-end overflow-hidden"
          >
            <Image
              src={p.image}
              alt={p.alt}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
            <div className="relative max-w-[1200px] mx-auto w-full px-[var(--page-px)] py-14">
              <PanelText panel={p} />
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

// ── 個別パネル本文 ──
function PanelText({ panel }: { panel: Panel }) {
  return (
    <div className="text-white">
      {/* eyebrow */}
      <p
        className="font-inter uppercase mb-6 md:mb-8 tracking-[0.3em]"
        style={{
          fontSize: "clamp(10px, 0.8vw, 12px)",
          fontWeight: 600,
          color: ACCENT,
        }}
      >
        {panel.eyebrow}
      </p>

      {/* 巨大 Number(01/02/03) */}
      <div
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

      {/* タイトル */}
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
      className="absolute right-[var(--page-px)] bottom-[12vh] flex flex-col gap-3"
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
