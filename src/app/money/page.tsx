import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CircleDollarSign,
  FileText,
  Home,
  MapPinned,
  MessageCircle,
  PanelLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";
import LoanSimulator from "@/components/money/LoanSimulator";
import MoneyFullSection from "@/components/money/MoneyFullSection";
import { LINE_ADD_FRIEND_URL } from "@/data/line";
import { getActiveLots } from "@/data/lots";

export const metadata: Metadata = {
  title: "資金計画 | 土地込み総額を先に見る家づくり | やまと不動産",
  description:
    "奈良・京都南部で、土地代・建物代・外構・諸費用・住宅ローンまで最初に見える化。やまと不動産の資金計画ページです。",
};

const BRAND = {
  red: "#16A34A",
  redDark: "#116832",
  redSoft: "#ECFDF3",
  green: "#16A34A",
  lime: "#16A34A",
  greenSoft: "#ECFDF3",
  alert: "#DC2626",
  alertSoft: "#FEF2F2",
  paper: "#F4F5F7",
  ivory: "#FAFAFA",
  ink: "#0F1115",
  muted: "#5B6470",
  border: "#E5E7EB",
  dark: "#111418",
  line: "#16A34A",
};

const ACTIVE_LOT_COUNT = getActiveLots().length;

const AVOIDABLE_COSTS = [
  {
    label: "つなぎ融資",
    market: "30〜80万円",
    yamato: "やまとの土地 + 建物なら、原則発生しない",
  },
  {
    label: "仲介手数料",
    market: "50〜100万円",
    yamato: "当社分譲地なら不要",
  },
  {
    label: "地盤改良費",
    market: "最大150万円",
    yamato: "当社規定で負担",
  },
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

const DASH_NAV = [
  [Home, "商品選択"],
  [MapPinned, "土地条件"],
  [CircleDollarSign, "月々返済"],
  [BarChart3, "実績"],
  [ShieldCheck, "処理状況"],
] as const;

const PAYMENT_CASES = [
  {
    no: "Case01",
    concern: "土地がまだなく、月々8万円台で収まるか不安でした。",
    headline: "京モデルなら、土地込みでも月々8万円台が見えるラインへ。",
    family: "30代ご夫婦 + お子様1人",
    income: "世帯年収550万円",
    plan: "京モデル 28坪 / 3LDK",
    total: "3,180万円",
    breakdown: "建物2,280万円 + 土地650万円 + 諸費用250万円",
    borrowing: "3,080万円",
    monthly: "86,944",
    ratio: "19.0%",
    terms: "試算用金利1.0% / 35年元利均等 / 頭金100万円 / ボーナス払いなし",
    image: "/images/works/case3-living.webp",
    caption: "総額を抑えながら、暮らしの核を整えるケース",
  },
  {
    no: "Case02",
    concern: "子ども2人。収納と家事動線は削りたくありませんでした。",
    headline: "風モデルで、広さと月々9万円台の現実感を両立。",
    family: "30代ご夫婦 + お子様2人",
    income: "世帯年収680万円",
    plan: "風モデル 30坪 / 4LDK",
    total: "3,580万円",
    breakdown: "建物2,480万円 + 土地850万円 + 諸費用250万円",
    borrowing: "3,380万円",
    monthly: "95,413",
    ratio: "16.8%",
    terms: "試算用金利1.0% / 35年元利均等 / 頭金200万円 / ボーナス払いなし",
    image: "/images/works/case2-kitchen.webp",
    caption: "共働きの家事動線と、予算の余白を同時に見るケース",
  },
  {
    no: "Case03",
    concern: "年収的に、注文住宅は厳しいと思っていました。",
    headline: "土地条件を整えると、月々8万円前後まで圧縮できることがあります。",
    family: "20代ご夫婦",
    income: "世帯年収480万円",
    plan: "京モデル 28坪 / 3LDK",
    total: "2,980万円",
    breakdown: "建物2,280万円 + 土地450万円 + 諸費用250万円",
    borrowing: "2,880万円",
    monthly: "81,298",
    ratio: "20.3%",
    terms: "試算用金利1.0% / 35年元利均等 / 頭金100万円 / ボーナス払いなし",
    image: "/images/works/case1-living.webp",
    caption: "エリアと土地条件を調整し、無理のない総額を探すケース",
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
      className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-[8px] px-6 py-4 text-[14px] font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(22,163,74,0.7)] md:px-8 md:text-[15px]"
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
      className={`inline-flex min-h-[56px] items-center justify-center gap-2 rounded-[8px] px-6 py-4 text-[14px] font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(22,163,74,0.7)] ${className}`}
      style={{ background: BRAND.line }}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.9} fill="currentColor" />
      {children}
    </a>
  );
}

function DashboardPreviewCard() {
  return (
    <aside
      className="relative overflow-hidden rounded-[8px] border bg-[#111418] p-4 text-white shadow-[0_1px_2px_rgba(15,17,21,0.08),0_18px_42px_-30px_rgba(15,17,21,0.55)] md:p-5"
      style={{ borderColor: "rgba(255,255,255,0.12)" }}
      aria-label="土地込み総額ダッシュボードのプレビュー"
    >
      <div className="flex items-center justify-between gap-4 border-b pb-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <div>
          <p className="money-eyebrow text-white/48">Smart Ledger Preview</p>
          <h2 className="mt-2 text-[22px] font-bold leading-[1.35] tracking-[0] text-white md:text-[28px]">
            土地込み総額を、
            <br />
            一枚で見る。
          </h2>
        </div>
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px]" style={{ background: BRAND.red, color: "white" }}>
          <PanelLeft className="h-5 w-5" strokeWidth={1.9} />
        </span>
      </div>

      <div className="grid gap-3 py-4 md:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[8px] border bg-white p-4 text-[#0F1115]" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
          <p className="money-eyebrow" style={{ color: BRAND.muted }}>
            診断サンプルの総額目安
          </p>
          <p className="mt-3 flex items-end gap-2">
            <span className="font-oswald text-[64px] leading-[0.9]" style={{ color: BRAND.red }}>
              3,310
            </span>
            <span className="pb-1 text-[14px] font-bold">万円</span>
          </p>
          <div className="mt-4 grid grid-cols-3 gap-px overflow-hidden border" style={{ borderColor: BRAND.border, background: BRAND.border }}>
            {[
              ["建物", "2,280万"],
              ["土地", "650万"],
              ["月々", "8.8万"],
            ].map(([label, value]) => (
              <div key={label} className="bg-[#F8F9FA] p-3">
                <p className="text-[10px] font-bold" style={{ color: BRAND.muted }}>{label}</p>
                <p className="mt-1 text-[15px] font-bold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <div className="rounded-[8px] border bg-white/5 p-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <p className="money-eyebrow text-white/48">Risk Meter</p>
            <div className="mt-4 h-[82px] overflow-hidden">
              <div className="mx-auto grid h-[140px] w-[140px] place-items-center rounded-full border-[18px]" style={{ borderColor: "rgba(255,255,255,0.14)", borderTopColor: BRAND.red, borderLeftColor: BRAND.red }}>
                <div className="text-center">
                  <p className="text-[10px] text-white/44">追加費用</p>
                  <p className="text-[15px] font-bold text-white">先に確認</p>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-[8px] border p-4" style={{ borderColor: "rgba(22,163,74,0.24)", background: "rgba(22,163,74,0.12)" }}>
            <p className="money-eyebrow" style={{ color: BRAND.lime }}>Solved</p>
            <p className="mt-2 text-[15px] font-bold leading-[1.45] text-white">
              つなぎ融資・地盤・仲介を先に整理。
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-2 border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        {[
          ["建物", "2,280万円", "82%"],
          ["土地", "650万円", "40%"],
          ["諸費用", "380万円", "32%"],
        ].map(([label, value, width]) => (
          <div key={label} className="grid grid-cols-[54px_1fr_76px] items-center gap-3">
            <p className="text-[11px] font-bold text-white/52">{label}</p>
            <span className="h-2 bg-white/10">
              <span className="block h-full" style={{ width, background: label === "建物" ? BRAND.red : "#94A3B8" }} />
            </span>
            <p className="text-right text-[12px] font-bold text-white">{value}</p>
          </div>
        ))}
      </div>
    </aside>
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
            "linear-gradient(rgba(15,17,21,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,17,21,0.06) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-[1480px] gap-10 px-[var(--page-px)] py-[clamp(72px,8vw,128px)] lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <div
            className="money-eyebrow inline-flex items-center gap-2 rounded-[8px] border bg-white px-3 py-2"
            style={{ borderColor: BRAND.border, color: BRAND.alert }}
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
              className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-[8px] border bg-white px-6 py-4 text-[14px] font-black transition duration-300 hover:border-[#16A34A] hover:text-[#16A34A]"
              style={{ borderColor: BRAND.ink, color: BRAND.ink }}
            >
              増えやすい費用を見る
              <ArrowDown className="h-4 w-4" strokeWidth={2} />
            </a>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[8px] border bg-white shadow-[0_1px_2px_rgba(15,17,21,0.04)] sm:grid-cols-3" style={{ borderColor: BRAND.border }}>
            {[
              ["京モデル", "2,280", "万円〜"],
              ["資金計画", "1,000", "件以上"],
              ["公開区画", String(ACTIVE_LOT_COUNT), "区画"],
            ].map(([label, value, unit]) => (
              <div key={label} className="bg-white p-4">
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
              <figure key={src} className="relative aspect-[4/3] overflow-hidden rounded-[8px] border" style={{ borderColor: BRAND.border }}>
                <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 30vw, 220px" className="object-cover" />
              </figure>
            ))}
          </div>
        </div>

        <DashboardPreviewCard />
      </div>
    </section>
  );
}

function CostAuditSection() {
  return (
    <section id="costs" className="scroll-mt-24 py-[clamp(96px,9vw,150px)]" style={{ background: BRAND.ivory }}>
      <div className="mx-auto max-w-[1480px] px-[var(--page-px)]">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionLead
            eyebrow="Yamato Smart Ledger"
            title={
              <>
                まず建物を選び、
                <br />
                <span style={{ color: BRAND.red }}>土地込みの月々を見る。</span>
              </>
            }
            body={
              <>
                建物価格は固定です。花・風・京を先に選び、土地代・諸費用・自己資金を重ねて、
                自分たちの総額と月々返済を確認します。
              </>
            }
          />
          <div className="flex flex-col gap-3 sm:flex-row">
            <PrimaryAnchor href="#diagnosis">無料で土地込み総額を診断する</PrimaryAnchor>
            <Link
              href="/reserve"
              className="inline-flex min-h-[58px] items-center justify-center gap-2 rounded-[8px] border bg-white px-6 py-4 text-[14px] font-bold transition duration-300 hover:border-[#16A34A] hover:text-[#16A34A]"
              style={{ borderColor: BRAND.ink, color: BRAND.ink }}
            >
              標準仕様を見る
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </Link>
          </div>
        </div>

        <div className="overflow-hidden rounded-[8px] border bg-white shadow-[0_1px_2px_rgba(15,17,21,0.04),0_12px_32px_-26px_rgba(15,17,21,0.22)]" style={{ borderColor: BRAND.border }}>
          <div className="grid lg:grid-cols-[188px_1fr]">
            <aside className="hidden bg-[#111418] p-5 text-white lg:block">
              <div className="flex items-center justify-between gap-4 border-b pb-5" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <div>
                  <p className="money-eyebrow text-white/42">Yamato</p>
                  <p className="mt-1 text-[17px] font-bold leading-[1.35]">Smart Ledger</p>
                </div>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-[8px]" style={{ background: BRAND.red }}>
                  <PanelLeft className="h-4 w-4" strokeWidth={2} />
                </span>
              </div>
              <nav className="mt-6 space-y-2" aria-label="資金計画ダッシュボード">
                {DASH_NAV.map(([Icon, label], index) => (
                  <a
                    key={label}
                    href={index === 0 ? "#diagnosis" : "#costs"}
                    className="flex min-h-[42px] items-center gap-3 rounded-[8px] px-3 text-[13px] font-bold transition hover:bg-white/10"
                    style={{ background: index === 0 ? "white" : "transparent", color: index === 0 ? BRAND.ink : "rgba(255,255,255,0.68)" }}
                  >
                    <Icon className="h-4 w-4" strokeWidth={1.9} />
                    {label}
                  </a>
                ))}
              </nav>
              <div className="mt-8 rounded-[8px] border p-4" style={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.05)" }}>
                <p className="money-eyebrow text-white/42">Primary action</p>
                <p className="mt-3 text-[14px] font-bold leading-[1.6]">
                  まずは自分たちの土地込み総額を出す。
                </p>
                <a
                  href={LINE_ADD_FRIEND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-[8px] text-[12px] font-bold text-white"
                  style={{ background: BRAND.line }}
                >
                  <MessageCircle className="h-4 w-4" fill="currentColor" strokeWidth={1.8} />
                  LINEで聞く
                </a>
              </div>
            </aside>

            <div className="min-w-0 p-4 md:p-6 lg:p-7">
              <div className="mb-5 flex flex-col gap-4 border-b pb-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: BRAND.border }}>
                <div>
                  <p className="money-eyebrow" style={{ color: BRAND.red }}>Dashboard / Total Cost First</p>
                  <h2 className="money-tool-title mt-2" style={{ color: BRAND.ink }}>
                    土地込み総額ダッシュボード
                  </h2>
                  <p className="money-body-sm mt-2" style={{ color: BRAND.muted }}>
                    奈良・京都南部で、土地なしの状態から総額と月々を見える化します。
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[8px] border bg-white" style={{ borderColor: BRAND.border }}>
                  {[
                    ["公開区画", `${ACTIVE_LOT_COUNT}`],
                    ["資金計画", "1,000+"],
                    ["引渡し", "600+"],
                  ].map(([label, value]) => (
                    <div key={label} className="min-w-[92px] px-4 py-3">
                      <p className="text-[10px] font-bold" style={{ color: BRAND.muted }}>{label}</p>
                      <p className="font-oswald money-number-sm mt-1" style={{ color: BRAND.ink }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <LoanSimulator />

                <div className="grid gap-4 xl:grid-cols-[1.45fr_0.55fr]">
                  <article className="rounded-[8px] border bg-white p-5 shadow-[0_1px_2px_rgba(15,17,21,0.04)] md:p-6" style={{ borderColor: BRAND.border }}>
                    <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-start">
                      <div>
                        <p className="money-eyebrow" style={{ color: BRAND.red }}>Cost removed first</p>
                        <h3 className="money-card-title mt-2" style={{ color: BRAND.ink }}>
                          本来、後から上乗せされやすい費用。
                          <br />
                          やまとなら、先に外せるものがあります。
                        </h3>
                      </div>
                      <p className="max-w-[300px] text-[12px] font-bold leading-[1.7]" style={{ color: BRAND.muted }}>
                        「安く見えた見積もり」が後から膨らむ原因を、契約前に分けて確認します。
                      </p>
                    </div>

                    <div className="mt-6 grid gap-3">
                      {AVOIDABLE_COSTS.map((item) => (
                        <div
                          key={item.label}
                          className="grid gap-3 rounded-[8px] border bg-[#F8FAFC] p-4 md:grid-cols-[140px_180px_1fr] md:items-center"
                          style={{ borderColor: BRAND.border }}
                        >
                          <p className="text-[14px] font-black" style={{ color: BRAND.ink }}>{item.label}</p>
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.06em]" style={{ color: BRAND.muted }}>一般的に上乗せ</p>
                            <p className="mt-1 text-[20px] font-black leading-none" style={{ color: BRAND.alert }}>{item.market}</p>
                          </div>
                          <div className="rounded-[8px] border-l-[4px] bg-white px-4 py-3" style={{ borderColor: BRAND.red }}>
                            <p className="text-[10px] font-bold uppercase tracking-[0.06em]" style={{ color: BRAND.red }}>やまとなら</p>
                            <p className="mt-1 text-[14px] font-black leading-[1.6]" style={{ color: BRAND.ink }}>{item.yamato}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <p className="money-body-sm mt-4" style={{ color: BRAND.muted }}>
                      土地条件・金融機関・当社規定によって個別確認は必要です。だからこそ、最初の資金計画でここを先に見ます。
                    </p>
                  </article>

                  <article className="rounded-[8px] border bg-white p-5 shadow-[0_1px_2px_rgba(15,17,21,0.04)] md:p-6" style={{ borderColor: BRAND.border }}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="money-eyebrow" style={{ color: BRAND.green }}>Proof</p>
                        <h3 className="money-card-title mt-2" style={{ color: BRAND.ink }}>
                          判断の根拠
                        </h3>
                      </div>
                      <FileText className="h-5 w-5" style={{ color: BRAND.green }} strokeWidth={1.9} />
                    </div>
                    <div className="mt-5 grid gap-px overflow-hidden rounded-[8px] border" style={{ borderColor: BRAND.border, background: BRAND.border }}>
                      {PROOFS.slice(0, 3).map((proof) => (
                        <div key={proof.label} className="bg-[#F8F9FA] p-4">
                          <p className="font-oswald text-[34px] leading-none" style={{ color: BRAND.green }}>
                            {proof.value}
                            <span className="ml-1 text-[11px] font-bold" style={{ color: BRAND.ink }}>{proof.unit}</span>
                          </p>
                          <p className="mt-2 text-[13px] font-bold" style={{ color: BRAND.ink }}>{proof.label}</p>
                          <p className="mt-1 text-[12px] leading-[1.65]" style={{ color: BRAND.muted }}>{proof.body}</p>
                        </div>
                      ))}
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PaymentExampleSection() {
  return (
    <section
      id="payment-examples"
      className="relative scroll-mt-24 overflow-hidden py-[clamp(88px,9vw,176px)]"
      style={{ background: BRAND.paper }}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,17,21,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,17,21,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-[1480px] px-[var(--page-px)]">
        <div className="grid gap-8 lg:grid-cols-[0.74fr_1.26fr] lg:items-end">
          <SectionLead
            eyebrow="Payment cases"
            title={
              <>
                月々いくらなら、
                <br />
                <span style={{ color: BRAND.red }}>本当に払えるのか。</span>
              </>
            }
            body={
              <span style={{ color: "rgba(17,19,21,0.66)" }}>
                総額は、数字だけだとまだ遠い。家族構成・年収・土地代・借入額・月々返済を同じカードで見ると、
                自分たちの現実ラインが掴みやすくなります。
              </span>
            }
          />
          <div className="rounded-[8px] border-l-[4px] bg-white p-5 shadow-[0_1px_2px_rgba(15,17,21,0.04)]" style={{ borderColor: BRAND.red }}>
            <p className="money-card-title" style={{ color: BRAND.ink }}>
              表示は「試算用金利1.0%・35年元利均等・ボーナス払いなし（毎月返済のみ）」の資金計画例です。
            </p>
            <p className="money-body-sm mt-2" style={{ color: BRAND.muted }}>
              実際の適用金利・金利タイプ・審査条件、諸費用を借入に含められるかは金融機関と土地条件により変わります。
            </p>
          </div>
        </div>

        <div className="mt-12 -mx-[var(--page-px)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--page-px)] pb-7">
          {PAYMENT_CASES.map((item) => (
            <article
              key={item.no}
              className="relative min-w-[min(1120px,calc(100vw-32px))] snap-center overflow-hidden rounded-[8px] border bg-white shadow-[0_1px_2px_rgba(15,17,21,0.04),0_12px_32px_-26px_rgba(15,17,21,0.22)] lg:min-w-[1120px]"
              style={{ borderColor: BRAND.border }}
            >
              <div
                aria-hidden
                className="pointer-events-none absolute left-7 top-2 font-oswald text-[76px] leading-none text-[#D9DEE3] md:left-14 md:text-[132px]"
              >
                {item.no}
              </div>

              <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
                <div className="pt-12 md:pt-16">
                  <p className="money-body-sm font-bold" style={{ color: BRAND.ink }}>
                    {item.concern}
                  </p>
                  <h3 className="mt-5 text-[24px] font-bold leading-[1.5] md:text-[32px]" style={{ color: BRAND.ink }}>
                    {item.headline}
                  </h3>

                  <div className="mt-10 grid gap-4">
                    {[
                      ["家族", item.family],
                      ["年収", item.income],
                      ["プラン", item.plan],
                      ["予算", item.total],
                      ["内訳", item.breakdown],
                      ["借入", item.borrowing],
                    ].map(([label, value]) => (
                      <div key={label} className="grid gap-2 border-b pb-4 md:grid-cols-[86px_1fr] md:items-baseline" style={{ borderColor: BRAND.border }}>
                        <span
                          className="inline-flex w-fit items-center justify-center rounded-[4px] px-2.5 py-1 text-[12px] font-bold text-white"
                          style={{ background: "#64748B" }}
                        >
                          {label}
                        </span>
                        <p className="money-body-sm font-bold" style={{ color: BRAND.ink }}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid content-between gap-8">
                  <div className="flex items-start justify-between gap-5">
                    <figure className="relative aspect-[4/3] w-[126px] overflow-hidden rounded-[8px] border md:w-[172px]" style={{ borderColor: BRAND.border }}>
                      <Image
                        src={item.image}
                        alt={item.caption}
                        fill
                        sizes="(max-width: 768px) 126px, 172px"
                        className="object-cover"
                      />
                    </figure>
                    <div className="max-w-[280px] text-right">
                      <p className="money-eyebrow" style={{ color: BRAND.muted }}>
                        Yamato simulation
                      </p>
                      <p className="money-body-sm mt-3" style={{ color: BRAND.muted }}>
                        {item.caption}
                      </p>
                    </div>
                  </div>

                  <div className="border-t pt-8" style={{ borderColor: BRAND.border }}>
                    <p
                      className="inline-flex rounded-[4px] px-3 py-1 text-[12px] font-bold text-white"
                      style={{ background: "#64748B" }}
                    >
                      住宅ローン
                    </p>
                    <p className="money-body-sm mt-4 font-bold" style={{ color: BRAND.ink }}>
                      月々返済額
                    </p>
                    <p className="mt-3 flex items-end gap-2 whitespace-nowrap">
                      <span className="font-oswald text-[58px] leading-none md:text-[76px]" style={{ color: BRAND.red }}>
                        {item.monthly}
                      </span>
                      <span className="pb-2 text-[18px] font-bold" style={{ color: BRAND.ink }}>
                        円 / 月
                      </span>
                    </p>
                    <p className="money-body-sm mt-4 font-bold" style={{ color: BRAND.ink }}>
                      {item.terms}
                    </p>
                    <div className="mt-8 grid gap-4 border-t pt-5 sm:grid-cols-2" style={{ borderColor: BRAND.border }}>
                      <div>
                        <p className="money-eyebrow" style={{ color: BRAND.muted }}>
                          返済比率
                        </p>
                        <p className="mt-2 font-oswald text-[34px] leading-none" style={{ color: BRAND.green }}>
                          {item.ratio}
                        </p>
                      </div>
                      <div>
                        <p className="money-eyebrow" style={{ color: BRAND.muted }}>
                          確認ポイント
                        </p>
                        <p className="money-body-sm mt-2" style={{ color: BRAND.muted }}>
                          返済比率はこの試算の年間返済額を世帯年収で割った概算
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-2 h-2 w-24 rounded-full bg-[#CBD5E1]" aria-hidden />
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="relative overflow-hidden py-[clamp(88px,9vw,180px)]" style={{ background: BRAND.ivory }}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.26]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15,17,21,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,17,21,0.04) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="relative mx-auto max-w-[980px] px-[var(--page-px)] text-center">
        <Sparkles className="mx-auto h-7 w-7" style={{ color: BRAND.red }} strokeWidth={1.8} />
        <p className="money-eyebrow mt-7" style={{ color: BRAND.red }}>
          Total cost first
        </p>
        <h2 className="money-final-title mt-5" style={{ color: BRAND.ink }}>
          土地込み総額を知らないまま、
          <br />
          家づくりを進めない。
        </h2>
        <p className="money-body mx-auto mt-6 max-w-[680px]" style={{ color: BRAND.muted }}>
          LINEで希望エリア・月々予算・土地の状況を送ってください。
          奈良・京都南部で現実的に選べる候補と、増えやすい費用を先に整理します。
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LineAnchor className="w-full sm:w-auto">無料で土地込み総額を相談する</LineAnchor>
          <Link
            href="/reserve"
            className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-[8px] border bg-white px-6 py-4 text-[14px] font-black transition duration-300 hover:border-[#16A34A] hover:text-[#16A34A] sm:w-auto"
            style={{ borderColor: BRAND.border, color: BRAND.ink }}
          >
            モデルハウスで標準仕様を見る
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-[12px] font-bold" style={{ color: BRAND.muted }}>
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
        <PaymentExampleSection />
        <MoneyFullSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
