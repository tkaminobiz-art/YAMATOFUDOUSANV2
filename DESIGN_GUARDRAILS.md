# Design Guardrails — やまと不動産

W2 系 (建築図面アートディレクション) のセクション実装で AI 臭が出るのを防ぐ
ためのルール。Hero / Price / Spec / Trust 等で参照すること。

**この文書のルールは BRAND-TRUTH.md と並ぶ強制ガード。**
PR 前に「AI smell check 10 項目」を必ず通す。

最終更新: 2026-05-08

---

## 1. 役割別パターン (使い分ける)

W2 系セクションで「情報を整理する」とき、**generic な table / card** に逃げず、
以下のパターンから役割に合うものを選ぶ。

### Pattern A — Open Spec
**用途**: PRICE 等の強い情報。
**作り**: 上下に薄い罫線だけ、左右は閉じない。中身に視覚重みを集中させる。
```
─────────────────────
STARTING PRICE        ← 小さい英字ラベル (mono)
京モデル　2,280 万円〜  ← 数字は大きく Oswald
税込・建物本体＋標準付帯工事込み  ← 小さい注釈
─────────────────────
```

### Pattern B — Metric Rail
**用途**: 実績数字 (棟数 / 区画数 / 組数 / 年数等)。
**作り**: 箱に入れない。横一列の静かなレール。
```
600 棟以上　·　90 区画以上　·　50 組以上　·　14 年
─────────────────────────────  ← faint hairline 一本だけ可
施工実績 / 分譲・土地 / お客様の声 / 業歴
```

### Pattern C — Annotation Note
**用途**: 図版や仕様への補足。
**作り**: 引出し線 + 小さい注釈テキスト。建築図面の callout を真似る。

### Pattern D — Title Block (Hero以外で限定使用)
**用途**: 価格詳細ページの仕様一覧、施工事例の物件メタ等。
**作り**: 建築図面の右下タイトル欄を真似る。Hero では使わない (重い)。

### ActionLine
**用途**: CTA。
**作り**: 表/カードに閉じ込めず、独立した行動導線として配置。breathing space を取る。

---

## 2. W2 系の設計ルール

| 項目 | ルール |
|------|--------|
| border 色 | `--rule` `--rule-strong` `--rule-faint` を使う (純黒禁止) |
| border 範囲 | 2 方向まで (上下 / 左のみ / 部分のみ) |
| 角丸 (radius) | 0〜4px まで (`rounded-xs` 以下) |
| 影 | なし。`shadow-*` は禁止 |
| 背景 | 完全な #FFFFFF より paper-warm (#F8F7F4 / #FAFAF7) |
| ラベル | 小・英字は最小限・mono trackingあり |
| 値 | ラベルより視覚重み強く (大きく / Oswald 等) |
| 視覚重み | 役割ごとに変える: PRICE 強 / RECORDS 静 / ACTION 独立 |

---

## 3. W2 系で禁止

PR でこのいずれかが出たら blocker:

- 価格 / 実績 / CTA を同じテーブル (TITLE BLOCK) に入れる
- 四辺すべて border の閉じた枠
- `rounded-lg` / `rounded-xl` / `rounded-2xl`
- `shadow-md` / `shadow-lg` / 重い影
- 3 カラム / 4 カラム均等 `bg-white` card 量産
- 全セル同 padding
- 全情報同フォントサイズ
- icon + number + text 量産 UI
- generic な `<table>` / DataTable コンポーネント

---

## 4. 専用コンポーネント (generic を作らせない)

W2 系で必要な情報整理は以下の専用コンポーネントで作る:

- `DrawingFrame` — 写真を建築 elevation 風に囲む
- `DrawingCaption` — 写真下の小さい図版キャプション
- `PriceSpec` — Pattern A 実装
- `MetricRail` — Pattern B 実装
- `AnnotationNote` — Pattern C 実装
- `TitleBlock` — Pattern D 実装 (Hero以外限定)
- `ActionLine` — CTA 独立配置

generic な `Card` / `Section` / `Table` を W2 系セクションに持ち込まない。

---

## 5. AI smell check (毎セクション PR 前に 10 項目)

```
[ ] 1. 同じカードが 3 つ以上並んでいないか
[ ] 2. すべての情報が箱に入っていないか
[ ] 3. 線が四辺すべてに入っていないか
[ ] 4. 余白が全部同じか
[ ] 5. CTA が表 / カードに閉じ込められていないか
[ ] 6. 価格・実績・CTA が同じ重さか
[ ] 7. Tailwind の rounded/shadow/card 感が出ていないか
[ ] 8. 写真を抜いてもデザインが成立するか (グレーボックステスト)
[ ] 9. 会社名差し替えで成立する汎用デザインか
[ ] 10. 図面風装飾が意味なく増えていないか
```

**1〜7 のいずれかに該当 = リファクタ必須**。
8〜10 は方針判断 (PR で要相談)。

---

## 6. 実装フロー (固定)

1. グレーボックステスト — 写真ゼロのワイヤーで構造を作る
2. 1 案を選ぶ (3 案比較に戻らない)
3. 実写を最後に入れる
4. 色・質感・CTA を最後に調整
5. AI smell check 10 項目を通す
6. PR

写真先行で見栄えだけ整えるのは禁止 (memory: feedback_design_first_photo_last_grey_box_test.md)。
