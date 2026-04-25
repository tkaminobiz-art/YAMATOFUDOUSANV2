// 旧サイト /pg-floorplan/ + /blog/entry-{472973..472980} から抽出した「間取り例」データ
// 2026-04-25 抽出:
//   - FeaturedSamples (/pg-floorplan/ のメインサンプル): 4件 × 各2画像
//   - EntryExamples   (/blog 間取り事例①〜⑧): 8件 × 各1画像
//   合計 16 画像 / 4.0MB → WebP q82 で 1.2MB
//
// 設計意図:
// - FeaturedSamples は title/desc/features 付きで、TOP やデザイン系セクションで
//   "こういう間取りが可能" をストーリー付きで見せる用途
// - EntryExamples は間取り図そのもの(画像のみ)。詳細ページや /works の補助資料
//   として使用
//
// UI 側は次回セッションで結合。まずはデータのアーカイブを優先。

import floorplanData from "./floorplans.json";

export type FloorplanFeaturedSample = {
  id: string;
  section: string;        // colonnade | storage
  sectionLabel: string;   // 空間と調和した吹き抜けのある家 等
  title: string;
  desc: string;
  features: readonly string[];
  images: readonly string[];
};

export type FloorplanEntryExample = {
  id: string;
  title: string;           // 間取り事例①
  sourceEntryId: number;   // 472973..472980
  image: string;
};

export type FloorplansData = {
  featuredSamples: readonly FloorplanFeaturedSample[];
  entryExamples: readonly FloorplanEntryExample[];
  totalFeaturedSamples: number;
  totalEntryExamples: number;
  totalImages: number;
};

export const FLOORPLANS: FloorplansData = floorplanData as FloorplansData;

export function getFloorplanSample(id: string): FloorplanFeaturedSample | undefined {
  return FLOORPLANS.featuredSamples.find((s) => s.id === id);
}

export function getFloorplanEntry(id: string): FloorplanEntryExample | undefined {
  return FLOORPLANS.entryExamples.find((e) => e.id === id);
}
