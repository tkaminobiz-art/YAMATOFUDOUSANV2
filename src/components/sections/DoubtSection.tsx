export default function DoubtSection() {
  return (
    <section
      className="bg-[#3D3229] px-5 py-40 text-white md:px-8 md:py-56 lg:py-80"
      aria-labelledby="doubt-heading"
    >
      <div className="mx-auto max-w-[48rem] text-center">
        <h2
          id="doubt-heading"
          className="mb-10 font-mincho text-[28px] leading-snug tracking-[0.08em] text-white md:mb-12 md:text-[40px] lg:text-[52px]"
        >
          2,480万円で？──そう思われた方へ。
        </h2>
        <div className="flex flex-col items-center">
          <blockquote className="my-3 font-mincho text-[18px] font-light leading-relaxed text-[#FBF8F3]/85 md:my-4 md:text-[22px] lg:text-[26px]">
            「この金額で、本当に建つんですか？」
          </blockquote>
          <div className="my-2 text-xs tracking-[0.35em] text-[#FBF8F3]/35 md:my-3" aria-hidden>
            ─
          </div>
          <blockquote className="my-3 font-mincho text-[18px] font-light leading-relaxed text-[#FBF8F3]/85 md:my-4 md:text-[22px] lg:text-[26px]">
            「どこかで削っているんじゃないですか？」
          </blockquote>
          <div className="my-2 text-xs tracking-[0.35em] text-[#FBF8F3]/35 md:my-3" aria-hidden>
            ─
          </div>
          <blockquote className="my-3 font-mincho text-[18px] font-light leading-relaxed text-[#FBF8F3]/85 md:my-4 md:text-[22px] lg:text-[26px]">
            「あとから追加で請求されるんじゃないですか？」
          </blockquote>
        </div>
        <div className="mx-auto mt-16 max-w-xl space-y-4 text-[16px] leading-[1.9] text-white/95 md:text-[18px] lg:text-[20px]">
          <p>よく聞かれる質問です。私たちは、その疑いを歓迎します。</p>
          <p className="text-[color:var(--color-accent)]">
            答えはすべて、仕組みの中にあります。
          </p>
        </div>
        <div className="mt-24 md:mt-32">
          <p className="font-mincho text-[72px] font-medium leading-none tracking-wide text-[color:var(--color-accent)] sm:text-[88px] md:text-[140px] lg:text-[180px]">
            <span className="whitespace-nowrap">
              2,480
              <span className="ml-1 text-[0.38em] font-medium md:text-[0.42em]">
                万円
              </span>
            </span>
          </p>
          <p className="mt-4 text-base text-white/90 md:text-lg">
            花｜33坪｜4LDK｜建物本体価格・税込
          </p>
          <p className="mt-2 text-sm text-white/60 md:text-[15px]">
            2026年4月1日価格改定
          </p>
        </div>
      </div>
    </section>
  );
}
