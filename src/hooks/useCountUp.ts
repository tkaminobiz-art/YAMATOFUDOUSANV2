"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 要素が画面に入ったら 0→target へイージング付きでカウントアップする。
 *
 * 2026-05-04 v2 — SSR/a11y フレンドリー化:
 * - 初期値は target(SSR の HTML に実数が入る → SEO/screen reader 安心)
 * - hydration 時に「すでにビューポート内」なら animation せず target を維持
 *   (ユーザーは既に実数を見ているのでアニメ不要)
 * - hydration 時に「ビューポート外」なら 0 にリセット → 観測者で進入時に
 *   0→target へ animate(従来の delight)
 * - prefers-reduced-motion: 常に target、animation は走らない
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
  // 初期値は target にする(SSR HTML に実数が乗る)
  const [value, setValue] = useState(target);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      // 動きを抑制 — target のまま据え置き
      startedRef.current = true;
      return;
    }

    // hydration 時点でビューポート内ならアニメをスキップ
    // (ユーザーはすでに実数を見ているので、0 にリセット→アニメは jarring)
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      startedRef.current = true;
      return;
    }

    // ビューポート外 — 0 にリセットしてから観測者で進入を待つ
    setValue(0);

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
