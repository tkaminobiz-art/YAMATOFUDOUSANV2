"use client";

import type { ReactNode } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useScrollIn } from "@/hooks/useScrollIn";

/**
 * /money 専用のモーション・アイランド。
 * 大数字の count-up と、セクションのスクロールインを
 * サーバーコンポーネントの page から薄く差し込むためのクライアント部品。
 */

export function CountUp({
  value,
  className = "",
  duration = 1400,
  format,
}: {
  value: number;
  className?: string;
  duration?: number;
  format?: (n: number) => string;
}) {
  const { value: v, ref } = useCountUp(value, { duration });
  const text = format ? format(v) : v.toLocaleString("ja-JP");
  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

export function Reveal({
  children,
  className = "",
  stagger = false,
}: {
  children: ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  const ref = useScrollIn<HTMLDivElement>(stagger);
  return (
    <div ref={ref} className={`${stagger ? "" : "scroll-in"} ${className}`.trim()}>
      {children}
    </div>
  );
}
