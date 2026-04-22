"use client";

import Link from "next/link";
import { ShieldCheck, Check } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  MoneyTalkSection — 2026-04-20 teaser 化
  Hero/3つの確認/フロー/つなぎ融資 等の詳細は /money に移管。
  TOP では「お金の不安は別途整理できる」というシグナルだけ届ける。
*/

export default function MoneyTalkSection() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section id="money-talk" className="relative overflow-hidden bg-bg-warm py-[var(--section-py)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_18%_-10%,rgba(125,68,39,0.10),transparent_62%)]"
      />
      <div
        ref={ref}
        className="relative mx-auto max-w-[900px] px-[var(--page-px)] scroll-in text-center"
      >
        <p className="font-section-label text-main text-xs md:text-sm mb-4 tracking-[0.18em]">
          MONEY TALK
        </p>
        <h2
          className="text-[clamp(24px,3.2vw,40px)] text-text-primary leading-[1.45] tracking-[0.04em] mb-6 font-light"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          お金の話は、
          <br className="md:hidden" />
          先に整理します。
        </h2>
        <p className="text-text-secondary text-[clamp(14px,1vw,16px)] leading-[1.95] mb-8 max-w-[640px] mx-auto">
          「払っていけるかな」「ローンは通るかな」。
          月々の支払いと全体像と段取り、3つを確認していただきます。
          <br />
          初回のご相談は、無料です。しつこい営業は、しません。
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary/80 px-3 py-1 text-[11px] font-semibold text-text-secondary">
            <ShieldCheck className="h-4 w-4 text-main" strokeWidth={2.1} />
            無料
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary/80 px-3 py-1 text-[11px] font-semibold text-text-secondary">
            <Check className="h-4 w-4 text-main" strokeWidth={2.1} />
            しつこい営業なし
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-primary/80 px-3 py-1 text-[11px] font-semibold text-text-secondary">
            <Check className="h-4 w-4 text-main" strokeWidth={2.1} />
            提携FP連携
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            href="/money"
            className="group relative inline-flex items-center gap-3 min-h-[48px] px-7 py-3 text-sm md:text-base font-medium border border-text-primary text-text-primary rounded transition-colors duration-[400ms] hover:text-white overflow-hidden"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-text-primary transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
            />
            <span className="relative">お金の話を詳しく見る</span>
            <span
              aria-hidden
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>

          <CtaButton
            href="/reserve"
            variant="primary"
            size="md"
            label="お金の相談を予約"
            sublabel="ご相談・事前審査は無料"
            icon="calendar"
          />
        </div>
      </div>
    </section>
  );
}
