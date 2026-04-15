"use client";

import { useEffect, useRef } from "react";

/**
 * Intersection Observer ベースのスクロールインフック。
 * ref を返し、要素が画面に入ると .is-visible を付与する。
 * CSS の .scroll-in + .is-visible で opacity/transform を制御。
 *
 * stagger: 子要素に 50ms ずつ遅延を付与する場合 true。
 */
export function useScrollIn<T extends HTMLElement = HTMLDivElement>(
  stagger = false
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // prefers-reduced-motion の場合は即表示
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (stagger) {
            const children = el.querySelectorAll(".scroll-in");
            children.forEach((child, i) => {
              (child as HTMLElement).style.transitionDelay = `${i * 50}ms`;
              child.classList.add("is-visible");
            });
          }
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      },
      /* 背の高いセクション（Voice 等）で 0.15 だと交差率が足りず .is-visible が付かないことがある */
      { threshold: 0, rootMargin: "0px 0px 10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return ref;
}
