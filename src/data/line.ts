/*
  LINE 公式アカウント連携設定
  ---------------------------------------------------------------
  2026-05-03 専務承認 A項目「12棟達成の3欠落動線」③:
  「LINE登録者限定・未公開土地先行案内」
  「土地が先に見つかる」が「総額が見える」より決定打になる層へ。

  公式アカウントID と 友だち追加URL は環境変数で上書き可能。
  確認方法: LINE Official Account Manager にログイン → アカウント設定 →
    友だち追加用URL or QRコード からURLを取得
*/

const LINE_BASIC_ID =
  process.env.NEXT_PUBLIC_LINE_BASIC_ID || "@yamatofudosan";

/**
 * LINE 友だち追加URL
 * フォーマット: https://line.me/R/ti/p/{basicId}
 * basicId は @ プレフィックス付き(例: @yamatofudosan)
 */
export const LINE_ADD_FRIEND_URL =
  process.env.NEXT_PUBLIC_LINE_ADD_URL ||
  `https://line.me/R/ti/p/${encodeURIComponent(LINE_BASIC_ID)}`;

export const LINE_BASIC_ID_DISPLAY = LINE_BASIC_ID;
