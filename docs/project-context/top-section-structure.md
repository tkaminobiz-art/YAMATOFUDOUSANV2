# TOP ページのセクション構成方針

## 現状の構成 (2026-05-09 確定 / Phase A 軽量化完了)

13 → 10 セクションに圧縮。判断材料の本体は 7 ブロック。

```
HeroVideo            動画FV + メインコピー + Track Record overlay
TrustStrip           実績数字バーン
PriceSection         3 cover カード (花/風/京) — 軽量化済み
CostPride            なぜこの価格で建てられるのか (Seedance ¥0 ink sequence)
StandardIncluded     標準仕様 8 + 後から増えない 4 (旧 3 セクション統合)
MapBridge            物件情報入口
SocialProof          建てた家 3 + お客様の声 3 (旧 Works + Voice 統合)
BreathStrip          golden hour parallax (感情 → 機能の切り替えクッション)
FaqSection           5 問
FinalCta             3 カード締め (来場/資料/電話) + 総額診断
```

## なぜこの順序か

1. **Hero の熱を Price まで途切れさせない** — 旧構成では BreathStrip を Hero/Trust 直下に
   置いていたが、Hero の atmospheric setup が完了直後に同温度の写真を入れると Hero の
   効きを薄め、scroll momentum も 2 度止まる
2. **BreathStrip は SocialProof → FaqSection の間に置く** — 家族 3 組の物語 (感情ピーク)
   の余韻を伸ばし、機能的 Q&A への切り替えクッションとして機能する
3. **PriceSection を Hero/Trust 直下に昇格** — 旧 StandardComparisonBlueprint
   (比較 table) は撤去し、PriceSection cover-card edition が 3 プランの「導入 + 詳細」を
   1 セクションで担う

## 圧縮の指針 (削除した・統合したもの)

| 削除/統合した要素 | 方針 |
|---|---|
| StandardCrossSection / StandardEquipment / ZeroDeclaration | → `StandardIncluded` 1 セクションに統合 |
| WorksSection / VoiceSection | → `SocialProof` 1 セクションに統合 |
| MidCta | → `FinalCta` に統合 |
| BreathStrip ②③④ (Quiet Pause / Final Whisper 等) | → 1 本に絞る |
| StandardComparisonBlueprint | → PriceSection に役割吸収 |
| PerformanceGrid | → StandardEquipment に統合済 |
| MiniSimulator / LotsSection | → MapBridge に置換 (詳細は /lots へ) |
| RepresentativeMessage | → TOP から撤去 (/staff 配下で検討) |
| PhotoBreath | → 冗長として撤去 |

**削除したコンポーネントの .tsx ファイル本体は保持** (戻す可能性 / 詳細ページで再利用)。
TOP からの import を外しただけ。

## 詳細を逃がした先

| TOP では絞った | 詳細はここで | 担当ページ |
|---|---|---|
| PriceSection (間取り例 / 含む別途) | 全 17 項目テーブル + 含む別途リスト | `/money` |
| StandardIncluded (8 項目) | 全 17 項目仕様書 | `/standard` |
| SocialProof (家族 3 組) | 50 組のお客様の声 | `/voice` |
| SocialProof (建てた家 3) | 全施工事例 | `/works` |
| MapBridge | 76 区画の自社分譲地カタログ | `/lots` |
| FaqSection (5 問) | 10 問以上の Q&A | `/faq` |

## 上限ルール

- 許容上限は 12 セクション
- 避けたいのは 15 以上
- 現状 10 (BreathStrip 含む) で安定

## TOP の目的を忘れない

> トップの目的は「全部説明する」ではなく「相談してみてもいいかも」と思わせるところまで。

詳細は下層ページへ逃がす設計を維持する。

## CTA 階層

`line-first-cta-strategy.md` と整合。詳細は `BRAND-TRUTH.md §5` 参照。

---

**原典 memory (Claude側):** `project_top_section_structure_v2.md`
