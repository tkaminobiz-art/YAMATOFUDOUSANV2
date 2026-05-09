import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  WorksSection — 2026-05-09 v6 (Asymmetric Magazine — mockup w-01 忠実)
  ---------------------------------------------------------------
  v5 反省: Hero を portrait 4:5 にしてしまった + 右カラムを単純 flex 縦積みに
  → mockup の「3-column asymmetric grid (Hero LANDSCAPE 左 / 中央に 2 枚 / 右下に 1 枚 small portrait)」
    を再現できていなかった。
  + 写真選定が gallery-worthy ではない (works-02/01/case1/works-05 は普通の物件カット)。

  v6: mockup w-01 を厳密に再現する 3-column grid に組み直し、
  yamato 全画像から「光のコントラスト」がある dramatic 写真を再選定。

  【layout (mockup 忠実)】
   3-column grid (1.4fr / 1fr / 0.65fr):
   - Col 1 (left, largest): Header (top) + Hero photo (large LANDSCAPE 4:3 bottom)
   - Col 2 (center): Right Top (large portrait 4:5) + Right Middle (wide landscape 16:10) 縦積み
   - Col 3 (narrow right): empty top + Right Bottom (small portrait 3:4) at bottom

  【写真選定 (光のコントラスト中心)】
   Hero:   hero-night-shijoji  — 夜+庭灯+カーポートの dramatic 光 (gallery headliner)
   R-Top:  hero-day-green-exterior — calm daylight 黒外観 + 石垣 (コントラスト)
   R-Mid:  exterior-04 — 夜+暖色の窓灯 + uplight (もう 1 つの dramatic 光)
   R-Bot:  exterior-porch-01 — entrance 黒ドア + 暖色木目天井 (detail closeup)
   → 2 dramatic night / 1 calm daylight / 1 detail のリッチな構成

  【コピー (mockup 忠実)】
   h2: 「建てた家、そのものを。」
   lead: 「住まい手の想いと、土地の個性を丁寧に編み上げた家づくり。」

  クラスタ pattern 完全継承 (warm paper / Mincho / 深緑 / FIG.04 eyebrow / ActionLine CTA)。
*/

type Work = {
  src: string;
  alt: string;
  area: string;
  spec: string;
};

const HERO: Work = {
  src: "/images/newsozai/hero-night-shijoji.webp",
  alt: "夜の住まい — 庭灯とカーポート照明が浮かび上がる外観",
  area: "奈良市",
  spec: "4LDK",
};

const RIGHT_TOP: Work = {
  src: "/images/newsozai/hero-day-green-exterior.webp",
  alt: "黒外観の住まい — 石垣テラスと立体的なファサード",
  area: "生駒市",
  spec: "3LDK",
};

const RIGHT_MID: Work = {
  src: "/images/works-parts/exterior/exterior-04.webp",
  alt: "夜の住まい — 暖色の窓灯と庭の uplight",
  area: "橿原市",
  spec: "4LDK",
};

const RIGHT_BOT: Work = {
  src: "/images/newsozai/interior-ldk-01.webp",
  alt: "LDK 内観 — ダーク木目天井と無垢のライブエッジダイニングテーブル",
  area: "奈良市",
  spec: "LDK",
};

function CaptionLine({ work }: { work: Work }) {
  return (
    <figcaption className="mt-2.5 flex items-baseline gap-2.5 text-[11.5px] leading-[1.6] text-[#1A1815]/65 font-mono tracking-[0.04em]">
      <span className="text-[#1A1815]/85">{work.area}</span>
      <span aria-hidden className="text-[#1A1815]/30">/</span>
      <span>{work.spec}</span>
    </figcaption>
  );
}

export default function WorksSection() {
  return (
    <section
      id="works"
      className="relative bg-[#F7F5F0] text-[#1A1815] pt-[calc(var(--section-py)*0.5)] pb-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* asymmetric magazine grid: 3 columns (mockup w-01 忠実) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr_0.65fr] gap-x-5 lg:gap-x-7 gap-y-8 items-stretch">
          {/* Col 1: Header (top) + Hero LANDSCAPE (bottom) */}
          <div className="flex flex-col gap-y-8 lg:gap-y-10">
            <header>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
                <span>FIG. 04</span>
                <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
                <span>Works</span>
              </div>
              <h2
                className="mt-5 font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
                style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
              >
                建てた家、そのものを。
              </h2>
              <p className="mt-5 text-[clamp(13px,0.95vw,15px)] leading-[1.95] text-[#1A1815]/75">
                住まい手の想いと、土地の個性を
                <br className="hidden md:inline" />
                丁寧に編み上げた家づくり。
              </p>
            </header>

            <figure className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDEAE3]">
                <Image
                  src={HERO.src}
                  alt={HERO.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <CaptionLine work={HERO} />
            </figure>
          </div>

          {/* Col 2: Right Top (large portrait 4:5) + Right Middle (wide 16:10) 縦積み */}
          <div className="flex flex-col gap-y-5 lg:gap-y-6">
            <figure className="flex flex-col">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDEAE3]">
                <Image
                  src={RIGHT_TOP.src}
                  alt={RIGHT_TOP.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <CaptionLine work={RIGHT_TOP} />
            </figure>
            <figure className="flex flex-col">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EDEAE3]">
                <Image
                  src={RIGHT_MID.src}
                  alt={RIGHT_MID.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
              <CaptionLine work={RIGHT_MID} />
            </figure>
          </div>

          {/* Col 3 (narrow): empty top + Right Bottom (small portrait 3:4) at bottom */}
          <div className="flex flex-col justify-end">
            <figure className="flex flex-col">
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EDEAE3]">
                <Image
                  src={RIGHT_BOT.src}
                  alt={RIGHT_BOT.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 18vw"
                  className="object-cover"
                />
              </div>
              <CaptionLine work={RIGHT_BOT} />
            </figure>
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
