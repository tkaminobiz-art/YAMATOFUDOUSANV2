"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  FreedomOfDesign — 2026-04-24 v3 (案A shukobuild型 カタログ)
  ---------------------------------------------------------------
  v2(v1+) で残っていた:
  - Shippori Mincho (明朝) 見出し + 軸タイトル
  - "Freedom of Design" 英字kicker 大判
  - 非対称 1.4fr:1fr ヘッダー
  - 「01/02/03」章立てで軸/ギャラリー/ステップ分割
  を撤去。カードの並列構造は維持。

  v3: 一言 heading + 4軸カード + 6ギャラリー + 4ステップ(同じ平面で並列)
*/

const AXES = [
  {
    num: "01",
    title: "窓",
    degree: "完全自由",
    body: "大きさも位置も形も、自由に決められます。窓が、暮らしの景色を切り取ります。",
  },
  {
    num: "02",
    title: "収納",
    degree: "完全自由",
    body: "量も場所も、暮らしに合わせて決めます。",
  },
  {
    num: "03",
    title: "光",
    degree: "完全自由",
    body: "光の入り方と照明を、あわせて設計します。朝から夜まで、光の表情が変わります。",
  },
  {
    num: "04",
    title: "素材",
    degree: "無垢 / タイル / 塗り壁ほか",
    body: "手触りから、選んでいただけます。",
  },
] as const;

const GALLERIES = [
  {
    src: "/images/design/example-coveceiling.webp",
    alt: "折下天井+間接照明のリビング",
    tag: "光",
    caption: "折下天井に、間接照明を仕込みます。",
  },
  {
    src: "/images/newsozai/interior-window-detail-01.webp",
    alt: "窓のディテール",
    tag: "窓",
    caption: "窓の位置で、見える景色が変わります。",
  },
  {
    src: "/images/design/example-storage.webp",
    alt: "大空間収納",
    tag: "収納",
    caption: "家族の服が、すべて収まります。",
  },
  {
    src: "/images/design/example-balcony.webp",
    alt: "2階バルコニー",
    tag: "間取り",
    caption: "2階に、もうひと部屋つくれます。",
  },
  {
    src: "/images/newsozai/interior-ldk-01.webp",
    alt: "LDK",
    tag: "LDK",
    caption: "LDKは、家族が集まる場所です。",
  },
  {
    src: "/images/newsozai/exterior-texture-detail-01.webp",
    alt: "素材のディテール",
    tag: "素材",
    caption: "素材は、手触りで決められます。",
  },
] as const;

const STEPS = [
  { num: "01", text: "土地の条件を、整理します。" },
  { num: "02", text: "ご家族で、優先順位を決めます。" },
  { num: "03", text: "実物で、確かめていただきます。" },
  { num: "04", text: "暮らしのクセまで、図面に落とします。" },
] as const;

type Axis = (typeof AXES)[number];
type Gallery = (typeof GALLERIES)[number];

function AxisCard({ axis }: { axis: Axis }) {
  return (
    <article className="group relative flex flex-col bg-white border border-text-primary/10 p-6 md:p-7 min-h-[220px] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]">
      <div className="flex items-baseline gap-3 mb-5">
        <span
          className="font-oswald leading-none tabular-nums text-lime-deep"
          style={{
            fontWeight: 300,
            fontSize: "clamp(24px, 2.2vw, 34px)",
            letterSpacing: "-0.02em",
          }}
        >
          {axis.num}
        </span>
        <span className="flex-1 h-px bg-text-primary/15" />
      </div>

      <h3
        className="font-sans text-text-primary leading-[1.3] tracking-[0.02em]"
        style={{
          fontWeight: 900,
          fontSize: "clamp(22px, 2.2vw, 32px)",
        }}
      >
        {axis.title}
      </h3>

      <p
        className="font-inter mt-4 text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-bold text-lime-deep"
      >
        {axis.degree}
      </p>

      <p className="font-sans mt-auto pt-4 text-text-primary/80 text-[clamp(12px,0.95vw,14px)] leading-[1.95]">
        {axis.body}
      </p>
    </article>
  );
}

function GalleryCard({ gallery }: { gallery: Gallery }) {
  return (
    <article className="group relative overflow-hidden bg-white border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
        <Image
          src={gallery.src}
          alt={gallery.alt}
          fill
          className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
      <div className="p-5 md:p-6">
        <p className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-lime-deep font-bold mb-2">
          {gallery.tag}
        </p>
        <p
          className="font-sans text-text-primary leading-[1.5]"
          style={{
            fontWeight: 700,
            fontSize: "clamp(14px, 1.05vw, 16px)",
          }}
        >
          {gallery.caption}
        </p>
      </div>
    </article>
  );
}

export default function FreedomOfDesign() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="design"
      ref={ref}
      className="relative overflow-hidden bg-white text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ========== Heading ========== */}
        <header className="mb-12 md:mb-16 max-w-[860px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "var(--display-lg)" }}
          >
            間取りも設備も、自由に決められます。
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-secondary text-[clamp(14px,1.05vw,16px)] leading-[1.95] max-w-[620px]">
            できる・できないを、先にお伝えします。
            <br />
            条件を並べてから、設計は、ちゃんと自由になります。
          </p>
        </header>

        {/* ========== 4 軸カード ========== */}
        <div className="mb-16 md:mb-24">
          <h3
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em] mb-8 md:mb-10"
            style={{ fontSize: "var(--display-md)" }}
          >
            自由になるのは、4 つの要素。
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {AXES.map((axis) => (
              <AxisCard key={axis.num} axis={axis} />
            ))}
          </div>
        </div>

        {/* ========== 6 ギャラリー ========== */}
        <div className="mb-16 md:mb-24">
          <h3
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em] mb-8 md:mb-10"
            style={{ fontSize: "var(--display-md)" }}
          >
            こだわりは、ここまで実現できます。
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {GALLERIES.map((g) => (
              <GalleryCard key={g.src} gallery={g} />
            ))}
          </div>
        </div>

        {/* ========== 4 ステップ ========== */}
        <div className="mb-14 md:mb-20">
          <h3
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em] mb-8 md:mb-10"
            style={{ fontSize: "var(--display-md)" }}
          >
            4 回の打合せで、図面が固まります。
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 md:gap-x-8">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="flex items-baseline gap-3 py-4 border-t border-text-primary/15"
              >
                <span
                  className="font-oswald text-lime-deep leading-none shrink-0 tabular-nums"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(20px, 1.6vw, 26px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.num}
                </span>
                <p
                  className="font-sans text-text-primary leading-[1.6]"
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(13px, 1vw, 15px)",
                  }}
                >
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ========== 注記 + CTA ========== */}
        <div className="mt-12 md:mt-16 flex flex-col gap-8 pt-10 border-t border-text-primary/15 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-12">
          <p className="font-sans max-w-[44rem] text-[11px] md:text-[12px] leading-[1.95] text-text-secondary">
            ※ 仕様やメーカーは、プランや敷地条件により変わります。
            <br />
            詳細は来場時に一覧でご案内します。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end shrink-0">
            <CtaButton
              href="/lots"
              variant="secondary"
              size="md"
              label="土地も一緒に探す"
              sublabel="候補地から設計できます"
            />
            <CtaButton
              href="/reserve"
              variant="primary"
              size="md"
              label="設計の相談を予約"
              sublabel="初回のご相談は無料です"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
