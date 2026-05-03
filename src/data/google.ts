/*
  Google Business Profile (GBP) 連携設定
  ---------------------------------------------------------------
  2026-05-03 専務承認 A項目「12棟達成の最大の穴」より、GBP 口コミ動線を整備。
  「奈良 注文住宅」検索のマップ枠最上位を狙うため、星4.5以上×30件超を目標。

  PLACE_ID は環境変数 NEXT_PUBLIC_GOOGLE_PLACE_ID で上書き可能。
  確認方法: https://developers.google.com/maps/documentation/places/web-service/place-id
  → 「やまと不動産」「奈良市大宮町1丁目6番21」で検索 → place_id をコピー
*/

const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "";

// 本社住所での検索フォールバック(place_id が未設定でも機能する)
const FALLBACK_QUERY = encodeURIComponent(
  "株式会社やまと不動産 奈良市大宮町"
);

/**
 * Google で口コミを書くページへのURL。
 * place_id が設定されていればダイレクトに、無ければ検索フォールバック。
 */
export const GOOGLE_REVIEW_URL = PLACE_ID
  ? `https://search.google.com/local/writereview?placeid=${PLACE_ID}`
  : `https://www.google.com/maps/search/?api=1&query=${FALLBACK_QUERY}`;

/**
 * 既存の口コミ閲覧用URL(マップ表示)。
 */
export const GOOGLE_MAPS_URL = PLACE_ID
  ? `https://search.google.com/local/place?placeid=${PLACE_ID}`
  : `https://www.google.com/maps/search/?api=1&query=${FALLBACK_QUERY}`;

/**
 * 設定済みかどうか。未設定なら UI で軽い注記を出すかどうかの判定に使う。
 */
export const GOOGLE_PLACE_ID_CONFIGURED = Boolean(PLACE_ID);
