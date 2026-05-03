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
    "奈良・京都で建てた花鳥風月の施工事例。ご家族ごとの課題と、設計で工夫したポイントをご紹介しています。",
};

export default function WorksIndexPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* === Editorial Black Hero (2026-05-03 /lots /money と統一) === */}
        <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] py-[clamp(80px,12vw,200px)]">
            <div className="flex items-center gap-3 mb-12 md:mb-20 text-[11px] md:text-[12px] tracking-[0.22em] uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#A2C523" }}
              />
              <span style={{ color: "#A2C523", fontWeight: 600 }}>
                Works / 施工事例
              </span>
              <span className="text-white/30">·</span>
              <span className="text-white/60">奈良 · 京都南部</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-end">
              <div>
                <span
                  className="block tabular-nums leading-[0.85]"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontWeight: 200,
                    fontSize: "clamp(140px, 22vw, 320px)",
                    color: "#A2C523",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {TOTAL_WORKS_COUNT}
                </span>
                <p
                  className="mt-3 text-white/80 text-[12px] md:text-[13px] tracking-[0.16em] uppercase"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
                >
                  Featured Cases · 公開事例
                </p>
              </div>

              <div className="md:pb-8">
                <h1
                  className="text-white leading-[1.25] tracking-[-0.005em] max-w-[680px]"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(24px, 2.8vw, 40px)",
                  }}
                >
                  人の数だけ、暮らしがある。
                </h1>
                <p className="mt-5 text-white/65 text-[13px] md:text-[14px] leading-[1.95] max-w-[600px]">
                  やまとが実際に建てたご家族の家。ご相談時の悩み、設計で工夫したこと、住んでからの感想まで、できるだけそのまま、ご紹介しています。
                </p>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: "#A2C523" }}
          />
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
