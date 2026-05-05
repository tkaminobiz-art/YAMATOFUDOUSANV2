import type { Metadata } from "next";
import Image from "next/image";
import { MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import MoneyFullSection from "@/components/money/MoneyFullSection";
import SellingPointsStrip from "@/components/money/SellingPointsStrip";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

export const metadata: Metadata = {
  title: "資金計画 | やまと不動産 花鳥風月",
  description:
    "月々のお支払い、住宅ローン、つなぎ融資、提携FP相談まで。注文住宅の資金計画を、お客様目線でわかりやすく整理します。奈良・京都の注文住宅 やまと不動産。",
};

const FOREST = "#486B00";
const ACCENT = "#A2C523"; // LIME — やまとの売りシグナル(top stripe等で使用)

/*
  /money — 資金計画ページ v6
  v5(9章編集誌・情報詰めすぎ) → v6: 「3スクロールで要点が伝わる」構造へ
    1. Hero — 明るい写真 + 「家のお金を、最初に見える化します。」(事実核)
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
        {/* === 1. Photo-led Editorial Soft Hero (2026-05-03 /money 専用、参考画像準拠) ===
            キッチン写真フルブリード + 左に半透明白オーバーレイ + コピーオーバーレイ。
            数字主役を維持しつつ、Editorial Black の硬質さを和らげた「温かみのある編集誌」調。 */}
        <section className="relative w-full overflow-hidden bg-white">
          <div className="relative aspect-[16/10] md:aspect-[21/9] w-full">
            <Image
              src="/images/newsozai/interior-kitchen-01.webp"
              alt="ご家族の暮らし — キッチンの朝"
              fill
              priority
              className="object-cover"
              sizes="100vw"
              style={{ filter: "saturate(0.96) contrast(1.02)" }}
            />
            {/* 左から白へのグラデーション(コピー視認性) */}
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
                <div className="max-w-[600px]">
                  {/* 上部メタ */}
                  <p
                    className="text-[11px] md:text-[12px] tracking-[0.22em] uppercase mb-5"
                    style={{ color: FOREST, fontWeight: 600 }}
                  >
                    総予算の目安 · Money
                  </p>

                  {/* H1 */}
                  <h1
                    className="text-text-primary leading-[1.25] tracking-[-0.005em] mb-7"
                    style={{
                      fontWeight: 500,
                      fontSize: "clamp(26px, 3.6vw, 48px)",
                    }}
                  >
                    家のお金を、最初に
                    <br />
                    見える化します。
                  </h1>

                  {/* 数字 — 4,500 上限表記 */}
                  <div className="flex items-baseline gap-1.5 mb-6">
                    <span
                      className="tabular-nums leading-none"
                      style={{
                        fontFamily: "var(--font-oswald)",
                        fontWeight: 200,
                        fontSize: "clamp(36px, 5vw, 60px)",
                        color: ACCENT,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      〜
                    </span>
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
                      4,500
                    </span>
                    <span
                      className="text-text-primary text-[14px] md:text-[18px] font-medium leading-none ml-1.5 self-end pb-1 md:pb-2.5"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      万円相当
                    </span>
                  </div>

                  {/* サブコピー */}
                  <p className="text-text-primary/85 text-[13px] md:text-[15px] leading-[1.95] mb-8 max-w-[480px]">
                    月々の支払いも、将来の負担も。
                    最初に整理してから進めます。
                  </p>

                  {/* CTA — 2026-05-05 LINE主導線化(主=LINE / 副=スクロール / 予約は下部) */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
                    <a
                      href={LINE_ADD_FRIEND_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-7 py-3.5 text-[14px] md:text-[15px] font-medium rounded transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(6,199,85,0.55)] text-white"
                      style={{ background: "#06C755" }}
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.75} fill="currentColor" />
                      LINEでお金の不安を相談する
                    </a>
                    <a
                      href="#big-numbers"
                      className="inline-flex items-center gap-1.5 text-text-primary text-[13px] md:text-[14px] font-medium hover:opacity-70 transition-opacity"
                      style={{ borderBottom: `1px solid ${FOREST}`, paddingBottom: "2px" }}
                    >
                      数字でかんたんに見る
                      <span aria-hidden>↓</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* === 2. BIG NUMBERS — 3つの数字 === */}
        <section
          id="big-numbers"
          className="relative bg-bg-secondary/40 py-[clamp(48px,6vw,120px)] scroll-mt-20"
        >
          <div className="max-w-[1320px] mx-auto px-[var(--page-px)]">
            <div className="text-center mb-12 md:mb-16">
              <p
                className="text-[12px] md:text-[13px] tracking-[0.06em] font-bold mb-4"
                style={{ color: FOREST }}
              >
                家づくりのお金を、3つの数字で見える化します。
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
                  body: "試算例：30代ご夫婦・お子さま1人 / 世帯年収500万円 / 借入額2,500万円 / 金利1.0% / 35年。",
                  highlight: false,
                },
                {
                  no: "02",
                  label: "つなぎ融資",
                  prefix: "",
                  num: "0",
                  unit: "円",
                  suffix: "",
                  body: "土地と建物をまとめて進められるため、一般的に発生する30〜80万円程度の上乗せを抑えられます。",
                  highlight: true, // 中央=やまとならではの仕組み
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

                  {/* やまとならではの仕組み バッジ */}
                  {n.highlight && (
                    <span
                      className="absolute top-3 right-4 px-2.5 py-1 text-[10px] tracking-[0.12em] font-bold text-white"
                      style={{ background: FOREST }}
                    >
                      やまとの強み
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

        {/* === 5.5 中盤LINEストリップ === 住宅ローン・資金計画の山場と締めCTAの間に
            「読みっぱなしで離脱」を防ぐ低圧力の入口を1つ挟む。 */}
        <section className="bg-white border-t border-border py-[clamp(40px,5vw,80px)]">
          <div className="max-w-[1100px] mx-auto px-[var(--page-px)]">
            <div
              className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center rounded-lg p-6 md:p-9 border"
              style={{ background: "#F0F6D8", borderColor: "rgba(72,107,0,0.15)" }}
            >
              <div>
                <p
                  className="text-[11px] tracking-[0.18em] uppercase mb-3 font-semibold"
                  style={{ color: FOREST }}
                >
                  Money / LINE 相談
                </p>
                <h3 className="text-text-primary text-[18px] md:text-[22px] font-medium leading-[1.5] mb-2">
                  住宅ローンや月々の支払い、もやもやしたままになっていませんか。
                </h3>
                <p className="text-text-primary/80 text-[13px] md:text-[14px] leading-[1.95] max-w-[600px]">
                  ご家族の状況に合わせて、無理のない目安を一緒に整理します。
                  ご質問だけでも、もちろん大丈夫です。
                </p>
              </div>
              <a
                href={LINE_ADD_FRIEND_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-[14px] font-medium transition-opacity hover:opacity-90 whitespace-nowrap shrink-0 text-white"
                style={{ background: "#06C755" }}
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.75} fill="currentColor" />
                LINEで気軽に相談する
              </a>
            </div>
          </div>
        </section>

        {/* === 6. 締めCTA — 2026-05-05 LINE主導線化(主=LINE / 副=見学 / 補助=フォーム&電話) === */}
        <section
          className="relative py-[clamp(80px,8vw,160px)]"
          style={{ background: "#F0F6D8" }}
        >
          <div className="max-w-[840px] mx-auto px-[var(--page-px)] text-center">
            <p
              className="text-[12px] md:text-[13px] tracking-[0.18em] mb-8 font-bold"
              style={{ color: FOREST }}
            >
              気になる点から、ひとつずつ。
            </p>
            <p
              className="text-text-primary text-[clamp(24px,3.4vw,44px)] leading-[1.4] tracking-[-0.01em]"
              style={{ fontWeight: 500 }}
            >
              気になる点を、まずはひとつ。
            </p>
            <p className="mt-6 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[540px] mx-auto">
              LINE・ご来場・お電話、どの窓口でも構いません。
              <br className="hidden md:block" />
              「今は建てない」とお決めになっても、それで構いません。
            </p>
            <div className="mt-12 flex flex-col gap-4 items-center">
              {/* 主CTA: LINE */}
              <a
                href={LINE_ADD_FRIEND_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 min-h-[56px] px-8 py-4 rounded text-[15px] md:text-[16px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(6,199,85,0.55)] w-full sm:w-auto sm:min-w-[320px]"
                style={{ background: "#06C755" }}
              >
                <MessageCircle className="w-5 h-5" strokeWidth={1.75} fill="currentColor" />
                LINEでお金の不安を相談する
              </a>
              {/* 副CTA: 見学 + 補助: フォーム */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <CtaButton
                  href="/reserve"
                  variant="secondary"
                  size="md"
                  label="モデルハウスを見学する"
                  sublabel="ご予約なしでも見学可・無料"
                />
                <CtaButton
                  href="/contact"
                  variant="secondary"
                  size="md"
                  label="フォームで質問する"
                  sublabel="メッセージで気軽にどうぞ"
                />
              </div>
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
