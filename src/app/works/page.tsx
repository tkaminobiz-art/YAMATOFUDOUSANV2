import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import WorksFullList from "@/components/works/WorksFullList";
import { TOTAL_WORKS_COUNT } from "@/data/works";

const FOREST = "#486B00";
const ACCENT = "#A2C523";

export const metadata: Metadata = {
  title: "施工事例 | やまと不動産 花鳥風月",
  description:
    "奈良・京都で建てた花鳥風月の施工事例。ご家族ごとの課題と、設計で工夫したポイントをご紹介しています。",
};

export default function WorksIndexPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* === Photo-led Editorial Soft Hero (2026-05-03 全ページ統一) === */}
        <section className="relative w-full overflow-hidden bg-white">
          <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
            <Image
              src="/images/newsozai/exterior-miyamaki-front.webp"
              alt="やまとが建てた家の外観"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{ filter: "saturate(0.96) contrast(1.02)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.78) 35%, rgba(255,255,255,0.20) 65%, transparent 95%)",
              }}
            />

            <div className="absolute inset-0 flex items-end md:items-center">
              <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] pb-10 md:pb-0 w-full">
                <div className="max-w-[640px]">
                  <p
                    className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase mb-5"
                    style={{ color: FOREST, fontWeight: 600 }}
                  >
                    施工事例 · Works
                  </p>

                  <h1
                    className="text-text-primary leading-[1.25] tracking-[-0.005em] mb-7"
                    style={{
                      fontWeight: 500,
                      fontSize: "clamp(28px, 4vw, 52px)",
                    }}
                  >
                    人の数だけ、暮らしがある。
                  </h1>

                  <div className="flex items-baseline gap-2 mb-6">
                    <span
                      className="tabular-nums leading-none"
                      style={{
                        fontFamily: "var(--font-oswald)",
                        fontWeight: 300,
                        fontSize: "clamp(64px, 9vw, 128px)",
                        color: ACCENT,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {TOTAL_WORKS_COUNT}
                    </span>
                    <span
                      className="text-text-primary text-[14px] md:text-[18px] font-medium leading-none ml-1.5 self-end pb-1 md:pb-2.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      件の事例
                    </span>
                  </div>

                  <p className="text-text-primary/85 text-[13px] md:text-[15px] leading-[1.95] mb-8 max-w-[520px]">
                    やまとが実際に建てたご家族の家。ご相談時の悩み、設計で工夫したこと、住んでからの感想まで、できるだけそのまま、ご紹介しています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 一覧 === */}
        <section className="bg-white py-[var(--section-py)]">
          <WorksFullList />
        </section>

        {/* === 締めCTA === */}
        <section className="bg-white border-t border-border py-[clamp(64px,7vw,140px)]">
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
                label="モデルハウス見学"
                sublabel="ご予約なしでも見学可・無料"
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
