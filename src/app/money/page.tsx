import type { Metadata } from "next";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import MoneyFullSection from "@/components/money/MoneyFullSection";
import SellingPointsStrip from "@/components/money/SellingPointsStrip";

export const metadata: Metadata = {
  title: "資金計画 | やまと不動産 花鳥風月",
  description:
    "月々のお支払い、住宅ローン、つなぎ融資ゼロ円、提携FPまで。注文住宅の資金計画を、消費者目線でわかりやすく整理。奈良・京都の注文住宅 やまと不動産。",
};

const FOREST = "#486B00";

/*
  /money — 資金計画ページ v6
  v5(9章編集誌・情報詰めすぎ) → v6: 「3スクロールで要点が伝わる」構造へ
    1. Hero — 明るい写真 + 「家のお金、こわくない」
    2. BigNumbers — 3つの数字をドカン(月7.1万 / 0円 / 700万)
    3. SellingPointsStrip — 3つの売り(短く)
    4. ThirtyYearAnswer — 30年で残るもの(常に見える図解)
    5. QuestionsAccordion — 9つの質問(全て折りたたみ)
    6. FinalCTA
*/
export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      <main>
        {/* === 1. HERO — 明るく、こわくない === */}
        <section className="relative overflow-hidden bg-bg-warm">
          {/* 背景写真 — 暖かい屋外、ほぼ生のまま明るく */}
          <div aria-hidden className="absolute inset-0">
            <Image
              src="/images/newsozai/hero-day-green-exterior.webp"
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{
                filter: "saturate(0.95) brightness(0.95)",
              }}
            />
            {/* 視認性を保ちつつ、明るさを残す */}
            <div className="absolute inset-0 bg-gradient-to-r from-bg-warm/85 via-bg-warm/55 to-bg-warm/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-warm/45 via-transparent to-transparent" />
          </div>

          <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] pt-[clamp(80px,calc(40px+6vw),200px)] pb-[clamp(80px,calc(40px+6vw),200px)]">
            <p
              className="text-[12px] md:text-[13px] tracking-[0.18em] font-bold mb-8 md:mb-10"
              style={{ color: FOREST }}
            >
              資金計画
            </p>

            <h1
              className="text-text-primary leading-[1.05] tracking-[-0.02em] max-w-[860px]"
              style={{
                fontWeight: 500,
                fontSize: "clamp(40px, 7.6vw, 124px)",
              }}
            >
              家のお金、
              <br />
              こわくない。
            </h1>

            <p className="mt-8 max-w-[560px] text-text-primary/85 text-[clamp(15px,1.2vw,18px)] leading-[1.95]">
              やまとなら、月々<span className="font-bold" style={{ color: FOREST }}>7.1万円</span>から建てられます。
              <br className="hidden md:block" />
              大きな数字も、難しい言葉も、ご家族の暮らしに置き換えてお見せします。
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="無料相談を予約する"
                sublabel="ご相談・事前審査は無料"
                icon="calendar"
              />
              <CtaButton
                href="#big-numbers"
                variant="secondary"
                size="md"
                label="まず数字を見る"
                sublabel="3つの数字へ"
              />
            </div>
          </div>
        </section>

        {/* === 2. BIG NUMBERS — 3つの数字 === */}
        <section
          id="big-numbers"
          className="relative bg-bg-primary py-[clamp(64px,7vw,140px)] scroll-mt-20"
        >
          <div className="max-w-[1320px] mx-auto px-[var(--page-px)]">
            <div className="text-center mb-12 md:mb-16">
              <p
                className="text-[12px] md:text-[13px] tracking-[0.06em] font-bold mb-4"
                style={{ color: FOREST }}
              >
                3つの数字で、わかります。
              </p>
              <h2
                className="text-text-primary leading-[1.2] tracking-[-0.01em]"
                style={{ fontWeight: 500, fontSize: "clamp(24px, 3vw, 40px)" }}
              >
                やまとの資金計画は、ここから。
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/15">
              {[
                {
                  label: "月々の住宅ローン",
                  num: "7.1",
                  unit: "万円",
                  suffix: "から",
                  body: "想定モデル(30代夫婦+子1・年収500万・借入2,500万・1.0%・35年)。",
                },
                {
                  label: "つなぎ融資",
                  num: "0",
                  unit: "円",
                  suffix: "",
                  body: "やまとは土地+建物を自社一貫。一般的な30〜80万円の上乗せが、ありません。",
                },
                {
                  label: "45年後の累計差",
                  num: "約700",
                  unit: "万円",
                  suffix: "",
                  body: "同じ月8.5万円で45年。賃貸は払い続け、持家は完済済み。家計が軽くなります。",
                },
              ].map((n, i) => (
                <div key={i} className="bg-white p-7 md:p-10">
                  <p
                    className="text-[12px] md:text-[13px] tracking-[0.06em] text-text-secondary font-bold mb-5"
                  >
                    {n.label}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="font-oswald tabular-nums leading-[0.85]"
                      style={{
                        fontWeight: 300,
                        fontSize: "clamp(64px, 7.5vw, 120px)",
                        letterSpacing: "-0.04em",
                        color: FOREST,
                      }}
                    >
                      {n.num}
                    </span>
                    <span className="text-text-primary text-xl md:text-2xl font-medium">
                      {n.unit}
                    </span>
                    {n.suffix && (
                      <span className="text-text-secondary text-base ml-1">{n.suffix}</span>
                    )}
                  </div>
                  <p className="mt-5 text-[12px] md:text-[13px] leading-[1.95] text-text-secondary">
                    {n.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === 3. やまとの3つの売り === */}
        <SellingPointsStrip />

        {/* === 4. 30年で残るもの + 5. 9つの質問アコーディオン === */}
        <MoneyFullSection />

        {/* === 6. 締めCTA === */}
        <section className="relative bg-bg-primary py-[clamp(80px,8vw,160px)]">
          <div className="max-w-[840px] mx-auto px-[var(--page-px)] text-center">
            <p
              className="text-[12px] md:text-[13px] tracking-[0.18em] mb-8 font-bold"
              style={{ color: FOREST }}
            >
              はじめの一歩を、ご一緒に。
            </p>
            <p
              className="text-text-primary text-[clamp(24px,3.4vw,44px)] leading-[1.4] tracking-[-0.01em]"
              style={{ fontWeight: 500 }}
            >
              気になる点を、まずはひとつ。
            </p>
            <p className="mt-6 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[540px] mx-auto">
              ご来場でも、メッセージでも、どちらでも構いません。
              <br className="hidden md:block" />
              「今は建てない」とお決めになっても、それで構いません。
            </p>
            <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="無料相談を予約する"
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
