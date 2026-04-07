export default function HopeSection() {
  return (
    <section
      className="bg-[color:var(--color-bg-primary)] px-0 py-16 md:py-24 lg:py-28"
      aria-labelledby="hope-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col md:min-h-[28rem] md:flex-row">
        <div className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-[60%] md:min-h-[28rem]">
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
              width={640}
              height={480}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
        <div className="flex w-full flex-col justify-center px-5 py-10 md:w-[40%] md:px-8 md:py-12 lg:px-10">
          <h2
            id="hope-heading"
            className="mb-8 text-xl leading-snug tracking-wide text-[color:var(--color-text-primary)] md:mb-10 md:text-2xl"
          >
            やまと不動産が目指していること
          </h2>
          <div className="space-y-6 text-[15px] leading-[1.85] text-[color:var(--color-text-primary)] md:text-base md:leading-[1.9]">
            <p>やまと不動産がずっと目標にしてきたことを、ひとつだけ挙げるなら。</p>
            <blockquote className="border-l-2 border-[color:var(--color-accent)] pl-4 text-[color:var(--color-text-primary)]">
              「本当に追加費用なく、家が建った」── お客様にそう言っていただくことです。
            </blockquote>
            <p>見積もりでの約束を、そのまま守り抜くこと。</p>
            <p>
              ムダなコストを省き、「住まいの土台」を最新技術で固め、本当に必要なところには惜しまない。そういう日本の家づくりを、これからも貫くことです。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
