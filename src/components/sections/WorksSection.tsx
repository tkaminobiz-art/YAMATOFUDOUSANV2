"use client";

import Image from "next/image";
import { Users } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  WorksSection — 2026-04-15 Phase 2D 強化
  神野さん/レビュー指摘：
  - 単なる画像ではなく「家族構成」「課題と解決」「お客様コメント」を添えることで
    将来のお客様が「自分ごと」として捉えやすくなる
  - 家族構成・課題・コメントは [要確認] 仮データで実装（後日実データに差し替え）

  - Featured 3件: SPは横スワイプ、PCは非対称レイアウト維持
  - Grid 5件: SPは横スワイプ、PCは5列グリッド維持
*/

// [要確認] 家族構成・課題・解決・コメント・担当スタッフは仮データ。
// 実データに差し替える必要あり。
const FEATURED = [
  {
    id: "case1",
    title: "奈良市 T様邸",
    model: "花モデル",
    spec: "33坪 / 4LDK",
    family: "ご夫婦 + お子様2人",
    challenge: "広めの家族空間と、収納の両立",
    solution: "20帖LDK + 大空間収納4帖",
    comment: "打ち合わせに行くたびに「今日は誰に会うの？」と子どもが楽しみにしていました。",
    staffSales: "西口・クロフォード・丈",
    staffDesign: "栗野 佑也",
    main: "/images/works/case1-ext.webp",
    subs: [
      "/images/works/case1-living.webp",
      "/images/works/case1-kitchen.webp",
    ],
  },
  {
    id: "case2",
    title: "大和郡山市 S様邸",
    model: "風モデル",
    spec: "30坪 / 4LDK",
    family: "ご夫婦 + お子様1人",
    challenge: "共働きでも、効率的に家事をこなしたい",
    solution: "家事ラク動線 + 広めのパントリー",
    comment: "帰宅後の家事動線が劇的に楽になりました。共働きにはありがたいです。",
    staffSales: "山岡 洋一",
    staffDesign: "河野 英宣",
    main: "/images/works/case2-ext.webp",
    subs: [
      "/images/works/case2-living.webp",
      "/images/works/case2-kitchen.webp",
    ],
  },
  {
    id: "case3",
    title: "生駒市 M様邸",
    model: "京モデル",
    spec: "28坪 / 3LDK",
    family: "ご夫婦",
    challenge: "コンパクトな土地でも、ゆとりある空間に",
    solution: "吹き抜け + 開放的なLDK",
    comment: "狭い土地だったけど、吹き抜けで広々暮らせています。",
    staffSales: "田中 信次",
    staffDesign: "岩佐 篤志",
    main: "/images/works/case3-ext.webp",
    subs: [
      "/images/works/case3-living.webp",
      "/images/works/case3-entrance.webp",
    ],
  },
] as const;

const GRID_WORKS = [
  { area: "奈良市", image: "/images/works/works-01.webp" },
  { area: "京田辺市", image: "/images/works/works-02.webp" },
  { area: "橿原市", image: "/images/works/works-03.webp" },
  { area: "天理市", image: "/images/works/works-04.webp" },
  { area: "斑鳩町", image: "/images/works/works-05.webp" },
] as const;

export default function WorksSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="works" className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto scroll-in"
      >
        {/* ヘッダー */}
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
            <div className="max-w-[640px]">
              <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
                WORKS
              </p>
              <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
                実際に建てた家を、ご覧ください。
              </h2>
              <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
                すべてコミコミ価格で建てた、やまと不動産の施工事例です。
              </p>
            </div>
            <div
              className="text-right"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              <span className="text-main font-light text-6xl md:text-7xl block leading-none">
                90
              </span>
              <span className="text-text-secondary text-xs md:text-sm">区画以上の分譲実績</span>
            </div>
          </div>
        </div>

        {/* ===== Featured 3件 — SPカルーセル / PC非対称レイアウト ===== */}

        {/* SP: 横スワイプ */}
        <div className="md:hidden">
          <div
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-[var(--page-px)] pb-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {FEATURED.map((work) => (
              <article
                key={work.id}
                className="shrink-0 w-[85%] snap-center flex flex-col gap-3"
              >
                <div className="relative aspect-[3/2] rounded-lg overflow-hidden card-shadow">
                  <Image
                    src={work.main}
                    alt={`${work.title} 外観`}
                    fill
                    className="object-cover"
                    sizes="85vw"
                  />
                </div>
                <div>
                  <p className="text-accent text-xs font-medium tracking-wider mb-1">
                    {work.model}
                  </p>
                  <h3
                    className="text-text-primary text-lg mb-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {work.title}
                  </h3>
                  <p className="text-text-secondary text-sm mb-3">{work.spec}</p>
                  <div className="inline-flex items-center gap-1.5 text-text-secondary text-xs">
                    <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                    <span>{work.family}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {work.subs.map((src, i) => (
                    <div
                      key={i}
                      className="relative aspect-[3/2] rounded-lg overflow-hidden card-shadow"
                    >
                      <Image
                        src={src}
                        alt={`${work.title} 内観 ${i + 1}`}
                        fill
                        className="object-cover"
                        sizes="40vw"
                      />
                    </div>
                  ))}
                </div>
                {/* 課題と解決 */}
                <div className="bg-bg-secondary rounded p-4">
                  <p className="text-text-secondary text-[11px] mb-1 tracking-wider">
                    お悩み
                  </p>
                  <p className="text-text-primary text-sm mb-3 leading-relaxed">
                    {work.challenge}
                  </p>
                  <p className="text-main text-[11px] mb-1 tracking-wider">
                    設計での工夫
                  </p>
                  <p className="text-text-primary text-sm leading-relaxed">
                    {work.solution}
                  </p>
                </div>
                {/* お客様コメント */}
                <blockquote className="border-l-2 border-accent/40 pl-4 py-1">
                  <p className="text-text-primary text-sm leading-[1.9]">
                    「{work.comment}」
                  </p>
                </blockquote>
                {/* 担当スタッフ */}
                <p className="text-text-secondary text-[11px]">
                  担当 : {work.staffSales}（営業） / {work.staffDesign}（設計）
                </p>
              </article>
            ))}
          </div>
          <p className="text-center text-text-secondary text-xs mt-2 tracking-wider">
            ← 横にスワイプできます →
          </p>
        </div>

        {/* PC: 非対称レイアウト */}
        <div className="hidden md:block max-w-[1400px] mx-auto px-[var(--page-px)]">
          <div className="flex flex-col gap-16 lg:gap-20 mb-16 md:mb-20">
            {FEATURED.map((work, index) => (
              <div
                key={work.id}
                className={`scroll-in grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[var(--card-gap)] items-start ${
                  index % 2 === 1 ? "" : ""
                }`}
                style={index % 2 === 1 ? { direction: "rtl" } : undefined}
              >
                <div
                  className="relative aspect-[3/2] rounded-lg overflow-hidden card-shadow group"
                  style={{ direction: "ltr" }}
                >
                  <Image
                    src={work.main}
                    alt={`${work.title} 外観`}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 60vw"
                  />
                </div>

                <div
                  className="flex flex-col gap-5"
                  style={{ direction: "ltr" }}
                >
                  <div>
                    <p className="text-accent text-xs font-medium tracking-wider mb-1">
                      {work.model}
                    </p>
                    <h3
                      className="text-text-primary text-lg md:text-xl mb-1"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {work.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-3">{work.spec}</p>
                    <div className="inline-flex items-center gap-1.5 text-text-secondary text-xs">
                      <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>{work.family}</span>
                    </div>
                  </div>

                  {/* 課題と解決 */}
                  <div className="bg-bg-secondary rounded-lg p-4 md:p-5">
                    <p className="text-text-secondary text-[11px] mb-1 tracking-wider">
                      お悩み
                    </p>
                    <p className="text-text-primary text-sm mb-3 leading-relaxed">
                      {work.challenge}
                    </p>
                    <p className="text-main text-[11px] mb-1 tracking-wider">
                      設計での工夫
                    </p>
                    <p className="text-text-primary text-sm leading-relaxed">
                      {work.solution}
                    </p>
                  </div>

                  {/* 内観写真 */}
                  <div className="grid grid-cols-2 gap-3">
                    {work.subs.map((src, i) => (
                      <div
                        key={i}
                        className="relative aspect-[3/2] rounded-lg overflow-hidden card-shadow group"
                      >
                        <Image
                          src={src}
                          alt={`${work.title} 内観 ${i + 1}`}
                          fill
                          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 25vw, 15vw"
                        />
                      </div>
                    ))}
                  </div>

                  {/* お客様コメント */}
                  <blockquote className="border-l-2 border-accent/40 pl-4 py-1">
                    <p className="text-text-primary text-sm leading-[1.9]">
                      「{work.comment}」
                    </p>
                  </blockquote>

                  {/* 担当スタッフ */}
                  <p className="text-text-secondary text-[11px]">
                    担当 : {work.staffSales}（営業） / {work.staffDesign}（設計）
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 追加の5件 — SPカルーセル / PCコンパクトグリッド ===== */}
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)] mt-8 md:mt-0">
          <p className="text-text-secondary text-sm mb-6">
            その他の施工事例
          </p>

          {/* SP: 横スワイプ */}
          <div className="md:hidden">
            <div
              className="flex overflow-x-auto snap-x snap-mandatory gap-3 -mx-[var(--page-px)] px-[var(--page-px)] pb-4 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {GRID_WORKS.map((w, i) => (
                <div
                  key={i}
                  className="shrink-0 w-[55%] snap-center relative aspect-square rounded overflow-hidden"
                >
                  <Image
                    src={w.image}
                    alt={`${w.area} 施工事例`}
                    fill
                    className="object-cover"
                    sizes="55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <p className="absolute bottom-2 left-3 text-white text-xs font-medium">
                    {w.area}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* PC: 5列グリッド */}
          <div className="hidden md:grid grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {GRID_WORKS.map((w, i) => (
              <div
                key={i}
                className="scroll-in relative aspect-square rounded overflow-hidden group"
              >
                <Image
                  src={w.image}
                  alt={`${w.area} 施工事例`}
                  fill
                  className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-xs font-medium">
                  {w.area}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
