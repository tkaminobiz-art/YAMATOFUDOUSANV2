この依頼は、6次元の設計成果を1枚の「単一フレームワーク文書」に統合し、markdownのみを出力するシンセサイズ作業です。十分な入力が揃っているので、追加調査は不要と判断します。正本の出典分離(BPLAN中心概念 vs BRAND-TRUTH §6)など、検証で挙がったblocker/major是正点を本文に織り込んで執筆します。

# やまと不動産 TOPリブート — 単一フレームワーク文書（実装青写真 v1）

版: 2026-06-25 / 対象: `src/app/b-plan-v2/page.tsx`（明朝・静寂回帰の現実装＝リブート対象）
統合元: IA・デザインシステム・モーション・心理・コピー・RWD/A11y の6次元設計＋各検証是正＋Reference Scout（xmobile実機監査）
正本: `BRAND-TRUTH.md` / `docs/notes/2026-06-10-bplan-diagnosis.md` / `docs/project-context/*`。**数値・コピー・色・CTAが本書と食い違ったら正本が勝つ。**

---

## 0. エグゼクティブサマリ＆一文原理

### 0.1 このリブートの一文原理

> **「明朝の静寂で読ませる建築誌」をやめ、「ゴシックの潔さで選ばせるカタログ」へ。確定資産（シナリオ・コピー・データ・CTA階層・専務8原則・構成理想形）は一字も変えず、表現層（タイポ・色・モーション・写真トーン）だけをゼロベースで載せ替える。**

### 0.2 専務文法への回帰（迷子の核心への処方）

6/10診断が断定した「迷子の核心」は、画風（明朝・静寂・建築誌エディトリアル）が**専務承認文法と不一致**であること。本リブートはこの4軸を反転させる。

| 旧（迷子の磁場） | 新（専務承認文法へ回帰） |
|---|---|
| 明朝・静寂・読ませる | **ゴシック太角・潔い・選ばせる** |
| 数字を本文に散らす | **数字バーン1発主役級**（局在・二度打ち禁止） |
| エディトリアル（情緒で語る） | **カタログ**（選択肢を並べて選ばせる） |
| 装飾過多・AI生成感 | **権威の面・黒白リズム・断定的配置** |

xmobile監査が示した最重要の事実: 参照元LPは**元からゴシック運用**（Noto Sans JP + Outfit、明朝なし）。やまとの「明朝→ゴシック転換」は新発明ではなく、**専務がTOPで既に承認済みの `/money` 文法（和文ゴシック+Oswald数字バーン、`.money-burn-display` が実証プロトタイプ）を全TOPへ横展開する**こと。

### 0.3 是正済みの検証blocker/major（本書はこれらを解消済み）

| 是正項目 | 本書での解消箇所 |
|---|---|
| **蛍光禁止**（xmobile `#8DF701`/水色 `#2bb9e1` のSaaSトラップ） | §3.3 色リズム（lime/deep-green/sign-redへ翻訳・水色は捨てる）/ §4 モーション憲法5 |
| **canonical数値厳守**（600/150/50/14/1,000・150 vs 76の包含） | §2 証拠ラダー / §3.4 巨大数字配置 / §6.3 |
| **専務8原則**（バーン1発・二度打ち禁止・投資哲学温存・FV物件NG・声編集しない・平等） | §2 / §5 / §6 全体 / §9 計測ゲート |
| **コピー憲法**（「安い」否定→無駄フレーム・過剰断定禁止・感情断定禁止・canonical標準語） | §6 全体 |
| **0ベース禁止**（確定コピー不変・新機能は要承認フラグ） | §0.1 / §2 S01注記 / §5.1 S8-S9 / §6.1 |
| **BRAND-TRUTH正本の出典分離・更新ゲート**（§6 Heroコピー vs BPLAN中心概念、§1 Typography） | §0.4 / §6.2 / §8 BRAND-TRUTH更新差分 |

### 0.4 最重要ゲート：正本との関係（実装着手前に必読）

本書は**設計提案**であり、以下2点は **BRAND-TRUTH更新＋AD/専務承認を経るまで確定ではない**。実装者は本書の記述を「確定」と誤読してはならない。

- **ゲートA（タイポ）**: 主見出しのゴシック転換は **BRAND-TRUTH §1 Typography を Mincho→Gothic へ正式更新し、神野さん承認を得るまで着手不可**。それまで主見出しは現canonical（Zen Old Mincho）を継続。
- **ゲートB（Heroコピー）**: FV確定コピーの正本は **BRAND-TRUTH §6**（h1「奈良・京都南部で、土地から考える家づくり。」/ lead「京モデル 2,280万円〜。」/ sub「土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。」）。BPLAN中心概念「大手の理想を、現実の総額に。」はFV採用するなら**先に §6 を更新してから**。本書で中心概念をHeroに置く案は「§6更新を前提とした提案」であり、§6の確定文字列を勝手に上書きしない。

---

## 1. 設計原則

### 1.1 xmobileから移植する7原則（順序骨格と視覚グラマー）

xmobile監査の「移植できる骨格＝最大の資産」。**順序は流用、色は必ず翻訳**。

1. **証拠ラダーの順序骨格**（数字奪取→共感→規模→逆転→クライマックス→裏取り→商品→事例→緊急→FAQ→最終CTA）。やまとは「勢い→加盟」を「誠実→総額が見える→誇れる→相談」に**内容置換するだけ**で順序はそのまま使う。
2. **黒地CTAマスター ↔ 白地記事化本文の交互リズム**。白の長文が広告感を薄め、黒（ink）が主張を灼く。
3. **巨大数字を実績セクションに局在**（本文に散らさない）。xmobile実機は s08(127px)/s09(100px) に局在。
4. **反復CTAブロック**（xmobile `contact_section`×4）を各納得段階直後に。やまとは煽り回避で**3点＋最終1**に節度化。
5. **CTA直前に摩擦除去マイクロコピー常設**（xmobile「完全無料！勧誘なし！」→ やまと版へ翻訳）。
6. **写真マーキー**（規模感・安心）。xmobile実機=Swiper `speed:50000`(≈50s)。やまとは**純CSS・30–42s**で「規模感はあるが読める」速度へ翻訳、reduced-motion対応必須。
7. **巨大数字＋本文はSPで分離・段階ダウンスケール**（PCの一体構図を単純縮小しない）。

### 1.2 やってはいけない7（一発失格リスト）

1. **蛍光green/青/水色を使う**（`#8DF701`/`#2bb9e1` をそのまま輸入）。「Apple/SaaSサイトに置けてしまう」なら失格。最大の罠。
2. **同じ数字を二度打ちする**（FV実績レール＋Trustレールで600/14を連発）。専務原則3違反。
3. **FV主役に完成物件写真を出す**（専務原則1）。Hero主役は数字/タイポ/編集構図。
4. **確定コピーを「賢く言い換える」**（「お客様の声」→「決めた人の話」等）。0ベース禁止資産の無自覚な作り変え。
5. **感情を勝手に断定する**（「こわくない」「悩まないで」）。憲法E。やまとの動詞「ご一緒に整えます/お見せします」へ。
6. **過剰断定する**（「絶対」「一切ない」「動きません」「大手は」）。憲法D。例外は地盤改良費「一切かかりません」/つなぎ融資「原則発生しない」のみ。
7. **明朝・Fraunces italic・縦書き長文をTOP主見出しに出す**（静寂エディトリアル磁場の発生源＝迷子の核心）。明朝は撤去 or 縦書き情緒アクセント1点に局所限定。

---

## 2. セクション証拠ラダー構成（確定13本 / SP12本以内）

証拠ラダー段＝「読者がいま信じてよい度合い」を1（疑い）→7（決断）で示す。**クライマックス＝S05（黒地・総額/月々の解放）**。心理タイプ: T1見積もり落差 / T2ブランド憧れ / T3ローン不安 / T4土地迷子 / T5妥協回避。

| # | セクション（役割） | 段 | 主担当タイプ | 説得軸 | 主役要素 | xmobileグラマー | 背景/明度 | CTA | 下層逃がし |
|---|---|---|---|---|---|---|---|---|---|
| **S01** | Hero｜状況提示＋中心概念 | 1 | 全（特にT4） | 中心概念の提示 | 巨大タイポh1＋編集構図。物件写真は背景帯のみ（専務①）。数字は**京2,280の1発のみ**（実績4数字レールは置かない） | s01 Hero型。バーンはS03へ譲る | ink地（動画overlay） | **最大2**: P=LINEで相談※／S=土地から相談 | — |
| **S02** | 敵＝不透明な総額｜共感 | 1 | T1/T3/T4 | 敵の名指し（競合でなく後出し費用・建物価格だけの判断） | 5タイプを読者の状況語で。疑問形/感情断定NG | s02を反転＝便益でなく敵を3–5列。sign-red点投入 | base温白（記事化・休止） | なし | — |
| **[CTA-1]** | 反復CTAマスター | — | 全 | 低摩擦の早期出口 | 摩擦除去マイクロコピー常設 | contact_section黒地型 | ink地 | LINEで相談※（主1副1） | — |
| **S03** | 権威バーン｜数字1発主役級 | 2 | T2 | 会社の体力・規模 | **引渡し600棟以上**を画面占有の巨大数字で1発。14年/1,000件/50組は小さく従える | **s08巨大実績127px型の唯一の発火点**。Oswald超大型 | ivory or ink地に巨大Oswald | 反復CTA1本 | 代表2名→`/staff`（完全同格） |
| **S04** | やまとの逆転（前段）｜建物だけ思考からの転換 | 3 | T1/T3 | ③土地込み総額を先に（宣言） | 「建物価格だけ」vs「土地込み総額」の対比1枚。短い橋渡し（1スクリーン以内） | 白地記事化（黒地頂点への明度コントラスト準備） | base白 | なし（S05へ流す） | — |
| **S05** | ★総額・月々｜クライマックス | **頂点** | T3/T1/T5 | ③本体（数字→月々の意味へ翻訳） | 土地込み総額＋月々。Case月々をOswald巨大カウントアップ。**投資哲学エッセンス常設枠**（資産として残る/低金利・長期借入を賢く＝専務④。NISA直接比喩は避ける）。試算注記必須 | **s06診断・黒地マスター型を頂点に**。deep-green結論帯で「月々◯円」を視線停止点に | **ink黒地（主張の最高潮）** | 反復CTA: LINEで土地込み総額を出す▲ | 詳細試算→`/money#payment-examples` |
| **S06** | 価格メカニズム3事実｜なぜこの総額か | 4 | T1/T5 | ②なぜできるか（抽象化禁止） | ①自社分譲地モデルハウス二重利用（最大の差別化）②自社一貫体制・中間マージンなし③広告費必要最小限。つなぎ融資「原則発生しない」/地盤改良費「一切かかりません」断定。内訳%は出さない | s05比較＋s07経済証明。**他社=sign-red/やまと=deep-green** | ink地（主張） | なし | 費用全リスト→`/money#costs` / 標準仕様→`/standard` |
| **S07** | ★土地から始める｜土地迷子専用（新設） | 4 | **T4** | ③土地側（常時150区画程度） | 「土地探しで家づくりを止めない」。自社分譲地の構造優位＋地図UI（専務②他府県） | 写真マーキー（分譲地の規模感・reduced-motion対応） | base+lime overlay（旧セージ翻訳） | **未公開土地LINE**（12-rate動線3の核）※▲ | 全区画→`/lots`（**常時150区画程度＝会社全体の常時保有数。矢田町76区画は個別分譲地の一例**） |
| **S08** | 商品ライン｜花→風→京（カタログの潔さ） | 5 | T2/T5 | ①大手と同品質の素材・装備 | 3モデルcover card。**順序固定 花→風→京**。花=「いちばん選ばれています」バッジ・価格lime強調 / 京=entry役・white・lime tintなし（廉価版表現禁止） | カタログの潔さ＝均等3カードでなく花にバッジで非対称。表記`KYO`（MIYAKO禁止） | ivory白 | 各カードに静かなtertiary | 全17項目→`/money` / 各product |
| **S09** | 物語事例｜Before→葛藤→決め手→After（新設・物語化） | 6 | 全（特T5/T3） | tension付き事例（rulebook Rule4） | 1〜2組を**物語として深く**（数より質＝専務⑧）。顔と名前（信頼最大失点の是正）。声は編集しない（専務⑦・原文尊重） | s04声型＋写真マーキー。白地記事化で感情の余韻 | ivory白 | なし（感情ピークは読ませる） | 声50組以上→`/voice` / 施工事例→`/works` |
| **S10** | 後から増えない｜要確認費用（FAQ戦場・前半） | 6 | T1/T3 | 最大の恐怖を先回り（rulebook Rule5） | 契約前に同じ表で確認する費用一覧。**不都合開示を注記→主役級へ格上げ**（信頼の鍵） | s10不安解消型。sign-red-softで警告面 | base白 | なし | 詳細→`/money#costs` |
| **S11** | FAQ｜営業の戦場 | 6 | 全 | 残存疑念の除去 | 5問（送信後の流れ・営業頻度の開示）。最重要1問は初期open | s10 FAQアコーディオン（icon_q/icon_a型） | base白 | なし | 10問以上→`/faq` |
| **S12** | CTA階段｜最終 | 7 | 全 | 最低摩擦の次の一歩 | **2段が現実解**（LINE→見学）。フォームはtertiary text-link。送信後の流れ明示 | contact_section_end型・離脱リンク抑制 | **ink黒地（決断マスター）** | P=LINE▲ / S=モデルハウスを見学 / T=資料請求 / 電話(footer) | `/reserve` `/contact` |

注: ※=canonical「LINEで相談」（BRAND-TRUTH §5）。▲=「土地込み総額を出す」系は**新規ラベル提案候補（要copywriter＋専務確認＋natural-japanese検査＋BRAND-TRUTH §5追記後に採用）**。default は canonical「LINEで相談」。

### 2.1 SP（モバイル）表示12セクション以内

SP上限12。13本中、**S04をS05に視覚統合**（逆転宣言を黒地クライマックスの導入ブロックとして吸収）し12本に収める。+ floating固定CTAバーを全SP共通で常設（§7.3）。

### 2.2 xmobile 11段 → やまと13本 対応（順序骨格の流用）

数字奪取(S01)→写真→問題単純化(S02)→便益→事例(S09へ後送)→比較(S06)→診断・黒地頂点(**S05**)→経済証明(S06)→巨大実績クレッシェンド(**S03に集約**)→緊急/フロー/FAQ(S10/S11)→最終巨大CTA(S12)。**s08+s09の二度打ちはS03の1発に統合**（専務③）。

### 2.3 反復CTAブロックの配置規則（3点＋最終1）

| 反復点 | 位置 | 文言 | 摩擦除去マイクロコピー |
|---|---|---|---|
| ① | S03末（権威の直後） | LINEで相談 | 相談無料・しつこいご連絡はしません |
| ② | **S05末（クライマックス直後＝最強の発火点）** | LINEで土地込み総額を出す▲ | 予算未定OK・土地なしOK・約60分 |
| ③ | S12（最終CTA階段） | LINE→見学→フォーム | 子連れOK・オンライン可 |

S07の未公開土地LINEは「土地から相談」の別文脈CTAとして独立カウント（タイプ別受け皿のため許容）。

### 2.4 12-rate-gaps 3動線の受け皿（38%→55-66%）

- **動線1 GBP口コミ**: S09末・footer。★4.5×30件達成までTOP公開ブリッジ凍結（枠だけ用意、達成後解放）。
- **動線2 OB紹介**: S09末 or footer。控えめな入口。主役にしない。
- **動線3 未公開土地LINE**: **S07が主受け皿**（最優先実装）。専務①準拠でFV外。

### 2.5 現/b-plan-v2 → 新IA 移行表

| 現実装 | 新 | 変更 |
|---|---|---|
| Hero（明朝h1+Track Record 4指標） | S01 | Track Record撤去・第2CTA土地追加・ゴシック化（ゲートA後） |
| Trust（metric rail+代表2名） | S03へ統合 | 数字をS03集約（二度打ち解消）・代表2名は信頼アンカーとして残置/staffへ |
| VoiceProof（注釈断片5枚） | S09へ物語化 | 引用羅列→Before→After物語へ |
| Truth（本音スライダー5枚） | S02へ前倒し | 共感を2番目に |
| PaymentCases（月々カウントアップ3事例） | S05 | 位置維持・黒地化で頂点明確化・投資エッセンス枠追加 |
| Cost Logic（非対称比較・赤緑） | S06 | 維持・3事実明示 |
| Gallery（bento） | S08 | 商品カタログへ役割転換 |
| 要確認費用 | S10 | 維持 |
| 誇り（ink反転）+Action | S12 | CTA階段2段化 |
| （なし） | S04逆転宣言 / S07土地 / S11 FAQ | **新設** |

---

## 3. デザインシステム

**結論サマリー（迷ったらここ）**: 主見出し=Zen Kaku Gothic New 800–900（ゲートA後）/ 巨大数字=Oswald 600–700 tabular / 縦書き明朝=撤去 / 黒地=ink `#1D1D18`（純黒不採用）/ シグナル=lime証明・deep-green面・sign-redリスク / 数字バーン=1セクション1発・二度打ち禁止。

### 3.1 タイプ階層（書体方針と用途）

| 役割 | 書体 | ウェイト | 根拠 |
|---|---|---|---|
| 主見出し h1/h2 | **Zen Kaku Gothic New**（ゲートA後） | 800–900 | 太角ゴシック・カタログの潔さ。layout.tsxロード済 |
| 中見出しh3/リード | Zen Kaku Gothic New 700 / Murecho 500 | — | 階層は太さ+サイズで作る |
| 本文 | **Murecho** | 400 | line-height 1.85 / ls 0.025em（bplan確定値・いじらない） |
| 巨大数字バーン | **Oswald** | **600→700**（下記注） | condensed・confident・tabular。`.money-burn-display`で実証 |
| 欧文eyebrow/ラベル | **Inter** | 600 caps + tracking 0.18em | Outfitは不採用 |

**撤去（TOPでは使わない・下層/`/money`互換のためロードは残置）**: Zen Old Mincho・Shippori・Noto Serif（明朝全般）・Fraunces italic・縦書き長文。

**バーンweightの段階運用（検証是正）**: 実証済み `.money-burn-display` は **weight600 / clamp(64px,13vw,132px) / ls+0.005em / lh0.86**。本書の `.t-burn` はこれを基に **weight700・ls−0.01em・上限168px へ意図的に強化**（理由: より塊で灼きつかせる）。専務がTOPで承認した灼き味と微変するため、**初期採用は実証値（600/+0.005em/132px上限）**とし、700/−0.01em/168px は**専務確認後の強化案として段階提示**する。

### 3.2 タイプスケールCSS（:root + 適用クラス）

xmobile実機は固定px2段だが、やまとは**clamp流体を採用**（実機より進んだ処方であり「xmobile再現」ではないと明記）。

```css
:root {
  --ff-heading: var(--font-zen-kaku-new-var), "Zen Kaku Gothic New", "Hiragino Sans", "Yu Gothic", sans-serif;
  --ff-body:    var(--font-murecho-var), "Murecho", "Hiragino Sans", "Yu Gothic", sans-serif;
  --ff-burn:    var(--font-oswald-var), "Oswald", "Helvetica Neue", Arial, sans-serif;
  --ff-en:      var(--font-inter-var), "Inter", sans-serif;

  --type-burn:     clamp(64px, 13vw, 132px);  /* 初期=実証値。強化案168pxは専務確認後 */
  --type-burn-sub: clamp(20px, 2.4vw, 34px);
  --type-display:  clamp(34px, 5.2vw, 76px);
  --type-h2:       clamp(28px, 3.4vw, 50px);
  --type-h3:       clamp(20px, 1.9vw, 30px);
  --type-lead:     clamp(16px, 1.1vw, 20px);
  --type-body:     clamp(15px, 0.95vw, 17px);
  --type-small:    clamp(12px, 0.8vw, 14px);
  --type-eyebrow:  clamp(11px, 0.75vw, 13px);
}
.t-burn {
  font-family: var(--ff-burn); font-weight: 600;   /* 強化案は700 */
  font-size: var(--type-burn); line-height: 0.86; letter-spacing: 0.005em;
  font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1;
  white-space: nowrap; word-break: keep-all;
  display: inline-block; min-width: 3ch; contain: layout;  /* CLS予約。桁数で5ch等へ上書き */
}
.t-display { font-family: var(--ff-heading); font-weight: 900; font-size: var(--type-display); line-height: 1.18; letter-spacing: 0.01em; text-wrap: balance; }
.t-h2  { font-family: var(--ff-heading); font-weight: 800; font-size: var(--type-h2); line-height: 1.28; letter-spacing: 0.015em; text-wrap: balance; }
.t-h3  { font-family: var(--ff-heading); font-weight: 700; font-size: var(--type-h3); line-height: 1.42; letter-spacing: 0.02em; }
.t-body { font-family: var(--ff-body); font-weight: 400; font-size: var(--type-body); line-height: 1.85; letter-spacing: 0.025em; text-wrap: pretty; word-break: auto-phrase; }
.t-lead { font-family: var(--ff-body); font-weight: 500; font-size: var(--type-lead); line-height: 1.7; letter-spacing: 0.02em; text-wrap: pretty; }
.t-eyebrow { font-family: var(--ff-en); font-weight: 600; font-size: var(--type-eyebrow); line-height: 1.0; letter-spacing: 0.18em; text-transform: uppercase; }
```

### 3.3 色リズム / 明度ウェーブ表

**xmobile色 → やまと翻訳**: `#000`→ink `#1D1D18`（温黒。base憲法が温白`#F7F4EC`のため純黒は色温度が割れて冷たいSaaSに寄る。ink上のivoryコントラスト≈15.8:1でAAA）。`#e0eedd`セージ→base+lime overlay。**`#8DF701`蛍光緑→役割維持・色だけ落とす（lime証明 or sign-redリスクへ二分）。`#2bb9e1`水色→完全に捨てる**（青系=最大のSaaSトラップ）。

**シグナル役の厳格分離**:

| シグナル | 色 | 役割 | 面積 |
|---|---|---|---|
| lime | `#A9D159` | 証明・到達・肯定（花バッジ・達成数字の下線/8pxバンド・「いちばん選ばれています」） | 極小（点・面上の暗文字用） |
| deep-green | `#2F4A2C` | 面と主体性（主CTA見学・主声面・結論帯） | 中（面） |
| sign-red | `#E84336` | リスク・後出し費用・緊急・診断CTA | 極小（点） |
| LINE-green | `#06C755` | LINE CTAのみ（他用途禁止） | ボタンのみ |

**禁則**: limeとsign-redを同一視線範囲で競わせない（証明とリスクの意味が濁る）。lime・sign-redは**文字色に使わない**（lime面上は暗文字、赤文字が要るなら `sign-red-dark #8F211B`）。

**明度ウェーブ（暗→白→base→暗のリズム。暗面は希釈しないため4回限定）**:

| # | セクション | 背景トークン | 明度役割 | シグナル |
|---|---|---|---|---|
| S01 | Hero | **ink** | 暗・灼き | 数字=paper / lime下線 |
| S02 | 敵 | base | 明・休止 | sign-red点（後出し費用） |
| S03 | 権威バーン | ivory or ink | 規模 | バーン=ink/lime点 |
| S04 | 逆転前段 | base | 明・記事化 | — |
| S05 | 総額・月々 | **ink** | **暗・主張頂点** | deep-green結論帯 / LINE-green |
| S06 | メカニズム | ink | 暗・主張 | 他社=sign-red / やまと=deep-green |
| S07 | 土地 | base+lime overlay | 中・柔証明 | deep-green |
| S08 | 商品 | ivory | 白・カタログ | 花=lime tint / 価格=ink |
| S09 | 物語事例 | ivory | 白・物語 | 声面=deep-green |
| S10 | 要確認費用 | base | 明・記事化 | 最大恐怖=sign-red点 |
| S11 | FAQ | base | 明・機能 | sign-red点 |
| S12 | 最終CTA | **ink** | 暗・決断マスター | LINE-green / 診断sign-red |

### 3.4 巨大数字配置規則（証拠のクレッシェンド・二度打ち禁止）

専務③が最優先制約。**1セクション＝1主役級バーン**。同一数字を2セクションで主役バーンにしない（本文中の通常テキスト言及は可）。

| canonical値 | バーン配置（一意） | 買い手翻訳 |
|---|---|---|
| 引渡し600棟以上 | **S03 主役**（14/1,000/50は`--type-burn-sub`で従える） | 「600組のご家族の判断に立ち会ってきた」 |
| 自社分譲地150区画 | **S07 主役**（＝常時保有のストック数。現分譲中の76区画＝矢田町とは別概念。本文で「常時150区画程度を保有」と文脈明示し76と混同させない） | 土地迷子の受け皿 |
| 資金計画1,000件以上 | **S06のみ**（FinalCtaには置かない＝§3.4-S12は数字ゼロ） | 資金不安の実績 |
| 京2,280万円〜 | S01/FV lead | 現実の総額の入口 |
| 月々返済 | **S05 climaxバーン**（payment軸＝別軸なので600の二度打ちにならない） | 自分ごと化 |
| お客様の声50組以上 | S09副 | 物語の母数 |

**画面端bleed・CLS規則**: bleedは**ink暗面のS03/S06でのみ**許可（白面はbleedしない・上品さ優先）。bleed時のみ上限拡張可（理由コメント必須）。全バーンに `tabular-nums`、カンマも tabular で固定。CLS対策＝`nowrap`+`min-width`予約+`contain:layout`+`size-adjust`フォールバック。**Hero「2,280」とプラン価格2,480/2,280は役割分離**（Hero=総額の入口の象徴 / プラン=選択肢の比較）。同一価格数字を同一スケールで二度大型化しない。

**Heroバーンの注意（検証是正）**: 専務一押し・lime強調・「いちばん選ばれています」は**花2,480**。Heroバーンを京2,280にする場合、「安いから」でなく「土地込み総額がはじめに見える」フレーム（憲法A）であることをeyebrow/microで明示し、**花の主役性を侵さない**（プラン提示は花→風→京順・花バッジ厳守）。

### 3.5 :rootトークン（色・余白・モーション）

```css
:root {
  --ink:#1D1D18; --ink-soft:#2A2823; --base:#F7F4EC; --ivory:#FBF8EE; --paper:#FFFFFF; --border:#DED8C8;
  --text:#1D1D18; --text-muted:#5E5A50; --text-inv:#FBF8EE;
  --lime:#A9D159; --deep-green:#2F4A2C; --sign-red:#E84336; --sign-red-dark:#8F211B; --sign-red-soft:#FFF0EE;
  --gold:#9A7A3F; --line-green:#06C755;
  --base-tint: color-mix(in srgb, var(--lime) 8%, var(--base));  /* 旧セージ翻訳・新色追加せず */
  --space-xs:8px; --space-sm:16px; --space-md:24px; --space-lg:48px;
  --space-section:clamp(88px,8.4vw,144px); --space-section-tight:clamp(72px,7vw,120px); --gutter:clamp(20px,4vw,56px);
  --dur-fast:180ms; --dur-base:320ms; --dur-slow:620ms; --dur-burn:1100ms;
  --ease-out:cubic-bezier(0.22,1,0.36,1); --ease-burn:cubic-bezier(0.16,1,0.3,1);
}
.surface-ink{background:var(--ink);color:var(--text-inv)} .surface-base{background:var(--base);color:var(--text)}
.surface-ivory{background:var(--ivory);color:var(--text)} .surface-tint{background:var(--base-tint);color:var(--text)}
```

**既存実装との整合（検証是正）**: 現実装 P オブジェクトの `green:#195842 / red:#ea4b2a` は **BRAND-TRUTH §1トークン（#2F4A2C/#E84336）と不一致。正本は §1。** リブートで §1 へ統一し、その統一後hexでコントラスト実測する。既存 `--brand-*` はエイリアスとして残す（`--brand-text: var(--ink)` 等）。新トークン追加はコミットメッセージに明記（§8チェックリスト準拠）。

---

## 4. モーション＆インタラクション仕様

### 4.1 モーション憲法（5条）

1. **静的構図で成立（grey-box動的版）**: JS無効・reduced-motion・初回ペイントの全状態で、アニメ抜きでもレイアウト・読解・CTA到達が成立。canonical数値・確定コピーは**SSR HTMLに実数で入る**。
2. **叫ぶのは1〜2回**: 注意奪取（カウントアップ＝バーン演出）は**最大2箇所**（M4 TrustStripバーン600・M16 FinalCtaまたはS05月々）。それ以外は気づかれない到着reveal。
3. **transform/opacityのみ**（60fps/CLS=0）。レイアウト誘発プロパティのアニメ禁止。reveal前も場所確保（`display:none`からの出現禁止）。例外: 比較バーは `transform:scaleX(0→1)+transform-origin:left`（width直アニメ禁止）、FAQは `grid-template-rows`。
4. **reduced-motion完全対応**: 全アニメを最終状態で即表示。カウントアップ即target、マーキー停止（静止グリッド）。「劣化版」でなく「正規の到達状態」。
5. **SaaS蛍光トラップ禁止**: グロー・ネオン・パルス発光・蛍光トレイル一切なし。`#8DF701`は色・挙動とも輸入しない。移動量・到着・大きさで引く。

### 4.2 対象別モーション一覧

| # | 対象 | 挙動 | 移動量 | 時間 | イージング | 発火 | 叫ぶ? |
|---|---|---|---|---|---|---|---|
| M1 | Hero h1/lead | fade+translateY | Y+12→0 | 600ms | `(.16,1,.3,1)` | mount+60ms | 否 |
| M3 | Hero背景写真（帯/背景のみ） | Ken Burns微 | scale1→1.06 | 18–28s loop | `(.22,1,.36,1)` | mount | 否 |
| M4 | TrustStripバーン600 | **カウントアップ**+fade-up | Y+8→0 | 1400–1600ms | easeOutCubic | IO≥0.4/once | **YES①** |
| M6 | Price 3カード | reveal stagger | Y+16→0 | 760ms | `(.16,1,.3,1)` | IO once/120ms間隔 | 否 |
| M7 | 花バッジ | fade-in（パルス/発光禁止） | 0 | 500ms | ease-out | M6+300ms | 否 |
| M9 | コスト3事実 | row順次reveal | Y+20→0 | 760ms | `(.2,.82,.18,1)` | IO once/140ms | 否 |
| M10 | 比較バー | **scaleX伸長**（width直禁止） | scaleX0→1 | 980ms | `(.2,.82,.18,1)` | IO once | 否 |
| M12 | 写真マーキー | 無限横スクロール | translateX | 30–42s linear | linear | mount/hover停止/reduced静止 | 否 |
| M15 | FAQアコーディオン | grid-rows展開+chevron回転 | §4.4 | 250–350ms | ease-out | click/Enter/Space | 否 |
| M16 | FinalCta/S05月々 | **カウントアップ** | Y+8→0 | 1400ms | easeOutCubic | IO≥0.4/once | **YES②** |
| M17 | CTA hover | bg/矢印微 | X+4px（矢印のみ） | 180–240ms | ease | hover/focus-visible | 否 |

**叫ぶ箇所の確定**: カウントアップは **M4とM16の2箇所のみ**。M4で600/14/1,000/50を出したら他セクションで同4数字を再カウントアップ禁止（二度打ち）。M16は「月々」（別軸）なので二度打ちにならない。同一ビューポートに2カウントアップを同時発火しない。**価格（2,480/2,280）はカウントアップしない**（静止で正確に＝「叩いた値と一致」哲学。花2,480/風2,480/京2,280はモデル別に正しく割当）。

### 4.3 写真マーキー（M12・純CSS実装）

Swiper不要・純CSS（依存削減・60fps）。3セット複製・`translateX(-33.333%)`・`aspect-ratio`固定でCLS=0。PC=36s基準（事例36s/分譲地42s/スタッフ30s、逆方向で単調回避）、**SPは速度を落とす**（44s）。`:hover`/`:focus-within`で停止。reduced-motionで `animation:none`+`overflow-x:auto`（手動閲覧）。**スタッフ写真は役職でサイズ差/特別扱いの動きを付けない**（平等原則）。

```css
.ymt-marquee{overflow:hidden;-webkit-mask-image:linear-gradient(to right,transparent,#000 6%,#000 94%,transparent);mask-image:linear-gradient(to right,transparent,#000 6%,#000 94%,transparent)}
.ymt-marquee__track{display:flex;width:max-content;gap:clamp(12px,2vw,20px);will-change:transform;animation:ymt-marquee-x var(--marquee-duration,36s) linear infinite}
.ymt-marquee:hover .ymt-marquee__track,.ymt-marquee:focus-within .ymt-marquee__track{animation-play-state:paused}
.ymt-marquee__item{flex:0 0 auto;aspect-ratio:4/3;width:clamp(220px,26vw,340px)}
@keyframes ymt-marquee-x{from{transform:translate3d(0,0,0)}to{transform:translate3d(-33.333%,0,0)}}
@media (max-width:768px){.ymt-marquee__track{--marquee-duration:44s}}
@media (prefers-reduced-motion:reduce){.ymt-marquee__track{animation:none;transform:none}.ymt-marquee{overflow-x:auto}}
```

### 4.4 FAQアコーディオン（M15）

`<button aria-expanded aria-controls>`、回答 `role="region"`。最小高48px。`grid-template-rows:0fr→1fr`（推奨・width/height直アニメ回避）、chevron `rotate(0→180deg)`、発光/バウンス禁止。最重要1問は初期open。

```css
.ymt-faq__q{display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;min-height:48px;padding:16px 0;text-align:left;background:none;border:none;cursor:pointer}
.ymt-faq__q:focus-visible{outline:2px solid var(--deep-green);outline-offset:4px}
.ymt-faq__chevron{transition:transform 250ms cubic-bezier(.16,1,.3,1)}
.ymt-faq__q[aria-expanded="true"] .ymt-faq__chevron{transform:rotate(180deg)}
.ymt-faq__panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows 300ms cubic-bezier(.16,1,.3,1)}
.ymt-faq__panel[data-open="true"]{grid-template-rows:1fr}.ymt-faq__panel>div{overflow:hidden}
@media (prefers-reduced-motion:reduce){.ymt-faq__chevron,.ymt-faq__panel{transition:none}}
```

### 4.5 reveal の JS無効フォールバック（検証blocker是正）

既存 `.scroll-in`（globals.css:157）は `opacity:0;transform:translateY(24px)` を**CSS無条件ベタ書き**で、`is-visible` 付与はJS（IO）のみ。**JS無効環境では canonical コピー/価格/声が永久に消える＝憲法§1を自己矛盾で破る**。M6価格カード/M9メカニズム/M13声カードは canonical を reveal するため、必ず次のどちらかを実装:

```css
/* JS無効フォールバック（必須） */
@media (scripting: none){ .scroll-in,[data-reveal]{opacity:1;transform:none} }
```

または初期 `opacity:0` を CSS直書きせず、hydration後にJSが付与する `.reveal-armed` へ移す。**初期HTMLは可視がデフォルト、IOが付いた要素だけ隠す→現れる方式**を採る。

### 4.6 reduced-motion グローバル安全網

```css
@media (prefers-reduced-motion:reduce){
  .ymt-marquee__track,.hero-ken-burns,.hero-zoom,.gallery-marquee-left,.gallery-marquee-right{animation:none!important}
  .scroll-in,[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}
  [data-parallax]{transform:none!important}
}
```

**既存ブロックの実スコープ（検証是正）**: 既存 L6713 ブロックは blueprint/voice/reason のみカバー。**写真マーキー・カウントアップ即値・Lenis慣性停止・scroll-reveal は新規追加が必要**（既存に無い）。カウントアップは reduced-motion時に最終値即表示（0/空欄固定禁止）。

### 4.7 実装手段の規律

CSS優先・GSAP原則不要。reveal=`useScrollIn`（既存IO）/ stagger=同(50ms)/ カウントアップ=`useCountUp`（既存・rAF・a11y対応・SSRに実数）/ マーキー=純CSS / parallax=CSS transform+rAF clamp最小JS / アコーディオン=grid-rows+state / スムーススクロール=既存 `SmoothScrollProvider`(Lenis)踏襲。IntersectionObserverは既存フックに集約し乱立させない。

---

## 5. 心理マッピング

### 5.1 心の5段 × 5タイプ × 信頼アンカー × 自分ごと化

心の5段（lp-psych-audit住宅補正 反射15/関連20/信頼30/欲求25/決断10）。診断の最大失点＝**信頼17/30**（顔と名前の不在・不都合開示が注記レベル・声に実名性なし）と**欲求が「他人の月々」で自分ごと化しない**こと。

| # | セクション | 心の段階 | 主タイプ | 埋める失点 |
|---|---|---|---|---|
| S01 | Hero | ①反射 | T2,T1 | 反射: ゴシック転換・生活感写真は背景 |
| S02 | 共感＝敵 | ②関連性 | T1,T3,T4 | 関連: 共感を2番手へ前出し |
| S03 | 権威バーン | ①→③ | T1,T2 | 反射/信頼: バーン1発・二度打ち禁止 |
| **代表＋顔（信頼アンカーA1）** | ③信頼 | 全 | **顔と名前の復帰（最重要失点）。代表2名完全同格・宅建番号・原文厳守** |
| S07 | 土地 | ②→④ | T4 | 関連: T4欠落の補填 |
| S04→S05 | 逆転→総額・月々 | ④欲求ピーク | T3,T1 | **欲求: 「他人の月々」→「あなたの月々」** |
| S06 | メカニズム（不都合開示A2） | ③→④ | T1 | 信頼: 不都合開示を注記→主役級へ格上げ |
| S09 | 物語事例（声の実名性A3） | ④余韻 | T5,T2 | 信頼/欲求: 顔・市名・家族構成・プラン付き物語 |
| S11 | FAQ | ③→⑤ | 全 | 信頼/決断: 最大の恐怖を表に |
| S12 | 最終CTA | ⑤決断 | 全 | 決断: 送信後の流れ・営業頻度開示 |

**信頼アンカーの配置原則**: A1顔/A2不都合開示/A3声の実名性は**欲求ピーク（S05）の前に厚く置く**。信頼が立つ前に欲求を煽ると住宅商材では逆効果（読者が断定をチェックしに来る）。③信頼（S03-S06）を固めてから④欲求ピークへ。**補助の数字（600/14/1,000/50）はS03で1回・以後再掲しない**。

**投資哲学エッセンス温存（専務④）**: S05総額・月々（住宅ローン文脈）またはS08サブコラムに「資産として残る/低金利・長期借入を賢く使う」エッセンスを常設1枠。**NISA直接比喩は避ける**。表現層刷新で投資哲学を半殺しにしない。

### 5.2 自分ごと化の扱い（検証major是正・要承認フラグ）

現行クライマックスが「他人A/B/Cさんの月々」で自分ごと化しない問題への処方として、診断UI（タイプ別2-3問）＋ミニ総額入力（年収/エリア/プラン→月々概算即時表示）が心理上は有効。ただしこれは**確定資産にない新規インタラクティブ機能**であり、表現層（配置/遷移/色/タイポ）の範囲を超える。

> **【要専務確認の新規機能提案・実装保留】**: 診断UI・即時概算ツールは確定仕様ではない。LIFULL家賃計算の型は「参考のみ・やまと固有化要承認」が既存方針（reference_lifull_quiz_lp_format）。**実装者はこれを確定仕様と誤認しない**。当面のクライマックスは「現行3事例（A/B/C）の証拠 + クライマックス直後の S05末LINE反復CTAで**自分の総額へ即接続**」を確定スコープとし、入力ツールは承認後に追加する。

倫理ガード: 概算を作る場合も「目安」明示＋試算条件注記（金利1.0%/35年/元利均等/ボーナスなし）。「あなたは損している」等の煽り演出禁止。偽の残数・偽カウントダウン禁止（ダークパターン）。

### 5.3 リブート前後スコア目標

①反射15→22+（ゴシック・S03バーン）/ ②関連20→30+（共感前出し・S07土地）/ **③信頼17→25+（顔復帰・不都合開示格上げ・声実名性）** / ④欲求25→33+（S05クライマックス・S10誇れる写真）/ ⑤決断10→16+（送信後開示・摩擦除去・CTA2段）。判定は公開後のCTAクリック・スクロール深度・問い合わせ内容で（好みで判断しない）。

---

## 6. コピー文法＆CTA

**移植の合言葉**: 「文言は触らない。タイポの役を組み替える」。確定コピーの一字も変えず、どの語をdisplay/h2/eyebrow/microのどの役で大型化・配置するかだけを決める。

### 6.1 確定コピー vs 新規コピーの分離（0ベース禁止・検証major是正）

- **確定コピー（不変・改変禁止）**: BRAND-TRUTH §6 Hero（h1「奈良・京都南部で、土地から考える家づくり。」/ lead「京モデル 2,280万円〜。」/ sub「土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。」）、お客様の声原文、代表メッセージ、costテーブル文言。
- **中心概念（出典＝BPLAN/bplan-diagnosis、BRAND-TRUTHではない）**: 「大手の理想を、現実の総額に。」「憧れを現実にできる形へ」「妥協ではなく誇れる選択」。**FVに採るなら先に §6 を更新してから実装**（ゲートB）。
- **新規CTA/ボタン文言（要copywriter＋専務確認＋natural-japanese検査）**: 「土地込み総額を出す」「標準仕様を実物で見る」等。default は canonical「LINEで相談」「モデルハウスを見学する」。新規は §5 へ正式追加してから採用。

### 6.2 配置方針（セクション別・タイポ役の組み替え）

- **S01 Hero**: §6確定h1を `t-display`（太角ゴシック・ゲートA後）。lead/subは `t-lead`/`t-body`。京2,280は `t-burn`（バーン1発目）。注記「※一部登記費用などは別途発生します」は `t-small`（断定の格を守る）。
- **S03 TrustLedger**: 600棟を `t-burn`主役級。14年/1,000件/50組/保証は `t-h3`数字＋注で**明確に小さく**（二度打ち回避）。「600棟＝600家族の判断に立ち会ってきた」を `t-lead` で意味翻訳。
- **S05 PaymentCases**: 月々を `t-burn`カウントアップ。試算前提注記を `t-small`（金利1.0%/35年/ボーナスなし明示維持）。
- **S06 Cost Logic**: answer列を `t-h3` で太く（結論語＝視線停止点。xmobile緑2rem結論数字の役をdeep-green/sign-redの**色面**で代替・蛍光禁止）。
- **明朝の居場所**: 撤去 or 理念「憧れを現実にできる形へ」を縦組み1箇所のみ（xmobile由来でなく新規判断と明記）。縦書き本文は3行以上禁止。

### 6.3 CTAボタン文言＆不安解消マイクロコピー

CTA階層（不変）: **Primary LINE > Secondary 見学 > Tertiary 資料 > 電話(footer/contactのみ)**。CTAは「答え」を約束（曖昧な相談でなく総額/月々）。`LINE_ADD_FRIEND_URL` を `src/data/line.ts` からimport（ハードコード禁止）。

| 階層 | 色 | canonical default | 強化案（要承認） |
|---|---|---|---|
| Primary | LINE-green #06C755 | **LINEで相談** | 土地込み総額を出す▲ |
| Secondary | deep-green #2F4A2C | **モデルハウスを見学する** | 標準仕様を実物で見る▲ |
| Tertiary | quiet outlined | 資料請求 | — |
| 電話 | deep-green | 電話で相談 | 9:00〜19:00 / 火・水定休 |

**摩擦除去マイクロコピー（やまと版・憲法準拠の語尾）**: 相談は無料です／まだ土地がなくても大丈夫です／予算が固まっていなくても大丈夫です／**こちらから営業のお電話はしません**（「一切しません」は過剰断定回避）／オンラインでもご相談いただけます／ご予約なしでも見学できます／お子様連れでお越しいただけます／**目安はおよそ60分です**。配置はCTA直上/直下8-16px、caption・muted色、文脈で2-3点ずつ（全部毎回並べない）。

**禁止マイクロコピー**: 「今だけ」「残り◯組」「営業電話一切なし」「絶対」「必ず」（ダークパターン/過剰断定）/「こわくない」「悩まないで」（感情断定→「ご一緒に整えます」「お見せします」）。**S12送信後開示の「無理な営業はしません」も運用で守れる表現へ要copywriter**（「ご希望のペースでご連絡します」等）。

### 6.4 nav/eyebrow canonicalラベル（標準語厳守）

nav: 商品紹介/資金計画/物件情報・自社分譲地/施工事例/お客様の声/スタッフ（動詞+人型・疑問形・感情断定の短ラベル禁止。「決めた人の話」「担当する人」「土地はある?」はreverted済）。eyebrow英字caps（total cost first / since 2011 / why possible 等）は維持、和訳を足すなら名詞の標準語のみ。

### 6.5 HTML/SVG振り分け

| 要素 | 実装 | 理由 |
|---|---|---|
| 本文・リード・FAQ問答・見出しh1/h2/h3・価格条件注記 | **HTML文字** | SEO/A11y/法務トレーサビリティ |
| 価格・月々・棟数・バーン数字（読ませる数値） | **HTML文字**（Oswald, tabular-nums） | 読み上げ・コピー・カウントアップ可 |
| 罫線・カタログ枠・8pxバンド相当の色帯 | SVG/CSS | 装飾 |
| 巨大背景数字（薄い `bg-number` opacity 0.06-0.10） | SVG可（意味を持たない装飾のみ） | 図像 |
| ロゴ | 既存Header/logo.png（再描画禁止） | BRAND-TRUTH §1 |

**禁止**: 価格・棟数・見出し・FAQをSVG画像文字で焼く（xmobileのSVG統計の真似はNG。やまとはHTMLで）。

---

## 7. レスポンシブ＆A11y＆Perf＆SEO

### 7.1 SP分解表（PC要素→SP表現・単純縮小しない）

SP↔PC境界は **`768px`(`md`) を分解の正本**。各PC要素は構造ごと差し替える。

| PC要素 | PC | SP(<768) | 不変条件 |
|---|---|---|---|
| 比較表（非対称） | 左右2列対比 | **2カード縦積み**（一般上→やまと下）。色だけに頼らずアイコン+ラベル併記 | 「安い」と読ませない。やまとカード大型OK（商品比較・平等対象外） |
| フロー（横5段） | 横一列+コネクタ | **縦タイムライン**（番号+縦ライン+ノード） | 1段44px以上。番号Oswaldは巨大化しない |
| 縦書き長文 | 短い情緒見出しのみ縦(明朝局所OK) | **`md:[vertical-rl]`でSPは横書きデフォルト**。3行以上の縦書き本文禁止 | 縦書きでも読み上げ・選択・翻訳が機能（実テキスト・画像化禁止） |
| 巨大数字+本文 | 左右/重なり一体 | **上下完全分離**（数字→本文）。`order`不使用でDOM順=読み上げ順 | バーン局在・測定条件+時点付与 |
| 3つの円（3事実） | 横3つ均等 | **縦3段既定**（横スクロールは冗長時のみ・2.2枚見え+ヒント） | 3事実は全部読ませる→縦推奨 |
| 写真マーキー | 4-5枚見え | 1.5-2.2枚・reduced-motion静止 | 実写真のみ・alt必須・FV主役NG |

### 7.2 A11yチェックリスト

```
[ ] 色だけで意味を伝えない（比較表○×にアイコン+テキストラベル併記）
[ ] 本文4.5:1/大文字3:1 実測: muted#5E5A50 on base / 白 on LINE-green#06C755 / lime面上は暗文字 は要実測
[ ] sign-redは本文文字に使わず面/罫/見出し、赤文字はsign-red-dark#8F211B
[ ] FAQ: <button> aria-expanded/aria-controls、回答role="region"、最大の不安は展開済み露出
[ ] 全タップ44×44px以上（FloatingCta min-h48・SP固定CTA h-16=64px適合）
[ ] 縦書きはHTML実テキスト・DOM順論理・SPで横書き復帰・200%ズーム溢れなし
[ ] 写真alt（施工事例/分譲地/スタッフ内容記述、装飾帯はalt=""、感情断定alt禁止）
[ ] :focus-visible 2pxリング+offset（outline:none単独禁止）、Tab順=視覚順=DOM順
[ ] prefers-reduced-motion: マーキー/カウントアップ/blueprint-drift/scroll-reveal/Lenis慣性 全停止
[ ] カウントアップ reduced時は最終値即表示（0/空欄固定しない）
[ ] lang="ja"・h1は1つ・見出しレベル飛ばさない・装飾SVGはaria-hidden
```

### 7.3 SP下部固定CTAバー（現状の穴を埋める）

**b-plan-v2 L968 の3分割（電話/総額(LINE)/見学・h-16=64px）を正本**。`md:hidden`（<768表示）。中央=総額(LINE-green)を最強調。**safe-area・body下部padding が現状欠落＝必ず追加**:

```css
.sp-fixed-cta{position:fixed;inset-inline:0;bottom:0;z-index:50;padding-bottom:env(safe-area-inset-bottom,0px);border-top:1px solid var(--border);background:#fff}
.sp-fixed-cta a,.sp-fixed-cta button{min-height:64px}
/* body下部に固定CTA分のpadding（md:hidden文脈）: calc(64px + env(safe-area-inset-bottom)) */
```

viewport meta に `viewport-fit=cover`。電話は `tel:0742361123`（BRAND-TRUTH §3）。出現は `scrollY>400`、**Hero内は非表示推奨**（Hero CTA最大2と二重化回避）。reduced-motionで出現フェード無効。

**現状の事実核（検証是正）**: b-plan-v2 では FloatingCta は**未mount**であり2バー同時表示は現状起きていない（L968インライン3分割のみ）。ただし下層ページ群（sell/lots/works/voice/money/staff/standard）は2ボタン版FloatingCtaで仕様が分岐。リブートでb-plan-v2を正本(3分割)に寄せる際、**下層ページとの整合（どちらを全サイト標準にするか）を別途決める**。

### 7.4 Perf/SEOチェックリスト

```
[ ] 主要コピー全てHTMLテキスト（画像文字化しない）。H1は1つ（バーン巨大数字はh1にしない）
[ ] H2順序=営業順序（共感→問題→約束→理由→証拠→価格→自由設計→事例→声→FAQ→行動）
[ ] 実績数字に測定条件+時点: 「600棟以上(2011創業〜2026時点・累計)」「常時150区画程度(2026時点)」「資金計画1,000件以上(累計)」「地盤20年/しろあり10年(保証条件別途)」。費用帯の異なる数字の並置禁止
[ ] 構造化データ: Organization/RealEstateAgent/FAQPage（canonical値と一致）
[ ] 内部リンク: TOPから/money /standard /voice /works /lots /faq。最終CTA直後の離脱リンク氾濫を避ける
[ ] AVIF優先（picture AVIF→WebP）。Hero LCPに fetchpriority=high、他はlazy
[ ] 全画像/動画 aspect-ratio で寸法予約（CLS=0）
[ ] フォントweight絞る（使用ウェイトのみ）。Oswaldは0-9+「,.」「棟/区画/年/件/万円」をunicode-rangeサブセット
[ ] page.tsx(6777行)分割・下層セクション動的import検討。scrollリスナはpassive
[ ] 無限アニメはtransform/opacityのみ・visibilitychangeで停止
```

---

## 8. 実装ロードマップ

### 8.1 フェーズ（P0会得 → P1ブランド体験 → P2仕上げ）

**P0 — 文法の会得（基盤・ゲート通過が前提）**
1. **ゲートA**: BRAND-TRUTH §1 Typography を Mincho→Gothic へ更新案提示→神野さん承認→正本更新。
2. **ゲートB**: §6 Hero採用方針確定（§6確定コピー継続か中心概念採用か）。中心概念採用なら §6 更新。
3. `globals.css` に §3.2/§3.5 の `:root`トークン＋`.t-*`クラス追加（既存`--brand-*`はエイリアス残置）。色を §1トークン(#2F4A2C/#E84336)へ統一。
4. §4.5 JS無効フォールバック（`@media (scripting:none)`）と §4.6 reduced-motion不足分を追加。
5. SP固定CTA safe-area + body padding 追加。

**P1 — ブランド体験（証拠ラダーの再配置）**
6. S02共感前倒し・S03権威バーン集約（二度打ち解消・FVレール撤去）。
7. S04逆転新設・S05黒地クライマックス化＋投資エッセンス枠。
8. S07土地新設（未公開土地LINE・地図UI・150/76文脈分離）。
9. S09物語化（Before→After・顔と名前・声編集しない）・S11 FAQ新設。
10. 巨大数字バーン局在（Oswald初期=実証値600・段階化）・写真マーキー純CSS化。

**P2 — 仕上げ（検証ゲート通過）**
11. A11y実測（コントラスト・focus・キーボード・縦書き読み上げ）。
12. Perf（AVIF・LCP・サブセット・CLS=0・page.tsx分割）。
13. 計測ゲート（§8.3）を全通過。下層ページCTA整合を決定。

### 8.2 サブエージェント編成案

| サブエージェント | 担当 | 入力 | 出力 |
|---|---|---|---|
| typography-implementer | §3タイポ・トークン・globals.css | 本書§3 + BRAND-TRUTH §1更新後 | `.t-*`/`:root`差分 |
| ia-section-builder | §2セクション再配置・S04/S07/S09/S11新設 | 本書§2 + 確定コピー | page.tsx分割実装 |
| motion-engineer | §4モーション・マーキー・FAQ・reveal安全網 | 本書§4 + 既存フック | CSS/フック差分 |
| copy-placer | §6タイポ役組み替え（文言不変）・新規CTAフラグ | §6 + copywriter/natural-japanese | 配置差分+要承認リスト |
| rwd-a11y-perf-auditor | §7分解・A11y実測・Perf・SEO | §7 + a11y-audit | 監査レポート+修正 |

### 8.3 計測ゲート（各フェーズ後に必ず通す）

- **design-critic**: 5軸採点。「Apple/SaaSに置けてしまう」なら蛍光トラップ再発＝差し戻し。明朝静寂への逆戻りチェック。
- **lp-psych-audit**: §5.3スコア目標（特に信頼17→25+・欲求の自分ごと化）達成判定。ダークパターン検出。
- **a11y-audit**: WCAG 2.2 AA。コントラスト実測・FAQ ARIA・縦書き読み上げ・reduced-motion・タップ44px。
- 共通: canonical数値・二度打ち・FV物件NG・声編集なし・代表同格・蛍光ゼロ・JS無効でcanonical成立、を全ゲートで再確認。

---

## 9. ADの意思決定が必要な論点（推奨つき）

| # | 論点 | 選択肢 | **推奨** |
|---|---|---|---|
| 1 | **黒地の強度** | 純黒#000 / 温黒ink#1D1D18 | **ink#1D1D18**。base温白と色温度を揃え「やまとの黒」を一貫。純黒は冷たいSaaSに寄る。ink上ivory≈15.8:1でAAA |
| 2 | **明朝アクセントの残置可否** | 完全撤去 / 理念縦組み1点のみ局所残置 | **完全撤去を第一推奨**（迷子の核心が明朝回帰）。情緒が要れば理念「憧れを現実にできる形へ」を縦組み1点・動きなし・新規判断と明記の条件で残置可 |
| 3 | **シグナル役（lime vs sign-red の結論数字色）** | lime主体 / sign-red主体 / 役割二分 | **役割二分**。lime=証明・到達（達成数字・花バッジ）、sign-red=リスク・後出し費用・診断。同一視線で競わせない。蛍光#8DF701は不採用 |
| 4 | **巨大数字バーンの書体・強度** | 実証値Oswald600/132px / 強化Oswald700/168px | **初期=実証値600**（専務承認済みの灼き味を維持）。700/−0.01em/168px強化は専務確認後の段階提示 |
| 5 | **写真マーキー採否** | 採用（S07/S09帯） / 不採用 | **採用**（規模感・安心）。ただしFV主役NG・帯/下層のみ・純CSS30-42s・reduced-motion静止・スタッフ平等。Heroには使わない |
| 6 | **自分ごと化の入力ツール**（新規機能） | 確定実装 / 承認後追加 / 不採用 | **承認後追加**（0ベース禁止・専務未承認の機能追加）。当面は3事例+S05末LINE反復で自分の総額へ接続 |

---

## 10. BRAND-TRUTH.md 更新差分（タイポ節＋§6注記・実装着手前のblockerゲート）

実装着手の前提条件として、**BRAND-TRUTH を更新し神野さん承認を得る**（コードと正本の漂流防止）。承認順序: 神野さん承認 → 正本更新 → 実装。

### 10.1 §1 Typography 差し替え（現「B案 Editorial Mincho / Zen Old Mincho主見出し」→ Gothic Catalog）

> **### Typography（2026-06-25 — TOP は Gothic Catalog へ転換）**
> 6/10診断により TOP は専務承認文法「ゴシック・カタログ・バーン」へ転換。明朝は静寂・建築誌磁場の発生源のため **TOP から撤去**。
>
> | 役割 | フォント | ウェイト | 用途 |
> |---|---|---|---|
> | 主見出し h1/h2 | **Zen Kaku Gothic New** | 800–900 | 和文太角ゴシック・カタログの潔さ |
> | 小見出しh3/リード | Zen Kaku Gothic New 700 / Murecho 500 | — | 見出し700・リード温度 |
> | 本文 | Murecho | 400 | line-height 1.85 / ls 0.025em |
> | 巨大数字バーン | Oswald | 600（強化700は承認後） | tabular-nums・1セクション1発・実績局在 |
> | 欧文eyebrow/ラベル | Inter | 600 | caps + tracking 0.18em |
>
> **撤去（TOPで使わない・下層/`/money`互換のためロードは残置）**: Zen Old Mincho・Shippori・Noto Serif（明朝全般）・Fraunces italic・縦書き長文。
> **`/money` は引き続き例外**（和文ゴシック+Inter+Oswald・Mincho禁止＝この転換と元から整合）。

### 10.2 §6 Hero copy のレンダリング注記更新（コピー文字列は1字も変えない）

- `[h1 — Mincho 26-56px]` → `[h1 — Zen Kaku Gothic New 800-900 / --type-display]`
- `[lead — Mincho + Fraunces italic 2,280]` → `[lead — 数字部のみ Oswald 600 / --type-burn-sub、和文は Murecho 500]`
- **文字列（「奈良・京都南部で、土地から考える家づくり。」「京モデル 2,280万円〜。」「土地代も、建物代も…」）は1字も変えない**。中心概念をFV採用する場合は §6 にBPLAN出典を明記して別途追記。

### 10.3 §5 CTA / §2 数値の付記

- §5 に新規ラベル候補（「LINEで土地込み総額を出す」「標準仕様を実物で見る」）を**正式追加してから実装で採用**。default は既存canonical。
- §2 区画数: 「常時150区画程度＝会社全体の常時保有数」と「矢田町76区画＝個別分譲地の一例」の包含関係を1行明記。後続タスクで `12-rate-gaps.md` の旧76→文脈注記の更新フラグを立てる。

---

### 関連ファイル（絶対パス）

- リブート対象: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/b-plan-v2/page.tsx`
- 単一正本（要更新）: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/BRAND-TRUTH.md`（§1 Typography / §6 Hero注記 / §5 CTA / §2 区画数）
- 診断: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/docs/notes/2026-06-10-bplan-diagnosis.md`
- 正本群: `docs/project-context/` 配下 conversion-sales-rulebook.md / top-section-structure.md / kobayashi-review-20260428.md / 12-rate-gaps.md / line-first-cta-strategy.md / bplan-design-rhythm.md
- 再利用資産: `src/hooks/useCountUp.ts` / `src/hooks/useScrollIn.ts` / `src/components/bplan/AnimatedNumber.tsx` / `src/components/FloatingCta.tsx` / `src/components/SmoothScrollProvider.tsx` / `src/app/globals.css`（`.money-burn-display` L324-334 / `.scroll-in` L157 / reduced-motion L6713）/ `src/data/line.ts`（`LINE_ADD_FRIEND_URL`）

---

## 11. v1.1 追補（最終Critic改善5点 ＋ 実機スクショ確定ディテール）

本章は v1 本文を**上書き／補強する確定追補**。本文と矛盾した場合は本章が優先。出所は (a) 最終整合Critic(fidelity 93/100)が挙げた改善5点、(b) AD提供の xmobile 実機スクリーンショット2枚で確定した「実装の作法」。

### 11.1 最終Critic改善5点（本文への確定オーバーライド）

| # | 対象節 | 確定オーバーライド |
|---|---|---|
| C1 | §3.5 / §8 P0-3 | **ink値の完全統一**。既存 b-plan-v2 の `P.ink = #181714` / `--bp-bg-ink` も BRAND-TRUTH §1 の **`#1D1D18`** へ統一する（論点1=黒地強度ink採用とコード実値を一致させる）。P0で `P` パレットを `#181714 → #1D1D18` に置換する1行を必ず含める。 |
| C2 | §4.5 / §4.6 | **reduced-motion 行番号の実値是正＋クロスリンク**。`globals.css` の `prefers-reduced-motion` ブロックは **L188 / L388 / L439 / L681 / L733 に分散**（単一の L6713 ではない）。とくに **L188 は `.scroll-in { transition: none }` のみで `opacity:0` / `transform` を解除しない** → **JS無効時に `opacity:0` が残り本文が消える**（§4.5 blockerの根拠）。reveal実装時は「初期 `opacity:0` を付けるなら JS無効/`no-js` フォールバックで必ず可視化」を §4.6 にも明記。 |
| C3 | §2.4 / §10.3 | **数値ドリフト封じ**。`docs/notes/2026-06-10-bplan-diagnosis.md` 本文は旧基準「自社分譲地76区画＝最大の構造優位」で記述。**「常時150区画程度＝会社全体の常時保有数 / 矢田町76区画＝個別分譲地の一例」**へ更新フラグを立てる（`12-rate-gaps.md` の更新フラグと並記）。正本群内で76と150を混在させない。 |
| C4 | §9 → 第7論点へ昇格 | **SP固定CTAバーの標準化**を「別途決める」から AD意思決定論点へ昇格（下記 §11.3）。現状 b-plan-v2 はインライン3分割（電話/LINE/見学）、下層7ページは `FloatingCta`(2ボタン版)が稼働＝**仕様分岐リスク**。 |
| C5 | §6.3 冒頭 | **摩擦除去マイクロコピーも新規コピー**。「予算未定OK」「目安はおよそ60分です」等は事実上の新規文言 → §6.1 の新規コピー分離原則（要 copywriter ＋ natural-japanese 検査 ＋ 専務確認）の**対象に摩擦除去マイクロコピー群を含む**ことを §6.3 冒頭に明記。確定/新規の線引きを閉じる。 |

### 11.2 実機スクショ確定ディテール（「実装の作法」付録）

xmobile実機2枚で、テキスト監査だけでは取れない「実際の見せ方」を確定。**色は必ずやまと翻訳・蛍光不使用**を全項目に適用。

| 実機の見せ方（確認済） | やまとへの翻訳と配置先 |
|---|---|
| **巨大「今」= 黒塗り正方形＋白抜き文字**を最終CTA直前に配置（"再起動装置"） | **S12直前**に決断モチーフ。やまとは「今」の煽りでなく **「家を、見にいく。」/「まず、総額を見る。」**を ink 面＋paper白抜きの巨大組みで。蛍光なし・動きは控えめ |
| **「現在、加盟店爆増中」= 緑のハイライト帯**（緊急性） | 虚偽煽り禁止（憲法）。**運用事実の deep-green 帯**へ＝「今月の見学枠 残◯」「未公開土地 ◯区画 動きあり」等の**事実スロット**。S07 or [CTA-2]直後 |
| **「ブランド知名度UP ↔ リアル店舗FC」= 相互証明の矢印**（相互証明） | **「土地」↔「建物」 / 「総額」↔「月々」の相互補強**モチーフへ。S04逆転 or S05クライマックスの導入図に |
| **ピラミッド図（ストック収益＝土台）** | **「現実の総額を支える3根拠」の積層図**＝土台に①自社分譲地モデルハウス二重利用（最大の差別化）、上に②自社一貫体制 ③広告費最小限。S06メカニズムの主図に |
| **3つの緑円（安心感／サポート／話題性）** | **価値3点の円図**＝「大手と同品質の素材・装備／土地込み総額が見える／建てた後も近くで支える」。S06末 or S08前の要約に。deep-green 円 |
| **STEP 1–5 ＝巨大アウトライン数字＋各ステップ小写真** | **家づくりの流れ 01–08**（kobayashi/構成理想形準拠）。アウトライン数字（Oswald線画）＋**施工写真**（実写真allowlist）。各ステップに「時期・費用発生」を添える。下層 or S11付近 |
| **声 ＝巨大文字＋吹き出し、白地で施主インタビュー長文＋写真** | **S09**で踏襲。専務⑦「声は編集しない」に沿い **白地・実名性のある長文＋実写真**。現v2の注釈断片5枚から脱却。「声」の巨大組みは可（明朝でなくゴシック） |
| **数字バーンが画面を支配（1,000/1,026/90%/9割/今）、signal-greenは数字・矢印・チェック・帯のみ** | **600棟/1,000件/14年/2,280万** をS03/S05でバーン。緑は lime（証明）/deep-green（面）に翻訳、**面で塗らず視線停止点のみ**。リスク・診断は sign-red |
| **フッターに巨大「X MOBILE」ワードマーク** | ⚠️ **BRAND-TRUTH §1「ロゴはコード再描画禁止・画像アセット必須」**。巨大ワードマークをやる場合は **`logo.png` の拡大配置のみ**（再レター/テキスト化禁止）。原則は**避ける**のが安全 |

**確認できたマクロ構造（専務文法の実在証明）**: 黒ベースHero → 白い長セクション(休止) → 黒/緑帯(緊急) の**明度リズムが実在**。これがやまとの「明朝・静寂への回帰＝迷子」を断ち切る根拠。signal green `#8DF701` の使用は **視線停止点（数字/矢印/チェック/帯/結論）だけ**に厳格限定されており、やまと lime `#A9D159` も同じ規律で**面塗り禁止・点/下線/8px帯のみ**とする。

### 11.3 第7のAD意思決定論点（§9へ追加・C4昇格）

| # | 論点 | 選択肢 | **推奨** |
|---|---|---|---|
| 7 | **SP下部固定CTAバーの標準** | A:b-plan-v2 のインライン3分割（電話/LINE/見学）を全サイト標準化 / B:`FloatingCta`(2ボタン)を全サイト標準化 / C:両立（TOPは3分割・下層は2ボタン） | **A（3分割を標準）**。LINE主導線＋見学＋電話が1バーで完結し、TOPと下層7ページの仕様分岐を解消。safe-area対応・高さ64–72px・FAQ/入力中は非干渉制御（§7.3準拠）。実装は `FloatingCta` を3分割版へ統一改修 |

> AD決定が必要な論点は **計7件**（§9の6件＋本論点）。実装着手前に §11.1-C1/C2 の技術是正と、§10 のBRAND-TRUTH更新（ゲートA タイポ／ゲートB Heroコピー出典）を先に通すこと。
