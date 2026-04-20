"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import { getVoice } from "@/data/voices";

/*
  VoiceSection — 2026-04-20 teaser 化
  -------------------------------------
  以前の「4章×4件 + 50件壁」構成は /voice ページに移譲。
  トップページでは「諦めかけ層に最も刺さる声 3件」だけを掲載し、
  詳細は /voice の50件一覧へ誘導する。

  選定基準(audit のターゲット読者):
  - 他社見積もりで諦めかけ → 諦めかけていた声
  - 他社比較→標準が決め手 → 標準仕様への言及
  - 期待以上の結果 → 満足度の高い声
*/

const FEATURED_VOICE_IDS = [
  {
    id: "216803",
    headline: "諦めかけていた、その時に。",
    quote:
      "土地探しや、工務店選びでなかなか良い所がなく、一度諦めようと思っていた時に、何気なくネットで見つけた。",
    photoIndex: 0,
  },
  {
    id: "279070",
    headline: "他社の標準と、何かが違った。",
    quote:
      "他社様の標準仕様はグレードが低いものが多く、やまとさんは、標準仕様が元々すごく良かったのが決め手。",
    photoIndex: 0,
  },
  {
    id: "237085",
    headline: "希望以上の家になった。",
    quote:
      "とにかく標準設備がハイグレード！　ほとんど追加料金がかかることもなく、希望以上の設備を設置していただけました。",
    photoIndex: 0,
  },
] as const;

const PHOTO_FILTER = "grayscale(0.35) saturate(1.05) contrast(1.04)";

function FeaturedVoiceCard({
  config,
}: {
  config: (typeof FEATURED_VOICE_IDS)[number];
}) {
  const voice = getVoice(config.id);
  if (!voice) return null;
  const photo = voice.photos[config.photoIndex] ?? voice.photos[0];

  return (
    <Link
      href={`/voice/${voice.id}`}
      className="scroll-in group block"
    >
      {/* 写真 */}
      <div className="relative aspect-[4/5] overflow-hidden rounded bg-bg-secondary mb-5">
        {photo ? (
          <Image
            src={photo}
            alt={voice.title}
            fill
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            style={{ filter: PHOTO_FILTER }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-secondary text-xs">
            写真なし
          </div>
        )}
        <div className="absolute top-3 left-3 bg-bg-primary/95 backdrop-blur-sm rounded px-2.5 py-1">
          <span className="text-main text-[10px] font-medium tracking-wider">
            {voice.area}
          </span>
        </div>
      </div>

      {/* 章タイトル */}
      <h3
        className="text-text-primary text-lg md:text-xl font-light leading-snug mb-3 group-hover:text-main transition-colors"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {config.headline}
      </h3>

      {/* 引用 */}
      <blockquote
        className="text-text-secondary text-[14px] md:text-[15px] leading-[1.85] mb-4"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        「{config.quote}」
      </blockquote>

      {/* メタ */}
      <p className="text-text-secondary text-[11px] tracking-[0.05em]">
        {voice.title}
      </p>
    </Link>
  );
}

export default function VoiceSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="voice"
      className="bg-bg-primary py-[var(--section-py)]"
      ref={sectionRef}
    >
      {/* === ヘッダー === */}
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)] mb-12 md:mb-16">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[640px] scroll-in">
            <p className="font-section-label mb-4 text-xs tracking-[0.15em] text-main md:text-sm">
              VOICE
            </p>
            <h2
              className="mb-6 text-[clamp(28px,4vw,52px)] font-light leading-[1.35] text-text-primary"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              50通りの、本当の答え。
            </h2>
            <p className="text-[clamp(15px,1.1vw,17px)] leading-[1.95] text-text-secondary">
              花鳥風月で家を建てた50組のご家族の、そのままの言葉。装飾も、誇張もありません。ここでは、代表的な3組の声を載せています。
            </p>
          </div>
          <div
            className="scroll-in text-right"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <span className="block text-7xl font-extralight leading-none text-accent md:text-8xl">
              50
            </span>
            <span className="text-xs tracking-wider text-text-secondary md:text-sm">
              組のご家族
            </span>
          </div>
        </div>
      </div>

      {/* === 3件の代表声 === */}
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {FEATURED_VOICE_IDS.map((config) => (
            <FeaturedVoiceCard key={config.id} config={config} />
          ))}
        </div>
      </div>

      {/* === CTA: /voice へ === */}
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)] mt-14 md:mt-20 text-center">
        <p className="text-text-secondary text-sm md:text-base leading-[1.9] mb-6 max-w-[520px] mx-auto">
          ご家族それぞれの言葉を、別ページに50組分まとめました。
        </p>
        <Link
          href="/voice"
          className="group relative inline-flex items-center gap-3 min-h-[48px] px-7 py-3 text-sm md:text-base font-medium border border-text-primary text-text-primary rounded transition-colors duration-[400ms] hover:text-white overflow-hidden"
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-text-primary transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
          />
          <span className="relative">50組のすべての声を読む</span>
          <span
            aria-hidden
            className="relative transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
