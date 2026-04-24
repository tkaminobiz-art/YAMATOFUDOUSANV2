import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import {
  ShieldCheck,
  CircleDollarSign,
  FileText,
  Trash2,
  Building,
} from "lucide-react";

/*
  /sell — 家・土地を売りたい方向けページ（公式トップ運用のための副導線）
  2026-04-15 Phase 2A で新設

  構成:
  1. Hero (低ハードルCTA: 無料査定 + 資料請求)
  2. 3つの売却方法
  3. やまと買取の5つの安心
  4. 売却の流れ（4ステップ）
  5. よくある質問
  6. クロージングCTA

  方針:
  - 旧サイト /sell と /pg-lp の材料を統合
  - V2 のフラットで直接的な「です・ます」調に統一
  - Hero は「来店予約」ではなく「無料査定」「資料請求」の低ハードルCV
*/

export const metadata: Metadata = {
  title: "家・土地を売りたい方へ | やまと不動産",
  description:
    "奈良・京都で14年。やまと不動産は、仲介売却・買取り保証付き売却・即時買取の3つの選択肢で、あなたの売却をサポートします。無料査定・ご相談はお気軽に。",
};

const METHODS = [
  {
    num: "01",
    title: "仲介売却",
    desc: "市場に広く広告を出し、買主を探します。相場通りの価格で売りたい方に。",
    tag: "じっくり",
  },
  {
    num: "02",
    title: "一定期間売れなかった場合の買取保証つき売却",
    desc: "まずは仲介で探し、期限までに売れなかった場合、当社が買い取ります。期限の安心をご用意します。",
    tag: "期限の安心",
  },
  {
    num: "03",
    title: "即時買取",
    desc: "当社が直接買い取るため、最短のスケジュールで現金化できます。広告も出ません。",
    tag: "最速・内密",
  },
] as const;

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: "広告に出さず、プライバシーを守ります",
    body: "ご近所や知人に知られずに売却できます。買取なら、広告掲載が一切ありません。",
  },
  {
    icon: CircleDollarSign,
    title: "仲介手数料は、ゼロ円",
    body: "当社買取の場合、仲介手数料は不要です。諸費用を確認したうえで、手取り額を分かりやすくご案内します。",
  },
  {
    icon: FileText,
    title: "売却後の不安を減らし、手取り額を見通しやすく",
    body: "瑕疵担保の不安を残しません。売却したあとも、当社が責任を引き継ぎます。",
  },
  {
    icon: Trash2,
    title: "不要品の処分まで、当社が対応",
    body: "建物内の残置物はそのままで結構です。処分はこちらで行いますので、お手間をかけません。",
  },
  {
    icon: Building,
    title: "賃貸中の物件も、ご相談ください",
    body: "入居者がいる状態のまま買取のご相談を承ります。オーナーチェンジにも柔軟に対応します。",
  },
] as const;

const FLOW = [
  {
    num: "01",
    title: "物件調査・査定",
    desc: "対象不動産を調査し、査定金額を算出します。ご依頼から最短3日程度です。",
  },
  {
    num: "02",
    title: "査定報告・条件提示",
    desc: "調査結果と査定金額、売却条件をご報告します。ご納得いただけるまで、何度でもご相談ください。",
  },
  {
    num: "03",
    title: "売買契約・手付金",
    desc: "金額と条件にご同意いただけたら、売買契約を締結し、手付金をお支払いします。",
  },
  {
    num: "04",
    title: "お引渡し・残金",
    desc: "お引渡しと残代金の受領をもって、売却手続きが完了します。",
  },
] as const;

const FAQ = [
  {
    q: "査定は無料ですか？",
    a: "はい、無料です。机上査定・訪問査定のどちらもご相談いただけます。ご依頼いただいたからといって、売却を強要することはありません。",
  },
  {
    q: "どんな不動産でも買い取ってもらえますか？",
    a: "土地・戸建て・マンション・収益物件まで、幅広く対応しています。築古物件や賃貸中の物件もご相談ください。",
  },
  {
    q: "査定を依頼するときに、必要な書類はありますか？",
    a: "権利書や登記簿謄本など、ご所有の不動産の詳細がわかる書類をご準備いただくとスムーズです。お手元にないものがあっても、こちらで取得することも可能です。",
  },
  {
    q: "急いで現金化したいのですが、対応できますか？",
    a: "即時買取なら、最短で1週間〜2週間でのお引渡しも可能です。お急ぎの事情をお聞かせください。",
  },
] as const;

export default function SellPage() {
  return (
    <>
      <Header />
      <main>
        {/* ===== Hero ===== */}
        <section className="relative bg-text-primary text-white overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' /%3E%3C/svg%3E\")",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(at 15% 50%, rgba(90,138,74,0.14) 0%, transparent 55%), radial-gradient(at 85% 50%, rgba(196,112,63,0.10) 0%, transparent 55%)",
            }}
          />

          <div className="relative max-w-[1200px] mx-auto px-[var(--page-px)] py-[clamp(80px,10vw,180px)]">
            <p className="font-section-label text-accent text-xs md:text-sm mb-4 tracking-[0.2em]">
              FOR SELLERS
            </p>
            <h1
              className="text-[clamp(32px,5vw,64px)] mb-6 leading-[1.4]"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              売る事情まで考えて、
              <br className="md:hidden" />
              納得できる方法をご提案します。
            </h1>
            <p className="text-white/80 text-[clamp(15px,1.2vw,18px)] leading-relaxed max-w-[640px] mb-2">
              奈良・京都の土地勘を活かし、売却理由に合わせた進め方をご提案します。
            </p>
            <p className="text-white/65 text-[clamp(13px,1vw,15px)] leading-relaxed max-w-[640px] mb-10">
              仲介売却・買取り保証付き売却・即時買取の3つの選択肢から、あなたに合った方法をご提案します。
            </p>

            {/* CTA — 低ハードル2つに絞る */}
            <div className="flex flex-col sm:flex-row gap-3">
              <CtaButton
                href="/contact"
                variant="dark-bg-primary"
                size="md"
                label="無料査定を依頼する"
                sublabel="ご相談のみもOK・費用は一切かかりません"
              />
              <CtaButton
                href="/contact"
                variant="dark-bg-secondary"
                size="md"
                label="資料を請求する"
                sublabel="売却の流れが分かる資料をお送りします"
              />
            </div>
          </div>
        </section>

        {/* ===== 01 — 3つの売却方法 ===== */}
        <section className="bg-bg-primary py-[var(--section-py)]">
          <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
            <div className="mb-10 md:mb-14 max-w-[720px]">
              <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
                METHODS
              </p>
              <h2 className="text-[clamp(22px,3vw,36px)] text-text-primary mb-4 leading-[1.5]">
                3つの売却方法から、お選びいただけます。
              </h2>
              <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
                ご事情やご希望の時期に応じて、最適な方法をご提案します。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--card-gap)]">
              {METHODS.map((m) => (
                <div
                  key={m.num}
                  className="bg-bg-secondary rounded-lg p-[clamp(24px,3vw,36px)] card-shadow"
                >
                  <span
                    className="text-main/25 font-light text-5xl md:text-6xl leading-none block mb-4"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {m.num}
                  </span>
                  <p className="text-accent text-xs font-medium tracking-[0.15em] mb-2 uppercase">
                    {m.tag}
                  </p>
                  <h3
                    className="text-text-primary text-lg md:text-xl mb-3 leading-[1.5] font-medium"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {m.title}
                  </h3>
                  <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
                    {m.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 02 — やまと買取の5つの安心 ===== */}
        <section className="bg-bg-warm py-[var(--section-py)]">
          <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
            <div className="mb-10 md:mb-14 max-w-[720px]">
              <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
                BENEFITS
              </p>
              <h2 className="text-[clamp(22px,3vw,36px)] text-text-primary mb-4 leading-[1.5]">
                やまと買取、5つの安心。
              </h2>
              <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
                当社が直接買い取るから、できることがあります。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--card-gap)]">
              {BENEFITS.map((b, i) => {
                const Icon = b.icon;
                return (
                  <div
                    key={i}
                    className="bg-bg-primary rounded-lg p-[clamp(24px,3vw,36px)] card-shadow"
                  >
                    <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-main/10 text-main mb-4">
                      <Icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <h3
                      className="text-text-primary text-base md:text-lg mb-3 leading-[1.5] font-medium"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {b.title}
                    </h3>
                    <p className="text-text-secondary text-sm leading-[1.9]">
                      {b.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== 03 — 売却の流れ ===== */}
        <section className="bg-bg-primary py-[var(--section-py)]">
          <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
            <div className="mb-10 md:mb-14 max-w-[720px]">
              <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
                FLOW
              </p>
              <h2 className="text-[clamp(22px,3vw,36px)] text-text-primary mb-4 leading-[1.5]">
                売却の流れ。
              </h2>
              <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
                ご相談からお引渡しまで、4ステップで完結します。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 md:gap-x-16 gap-y-8 md:gap-y-10">
              {FLOW.map((step, i) => (
                <div
                  key={step.num}
                  className={`flex gap-5 md:gap-6 ${i % 2 === 1 ? "md:mt-8" : ""}`}
                >
                  <span
                    className="text-main/25 font-light text-5xl md:text-6xl leading-none shrink-0 pt-1"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <h3
                      className="text-text-primary text-lg md:text-xl mb-2 leading-[1.5]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 04 — FAQ ===== */}
        <section className="bg-bg-secondary py-[var(--section-py)]">
          <div className="max-w-[900px] mx-auto px-[var(--page-px)]">
            <div className="mb-10 md:mb-14">
              <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
                FAQ
              </p>
              <h2 className="text-[clamp(22px,3vw,36px)] text-text-primary leading-[1.5]">
                よくある質問。
              </h2>
            </div>

            <div className="space-y-4">
              {FAQ.map((item, i) => (
                <details
                  key={i}
                  className="group bg-bg-primary rounded-lg border border-border overflow-hidden"
                >
                  <summary className="flex items-baseline gap-4 cursor-pointer list-none p-5 md:p-6 hover:bg-bg-warm/50 transition-colors">
                    <span
                      className="text-main font-light text-lg shrink-0"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      Q
                    </span>
                    <span
                      className="flex-1 text-text-primary text-sm md:text-base font-medium leading-[1.6]"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {item.q}
                    </span>
                    <span className="text-text-secondary text-xl shrink-0 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="flex items-baseline gap-4 px-5 md:px-6 pb-5 md:pb-6 pt-0">
                    <span
                      className="text-accent font-light text-lg shrink-0"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      A
                    </span>
                    <p className="flex-1 text-text-secondary text-sm md:text-base leading-[1.9]">
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 05 — クロージングCTA ===== */}
        <section className="bg-bg-primary py-[var(--section-py)]">
          <div className="max-w-[800px] mx-auto px-[var(--page-px)] text-center">
            <p className="font-section-label text-main text-xs md:text-sm mb-6 tracking-[0.15em]">
              CONTACT
            </p>
            <h2 className="text-[clamp(22px,3vw,36px)] text-text-primary mb-4 leading-[1.5]">
              まずは、査定だけでも。
            </h2>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9] max-w-[640px] mx-auto mb-10">
              査定・ご相談はすべて無料です。売るかどうか迷っている段階でも、お気軽にお声がけください。
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
              <CtaButton
                href="/contact"
                variant="primary"
                size="md"
                label="無料査定を依頼する"
              />
              <CtaButton
                href="/contact"
                variant="secondary"
                size="md"
                label="資料を請求する"
              />
            </div>

            <div className="flex justify-center mt-4">
              <CtaButton
                href="https://line.me/"
                variant="tertiary-line"
                label="LINEで相談する"
                sublabel="（最短10秒）"
                external
              />
            </div>

            <div className="border-t border-border pt-8 mt-12">
              <p className="text-text-secondary text-xs mb-2">お電話でのお問い合わせ</p>
              <a
                href="tel:0742361123"
                className="text-text-primary text-2xl md:text-3xl font-light hover:text-main transition-colors"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                0742-36-1123
              </a>
              <p className="text-text-secondary text-xs mt-2">
                営業時間 9:00〜19:00（火・水定休）
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
