export default function QualityDetailSection() {
  return (
    <section
      className="bg-[color:var(--color-bg-primary)] px-0 py-24 md:py-32 lg:py-40"
      aria-labelledby="quality-detail-heading"
    >
      <div className="mx-auto flex max-w-6xl flex-col md:min-h-[28rem] md:flex-row">
        <div className="flex w-full flex-col justify-center px-5 py-10 md:w-[45%] md:px-8 md:py-12 lg:px-10">
          <h2
            id="quality-detail-heading"
            className="font-mincho text-[26px] leading-snug tracking-wide text-[color:var(--color-text-primary)] md:text-[32px] lg:text-[38px]"
          >
            安いから、ではありません。むしろ、こだわっています。
          </h2>
          <div className="mt-8 space-y-6 text-[15px] leading-[2] text-[color:var(--color-text-primary)] md:text-[16px] lg:text-[17px]">
            <p>
              外壁の下には、空気が通る道をつくります。湿気を逃がすためです。
            </p>
            <p>
              塗料は、推奨量の十貫のところを、私たちは十二貫塗ります。
            </p>
            <p>
              十年経って塗り替えが必要になる家が多いなか、
              <br />
              やまとの家は、十年経ってもまだ新築の顔をしています。
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] w-full shrink-0 md:aspect-auto md:w-[55%] md:min-h-[28rem]">
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
              width={750}
              height={563}
              loading="lazy"
              decoding="async"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
