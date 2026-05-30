"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type AnimatedNumberProps = {
  value: number;
  durationMs?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * 数字カウントアップ。
 * - 流用元は ReasonReveal（reduced-motion を JS で見る）。VoiceProofObserver は未対応のため不可。
 * - prefers-reduced-motion: 即時に最終値を表示（カウントしない）。
 * - CLS 対策: 最終値を visibility:hidden で重ねて幅を予約。tabular-nums で桁揺れ防止。
 */
export default function AnimatedNumber({ value, durationMs = 1200, className, style }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || started.current) return;
          started.current = true;
          observer.unobserve(entry.target);
          const start = performance.now();
          const step = (now: number) => {
            const t = Math.min(1, (now - start) / durationMs);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic（急かさない）
            setDisplay(Math.round(value * eased));
            if (t < 1) requestAnimationFrame(step);
            else setDisplay(value);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.4, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ display: "inline-grid", fontVariantNumeric: "tabular-nums", ...style }}
    >
      <span aria-hidden style={{ gridArea: "1 / 1", visibility: "hidden" }}>
        {value.toLocaleString("ja-JP")}
      </span>
      <span style={{ gridArea: "1 / 1" }}>{display.toLocaleString("ja-JP")}</span>
    </span>
  );
}
