const ROWS = [
  { label: "価格", hana: "2,480万円", kaze: "2,480万円", miyako: "2,280万円" },
  { label: "延床面積", hana: "33坪（109㎡）", kaze: "30坪", miyako: "28坪" },
  { label: "間取り", hana: "4LDK", kaze: "4LDK", miyako: "3LDK" },
  { label: "1F天井高", hana: "2,500mm", kaze: "2,400mm", miyako: "2,400mm" },
  { label: "玄関ドア", hana: "親子ドア＋顔認証", kaze: "片開ドア", miyako: "片開ドア" },
  { label: "建材", hana: "LIXIL統一", kaze: "EIDAI", miyako: "EIDAI" },
  { label: "軒天", hana: "ニチハ木目調12mm", kaze: "ケイカル板", miyako: "ケイカル板" },
  { label: "サッシ", hana: "17箇所", kaze: "15箇所", miyako: "15箇所" },
] as const;

export default function PriceSection() {
  return (
    <section id="product" className="bg-bg-secondary py-[var(--section-py)]">
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
        {/* セクションラベル */}
        <p className="font-section-label text-main text-xs md:text-sm mb-4 tracking-[0.15em]">
          PRICE
        </p>
        <p className="text-text-secondary text-sm mb-10" style={{ fontFamily: "var(--font-sans)" }}>
          花鳥風月　やまとの家
        </p>

        {/* 大判価格表示 */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-baseline justify-center gap-2">
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
            税込・建物本体・付帯工事込み
          </p>
        </div>

        {/* 3モデル比較表 */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-main">
                <th className="py-3 px-4 text-left text-text-secondary font-normal w-[140px]" />
                <th className="py-3 px-4 text-center">
                  <span className="text-main text-lg" style={{ fontFamily: "var(--font-sans)" }}>花</span>
                  <span className="text-text-secondary text-xs ml-1">hana</span>
                  <span className="block text-[10px] text-white bg-main rounded px-2 py-0.5 mt-1 mx-auto w-fit">
                    最上位モデル
                  </span>
                </th>
                <th className="py-3 px-4 text-center">
                  <span className="text-text-primary text-lg" style={{ fontFamily: "var(--font-sans)" }}>風</span>
                  <span className="text-text-secondary text-xs ml-1">kaze</span>
                  <span className="block text-[10px] text-text-secondary mt-1">標準モデル</span>
                </th>
                <th className="py-3 px-4 text-center">
                  <span className="text-text-primary text-lg" style={{ fontFamily: "var(--font-sans)" }}>京</span>
                  <span className="text-text-secondary text-xs ml-1">miyako</span>
                  <span className="block text-[10px] text-text-secondary mt-1">狭小地向け</span>
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

        <p className="text-text-secondary text-[11px] mt-6">
          ※ すべて建物本体価格（税込）。土地は別途。
        </p>
      </div>
    </section>
  );
}
