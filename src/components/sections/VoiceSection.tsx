"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  VoiceSection — Phase 2 改（エディトリアル）
  - PC: 写真の大小・左右交互で非対称（雑誌風）
  - SP: 大きな写真＋キャッチのカルーセル（scroll-snap）
  - スクロール時は子要素に stagger の fade-up
*/

const VOICE_IMAGES = [
  "/images/works/case1-living.webp",
  "/images/works/case2-kitchen.webp",
  "/images/works/case3-entrance.webp",
  "/images/fv/hero-03-living.webp",
  "/images/fv/hero-04-kitchen.webp",
  "/images/fv/hero-05-washitsu.webp",
  "/images/works/case1-kitchen.webp",
  "/images/works/case2-living.webp",
  "/images/works/case3-kitchen.webp",
  "/images/works/case1-ext.webp",
  "/images/works/case2-ext.webp",
  "/images/works/case3-ext.webp",
] as const;

const VOICES = [
  {
    area: "奈良市",
    name: "O様邸",
    highlight: "打ち合わせが、家族の楽しみになった。",
    deciding: "土地が見つからず、新築を1度諦めていた中、偶然ネットで土地を見つけて。",
    review:
      "玄関カギのタッチレスキーやタッチレス水栓、自動開閉機能付きトイレ、ソフトクローズの扉など、標準仕様で色々付いていたところ。打ち合わせに行くたびに「今日は誰に合いに行くの？」と家族全員が楽しみにしていました。",
  },
  {
    area: "奈良市",
    name: "H様邸",
    highlight: "大空間収納と浄水器が、大活躍。",
    deciding: "たまたまネットでやまとを知って、半信半疑で話を聞きに行ったら、もっと早く知りたかったと思える所でした。",
    review:
      "大空間収納と、浄水・還元水素水の出る整水器をつけたところ。水派な子どもたちなので大活躍で最高です。何度でも変更できるからと、プランを立てたりアドバイスをしていただき、念願のマイホームにたどり着けました。",
  },
  {
    area: "生駒市",
    name: "I様邸",
    highlight: "「代わりにこんな感じで」と代案を出してくれた。",
    deciding: "土地も工務店も良い条件が見つからず、一度はマイホームを諦めかけていた時にやまと不動産に出会いました。",
    review:
      "要望やこだわりが多かったと思いますが、親身になって聞いてくださって、楽しく打ち合わせできたのが印象に残っています。設計上無理なことも「代わりにこんな感じでどうですか？」と代案を出してくださり、納得のできる家が建てられました。",
  },
  {
    area: "奈良市",
    name: "A様邸",
    highlight: "追加を、無理に勧められなかった。",
    deciding: "モデルルームの設備がどれも標準仕様だったこと。追加を無理に勧められなかったこと。",
    review:
      "オプションの価格は一覧表になっており、予算と相談しながら決めることができました。追加を無理に勧められることはなく、とてもありがたかったです。家づくりをとても楽しめました。",
  },
  {
    area: "橿原市",
    name: "S様邸",
    highlight: "売却から新築まで、一社で完結。",
    deciding: "たまたまモデルハウスを見に行ったら、外観や間取り、内装が好きな雰囲気で、ご対応いただいた方が信用に足りると直感で感じました。",
    review:
      "マンションの売却から新築の竣工まで、ワンストップでお任せできました。保育園の都合等も考慮いただき、全体行程の調整も柔軟に対応。納得のいく住まいづくりを実現することができました。",
  },
  {
    area: "京田辺市",
    name: "T様邸",
    highlight: "設計・工務・営業、全員が優しかった。",
    deciding: "契約前から非常に親身になって下さり、不安もなくやまと不動産で家を建てたいと思えました。",
    review:
      "最高の場所に最高の家を建てることができて大満足。やまと不動産という会社はアットホームで風通しの良い会社。設計・工務・営業すべての方が優しく、この方に出会えていなかったら性格上悩みすぎて途方に暮れていたでしょう。",
  },
  {
    area: "奈良市",
    name: "M様邸",
    highlight: "カフェのようなリビングで、毎日を。",
    deciding: "担当者の人柄です。何気なく立ち寄ったモデルルームで、軽快なトークに魅了され一気に購入まで。",
    review:
      "広いリビングと落ち着いた内装の配色、そして陽当たり。カフェのようなリビングで毎日を楽しく過ごしています。約半年間の打ち合わせをしましたが、本当に誠実に対応していただきました。",
  },
  {
    area: "京田辺市",
    name: "K様邸",
    highlight: "建てたあとも、ずっとフォロー。",
    deciding: "土地の場所がよかった。標準設備がよかった。",
    review:
      "やりたいことをすべて叶えていただきありがとうございます。打合せ時間もとても長い時間だったのに嫌な顔一つせず対応していただきました。建てておわりじゃなく、その後もしっかりフォローがあり安心しています。",
  },
  {
    area: "生駒市",
    name: "N様邸",
    highlight: "青い外壁が見えると、気持ちが上がる。",
    deciding: "予算内で注文住宅ができたこと。駅近で理想の大きさの土地だったこと。",
    review:
      "外壁の青色とベランダの茶色の2色展開が周りからも評判良く、とても気に入ってます。家に帰ってくる時に青色が見えると気持ちが上がり、見るたびに「良い家だなぁ」と浸っています。担当さんが迅速に対応してくださるので安心。",
  },
  {
    area: "天理市",
    name: "O様邸",
    highlight: "理想を、ちゃんと形にしてくれた。",
    deciding: "標準仕様の内容と大空間収納。",
    review:
      "設計の先生や担当者が出来る限りの理想をかなえてくれたので、満足のいくマイホームができました。イメージのつかないことや優柔不断になるところに対しても、私達の好みやイメージを理解してくださり、提案してくれました。",
  },
  {
    area: "斑鳩町",
    name: "K様邸",
    highlight: "打ち合わせが、楽しみになっていた。",
    deciding: "標準グレードが非常に高い。間取りの事由がとてもきく。親身になって相談にのっていただけた。",
    review:
      "心から信頼して家づくりをお願いして良かった。お会いした時から親身になって現状の悩みを聞いてくださり、今思い返しても感謝することばかりです。気付けば打ち合わせを楽しみに過ごしていたのが懐かしいです。",
  },
  {
    area: "奈良市",
    name: "F様邸",
    highlight: "金額が明確で、不安が消えた。",
    deciding: "妻の実家から近いところの土地を販売していたため。プランがわかりやすかった。",
    review:
      "色んな不動産を見ているときは、金額の面で不明確なところが多く不安を抱えていましたが、やまと不動産のモデルハウスを初めて見学させてもらった時に、担当者からわかりやすく金額の話をしていただいたことで、具体的なイメージを持つことができ、安心できました。",
  },
] as const;

function voiceImage(i: number) {
  return VOICE_IMAGES[i % VOICE_IMAGES.length];
}

export default function VoiceSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-warm py-[var(--section-py)]">
      <div ref={sectionRef} className="max-w-[1400px] mx-auto">
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
          <div className="scroll-in mb-12 flex flex-wrap items-end justify-between gap-4 md:mb-20">
            <div className="max-w-[640px]">
              <p className="font-section-label mb-3 text-xs tracking-[0.15em] text-main md:text-sm">
                VOICE
              </p>
              <h2 className="mb-4 text-[clamp(24px,3.5vw,40px)] text-text-primary">
                お客様の声
              </h2>
              <p className="text-[clamp(15px,1.1vw,17px)] leading-relaxed text-text-secondary">
                花鳥風月で家を建てた方の、率直な感想です。
              </p>
            </div>
            <div
              className="text-right"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              <span className="block text-6xl font-light leading-none text-accent md:text-7xl">
                50
              </span>
              <span className="text-xs text-text-secondary md:text-sm">
                組以上のご家族
              </span>
            </div>
          </div>
        </div>

        {/* SP: 横スワイプ / PC: エディトリアル（非対称） */}
        <div className="md:px-[var(--page-px)]">
          <div
            className="flex flex-row gap-5 overflow-x-auto px-[var(--page-px)] pb-6 scrollbar-hide md:mx-0 md:flex-col md:gap-16 md:overflow-visible md:px-0 md:pb-0 lg:gap-24"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {VOICES.map((v, i) => {
              const img = voiceImage(i);
              const widePhoto = i % 3 !== 1; /* 3件に1回は「文字多め」レイアウト */
              return (
                <article
                  key={v.area + v.name + i}
                  className={`
                    scroll-in shrink-0 snap-center
                    w-[min(88vw,380px)] max-w-[100%]
                    flex flex-col overflow-hidden rounded-xl bg-bg-primary card-shadow
                    md:w-full md:flex-row md:items-stretch md:gap-10 md:overflow-visible md:rounded-none md:bg-transparent md:shadow-none lg:gap-14
                    ${i % 2 === 1 ? "md:flex-row-reverse" : ""}
                  `}
                >
                  <div
                    className={`
                      relative aspect-[16/11] w-full shrink-0 overflow-hidden bg-bg-secondary
                      md:aspect-auto md:rounded-sm
                      ${widePhoto ? "md:w-[min(58%,640px)] md:min-h-[min(52vw,420px)] lg:min-h-[440px]" : "md:w-[min(48%,520px)] md:min-h-[min(44vw,360px)] lg:min-h-[380px]"}
                    `}
                  >
                    <Image
                      src={img}
                      alt={`${v.area} ${v.name}の住まいのイメージ`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 88vw, (max-width: 1200px) 55vw, 640px"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent md:from-black/20" />
                  </div>

                  <div className="flex flex-col p-6 md:flex-1 md:justify-center md:px-0 md:py-4 md:pl-2 md:pr-4">
                    <div className="mb-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <span className="text-xs font-medium tracking-wider text-main">
                        {v.area}
                      </span>
                      <span
                        className="text-base text-text-primary"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {v.name}
                      </span>
                    </div>

                    <h3
                      className="mb-5 text-lg font-medium leading-[1.55] text-text-primary md:text-2xl lg:text-[1.65rem] lg:leading-snug"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      「{v.highlight}」
                    </h3>

                    <p className="mb-4 text-xs leading-relaxed text-text-secondary">
                      <span className="font-medium text-accent">決め手：</span>
                      {v.deciding}
                    </p>

                    <blockquote className="relative mt-auto border-l-2 border-accent/35 pl-4 text-sm leading-[1.9] text-text-secondary md:text-[15px]">
                      {v.review}
                    </blockquote>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <p className="px-[var(--page-px)] text-center text-xs tracking-wider text-text-secondary md:hidden">
          ← 横にスワイプできます →
        </p>

        <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
          <div className="scroll-in mt-12 text-center md:mt-20">
            <div className="inline-flex">
              <CtaButton
                href="/voice"
                variant="secondary"
                size="md"
                label="すべてのお客様の声を見る"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
