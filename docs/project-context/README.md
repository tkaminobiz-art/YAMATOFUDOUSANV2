# Project Context — やまと不動産 HP V2

このフォルダは「実装に直接出ないが、判断の前提として全 AI エージェントが共有すべき
プロジェクト戦略・関係者の意思決定・歴史的経緯」をまとめる。

## 単一正本の構造

```
リポジトリ直下/
├── AGENTS.md                  ← AI 両者の入口
├── BRAND-TRUTH.md             ★ ブランド事実 (色・数字・コピー憲法・CTA)
├── DESIGN_GUARDRAILS.md       ★ デザインルール
├── docs/
│   ├── japanese-style.md      和文タイポルール
│   ├── section-header-rule.md セクションヘッダールール
│   └── project-context/       ★ プロジェクト戦略・意思決定の経緯 (本フォルダ)
│       ├── README.md
│       ├── kobayashi-review-20260428.md  専務レビュー結果と原則
│       ├── 12-rate-gaps.md               年12棟達成のギャップ分析
│       ├── conversion-sales-rulebook.md   営業マンとして売るための10条
│       ├── line-first-cta-strategy.md    LINE 主導線方針
│       ├── gbp-status-and-strategy.md    GBP 評価と公開戦略
│       ├── top-section-structure.md      TOP 構成方針
│       └── yamato-words-bank.md          ★ やまとの言葉バンク (公式サイト+パンフ逐語コーパス)
```

## やまとの言葉バンク (一次資料の逐語)

`yamato-words-bank.md` は、やまと不動産が「実際に使っている言葉」を公式サイト
(yamatogroup.net) とパンフレット写真から逐語で蓄積した一次資料コーパス。
copywriter スキルが `素の説明体` の北極星 (クライアントの実テキスト) として参照する。
改変・要約せず引用し、register (口調・温度) を合わせること。数字の正本は
`BRAND-TRUTH.md` で、公式サイトとの差異は同ファイル §9 にメモ済み。

## 優先順位

判断が衝突したとき:
1. `BRAND-TRUTH.md` (ブランド事実) が最優先
2. `DESIGN_GUARDRAILS.md` (デザインルール) が次点
3. `docs/project-context/` (戦略・歴史) は背景として参照

## 更新ルール

- 関係者の意思決定 (専務・神野さん) があった日に、その内容と「なぜ」を記録
- 古い決定は削除せず「以前は X だったが Y に変更」として残す (歴史を消さない)
- ブランド事実 (数字・名称・色) が変わったら、まず `BRAND-TRUTH.md` を更新してから本フォルダに経緯を残す
