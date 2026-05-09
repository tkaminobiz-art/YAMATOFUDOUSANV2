import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Home,
  Landmark,
  MapPinned,
  MessageCircle,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import LoanSimulator from "@/components/money/LoanSimulator";
import MoneyFullSection from "@/components/money/MoneyFullSection";
import { LINE_ADD_FRIEND_URL } from "@/data/line";
import { getActiveLots } from "@/data/lots";
import { FEATURED_WORKS } from "@/data/works";

export const metadata: Metadata = {
  title: "資金計画 | 土地込み総額を先に見る家づくり | やまと不動産",
  description:
    "奈良・京都南部で、土地代・建物代・外構・諸費用・住宅ローンまで最初に見える化。やまと不動産の資金計画ページです。",
};

const BRAND = {
  red: "#E84336",
  redDark: "#8F211B",
  redSoft: "#FFF0EE",
  green: "#2F4A2C",
  lime: "#A9D159",
  greenSoft: "#EDF5E4",
  paper: "#F8F4EA",
  ivory: "#FFFDF7",
  ink: "#171411",
  muted: "#625D52",
  border: "#DED8C8",
  line: "#06C755",
};

const ACTIVE_LOT_COUNT = getActiveLots().length;

const COSTS: Array<{
  icon: LucideIcon;
  label: string;
  amount: string;
  body: string;
}> = [
  {
    icon: MapPinned,
    label: "土地代",
    amount: "500〜2,500万円",
    body: "エリアと駅距離で大きく動きます。建物価格より先に候補を絞る費用です。",
  },
  {
    icon: ReceiptText,
    label: "諸費用",
    amount: "200〜400万円",
    body: "登記、ローン手数料、火災保険、印紙税など。契約前に一覧化します。",
  },
  {
    icon: Banknote,
    label: "つなぎ融資",
    amount: "30〜80万円",
    body: "一般的に上乗せされることがある費用。やまとの土地+建物なら原則発生しません。",
  },
  {
    icon: ShieldCheck,
    label: "地盤改良費",
    amount: "最大150万円",
    body: "当社規定の範囲でやまとが負担。土地選びの時点で確認します。",
  },
  {
    icon: Home,
    label: "外構・家具・引越し",
    amount: "50〜150万円+",
    body: "住み始めるための費用まで、月々支払いの前提に入れておきます。",
  },
  {
    icon: Landmark,
    label: "住宅ローン",
    amount: "35年",
    body: "借りられる額ではなく、返せる月々から土地と建物を逆算します。",
  },
];

const REVERSE_STEPS = [
  ["01", "月々支払い", "家計に無理が出にくいラインを先に置きます。"],
  ["02", "土地込み総額", "土地・建物・諸費用・外構を一枚で見ます。"],
  ["03", "増えやすい費用", "地盤、つなぎ融資、仲介、登記を契約前に確認します。"],
  ["04", "建てられる家", "その範囲で花・風・京のどれが現実的か決めます。"],
] as const;

const COMMON_STEPS = [
  ["01", "建物価格を見る"],
  ["02", "土地を後から探す"],
  ["03", "諸費用・外構・地盤を後で確認"],
  ["04", "総額と月々が最後に見える"],
] as const;

const PROOFS = [
  {
    value: "1,000",
    unit: "件以上",
    label: "資金計画作成実績",
    body: "家族ごとの総額ラインと月々支払いを整理してきた件数です。",
  },
  {
    value: "600",
    unit: "棟以上",
    label: "引き渡し実績",
    body: "予算相談の先に、実際に建った暮らしがあります。",
  },
  {
    value: "90",
    unit: "区画以上",
    label: "分譲実績",
    body: "土地なしのご家族にも、土地候補から提案できる土台です。",
  },
  {
    value: String(ACTIVE_LOT_COUNT),
    unit: "区画公開中",
    label: "今見せられる候補",
    body: "奈良・京都南部で、比較できる土地候補を持っています。",
  },
] as const;

const MODELS = [
  {
    jp: "花",
    en: "HANA",
    price: "2,480万円〜",
    size: "33坪 / 4LDK",
    body: "ゆとりを持たせたいご家族へ。収納やLDKの広さを諦めにくいモデルです。",
    image: "/images/works/case1-living.webp",
    badge: "専務一押し",
  },
  {
    jp: "風",
    en: "KAZE",
    price: "2,480万円〜",
    size: "30坪 / 4LDK",
    body: "価格と広さのバランスを取りやすいモデル。共働きの家事動線とも相性がいい設計です。",
    image: "/images/works/case2-kitchen.webp",
    badge: "バランス型",
  },
  {
    jp: "京",
    en: "KYO",
    price: "2,280万円〜",
    size: "28坪 / 3LDK",
    body: "総額を抑えやすい入口。土地条件と合わせて、月々の現実感をつくります。",
    image: "/images/works/case3-living.webp",
    badge: "総額重視",
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
    <div className={align === "center" ? "mx-auto max-w-[820px] text-center" : "max-w-[820px]"}>
      <p
        className="money-eyebrow"
        style={{ color: BRAND.red }}
      >
        {eyebrow}
      </p>
      <h2
        className="money-section-title mt-4"
        style={{ color: BRAND.ink }}
      >
        {title}
      </h2>
      {body && (
        <p className="money-body mt-5" style={{ color: BRAND.muted }}>
          {body}
        </p>
      )}
    </div>
  );
}

function PrimaryAnchor({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-[6px] px-6 py-4 text-[14px] font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-22px_rgba(232,67,54,0.85)] md:px-8 md:text-[15px]"
      style={{ background: BRAND.red }}
    >
      {children}
      <ArrowRight className="h-4 w-4" strokeWidth={2} />
    </a>
  );
}

function LineAnchor({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <a
      href={LINE_ADD_FRIEND_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-[56px] items-center justify-center gap-2 rounded-[6px] px-6 py-4 text-[14px] font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-20px_rgba(6,199,85,0.82)] ${className}`}
      style={{ background: BRAND.line }}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.9} fill="currentColor" />
      {children}
    </a>
  );
}

function Hero() {
  return (
    <section className="relative isolate overflow-hidden" style={{ background: BRAND.paper }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,20,17,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(23,20,17,0.14) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-[1480px] gap-10 px-[var(--page-px)] py-[clamp(72px,8vw,128px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div
            className="money-eyebrow inline-flex items-center gap-2 border px-3 py-2"
            style={{ borderColor: BRAND.red, color: BRAND.red, background: BRAND.redSoft }}
          >
            <AlertTriangle className="h-4 w-4" strokeWidth={2} />
            建物価格だけで判断しない
          </div>
          <h1
            className="money-hero-title mt-6"
            style={{ color: BRAND.ink }}
          >
            <span className="block whitespace-nowrap">その建物価格、</span>
            <span className="block whitespace-nowrap" style={{ color: BRAND.red }}>
              土地代も外構も
            </span>
            <span className="block whitespace-nowrap">入っていますか？</span>
          </h1>
          <p className="money-body mt-7 max-w-[680px]" style={{ color: BRAND.muted }}>
            「建物2,000万円台」だけで判断する前に、土地代・付帯工事・外構・諸費用・住宅ローンまで。
            あなたの場合の土地込み総額を、最初に見える化します。
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <PrimaryAnchor href="#diagnosis">無料で土地込み総額を診断する</PrimaryAnchor>
            <a
              href="#costs"
              className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-[6px] border px-6 py-4 text-[14px] font-black transition duration-300 hover:bg-white"
              style={{ borderColor: BRAND.ink, color: BRAND.ink }}
            >
              増えやすい費用を見る
              <ArrowDown className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border sm:grid-cols-3" style={{ borderColor: BRAND.border, background: BRAND.border }}>
            {[
              ["京モデル", "2,280", "万円〜"],
              ["資金計画", "1,000", "件以上"],
              ["公開区画", String(ACTIVE_LOT_COUNT), "区画"],
            ].map(([label, value, unit]) => (
              <div key={label} className="bg-white/88 p-4 backdrop-blur">
                <p className="money-eyebrow" style={{ color: BRAND.muted }}>
                  {label}
                </p>
                <p className="mt-2 flex items-baseline gap-1 whitespace-nowrap">
                  <span className="font-oswald money-hero-stat" style={{ color: BRAND.red }}>
                    {value}
                  </span>
                  <span className="whitespace-nowrap text-[12px] font-bold" style={{ color: BRAND.ink }}>
                    {unit}
                  </span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7 grid grid-cols-3 gap-2">
            {[
              ["/images/newsozai/exterior-entrance-01.webp", "やまと不動産のモデルハウス外観"],
              ["/images/works/case2-kitchen.webp", "やまと不動産のキッチン施工事例"],
              ["/images/works/case1-living.webp", "やまと不動産のリビング施工事例"],
            ].map(([src, alt]) => (
              <figure key={src} className="relative aspect-[4/3] overflow-hidden border" style={{ borderColor: BRAND.border }}>
                <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 30vw, 220px" className="object-cover" />
              </figure>
            ))}
          </div>
        </div>

        <LoanSimulator />
      </div>
    </section>
  );
}

function CostAuditSection() {
  return (
    <section id="costs" className="scroll-mt-24 py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.ivory }}>
      <div className="mx-auto max-w-[1360px] px-[var(--page-px)]">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <SectionLead
            eyebrow="Cost audit"
            title={
              <>
                怖いのは、建てられないことではなく
                <br />
                <span style={{ color: BRAND.red }}>後から総額が変わること。</span>
              </>
            }
            body={
              <>
                家づくりで見落としやすいのは、間取りより先に、契約前に見えていない費用です。
                だから最初に「何が含まれ、何が別で、どこが増えやすいか」を明らかにします。
              </>
            }
          />

          <div>
            <div className="grid gap-px overflow-hidden border md:grid-cols-2" style={{ borderColor: BRAND.border, background: BRAND.border }}>
              {COSTS.map((item, index) => {
                const Icon = item.icon;
                const hot = index < 4;
                return (
                  <article key={item.label} className="min-h-[210px] bg-white p-6 md:p-7">
                    <div className="flex items-start justify-between gap-5">
                      <div>
                        <p className="money-eyebrow" style={{ color: BRAND.muted }}>
                          {item.label}
                        </p>
                        <p className="font-oswald money-number-lg mt-4" style={{ color: hot ? BRAND.red : BRAND.green }}>
                          {item.amount}
                        </p>
                      </div>
                      <span
                        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[6px]"
                        style={{ background: hot ? BRAND.redSoft : BRAND.greenSoft, color: hot ? BRAND.red : BRAND.green }}
                        aria-hidden
                      >
                        <Icon className="h-5 w-5" strokeWidth={1.9} />
                      </span>
                    </div>
                    <p className="money-body-sm mt-6" style={{ color: BRAND.muted }}>
                      {item.body}
                    </p>
                  </article>
                );
              })}
            </div>
            <p className="money-body-sm mt-4" style={{ color: BRAND.muted }}>
              ※ 金額は目安です。土地・金融機関・時期・ご家族の状況により変動します。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReverseProcessSection() {
  return (
    <section className="py-[clamp(86px,9vw,180px)]" style={{ background: BRAND.paper }}>
      <div className="mx-auto max-w-[1360px] px-[var(--page-px)]">
        <SectionLead
          align="center"
          eyebrow="Reverse process"
          title={
            <>
              建物価格から始めない。
              <br />
              <span style={{ color: BRAND.green }}>月々と総額から逆算する。</span>
            </>
          }
          body="順番が変わると、同じ予算でも選ぶべき土地と建物がはっきりします。まず月々から、無理のない総額を置きます。"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-[1fr_1fr]">
          <div className="border bg-white" style={{ borderColor: BRAND.border }}>
            <div className="border-b p-5" style={{ borderColor: BRAND.border, background: BRAND.redSoft }}>
              <p className="money-eyebrow" style={{ color: BRAND.red }}>
                よくある迷い方
              </p>
              <h3 className="money-card-title mt-2" style={{ color: BRAND.ink }}>
                最後に総額が見える
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: BRAND.border }}>
              {COMMON_STEPS.map(([no, title]) => (
                <div key={no} className="grid grid-cols-[56px_1fr] gap-4 p-5">
                  <span className="font-oswald money-number-md" style={{ color: "rgba(232,67,54,0.45)" }}>
                    {no}
                  </span>
                  <p className="money-card-title" style={{ color: BRAND.ink }}>
                    {title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border bg-white shadow-[0_26px_70px_-48px_rgba(47,74,44,0.8)]" style={{ borderColor: BRAND.green }}>
            <div className="border-b p-5" style={{ borderColor: "rgba(47,74,44,0.28)", background: BRAND.greenSoft }}>
              <p className="money-eyebrow" style={{ color: BRAND.green }}>
                やまとの進め方
              </p>
              <h3 className="money-card-title mt-2" style={{ color: BRAND.ink }}>
                最初に総額が見える
              </h3>
            </div>
            <div className="divide-y" style={{ borderColor: BRAND.border }}>
              {REVERSE_STEPS.map(([no, title, body]) => (
                <div key={no} className="grid grid-cols-[56px_1fr] gap-4 p-5">
                  <span className="font-oswald money-number-md" style={{ color: BRAND.green }}>
                    {no}
                  </span>
                  <div>
                    <p className="money-card-title" style={{ color: BRAND.ink }}>
                      {title}
                    </p>
                    <p className="money-body-sm mt-1" style={{ color: BRAND.muted }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="py-[clamp(84px,8vw,160px)]" style={{ background: BRAND.ink }}>
      <div className="mx-auto max-w-[1360px] px-[var(--page-px)]">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <SectionLead
            eyebrow="Proof, not brochure"
            title={
              <span className="text-white">
                不安の直後に、
                <br />
                証拠を置く。
              </span>
            }
            body={
              <span className="text-white/68">
                実績は自己紹介ではありません。土地なし、総額不安、住宅ローン不安に向き合ってきた証拠として見せます。
              </span>
            }
          />

          <div className="grid gap-px overflow-hidden border md:grid-cols-4" style={{ borderColor: "rgba(255,255,255,0.18)", background: "rgba(255,255,255,0.18)" }}>
            {PROOFS.map((proof) => (
              <article key={proof.label} className="bg-[#201C18] p-5 md:p-6">
                <p className="money-eyebrow text-white/48">
                  {proof.label}
                </p>
                <p className="mt-4 flex items-baseline gap-1 whitespace-nowrap">
                  <span className="font-oswald money-number-lg" style={{ color: BRAND.lime }}>
                    {proof.value}
                  </span>
                  <span className="text-[12px] font-bold text-white">
                    {proof.unit}
                  </span>
                </p>
                <p className="money-body-sm mt-4 text-white/62">
                  {proof.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MechanismTeaser() {
  return (
    <section className="py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.ivory }}>
      <div className="mx-auto grid max-w-[1360px] gap-12 px-[var(--page-px)] lg:grid-cols-[0.98fr_1.02fr] lg:items-center">
        <div>
          <SectionLead
            eyebrow="Yamato mechanism"
            title={
              <>
                価格を削るのではなく、
                <br />
                <span style={{ color: BRAND.green }}>余分を乗せない。</span>
              </>
            }
            body={
              <>
                やまとは「安く見せる見積もり」では進めません。土地分譲・設計・施工・販売を一体で扱うことで、
                見積もりの外側に出やすい費用を先に整理します。
              </>
            }
          />

          <div className="mt-9 grid gap-3 sm:grid-cols-2">
            {[
              "自社分譲地を持つ",
              "土地・設計・施工を一体対応",
              "専用展示場を持たない",
              "高額広告費をかけない",
              "標準仕様を先に明示",
              "地盤改良費を当社規定で負担",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 border bg-white p-4" style={{ borderColor: BRAND.border }}>
                <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: BRAND.green }} strokeWidth={2} />
                <p className="money-body-sm font-bold" style={{ color: BRAND.ink }}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        <figure className="relative aspect-[4/5] overflow-hidden border" style={{ borderColor: BRAND.border }}>
          <Image
            src="/images/newsozai/exterior-terrace-01.webp"
            alt="やまと不動産の実際の住まい外観"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ filter: "saturate(0.95) contrast(1.04)" }}
          />
          <div className="absolute inset-x-0 bottom-0 p-5" style={{ background: "linear-gradient(180deg, rgba(23,20,17,0) 0%, rgba(23,20,17,0.78) 100%)" }}>
            <p className="money-eyebrow text-white/70">
              Real Yamato Photo
            </p>
            <p className="money-card-title mt-2 max-w-[460px] text-white">
              実際の住まいを見ながら、標準仕様と追加範囲を確認できます。
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}

function ModelSection() {
  return (
    <section className="py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.paper }}>
      <div className="mx-auto max-w-[1360px] px-[var(--page-px)]">
        <SectionLead
          align="center"
          eyebrow="Plans after money"
          title={
            <>
              商品を選ぶのは、
              <br />
              <span style={{ color: BRAND.red }}>総額が見えてから。</span>
            </>
          }
          body="花・風・京は、最初に見せる商品カタログではなく、総額診断のあとに選ぶ現実的な選択肢です。"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {MODELS.map((model) => (
            <article key={model.jp} className="border bg-white" style={{ borderColor: BRAND.border }}>
              <figure className="relative aspect-[16/10] overflow-hidden">
                <Image src={model.image} alt={`${model.jp}モデルの暮らしイメージ`} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
                <span
                  className="money-eyebrow absolute left-4 top-4 border px-3 py-1"
                  style={{ borderColor: model.jp === "京" ? BRAND.green : BRAND.red, color: model.jp === "京" ? BRAND.green : BRAND.red, background: "rgba(255,255,255,0.9)" }}
                >
                  {model.badge}
                </span>
              </figure>
              <div className="p-6">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <p className="money-eyebrow" style={{ color: BRAND.muted }}>
                      {model.en}
                    </p>
                    <h3 className="mt-1 text-[32px] font-bold leading-none tracking-[0]" style={{ color: BRAND.ink }}>
                      {model.jp}
                    </h3>
                  </div>
                  <p className="text-right">
                    <span className="font-oswald money-number-md block" style={{ color: model.jp === "花" ? BRAND.lime : BRAND.red }}>
                      {model.price}
                    </span>
                    <span className="mt-1 block text-[11px] font-bold" style={{ color: BRAND.muted }}>
                      {model.size}
                    </span>
                  </p>
                </div>
                <p className="money-body-sm mt-5" style={{ color: BRAND.muted }}>
                  {model.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseSection() {
  return (
    <section className="py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.ivory }}>
      <div className="mx-auto max-w-[1360px] px-[var(--page-px)]">
        <SectionLead
          eyebrow="Cases as proof"
          title={
            <>
              事例は、写真よりも
              <br />
              <span style={{ color: BRAND.green }}>不安から決断まで。</span>
            </>
          }
          body="同じ悩みがあったご家族の、土地・予算・間取りの解き方を見てください。"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {FEATURED_WORKS.map((work) => (
            <article key={work.id} className="border bg-white" style={{ borderColor: BRAND.border }}>
              <figure className="relative aspect-[4/3] overflow-hidden">
                <Image src={work.subs[0] ?? work.main} alt={work.title} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
              </figure>
              <div className="p-6">
                <p className="money-eyebrow" style={{ color: BRAND.red }}>
                  {work.title} / {work.model}
                </p>
                <h3 className="money-card-title mt-4" style={{ color: BRAND.ink }}>
                  {work.challenge}
                </h3>
                <div className="mt-5 border-l-[5px] p-4" style={{ borderColor: BRAND.green, background: BRAND.greenSoft }}>
                  <p className="money-eyebrow" style={{ color: BRAND.green }}>
                    設計での解決
                  </p>
                  <p className="money-card-title mt-2" style={{ color: BRAND.ink }}>
                    {work.solution}
                  </p>
                </div>
                <p className="money-body-sm mt-5" style={{ color: BRAND.muted }}>
                  {work.family} / {work.spec} / {work.meta?.priceRange ?? "価格帯確認中"}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function MidCta() {
  return (
    <section className="py-[clamp(64px,6vw,110px)]" style={{ background: BRAND.paper }}>
      <div className="mx-auto max-w-[1120px] px-[var(--page-px)]">
        <div className="grid gap-7 border p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8" style={{ borderColor: BRAND.red, background: "white" }}>
          <div>
            <p className="money-eyebrow" style={{ color: BRAND.red }}>
              First answer
            </p>
            <h2 className="money-tool-title mt-3" style={{ color: BRAND.ink }}>
              家づくりは、まだ決めなくて大丈夫です。
              <br />
              でも、総額だけは早く知ってください。
            </h2>
            <p className="money-body-sm mt-3 max-w-[700px]" style={{ color: BRAND.muted }}>
              知らないまま展示場を回るほど、判断は難しくなります。まずは土地込み総額の目安から。
            </p>
          </div>
          <PrimaryAnchor href="#diagnosis">30秒診断に戻る</PrimaryAnchor>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden py-[clamp(88px,9vw,180px)]" style={{ background: BRAND.red }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.65) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.65) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="relative mx-auto max-w-[980px] px-[var(--page-px)] text-center">
        <Sparkles className="mx-auto h-7 w-7 text-white" strokeWidth={1.8} />
        <p className="money-eyebrow mt-7 text-white/70">
          Total cost first
        </p>
        <h2 className="money-final-title mt-5 text-white">
          土地込み総額を知らないまま、
          <br />
          家づくりを進めない。
        </h2>
        <p className="money-body mx-auto mt-6 max-w-[680px] text-white/78">
          LINEで希望エリア・月々予算・土地の状況を送ってください。
          奈良・京都南部で現実的に選べる候補と、増えやすい費用を先に整理します。
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LineAnchor className="w-full sm:w-auto">無料で土地込み総額を相談する</LineAnchor>
          <Link
            href="/reserve"
            className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-[6px] border border-white/80 px-6 py-4 text-[14px] font-black text-white transition duration-300 hover:bg-white hover:text-[#171411] sm:w-auto"
          >
            モデルハウスで標準仕様を見る
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[12px] font-bold text-white/70">
          <span className="inline-flex items-center gap-1">
            <BadgeCheck className="h-4 w-4" strokeWidth={2} />
            相談無料
          </span>
          <span className="inline-flex items-center gap-1">
            <BadgeCheck className="h-4 w-4" strokeWidth={2} />
            火・水定休 / 9:00〜19:00
          </span>
          <span className="inline-flex items-center gap-1">
            <BadgeCheck className="h-4 w-4" strokeWidth={2} />
            TEL 0742-36-1123
          </span>
        </div>
      </div>
    </section>
  );
}

export default function MoneyIndexPage() {
  return (
    <>
      <Header />
      <main className="money-page" style={{ background: BRAND.paper, color: BRAND.ink }}>
        <Hero />
        <CostAuditSection />
        <ReverseProcessSection />
        <ProofSection />
        <MechanismTeaser />
        <ModelSection />
        <CaseSection />
        <MidCta />
        <MoneyFullSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
