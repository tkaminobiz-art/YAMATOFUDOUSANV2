"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

const WORKS = [
  {
    id: "case1",
    title: "奈良市 T様邸",
    model: "花モデル",
    spec: "33坪 / 4LDK",
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
    main: "/images/works/case3-ext.webp",
    subs: [
      "/images/works/case3-living.webp",
      "/images/works/case3-entrance.webp",
    ],
  },
] as const;

export default function WorksSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="works" className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
          WORKS
        </p>
        <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
          実際に建てた家を、ご覧ください。
        </h2>
        <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed mb-10 md:mb-14 max-w-[640px]">
          すべてコミコミ価格で建てた、やまと不動産の施工事例です。
        </p>

        {/* 施工事例カード — 非対称レイアウト（大1 + 小2） */}
        <div className="flex flex-col gap-16 lg:gap-20">
          {WORKS.map((work, index) => (
            <div
              key={work.id}
              className={`scroll-in grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-[var(--card-gap)] items-start ${
                index % 2 === 1 ? "lg:grid-cols-[2fr_3fr] lg:direction-rtl" : ""
              }`}
              style={
                index % 2 === 1
                  ? { direction: "rtl" }
                  : undefined
              }
            >
              {/* メイン画像（大） */}
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

              {/* 右カラム: テキスト + サブ写真2枚 */}
              <div className="flex flex-col gap-[var(--card-gap)]" style={{ direction: "ltr" }}>
                <div>
                  <p className="text-main text-xs font-medium tracking-wider mb-1">
                    {work.model}
                  </p>
                  <h3
                    className="text-text-primary text-lg md:text-xl mb-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {work.title}
                  </h3>
                  <p className="text-text-secondary text-sm">{work.spec}</p>
                </div>
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
                      sizes="(max-width: 1024px) 50vw, 30vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
