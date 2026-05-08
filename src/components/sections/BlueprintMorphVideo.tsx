"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/*
  BlueprintMorphVideo — 立面図 → 3D ビジュアライズの morph 再生
  ---------------------------------------------------------------
  Seedance 2.0 で生成した「設計図が建物になる」6 秒動画を、
  StandardComparisonBlueprint の ELEVATION エリアで loop 再生する。

  振る舞い:
    - poster: 立面図 PNG をすぐ描画(LCP 影響最小化)
    - autoplay/muted/playsinline/loop で UI 操作不要
    - IntersectionObserver で viewport 内のみ再生(モバイルデータ節約)
    - prefers-reduced-motion: 動画を読み込まず poster のみ表示
*/

// MediaQueryList 購読(useSyncExternalStore 用)
function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}
function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function getReducedMotionServerSnapshot() {
  return false;
}

type Props = {
  /** Seedance 出力の動画(public 配下) */
  videoSrc: string;
  /** 静止 poster(public 配下) */
  posterSrc: string;
  alt: string;
  className?: string;
};

export default function BlueprintMorphVideo({
  videoSrc,
  posterSrc,
  alt,
  className = "",
}: Props) {
  // useSyncExternalStore で MediaQuery を購読(setState-in-effect 警告を避ける)
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 視認時のみ play / 退出時 pause
  useEffect(() => {
    if (reducedMotion) return;
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  // play/pause 制御(ブラウザの autoplay policy 上、muted で再生)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !reducedMotion) {
      v.play().catch(() => {
        /* autoplay policy で reject されても poster は出ているので無視 */
      });
    } else {
      v.pause();
    }
  }, [inView, reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className={`relative aspect-[16/9] w-full overflow-hidden ${className}`}
      style={{ background: "#F7F4EC" }}
    >
      {/* 静止 poster — 動画読み込み前 / reduced-motion 時 / 動画失敗時のフォールバック */}
      <Image
        src={posterSrc}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain"
        priority={false}
      />

      {reducedMotion ? null : (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          loop
          preload="metadata"
          autoPlay={false}
          aria-label={alt}
          className="absolute inset-0 w-full h-full object-contain"
        />
      )}
    </div>
  );
}
