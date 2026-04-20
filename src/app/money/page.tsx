import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import MoneyFullSection from "@/components/money/MoneyFullSection";

export const metadata: Metadata = {
  title: "お金のお話 | やまと不動産 花鳥風月",
  description:
    "「払っていけるかな」「ローンは通るかな」。住宅資金の不安を整理する初回相談から、つなぎ融資の考え方まで、はじめての方へ。",
};

export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      <main>
        {/* === ヘッダー === */}
        <section className="bg-bg-warm py-[clamp(64px,calc(32px+5vw),160px)]">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              MONEY TALK
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div className="max-w-[720px]">
                <h1 className="text-[clamp(28px,4vw,56px)] text-text-primary mb-4 font-light leading-[1.4]">
                  お金の不安は、
                  <br className="md:hidden" />
                  先にほどいておきませんか。
                </h1>
                <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9]">
                  「払っていけるかな」「ローンは通るかな」。家を建てる前に、ご一緒に整理しておくと安心です。提携FPと連携した初回相談は無料、しつこい営業もいたしません。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* === 本文 === */}
        <MoneyFullSection />

        {/* === 締めCTA === */}
        <section className="bg-bg-primary py-[clamp(48px,6vw,120px)]">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <p className="text-text-primary text-base md:text-lg leading-[1.9] mb-8">
              気になる点を、まずはひとつ相談してみませんか。
              <br />
              ご来店でも、メッセージでも、どちらでも構いません。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="お金の相談を予約"
                sublabel="ご相談・事前審査は無料"
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
