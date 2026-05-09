# LINE 主導線化方針 (2026-05-05 確定)

問い合わせ導線を LINE 主導線に切り替え。Phase 1 実装済み (commits 623ca04 / 9300362 / 08d6718)。

## なぜ LINE-first

- 住宅検討初期 (検討期間 3〜6 ヶ月) の温度感では、フォームは「正式営業の入口」に見えて
  心理ハードルが高い
- LINE は生活インフラ化していて、ターゲット 30〜40 代子育て世帯と相性が良い
- 一方、専務承認済みの「無料総額診断」は資産として強い → 捨てるのではなく、
  **入口だけ LINE に変える**設計

## CTA 階層 (全ページ共通)

```
LINE → 見学 → フォーム → 電話
```

| 役割 | CTA | 色 |
|---|---|---|
| Primary | LINE で相談 | `--brand-line-green` `#06C755` |
| Secondary | モデルハウスを見学 / 来場予約 | `--brand-deep-green` or `--brand-lime` |
| Tertiary | 資料請求 | text-link or quiet outlined |
| Tertiary | 電話 | footer / contact only |

詳細は `BRAND-TRUTH.md §5` 参照。

## 実装ルール

- LINE へのリンクは必ず `LINE_ADD_FRIEND_URL` (`src/data/line.ts`) を経由する。
  `https://line.me/` 等のプレースホルダー直書きは禁止 (過去に FloatingCta でバグ化)
- フォーム導線は完全削除ではなく「LINE を使われない方は…」のような控えめなテキストリンクで温存
  (PC ユーザー・LINE 非利用層・家族転送用途のため)
- 電話 CTA は `/money`・`FinalCta` 等の特大表示で温存。スマホ固定 CTA からは外したが、
  ヘッダー・フッターからはアクセス可能
- 本番 URL は `NEXT_PUBLIC_LINE_ADD_URL` を Vercel 環境変数で上書き。
  コードのデフォルト `@yamatofudosan` は仮置き

## Phase 2 以降 (未着手)

- リッチメニュー
- タグ管理
- 配信カレンダー
- 月 2-4 通の節度

## 禁じ手

- ❌ 煽り配信
- ❌ 「今だけ」「残り◯組」
- ❌ 毎日配信 (3-4 通目でブロック誘発)

---

**原典 memory (Claude側):** `project_line_first_cta_strategy.md`
