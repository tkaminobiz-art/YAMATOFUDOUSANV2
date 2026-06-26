# FV案B テンポ写真モンタージュ — アセット制作記録＋トレーサビリティ

2026-06-26。FV案B（[2026-06-26-fv-montage-plan.md](2026-06-26-fv-montage-plan.md)）の B-2 仕様で制作したモンタージュ動画の制作記録。
**BRAND-TRUTH §1**: AIレタッチした建物写真は出典にトレース可能であること。本書がその記録。

## 成果物（public/videos/fv/）

| ファイル | サイズ | 用途 |
|---|---|---|
| `yamato-fv-montage.webm` | 1.41MB | FV背景動画（VP9・主） |
| `yamato-fv-montage.mp4` | 1.79MB | H.264 フォールバック |
| `yamato-fv-montage-poster.webp` | 0.09MB | poster（=末尾ヒーロー・三山木 夕暮れ） |

エンコード: 1280×720 / 30fps / **2枚/秒（D=0.75・xfade 0.25s・offset 0.5s刻み）** / 末尾ヒーロー静止3秒 / 総尺18.0s / 音声なし。VP9 2パス約700kbps。

## AIレタッチ外観（出典トレーサビリティ）

モデル: **nano_banana_pro**（Higgsfield・image-to-image・各2クレジット）。手法: 元の実写真を参照に**空・時間帯・照明のみ変更、建築/素材/色は保持**（§7.2素材ロック強化プロンプト）。各枚を元写真と1対1で目視照合し、建物の同一性を確認したものだけ採用。

| 採用フレーム | 元写真（allowlist実写） | Higgsfield media_id | 時間帯 | job_id | 判定 |
|---|---|---|---|---|---|
| 三山木 青空 | `newsozai/exterior-miyamaki-front.webp` | 56466d7e… | 青空 | 95a4122b | ✅採用 |
| 三山木 夕暮れ | 〃 | 56466d7e… | blue hour | 0d608b9b | ✅採用◎ |
| 三山木 夜景 | 〃 | 56466d7e… | 夜景 | 7dbeb6d2 | ✅採用◎ |
| 三山木 薄曇り | 〃 | 56466d7e… | 薄曇り朝 | 0f9630a9 | ✅採用 |
| 三山木 黄金光 | 〃 | 56466d7e… | golden | 285eed1f / 89b1feb3 | ❌不採用（黒外壁が茶レンガ化＝§1違反。ロックでも完全には防げず） |
| 左京 青空 | `newsozai/exterior-sakyo-clean.webp` | 2f4b22d6… | 青空 | 4a7da242 | ✅採用 |
| 左京 夕暮れ | 〃 | 2f4b22d6… | blue hour | 6c079ff8 | ✅採用◎ |
| 左京 夜景 | 〃 | 2f4b22d6… | 夜景 | 593389bb | ✅採用◎ |
| 緑の家 青空 | `newsozai/hero-day-green-exterior.webp` | 98c5877e… | 青空 | 45f6f5da | ✅採用 |
| 緑の家 夕暮れ | 〃 | 98c5877e… | blue hour | 1b388e50 | ✅採用◎ |
| 緑の家 夜景 | 〃 | 98c5877e… | 夜景 | add0958b | ✅採用◎ |
| 二色 黄金光 | `works-parts/exterior/exterior-08.webp` | 20dac741… | golden | 2f707ee0 | ✅採用（明壁は黄金光OK・電線/車の雑多を整理） |
| 二色 青空 | 〃 | 20dac741… | 青空 | 62d2c7a4 | ✅採用 |
| 二色 夕暮れ | 〃 | 20dac741… | blue hour | cba48cdc | ✅採用 |

採用マスター(PNG 2752×1536)は `screenshots/fv-*.png` に保管。

## 知見（再現用）
- nano_banana_pro＋素材ロックで建築・形状は高忠実。ただし**黒/チャコール外壁＋暖色グレーディング（黄金光）は茶レンガ化**するため、暗壁の家は「青空・夕暮れ・夜景・薄曇り」を使い黄金光は避ける。**明るい外壁の家は黄金光OK**。
- 雑多な背景（電線・車）は「remove distracting clutter」で整理可（§1許容＝視覚的クリーンアップ）。建物は不変を確認すること。

## 30枚モンタージュ構成（順序）
1–10 外観群（夕暮れ・夜景主軸／三山木・左京・緑の家・二色の4棟＋青空/黄金光でリズム）
11–20 内観の光（`newsozai/interior-ldk-01`・`interior-kitchen-01`・`works-parts/living/02,07,11,04`・`kitchen/03,09,12`・`interior-window-detail-01`／**実写そのまま**）
21–28 暮らしのディテール（`entrance/01,05`・`washroom/02,05`・`storage/05,08`・`bath/03`・`newsozai/exterior-terrace-01`／**実写そのまま**）
29–30 最終ヒーロー静止着地（二色 青空 → 三山木 夕暮れ＝3秒静止）

## a11y（B-2準拠・実装時に必須）
- 2枚/秒（≧500ms）・硬カット無し（xfade）・末尾静止着地＝WCAG 2.3.1/2.2.2の閾値から離す設計。
- 実装時: `prefers-reduced-motion` / Save-Data 時は動画を出さず **poster静止**（既存 `S01Hero.client.tsx` の matchMedia 出し分けを踏襲）。前景（メッセージ・2,280バーン・CTA）は終始不動。
