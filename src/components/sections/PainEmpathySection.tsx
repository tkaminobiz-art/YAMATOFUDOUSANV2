export default function PainEmpathySection() {
  return (
    <section
      className="relative overflow-hidden px-5 py-32 md:px-8 md:py-40 lg:py-48"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(255,255,255,0.55) 45%, var(--color-bg-primary) 100%)",
      }}
      aria-labelledby="pain-empathy-heading"
    >
      <div className="relative mx-auto max-w-[42rem] text-center">
        <h2
          id="pain-empathy-heading"
          className="mb-10 font-mincho text-[22px] leading-snug tracking-wide text-[color:var(--color-text-primary)] md:mb-12 md:text-[26px] lg:text-[28px]"
        >
          家づくりで、こんな経験はありませんか。
        </h2>
        <div className="space-y-8 font-mincho text-[15px] leading-[2] text-[color:var(--color-text-primary)] md:text-[16px] lg:text-[17px]">
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
