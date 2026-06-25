"use client";

import type { ReactNode } from "react";
import { useCountUp } from "@/hooks/useCountUp";

/**
 * BurnNumber — 巨大数字バーン（.t-burn ラッパ・Oswald 600・tabular）。
 *
 * §3.4「1セクション=1主役級バーン・二度打ち禁止」前提のプリミティブ。
 * - countUp=true で useCountUp（SSR に実数・reduced-motion で即値・rAF）。
 *   叫ぶのは S03(600) と S05(月々) の2箇所だけ（§4.2）。それ以外は countUp=false。
 * - locale=true で 1,000 等にカンマ（tabular でカンマ幅も固定）。
 * - suffix（棟以上/区画/円/万円〜 等）は .t-burn-sub で小さく従える。
 * - color はデフォルト継承（surface 側で text 色を決める）。
 */
export default function BurnNumber({
  value,
  countUp = false,
  duration = 1600,
  thresholdRatio = 0.4,
  locale = true,
  suffix,
  className = "",
  burnClassName = "",
  suffixClassName = "",
  "aria-label": ariaLabel,
}: {
  value: number;
  countUp?: boolean;
  duration?: number;
  thresholdRatio?: number;
  locale?: boolean;
  suffix?: ReactNode;
  className?: string;
  burnClassName?: string;
  suffixClassName?: string;
  "aria-label"?: string;
}) {
  const { value: animated, ref } = useCountUp(value, {
    duration,
    thresholdRatio,
  });
  const display = countUp ? animated : value;
  const text = locale ? display.toLocaleString("ja-JP") : String(display);

  return (
    <span
      className={`inline-flex items-baseline gap-2 ${className}`}
      // role の無い span への aria-label は WAI-ARIA で禁止（axe: aria-prohibited-attr）。
      // role="img" を付与すると aria-label が許可され、内部 span を aria-hidden に保てる。
      role={ariaLabel ? "img" : undefined}
      aria-label={ariaLabel}
    >
      <span
        ref={countUp ? ref : undefined}
        className={`t-burn ${burnClassName}`}
        aria-hidden={ariaLabel ? true : undefined}
      >
        {text}
      </span>
      {suffix != null && (
        <span className={`t-burn-sub ${suffixClassName}`} aria-hidden={ariaLabel ? true : undefined}>
          {suffix}
        </span>
      )}
    </span>
  );
}
