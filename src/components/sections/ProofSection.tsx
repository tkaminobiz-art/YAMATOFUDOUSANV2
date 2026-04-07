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
      className="bg-[color:var(--color-bg-primary)] px-5 py-32 md:px-8 md:py-48 lg:py-64"
      aria-labelledby="proof-heading"
    >
      <div className="mx-auto max-w-6xl">
        <h2
          id="proof-heading"
          className="text-center font-mincho text-[28px] leading-snug tracking-[0.08em] text-[color:var(--color-text-primary)] md:text-[40px] lg:text-[52px]"
        >
          見えない費用が、ありません。
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-[15px] leading-[1.9] text-[color:var(--color-text-primary)] opacity-70 md:text-[17px] lg:text-[19px]">
          他社では当たり前にかかる費用が、やまとでは「ゼロ」です。
        </p>
        <ul className="mt-12 grid list-none gap-8 md:mt-14 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12">
          {items.map((item) => (
            <li
              key={item.n}
              className="relative overflow-hidden rounded-none border border-[color:var(--color-text-primary)]/20 bg-white p-8 shadow-[0_2px_24px_rgba(61,50,41,0.06)] md:p-10 lg:p-12"
            >
              <span
                className="pointer-events-none absolute left-6 top-4 z-0 font-mincho text-[64px] font-light leading-none text-[color:var(--color-accent)]/20 md:text-[80px] lg:text-[96px]"
                aria-hidden
              >
                {item.n}
              </span>
              <div className="relative z-10 pl-[4.25rem] pt-1 md:pl-[5.25rem] lg:pl-[6.25rem]">
                <p className="font-sans text-[20px] font-medium leading-snug text-[color:var(--color-text-primary)] md:text-[22px] lg:text-[24px]">
                  {item.title}
                </p>
                <p className="mt-3 text-[15px] leading-[2] text-[color:var(--color-text-primary)] md:text-[16px] lg:text-[17px]">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-24 max-w-2xl space-y-2 text-center font-mincho text-[18px] font-light leading-[2] text-[color:var(--color-text-primary)] md:mt-32 md:text-[22px] lg:text-[26px]">
          <p>これらは、削ったわけではありません。</p>
          <p>もともと、必要のない費用だっただけです。</p>
        </div>
      </div>
    </section>
  );
}
