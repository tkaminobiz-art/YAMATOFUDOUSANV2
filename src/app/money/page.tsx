import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import MoneyFullSection from "@/components/money/MoneyFullSection";
import MoneyJumpNav from "@/components/money/MoneyJumpNav";

export const metadata: Metadata = {
  title: "資金計画 | やまと不動産 花鳥風月",
  description:
    "月々のお支払い、住宅ローンの選び方、提携FPの中立性、つなぎ融資まで。注文住宅の資金計画を、消費者目線で整理します。奈良・京都の注文住宅 やまと不動産。",
};

/*
  /money — 資金計画ページ（2026-04-22 v3）
  v2(編集誌的硬派) → v3: 5人デザイナー会議の総意
    - シビアな数字を、暮らしの言葉で噛み砕く
    - 写真を呼吸として2-3箇所挟む
    - 章タイトルを「質問」起点に(宣言→疑問形)
    - 月々シミュレーションは「想定モデル」を主役に
    - FPは黒の正直さ→温かい光の信頼へ
    - ジャンプナビ追加(章間の移動を快適に)
*/
export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      <main>
        {/* === ヒーロー — 写真主役の暖かいオープナー === */}
        <section className="relative overflow-hidden bg-text-primary">
          {/* 背景写真 */}
          <div aria-hidden className="absolute inset-0">
            <Image
              src="/images/newsozai/interior-ldk-01.webp"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{
                filter: "saturate(0.92) contrast(1.05) brightness(0.85)",
              }}
            />
            {/* 下方向グラデで本文視認性を確保 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-black/15" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] pt-[clamp(80px,calc(40px+6vw),200px)] pb-[clamp(80px,calc(40px+6vw),200px)]">
            {/* Page label */}
            <div className="flex items-center justify-between mb-12 md:mb-20">
              <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-white/85 font-bold">
                Financial Plan
              </p>
              <p className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-white/55">
                資金計画 / Money &amp; Loan
              </p>
            </div>

            {/* Headline + anchor stat */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-20 items-end">
              <div>
                <h1
                  className="text-white leading-[1.05] tracking-[-0.02em]"
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(40px, 7vw, 112px)",
                    textShadow: "0 3px 24px rgba(0,0,0,0.45)",
                  }}
                >
                  数字より先に、
                  <br />
                  暮らしから。
                </h1>
                <p className="mt-8 max-w-[560px] text-white/85 text-[clamp(15px,1.2vw,18px)] leading-[1.95]">
                  月々のお支払い、住宅ローン、提携FPの中立性まで。
                  家を建てる前に整理しておきたいお金の話を、ご家族の暮らしを軸に、ご一緒にほどいてまいります。
                </p>
              </div>

              {/* Anchor stat box */}
              <aside className="lg:pt-4">
                <div className="border-t-[3px] border-white pt-6">
                  <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-white/70 font-bold">
                    Model · 30代ご夫婦+お子様1人 / 年収500万円
                  </p>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-white text-sm font-medium">月々</span>
                    <span
                      className="font-oswald tabular-nums leading-[0.85] text-white"
                      style={{
                        fontWeight: 300,
                        fontSize: "clamp(64px, 8vw, 120px)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      7.1
                    </span>
                    <span className="text-white text-xl md:text-2xl font-medium">万円</span>
                  </div>
                  <p className="mt-2 text-[12px] text-white/70 leading-[1.7]">
                    から建てられる暮らしの目安。<br />
                    ご家族の状況に合わせて、ご一緒に整えます。
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <CtaButton
                      href="/reserve"
                      variant="dark-bg-primary"
                      size="md"
                      label="初回相談を予約"
                      sublabel="ご相談・事前審査は無料"
                      icon="calendar"
                    />
                    <CtaButton
                      href="#ch-monthly"
                      variant="dark-bg-secondary"
                      size="md"
                      label="月々の目安を見る"
                      sublabel="想定モデルへ"
                    />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* === ジャンプナビ(sticky) === */}
        <MoneyJumpNav />

        {/* === 本文(8章) === */}
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
              ご来店でも、メッセージでも、どちらでも構いません。
              <br className="hidden md:block" />
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
