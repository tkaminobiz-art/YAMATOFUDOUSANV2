export default function PainEmpathySection() {
  return (
    <section
      className="relative overflow-hidden px-5 py-16 md:px-8 md:py-24 lg:py-28"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(255,255,255,0.55) 45%, var(--color-bg-primary) 100%)",
      }}
      aria-labelledby="pain-empathy-heading"
    >
      <div className="relative mx-auto max-w-3xl">
        <h2
          id="pain-empathy-heading"
          className="mb-10 text-center text-xl leading-snug tracking-wide text-[color:var(--color-text-primary)] md:mb-12 md:text-2xl"
        >
          こういう家づくり、お聞きしたことがありませんか？
        </h2>
        <div className="space-y-6 text-[15px] leading-[1.85] text-[color:var(--color-text-primary)] md:text-base md:leading-[1.9]">
          <p>契約のときに見せてもらった見積もりと、最後の請求書が違っていた。</p>
          <p>打ち合わせを重ねるたびに、金額が静かに膨らんでいく。</p>
          <p>引き渡しが終わったら、担当者からの連絡がぱたりと止まった。</p>
          <p className="text-[color:var(--color-accent)]">
            他社さんの中には、そういう家づくりをされる会社もあると聞きます。
          </p>
          <p className="text-[color:var(--color-accent)]">
            一生に一度の買い物で、そんな思いはしてほしくない。
          </p>
        </div>
      </div>
    </section>
  );
}
