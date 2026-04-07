export default function DoubtSection() {
  return (
    <section
      className="bg-[#3D3229] px-5 py-32 text-white md:px-8 md:py-40 lg:py-56"
      aria-labelledby="doubt-heading"
    >
      <div className="mx-auto max-w-[48rem] text-center">
        <h2
          id="doubt-heading"
          className="mb-10 font-mincho text-xl leading-snug tracking-wide text-white md:mb-12 md:text-2xl lg:text-[28px]"
        >
          2,480万円で？──そう思われた方へ。
        </h2>
        <div className="space-y-6">
          <blockquote className="font-mincho text-base leading-relaxed text-[#FBF8F3]/80 md:text-lg">
            「この金額で、本当に建つんですか？」
          </blockquote>
          <div className="text-xs tracking-[0.35em] text-[#FBF8F3]/35" aria-hidden>
            ─
          </div>
          <blockquote className="font-mincho text-base leading-relaxed text-[#FBF8F3]/80 md:text-lg">
            「どこかで削っているんじゃないですか？」
          </blockquote>
          <div className="text-xs tracking-[0.35em] text-[#FBF8F3]/35" aria-hidden>
            ─
          </div>
          <blockquote className="font-mincho text-base leading-relaxed text-[#FBF8F3]/80 md:text-lg">
            「あとから追加で請求されるんじゃないですか？」
          </blockquote>
        </div>
        <div className="mx-auto mt-12 max-w-xl space-y-4 text-[15px] leading-[1.9] text-white/95 md:mt-14 md:text-base">
          <p>よく聞かれる質問です。私たちは、その疑いを歓迎します。</p>
          <p>答えはすべて、仕組みの中にあります。</p>
        </div>
        <div className="mt-14 md:mt-16">
          <p className="font-mincho text-[56px] font-medium leading-none tracking-wide text-[color:var(--color-accent)] sm:text-[64px] md:text-[120px] lg:text-[160px]">
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
