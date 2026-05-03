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
const ACCENT = "#A2C523"; // LIME — やまとの売りシグナル(top stripe等で使用)

/*
  /money — 資金計画ページ v6
  v5(9章編集誌・情報詰めすぎ) → v6: 「3スクロールで要点が伝わる」構造へ
    1. Hero — 明るい写真 + 「心配を、軽く。家のお金は、ご一緒に。」(FP+やまと対句)
    2. BigNumbers — 3つの数字をドカン(月7.1万 / 0円 / 700万)
    3. SellingPointsStrip — 3つの売り(短く)
    4. ThirtyYearAnswer — 30年で残るもの(常に見える図解)
    5. QuestionsAccordion — 9つの質問(全て折りたたみ)
    6. FinalCTA

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  【フォント方針 — 固定ルール (2026-04-23)】
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  和文: ゴシック (var(--font-sans) = Noto Sans JP / 游ゴシック / Hiragino Sans)
  英字ラベル: Inter (font-inter)
  数字: Oswald (font-oswald)

  禁止: var(--font-serif) / font-shippori / "Noto Serif" / 明朝系全般
  /money 配下の全コンポーネントに適用。
  <main className="font-sans"> でルートロックしているため、
  子要素は明示しない限り Noto Sans JP を継承する。
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      {/* font-sans で和文ゴシックをルートロック(明朝禁止) */}
      <main className="font-sans">
        {/* === 1. Editorial Black Hero (2026-05-03 /lots と統一) === */}
        <section className="relative bg-[#0A0A0A] text-white overflow-hidden">
          {/* 極細グリッド線(モダン質感、AT-006 Swiss テンプレ回避) */}
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
            {/* メタ行 */}
            <div className="flex items-center gap-3 mb-12 md:mb-20 text-[11px] md:text-[12px] tracking-[0.22em] uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: ACCENT }}
              />
              <span style={{ color: ACCENT, fontWeight: 600 }}>
                Money / 資金計画
              </span>
              <span className="text-white/30">·</span>
              <span className="text-white/60">75歳完済モデル</span>
            </div>

            {/* メイン: 巨大数字 + メタ */}
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-end">
              <div>
                <div className="flex items-baseline gap-2 md:gap-3">
                  <span
                    className="block tabular-nums leading-[0.85]"
                    style={{
                      fontFamily: "var(--font-oswald)",
                      fontWeight: 200,
                      fontSize: "clamp(80px, 11vw, 180px)",
                      color: ACCENT,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    〜
                  </span>
                  <span
                    className="block tabular-nums leading-[0.85]"
                    style={{
                      fontFamily: "var(--font-oswald)",
                      fontWeight: 200,
                      fontSize: "clamp(120px, 18vw, 280px)",
                      color: ACCENT,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    4,500
                  </span>
                  <span
                    className="text-white text-[14px] md:text-[18px] font-medium pb-2 md:pb-4 whitespace-nowrap"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    万円相当
                  </span>
                </div>
                <p
                  className="mt-3 text-white/80 text-[12px] md:text-[13px] tracking-[0.16em] uppercase"
                  style={{ fontFamily: "var(--font-inter)", fontWeight: 500 }}
                >
                  Asset at 75 · 75歳完済時に、手元に残ることがある資産の目安
                </p>
              </div>

              <div className="md:pb-8">
                <h1
                  className="text-white leading-[1.25] tracking-[-0.005em] max-w-[680px]"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(22px, 2.6vw, 36px)",
                  }}
                >
                  家のお金を、最初に見える化します。
                </h1>
                <p className="mt-5 text-white/65 text-[13px] md:text-[14px] leading-[1.95] max-w-[600px]">
                  月々の支払い・諸費用・将来の負担まで。
                  賃貸との総コスト、完済後に残る資産まで。家計設計の手段としての住宅ローンを、ご家族の暮らしに合わせて、ご一緒に整えます。
                </p>
              </div>
            </div>
          </div>

          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: ACCENT }}
          />
        </section>

        {/* === 2. 暮らしの写真ブリージング — 数字の前に温度 === */}
        <section className="relative overflow-hidden">
          <div className="relative aspect-[21/9] md:aspect-[21/8] w-full bg-text-primary">
            <Image
              src="/images/newsozai/interior-kitchen-01.webp"
              alt="ご家族の暮らし — キッチンの朝"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{ filter: "saturate(0.94) contrast(1.04)" }}
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"
            />
            <div className="absolute inset-0 flex items-end">
              <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] pb-8 md:pb-14 w-full">
                <p
                  className="text-white max-w-[640px] leading-[1.55] tracking-[0.04em]"
                  style={{
                    fontWeight: 500,
                    fontSize: "clamp(16px, 2vw, 26px)",
                    textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                  }}
                >
                  月々の支払い・諸費用・将来の負担まで、無理のない計画を一緒に確認します。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* === 3. BIG NUMBERS — 3つの数字 === */}
        <section
          id="big-numbers"
          className="relative bg-[#FAF8F3] py-[clamp(48px,6vw,120px)] scroll-mt-20"
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-stretch">
              {[
                {
                  no: "01",
                  label: "月々の住宅ローン",
                  prefix: "",
                  num: "7.1",
                  unit: "万円",
                  suffix: "から",
                  body: "想定モデル(30代夫婦+子1・年収500万・借入2,500万・1.0%・35年)。",
                  highlight: false,
                },
                {
                  no: "02",
                  label: "つなぎ融資",
                  prefix: "",
                  num: "0",
                  unit: "円",
                  suffix: "",
                  body: "やまとは土地+建物を自社一貫。一般的な30〜80万円の上乗せが、ありません。",
                  highlight: true, // 中央=やまと最大の売り
                },
                {
                  no: "03",
                  label: "75歳完済時に、手元に残ることがある資産",
                  prefix: "〜",
                  num: "4,500",
                  unit: "万円",
                  suffix: "相当",
                  body: "40歳ご契約・35年ローンで試算した上限の目安。土地代・建物の維持状態・市況により変動するため、実際の評価は個別にご相談ください。",
                  highlight: false,
                },
              ].map((n) => (
                <article
                  key={n.no}
                  className={`group relative bg-white border border-text-primary/12 p-6 md:p-8 pt-7 md:pt-9 flex flex-col overflow-hidden transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 motion-reduce:hover:translate-y-0 ${
                    n.highlight
                      ? "shadow-[0_18px_40px_-20px_rgba(72,107,0,0.28)] hover:shadow-[0_28px_56px_-20px_rgba(72,107,0,0.4)]"
                      : "shadow-[0_4px_16px_-8px_rgba(43,43,43,0.08)] hover:shadow-[0_22px_44px_-22px_rgba(43,43,43,0.2)] hover:border-text-primary/25"
                  }`}
                >
                  {/* Top stripe — 全カードにライム細線、主役カードは太く */}
                  <span
                    aria-hidden
                    className={`absolute top-0 left-0 right-0 transition-[height] duration-300 ${
                      n.highlight ? "h-1.5 md:h-2" : "h-0.5"
                    }`}
                    style={{ background: ACCENT }}
                  />

                  {/* やまと最大の売り バッジ */}
                  {n.highlight && (
                    <span
                      className="absolute top-3 right-4 px-2.5 py-1 text-[10px] tracking-[0.12em] font-bold text-white"
                      style={{ background: FOREST }}
                    >
                      やまと最大の売り
                    </span>
                  )}

                  {/* Top row: 番号 + ラベル */}
                  <div className="flex items-baseline gap-3 mb-5 md:mb-6">
                    <span
                      className="font-oswald tabular-nums leading-none"
                      style={{
                        fontWeight: 400,
                        fontSize: "clamp(20px, 1.8vw, 26px)",
                        color: "rgba(43,43,43,0.35)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {n.no}
                    </span>
                    <span className="text-[13px] md:text-[14px] tracking-[0.04em] text-text-secondary font-bold">
                      {n.label}
                    </span>
                  </div>

                  {/* 数値 — whitespace-nowrap で折返し防止 */}
                  <div className="whitespace-nowrap leading-none flex items-baseline">
                    {n.prefix && (
                      <span
                        className="text-text-primary mr-1.5"
                        style={{
                          fontWeight: 600,
                          fontSize: "clamp(22px, 2.2vw, 32px)",
                          color: FOREST,
                        }}
                      >
                        {n.prefix}
                      </span>
                    )}
                    <span
                      className="font-oswald tabular-nums"
                      style={{
                        fontWeight: 400,
                        fontSize: "clamp(56px, 6.8vw, 104px)",
                        letterSpacing: "-0.04em",
                        color: FOREST,
                      }}
                    >
                      {n.num}
                    </span>
                    <span className="ml-1.5 text-text-primary font-bold" style={{ fontSize: "clamp(18px, 1.6vw, 22px)" }}>
                      {n.unit}
                    </span>
                    {n.suffix && (
                      <span className="ml-1.5 text-text-secondary text-[14px] md:text-[15px]">{n.suffix}</span>
                    )}
                  </div>

                  <p className="mt-5 text-text-primary text-[12px] md:text-[14px] leading-[1.85] flex-1">
                    {n.body}
                  </p>
                </article>
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

            {/* 電話番号CTA — 高齢層・即時相談派の方向け */}
            <div className="mt-10 pt-8 border-t border-text-primary/10">
              <p className="text-[12px] md:text-[13px] text-text-secondary mb-3">お電話でのご相談も承ります</p>
              <a
                href="tel:0742-36-1123"
                className="inline-flex items-baseline gap-2 hover:opacity-80 transition-opacity"
              >
                <span
                  className="font-oswald tabular-nums text-text-primary leading-none"
                  style={{ fontWeight: 400, fontSize: "clamp(28px, 3vw, 44px)", letterSpacing: "0.02em", color: FOREST }}
                >
                  0742-36-1123
                </span>
              </a>
              <p className="mt-2 text-[11px] md:text-[12px] text-text-secondary">
                受付 9:00〜19:00（火・水定休）／株式会社やまと不動産 本社
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
