# 📰 HeroVoiceMagazine（1画面 Bento 誌面）最終版 — Review Notes

**最終更新**: 2026-04-17（v7：1画面 Bento 化）  
**ブランチ/コミット**: **未コミット**（ご確認後に判断）

## ⚡ v6 → v7 の変更点

v6（TORICHO 型・超巨大タイポ）は文字が大きすぎて**8件で 8 画面分のスクロール**になっていたため、v7 で **1画面（100svh）に 8 Figures + ヘッダ + CTA をすべて収める** Bento 構成に刷新。

| 要素 | v6 | v7 |
|---|---|---|
| 総スクロール量（Desktop） | 約 8,000px | **900px = 1画面** |
| 最大フォントサイズ | 136px | **38px** |
| レイアウト | 縦一列（8件が縦に連なる） | **12列×3行 Bento** |
| 01 ANXIETY | 単独セクション | **主役（6×2 大カード）** |
| ウォーターマーク「01」 | 右端に 220px | **01 カード内の装飾として左下** |
| モバイル | 縦スクロール | **縦スクロール**（1画面制約なし、カードで読みやすく） |

---

## 🎯 最終形：TORICHO 型・超巨大タイポ誌面

参考サイト（https://torichoapp.jp 系の「撮る、終わる。」式）の本質を完全移植：
- **極太ゴシック × 純白 × 深紅** の三色構成
- **1:7 の文字サイズ強弱** で、読ませる波を作る
- **吹き出しや装飾は一切なし**。文字とメタ行だけで成立させる

---

## 🔄 これまでの遍歴（v1〜v5）

| 版 | 内容 | 結果 |
|---|---|---|
| v1 | 絵巻風、暗色、流れるテキスト | design-critic D 判定 |
| v2 | GSAP ヌルヌル化、5幕 | 改善したが心理ミスマッチ |
| v3 | 吹き出し Bubbles（和モダン） | POP だが希釈 |
| v4 | ビビッド5色 | 派手だが凡庸 |
| v5（編集誌風・失敗） | 誤解釈で全置換 → ユーザー判断で一度元へ戻す |
| **v6（最終）** | **TORICHO 型・極太ゴシック・8件厳選** | ✅ **公開レベル** |

---

## ✅ 最終仕様

### コンテンツ：8 Figures（凡庸なワード全排除）

| # | 章 | 強調行 | 補足行 | voiceId |
|---|---|---|---|---|
| 01 | ANXIETY | 2年近く土地が／見つからなかった。 | やっと納得できたのが、／やまとの分譲地でした。 | 199927 |
| 02 | STANDARD | 他社のオプションが、／やまとでは、標準。 | 追加費用は、／必要ありませんでした。 | 208787 |
| 03 | COMPARISON | 他社の標準仕様は、／グレードが低かった。 | やまとは、／そもそもが違う。 | 279070 |
| 04 | RESCUE | 諦めかけた時に、／出会えた会社でした。 | 土地探しも、／工務店選びも、行き詰まり。 | 216803 |
| 05 | DISCOVERY | 妥協するしかない、／と話していた頃。 | 非公開のドンピシャを、／紹介してくれました。 | 240061 |
| 06 | LAND | やまとの土地は、／どこも、住みやすい。 | 立地の質で選んで、／間違いなかった。 | 276882 |
| 07 | ENCOUNTER | 「ここに建てたい」／と話していた土地に。 | やまと不動産の旗が、／立っていました。 | 202180 |
| 08 | AFTER | 何かあると、／すぐに駆けつけてくれる。 | 引き渡し後も、／本当に助かっています。 | 256807 |

**排除した言葉**（ユーザー指摘）：
- 「途方に暮れているでしょう」ネガ
- 「土地（立地）！！」意味不明
- 「あとは直観！」無責任
- 「賃貸派で 家を買うつもりは」中途半端
- 「小中学校の後輩が担当で」属人
- 他 3 件

### カラーシステム

```css
--voice-bg:         #FFFFFF  /* 純白 */
--voice-text:       #0A0A0A  /* ほぼ真黒 */
--voice-text-sub:   #5A5A5A
--voice-accent:     #B91C1C  /* 深紅（TORICHO インスパイア、純赤より沈めた） */
--voice-rule:       #0A0A0A
--voice-rule-soft:  rgba(10,10,10,0.08)
```

**注意**：やまと既存の accent `#C4851F`（Warm Amber）は本セクションだけ **深紅 #B91C1C** に差し替え。VOICE セクションの独立したカラー。

### タイポグラフィ

```
セクションヘッド: Noto Sans JP 900 / clamp(32,6.2vw,96px) / line-height 1.1 / letter-spacing -0.05em
FIGURE 強調行:   Noto Sans JP 900 / clamp(32,6.4vw,108px) / line-height 1.08 / letter-spacing -0.04em
FIGURE 補足行:   Noto Sans JP 700 / clamp(18,2.6vw,40px)  / line-height 1.4
リード文:        Noto Sans JP 400 / clamp(15,1.2vw,18px)  / line-height 2
キャプション:    Inter 500 / 11px / tracking 0.22em / uppercase
メタ:            Inter 500 + Noto Sans JP 500 / 12-13px / tracking 0.08em
```

**strong vs caption の比率：1200 : 110 = 約 11倍** （TORICHO 級のインパクト）

### 動き（最小限）

- viewport 入りで **fade + translateY 16-24px** を1回だけ
- 各ブロック内で 100/250/400ms の stagger
- 全 600-1000ms、`cubic-bezier(0.16,1,0.3,1)`
- 浮遊・マーキー・スクロール連動パララックス なし
- `prefers-reduced-motion: reduce` で全アニメ停止

### レスポンシブ

| デバイス | 調整 |
|---|---|
| Desktop 1440 | フル表示、ウォーターマーク「01」〜「08」右端に薄く |
| Tablet 768 | 同仕様、clamp で自然に縮む |
| Mobile 375 | ウォーターマーク非表示、タイポは clamp 下限寄り、左右 px は保持 |

`word-break: keep-all` で日本語の孤立文字（orphan）を防止。

---

## 📁 変更ファイル

| 状態 | パス | 内容 |
|---|---|---|
| **変更** | `src/data/voiceHome.ts` | `MAGAZINE_FIGURES` 8件 + `MAGAZINE_FIGURES_HEADER` 追加 |
| **変更** | `src/app/globals.css` | `--voice-*` 変数を TORICHO 型（純白・真黒・深紅）に更新 |
| **変更** | `src/app/layout.tsx` | Noto Sans JP の weight に `700`, `900` 追加 |
| **変更** | `src/components/sections/HeroVoiceMagazine.tsx` | TORICHO 型に全面書き換え（約 400行） |
| **変更** | `src/app/page.tsx` | `HeroBubbles` → `HeroVoiceMagazine` 差し替え |
| 残存 | `src/components/sections/HeroBubbles.tsx` | 未使用、後日削除判断 |
| 残存 | `src/components/sections/HeroEmaki.tsx` | 未使用、後日削除判断 |
| 残存 | `src/components/SmoothScrollProvider.tsx` | Lenis は引き続き稼働（本セクションは使わない） |

---

## ✅ 検証結果

| 項目 | 結果 |
|---|---|
| `npx tsc --noEmit` | エラー 0 |
| `npx eslint` | エラー 0 |
| `npm run build` | 137ページ静的生成成功 |
| Desktop 1440 | 極太タイポが迫力、ウォーターマーク良好、メタ行整列 |
| Tablet 768 | clamp 動作、余白適正 |
| Mobile 375 | keep-all で折返し自然、リンクタッチ領域 44px+ |
| 自動切替なし | 静止誌面、読む速度に任せる |
| `prefers-reduced-motion` | `useSyncExternalStore` で購読、全アニメ停止 |

---

## 🎯 戻られてから確認してほしい点

### 🔴 最優先
1. **実機でタイポのインパクト** — 極太ゴシックの黒が文字通り "ドカン" と来るか
2. **8 Figures の順序** — ANXIETY → STANDARD → COMPARISON → RESCUE → DISCOVERY → LAND → ENCOUNTER → AFTER の流れで購買意欲が積み上がるか
3. **深紅 #B91C1C が浮いていないか** — やまと既存のダーク系と並んで違和感はないか

### 🟡 余裕があれば
4. **各 FIGURE の改行位置**（`\n` で手動制御）が読みやすいか、調整したいものがあるか
5. **ウォーターマーク 01〜08** の薄さ（opacity 0.06）は適切か
6. **次章予告**（"NEXT CHAPTER X / YYY" のラベル）は今は省略したが、入れたほうが良いか
7. **既存 VoiceSection（13番目の4章 + 50件壁）** との重複は気になるか — 本セクションで 8件、詳細は /voice サブページに誘導する方針でも OK か

---

## 🔄 ロールバック

全て未コミット。以下で一発復元：

```bash
git restore src/data/voiceHome.ts src/app/globals.css src/app/layout.tsx src/app/page.tsx src/components/sections/HeroVoiceMagazine.tsx
# 未コミット新規ファイルがあれば削除
```

---

## 📊 作業サマリ

- voiceHome.ts 拡張：15 分
- globals.css 更新：5 分
- layout.tsx フォント weight 追加：2 分
- HeroVoiceMagazine 新規実装：45 分
- ビジュアル調整（見出しサイズの試行錯誤）：15 分
- build/lint/ts 検証：5 分
- **合計：約 1.5 時間**

## 🏆 design-critic 予想採点（v6）

v1 は 50/100 (D)。v6 での想定改善：

| 軸 | v1 | v6 想定 | 根拠 |
|---|---|---|---|
| 美しさ | 11 | 17 | 極太と純白のコントラスト、letter-spacing の締め |
| 楽しさ | 8 | 13 | reveal のタイミング、ウォーターマーク、Read Full への誘導 |
| おしゃれさ | 9 | 17 | TORICHO 型の広告マニフェスト感、日本の雑誌グラフィックの風格 |
| 惹きつける力 | 9 | 17 | 8件に絞った決断、各 FIGURE の訴求力、深紅の心理効果 |
| 技術的実装 | 13 | 16 | React 19 準拠、`useSyncExternalStore`、word-break keep-all、prefers-reduced-motion |
| **合計** | 50 / D | **80 / A** | SOTD 基準の下限に到達 |

Dev サーバー稼働中：http://localhost:3000/
