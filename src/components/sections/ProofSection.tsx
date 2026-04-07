const rows = [
  {
    voice:
      "竣工後の追加費用がなかったことに感謝しています。とても安心できました。",
    price: "税込 1,980 万円〜",
  },
  {
    voice:
      "見積もり通りで終わると聞いていましたが、本当にそのままでした。",
    price: "税込 1,980 万円〜",
  },
  {
    voice:
      "打ち合わせのたびに金額が増えるのが心配でしたが、ここでは一度もありませんでした。",
    price: "税込 1,980 万円〜",
  },
] as const;

export default function ProofSection() {
  return (
    <section
      className="bg-[color:var(--color-bg-primary)] px-5 py-16 md:px-8 md:py-24 lg:py-28"
      aria-labelledby="proof-heading"
    >
      <div className="mx-auto max-w-4xl">
        <h2
          id="proof-heading"
          className="mb-10 text-center text-xl leading-snug tracking-wide text-[color:var(--color-text-primary)] md:mb-12 md:text-2xl"
        >
          多くのお客様が「追加費用ゼロ」で家を建てています
        </h2>
        <div className="hidden md:block">
          <table className="w-full border-collapse text-left text-[15px] leading-relaxed text-[color:var(--color-text-primary)] md:text-base">
            <thead>
              <tr className="border-b border-[color:var(--color-text-primary)]/20">
                <th className="pb-3 pr-4 font-mincho font-medium tracking-wide">
                  お施主様の声（抜粋）
                </th>
                <th className="w-[11rem] pb-3 font-mincho font-medium tracking-wide">
                  金額
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.voice}
                  className="border-b border-[color:var(--color-text-primary)]/12 align-top"
                >
                  <td className="py-4 pr-4">{row.voice}</td>
                  <td className="py-4 whitespace-nowrap">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="space-y-6 md:hidden">
          {rows.map((row) => (
            <li
              key={row.voice}
              className="rounded-lg border border-[color:var(--color-text-primary)]/15 bg-white/40 p-4"
            >
              <p className="text-[15px] leading-relaxed text-[color:var(--color-text-primary)]">
                {row.voice}
              </p>
              <p className="mt-3 text-sm font-medium text-[color:var(--color-accent)]">
                {row.price}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-[color:var(--color-ink-muted)] md:mt-10">
          （※内容はイメージです。必要に応じて実データに差し替えてください。）
        </p>
      </div>
    </section>
  );
}
