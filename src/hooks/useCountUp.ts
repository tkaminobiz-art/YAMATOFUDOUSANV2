"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 要素が画面に入ったら 0→target までイージング付きでカウントアップする。
 * - prefers-reduced-motion 時は即時 target を返す。
 * - 整数(steps)で動く。小数 target は対応外(必要なら拡張)。
 *
 * 使い方:
 *   const { value, ref } = useCountUp(600, { duration: 1600 });
 *   <span ref={ref}>{value.toLocaleString()}</span>
 */
export function useCountUp(
  target: number,
  options: { duration?: number; delay?: number; thresholdRatio?: number } = {},
) {
  const { duration = 1600, delay = 0, thresholdRatio = 0.4 } = options;
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const startTime = performance.now() + delay;
      const ease = (t: number) => 1 - Math.pow(1 - t, 3); // easeOutCubic

      const tick = (now: number) => {
        const elapsed = now - startTime;
        if (elapsed < 0) {
          requestAnimationFrame(tick);
          return;
        }
        const progress = Math.min(elapsed / duration, 1);
        const eased = ease(progress);
        setValue(Math.round(target * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= thresholdRatio) {
          start();
          observer.disconnect();
        }
      },
      { threshold: [0, thresholdRatio, 1] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, delay, thresholdRatio]);

  return { value, ref };
}
