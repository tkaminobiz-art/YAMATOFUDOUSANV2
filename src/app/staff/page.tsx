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
    "家づくりを支えるスタッフをご紹介します。営業・設計・工務・管理が連携し、ご相談からお引き渡し後までサポートします。",
};

export default function StaffIndexPage() {
  return (
    <>
      <Header />
      <main>
        {/* === ヘッダー: Editorial Cover Type ===
            濃いダーク背景に巨大数字 + 編集誌kickerで、サイトの Full-bleed Cover 系統と統一。
            font-light の弱さを撤去し、Oswald 巨大数字でテンションを上げる。 */}
        <section className="relative overflow-hidden bg-text-primary text-white py-[clamp(80px,calc(40px+7vw),200px)]">
          {/* ノイズテクスチャでAIっぽさ回避 */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
            }}
          />
          {/* Lime ラジアル - サイト統一感 */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(at 12% 50%, rgba(162,197,35,0.16) 0%, transparent 55%), radial-gradient(at 88% 30%, rgba(162,197,35,0.08) 0%, transparent 55%)",
            }}
          />

          <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)]">
            {/* Top kicker */}
            <div className="flex items-baseline justify-between gap-6 mb-12 md:mb-16">
              <p className="font-sans font-bold text-[11px] md:text-[12px] tracking-[0.08em] text-lime">
                やまと不動産のスタッフ
              </p>
              <span aria-hidden className="hidden md:block flex-1 h-px bg-white/15" />
              <p className="hidden md:block font-sans text-[11px] tracking-[0.06em] text-white/45">
                営業 / 設計 / 工務 / 管理
              </p>
            </div>

            {/* メイン: 巨大数字 + h1 + 説明 */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 md:gap-16 lg:gap-24 items-end">
              {/* 巨大19 */}
              <div className="flex items-baseline gap-4 md:gap-5">
                <span
                  className="font-oswald tabular-nums leading-[0.78] text-lime"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(140px, 18vw, 280px)",
                    letterSpacing: "-0.05em",
                    textShadow: "0 4px 32px rgba(0,0,0,0.4)",
                  }}
                >
                  {TOTAL_PEOPLE}
                </span>
                <div className="pb-4 md:pb-6">
                  <p className="font-sans font-bold text-white text-[clamp(15px,1.3vw,20px)] leading-[1.5] whitespace-nowrap">
                    人のスタッフが、
                  </p>
                  <p className="font-sans font-bold text-white text-[clamp(15px,1.3vw,20px)] leading-[1.5] whitespace-nowrap">
                    家づくりを支えます。
                  </p>
                </div>
              </div>

              {/* h1 + 説明 */}
              <div className="md:pb-4">
                <h1
                  className="font-sans font-black text-white text-[clamp(22px,2.4vw,34px)] leading-[1.5] tracking-[0.01em] mb-5 md:mb-6"
                >
                  営業、設計、工務、管理が連携して、<br className="hidden md:inline" />
                  ご家族の家づくりを支えます。
                </h1>
                <p className="font-sans text-white/75 text-[clamp(13px,1vw,15px)] leading-[2.0] max-w-[600px]">
                  家づくりで大切にしていること、お客様への向き合い方を、一人ひとりの言葉でご紹介します。
                </p>
              </div>
            </div>

            {/* 下のメタ情報帯 */}
            <div className="mt-14 md:mt-20 pt-7 md:pt-9 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
              {[
                { label: "営業", num: "5", note: "ご相談からご契約まで" },
                { label: "設計", num: "3", note: "自社設計士" },
                { label: "工務・土木", num: "6", note: "土地造成から竣工まで" },
                { label: "経営・管理", num: "5", note: "代表2名を含む" },
              ].map((d) => (
                <div key={d.label}>
                  <p className="font-inter font-bold text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-lime mb-2">
                    {d.label}
                  </p>
                  <div className="flex items-baseline gap-1.5">
                    <span
                      className="font-oswald tabular-nums leading-none text-white"
                      style={{ fontWeight: 400, fontSize: "clamp(28px, 2.4vw, 38px)", letterSpacing: "-0.02em" }}
                    >
                      {d.num}
                    </span>
                    <span className="font-sans text-white/70 text-[11px] md:text-[12px]">
                      人
                    </span>
                  </div>
                  <p className="mt-1.5 font-sans text-white/55 text-[11px] md:text-[12px] leading-[1.6]">
                    {d.note}
                  </p>
                </div>
              ))}
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
              まだ建てるか決まっていない段階でも、大丈夫です。
              <br />
              土地のこと、費用のこと、間取りのことから、お気軽にご相談ください。
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
