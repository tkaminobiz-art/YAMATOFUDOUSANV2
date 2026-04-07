const items = [
  {
    n: "01",
    title: "仲介手数料 ゼロ",
    desc: "自社で土地を分譲しているから、仲介を挟みません。",
  },
  {
    n: "02",
    title: "つなぎ融資の負担 ゼロ",
    desc: "土地と建物をセットでお渡しするから、二重ローンの期間が発生しません。",
  },
  {
    n: "03",
    title: "地盤改良費 ゼロ",
    desc: "地盤に弱さが見つかっても、最大150万円まで会社が負担します。",
  },
  {
    n: "04",
    title: "小運搬費・手上げ費用 ゼロ",
    desc: "トラックが入れる土地だけを分譲地として選んでいるからです。",
  },
  {
    n: "05",
    title: "職人の駐車場代 ゼロ",
    desc: "分譲地内に作業スペースを確保しているから、追加でかかりません。",
  },
  {
    n: "06",
    title: "「ふかし請求」 ゼロ",
    desc: "現場管理費の不透明な上乗せは、ありません。",
  },
] as const;

export default function ProofSection() {
  return (
    <section
      className="bg-[color:var(--color-bg-primary)] px-5 py-24 md:px-8 md:py-32 lg:py-40"
      aria-labelledby="proof-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="proof-heading"
          className="text-center font-mincho text-[26px] leading-snug tracking-wide text-[color:var(--color-text-primary)] md:text-[32px] lg:text-[38px]"
        >
          見えない費用が、ありません。
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-[1.9] text-[color:var(--color-text-primary)] md:mt-8 md:text-[16px]">
          他社では当たり前にかかる費用が、やまとでは「ゼロ」です。
        </p>
        <ul className="mt-12 grid list-none gap-6 md:mt-14 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.n}
              className="relative rounded-lg border border-[color:var(--color-text-primary)]/15 bg-white/60 p-6 md:p-8"
            >
              <span
                className="pointer-events-none absolute right-5 top-5 font-mincho text-5xl font-light leading-none text-[color:var(--color-accent)]/30 md:right-6 md:top-6 md:text-6xl"
                aria-hidden
              >
                {item.n}
              </span>
              <p className="pr-14 font-sans text-[18px] font-medium leading-snug text-[color:var(--color-text-primary)] md:text-[20px]">
                {item.title}
              </p>
              <p className="mt-3 text-[14px] leading-[1.9] text-[color:var(--color-text-primary)] md:text-[15px]">
                {item.desc}
              </p>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-14 max-w-2xl space-y-2 text-center text-[15px] leading-[2] text-[color:var(--color-text-primary)] md:mt-16 md:text-[16px]">
          <p>これらは、削ったわけではありません。</p>
          <p>もともと、必要のない費用だっただけです。</p>
        </div>
      </div>
    </section>
  );
}
