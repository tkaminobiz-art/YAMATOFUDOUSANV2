import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  SocialProof — 2026-05-09 v1 (Step 6: TOP 軽量化統合セクション)
  ---------------------------------------------------------------
  ユーザー戦略「WorksSection + VoiceSection を "建てた家と、暮らしている人の声"
  1 セクションに統合 / 施工写真 3 件 + 短い お客様コメント 2-3 件 + CTA」に従う。

  構成: 3 column ペア (photo + family voice quote)
   各 column: 4:5 portrait 写真 + Mincho italic 引用 + 家族 caption
   下に 2 ActionLine CTA: 施工事例を見る / お客様の声を見る

  写真 3 件 (yamato 既存 works exterior):
   Col 1: works-02 (京田辺市・黒外観+赤いドア)
   Col 2: works-01 (奈良市・鋭い片流れ屋根+青空)
   Col 3: works-05 (斑鳩町・木目スリット+立体)

  引用 3 件 (canonical voices.json から):
   Col 1 (Ｎ様 京田辺市):「理想通りの家となり、とても気に入っています。」
   Col 2 (Ｓ様 奈良市):「自由設計、追加費用なしの誠実さが、決め手でした。」
   Col 3 (Ｏ様 斑鳩町):「毎日とても快適に過ごしています。」

  クラスタ pattern 完全継承:
   - warm paper #F7F5F0 / 墨黒 / 深緑 #143426
   - FIG.NN eyebrow + Shippori Mincho 見出し
   - ActionLine CTA (右下)

  関連: page.tsx で従来の 2 セクション (WorksSection / VoiceSection) を撤去して
        この 1 セクションに置き換える。旧 2 ファイルは保持 (戻す可能性)。
*/

type Pair = {
  src: string;
  alt: string;
  family: string;
  area: string;
  spec: string;
  quote: string;
};

const PAIRS: readonly Pair[] = [
  {
    src: "/images/works/works-02.webp",
    alt: "京田辺市の住まい — 黒外観に赤い玄関ドア",
    family: "Ｎ様 ご家族",
    area: "京田辺市",
    spec: "4LDK / 30坪",
    quote: "理想通りの家となり、とても気に入っています。",
  },
  {
    src: "/images/works/works-01.webp",
    alt: "奈良市の住まい — 鋭い片流れ屋根と青空",
    family: "Ｓ様 ご家族",
    area: "奈良市",
    spec: "花モデル · 33坪 / 4LDK",
    quote:
      "自由設計、追加費用なしの誠実さが、決め手でした。",
  },
  {
    src: "/images/works/works-05.webp",
    alt: "斑鳩町の住まい — 木目スリットアクセントの立体的外観",
    family: "Ｏ様 ご家族",
    area: "斑鳩町",
    spec: "5LDK / 36坪",
    quote: "毎日とても快適に過ごしています。",
  },
];

export default function SocialProof() {
  return (
    <section
      id="works"
      className="relative bg-[#F7F5F0] text-[#1A1815] py-[var(--section-py)]"
    >
      <div className="max-w-[1240px] mx-auto px-[var(--page-px)]">
        {/* Header */}
        <header className="max-w-[860px]">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[10.5px] tracking-[0.22em] uppercase text-[#1A1815]/55 font-mono">
            <span>FIG. 04</span>
            <span aria-hidden className="h-px w-8 bg-[var(--color-rule)]" />
            <span>Works &amp; Voices</span>
          </div>
          <h2
            className="mt-5 font-[var(--font-shippori)] text-[#1A1815] leading-[1.32] tracking-[0.01em]"
            style={{ fontSize: "clamp(28px, 3.6vw, 48px)", fontWeight: 500 }}
          >
            建てた家と、<br className="md:hidden" />
            暮らしている人の声。
          </h2>
          <p className="mt-6 max-w-[680px] text-[clamp(13.5px,1vw,15px)] leading-[1.95] text-[#1A1815]/80">
            実際にやまとが手がけた住まいと、
            ご家族からいただいた一言を 3 組。
          </p>
        </header>

        {/* 3 column pairs */}
        <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 items-start">
          {PAIRS.map((p) => (
            <article key={p.src} className="flex flex-col">
              <figure className="flex flex-col">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EDEAE3]">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-3 flex items-baseline gap-2.5 text-[11px] leading-[1.6] text-[#1A1815]/60 font-mono tracking-[0.04em]">
                  <span className="text-[#1A1815]/85">{p.area}</span>
                  <span aria-hidden className="text-[#1A1815]/30">/</span>
                  <span>{p.spec}</span>
                </figcaption>
              </figure>
              <blockquote className="mt-6 border-l border-[var(--color-rule)] pl-4">
                <p
                  className="font-[var(--font-shippori)] italic text-[#1A1815] leading-[1.85] tracking-[0.02em]"
                  style={{ fontSize: "clamp(13px, 1vw, 15px)", fontWeight: 400 }}
                >
                  <span className="text-[#1A1815]/40 mr-0.5">「</span>
                  {p.quote}
                  <span className="text-[#1A1815]/40 ml-0.5">」</span>
                </p>
                <footer className="mt-2.5 text-[11px] text-[#1A1815]/55 font-mono tracking-[0.04em]">
                  — {p.family}
                </footer>
              </blockquote>
            </article>
          ))}
        </div>

        {/* CTA: 2 ActionLine */}
        <div className="mt-14 md:mt-16 flex flex-col md:flex-row md:justify-end items-end gap-6 md:gap-10 border-t border-[var(--color-rule)] pt-10">
          <Link
            href="/works"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815]/70 border-b border-[#1A1815]/20 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            施工事例をもっと見る
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={1.5}
            />
          </Link>
          <Link
            href="/voice"
            className="group inline-flex items-center gap-2.5 text-[14px] md:text-[15px] font-bold text-[#1A1815] border-b border-[#1A1815]/30 hover:border-[#143426] hover:text-[#143426] py-1 transition-colors"
          >
            お客様の声をもっと見る
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
