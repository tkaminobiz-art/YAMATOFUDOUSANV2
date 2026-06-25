// 2026-06-25: トップ「/」を Bプラン V2（編集中の本命ページ）に接続。
//   - 実体は src/app/b-plan-v2/page.tsx。本ファイルはその default / metadata を
//     再エクスポートするだけのブリッジ。編集は引き続き /b-plan-v2 側で行う。
//   - 旧A案トップ（HeroVideo + components/sections/* 構成）は撤去。Git 履歴から復元可能。
//   - これにより「/」と「/b-plan-v2」の両 URL が同一内容を表示する。
export { default, metadata } from "./b-plan-v2/page";
