"use client";

import { useEffect, useRef } from "react";

/* 中盤の視覚休符：外観パララックス（コピーなし）。
   CSS animation-timeline は Safari 等が未対応で動かないため、JS(rAF)で全ブラウザ駆動。
   prefers-reduced-motion: reduce のときは動かさない。 */
export default function ExteriorBreath() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = img.closest("section");
    if (!section) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // セクションが視界を通過する間の進捗 0..1（下から入って上へ抜ける）
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      // -11% 〜 +11% の縦移動（オーバースキャン 128% の範囲内・ダイナミックに）
      const shift = (clamped - 0.5) * 22;
      img.style.transform = `translate3d(0, ${shift.toFixed(2)}%, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative bg-noir" aria-hidden>
      <div className="relative h-[clamp(480px,88vh,920px)] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src="/images/newsozai/money-exterior.webp"
          alt=""
          className="parallax-img"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
