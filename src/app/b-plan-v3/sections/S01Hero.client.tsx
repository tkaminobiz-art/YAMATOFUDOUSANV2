"use client";

import { useEffect, useState } from "react";

/**
 * S01HeroVideo — Hero 背景帯（client 子・v3 配下に閉じる）。
 *
 * WCAG 2.2.2 / reduced-motion 尊重:
 *   prefers-reduced-motion: reduce 時は autoPlay video を出さず poster 静止画のみ描画する。
 *   globals.css の安全網は CSS animation/transition のみ無効化し HTML video の autoPlay には
 *   効かないため、JS（matchMedia）で動画自体を出し分ける。
 *
 * background かつ aria-hidden（代替テキスト不要）。SSR フォールバックは poster 静止画なので
 * JS 無効でも背景は表示される（動きが無いだけ）。
 */
const POSTER = "/videos/hero/yamato-home-story-poster.jpg";
const SRC = "/videos/hero/yamato-home-story.mp4";

export default function S01HeroVideo() {
  // 初期値は「動かさない（poster のみ）」。mount 後に reduced-motion でなければ動画へ昇格。
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (reduceMotion) {
    // reduced-motion: 自動再生しない。poster 静止画のみ（動きを抑制）。
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={POSTER}
        alt=""
        aria-hidden
        className="h-full w-full object-cover"
      />
    );
  }

  return (
    <video
      className="hero-ken-burns h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      poster={POSTER}
    >
      <source src={SRC} type="video/mp4" />
    </video>
  );
}
