import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import MoneyFullSection from "@/components/money/MoneyFullSection";

export const metadata: Metadata = {
  title: "資金計画 | やまと不動産 花鳥風月",
  description:
    "月々のお支払い、住宅ローンの選び方、提携FPの中立性、つなぎ融資まで。注文住宅の資金計画を、消費者目線で整理します。奈良・京都の注文住宅 やまと不動産。",
};

/*
  /money — 資金計画ページ（2026-04-22 v2）
  v1(serif多用) → v2: TOPと地続きの編集誌的ゴシック秩序に統一
    - 和文: 全て Noto Sans JP(default sans)
    - 数字: font-oswald
    - 欧文ラベル: font-inter UPPERCASE
    - PriceSection と同じ非対称グリッド(1.4fr:1fr / border-t-[3px])
*/
export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      <main>
        {/* === ヒーロー(編集誌的・非対称) === */}
        <section className="relative overflow-hidden bg-[#FAF8F3]">
          {/* 背景イメージ(薄く敷く) */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <Image
              src="/images/newsozai/interior-ldk-01.webp"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{
                opacity: 0.16,
                filter: "saturate(0.85) brightness(1.06)",
              }}
            />
            <div className="absolute inset-0 bg-[#FAF8F3]/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F3]/35 via-transparent to-[#FAF8F3]/75" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] pt-[clamp(64px,calc(32px+5vw),160px)] pb-[clamp(80px,calc(40px+6vw),200px)]">
            {/* Page label */}
            <div className="flex items-center justify-between border-b border-text-primary/15 pb-6 mb-12 md:mb-20">
              <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-primary font-bold">
                Financial Plan
              </p>
              <p className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary">
                資金計画 / Money &amp; Loan
              </p>
            </div>

            {/* Asymmetric headline: 1.4fr : 1fr */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end">
              <div>
                <h1
                  className="text-text-primary leading-[1.05] tracking-[-0.02em]"
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(40px, 7.6vw, 124px)",
                  }}
                >
                  払えなくなる家を、
                  <br />
                  僕らはお売りしません。
                </h1>
              </div>

              <aside className="lg:pt-4">
                <div className="border-t-[3px] border-text-primary pt-6">
                  <p className="text-text-primary font-medium text-[clamp(18px,1.9vw,26px)] leading-[1.55] tracking-[0.02em] max-w-[480px]">
                    月々のお支払い、ローン、<br />提携FPの中立性まで。
                  </p>
                  <p className="mt-5 text-[clamp(14px,1vw,16px)] leading-[1.95] text-text-secondary max-w-[480px]">
                    家を建てる前に整理しておきたいお金の話を、ご家族の暮らしを軸にほどいてまいります。
                    初回ご相談・事前審査は無料、しつこい営業もいたしません。
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <CtaButton
                      href="/reserve"
                      variant="primary"
                      size="md"
                      label="初回相談を予約する"
                      sublabel="ご相談・事前審査は無料"
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
              </aside>
            </div>
          </div>
        </section>

        {/* === 本文(8セクション) === */}
        <MoneyFullSection />

        {/* === 締めCTA === */}
        <section className="relative bg-bg-primary py-[clamp(80px,8vw,160px)]">
          <div className="max-w-[840px] mx-auto px-[var(--page-px)] text-center">
            <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-8 font-bold">
              Take the first step
            </p>
            <p
              className="text-text-primary text-[clamp(24px,3.4vw,44px)] leading-[1.4] tracking-[-0.01em]"
              style={{ fontWeight: 500 }}
            >
              気になる点を、まずはひとつ。
            </p>
            <p className="mt-6 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[540px] mx-auto">
              ご来店でも、メッセージでも、どちらでも構いません。<br className="hidden md:block" />
              「今は建てない」とお決めになっても、それで構いません。
            </p>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="初回相談を予約する"
                sublabel="ご相談・事前審査は無料"
                icon="calendar"
              />
              <CtaButton
                href="/contact"
                variant="secondary"
                size="md"
                label="まずは質問だけ"
                sublabel="メッセージで気軽にどうぞ"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
