"use client";

/**
 * Lenis smooth scroll を全ページに適用する軽量プロバイダ。
 *
 * 2026-05-04 v2: GSAP ScrollTrigger 同期を追加
 * ----------------------------------------------------------------
 * 旧版は requestAnimationFrame で Lenis を回すだけだったが、
 * GSAP ScrollTrigger が「ブラウザネイティブの scroll」を読みにいく一方、
 * Lenis は smoothing 済みの scroll を保持しているため、両者の値がズレて
 * sticky pin sections が「カクカク」と見えていた。
 *
 * 標準パターン(GreenSock 公式 + lenis 公式 README 推奨):
 *   1. lenis.on("scroll", ScrollTrigger.update) で scroll 変化を即時通知
 *   2. gsap.ticker.add で Lenis の raf を gsap の clock に乗せる
 *      (個別 RAF を立てない → tick が常に同期)
 *   3. gsap.ticker.lagSmoothing(0) で「タブ切替時に時間を補完しない」
 *      (sticky pin 中に巨大 jump が起きるのを防ぐ)
 *
 * 方針:
 * - 軽度 hijack：lerp 0.1、wheelMultiplier 1.15
 * - `prefers-reduced-motion: reduce` で完全無効化
 * - SSR safe (typeof window check)
 */

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// SSR 環境では window が無いため、登録は client-side でも安全に。
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      lerp: 0.1,
      wheelMultiplier: 1.15,
      smoothWheel: true,
      syncTouch: false,
    });

    // ── ScrollTrigger 同期 ──
    // Lenis が scroll する度に ScrollTrigger に「動いたよ」を通知。
    // これで pin/scrub が Lenis の lerp 済み座標に張り付いて滑らかになる。
    const handleScroll = () => ScrollTrigger.update();
    lenis.on("scroll", handleScroll);

    // ── gsap.ticker に Lenis の raf を委譲 ──
    // 個別 requestAnimationFrame を立てず、gsap の単一 ticker に統合。
    // 第二引数の time は秒、Lenis は ms を期待するため * 1000。
    const tickerCallback = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCallback);
    // タブ切替で time が飛んでも 0 補完=飛びを抑える(sticky の jump 対策)
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
