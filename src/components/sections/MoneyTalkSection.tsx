"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import Image from "next/image";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";
import {
  Calculator,
  Link2Off,
  HeartHandshake,
  Check,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";

/*
  お金の相談セクション
  2026-04-15 神野さんの方針：
  - 畳みかけない（結論を急がず、要点から）
  - 提携FPと一緒に「払える範囲」を先に整える
  - 土地と建物をセットで進められることによる、つなぎ融資コストの抑制余地（断定しない）
  - 「気軽に相談して」のハードル下げが決定打

  配置：Price（料金目安）の直後。
  「価格 → じゃあ払えるか → お金の相談で受け止める」という流れ。

  ファクトチェック（2026-04-15 神野さん確認済み）:
  - ファイナンシャルプランナー → 提携している（外部FPと連携）
  - つなぎ融資 → 土地を先行で購入する流れでは発生しやすい。
    やまとは土地と建物をまとめて進められるため、条件次第で負担を抑えられるケースがある。
  - 「きっと建てられます」→ 宣伝文句として使用（具体事例での裏付けはなし）
*/

const MONEY_HERO = {
  src: "/images/newsozai/interior-ldk-01.webp",
  alt: "内観 LDK — 暮らしの安心感",
} as const;

const MONEY_DETAIL = {
  src: "/images/newsozai/interior-window-detail-01.webp",
  alt: "内観 ディテール — 素材の質感",
} as const;

const FLOW_STEPS = [
  {
    k: "01",
    title: "家計の枠を決める",
    body: "収入・支出・将来の大きな出費を整理して、「無理のない月々」を先に決めます。",
    Icon: HeartHandshake,
  },
  {
    k: "02",
    title: "土地と建物の全体像をつなぐ",
    body: "土地代・諸費用・建物の目安を一枚に並べて、抜け漏れがないか確認します。",
    Icon: Link2Off,
  },
  {
    k: "03",
    title: "返済が続く計画にする",
    body: "審査の可否より先に、「暮らしが続くか」を基準に返済の形を一緒に考えます。",
    Icon: Calculator,
  },
] as const;

function Pill({
  Icon,
  label,
}: {
  Icon: LucideIcon;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary/80 px-3 py-1 text-[11px] font-semibold text-text-secondary">
      <Icon className="h-4 w-4 text-main" strokeWidth={2.1} />
      {label}
    </span>
  );
}

export default function MoneyTalkSection() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section id="money-talk" className="relative overflow-hidden bg-bg-warm py-[var(--section-py)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_18%_-10%,rgba(196,112,63,0.12),transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(43,43,43,0.015), rgba(43,43,43,0.015) 1px, transparent 1px, transparent 28px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />
      <div
        ref={ref}
        className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in"
      >
        <SectionHeaderCentered
          label="MONEY TALK"
          ghostText="MONEY"
          title="お金の不安、先に解消しませんか。"
          lead="「払っていけるかな」「ローンは通るかな」。その不安は、最初に一度整理しておくと安心です。"
          align="left"
          className="mb-10 md:mb-12"
        />

        {/* 入口：写真＋相談メモ（テンプレ3カードをやめる） */}
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
                  専門用語だけで畳みかけることはありません。
                </p>
                <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary md:text-[14px]">
                  いま気になっているところから始めて、月々の支払いの感触と、土地・建物・諸費用の全体像が見えるところまで、順を追って一緒に整えます。
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
                相談で確認するのは、3つだけです。
              </p>

              <ol className="mt-6 space-y-4">
                {[
                  { k: "01", t: "月々、無理のない支払い", d: "生活費・教育費を削らない範囲を決めます。" },
                  { k: "02", t: "土地と建物の全体像", d: "「別途がどれくらい出るか」を整理します。" },
                  { k: "03", t: "今の条件で進められる段取り", d: "不安が残るところだけ、先に潰します。" },
                ].map((x) => (
                  <li key={x.k} className="grid grid-cols-[auto_1fr] gap-x-4">
                    <span className="mt-0.5 inline-flex h-7 w-10 items-center justify-center rounded-full border border-border bg-bg-secondary/70 text-[11px] font-semibold tracking-[0.12em] text-text-primary">
                      {x.k}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text-primary">
                        {x.t}
                      </p>
                      <p className="mt-1 text-[13px] leading-[1.85] text-text-secondary">
                        {x.d}
                      </p>
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

        {/* 編集の見開き：上の「3つ」と重複しない“進行”の提示 */}
        <div className="mt-12 md:mt-16">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-[0.14em] text-main">
                はじめての方へ
              </p>
              <p
                className="mt-4 text-[clamp(22px,2.6vw,34px)] font-semibold leading-[1.45] tracking-[0.05em] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                資料がそろっていなくて大丈夫です。
              </p>
              <p className="mt-4 text-[13px] leading-[1.95] text-text-secondary md:text-[14px]">
                初回は、不安の輪郭を一緒に確かめる時間にしてください。図面や金融の細部は、必要になった段階で少しずつご案内します。
              </p>

              <div className="mt-6 rounded-2xl border border-border bg-bg-primary p-5 shadow-sm">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">
                  つなぎ融資について
                </p>
                <p className="mt-3 text-[13px] leading-[1.95] text-text-secondary">
                  土地だけを先に購入し、あとから建物資金につなぐ場合、工事までのあいだに「つなぎ融資」が入ることがあり、利息や手数料が上乗せされることがあります。
                </p>
                <p className="mt-3 text-[13px] leading-[1.95] text-text-secondary">
                  土地と建物をまとめて進められると、段取りによってはそのコストをかけずに済むこともあります。内容は金融機関の条件や案件ごとに異なります。
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-primary shadow-[0_18px_52px_-28px_rgba(43,43,43,0.14)]">
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-main via-main/70 to-main/25" aria-hidden />

                <div className="p-6 pl-7 md:p-8 md:pl-9">
                  <p className="text-xs font-semibold tracking-[0.14em] text-text-secondary">
                    進め方（60分の目安）
                  </p>

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
                                <p className="text-sm font-semibold leading-snug text-text-primary">
                                  {s.title}
                                </p>
                                <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary">
                                  {s.body}
                                </p>
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
                  数字の前に、暮らしの質感。ここからは「続くかどうか」を一緒に見ていきます。
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
