# GBP (Google Business Profile) 評価と公開戦略

2026-05-07 戦略決定: TOP の `GoogleReviewBridge` (検討者向け "Google の口コミも見れます" 動線)
を env で off にした。実装済み (commit 5d9c6a9)。

## 現状 (2026-05-07 時点)

- 実数: **★3.6 / 51 件**
- 専務承認目標: **★4.5 以上 × 30 件超**

## なぜ off にしたか

- 現状を検討者に向けて公開すると CV を下げる (住宅業界の信頼閾値は 4.5+)
- 1★ レビューには「事務のおばさんは電話でタメ口」「要件を話終わればすぐ電話を切る」など、
  住まいの質ではなく**窓口対応 (運用品質) への指摘**が含まれる

## 公開フラグ

`NEXT_PUBLIC_GOOGLE_BRIDGE_ENABLED` を Vercel に投入 (=true) すると TOP に復活する。
**目標到達まで投入しないこと**。

## OB 向け動線は継続稼働

- `GoogleReviewCta` の default/inline variant は継続稼働
- 引渡し時・1 年点検時のお礼ページ・サンキューメール・LINE リッチメニュー等で集中投下すべき
  (現在は未整備の領域)

## 順序戦略

```
先に集める → ★4.5+ 達成 → TOP に公開
```

目標達成前に「とりあえず公開しよう」の判断は CV 逆効果。

## 1★ 運用品質指摘の対応

Web 側ではなく**業務側で改善** (電話受付マニュアル / 録音 / フィードバックループ)。
改善後に集中的な口コミ依頼を回せば 4.5+ 到達は現実的。

## 関連ファイル

- `src/data/google.ts` の `GOOGLE_BRIDGE_ENABLED` 定数
- `src/app/page.tsx` の条件レンダリング箇所
- `src/components/sections/GoogleReviewBridge.tsx` (温存)

---

**原典 memory (Claude側):** `project_gbp_collect_first.md`
