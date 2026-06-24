# ラボ/下書きページ 救出アーカイブ（2026-06-24）

納品前にラボ系15ページ＋下書き（b-plan/page 2.tsx 等）を削除するにあたり、**そこにしか無い・再生成が難しい情報**を逐語で救出した記録。コピー案・配色HEX・各案のpros/cons・確定フォント・画像/動画生成プロンプト・地図仕様などを保存する。

> ⚠️ **採用基準**: ここに保存した数値・実績・価格・CTA階層・商品名はラボ時点の値で、`BRAND-TRUTH.md` と乖離している場合がある。**実装で使う前に必ず BRAND-TRUTH と照合**すること。本ファイルは「アイデアと判断の記録」であって正本ではない。

---

## 1. Hero 方向の系譜（最重要・再発防止）

### 1-A. hero-review（A/B/C/E 案＝全没・2026-05-08 18:00）
- **NG化の判定（再発防止コア・逐語）**: 「A / B / C / E 案はすべて『整っているが、AI が考える品のいいナチュラル住宅サイトの平均値』に着地しており、不採用。個別のボタン・コピー・余白を直しても、アートディレクションが合っていない限り『なんか違う』が残るため、磨かない。」
- **NGパターン明示リスト**: 生成り×深緑×明朝×LDK写真の住宅サイト平均値／葉アイコン／大きい価格カード／営業資料風実績帯／「心地よい暮らし」抽象コピー
- 生成手法: 正規ロゴ `/images/logo.png` ＋実写LDKを Higgsfield に media reference として渡しロゴ/写真捏造を防止（BRAND-TRUTH §7.1）
- A案 住宅カタログ型 palette: `#F7F4EC`(生成り) `#2F4A2C`(深緑) `#9A7A3F`(金茶) `#1D1D18`(墨)
- B案 価格透明性型(NG) コピー実験「透明な価格で、理想の住まいを叶える。」palette: `#FBF8EE` `#2F4A2C` `#9A7A3F` `#06C755`(LINE緑)。CTA「無料で総額を相談する／モデルハウスを見学する」
- C案 地域密着・相談型 コピー実験「土地・建物・資金計画、奈良・京都南部のご家族の総額をご相談ください。」palette: `#F7F4EC` `#2F4A2C` `#9A7A3F` `#C7B98F`。※実績4数字のラベル(年間建築実績/地元スタッフ数/創業年数/支店数)は誤り→BRAND-TRUTH§2へ
- E-a案 住宅ブランド・エディトリアル型（方向修正）: 「価格を主役から降ろし、写真と短いコピーで暮らしの空気感を先に。価格は安心材料として静かに添える。実写LDKを右半分に大きく、左は明朝見出し2行＋細いインライン価格＋スリム2CTA。」
- E-b案: E-a と同方向で見出しを「心を紡ぐ住まいづくり」寄りに。下部4数字も placeholder。Primary CTAは「無料で総額を相談する」に統一推奨

### 1-B. style-tiles（3方向スタイルタイル＝A建築誌を採用・2026-05-08）
**NG_LIST（AI平均値ガード・画像生成/実装プロンプトに毎回明示する10項目・逐語）**:
1. 生成り×深緑×明朝のよくあるナチュラル住宅サイト
2. 葉っぱアイコン・家アイコンでやさしさを出すデザイン
3. AI生成っぽい完璧なLDK写真
4. 左テキスト＋右写真の普通すぎる分割Hero
5. 大きな価格カードを中央要素にするLP風デザイン
6. 実績数字を大きく並べる営業資料風の帯
7. 「心地よい暮らし」「自然と調和」系の抽象コピー
8. 角丸カード＋薄い影で整えたテンプレUI
9. SaaS風の量産インターフェース
10. きれいだけど記憶に残らない住宅カタログ風

- **Tile A 建築誌・エディトリアル（採用方向）**: 配色 `#1A1815`(墨黒)/`#C5BDB0`(グレージュ)/`#6E4F32`(ウォルナット)/`#F4EFE6`(ペーパー白)/`#3E5538`(深緑5%以下)。参照=CASA BRUTUS/GA HOUSES/Wallpaper/Aesop。「写真大きめ・文字少なめ・余白広く・色数を絞る」。フォント=明朝大見出し＋ラテン系セリフ。合うコピー「家づくりは、土地を読むところから始まる。」「奈良で、余白のある暮らしを建てる。」
- **Tile B 不動産×建築プロフェッショナル（価格/標準仕様で使用）**: 配色 `#FFFFFF`/`#0E0E0D`/`#B3B0AA`/`#4F4F4D`/`#2E4A36`(深緑5%以下)。参照=KKAA/Foster+Partners/Sou Fujimoto。合うコピー「土地・建物・資金。三位一体で見える家づくり。」リスク=冷たく見えやすい
- **Tile C 暮らしの実在感・クラフト（質感補助）**: 配色 `#EFE9DD`(プラスター白)/`#B0926A`(生オーク)/`#2A2622`(チャコール)/`#36443F`(藍)/`#B6755A`(テラコッタ)。参照=Kinfolk/BRUTUS CASA/MUJI素材本/Aesop。合うコピー「奈良の木と、奈良の家と。」「土地の声を、家にする。」リスク=素材撮影が前提
- **Hero視覚化 A vs B**（nano_banana_2生成、実ロゴ＋実外観をmedia reference）:
  - A-a「建築と、静謐な暮らしの提案。／奈良・京南部の美学を求めて。」+三山木モデル、CTA「総額を相談する →」1つ
  - A-b「静謐なる邸宅、奈良の光景へ。」
  - B-a「建築家の視点と、奈良・南京都の土地勘が交差する、唯一無二の邸宅づくり。」+スペック表組
  - B-b「日本の気候風土に根ざした、確かな建築の設計。」
- **A/B判断軸**: A=「価値観のあるブランドに見せたい/写真と短い言葉で勝負/外観写真の質に自信」 B=「総合力を最初に/数字を美しく/専務にちゃんとしてる印象/構造を好む層」
- **決定**: 2026-05-08 夕「A direction adopted」→次フェーズ /hero-a

### 1-C. hero-a（A建築誌の精度UP・確定コピー）
- **確定H1（明朝大見出し2行）**: 「土地を読み、」「暮らしを建てる。」
- **確定Subcopy**: 「奈良・京都南部で、土地探しから資金計画、建物まで。」「総額で見える家づくりを、地域密着で支えます。」
- **確定Price note（カードにしない）**: 「京モデル　2,280万円〜」「税込・建物本体＋標準付帯工事込み」
- **確定CTA（2つまで・直角・緑NG）**: Primary「総額の目安を相談する →」/ Secondary「モデルハウスを見学する →」
- **確定Trust strip（細帯・monospace）**: 「引渡し 600棟以上」「分譲 90区画以上」「お客様の声 50組以上」「業歴 14年」（区切り「　·　」）
- accent: A=`#A9D159`、B=`#C5BDB0`、C=`#B6755A`
- **5項目チェック（専務提出前の判断基準）**: ①安売りLPでなく住宅ブランドに見えるか ②写真に実在感（AI生成LDKでないか）③土地・資金・建物の強みが静かに伝わるか ④2,280万円〜が上品か ⑤自分が「これなら出せる」と思えるか（一番大事）
- **レイアウト必達8項目**: 正規ロゴ＋日本語ナビ（英語ナビ禁止）/右上LINE緑ピル禁止テキストリンクのみ/canvas=ペーパー白`#F4EFE6`純白NG/写真は実物のみAI生成LDK禁止/価格はカードにしない/CTA2つまで直角影なし緑なし/実績はHero下の静かな細帯/大角丸カード白カード量産禁止葉アイコン禁止
- 実装方針: `src/components/hero/HeroEditorial.tsx`(仮)。画像内文字は信用せずHTML実装

### 1-D. hero-wireframes（写真なしグレーボックス3案＝W2採用・2026-05-08夜）
- **設計判断（なぜグレーボックス先行か・逐語）**: 「HeroEditorial v1 は LDK 写真の強さに救われていただけで構造そのものは住宅 LP 定型に戻っていた。写真を抜いてもデザインで勝つ Hero を作るため、グレーボックステスト先行に切替。」
- **写真なしHero合格基準6項目**: ①写真を抜いても良いデザインに見えるか ②住宅LP定型から抜け出しているか ③やまとらしい「土地から考える家づくり」が表現されているか ④価格・CTA・実績が営業っぽくないか ⑤建築誌のような余白と緊張感があるか ⑥会社名を変えても成立する汎用デザインになっていないか
- W1 測量図＝土地区画線・座標・寸法線／W2 建築図面＝elevation frame+title block（★採用）／W3 雑誌マスト＝縦組ロゴ・フォリオ・走り頭
- **W2採用rationale**: 「写真を elevation frame として中央配置、ダブルヘアラインの図面枠+スケールチックで囲む。価格・実績・CTAは建築タイトルブロック表組で整理。」pros=写真有無に関わらず構造が立つ/建築事務所ポートフォリオに近い/数値が建築仕様として読める。cons=図面感が強く温度感やや低い
- グレーボックス用ローカルパレット: PAPER`#F4EFE6`/SUMI`#1A1815`/GREIGE`#C5BDB0`/FOREST`#3E5538`/MUTED`#5E5A50`/HAIRLINE`#DED8C8`/PHOTO_BG`#C5C0B5`/PHOTO_BG_DARK`#A8A399`
- フォント: 見出し`var(--font-shippori)`w500/英字メタ`var(--font-inter)`/数字`var(--font-oswald)`w300
- W1構造アイデア: 点グリッド地紋`radial-gradient(circle, ${SUMI}1f 0.5px, transparent 0.5px)` size32px opacity0.18／座標「N 34.681° · E 135.832° · NARA-KYOTO」「SHEET 01/04」／写真4隅L字クロップマーク＋寸法線「0—5—10—15 m」
- W2構造: メタ「ELEVATION 01 · SOUTH」「SCALE 1:200」／1pxダブルヘアラインframe＋上下スケールチック21本／TITLE BLOCK表組(120pxラベル列、行:PRICE/RECORDS/ACTION、ラベル背景`#F8F7F4`)
- W3構造: 「VOL. 01」「SPRING 2026」「NARA·KYOTO」「HOUSING & LAND」／縦組マスト`[writing-mode:vertical-rl]`／drop cap(先頭44px float-left)／走り頭「HOUSING & LAND · やまと不動産」

### 1-E. 確定フォント（hero-lab / concept-lab）
- **ユーザー確定**: 見出し B(Shippori Mincho) ＋ ボディ/数字 IV(Industrial: Oswald + Noto Sans JP 500)。variant id: 見出し`shippori`／ボディ`industrial-bold`
- hero-lab=見出し×ボディの2段タブ検証／候補データの実体は `HeroMagazine` の FONT_VARIANTS・BODY_VARIANTS 側

---

## 2. buttons-lab（ボタン選定）
- **角丸推奨**: 「住宅サイトには 0px もしくは 2px が品格を出す」（0=直角・最も建築的／2=ごく僅か／4=無難／8=柔らかい／999=ピル）
- **サイズ階層**: Small 44px(本文リンク)／Medium 52px(標準)／Large 60px(Hero/FinalCta)／X-Large 72px(最重要CTA)。「Hero・FinalCtaは大、本文中は中、リンク的誘導は小」
- **2026トレンド5パターン**: A.アウトライン→フィル(住宅・高級◎)／B.シマー(光が斜めに走る)／C.アロー連動／D.3D Press(押される物理感)／E.グラスモーフィズム(ダーク背景のみ)
- **カラー6案（神野さんの色違和感の出どころ＝重要）**:
  - ①現状: Primary茶×Secondary黒線（暖色とニュートラル混在）← **違和感の源**
  - ②黒系統一: Primary黒×Secondary黒線（Apple・Stripe風／最高に品格）
  - ③緑系統一: Primary緑×Secondary緑線（やまと主色）
  - ④茶系統一／⑤黒×茶ハイブリッド（黒の品格＋茶のブランド痕跡）／⑥ダーク背景での見栄え
- 配色: LINE`#06C755`／3D Press影`#9C5424`(accent暗色、`shadow-[0_6px_0_0_#9C5424]`)／シマーhover shadow`rgba(196,112,63,0.45)`(≒`#C4703F`)
- モーション値: シマー=`via-white/25`を`-translate-x-full→translate-x-full`700ms ease-out／アウトライン→フィル=`bg-text-primary`を`-translate-x-full→translate-x-0`500ms`cubic-bezier(0.16,1,0.3,1)`／hover`-translate-y-0.5`／アロー`translate-x-1`
- ボタン文言候補: 「来場予約」+「ご予約不要・無料」／「資料請求（無料）」／「LINEで聞く」(+「（最短10秒）」)／「電話で相談」「詳しく見る」
- ⚠️ CTA階層（来場予約Primary/資料請求Secondary/LINE Tertiary）はLINE主導線化(2026-05-05)より前の版＝順序は採用せずBRAND-TRUTH/line-first-cta-strategy が正本。文言・配色・モーション値のみ救出

---

## 3. 動画/Seedance

### 3-A. seedance-lab（FV動画候補・Seedance 2.0）
- ベース写真: 左京モデル 吹抜 `20230327-203.jpg`(俯瞰) と `20230327-184.jpg`(3/4 view)
- 全クリップ: Seedance 2.0 / 1080p / 16:9 / 5秒 / std。v2は2アングルを交互に挟み朝→昼→夕
- **6クリップ（プロンプト要素・評価・src）**:
  - Gacha1 子1人/ソファで絵本/静/overhead(203) `gacha1_1child_reading.mp4` ★★★★★「本命。俯瞰が綺麗に維持されFV用に最も安定」
  - Gacha6 親子/朝食/中/elevated(184) `gacha6_morning_breakfast.mp4` ★★★★★「階段+ダイニングが映る別の語り口」
  - Gacha5 子2人/床で積み木/中/overhead `gacha5_startimage_2children.mp4` ★★★★「start_image採用で建築忠実度が最高」
  - Gacha3 子3人/走り回る/動/overhead `gacha3_3children_running.mp4` ★★★★「ピーク。FVには情報量過多の可能性」
  - Gacha7 子1人/お絵かき/静/elevated `gacha7_1child_drawing.mp4` ★★★★★「光のビームが入る詩的なカット」
  - Gacha4 親子/折り紙/静/overhead `gacha4_grandma_origami.mp4` ★★★★「家族の親密感。結びに向く」
- **sequence_v2（本命・21.0秒）** `sequence_v2.mp4`: 順序 Gacha 1→6→5→3→7→4。俯瞰(203)と3/4(184)を交互、朝→昼→夕。0.6秒クロスフェード×5＋全体フェード。ビート: Open朝の静寂/Morning親子朝食/Build兄弟登場/Peak走る/Wind down集中/Resolve家族の時間
- sequence_v1（18.2秒）`sequence_v1.mp4`: Gacha 1→5→3→4（俯瞰のみ4本）
- **FVオーバーレイ仕様**: グラデ`linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.10) 18%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.78) 100%)`／数字=Oswald500`clamp(40px,5.6vw,92px)`ls-0.01em/和文=Noto Sans JP/Latin=Inter（明朝・ロゴ書体使わない）／数字主見出しpure white・サブwhite/65-95・罫線30%
- TrackRecord 4メトリクス: 600棟「以上のお引き渡し」/90区画「以上の自社分譲実績」/50組「以上のお客様の声」/14年「の家づくり実績」「2011年創立」。注記「※公開時点の累計実績。お引き渡し棟数は関連会社・前身を含む累計値の場合あり」
- ※ `/videos/seedance-lab/*.mp4` の動画資産は **削除しない**（memory: project_video_assets_archive。二次利用前提でアーカイブ）

### 3-B. zero-declaration-cinematic（費用見える化 動画版PoC）
- 見出し「後から増えやすい費用を、契約前に見える化します。」戦略見出し「Hero の 2,280万円〜 を、契約前に証拠で支える」
- 役割: Hero(2,280万円〜)の裏付けとして価格セクション直前に配置。「PriceSectionに進む前の最後の信頼の砦」
- 費用8項目フレーム: 仲介手数料・つなぎ融資→やまとでは発生しない／地盤改良→当社負担／火災保険・登記→含む／追加照明・カーテン・網戸・エアコン・外構一式→すべて標準（「他社が無駄」フレームの最終証拠）
- 技術: Seedance 2.0(start_image=空の家/end_image=callouts完成形)で補間→onEndedで400msクロスフェードして鮮明PNGに切替(日本語typographyは静止画側で保持)。動画はループしない(1回再生→静止画固定)
- 実装6手順: ①ゴール画像をgpt_image_2/high/2kで生成 ②clean start画像生成 ③seedanceで8秒補間 ④IntersectionObserver 35%でvideo.play() ⑤onEnded 400msクロスフェード ⑥reduced-motionは動画スキップ
- 数値: threshold0.35/クロスフェード400ms/動画約8秒/背景`#F7F5F0`/aspect16:9
- アセット: `/videos/zero-declaration-cinematic/transition.mp4`、`/zero-declaration-cinematic/goal.png`、`start.png`

---

## 4. money-wire（/money 全体レイアウト＋抑揚 v2 ワイヤー）
- **核**: 「03総額を墨反転ダークバンド＋2,280カウントアップ(最強の一撃)」「各セクション索引をsticky(雑誌の柱＝現在地のしおり)」「02比較バーの赤ハッチがscrollでscaleX伸長」「色・書体・罫線は不変。幅/明暗/スケールの3波でリズムだけ作る」
- HATCH: `repeating-linear-gradient(45deg, var(--color-signal) 0, var(--color-signal) 1.5px, transparent 1.5px, transparent 7px)`
- パララックス`.px-img`: `position:absolute;left:0;width:100%;top:-12%;height:124%;object-fit:cover`
- アニメ発火順序: ①家本体(ベース)が下から立ち上がる(両社同じだけ・先) →②大手だけ赤の無駄が横に伸びる(後)。`wireRiseBase` clip-path inset(100%→0) range`entry 6% cover 34%`／`wireGrow` scaleX(0→1) range`entry 24% cover 52%`／`pxMove` translateY(-7%→7%)
- **8セクション構成・文字量設計**: FV(画像のみ・LINEはsticky帯)／01標準仕様 STANDARD「標準で 自由に設計できます」(説明120字→0)／02価格のしくみ MECHANISM「完成までの費用を比較」tone=band(720字→約30字)／03総額 PRICE「2,280万円から建てられます」tone=dark(60字→約15字)／中盤休符=実写外観パララックス／04商品ライン PRODUCT「高水準標準装備＋自由設計」／05シミュレーション SIMULATOR「賃貸と持ち家を比較」tone=band`lg:grid-cols-[1fr_360px]`(左SimWire+右WarrantyPanel)／06支払いの実例 CASE「実際の支払い例」／07お客様の声 VOICE「建てたご家族に聞きました」tone=band／08ご相談 CONTACT「気になることから どうぞ」
- 標準仕様17項目順序(抜粋): 01外壁=旭化成PB/02制振=MIRAIE/03断熱=ウレタン吹付/04キッチン=クリナップ/05浴室=TOTOサザナ/06床暖房=大阪ガス/07サッシ=YKK AP/…ほか全17
- 02コスト比較: 一般的な大手の無駄=[広告費,展示場の維持費,中間マージン]。注記「赤＝家に乗らない無駄（金額は当社試算・参考値）」
- 03総額: 2,280万円〜。スタックバー「本体70%/付帯20%/諸費10%」。つなぎ融資=0円／地盤改良費=0円(いずれも「一般的に30〜80万円」)
- 04商品ライン: 花HANA 2,480/33坪4LDK「いちばん選ばれています」｜風KAZE 2,480/30坪4LDK｜京KYO 2,280/28坪3LDK
- 06支払い例: 京86,944円/風95,413円/京81,298円。脚注「試算用金利1.0%/35年/ボーナス払いなし」
- 08安心4語: 相談無料／営業電話はしません／急かしません／土曜も対応。LINEで届くもの「①あなたの総額目安 ②資金計画相談1,000件超の実例集」。CTA階段: LINEで相談する→モデルハウスを見学する→資料を請求する

---

## 5. zero-declaration-lab（費用見える化 リデザイン4案）
- 見出し「後から増えやすい費用を、契約前に見える化します。」BEFORE/DURING 2フェーズ×4=8項目を維持
- v2-01 Annotated Real Photo: 実写三山木モデルに手描きink callouts 8個(01-08引き出し線)。「実写+アナログでAI臭ゼロ」「やまとの実モデルを主役に」
- v2-02 Two Houses Compared: 一般的な家(×赤タグ散乱)vsやまと(○緑タグ整然)。「混沌vs秩序が一瞬で」。cons「他社vs当社フレーミングが強い→安い→他社が無駄frameと要整合」
- v2-03 Process Timeline(5 phases): 土地探し→設計→契約→施工→引渡しに費用を時系列配置＋手描きアイコン(測量杭/コンパス/印鑑/足場/鍵)
- v2-04 Architectural Elevation+8 Callouts: 立面詳細図+8本引き出し線。「建築図面アート」。cons「費用は家の部位とは紐づかない(営業フェーズの問題)」
- canonical数値: 仲介手数料¥50万〜100万／つなぎ融資¥30万〜80万／地盤改良 最大150万 当社負担（ZeroDeclaration.tsx の FEES_BEFORE/FEES_DURING に既存）
- 著者所感「01 Receipt が契約前透明性のメタファーとして最強。03 Ledger も古谷社長の正直な職人声と相性」（Receipt/Ledger案は本ファイルに画像/intent無し・名前のみ）

---

## 6. works-lab（施工事例 4枚ギャラリー圧縮 3案）
- ユーザー指示: PhotoBreath(terrace)撤去済／施工事例を4枚ギャラリーに圧縮／施工事例ページ動線／コンパクトでいい／クラスタ世界観継承
- 採用後方針: mockに忠実、写真は既存works(case1-3-ext/works-01-05)から4枚、CTA「事例をもっと見る →`/works`」
- w-01 Asymmetric Magazine: 左大判+右トリオ。「新建築誌spread級」。cons縦が嵩む
- w-02 Horizontal Strip: 4枚同サイズ縦長を横一列・filmstrip。「最もコンパクト・指示に最忠実」。cons整然すぎ／既存写真と縦長アスペクト不一致の懸念
- w-03 Hero+Trio: 左大判(4:5)+右縦積み3枚(横長)
- 世界観: 暖紙`#F7F5F0`/墨黒`#1A1815`/深緑`#143426`単一アクセント/Zen Old Mincho見出し/FIG.NN eyebrow/ActionLine CTA
- 著者所感「w-02がコンパクトに最忠実。w-01がアートディレクション最強。w-03はHero1枚依存でリスク」
- 現状問題「横カルーセル(snap-x)で8件並列＝スクロール量大・冗長」

---

## 7. 地図

### 7-A. map-lab（Leaflet地図デモ）
- **ライブラリ**: Leaflet 1.9.4 + React-Leaflet 5.0.0。タイル全て無料・無制限。月額0円。Leafletはwindow依存のため`ssr:false`動的import
- **タイルスタイル（URL逐語）**:
  - positron(明るくミニマル・推奨)「https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png」
  - toner(モノクロミニマル)「https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png」
  - voyager(バランス型)「https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png」
  - osm(情報量多)「https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png」
- 地図中心 [34.7, 135.76] zoom10。本番は Nominatim で全区画一括ジオコーディング可能
- **やまとブランド緑ピン(SVG)**: fill`#5A8A4A`、中央円`#FAFAF7` r6、影 dy2 stdDeviation2 opacity0.35、iconSize[36,48] anchor[18,48]、path`M18 0 C8.06 0 0 8.06 0 18 C0 30.5 18 48 18 48 C18 48 36 30.5 36 18 C36 8.06 27.94 0 18 0 Z`
- ポップアップ配色: cityラベル`#5A8A4A`、title`#2B2B2B`、area/price`#6B6B6B`、画像背景`#F5F5F2`(4:3)、CTA「詳しく見る →」`#5A8A4A`、リンク`/lots/{id}`
- ⚠️ デモ6件の座標・価格・区画数は手動デモ値（BRAND-TRUTH要照合）

### 7-B. map-bridge-lab（MapBridgeセクション 3案・2026-05-09）
- **canonicalテキスト3点（実装で使う）**: Header「Lots & Land.」／Subhead「27区画 公開中。奈良・京都南部、地域を知り尽くした家づくり。」／Lead「自社で土地を仕入れ、自社で分譲します。土地探しから建物まで、まとめてご相談ください。」
- 地図: interactive Leaflet(CartoDB Positron + 深緑ピン)を中央
- v5-01 Centered Elegance(縦フロー・classic editorial・cluster整合最強)／**v5-02 Asymmetric Stacked（推奨）**=左40%に「Lots/& Land.」縦積みitalic+右60%大判grayscale地図「マガジン芸術監督的・他社で見ない・PC圧倒的インパクト」／v5-03 Overlay Card(全面地図+左下warm paper card overlay)

---

## 8. standard-equipment-lab-v2（標準仕様 4案・2026-05-08）
- 見出し「この価格で、ここまで標準。」標準=**17項目**（メーカー名/型番は `reference_yamato_standard_spec_canonical.md` が正本）
- **世界観トークン**: 暖紙`#F7F5F0`/墨黒`#1A1815`/深緑`#143426`単一アクセント/手描きink/新建築語彙
- **AI smellゼロ宣言（プロンプト必須）**: vector flat / SaaS / lime / 3D / drop shadow すべて不可 を毎回宣言
- 現行の弱み「左ヘッダー+右4列table、dot legendだけ・グレード感ゼロ」
- v2-01 Cross-Section+17 Callouts: 断面図1枚に17 callouts全部。「最強のVisualize、ZeroDeclaration FIG.02と連続感最強」。cons モバイルで潰れる/17項目差替で再生成
- v2-02 Spec Schedule(4 Categories: キッチン水回り/構造/断熱/外構): [STANDARD]スタンプ。「実装で差替やすく再生成不要」。cons cold
- v2-03 Editorial Spread: 左60%大キッチンink+右40%17行リスト。「新建築の権威感」
- v2-04 Room Walkthrough(4 panels): 部屋スケッチ非対称2×2。「体感的、cognitive load最低」。cons 4 sketchを別画像で再生成必要

---

## 9. concept-lab（Concept→Pricing 圧縮案）
- Plan A 現状(4セクション): Concept+Mechanism+Zero(8項目)+Price ＝1,233行
- **Plan B（デフォルト選択）Mechanism主役(3セクション)**: Concept削除→Mechanism統合 + Zero teaser(3項目) + Price ＝≈530行。構成=MechanismEnhanced+ZeroTeaser+PriceSection
- Plan C 統合WhyYamato(2セクション): Concept+Mechanism+Zero teaserを1セクションに統合+Price ＝≈700行。構成=WhyYamato+PriceSection
- 確定フォント: B(Shippori)+IV(Industrial: Oswald+Noto Sans JP 500)
- 理由付きTODO: 「Plan B/Cで『8つのゼロ宣言を全て見る →』のリンクは未設置(/zeroページ未作成)。本決定後に作成」
- ⚠️ 依存コンポーネント `@/components/concept-lab/ZeroTeaser`(ゼロ宣言3項目teaser) / `@/components/concept-lab/WhyYamato`(Concept+Mechanism+Zero統合の単一セクション) ＝concept-lab削除時に巻き添えで消える。採用判断が済んでいなければ移設要否を確認

---

## 10. b-plan/page 2.tsx（B-plan 旧エディトリアル版・2026-05-10、現行page.txに未継承）
**「大手で見た家を、あきらめる前に。」を軸にLP心理設計を7セクションで組んだ別案。コピーと「セクション英ラベル＝設計意図」が貴重。**

- palette: paper`#F7F5EF`/paperAlt`#EFEAE0`/ink`#1D1B18`/sub`#6F685F`/line`rgba(29,27,24,0.14)`/green`#245343`/greenDark`#17392F`/clay`#B9825D`/warm`#FFFDF8`
- metadata: title「大手で見た家を、あきらめる前に。 | やまと不動産 BPlan」/ description「大手の見積もりを見て不安になった方へ。奈良・京都南部で、土地・建物・諸費用・追加になりやすい項目まで同じ表で確認する家づくり。」
- **Hero**: バッジ「大手の次に、落ち着いて比べるためのTOP」/ h1「大手で見た家を、あきらめる前に。」/ リード「モデルハウスでは良かった。でも、見積もりを見たら少し怖くなった。その段階で、やまと不動産に来てください。土地、建物、諸費用、追加になりやすい項目まで、同じ表で確認します。」
- Heroカード: 「FIRST ANSWER」/「まず決めるのは、「どの家」より「買える総額」。」/「決める前に、比べる。比べる前に、見える化する。」
- ヘッダー添字「総額から考える家づくり」/ ナビ「不安の正体」「進め方」「標準仕様」「決め手」/ CTA「総額を知る」「見学予約」
- PrimaryActions: 「LINEで土地込み総額を知る」/「大手の見積もりと比べる」
- **不安カード3枚**: 「総額が見えない」「建物本体、土地、諸費用、外構、追加仕様。別々に見るほど、最後の支払いが読みにくくなります。」／「標準とモデルの差が怖い」「モデルハウスで良いと思ったものが、実際にはどこまで標準なのか。ここが曖昧だと決められません。」／「営業されるのが重い」「まだ契約したいわけではない。ただ、自分たちに届く金額なのかだけ先に知りたい段階があります。」
- **進め方3ステップ**: 01「見積もりを、分解する」「建物本体だけでなく、土地・付帯工事・諸費用・追加になりやすい項目まで同じ表へ並べます。」／02「標準仕様を、写真で確かめる」「紙の仕様ではなく、キッチン、床、建具、外観など、実際の見え方で判断できるようにします。」／03「買える総額から、家を戻す」「憧れを削るのではなく、支払いの上限から土地と建物のバランスを整えます。」
- **理由4項目**: 自社分譲地／設計と施工の近さ／標準仕様の見える化／地域の土地感覚（各説明文は本文参照）
- **標準仕様3枚**: 「キッチン収納まで、最初に見る。」(`/images/works-parts/kitchen/kitchen-03.webp`)／「LDKの質感を、写真で比べる。」(`living-02.webp`)／「外観も、価格の外に置かない。」(`exterior-05.webp`)
- **決め手物語3枚**: 「大手のあとに比べて、納得できた。」(`cover-8.webp`)／「土地と建物を一緒に考えられた。」(`cover-1.webp`)／「標準仕様のままでも、十分だと思えた。」(`cover-4.webp`)
- **「あとから増えやすい費用」リスト**: 仲介手数料／地盤改良費／小運搬費／職人駐車場代／打合せ追加費用／モデルハウス差額（各「0?」表示。注記「※土地条件・建築条件・金融機関条件により扱いが変わる項目があります。」）
- **セクション英ラベル＝設計意図（なぜの記録・逐語）**:
  - 01 READER PSYCHOLOGY「怖いのは、高いことではなく、最後の金額が読めないこと。」
  - 02 SALES STRUCTURE「このページの仕事は、売り込むことではなく、迷いを順番にほどくこと。」
  - 03 WHY YAMATO「安く見せるのではなく、増えにくい理由を見せる。」
  - 04 STANDARD「標準仕様は、価格表より先に写真で伝える。」
  - 05 BEFORE EXTRA COST「あとから増えやすいものを、先に言う。」
  - 06 MEMORY「人は、理屈だけで問い合わせない。決め手の物語を覚えている。」
  - 07 LOW FRICTION CTA「売り込まれる前に、まず総額だけ確かめる。」
- COMPARISON NOTE「坪単価より、契約前に見えている項目の数。」チップ「建物本体」「土地」「付帯工事」「諸費用」「追加になりやすい項目」
- 最終CTA: 「NEXT ACTION」/ h2「家を決める前に、買える総額を決めましょう。」/「まだ土地がなくても構いません。最初の行動は、契約ではなく確認です。」階段=「LINEで総額を知る」「モデルハウスを見る」(`/reserve`)「資料で比べる」(`/contact`)
- タイポ/質感: 本文`var(--font-murecho-var)`、全要素`letter-spacing:0`（明朝不使用・字間ゼロ）。紙質ドット`.bplan::before`=`radial-gradient(#1D1B18 0.7px, transparent 0.7px) size 6px opacity 0.035 mix-blend-multiply`。easing`cubic-bezier(0.16,1,0.3,1)`

---

## 削除実行リスト（本ファイル作成後に削除）
- ラボ15ページ: buttons-lab, map-lab, hero-lab, hero-review, seedance-lab, concept-lab, money-wire, hero-a, style-tiles, works-lab, zero-declaration-lab, zero-declaration-cinematic, standard-equipment-lab-v2, hero-wireframes, map-bridge-lab
- 重複ファイル: `src/app/b-plan/page 2.tsx`
- ラボ専用コンポーネント: `src/components/concept-lab/`（ZeroTeaser/WhyYamato が本番未使用なら）
- 孤児: `src/components/voice/VoiceFilterableList.tsx`（/voice改修で未使用化）
- 一時物: `scripts/_snap_*.mjs`、`screenshots/`（_montages含む）、未使用画像（_wire-*.png / contact-consult-alt.webp / warranty-cutaway-b.webp / money-fv.webp）
- ※ `/public/videos/seedance-lab/*` `/public/videos/zero-declaration-cinematic/*` の動画は **保持**（二次利用前提）
