import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import StaffFullDirectory from "@/components/staff/StaffFullDirectory";
import { TOTAL_PEOPLE } from "@/data/staff";

export const metadata: Metadata = {
  title: "スタッフ紹介 | やまと不動産 花鳥風月",
  description:
    "家づくりを支える、19人のスタッフです。営業・設計・工務・経営の各担当者が、それぞれの想いとともに家づくりを支えます。",
};

export default function StaffIndexPage() {
  return (
    <>
      <Header />
      <main>
        {/* === ヘッダー === */}
        <section className="bg-bg-warm py-[clamp(64px,calc(32px+5vw),160px)]">
          <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              THE TEAM
            </p>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div className="max-w-[720px]">
                <h1 className="text-[clamp(28px,4vw,56px)] text-text-primary mb-4 font-light leading-[1.4]">
                  家づくりを支える、
                  <br className="md:hidden" />
                  19人のスタッフです。
                </h1>
                <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9]">
                  営業・設計・工務・経営。それぞれの手が重なって、一軒の家になります。
                  <br />
                  家づくりで大切にしていること、そしてお客様への向き合い方を一人ひとりの言葉で紹介します。
                </p>
              </div>
              <div
                className="text-right"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span className="text-accent font-light text-6xl md:text-8xl block leading-none">
                  {TOTAL_PEOPLE}
                </span>
                <span className="text-text-secondary text-xs md:text-sm">
                  人で、家づくりを支えます
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* === スタッフ一覧(17人 + 代表2名) === */}
        <section className="bg-bg-primary">
          <StaffFullDirectory />
        </section>

        {/* === 締めCTA === */}
        <section className="bg-bg-warm py-[clamp(48px,6vw,120px)]">
          <div className="max-w-[640px] mx-auto px-[var(--page-px)] text-center">
            <p className="text-text-primary text-base md:text-lg leading-[1.9] mb-8">
              この十九人に、まず会いに来てください。
              <br />
              話を聞くだけでも、構いません。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="モデルハウス見学"
                sublabel="予約不要・無料でOK"
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
