// 旧サイト /construction/ + /blog/entry-* から抽出した「部位別ギャラリー」データ
// 2026-04-25 抽出: 10カテゴリ / 116枚(WebP q82, 合計 6MB)
//
// 設計意図:
// - Voice (邸名・家族・コメント) と Works (部位別ギャラリー) の役割分担を明確化
// - 旧サイト同等の情報量を保持(旧サイト消滅後のアーカイブを兼ねる)
// - UI 側は次回セッションで WorksSection を書き換えて参照する

import worksPartsData from "./works-parts.json";

export type WorksPartCategory = {
  slug: string;
  title: string;         // 外観 / 玄関 / リビング 等
  copy: string;          // 旧サイトのコピー文(改行は \n)
  sourceEntryId: number; // 旧サイト blog entry ID(出典用)
  coverImage: string;    // /images/works-parts/{slug}/{slug}-01.webp
  gallery: string[];     // 全ギャラリー画像 URL
  count: number;
};

export type WorksPartsData = {
  categories: WorksPartCategory[];
  totalCategories: number;
  totalGalleryImages: number;
};

export const WORKS_PARTS: WorksPartsData = worksPartsData as WorksPartsData;

export function getPartsCategory(slug: string): WorksPartCategory | undefined {
  return WORKS_PARTS.categories.find((c) => c.slug === slug);
}

export function getAllPartsSlugs(): string[] {
  return WORKS_PARTS.categories.map((c) => c.slug);
}
