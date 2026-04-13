"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

const STANDARDS = [
  {
    category: "キッチン",
    brand: "クリナップ",
    detail: "システムキッチン＋食洗機＋IH3口",
    image: "/images/standard/facility_img_01.webp",
    span: "lg:col-span-2", // Bento: 大
  },
  {
    category: "食洗機",
    brand: "Miele / Panasonic",
    detail: "ビルトイン食洗機が標準装備",
    image: "/images/standard/facility_img_02.webp",
    span: "",
  },
  {
    category: "浴室",
    brand: "TOTO",
    detail: "ユニットバス 1616 / 保温浴槽 / 浴室暖房乾燥機",
    image: "/images/standard/facility_img_03.webp",
    span: "",
  },
  {
    category: "洗面台",
    brand: "TOTO",
    detail: "750サイズ洗面化粧台",
    image: "/images/standard/facility_img_04.webp",
    span: "",
  },
  {
    category: "トイレ",
    brand: "TOTO",
    detail: "ウォシュレット標準",
    image: "/images/standard/facility_img_05.webp",
    span: "",
  },
  {
    category: "玄関ドア",
    brand: "YKK AP",
    detail: "Venato K4 親子ドア＋顔認証（花モデル）",
    image: "/images/standard/facility_img_06.webp",
    span: "lg:col-span-2", // Bento: 大
  },
  {
    category: "窓サッシ",
    brand: "YKK AP",
    detail: "APW330 Low-E複層ガラス 樹脂サッシ",
    image: "/images/standard/facility_img_07.webp",
    span: "",
  },
  {
    category: "外壁",
    brand: "ニチハ",
    detail: "窯業系サイディング16mm",
    image: "/images/standard/facility_img_08.webp",
    span: "",
  },
  {
    category: "断熱",
    brand: "ウレタン吹付",
    detail: "外断熱85mm＋屋根硬質ウレタン95mm",
    image: "/images/standard/facility_img_09.webp",
    span: "",
  },
  {
    category: "給湯",
    brand: "エコキュート",
    detail: "460L オール電化仕様",
    image: "/images/standard/facility_img_10.webp",
    span: "",
  },
  {
    category: "エアコン",
    brand: "リビング1台標準",
    detail: "エアコン＋LED照明＋カーテン付き",
    image: "/images/standard/facility_img_11.webp",
    span: "",
  },
  {
    category: "外構",
    brand: "門柱・ポスト・表札",
    detail: "外構一式＋網戸が標準込み",
    image: "/images/standard/facility_img_12.webp",
    span: "",
  },
] as const;

export default function StandardSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-secondary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* セクションラベル */}
        <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
          STANDARD
        </p>

        {/* タイトル */}
        <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-3">
          これが全部、標準です。
        </h2>

        {/* リード */}
        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed mb-10 md:mb-14 max-w-[640px]">
          モデルハウスで見た設備が、オプションではなく全邸標準。
          クリナップ、TOTO、YKK AP──メーカー名で確認してください。
        </p>

        {/* Bento Grid — 大カードと通常カードの混在 */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[var(--card-gap)]">
          {STANDARDS.map((item) => (
            <div
              key={item.category}
              className={`scroll-in rounded-lg overflow-hidden card-shadow group ${item.span}`}
            >
              {/* 画像 */}
              <div className="relative w-full aspect-[3/2] bg-bg-secondary overflow-hidden">
                <Image
                  src={item.image}
                  alt={`${item.category} - ${item.brand}`}
                  fill
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  sizes={
                    item.span
                      ? "(max-width: 1024px) 100vw, 66vw"
                      : "(max-width: 640px) 50vw, 33vw"
                  }
                />
              </div>

              {/* テキスト */}
              <div className="bg-bg-primary p-[var(--card-p)]">
                <p className="text-main text-[10px] font-medium tracking-wider mb-1">
                  {item.brand}
                </p>
                <h3
                  className="text-text-primary font-medium text-sm mb-1"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {item.category}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 注記 */}
        <p className="text-text-secondary text-[11px] mt-6">
          ※ 花モデル（2,480万円）の標準仕様です。風・京は一部仕様が異なります。
        </p>
      </div>
    </section>
  );
}
