export default function ConceptSection() {
  return (
    <section id="concept" className="bg-white py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center">
        {/* セクションラベル */}
        <p className="font-section-label text-main text-xs md:text-sm mb-6 tracking-[0.15em]">
          CONCEPT
        </p>

        {/* メインコピー */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-6 leading-relaxed">
          追加のない家を、奈良で。
        </h2>

        {/* 補足テキスト */}
        <p className="text-text-secondary text-sm md:text-base leading-[2.0] max-w-xl mx-auto">
          見積もりが増えない。モデルハウスと標準仕様が同じ。
          引き渡しの日に、笑顔で関係が終わるのではなく、深くなる。
          それが、やまと不動産の家づくりです。
        </p>
      </div>
    </section>
  );
}
