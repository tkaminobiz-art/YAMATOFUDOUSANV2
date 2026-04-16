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
  - 数字で脅かさない（月々◯万円の硬いシミュレーションは前面に出さない）
  - FP相談・つなぎ融資なし・「きっと建てられる」の3本柱
  - 「気軽に相談して」のハードル下げが決定打

  配置：Price（料金目安）の直後。
  「価格 → じゃあ払えるか → お金の相談で受け止める」という流れ。

  ファクトチェック（2026-04-15 神野さん確認済み）:
  - ファイナンシャルプランナー → 提携している（外部FPと連携）
  - 「つなぎ融資がない」→ 通常は土地購入資金を先行で借りるため、建物完成までの
    「つなぎ融資」（金利高め・手数料10万円〜・印紙代）が必要。
    やまとは土地も建物も自社で扱うため、そのコストが発生しない。
  - 「きっと建てられます」→ 宣伝文句として使用（具体事例での裏付けはなし）
*/

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "提携FPと一緒に、無理のない予算を整理",
    body: "家計と将来設計を踏まえて、「払える範囲」を先に決めます。",
  },
  {
    icon: Link2Off,
    title: "つなぎ融資の負担が出にくい仕組み",
    body: "土地と建物をまとめて進められるので、余計な金融コストを避けられるケースがあります。",
  },
  {
    icon: Calculator,
    title: "月々の支払いがきつくならない計画に",
    body: "「通るか」より先に「続くか」。生活を圧迫しない設計にします。",
  },
] as const;

const MONEY_HERO = {
  src: "/images/newsozai/interior-ldk-01.webp",
  alt: "内観 LDK — 暮らしの安心感",
} as const;

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
    <section id="money-talk" className="bg-bg-warm py-[var(--section-py)]">
      <div
        ref={ref}
        className="mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in"
      >
        <SectionHeaderCentered
          label="MONEY TALK"
          ghostText="MONEY"
          title="お金の話は、先に整える。"
          lead="「払っていけるかな」「ローン通るかな」。その不安は、家づくりの最初に一度だけ整理すれば大丈夫です。"
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
                  相談は無料です
                </p>
                <p
                  className="mt-2 text-[clamp(16px,1.8vw,22px)] font-semibold leading-[1.6] tracking-[0.05em] text-text-primary"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  数字で脅かす相談はしません。
                </p>
                <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary md:text-[14px]">
                  まずは「いくらなら安心か」を一緒に決めて、そこからプランを組み立てます。
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

        {/* 3つの柱（補足）：縦リズムで読みやすく */}
        <div className="mt-12 md:mt-16">
          <div className="rounded-2xl border border-border bg-bg-primary p-6 md:p-8">
            <p className="text-xs font-semibold tracking-[0.14em] text-main">
              相談の中身（要点）
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className="rounded-xl border border-border/80 bg-bg-secondary/60 p-5">
                    <div className="flex items-start gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main">
                        <Icon className="h-5 w-5" strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-snug text-text-primary">
                          {p.title}
                        </p>
                        <p className="mt-2 text-[13px] leading-[1.85] text-text-secondary">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
