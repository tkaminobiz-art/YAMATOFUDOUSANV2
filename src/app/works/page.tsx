import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import WorksFullList from "@/components/works/WorksFullList";
import { TOTAL_WORKS_COUNT } from "@/data/works";

export const metadata: Metadata = {
  title: "施工事例 | やまと不動産 花鳥風月",
  description:
    "奈良・京都で建てた花鳥風月の施工事例。各ご家族の課題と、設計での工夫、お住まいの感想までそのまま掲載しています。",
};

export default function WorksIndexPage() {
  return (
    <>
      <Header />
      <main>
        {/* === ヘッダー === */}
        <section className="bg-bg-warm py-[clamp(64px,calc(32px+5vw),160px)]">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              WORKS
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div className="max-w-[720px]">
                <h1 className="text-[clamp(28px,4vw,56px)] text-text-primary mb-4 font-light leading-[1.4]">
                  実際にお建てしたお家を、
                  <br className="md:hidden" />
                  ご覧ください。
                </h1>
                <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9]">
                  各ご家族の暮らしから生まれた家づくりです。お悩み、設計の工夫、お住まいいただいた感想までそのまま掲載しています。
                </p>
              </div>
              <div
                className="text-right"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span className="text-accent font-light text-6xl md:text-8xl block leading-none">
                  {TOTAL_WORKS_COUNT}
                </span>
                <span className="text-text-secondary text-xs md:text-sm">
                  件の事例
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* === 一覧 === */}
        <section className="bg-bg-primary py-[var(--section-py)]">
          <WorksFullList />
        </section>

        {/* === 締めCTA === */}
        <section className="bg-bg-warm py-[clamp(48px,6vw,120px)]">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <p className="text-text-primary text-base md:text-lg leading-[1.9] mb-8">
              ご家族の暮らしから、家づくりは始まります。
              <br />
              まずはモデルハウスで、お話を聞かせてください。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="来場予約"
                sublabel="ご予約不要・無料"
              />
              <CtaButton
                href="/contact"
                variant="secondary"
                size="md"
                label="資料請求"
                sublabel="無料・1分で完了"
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
