// 検証ページ(/hero-review, /*-lab)の最上部に常時表示する注意書き。
// 「コンプ画像はレイアウト・余白・配色・写真扱いの方向性のみで、ロゴ・コピー・写真・数字・CTA は
//   実装時に BRAND-TRUTH.md の正規アセットへ差し替える」を全レビューページで同じ文言で出す。
// 各 lab ページから <LabDisclaimer /> を 1 行で呼ぶだけで挿入できる。
//
// 同梱ルール: 全 lab ページは納品前に `BRAND-TRUTH.md` §9 の通り削除する。

export function LabDisclaimer() {
  return (
    <aside
      role="note"
      aria-label="Lab page disclaimer"
      className="border-b border-amber-300/40 bg-amber-50/[0.97] text-amber-950"
    >
      <div className="mx-auto flex max-w-[1400px] flex-col gap-2 px-6 py-4 text-[12px] leading-relaxed md:flex-row md:items-start md:gap-4">
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded bg-amber-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-amber-50 self-start">
          <span aria-hidden>!</span>
          <span>Reference only</span>
        </span>
        <p className="flex-1">
          このページに表示されているのは、Hero リニューアル方向性の確認用に GPT Image 2 で
          生成したデザイン<strong>カンプ</strong>です。<strong>画像内のロゴ・日本語コピー・写真・価格や実績の数字・CTA文言は
          すべて仮置き</strong>で、実装時には{" "}
          <a
            href="https://github.com/anthropics/claude-code"
            className="hidden"
            aria-hidden
          >
            placeholder
          </a>
          <code className="rounded bg-amber-900/10 px-1 text-[11px]">BRAND-TRUTH.md</code>{" "}
          に書かれた正規ロゴ（<code className="rounded bg-amber-900/10 px-1 text-[11px]">/images/logo.png</code>）・確定コピー・実写写真・正規の数字（京 2,280 万円〜／600 棟以上 等）・LINE 主導線 CTA に差し替えます。
          <br />
          画像から拾うのは <strong>レイアウト・余白・配色・写真の見せ方・モード</strong> だけ。中身の正本はリポジトリ直下の{" "}
          <code className="rounded bg-amber-900/10 px-1 text-[11px]">BRAND-TRUTH.md</code>{" "}
          が常に勝ちます。
        </p>
      </div>
    </aside>
  );
}
