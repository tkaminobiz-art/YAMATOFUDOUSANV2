"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

// Bento: 大(2x2) 1枚 + 中(2x1) 2枚 + 小(1x1) 9枚
const STANDARDS = [
  {
    category: "キッチン",
    brand: "クリナップ",
    detail: "システムキッチン＋食洗機＋IH3口",
    image: "/images/standard/facility_img_01.webp",
    size: "large", // 2x2
  },
  {
    category: "浴室",
    brand: "TOTO",
    detail: "ユニットバス 1616 / 保温浴槽",
    image: "/images/standard/facility_img_03.webp",
    size: "wide", // 2x1
  },
  {
    category: "玄関ドア",
    brand: "YKK AP",
    detail: "親子ドア＋顔認証（花モデル）",
    image: "/images/standard/facility_img_06.webp",
    size: "wide",
  },
  {
    category: "食洗機",
    brand: "Miele / Panasonic",
    detail: "ビルトイン食洗機",
    image: "/images/standard/facility_img_02.webp",
    size: "small",
  },
  {
    category: "洗面台",
    brand: "TOTO",
    detail: "750サイズ",
    image: "/images/standard/facility_img_04.webp",
    size: "small",
  },
  {
    category: "トイレ",
    brand: "TOTO",
    detail: "ウォシュレット標準",
    image: "/images/standard/facility_img_05.webp",
    size: "small",
  },
  {
    category: "窓サッシ",
    brand: "YKK AP",
    detail: "APW330 Low-E樹脂サッシ",
    image: "/images/standard/facility_img_07.webp",
    size: "small",
  },
  {
    category: "外壁",
    brand: "ニチハ",
    detail: "窯業系サイディング16mm",
    image: "/images/standard/facility_img_08.webp",
    size: "small",
  },
  {
    category: "断熱",
    brand: "ウレタン吹付",
    detail: "外断熱85mm＋屋根95mm",
    image: "/images/standard/facility_img_09.webp",
    size: "small",
  },
  {
    category: "給湯",
    brand: "エコキュート",
    detail: "460L オール電化",
    image: "/images/standard/facility_img_10.webp",
    size: "small",
  },
  {
    category: "エアコン",
    brand: "リビング1台標準",
    detail: "エアコン＋LED＋カーテン",
    image: "/images/standard/facility_img_11.webp",
    size: "small",
  },
  {
    category: "外構",
    brand: "門柱・ポスト・表札",
    detail: "外構一式＋網戸",
    image: "/images/standard/facility_img_12.webp",
    size: "small",
  },
] as const;

export default function StandardSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-secondary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ヘッダー */}
        <div className="mb-10 md:mb-14 max-w-[640px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            STANDARD
          </p>
          <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
            これが全部、標準です。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
            モデルハウスで見た設備が、オプションではなく全邸標準。クリナップ、TOTO、YKK AP──メーカー名でご確認ください。
          </p>
        </div>

        {/* Bento Grid — 写真フルブリード型 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
          {STANDARDS.map((item) => {
            const spanClass =
              item.size === "large"
                ? "col-span-2 row-span-2"
                : item.size === "wide"
                ? "col-span-2 row-span-1"
                : "col-span-1 row-span-1";

            return (
              <div
                key={item.category}
                className={`scroll-in relative group overflow-hidden rounded ${spanClass}`}
                style={{
                  aspectRatio: item.size === "large" ? "1 / 1" : item.size === "wide" ? "2 / 1" : "1 / 1",
                }}
              >
                {/* 写真（フルブリード） */}
                <Image
                  src={item.image}
                  alt={`${item.category} - ${item.brand}`}
                  fill
                  className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  sizes={
                    item.size === "large"
                      ? "(max-width: 1024px) 50vw, 33vw"
                      : item.size === "wide"
                      ? "(max-width: 1024px) 50vw, 33vw"
                      : "(max-width: 640px) 50vw, 16vw"
                  }
                />

                {/* グラデオーバーレイ */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* テキストオーバーレイ */}
                <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 lg:p-5">
                  <p className="text-white/80 text-[10px] md:text-xs font-medium tracking-wider mb-0.5">
                    {item.brand}
                  </p>
                  <h3
                    className={`text-white font-medium ${
                      item.size === "large"
                        ? "text-lg md:text-xl"
                        : "text-sm md:text-base"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {item.category}
                  </h3>
                  {item.size !== "small" && (
                    <p className="text-white/70 text-xs mt-1 hidden md:block">
                      {item.detail}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-text-secondary text-[11px] mt-6">
          ※ 花モデル（2,480万円）の標準仕様です。風・京は一部仕様が異なります。
        </p>
      </div>
    </section>
  );
}
