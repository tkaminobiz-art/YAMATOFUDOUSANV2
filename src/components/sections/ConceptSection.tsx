export default function ConceptSection() {
  return (
    <section id="concept" className="bg-bg-primary py-[var(--section-py)]">
      <div className="max-w-[1200px] mx-auto px-[var(--page-px)] text-center">
        {/* セクションラベル */}
        <p className="font-section-label text-main text-xs md:text-sm mb-6 tracking-[0.15em]">
          CONCEPT
        </p>

        {/* メインコピー */}
        <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-6 leading-[1.3]">
          展示場の家が、そのまま届く。
        </h2>

        {/* 補足テキスト — p にのみ max-w-[640px] */}
        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9] max-w-[640px] mx-auto">
          花鳥風月は、建物本体＋付帯工事のコミコミ価格。見積もりから金額は変わりません。展示場で見た仕様が、そのまま標準。オプションで別料金、ということもありません。
        </p>
      </div>
    </section>
  );
}
