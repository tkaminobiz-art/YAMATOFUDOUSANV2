export default function DoubtSection() {
  return (
    <section
      className="bg-[#3D3229] px-5 py-16 text-white md:px-8 md:py-24 lg:py-28"
      aria-labelledby="doubt-heading"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="doubt-heading"
          className="mb-8 text-xl leading-snug tracking-wide text-white md:mb-10 md:text-2xl"
        >
          世の中には「追加なくて家が建つなんて、うさんくさい」と思う方もいらっしゃいます。
        </h2>
        <div className="space-y-6 text-[15px] leading-[1.85] text-white/95 md:text-base md:leading-[1.9]">
          <p>
            正直、すごくよくわかります。ニュースでも報じられる不透明な請求の話を聞いているといやでも不安になりますよね。
          </p>
          <p>
            だからこそ、最初に
            <span className="mx-0.5 text-[color:var(--color-accent)]">【本当に？】</span>
            と疑ってください。
          </p>
          <div className="space-y-5 border-l-2 border-[color:var(--color-accent)] pl-4">
            <blockquote className="text-white/95">
              ただ見積もり額が安いだけの会社は、案の定、建て方が進むにつれてこまめにオプションを追加してきます。
            </blockquote>
            <blockquote className="text-white/95">
              「標準仕様はこれだけ」といって、住まいに不可欠な設備や仕様がオプションだらけになることも珍しくありません。
            </blockquote>
            <blockquote className="text-white/95">
              さらに言えば、まだ土地も決まっていない段階から「いま契約しないともう土地がない！」と急かされて契約に追い込まれるケースも…。
            </blockquote>
          </div>
          <p>
            こんな不安を感じている方こそ、一度だけでいいので
            <span className="mx-0.5 text-[color:var(--color-accent)]">【本当に？】</span>
            とよくよく見ていただきたいのです。
          </p>
          <p>
            当社の真価は、単なる価格の安さではなく、最初にご提示した金額の妥当性と、その金額を貫き通せる日本的な施工力にあります。
            <span className="mx-0.5 text-[color:var(--color-accent)]">【本当に？】</span>
            と思われたその疑問に、はっきりお答えします。
          </p>
        </div>
        <div className="mt-12 rounded-lg bg-[color:var(--color-accent)] px-6 py-8 text-center text-[color:var(--color-bg-primary)] md:mt-14 md:px-8 md:py-10">
          <p className="font-mincho text-[56px] font-medium leading-none tracking-wide sm:text-[72px] md:text-[120px] lg:text-[160px]">
            税込 1,980万円〜
          </p>
          <p className="mt-4 text-sm leading-relaxed opacity-95 md:text-base">
            ※土地代・外構除く、延床面積 33 坪目安、標準仕様にて
          </p>
        </div>
      </div>
    </section>
  );
}
