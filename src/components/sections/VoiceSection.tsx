"use client";

import { useScrollIn } from "@/hooks/useScrollIn";

const VOICES = [
  {
    area: "生駒市",
    name: "I様邸",
    deciding: "標準設備のグレードが高かったこと。モデルハウスが素敵だったこと。",
    review:
      "新築を建てようと土地探しや工務店選びでなかなか良い所がなく、一度諦めようと思っていた時に何気なくネットで見つけたのがきっかけでした。要望やこだわりが多かったと思いますが、親身になって聞いてくださって、楽しく打ち合わせできたのが印象に残っています。",
  },
  {
    area: "奈良市",
    name: "A様邸",
    deciding: "モデルルームの設備がどれも標準仕様だったこと。追加を無理に勧められなかったこと。",
    review:
      "オプションの価格は一覧表になっており、予算と相談しながら決めることができました。追加を無理に勧められることはなく、とてもありがたかったです。家づくりをとても楽しめました。",
  },
  {
    area: "奈良市",
    name: "M様邸",
    deciding: "担当者の人柄です。何気なく立ち寄ったモデルルームで、軽快なトークに魅了され一気に購入まで。",
    review:
      "約半年間、図面やサンプルの打ち合わせをし、私達の家を作り上げていきましたが、本当に誠実に対応していただきました。広いリビングと落ち着いた内装の配色、そして陽当たり。カフェのようなリビングで毎日を楽しく過ごしています。",
  },
  {
    area: "京田辺市",
    name: "K様邸",
    deciding: "土地の場所がよかった。標準設備がよかった。",
    review:
      "やりたいことをすべて叶えていただきありがとうございます。打合せ時間もとても長い時間だったのに嫌な顔一つせず対応していただきました。家を建てた後でも連絡すればすぐに対応していただけるので助かっています。建てておわりじゃなく、その後もしっかりフォローがあり安心しています。",
  },
  {
    area: "生駒市",
    name: "N様邸",
    deciding: "予算内で注文住宅ができたこと。駅近で理想の大きさの土地だったこと。",
    review:
      "外壁の青色とベランダの茶色の2色展開が周りからも評判良く、とても気に入ってます。家に帰ってくる時に青色が見えると気持ちが上がり、見るたびに「良い家だなぁ」と浸っています。建築前も後も担当さんが迅速に対応してくださるので安心して過ごせています。",
  },
  {
    area: "天理市",
    name: "O様邸",
    deciding: "標準仕様の内容と大空間収納。",
    review:
      "設計の先生や担当者が出来る限りの理想をかなえてくれたので、満足のいくマイホームができました。イメージのつかないことや優柔不断になるところに対しても、私達の好みやイメージを理解してくださり、提案してくれたり、話をたくさん聞いてもらいました。",
  },
] as const;

export default function VoiceSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-secondary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
          VOICE
        </p>
        <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
          お客様の声
        </h2>
        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed mb-10 md:mb-14 max-w-[640px]">
          花鳥風月で家を建てた方の、率直な感想です。
        </p>

        {/* 2列グリッド（非対称カード高さ） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[var(--card-gap)]">
          {VOICES.map((v) => (
            <div
              key={v.name}
              className="scroll-in bg-bg-primary rounded-lg p-[var(--card-p)] card-shadow"
            >
              {/* ヘッダー: 地域 + 名前 */}
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

              {/* 決め手 */}
              <p className="text-text-secondary text-xs leading-relaxed mb-3">
                <span className="text-main font-medium">決め手：</span>
                {v.deciding}
              </p>

              {/* 本文 */}
              <blockquote className="text-text-primary text-sm leading-[1.9] border-l-2 border-main/30 pl-4">
                {v.review}
              </blockquote>
            </div>
          ))}
        </div>

        <p className="text-text-secondary text-xs mt-6 text-center">
          ※ 旧サイトに掲載のお客様の声より抜粋（全50件）
        </p>
      </div>
    </section>
  );
}
