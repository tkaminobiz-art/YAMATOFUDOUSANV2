# YAMATOFUDOUSANV2

やまと不動産 公式サイト リニューアル V2

## 概要

奈良の注文住宅工務店「やまと不動産」の公式サイト。
注文住宅シリーズ「花鳥風月」（最上位モデル「花」）を主役に据えた LP 型サイト。

## 技術スタック

- Next.js 16（App Router）
- React 19
- TypeScript
- Tailwind CSS v4
- Vercel（デプロイ）

## 開発

```bash
npm install
npm run dev
```

開発サーバーは http://localhost:3000 で起動する。

## ビルド

```bash
npm run build
npm run start
```

## 運用

- main ブランチ直push 運用
- main への push で Vercel が自動デプロイ
- 詳細は `/やまと不動産HP V2/指示書/00_運用ルール.md` を参照
