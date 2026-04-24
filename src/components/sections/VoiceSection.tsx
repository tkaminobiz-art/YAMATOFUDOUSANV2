"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import { getVoice } from "@/data/voices";

/*
  VoiceSection — 2026-04-21 全面リニューアル v2
  -----------------------------------------------------------------
  設計議論(デザイナー複数視点 + VP-6):
  - マガジン派: 大引用+マージンノート
  - Apple/VP-6派: 削り切り+体言止め+余白
  - プロダクト派: "自分と似た人"を見つけやすいタグ(地域/モデル)
  - NYT派: 写真+引用の見開き

  構造:
  1. ヘッダー(非対称 + 50大数字)
  2. Featured Bento 見開き(写真左 + 大引用右): "諦めかけ層"直撃
  3. 3列カード(Other 2件 + 50件誘導カード)
  4. 締め

  詳細:
  - 引用符「『 』」を Shippori Black 超大 + LIME で装飾主役化
  - メタ: 地域 / モデル のプロダクトタグ
  - 写真に editorial filter(sepia 0.04)で印刷感
  - Bento 不均等: Featured 大 + Other 2 小 の 3列レイアウト
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

const PHOTO_FILTER = "saturate(0.92) contrast(1.02) sepia(0.04)";

function FeaturedVoiceCard() {
  const voice = getVoice(FEATURED.id);
  if (!voice) return null;
  const photo = voice.photos[FEATURED.photoIndex] ?? voice.photos[0];

  return (
    <Link
      href={`/voice/${voice.id}`}
      className="scroll-in group relative grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-white border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_32px_64px_-28px_rgba(0,0,0,0.14)] md:min-h-[520px]"
    >
      {/* 写真 */}
      <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden bg-text-primary/5">
        {photo ? (
          <Image
            src={photo}
            alt={voice.title}
            fill
            className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ filter: PHOTO_FILTER }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-secondary text-xs">
            写真なし
          </div>
        )}
      </div>

      {/* 引用 */}
      <div className="relative flex flex-col p-8 md:p-10 lg:p-14">
        {/* Voice番号 + 地域タグ */}
        <div className="flex items-center gap-4 mb-8 md:mb-10">
          <span
            className="font-oswald text-text-primary/30 leading-none tabular-nums"
            style={{
              fontWeight: 300,
              fontSize: "clamp(28px, 2.6vw, 40px)",
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
            className="font-shippori text-text-primary leading-[1.25] tracking-[-0.01em]"
            style={{
              fontWeight: 900,
              fontSize: "clamp(28px, 3.2vw, 48px)",
            }}
          >
            {FEATURED.headline}
          </h3>

          <blockquote
            className="font-shippori mt-6 md:mt-8 text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[2.0] max-w-[36em]"
          >
            「{FEATURED.quote}」
          </blockquote>
        </div>

        {/* 誘導 */}
        <div className="mt-10 md:mt-12 pt-6 border-t border-text-primary/15">
          <span className="font-inter text-[11px] md:text-[12px] tracking-[0.24em] uppercase text-text-primary font-bold group-hover:text-[#A2C523] transition-colors">
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
      <div className="relative aspect-[4/5] overflow-hidden bg-text-primary/5">
        {photo ? (
          <Image
            src={photo}
            alt={voice.title}
            fill
            className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
            style={{ filter: PHOTO_FILTER }}
          />
        ) : null}
      </div>

      {/* テキスト */}
      <div className="flex flex-col p-5 md:p-6">
        {/* 番号 + 地域タグ */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className="font-oswald text-text-primary/30 leading-none tabular-nums"
            style={{
              fontWeight: 300,
              fontSize: "clamp(18px, 1.5vw, 22px)",
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
          className="font-shippori text-text-primary leading-[1.3] tracking-[0.01em]"
          style={{
            fontWeight: 700,
            fontSize: "clamp(17px, 1.4vw, 22px)",
          }}
        >
          {config.headline}
        </h3>

        {/* 引用抜粋 */}
        <blockquote className="font-shippori mt-3 text-text-primary/70 text-[clamp(12px,0.95vw,14px)] leading-[1.9] line-clamp-3">
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
      <div className="flex flex-col justify-between h-full p-5 md:p-6 min-h-[420px] md:min-h-[480px]">
        {/* 上段: kicker */}
        <div className="flex items-center gap-3">
          <span className="flex-1 h-px bg-[#2E4600]/25" />
          <span
            className="font-inter text-[9px] md:text-[10px] tracking-[0.22em] uppercase font-bold"
            style={{ color: "#2E4600" }}
          >
            All voices
          </span>
        </div>

        {/* 中段: 巨大 50 */}
        <div className="flex items-baseline gap-2">
          <span
            className="font-oswald leading-[0.8] tabular-nums"
            style={{
              fontWeight: 300,
              fontSize: "clamp(96px, 12vw, 180px)",
              letterSpacing: "-0.03em",
              color: "#2E4600",
            }}
          >
            50
          </span>
          <span
            className="font-shippori pb-3 md:pb-4"
            style={{
              fontWeight: 500,
              fontSize: "clamp(16px, 1.3vw, 20px)",
              color: "#2E4600",
            }}
          >
            voices
          </span>
        </div>

        {/* 下段: 誘導 */}
        <div>
          <h3
            className="font-shippori leading-[1.35] tracking-[0.01em]"
            style={{
              fontWeight: 900,
              fontSize: "clamp(18px, 1.6vw, 24px)",
              color: "#2E4600",
            }}
          >
            50組すべての声が、別ページにあります。
          </h3>
          <p
            className="font-shippori mt-3 text-[clamp(12px,0.95vw,14px)] leading-[1.85]"
            style={{ color: "rgba(46,70,0,0.85)" }}
          >
            装飾も、誇張も、ありません。奈良・京都の50組の声を、別ページにまとめています。
          </p>
          <p
            className="font-inter mt-6 text-[11px] md:text-[12px] tracking-[0.22em] uppercase font-bold group-hover:translate-x-1 transition-transform"
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
      className="bg-[#FAF8F3] text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ================= HEADER (非対称 + 50数字) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end mb-16 md:mb-24">
          {/* Left: 看板 */}
          <div>
            <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
              Voice
            </p>
            <h2
              className="font-shippori text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                fontSize: "var(--display-sm)",
              }}
            >
              50組の家族が、
              <br />
              本音で答えています。
            </h2>
          </div>

          {/* Right: LEAD */}
          <aside className="lg:pt-4">
            <div className="border-t-[3px] border-text-primary pt-6">
              <p className="font-shippori font-bold text-[clamp(22px,2.2vw,32px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                装飾も、誇張も、ありません。
              </p>
              <p className="mt-5 md:mt-6 font-shippori font-medium text-[clamp(17px,1.5vw,22px)] leading-[1.8] max-w-[480px] text-text-primary/90">
                奈良・京都から、50組の本音が
                <br />
                届きました。
              </p>
            </div>
          </aside>
        </div>

        {/* ================= Featured 見開き ================= */}
        <div className="mb-5 md:mb-6">
          <FeaturedVoiceCard />
        </div>

        {/* ================= Other 2件 + All Voices カード ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {OTHERS.map((config, i) => (
            <OtherVoiceCard key={config.id} config={config} index={i} />
          ))}
          <AllVoicesCard />
        </div>

        {/* ================= 注記 ================= */}
        <div className="mt-14 md:mt-20 pt-10 border-t border-text-primary/15">
          <p className="font-shippori max-w-[44rem] text-[11px] md:text-[12px] leading-[1.95] text-text-secondary">
            ※ 掲載の声は、実際にやまとで家を建てた方のアンケート原文を、プライバシー配慮の範囲で掲載しています。
            <br />
            ※ 50組の声の全文は、別ページ「Voice」に。
          </p>
        </div>
      </div>
    </section>
  );
}
