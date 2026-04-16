const ROWS = [
  { label: "価格（税込・コミコミ）", hana: "2,480万円", kaze: "2,480万円", miyako: "2,280万円" },
  { label: "延床面積", hana: "33坪（109㎡）", kaze: "30坪", miyako: "28坪" },
  { label: "間取りの目安", hana: "4LDK", kaze: "4LDK", miyako: "3LDK" },
] as const;

export default function PriceSection() {
  return (
    <section
      id="product"
      className="scroll-mt-20 bg-bg-secondary py-[var(--section-py)] md:scroll-mt-24"
    >
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
        <p className="font-section-label text-main text-xs md:text-sm mb-4 tracking-[0.15em]">
          PRICING
        </p>
        <h2
          className="text-[clamp(22px,3vw,36px)] text-text-primary mb-4 leading-[1.5]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          花・風・京｜参考プランと価格帯
        </h2>
        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed max-w-[640px] mb-10">
          税込・建物本体・付帯工事込みのコミコミ価格として、3モデルを並べて比較できます。土地代・登記等は含みません。間取りや坪数の目安は、ご家族に合わせて調整します。
        </p>

        {/* 大判価格表示 */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-baseline justify-center gap-2">
            <span
              className="text-text-secondary text-base md:text-lg font-normal"
            >
              2,280万円から
            </span>
          </div>
          <div className="flex items-baseline justify-center gap-2 mt-2">
            <span
              className="text-text-primary font-light text-[clamp(48px,6vw,80px)] tracking-tight"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              2,480
            </span>
            <span className="text-text-primary text-xl md:text-2xl font-normal">
              万円〜
            </span>
          </div>
          <p className="text-text-secondary text-xs md:text-sm mt-3">
            税込・建物本体・付帯工事込み（コミコミ価格）
          </p>
        </div>

        {/* 3プラン比較表（簡略版：価格・広さ・間取りの目安のみ） */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-main">
                <th className="py-3 px-4 text-left text-text-secondary font-normal w-[180px]" />
                <th className="py-3 px-4 text-center">
                  <span className="text-main text-lg" style={{ fontFamily: "var(--font-sans)" }}>花</span>
                  <span className="text-text-secondary text-xs ml-1">hana</span>
                  <span className="block text-[10px] text-text-secondary mt-1">ゆとりのある4LDK</span>
                </th>
                <th className="py-3 px-4 text-center">
                  <span className="text-text-primary text-lg" style={{ fontFamily: "var(--font-sans)" }}>風</span>
                  <span className="text-text-secondary text-xs ml-1">kaze</span>
                  <span className="block text-[10px] text-text-secondary mt-1">暮らしやすい4LDK</span>
                </th>
                <th className="py-3 px-4 text-center">
                  <span className="text-text-primary text-lg" style={{ fontFamily: "var(--font-sans)" }}>京</span>
                  <span className="text-text-secondary text-xs ml-1">miyako</span>
                  <span className="block text-[10px] text-text-secondary mt-1">コンパクトな3LDK</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  className={`border-b border-border ${i % 2 === 0 ? "bg-bg-primary" : "bg-bg-secondary"}`}
                >
                  <td className="py-3 px-4 text-text-secondary font-normal text-xs">
                    {row.label}
                  </td>
                  <td className="py-3 px-4 text-center font-medium text-text-primary">
                    {row.hana}
                  </td>
                  <td className="py-3 px-4 text-center text-text-primary">
                    {row.kaze}
                  </td>
                  <td className="py-3 px-4 text-center text-text-primary">
                    {row.miyako}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-text-secondary text-[11px] mt-6 leading-[1.8]">
          ※ 建物本体価格（税込）、付帯工事込みのコミコミ価格。土地は別途。<br />
          ※ 間取り・坪数は参考値です。詳細な仕様差と、あなた仕様へのアレンジはショールームでご説明します。
        </p>
      </div>
    </section>
  );
}
