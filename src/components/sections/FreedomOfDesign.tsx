"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";
import CtaButton from "@/components/ui/CtaButton";

const STEPS = [
  {
    num: "01",
    title: "土地の条件を、設計の言葉に翻訳する",
    body: "採光・道路・高低差。制約を先にほどき、「できる形」を一緒に見つけます。",
    image: "/images/design/step-01-meeting.webp",
    alt: "設計士と夫婦が打ち合わせしている様子",
  },
  {
    num: "02",
    title: "暮らしの優先順位を、図面に落とし込む",
    body: "家事動線、収納、将来の部屋。迷いが減るまで、図面を磨いていきます。",
    image: "/images/design/step-02-drawing.webp",
    alt: "手描きの間取り図",
  },
  {
    num: "03",
    title: "実物を見ながら、仕様を決める",
    body: "外壁、床、キッチン、浴室。写真では分からない差を、体感で揃えます。",
    image: "/images/design/step-03-modelhouse.webp",
    alt: "モデルハウスのキッチンとリビング",
  },
  {
    num: "04",
    title: "最後は、暮らしの“クセ”まで合わせる",
    body: "コンセントや照明、窓の高さ。日々の動きに合わせて整えます。",
    image: "/images/design/step-04-finished.webp",
    alt: "完成したキッチンとダイニング",
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

export default function FreedomOfDesign() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="design" className="relative overflow-hidden bg-bg-primary py-[var(--section-py)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_10%_-10%,rgba(90,138,74,0.10),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.34]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(43,43,43,0.015), rgba(43,43,43,0.015) 1px, transparent 1px, transparent 28px)",
        }}
      />
      <div
        ref={sectionRef}
        className="relative max-w-[1240px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <SectionHeaderCentered
          label="FREEDOM OF DESIGN"
          ghostText="DESIGN"
          title="自由設計は、制約をほどくところから。"
          lead="土地には、採光・道路・高さなどの条件があります。その条件を読み替えて、ご家族の暮らしに合う形へ。設計の自由度を、現実の中で組み立てます。"
          align="left"
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* 左：扉（短い宣言＋CTA） */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] self-start">
            <div className="rounded-2xl border border-border bg-bg-secondary/60 p-6 md:p-7">
              <p
                className="text-[10px] font-semibold tracking-[0.26em] text-text-secondary"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                HOW WE DESIGN
              </p>
              <p
                className="mt-4 text-[clamp(18px,2.1vw,26px)] font-semibold leading-[1.65] tracking-[0.05em] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                「できる／できない」を先に並べると、
                <br />
                設計は、ちゃんと自由になります。
              </p>
              <p className="mt-4 text-[13px] leading-[1.95] text-text-secondary md:text-[14px]">
                土地が決まっている方は、その条件に合わせて。これから探す方は、候補地と一緒に。設計士が初回から同席し、判断の筋道をそろえます。
              </p>

              <div className="mt-6 border-y border-border py-5">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">
                  このセクションで分かること
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-text-secondary">
                  {[
                    "土地条件を前提に、間取りの“打ち手”を整理します。",
                    "仕様は実物を見ながら決めるので、納得が早くなります。",
                    "暮らしの優先順位を決めると、迷いが減ります。",
                  ].map((t) => (
                    <li key={t} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-main" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-7 flex flex-col gap-3">
                <CtaButton
                  href="/reserve"
                  variant="primary"
                  size="md"
                  label="設計の相談を予約する"
                  sublabel="初回のご相談は無料です"
                  icon="calendar"
                />
                <CtaButton
                  href="/lots"
                  variant="secondary"
                  size="md"
                  label="土地も一緒に探す"
                  sublabel="候補地から設計できます"
                />
              </div>
            </div>
          </div>

          {/* 右：体験パネル（進め方→実例） */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-bg-primary shadow-[0_18px_52px_-28px_rgba(43,43,43,0.14)]">
              <div className="border-b border-border px-6 py-6 md:px-8">
                <p className="text-xs font-semibold tracking-[0.14em] text-text-secondary">
                  進め方
                </p>
                <p
                  className="mt-3 text-[clamp(18px,2vw,24px)] font-semibold tracking-[0.05em] text-text-primary"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  図面が固まるまでの流れ
                </p>
              </div>

              <div className="px-6 py-6 md:px-8 md:py-8">
                <div className="space-y-6">
                  {STEPS.map((s) => (
                    <div key={s.num} className="grid grid-cols-1 gap-5 md:grid-cols-[160px_1fr] md:items-start">
                      <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-border bg-bg-secondary/60">
                        <Image
                          src={s.image}
                          alt={s.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 240px"
                        />
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                        />
                        <span
                          className="absolute left-3 top-3 inline-flex h-8 w-10 items-center justify-center rounded-full border border-white/18 bg-black/40 text-[11px] font-semibold tracking-[0.12em] text-white"
                          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                        >
                          {s.num}
                        </span>
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-text-primary md:text-base">
                          {s.title}
                        </p>
                        <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary md:text-[14px]">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-border bg-bg-primary px-6 py-6 shadow-sm md:px-8 md:py-8">
              <p className="text-xs font-semibold tracking-[0.14em] text-text-secondary">
                実例
              </p>
              <p
                className="mt-3 text-[clamp(18px,2vw,24px)] font-semibold tracking-[0.05em] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                こだわりは、ここまで詰められます
              </p>

              <div className="mt-6 grid grid-cols-1 gap-[var(--card-gap)] md:grid-cols-3">
                {EXAMPLES.map((ex) => (
                  <div key={ex.name}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-bg-secondary/60">
                      <Image
                        src={ex.image}
                        alt={ex.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                      />
                    </div>
                    <p className="mt-3 text-sm font-semibold text-text-primary">
                      {ex.name}
                    </p>
                    <p className="mt-1 text-xs tracking-wider text-accent">
                      {ex.detail}
                    </p>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[11px] leading-relaxed text-text-secondary">
                ※ 仕様やメーカーは、プランや敷地条件により変わります。詳細は来場時に一覧でご案内します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
