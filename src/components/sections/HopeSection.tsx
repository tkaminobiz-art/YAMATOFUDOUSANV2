export default function HopeSection() {
  return (
    <section
      className="bg-[color:var(--color-bg-primary)] px-0 py-32 md:py-48 lg:py-64"
      aria-labelledby="hope-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col md:min-h-[28rem] md:flex-row">
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-sm md:aspect-auto md:w-[55%] md:min-h-[28rem]">
          <picture className="block h-full w-full">
            <source
              media="(min-width: 1024px)"
              srcSet="/images/sections/hope-living.webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/images/sections/hope-living-tablet.webp"
            />
            <img
              src="/images/sections/hope-living-sp.webp"
              alt="リビングの様子"
              className="h-full w-full object-cover"
              width={750}
              height={563}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div className="flex w-full flex-col justify-center px-5 py-10 md:w-[45%] md:px-8 md:py-12 lg:px-10">
          <h2
            id="hope-heading"
            className="font-mincho text-[32px] leading-[1.4] tracking-[0.06em] text-[color:var(--color-text-primary)] md:text-[44px] lg:text-[56px]"
          >
            金額が、動かない家づくり。
          </h2>
          <div
            className="mt-8 mb-12 h-px w-16 bg-[color:var(--color-accent)]"
            aria-hidden
          />
          <div className="space-y-6 text-[16px] leading-[2.1] text-[color:var(--color-text-primary)] md:space-y-8 md:text-[18px] lg:text-[20px]">
            <p>やまと不動産がずっと目標にしてきたことを、ひとつだけ挙げるなら。</p>
            <blockquote className="my-10 border-l-4 border-[color:var(--color-accent)] py-2 pl-6 text-left font-mincho text-[20px] font-light italic leading-[1.5] text-[color:var(--color-text-primary)] md:pl-8 md:text-[24px] lg:text-[28px]">
              「本当に追加費用なく、家が建った」── お客様にそう言っていただくことです。
            </blockquote>
            <p>最初の見積もりが、最後の請求書になる。</p>
            <p>最初に見たモデルハウスが、そのままあなたの家になる。</p>
            <p>最初の担当者が、引き渡しの日も、そのあとも、ずっと隣にいる。</p>
            <p>動かないこと。それが、私たちの誠実です。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
