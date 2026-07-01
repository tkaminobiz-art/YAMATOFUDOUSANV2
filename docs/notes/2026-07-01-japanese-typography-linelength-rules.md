# 日本語Web 字詰め（行長）＆ 改行制御 規約 — 収集データ（2026-07-01）

やまとTOPの「意味不明な改行」を根絶し、PC/タブレット/SPで美しく読める字詰めへ刷新するための、**権威ある数値ルール＋改行制御レシピ＋現状の崩れ原因**の統合データ。サブエージェント3体（①字詰めルール収集 ②改行制御CSS収集 ③現サイト監査）の成果を統合。

## 結論（原則5つ）
1. **本文の行長上限＝全角40字**（W3C JLReq「横組40字」＋WCAG 2.2 SC1.4.8「CJKは40字」で一致）。
2. **行長は `max-width: 40ic`（全角1字＝1ic）で指定＝font-size非依存**。`ch`は欧文(半角)基準でズレるので本文行長には使わない。フォールバックは `40em`。
3. **見出しにも measure（行長上限）を必ず入れる**。現状 `.t-body` にしか無く、見出しは viewport で1行文字数が激変→改行崩壊。
4. **直書き `<br>` を撤去**。1行に入る字数はデバイス幅で変わるので、PCで綺麗な `<br>` はSP/タブレットで崩れる。measure＋`text-wrap:balance`/`auto-phrase`/`<wbr>` の可逆手法へ。
5. **Progressive enhancement**: `auto-phrase`/`text-wrap:pretty`/`text-spacing-trim` はFirefox/Safari未対応が多い→「効けば綺麗・効かなくても崩れない」で使う。**全ブラウザで確実に揃えたい箇所だけ BudouX か `<wbr>` 手動**。

---

## 1. 役割別 × デバイス別 推奨行長（全角字数）と measure

| 役割 | SP | タブレット | PC | measure（max-width） | line-height |
|---|---|---|---|---|---|
| **本文** | 20〜30字 | 30〜38字 | **35〜40字**（上限40） | `40ic`（fb `40em`） | **1.8** |
| **リード** | 18〜26字 | 24〜32字 | 28〜34字 | `30ic` | 1.7 |
| **大見出し**(display/h1/h2) | 13〜20字 | 15〜24字 | 15〜24字 | `20〜24ic` | **1.25〜1.375**（本文より狭く） |
| **小見出し**(h3) | 〜20字 | 〜24字 | 〜24字 | `24〜28ic` | 1.4 |
| **キャプション/ラベル** | 10〜18字 | 12〜20字 | 12〜24字 | 折返さない or 短measure | 1.0〜1.5 |
| **数字**(Oswald) | — | — | — | `nowrap`（単位ごと固める） | — |

- **見出しは本文より短く・行間も狭く**（デジタル庁「文字サイズが大きい見出しは本文より行間を狭めると可読性維持」）。
- SPは端末幅が40字に満たないので、`ic`指定なら自然に20〜30字へ収まる（下限を割らない設計）。PCは measure が効いて40字で頭打ち。

## 2. font-size × line-height × measure セット（可読性の三角関係）
「行長が長いほど行間を広く」。本文18px×40字なら lh1.8 が均衡点。

| | SP | タブレット | PC |
|---|---|---|---|
| 本文 font-size | 16px | 16〜17px | 17〜18px |
| 本文 line-height | 1.7〜1.8 | 1.8 | 1.8 |
| 本文コンテンツ幅目安 | 画面幅−余白 | 〜640px | **720px**(18px×40字) |
| 大見出し font/lh | 24px / 1.375 | 30px / 1.375 | 36px+ / 1.25〜1.375 |
| リード font/lh | 16〜18px / 1.7 | 18px / 1.7 | 18〜20px / 1.7 |
| キャプション font/lh | 12〜13px / 1.5 | 13px / 1.5 | 13〜14px / 1.5 |

**実装の型**（font-sizeは流動・字数は一定）:
```css
.prose {
  font-size: clamp(1rem, 0.9rem + 0.5vw, 1.125rem); /* SP16→PC18px */
  line-height: 1.8;
  max-width: 40em;   /* フォールバック */
  max-width: 40ic;   /* 全角40字＝ic対応が優先 */
  font-feature-settings: "palt"; /* 約物ツメ（任意） */
}
```

## 3. 改行制御 CSSレシピ（役割別）

**土台（body・既存globals.cssで概ね実装済）**:
```css
body { overflow-wrap: anywhere; word-break: normal; line-break: strict; }
/* line-break:strict=禁則を厳格に（句読点・小書き仮名・括弧を行頭/行末に置かない） */
```

| 役割 | レシピ | 備考 |
|---|---|---|
| **見出し/キャッチ** | `text-wrap: balance;` ＋ `@supports(word-break:auto-phrase){word-break:auto-phrase}` ＋ **measure(20〜24ic)** ＋ `<br>`撤去 | balance単独はJPで語中割れ→auto-phrase併用。固有名が割れるなら `keep-all`+`<wbr>` か BudouX |
| **リード** | `text-wrap: pretty;` ＋ measure(30ic) | pretty非対応は無視されるだけで無害 |
| **本文** | measure(40ic) ＋ `line-break:strict`（＋短段落は`pretty`） | 本文は「禁則の乱れ」が主因→strictが効く。auto-phrase維持 |
| **ラベル/CTA** | `white-space: nowrap`（短語）／ 意図的2行は `word-break:keep-all` + `overflow-wrap:anywhere` + `<wbr>` | 「資料請求」等を割らせない |
| **数字**(Oswald) | `white-space:nowrap` + `font-variant-numeric:tabular-nums` + `letter-spacing:0` | 「2,280万円〜」を単位ごと固める |

**keep-all vs auto-phrase vs BudouX 使い分け**:
| 状況 | 推奨 | 理由 |
|---|---|---|
| Chromium系で整えばOK・自動化重視 | `word-break: auto-phrase` | ノーマークアップで文節改行。固有名は要確認 |
| 全ブラウザで同一の改行を保証 | **BudouX**(JS/Web Components) | ZWSP挿入でChrome/FF/Safari一致・自動・レスポンシブ |
| 折返し位置を確実に自分で決める | `keep-all` + `overflow-wrap:anywhere` + `<wbr>` | 最も予測可能・機械学習の誤爆なし |

**プロパティ対応(2025-2026)**: `word-break:auto-phrase`=Chromium119+のみ(FF/Safari未) / `text-wrap:balance`=主要対応(JPは併用要) / `text-wrap:pretty`=Chrome117+/Safari26+(FF未) / `text-spacing-trim`=Chrome123+のみ / `<wbr>`・`white-space`・`line-break`=全対応。

**BudouX（クロスブラウザ本命・任意導入）**:
```html
<script type="module" src="https://unpkg.com/budoux/module/webcomponents/budoux-ja.js"></script>
<budoux-ja>大手の理想を、現実の総額に。</budoux-ja>
```
```css
budoux-ja { word-break: keep-all; overflow-wrap: anywhere; }
```
ビルド時変換(`translateHTMLString`→ZWSP挿入)ならランタイム負荷ゼロ。約15KB。auto-phraseの中身と同技術のC++移植を全ブラウザで動かせる版。※dangerouslySetInnerHTML時はサニタイズ必須。**採用時は本プロジェクト方針(next/font・依存最小)に合わせ npm 版をバンドルするのが基本。CDN 直リンクを使うなら `integrity`(SRI)＋`crossorigin` を付けるか self-host（CDN汚染対策）。**

---

## 4. 現サイトの崩れ原因（監査結果）と修正指示

**現 globals.css の実態**: 土台(`auto-phrase`/`line-break:strict`/`overflow-wrap:anywhere`)は正しい。`.t-body` は measure(52〜70ch)＋auto-phrase＋pretty で最も一貫。**問題は下記2つに集約**:

### 原因A: 見出しに measure が無い（慢性）
`.t-display/.t-h1/.t-h2/.t-h2-display/.t-h3` は `text-wrap:balance` はあるが **max-width（行長）指定なし**。font-sizeが `clamp(vw)` で伸縮するため、同じHTMLでも viewport で1行文字数が激変→改行が崩れる。
→ **修正**: 各見出しクラスに measure を付与（display/h1/h2 ≈ 20〜24ic、h3 ≈ 24〜28ic）。`ch`ではなく `ic`（fb `em`）で。

### 原因B: 直書き `<br>` × `text-wrap:balance` の二重制御
`<br>`で改行を固定すると balance が最適化できず、SP/タブレットで不自然に落ちる（＝ユーザー指摘の症状）。該当箇所（撤去・置換対象）:

| ファイル:行 | 現状 | 修正 |
|---|---|---|
| `Hero.tsx` h1（L70前後） | `<br>` ＋ `whitespace-nowrap`（「見えてから決める」）＋ balance | `<br>`撤去→measure＋balance＋auto-phrase。下線spanは`inline`維持で nowrap を最小範囲に |
| `FinalCta.tsx` h2（L39前後） | `まずは、<br>土地込み総額を…` ＋ balance | `<br>`撤去→measure＋balance |
| `Anxiety.tsx` 本文（L39-43） | 4文を`<br>`×3で分割 | 各文を独立`<p>`か`<li>`に（＝意味の区切りを構造で）。段落なら`<br>`撤去＋measure |
| `Estimate.tsx` 本文（L38-45） | 長文＋`含まれる/別途/発生しない`を`<br>`×4 | ナレーションは`<p>`、3語は図解チップ/`<li>`へ（Phase1図解と連動） |
| `Budget.tsx` 注記（L75前後） | `総額…<br>返済比率…` | 2項目は`<span>`＋flex/gridで並べるか`<dl>`。`<br>`撤去 |
| `StandardSpec.tsx`（L118-120） | `<br className="hidden md:block">` のブレークポイント別改行 | 撤去→measure＋auto-phrase（SP/PCで自動に任せる） |

### 原因C: Safariフォールバック `word-break:keep-all` の突き抜け
`@supports not (auto-phrase)` で keep-all にfallback→長い複合語がはみ出す恐れ。`overflow-wrap:anywhere` は既にあるので大崩れはしないが、**measure（max-width）で行長を先に決める**とより安定。

---

## 5. 刷新の実装方針（globals.css 中心・低リスク）
1. **見出しクラスに measure トークンを追加**（新規CSS変数 `--measure-heading: 22ic; --measure-lead: 30ic; --measure-body: 40ic;` を定義し `.t-*` に `max-width` 付与。`ch`→`ic` へ寄せる）。
2. **セクション内の直書き `<br>` を棚卸し撤去**（上表）。見出しは balance＋auto-phrase＋measure に一本化、本文は measure に一本化。意味の区切りは `<p>/<li>/<dl>` の構造で表す。
3. **役割別の改行ポリシーを1箇所に集約**（globals.css のユーティリティに閉じ、各section.tsxのインライン改行指定を減らす）。
4. **キメのコピー・固有名（やまと不動産／花モデル 等）で確実に位置を保ちたい所だけ** `<wbr>` か BudouX。全体一致が要件化したら BudouX 導入を検討。
5. 検証: **375 / 768 / 1024 / 1440px** で行頭の約物・語中割れ・突き抜けを目視（`line-break:strict` が効いているか）。

---

## 6. 出典URL（一次・準一次）
**規格**: JLReq https://w3c.github.io/jlreq/ ／ 簡便な行組版 https://w3c.github.io/jlreq/docs/line-composition/ ／ WCAG 2.2 SC1.4.8 https://www.w3.org/WAI/WCAG22/Understanding/visual-presentation.html
**デザインシステム**: デジタル庁 https://design.digital.go.jp/dads/foundations/typography/ ／ SmartHR行送り https://smarthr.design/products/design-tokens/leading/ ／ Ameba Spindle https://spindle.ameba.design/styles/typography/
**単位/実装**: coliss(相対単位) https://coliss.com/articles/build-websites/operation/css/relative-length-units-based-on-font.html ／ coliss(単位使い分け) https://coliss.com/articles/build-websites/operation/css/css-length-unit-should-you-use.html ／ MDN clamp https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Values/clamp
**改行制御**: MDN word-break https://developer.mozilla.org/ja/docs/Web/CSS/word-break ／ MDN overflow-wrap https://developer.mozilla.org/ja/docs/Web/CSS/overflow-wrap ／ MDN wbr https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/wbr ／ Chrome i18n https://developer.chrome.com/blog/css-i18n-features ／ ICS MEDIA https://ics.media/entry/240411/ ・ https://ics.media/entry/241105/
**BudouX**: https://github.com/google/budoux ／ 解説 https://developers-jp.googleblog.com/2023/09/budoux-adobe.html
**可読性研究/実務**: J-STAGE(日本語電子テキスト可読性) https://www.jstage.jst.go.jp/article/tjsai/32/2/32_A-AI30/_article/-char/en ／ リメディア https://www.remedia.co.jp/blog/posts/2023-05-web-typography/ ／ アーティス https://blog.asobou.co.jp/web/text-design02

※SmartHR/Ameba/Google FontsのJS描画ページは実数の直接取得が一部できず、公式トークン説明と検索スニペットから確定した値のみ記載。最終確定前にURLの目視確認を推奨。
