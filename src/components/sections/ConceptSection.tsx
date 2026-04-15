"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  CONCEPT — 編集の見開き（第2稿）
  - 右：既存 FV 写真で「光と素材の温度」を主役に（雑誌の片ページ）
  - 価格はカードではなく罫と右揃え数字の「表」に近い秩序
  - 左：見出し → 橋渡しリード → 本文 → 小さな編集注で物語の厚み
  - 背景：微い対角シーム＋既存の放射・ヴィネット・ノイズ
  - 入場：子要素 stagger（useScrollIn(true)）
*/

const CONCEPT_PHOTO = {
  src: "/images/fv/hero-03-living.webp",
  alt: "花鳥風月 リビング — 同じ仕様の住まいの質感",
} as const;

export default function ConceptSection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="concept"
      className="relative overflow-hidden border-y border-white/[0.06] bg-[#1f1f1f] py-[var(--section-py)]"
    >
      {/* 奥行き：放射 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_88%_52%_at_22%_-8%,rgba(255,255,255,0.085)_0%,transparent_56%)]"
      />
      {/* 紙の筋：極弱い対角シーム（他ダーク帯との差別化） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 1px, rgba(255,255,255,0.04) 1px, rgba(255,255,255,0.04) 2px)",
          backgroundSize: "100% 100%",
        }}
      />
      {/* ヴィネット */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.38] via-transparent to-black/[0.58]"
      />
      {/* 下辺の薄い台座帯 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/45 to-transparent"
      />
      {/* 微ノイズ */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.038]"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-[1280px] px-[var(--page-px)]"
      >
        {/* マストヘッド */}
        <header className="group scroll-in mb-12 md:mb-14 lg:mb-16">
          <p
            className="text-[11px] font-semibold tracking-[0.38em] text-white/42 md:text-xs"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            CONCEPT
          </p>
          <div
            className="mt-4 h-px w-20 origin-left scale-x-0 bg-gradient-to-r from-white/50 to-transparent transition-transform duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-[.is-visible]:scale-x-100 md:w-24"
            aria-hidden
          />
          <h2
            className="mt-8 max-w-[46rem] text-[clamp(26px,3.8vw,48px)] font-medium leading-[1.38] tracking-[0.03em] text-white md:mt-10 md:leading-[1.4]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            「予算オーバーで理想を諦める」そんな必要はありません。
          </h2>
        </header>

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
          {/* 左：リード・本文・編集注（SPは「主張→数字→締め」で後段） */}
          <div className="order-2 space-y-8 lg:order-1 lg:col-span-7 lg:pr-2">
            <div className="scroll-in space-y-8">
              <p
                className="max-w-[40rem] text-[clamp(15px,1.2vw,17px)] font-normal leading-[1.95] tracking-[0.02em] text-white/78 md:leading-[2]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                図面に落ちた理想は、見積の一行で姿を変えます。
                <span className="text-white/55"> ここで示すのは、</span>
                <span className="font-medium text-white/88">
                  同じ仕様を前提にしたときの、構造の差
                </span>
                <span className="text-white/55">だけです。</span>
              </p>

              <p
                className="max-w-[40rem] border-l border-white/[0.14] pl-6 text-[clamp(15px,1.25vw,18px)] leading-[2.05] text-white/70 md:pl-7 md:leading-[2.1]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                使っている素材は同じ。違うのは、
                <span className="font-semibold text-white/92">
                  無駄な広告費や中間マージンがかかっていないことだけ
                </span>
                です。
              </p>

              <p
                className="max-w-[34rem] pt-1 text-[12px] leading-[1.85] text-white/48 md:text-[13px] md:leading-[1.9]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                ※金額・条件は一例です。プラン・仕様・敷地条件により変動します。
              </p>
            </div>
          </div>

          {/* 右：写真（上）＋価格表（下）（SPでは見出し直後に配置） */}
          <div className="order-1 flex flex-col gap-8 lg:order-2 lg:col-span-5">
            <figure className="scroll-in group/fig relative w-full overflow-hidden rounded-tr-[2.25rem] rounded-bl-md bg-black/50 shadow-[0_28px_70px_-32px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.07]">
              <div className="relative aspect-[4/5] w-full min-h-[220px] md:aspect-[4/5] md:min-h-[280px]">
                <Image
                  src={CONCEPT_PHOTO.src}
                  alt={CONCEPT_PHOTO.alt}
                  fill
                  className="object-cover transition duration-[1.35s] ease-out group-[.is-visible]/fig:scale-[1.02] motion-reduce:transition-none motion-reduce:group-[.is-visible]/fig:scale-100"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/25"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent"
                  aria-hidden
                />
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-5 pb-5 pt-16 md:px-6 md:pb-6">
                  <p
                    className="text-[10px] font-semibold tracking-[0.22em] text-white/48"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    扉絵
                  </p>
                  <p
                    className="mt-2 text-sm font-medium leading-snug text-white/90 md:text-[15px]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    紙のカタログでは足りない、光と素材の温度。
                  </p>
                </figcaption>
              </div>
            </figure>

            {/* 価格：表に近い秩序（英語ラベル廃止） */}
            <div className="scroll-in border border-white/[0.1] bg-black/40 px-5 py-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:px-6 md:py-7">
              <p
                className="text-[10px] font-semibold tracking-[0.26em] text-white/38"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                参考・お見積りの帯
              </p>

              <div
                className="mt-6 space-y-0 border-t border-white/[0.09]"
                role="table"
                aria-label="参考価格の比較"
              >
                <div
                  role="row"
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 border-b border-white/[0.07] py-4 md:py-[1.125rem]"
                >
                  <span
                    role="cell"
                    className="text-[12px] font-medium leading-snug text-white/48 md:text-[13px]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    大手ハウスメーカー
                    <span className="mt-0.5 block text-[11px] font-normal text-white/38 md:text-xs">
                      （参考帯）
                    </span>
                  </span>
                  <span
                    role="cell"
                    className="text-right tabular-nums text-[clamp(1.75rem,4.2vw,2.5rem)] font-semibold tracking-tight text-white/38"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    4,000
                    <span className="ml-1 text-base font-medium text-white/42 md:text-lg">
                      万円〜
                    </span>
                  </span>
                </div>

                <div
                  role="row"
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-4 py-4 md:py-[1.125rem]"
                >
                  <span
                    role="cell"
                    className="text-[12px] font-medium leading-snug text-main/95 md:text-[13px]"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    やまと不動産
                    <span className="mt-0.5 block text-[11px] font-normal text-main/75 md:text-xs">
                      花鳥風月
                    </span>
                  </span>
                  <span
                    role="cell"
                    className="text-right tabular-nums text-[clamp(1.9rem,4.6vw,2.85rem)] font-semibold tracking-tight text-main [text-shadow:0_0_38px_rgba(90,138,74,0.26)]"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    <span className="underline decoration-main/30 decoration-[0.5px] underline-offset-[0.2em]">
                      2,480
                    </span>
                    <span className="ml-1 text-base font-semibold text-main md:text-lg">
                      万円〜
                    </span>
                  </span>
                </div>
              </div>

              <p
                className="mt-5 border-t border-dashed border-white/[0.1] pt-5 text-[13px] leading-[1.88] text-white/68 md:text-[14px] md:leading-[1.92]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                大手で4,000万円と言われた家が、2,480万円で建ちます。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
