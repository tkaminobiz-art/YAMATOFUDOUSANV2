"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/*
  BreathStrip — 2026-05-09 v2 (photo / texture / quote)
  ---------------------------------------------------------------
  ページ間に挿入する装飾的「呼吸」セクション。
  Lenis (SmoothScrollProvider) が global scroll を smooth 化済みなので、
  単純に window.scrollY を読むだけで滑らかな parallax / fade-up になる。

  3 variant:
   - "photo":   実写を full-bleed + scroll-driven parallax (内側 image が遅く動く)
   - "texture": テクスチャ band + 軽い parallax (parallaxStrength を低く)
   - "quote":   Mincho italic 詩的句 + hairline rule + scroll-driven fade-up

  使用例:
   <BreathStrip variant="photo" src="..." alt="..." heightClass="h-[55vh]" />
   <BreathStrip variant="texture" src="..." alt="" heightClass="h-[28vh]" parallaxStrength={0.15} />
   <BreathStrip variant="quote" quote="土地と、家と、暮らしと。" heightClass="h-[32vh]" />

  関連: page.tsx
   ① TrustStrip↘Price = photo (Brand Whisper)
   ② ZeroDecl↘Map     = quote (Quiet Pause)
   ③ Works↘Voice      = texture (Material Breath)
   ④ Voice↘MidCta     = quote (Final Whisper)
*/

type BreathVariant = "photo" | "texture" | "quote";

type BreathStripProps = {
  variant?: BreathVariant;
  // for photo/texture
  src?: string;
  alt?: string;
  // for quote
  quote?: string;
  // common
  heightClass?: string;
  /** parallax / fade 強度 (default 0.25) */
  parallaxStrength?: number;
};

export default function BreathStrip({
  variant = "photo",
  src,
  alt,
  quote,
  heightClass = "h-[55vh]",
  parallaxStrength = 0.25,
}: BreathStripProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    const section = sectionRef.current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    let rafId = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > winH) return;
      const totalDistance = winH + rect.height;
      const p = (winH - rect.top) / totalDistance;
      const clamped = Math.max(0, Math.min(1, p));

      if (variant === "quote") {
        // quote: 0.3-0.7 の中間で完全表示、両端で fade
        setProgress(clamped);
      } else {
        // photo/texture: 内側 image を parallax 移動
        const offsetPercent = (clamped - 0.5) * parallaxStrength * 100;
        inner.style.transform = `translate3d(0, ${offsetPercent.toFixed(2)}%, 0)`;
      }
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [parallaxStrength, variant]);

  if (variant === "quote") {
    // 0.3-0.7 中央域で fade-in 完全 / それ以外は fade-out
    const opacity = Math.min(
      1,
      Math.max(0, 1 - Math.abs(progress - 0.5) * 2.5),
    );
    const translate = (1 - opacity) * 12; // px, 上から fade-up

    return (
      <section
        ref={sectionRef}
        className={`relative ${heightClass} w-full overflow-hidden bg-[#F7F5F0] flex items-center justify-center px-6`}
      >
        <div
          ref={innerRef}
          className="relative max-w-[820px] text-center"
          style={{
            opacity,
            transform: `translate3d(0, ${translate.toFixed(2)}px, 0)`,
            transition: "opacity 0.3s ease-out",
          }}
        >
          <span
            aria-hidden
            className="block mx-auto h-px w-12 bg-[var(--color-rule)] mb-6"
          />
          <p
            className="font-[var(--font-shippori)] italic text-[#1A1815] leading-[1.7] tracking-[0.04em]"
            style={{
              fontSize: "clamp(18px, 2.4vw, 32px)",
              fontWeight: 400,
            }}
          >
            {quote}
          </p>
          <span
            aria-hidden
            className="block mx-auto h-px w-12 bg-[var(--color-rule)] mt-6"
          />
        </div>
      </section>
    );
  }

  // photo / texture
  const overflow = parallaxStrength * 50;

  return (
    <section
      ref={sectionRef}
      className={`relative ${heightClass} w-full overflow-hidden bg-[#F7F5F0]`}
      aria-hidden={variant === "texture"}
    >
      <div
        ref={innerRef}
        className="absolute inset-x-0 will-change-transform"
        style={{
          top: `-${overflow}%`,
          bottom: `-${overflow}%`,
        }}
      >
        {src && (
          <Image
            src={src}
            alt={alt ?? ""}
            fill
            sizes="100vw"
            className={`object-cover ${
              variant === "texture" ? "opacity-90" : ""
            }`}
          />
        )}
      </div>
    </section>
  );
}
