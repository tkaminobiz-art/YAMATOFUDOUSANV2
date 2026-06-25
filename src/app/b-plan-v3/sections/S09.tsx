import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import { paymentCases, featuredVoiceProofs } from "../_data";

/**
 * S09 — 物語事例（Before→葛藤→決め手→After・新設・物語化）
 *
 * 役割: tension付き事例。surface=ivory（白・物語）。心の段=④余韻。信頼の実名性。
 * - 1〜2組を物語として深く（数より質＝専務⑧）。顔と名前・市名・家族構成・プラン付き。
 * - 声は編集しない（専務⑦・原文尊重）= _data の concern/headline/quote を verbatim 表示。
 * - 「声」の巨大組みはゴシック（t-display / t-h2、明朝NG）＋実写真。声面=deep-green。
 * - M12 写真マーキー（純CSS・PC36s/SP44s・hover/focus停止・reduced-motion静止）。
 * - CTA なし。末にGBP口コミ動線（達成まで凍結＝枠だけ）・OB紹介 控えめ入口・/voice /works。
 *
 * props 無しのサーバーコンポーネント（マーキーは純CSSで client 不要）。
 */

// 物語化する2組（数より質）。Before→葛藤→決め手→After。
// 写真は実写真allowlist（public/images/works/）。AI完成予想図は使わない。
const storyCases = [
  {
    pc: paymentCases[0],
    region: "奈良市",
    name: "A さま",
    struggle:
      "土地から探すと総額が読めず、展示場をいくつ回っても「結局いくらになるのか」がわからないままでした。",
    trigger:
      "土地・建物・諸費用を一枚の表にして、月々の支払いまで一緒に並べてくれたこと。",
    photo: "/images/works/case1-living.webp",
    photoAlt: "やまと不動産で建てた奈良市A様邸のリビング",
  },
  {
    pc: paymentCases[1],
    region: "橿原市",
    name: "B さま",
    struggle:
      "家族4人だと広さを削るしかないと思い込んでいて、希望を口に出すのもためらっていました。",
    trigger:
      "総額を見ながら、残したい希望と調整する部分をひとつずつ一緒に決められたこと。",
    photo: "/images/works/case2-living.webp",
    photoAlt: "やまと不動産で建てた橿原市B様邸のリビング",
  },
];

// M12 写真マーキー用（実写真allowlist・works-parts）。2方向で単調回避。
const marqueeRowA = [
  { src: "/images/works-parts/living/living-01.webp", alt: "施工事例 LDK" },
  { src: "/images/works-parts/exterior/exterior-02.webp", alt: "施工事例 外観" },
  { src: "/images/works-parts/kitchen/kitchen-03.webp", alt: "施工事例 キッチン" },
  { src: "/images/works-parts/entrance/entrance-01.webp", alt: "施工事例 玄関" },
  { src: "/images/works-parts/living/living-04.webp", alt: "施工事例 LDK" },
  { src: "/images/works-parts/exterior/exterior-04.webp", alt: "施工事例 外観" },
];
const marqueeRowB = [
  { src: "/images/works-parts/kitchen/kitchen-01.webp", alt: "施工事例 キッチン" },
  { src: "/images/works-parts/exterior/exterior-01.webp", alt: "施工事例 外観" },
  { src: "/images/works-parts/living/living-03.webp", alt: "施工事例 LDK" },
  { src: "/images/works-parts/entrance/entrance-03.webp", alt: "施工事例 玄関" },
  { src: "/images/works-parts/kitchen/kitchen-04.webp", alt: "施工事例 キッチン" },
  { src: "/images/works-parts/exterior/exterior-03.webp", alt: "施工事例 外観" },
];

function MarqueeRow({
  items,
  dir,
}: {
  items: { src: string; alt: string }[];
  dir: "left" | "right";
}) {
  // 3セット複製で CLS=0・無限ループ。translateX は keyframes 側で -33.333%。
  const tripled = [...items, ...items, ...items];
  return (
    <div className="s09-marquee-viewport group" tabIndex={0} aria-label="施工事例の写真">
      <div className={`s09-marquee-track s09-marquee-${dir}`}>
        {tripled.map((it, i) => (
          <div key={`${dir}-${i}`} className="s09-marquee-cell">
            <Image
              src={it.src}
              alt={i < items.length ? it.alt : ""}
              aria-hidden={i >= items.length}
              fill
              sizes="(min-width: 768px) 320px, 60vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function StoryCase({
  story,
  index,
}: {
  story: (typeof storyCases)[number];
  index: number;
}) {
  const { pc } = story;
  const flip = index % 2 === 1;
  return (
    <article className="grid items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
      {/* 実写真（顔の代わりに暮らしの実像）。flip で左右交互。 */}
      <div className={`relative ${flip ? "md:order-2" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[4px] bg-cream">
          <Image
            src={story.photo}
            alt={story.photoAlt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <p className="t-eyebrow mt-4 text-main">{pc.no}</p>
      </div>

      {/* 物語本文：Before→葛藤→決め手→After */}
      <div className={flip ? "md:order-1" : ""}>
        {/* 顔と名前（信頼アンカー）：市名・家族構成・プラン */}
        <p className="t-h3 text-ink">
          {story.region}・{story.name}
        </p>
        <p className="t-body mt-2 text-ink-muted">
          {pc.family}／{pc.income}／{pc.plan}
        </p>

        {/* 声の巨大組み（ゴシック・明朝NG）＝原文の不安をそのまま引用 */}
        <div className="mt-7">
          <Quote className="h-7 w-7 text-main/40" aria-hidden="true" />
          <blockquote className="t-h2 mt-3 text-ink">
            {pc.headline}
          </blockquote>
        </div>

        {/* Before / 葛藤 / 決め手 — ラベル＋原文。声は編集しない。 */}
        <dl className="mt-8 space-y-5 border-l border-[color:var(--color-border)] pl-5">
          <div>
            <dt className="t-eyebrow text-ink-muted">Before</dt>
            <dd className="t-body mt-1 text-ink">{pc.concern}</dd>
          </div>
          <div>
            <dt className="t-eyebrow text-ink-muted">葛藤</dt>
            <dd className="t-body mt-1 text-ink">{story.struggle}</dd>
          </div>
          <div>
            <dt className="t-eyebrow text-main">決め手</dt>
            <dd className="t-body mt-1 text-ink">{story.trigger}</dd>
          </div>
        </dl>

        {/* After ＝ 総額・月々（事実核） */}
        <div className="mt-7 flex flex-wrap items-end gap-x-8 gap-y-2 border-t border-[color:var(--color-border)] pt-5">
          <p>
            <span className="t-eyebrow block text-ink-muted">総額</span>
            <span className="t-h3 text-ink">
              {pc.total}
              <span className="t-body ml-1 text-ink-muted">万円</span>
            </span>
          </p>
          <p>
            <span className="t-eyebrow block text-ink-muted">月々</span>
            <span className="t-h3 text-ink">
              {pc.monthly}
              <span className="t-body ml-1 text-ink-muted">円</span>
            </span>
          </p>
        </div>
      </div>
    </article>
  );
}

export default function S09() {
  return (
    <SectionShell id="voice" surface="ivory" aria-label="お客様の声">
      {/* 純CSS マーキー（依存削減・60fps）。speed PC36s/SP44s 一意確定。
          hover/focus-within 停止・reduced-motion 静止＋手動横スクロール。 */}
      <style>{`
        .s09-marquee-viewport {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
        }
        .s09-marquee-track {
          display: flex;
          gap: 16px;
          width: max-content;
          will-change: transform;
        }
        .s09-marquee-cell {
          position: relative;
          flex: 0 0 auto;
          width: 60vw;
          max-width: 320px;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: 4px;
          background: var(--color-cream);
        }
        @keyframes s09-scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
        @keyframes s09-scroll-right {
          from { transform: translateX(-33.333%); }
          to { transform: translateX(0); }
        }
        .s09-marquee-left { animation: s09-scroll-left 44s linear infinite; }
        .s09-marquee-right { animation: s09-scroll-right 44s linear infinite; }
        @media (min-width: 768px) {
          .s09-marquee-left { animation-duration: 36s; }
          .s09-marquee-right { animation-duration: 36s; }
        }
        .s09-marquee-viewport:hover .s09-marquee-track,
        .s09-marquee-viewport:focus-within .s09-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .s09-marquee-viewport { overflow-x: auto; }
          .s09-marquee-track { animation: none; }
        }
      `}</style>

      <header className="max-w-3xl">
        <Eyebrow>Voice</Eyebrow>
        <h2 className="t-h2 text-ink">お客様の声</h2>
        <p className="t-body mt-5 text-ink-muted">
          数ではなく、一組ずつの道のりを。最初の不安から、決め手、住んでからの今まで。
          いただいた言葉は、そのまま載せています。
        </p>
      </header>

      {/* 2組を深く物語化 */}
      <div className="mt-14 space-y-16 md:mt-20 md:space-y-24">
        {storyCases.map((story, i) => (
          <StoryCase key={story.pc.no} story={story} index={i} />
        ))}
      </div>

      {/* 声面＝deep-green。原文の声（featuredVoiceProofs）を編集せず並べる。 */}
      <div className="mt-16 rounded-[6px] bg-main px-6 py-12 text-cream md:mt-24 md:px-12 md:py-16">
        <p className="t-eyebrow text-cream/70">In their words</p>
        <p className="t-h3 mt-3 text-cream">届いた言葉から、いくつか。</p>
        <ul className="mt-9 grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredVoiceProofs.map((v, i) => {
            const Icon = v.Icon;
            return (
              <li key={i} className="flex gap-4">
                <Icon
                  className="mt-1 h-5 w-5 shrink-0 text-lime"
                  aria-hidden="true"
                />
                <div>
                  <p className="t-eyebrow text-cream/60">{v.label}</p>
                  <p className="t-body mt-1 text-cream">{v.quote}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* M12 写真マーキー（2方向・実写真） */}
      <div className="mt-14 space-y-4 md:mt-20">
        <MarqueeRow items={marqueeRowA} dir="left" />
        <MarqueeRow items={marqueeRowB} dir="right" />
      </div>

      {/* 下層動線：施工事例 /works・お客様の声 /voice。GBP/OB は控えめ入口。 */}
      <div className="mt-12 flex flex-col gap-6 border-t border-[color:var(--color-border)] pt-8 md:flex-row md:items-center md:justify-between md:gap-10">
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link
            href="/voice"
            className="t-body inline-flex min-h-11 items-center gap-2 text-main underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
          >
            お客様の声をもっと見る
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/works"
            className="t-body inline-flex min-h-11 items-center gap-2 text-main underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
          >
            施工事例を見る
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* GBP口コミ動線：★4.5×30件達成までTOP公開を凍結＝枠だけ用意。
            達成後に lime バッジで解放（評価は未公開）。OB紹介は控えめ入口。 */}
        <div className="flex flex-col gap-2 text-ink-muted md:items-end md:text-right">
          <p className="t-body">
            Googleの口コミは、ただいま準備中です。
          </p>
          <p className="t-body">
            建てたお客様からのご紹介も、静かに続いています。
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
