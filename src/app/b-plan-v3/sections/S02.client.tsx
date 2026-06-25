"use client";

import type { ReactNode } from "react";
import { useScrollIn } from "@/hooks/useScrollIn";

/**
 * S02Reveal — S02 の row順次 reveal だけを担う client 子コンポーネント。
 *
 * §S/§4: row順次 reveal（Y+→0・ease-burn・IO once・50ms stagger）。叫ばない。
 * 既存 .scroll-in（globals.css）＋ useScrollIn(stagger=true) に集約（IO 乱立を避ける・§4.7）。
 * - JS無効: globals.css の @media(scripting:none) フォールバックで初期可視（本文は消えない）。
 * - reduced-motion: useScrollIn が即 is-visible 付与＋CSS で transition 解除。
 *
 * デフォルトエクスポート（S02）は props 無しのサーバーコンポーネントのまま保つ。
 */
export default function S02Reveal({ children }: { children: ReactNode }) {
  const ref = useScrollIn<HTMLDivElement>(true);
  return <div ref={ref}>{children}</div>;
}
