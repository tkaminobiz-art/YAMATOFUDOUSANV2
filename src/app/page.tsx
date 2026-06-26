// 2026-06-26: トップ「/」を Bプラン V3（リブート確定・本命ページ）へ昇格接続。
//   - 実体は src/app/b-plan-v3/page.tsx（ゴシック・動画FV＋直下ステートメント）。
//     本ファイルはその default / metadata を再エクスポートするブリッジ。編集は /b-plan-v3 側で行う。
//   - 旧 b-plan-v2（明朝）は /b-plan-v2 に残置（Git 履歴からも復元可能）。
//   - これにより「/」と「/b-plan-v3」の両 URL が同一内容を表示する。
export { default, metadata } from "./b-plan-v3/page";
