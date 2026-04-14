"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";

const VOICES = [
  {
    area: "奈良市",
    name: "O様邸",
    deciding: "土地が見つからず、新築を1度諦めていた中、偶然ネットで土地を見つけて。",
    review:
      "玄関カギのタッチレスキーやタッチレス水栓、自動開閉機能付きトイレ、ソフトクローズの扉など、標準仕様で色々付いていたところ。打ち合わせに行くたびに「今日は誰に合いに行くの？」と家族全員が楽しみにしていました。",
  },
  {
    area: "奈良市",
    name: "H様邸",
    deciding: "たまたまネットでやまとを知って、半信半疑で話を聞きに行ったら、もっと早く知りたかったと思える所でした。",
    review:
      "大空間収納と、浄水・還元水素水の出る整水器をつけたところ。水派な子どもたちなので大活躍で最高です。何度でも変更できるからと、プランを立てたりアドバイスをしていただき、念願のマイホームにたどり着けました。",
  },
  {
    area: "生駒市",
    name: "I様邸",
    deciding: "新築を建てようと土地探しや工務店選びで良い所がなく、一度諦めようと思っていた時に見つけました。",
    review:
      "要望やこだわりが多かったと思いますが、親身になって聞いてくださって、楽しく打ち合わせできたのが印象に残っています。設計上無理なことも「代わりにこんな感じでどうですか？」と代案を出してくださり、納得のできる家が建てられました。",
  },
  {
    area: "奈良市",
    name: "A様邸",
    deciding: "モデルルームの設備がどれも標準仕様だったこと。追加を無理に勧められなかったこと。",
    review:
      "オプションの価格は一覧表になっており、予算と相談しながら決めることができました。追加を無理に勧められることはなく、とてもありがたかったです。家づくりをとても楽しめました。",
  },
  {
    area: "橿原市",
    name: "S様邸",
    deciding: "たまたまモデルハウスを見に行ったら、外観や間取り、内装が好きな雰囲気で、ご対応いただいた方が信用に足りると直感で感じました。",
    review:
      "マンションの売却から新築の竣工まで、ワンストップでお任せできました。保育園の都合等も考慮いただき、全体行程の調整も柔軟に対応。納得のいく住まいづくりを実現することができました。",
  },
  {
    area: "京田辺市",
    name: "T様邸",
    deciding: "契約前から非常に親身になって下さり、不安もなくやまと不動産で家を建てたいと思えました。",
    review:
      "最高の場所に最高の家を建てることができて大満足。やまと不動産という会社はアットホームで風通しの良い会社。設計・工務・営業すべての方が優しく、この方に出会えていなかったら性格上悩みすぎて途方に暮れていたでしょう。",
  },
  {
    area: "奈良市",
    name: "M様邸",
    deciding: "担当者の人柄です。何気なく立ち寄ったモデルルームで、軽快なトークに魅了され一気に購入まで。",
    review:
      "広いリビングと落ち着いた内装の配色、そして陽当たり。カフェのようなリビングで毎日を楽しく過ごしています。約半年間の打ち合わせをしましたが、本当に誠実に対応していただきました。",
  },
  {
    area: "京田辺市",
    name: "K様邸",
    deciding: "土地の場所がよかった。標準設備がよかった。",
    review:
      "やりたいことをすべて叶えていただきありがとうございます。打合せ時間もとても長い時間だったのに嫌な顔一つせず対応していただきました。建てておわりじゃなく、その後もしっかりフォローがあり安心しています。",
  },
  {
    area: "生駒市",
    name: "N様邸",
    deciding: "予算内で注文住宅ができたこと。駅近で理想の大きさの土地だったこと。",
    review:
      "外壁の青色とベランダの茶色の2色展開が周りからも評判良く、とても気に入ってます。家に帰ってくる時に青色が見えると気持ちが上がり、見るたびに「良い家だなぁ」と浸っています。担当さんが迅速に対応してくださるので安心。",
  },
  {
    area: "天理市",
    name: "O様邸",
    deciding: "標準仕様の内容と大空間収納。",
    review:
      "設計の先生や担当者が出来る限りの理想をかなえてくれたので、満足のいくマイホームができました。イメージのつかないことや優柔不断になるところに対しても、私達の好みやイメージを理解してくださり、提案してくれました。",
  },
  {
    area: "斑鳩町",
    name: "K様邸",
    deciding: "標準グレードが非常に高い。間取りの事由がとてもきく。親身になって相談にのっていただけた。",
    review:
      "心から信頼して家づくりをお願いして良かった。お会いした時から親身になって現状の悩みを聞いてくださり、今思い返しても感謝することばかりです。気付けば打ち合わせを楽しみに過ごしていたのが懐かしいです。",
  },
  {
    area: "奈良市",
    name: "F様邸",
    deciding: "妻の実家から近いところの土地を販売していたため。プランがわかりやすかった。",
    review:
      "色んな不動産を見ているときは、金額の面で不明確なところが多く不安を抱えていましたが、やまと不動産のモデルハウスを初めて見学させてもらった時に、担当者からわかりやすく金額の話をしていただいたことで、具体的なイメージを持つことができ、安心できました。",
  },
] as const;

export default function VoiceSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-warm py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
          <div className="max-w-[640px]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              VOICE
            </p>
            <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
              お客様の声
            </h2>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
              花鳥風月で家を建てた方の、率直な感想です。
            </p>
          </div>
          <div
            className="text-right"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <span className="text-accent font-light text-6xl md:text-7xl block leading-none">
              50+
            </span>
            <span className="text-text-secondary text-xs md:text-sm">組のご家族</span>
          </div>
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--card-gap)]">
          {VOICES.map((v, i) => (
            <div
              key={v.area + v.name + i}
              className="scroll-in bg-bg-primary rounded-lg p-[var(--card-p)] card-shadow"
            >
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-main text-xs font-medium tracking-wider">
                  {v.area}
                </span>
                <span
                  className="text-text-primary text-base"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {v.name}
                </span>
              </div>

              <p className="text-text-secondary text-xs leading-relaxed mb-4">
                <span className="text-accent font-medium">決め手：</span>
                {v.deciding}
              </p>

              <blockquote className="relative text-text-primary text-sm leading-[1.9] border-l-2 border-accent/40 pl-4">
                {v.review}
              </blockquote>
            </div>
          ))}
        </div>

        {/* 全件ページへのリンク */}
        <div className="mt-10 md:mt-14 text-center">
          <Link
            href="/voice"
            className="inline-flex items-center gap-2 min-h-[52px] px-8 py-3.5 rounded bg-bg-primary text-text-primary text-base font-medium card-shadow transition-all hover:-translate-y-0.5 hover:text-main"
          >
            すべてのお客様の声を見る
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </section>
  );
}
