# 引き継ぎ書（デスクトップアプリ → Cursor 移行） 2026-06-03

このセッションの成果と、Cursorで続ける際の「現状・やること・分業」をまとめた引き継ぎ書。
新しいセッション（Claude Code / Codex）はまずこれを読めば cold start で続行できる。

---

## 0. 最初に読む順序（必読・正本）
1. `BRAND-TRUTH.md`（ブランド事実・数字・CTA階層・禁止事項＝最優先）
2. `AGENTS.md`（Git作法・日本語コピーハードルール・実写真ルール等）
3. `docs/project-context/` 配下：
   - `bplan-v2-architectural-line-system.md`（新デザインシステム正本）
   - `bplan-v2-redesign-spec.md`（v2再設計スペック）
   - `conversion-sales-rulebook.md` / `top-section-structure.md` / `kobayashi-review-20260428.md` / `12-rate-gaps.md` / `line-first-cta-strategy.md` / `bplan-design-rhythm.md`

> ⚠️ **repo外の知見**：コピーの自然さ系ガードレール（natural-japanese の `over-minimalist.md`/`clever-paraphrase.md`、copywriter の STEP0素の説明体・VP opt-in 等）は `~/.claude/skills/` にある。**同一Mac上のClaude Codeは読めるが、Codexは読めない**。Codexに日本語コピーを触らせる時は、AGENTS.md §日本語ハードルール＋下記「コピー三原則」を明示すること。
> 自動メモリ（やまと固有の決定事項）も repo 外（`~/.claude/projects/.../memory/`）。Codexには本書＋BRAND-TRUTHで代替する。

---

## 1. 環境の変化
- 作業環境：**デスクトップアプリ → Cursor**（同一プロジェクトで Codex と Claude Code を併用）
- **役割分担**：Codex＝画像生成（gpt-image-2・ChatGPT Proログインで追加課金なし）／Claude Code＝実装・コピー・設計。Higgsfield MCP も OpenAI APIキーも不要。
- 画像が要る時の運用：ユーザーが Claude Code に「Codex指示書を作って」と依頼 →（§6参照）。

---

## 2. 現状（2026-06-03 時点）
- ブランチ `main`、**origin同期済み**。直近コミット：
  - `4738d23` Hero ソフトブリード一体化＋モバイル画像先
  - `2a6b62f` 検証バリアント /b-plan-v2（data-hero＋Architectural Line図解）
  - `269a342` 信頼ブロック等コピーを素の説明体に
  - `d016e24` brand-facts モジュール一元化
- 未コミット：`screenshots/lots-*.png`（作業外・触らない）
- **ルート**：`/b-plan`（=B 既存）／`/b-plan-v2`（=C 検証版・今回の主作業）
- **採点**：design-critic B57→C77、lp-psych B62→C77（独立エージェント採点でもC勝ち）。

### /b-plan-v2 に実装済み（live）
- **Hero**：data-hero（数字2,280主役・深緑Oswald）＋実績レール(600棟/14年/1,000件/50組)＋グレード済み実写Hero(`public/images/bplan/hero-interior-v2.webp`)。**ソフトブリード**（デスクトップ＝写真左端を生成りへフェード／モバイル＝写真上・テキスト下＋下端フェード）。
- **PaymentCases（クライマックス）**：心情カーブ(`EmotionCurve`)＋月々86,944(AnimatedNumberカウントアップ)＋深緑3段内訳バー。
- **#cost**：一貫構造プロセス図(`ProcessFlow`)＋比較ボード。
- **no surprise**：要確認費用アイコン(`CostCheckIcons`)。
- **#action**：意思決定ファネル(LINE→見学→フォーム・正順／**CTA順序バグ修正済み**)。
- 全セクション h2＝talk(40px)階層／声量3段階トークン／深緑データ色／`AnimatedNumber`(reduced-motion対応)。
- コンポーネント：`src/components/bplan/AnimatedNumber.tsx`、`src/components/bplan/diagrams/{ProcessFlow,CostCheckIcons,EmotionCurve}.tsx`。

---

## 3. これからやること（backlog・優先度つき）

### P0（方針決定）
- **CをどうするかをADが決める**：C(/b-plan-v2)を本採用 → B(/b-plan)を置換 or 本番化するか。lab運用なら納品前に削除（他lab同様）。

### P1（構成の整理＝構成調査の宿題）
- **代表2名を `#trust` から外し `/staff` へ撤去**（top-section-structure L42準拠。序盤の自社紹介はrulebook違反）。実績レール(600棟等)は前半に残す。
- **#truth(不安)を2番目へ昇格**、`#voice-proof`(声)を実例の後ろへ。
- **商品ライン(花/風/京 3モデル)・他府県移住者ターゲット・BreathStrip(scroll呼吸)を落とさない**（構成いじりで消さない）。
- FAQ(最大の恐怖「後から増える」)の扱い：新設 or #costで直答かをADと確認。

### P2（仕上げ）
- 写真キュレーション＆暖色グレードを**ギャラリー/実例にも展開**（living-05/06/11等が格上、living-01は弱い。grade: ImageMagick `-modulate 104,87 / R×1.05 B×0.96 / sigmoidal-contrast 2,52%`）。
- 残り図解：① コスト氷山／⑤ 対話フロー は「既存と重複/リスク」で**保留中**。入れるなら比較ボード統合・スライダー置換で対応。
- a11y フルパス（テラコッタは v2 で `#8a5232` に濃色化済み＝AA）。モバイル全セクション目視。

### P3（売上の本丸＝ページより優先ROI高い：12-rate-gaps）
- **3動線**：GBP口コミ（★4.5×30件達成後に公開ブリッジ）／OB紹介の入口／**未公開土地をLINE登録者に先行案内**（CTAコピーにフック）。

---

## 4. 画像生成の分業ワークフロー（Codex × Claude Code）
1. 画像が要る時、ユーザーが Claude Code に「**Codex指示書を作って**」と依頼。
2. Claude Code が **Codex用プロンプト＋保存パス＋制約**を1枚にまとめて渡す。
3. ユーザーが Cursor で Codex に投げる（`$imagegen` / 自然言語。Proログインで追加課金なし）。
4. Codex が `public/images/...` に保存 → パスを Claude Code に伝える → Claude Code が `next/image` で配線。

**画像の制約（死守）**
- **家・内観・人物は実写真のみ**（AI完成予想図は禁止＝BRAND-TRUTH §1）。Codexに住宅写真を捏造させない。
- **概念・工程・費用・保証の図解/イラスト/テクスチャはOK**（むしろ新主役）。ただし**主要図解は手起こしSVG推奨**（トークン駆動・軽量・アニメ可）。Codexはラスターのコンプ/テクスチャ/装飾向き。
- 画風＝「Architectural Line」（深緑ヘアライン×生成り×木目／グラデ・影・多色塗り禁止）。詳細は `bplan-v2-architectural-line-system.md`。

---

## 5. コピー三原則（Codexにも明示する）
1. **素の説明体**（実在のスタッフが客の前で言う言葉）。体言止め連続・倒置・読点"間"・比喩動詞(立ち会う/寄り添う)・中黒名詞列挙・賢い言い換えはNG。
2. **canonical標準語**（お客様の声・スタッフ・施工事例・自社分譲地…）。動詞+人型・疑問形・感情断定はNG。
3. **過剰断定しない**（つなぎ融資=原則発生しない/地盤改良=お客様請求にしない は可。"全部かからない"等の一括り断定は不可）。新規コピーはコミット前にAD確認。

---

## 6. 落とし穴メモ
- **dev server**：`npm run dev`（:3000）。`/b-plan-v2` で確認。lg(1024)以上でないとHeroのデスクトップ表示(soft-bleed/2カラム)にならない。
- **CTA正順**：LINE > 見学(/reserve) > フォーム(/contact) > 電話（line-first）。過去に見学/フォームが逆のバグあり→v2修正済み。`/b-plan`(B)側は未確認。
- **スタッフ平等**：代表2名は同カード形状・同サイズ。「同格の二人」コピーは禁止（社長/専務と普通に書く）。
- **Git**：他エージェント/ユーザーの未コミット変更を巻き込まない・消さない。タスクのファイルだけ add。

---

## 7. 一言サマリー
**C(/b-plan-v2)＝「総額が見えるデータ体験 × Architectural Line図解 × ソフトブリードHero」で、独立採点でもBに勝った検証版。** 次はAD判断（C本採用）→ 構成整理(代表撤去・不安昇格)→ 写真展開 → 売上3動線、の順。画像はCursorでCodex(Pro)に作らせ、Claude Codeが実装する分業に移行。
