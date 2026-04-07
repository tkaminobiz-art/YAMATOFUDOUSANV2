"use client";

import { useEffect, useState } from "react";

type Slide = {
  id: string;
  alt: string;
  copy: "A" | "B";
};

const SLIDES: Slide[] = [
  { id: "slide-01", alt: "奈良の里山を背景に立つ、やまと不動産の注文住宅 花鳥風月・花モデル外観", copy: "A" },
  { id: "slide-02", alt: "三山木モデルハウスのダイニング、一枚板テーブルと窓外の景色", copy: "A" },
  { id: "slide-03", alt: "三山木モデルハウスの吹抜リビング、自然光の入る開放的な空間", copy: "B" },
  { id: "slide-04", alt: "左京モデルハウスのリビング、一枚板カウンターと間接照明", copy: "B" },
];

const SLIDE_DURATION_MS = 5500;

const COPY = {
  A: {
    main: [
      "家を選ぶ日は、人生で数えるほどしかありません。",
      "その大切な一日に、お客様に妥協してほしくない。",
      "それが、やまと不動産の想いです。",
    ],
    mainSP: [
      "家を選ぶ日は、",
      "人生で数えるほどしかありません。",
      "その大切な一日に、",
      "お客様に妥協してほしくない。",
      "それが、やまと不動産の想いです。",
    ],
    sub: [
      "他社さんでは諦めたこだわり、",
      "やまと不動産ではきっと可能です。",
    ],
  },
  B: {
    main: [
      "十年経った軒先の木目が、建てた日とほとんど変わらない。",
      "やまとの家づくりは、",
      "その景色のためにあります。",
    ],
    mainSP: [
      "十年経った軒先の木目が、",
      "建てた日とほとんど変わらない。",
      "やまとの家づくりは、",
      "その景色のためにあります。",
    ],
    sub: [
      "外壁の下に空気の通り道をつくり、",
      "塗料は推奨より二割多く塗る。",
      "小さなこだわりの積み重ねが、十年という時間では大きな差が出ます。",
    ],
  },
} as const;

const MAIN_SHADOW =
  "0 1px 2px rgba(0, 0, 0, 0.45), 0 4px 16px rgba(0, 0, 0, 0.35), 0 0 32px rgba(0, 0, 0, 0.25)";
const SUB_SHADOW =
  "0 1px 2px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)";

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(interval);
  }, []);

  const activeCopy = SLIDES[activeIndex].copy;
  const copyData = COPY[activeCopy];

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "100vh", minHeight: "600px" }}
      aria-label="ファーストビュー"
    >
      {/* 画像スライダー */}
      <div className="absolute inset-0">
        {SLIDES.map((slide, index) => (
          <picture
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
            style={{ opacity: index === activeIndex ? 1 : 0 }}
          >
            <source
              media="(min-width: 1200px)"
              srcSet={`/images/hero/${slide.id}-pc.webp`}
            />
            <source
              media="(min-width: 768px)"
              srcSet={`/images/hero/${slide.id}-tablet.webp`}
            />
            <img
              src={`/images/hero/${slide.id}-sp.webp`}
              alt={slide.alt}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </picture>
        ))}
      </div>

      {/* 下部グラデーションオーバーレイ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(20,15,10,0.55) 0%, rgba(20,15,10,0.15) 45%, rgba(20,15,10,0) 70%)",
        }}
      />

      {/* コピー */}
      <div
        className="absolute inset-x-0 bottom-0 px-6 md:px-12 lg:px-20 pb-12 md:pb-16 lg:pb-20 text-[#FBF8F3]"
        aria-live="polite"
      >
        {/* max-w-none: 03b — 親の max-width で nowrap 行が意図せず折り返されないようにする */}
        <div className="max-w-none flex flex-col items-start">
          {/* メインコピー: PC/大タブレット（lg+）。md〜lg未満は mainSP で句切りを揃える（03b トラブルシュート） */}
          <div
            key={`main-pc-${activeCopy}`}
            className="hidden lg:flex lg:flex-col lg:items-start animate-[fadeInUp_0.8s_ease-out]"
            style={{ fontFamily: "var(--font-mincho)", textShadow: MAIN_SHADOW }}
          >
            {copyData.main.map((line, i) => (
              <p
                key={i}
                className="block w-max max-w-none text-[30px] lg:text-[38px] leading-[1.8] tracking-wide whitespace-nowrap [overflow-wrap:normal] [word-break:normal]"
                style={{ whiteSpace: "nowrap" }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* メインコピー: SP / 小〜中タブレット（1024px未満） */}
          <div
            key={`main-sp-${activeCopy}`}
            className="flex flex-col items-start lg:hidden animate-[fadeInUp_0.8s_ease-out]"
            style={{ fontFamily: "var(--font-mincho)", textShadow: MAIN_SHADOW }}
          >
            {copyData.mainSP.map((line, i) => (
              <p
                key={i}
                className="block w-max max-w-none text-[22px] leading-[1.8] tracking-wide whitespace-nowrap [overflow-wrap:normal] [word-break:normal]"
                style={{ whiteSpace: "nowrap" }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* 区切り線 */}
          <div className="my-6 md:my-8 w-12 h-px bg-white/60" />

          {/* サブコピー */}
          <div
            key={`sub-${activeCopy}`}
            className="flex flex-col items-start animate-[fadeInUp_0.8s_ease-out_0.15s_backwards] opacity-80"
            style={{ fontFamily: "var(--font-sans)", textShadow: SUB_SHADOW }}
          >
            {copyData.sub.map((line, i) => (
              <p
                key={i}
                className="block w-max max-w-none text-[14px] md:text-[15px] lg:text-[17px] leading-[2.0] font-light whitespace-nowrap [overflow-wrap:normal] [word-break:normal]"
                style={{ whiteSpace: "nowrap" }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
