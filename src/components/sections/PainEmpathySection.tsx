export default function PainEmpathySection() {
  return (
    <section
      className="relative overflow-hidden px-5 py-40 md:px-8 md:py-56 lg:py-72"
      style={{
        background:
          "linear-gradient(180deg, var(--color-bg-primary) 0%, rgba(255,255,255,0.55) 45%, var(--color-bg-primary) 100%)",
      }}
      aria-labelledby="pain-empathy-heading"
    >
      <div className="relative mx-auto max-w-[40rem] text-center">
        <h2
          id="pain-empathy-heading"
          className="mb-10 font-mincho text-[28px] leading-snug tracking-[0.08em] text-[color:var(--color-text-primary)] md:mb-12 md:text-[40px] lg:text-[52px]"
        >
          家づくりで、こんな経験はありませんか。
        </h2>
        <div className="space-y-8 font-mincho text-[17px] leading-[2.2] text-[color:var(--color-text-primary)] md:space-y-10 md:text-[19px] lg:text-[22px]">
          <p>契約のときに見せてもらった見積もりと、最後の請求書が違っていた。</p>
          <p>打ち合わせを重ねるたびに、金額が静かに膨らんでいく。</p>
          <p>引き渡しが終わったら、担当者からの連絡がぱたりと止まった。</p>
        </div>
        <div className="mt-16 space-y-8 font-mincho text-[17px] font-medium leading-[2.2] text-[color:var(--color-accent)] md:space-y-10 md:text-[19px] lg:text-[22px]">
          <p>他社さんの中には、そういう家づくりをされる会社もあると聞きます。</p>
          <p>一生に一度の買い物で、そんな思いはしてほしくない。</p>
        </div>
      </div>
    </section>
  );
}
