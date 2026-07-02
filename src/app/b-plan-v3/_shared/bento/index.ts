/**
 * bento — /b-plan-v3「編集的データダッシュボード」基盤モジュールの barrel。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆system（8モジュール仕様）。
 * 全モジュールは「器」— 文言・数値は props で受けて _data.ts / @/data/brand-facts から
 * 供給する（モジュール内にコピー・数値のリテラルを持たせない＝数値ドリフト封じ）。
 * reveal 発火は _shared/RevealGroup.tsx（IO once・1セクション=IO最大1）。
 */

export { default as BentoBoard, BentoCell } from "./BentoBoard";
export { default as StatCard } from "./StatCard";
export type { StatCardProps } from "./StatCard";
export { default as DataBar } from "./DataBar";
export type { DataBarProps, StackSegment, CompareItem, BarTone } from "./DataBar";
export { default as ChipRow } from "./ChipRow";
export type { Chip } from "./ChipRow";
export { default as LedgerRow, LedgerGroup } from "./LedgerRow";
export { default as PhotoTile } from "./PhotoTile";
export { default as FlowRail } from "./FlowRail";
