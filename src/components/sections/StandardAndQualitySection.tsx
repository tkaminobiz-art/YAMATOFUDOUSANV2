"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  Standard × Quality（統合）
  - Standard: 標準仕様（写真で見せる）
  - Quality: 施工品質（数字で担保する）
  それぞれを別セクションにすると重複しやすいため、見開きとして一体化する。
*/

const STANDARDS = [
  {
    category: "キッチン",
    brand: "クリナップ",
    detail: "システムキッチン＋食洗機＋IH3口",
    image: "/images/standard/facility_img_01.webp",
    size: "large",
  },
  {
    category: "浴室",
    brand: "TOTO",
    detail: "ユニットバス 1616 / 保温浴槽",
    image: "/images/standard/facility_img_02.webp",
    size: "wide",
  },
  {
    category: "玄関ドア",
    brand: "YKK AP",
    detail: "親子ドア＋顔認証（花モデル）",
    image: "/images/standard/facility_img_05.webp",
    size: "wide",
  },
  {
    category: "洗面台",
    brand: "TOTO",
    detail: "750サイズ洗面化粧台",
    image: "/images/standard/facility_img_03.webp",
    size: "small",
  },
  {
    category: "窓サッシ",
    brand: "YKK AP",
    detail: "Low-E複層ガラス 樹脂サッシ",
    image: "/images/standard/facility_img_06.webp",
    size: "small",
  },
  {
    category: "外壁",
    brand: "ニチハ",
    detail: "窯業系サイディング16mm",
    image: "/images/standard/facility_img_04.webp",
    size: "small",
  },
  {
    category: "屋根",
    brand: "ガルバリウム",
    detail: "高耐久 金属屋根",
    image: "/images/standard/facility_img_07.webp",
    size: "small",
  },
  {
    category: "室内ドア",
    brand: "ハイドア",
    detail: "天井まで届くフラット扉が標準",
    image: "/images/standard/facility_img_08.webp",
    size: "small",
  },
  {
    category: "床材",
    brand: "無垢調フローリング",
    detail: "踏み心地にこだわる標準仕様",
    image: "/images/standard/facility_img_09.webp",
    size: "small",
  },
  {
    category: "外構",
    brand: "石畳アプローチ",
    detail: "門柱・ポスト・表札・外構一式込み",
    image: "/images/standard/facility_img_10.webp",
    size: "small",
  },
  {
    category: "制震装置",
    brand: "住友ゴム MIRAIE",
    detail: "揺れ最大70%低減",
    image: "/images/standard/facility_img_12.webp",
    size: "small",
  },
  {
    category: "照明",
    brand: "LED ダウンライト",
    detail: "主要室すべて標準装備",
    image: "/images/standard/facility_img_13.webp",
    size: "small",
  },
] as const;

const QUALITY_CARDS = [
  {
    number: "10",
    unit: "年",
    title: "外壁メンテの目安",
    desc: "外壁は、10年前後で塗り替えを検討する方が多いと言われます。やまと不動産は、長く保ちやすい仕様を標準にしています。",
  },
  {
    number: "1.2",
    unit: "倍",
    title: "見えない部分の塗布量",
    desc: "推奨量の1.2倍を塗布します。見えない厚みが、年数が経ったときに効いてきます。",
  },
  {
    number: "100",
    unit: "%自社",
    title: "設計から施工まで一貫",
    desc: "工程を外に投げず、最後まで責任が途切れない体制にしています。",
  },
] as const;

export default function StandardAndQualitySection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="relative overflow-hidden bg-bg-secondary py-[var(--section-py)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.33]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(43,43,43,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,43,43,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div ref={ref} className="relative max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in">
        <div className="mb-10 md:mb-14 max-w-[760px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            QUALITY / STANDARD
          </p>
          <h2
            className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            10年後に差が出るのは、外壁です。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9]">
            多くの家が10年前後で外壁の塗り替えを考え始めます。やまと不動産は、外壁の仕様と施工の手間を“最初から”揃えることで、メンテの頻度を抑えやすい家を目指しています。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* 左：標準仕様（写真） */}
          <div className="lg:col-span-8">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary mb-3">
              標準仕様（写真の一部）
            </p>
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
                      aspectRatio:
                        item.size === "large"
                          ? "1 / 1"
                          : item.size === "wide"
                            ? "2 / 1"
                            : "1 / 1",
                    }}
                  >
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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
                      {item.size !== "small" ? (
                        <p className="text-white/70 text-xs mt-1 hidden md:block">
                          {item.detail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-text-secondary text-[11px] mt-6">
              ※ 花モデル（二千四百八十万円）の標準仕様です。風・京は一部仕様が異なります。
            </p>
          </div>

          {/* 右：品質（数字） */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-bg-primary p-6 md:p-7">
              <p className="text-xs font-semibold tracking-[0.14em] text-main">
                外壁の考え方
              </p>
              <p className="mt-3 text-sm leading-[1.9] text-text-secondary">
                仕上がりは、完成した日に見えます。けれど差が出るのは、住み始めてからです。仕様と施工の積み重ねが、10年後の手間を左右します。
              </p>

              <div className="mt-5 rounded-xl border border-border bg-bg-secondary/60 px-5 py-4">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">
                  目指している状態
                </p>
                <p
                  className="mt-2 text-[15px] font-semibold leading-relaxed tracking-[0.04em] text-text-primary"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  塗り替えの頻度を、できるだけ抑えられる外壁。
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
                  ※ 立地や日当たりなどの環境条件で、劣化のスピードは変わります。
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {QUALITY_CARDS.map((c) => (
                  <div key={c.title} className="rounded-xl border border-border bg-bg-secondary/60 p-5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-main font-light text-[clamp(34px,4vw,56px)]"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        {c.number}
                      </span>
                      <span className="text-text-primary text-sm font-medium">
                        {c.unit}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-text-primary">
                      {c.title}
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[11px] leading-relaxed text-text-secondary">
                ※ 保証の内容は次のセクションでまとめてご案内しています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

