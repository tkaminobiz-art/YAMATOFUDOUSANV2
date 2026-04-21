"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  FreedomOfDesign — 2026-04-21 全面リニューアル(Plan A: Bento 4STEPS)
  -----------------------------------------------------------------
  旧: 246行 / 左 sticky パネル(「このセクションで分かること」3項目) +
       右 2枚パネル(「進め方」+「実例」) /
       「HOW WE DESIGN」「進め方」「実例」の3重ラベル /
       radial-gradient + repeating-linear-gradient 背景

  新: 約160行 / 暖白#FAF8F3 (Mechanism〜Price と連続) /
       非対称ヘッダー(1.4fr:1fr / border-t-[3px]) /
       4 STEPS を Bento 3列 × 2行(01 wide + 02 + 03 + 04 wide の対角線) /
       EXAMPLES 3枚は下部の補助ギャラリー

  Bento 設計:
    ┌───────────────┬───────┐
    │  01  (wide)   │  02   │   01 = 起点(重要)
    ├───────┬───────┴───────┤   04 = 仕上げ(暮らしのクセ)
    │  03   │  04  (wide)   │   対角線でリズムを作る
    └───────┴───────────────┘
    各カード: 背景写真 + 暗オーバーレイ + 番号(Oswald) + タイトル + 本文
    aspect 8:3(wide) / 4:3(normal) で両行の高さが揃う

  ユーザー心理: 「画一的じゃなく、自分らしくできる?」への回答
*/

const STEPS = [
  {
    num: "01",
    title: "土地の条件を、設計に落とし込む",
    body: "採光・道路・高低差。条件を先に整理して、「できる形」を一緒に見つけます。",
    image: "/images/design/step-01-meeting.webp",
    alt: "設計士と夫婦が打ち合わせしている様子",
    wide: true,
  },
  {
    num: "02",
    title: "暮らしの優先順位を、図面に",
    body: "家事動線、収納、将来の部屋。迷いが減るまで、図面を磨いていきます。",
    image: "/images/design/step-02-drawing.webp",
    alt: "手描きの間取り図",
    wide: false,
  },
  {
    num: "03",
    title: "実物を見ながら、仕様を決める",
    body: "外壁、床、キッチン、浴室。写真では分からない差を、体感で揃えます。",
    image: "/images/design/step-03-modelhouse.webp",
    alt: "モデルハウスのキッチンとリビング",
    wide: false,
  },
  {
    num: "04",
    title: "最後は、暮らしの“クセ”まで合わせる",
    body: "コンセントや照明、窓の高さ。日々の動きに合わせて整えます。",
    image: "/images/design/step-04-finished.webp",
    alt: "完成したキッチンとダイニング",
    wide: true,
  },
] as const;

const EXAMPLES = [
  {
    name: "カフェのような、リビング。",
    detail: "折下天井＋間接照明",
    image: "/images/design/example-coveceiling.webp",
  },
  {
    name: "家族の服、全部入る収納。",
    detail: "大空間収納",
    image: "/images/design/example-storage.webp",
  },
  {
    name: "2階に、もうひとつの部屋を。",
    detail: "バルコニー",
    image: "/images/design/example-balcony.webp",
  },
] as const;

type Step = (typeof STEPS)[number];

function StepCard({ step }: { step: Step }) {
  const isWide = step.wide;
  return (
    <article
      className={`group relative overflow-hidden bg-text-primary border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.22)] ${
        isWide ? "md:col-span-2 aspect-[16/9] md:aspect-[8/3]" : "aspect-[4/3]"
      }`}
    >
      <Image
        src={step.image}
        alt={step.alt}
        fill
        className="object-cover opacity-80 transition-[transform,opacity] duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-95 group-hover:scale-[1.04]"
        sizes={
          isWide
            ? "(max-width: 768px) 100vw, 66vw"
            : "(max-width: 768px) 100vw, 33vw"
        }
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 pointer-events-none"
      />

      <div className="relative h-full flex flex-col p-6 md:p-8">
        <span
          className="font-oswald text-white/75 leading-[0.85] tabular-nums"
          style={{
            fontWeight: 300,
            fontSize: isWide ? "clamp(64px,7vw,110px)" : "clamp(48px,5vw,80px)",
            letterSpacing: "-0.02em",
          }}
        >
          {step.num}
        </span>

        <div className="mt-auto max-w-[42ch]">
          <h3
            className="font-shippori text-white leading-[1.3] tracking-[0.01em]"
            style={{
              fontWeight: 700,
              fontSize: isWide
                ? "clamp(20px,2vw,28px)"
                : "clamp(16px,1.4vw,20px)",
            }}
          >
            {step.title}
          </h3>
          <p
            className="font-shippori text-white/80 mt-3 leading-[1.85]"
            style={{
              fontSize: isWide
                ? "clamp(14px,1.05vw,16px)"
                : "clamp(12px,0.9vw,14px)",
            }}
          >
            {step.body}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function FreedomOfDesign() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="design"
      ref={ref}
      className="relative overflow-hidden bg-[#FAF8F3] text-text-primary py-[var(--section-py)] scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        {/* ================= HEADER (非対称・Mechanism/Zero/Price/Standard 継承) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end mb-16 md:mb-24">
          <div>
            <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
              Freedom of Design
            </p>
            <h2
              className="font-shippori text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                fontSize: "clamp(44px, 8vw, 120px)",
              }}
            >
              設計は、自由。
              <br />
              土地の条件の中で。
            </h2>
          </div>
          <aside className="lg:pt-4">
            <div className="border-t-[3px] border-text-primary pt-6">
              <p className="font-shippori font-bold text-[clamp(22px,2.2vw,32px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                「できる／できない」を先に。
              </p>
              <p className="mt-5 md:mt-6 font-shippori font-medium text-[clamp(17px,1.5vw,22px)] leading-[1.8] max-w-[480px] text-text-primary/90">
                条件を並べてから、
                <br />
                設計は、ちゃんと自由になります。
              </p>
            </div>
          </aside>
        </div>

        {/* ================= Bento 4 STEPS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {STEPS.map((s) => (
            <StepCard key={s.num} step={s} />
          ))}
        </div>

        {/* ================= 実例ギャラリー ================= */}
        <div className="mt-16 md:mt-24">
          <div className="flex items-baseline gap-5 mb-6 md:mb-8">
            <span
              className="font-oswald text-text-primary/80 leading-none"
              style={{
                fontWeight: 300,
                fontSize: "clamp(28px, 3vw, 44px)",
                letterSpacing: "-0.02em",
              }}
            >
              05
            </span>
            <span className="flex-1 h-px bg-text-primary/15" />
            <span
              className="font-shippori text-text-primary text-base md:text-lg tracking-[0.04em]"
              style={{ fontWeight: 500 }}
            >
              こだわりは、ここまで詰められます。
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-5">
            {EXAMPLES.map((ex) => (
              <article
                key={ex.name}
                className="group overflow-hidden bg-white border border-text-primary/10 transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-text-primary/25 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.12)]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-text-primary/5">
                  <Image
                    src={ex.image}
                    alt={ex.name}
                    fill
                    className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <p className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold mb-2">
                    {ex.detail}
                  </p>
                  <p
                    className="font-shippori text-text-primary leading-[1.45]"
                    style={{
                      fontWeight: 700,
                      fontSize: "clamp(15px, 1.1vw, 17px)",
                    }}
                  >
                    {ex.name}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ================= 注記 + CTA ================= */}
        <div className="mt-14 md:mt-20 flex flex-col gap-8 pt-10 border-t border-text-primary/15 md:flex-row md:items-end md:justify-between md:gap-12 md:pt-12">
          <p className="font-shippori max-w-[44rem] text-[11px] md:text-[12px] leading-[1.95] text-text-secondary">
            ※ 仕様やメーカーは、プランや敷地条件により変わります。
            <br />
            詳細は来場時に一覧でご案内します。
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end shrink-0">
            <CtaButton
              href="/lots"
              variant="secondary"
              size="md"
              label="土地も一緒に探す"
              sublabel="候補地から設計できます"
            />
            <CtaButton
              href="/reserve"
              variant="primary"
              size="md"
              label="設計の相談を予約"
              sublabel="初回のご相談は無料です"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
