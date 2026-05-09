"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/*
  BreathStrip — 2026-05-09 v1
  ---------------------------------------------------------------
  ページ間に挿入する装飾的「呼吸」セクション。
  scroll-driven parallax (window scroll 駆動 + requestAnimationFrame) で
  内側の画像が外側コンテナよりも遅く動き、深さ感を出す。

  Lenis (SmoothScrollProvider) が global scroll を smooth にしているので、
  この component は単純に window.scrollY を読むだけで滑らかな parallax になる。

  使用例:
   <BreathStrip variant="photo" src="/images/breath/brand-whisper.png" alt="..." heightClass="h-[55vh]" />
   <BreathStrip variant="texture" src="/images/breath/material-band.png" alt="" heightClass="h-[28vh]" parallaxStrength={0.15} />

  関連: page.tsx で TrustStrip↘Price (① Brand Whisper) / Works↘Voice (③ Material Breath) に挿入。
*/

type BreathVariant = "photo" | "texture";

type BreathStripProps = {
  src: string;
  alt: string;
  variant?: BreathVariant;
  heightClass?: string; // Tailwind height class
  /** parallax 強度 (0-1, default 0.25 = 内側画像が ±12.5% 動く) */
  parallaxStrength?: number;
};

export default function BreathStrip({
  src,
  alt,
  variant = "photo",
  heightClass = "h-[55vh]",
  parallaxStrength = 0.25,
}: BreathStripProps) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const imgWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imgWrap = imgWrapRef.current;
    if (!section || !imgWrap) return;

    let rafId = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;
      // 範囲外ならスキップ
      if (rect.bottom < 0 || rect.top > winH) return;
      // section が viewport 下に入った瞬間 = progress 0
      // section が viewport 上から抜けた瞬間 = progress 1
      const totalDistance = winH + rect.height;
      const progress = (winH - rect.top) / totalDistance;
      // -1 から 1 の範囲を -50% to +50% に展開、parallaxStrength で減衰
      const offsetPercent = (progress - 0.5) * parallaxStrength * 100;
      imgWrap.style.transform = `translate3d(0, ${offsetPercent.toFixed(2)}%, 0)`;
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
  }, [parallaxStrength]);

  // overflow を相殺するため画像 wrap を上下に拡張 (parallax 移動分)
  const overflow = parallaxStrength * 50; // %

  return (
    <section
      ref={sectionRef}
      className={`relative ${heightClass} w-full overflow-hidden bg-[#F7F5F0]`}
      aria-hidden={variant === "texture"}
    >
      <div
        ref={imgWrapRef}
        className="absolute inset-x-0 will-change-transform"
        style={{
          top: `-${overflow}%`,
          bottom: `-${overflow}%`,
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className={`object-cover ${
            variant === "texture" ? "opacity-90" : ""
          }`}
        />
      </div>
    </section>
  );
}
