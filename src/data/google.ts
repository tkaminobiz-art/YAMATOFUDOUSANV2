/*
  Google Business Profile (GBP) 連携設定
  ---------------------------------------------------------------
  2026-05-03 専務承認 A項目「12棟達成の最大の穴」より、GBP 口コミ動線を整備。
  「奈良 注文住宅」検索のマップ枠最上位を狙うため、星4.5以上×30件超を目標。

  2026-05-07: ユーザーから「やまと不動産」GBPの公式シェアURLを受領、
  デフォルト閲覧先として組み込み(short URLでGBPに正しく着地する)。

  優先順位: 環境変数 → シェアURL(閲覧用) → 検索フォールバック(書き込み用)
  PLACE_ID(NEXT_PUBLIC_GOOGLE_PLACE_ID) を入れると、書き込み・閲覧の両方が
  ダイレクトURLに切り替わる(性能・UX 共に最良)。
*/

const PLACE_ID = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "";

// 本社住所での検索フォールバック(口コミ書き込みURL生成にしか使わない)
const FALLBACK_QUERY = encodeURIComponent(
  "株式会社やまと不動産 奈良市大宮町"
);

// やまと不動産 GBP 公式シェアURL(2026-05-07 ユーザー提供)
// place_id 未設定時の閲覧用デフォルト。
const SHARE_URL = "https://share.google/xvX1rn42qY9GT547a";

/**
 * Google で口コミを書くページへのURL。
 * place_id が設定されていればダイレクトに、無ければ検索フォールバック。
 */
export const GOOGLE_REVIEW_URL = PLACE_ID
  ? `https://search.google.com/local/writereview?placeid=${PLACE_ID}`
  : `https://www.google.com/maps/search/?api=1&query=${FALLBACK_QUERY}`;

/**
 * 既存の口コミ閲覧用URL(マップ表示)。
 * place_id が無くてもユーザー提供のシェアURLで GBP に正しく着地する。
 */
export const GOOGLE_MAPS_URL = PLACE_ID
  ? `https://search.google.com/local/place?placeid=${PLACE_ID}`
  : SHARE_URL;

/**
 * 設定済みかどうか。未設定なら UI で軽い注記を出すかどうかの判定に使う。
 */
export const GOOGLE_PLACE_ID_CONFIGURED = Boolean(PLACE_ID);
