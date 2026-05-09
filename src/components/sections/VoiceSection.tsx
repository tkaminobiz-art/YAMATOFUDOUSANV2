import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  VoiceSection — 2026-05-09 v5 (Asymmetric Featured + Mobile Combined)
  ---------------------------------------------------------------
  v4 (横カルーセル + cinemagraph) 撤去理由:
  - スクロール量大・冗長
  - 「本丸」を上質に表現できていなかった

  v5: voice-lab v-03 Asymmetric Featured 採用 + ユーザー指示「モバイル 1 本連結動画」適用。
  20 年キャリア senior editorial designer デザイン。

  【Desktop (lg以上)】
   2-column asymmetric grid (1.4fr / 1fr):
   - LEFT: Hero video (16:9, 大判 loop) + substantial Mincho italic quote + caption
   - RIGHT: 2 supporting videos (4:3 ループ) 縦積み + 短い引用 + caption
   - 各動画は autoplay muted loop playsInline (静止画的なシネマグラフ)

  【Mobile (lg未満)】
   1 connected video (combined-mobile.mp4: hero+sup1+sup2 の 14 sec 連結 w/ クロスフェード)
   + 3 quote cards 縦積み
   → モバイルで動画プレイヤー 3 段の違和感を回避

  【写真選定 (Seedance ベース)】
   Hero:  works-04.webp → hero.mp4 (LDK + kitchen + live-edge bar, 暖色光)
   Sup 1: works-03.webp → sup1.mp4 (LDK + sofa + 黒 kitchen)
   Sup 2: case3-living.webp → sup2.mp4 (光wood + 階段 + 和室)
   Mobile: ffmpeg で 3 動画を 0.5sec crossfade で連結 (14sec)

  【コピー — voices.json から canonical 引用】
   Hero (Ｓ様 奈良市):  自由設計、追加費用なしで設定された標準設備、
                       実際の費用を提示してくれる誠実さ。
   Sup 1 (Ｎ様 奈良市): 理想通りの家となり、とても気に入っています。
   Sup 2 (Ｏ様 奈良市): 毎日とても快適に過ごしています。

  クラスタ pattern 完全継承:
   - bg #F7F5F0 / 墨黒 #1A1815 / 深緑 #143426 単一アクセント
   - eyebrow: FIG. 05 · VOICES (mono + hairline)
   - h2: Shippori Mincho 「実際に住む、ご家族の声。」
   - 引用: Mincho italic
   - ActionLine CTA: 「全ての声を見る →」 → /voice
*/

type Voice = {
  videoSrc: string;
  quote: string;
  family: string;
  area: string;
  model?: string;
};

const HERO: Voice = {
  videoSrc: "/videos/voices/hero.mp4",
  quote:
    "自由設計、追加費用なしで設定された標準設備、実際の費用を提示してくれる誠実さ。すべてが、決め手でした。",
  family: "Ｓ様 ご家族",
  area: "奈良市",
  model: "花モデル",
};

const SUP_1: Voice = {
  videoSrc: "/videos/voices/sup1.mp4",
  quote: "理想通りの家となり、とても気に入っています。",
  family: "Ｎ様 ご家族",
  area: "奈良市",
};

const SUP_2: Voice = {
  videoSrc: "/videos/voices/sup2.mp4",
  quote: "毎日とても快適に過ごしています。",
  family: "Ｏ様 ご家族",
  area: "奈良市",
};

const MOBILE_VIDEO_SRC = "/videos/voices/combined-mobile.mp4";

function CaptionLine({ voice }: { voice: Voice }) {
  return (
    <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[11px] leading-[1.6] text-[#1A1815]/55 font-mono tracking-[0.04em]">
      <span className="text-[#1A1815]/85">{voice.family}</span>
      <span aria-hidden className="text-[#1A1815]/30">/</span>
      <span>{voice.area}</span>
      {voice.model && (
        <>
          <span aria-hidden className="text-[#1A1815]/30">/</span>
          <span>{voice.model}</span>
        </>
      )}
    </p>
  );
}

function QuoteText({
  quote,
  size = "body",
}: {
  quote: string;
  size?: "lead" | "body";
}) {
  return (
    <p
      className={`font-[var(--font-shippori)] italic text-[#1A1815] leading-[1.85] tracking-[0.02em] ${
        size === "lead"
          ? "text-[clamp(15px,1.25vw,19px)]"
          : "text-[clamp(13px,1vw,15px)]"
      }`}
    >
      <span className="text-[#1A1815]/40 mr-0.5">「</span>
      {quote}
      <span className="text-[#1A1815]/40 ml-0.5">」</span>
    </p>
  );
}

function LoopingVideo({ src, alt, aspect }: { src: string; alt: string; aspect: string }) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-[#EDEAE3] ${aspect}`}
      aria-label={alt}
    >
      <video
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export default function VoiceSection() {
  return (
    <section
      id="voice"
      className="relative bg-[#F7F5F0] text-[#1A1815] pt-[calc(var(--section-py)*0.5)] pb-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* Header — クラスタ pattern 完全同型 */}
        <header className="max-w-[860px] mb-12 md:mb-16">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
            <span>FIG. 05</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>Voices</span>
          </div>
          <h2
            className="mt-5 font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
          >
            実際に住む、ご家族の声。
          </h2>
          <p className="mt-6 max-w-[680px] text-[clamp(13.5px,1vw,15px)] leading-[1.95] text-[#1A1815]/80">
            家を建てた後の暮らしから、いただいた言葉を 3 つ。
          </p>
        </header>

        {/* Mobile: 1 連結動画 + 3 引用カード縦積み */}
        <div className="lg:hidden">
          <LoopingVideo
            src={MOBILE_VIDEO_SRC}
            alt="やまと不動産で建てたご家族の暮らし — 3 軒の連続"
            aspect="aspect-[16/9]"
          />
          <p className="mt-3 text-[10.5px] leading-[1.7] text-[#1A1815]/45 font-mono tracking-[0.04em]">
            FIG. 05 · 3 voices · 14 sec
          </p>
          <div className="mt-10 flex flex-col gap-y-10">
            {[HERO, SUP_1, SUP_2].map((v) => (
              <article key={v.family} className="flex flex-col">
                <QuoteText quote={v.quote} size={v === HERO ? "lead" : "body"} />
                <CaptionLine voice={v} />
              </article>
            ))}
          </div>
        </div>

        {/* Desktop: asymmetric 2-column (Hero left + 2 supporting right) */}
        <div className="hidden lg:grid grid-cols-[1.4fr_1fr] gap-x-10 gap-y-10 items-start">
          {/* LEFT: Hero featured */}
          <article className="flex flex-col">
            <LoopingVideo
              src={HERO.videoSrc}
              alt="Hero voice — LDK と live-edge bar の暮らし"
              aspect="aspect-[16/9]"
            />
            <div className="mt-6 max-w-[640px]">
              <QuoteText quote={HERO.quote} size="lead" />
              <CaptionLine voice={HERO} />
            </div>
          </article>

          {/* RIGHT: 2 supporting voices stacked */}
          <div className="flex flex-col gap-y-8">
            {[SUP_1, SUP_2].map((v) => (
              <article key={v.family} className="flex flex-col">
                <LoopingVideo
                  src={v.videoSrc}
                  alt={`Supporting voice — ${v.family}`}
                  aspect="aspect-[4/3]"
                />
                <div className="mt-4">
                  <QuoteText quote={v.quote} size="body" />
                  <CaptionLine voice={v} />
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ActionLine CTA — 右下、cluster 同型 */}
        <div className="mt-14 md:mt-16 flex flex-col items-end gap-4 border-t border-[var(--color-rule)] pt-8">
          <Link
            href="/voice"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815] border-b border-[#1A1815]/30 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            全ての声を見る
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
