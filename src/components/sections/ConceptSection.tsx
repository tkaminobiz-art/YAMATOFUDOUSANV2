"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";

/*
  CONCEPT — 編集の見開き
  - PC は 6/6 グリッドで左右の重みを揃え、扉絵は横長（16:9〜11）＋ max-h で縦段差を抑える
  - 価格は罫＋右揃え tabular-nums、内部の縦余白は詰めて「段」の少ないリズム
*/

const CONCEPT_PHOTO = {
  src: "/images/newsozai/interior-ldk-01.webp",
  alt: "内観 LDK — 住まいの空気感",
} as const;

export default function ConceptSection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="concept"
      className="relative overflow-hidden border-y border-white/[0.08] bg-[#171717] py-[var(--section-py)]"
    >
      {/* 奥行き：放射（1要素に絞る） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_52%_at_18%_-8%,rgba(255,255,255,0.095)_0%,transparent_58%)]"
      />
      {/* 紙の筋：極弱い対角シーム（他ダーク帯との差別化） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.042]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 1px, rgba(255,255,255,0.04) 1px, rgba(255,255,255,0.04) 2px)",
          backgroundSize: "100% 100%",
        }}
      />
      {/* ヴィネット */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.34] via-transparent to-black/[0.62]"
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-[1320px] px-[var(--page-px)]"
      >
        <div className="scroll-in">
          <SectionHeaderCentered
            label="CONCEPT"
            ghostText="CONCEPT"
            title="「予算オーバーで理想を諦める」そんな必要はありません。"
            lead="素材も性能も同等。それでも金額が変わるのは、家づくりの“構造”が違うからです。"
            theme="dark"
            align="left"
            className="mb-10 md:mb-12 lg:mb-14"
          />
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-x-12 xl:gap-x-14">
          {/* 左：写真（主役） */}
          <div className="order-1 lg:order-1 lg:col-span-7">
            <figure className="scroll-in group/fig relative overflow-hidden rounded-2xl bg-black/50 shadow-[0_24px_72px_-34px_rgba(0,0,0,0.72)] ring-1 ring-white/[0.08]">
              <div className="relative aspect-[16/11] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
                <Image
                  src={CONCEPT_PHOTO.src}
                  alt={CONCEPT_PHOTO.alt}
                  fill
                  className="object-cover opacity-[0.94] transition duration-[1.35s] ease-out group-hover/fig:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover/fig:scale-100"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-black/20"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_78%_58%_at_24%_8%,rgba(255,255,255,0.15)_0%,transparent_58%)]"
                />
              </div>
              <figcaption className="border-t border-white/[0.08] px-6 py-5 md:px-7 md:py-6">
                <p
                  className="text-[11px] font-semibold tracking-[0.22em] text-white/45"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  EDITORIAL CUT
                </p>
                <p
                  className="mt-2 text-[15px] font-medium leading-relaxed text-white/88 md:text-base"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  まずは空気感を、写真で。次に、仕組みで納得してください。
                </p>
              </figcaption>
            </figure>
          </div>

          {/* 右：本文（短く）＋3ポイント */}
          <div className="order-2 lg:order-2 lg:col-span-5">
            <div className="scroll-in">
              <p
                className="text-[clamp(15px,1.1vw,17px)] leading-[1.95] text-white/78"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                図面に落ちた理想は、見積の一行で姿を変えます。
                <span className="text-white/55"> ここで示すのは、</span>
                <span className="font-medium text-white/90">
                  同じ仕様を前提にしたときの“構造の差”
                </span>
                <span className="text-white/55">だけです。</span>
              </p>

              <blockquote className="mt-7 rounded-2xl border border-white/12 bg-white/[0.04] px-6 py-6">
                <p
                  className="text-[clamp(16px,1.35vw,18px)] leading-[2.05] text-white/80"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  使っている素材は同じ。違うのは、
                  <span className="font-semibold text-white">
                    無駄な広告費や中間マージンが乗っていないこと
                  </span>
                  だけ。
                </p>
              </blockquote>

              <div className="mt-8 rounded-2xl border border-white/12 bg-black/25 px-6 py-6">
                <p
                  className="text-[11px] font-semibold tracking-[0.22em] text-white/55"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  THREE PROOFS
                </p>
                <ul className="mt-4 space-y-4">
                  {[
                    { k: "01", t: "価格は、契約後に上がらない", d: "見積もりが最終価格。後出しの追加請求はしません。" },
                    { k: "02", t: "地盤改良費は当社負担（最大150万円）", d: "不安になりやすい費用を、先にゼロにします。" },
                    { k: "03", t: "モデルハウスと同等が標準仕様", d: "「気に入った設備」がオプションで増額しません。" },
                  ].map((p) => (
                    <li key={p.k} className="grid grid-cols-[auto_1fr] gap-x-4">
                      <span
                        className="mt-0.5 inline-flex h-7 w-10 items-center justify-center rounded-full border border-white/14 bg-white/[0.04] text-[11px] font-semibold tracking-[0.12em] text-white/80"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        {p.k}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-medium leading-snug text-white">
                          {p.t}
                        </p>
                        <p className="mt-1 text-[13px] leading-[1.85] text-white/62">
                          {p.d}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <p
                className="mt-6 text-[12px] leading-[1.85] text-white/42 md:text-[13px]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                ※金額・条件は一例です。プラン・仕様・敷地条件により変動します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
