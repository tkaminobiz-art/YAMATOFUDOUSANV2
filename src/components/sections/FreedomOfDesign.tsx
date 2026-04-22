"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  FreedomOfDesign — 2026-04-21 再リニューアル v2
  -----------------------------------------------------------------
  v1(40点評価): プロセス語り(4 STEPS 大判)に偏って"自由"の結果が見えない
                + 暗写真4枚で前セクションのダーク連続を助長

  v2: 「プロセス語り → 結果見せ」へ方向転換
  1. ヘッダー(非対称) — 継承
  2. 自由度マップ(4軸: 窓/収納/光/素材) — テキストBento新設
  3. 実例ギャラリー(6枚写真Bento 3×2) — 明るい写真で自由の幅を可視化
  4. STEPS 圧縮(4行テキスト) — プロセスは簡素に添える
  5. 注記 + CTA — 継承

  VP-6 コピー適用:
  - 軸の caption は体言止め / 1文40字以内
  - 実例の caption はミニマル宣言文
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
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/newsozai/interior-window-detail-01.webp",
    alt: "窓のディテール",
    tag: "窓",
    caption: "窓の位置で、見える景色が変わります。",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/design/example-storage.webp",
    alt: "大空間収納",
    tag: "収納",
    caption: "家族の服が、すべて収まります。",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/design/example-balcony.webp",
    alt: "2階バルコニー",
    tag: "間取り",
    caption: "2階に、もうひと部屋つくれます。",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/newsozai/interior-ldk-01.webp",
    alt: "LDK",
    tag: "LDK",
    caption: "LDKは、家族が集まる場所です。",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/images/newsozai/exterior-texture-detail-01.webp",
    alt: "素材のディテール",
    tag: "素材",
    caption: "素材は、手触りで決められます。",
    aspect: "aspect-[4/3]",
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
    <article className="group relative flex flex-col bg-white border border-text-primary/10 p-6 md:p-7 min-h-[220px] md:min-h-[240px] transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]">
      <div className="flex items-baseline gap-3 mb-5">
        <span
          className="font-oswald text-text-primary/25 leading-none tabular-nums"
          style={{
            fontWeight: 300,
            fontSize: "clamp(32px, 3.2vw, 48px)",
            letterSpacing: "-0.02em",
          }}
        >
          {axis.num}
        </span>
        <span className="flex-1 h-px bg-text-primary/15" />
      </div>

      <h3
        className="font-shippori text-text-primary leading-[1.15] tracking-[-0.01em]"
        style={{
          fontWeight: 900,
          fontSize: "clamp(28px, 3vw, 44px)",
        }}
      >
        {axis.title}
      </h3>

      <p
        className="font-inter mt-4 md:mt-5 text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-bold"
        style={{ color: "#A2C523" }}
      >
        {axis.degree}
      </p>

      <p className="font-shippori mt-auto pt-4 text-text-primary/80 text-[clamp(13px,1vw,15px)] leading-[1.85]">
        {axis.body}
      </p>
    </article>
  );
}

function GalleryCard({ gallery }: { gallery: Gallery }) {
  return (
    <article className="group relative overflow-hidden bg-white border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]">
      <div className={`relative ${gallery.aspect} overflow-hidden bg-text-primary/5`}>
        <Image
          src={gallery.src}
          alt={gallery.alt}
          fill
          className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>
      <div className="p-5 md:p-6">
        <p className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold mb-2">
          {gallery.tag}
        </p>
        <p
          className="font-shippori text-text-primary leading-[1.35]"
          style={{
            fontWeight: 700,
            fontSize: "clamp(15px, 1.1vw, 17px)",
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
      className="relative overflow-hidden bg-[#FAF8F3] text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ================= HEADER (非対称) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end mb-16 md:mb-24">
          <div>
            <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
              Freedom of Design
            </p>
            <h2
              className="font-shippori text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                fontSize: "clamp(44px, 8vw, 120px)",
              }}
            >
              間取りも設備も、
              <br />
              自由に決められます。
            </h2>
          </div>
          <aside className="lg:pt-4">
            <div className="border-t-[3px] border-text-primary pt-6">
              <p className="font-shippori font-bold text-[clamp(22px,2.2vw,32px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                できる・できないを、<br />先にお伝えします。
              </p>
              <p className="mt-5 md:mt-6 font-shippori font-medium text-[clamp(17px,1.5vw,22px)] leading-[1.8] max-w-[480px] text-text-primary/90">
                条件を並べてから、
                <br />
                設計は、ちゃんと自由になります。
              </p>
            </div>
          </aside>
        </div>

        {/* ================= 自由度マップ(4軸) ================= */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-baseline gap-5">
            <span
              className="font-oswald text-text-primary/80 leading-none"
              style={{
                fontWeight: 300,
                fontSize: "clamp(28px, 3vw, 44px)",
                letterSpacing: "-0.02em",
              }}
            >
              01
            </span>
            <span className="flex-1 h-px bg-text-primary/15" />
            <span
              className="font-shippori text-text-primary text-base md:text-lg tracking-[0.04em]"
              style={{ fontWeight: 500 }}
            >
              自由になるのは、4つの要素です。
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-16 md:mb-24">
          {AXES.map((axis) => (
            <AxisCard key={axis.num} axis={axis} />
          ))}
        </div>

        {/* ================= 実例ギャラリー ================= */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-baseline gap-5">
            <span
              className="font-oswald text-text-primary/80 leading-none"
              style={{
                fontWeight: 300,
                fontSize: "clamp(28px, 3vw, 44px)",
                letterSpacing: "-0.02em",
              }}
            >
              02
            </span>
            <span className="flex-1 h-px bg-text-primary/15" />
            <span
              className="font-shippori text-text-primary text-base md:text-lg tracking-[0.04em]"
              style={{ fontWeight: 500 }}
            >
              こだわりは、ここまで実現できます。
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16 md:mb-24">
          {GALLERIES.map((g) => (
            <GalleryCard key={g.src} gallery={g} />
          ))}
        </div>

        {/* ================= STEPS 圧縮(4行テキスト) ================= */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-baseline gap-5 mb-8 md:mb-10">
            <span
              className="font-oswald text-text-primary/80 leading-none"
              style={{
                fontWeight: 300,
                fontSize: "clamp(28px, 3vw, 44px)",
                letterSpacing: "-0.02em",
              }}
            >
              03
            </span>
            <span className="flex-1 h-px bg-text-primary/15" />
            <span
              className="font-shippori text-text-primary text-base md:text-lg tracking-[0.04em]"
              style={{ fontWeight: 500 }}
            >
              4回の打合せで、図面が固まります。
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 md:gap-x-8">
            {STEPS.map((s) => (
              <div
                key={s.num}
                className="flex items-baseline gap-3 py-3 border-t border-text-primary/15"
              >
                <span
                  className="font-oswald text-text-primary/35 leading-none shrink-0 tabular-nums"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(20px, 1.6vw, 24px)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.num}
                </span>
                <p
                  className="font-shippori text-text-primary leading-[1.5]"
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(14px, 1.05vw, 16px)",
                  }}
                >
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 注記 + CTA ================= */}
        <div className="mt-14 md:mt-20 flex flex-col gap-8 pt-10 border-t border-text-primary/15 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-12">
          <p className="font-shippori max-w-[44rem] text-[11px] md:text-[12px] leading-[1.95] text-text-secondary">
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
