"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import { getVoice } from "@/data/voices";

/*
  VoiceSection — 2026-04-24 v3 (案A shukobuild型 カタログ)
  ---------------------------------------------------------------
  v2 で残っていた:
  - Shippori Mincho (明朝) 見出し/引用/ヘッドライン
  - "Voice" 英字kicker
  - 非対称 1.4fr:1fr ヘッダー + border-t-[3px] LEAD
  - editorial filter(sepia 0.04) の写真
  - 巨大 50 数字(All Voices カード 180px)
  を撤去。Featured + 3カード(Other 2 + AllVoices)の並列は維持。

  v3: 一言 heading + Featured 見開き + 3カード並列
*/

const FEATURED = {
  id: "216803",
  headline: "諦めかけた頃に、やまとに出会いました。",
  quote:
    "土地探しや、工務店選びでなかなか良い所がなく、一度諦めようと思っていた時に、何気なくネットで見つけた。",
  photoIndex: 0,
  model: "京モデル",
} as const;

const OTHERS = [
  {
    id: "279070",
    headline: "他社の標準と、何かが違いました。",
    quote:
      "他社様の標準仕様はグレードが低いものが多く、やまとさんは、標準仕様が元々すごく良かったのが決め手。",
    photoIndex: 0,
    model: "花モデル",
  },
  {
    id: "237085",
    headline: "希望以上の家に、なりました。",
    quote:
      "とにかく標準設備がハイグレード！ ほとんど追加料金がかかることもなく、希望以上の設備を設置していただけました。",
    photoIndex: 0,
    model: "風モデル",
  },
] as const;

function FeaturedVoiceCard() {
  const voice = getVoice(FEATURED.id);
  if (!voice) return null;
  const photo = voice.photos[FEATURED.photoIndex] ?? voice.photos[0];

  return (
    <Link
      href={`/voice/${voice.id}`}
      className="scroll-in group relative grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-white border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_32px_64px_-28px_rgba(0,0,0,0.14)] md:min-h-[440px]"
    >
      {/* 写真 */}
      <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden bg-bg-secondary">
        {photo ? (
          <Image
            src={photo}
            alt={voice.title}
            fill
            className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-secondary text-xs">
            写真なし
          </div>
        )}
      </div>

      {/* 引用 */}
      <div className="relative flex flex-col p-8 md:p-10 lg:p-12">
        {/* メタ */}
        <div className="flex items-center gap-4 mb-7 md:mb-9">
          <span
            className="font-oswald text-lime-deep leading-none tabular-nums"
            style={{
              fontWeight: 300,
              fontSize: "clamp(22px, 1.9vw, 30px)",
              letterSpacing: "-0.02em",
            }}
          >
            01
          </span>
          <span className="flex-1 h-px bg-text-primary/15" />
          <span className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold">
            {voice.area} · {FEATURED.model}
          </span>
        </div>

        {/* ヘッドライン + 引用 */}
        <div className="flex-1">
          <h3
            className="font-sans text-text-primary leading-[1.35] tracking-[0.01em]"
            style={{
              fontWeight: 900,
              fontSize: "clamp(20px, 2.2vw, 30px)",
            }}
          >
            {FEATURED.headline}
          </h3>

          <blockquote className="font-sans mt-5 md:mt-6 text-text-primary/80 text-[clamp(13px,1.05vw,15px)] leading-[2.0] max-w-[36em]">
            「{FEATURED.quote}」
          </blockquote>
        </div>

        {/* 誘導 */}
        <div className="mt-8 md:mt-10 pt-5 border-t border-text-primary/15">
          <span className="font-inter text-[11px] md:text-[12px] tracking-[0.24em] uppercase text-text-primary font-bold group-hover:text-lime-deep transition-colors">
            詳しく読む →
          </span>
        </div>
      </div>
    </Link>
  );
}

function OtherVoiceCard({
  config,
  index,
}: {
  config: (typeof OTHERS)[number];
  index: number;
}) {
  const voice = getVoice(config.id);
  if (!voice) return null;
  const photo = voice.photos[config.photoIndex] ?? voice.photos[0];

  return (
    <Link
      href={`/voice/${voice.id}`}
      className="scroll-in group relative flex flex-col overflow-hidden bg-white border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]"
    >
      {/* 写真 */}
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-secondary">
        {photo ? (
          <Image
            src={photo}
            alt={voice.title}
            fill
            className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : null}
      </div>

      {/* テキスト */}
      <div className="flex flex-col p-5 md:p-6">
        {/* 番号 + 地域タグ */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="font-oswald text-lime-deep leading-none tabular-nums"
            style={{
              fontWeight: 300,
              fontSize: "clamp(16px, 1.3vw, 20px)",
              letterSpacing: "-0.02em",
            }}
          >
            {String(index + 2).padStart(2, "0")}
          </span>
          <span className="flex-1 h-px bg-text-primary/15" />
          <span className="font-inter text-[9px] md:text-[10px] tracking-[0.22em] uppercase text-text-secondary font-bold">
            {voice.area} · {config.model}
          </span>
        </div>

        {/* ヘッドライン */}
        <h3
          className="font-sans text-text-primary leading-[1.45] tracking-[0.01em]"
          style={{
            fontWeight: 700,
            fontSize: "clamp(15px, 1.15vw, 18px)",
          }}
        >
          {config.headline}
        </h3>

        {/* 引用抜粋 */}
        <blockquote className="font-sans mt-3 text-text-primary/70 text-[clamp(12px,0.95vw,14px)] leading-[1.9] line-clamp-3">
          「{config.quote}」
        </blockquote>
      </div>
    </Link>
  );
}

function AllVoicesCard() {
  return (
    <Link
      href="/voice"
      className="scroll-in group relative flex flex-col overflow-hidden bg-[#A2C523] border border-[#2E4600]/15 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#2E4600]/45 hover:shadow-[0_24px_48px_-24px_rgba(46,70,0,0.3)]"
    >
      <div className="flex flex-col justify-between h-full p-5 md:p-6 min-h-[360px] md:min-h-[400px]">
        {/* 上段 */}
        <div className="flex items-center gap-3">
          <span className="flex-1 h-px bg-[#2E4600]/25" />
          <span
            className="font-inter text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-bold"
            style={{ color: "#2E4600" }}
          >
            All voices
          </span>
        </div>

        {/* 中段: 50 */}
        <div className="flex items-baseline gap-2">
          <span
            className="font-oswald leading-[0.8] tabular-nums"
            style={{
              fontWeight: 300,
              fontSize: "clamp(72px, 8vw, 120px)",
              letterSpacing: "-0.03em",
              color: "#2E4600",
            }}
          >
            50
          </span>
          <span
            className="font-sans pb-2 md:pb-3"
            style={{
              fontWeight: 700,
              fontSize: "clamp(14px, 1.1vw, 18px)",
              color: "#2E4600",
            }}
          >
            voices
          </span>
        </div>

        {/* 下段 */}
        <div>
          <h3
            className="font-sans leading-[1.45] tracking-[0.01em]"
            style={{
              fontWeight: 900,
              fontSize: "clamp(16px, 1.3vw, 20px)",
              color: "#2E4600",
            }}
          >
            50組すべての声が、別ページにあります。
          </h3>
          <p
            className="font-sans mt-3 text-[clamp(12px,0.95vw,14px)] leading-[1.85]"
            style={{ color: "rgba(46,70,0,0.85)" }}
          >
            装飾も、誇張も、ありません。奈良・京都の50組の声を、別ページにまとめています。
          </p>
          <p
            className="font-inter mt-5 text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-bold group-hover:translate-x-1 transition-transform"
            style={{ color: "#2E4600" }}
          >
            すべて読む →
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function VoiceSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="voice"
      ref={sectionRef}
      className="bg-white text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ========== Heading ========== */}
        <header className="mb-12 md:mb-16 max-w-[860px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "var(--display-lg)" }}
          >
            50組の家族が、本音で答えています。
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-secondary text-[clamp(14px,1.05vw,16px)] leading-[1.95] max-w-[620px]">
            装飾も、誇張も、ありません。
            <br className="hidden md:inline" />
            奈良・京都から、50組の本音が届きました。
          </p>
        </header>

        {/* ========== Featured 見開き ========== */}
        <div className="mb-4 md:mb-5">
          <FeaturedVoiceCard />
        </div>

        {/* ========== Other 2件 + All Voices カード ========== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {OTHERS.map((config, i) => (
            <OtherVoiceCard key={config.id} config={config} index={i} />
          ))}
          <AllVoicesCard />
        </div>

        {/* ========== 注記 ========== */}
        <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-text-primary/15">
          <p className="font-sans max-w-[44rem] text-[11px] md:text-[12px] leading-[1.95] text-text-secondary">
            ※ 掲載の声は、実際にやまとで家を建てた方のアンケート原文を、プライバシー配慮の範囲で掲載しています。
            <br />
            ※ 50組の声の全文は、別ページ「Voice」に。
          </p>
        </div>
      </div>
    </section>
  );
}
