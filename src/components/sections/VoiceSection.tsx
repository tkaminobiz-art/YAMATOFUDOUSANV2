import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  VoiceSection — 2026-05-09 v6 (Polaroid Memory Wall)
  ---------------------------------------------------------------
  ユーザー判断で v5 (動画案) 廃止 → voice-lab v2-02 Polaroid 採用 + Approach C
  (polaroid 全体を AI 生成 + CSS で tilt + box-shadow)。

  3 polaroid PNG は gpt_image_2 (3:4 portrait, high/2k) で生成:
   - p1-windowsill: 窓辺の植物 + 「理想通りの家になりました。」(にさま ご家族)
   - p2-mug:        マグを持つ手 + 「毎日とても快適に過ごしています。」(おさま ご家族)
   - p3-drawing:    冷蔵庫の子供の絵 + 「誠実さと信頼感が決め手でした。」(げさま ご家族)
  全て polaroid フィルター適用 (warm amber grade / slight grain / vignette / aged 白枠 /
  fountain pen ink 手書きキャプション / tiny ink ornament)。

  【Desktop】
   3 polaroid を scrapbook composition で配置:
   - tilt: -3deg / +2deg / -1deg (カジュアル感)
   - box-shadow: 軽め (浮遊感)
   - 横並び with subtle vertical offset (top: 0px / 32px / 16px)

  【Mobile】
   3 polaroid を縦積み, tilt 弱め (1deg/-1deg/0deg)
   モバイルでも scrapbook 感は保つ

  【Accessibility】
   SR-only に canonical voice text を埋め込み (写真の handwritten 文字を text 認識できない reader 向け)

  クラスタ pattern 完全継承:
   - bg #F7F5F0 / 墨黒 / 深緑 / Shippori Mincho
   - pt-half / pb-full
   - FIG. 06 · VOICES eyebrow
   - h2: 「実際に住む、ご家族の声。」
   - ActionLine CTA: 「全ての声を見る →」 → /voice
*/

type Polaroid = {
  src: string;
  alt: string;
  rotate: string;
  rotateMobile: string;
  offsetTop: string;
  offsetTopMobile: string;
  // SR-only canonical
  quote: string;
  family: string;
};

const POLAROIDS: readonly Polaroid[] = [
  {
    src: "/images/voices/polaroids/p1-windowsill.png",
    alt: "polaroid: 窓辺の植物と暖かな朝の光 / 「理想通りの家になりました。」 — にさま ご家族 (奈良市)",
    rotate: "lg:-rotate-3",
    rotateMobile: "rotate-1",
    offsetTop: "lg:translate-y-0",
    offsetTopMobile: "",
    quote: "理想通りの家になりました。",
    family: "Ｎ様 ご家族 / 奈良市",
  },
  {
    src: "/images/voices/polaroids/p2-mug.png",
    alt: "polaroid: 木のテーブルでマグを持つ手 / 「毎日とても快適に過ごしています。」 — おさま ご家族 (奈良市)",
    rotate: "lg:rotate-2",
    rotateMobile: "-rotate-1",
    offsetTop: "lg:translate-y-8",
    offsetTopMobile: "",
    quote: "毎日とても快適に過ごしています。",
    family: "Ｏ様 ご家族 / 奈良市",
  },
  {
    src: "/images/voices/polaroids/p3-drawing.png",
    alt: "polaroid: 冷蔵庫に貼られた子供の家の絵 / 「誠実さと信頼感が決め手でした。」 — げさま ご家族 (奈良市・花)",
    rotate: "lg:-rotate-1",
    rotateMobile: "rotate-1",
    offsetTop: "lg:translate-y-4",
    offsetTopMobile: "",
    quote: "誠実さと信頼感が決め手でした。",
    family: "Ｓ様 ご家族 / 奈良市 · 花モデル",
  },
];

export default function VoiceSection() {
  return (
    <section
      id="voice"
      className="relative bg-[#F7F5F0] text-[#1A1815] pt-[calc(var(--section-py)*0.5)] pb-[var(--section-py)] overflow-hidden"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* Header — クラスタ pattern 同型 */}
        <header className="max-w-[860px] mb-12 md:mb-16">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
            <span>FIG. 06</span>
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
            家を建てたあとの暮らしから、いただいた一言を 3 つ。
          </p>
        </header>

        {/* Polaroid wall */}
        <div
          className="relative grid grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-y-0 lg:gap-x-6 items-start justify-items-center"
          aria-label="お客様の声 — 3 枚のポラロイド"
        >
          {POLAROIDS.map((p) => (
            <figure
              key={p.src}
              className={`relative w-[min(78vw,320px)] lg:w-full max-w-[340px] ${p.rotateMobile} ${p.rotate} ${p.offsetTop} transition-transform duration-500 hover:-translate-y-1`}
              style={{
                filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.12)) drop-shadow(0 4px 8px rgba(0,0,0,0.08))",
              }}
            >
              <Image
                src={p.src}
                alt={p.alt}
                width={1744}
                height={2336}
                sizes="(max-width: 1024px) 78vw, 320px"
                className="block h-auto w-full"
                priority={false}
              />
            </figure>
          ))}
        </div>

        {/* SR-only canonical voice text — accessibility (handwritten in image is not OCR-friendly) */}
        <div className="sr-only" aria-label="お客様の声 全文">
          <ul>
            {POLAROIDS.map((p) => (
              <li key={p.family}>
                <q>{p.quote}</q>
                <span> — {p.family}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ActionLine CTA — 右下、cluster 同型 */}
        <div className="mt-16 md:mt-20 flex flex-col items-end gap-4 border-t border-[var(--color-rule)] pt-8">
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
