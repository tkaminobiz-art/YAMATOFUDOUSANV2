# セクション上部ヘッダー ルール（統一）

## 目的
- **「1枚資料」っぽい説得力**を全セクションで統一して出す
- スクロール中の退屈さを消し、**どこを見ても同じ“品”**が残る状態にする

## ルール（上部は必ずこの型）
- **中央揃え**
- **ピル型ラベル（例: `MECHANISM` / `COMPARISON`）**
- **大見出し（断言の短文）**
- **薄い埋もれ文字（ghostText）**
- リード文（lead）は **必要なときだけ**。基本は短く。

## 実装
- 共通コンポーネント: `src/components/SectionHeaderCentered.tsx`

## 使用例

```tsx
<SectionHeaderCentered
  label="COMPARISON"
  title="大手と、やまとで。"
  ghostText="COMPARISON"
  lead="同じ素材、同じ品質。違うのは、看板代と中間マージンだけ。"
/>
```

