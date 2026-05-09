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
│       ├── line-first-cta-strategy.md    LINE 主導線方針
│       ├── gbp-status-and-strategy.md    GBP 評価と公開戦略
│       └── top-section-structure.md      TOP 構成方針
```

## 優先順位

判断が衝突したとき:
1. `BRAND-TRUTH.md` (ブランド事実) が最優先
2. `DESIGN_GUARDRAILS.md` (デザインルール) が次点
3. `docs/project-context/` (戦略・歴史) は背景として参照

## 更新ルール

- 関係者の意思決定 (専務・神野さん) があった日に、その内容と「なぜ」を記録
- 古い決定は削除せず「以前は X だったが Y に変更」として残す (歴史を消さない)
- ブランド事実 (数字・名称・色) が変わったら、まず `BRAND-TRUTH.md` を更新してから本フォルダに経緯を残す
