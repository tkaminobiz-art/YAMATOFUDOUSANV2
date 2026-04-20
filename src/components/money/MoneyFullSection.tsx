"use client";

import Image from "next/image";
import {
  BookOpen,
  ClipboardList,
  HeartHandshake,
  Check,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";

/*
  MoneyFullSection — /money ページ用の完全版。
  TOP の MoneyTalkSection は teaser 化済み。
*/

const MONEY_HERO = {
  src: "/images/newsozai/interior-ldk-01.webp",
  alt: "内観 LDK — 暮らしの安心感",
} as const;

const MONEY_DETAIL = {
  src: "/images/newsozai/interior-kitchen-01.webp",
  alt: "内観 キッチン — 日々の暮らしの中心",
} as const;

const FLOW_STEPS = [
  {
    k: "01",
    title: "いまの暮らしと、時期のめど",
    body: "ご家族の人数や通勤・通学、引っ越しをいつ頃に考えているか。金額の前に、生活の前提をそろえます。",
    Icon: HeartHandshake,
  },
  {
    k: "02",
    title: "費用のかたちを、資料でたどる",
    body: "図や資料を見ながら、どこにいくらかかりやすいかをざっくり追います。細かい確定は、このあとの段階で進められます。",
    Icon: BookOpen,
  },
  {
    k: "03",
    title: "帰るまでに、次の一手を決める",
    body: "持ち帰り資料、家で話し合っておきたいこと、次の面談や現地のご案内など、次に何をするかをはっきりさせます。",
    Icon: ClipboardList,
  },
] as const;

function Pill({ Icon, label }: { Icon: LucideIcon; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary/80 px-3 py-1 text-[11px] font-semibold text-text-secondary">
      <Icon className="h-4 w-4 text-main" strokeWidth={2.1} />
      {label}
    </span>
  );
}

export default function MoneyFullSection() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-bg-warm py-[var(--section-py)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_18%_-10%,rgba(125,68,39,0.12),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(43,43,43,0.015), rgba(43,43,43,0.015) 1px, transparent 1px, transparent 28px)",
        }}
      />
      <div ref={ref} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
        <SectionHeaderCentered
          label="MONEY TALK"
          ghostText="MONEY"
          title="お金の不安は、先にほどいておきませんか。"
          lead="「払っていけるかな」「ローンは通るかな」。その不安は、はじめに一度整理しておくと安心です。"
          align="left"
          className="mb-10 md:mb-12"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <figure className="relative overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-[0_18px_52px_-28px_rgba(43,43,43,0.18)]">
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={MONEY_HERO.src}
                  alt={MONEY_HERO.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"
                />
              </div>
              <figcaption className="px-6 py-5 md:px-7 md:py-6">
                <p className="text-xs font-semibold tracking-[0.14em] text-text-secondary">
                  初回のご相談は無料です
                </p>
                <p
                  className="mt-2 text-[clamp(16px,1.8vw,22px)] font-semibold leading-[1.6] tracking-[0.05em] text-text-primary"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  むずかしい言葉で、急がせることはいたしません。
                </p>
                <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary md:text-[14px]">
                  いま気がかりなところから、お聞きします。月々の支払いの目安、土地・建物・諸費用の全体像まで、順を追って一つずつ整えます。
                </p>
              </figcaption>
            </figure>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-bg-primary p-6 shadow-[0_18px_52px_-28px_rgba(43,43,43,0.14)] md:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <Pill Icon={ShieldCheck} label="無料" />
                <Pill Icon={Check} label="しつこい営業なし" />
              </div>

              <p
                className="mt-5 text-[clamp(18px,2vw,24px)] font-semibold leading-[1.55] tracking-[0.05em] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                ご相談で確認するのは、3つだけです。
              </p>

              <ol className="mt-6 space-y-4">
                {[
                  { k: "01", t: "月々、無理のない支払い", d: "生活費・教育費を削らない範囲を一緒に決めます。" },
                  { k: "02", t: "土地と建物の全体像", d: "「追加でどれくらい費用が出そうか」を整理します。" },
                  { k: "03", t: "今の条件で進められる段取り", d: "気になる点から、先に整理します。" },
                ].map((x) => (
                  <li key={x.k} className="grid grid-cols-[auto_1fr] gap-x-4">
                    <span className="mt-0.5 inline-flex h-7 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary/70 text-[11px] font-semibold tracking-[0.12em] text-text-primary">
                      {x.k}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text-primary">{x.t}</p>
                      <p className="mt-1 text-[13px] leading-[1.85] text-text-secondary">{x.d}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-col gap-3">
                <CtaButton
                  href="/reserve"
                  variant="primary"
                  size="md"
                  label="お金の相談を予約する"
                  sublabel="ご相談・事前審査は無料です"
                  icon="calendar"
                />
                <CtaButton
                  href="/contact"
                  variant="secondary"
                  size="md"
                  label="まずは質問だけ"
                  sublabel="気になる点をメッセージで"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-main">はじめての方へ</p>
              <p
                className="mt-4 text-[clamp(22px,2.6vw,34px)] font-semibold leading-[1.45] tracking-[0.05em] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                資料は、お揃いでなくて構いません。
              </p>
              <p className="mt-4 text-[13px] leading-[1.95] text-text-secondary md:text-[14px]">
                初回は、気がかりなことを一つずつ整理する時間です。図面や金融の細部は、必要になった段階で少しずつお話しします。
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-bg-primary p-5 shadow-sm">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">つなぎ融資について</p>
                <p className="mt-3 text-[13px] leading-[1.95] text-text-secondary">
                  土地だけを先に購入し、あとから建物資金につなぐ場合、工事までのあいだに「つなぎ融資」が入ることがあり、利息や手数料が上乗せされることがあります。
                </p>
                <p className="mt-3 text-[13px] leading-[1.95] text-text-secondary">
                  土地と建物をまとめて進めると、段取りによってはその負担を抑えられる場合があります。内容は金融機関の条件や案件ごとに異なるため、状況に合わせてご案内します。
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-[0_18px_52px_-28px_rgba(43,43,43,0.14)]">
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-main via-main/70 to-main/25" aria-hidden />

                <div className="p-6 pl-7 md:p-8 md:pl-9">
                  <p className="text-xs font-semibold tracking-[0.14em] text-text-secondary">初回面談のながれ</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">所要時間は内容により前後します。</p>

                  <div className="mt-6 space-y-6">
                    {FLOW_STEPS.map((s) => {
                      const Icon = s.Icon;
                      return (
                        <div key={s.k} className="grid grid-cols-[auto_1fr] gap-x-4">
                          <div className="flex flex-col items-center">
                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-secondary/70 text-[11px] font-semibold tracking-[0.12em] text-text-primary">
                              {s.k}
                            </span>
                            <span className="mt-2 h-full w-px flex-1 bg-border/80" aria-hidden />
                          </div>
                          <div className="min-w-0 pb-2">
                            <div className="flex items-start gap-3">
                              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main">
                                <Icon className="h-5 w-5" strokeWidth={1.6} />
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold leading-snug text-text-primary">{s.title}</p>
                                <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary">{s.body}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <figure className="mt-6 overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-sm">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={MONEY_DETAIL.src}
                    alt={MONEY_DETAIL.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="px-5 py-4 text-[12px] leading-relaxed text-text-secondary md:px-6 md:py-5">
                  図面と仕様の先に、家計があります。月々のお支払いが、この先の暮らしをどう支えるか。ご一緒に、見てまいります。
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
