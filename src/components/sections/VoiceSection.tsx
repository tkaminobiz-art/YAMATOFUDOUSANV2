"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getVoice } from "@/data/voices";

/*
  VoiceSection — 2026-05-03 v4 (横カルーセル化・参考画像準拠)
  ---------------------------------------------------------------
  v3: シネマグラフ + Featured 見開き + Others 3件 + All Voices カード
  v4: シネマグラフ保持 + 4件カルーセル + フッターに全件リンク
      → 縦スクロール量を大幅圧縮、Progressive Disclosure 原則
      → HeroVoiceMagazine の TORICHO 路線は /voice ページ専用に維持
*/

const FOREST = "#486B00";
const LIME_DARK = "#2E4600";

type VoiceCardConfig = {
  id: string;
  headline: string;
  quote: string;
  photoIndex: number;
  model: string;
};

const VOICES_FEATURED: readonly VoiceCardConfig[] = [
  {
    id: "216803",
    headline: "諦めかけた頃に、やまとに出会いました。",
    quote:
      "土地探しや、工務店選びでなかなか良い所がなく、一度諦めようと思っていた時に、何気なくネットで見つけた。",
    photoIndex: 0,
    model: "京モデル",
  },
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
];

function VoiceCard({ config, index }: { config: VoiceCardConfig; index: number }) {
  const voice = getVoice(config.id);
  if (!voice) return null;
  const photo = voice.photos[config.photoIndex] ?? voice.photos[0];

  return (
    <Link
      href={`/voice/${voice.id}`}
      className="group shrink-0 w-[78%] sm:w-[48%] md:w-[32%] lg:w-[28%] snap-start flex flex-col bg-white border border-border rounded overflow-hidden transition-[border-color,box-shadow] duration-[400ms] hover:border-main hover:shadow-[0_18px_36px_-22px_rgba(72,107,0,0.18)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
        {photo && (
          <Image
            src={photo}
            alt={voice.title}
            fill
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 48vw, 28vw"
          />
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-[10px] md:text-[11px] tracking-[0.16em] uppercase"
            style={{ color: FOREST, fontWeight: 600 }}
          >
            {String(index + 1).padStart(2, "0")} / {voice.area}
          </span>
          <span className="text-text-secondary text-[10px]">·</span>
          <span className="text-text-secondary text-[10px]">{config.model}</span>
        </div>
        <h3 className="text-text-primary text-[14px] md:text-[15px] font-medium leading-[1.5] mb-3">
          {config.headline}
        </h3>
        <blockquote className="text-text-secondary text-[12px] leading-[1.85] line-clamp-3">
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
      className="group shrink-0 w-[78%] sm:w-[48%] md:w-[32%] lg:w-[28%] snap-start flex flex-col rounded overflow-hidden transition-transform duration-[400ms] hover:-translate-y-1"
      style={{ background: "#A2C523" }}
    >
      <div className="p-6 md:p-7 flex flex-col h-full min-h-[300px] md:min-h-[340px]">
        <div className="flex items-center gap-3 mb-auto">
          <span
            className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase"
            style={{ color: LIME_DARK, fontWeight: 600 }}
          >
            All Voices
          </span>
          <span className="flex-1 h-px" style={{ background: `${LIME_DARK}30` }} />
        </div>

        <div className="flex items-baseline gap-2 my-auto">
          <span
            className="tabular-nums leading-[0.85]"
            style={{
              fontFamily: "var(--font-oswald)",
              fontWeight: 300,
              fontSize: "clamp(72px, 8vw, 120px)",
              letterSpacing: "-0.03em",
              color: LIME_DARK,
            }}
          >
            50
          </span>
          <span
            className="pb-2"
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: "clamp(14px, 1.1vw, 18px)",
              color: LIME_DARK,
            }}
          >
            組のご家族
          </span>
        </div>

        <div className="mt-auto">
          <p
            className="text-[14px] md:text-[16px] leading-[1.5] mb-2"
            style={{ color: LIME_DARK, fontWeight: 600 }}
          >
            すべての声を、別ページに。
          </p>
          <p
            className="text-[11px] md:text-[12px] leading-[1.7] mb-4"
            style={{ color: "rgba(46,70,0,0.8)" }}
          >
            装飾も誇張もありません。50組の本音をご覧ください。
          </p>
          <p
            className="text-[11px] tracking-[0.22em] uppercase font-bold group-hover:translate-x-1 transition-transform"
            style={{ color: LIME_DARK }}
          >
            すべて読む →
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function VoiceSection() {
  const sectionRef = useScrollIn<HTMLDivElement>();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft < max - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scrollByStep = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.85;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  return (
    <section
      id="voice"
      ref={sectionRef}
      className="bg-white text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ヘッダー */}
        <div className="flex items-end justify-between gap-6 mb-8 md:mb-10 flex-wrap">
          <div>
            <p
              className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-3"
              style={{ color: FOREST, fontWeight: 600 }}
            >
              Voice · お客様の声
            </p>
            <h2
              className="text-text-primary leading-[1.3] tracking-[0.005em]"
              style={{
                fontWeight: 500,
                fontSize: "clamp(22px, 2.6vw, 36px)",
              }}
            >
              50組の家族が、本音で答えています。
            </h2>
            <p className="mt-3 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[600px]">
              装飾も、誇張もなし。奈良・京都の50組から届いた、率直な声です。
            </p>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByStep(-1)}
              disabled={!canPrev}
              aria-label="前の声"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-primary transition-all hover:border-main disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => scrollByStep(1)}
              disabled={!canNext}
              aria-label="次の声"
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-primary transition-all hover:border-main disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.6} />
            </button>
          </div>
        </div>

        {/* シネマグラフ — やまとが建てた家のLDK(専務承認 2026-04-28 維持) */}
        <div className="relative mb-8 md:mb-10 overflow-hidden bg-text-primary aspect-[16/9] rounded">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/videos/voice-cinemagraph-ldk.mp4"
            poster="/images/design/example-coveceiling.webp"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label="やまとが建てた家のリビングダイニング"
          />
        </div>

        {/* カルーセル(声3 + All Voices) */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-5 -mx-[var(--page-px)] px-[var(--page-px)] pb-2 scrollbar-hide"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {VOICES_FEATURED.map((c, i) => (
            <VoiceCard key={c.id} config={c} index={i} />
          ))}
          <AllVoicesCard />
        </div>

        {/* フッター */}
        <p className="mt-10 md:mt-12 text-text-secondary text-[11px] md:text-[12px] leading-[1.85] max-w-[44rem]">
          ※ 掲載の声は、実際にやまとで家を建てた方のアンケート原文を、プライバシー配慮の範囲で掲載しています。
          50組の声の全文は <Link href="/voice" className="text-main hover:underline">お客様の声ページ</Link> にまとめています。
        </p>
      </div>
    </section>
  );
}
