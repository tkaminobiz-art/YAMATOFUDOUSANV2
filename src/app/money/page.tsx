import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import {
  ArrowDown,
  Building2,
  Calculator,
  Landmark,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import CtaButton from "@/components/ui/CtaButton";
import MoneyFullSection from "@/components/money/MoneyFullSection";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

export const metadata: Metadata = {
  title: "資金計画 | やまと不動産 花鳥風月",
  description:
    "月々のお支払い、住宅ローン、つなぎ融資、提携FP相談まで。注文住宅の資金計画を、お客様目線でわかりやすく整理します。奈良・京都の注文住宅 やまと不動産。",
};

const BRAND = {
  lime: "#A9D159",
  deep: "#2F4A2C",
  base: "#F7F4EC",
  ivory: "#FBF8EE",
  text: "#1D1D18",
  muted: "#5E5A50",
  border: "#DED8C8",
  gold: "#9A7A3F",
  line: "#06C755",
};

const HERO_IMAGE = "/images/newsozai/interior-ldk-01.webp";

const MONEY_MAP = [
  {
    icon: Building2,
    label: "建物本体",
    value: "2,280〜2,480",
    unit: "万円",
    note: "京・風・花の3プラン。標準仕様を含めて整理します。",
  },
  {
    icon: MapPinned,
    label: "土地代",
    value: "500〜2,500",
    unit: "万円",
    note: "奈良・京都南部の自社分譲地を含めてご相談いただけます。",
  },
  {
    icon: WalletCards,
    label: "諸費用",
    value: "200〜400",
    unit: "万円",
    note: "登記・印紙税・ローン手数料・火災保険などの目安です。",
  },
  {
    icon: Calculator,
    label: "月々返済",
    value: "7.1",
    unit: "万円から",
    note: "借入2,500万円・金利1.0%・35年の試算例です。",
  },
] as const;

const PROOFS = [
  {
    label: "資金計画作成実績",
    value: "1,000",
    unit: "件以上",
    body: "土地・建物・住宅ローンを切り離さず、総額から逆算します。",
  },
  {
    label: "つなぎ融資",
    value: "0",
    unit: "円",
    body: "自社分譲地と建物をまとめて進める場合、原則発生しません。",
  },
  {
    label: "75歳完済時に残ることがある資産",
    value: "4,500",
    unit: "万円相当",
    body: "土地2,500万円 + 建物2,000万円を想定した上限の目安です。",
  },
] as const;

const MECHANISMS = [
  {
    no: "01",
    title: "土地と建物を、一社で見る。",
    body: "土地分譲・設計・施工・販売まで自社一貫。窓口を分けず、総額の見通しを早い段階でそろえます。",
  },
  {
    no: "02",
    title: "つなぎ融資を、発生させにくい。",
    body: "土地購入と建物着工のタイムラグを抑えられるため、一般的な30〜80万円程度の上乗せを避けやすくなります。",
  },
  {
    no: "03",
    title: "第三者目線のFPにもつなげる。",
    body: "やまと社内ではなく、独立した立場の提携先FP事務所に家計全体の相談ができます。",
  },
] as const;

function SectionLead({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[760px]"}>
      <p
        className="font-inter text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.16em]"
        style={{ color: BRAND.deep }}
      >
        {eyebrow}
      </p>
      <h2
        className="mt-4 text-[clamp(26px,3.2vw,48px)] leading-[1.28] tracking-[0]"
        style={{ color: BRAND.text, fontWeight: 600 }}
      >
        {title}
      </h2>
      {body && (
        <p
          className="mt-5 text-[14px] md:text-[15px] leading-[1.95]"
          style={{ color: BRAND.muted }}
        >
          {body}
        </p>
      )}
    </div>
  );
}

function LineButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={LINE_ADD_FRIEND_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[56px] items-center justify-center gap-2 rounded-[6px] px-7 py-4 text-[15px] font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-18px_rgba(6,199,85,0.72)] ${className}`}
      style={{ background: BRAND.line }}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.8} fill="currentColor" />
      {children}
    </a>
  );
}

function Hero() {
  return (
    <section
      className="relative isolate min-h-[calc(100svh-72px)] overflow-hidden"
      style={{ background: BRAND.base }}
    >
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt="やまと不動産の住まいのリビング"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "saturate(0.92) contrast(1.04)" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(247,244,236,0.98) 0%, rgba(247,244,236,0.92) 37%, rgba(247,244,236,0.54) 62%, rgba(247,244,236,0.10) 100%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: `linear-gradient(180deg, rgba(247,244,236,0) 0%, ${BRAND.base} 100%)` }}
        />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-[1440px] items-center px-[var(--page-px)] py-[clamp(80px,9vw,150px)]">
        <div className="max-w-[760px]">
          <p
            className="font-inter text-[11px] md:text-[12px] font-semibold uppercase tracking-[0.18em]"
            style={{ color: BRAND.deep }}
          >
            Yamato Money Planning
          </p>
          <h1
            className="mt-6 text-[clamp(34px,5.4vw,82px)] leading-[1.08] tracking-[0]"
            style={{ color: BRAND.text, fontWeight: 650 }}
          >
            家のお金、
            <br />
            ぜんぶお見せします。
          </h1>
          <p
            className="mt-7 max-w-[560px] text-[15px] md:text-[17px] leading-[2]"
            style={{ color: BRAND.muted }}
          >
            土地、建物、諸費用、住宅ローン、将来の住居費まで。
            奈良・京都南部の家づくりを、総額からご一緒に見ていきます。
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <LineButton className="w-full sm:w-auto">LINEでお金の疑問を相談する</LineButton>
            <a
              href="#money-map"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-[6px] border px-7 py-4 text-[14px] font-bold transition duration-300 hover:bg-white/65 sm:w-auto"
              style={{ borderColor: BRAND.border, color: BRAND.text }}
            >
              総額の見方へ
              <ArrowDown className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </div>

          <div
            className="mt-12 grid max-w-[720px] grid-cols-1 gap-px overflow-hidden border sm:grid-cols-3"
            style={{ borderColor: "rgba(47,74,44,0.18)", background: "rgba(47,74,44,0.16)" }}
          >
            {[
              ["月々", "7.1", "万円から"],
              ["つなぎ融資", "0", "円"],
              ["資金計画", "1,000", "件以上"],
            ].map(([label, value, unit]) => (
              <div key={label} className="bg-white/72 px-5 py-4 backdrop-blur-sm">
                <p className="text-[11px] font-bold tracking-[0.08em]" style={{ color: BRAND.muted }}>
                  {label}
                </p>
                <p className="mt-2 flex items-baseline gap-1 whitespace-nowrap">
                  <span
                    className="font-oswald tabular-nums text-[clamp(34px,4vw,54px)] leading-none tracking-[0]"
                    style={{ color: BRAND.deep, fontWeight: 420 }}
                  >
                    {value}
                  </span>
                  <span className="text-[12px] font-bold" style={{ color: BRAND.text }}>
                    {unit}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MoneyMap() {
  return (
    <section id="money-map" className="relative scroll-mt-24 py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.base }}>
      <div className="mx-auto max-w-[1280px] px-[var(--page-px)]">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionLead
            eyebrow="Total Budget Map"
            title={
              <>
                先に見るのは、
                <br />
                借入額ではなく総額です。
              </>
            }
            body={
              <>
                「建物はいくらか」だけでは、家づくりのお金は見えません。
                やまとでは、土地・建物・諸費用・月々返済をひとつの地図にして、最初に全体像をそろえます。
              </>
            }
          />

          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-6 -z-10"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(47,74,44,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(47,74,44,0.12) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div
              className="grid gap-px overflow-hidden border md:grid-cols-2"
              style={{ borderColor: BRAND.border, background: BRAND.border }}
            >
              {MONEY_MAP.map((item) => {
                const Icon = item.icon;
                const isRange = item.value.includes("〜");
                const [from, to] = isRange ? item.value.split("〜") : [item.value, ""];
                return (
                  <article key={item.label} className="min-h-[220px] bg-[#FBF8EE] p-6 md:p-8">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <p className="text-[12px] font-bold tracking-[0.08em]" style={{ color: BRAND.muted }}>
                          {item.label}
                        </p>
                        {isRange ? (
                          <div className="mt-5" style={{ wordBreak: "keep-all", overflowWrap: "normal" }}>
                            <p className="font-oswald tabular-nums text-[clamp(42px,5vw,62px)] leading-[0.9] tracking-[0]" style={{ color: BRAND.deep, fontWeight: 380 }}>
                              {from}
                              <span className="ml-1 text-[0.72em]">〜</span>
                            </p>
                            <p className="mt-2 flex items-baseline gap-1.5 whitespace-nowrap">
                              <span className="font-oswald tabular-nums text-[clamp(42px,5vw,62px)] leading-none tracking-[0]" style={{ color: BRAND.deep, fontWeight: 380 }}>
                                {to}
                              </span>
                              <span className="text-[13px] font-bold" style={{ color: BRAND.text }}>
                                {item.unit}
                              </span>
                            </p>
                          </div>
                        ) : (
                          <p className="mt-5 flex items-baseline gap-1.5 whitespace-nowrap" style={{ wordBreak: "keep-all", overflowWrap: "normal" }}>
                            <span className="font-oswald tabular-nums text-[clamp(50px,6.8vw,84px)] leading-none tracking-[0]" style={{ color: BRAND.deep, fontWeight: 380 }}>
                              {item.value}
                            </span>
                            <span className="text-[13px] font-bold" style={{ color: BRAND.text }}>
                              {item.unit}
                            </span>
                          </p>
                        )}
                      </div>
                      <span
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px]"
                        style={{ background: "rgba(169,209,89,0.28)", color: BRAND.deep }}
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.7} />
                      </span>
                    </div>
                    <p className="mt-7 text-[13px] leading-[1.85]" style={{ color: BRAND.muted }}>
                      {item.note}
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="mt-4 text-[11px] leading-[1.8]" style={{ color: BRAND.muted }}>
              ※ 金額は目安です。土地価格・金融機関・時期・ご家族の状況により変動します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="relative py-[clamp(76px,8vw,150px)]" style={{ background: BRAND.ivory }}>
      <div className="mx-auto max-w-[1280px] px-[var(--page-px)]">
        <SectionLead
          align="center"
          eyebrow="Three Proofs"
          title={
            <>
              不安をあおらず、
              <br className="sm:hidden" />
              数字でほどく。
            </>
          }
          body="資金計画ページで最初に伝えるべきことを、3つに絞ります。大きく見せるより、誤解なく残ることを優先します。"
        />

        <div className="mt-12 grid gap-px overflow-hidden border md:grid-cols-3" style={{ borderColor: BRAND.border, background: BRAND.border }}>
          {PROOFS.map((proof, index) => (
            <article key={proof.label} className="bg-white p-6 md:p-8">
              <p className="font-oswald text-[18px] leading-none" style={{ color: "rgba(29,29,24,0.34)", fontWeight: 360 }}>
                {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-7 text-[12px] font-bold tracking-[0.08em]" style={{ color: BRAND.muted }}>
                {proof.label}
              </p>
              <p className="mt-4 flex items-baseline gap-1.5 whitespace-nowrap">
                {proof.value === "4,500" && (
                  <span className="text-[24px] font-bold" style={{ color: BRAND.deep }}>
                    〜
                  </span>
                )}
                <span
                  className="font-oswald tabular-nums text-[clamp(56px,7vw,96px)] leading-none tracking-[0]"
                  style={{ color: index === 1 ? BRAND.lime : BRAND.deep, fontWeight: 390 }}
                >
                  {proof.value}
                </span>
                <span className="text-[14px] font-bold" style={{ color: BRAND.text }}>
                  {proof.unit}
                </span>
              </p>
              <p className="mt-5 text-[13px] leading-[1.9]" style={{ color: BRAND.muted }}>
                {proof.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MechanismSection() {
  return (
    <section className="relative overflow-hidden py-[clamp(86px,9vw,180px)]" style={{ background: BRAND.base }}>
      <div className="mx-auto grid max-w-[1280px] gap-12 px-[var(--page-px)] lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <SectionLead
            eyebrow="Yamato Mechanism"
            title={
              <>
                価格を削るのではなく、
                <br />
                余分を乗せない。
              </>
            }
            body={
              <>
                やまとは「安い会社」として見せません。
                土地・建物・資金を一社で扱うから、費用の見え方が整理しやすい。その仕組みを、資金計画ページの主役にします。
              </>
            }
          />

          <div className="mt-10 space-y-4">
            {MECHANISMS.map((item) => (
              <article
                key={item.no}
                className="grid grid-cols-[48px_1fr] gap-5 border-t pt-5"
                style={{ borderColor: BRAND.border }}
              >
                <span className="font-oswald text-[24px] leading-none" style={{ color: BRAND.deep, fontWeight: 360 }}>
                  {item.no}
                </span>
                <div>
                  <h3 className="text-[17px] font-bold leading-[1.55] tracking-[0]" style={{ color: BRAND.text }}>
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.9]" style={{ color: BRAND.muted }}>
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <figure className="relative aspect-[4/5] overflow-hidden border" style={{ borderColor: BRAND.border }}>
            <Image
              src="/images/newsozai/exterior-terrace-01.webp"
              alt="やまと不動産の実際の住まい外観"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ filter: "saturate(0.92) contrast(1.03)" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 58%, rgba(29,29,24,0.48) 100%)" }} />
            <figcaption className="absolute bottom-5 left-5 right-5">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/78">
                Real Yamato Photo
              </p>
              <p className="mt-2 text-[18px] font-bold leading-[1.45] tracking-[0] text-white">
                建物写真は、実際のやまと写真を起点に扱います。
              </p>
            </figcaption>
          </figure>

          <div
            className="absolute -bottom-8 -left-5 max-w-[310px] border bg-white p-5 shadow-[0_24px_60px_-34px_rgba(29,29,24,0.55)] md:-left-10"
            style={{ borderColor: BRAND.border }}
          >
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" style={{ color: BRAND.deep }} strokeWidth={1.8} />
              <p className="text-[12px] leading-[1.8]" style={{ color: BRAND.muted }}>
                IMAGE2を使う場合も、建物の形・素材・所在地事実は変えず、色味や空の印象のブラッシュアップに限定します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MidCta() {
  return (
    <section className="py-[clamp(58px,6vw,110px)]" style={{ background: BRAND.ivory }}>
      <div className="mx-auto max-w-[1120px] px-[var(--page-px)]">
        <div
          className="grid gap-7 border p-6 md:grid-cols-[1fr_auto] md:items-center md:p-9"
          style={{ borderColor: BRAND.border, background: BRAND.base }}
        >
          <div>
            <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: BRAND.deep }}>
              Money / First Question
            </p>
            <h2 className="mt-3 text-[22px] font-bold leading-[1.45] tracking-[0] md:text-[30px]" style={{ color: BRAND.text }}>
              気になる一点から、解決の糸口を見つけます。
            </h2>
            <p className="mt-3 max-w-[620px] text-[13px] leading-[1.9] md:text-[14px]" style={{ color: BRAND.muted }}>
              住宅ローン、土地代、頭金、つなぎ融資。まだ言葉になっていない疑問からで構いません。
            </p>
          </div>
          <LineButton className="w-full md:w-auto">LINEで一点だけ相談する</LineButton>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden py-[clamp(88px,9vw,180px)]" style={{ background: BRAND.deep }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="relative mx-auto max-w-[920px] px-[var(--page-px)] text-center">
        <Sparkles className="mx-auto h-7 w-7" style={{ color: BRAND.lime }} strokeWidth={1.5} />
        <p className="mt-7 font-inter text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.68)" }}>
          Private Money Consultation
        </p>
        <h2 className="mt-5 text-[clamp(28px,4vw,56px)] font-bold leading-[1.28] tracking-[0] text-white">
          気になる一点から、
          <br />
          解決の糸口を見つけます。
        </h2>
        <p className="mx-auto mt-6 max-w-[620px] text-[14px] leading-[2] text-white/72 md:text-[15px]">
          LINE・ご来場・フォーム・お電話、どの窓口でも構いません。
          ご相談後に「今は建てない」とお決めになっても、それで構いません。
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LineButton className="w-full sm:w-auto">LINEでお金の疑問を相談する</LineButton>
          <CtaButton
            href="/reserve"
            variant="dark-bg-secondary"
            size="md"
            label="モデルハウスを見学する"
            sublabel="ご予約なしでも見学可・無料"
            className="w-full sm:w-auto"
          />
        </div>
        <div className="mt-10 border-t pt-7" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
          <p className="text-[12px] text-white/58">お電話でのご相談も承ります</p>
          <a href="tel:0742-36-1123" className="mt-3 inline-flex items-baseline gap-2 transition-opacity hover:opacity-80">
            <Landmark className="h-5 w-5 text-white/42" strokeWidth={1.6} />
            <span className="font-oswald text-[clamp(30px,3.6vw,48px)] leading-none tracking-[0.02em] text-white" style={{ fontWeight: 420 }}>
              0742-36-1123
            </span>
          </a>
          <p className="mt-2 text-[11px] leading-[1.7] text-white/52">
            受付 9:00〜19:00（火・水定休）／株式会社やまと不動産 本社
          </p>
        </div>
      </div>
    </section>
  );
}

export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      <main className="font-sans" style={{ background: BRAND.base, color: BRAND.text }}>
        <Hero />
        <MoneyMap />
        <ProofSection />
        <MechanismSection />
        <MoneyFullSection />
        <MidCta />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
