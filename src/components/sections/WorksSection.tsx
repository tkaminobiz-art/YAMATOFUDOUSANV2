import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  WorksSection — 2026-05-09 v5 (Asymmetric Magazine Gallery)
  ---------------------------------------------------------------
  v4 (横カルーセル 8 件 snap-x) 撤去理由:
  - スクロール量大・冗長。ユーザー判断で「コンパクトでいい」
  - クラスタの編集誌 worldview と乖離

  v5: 4 枚ギャラリー (Hero 1 + supporting 3) の asymmetric magazine spread。
  /works-lab w-01 採用。20 年キャリアの senior editorial designer デザイン。

  写真選定 (yamato 既存 works から外観 4 枚):
   Hero:  works-02 (京田辺市 / 黒外観 + 赤い玄関ドア)
   Sup 1: works-01 (奈良市 / 鋭い片流れ屋根 + 青空)
   Sup 2: case1-ext (奈良市 / 黒外観 + ガラス天井カーポート / 花モデル 33坪 4LDK)
   Sup 3: works-05 (斑鳩町 / 木目スリットアクセントの立体的外観)

  クラスタ pattern 完全継承:
   - bg #F7F5F0 / 墨黒 #1A1815 / 深緑 #143426 単一アクセント
   - eyebrow: FIG. 04 · WORKS (mono + hairline)
   - h2: Shippori Mincho
   - lead: Mincho 本文
   - ActionLine CTA: 「事例をもっと見る →」 → /works
*/

type Work = {
  src: string;
  alt: string;
  area: string;
  spec: string;
};

const HERO: Work = {
  src: "/images/works/works-02.webp",
  alt: "やまと不動産が手がけた京田辺市の住まい — 黒外観に赤い玄関ドアの妻入りファサード",
  area: "京田辺市",
  spec: "4LDK / 30坪",
};

const SUPPORTS: readonly Work[] = [
  {
    src: "/images/works/works-01.webp",
    alt: "奈良市の住まい — 鋭い片流れ屋根と青空",
    area: "奈良市",
    spec: "4LDK / 32坪",
  },
  {
    src: "/images/works/case1-ext.webp",
    alt: "奈良市 T様邸 — 黒外観とガラス天井のカーポート",
    area: "奈良市 T様邸",
    spec: "花モデル · 33坪 / 4LDK",
  },
  {
    src: "/images/works/works-05.webp",
    alt: "斑鳩町の住まい — 木目スリットアクセントの立体的外観",
    area: "斑鳩町",
    spec: "5LDK / 36坪",
  },
];

export default function WorksSection() {
  return (
    <section
      id="works"
      className="relative bg-[#F7F5F0] text-[#1A1815] pt-[calc(var(--section-py)*0.5)] pb-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* eyebrow + h2 + lead — クラスタ pattern 完全同型 */}
        <header className="max-w-[860px]">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
            <span>FIG. 04</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>Works</span>
          </div>
          <h2
            className="mt-5 font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
          >
            やまとが手がけた、住まい。
          </h2>
          <p className="mt-6 max-w-[680px] text-[clamp(13.5px,1vw,15px)] leading-[1.95] text-[#1A1815]/80">
            実際に建てた住まいを、4 つの実例でご覧ください。
            土地・ご家族・暮らし方は、すべて違います。
          </p>
        </header>

        {/* asymmetric magazine gallery: Hero (左) + 3 supports (右)
            両カラムは items-start で独立した自然高さ (編集誌的 asymmetric リズム) */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-x-5 lg:gap-x-8 gap-y-8 items-start">
          {/* Hero — 左カラム */}
          <figure className="flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDEAE3]">
              <Image
                src={HERO.src}
                alt={HERO.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-baseline gap-3 text-[12px] leading-[1.6] text-[#1A1815]/65 font-mono tracking-[0.04em]">
              <span className="text-[#1A1815]/85">{HERO.area}</span>
              <span aria-hidden className="text-[#1A1815]/30">/</span>
              <span>{HERO.spec}</span>
            </figcaption>
          </figure>

          {/* 3 supports — 右カラム flex 縦積み (各写真は自然 aspect、隙間は gap のみ) */}
          <div className="flex flex-col gap-y-5 lg:gap-y-6">
            {SUPPORTS.map((s, i) => (
              <figure key={s.src} className="flex flex-col">
                <div
                  className={`relative w-full overflow-hidden bg-[#EDEAE3] ${
                    // 異なるアスペクト比でリズムを作る (mockup の asymmetric 感を再現)
                    i === 0
                      ? "aspect-[4/3]"
                      : i === 1
                      ? "aspect-[16/10]"
                      : "aspect-[5/4]"
                  }`}
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 35vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 flex items-baseline gap-2.5 text-[11px] leading-[1.6] text-[#1A1815]/65 font-mono tracking-[0.04em]">
                  <span className="text-[#1A1815]/85">{s.area}</span>
                  <span aria-hidden className="text-[#1A1815]/30">/</span>
                  <span>{s.spec}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* ActionLine CTA — 右下、cluster 同型 */}
        <div className="mt-12 md:mt-14 flex flex-col items-end gap-4 border-t border-[var(--color-rule)] pt-8">
          <Link
            href="/works"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815] border-b border-[#1A1815]/30 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            事例をもっと見る
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
