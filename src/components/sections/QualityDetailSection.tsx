export default function QualityDetailSection() {
  return (
    <section
      className="bg-[color:var(--color-bg-primary)] px-0 py-16 md:py-24 lg:py-28"
      aria-labelledby="quality-detail-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col-reverse md:min-h-[28rem] md:flex-row">
        <div className="flex w-full flex-col justify-center px-5 py-10 md:w-1/2 md:px-8 md:py-12 lg:px-10">
          <h2
            id="quality-detail-heading"
            className="mb-8 text-xl leading-snug tracking-wide text-[color:var(--color-text-primary)] md:mb-10 md:text-2xl"
          >
            家の外から、細部まで
          </h2>
          <div className="space-y-6 text-[15px] leading-[1.85] text-[color:var(--color-text-primary)] md:text-base md:leading-[1.9]">
            <p>
              巨大な工場でマス生産された住宅用パーツではなく、今もなお変わらぬ「職人の手しごと」で家を建てる。
            </p>
            <p>
              屋外の壁は、ひとつひとつ違う表情を持つ焼き物のタイル仕上げ。手で形づくられた美しさは、気持ちの良い安心感につながります。
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-1/2 md:min-h-[28rem]">
          <picture className="block h-full w-full">
            <source
              media="(min-width: 1024px)"
              srcSet="/images/sections/quality-exterior.webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet="/images/sections/quality-exterior-tablet.webp"
            />
            <img
              src="/images/sections/quality-exterior-sp.webp"
              alt="外観・タイルの様子"
              className="h-full w-full object-cover"
              width={640}
              height={480}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
