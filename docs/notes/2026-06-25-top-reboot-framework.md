I now have the complete framework (all 636 lines) plus all four confirmed artifacts, the verification corrections, the AD 7-point decisions, and the blocker corrections. I have the canonical grounding from CLAUDE.md/AGENTS.md. I'll now produce the confirmed v2.0 — a single complete document that integrates everything, resolves the blockers (especially §3.5 token reconciliation against existing globals.css `--color-*`, the lime hex drift, and the §10 line-number corrections), preserves all rich detail, and outputs Japanese markdown only.

# やまと不動産 TOPリブート — 単一フレームワーク文書（確定版 v2.0）

**版: 確定版 v2.0 / 2026-06-25 AD承認・7論点確定 / 実装直前**
対象: `src/app/b-plan-v2/page.tsx`（明朝・静寂回帰の現実装＝リブート対象）
統合元: IA・デザインシステム・モーション・心理・コピー・RWD/A11y の6次元設計＋確定アーティファクト4種（最終トークン／BRAND-TRUTH適用差分／S01-S12ビルドカード／ビルド計画）＋整合・完全性Critic是正＋Reference Scout（xmobile実機監査）
正本優先: `BRAND-TRUTH.md` ＞ `DESIGN_GUARDRAILS.md` ＞ `docs/project-context/*`。**数値・コピー・色・CTAが本書と食い違ったら正本が勝つ。**

> **本書の位置づけ**: これは設計の**最終下書き**であり実装コードではない。ただし実装者がこの1枚だけで着手できる完全性を持つ。AD承認済みの7論点を「確定✓」として記述し、「推奨／要決定」で濁さない。残る2ゲート（タイポのゴシック転換・Heroコピー出典）は**未決だからではなく、正本更新＋sign-off を実装の第一手に置く運用**として残る。確定コピー文字列は1字も変えない。

### v1 → 確定版 v2.0 の主な確定差分サマリ

| 領域 | v1（提案・推奨） | **確定版 v2.0** |
|---|---|---|
| AD論点 | §9に6論点＋§11.3に第7論点を「推奨」で提示 | **7論点すべて「確定✓」**（§9・§11.3を確定表へ更新、本文の濁しを消去） |
| 黒地 | 純黒 vs ink を推奨止まり | **温黒 ink `#1D1D18` 確定**。`P.ink=#181714`/`--bp-bg-ink`/`--color-ink`/footer`#11110f`を統一 |
| 明朝 | 「完全撤去を第一推奨」 | **TOP主見出し完全撤去確定**。理念縦組み1点は将来オプション・初期実装に入れない |
| シグナル色 | 役割二分を推奨 | **lime=証明／sign-red=リスクの二分確定**。蛍光`#8DF701`不採用・青`#2bb9e1`廃棄・両者とも文字色NG（赤文字は`sign-red-dark`） |
| バーン | 600 vs 700 を段階提示 | **初期=実証値Oswald600確定**。700/−0.01em/168pxは専務確認後の段階提示 |
| 写真マーキー | 採否を推奨 | **採用確定**（S07/S09・FV主役NG・**PC36s/SP44sに速度一意確定**） |
| 入力ツール | 承認後追加を推奨 | **承認後追加確定**。初期は「枠（データスロット）」だけ・S05末LINEで自分ごと化接続 |
| SP固定CTA | 「別途決める」→第7論点で推奨 | **3分割（電話/LINE/見学）全サイト標準確定**。L968インライン版を`FloatingCta`へ抽出し下層7ページもimport |
| §11追補 | 付録C1-C5＋スクショ確定ディテールを別章で二重管理 | **本体へ統合**（該当セクション説明へ織り込み・付録の二重管理を廃止） |
| アーティファクト | 別ファイル4種 | **本体に正式章化**: §3最終トークン確定値化／§10そのまま貼れる差分／**新§S S01-S12ビルドカード**／§8確定ビルド計画 |
| トークン棚卸し | green-mid欠落・**既存`--color-*`との関係未定義** | **既存 globals.css `--color-*` との対応・統合表へ書換**（新規追加でなく統合）。`--bp-green-mid`確定派生を追加 |
| lime hex | 「現実装に lime 不在→追加」（事実誤認） | **`--color-lime=#A2C523` は `--brand-lime=#A9D159` とドリフト中→正本#A9D159へ統一**。scale再算出・bg-lime利用箇所をコントラスト再実測 |
| フォントユーティリティ | `font-zen-kaku` と `font-zen-kaku-new` で割れ | **`font-zen-kaku-new`／`--font-zen-kaku-new` に一意統一**（`--font-money`と命名分離・流用しない） |
| weight 800 | タイポ転換に内包・埋没 | **P0独立必須項目へ昇格**（layout.tsx の Zen Kaku Gothic New weight配列へ`"800"`追加） |
| reduced-motion | 「reduced-motionで本文が消える」と過剰主張 | **JS無効(`scripting:none`)のみが穴**へ是正（L739-742で既にopacity/transform解除済を併記） |
| §10 行番号 | L45–72／L301–314／L299–319 が混在・実ファイルとズレ | **実測値へ統一**（§1=L45–73／§6=L299–316・Track Record撤去=L314）。anchor文字列特定も併記し行ズレ耐性化 |

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
| **canonical数値厳守**（600/150/50/14/1,000・150 vs 76の包含） | §2 証拠ラダー / §3.4 巨大数字配置 / §6.3 / §10.4 |
| **専務8原則**（バーン1発・二度打ち禁止・投資哲学温存・FV物件NG・声編集しない・平等） | §2 / §5 / §6 全体 / 各ビルドカード受け入れ基準 / §8.3 計測ゲート |
| **コピー憲法**（「安い」否定→無駄フレーム・過剰断定禁止・感情断定禁止・canonical標準語） | §6 全体 / 各ビルドカード |
| **0ベース禁止**（確定コピー不変・新機能は要承認フラグ） | §0.1 / §6.1 / §5.2 / 各ビルドカードの〔新規フラグ〕 |
| **BRAND-TRUTH正本の出典分離・更新ゲート** | §0.4 / §6.2 / §10 BRAND-TRUTH更新差分（そのまま貼れる・実測行番号） |
| **既存`--color-*`トークンとの二重層リスク**（blocker） | §3.5 既存 globals.css `--color-*` 供給元との対応・統合表（新規追加でなく統合） |
| **lime hex 二重化**（blocker） | §3.5/§3.6（`--color-lime=#A2C523` を正本 `#A9D159` へ統一・scale再算出）/ §8 P0-2 |
| **green-mid欠落・font命名割れ・weight800埋没**（完全性Critic） | §3.5 トークン棚卸し（green-mid追加）/ §3.6 font一意化 / §8 P0-0b独立項目 |
| **reduced-motion過剰主張**（整合Critic） | §4.5（穴はJS無効`scripting:none`のみ・L739-742で既に解除済を併記） |

### 0.4 最重要ゲート：正本との関係（実装着手前に必読）

本書は7論点を「確定」として書く。以下2点だけは **BRAND-TRUTH更新＋AD/専務 sign-off を実装の第一手に置く運用**として残る（未決だからではない）。

- **ゲートA（タイポ）**: 主見出しのゴシック転換は **BRAND-TRUTH §1 Typography を Mincho→Gothic へ正式更新し、神野さん承認を得てから着手**。承認前は主見出しは現canonical（Zen Old Mincho）を継続。差分テキストは §10.1 に「そのまま貼れる形」で用意済み（実測 L45–73 を置換）。
- **ゲートB（Heroコピー）**: FV確定コピーの正本は **BRAND-TRUTH §6**（h1「奈良・京都南部で、土地から考える家づくり。」/ lead「京モデル 2,280万円〜。」/ sub「土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。」）。BPLAN中心概念「大手の理想を、現実の総額に。」はFV採用するなら**先に §6 を更新してから**。§6の確定文字列を勝手に上書きしない。差分は §10.2 に用意済み（実測 L299–316 を置換／Track Record撤去は L314）。

---

## 1. 設計原則

### 1.1 xmobileから移植する7原則（順序骨格と視覚グラマー）

xmobile監査の「移植できる骨格＝最大の資産」。**順序は流用、色は必ず翻訳**。

1. **証拠ラダーの順序骨格**（数字奪取→共感→規模→逆転→クライマックス→裏取り→商品→事例→緊急→FAQ→最終CTA）。やまとは「勢い→加盟」を「誠実→総額が見える→誇れる→相談」に**内容置換するだけ**で順序はそのまま使う。
2. **黒地CTAマスター ↔ 白地記事化本文の交互リズム**。白の長文が広告感を薄め、黒（ink）が主張を灼く。
3. **巨大数字を実績セクションに局在**（本文に散らさない）。xmobile実機は s08(127px)/s09(100px) に局在。
4. **反復CTAブロック**（xmobile `contact_section`×4）を各納得段階直後に。やまとは煽り回避で**3点＋最終1**に節度化。
5. **CTA直前に摩擦除去マイクロコピー常設**（xmobile「完全無料！勧誘なし！」→ やまと版へ翻訳）。
6. **写真マーキー**（規模感・安心）。xmobile実機=Swiper `speed:50000`(≈50s)。やまとは**純CSS・PC36s/SP44s**で「規模感はあるが読める」速度へ翻訳、reduced-motion対応必須。
7. **巨大数字＋本文はSPで分離・段階ダウンスケール**（PCの一体構図を単純縮小しない）。

### 1.2 やってはいけない7（一発失格リスト）

1. **蛍光green/青/水色を使う**（`#8DF701`/`#2bb9e1` をそのまま輸入）。「Apple/SaaSサイトに置けてしまう」なら失格。最大の罠。
2. **同じ数字を二度打ちする**（FV実績レール＋Trustレールで600/14を連発）。専務原則3違反。
3. **FV主役に完成物件写真を出す**（専務原則1）。Hero主役は数字/タイポ/編集構図。
4. **確定コピーを「賢く言い換える」**（「お客様の声」→「決めた人の話」等）。0ベース禁止資産の無自覚な作り変え。
5. **感情を勝手に断定する**（「こわくない」「悩まないで」）。憲法E。やまとの動詞「ご一緒に整えます/お見せします」へ。
6. **過剰断定する**（「絶対」「一切ない」「動きません」「大手は」）。憲法D。例外は地盤改良費「一切かかりません」/つなぎ融資「原則発生しない」のみ。
7. **明朝・Fraunces italic・縦書き長文をTOP主見出しに出す**（静寂エディトリアル磁場の発生源＝迷子の核心）。**TOP主見出しから完全撤去確定**。理念縦組み1点は将来オプション・初期実装に入れない。

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
| **S07** | ★土地から始める｜土地迷子専用（新設） | 4 | **T4** | ③土地側（常時150区画程度） | 「土地探しで家づくりを止めない」。自社分譲地の構造優位＋地図UI（専務②他府県） | 写真マーキー（分譲地の規模感・PC36s/SP44s・reduced-motion対応） | base+lime overlay（旧セージ翻訳） | **未公開土地LINE**（12-rate動線3の核）※▲ | 全区画→`/lots`（**常時150区画程度＝会社全体の常時保有数。矢田町76区画は個別分譲地の一例**） |
| **S08** | 商品ライン｜花→風→京（カタログの潔さ） | 5 | T2/T5 | ①大手と同品質の素材・装備 | 3モデルcover card。**順序固定 花→風→京**。花=「いちばん選ばれています」バッジ・価格lime強調 / 京=entry役・white・lime tintなし（廉価版表現禁止） | カタログの潔さ＝均等3カードでなく花にバッジで非対称。表記`KYO`（MIYAKO禁止） | ivory白 | 各カードに静かなtertiary | 全17項目→`/money` / 各product |
| **S09** | 物語事例｜Before→葛藤→決め手→After（新設・物語化） | 6 | 全（特T5/T3） | tension付き事例（rulebook Rule4） | 1〜2組を**物語として深く**（数より質＝専務⑧）。顔と名前（信頼最大失点の是正）。声は編集しない（専務⑦・原文尊重） | s04声型＋写真マーキー。白地記事化で感情の余韻 | ivory白 | なし（感情ピークは読ませる） | 声50組以上→`/voice` / 施工事例→`/works` |
| **S10** | 後から増えない｜要確認費用（FAQ戦場・前半） | 6 | T1/T3 | 最大の恐怖を先回り（rulebook Rule5） | 契約前に同じ表で確認する費用一覧。**不都合開示を注記→主役級へ格上げ**（信頼の鍵） | s10不安解消型。sign-red-softで警告面 | base白 | なし | 詳細→`/money#costs` |
| **S11** | FAQ｜営業の戦場 | 6 | 全 | 残存疑念の除去 | 5問（送信後の流れ・営業頻度の開示）。最重要1問は初期open | s10 FAQアコーディオン（icon_q/icon_a型） | base白 | なし | 10問以上→`/faq` |
| **S12** | CTA階段｜最終 | 7 | 全 | 最低摩擦の次の一歩 | **2段が現実解**（LINE→見学）。フォームはtertiary text-link。送信後の流れ明示。数字ゼロ | contact_section_end型・離脱リンク抑制 | **ink黒地（決断マスター）** | P=LINE▲ / S=モデルハウスを見学 / T=資料請求 / 電話(footer) | `/reserve` `/contact` |

注: ※=canonical「LINEで相談」（BRAND-TRUTH §5）。▲=「土地込み総額を出す」系は**新規ラベル候補（要copywriter＋専務確認＋natural-japanese検査＋BRAND-TRUTH §5追記後に採用）**。default は canonical「LINEで相談」。

### 2.1 SP（モバイル）表示12セクション以内

SP上限12。13本中、**S04をS05に視覚統合**（逆転宣言を黒地クライマックスの導入ブロックとして吸収＝独立セクションにしない）し12本に収める。+ floating固定CTAバーを全SP共通で常設（§7.3）。

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

## 3. デザインシステム（確定トークン）

**結論サマリー（迷ったらここ）**: 主見出し=Zen Kaku Gothic New 800–900（ゲートA後）/ 巨大数字=Oswald **600確定**（700は専務確認後） tabular / 縦書き明朝=撤去 / 黒地=ink `#1D1D18`（純黒不採用・確定）/ シグナル=lime証明・deep-green面・sign-redリスク（二分確定・両者文字色NG）/ 数字バーン=1セクション1発・二度打ち禁止 / **lime正本=`#A9D159`**（globals.css の `--color-lime=#A2C523` を統一する）。

### 3.1 タイプ階層（書体方針と用途・確定）

| 役割 | 書体 | ウェイト | 根拠 |
|---|---|---|---|
| 主見出し h1/h2 | **Zen Kaku Gothic New**（ゲートA後） | 800–900 | 太角ゴシック・カタログの潔さ。layout.tsxロード済 |
| 中見出しh3/リード | Zen Kaku Gothic New 700 / Murecho 500 | — | 階層は太さ+サイズで作る |
| 本文 | **Murecho** | 400 | line-height 1.85 / ls 0.025em（bplan確定値・いじらない） |
| 巨大数字バーン | **Oswald** | **600確定** | condensed・confident・tabular。`.money-burn-display`で実証。700強化は専務確認後 |
| 欧文eyebrow/ラベル | **Inter** | 600 caps + tracking 0.18em | Outfitは不採用 |

**撤去（TOPでは使わない・下層/`/money`互換のためロードは残置）**: Zen Old Mincho・Shippori・Noto Serif（明朝全般）・Fraunces italic・縦書き長文。

**バーンweightの確定（論点4）**: 実証済み `.money-burn-display` は **weight600 / clamp(64px,13vw,132px) / ls+0.005em / lh0.86**。本書 `.t-burn` は **初期=この実証値で確定**（専務がTOPで承認した灼き味を変えない）。weight700・ls−0.01em・上限168pxは**専務確認後の段階提示にとどめ、初期実装には入れない**。

### 3.2 タイプスケールCSS（:root + 適用クラス・確定）

xmobile実機は固定px2段だが、やまとは**clamp流体を採用**（実機より進んだ処方であり「xmobile再現」ではない）。

```css
:root {
  --ff-heading: var(--font-zen-kaku-new-var), "Zen Kaku Gothic New", "Hiragino Sans", "Yu Gothic", sans-serif;
  --ff-body:    var(--font-murecho-var), "Murecho", "Hiragino Sans", "Yu Gothic", sans-serif;
  --ff-burn:    var(--font-oswald-var), "Oswald", "Helvetica Neue", Arial, sans-serif;
  --ff-en:      var(--font-inter-var), "Inter", sans-serif;

  --type-burn:     clamp(64px, 13vw, 132px);  /* 初期=実証値で確定。強化案168pxは専務確認後 */
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
  font-family: var(--ff-burn); font-weight: 600;   /* 確定。強化案700は専務確認後 */
  font-size: var(--type-burn); line-height: 0.86; letter-spacing: 0.005em;
  font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1;
  white-space: nowrap; word-break: keep-all;
  display: inline-block; min-width: 3ch; contain: layout;  /* CLS予約。桁数で5ch/6chへ上書き */
}
.t-burn--4ch { min-width: 5ch; }   /* "1,000" 表示幅 */
.t-burn--5ch { min-width: 6ch; }
.t-burn-sub { font-family: var(--ff-burn); font-weight: 600; font-size: var(--type-burn-sub); line-height: 1.0; letter-spacing: 0.01em; font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }
.t-display { font-family: var(--ff-heading); font-weight: 900; font-size: var(--type-display); line-height: 1.18; letter-spacing: 0.01em; text-wrap: balance; }
.t-h2  { font-family: var(--ff-heading); font-weight: 800; font-size: var(--type-h2); line-height: 1.28; letter-spacing: 0.015em; text-wrap: balance; }
.t-h3  { font-family: var(--ff-heading); font-weight: 700; font-size: var(--type-h3); line-height: 1.42; letter-spacing: 0.02em; }
.t-body { font-family: var(--ff-body); font-weight: 400; font-size: var(--type-body); line-height: 1.85; letter-spacing: 0.025em; text-wrap: pretty; word-break: auto-phrase; }
.t-lead { font-family: var(--ff-body); font-weight: 500; font-size: var(--type-lead); line-height: 1.7; letter-spacing: 0.02em; text-wrap: pretty; }
.t-eyebrow { font-family: var(--ff-en); font-weight: 600; font-size: var(--type-eyebrow); line-height: 1.0; letter-spacing: 0.18em; text-transform: uppercase; }
.t-num { font-family: var(--ff-burn); font-weight: 600; font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1; }
```

> **ゲートA注記（800 weight・P0独立必須）**: `.t-h2` は `font-weight:800` を要求するが、`layout.tsx` の `Zen_Kaku_Gothic_New` は現在 `weight: ["400","500","700","900"]` で**800を未ロード**。追加しないと800指定は700/900へ丸められ section-title の狙いウェイトが出ない。→ **P0で `"800"` を weight 配列へ追加**（§8 P0-0bの独立必須項目）。

### 3.3 色リズム / 明度ウェーブ表（確定）

**xmobile色 → やまと翻訳（確定）**: `#000`→**ink `#1D1D18`**（温黒・確定。base憲法が温白`#F7F4EC`のため純黒は色温度が割れて冷たいSaaSに寄る。ink上のivoryコントラスト≈15.8:1でAAA）。`#e0eedd`セージ→base+lime overlay。**`#8DF701`蛍光緑→役割維持・色だけ落とす（lime証明 or sign-redリスクへ二分）。`#2bb9e1`水色→完全に捨てる**（青系=最大のSaaSトラップ）。

**シグナル役の厳格分離（論点3・確定）**:

| シグナル | 色 | 役割 | 面積 |
|---|---|---|---|
| lime | `#A9D159` | 証明・到達・肯定（花バッジ・達成数字の下線/8pxバンド・「いちばん選ばれています」） | 極小（点・面上の暗文字用） |
| deep-green | `#2F4A2C` | 面と主体性（主CTA見学・主声面・結論帯） | 中（面） |
| sign-red | `#E84336` | リスク・後出し費用・緊急・診断CTA | 極小（点） |
| LINE-green | `#06C755` | LINE CTAのみ（他用途禁止） | ボタンのみ |

**禁則（確定）**: limeとsign-redを同一視線範囲で競わせない（証明とリスクの意味が濁る）。lime・sign-redは**文字色に使わない**（lime面上は暗文字、赤文字が要るなら `sign-red-dark #8F211B`）。

**明度ウェーブ（暗→白→base→暗のリズム。暗面は希釈しないため4回限定＝S01/S05/S06/S12）**:

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
| 資金計画1,000件以上 | **S06のみ**（FinalCtaには置かない＝S12は数字ゼロ） | 資金不安の実績 |
| 京2,280万円〜 | S01/FV lead | 現実の総額の入口 |
| 月々返済 | **S05 climaxバーン**（payment軸＝別軸なので600の二度打ちにならない） | 自分ごと化 |
| お客様の声50組以上 | S09副 | 物語の母数 |

**画面端bleed・CLS規則**: bleedは**ink暗面のS03/S06でのみ**許可（白面はbleedしない・上品さ優先・理由コメント必須）。全バーンに `tabular-nums`、カンマも tabular で固定。CLS対策＝`nowrap`+`min-width`予約+`contain:layout`+`size-adjust`フォールバック。**Hero「2,280」とプラン価格2,480/2,280は役割分離**（Hero=総額の入口の象徴 / プラン=選択肢の比較）。同一価格数字を同一スケールで二度大型化しない。

**Heroバーンの注意**: 専務一押し・lime強調・「いちばん選ばれています」は**花2,480**。Heroバーンを京2,280にする場合、「安いから」でなく「土地込み総額がはじめに見える」フレーム（憲法A）であることをeyebrow/microで明示し、**花の主役性を侵さない**（プラン提示は花→風→京順・花バッジ厳守）。

### 3.5 :rootトークン（色・余白・モーション・確定値）／ 既存 globals.css `--color-*` との対応・統合

> **このリブートはトークンを「新規追加」しない方針。** 既存 `src/app/globals.css` の `@theme`（L19/L36–42 ほか）に**等価ロールが既にある**ため、本書 `:root` の `--ink`/`--deep-green`/`--sign-red`/`--lime`/`--line-green` 等は**既存 `--color-*` を正本値へ寄せて使う**か、**`--color-*` のエイリアスにする**。二重トークン層（`--color-*` 系と `--ink/--lime/...` 系が同一ページに別hexで同居）を作らない。

```css
:root {
  /* ── 色: ニュートラル面（--ink は --color-ink を正本値へ寄せて使う）── */
  --ink:#1D1D18; --ink-soft:#2A2823; --base:#F7F4EC; --ivory:#FBF8EE; --paper:#FFFFFF; --border:#DED8C8;
  /* ── 色: テキスト ── */
  --text:#1D1D18; --text-muted:#5E5A50; --text-inv:#FBF8EE;
  /* ── 色: シグナル（役割二分・確定。既存 --color-* と同値へ統合）── */
  --lime:#A9D159; --deep-green:#2F4A2C; --sign-red:#E84336; --sign-red-dark:#8F211B; --sign-red-soft:#FFF0EE;
  --gold:#9A7A3F; --line-green:#06C755;
  /* ── 派生（新色を増やさず混色で生成） ── */
  --base-tint:       color-mix(in srgb, var(--lime) 8%, var(--base));        /* 旧セージ#e0eedd翻訳 */
  --deep-green-deep: color-mix(in srgb, var(--deep-green) 78%, #000);        /* 旧--bp-green-deep */
  --deep-green-mid:  color-mix(in srgb, var(--deep-green) 55%, var(--base)); /* 旧--bp-green-mid */
  --deep-green-soft: color-mix(in srgb, var(--deep-green) 14%, var(--base)); /* 旧--bp-green-soft */
  /* ── 余白 ── */
  --space-xs:8px; --space-sm:16px; --space-md:24px; --space-lg:48px;
  --space-section:clamp(88px,8.4vw,144px); --space-section-tight:clamp(72px,7vw,120px);
  --space-climax:clamp(120px,11vw,180px); /* S05総額頂点 */ --gutter:clamp(20px,4vw,56px);
  /* ── duration / ease ── */
  --dur-fast:180ms; --dur-base:320ms; --dur-slow:620ms; --dur-burn:1100ms;
  --ease-out:cubic-bezier(0.22,1,0.36,1); --ease-burn:cubic-bezier(0.16,1,0.3,1);
}
.surface-ink{background:var(--ink);color:var(--text-inv)} .surface-base{background:var(--base);color:var(--text)}
.surface-ivory{background:var(--ivory);color:var(--text)} .surface-tint{background:var(--base-tint);color:var(--text)}
```

**確定トークン × 既存 globals.css `@theme` 供給元 対応表（新規追加でなく統合）**

| 確定トークン | 値（正本=BRAND-TRUTH §1） | 既存 globals.css の供給元 | 既存値 | 統合方針 |
|---|---|---|---|---|
| `--ink` | `#1D1D18` | **L36 `--color-ink`** | `#1D1D18` | **既存ありで正本一致。`--ink` を `--color-ink` のエイリアスにする**（`--ink: var(--color-ink)`）。追加不要 |
| `--text-muted` | `#5E5A50` | **L37 `--color-ink-muted`** | `#5E5A50` | 既存あり一致。`--text-muted: var(--color-ink-muted)` |
| `--deep-green` | `#2F4A2C` | `--color-green`/`--brand-green` 系 | 確認要（一致か否か実測） | 一致なら エイリアス。不一致なら**正本 `#2F4A2C` へ寄せて更新** |
| `--sign-red` | `#E84336` | **L38 `--color-risk`** | `#E84336` | **既存ありで一致。`--sign-red: var(--color-risk)`**。追加不要 |
| `--sign-red-dark` | `#8F211B` | **L39 `--color-risk-dark`** | `#8F211B` | **既存あり一致・追加不要**。`--sign-red-dark: var(--color-risk-dark)` |
| `--sign-red-soft` | `#FFF0EE` | **L40 `--color-risk-soft`** | `#FFF0EE` | **既存あり一致・追加不要**。`--sign-red-soft: var(--color-risk-soft)` |
| `--line-green` | `#06C755` | **L42 `--color-line`** | `#06C755` | **既存あり一致・追加不要**。`--line-green: var(--color-line)` |
| `--lime` | `#A9D159`（正本） | **L19 `--color-lime`（scale一式）** | **`#A2C523`（別緑・ドリフト中）** | **既存ありだが hexドリフト。正本 `#A9D159` へ統一**（§3.6・P0-2 参照）。新規追加でなく**値の是正** |

> 「新規追加」だった `sign-red-dark` / `sign-red-soft` / `line-green` / `lime` は**いずれも既存 `--color-*` に等価ロールが存在＝追加不要・統合へ訂正**。実装は新系統を新設せず、既存 `--color-*` を正本値に寄せ、本書 `--ink/--lime/...` 名はその**エイリアス**として定義する。

**既存 b-plan-v2 `P` パレット／`--bp-*` からの差分表（置換実値・正本=BRAND-TRUTH §1）** — 対象: `const P`（L45-55）/ `--bp-*`（L6570-6578）/ footer `#11110f`（L961）。

| 現キー / 変数 | 現値（迷子） | → 確定値（正本） | 確定トークン | 理由 |
|---|---|---|---|---|
| `P.ink` | `#181714` | **`#1D1D18`** | `--ink`（=`--color-ink`） | 論点1: 温黒へ統一 |
| `--bp-bg-ink` | `#181714` | **`#1D1D18`** | `--ink` | 黒面の単一値化 |
| footer `bg-[#11110f]` | `#11110f` | **`#1D1D18`** | `--ink` | 黒面を ink 一本化 |
| `P.green` | `#195842` | **`#2F4A2C`** | `--deep-green` | §1と不一致→正本へ |
| `--bp-green` | `#195842` | **`#2F4A2C`** | `--deep-green` | 同上 |
| `--bp-green-deep` | `#123d2e` | **`color-mix(deep-green 78%,#000)`** | `--deep-green-deep` | 暗段差を派生で生成 |
| **`--bp-green-mid`** | **`#3f7d63`** | **`color-mix(deep-green 55%,base)`** | **`--deep-green-mid`** | **中間トーンも派生化（page.tsx内1箇所使用・残置せず畳む）** |
| `--bp-green-soft` | `#cfe0d4` | **`color-mix(deep-green 14%,base)`** | `--deep-green-soft` | 諸費用チップ面・派生化 |
| `P.red` | `#ea4b2a` | **`#E84336`** | `--sign-red`（=`--color-risk`） | sign-red 正本へ（点用） |
| `P.white` / `--bp-bg-white` | `#fffdfa` | **`#FBF8EE`** | `--ivory` | surface を ivory 正本へ |
| `P.paper` / `--bp-bg-paper` | `#f4efe6` | **`#F7F4EC`** | `--base` | 地を base 正本へ |
| `--bp-bg-smoke` / `P.smoke` | `#ece6db` | **`color-mix(border 60%,base)`** | `--border` 派生 | 中間グレーは border から派生 |
| `P.line` | `rgba(24,23,20,0.16)` | **`rgba(29,29,24,0.16)`** | （ink基準の罫） | ink 値に追従 |
| `P.mute` | `#716b61` | **`#5E5A50`** | `--text-muted`（=`--color-ink-muted`） | サブテキスト正本へ |
| `P.rust` | `#8a5232` | **`#9A7A3F`** | `--gold` | 装飾アクセントを gold へ（rust退場） |
| lime 利用箇所（`bg-lime`/`text-lime-*`） | `--color-lime=#A2C523` | **`#A9D159`** | `--lime`（`--color-lime`更新） | **既存あり・ドリフト是正**（§3.6）。追加でなく統一 |

実装時は `const P` を確定トークン参照へ置換（例 `ink:"var(--ink)"`）し、`--bp-*` は `--ink`/`--deep-green` 等のエイリアスにする。**本リブートでは新トークン追加は原則なし**（既存 `--color-*` への統合）。lime の hex 更新（`#A2C523→#A9D159`）と scale 再算出はコミットメッセージに明記（BRAND-TRUTH §8 チェックリスト準拠）。

### 3.6 Tailwind ユーティリティ対応表（フォント命名一意化・lime hex統一）

Tailwind v4 `@theme`（`src/app/globals.css` L3-）が `--font-*`/`--color-*` から `font-*`/`bg-*`・`text-*` ユーティリティを自動生成する。

**フォント（主見出し用ユーティリティ名は `font-zen-kaku-new` に一意確定）**: `--font-zen-kaku-new` を新設する。既存 `--font-money`（同じ Zen Kaku Gothic New を `/money` 用に別名保持）とは**命名分離**し、**`--font-money` を流用しない**（流用すると `/money` 専用の意味が TOP に混入し、片方の用途変更がもう片方を巻き込む事故になる）。

| 望むクラス | `@theme` 変数 ← 供給元 | 現状 | 実装アクション |
|---|---|---|---|
| `font-zen-kaku-new` | `--font-zen-kaku-new: var(--font-zen-kaku-new-var), "Zen Kaku Gothic New", "Hiragino Sans", "Yu Gothic", sans-serif;` | **未定義**（`--font-money` が同値を別名保持） | **新設**。`@theme` に1行追加（`--font-money` の隣・命名分離・`--font-money` は流用しない） |
| `font-murecho` | `--font-murecho` ← `var(--font-murecho-var)` | 定義済（globals L92） | そのまま使用 |
| `font-oswald` | `--font-oswald` ← `var(--font-oswald-var)` | 定義済（globals L89） | そのまま使用 |
| `font-inter` | `--font-inter` ← `var(--font-inter-var)` | 定義済（globals L87） | そのまま使用 |

`@theme` に追加する1行（`--font-money` の隣）:
```css
  /* TOPリブート主見出し（カタログ太角ゴシック）。/money 互換の --font-money とは命名分離・流用しない */
  --font-zen-kaku-new: var(--font-zen-kaku-new-var), "Zen Kaku Gothic New", "Hiragino Sans", "Yu Gothic", sans-serif;
```

**lime の hex 二重化是正（blocker・確定）**: globals.css **L19 `--color-lime` の実働値は `#A2C523`**（別の緑）で、Tailwind の `bg-lime`/`text-lime-*` を生成し **`FloatingCta`（`bg-lime text-lime-darker`）・`PriceSection` 等が実際にこれで描画**している。BRAND-TRUTH §1 `--brand-lime` は **`#A9D159`**。両者が同一ページに同居している＝**ドリフト中**。

- 正本は **`#A9D159`**。**`--color-lime` を `#A9D159` へ更新**し、依存する lime scale（`hover`/`deep`/`darker`/`light` 等）を**再算出**する。
- `bg-lime`/`text-lime-darker` を使う**全箇所（FloatingCta・PriceSection ほか）のコントラストを再実測**（特に lime面上の暗文字・`text-lime-darker`）。
- 「現実装に lime 不在→追加」は**事実誤認のため削除**。lime は**既にあり、値がドリフトしている**のが実態。

**layout.tsx 既ロード確認（実測済み 2026-06-25）**

| フォント | 変数 | ロード | weight配列 | 判定 |
|---|---|---|---|---|
| Zen Kaku Gothic New | `--font-zen-kaku-new-var` | ✅ L118-123 | `["400","500","700","900"]` | **800が無い → P0で`"800"`追加必須** |
| Murecho | `--font-murecho-var` | ✅ L103-108 | `["300","400","500","700"]` | OK |
| Oswald | `--font-oswald-var` | ✅ L85-90 | `["300","400","500","600","700"]` | OK（600/700充足） |
| Inter | `--font-inter-var` | ✅ L92-97 | `["300","400","500","600"]` | OK（600充足） |

> 結論: 4書体すべてロード済・`<html className>`に variable 連結済（L155）。**`--font-money` は在るが `--font-zen-kaku-new` は不在**（実測どおり）。**追加が要るのは (1) Zen Kaku Gothic New の weight 800、(2) `@theme` への `--font-zen-kaku-new` 1行新設のみ**。

**既存実装との整合**: 現実装 P の `green:#195842 / red:#ea4b2a` は **BRAND-TRUTH §1（#2F4A2C/#E84336）と不一致。正本は §1。** リブートで §1 へ統一し、統一後hexでコントラスト実測。既存 `--brand-*` はエイリアス残置（`--brand-text: var(--ink)` 等）。

---

## 4. モーション＆インタラクション仕様

### 4.1 モーション憲法（5条）

1. **静的構図で成立（grey-box動的版）**: JS無効・reduced-motion・初回ペイントの全状態で、アニメ抜きでもレイアウト・読解・CTA到達が成立。canonical数値・確定コピーは**SSR HTMLに実数で入る**。
2. **叫ぶのは1〜2回**: 注意奪取（カウントアップ＝バーン演出）は**最大2箇所**（M4 TrustStripバーン600・M16 S05月々）。それ以外は気づかれない到着reveal。
3. **transform/opacityのみ**（60fps/CLS=0）。レイアウト誘発プロパティのアニメ禁止。例外: 比較バーは `transform:scaleX(0→1)+transform-origin:left`（width直アニメ禁止）、FAQは `grid-template-rows`。
4. **reduced-motion完全対応**: 全アニメを最終状態で即表示。カウントアップ即target、マーキー停止。「劣化版」でなく「正規の到達状態」。
5. **SaaS蛍光トラップ禁止**: グロー・ネオン・パルス発光・蛍光トレイル一切なし。`#8DF701`は色・挙動とも輸入しない。移動量・到着・大きさで引く。

### 4.2 対象別モーション一覧（確定値）

| # | 対象 | 挙動 | 移動量 | 時間 | イージング | 発火 | 叫ぶ? |
|---|---|---|---|---|---|---|---|
| M1 | Hero h1/lead | fade+translateY | Y+12→0 | 600ms | `(.16,1,.3,1)` | mount+60ms | 否 |
| M3 | Hero背景写真（帯/背景のみ） | Ken Burns微 | scale1→1.06 | 18–28s loop | `(.22,1,.36,1)` | mount | 否 |
| M4 | TrustStripバーン600 | **カウントアップ**+fade-up | Y+8→0 | 1400–1600ms | easeOutCubic | IO≥0.4/once | **YES①** |
| M6 | Price 3カード | reveal stagger | Y+16→0 | 760ms | `(.16,1,.3,1)` | IO once/120ms間隔 | 否 |
| M7 | 花バッジ | fade-in（パルス/発光禁止） | 0 | 500ms | ease-out | M6+300ms | 否 |
| M9 | コスト3事実 | row順次reveal | Y+20→0 | 760ms | `(.2,.82,.18,1)` | IO once/140ms | 否 |
| M10 | 比較バー | **scaleX伸長**（width直禁止） | scaleX0→1 | 980ms | `(.2,.82,.18,1)` | IO once | 否 |
| M12 | 写真マーキー | 無限横スクロール | translateX | **PC36s/SP44s** linear | linear | mount/hover停止/reduced静止 | 否 |
| M15 | FAQアコーディオン | grid-rows展開+chevron回転 | §4.4 | 250–350ms | ease-out | click/Enter/Space | 否 |
| M16 | S05月々 | **カウントアップ** | Y+8→0 | 1400ms | easeOutCubic | IO≥0.4/once | **YES②** |
| M17 | CTA hover | bg/矢印微 | X+4px（矢印のみ） | 180–240ms | ease | hover/focus-visible | 否 |

**叫ぶ箇所の確定**: カウントアップは **M4とM16の2箇所のみ**。M4で600/14/1,000/50を出したら他セクションで同4数字を再カウントアップ禁止。M16は「月々」（別軸）なので二度打ちにならない。同一ビューポートに2カウントアップを同時発火しない。**価格（2,480/2,280）はカウントアップしない**（静止で正確に。花2,480/風2,480/京2,280はモデル別に正しく割当）。

### 4.3 写真マーキー（M12・純CSS実装・速度一意確定）

Swiper不要・純CSS（依存削減・60fps）。3セット複製・`translateX(-33.333%)`・`aspect-ratio`固定でCLS=0。**速度は PC36s基準 / SP44s に一意確定**（S07分譲地・S09事例とも同値。逆方向で単調回避は可）。`:hover`/`:focus-within`で停止。reduced-motionで `animation:none`+`overflow-x:auto`（手動閲覧）。**スタッフ写真は役職でサイズ差/特別扱いの動きを付けない**（平等原則）。

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

`<button aria-expanded aria-controls>`、回答 `role="region"`。最小高48px。`grid-template-rows:0fr→1fr`（width/height直アニメ回避）、chevron `rotate(0→180deg)`、発光/バウンス禁止。最重要1問は初期open。

```css
.ymt-faq__q{display:flex;align-items:center;justify-content:space-between;gap:16px;width:100%;min-height:48px;padding:16px 0;text-align:left;background:none;border:none;cursor:pointer}
.ymt-faq__q:focus-visible{outline:2px solid var(--deep-green);outline-offset:4px}
.ymt-faq__chevron{transition:transform 250ms cubic-bezier(.16,1,.3,1)}
.ymt-faq__q[aria-expanded="true"] .ymt-faq__chevron{transform:rotate(180deg)}
.ymt-faq__panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows 300ms cubic-bezier(.16,1,.3,1)}
.ymt-faq__panel[data-open="true"]{grid-template-rows:1fr}.ymt-faq__panel>div{overflow:hidden}
@media (prefers-reduced-motion:reduce){.ymt-faq__chevron,.ymt-faq__panel{transition:none}}
```

### 4.5 reveal の JS無効フォールバック（検証blocker是正・確定）

**実機確認した事実**: `globals.css` の `prefers-reduced-motion` ブロックは **L188 / L388 / L439 / L681 / L733 に分散**。`.scroll-in` 本体（L157）は `opacity:0;transform:translateY(24px)` をCSS無条件ベタ書きし、`is-visible` 付与はJS（IO）のみ。

- **L188** は `.scroll-in { transition:none }` のみで `opacity:0/transform` を**解除しない**。
- ただし **L733-742** の reduced-motion ブロックが `.scroll-in { opacity:1; transform:none }` を**明示的に解除済み**。→ **reduced-motion環境では canonical本文は消えない**（過剰主張の取り下げ）。
- **実際に残る穴は JS無効（`scripting:none`）のケースのみ**（土台フレームワーク §11.1-C2 もblocker根拠を「JS無効時」に限定）。

主たる是正は **`@media(scripting:none)` フォールバック追加**:

```css
/* JS無効フォールバック（必須・主たる是正） */
@media (scripting: none){ .scroll-in,[data-reveal]{opacity:1;transform:none} }
```

**より構造的な是正（推奨）**: 現状は L157 が無条件で `opacity:0` を**hydration前に焼く**ため、JS無効では恒久的に消える。これを**「初期可視＋IOで隠す」方式へ寄せる**と穴が構造的に消える — 初期HTMLは可視がデフォルトとし、hydration後にJSが付与する `.reveal-armed` を持つ要素だけ `opacity:0` にして IO で現す。これにより `scripting:none` フォールバックに依存せずとも JS無効で本文が常に可視になる。

### 4.6 reduced-motion グローバル安全網（冗長だが無害として残置可）

```css
@media (prefers-reduced-motion:reduce){
  .ymt-marquee__track,.hero-ken-burns,.hero-zoom,.gallery-marquee-left,.gallery-marquee-right{animation:none!important}
  .scroll-in,[data-reveal]{opacity:1!important;transform:none!important;transition:none!important}
  [data-parallax]{transform:none!important}
}
```

> L733-742 が `.scroll-in` のopacity/transformを既に解除済みのため、上記 `!important` 追記は**冗長だが無害**。**写真マーキー・カウントアップ即値・Lenis慣性停止・scroll-revealの新規アニメ**については既存ブロックにないため**新規追加が必要**。カウントアップは reduced-motion時に最終値即表示（0/空欄固定禁止）。

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

**信頼アンカーの配置原則**: A1顔/A2不都合開示/A3声の実名性は**欲求ピーク（S05）の前に厚く置く**。信頼が立つ前に欲求を煽ると住宅商材では逆効果。③信頼（S03-S06）を固めてから④欲求ピークへ。**補助の数字（600/14/1,000/50）はS03で1回・以後再掲しない**。

**投資哲学エッセンス温存（専務④）**: S05総額・月々（住宅ローン文脈）またはS08サブコラムに「資産として残る/低金利・長期借入を賢く使う」エッセンスを常設1枠。**NISA直接比喩は避ける**。表現層刷新で投資哲学を半殺しにしない。

### 5.2 自分ごと化の扱い（論点6・確定＝承認後追加）

現行クライマックスが「他人A/B/Cさんの月々」で自分ごと化しない問題への処方として、診断UI（タイプ別2-3問）＋ミニ総額入力（年収/エリア/プラン→月々概算即時表示）が心理上は有効。ただしこれは**確定資産にない新規インタラクティブ機能**であり、表現層の範囲を超える。

> **【確定: 承認後追加・初期は枠のみ】**: 診断UI・即時概算ツールは**初期実装に含めない**。LIFULL家賃計算の型は「参考のみ・やまと固有化要承認」が既存方針（reference_lifull_quiz_lp_format）。**実装者は確定実装と誤認しない**。初期は**「枠（データスロット）」だけ設計**し、当面のクライマックスは「現行3事例（A/B/C）の証拠 + クライマックス直後の S05末LINE反復CTAで**自分の総額へ即接続**」を確定スコープとする。中身は専務承認後に追加。

倫理ガード: 概算を作る場合も「目安」明示＋試算条件注記（金利1.0%/35年/元利均等/ボーナスなし）。「あなたは損している」等の煽り演出禁止。偽の残数・偽カウントダウン禁止（ダークパターン）。

### 5.3 リブート前後スコア目標

①反射15→22+（ゴシック・S03バーン）/ ②関連20→30+（共感前出し・S07土地）/ **③信頼17→25+（顔復帰・不都合開示格上げ・声実名性）** / ④欲求25→33+（S05クライマックス・S10誇れる写真）/ ⑤決断10→16+（送信後開示・摩擦除去・CTA2段）。判定は公開後のCTAクリック・スクロール深度・問い合わせ内容で（好みで判断しない）。

---

## 6. コピー文法＆CTA

**移植の合言葉**: 「文言は触らない。タイポの役を組み替える」。確定コピーの一字も変えず、どの語をdisplay/h2/eyebrow/microのどの役で大型化・配置するかだけを決める。

### 6.1 確定コピー vs 新規コピーの分離（0ベース禁止）

- **確定コピー（不変・改変禁止）**: BRAND-TRUTH §6 Hero（h1「奈良・京都南部で、土地から考える家づくり。」/ lead「京モデル 2,280万円〜。」/ sub「土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。」）、お客様の声原文、代表メッセージ、costテーブル文言。
- **中心概念（出典＝BPLAN/bplan-diagnosis、BRAND-TRUTHではない）**: 「大手の理想を、現実の総額に。」「憧れを現実にできる形へ」「妥協ではなく誇れる選択」。**FVに採るなら先に §6 を更新してから実装**（ゲートB）。
- **新規CTA/ボタン文言（要copywriter＋専務確認＋natural-japanese検査）**: 「土地込み総額を出す」「標準仕様を実物で見る」等。default は canonical「LINEで相談」「モデルハウスを見学する」。新規は §5 へ正式追加してから採用。
- **摩擦除去マイクロコピーも新規コピー扱い**（「予算未定OK」「目安はおよそ60分です」等＝事実上の新規文言）→ 同じ3点ゲートの対象。

### 6.2 配置方針（セクション別・タイポ役の組み替え）

- **S01 Hero**: §6確定h1を `t-display`（太角ゴシック・ゲートA後）。lead/subは `t-lead`/`t-body`。京2,280は `t-burn-sub`（バーン1発目・Oswald600）。注記「※一部登記費用などは別途発生します」は `t-small`。
- **S03 TrustLedger**: 600棟を `t-burn`主役級。14年/1,000件/50組/保証は `t-h3`数字＋注で**明確に小さく**（二度打ち回避）。「600棟＝600家族の判断に立ち会ってきた」を `t-lead` で意味翻訳。
- **S05 PaymentCases**: 月々を `t-burn`カウントアップ。試算前提注記を `t-small`（金利1.0%/35年/ボーナスなし明示維持）。
- **S06 Cost Logic**: answer列を `t-h3` で太く（結論語＝視線停止点。xmobile緑2rem結論数字の役をdeep-green/sign-redの**色面**で代替・蛍光禁止）。
- **明朝の居場所**: **TOP主見出しから完全撤去確定**。理念「憧れを現実にできる形へ」の縦組み1点は将来オプション・初期実装に入れない。縦書き本文は3行以上禁止。

### 6.3 CTAボタン文言＆不安解消マイクロコピー

CTA階層（不変）: **Primary LINE > Secondary 見学 > Tertiary 資料 > 電話(footer/contactのみ)**。CTAは「答え」を約束（曖昧な相談でなく総額/月々）。`LINE_ADD_FRIEND_URL` を `src/data/line.ts` からimport（ハードコード禁止）。

| 階層 | 色 | canonical default | 強化案（要承認） |
|---|---|---|---|
| Primary | LINE-green #06C755 | **LINEで相談** | 土地込み総額を出す▲ |
| Secondary | deep-green #2F4A2C | **モデルハウスを見学する** | 標準仕様を実物で見る▲ |
| Tertiary | quiet outlined | 資料請求 | — |
| 電話 | deep-green | 電話で相談 | 9:00〜19:00 / 火・水定休 |

**摩擦除去マイクロコピー（やまと版・憲法準拠の語尾。すべて§6.1新規コピー扱い＝要copywriter＋natural-japanese＋専務確認）**: 相談は無料です／まだ土地がなくても大丈夫です／予算が固まっていなくても大丈夫です／**こちらから営業のお電話はしません**（「一切しません」は過剰断定回避）／オンラインでもご相談いただけます／ご予約なしでも見学できます／お子様連れでお越しいただけます／**目安はおよそ60分です**。配置はCTA直上/直下8-16px、caption・muted色、文脈で2-3点ずつ（全部毎回並べない）。

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

**禁止**: 価格・棟数・見出し・FAQをSVG画像文字で焼く（xmobileのSVG統計の真似はNG。やまpadはHTMLで）。

---

## 7. レスポンシブ＆A11y＆Perf＆SEO

### 7.1 SP分解表（PC要素→SP表現・単純縮小しない）

SP↔PC境界は **`768px`(`md`) を分解の正本**。各PC要素は構造ごと差し替える。

| PC要素 | PC | SP(<768) | 不変条件 |
|---|---|---|---|
| 比較表（非対称） | 左右2列対比 | **2カード縦積み**（一般上→やまと下）。色だけに頼らずアイコン+ラベル併記 | 「安い」と読ませない。やまとカード大型OK（商品比較・平等対象外） |
| フロー（横5段） | 横一列+コネクタ | **縦タイムライン**（番号+縦ライン+ノード） | 1段44px以上。番号Oswaldは巨大化しない |
| 縦書き長文 | 撤去（TOP主見出し） | **`md:`でSPは横書きデフォルト**。3行以上の縦書き本文禁止 | 縦書きでも読み上げ・選択・翻訳が機能（実テキスト・画像化禁止） |
| 巨大数字+本文 | 左右/重なり一体 | **上下完全分離**（数字→本文）。`order`不使用でDOM順=読み上げ順 | バーン局在・測定条件+時点付与 |
| 3つの円（3事実） | 横3つ均等 | **縦3段既定**（横スクロールは冗長時のみ・2.2枚見え+ヒント） | 3事実は全部読ませる→縦推奨 |
| 写真マーキー | 4-5枚見え | 1.5-2.2枚・SP44s・reduced-motion静止 | 実写真のみ・alt必須・FV主役NG |

### 7.2 A11yチェックリスト

```
[ ] 色だけで意味を伝えない（比較表○×にアイコン+テキストラベル併記）
[ ] 本文4.5:1/大文字3:1 実測: muted#5E5A50 on base / 白 on LINE-green#06C755 / lime面上は暗文字 は要実測
[ ] lime hex統一後（#A9D159）に bg-lime/text-lime-darker 利用箇所（FloatingCta/PriceSection）のコントラスト再実測
[ ] sign-redは本文文字に使わず面/罫/見出し、赤文字はsign-red-dark#8F211B
[ ] FAQ: <button> aria-expanded/aria-controls、回答role="region"、最大の不安は展開済み露出
[ ] 全タップ44×44px以上（SP固定CTA h64適合）
[ ] 縦書きはHTML実テキスト・DOM順論理・SPで横書き復帰・200%ズーム溢れなし
[ ] 写真alt（施工事例/分譲地/スタッフ内容記述、装飾帯はalt=""、感情断定alt禁止）
[ ] :focus-visible 2pxリング+offset（outline:none単独禁止）、Tab順=視覚順=DOM順
[ ] prefers-reduced-motion: マーキー/カウントアップ/blueprint-drift/scroll-reveal/Lenis慣性 全停止
[ ] カウントアップ reduced時は最終値即表示（0/空欄固定しない）
[ ] JS無効(scripting:none)でcanonical本文（価格/声/メカニズム）が可視（@media scripting:none フォールバック or 初期可視+IO方式）
[ ] lang="ja"・h1は1つ・見出しレベル飛ばさない・装飾SVGはaria-hidden
```

### 7.3 SP下部固定CTAバー（3分割・全サイト標準確定＝論点7）

**実体を一意確定**: `b-plan-v2` L968 の**インライン3分割（電話/総額(LINE)/見学・h-16=64px）を `FloatingCta` コンポーネントへ抽出**し、**下層7ページ（sell/lots/works/voice/money/staff/standard）もそれを import** する。インライン版とコンポーネント版の二重実装を残さない。現状の下層2ボタン版 `FloatingCta`（`MessageCircle`「LINEで総額診断」/`Calendar`「見学予約」・`min-h-[48px]`・**safe-area無し・body padding無し**・「総額診断」は非canonical新規文字列）を3分割版へ統一改修する。**抽出後に b-plan-v2 のインライン版を必ず削除し import へ一本化**（二重実装の再発防止）。

```css
.sp-fixed-cta{position:fixed;inset-inline:0;bottom:0;z-index:50;padding-bottom:env(safe-area-inset-bottom,0px);border-top:1px solid var(--border);background:#fff}
.sp-fixed-cta a,.sp-fixed-cta button{min-height:64px}
/* body下部に固定CTA分のpadding（md:hidden文脈）: calc(64px + env(safe-area-inset-bottom)) ＝現状欠落・必ず追加 */
```

`md:hidden`（<768表示）。中央=総額(LINE-green)を最強調。viewport meta に `viewport-fit=cover`。電話は `tel:0742361123`（BRAND-TRUTH §3）。LINEは `LINE_ADD_FRIEND_URL` import（ラベルはdefault canonical「LINEで相談」）。出現は `scrollY>400`、**Hero内は非表示**（Hero CTA最大2と二重化回避）。FAQ展開中/フォーム入力中は非干渉。reduced-motionで出現フェード無効。

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

## S. S01–S12 セクション・ビルドカード（新章）

各カード共通の確定トークンは §3（`.t-*`/`:root`）を参照。出典優先: BRAND-TRUTH ＞ DESIGN_GUARDRAILS ＞ docs/project-context/。SP=12本（S04→S05へ視覚統合）＋固定CTAバー3分割。**スクショ確定ディテール（旧§11.2）は各カード説明へ織り込み済み。**

**P0で先に通す技術ゲート（全カードの前提）**: ①ゲートA（タイポ転換＋神野さんsign-off。承認前は主見出しZen Old Mincho継続）②ゲートB（Heroコピー出典）③C1 ink統一（`P.ink=#181714`/`--bp-bg-ink`/footer`#11110f`→`#1D1D18`＝`--color-ink`）④**weight 800 追加**（layout.tsx）＋**`--font-zen-kaku-new` 新設**＋**lime hex統一（`--color-lime`→`#A9D159`・scale再算出）**⑤C2 reveal安全網（`@media(scripting:none)`＋初期可視+IO方式・JS無効でcanonical本文が消えない／reduced-motionはL733-742で解除済）⑥SP固定CTA safe-area+body padding＋インライン版を`FloatingCta`へ抽出・import一本化。

### S01 — Hero｜状況提示＋中心概念
- **役割/段**: 状況提示＋中心概念。段=1。心の段=①反射。主タイプ=全（特T4）。
- **主役要素**: `t-display`（h1・ゲートA後）／ink地に paper白抜き＋lime下線（点）／`surface-ink`（動画overlay）。物件写真は背景帯のみ（専務①）。数字は**京2,280の1発のみ**（実績4数字レールは置かない＝S03へ集約）。
- **モーション**: M1 h1/lead fade+translateY（Y+12→0/600ms/ease-burn/mount+60ms）。M3 背景帯のみKen Burns（scale1→1.06/18–28s/ease-out）。**カウントアップ無し。**
- **コピー配置**: h1「奈良・京都南部で、土地から考える家づくり。」→`t-display`（§6確定・1字も変えない）／lead「京モデル 2,280万円〜。」→和文Murecho500、数字「2,280」のみ`t-burn-sub`／sub→`t-body`／注記「※一部登記費用などは別途発生します」→`t-small`。〔新規フラグ〕中心概念「大手の理想を、現実の総額に。」FV採用は**先にBRAND-TRUTH §6更新（ゲートB）してから**。初期は§6確定コピーで実装。
- **CTA**: あり・**最大2**。P=「LINEで相談」（line-green）／S=「土地から相談」系（deep-green）。資料請求をHeroのprimaryにしない。
- **使う/作る**: 再利用=`useScrollIn`。新規=`HeroReboot`（ink背景＋動画overlay＋確定コピー組み）。FloatingCtaはHero内非表示。
- **受け入れ基準**: ①JS無効/reduced-motionでも h1/lead/sub/2,280/CTA2本がSSR実数で可視 ②Hero内に実績4数字レールが無い ③物件写真が主役化していない（背景帯のみ）④CTA2本以内・LINE_ADD_FRIEND_URLをimport ⑤主見出しが明朝でない（ゲートA後）。

### S02 — 敵＝不透明な総額｜共感
- **役割/段**: 敵の名指し（競合でなく「後出し費用・建物価格だけの判断」）。段=1。共感を2番手へ前出し。心の段=②関連性。主タイプ=T1/T3/T4。
- **主役要素**: `t-h2`（敵の名指し）＋`t-body`。敵側にsign-red点。`surface-base`（記事化・休止）。疑問形/感情断定NG。
- **モーション**: row順次reveal（Y+16→0/760ms/ease-burn/IO once/120–140ms stagger）。叫ばない。
- **コピー配置**: 敵の正体＝「広告費・展示場の維持費・仲介マージン」「家の原価に含まれない販売運営のための費用」（憲法4.2具体核・抽象化禁止）→`t-body`。感情断定NG。〔新規フラグ〕状況提示コピーはcopywriter＋natural-japanese後。
- **CTA**: なし（直後に[CTA-1]）。**使う/作る**: 新規=`EnemyList`（敵を3–5列・sign-red点）。
- **受け入れ基準**: ①敵が「後出し費用/建物価格だけの判断」で名指し競合・過剰断定なし ②感情断定コピーなし ③sign-redが点のみ（面塗り/文字色でない）④記事化の白休止が成立。

**[CTA-1] 反復CTAマスター（S02直後）**: ink地・摩擦除去マイクロコピー常設・LINE主1副1。新規=`RepeatCtaBlock`（[CTA-1]/[CTA-2]/S12共用）。〔新規フラグ〕摩擦除去マイクロコピーは新規コピー扱い（要copywriter＋natural-japanese＋専務確認）。

### S03 — 権威バーン｜数字1発主役級
- **役割/段**: 会社の体力・規模を1発で。段=2。**s08巨大実績127px型の唯一の発火点。** 心の段=①→③。主タイプ=T2/T1。
- **主役要素**: 引渡し600棟以上を`t-burn`主役級。14年/1,000件/50組/保証20・10年は`t-burn-sub`/`t-h3`で**明確に小さく従える**。バーン=ink（or paper白抜き）／lime点。`surface-ivory` or `surface-ink`。
- **スクショ確定ディテール（織り込み）**: 「数字バーンが画面を支配・signal-greenは数字/帯のみ」→600棟をバーン主役、緑は lime点/deep-green面で視線停止点のみ（面塗り禁止）。
- **モーション**: **M4 600＝カウントアップ＋fade-up（Y+8→0/1400–1600ms/easeOutCubic/IO≥0.4 once）＝叫ぶ①。** 同一ビューで2カウントアップ同時発火しない。bleedはink暗面でのみ許可。
- **コピー配置**: 「600棟＝600家族の判断に立ち会ってきた」を`t-lead`で意味翻訳。測定条件付き「600棟以上（2011創業〜2026時点・累計）」。
- **CTA**: 反復CTA1本（主LINE）。**使う/作る**: 再利用=`useCountUp(600,{duration:1600})`/`AnimatedNumber`/`.t-burn`。新規=`TrustLedger`（バーン600＋従属数字＋代表2名アンカー）。
- **信頼アンカーA1同居**: 代表2名完全同格・宅建番号「国土交通大臣(1)第10516号」・公式メッセージ原文厳守。④欲求ピーク前に厚く。下層=`/staff`。
- **受け入れ基準**: ①600のカウントアップが1回だけ（M4）で、以後600/14/1,000/50を再カウントアップしない ②14/1,000/50がバーンに対し明確に小さい ③reduced-motionで最終値即表示 ④代表2名が同格・原文。

### S04 — やまとの逆転（前段）
- **役割/段**: ③土地込み総額を先に（宣言）。段=3。**SPはS05先頭へ視覚統合（独立セクションにしない・12本化）。** 心の段=④助走。主タイプ=T1/T3。
- **主役要素**: `t-h2`（逆転宣言）＋deep-green下線（点）。`surface-base`（黒地頂点S05への明度コントラスト準備）。「建物価格だけ」vs「土地込み総額」の対比1枚。
- **スクショ確定ディテール（織り込み）**: **相互証明矢印**＝「総額」↔「月々」/「土地」↔「建物」を**S04→S05接合の導入図**に（蛍光なし・deep-green/lime点）。
- **モーション**: fade+translateY（Y+12→0/600ms/ease-burn/IO once）。叫ばない。**CTA**: なし。**使う/作る**: 新規=`ReversalBridge`（対比1枚＋相互証明矢印）。SP実装ではS05導入ブロックとしてマウント。
- **受け入れ基準**: ①SPで独立セクションを増やさずS05先頭に統合・SP総数12本以内 ②相互証明矢印が蛍光でなくink/deep-green ③白→黒の明度コントラスト助走が成立。

### S05 — ★総額・月々｜クライマックス（厚く）
- **役割/段**: ③数字→月々の意味へ翻訳。段=**頂点**。心の最深部④欲求ピーク。主タイプ=T3（主）/T1/T5。
- **主役要素**: Case月々を`t-burn`巨大カウントアップ＋`t-h3`結論語。**ink黒地＋deep-green結論帯で「月々◯円」を視線停止点。** lime/sign-redは同視線で競わせない。`surface-ink`（4回限定の1つ）。土地込み総額＋月々。**投資哲学エッセンス常設枠（専務④）。**
- **スクショ確定ディテール（織り込み）**: ①**運用事実deep-green帯**（虚偽煽り禁止）＝「今月の見学枠 残◯」「未公開土地 ◯区画 動きあり」等の事実スロットを[CTA-2]直後に。②相互証明矢印（S04から接合）。③ink面＋paper白抜き。
- **モーション**: **M16 月々＝カウントアップ（Y+8→0/1400ms/easeOutCubic/IO≥0.4 once）＝叫ぶ②。** 価格2,480/2,280はカウントアップしない（静止で正確に）。deep-green結論帯fade（発光禁止）。
- **コピー配置**: 月々→`t-burn`カウントアップ／試算前提注記「金利1.0%・35年・元利均等・ボーナスなし」→`t-small`（必須）。投資哲学エッセンス→`t-lead`（NISA直接比喩は避ける）。〔新規フラグ〕概算入力ツールは**承認後・初期は枠（データスロット）だけ**。当面は3事例＋S05末LINE反復で自分の総額へ接続。
- **CTA**: **反復CTA[CTA-2]＝クライマックス直後＝最強発火点。** 「LINEで土地込み総額を出す▲」／default canonical「LINEで相談」。摩擦除去「予算未定OK・土地なしOK・約60分」（〔新規フラグ〕）。
- **使う/作る**: 再利用=`useCountUp`（月々）/`AnimatedNumber`/`RepeatCtaBlock`/`.t-burn`。新規=`PaymentClimax`（ink地・総額/月々解放・投資エッセンス枠・運用事実deep-green帯・概算データスロット〔空き枠〕）。下層=`/money#payment-examples`。
- **受け入れ基準**: ①ink#1D1D18地で月々がカウントアップ（叫ぶ②）し価格2,480/2,280は静止 ②試算前提注記が常設・煽り無し・偽の残数/カウントダウン無し ③投資哲学エッセンス枠が存在しNISA直接比喩なし ④[CTA-2]がクライマックス直後に1本 ⑤概算入力は「枠」のみで未実装 ⑥SPでS04が先頭に統合。

### S06 — 価格メカニズム3事実
- **役割/段**: ②なぜできるか（抽象化禁止）。段=4。`surface-ink`（4回限定の1つ）。心の段=③→④。主タイプ=T1/T5。不都合開示A2を主役級へ格上げ。
- **主役要素**: answer列を`t-h3`で太く（結論=視線停止点）。他社=sign-red面／やまと=deep-green面（色面で代替・蛍光禁止）。①自社分譲地モデルハウス二重利用（最大の差別化）②自社一貫体制・中間マージンなし③広告費必要最小限。**内訳%は出さない。**
- **スクショ確定ディテール（織り込み）**: ①**3根拠ピラミッド図**＝土台に①二重利用、上に②自社一貫 ③広告費最小限＝S06の主図。②**価値3円図**（deep-green円）＝「大手と同品質の素材・装備／土地込み総額が見える／建てた後も近くで支える」を**S06末に確定配置**（S08前には置かない）。
- **モーション**: M9 row順次reveal（Y+20→0/760ms/IO once/140ms stagger）。M10 比較バー=**scaleX0→1**（width直アニメ禁止/980ms）。叫ばない。
- **コピー配置**: つなぎ融資「原則発生しない」（30〜80万円Saved併記）／地盤改良費「一切かかりません」＝**この2つだけ断定OK**（憲法例外）。「安い」否定→「他社が無駄を乗せている」フレーム（憲法4.1）。
- **CTA**: なし。**使う/作る**: 新規=`CostMechanism`（3事実）/`AsymmetricCompare`（他社red/やまとgreen・scaleX）/`SupportPyramid`（3根拠ピラミッド）/`ValueCircles`（価値3円・S06末）。下層=`/money#costs` / `/standard`。
- **受け入れ基準**: ①3事実が抽象化されず具体 ②内訳%が出ていない ③つなぎ融資「原則発生しない」・地盤改良費「一切かかりません」以外に過剰断定なし ④比較バーがscaleX ⑤他社=sign-red/やまと=deep-greenが面で両者が大手を貶めない ⑥1,000件以上はS06でのみ言及 ⑦価値3円図はS06末に置く（S08前には置かない）。

### S07 — ★土地から始める｜土地迷子専用（新設・厚く）
- **役割/段**: ③土地側＝常時150区画程度。段=4。`surface-tint`（base+lime 8%）。心の段=②→④（T4欠落補填＝最優先実装・12-rate動線3の核）。主タイプ=T4（主受け皿）。
- **主役要素**: `t-h2`「土地探しで家づくりを止めない」＋`t-burn`で**150を主役級バーン**（S03の600とは別軸＝二度打ちでない）。deep-green面＋lime点。自社分譲地の構造優位＋地図UI（専務②他府県）。
- **スクショ確定ディテール（織り込み）**: ①**写真マーキー採用**（分譲地の規模感・FV主役NG・S07の帯はOK・PC36s/SP44s・hover停止・reduced-motion静止）。②**運用事実deep-green帯**＝「未公開土地 ◯区画 動きあり」事実スロット（虚偽煽り禁止）。
- **モーション**: M12写真マーキー（PC36s/SP44s・hover/focus-within停止・reduced-motion静止＋overflow-x:auto）。150バーンは静止表示が基本（叫ぶはM4/M16の2箇所制約）。
- **コピー配置**: 「常時150区画程度を保有」と本文で文脈明示し**76（矢田町=個別分譲地の一例）と混同させない**（数値ドリフト封じ）。〔新規フラグ〕「未公開土地」訴求コピーはcopywriter＋natural-japanese後。
- **CTA**: あり・**未公開土地LINE**「土地から相談」▲（別文脈CTAとして独立カウント）。`LINE_ADD_FRIEND_URL` import。
- **使う/作る**: 再利用=`LINE_ADD_FRIEND_URL`/`useScrollIn`/`.ymt-marquee`。新規=`LandSection`（地図UI＋写真マーキー＋未公開土地LINE＋150/76文脈分離）。下層=`/lots`。
- **受け入れ基準**: ①150がバーン主役・本文で「常時150区画程度＝会社全体保有」「矢田町76＝個別分譲地の一例」が明記され混同なし ②写真マーキーが純CSS PC36s/SP44s・hover停止・reduced-motion静止・FV主役化していない ③未公開土地LINEがLINE_ADD_FRIEND_URL import ④地図UIが他府県も含む ⑤運用事実帯が虚偽煽りでない。

### S08 — 商品ライン｜花→風→京
- **役割/段**: ①大手と同品質の素材・装備。段=5。`surface-ivory`（白・カタログ）。主タイプ=T2/T5。
- **主役要素**: `t-h2`（モデル名）＋`t-burn-sub`（価格・静止）。花=lime tint・価格lime強調／京=white・lime tintなし。3モデルcover card・**順序固定 花→風→京。** カタログの潔さ＝均等3カードでなく花にバッジで非対称。
- **モーション**: M6 3カードreveal stagger（Y+16→0/760ms/IO once/120ms）。M7 花バッジfade-in（**パルス/発光禁止**/500ms/M6+300ms）。**価格はカウントアップしない。**
- **コピー配置**: 花2,480万円〜（33坪/4LDK）「いちばん選ばれています」バッジ／風2,480万円〜（30坪/4LDK）／京2,280万円〜（28坪/3LDK）。表記**`KYO`（MIYAKO禁止）**。京=entry役（廉価版表現禁止）。価格はBRAND-TRUTH §2.1 canonical厳守。**価値3円図はS08前には置かない**（S06末に確定配置済み）。
- **CTA**: 各カードに静かなtertiary（text-link）。**使う/作る**: 新規=`ProductCatalog`（3 cover card・花バッジ・非対称）。下層=`/money` / 各product。
- **受け入れ基準**: ①並び順が花→風→京 ②「いちばん選ばれています」が花のみ ③京表記がKYO・廉価版に見えない ④価格がcanonical（花2,480/風2,480/京2,280）で静止表示 ⑤花バッジが発光/パルスしないfade。

### S09 — 物語事例（新設・物語化・厚く）
- **役割/段**: tension付き事例（rulebook Rule4）。段=6。`surface-ivory`（白・物語）。心の段=④余韻。**信頼の実名性A3（最重要失点の是正）。** 主タイプ=全（特T5/T3）。
- **主役要素**: 「声」の巨大組みは`t-display`/`t-h2`で可（**明朝でなくゴシック**）＋施主インタビュー長文を`t-body`（白地）。声面=deep-green。**1〜2組を物語として深く（数より質＝専務⑧）。顔と名前。**
- **スクショ確定ディテール（織り込み）**: **声＝巨大文字＋吹き出し・白地で施主インタビュー長文＋実写真**を踏襲。現v2の注釈断片5枚から脱却＝白地長文化。
- **モーション**: S04声型reveal＋**M12写真マーキー（PC36s/SP44s）**。叫ばない。
- **コピー配置**: **声は編集しない（専務⑦・原文尊重）。** 顔・市名・家族構成・プラン付き物語。Before→葛藤→決め手→After。「お客様の声」canonical標準語（翻訳禁止）。
- **CTA**: なし。末にGBP口コミ動線（★4.5×30件達成までTOP公開ブリッジ凍結＝枠だけ）・OB紹介控えめ入口。
- **使う/作る**: 再利用=`useScrollIn`/`.ymt-marquee`。新規=`StoryCase`（顔と名前・白地長文・Before→After）。**既存の意図的保持コンポーネント（StaffStory等）を自動削除しない。** 下層=`/voice` / `/works`。
- **受け入れ基準**: ①声が原文のまま ②顔と名前・市名・家族構成・プランが付いた長文物語 ③白地・ゴシック巨大組み（明朝でない）④写真マーキーがreduced-motion静止・実写真alt付き ⑤「お客様の声」がcanonical標準語のまま。

### S10 — 後から増えない｜要確認費用（FAQ戦場・前半）
- **役割/段**: 最大の恐怖を先回り（rulebook Rule5）。段=6。`surface-base`（明・記事化）。心の段=③信頼。主タイプ=T1/T3。
- **主役要素**: `t-h3`（費用名）＋`t-body`。最大恐怖=sign-red点・`sign-red-soft`で警告面。契約前に同じ表で確認する費用一覧。**不都合開示を注記→主役級へ格上げ。**
- **モーション**: row reveal（Y+20→0/760ms/IO once）。叫ばない。**CTA**: なし。
- **コピー配置**: 後から出やすい費用を表に。過剰断定回避（「一切ない」は地盤改良/つなぎ融資の例外のみ）。
- **使う/作る**: 新規=`CostDisclosure`（要確認費用表・sign-red-soft面）。下層=`/money#costs`。
- **受け入れ基準**: ①最大の恐怖（後出し費用）が表で露出し注記レベルに埋もれていない ②sign-redが点/面で文字色でない（赤文字はsign-red-dark）③過剰断定なし。

### S11 — FAQ｜営業の戦場
- **役割/段**: 残存疑念の除去。段=6。`surface-base`（明・機能）。心の段=③→⑤。主タイプ=全。
- **主役要素**: `t-h3`（Q）＋`t-body`（A）。sign-red点。5問（送信後の流れ・営業頻度の開示）。**最重要1問は初期open。**
- **スクショ確定ディテール（織り込み）**: **STEP 1–5＝巨大アウトライン数字＋小写真**を「家づくりの流れ 01–08」としてS11付近 or 下層に（Oswald線画アウトライン＋施工実写真allowlist・各STEPに「時期・費用発生」）。
- **モーション**: M15 アコーディオン=**grid-template-rows 0fr→1fr（250–350ms/ease-out）＋chevron rotate(0→180deg)**。発光/バウンス禁止。
- **コピー配置**: Q/A はHTML実テキスト（SVG画像文字化禁止）。「お客様の感情断定」をQに使わない。〔新規フラグ〕FAQ文言はcopywriter＋natural-japanese後。
- **CTA**: なし。**使う/作る**: 新規=`FaqAccordion`（`<button aria-expanded aria-controls>`＋`role="region"`・grid-rows展開）/`FlowSteps`（アウトライン数字＋施工写真）。下層=`/faq`。
- **受け入れ基準**: ①最重要1問が初期open ②`<button aria-expanded/aria-controls>`・回答`role="region"`・最小高48px・focus-visible 2pxリング ③grid-rows展開 ④reduced-motionでtransition無効 ⑤STEP写真が実写真allowlist・各STEPに時期/費用注記。

### S12 — CTA階段｜最終
- **役割/段**: 最低摩擦の次の一歩。段=7（決断）。`surface-ink`（4回限定の最後の1つ）。心の段=⑤決断。主タイプ=全。
- **主役要素**: `t-display`（決断モチーフ巨大組み）＋CTA。**ink黒地＋paper白抜き**／line-green（LINE）／deep-green（見学）。**2段が現実解（LINE→見学）。フォームはtertiary text-link。送信後の流れ明示。数字ゼロ（1,000件等を置かない）。**
- **スクショ確定ディテール（織り込み）**: **再起動装置＝S12直前に決断モチーフ。** xmobileの「巨大『今』黒塗り正方形＋白抜き」を、煽りでなく**「家を、見にいく。」/「まず、総額を見る。」**を ink面＋paper白抜きの巨大組みで（蛍光なし・動き控えめ・残数/カウントダウン禁止）。〔新規フラグ〕この決断コピーはcopywriter＋natural-japanese＋専務確認後。
- **モーション**: M16はS05に割当済のため**S12はカウントアップしない**。M17 CTA hover（矢印X+4px/180–240ms）。
- **コピー配置**: P=「LINEで相談」（line-green）／S=「モデルハウスを見学する」（deep-green）／T=「資料請求」（quiet outlined）／電話=footer。送信後開示は「ご希望のペースでご連絡します」等（「無理な営業はしません」は要copywriter）。〔新規フラグ〕強化ラベルは§5正式追加後に採用・default canonical。
- **CTA**: **反復CTA③**（LINE→見学→フォーム階段）。摩擦除去「子連れOK・オンライン可・ご予約なしでも見学可」（〔新規フラグ〕）。
- **使う/作る**: 再利用=`RepeatCtaBlock`/`LINE_ADD_FRIEND_URL`。新規=`FinalCtaStaircase`（ink地・再起動装置・2段CTA・送信後開示）。下層=`/reserve` `/contact`。
- **受け入れ基準**: ①CTA階層がLINE>見学>資料>電話 ②カウントアップが無い（叫ぶ2箇所はS03/S05）③再起動装置が ink面+paper白抜きで蛍光/虚偽煽りなし ④送信後の流れ・営業頻度が運用で守れる表現で開示 ⑤離脱リンク氾濫なし・数字ゼロ。

### SP固定CTAバー（全SP共通・3分割確定＝論点7）
§7.3を実体仕様とする。`b-plan-v2` L968 インライン3分割を `FloatingCta` へ抽出→下層7ページもimport（**抽出後にインライン版を削除し import 一本化＝二重実装を残さない**）。電話`tel:0742361123`／LINE（`LINE_ADD_FRIEND_URL`）／見学`/reserve`。高さ64–72px・`md:hidden`・safe-area＋body下部padding必須・出現`scrollY>400`・Hero内非表示・FAQ/入力中非干渉。

---

## 8. 実装ロードマップ（確定ビルド計画）

### 8.0 AD確定済み7論点（不変前提）

| # | 論点 | **確定（2026-06-25）** | 反映先 |
|---|---|---|---|
| 1 | 黒地強度 | **温黒 ink `#1D1D18`**（純黒不採用）。`P.ink=#181714`/`--bp-bg-ink`/footer`#11110f`／`--color-ink`を統一 | P0-1, §3.5 |
| 2 | 明朝アクセント | **TOP主見出し完全撤去**。理念縦組み1点は将来オプション・初期に入れない | P0全体, §3.1/§10.1 |
| 3 | シグナル役 | **役割二分**。lime=証明/到達/肯定、sign-red=リスク/後出し費用/緊急/診断。蛍光不採用・青廃棄・両者文字色NG（赤文字は sign-red-dark） | P0-3, §3.3 |
| 4 | 巨大数字バーン | **初期=実証値 Oswald600**。700/−0.01em/168px強化は専務確認後 | P1-1, §3.2/§4.2 |
| 5 | 写真マーキー | **採用**。S07/S09帯と下層のみ・FV主役NG・純CSS PC36s/SP44s・hover停止・reduced-motion静止・スタッフ平等。Heroに使わない | P1-2, §4.3 |
| 6 | 自分ごと化の入力ツール | **承認後追加**。初期は枠（データスロット）だけ。3事例＋S05末LINEで接続 | P1-8, §5.2 |
| 7 | SP下部固定CTAバー | **3分割（電話/LINE/見学）全サイト標準化**。L968インライン版を`FloatingCta`へ抽出し下層7ページもimport・インライン版は削除 | P0-5, §7.3 |

### 8.1 フェーズ（P0会得 → P1ブランド体験 → P2仕上げ）

**P0 — 文法の会得（基盤・ゲート通過が前提）**
- **P0-0a ゲートA**: BRAND-TRUTH §1 を §10.1 差分で Mincho→Gothic 更新（実測 L45–73）→神野さんsign-off→正本更新。承認前は主見出しZen Old Mincho継続。
- **P0-0b weight 800 追加（独立必須）**: `layout.tsx` の `Zen_Kaku_Gothic_New` weight 配列へ `"800"` を追加（追加しないと`.t-h2`の800が700/900へ丸められる）。
- **P0-0c ゲートB**: §6 Hero採用方針確定（§6確定コピー継続か中心概念採用か）。中心概念採用なら§6更新（実測 L299–316）。
- **P0-1**: 主要文字HTML化。`P.ink=#181714`/`--bp-bg-ink`/footer`#11110f`→`#1D1D18`（=`--color-ink`）の1行を必ず含める。
- **P0-2 トークン統合＋lime hex是正＋font新設**: `globals.css` に §3.2/§3.5 の `:root`／`.t-*`を追加し、`--ink/--sign-red/--line-green` 等を**既存 `--color-ink/--color-risk/--color-line` のエイリアス**にする（新系統を新設しない）。色を §1（#2F4A2C/#E84336）へ統一。green-mid は `--deep-green-mid` へ畳む。**`--color-lime` を `#A9D159` へ更新し lime scale（hover/deep/darker/light）を再算出、`bg-lime`/`text-lime-darker` 利用箇所（FloatingCta/PriceSection）のコントラスト再実測**。`@theme` に `--font-zen-kaku-new` を1行新設（`--font-money` は流用しない）。
- **P0-3**: 全実績数字に測定条件+時点付与。
- **P0-4**: CTA階層統一・`LINE_ADD_FRIEND_URL` import。
- **P0-5 SP固定CTA**: L968インライン3分割を`FloatingCta`へ抽出＋下層7ページimport＋**インライン版削除（import一本化）**＋safe-area+body padding+`viewport-fit=cover`。
- **P0-6**: §4.5 JS無効フォールバック（`@media(scripting:none)`・推奨は初期可視+IO方式）と §4.6 reduced-motion不足分（マーキー/カウントアップ即値/Lenis慣性/scroll-reveal）を追加。
- **P0完了ゲート**: JS無効でcanonical本文が消えない状態を確定させてから reveal演出を載せる。

**P1 — ブランド体験（証拠ラダーの再配置）**
- **P1-1 巨大数字バーン**: S03=600主役級（初期Oswald600・実証値流用）。S05=月々（別軸）。S06=1,000件のみ。二度打ち禁止。
- **P1-2 写真マーキー**: S07/S09に純CSS（PC36s/SP44s・hover停止・reduced-motion静止・FV主役NG・スタッフ平等）。
- **P1-3 黒白リズム**: ink暗面4回限定（S01/S05/S06/S12）↔base/ivory白面の交互。
- **P1-4 証拠クレッシェンド**: S03権威バーン集約（FVレール撤去）→S04逆転→S05黒地→S06メカニズム。
- **P1-5 再起動装置**: S12直前「家を、見にいく。」/「まず、総額を見る。」ink面＋paper白抜き（虚偽煽り禁止）。
- **P1-6 抑制リビール**: 叫ぶはM4/M16の2箇所のみ。価格2,480/2,280はカウントアップしない。
- **P1-7 物語事例＋FAQ**: S09物語化（声編集しない・顔と名前）・S11 FAQ（aria・最重要1問初期open）。
- **P1-8 S05投資エッセンス枠＋自分ごと化データスロット**: 投資哲学エッセンス常設（NISA直接比喩避ける・試算注記必須）。入力ツールは枠のみ。

**P2 — 仕上げ（検証ゲート通過）**
- **P2-1 A11y実測**: コントラスト（lime hex統一後も再実測）・focus・キーボード・縦書き読み上げ・JS無効でcanonical成立。
- **P2-2 Perf**: AVIF・Hero LCP fetchpriority=high・Oswaldサブセット・CLS=0・page.tsx分割。
- **P2-3 計測ゲート全通過＋下層整合**: §8.3全通過。下層ページ7枚を3分割FloatingCta標準へ整合。

### 8.2 サブエージェント編成案

| サブエージェント | 担当 | 入力 | 出力 |
|---|---|---|---|
| typography-implementer | §3タイポ・トークン統合・globals.css・font-zen-kaku-new新設・weight800追加・lime hex統一 | 本書§3 + BRAND-TRUTH §1更新後 | `.t-*`/`:root`差分 |
| ia-section-builder | §S セクション再配置・S04/S07/S09/S11新設 | 本書§2/§S + 確定コピー | page.tsx分割実装 |
| motion-engineer | §4モーション・マーキー・FAQ・reveal安全網 | 本書§4 + 既存フック | CSS/フック差分 |
| copy-placer | §6タイポ役組み替え（文言不変）・新規CTAフラグ | §6 + copywriter/natural-japanese | 配置差分+要承認リスト |
| rwd-a11y-perf-auditor | §7分解・A11y実測・Perf・SEO | §7 + a11y-audit | 監査レポート+修正 |

### 8.3 計測ゲート（各フェーズ後に必ず通す）

| ゲート | 合格基準 | 差し戻し条件 |
|---|---|---|
| **design-critic** | **5軸 75点以上** | 「Apple/SaaSに置けてしまう」＝蛍光トラップ再発／明朝・静寂への逆戻り |
| **lp-psych-audit** | **75点以上**（§5.3目標: 特に信頼17→25+・欲求の自分ごと化）＋ダークパターン0 | 偽残数/偽カウントダウン検出・信頼スコア未達 |
| **a11y-audit** | **WCAG 2.2 AA 適合**（コントラスト実測・lime統一後再測・FAQ ARIA・縦書き読み上げ・reduced-motion・タップ44px・JS無効でcanonical成立） | AA未達・JS無効でcanonical消失 |
| **perf** | **LCP良好・CLS=0** | CLS発生・LCP悪化 |
| 共通 | canonical数値・二度打ちゼロ・FV物件NG・声編集なし・代表同格・**蛍光/青ゼロ**・JS無効でcanonical成立 | いずれか違反 |

**公開後の判断基準（指示書20原則準拠）**: 公開後は**デザインの好みで判断しない**。CTAクリック率（階層別）・スクロール深度（S05/S11到達率）・問い合わせ内容（「土地込み総額」「未公開土地」「月々」へ意図が変わったか）で判断。design-critic/lp-psych-audit の点数は**公開前の差し戻し判定**に使う。

### 8.4 12-rate-gaps 3動線の受け皿（実装優先度）

| 優先度 | 動線 | 受け皿 | 状態 |
|---|---|---|---|
| **最優先** | 動線3 未公開土地LINE | **S07が主受け皿**（自社分譲地150区画・地図UI・専務②他府県）。「土地から相談」▲ | **今すぐ実装**（FV外＝専務①） |
| **第2** | 動線1 GBP口コミ | S09末・footer。★4.5×30件達成までTOP公開ブリッジ凍結 | **枠だけ実装**（GBP★3.6/51件・未達凍結中）→達成後limeバッジで解放 |
| **第3** | 動線2 OB紹介 | S09末 or footer。控えめ入口・主役にしない | **控えめに実装**（deep-green quiet入口・点） |

---

## 9. AD確定済み7論点（確定✓・推奨表からの更新）

| # | 論点 | **確定✓（2026-06-25 AD承認）** |
|---|---|---|
| 1 | 黒地の強度 | **温黒 ink `#1D1D18` 確定**（純黒#000不採用）。base温白と色温度を揃え一貫。ink上ivory≈15.8:1でAAA。`P.ink=#181714`/`--bp-bg-ink`/footer`#11110f`／`--color-ink`も統一 |
| 2 | 明朝アクセント | **TOP主見出し完全撤去確定**（明朝/Fraunces italic/縦書き長文をTOP見出しに使わない）。理念「憧れを現実にできる形へ」縦組み1点は将来オプション・初期実装に入れない |
| 3 | シグナル役 | **役割二分確定**。lime=証明・到達・肯定（達成数字・花バッジ・下線/8px帯）、sign-red=リスク・後出し費用・緊急・診断。蛍光#8DF701不採用・青#2bb9e1廃棄。同一視線で競わせない・両者とも文字色NG（赤文字は sign-red-dark） |
| 4 | 巨大数字バーン | **初期=実証値 Oswald600 確定**（weight600/clamp(64,13vw,132)/ls+0.005em/lh0.86）。700/−0.01em/168px強化は専務確認後の段階提示・初期実装に入れない |
| 5 | 写真マーキー | **採用確定**。S07/S09帯と下層のみ・FV主役NG・純CSS PC36s/SP44s・hover停止・reduced-motion静止・スタッフ平等。Heroに使わない |
| 6 | 自分ごと化の入力ツール | **承認後追加確定**（0ベース禁止）。初期は枠（データスロット）だけ・3事例＋S05末LINE反復で自分の総額へ接続 |
| 7 | SP下部固定CTAバー | **3分割（電話/LINE/見学）全サイト標準確定**。L968インライン版を`FloatingCta`へ抽出し下層7ページもimport・インライン版削除。safe-area・高さ64–72px・FAQ/入力中は非干渉 |

> 残る2ゲート（タイポのゴシック転換・Heroコピー出典）は「正式実装の最初の工程」。実装着手前に §8 P0-0a/0c の BRAND-TRUTH 更新（§10 の差分）と P0-1（ink統一）・P0-0b（weight800）・P0-2（lime hex統一・font新設）を先に通すこと。

---

## 10. BRAND-TRUTH.md 更新差分（そのまま貼れる確定差分・実測行番号・実装着手時に適用＋sign-off）

承認順序: **正本更新 → sign-off → 実装**（コードと正本を漂流させない）。**確定コピー文字列は1字も変えない。** 適用対象正本: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/BRAND-TRUTH.md`。

> **行ズレ耐性（重要）**: 下記の行番号は2026-06-25実測値だが、貼り付け時は**見出し＋本文の anchor 文字列で対象を特定**してから差し替えること（行番号だけに依存しない）。各差分に anchor を併記する。

### 10.1 §1 Typography 差し替え（**L45–73 を置換**／anchor=`### Typography` 見出し1ブロック・そのまま貼る）

> **anchor**: `### Typography (2026-05-08 — B 案 Editorial Mincho 採用)` の見出し行から、その表＋`/money`例外＋Tailwind対応表の終わりまで（実測 L45–73）。

```markdown
### Typography（2026-06-25 — TOP は Gothic Catalog へ転換）

`/font-lab` の B案 Editorial Mincho は 2026-06-10 診断で TOP「迷子の核心」の発生源と特定。
TOP は専務が `/money` で既に承認済みの文法「和文ゴシック太角 + Oswald 数字バーン + カタログの潔さ」
へ転換する。明朝系は TOP 主見出しから撤去。（神野さん承認 → 本節更新 → 実装の順で適用。）

| 役割 | フォント | ウェイト | 用途 |
|---|---|---|---|
| 主見出し h1/h2 | **Zen Kaku Gothic New** | 800–900 | 和文太角ゴシック・カタログの潔さ・選ばせる強度 |
| 小見出し h3 / リード | **Zen Kaku Gothic New** 700 / **Murecho** 500 | — | 階層は太さ＋サイズで作る |
| 本文 | **Murecho** | 400 | line-height 1.85 / letter-spacing 0.025em |
| 巨大数字バーン | **Oswald** | **600**（強化700は専務確認後） | tabular-nums・1セクション1発・実績局在。`.money-burn-display`が実証 |
| 欧文 eyebrow / ラベル | **Inter** | 600 | caps + tracking 0.18em |

撤去（TOPで使わない・下層 / `/money` 互換のためロードは残置）:
Zen Old Mincho・Shippori Mincho・Noto Serif（明朝全般）・Fraunces italic・縦書き長文。
理念「憧れを現実にできる形へ」の縦組み1点のみ将来オプション扱い・初期実装には入れない。

`/money` は引き続き例外（和文ゴシック+Inter+Oswald・Mincho禁止＝この転換と元から整合）。

Tailwind ユーティリティ対応表:
- `font-zen-kaku-new` ← `var(--font-zen-kaku-new-var)`（TOP 主見出し・`@theme` に新設・`--font-money` とは命名分離・流用しない）
- `font-murecho` / `font-inter` / `font-oswald` は既存のまま
- `font-zen-old` / `font-fraunces` / `font-shippori` / `font-sans` は既存のまま残置（/money・下層・後方互換用。TOP では呼ばない）

実装着手時アクション:
- layout.tsx の Zen Kaku Gothic New に **weight "800" を追加**（現状 ["400","500","700","900"]）。
- `--color-lime` を **#A9D159（=--brand-lime 正本）** へ統一し lime scale を再算出（現状 #A2C523 とドリフト中）。
```

### 10.2 §6 Hero copy レンダリング注記更新（**L299–316 を置換／Track Record 撤去は L314**・文字列は1字も変えない）

> **anchor**: `` `HeroVideo` overlay `` の行から、`[h1 …]` `[lead …]` `[sub …]` の3コピーブロック＋下部 overlay Track Record 行（実測 L314）まで（実測 L299–316）。

```markdown
`HeroVideo` overlay (動画 FV 上の主役コピー):
レンダリングは Gothic Catalog 転換（§1・2026-06-25）に追従。文字列は一字も変えない。

[h1 — Zen Kaku Gothic New 800-900 / --type-display]
奈良・京都南部で、土地から考える家づくり。

[lead — 和文は Murecho 500 / 数字「2,280」のみ Oswald 600 tabular / --type-burn-sub]
京モデル 2,280 万円〜。

[sub — Murecho 400]
土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。

[下部 overlay — Track Record の扱い変更（旧 L314 を置換）]
※ 旧「下部 overlay に Track Record 4 指標（600棟・150区画・50組・14年）を継続表示」は
   FV から撤去し S03 へ集約する（実績数字レールの二度打ち解消）。FV 下部には実績4数字レールを置かない。

中心概念「大手の理想を、現実の総額に。」を FV に採用する場合（出典明記ルール）:
- この語句の正本は BPLAN / docs/notes/2026-06-10-bplan-diagnosis.md。BRAND-TRUTH §6 の確定 Hero コピーではない。
- FV に置くなら先にこの §6 を更新して中心概念を追記し、出典が BPLAN である旨を明記してから実装する。
- 上記 §6 確定文字列を中心概念で勝手に上書きしない。「憧れを現実にできる形へ」「妥協ではなく誇れる選択」も同じ扱い。
```

### 10.3 §5 CTA 新規ラベル正式追加（**L283–296 末尾＝L296の後に追記**・anchor=`Primary — \`LINEで相談\`` を含むCTA階層定義・default は canonical 維持）

> **anchor**: `1. Primary — \`LINEで相談\`` から始まるCTA階層1〜4の定義（実測 L283–296）。既存定義は変更せず、その**直後に**下記を追記。

```markdown
### 5.1 新規ラベル候補（2026-06-25 追加・要検査フラグつき）

default は引き続き canonical（Primary「LINEで相談」/ Secondary「モデルハウスを見学する」）。
新規ラベルは default の差し替えではなく文脈別の強化案として扱う。

| 階層 | canonical default（不変） | 新規候補（要検査） | 想定文脈 |
|---|---|---|---|
| Primary（LINE） | LINEで相談 | LINEで土地込み総額を出す | 総額・月々クライマックス直後（S05末） |
| Primary（LINE・土地文脈） | LINEで相談 | 未公開土地をLINEで見る | 土地から始める専用（S07・12-rate 動線3） |
| Secondary（見学） | モデルハウスを見学する | 標準仕様を実物で見る | 商品・標準仕様の文脈（S08前後） |

採用ゲート（3点すべて通すまで本番不可）:
1. copywriter 検査（憲法A「安い」否定→無駄フレーム / 憲法D 過剰断定禁止 / 憲法E 感情断定禁止）
2. natural-japanese 検査（翻訳調・AI臭・動詞+人型/疑問形の短ラベル禁止）
3. 小林専務確認
通過した語のみ canonical 欄へ昇格させて本番採用。LINE link は LINE_ADD_FRIEND_URL（src/data/line.ts）を import・ハードコード禁止。

摩擦除去マイクロコピー（「予算が固まっていなくても大丈夫です」「目安はおよそ60分です」等）も新規コピー扱い → 同じ3点ゲートの対象。

SP下部固定CTAは「電話 / LINE / 見学」の3分割を全サイト標準とする（2026-06-25 確定）。
b-plan-v2 L968 のインライン3分割を FloatingCta コンポーネントへ抽出し、抽出後にインライン版を削除して
下層7ページもそれを import する（二重実装を残さない）。
```

### 10.4 §2 区画数の付記（**L116 の直後に追記**・anchor=`常時150区画程度` の表行・canonical 値は不変）

> **anchor**: `| 自社分譲地（常時保有） | 常時150区画程度 | …`（実測 L116）。この表行の**直後に**下記の脚注ブロックを追記。

```markdown
> 区画数の包含関係（数値ドリフト封じ）:「常時150区画程度＝会社全体の常時保有数」、
> 「矢田町76区画＝個別分譲地の一例」。150 は会社全体のストック、76 はその内側の一物件群。
> 本文・正本群で 76 と 150 を同列に並べない（76 を全社規模として書かない）。
> ※ docs/notes/2026-06-10-bplan-diagnosis.md（旧「76区画＝最大の構造優位」）と
>   docs/project-context/12-rate-gaps.md は、この包含関係へ更新フラグ対象。
```

### 10.5 適用順序と sign-off マトリクス

```
ステップ0（技術是正・sign-off 不要・実装者判断で先行可）
  - C1 ink統一: P.ink=#181714 / --bp-bg-ink / footer#11110f → #1D1D18（=--color-ink）
  - weight 800 追加（layout.tsx）
  - --font-zen-kaku-new 新設（@theme・--font-money 流用しない）
  - --color-lime を #A9D159 へ統一・lime scale 再算出・bg-lime/text-lime-darker 利用箇所のコントラスト再実測
  - reveal安全網: @media(scripting:none) フォールバック追加（推奨は初期可視+IO方式。reduced-motion は L733-742 で解除済）
ステップ1 §1 Typography（L45–73 置換・ゴシック転換）  — sign-off: 神野さん（AD）。承認まで主見出しは Zen Old Mincho 継続
ステップ2 §6 Hero（L299–316 置換・Track Record撤去は L314）  — sign-off: 神野さん（AD）
  ┗ 中心概念をFV採用する場合のみ追加で sign-off: 小林専務
ステップ3 §2 区画数の付記（L116 直後）  — sign-off: 不要（150統一に整合）。後続: bplan-diagnosis.md / 12-rate-gaps.md 更新フラグ起票
ステップ4 §5 CTA 新規ラベル（L296 後に追記）  — 本番採用は copywriter＋natural-japanese＋小林専務 の3点全通過

【sign-off マトリクス】
  神野さん（AD）: §1 タイポ転換 / §6 レンダリング注記＋Track Record撤去（必須）
  小林専務      : 中心概念のFV昇格 / 新規CTAラベルの本番採用 / バーン700強化
  実装者        : ステップ0 技術是正（ink統一・weight800・font新設・lime hex統一・reveal安全網）/ default 維持運用
```

### 10.6 違反していないことの確認

- **コピー憲法**: 確定コピー3文字列・声原文・代表メッセージ・costテーブルは1字も変えず、レンダリング指定のみ変更。新規ラベル・マイクロコピーは3点ゲート付きで default を canonical に固定。
- **スタッフ平等**: タイポ/CTA/数値/Heroのみ。役職別サイズ差・特別扱いの導入なし。
- **ロゴ再描画禁止**: 本文書体のみ。ロゴ（`logo.png`/`<Header />`）に触れず、巨大ワードマーク再レターも含めない。
- **canonical 数値**: 600棟以上/常時150区画程度/50組以上/14年/1,000件以上/地盤20年・しろあり10年/京2,280・風2,480・花2,480・花→風→京順・花バッジ・KYO表記 を不変で踏襲。150／76は包含関係として明記。
- **蛍光・青禁止 / 専務8原則**: lime（正本#A9D159へ統一）/deep-green/sign-red二分・バーン600初期・FV物件NG・声編集しない・代表同格・投資エッセンス温存を死守。蛍光#8DF701不採用・青#2bb9e1廃棄。

---

### 関連ファイル（絶対パス）

- 確定対象フレームワーク（本書の更新元）: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/docs/notes/2026-06-25-top-reboot-framework.md`
- 単一正本（要更新・差分は §10／実測行番号）: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/BRAND-TRUTH.md`（§1 Typography **L45–73**＝ゲートA / §6 Hero **L299–316**・Track Record撤去 **L314**＝ゲートB / §5 CTA **L283–296** / §2 区画数 **L116**）
- リブート対象実装: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/b-plan-v2/page.tsx`（`const P` L45-55 / `--bp-*` L6570-6578 / `--bp-green-mid` L6577 / footer`#11110f` L961 / SP固定CTA L968）
- 技術是正/再利用資産: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/globals.css`（`@theme` L3- / `--color-lime`(scale) **L19**＝#A2C523ドリフト中→#A9D159へ / `--color-ink` **L36** / `--color-ink-muted` **L37** / `--color-risk` **L38** / `--color-risk-dark` **L39** / `--color-risk-soft` **L40** / `--color-line` **L42** / `--font-money`（=Zen Kaku Gothic New 別名・流用しない） / `.money-burn-display` L325-334＝weight600実証値 / `.scroll-in` L157 / reduced-motion 分散 L188/388/439/681/**733-742＝.scroll-in opacity/transform 解除済**）
- 改修対象: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/components/FloatingCta.tsx`（2ボタン版・safe-area無し・`bg-lime text-lime-darker`使用→3分割へ統一・lime hex統一後コントラスト再測）
- 書体ロード: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/src/app/layout.tsx`（4書体 L85-123・Zen Kaku Gothic New weight に "800" 追加）
- 再利用フック/データ: `src/hooks/useCountUp.ts` / `src/hooks/useScrollIn.ts` / `src/components/bplan/AnimatedNumber.tsx` / `src/components/SmoothScrollProvider.tsx` / `src/data/line.ts`（`LINE_ADD_FRIEND_URL`）
- 診断（150 vs 76 更新フラグ対象）: `/Users/takahirokamino/Documents/Claude/Projects/やまと不動産HP V2/YAMATOFUDOUSANV2/docs/notes/2026-06-10-bplan-diagnosis.md`
- 戦略正本: `docs/project-context/` 配下 conversion-sales-rulebook.md / top-section-structure.md / kobayashi-review-20260428.md / 12-rate-gaps.md / line-first-cta-strategy.md / bplan-design-rhythm.md

---

## 12. 追補B（2026-06-25 コード実測）— トークン正本コンフリクトと第8論点

> **§3.5/§3.6 の「正本=BRAND-TRUTH §1 へ寄せる（緑#2F4A2C / lime#A9D159）」という指示は、本章の第8論点が決まるまで暫定。** 実コード照合で、想定より深いドリフトが判明したため。

### 12.1 実測で判明した事実（確定）

| トークン | BRAND-TRUTH §1（宣言） | 実コード globals.css `@theme`（実働） | 実態 |
|---|---|---|---|
| 深緑（解決/証明・CTA下地・罫線） | `--brand-deep-green #2F4A2C` | **`--color-main #486B00`**（"grass・WCAG AAA on white" とコメント／`--color-main-dark #2E4600`） | **#2F4A2C はコードに1箇所も存在しない**。`text-main`/`bg-main`/`border-main` が**105箇所**で #486B00 を使用。`/money`含む全サイトがこの緑で描画中 |
| lime（アクセント・ボタン下地） | `--brand-lime #A9D159` | **`--color-lime #A2C523`**（`hover/deep/darker/light` のアクセシブルscale一式） | FloatingCta・PriceSection・LoanSimulator 等が #A2C523 で描画中。`SellingPointsStrip` は `#A2C523` をハードコード |
| ink / risk / line | #1D1D18 / #E84336・#8F211B・#FFF0EE / #06C755 | `--color-ink #1D1D18` / `--color-risk* ` / `--color-line #06C755` | **一致**（コンフリクトなし） |

つまり実コードの `@theme` は、BRAND-TRUTH §1 の緑・limeを**アクセシビリティのために意図的にチューニングした別hex**に発展させており（コメントが明示的にWCAG比を記載）、§1の宣言値とは未整合のまま全サイトで稼働している。ink/risk/lineは一致。**コンフリクトは緑とlimeの2色のみ。**

### 12.2 第8論点（AD判断・サイト全体の根幹色に波及）

| 選択肢 | 内容 | 帰結 |
|---|---|---|
| **A. 実コードを正本化**（推奨） | `@theme` の実働値（#486B00 / #A2C523）を採用し、**BRAND-TRUTH §1 をこの実値へ更新**して整合させる | 再チューニング不要・TOPと既存ページ(/money等)の色が一致・アクセシビリティ保持。BRAND-TRUTH §1のhexが変わる |
| B. BRAND-TRUTHを正本化 | §1宣言値（#2F4A2C / #A9D159）へ**サイト全体を寄せる** | 宣言値に忠実だが、105+箇所の緑とlime scaleを**再算出＋WCAG再実測**。サイトの緑のhue（forest寄り）が変わる大改修 |
| C. 緑とlimeで別判断 | 例: 緑は実値#486B00維持／limeのみ#A9D159へ等 | 色ごとに最適化できるが整合管理が複雑 |

**推奨=A**。理由: (1) 実値はWCAG調整済みで全サイト稼働の de-facto 正本、(2) BRAND-TRUTH自身が「事実が変わったらBRAND-TRUTHを先に更新」と規定、(3) TOPリブートを既存ページと色整合させ、根幹色の大改修をリブートに巻き込まない。Aなら §3.5/§3.6 の「寄せる」指示を「**既存 `--color-main`/`--color-lime` をそのまま正本として参照・BRAND-TRUTH §1を実値へ更新**」に置換する。

> **第8論点が決まり次第、§3.5/§3.6/§8/§10 の緑・lime指示を確定値へ一括更新する。** それ以外（ink/risk/line統一・font命名・weight800・SP固定CTA・モーション・IA・コピー）は第8論点に依存せず確定済み。
