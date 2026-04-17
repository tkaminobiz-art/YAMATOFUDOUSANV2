"use client";

/**
 * Lenis smooth scroll を全ページに適用する軽量プロバイダ。
 *
 * 方針（プラン: wiggly-inventing-plum.md と同期）:
 * - 軽度 hijack：lerp 0.1、wheelMultiplier 1.15（体感差は小さい）
 * - `prefers-reduced-motion: reduce` で完全無効化
 * - 既存の IntersectionObserver ベースの useScrollIn との両立のため、
 *   Lenis は DOM scroll を利用する（content-wrapper 操作をしない）デフォルト挙動に留める。
 * - cleanup で必ず destroy（ページ遷移時のリーク防止）
 */

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // 初回 render 前に prefers-reduced-motion チェック
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,           // デフォルトより軽く
      lerp: 0.1,               // 軽度 hijack
      wheelMultiplier: 1.15,   // 1.3 より控えめ（離脱防止）
      smoothWheel: true,
      syncTouch: false,         // モバイルはネイティブ慣性に委ねる
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
