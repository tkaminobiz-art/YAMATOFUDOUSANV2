import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import { Users, MessageCircle, Gift, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "ご紹介 | やまと不動産",
  description:
    "やまと不動産で家を建てたOBの皆さまから、ご友人・ご家族をご紹介いただくためのご案内。ご紹介者様にはお礼の品をお贈りしています。",
};

/*
  /refer — OB紹介動線 (2026-05-03)
  ---------------------------------------------------------------
  小林専務承認 A項目「12棟達成の3欠落動線」②:
  「14年×50組のOBを"紹介先"の動線として動員」
  「年3-4棟は紹介で確保する設計が現実的」

  運用想定:
  - 引き渡し時のお礼カード・1年点検時にQRコード掲載
  - LINE経由でのご紹介もこのページに誘導
  - 紹介特典の具体額(5-10万円ギフト等)は専務承認後に追記
*/

const FOREST = "#486B00";
const LIME = "#A2C523";

export default function ReferPage() {
  return (
    <>
      <Header />
      <main className="bg-white">
        {/* === Editorial Black Hero === */}
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

          <div className="relative max-w-[1200px] mx-auto px-[var(--page-px)] py-[clamp(80px,11vw,180px)]">
            <div className="flex items-center gap-3 mb-12 md:mb-16 text-[11px] md:text-[12px] tracking-[0.22em] uppercase">
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: LIME }}
              />
              <span style={{ color: LIME, fontWeight: 600 }}>
                Refer / ご紹介
              </span>
              <span className="text-white/30">·</span>
              <span className="text-white/60">
                やまとで建てた方へ
              </span>
            </div>

            <h1
              className="text-white leading-[1.25] tracking-[-0.005em] max-w-[820px]"
              style={{
                fontWeight: 400,
                fontSize: "clamp(28px, 4vw, 56px)",
              }}
            >
              ご紹介、
              <br className="hidden md:block" />
              ありがとうございます。
            </h1>
            <p className="mt-8 text-white/65 text-[14px] md:text-[16px] leading-[1.95] max-w-[640px]">
              やまとで建てたご家族からの「うちでも建てて良かった」というひと言は、これから家づくりを考える方にとって、何よりの後押しになります。
              <br className="hidden md:block" />
              ご紹介の輪を、丁寧に受けとめさせてください。
            </p>
          </div>

          <div
            aria-hidden
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: LIME }}
          />
        </section>

        {/* === ご紹介の流れ === */}
        <section className="bg-white py-[clamp(64px,7vw,140px)]">
          <div className="max-w-[1200px] mx-auto px-[var(--page-px)]">
            <p
              className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-3"
              style={{ color: FOREST, fontWeight: 600 }}
            >
              How it works
            </p>
            <h2 className="text-text-primary text-[clamp(22px,2.6vw,36px)] mb-12 md:mb-16 leading-[1.4]">
              ご紹介の流れ
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  no: "01",
                  Icon: Users,
                  title: "お知り合いに、お声かけください。",
                  body:
                    "ご家族・ご友人・ご職場の方など、家づくりを考えていそうな方にやまと不動産のお話を。HPやモデルハウスをお伝えいただくだけで構いません。",
                },
                {
                  no: "02",
                  Icon: MessageCircle,
                  title: "下のフォームから、ご一報ください。",
                  body:
                    "ご紹介者様のお名前と、ご紹介先のご様子を簡単にお知らせください。先方には、無理のないタイミングでこちらからご挨拶差し上げます。",
                },
                {
                  no: "03",
                  Icon: Gift,
                  title: "お礼の品を、お贈りいたします。",
                  body:
                    "ご来場いただいた段階・ご成約に至った段階で、ささやかですがお礼の品をお贈りします。具体的な内容は時期によりご案内いたします。",
                },
              ].map((s) => {
                const Icon = s.Icon;
                return (
                  <article key={s.no} className="flex flex-col">
                    <div className="flex items-baseline gap-3 mb-5">
                      <span
                        className="tabular-nums leading-none"
                        style={{
                          fontFamily: "var(--font-oswald)",
                          fontWeight: 300,
                          fontSize: "clamp(36px, 4vw, 56px)",
                          color: FOREST,
                        }}
                      >
                        {s.no}
                      </span>
                      <Icon
                        className="w-5 h-5"
                        style={{ color: FOREST }}
                        strokeWidth={1.5}
                      />
                    </div>
                    <h3 className="text-text-primary text-[16px] md:text-[18px] font-medium leading-[1.5] mb-3">
                      {s.title}
                    </h3>
                    <p className="text-text-secondary text-[13px] md:text-[14px] leading-[1.95]">
                      {s.body}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* === 紹介してみる CTA === */}
        <section
          className="py-[clamp(64px,7vw,140px)] border-y"
          style={{ background: "#F0F6D8", borderColor: "rgba(72,107,0,0.2)" }}
        >
          <div className="max-w-[760px] mx-auto px-[var(--page-px)] text-center">
            <p
              className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-4"
              style={{ color: FOREST, fontWeight: 600 }}
            >
              Send a referral
            </p>
            <h2 className="text-text-primary text-[clamp(22px,2.8vw,36px)] mb-5 leading-[1.4]">
              ご紹介を、お知らせください。
            </h2>
            <p className="text-text-primary/80 text-[14px] md:text-[15px] leading-[1.95] mb-10 max-w-[600px] mx-auto">
              ご紹介先のお名前は、ご紹介者様にご無理のない範囲で構いません。
              「ご相談だけしてみたい」というご様子でも歓迎です。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <CtaButton
                href="/contact?type=refer"
                variant="primary"
                size="md"
                label="ご紹介フォーム"
                sublabel="お名前とご様子をひと言でも"
              />
              <CtaButton
                href="https://line.me/R/ti/p/@yamatofudosan"
                variant="secondary"
                size="md"
                label="LINEで知らせる"
                sublabel="やまと公式LINEから"
              />
            </div>
            <p className="mt-8 text-text-primary/60 text-[11px] md:text-[12px] leading-[1.85]">
              ※ ご紹介先の方には、ご紹介者様のお名前を伏せた形でも対応可能です。
              先方のタイミングを最優先にご対応します。
            </p>
          </div>
        </section>

        {/* === ご紹介について === */}
        <section className="bg-white py-[clamp(64px,7vw,140px)]">
          <div className="max-w-[760px] mx-auto px-[var(--page-px)]">
            <p
              className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-3"
              style={{ color: FOREST, fontWeight: 600 }}
            >
              About
            </p>
            <h2 className="text-text-primary text-[clamp(20px,2.4vw,30px)] mb-8 leading-[1.4]">
              ご紹介についての、お約束。
            </h2>
            <ul className="space-y-5 text-text-primary text-[14px] md:text-[15px] leading-[1.95]">
              <li className="flex gap-3">
                <span
                  className="shrink-0 w-1 h-1 mt-3 rounded-full"
                  style={{ background: FOREST }}
                />
                <span>
                  <strong className="font-medium">無理な営業はいたしません。</strong>
                  ご紹介先の方が「今は建てない」とお決めになっても、それで構いません。
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="shrink-0 w-1 h-1 mt-3 rounded-full"
                  style={{ background: FOREST }}
                />
                <span>
                  <strong className="font-medium">ご紹介者様のお名前は、ご了承いただいた範囲のみ</strong>
                  でお伝えします。匿名でのご紹介も可能です。
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="shrink-0 w-1 h-1 mt-3 rounded-full"
                  style={{ background: FOREST }}
                />
                <span>
                  <strong className="font-medium">お礼の品は、ご来場時とご成約時の2段階</strong>
                  でお渡しします。具体的な品目はご案内時に明示します。
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="shrink-0 w-1 h-1 mt-3 rounded-full"
                  style={{ background: FOREST }}
                />
                <span>
                  <strong className="font-medium">ご紹介の輪は、ゆっくりで構いません。</strong>
                  「ちょうど家のお話が出た」というタイミングで、思い出していただければ十分です。
                </span>
              </li>
            </ul>
            <Link
              href="/voice"
              className="group inline-flex items-center gap-2 mt-12 text-main hover:opacity-80 text-[13px] md:text-[14px] transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.6} />
              既にやまとで建てたご家族の声を見る
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
