"use client";

import type { ReactNode } from "react";
import { useScrollIn } from "@/hooks/useScrollIn";

/**
 * RevealGroup — セクション共通の reveal 発火点（S02Reveal の一般化・昇格版）。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆motion §(4)。
 * sections/S02.client.tsx（S02Reveal）と同一実装・名前だけ汎用化したもの。
 * S02.client.tsx は後方互換のため残置（触らない）。新規/改修セクションはこちらを使う。
 *
 * - row順次 reveal（Y+→0・ease-burn・IO once・50ms stagger）。叫ばない。
 * - 既存 .scroll-in（globals.css）＋ useScrollIn(stagger=true) に集約
 *   （IO 乱立を避ける: 1セクション=IO最大1。新モジュールの個別 IO 新設は禁止で、
 *   BentoBoard/StatCard/DataBar/ChipRow/FlowRail/PhotoTile は全てこの .is-visible
 *   子孫セレクタで駆動する。DataBar の .bento-bar-grow も同様）。
 * - reduced-motion: useScrollIn が即 is-visible 付与＋CSS で transition 解除。
 *
 * 置く側のセクション default export は props 無しのサーバーコンポーネントのまま保つ。
 */
export default function RevealGroup({ children }: { children: ReactNode }) {
  const ref = useScrollIn<HTMLDivElement>(true);
  return <div ref={ref}>{children}</div>;
}
