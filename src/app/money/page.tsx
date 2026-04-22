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
  /money — 資金計画ページ（2026-04-22 リニューアル）
  ヘッダー → MoneyFullSection(8セクション) → 締めCTA。
  ヒーローは「払えなくなる家を、僕らはお売りしません。」で
  損失回避×やまとの誠実トーン(一人称「僕」) を冒頭に置く。
*/
export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      <main>
        {/* === ヒーロー === */}
        <section className="relative overflow-hidden bg-bg-warm">
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
                opacity: 0.18,
                filter: "saturate(0.85) brightness(1.05)",
              }}
            />
            <div className="absolute inset-0 bg-bg-warm/55" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg-warm/30 via-transparent to-bg-warm/70" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] py-[clamp(80px,calc(40px+6vw),200px)]">
            <p className="font-section-label text-main text-xs md:text-sm mb-4 tracking-[0.18em]">
              FINANCIAL PLAN — 資金計画
            </p>
            <div className="max-w-[820px]">
              <h1
                className="text-[clamp(30px,4.6vw,64px)] text-text-primary mb-6 font-light leading-[1.4] tracking-[0.04em]"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                払えなくなる家を、
                <br />
                僕らはお売りしません。
              </h1>
              <p className="text-text-secondary text-[clamp(15px,1.15vw,18px)] leading-[1.95] max-w-[680px]">
                月々のお支払い、住宅ローンの組み方、提携FPの中立性、つなぎ融資まで。
                家を建てる前に整理しておきたいお金の話を、ご家族の暮らしを軸に、ご一緒にほどいてまいります。
                初回ご相談・事前審査は無料、しつこい営業もいたしません。
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
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
          </div>
        </section>

        {/* === 本文(8セクション) === */}
        <MoneyFullSection />

        {/* === 締めCTA === */}
        <section className="bg-bg-primary py-[clamp(64px,7vw,140px)]">
          <div className="max-w-[720px] mx-auto px-[var(--page-px)] text-center">
            <p
              className="text-text-primary text-[clamp(18px,2vw,26px)] leading-[1.7] mb-3 font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              気になる点を、まずはひとつ。
            </p>
            <p className="text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.9] mb-10">
              ご来店でも、メッセージでも、どちらでも構いません。
              <br className="md:hidden" />
              「今は建てない」とお決めになっても、それで構いません。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
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
