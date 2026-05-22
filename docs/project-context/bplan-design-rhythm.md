# BPlan Design Rhythm Rule

Bプランは、日本語Webの読みやすさと住宅相談の温度感を優先する。  
見た目の派手さよりも、ページ全体を一冊の編集物として読めるリズムを重視する。

## 基本方針

- 生の数値をその場で増やさない。フォントサイズ・行間・余白はBプラン専用トークンを起点にする。
- 日本語は画数密度が高いため、本文はやや大きめ、行間は広め、文字間はわずかに空ける。
- セクション単位で別々の物差しを作らない。まず共通リズムに乗せ、必要な場所だけ例外調整する。
- 美しさだけでなく、相談前の不安をほどく営業ページとして読めることを優先する。

## Typography

Bプラン本文は `Murecho`、主要見出しは既存の明朝系表現を使う。  
ただし、サイズ・行間・文字間は `.bplan-rhythm` のトークンに従う。

```css
--bp-type-caption: clamp(11px, 0.68rem + 0.04vw, 12px);
--bp-type-small: clamp(13px, 0.78rem + 0.08vw, 14px);
--bp-type-body: clamp(15px, 0.93rem + 0.14vw, 17px);
--bp-type-lead: clamp(16px, 0.98rem + 0.32vw, 20px);
--bp-type-h3: clamp(22px, 1.32rem + 0.55vw, 28px);
--bp-type-h2: clamp(30px, 1.82rem + 0.82vw, 42px);
--bp-type-display: clamp(38px, 4.4vw, 64px);
```

本文の基本行間は `1.88` 前後。  
見出しは `1.35` から `1.42` を基準にし、巨大見出しだけ局所的に締めてよい。

文字間は原則 `0.035em` から `0.04em`。  
数字・欧文ラベル・価格表示は例外として `0` または専用trackingを許可する。

## Spacing

余白は8pxグリッド系の意味トークンに寄せる。

```css
--bp-space-xs: 8px;
--bp-space-sm: 16px;
--bp-space-md: 24px;
--bp-space-lg: 48px;
--bp-space-section: clamp(88px, 8.4vw, 144px);
--bp-space-section-tight: clamp(72px, 7vw, 120px);
--bp-gutter: clamp(20px, 4vw, 56px);
```

PCのセクション余白は基本 `--bp-space-section`。  
文脈が近いセクションやCTA手前は `--bp-space-section-tight` を使う。

SPの左右余白は最低 `20px`。テキストを画面端に寄せない。

## Japanese Wrapping

- 見出しは `text-wrap: balance` を基本にする。
- 本文は `text-wrap: pretty` と `word-break: auto-phrase` を基本にする。
- 不自然な改行が出る場合は、フォントサイズを小さくする前に、文言・コンテナ幅・改行位置を調整する。

## Exceptions

例外は許可する。ただし、以下のいずれかの理由がある場合に限る。

- FVの第一印象を強めるため
- 価格・月々返済・棟数など、数字を主役にするため
- 比較表や注記など、情報密度の高いUIを読ませるため
- 手書き風レビューなど、意図的に人の温度を出すため

例外を入れる場合も、セクション全体の共通リズムを壊さず、対象セレクタをできるだけ狭くする。

## Current Implementation

現在のBプランでは、`src/app/b-plan/page.tsx` の `.bplan-rhythm` がこのルールを担う。  
新しいセクションを追加するときは、まず `.bplan-rhythm` のトークンを使い、必要な場合だけ局所上書きする。
