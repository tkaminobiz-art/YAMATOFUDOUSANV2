import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  FileText,
  House,
  MapPinned,
  MessageCircle,
  PencilRuler,
  Phone,
  ReceiptText,
} from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";
import AnimatedNumber from "@/components/bplan/AnimatedNumber";
import ProcessFlow from "@/components/bplan/diagrams/ProcessFlow";
import CostCheckIcons from "@/components/bplan/diagrams/CostCheckIcons";
import EmotionCurve from "@/components/bplan/diagrams/EmotionCurve";
import {
  DELIVERED_HOMES,
  BUSINESS_YEARS,
  FOUNDED_YEAR,
  CUSTOMER_VOICES,
  FUNDING_PLANS,
  GROUND_WARRANTY_YEARS,
  TERMITE_WARRANTY_YEARS,
  COMPANY_NAME,
  REAL_ESTATE_LICENSE_LABEL,
  REAL_ESTATE_LICENSE_NO,
} from "@/data/brand-facts";
import { REPRESENTATIVES } from "@/data/staff";
import ReasonReveal from "@/components/bplan/ReasonReveal";
import TruthVoiceSlider from "@/components/bplan/TruthVoiceSlider";
import VoiceProofObserver from "@/components/bplan/VoiceProofObserver";

export const metadata: Metadata = {
  title: "大手の理想を、現実の総額に。 | やまと不動産",
  description:
    "大手と同品質の素材・装備を、土地・建物・諸費用まで含めた現実の総額へ。奈良・京都南部で、誇れる注文住宅を適正価格で考えるやまと不動産のBPlan。",
};

const P = {
  ink: "#181714",
  white: "#fffdfa",
  paper: "#f4efe6",
  smoke: "#ece6db",
  line: "rgba(24,23,20,0.16)",
  mute: "#716b61",
  green: "#195842",
  red: "#ea4b2a",
  rust: "#8a5232",
};

const heroStats = [
  {
    number: "01",
    title: "大手品質",
    lead: "素材・装備まで妥協しない",
  },
  {
    number: "02",
    title: "総額提示",
    lead: "土地・建物・諸費用まで見える",
  },
  {
    number: "03",
    title: "自由設計",
    lead: "こだわりを適正価格で足せる",
  },
];

const voiceProofs = [
  {
    Icon: BadgeCheck,
    label: "標準仕様",
    quote: "「これも標準なんですか？」が口グセになりました。",
  },
  {
    Icon: ReceiptText,
    label: "総額",
    quote: "最初の一枚の見積もりから引渡しまで、本当に増額がありませんでした。",
  },
  {
    Icon: MapPinned,
    label: "土地",
    quote: "土地探しから一本でお願いできた。これが一番ありがたかった。",
  },
  {
    Icon: PencilRuler,
    label: "自由設計",
    quote: "この予算で、ここまでこだわれると思っていなかったです。",
  },
  {
    Icon: ReceiptText,
    label: "価格",
    quote: "「あとで増えるかも」を、ずっと心配しなくてよかった。",
  },
  {
    Icon: BadgeCheck,
    label: "標準仕様",
    quote: "最後の見積もりが、最初とほとんど変わらなかったんです。",
  },
  {
    Icon: PencilRuler,
    label: "間取り",
    quote: "「無理です」じゃなくて、「こうしませんか」が返ってくる。",
  },
  {
    Icon: MapPinned,
    label: "土地",
    quote: "「ここに住みたい」場所で、家の輪郭まで見えてきました。",
  },
  {
    Icon: BadgeCheck,
    label: "設備",
    quote: "大手で一度諦めた理想が、ここで叶いました。",
  },
  {
    Icon: PencilRuler,
    label: "提案",
    quote: "いつの間にか、打合せの日を待つようになっていました。",
  },
  {
    Icon: ReceiptText,
    label: "明瞭",
    quote: "「これは標準、これは追加」が最初から全部わかる。",
  },
  {
    Icon: PencilRuler,
    label: "人",
    quote: "迷っているときに、一緒に悩んでくれた。それがすごく嬉しかった。",
  },
  {
    Icon: MapPinned,
    label: "土地",
    quote: "もっと早く、ここに来ればよかった。",
  },
  {
    Icon: BadgeCheck,
    label: "誇り",
    quote: "遊びに来た友だちから、毎回「いい家だね」って言われます。",
  },
  {
    Icon: ReceiptText,
    label: "建てた後",
    quote: "建てて終わり、じゃなかった。今でも電話するとすぐ来てくれます。",
  },
];

const featuredVoiceProofs = [
  voiceProofs[0],
  voiceProofs[1],
  voiceProofs[2],
  voiceProofs[3],
  voiceProofs[8],
];

const honestFeelings = [
  {
    number: "01",
    category: "自由設計",
    feeling: "注文住宅だから、希望はできるだけ叶えたい。",
    response: "まず希望をすべて聞かせてもらい、残すところと調整するところを総額の中で分けます。",
  },
  {
    number: "02",
    category: "総額",
    feeling: "でも、総額はできるだけ抑えたい。",
    response: "専用展示場を持たず、自社分譲地のモデルハウスを活用。販売運営費を抑えて、家に予算を回します。",
  },
  {
    number: "03",
    category: "追加費用",
    feeling: "見積もりに出ていない追加料金が、あとで増えないか知りたい。",
    response: "外構・登記・ローン費用・追加になりやすい仕様まで、契約前に同じ表で確認します。",
  },
  {
    number: "04",
    category: "標準仕様",
    feeling: "標準仕様は充実していてほしい。必要なら変更もしたい。",
    response: "標準装備を実物で確認してから、変えたい部分だけオプションで選べます。",
  },
  {
    number: "05",
    category: "自社分譲地",
    feeling: "土地探しで、家づくりを止めたくない。",
    response: "自社分譲地も扱い、土地と建物と月々の支払いを一緒に組み立てます。",
  },
];

const paymentCases = [
  {
    no: "Case01",
    customer: "奈良市 Aさん（35歳・3人家族）",
    concern: "最初は、うちの年収で本当に払っていけるのか分かりませんでした。",
    headline: "土地と建物を合わせた月々が見えて、やっと前向きに考えられました。",
    family: "30代ご夫婦 + お子様1人",
    income: "世帯年収550万円",
    plan: "京モデル 28坪 / 3LDK",
    total: "3,180",
    breakdown: ["建物2,280万円", "土地650万円", "諸費用250万円"],
    parts: { building: 2280, land: 650, fee: 250 },
    totalNum: 3180,
    monthlyNum: 86944,
    borrowing: "3,080万円",
    monthly: "86,944",
    ratio: "19.0%",
    image: "/images/bplan/payment-cases/payment-case-01.png",
  },
  {
    no: "Case02",
    customer: "橿原市 Bさん（38歳・4人家族）",
    concern: "家族4人で暮らすなら、広さを削るしかないと思っていました。",
    headline: "総額を見ながら、残したい希望と調整する部分をひとつずつ決められました。",
    family: "30代ご夫婦 + お子様2人",
    income: "世帯年収680万円",
    plan: "風モデル 30坪 / 4LDK",
    total: "3,580",
    breakdown: ["建物2,480万円", "土地850万円", "諸費用250万円"],
    parts: { building: 2480, land: 850, fee: 250 },
    totalNum: 3580,
    monthlyNum: 95413,
    borrowing: "3,380万円",
    monthly: "95,413",
    ratio: "16.8%",
    image: "/images/bplan/payment-cases/payment-case-02.png",
  },
  {
    no: "Case03",
    customer: "木津川市 Cさん（29歳・2人家族）",
    concern: "20代で注文住宅は、まだ先の話だと思っていました。",
    headline: "土地と建物を合わせて月々を見たら、自分たちにも届くと思えました。",
    family: "20代ご夫婦",
    income: "世帯年収480万円",
    plan: "京モデル 28坪 / 3LDK",
    total: "2,980",
    breakdown: ["建物2,280万円", "土地450万円", "諸費用250万円"],
    parts: { building: 2280, land: 450, fee: 250 },
    totalNum: 2980,
    monthlyNum: 81298,
    borrowing: "2,880万円",
    monthly: "81,298",
    ratio: "20.3%",
    image: "/images/bplan/payment-cases/payment-case-03.png",
  },
];

const costCompareRows = [
  {
    label: "地盤改良費",
    general: "追加で見積もりに入ることがあります。",
    answer: "一切かかりません",
    reason: "必要な場合も、お客様への追加請求にしません。",
  },
  {
    label: "つなぎ融資",
    general: "土地を先に買う場合、必要になることがあります。",
    answer: "原則発生しません",
    reason: "自社分譲地と建物を一体で進めます。",
  },
  {
    label: "土地の仲介手数料",
    general: "土地と建物を別々に進めると、手数料も別でかかることがあります。",
    answer: "自社分譲地なら不要",
    reason: "土地を直接扱えるため、余計な手間も減らせます。",
  },
  {
    label: "大型展示場の維持費",
    general: "販売経費として、価格に乗りやすい項目です。",
    answer: "価格に乗せません",
    reason: "自社分譲地のモデルハウスを活用します。",
  },
  {
    label: "中間マージン",
    general: "販売・設計・施工が分かれるほど、費用の層も増えます。",
    answer: "重ねません",
    reason: "土地・設計・施工・販売まで自社でつなぎます。",
  },
  {
    label: "見えにくい追加",
    general: "契約後に仕様や工事条件が見え、総額も変わることがあります。",
    answer: "契約前に確認",
    reason: "含まれるものと別途必要なものを、契約前に見せます。",
  },
];

const costMechanisms = [
  "自社分譲地と建物を一体で計画",
  "専用展示場に大きく頼らない",
  "土地・設計・施工・販売まで自社でつなぐ",
];

const zeroItems = [
  "つなぎ融資",
  "小運搬費",
  "職人駐車場代",
  "地盤改良費",
  "打合せ追加",
  "標準との差額",
];

const gallery = [
  {
    src: "/images/works-parts/exterior/exterior-05.webp",
    label: "外観",
    note: "街に残る佇まい",
    tileClass: "md:col-span-6 md:row-span-6",
    aspectClass: "aspect-[4/3] md:aspect-auto",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  {
    src: "/images/works-parts/living/living-02.webp",
    label: "LDK",
    note: "家族が集まる広がり",
    tileClass: "md:col-span-6 md:row-span-3",
    aspectClass: "aspect-[16/10] md:aspect-auto",
    sizes: "(min-width: 768px) 50vw, 100vw",
  },
  {
    src: "/images/bplan/kitchen-premium.webp",
    label: "キッチン",
    note: "毎日触れる質感",
    tileClass: "md:col-span-3 md:row-span-3",
    aspectClass: "aspect-[4/3] md:aspect-auto",
    sizes: "(min-width: 768px) 25vw, 100vw",
  },
  {
    src: "/images/works-parts/washroom/washroom-03.webp",
    label: "洗面",
    note: "朝の動線まで美しく",
    tileClass: "md:col-span-3 md:row-span-3",
    aspectClass: "aspect-[4/3] md:aspect-auto",
    sizes: "(min-width: 768px) 25vw, 100vw",
  },
  {
    src: "/images/works-parts/bath/bath-03.webp",
    label: "浴室",
    note: "標準の先にある心地よさ",
    tileClass: "md:col-span-4 md:row-span-2",
    aspectClass: "aspect-[16/9] md:aspect-auto",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
  {
    src: "/images/works-parts/entrance/entrance-05.webp",
    label: "玄関",
    note: "最初に伝わる品",
    tileClass: "md:col-span-4 md:row-span-2",
    aspectClass: "aspect-[16/9] md:aspect-auto",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
  {
    src: "/images/works-parts/storage/storage-08.webp",
    label: "収納",
    note: "暮らしを整える余白",
    tileClass: "md:col-span-4 md:row-span-2",
    aspectClass: "aspect-[16/9] md:aspect-auto",
    sizes: "(min-width: 768px) 33vw, 100vw",
  },
];

const customIdeas = [
  ["間取り", "家族の動きに合わせる"],
  ["収納", "暮らしの散らかりを減らす"],
  ["外観", "周りに誇れる印象へ"],
  ["造作", "好きな場所に予算を使う"],
];

function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-black/14 text-white backdrop-blur-md" style={{ borderColor: "rgba(255,255,255,0.18)" }}>
      <div className="mx-auto flex h-16 max-w-[1520px] items-center justify-between px-4 md:h-[72px] md:px-8 xl:px-12">
        <Link href="/" className="flex items-center gap-3" aria-label="やまと不動産 トップ">
          <Image src="/images/logo.png" alt="やまと不動産" width={190} height={42} className="h-7 w-auto bg-white/86 px-2 py-1 md:h-8" priority />
          <span className="hidden text-[11px] font-bold tracking-[0.22em] text-white/70 md:block">BPLAN</span>
        </Link>
        {/* トップ(=B-plan V2)から主要ページへの導線。旧ページ内アンカー(本音/理由/誇り/次へ)を
            サイト主要ナビへ差し替え（2026-06-25・導線回復） */}
        <nav className="hidden items-center gap-6 text-[12px] font-bold text-white/72 lg:flex">
          <Link href="/#product" className="transition-colors hover:text-white">商品紹介</Link>
          <Link href="/money" className="transition-colors hover:text-white">資金計画</Link>
          <Link href="/lots" className="transition-colors hover:text-white">物件情報</Link>
          <Link href="/works" className="transition-colors hover:text-white">施工事例</Link>
          <Link href="/voice" className="transition-colors hover:text-white">お客様の声</Link>
          <Link href="/staff" className="transition-colors hover:text-white">スタッフ</Link>
        </nav>
        <Link href="/reserve" className="inline-flex h-11 items-center gap-2 border border-white/35 px-4 text-[13px] font-bold text-white">
          <CalendarDays className="h-4 w-4" />
          見学
        </Link>
      </div>
    </header>
  );
}

function BlueprintLayer({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={`blueprint-layer pointer-events-none absolute inset-0 ${dark ? "opacity-[0.13] mix-blend-screen" : "opacity-[0.2] mix-blend-multiply"}`}
      aria-hidden
    />
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className="mb-5 text-[11px] font-bold uppercase tracking-[0.26em]"
      style={{ color: light ? "rgba(255,253,250,0.62)" : P.rust, fontFamily: "var(--font-inter)" }}
    >
      {children}
    </p>
  );
}

function Cta({ dark = false }: { dark?: boolean }) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <a
        href={LINE_ADD_FRIEND_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex min-h-14 items-center justify-center gap-3 px-6 text-[14px] font-bold text-white"
        style={{ backgroundColor: P.green }}
      >
        <MessageCircle className="h-5 w-5" />
        土地込み総額を出す
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </a>
      <Link
        href="/reserve"
        className="inline-flex min-h-14 items-center justify-center gap-3 border px-6 text-[14px] font-bold"
        style={{ borderColor: dark ? "rgba(255,255,255,0.36)" : P.line, color: dark ? P.white : P.ink }}
      >
        <House className="h-5 w-5" />
        標準仕様を実物で見る
      </Link>
    </div>
  );
}

export default function BPlanPage() {
  return (
    <div className="bplan bplan-rhythm min-h-screen overflow-x-hidden" style={{ backgroundColor: P.paper, color: P.ink }}>
      <Header />

      <main>
        <section className="relative overflow-hidden" style={{ backgroundColor: "var(--bp-bg-paper)" }}>
          <div className="mx-auto grid min-h-[86vh] max-w-[1600px] items-stretch lg:grid-cols-[1fr_1.06fr]">
            <div className="order-2 flex flex-col justify-center px-5 pb-16 pt-12 md:px-10 lg:order-1 lg:py-24 xl:px-16">
              <Eyebrow>total cost first</Eyebrow>
              <h1 className="font-medium leading-[1.2] tracking-[0.01em]" style={{ fontFamily: "var(--font-shippori)", fontSize: "clamp(34px,4.6vw,62px)", color: P.ink }}>
                大手の理想を、
                <br />
                現実の総額に。
              </h1>
              <p className="mt-6 max-w-[460px] text-[15px] font-bold leading-[1.95] md:text-[16px]" style={{ color: P.mute }}>
                土地・建物・諸費用まで、はじめに全部お見せします。
              </p>
              <div className="mt-10">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: P.rust, fontFamily: "var(--font-inter)" }}>
                  土地・建物・諸費用 コミコミ
                </p>
                <p className="mt-2 flex items-baseline gap-2">
                  <span className="font-light leading-none" style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(62px,8.8vw,124px)", color: P.green }}>2,280</span>
                  <span className="text-[22px] font-bold md:text-[28px]" style={{ color: P.ink }}>万円〜</span>
                </p>
                <p className="mt-2 text-[11px] font-bold leading-[1.7]" style={{ color: P.mute }}>
                  ※一部登記費用などは別途発生します
                </p>
              </div>
              <div className="mt-9">
                <Cta />
              </div>
              <div className="mt-12 flex flex-wrap items-end gap-x-9 gap-y-4 border-t pt-7" style={{ borderColor: P.line }}>
                {[
                  { num: String(DELIVERED_HOMES), unit: "棟以上", label: "引渡し実績" },
                  { num: String(BUSINESS_YEARS), unit: "年", label: "業歴" },
                  { num: FUNDING_PLANS.toLocaleString(), unit: "件以上", label: "資金計画" },
                  { num: String(CUSTOMER_VOICES), unit: "組", label: "お客様の声" },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="flex items-baseline gap-1" style={{ color: P.ink }}>
                      <span className="font-light leading-none" style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(28px,3.4vw,42px)" }}>{m.num}</span>
                      <span className="text-[12px] font-bold">{m.unit}</span>
                    </p>
                    <p className="mt-1 text-[11px] font-bold tracking-[0.08em]" style={{ color: P.rust }}>{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 min-h-[46vh] lg:order-2 lg:min-h-full">
              <Image src="/images/bplan/hero-interior-v2.webp" alt="やまと不動産で建てた住まいのリビング" fill className="object-cover" sizes="(min-width:1024px) 53vw, 100vw" priority />
              {/* soft-bleed: デスクトップは左端を生成りへ溶かし、splitの継ぎ目を消す */}
              <div
                aria-hidden
                className="absolute inset-0 hidden lg:block"
                style={{ background: "linear-gradient(to right, var(--bp-bg-paper) 0%, rgba(244,239,230,0.5) 12%, rgba(244,239,230,0) 32%)" }}
              />
              {/* soft-bleed: モバイルは下端を生成りへ溶かし、下のテキストと一体化 */}
              <div
                aria-hidden
                className="absolute inset-0 lg:hidden"
                style={{ background: "linear-gradient(to bottom, rgba(244,239,230,0) 58%, rgba(244,239,230,0.7) 86%, var(--bp-bg-paper) 100%)" }}
              />
            </div>
          </div>
        </section>

        {/* TRUST LEDGER — 段階3「信頼」の土台 (prototype 2026-05-29) / 数値主役・図面レイヤなし・無地で前半の単調を断つ */}
        <section id="trust" className="relative scroll-mt-24 px-5 py-20 md:scroll-mt-28 md:px-10 lg:py-28 xl:px-14" style={{ backgroundColor: P.white }}>
          <div className="relative mx-auto max-w-[1380px]">
            <Eyebrow>since 2011 / track record</Eyebrow>
            <h2
              className="max-w-[800px] text-[clamp(23px,2.5vw,36px)] font-medium leading-[1.45] tracking-[0.02em]"
              style={{ fontFamily: "var(--font-shippori)" }}
            >
              奈良・京都南部で、{FOUNDED_YEAR}年から家づくりを続けてきました。
            </h2>
            <p className="mt-6 max-w-[640px] text-[15px] leading-[1.95] md:text-[16px]" style={{ color: P.mute }}>
              これまで{DELIVERED_HOMES}を超えるお客様のご要望にお応えしてきました。総額の出し方も資金計画も、一件ずつ積み重ねてきた仕事です。
            </p>

            {/* Metric rail — 600棟をアンカーに非対称（均等テーブル回避）。数字は Oswald */}
            <div className="mt-12 grid gap-px border lg:grid-cols-[1.05fr_0.95fr]" style={{ borderColor: P.line, backgroundColor: P.line }}>
              {/* アンカー: 引渡し600棟 */}
              <div className="flex flex-col justify-center p-8 md:p-10" style={{ backgroundColor: P.white }}>
                <p className="text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: P.rust, fontFamily: "var(--font-inter)" }}>
                  引渡し実績
                </p>
                <p className="mt-4 flex items-baseline gap-2">
                  <span className="text-[clamp(64px,9vw,108px)] font-light leading-none" style={{ fontFamily: "var(--font-oswald)", color: P.ink }}>{DELIVERED_HOMES}</span>
                  <span className="text-[20px] font-medium md:text-[24px]" style={{ fontFamily: "var(--font-shippori)" }}>棟以上</span>
                </p>
                <p className="mt-4 max-w-[360px] text-[14px] leading-[1.9]" style={{ color: P.mute }}>
                  土地探しから資金計画まで、ご家族ごとに対応してきました。
                </p>
              </div>

              {/* 補助3指標: 業歴 / 資金計画 / 保証 */}
              <div className="grid" style={{ backgroundColor: P.white }}>
                {[
                  { num: String(BUSINESS_YEARS), unit: "年", label: `業歴（${FOUNDED_YEAR}年創立）`, note: "奈良・京都南部での家づくり" },
                  { num: FUNDING_PLANS.toLocaleString(), unit: "件以上", label: "資金計画の作成", note: "総額と月々を、契約前に試算" },
                  { num: `${GROUND_WARRANTY_YEARS} / ${TERMITE_WARRANTY_YEARS}`, unit: "年", label: "保証", note: `地盤保証${GROUND_WARRANTY_YEARS}年・しろあり保証${TERMITE_WARRANTY_YEARS}年` },
                ].map((m) => (
                  <div key={m.label} className="flex items-baseline justify-between gap-5 border-b px-8 py-6 last:border-b-0 md:px-10" style={{ borderColor: P.line }}>
                    <div>
                      <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: P.rust, fontFamily: "var(--font-inter)" }}>{m.label}</p>
                      <p className="mt-1.5 text-[13px] leading-[1.7]" style={{ color: P.mute }}>{m.note}</p>
                    </div>
                    <p className="flex shrink-0 items-baseline gap-1">
                      <span className="text-[clamp(30px,3.6vw,44px)] font-light leading-none" style={{ fontFamily: "var(--font-oswald)", color: P.ink }}>{m.num}</span>
                      <span className="text-[14px] font-medium" style={{ fontFamily: "var(--font-shippori)" }}>{m.unit}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 代表2名 — 完全同格（スタッフ平等ルール） */}
            <div className="mt-16">
              <p className="text-[18px] font-medium tracking-[0.04em] md:text-[20px]" style={{ fontFamily: "var(--font-shippori)" }}>
                経営はこの二人で担っています。
              </p>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {REPRESENTATIVES.map((rep) => (
                  <div key={rep.id} className="flex items-center gap-5 border p-5" style={{ borderColor: P.line, backgroundColor: P.white }}>
                    <div className="relative h-[88px] w-[88px] shrink-0 overflow-hidden rounded-full" style={{ backgroundColor: P.smoke }}>
                      <Image src={`/images/staff/${rep.id}.webp`} alt={`${rep.role} ${rep.name}`} fill className="object-cover" sizes="88px" />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold tracking-[0.12em]" style={{ color: P.rust }}>{rep.role}</p>
                      <p className="mt-1 text-[19px] font-medium tracking-[0.04em]" style={{ fontFamily: "var(--font-shippori)" }}>{rep.name}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[12px] leading-[1.7]" style={{ color: P.mute }}>
                {REAL_ESTATE_LICENSE_LABEL} {REAL_ESTATE_LICENSE_NO} ／ {COMPANY_NAME}
              </p>
            </div>
          </div>
        </section>

        <section id="voice-proof" className="voice-proof relative min-h-[760px] scroll-mt-24 overflow-hidden px-5 py-20 text-white md:scroll-mt-28 md:px-10 lg:min-h-[820px] lg:py-24 xl:px-14">
          <VoiceProofObserver />
          <Image
            src="/images/works-parts/living/living-02.webp"
            alt="やまと不動産で建てた住まいのリビング"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/58" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(255,255,255,0.16),transparent_30%),linear-gradient(110deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.5)_48%,rgba(0,0,0,0.24)_100%)]" />
          <BlueprintLayer dark />

          <div className="relative z-10 mx-auto max-w-[1380px]">
            <div className="max-w-[620px]">
              <Eyebrow light>50 voices proof</Eyebrow>
              <h2 className="voice-proof-title font-medium leading-[1.16]" style={{ fontFamily: "var(--font-shippori)", whiteSpace: "normal", wordBreak: "auto-phrase", textWrap: "balance" }}>
                お客様が決め手に挙げたのは、価格だけではありませんでした。
              </h2>
              <p className="mt-7 max-w-[520px] text-[15px] font-bold leading-[2] text-white/72 md:text-[17px]">
                50組以上の声に残っていたのは、標準仕様・総額・土地・人の力。
                当社が選ばれた理由を、短い言葉に整えました。
              </p>
            </div>

            <div className="voice-proof-board is-visible mt-12 md:mt-14" aria-label="50組以上のお客様の声から抜粋した証言">
              {featuredVoiceProofs.map(({ Icon, label, quote }, index) => (
                <article key={quote} className={`voice-annotation voice-annotation-${index + 1}`}>
                  <div className="voice-annotation-label">
                    <Icon className="h-4 w-4 shrink-0" strokeWidth={1.6} />
                    {label}
                  </div>
                  <p className="voice-annotation-quote">
                    {quote}
                  </p>
                </article>
              ))}
              <p className="marker-disclaimer">
                ※お客様の声50組以上をもとに、伝わりやすい言葉に整えています。原文はお客様の声ページに掲載しています。
              </p>
              <Link href="/voice" className="voice-proof-link">
                全てのお客様の声を見る
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section id="truth" className="truth-section relative scroll-mt-24 overflow-hidden md:scroll-mt-28">
          <TruthVoiceSlider cards={honestFeelings} lineUrl={LINE_ADD_FRIEND_URL} />
        </section>

        <section id="payment-cases" className="relative scroll-mt-24 overflow-hidden px-5 md:scroll-mt-28 md:px-10 xl:px-14" style={{ backgroundColor: "var(--bp-bg-white)", paddingBlock: "var(--bp-space-climax)" }}>
          <ReasonReveal className="relative z-10 mx-auto max-w-[1480px]">
            <div className="max-w-[980px]">
              <Eyebrow>02 / customer cases</Eyebrow>
              <h2 className="payment-main-title font-medium leading-[1.12]" style={{ fontFamily: "var(--font-shippori)", whiteSpace: "normal", wordBreak: "auto-phrase", textWrap: "balance" }}>
                家は欲しい。
                <br />
                でも、毎月の返済がいくらか分からない。
              </h2>
              <p className="payment-subtitle mt-4 text-[14px] font-black tracking-[0.12em]">
                建てられたご家族も、最初は同じ不安からでした。
              </p>
              <p className="payment-lead mt-[24px] max-w-[780px] text-[15px] font-bold leading-[1.9] md:text-[16px]">
                土地代も建物も諸費用も合わせて見ると、毎月の金額の印象は変わります。実例を見ながら、自分たちに近い金額を確かめてください。
              </p>
              <div className="payment-signal-row mt-7">
                {["年収だけで見ない", "土地込みで比べる", "月々まで確かめる"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <Link href="/money#payment-examples" className="payment-head-cta mt-[28px] inline-flex items-center gap-3 border-b pb-1 text-[14px] font-bold transition hover:opacity-70">
                月々の目安を確認する
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-12 md:mt-16">
              <EmotionCurve />
            </div>

            <div className="mt-[44px] flex flex-col gap-7 lg:gap-9">
              {paymentCases.map((item) => {
                const total = item.parts.building + item.parts.land + item.parts.fee;
                const seg = [
                  { key: "建物", v: item.parts.building, bg: "var(--bp-green-deep)", fg: "#fffdfa" },
                  { key: "土地", v: item.parts.land, bg: "var(--bp-green)", fg: "#fffdfa" },
                  { key: "諸費用", v: item.parts.fee, bg: "var(--bp-green-soft)", fg: "#123d2e" },
                ];
                return (
                  <article key={item.no} className="overflow-hidden rounded-[10px] border bg-white shadow-[0_30px_80px_-58px_rgba(24,23,20,0.5)]" style={{ borderColor: P.line }}>
                    <div className="grid lg:grid-cols-[1.16fr_0.84fr]">
                      <div className="p-6 md:p-9 lg:p-10">
                        <div className="flex items-center gap-4">
                          <span className="inline-flex border px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ borderColor: P.line, color: P.rust }}>{item.no}</span>
                          <span className="text-[12px] font-bold leading-[1.6] tracking-[0.06em]" style={{ color: P.mute }}>{item.customer}</span>
                        </div>
                        <p className="mt-4 text-[14px] font-bold leading-[1.9]" style={{ color: P.ink }}>{item.concern}</p>

                        {/* 月々をクライマックスの主役に（カウントアップ） */}
                        <div className="mt-7 flex items-end gap-4 border-t pt-6" style={{ borderColor: P.line }}>
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: P.rust }}>月々返済</p>
                            <p className="mt-1 flex items-baseline gap-1.5" style={{ color: P.ink }}>
                              <AnimatedNumber value={item.monthlyNum} className="font-light leading-none" style={{ fontFamily: "var(--font-oswald)", fontSize: "clamp(46px,6.2vw,78px)" }} />
                              <span className="text-[15px] font-bold">円 / 月</span>
                            </p>
                          </div>
                          <p className="ml-auto pb-1 text-right text-[12px] font-bold leading-[1.7]" style={{ color: P.mute }}>
                            総額 {item.total}万円<br />返済比率 {item.ratio}
                          </p>
                        </div>

                        {/* 内訳＝深緑濃淡の段積みバー */}
                        <div className="mt-6">
                          <div className="flex h-9 w-full overflow-hidden rounded-[4px]">
                            {seg.map((s) => (
                              <div key={s.key} className="flex items-center justify-center text-[11px] font-bold" style={{ width: `${((s.v / total) * 100).toFixed(1)}%`, background: s.bg, color: s.fg }}>
                                {s.v / total > 0.13 ? s.key : ""}
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-[12px] font-bold" style={{ color: P.ink }}>
                            {seg.map((s) => (
                              <span key={s.key} className="inline-flex items-center gap-1.5">
                                <span className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ background: s.bg, border: s.key === "諸費用" ? `1px solid ${P.line}` : "none" }} />
                                {s.key} {s.v.toLocaleString("ja-JP")}万円
                              </span>
                            ))}
                          </div>
                        </div>

                        <p className="mt-7 max-w-[640px] text-[17px] font-medium leading-[1.7] md:text-[19px]" style={{ fontFamily: "var(--font-shippori)", color: P.ink }}>
                          {item.headline}
                        </p>

                        <div className="mt-7 grid grid-cols-3 gap-px border" style={{ borderColor: P.line, backgroundColor: P.line }}>
                          {[["家族", item.family], ["年収", item.income], ["プラン", item.plan]].map(([label, value]) => (
                            <div key={label} className="bg-white p-3.5">
                              <p className="text-[10px] font-bold uppercase tracking-[0.14em]" style={{ color: P.rust }}>{label}</p>
                              <p className="mt-1.5 text-[12px] font-bold leading-[1.5]" style={{ color: P.ink }}>{value}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <figure className="relative min-h-[240px] lg:min-h-full">
                        <Image src={item.image} alt={`${item.customer}の住まい`} fill className="object-cover" sizes="(min-width:1024px) 38vw, 100vw" />
                      </figure>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <p className="max-w-[860px] text-[11px] font-bold leading-[1.8] tracking-[0.08em]" style={{ color: P.mute }}>
                ※表示は試算用金利1.0%・35年元利均等・ボーナス払いなしの例です。実際の適用金利・審査条件・土地条件により変わります。
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ color: P.green }}>
                slide / case 01-03
              </p>
            </div>
          </ReasonReveal>
        </section>

        <section id="cost" className="cost-reason-section relative scroll-mt-24 overflow-hidden px-5 py-20 md:scroll-mt-28 md:px-10 lg:py-28 xl:px-14">
          <div className="cost-bg-wash absolute inset-0" aria-hidden="true" />
          <BlueprintLayer />
          <ReasonReveal className="relative mx-auto max-w-[1480px]">
            <div className="cost-clarity-stage" aria-label="一般的な家づくりで増えやすい費用と、やまと不動産ならかからない費用">
              <div className="cost-clarity-head">
                <div>
                  <Eyebrow>03 / why possible</Eyebrow>
                  <h2 style={{ wordBreak: "auto-phrase", textWrap: "balance" }}>価格の差は、家そのものではなく、家以外のところで出ます。</h2>
                </div>
                <p>
                  当社が抑えるのは、建材や室内設備ではありません。
                  つなぎ融資、地盤改良費、仲介手数料のように、家以外で増えやすい費用です。
                </p>
              </div>

              <ProcessFlow />

              <div className="cost-clarity-layout">
                <aside className="cost-clarity-copy" aria-label="やまと不動産が費用を抑えられる理由">
                  <span>YAMATO COST LOGIC</span>
                  <h3>当社は、これがかかりません。</h3>
                  <p>
                    品質を下げて安く見せるのではありません。
                    家以外の費用を抑え、同じ建材・同じ室内設備に予算を戻します。
                  </p>
                  <div className="cost-clarity-mechanisms">
                    {costMechanisms.map((item) => (
                      <b key={item}>{item}</b>
                    ))}
                  </div>
                </aside>

                <div className="cost-clarity-board" aria-label="費用項目の比較">
                  <div className="cost-clarity-board-head">
                    <span>費用項目</span>
                    <span>一般的に増えやすいこと</span>
                    <span>やまと不動産</span>
                  </div>
                  {costCompareRows.map((item, index) => (
                    <div className="cost-clarity-row" key={item.label} style={{ "--row": index } as CSSProperties}>
                      <div className="cost-clarity-item">
                        <em>{String(index + 1).padStart(2, "0")}</em>
                        <strong>{item.label}</strong>
                      </div>
                      <div className="cost-clarity-risk">
                        <span>要確認</span>
                        <p>{item.general}</p>
                      </div>
                      <div className="cost-clarity-answer">
                        <span>{item.answer}</span>
                        <p>{item.reason}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="cost-clarity-result">
                <div>
                  <span>結論</span>
                  <strong>同じ総予算でも、家に使えるお金が変わります。</strong>
                  <p>外観、設備、間取り。削られやすい部分に、もう一度予算を回せます。</p>
                </div>
                <Link href="/money#costs" className="cost-clarity-link">
                  含まれる費用を確認する
                  <ArrowRight size={16} strokeWidth={1.8} />
                </Link>
              </div>
            </div>
          </ReasonReveal>
        </section>

        <section id="design" className="scroll-mt-24 px-5 py-20 md:scroll-mt-28 md:px-10 lg:py-28 xl:px-14" style={{ backgroundColor: P.white }}>
          <div className="mx-auto max-w-[1380px]">
            <div className="mb-12 max-w-[1280px] md:mb-14">
              <div>
                <Eyebrow>04 / proud design</Eyebrow>
                <h2 className="text-[clamp(26px,2.4vw,40px)] font-medium leading-[1.34] tracking-[0.02em]" style={{ fontFamily: "var(--font-shippori)", wordBreak: "auto-phrase", textWrap: "balance" }}>
                  外観も、LDKも、水まわりも見てください。
                </h2>
              </div>
              <p className="mt-5 max-w-none text-[clamp(15px,1.05vw,17px)] font-medium leading-[1.9] tracking-[0.04em] md:whitespace-nowrap" style={{ color: P.mute }}>
                標準装備の高さを土台に、キッチン・洗面・浴室まで。写真で質感を確かめてください。
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-12 md:auto-rows-[86px] md:gap-4 lg:auto-rows-[96px] xl:auto-rows-[104px]">
              {gallery.map((item, index) => (
                <article key={item.src} className={`group ${item.tileClass}`}>
                  <div className={`relative h-full overflow-hidden rounded-[8px] border border-black/10 bg-[#ddd4c8] shadow-[0_20px_60px_rgba(24,23,20,0.10)] ${item.aspectClass}`}>
                    <Image src={item.src} alt={`やまと不動産の${item.label}`} fill className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.035]" sizes={item.sizes} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-black/8 to-white/8" />
                    <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 text-white md:inset-x-5 md:bottom-5">
                      <div>
                        <p className="text-[12px] font-bold tracking-[0.18em] md:text-[13px]">{item.label}</p>
                        <p className="mt-1 text-[11px] font-medium leading-[1.7] tracking-[0.08em] text-white/78 md:text-[12px]">{item.note}</p>
                      </div>
                      <span className="hidden shrink-0 rounded-full border border-white/24 bg-white/14 px-3 py-1 text-[11px] font-bold tracking-[0.12em] text-white/86 backdrop-blur-md md:inline-flex">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/18" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden px-5 py-20 md:px-10 lg:py-28 xl:px-14" style={{ backgroundColor: P.smoke }}>
          <BlueprintLayer />
          <div className="relative mx-auto grid max-w-[1380px] gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <Eyebrow>05 / no surprise</Eyebrow>
              <h2 className="text-[clamp(26px,2.4vw,40px)] font-medium leading-[1.34]" style={{ fontFamily: "var(--font-shippori)", wordBreak: "auto-phrase", textWrap: "balance" }}>
                あとから出てくる金額で、
                <br />
                がっかりしてほしくない。
              </h2>
              <p className="mt-7 max-w-[600px] text-[15px] leading-[2]" style={{ color: P.mute }}>
                契約後に金額がじわじわ増えると、家づくりは楽しくなくなります。見えにくい費用も、最初の表に入れて確認します。
              </p>
            </div>
            <CostCheckIcons />
          </div>
        </section>

        <section className="grid lg:grid-cols-[1.1fr_0.9fr]" style={{ backgroundColor: P.ink, color: P.white }}>
          <div className="relative min-h-[460px] overflow-hidden lg:min-h-[760px]">
            <Image src="/images/design/example-storage.webp" alt="注文住宅の収納と素材感" fill className="object-cover opacity-86" sizes="(min-width: 1024px) 55vw, 100vw" />
            <div className="absolute inset-0 bg-black/18" />
          </div>
          <div className="relative px-5 py-20 md:px-10 lg:px-14 lg:py-28">
            <BlueprintLayer dark />
            <div className="relative">
              <Eyebrow light>06 / custom order</Eyebrow>
              <h2 className="text-[clamp(26px,2.4vw,40px)] font-medium leading-[1.34]" style={{ fontFamily: "var(--font-shippori)", wordBreak: "auto-phrase", textWrap: "balance" }}>
                標準が強いから、
                <br />
                こだわりに予算を回せる。
              </h2>
              <div className="mt-10 grid gap-px border border-white/18 bg-white/18">
                {customIdeas.map(([title, text]) => (
                  <div key={title} className="grid gap-3 bg-[#181714] p-5 md:grid-cols-[110px_1fr]">
                    <p className="text-[22px]" style={{ fontFamily: "var(--font-shippori)" }}>{title}</p>
                    <p className="text-[14px] leading-[1.8] text-white/64">{text}</p>
                  </div>
                ))}
              </div>
              <Cta dark />
            </div>
          </div>
        </section>

        <section id="action" className="relative scroll-mt-24 overflow-hidden px-5 py-20 md:scroll-mt-28 md:px-10 lg:py-28 xl:px-14" style={{ backgroundColor: P.white }}>
          <BlueprintLayer />
          <div className="relative mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <Eyebrow>07 / next action</Eyebrow>
              <h2 className="text-[clamp(26px,2.4vw,40px)] font-medium leading-[1.34]" style={{ fontFamily: "var(--font-shippori)", wordBreak: "auto-phrase", textWrap: "balance" }}>
                まだ決めなくて大丈夫です。
                <br />
                まずは、判断できる材料をそろえましょう。
              </h2>
            </div>
            {/* 意思決定ファネル: LINE → 見学 → フォーム（正順・先細り・強弱3段） */}
            <div className="flex flex-col items-center gap-3.5">
              {[
                { title: "土地込み総額を出す", text: "LINEで目安を出す", href: LINE_ADD_FRIEND_URL, external: true, icon: <MessageCircle className="h-5 w-5" />, tier: 0 },
                { title: "モデルハウスで見る", text: "標準仕様を実物で確認", href: "/reserve", external: false, icon: <House className="h-5 w-5" />, tier: 1 },
                { title: "土地と建物を同時に見る", text: "進め方を確認", href: "/contact", external: false, icon: <FileText className="h-5 w-5" />, tier: 2 },
              ].map((c) => {
                const widths = ["w-full", "w-[94%]", "w-[86%]"];
                const tierStyle =
                  c.tier === 0
                    ? { backgroundColor: P.green, color: P.white }
                    : c.tier === 1
                      ? { border: `1.5px solid ${P.green}`, color: P.ink, backgroundColor: P.white }
                      : { border: `1px solid ${P.line}`, color: P.mute, backgroundColor: P.white };
                const titleSize = c.tier === 0 ? "text-[21px] md:text-[24px]" : c.tier === 1 ? "text-[18px] md:text-[20px]" : "text-[15px] md:text-[16px]";
                return (
                  <a
                    key={c.title}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className={`group flex items-center justify-between gap-4 rounded-[6px] px-6 py-5 transition hover:opacity-90 md:px-8 ${widths[c.tier]}`}
                    style={tierStyle}
                  >
                    <span>
                      <span className={`flex items-center gap-3 font-medium ${titleSize}`} style={{ fontFamily: "var(--font-shippori)" }}>
                        {c.icon}
                        {c.title}
                      </span>
                      <span className="mt-1.5 block text-[12px] font-bold opacity-70">{c.text}</span>
                    </span>
                    <ArrowRight className="h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
                  </a>
                );
              })}
              <p className="mt-2 text-[11px] font-bold tracking-[0.1em]" style={{ color: P.mute }}>
                LINE → 見学 → フォーム の順で、あなたのペースで。
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#11110f] px-5 pb-28 pt-12 text-white md:px-10 md:pb-12 xl:px-14">
        <div className="mx-auto flex max-w-[1380px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Image src="/images/logo.png" alt="やまと不動産" width={190} height={42} className="h-8 w-auto bg-white px-2 py-1" />
          <p className="text-[12px] leading-[1.8] text-white/54">株式会社やまと不動産 / 奈良県奈良市大宮町1丁目6番21 / TEL: 0742-36-1123</p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t bg-white md:hidden" style={{ borderColor: P.line }}>
        <a href="tel:0742361123" className="flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold" style={{ color: P.ink }}>
          <Phone className="h-4 w-4" />
          電話
        </a>
        <a href={LINE_ADD_FRIEND_URL} target="_blank" rel="noopener noreferrer" className="flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold text-white" style={{ backgroundColor: P.green }}>
          <MessageCircle className="h-4 w-4" />
          総額
        </a>
        <Link href="/reserve" className="flex h-16 flex-col items-center justify-center gap-1 text-[11px] font-bold text-white" style={{ backgroundColor: P.ink }}>
          <CalendarDays className="h-4 w-4" />
          見学
        </Link>
      </div>

      <style>{`
        .bplan {
          font-family: var(--font-murecho-var), var(--font-noto), "Noto Sans JP", sans-serif;
          letter-spacing: 0;
        }
        .bplan h1,
        .bplan h2,
        .bplan h3,
        .bplan p,
        .bplan a {
          letter-spacing: 0;
        }
        .bplan::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 60;
          opacity: 0.025;
          background-image: radial-gradient(#181714 0.7px, transparent 0.7px);
          background-size: 5px 5px;
          mix-blend-mode: multiply;
        }
        .blueprint-layer {
          background-image: url("/images/bplan/blueprint-bg.png");
          background-size: 1500px auto;
          background-repeat: repeat;
          animation: blueprint-drift 48s linear infinite;
        }
        .hero-copy {
          display: grid;
          gap: 0.08em;
          font-size: clamp(42px, 7.2vw, 106px);
          line-height: 1.08;
        }
        .voice-proof-title {
          font-size: clamp(42px, 5vw, 76px);
          white-space: nowrap;
        }
        .voice-proof-board {
          position: relative;
          min-height: 560px;
        }
        .marker-disclaimer {
          position: absolute;
          left: 0;
          bottom: 0;
          max-width: 680px;
          color: rgba(255,255,255,0.48);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          line-height: 1.7;
        }
        .voice-proof-link {
          position: absolute;
          right: 0;
          bottom: 0;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.36);
          padding-bottom: 4px;
          color: rgba(255,255,255,0.86);
          font-size: 14px;
          font-weight: 700;
          transition: color 240ms ease, border-color 240ms ease, transform 240ms ease;
        }
        .voice-proof-link:hover {
          border-color: rgba(255,255,255,1);
          color: rgba(255,255,255,1);
          transform: translateX(4px);
        }
        .voice-annotation {
          position: absolute;
          width: clamp(260px, 24vw, 390px);
          color: rgba(255,255,255,0.96);
          opacity: 0;
          filter: blur(5px);
          transform: translate3d(0, 22px, 0) scale(0.92) rotate(calc(var(--annotation-rotate, 0deg) - 2deg));
        }
        .voice-proof-board.is-visible .voice-annotation {
          animation: voice-pop-in 720ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--annotation-delay, 0ms);
        }
        .voice-annotation::before {
          content: "";
          position: absolute;
          left: -18px;
          top: 18px;
          width: 24px;
          height: 38px;
          border-left: 1.5px solid rgba(255,255,255,0.62);
          border-top: 1.5px solid rgba(255,255,255,0.5);
          border-radius: 60% 0 0 35%;
          opacity: 0;
          transform: translate3d(8px, 5px, 0) scale(0.82) rotate(var(--accent-rotate, -8deg));
          transform-origin: left top;
          pointer-events: none;
        }
        .voice-proof-board.is-visible .voice-annotation::before {
          animation: annotation-mark-in 560ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(var(--annotation-delay, 0ms) + 190ms);
        }
        .voice-annotation::after {
          content: "";
          position: absolute;
          left: 2px;
          bottom: -10px;
          width: min(88%, 310px);
          height: 10px;
          border-bottom: 1.5px solid rgba(255,255,255,0.7);
          border-radius: 50%;
          opacity: 0;
          transform: scaleX(0);
          transform-origin: left center;
          pointer-events: none;
        }
        .voice-proof-board.is-visible .voice-annotation::after {
          animation: annotation-line-in 620ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(var(--annotation-delay, 0ms) + 360ms);
        }
        .voice-annotation-label {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 7px;
          color: rgba(255,255,255,0.62);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          opacity: 0;
          filter: blur(3px);
          clip-path: inset(0 100% 0 0);
        }
        .voice-proof-board.is-visible .voice-annotation-label {
          animation: annotation-text-reveal 620ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(var(--annotation-delay, 0ms) + 90ms);
        }
        .voice-annotation-quote {
          font-family: var(--font-tegomin), var(--font-shippori), serif;
          font-size: clamp(20px, 1.54vw, 28px);
          font-weight: 400;
          line-height: 1.45;
          letter-spacing: 0.015em;
          text-shadow:
            0 0 1px rgba(255,255,255,0.7),
            0 0 12px rgba(255,255,255,0.18),
            0 3px 22px rgba(0,0,0,0.34);
          opacity: 0;
          filter: blur(4px);
          clip-path: inset(0 100% 0 0);
        }
        .voice-proof-board.is-visible .voice-annotation-quote {
          animation: annotation-text-reveal 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(var(--annotation-delay, 0ms) + 140ms);
        }
        .voice-annotation-1 {
          left: 2%;
          top: 30px;
          --annotation-rotate: -4deg;
          --annotation-delay: 0ms;
        }
        .voice-annotation-2 {
          left: 43%;
          top: 6px;
          width: clamp(300px, 25vw, 430px);
          --annotation-rotate: 2.6deg;
          --annotation-delay: 220ms;
          --accent-rotate: 3deg;
        }
        .voice-annotation-3 {
          right: 1%;
          top: 168px;
          --annotation-rotate: -2.2deg;
          --annotation-delay: 440ms;
          --accent-rotate: 8deg;
        }
        .voice-annotation-4 {
          left: 30%;
          top: 280px;
          width: clamp(320px, 28vw, 470px);
          --annotation-rotate: 1.8deg;
          --annotation-delay: 660ms;
        }
        .voice-annotation-5 {
          left: 7%;
          top: 388px;
          --annotation-rotate: -2.8deg;
          --annotation-delay: 880ms;
        }
        .voice-annotation-2::before {
          left: -10px;
          top: auto;
          bottom: 18px;
          width: 30px;
          height: 18px;
          border-left: 0;
          border-top: 0;
          border-bottom: 1.5px solid rgba(255,255,255,0.58);
          transform: translate3d(4px, 0, 0) rotate(3deg);
        }
        .voice-annotation-3::before {
          left: auto;
          right: -16px;
          border-left: 0;
          border-right: 1.5px solid rgba(255,255,255,0.58);
          border-top: 1.5px solid rgba(255,255,255,0.46);
          border-radius: 0 60% 35% 0;
          transform: translate3d(-4px, 4px, 0) rotate(8deg);
        }
        .voice-annotation-4::after {
          left: -14px;
          width: 86%;
        }
        @keyframes voice-write-in {
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) rotate(var(--annotation-rotate, 0deg));
          }
        }
        @keyframes voice-pop-in {
          0% {
            opacity: 0;
            filter: blur(5px);
            transform: translate3d(0, 22px, 0) scale(0.92) rotate(calc(var(--annotation-rotate, 0deg) - 2deg));
          }
          62% {
            opacity: 1;
            filter: blur(0);
            transform: translate3d(0, -2px, 0) scale(1.035) rotate(calc(var(--annotation-rotate, 0deg) + 0.35deg));
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: translate3d(0, 0, 0) scale(1) rotate(var(--annotation-rotate, 0deg));
          }
        }
        @keyframes annotation-text-reveal {
          0% {
            opacity: 0;
            filter: blur(4px);
            clip-path: inset(0 100% 0 0);
          }
          to {
            opacity: 1;
            filter: blur(0);
            clip-path: inset(0 0 0 0);
          }
        }
        @keyframes annotation-mark-in {
          0% {
            opacity: 0;
            transform: translate3d(8px, 5px, 0) scale(0.82) rotate(var(--accent-rotate, -8deg));
          }
          64% {
            opacity: 1;
            transform: translate3d(-1px, -1px, 0) scale(1.04) rotate(var(--accent-rotate, -8deg));
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0) scale(1) rotate(var(--accent-rotate, -8deg));
          }
        }
        @keyframes annotation-line-in {
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }
        @keyframes blueprint-drift {
          from { background-position: 0 0; }
          to { background-position: -420px 260px; }
        }
        .truth-section {
          background:
            radial-gradient(circle at 9% 12%, rgba(255,255,255,0.92), transparent 28%),
            radial-gradient(circle at 84% 18%, rgba(239,211,180,0.42), transparent 32%),
            radial-gradient(circle at 73% 78%, rgba(178,214,197,0.30), transparent 34%),
            linear-gradient(135deg, #f7f1e7 0%, #eef6f1 48%, #e6ded1 100%);
          scroll-margin-top: 72px;
        }
        .truth-interactive {
          --truth-shift: 0px;
          --truth-card-shift: 0px;
          --truth-depth-shift: 0px;
          min-height: min(860px, calc(100vh + 120px));
          padding: clamp(70px, 7vw, 110px) clamp(20px, 4vw, 56px);
          isolation: isolate;
        }
        .truth-bg {
          position: absolute;
          inset: -18% -8%;
          z-index: 0;
          background:
            radial-gradient(circle at 15% 10%, rgba(255,255,255,0.48), transparent 30%),
            radial-gradient(circle at 78% 20%, rgba(221,174,128,0.26), transparent 31%),
            radial-gradient(circle at 72% 74%, rgba(138,180,164,0.24), transparent 36%),
            linear-gradient(90deg, rgba(255,252,247,0.48), rgba(234,244,239,0.52) 50%, rgba(221,211,195,0.36)),
            url("/images/bplan/truth-glass-bg.png") center / cover no-repeat;
          transform: translate3d(0, var(--truth-shift), 0) scale(1.12);
          transition: transform 160ms linear;
          filter: brightness(1.1) saturate(0.82) contrast(0.98);
        }
        .truth-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 18% 20%, rgba(255,255,255,0.34), transparent 30%),
            radial-gradient(circle at 74% 70%, rgba(25,88,66,0.16), transparent 38%),
            linear-gradient(180deg, rgba(255,255,255,0.04), rgba(188,214,203,0.30));
        }
        .truth-depth {
          position: absolute;
          pointer-events: none;
          border: 1px solid rgba(255,255,255,0.46);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.18), rgba(25,88,66,0.12)),
            rgba(183, 211, 199, 0.18);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .truth-depth-1 {
          z-index: 1;
          left: 4%;
          top: 16%;
          width: 28vw;
          height: 32vw;
          max-height: 420px;
          transform: translate3d(0, calc(var(--truth-depth-shift) * -0.55), 0);
        }
        .truth-depth-2 {
          z-index: 1;
          right: 2%;
          bottom: 10%;
          width: 34vw;
          height: 20vw;
          transform: translate3d(0, calc(var(--truth-depth-shift) * 0.48), 0);
        }
        .truth-stage {
          position: relative;
          overflow: hidden;
          padding: clamp(28px, 4vw, 54px);
          border: 1px solid rgba(255,255,255,0.72);
          border-radius: 28px;
          background:
            radial-gradient(circle at 8% 18%, rgba(25,88,66,0.08), transparent 33%),
            radial-gradient(circle at 92% 12%, rgba(166,107,72,0.12), transparent 30%),
            linear-gradient(135deg, rgba(255,255,255,0.78), rgba(250,246,239,0.42)),
            rgba(255,255,255,0.38);
          backdrop-filter: blur(18px) saturate(1.08);
          -webkit-backdrop-filter: blur(18px) saturate(1.08);
          box-shadow:
            0 34px 90px rgba(83,65,37,0.08),
            0 22px 72px rgba(25,88,66,0.08),
            inset 0 1px 0 rgba(255,255,255,0.82);
        }
        .truth-stage::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(25,88,66,0.10) 0, rgba(25,88,66,0.025) 1px, transparent 1px),
            linear-gradient(180deg, rgba(166,107,72,0.09), transparent 28%);
          background-size: 140px 100%, 100% 100%;
          opacity: 0.28;
        }
        .truth-stage > * {
          position: relative;
          z-index: 1;
        }
        .truth-stage [data-reason-reveal] {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          transition:
            opacity 760ms cubic-bezier(0.2, 0.82, 0.18, 1),
            transform 760ms cubic-bezier(0.2, 0.82, 0.18, 1);
        }
        .truth-stage [data-reason-reveal].is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .truth-head {
          display: grid;
          grid-template-columns: minmax(0, 0.78fr) minmax(340px, 0.68fr);
          gap: clamp(28px, 4vw, 66px);
          align-items: end;
        }
        .truth-kicker {
          margin: 0;
          color: ${P.rust};
          font-family: var(--font-inter);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .truth-kicker::before {
          content: "";
          display: inline-block;
          width: 30px;
          height: 1px;
          margin-right: 10px;
          vertical-align: middle;
          background: linear-gradient(90deg, ${P.green}, ${P.rust});
        }
        .truth-title {
          margin: 22px 0 0;
          color: ${P.ink};
          font-size: clamp(28px, 2.45vw, 36px);
          font-weight: 650;
          line-height: 1.22;
          letter-spacing: 0;
          white-space: nowrap;
        }
        .truth-lead {
          margin: 0;
          color: rgba(24,23,20,0.66);
          font-size: clamp(14px, 1.12vw, 16px);
          font-weight: 850;
          line-height: 2;
        }
        .truth-slider-wrap {
          display: grid;
          grid-template-columns: minmax(240px, 0.34fr) minmax(0, 1fr);
          gap: clamp(24px, 3.3vw, 48px);
          align-items: stretch;
          margin-top: clamp(28px, 3.5vw, 46px);
        }
        .truth-slider-copy {
          display: flex;
          min-height: 390px;
          flex-direction: column;
          justify-content: flex-start;
          border: 1px solid rgba(24,23,20,0.08);
          border-radius: 22px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.76), rgba(255,255,255,0.34)),
            rgba(255,255,255,0.22);
          padding: clamp(22px, 2.5vw, 30px);
          transform: translate3d(0, calc(var(--truth-card-shift) * -0.5), 0);
          box-shadow:
            0 18px 52px rgba(83,65,37,0.06),
            inset 0 1px 0 rgba(255,255,255,0.72);
        }
        .truth-slider-copy p {
          margin: 0 0 12px;
          color: ${P.rust};
          font-family: var(--font-inter);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.16em;
        }
        .truth-slider-copy strong {
          color: ${P.ink};
          font-size: clamp(22px, 2.1vw, 30px);
          font-weight: 950;
          line-height: 1.28;
        }
        .truth-slider-copy span {
          margin-top: 16px;
          max-width: 250px;
          color: rgba(24,23,20,0.56);
          font-size: 12px;
          font-weight: 800;
          line-height: 1.9;
        }
        .truth-category-rail {
          display: grid;
          gap: 8px;
          margin-top: auto;
          padding-top: 28px;
        }
        .truth-category-rail button {
          display: grid;
          grid-template-columns: 36px 1fr;
          align-items: center;
          gap: 10px;
          min-height: 42px;
          border: 1px solid rgba(24,23,20,0.08);
          border-radius: 999px;
          background: rgba(255,255,255,0.42);
          color: rgba(24,23,20,0.56);
          padding: 5px 14px 5px 7px;
          text-align: left;
          transition:
            border-color 200ms ease,
            background 200ms ease,
            color 200ms ease,
            transform 200ms ease;
        }
        .truth-category-rail button:hover {
          transform: translateX(2px);
          border-color: rgba(25,88,66,0.22);
          background: rgba(255,255,255,0.68);
          color: ${P.ink};
        }
        .truth-category-rail button.is-active {
          border-color: rgba(25,88,66,0.28);
          background:
            linear-gradient(135deg, rgba(25,88,66,0.13), rgba(255,255,255,0.62));
          color: ${P.green};
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.72);
        }
        .truth-category-rail em {
          display: grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 999px;
          background: rgba(24,23,20,0.06);
          color: rgba(24,23,20,0.46);
          font-family: var(--font-oswald);
          font-size: 15px;
          font-style: normal;
          font-weight: 300;
          line-height: 1;
        }
        .truth-category-rail button.is-active em {
          background: ${P.green};
          color: #fff;
        }
        .truth-category-rail b {
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.08em;
        }
        .truth-track {
          position: relative;
          display: flex;
          gap: clamp(16px, 2vw, 26px);
          min-height: 0;
          overflow-x: auto;
          overflow-y: hidden;
          padding: 8px 6px 24px;
          scroll-padding-inline: clamp(18px, 4vw, 80px);
          scroll-snap-type: x mandatory;
          transform: translate3d(0, var(--truth-card-shift), 0);
          scrollbar-width: none;
        }
        .truth-track::-webkit-scrollbar {
          display: none;
        }
        .truth-card {
          position: relative;
          flex: 0 0 min(660px, 78vw);
          width: min(660px, 78vw);
          min-height: clamp(300px, 28vw, 390px);
          padding: clamp(22px, 2.7vw, 36px);
          scroll-snap-align: center;
          border: 1px solid rgba(24,23,20,0.08);
          border-radius: 24px;
          background:
            radial-gradient(circle at 10% 8%, rgba(25,88,66,0.09), transparent 31%),
            radial-gradient(circle at 92% 5%, rgba(166,107,72,0.10), transparent 28%),
            linear-gradient(135deg, rgba(255,255,255,0.82), rgba(246,241,232,0.44)),
            rgba(255,255,255,0.36);
          backdrop-filter: blur(22px) saturate(1.08);
          -webkit-backdrop-filter: blur(22px) saturate(1.08);
          box-shadow:
            0 28px 70px rgba(83,65,37,0.10),
            0 18px 54px rgba(25,88,66,0.06),
            inset 0 1px 0 rgba(255,255,255,0.76),
            inset 0 -1px 0 rgba(24,23,20,0.06);
          opacity: 1;
          pointer-events: auto;
          transition:
            transform 720ms cubic-bezier(0.2, 0.82, 0.18, 1),
            filter 520ms ease;
        }
        .truth-card::before {
          content: "";
          position: absolute;
          inset: 1px;
          pointer-events: none;
          background:
            linear-gradient(120deg, rgba(255,255,255,0.56), rgba(255,255,255,0.04) 36%, rgba(197,225,213,0.34) 68%, rgba(255,255,255,0.02)),
            radial-gradient(circle at 18% 8%, rgba(255,255,255,0.44), transparent 26%),
            radial-gradient(circle at 92% 8%, rgba(166,107,72,0.13), transparent 25%);
          opacity: 0.62;
        }
        .truth-card::after {
          content: "";
          position: absolute;
          left: clamp(18px, 2.5vw, 34px);
          right: clamp(18px, 2.5vw, 34px);
          top: 0;
          height: 3px;
          background: linear-gradient(90deg, rgba(25,88,66,0.72), rgba(166,107,72,0.48), rgba(255,255,255,0));
          opacity: 0.46;
          pointer-events: none;
        }
        .truth-card > * {
          position: relative;
          z-index: 1;
        }
        .truth-card[aria-current="true"] {
          background:
            radial-gradient(circle at 8% 10%, rgba(25,88,66,0.20), transparent 36%),
            radial-gradient(circle at 86% 12%, rgba(166,107,72,0.16), transparent 31%),
            linear-gradient(135deg, rgba(255,255,255,0.92), rgba(242,248,244,0.46)),
            rgba(255,255,255,0.46);
          border-color: rgba(25,88,66,0.24);
          box-shadow:
            0 34px 86px rgba(25,88,66,0.13),
            0 18px 52px rgba(166,107,72,0.08),
            inset 0 1px 0 rgba(255,255,255,0.76),
            inset 0 -1px 0 rgba(24,23,20,0.06);
        }
        .truth-card[aria-current="true"]::after {
          opacity: 0.78;
        }
        .truth-card--active {
          opacity: 1;
          pointer-events: auto;
          filter: saturate(1) brightness(1);
          transform: translate3d(0, 0, 0) scale(1);
          z-index: 3;
        }
        .truth-card--next {
          opacity: 1;
          pointer-events: auto;
          filter: saturate(0.95) brightness(0.985);
          transform: translate3d(0, 10px, 0) scale(0.985);
        }
        .truth-card--prev {
          opacity: 1;
          pointer-events: auto;
          filter: saturate(0.95) brightness(0.985);
          transform: translate3d(0, 10px, 0) scale(0.985);
        }
        .truth-card--far {
          opacity: 1;
          pointer-events: auto;
          filter: saturate(0.9) brightness(0.97);
          transform: translate3d(0, 14px, 0) scale(0.97);
        }
        .truth-card-top {
          display: flex;
          align-items: center;
          gap: 14px;
          color: ${P.rust};
        }
        .truth-number {
          font-size: clamp(28px, 2.9vw, 42px);
          font-weight: 300;
          line-height: 1;
        }
        .truth-category {
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.14em;
        }
        .truth-voice-block {
          margin-top: clamp(28px, 3.4vw, 44px);
        }
        .truth-voice-block p,
        .truth-answer-block p {
          margin: 0;
          color: rgba(24,23,20,0.48);
          font-family: var(--font-inter);
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 0.15em;
        }
        .truth-voice-block h3 {
          display: inline;
          margin: 14px 0 0;
          color: ${P.ink};
          font-size: clamp(26px, 2.55vw, 42px);
          font-weight: 680;
          line-height: 1.34;
          letter-spacing: 0;
          background:
            linear-gradient(transparent 61%, rgba(255,255,255,0.86) 61%, rgba(255,255,255,0.86) 88%, transparent 88%);
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        .truth-answer-block {
          position: relative;
          margin-top: clamp(32px, 3.8vw, 54px);
          padding-left: clamp(18px, 2vw, 26px);
        }
        .truth-answer-block::before {
          content: "";
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 4px;
          width: 1px;
          background: linear-gradient(180deg, rgba(25,88,66,0), rgba(25,88,66,0.58), rgba(25,88,66,0));
        }
        .truth-answer-block p {
          color: ${P.green};
        }
        .truth-answer-block h4 {
          margin: 12px 0 0;
          color: ${P.green};
          font-size: clamp(17px, 1.42vw, 22px);
          font-weight: 950;
          line-height: 1.75;
        }
        .truth-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          margin-top: clamp(22px, 3vw, 36px);
          border-top: 1px solid rgba(255,255,255,0.54);
          padding-top: 22px;
        }
        .truth-controls {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .truth-controls button {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(255,255,255,0.62);
          background: rgba(255,255,255,0.30);
          color: ${P.ink};
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 180ms ease, background 180ms ease;
        }
        .truth-controls button:hover {
          background: rgba(255,255,255,0.54);
          transform: translateY(-1px);
        }
        .truth-dots {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .truth-dots button {
          width: 8px;
          height: 8px;
          border: 0;
          border-radius: 999px;
          background: rgba(24,23,20,0.24);
        }
        .truth-dots button.is-active {
          width: 28px;
          background: ${P.green};
        }
        .truth-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: ${P.green};
          border-bottom: 1px solid rgba(25,88,66,0.42);
          padding-bottom: 6px;
          font-size: 14px;
          font-weight: 950;
          text-decoration: none;
          transition: gap 180ms ease, opacity 180ms ease;
        }
        .truth-cta:hover {
          gap: 18px;
          opacity: 0.76;
        }
        .flow-reveal {
          opacity: 0;
          transform: translate3d(0, 26px, 0);
          filter: blur(4px);
          transition:
            opacity 820ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 820ms cubic-bezier(0.16, 1, 0.3, 1),
            filter 820ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: var(--reveal-delay, 0ms);
          will-change: opacity, transform, filter;
        }
        .flow-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
          filter: blur(0);
        }
        .payment-section {
          background:
            radial-gradient(circle at 12% 10%, rgba(255, 237, 190, 0.38), transparent 28%),
            radial-gradient(circle at 78% 12%, rgba(181, 216, 197, 0.34), transparent 31%),
            radial-gradient(circle at 72% 80%, rgba(224, 169, 122, 0.22), transparent 34%),
            linear-gradient(135deg, #c9c7bd 0%, #e2ddd1 44%, #b7beb4 100%);
          color: ${P.ink};
          scroll-margin-top: 78px;
        }
        .payment-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.24), rgba(255,255,255,0.04) 42%, rgba(25,88,66,0.08)),
            radial-gradient(circle at 8% 54%, rgba(255,255,255,0.34), transparent 28%),
            radial-gradient(circle at 88% 48%, rgba(255, 220, 157, 0.24), transparent 25%);
          opacity: 0.82;
          z-index: 0;
        }
        .payment-bg-wash {
          background:
            radial-gradient(circle at 16% 10%, rgba(255,255,255,0.40), transparent 30%),
            radial-gradient(circle at 82% 18%, rgba(255,225,177,0.30), transparent 28%),
            radial-gradient(circle at 42% 86%, rgba(155,196,178,0.24), transparent 34%),
            linear-gradient(120deg, rgba(198,195,184,0.58), rgba(236,230,218,0.64) 52%, rgba(174,185,175,0.58));
          z-index: 0;
        }
        .payment-lead {
          color: rgba(24,23,20,0.66);
        }
        .payment-subtitle {
          color: rgba(25,88,66,0.72);
        }
        .payment-head-cta {
          border-color: rgba(25,88,66,0.46);
          color: ${P.green};
        }
        .payment-signal-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .payment-signal-row span {
          display: inline-flex;
          align-items: center;
          min-height: 36px;
          border: 1px solid rgba(255,255,255,0.54);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.42), rgba(255,255,255,0.14)),
            rgba(255, 246, 226, 0.18);
          box-shadow:
            0 16px 40px rgba(24,23,20,0.06),
            inset 0 1px 0 rgba(255,255,255,0.70);
          padding: 0 14px;
          color: rgba(24,23,20,0.72);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
          backdrop-filter: blur(16px) saturate(1.08);
          -webkit-backdrop-filter: blur(16px) saturate(1.08);
        }
        .payment-slider {
          scrollbar-width: thin;
          scrollbar-color: rgba(25, 88, 66, 0.46) rgba(255, 255, 255, 0.28);
          scroll-padding-inline: 20px;
        }
        .payment-slider::-webkit-scrollbar {
          height: 8px;
        }
        .payment-slider::-webkit-scrollbar-track {
          background: rgba(255,255,255,0.28);
        }
        .payment-slider::-webkit-scrollbar-thumb {
          background: rgba(25, 88, 66, 0.42);
          border-radius: 999px;
        }
        .payment-card {
          flex: 0 0 min(980px, calc(100vw - 58px));
          width: min(980px, calc(100vw - 58px));
          border-color: rgba(255,255,255,0.64);
          background:
            radial-gradient(circle at 13% 8%, rgba(255, 238, 195, 0.34), transparent 31%),
            radial-gradient(circle at 88% 16%, rgba(156, 199, 178, 0.22), transparent 34%),
            linear-gradient(135deg, rgba(255,255,255,0.30), rgba(255,255,255,0.11)),
            rgba(238, 232, 219, 0.22);
          box-shadow:
            0 46px 130px -72px rgba(24,23,20,0.62),
            0 28px 78px -60px rgba(25,88,66,0.58),
            inset 0 1px 0 rgba(255,255,255,0.82),
            inset 0 -1px 0 rgba(255,255,255,0.16);
        }
        .payment-section .blueprint-layer {
          opacity: 0.23;
          mix-blend-mode: multiply;
          z-index: 1;
        }
        .payment-main-title {
          display: block;
          font-size: clamp(34px, 3.65vw, 54px);
          white-space: nowrap;
        }
        .payment-card::before {
          content: "";
          position: absolute;
          inset: 1px;
          border: 1px solid rgba(255,255,255,0.72);
          border-radius: 7px;
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,0.18),
            inset 18px 18px 42px rgba(255,255,255,0.20),
            inset -20px -24px 52px rgba(25,88,66,0.10);
          pointer-events: none;
          z-index: 2;
        }
        .payment-card::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 8px;
          background:
            linear-gradient(132deg, rgba(255,255,255,0.48), rgba(255,255,255,0.08) 22%, transparent 44%),
            linear-gradient(312deg, rgba(255,246,226,0.20), transparent 32%),
            radial-gradient(circle at 16% 8%, rgba(255,255,255,0.40), transparent 28%),
            radial-gradient(circle at 88% 78%, rgba(25,88,66,0.14), transparent 30%);
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.58;
          z-index: 1;
        }
        .glass-panel {
          position: relative;
          overflow: hidden;
          box-shadow:
            0 28px 90px -62px rgba(24,23,20,0.72),
            inset 0 1px 0 rgba(255,255,255,0.72),
            inset 0 -1px 0 rgba(255,255,255,0.14);
        }
        .glass-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.42), transparent 34%),
            radial-gradient(circle at 80% 12%, rgba(255,255,255,0.28), transparent 24%);
          pointer-events: none;
          opacity: 0.62;
        }
        .payment-card > div {
          position: relative;
          z-index: 3;
        }
        .payment-card-inner {
          display: grid;
          grid-template-columns: minmax(0, 0.62fr) minmax(300px, 0.38fr);
          min-height: 520px;
        }
        .payment-case-chip {
          border-color: rgba(255,255,255,0.58);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.38), rgba(255,255,255,0.08)),
            rgba(255, 238, 195, 0.22);
          color: ${P.rust};
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.68);
        }
        .payment-case-meta,
        .payment-concern,
        .payment-fact-grid p:first-child,
        .payment-breakdown-chip,
        .payment-monthly-box p:first-child {
          color: rgba(24,23,20,0.55);
        }
        .payment-concern {
          max-width: 430px;
        }
        .payment-monthly-box {
          border-color: rgba(255,255,255,0.58);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.48), rgba(255,255,255,0.14)),
            rgba(255,250,238,0.22);
          box-shadow:
            0 18px 46px rgba(24,23,20,0.08),
            inset 0 1px 0 rgba(255,255,255,0.72);
        }
        .payment-monthly-box p:last-child,
        .payment-fact-grid p:last-child,
        .payment-case-headline {
          color: ${P.ink};
        }
        .payment-fact-grid {
          border-color: rgba(255,255,255,0.54);
          background: rgba(255,255,255,0.14);
        }
        .payment-fact-grid > div {
          background:
            linear-gradient(135deg, rgba(255,255,255,0.32), rgba(255,255,255,0.08)),
            rgba(255,255,255,0.10);
        }
        .payment-breakdown-chip {
          border-color: rgba(255,255,255,0.48);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.30), rgba(255,255,255,0.06)),
            rgba(255,246,226,0.16);
        }
        .payment-card-figure {
          position: relative;
          display: block;
          min-height: 100%;
          background: rgba(255,255,255,0.18);
          isolation: isolate;
          overflow: hidden;
        }
        .payment-card-figure img {
          filter: saturate(0.96) contrast(0.98) brightness(1.02);
          transform: scale(1.015);
          transition: transform 1100ms cubic-bezier(0.16, 1, 0.3, 1), filter 1100ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .payment-card:hover .payment-card-figure img {
          filter: saturate(1.02) contrast(1) brightness(1.04);
          transform: scale(1.045);
        }
        .payment-card-figure::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            radial-gradient(circle at 18% 12%, rgba(255,255,255,0.48), transparent 30%),
            radial-gradient(circle at 92% 20%, rgba(255,219,170,0.28), transparent 34%),
            linear-gradient(180deg, rgba(255,255,255,0.12), rgba(24,23,20,0.14));
          mix-blend-mode: screen;
          opacity: 0.78;
        }
        .payment-card-figure::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.38), transparent 38%),
            linear-gradient(0deg, rgba(24,23,20,0.20), transparent 42%);
        }
        .payment-image-glow {
          background:
            linear-gradient(90deg, rgba(255,255,255,0.28), rgba(255,255,255,0.04) 44%, rgba(24,23,20,0.08)),
            linear-gradient(180deg, rgba(255,246,226,0.12), rgba(24,23,20,0.14));
        }
        .payment-monthly-number {
          display: block;
          white-space: nowrap;
          word-break: keep-all;
          overflow-wrap: normal;
          font-variant-numeric: tabular-nums;
          color: ${P.green};
        }
        @media (min-width: 1024px) {
          .payment-card {
            flex-basis: min(980px, calc(100vw - 190px));
            width: min(980px, calc(100vw - 190px));
          }
        }
        @media (max-width: 1023px) {
          .payment-card-inner {
            display: flex;
            flex-direction: column;
            min-height: 0;
          }
          .payment-card-figure {
            order: -1;
            min-height: 238px;
          }
          .payment-monthly-number {
            font-size: clamp(30px, 8.6vw, 34px);
          }
        }
        .payment-card.flow-reveal {
          transform: translate3d(0, 34px, 0) scale(0.985);
        }
        .payment-card.flow-reveal.is-visible {
          transform: translate3d(0, 0, 0) scale(1);
        }
        .cost-reason-section {
          z-index: 60;
          isolation: isolate;
          background:
            radial-gradient(circle at 14% 16%, rgba(255,255,255,0.92), transparent 34%),
            radial-gradient(circle at 80% 14%, rgba(247,217,168,0.42), transparent 34%),
            radial-gradient(circle at 72% 86%, rgba(195,218,199,0.38), transparent 38%),
            linear-gradient(135deg, #f8f2e8 0%, #efe3d1 48%, #f7f3ec 100%);
          color: ${P.ink};
        }
        .cost-reason-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.36), rgba(255,255,255,0.06) 48%, rgba(144,119,76,0.12)),
            radial-gradient(circle at 72% 72%, rgba(25,88,66,0.10), transparent 34%);
          z-index: 0;
        }
        .cost-bg-wash {
          background:
            radial-gradient(circle at 18% 18%, rgba(255,255,255,0.72), transparent 34%),
            radial-gradient(circle at 72% 42%, rgba(255,218,146,0.28), transparent 30%),
            radial-gradient(circle at 82% 86%, rgba(25,88,66,0.14), transparent 36%);
          z-index: 0;
        }
        .cost-clarity-stage {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border: 1px solid rgba(120,98,64,0.20);
          border-radius: 18px;
          background:
            radial-gradient(circle at 86% 12%, rgba(255,255,255,0.88), transparent 28%),
            radial-gradient(circle at 18% 78%, rgba(166,107,72,0.10), transparent 34%),
            linear-gradient(135deg, rgba(255,255,255,0.76), rgba(255,253,250,0.42)),
            rgba(255,253,250,0.58);
          box-shadow:
            0 42px 120px -86px rgba(83,65,37,0.42),
            inset 0 1px 0 rgba(255,255,255,0.76),
            inset 0 -1px 0 rgba(120,98,64,0.08);
          padding: clamp(28px, 3.2vw, 46px);
          color: ${P.ink};
          backdrop-filter: blur(18px) saturate(1.08);
          -webkit-backdrop-filter: blur(18px) saturate(1.08);
        }
        .cost-clarity-stage::before,
        .cost-clarity-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .cost-clarity-stage::before {
          background:
            linear-gradient(90deg, rgba(120,98,64,0.055) 0, transparent 1px),
            linear-gradient(180deg, rgba(120,98,64,0.04) 0, transparent 1px);
          background-size: 96px 96px;
          opacity: 0.42;
          mix-blend-mode: multiply;
        }
        .cost-clarity-stage::after {
          background:
            radial-gradient(circle at 48% 48%, transparent 54%, rgba(255,255,255,0.46)),
            linear-gradient(90deg, rgba(234,75,42,0.06), transparent 38%, rgba(25,88,66,0.09));
        }
        .cost-clarity-stage > * {
          position: relative;
          z-index: 1;
        }
        .cost-clarity-head {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(360px, 0.46fr);
          gap: clamp(24px, 4vw, 64px);
          align-items: end;
        }
        .cost-clarity-head h2 {
          margin-top: 18px;
          color: ${P.ink};
          font-family: var(--font-shippori);
          font-size: clamp(34px, 2.7vw, 46px);
          font-weight: 500;
          line-height: 1.18;
          letter-spacing: 0;
          white-space: nowrap;
          text-shadow: 0 12px 34px rgba(255,255,255,0.72);
        }
        .cost-clarity-head p {
          margin: 0;
          color: rgba(24,23,20,0.68);
          font-size: clamp(14px, 1.02vw, 16px);
          font-weight: 850;
          line-height: 1.96;
          letter-spacing: 0.04em;
        }
        .cost-clarity-layout {
          display: grid;
          grid-template-columns: minmax(280px, 0.74fr) minmax(0, 1.42fr);
          gap: clamp(22px, 3vw, 42px);
          align-items: stretch;
          margin-top: clamp(26px, 3vw, 36px);
        }
        .cost-clarity-copy,
        .cost-clarity-board,
        .cost-clarity-result {
          border: 1px solid rgba(255,255,255,0.56);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.62), rgba(255,255,255,0.26)),
            rgba(255,253,250,0.46);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.78),
            0 30px 80px -66px rgba(83,65,37,0.36);
          backdrop-filter: blur(16px) saturate(1.08);
          -webkit-backdrop-filter: blur(16px) saturate(1.08);
        }
        .cost-clarity-copy {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 100%;
          border-radius: 16px;
          padding: clamp(22px, 2.4vw, 34px);
        }
        .cost-clarity-copy > span {
          color: ${P.rust};
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 0.16em;
          line-height: 1.4;
        }
        .cost-clarity-copy h3 {
          margin: 18px 0 0;
          color: ${P.green};
          font-family: var(--font-shippori);
          font-size: clamp(30px, 2.55vw, 44px);
          font-weight: 500;
          line-height: 1.22;
          letter-spacing: 0.01em;
        }
        .cost-clarity-copy p {
          margin: 18px 0 0;
          color: rgba(24,23,20,0.66);
          font-size: clamp(14px, 1vw, 16px);
          font-weight: 850;
          line-height: 1.92;
          letter-spacing: 0.04em;
        }
        .cost-clarity-mechanisms {
          display: grid;
          gap: 10px;
          margin-top: 24px;
        }
        .cost-clarity-mechanisms b {
          display: flex;
          align-items: center;
          gap: 10px;
          border-top: 1px solid rgba(25,88,66,0.16);
          padding-top: 12px;
          color: rgba(25,88,66,0.86);
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.08em;
          line-height: 1.55;
        }
        .cost-clarity-mechanisms b::before {
          content: "";
          width: 8px;
          aspect-ratio: 1;
          border-radius: 999px;
          background: ${P.green};
          box-shadow: 0 0 18px rgba(25,88,66,0.24);
        }
        .cost-clarity-board {
          overflow: hidden;
          border-radius: 16px;
        }
        .cost-clarity-board-head,
        .cost-clarity-row {
          display: grid;
          grid-template-columns: minmax(150px, 0.52fr) minmax(0, 1fr) minmax(0, 1.05fr);
        }
        .cost-clarity-board-head {
          min-height: 50px;
          background:
            linear-gradient(90deg, rgba(24,23,20,0.82), rgba(24,23,20,0.72) 48%, rgba(25,88,66,0.82));
          color: rgba(255,253,250,0.82);
        }
        .cost-clarity-board-head span {
          display: flex;
          align-items: center;
          border-left: 1px solid rgba(255,255,255,0.14);
          padding: 0 clamp(14px, 1.6vw, 24px);
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 0.14em;
          line-height: 1.4;
        }
        .cost-clarity-board-head span:first-child {
          border-left: 0;
        }
        .cost-clarity-row {
          min-height: 64px;
          border-top: 1px solid rgba(120,98,64,0.14);
          opacity: 1;
          transform: translate3d(0, 0, 0);
          animation: cost-row-in 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(170ms + var(--row) * 66ms);
        }
        .cost-clarity-row > div {
          min-width: 0;
          padding: 10px clamp(13px, 1.25vw, 18px);
        }
        .cost-clarity-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255,253,250,0.36);
        }
        .cost-clarity-item em {
          flex: 0 0 auto;
          color: rgba(24,23,20,0.32);
          font-family: var(--font-oswald);
          font-size: clamp(22px, 1.7vw, 30px);
          font-style: normal;
          font-weight: 300;
          line-height: 1;
        }
        .cost-clarity-item strong {
          color: rgba(24,23,20,0.82);
          font-size: clamp(13px, 0.98vw, 16px);
          font-weight: 950;
          line-height: 1.42;
          letter-spacing: 0.05em;
        }
        .cost-clarity-risk,
        .cost-clarity-answer {
          display: grid;
          align-content: center;
          gap: 6px;
          border-left: 1px solid rgba(120,98,64,0.14);
        }
        .cost-clarity-risk {
          background:
            linear-gradient(90deg, rgba(234,75,42,0.075), rgba(255,255,255,0.12)),
            rgba(255,253,250,0.20);
        }
        .cost-clarity-answer {
          background:
            linear-gradient(90deg, rgba(25,88,66,0.14), rgba(255,255,255,0.18)),
            rgba(255,253,250,0.28);
          box-shadow: inset 3px 0 0 rgba(25,88,66,0.28);
        }
        .cost-clarity-risk span,
        .cost-clarity-answer span {
          display: inline-flex;
          width: fit-content;
          min-height: 24px;
          align-items: center;
          border-radius: 999px;
          padding: 0 10px;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 0.10em;
          line-height: 1;
        }
        .cost-clarity-risk span {
          border: 1px solid rgba(234,75,42,0.24);
          background: rgba(234,75,42,0.08);
          color: rgba(146,56,41,0.88);
        }
        .cost-clarity-answer span {
          border: 1px solid rgba(25,88,66,0.28);
          background: rgba(25,88,66,0.10);
          color: ${P.green};
        }
        .cost-clarity-risk p,
        .cost-clarity-answer p {
          margin: 0;
          color: rgba(24,23,20,0.68);
          font-size: clamp(12px, 0.9vw, 14px);
          font-weight: 850;
          line-height: 1.66;
          letter-spacing: 0.035em;
        }
        .cost-clarity-answer p {
          color: rgba(25,88,66,0.82);
        }
        .cost-clarity-result {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(220px, auto);
          gap: 24px;
          align-items: center;
          margin-top: clamp(18px, 2vw, 24px);
          border-radius: 16px;
          padding: 18px clamp(18px, 2.2vw, 30px);
        }
        .cost-clarity-result span {
          display: block;
          color: ${P.rust};
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 0.16em;
          line-height: 1.4;
        }
        .cost-clarity-result strong {
          display: block;
          margin-top: 7px;
          color: ${P.green};
          font-size: clamp(18px, 1.55vw, 25px);
          font-weight: 950;
          line-height: 1.55;
          letter-spacing: 0.035em;
        }
        .cost-clarity-result p {
          margin: 7px 0 0;
          color: rgba(24,23,20,0.62);
          font-size: clamp(13px, 0.95vw, 15px);
          font-weight: 820;
          line-height: 1.82;
          letter-spacing: 0.04em;
        }
        .cost-clarity-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          border: 1px solid rgba(25,88,66,0.34);
          background: rgba(255,255,255,0.58);
          padding: 0 24px;
          color: ${P.green};
          font-size: 13px;
          font-weight: 950;
          letter-spacing: 0.08em;
          line-height: 1.4;
          text-decoration: none;
          transition: transform 260ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.82),
            0 18px 48px -38px rgba(25,88,66,0.42);
        }
        .cost-clarity-link:hover {
          transform: translate3d(6px, 0, 0);
          opacity: 0.82;
        }
        .cost-concept-frame {
          position: relative;
          overflow: hidden;
          aspect-ratio: 16 / 9;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.04);
          box-shadow:
            0 42px 140px -86px rgba(0,0,0,0.86),
            0 18px 80px -68px rgba(255,212,135,0.52),
            inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .cost-concept-frame::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.06), transparent 18%, rgba(0,0,0,0.08)),
            radial-gradient(circle at 50% 50%, transparent 60%, rgba(0,0,0,0.30));
        }
        .cost-concept-image {
          object-fit: cover;
          object-position: center;
        }
        .cost-mobile-summary {
          display: none;
        }
        .cost-compare-stage {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          border: 1px solid rgba(120,98,64,0.22);
          border-radius: 18px;
          background:
            radial-gradient(circle at 72% 18%, rgba(255,255,255,0.72), transparent 30%),
            radial-gradient(circle at 22% 82%, rgba(226,184,100,0.16), transparent 36%),
            linear-gradient(135deg, rgba(255,255,255,0.74), rgba(255,255,255,0.34)),
            rgba(255,253,250,0.58);
          box-shadow:
            0 42px 120px -86px rgba(83,65,37,0.42),
            0 18px 72px -58px rgba(255,255,255,0.80),
            inset 0 1px 0 rgba(255,255,255,0.74);
          padding: clamp(30px, 4.4vw, 64px);
          color: ${P.ink};
          backdrop-filter: blur(26px) saturate(1.12);
          -webkit-backdrop-filter: blur(26px) saturate(1.12);
        }
        .cost-compare-stage::before,
        .cost-compare-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
        }
        .cost-compare-stage::before {
          background:
            linear-gradient(180deg, rgba(255,255,255,0.52), rgba(255,255,255,0.08) 42%, rgba(228,206,170,0.16)),
            radial-gradient(circle at 80% 42%, rgba(232,177,109,0.18), transparent 28%),
            radial-gradient(circle at 26% 30%, rgba(255,255,255,0.62), transparent 24%);
        }
        .cost-compare-stage::after {
          background:
            linear-gradient(90deg, rgba(120,98,64,0.06) 0, transparent 1px),
            linear-gradient(180deg, rgba(120,98,64,0.045) 0, transparent 1px);
          background-size: 104px 104px;
          opacity: 0.36;
          mix-blend-mode: multiply;
        }
        .cost-compare-bg {
          z-index: 0;
          object-fit: cover;
          object-position: center;
          opacity: 0.16;
          filter: saturate(0.72) contrast(0.92) brightness(1.16);
        }
        .cost-compare-head,
        .cost-compare-table,
        .cost-compare-bottom {
          position: relative;
          z-index: 2;
        }
        .cost-compare-head {
          max-width: 1240px;
        }
        .cost-compare-head h2 {
          margin-top: 18px;
          color: ${P.ink};
          font-family: var(--font-shippori);
          font-size: clamp(36px, 3.8vw, 62px);
          font-weight: 500;
          line-height: 1.12;
          letter-spacing: 0;
          white-space: nowrap;
          text-shadow: 0 10px 34px rgba(255,255,255,0.72);
        }
        .cost-compare-head p {
          max-width: 720px;
          margin: 22px 0 0;
          color: rgba(24,23,20,0.70);
          font-size: clamp(14px, 1.05vw, 17px);
          font-weight: 850;
          line-height: 2.0;
          text-shadow: none;
        }
        .cost-compare-table {
          display: grid;
          grid-template-columns: minmax(210px, 0.36fr) minmax(0, 1fr) minmax(0, 1fr);
          gap: 0;
          overflow: hidden;
          margin-top: clamp(34px, 4.2vw, 58px);
          border: 1px solid rgba(255,255,255,0.30);
          border-radius: 12px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.20), rgba(255,255,255,0.075)),
            rgba(255,255,255,0.10);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.24),
            0 30px 84px -66px rgba(0,0,0,0.72);
          backdrop-filter: blur(28px) saturate(1.16);
          -webkit-backdrop-filter: blur(28px) saturate(1.16);
        }
        .cost-compare-colhead {
          display: flex;
          align-items: center;
          min-height: 62px;
          border-bottom: 1px solid rgba(255,255,255,0.24);
          padding: 0 clamp(18px, 2vw, 30px);
          color: rgba(255,253,250,0.84);
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          background:
            linear-gradient(180deg, rgba(34,43,41,0.88), rgba(25,32,31,0.66)),
            rgba(255,255,255,0.04);
        }
        .cost-compare-colhead + .cost-compare-colhead {
          border-left: 1px solid rgba(255,255,255,0.14);
        }
        .cost-compare-colhead-yamato {
          color: #e7c978;
          background:
            linear-gradient(180deg, rgba(42,111,86,0.86), rgba(25,88,66,0.58)),
            rgba(25,88,66,0.40);
          box-shadow: inset 4px 0 0 rgba(231,201,120,0.64);
        }
        .cost-compare-row {
          display: grid;
          grid-column: 1 / -1;
          grid-template-columns: minmax(210px, 0.36fr) minmax(0, 1fr) minmax(0, 1fr);
          min-height: 70px;
          border-bottom: 1px solid rgba(255,255,255,0.16);
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          animation: cost-row-in 780ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(220ms + var(--row) * 70ms);
        }
        .cost-compare-row:last-child {
          border-bottom: 0;
        }
        .cost-compare-item,
        .cost-compare-other,
        .cost-compare-yamato {
          display: flex;
          align-items: center;
          margin: 0;
          padding: 15px clamp(18px, 2vw, 30px);
        }
        .cost-compare-other,
        .cost-compare-yamato {
          border-left: 1px solid rgba(255,255,255,0.16);
          display: grid;
          grid-template-columns: 46px minmax(0, 1fr);
          gap: 14px;
          font-size: clamp(12px, 0.92vw, 15px);
          font-weight: 850;
          line-height: 1.58;
        }
        .cost-compare-item {
          gap: 16px;
          background: rgba(28,34,32,0.42);
        }
        .cost-compare-item span {
          display: block;
          min-width: 40px;
          color: rgba(255,253,250,0.56);
          font-family: var(--font-oswald);
          font-size: clamp(20px, 1.6vw, 28px);
          font-weight: 300;
          letter-spacing: 0.04em;
          line-height: 1;
          white-space: nowrap;
        }
        .cost-compare-item strong {
          color: rgba(255,253,250,0.92);
          font-size: clamp(13px, 0.98vw, 16px);
          font-weight: 950;
          line-height: 1.35;
          white-space: nowrap;
          word-break: keep-all;
        }
        .cost-compare-other {
          color: rgba(255,253,250,0.74);
          background: rgba(255,255,255,0.055);
        }
        .cost-compare-yamato {
          color: rgba(255,253,250,0.94);
          background:
            linear-gradient(90deg, rgba(25,88,66,0.42), rgba(25,88,66,0.18)),
            rgba(255,255,255,0.055);
          box-shadow: inset 4px 0 0 rgba(231,201,120,0.24);
        }
        .cost-compare-mark {
          display: grid;
          place-items: center;
          width: 38px;
          aspect-ratio: 1;
          border-radius: 999px;
          font-family: var(--font-shippori);
          font-size: 23px;
          font-weight: 600;
          line-height: 1;
        }
        .cost-compare-mark-other {
          border: 1px solid rgba(255,255,255,0.36);
          color: rgba(255,253,250,0.66);
          background: rgba(255,255,255,0.055);
        }
        .cost-compare-mark-yamato {
          border: 1px solid rgba(231,201,120,0.78);
          color: #e7c978;
          background: rgba(231,201,120,0.11);
          box-shadow: 0 0 22px rgba(231,201,120,0.22);
        }
        .cost-compare-arrow {
          position: relative;
          z-index: 2;
          display: flex;
          justify-content: flex-end;
          margin: 12px 0 0 auto;
          width: min(620px, 52%);
          min-height: 36px;
          padding-right: 42px;
          color: rgba(25,20,10,0.92);
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.10em;
          line-height: 36px;
          text-align: right;
          clip-path: polygon(0 0, calc(100% - 34px) 0, 100% 50%, calc(100% - 34px) 100%, 0 100%, 18px 50%);
          background: linear-gradient(90deg, rgba(231,201,120,0.06), rgba(231,201,120,0.92));
          box-shadow: 0 16px 40px -30px rgba(231,201,120,0.94);
        }
        .cost-compare-bottom {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(220px, auto);
          gap: 28px;
          align-items: center;
          margin-top: clamp(24px, 3vw, 38px);
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 16px;
          background: rgba(255,255,255,0.095);
          padding: 20px clamp(20px, 2.6vw, 34px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.22);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .cost-compare-bottom p {
          max-width: 920px;
          margin: 0;
          color: rgba(255,253,250,0.84);
          font-size: clamp(13px, 0.98vw, 16px);
          font-weight: 850;
          line-height: 1.9;
        }
        .cost-compare-bottom strong {
          color: #e7c978;
        }
        .cost-compare-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          min-height: 48px;
          border: 1px solid rgba(226,184,100,0.82);
          background: rgba(33,30,22,0.32);
          padding: 0 24px;
          color: #e9cb78;
          font-size: 13px;
          font-weight: 950;
          letter-spacing: 0.08em;
          text-decoration: none;
          white-space: nowrap;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            0 20px 52px -42px rgba(226,184,100,0.9);
        }
        .cost-voice-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
          gap: clamp(24px, 3vw, 40px);
          align-items: start;
          margin-top: clamp(34px, 4vw, 56px);
        }
        .cost-anxiety-panel,
        .cost-answer-panel {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(120,98,64,0.18);
          border-radius: 18px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.66), rgba(255,250,241,0.34)),
            rgba(255,253,250,0.48);
          box-shadow:
            0 28px 84px -70px rgba(83,65,37,0.48),
            inset 0 1px 0 rgba(255,255,255,0.80);
          backdrop-filter: blur(20px) saturate(1.10);
          -webkit-backdrop-filter: blur(20px) saturate(1.10);
        }
        .cost-anxiety-panel {
          padding: clamp(20px, 2.4vw, 34px);
        }
        .cost-answer-panel {
          padding: clamp(22px, 2.8vw, 38px);
          background:
            radial-gradient(circle at 84% 18%, rgba(25,88,66,0.10), transparent 28%),
            linear-gradient(135deg, rgba(255,255,255,0.78), rgba(247,239,225,0.56)),
            rgba(255,253,250,0.68);
        }
        .cost-answer-panel::before {
          content: "";
          position: absolute;
          inset: 18px 18px auto auto;
          width: 104px;
          aspect-ratio: 1;
          border-radius: 999px;
          background:
            radial-gradient(circle, rgba(25,88,66,0.20), rgba(25,88,66,0.02) 58%, transparent 64%);
          filter: blur(1px);
          pointer-events: none;
        }
        .cost-panel-label {
          position: relative;
          z-index: 1;
          margin: 0;
          color: ${P.rust};
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.14em;
          line-height: 1.4;
          text-transform: uppercase;
        }
        .cost-two-step-head {
          position: relative;
          z-index: 2;
          max-width: 1040px;
          margin-bottom: clamp(30px, 4vw, 56px);
        }
        .cost-fear-scene {
          position: relative;
          z-index: 2;
          overflow: hidden;
          aspect-ratio: 1672 / 941;
          border: 1px solid rgba(166,107,72,0.18);
          border-radius: 20px;
          background: rgba(255,253,250,0.72);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.78),
            0 28px 88px -74px rgba(83,65,37,0.44);
        }
        .cost-fear-scene::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,253,250,0.06)),
            radial-gradient(circle at 50% 50%, transparent 62%, rgba(255,253,250,0.18));
        }
        .cost-review-scene-image {
          z-index: 0;
          object-fit: cover;
          object-position: center;
        }
        .cost-review-scene-mobile {
          display: none;
        }
        .cost-review-overlays {
          position: absolute;
          inset: 0;
          z-index: 3;
        }
        .cost-review-copy {
          position: absolute;
          display: flex;
          flex-direction: column;
          justify-content: center;
          opacity: 0;
          transform: translate3d(0, 12px, 0);
          animation: cost-row-in 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(180ms + var(--voice) * 90ms);
          padding: 0 clamp(24px, 2.7vw, 44px);
        }
        .cost-review-copy-1 {
          left: 25.1%;
          top: 18.55%;
          width: 50.5%;
          height: 12.2%;
        }
        .cost-review-copy-2 {
          left: 25.1%;
          top: 36.35%;
          width: 50.3%;
          height: 12%;
        }
        .cost-review-copy-3 {
          left: 25.1%;
          top: 54.25%;
          width: 50.8%;
          height: 12%;
        }
        .cost-review-copy-4 {
          left: 25.6%;
          top: 72%;
          width: 48.6%;
          height: 11.8%;
        }
        .cost-review-label {
          display: inline-block;
          color: ${P.rust};
          font-size: clamp(15px, 1.12vw, 18px);
          font-weight: 950;
          letter-spacing: 0.06em;
          line-height: 1.2;
          text-shadow: 0 1px 0 rgba(255,255,255,0.86);
        }
        .cost-review-copy p {
          margin: 4px 0 0;
          color: rgba(25,24,21,0.88);
          font-size: clamp(17px, 1.45vw, 22px);
          font-weight: 860;
          line-height: 1.52;
          letter-spacing: 0.035em;
          font-feature-settings: "palt";
        }
        .cost-review-line {
          display: block;
          white-space: nowrap;
        }
        .cost-review-copy small {
          display: none;
          margin-top: 8px;
          color: rgba(24,23,20,0.50);
          font-size: clamp(10px, 0.78vw, 13px);
          font-weight: 850;
          letter-spacing: 0.06em;
          line-height: 1.4;
        }
        .cost-review-fallback {
          display: none;
        }
        .cost-scene-copy {
          position: relative;
          z-index: 1;
        }
        .cost-scene-copy h3 {
          margin: 18px 0 0;
          color: ${P.ink};
          font-family: var(--font-shippori);
          font-size: clamp(28px, 3vw, 46px);
          font-weight: 500;
          line-height: 1.32;
          letter-spacing: 0.02em;
        }
        .cost-scene-copy p:not(.cost-panel-label) {
          max-width: 460px;
          margin: 20px 0 0;
          color: rgba(24,23,20,0.68);
          font-size: clamp(14px, 1.02vw, 16px);
          font-weight: 850;
          line-height: 1.92;
          letter-spacing: 0.045em;
        }
        .cost-voice-review-list {
          position: relative;
          z-index: 1;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-top: 0;
        }
        .cost-review-card,
        .cost-review-card:nth-child(even) {
          grid-template-columns: clamp(92px, 9vw, 132px) minmax(0, 1fr);
          gap: 18px;
          align-items: center;
          transform: translate3d(0, 14px, 0);
        }
        .cost-review-card:nth-child(even) {
          grid-template-columns: minmax(0, 1fr) clamp(92px, 9vw, 132px);
        }
        .cost-review-card:nth-child(even) .cost-voice-portrait {
          order: 2;
        }
        .cost-review-card:nth-child(even) .cost-voice-balloon {
          order: initial;
        }
        .cost-review-card .cost-voice-balloon {
          min-height: 118px;
        }
        .cost-scene-bridge {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 18px;
          margin: clamp(22px, 3vw, 36px) auto;
          color: rgba(24,23,20,0.62);
          font-size: clamp(13px, 1vw, 15px);
          font-weight: 950;
          letter-spacing: 0.08em;
          line-height: 1.6;
        }
        .cost-scene-bridge::before,
        .cost-scene-bridge::after {
          content: "";
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(120,98,64,0.22), transparent);
        }
        .cost-scene-bridge span {
          color: ${P.rust};
          white-space: nowrap;
        }
        .cost-scene-bridge strong {
          color: ${P.green};
          font-weight: 950;
        }
        .cost-relief-scene {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(280px, 0.46fr) minmax(0, 1fr);
          gap: clamp(24px, 3vw, 42px);
          align-items: start;
        }
        .cost-relief-copy {
          position: relative;
          z-index: 1;
        }
        .cost-relief-copy p:not(.cost-panel-label) {
          max-width: 440px;
          margin: 22px 0 0;
          color: rgba(24,23,20,0.66);
          font-size: clamp(14px, 1.02vw, 16px);
          font-weight: 850;
          line-height: 1.92;
          letter-spacing: 0.045em;
        }
        .cost-relief-scene .cost-zero-grid {
          margin-top: 0;
        }
        .cost-relief-scene .cost-voice-summary {
          grid-column: 1 / -1;
        }
        .cost-voice-list {
          display: grid;
          gap: 18px;
          margin-top: 24px;
        }
        .cost-voice-card {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr);
          gap: 14px;
          align-items: center;
          opacity: 0;
          transform: translate3d(-12px, 14px, 0);
          animation: cost-row-in 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(180ms + var(--voice) * 92ms);
        }
        .cost-voice-card:nth-child(even) {
          grid-template-columns: minmax(0, 1fr) 58px;
          transform: translate3d(12px, 14px, 0);
        }
        .cost-voice-card:nth-child(even) .cost-voice-avatar {
          order: 2;
        }
        .cost-voice-card:nth-child(even) .cost-voice-balloon {
          order: 1;
        }
        .cost-voice-avatar {
          position: relative;
          width: 58px;
          aspect-ratio: 1;
          border: 1px solid rgba(166,107,72,0.22);
          border-radius: 999px;
          background:
            radial-gradient(circle at 48% 34%, rgba(255,238,221,0.95), rgba(239,198,173,0.68) 48%, rgba(255,255,255,0.42) 49%),
            rgba(255,255,255,0.58);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.82),
            0 18px 42px -32px rgba(83,65,37,0.42);
        }
        .cost-voice-avatar::before {
          content: "";
          position: absolute;
          inset: 8px 13px auto;
          height: 18px;
          border-radius: 999px 999px 44% 44%;
          background: rgba(90,71,52,0.72);
        }
        .cost-voice-avatar span {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 11px;
          height: 15px;
          border-radius: 50% 50% 45% 45%;
          background: rgba(255,255,255,0.72);
        }
        .cost-voice-portrait {
          position: relative;
          align-self: end;
          width: 100%;
          aspect-ratio: 1 / 1.1;
          filter: drop-shadow(0 16px 18px rgba(92,70,48,0.14));
        }
        .cost-voice-portrait::before {
          content: "";
          position: absolute;
          left: 12%;
          right: 12%;
          bottom: 2%;
          height: 18%;
          border-radius: 999px;
          background: rgba(120,98,64,0.10);
          filter: blur(10px);
        }
        .cost-voice-portrait-image {
          object-fit: contain;
          object-position: center bottom;
        }
        .cost-voice-balloon {
          position: relative;
          min-height: 102px;
          clip-path: polygon(6% 0, 94% 0, 100% 50%, 94% 100%, 6% 100%, 0 50%);
          border: 1px solid rgba(166,107,72,0.32);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.88), rgba(255,249,238,0.72)),
            rgba(255,253,250,0.84);
          padding: 17px 26px;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.84),
            0 20px 52px -42px rgba(83,65,37,0.42);
        }
        .cost-voice-label {
          display: block;
          color: ${P.rust};
          font-size: 11px;
          font-weight: 950;
          letter-spacing: 0.12em;
          line-height: 1.3;
        }
        .cost-voice-balloon p {
          margin: 7px 0 0;
          color: rgba(24,23,20,0.84);
          font-size: clamp(14px, 1.05vw, 17px);
          font-weight: 850;
          line-height: 1.78;
          letter-spacing: 0.04em;
        }
        .cost-voice-balloon small {
          display: block;
          margin-top: 8px;
          color: rgba(24,23,20,0.48);
          font-size: 11px;
          font-weight: 850;
          letter-spacing: 0.06em;
          line-height: 1.4;
        }
        .cost-voice-list.cost-voice-review-list {
          margin-top: 0;
        }
        .cost-review-card,
        .cost-review-card:nth-child(even) {
          grid-template-columns: clamp(92px, 9vw, 132px) minmax(0, 1fr);
          transform: translate3d(0, 14px, 0);
        }
        .cost-review-card:nth-child(even) {
          grid-template-columns: minmax(0, 1fr) clamp(92px, 9vw, 132px);
        }
        .cost-review-card:nth-child(even) .cost-voice-portrait {
          order: 2;
        }
        .cost-review-card:nth-child(even) .cost-voice-balloon {
          order: initial;
        }
        .cost-review-card .cost-voice-balloon {
          min-height: 118px;
        }
        .cost-answer-panel h3 {
          position: relative;
          z-index: 1;
          margin: 16px 0 0;
          color: ${P.green};
          font-family: var(--font-shippori);
          font-size: clamp(32px, 3.2vw, 52px);
          font-weight: 500;
          line-height: 1.2;
          letter-spacing: 0.01em;
        }
        .cost-zero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-top: 26px;
        }
        .cost-zero-card {
          position: relative;
          overflow: hidden;
          min-height: 146px;
          border: 1px solid rgba(25,88,66,0.18);
          border-radius: 15px;
          background:
            linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.44)),
            rgba(25,88,66,0.05);
          padding: 17px;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.76);
          opacity: 0;
          transform: translate3d(0, 16px, 0);
          animation: cost-row-in 760ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: calc(260ms + var(--zero) * 68ms);
        }
        .cost-zero-card:first-child {
          grid-column: span 2;
          min-height: 124px;
          border-color: rgba(25,88,66,0.30);
          background:
            radial-gradient(circle at 86% 18%, rgba(231,201,120,0.28), transparent 35%),
            linear-gradient(135deg, rgba(25,88,66,0.12), rgba(255,255,255,0.76)),
            rgba(255,253,250,0.82);
        }
        .cost-zero-card span {
          display: block;
          color: rgba(25,88,66,0.38);
          font-family: var(--font-oswald);
          font-size: 20px;
          font-weight: 400;
          letter-spacing: 0.06em;
          line-height: 1;
        }
        .cost-zero-card strong {
          display: block;
          margin-top: 14px;
          color: rgba(24,23,20,0.78);
          font-size: 13px;
          font-weight: 950;
          letter-spacing: 0.08em;
          line-height: 1.35;
        }
        .cost-zero-card b {
          display: block;
          margin-top: 8px;
          color: ${P.green};
          font-size: clamp(17px, 1.45vw, 23px);
          font-weight: 950;
          letter-spacing: 0.02em;
          line-height: 1.36;
        }
        .cost-zero-card p {
          margin: 10px 0 0;
          color: rgba(24,23,20,0.56);
          font-size: 12px;
          font-weight: 800;
          line-height: 1.72;
          letter-spacing: 0.035em;
        }
        @media (min-width: 1180px) {
          .cost-zero-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
          .cost-zero-card:first-child {
            grid-column: span 3;
          }
        }
        .cost-voice-summary {
          position: relative;
          z-index: 1;
          margin-top: 18px;
          border-left: 4px solid rgba(25,88,66,0.62);
          background: rgba(25,88,66,0.07);
          padding: 18px 20px;
        }
        .cost-voice-summary strong {
          display: block;
          color: ${P.green};
          font-size: clamp(16px, 1.25vw, 20px);
          font-weight: 950;
          line-height: 1.65;
          letter-spacing: 0.04em;
        }
        .cost-voice-summary p {
          max-width: 760px;
          margin: 8px 0 0;
          color: rgba(24,23,20,0.64);
          font-size: clamp(13px, 0.95vw, 15px);
          font-weight: 800;
          line-height: 1.82;
          letter-spacing: 0.04em;
        }
        .cost-voice-bottom {
          border-color: rgba(120,98,64,0.20);
          background: rgba(255,253,250,0.66);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.76),
            0 22px 70px -58px rgba(83,65,37,0.38);
        }
        .cost-voice-bottom p {
          color: rgba(24,23,20,0.70);
        }
        .cost-voice-bottom strong {
          color: ${P.green};
        }
        .cost-voice-bottom .cost-compare-link {
          border-color: rgba(25,88,66,0.34);
          background: rgba(255,255,255,0.58);
          color: ${P.green};
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.82),
            0 18px 48px -38px rgba(25,88,66,0.42);
        }
        @keyframes cost-row-in {
          from {
            opacity: 0;
            transform: translate3d(0, 16px, 0);
          }
          to {
            opacity: 1;
            transform: translate3d(0, 0, 0);
          }
        }
        .cost-diagram-wrap {
          overflow: visible;
        }
        .cost-diagram-stage {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          aspect-ratio: 1693 / 929;
          border: 1px solid rgba(255,255,255,0.18);
          background:
            radial-gradient(circle at 68% 35%, rgba(238,207,137,0.20), transparent 19%),
            radial-gradient(circle at 81% 67%, rgba(25,88,66,0.24), transparent 27%),
            radial-gradient(circle at 50% 48%, rgba(255,255,255,0.10), transparent 24%),
            rgba(7,7,6,0.94);
          box-shadow:
            0 52px 150px -88px rgba(0,0,0,0.92),
            inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .cost-diagram-stage::before,
        .cost-diagram-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .cost-diagram-stage::before {
          z-index: 1;
          background:
            linear-gradient(90deg, rgba(6,5,4,0.91) 0%, rgba(6,5,4,0.62) 27%, rgba(6,5,4,0.12) 50%, rgba(6,5,4,0.34) 100%),
            radial-gradient(circle at 55% 48%, rgba(255,255,255,0.13), transparent 29%),
            radial-gradient(circle at 74% 47%, rgba(255,227,154,0.16), transparent 22%),
            radial-gradient(circle at 66% 50%, rgba(122,238,190,0.12), transparent 18%);
        }
        .cost-diagram-stage::after {
          z-index: 2;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.055) 0, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.05) 0, transparent 1px);
          background-size: 112px 112px;
          opacity: 0.10;
          mix-blend-mode: screen;
        }
        .cost-diagram-bg {
          z-index: 0;
          object-fit: cover;
          object-position: center;
          opacity: 0.30;
          filter: saturate(0.82) contrast(1.04) brightness(0.72);
        }
        .cost-diagram-copy,
        .cost-diagram-pill,
        .cost-diagram-ledger,
        .cost-diagram-major,
        .cost-diagram-badge,
        .cost-diagram-peels,
        .cost-diagram-yamato,
        .cost-diagram-major-note,
        .cost-diagram-bottom {
          position: absolute;
          z-index: 3;
        }
        .cost-diagram-copy {
          left: 4.25%;
          top: 8.2%;
          z-index: 10;
          width: 31.6%;
          color: ${P.white};
        }
        .cost-diagram-copy::before {
          content: "";
          position: absolute;
          inset: -32px -104px -38px -28px;
          z-index: 0;
          background:
            linear-gradient(90deg, rgba(5,5,4,0.99), rgba(5,5,4,0.95) 64%, rgba(5,5,4,0.16)),
            radial-gradient(circle at 40% 48%, rgba(0,0,0,0.76), transparent 62%);
          filter: blur(4px);
        }
        .cost-diagram-copy > * {
          position: relative;
          z-index: 1;
        }
        .cost-diagram-copy h2 {
          margin-top: clamp(24px, 2.7vw, 46px);
          font-family: var(--font-shippori);
          font-size: clamp(34px, 2.82vw, 54px);
          font-weight: 500;
          line-height: 1.38;
          letter-spacing: 0;
          text-shadow: 0 2px 30px rgba(0,0,0,0.72);
        }
        .cost-diagram-copy p {
          margin: clamp(20px, 1.8vw, 30px) 0 0;
          color: rgba(255,253,250,0.86);
          font-size: clamp(12px, 0.92vw, 15px);
          font-weight: 850;
          line-height: 1.95;
          text-shadow: 0 2px 22px rgba(0,0,0,0.60);
        }
        .cost-diagram-link {
          display: inline-flex;
          width: fit-content;
          margin-top: clamp(20px, 2.1vw, 34px);
          border: 1px solid rgba(226,184,100,0.80);
          background: rgba(18,12,7,0.34);
          padding: 12px 28px;
          color: #e9cb78;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.10em;
          line-height: 1.35;
          text-decoration: none;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            0 20px 52px -42px rgba(226,184,100,0.9);
        }
        .cost-diagram-quiet {
          display: none;
          grid-template-columns: 2px minmax(0, 1fr);
          gap: 18px;
          align-items: start;
          margin-top: clamp(22px, 2.3vw, 34px) !important;
          color: rgba(255,253,250,0.82) !important;
          font-size: clamp(12px, 0.94vw, 15px) !important;
          line-height: 1.9 !important;
        }
        .cost-diagram-quiet::before {
          content: "";
          width: 2px;
          height: 100%;
          min-height: 54px;
          background: #e0b665;
        }
        .cost-diagram-pill {
          top: 5.8%;
          display: grid;
          place-items: center;
          min-width: 190px;
          min-height: 44px;
          border: 1px solid rgba(255,255,255,0.30);
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          color: rgba(255,253,250,0.92);
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 0.10em;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .cost-diagram-pill-major {
          left: 45.2%;
          transform: translateX(-50%);
        }
        .cost-diagram-pill-yamato {
          right: 8.2%;
          min-width: 205px;
          border-color: rgba(71,205,154,0.44);
          background: rgba(12,77,55,0.44);
        }
        .cost-diagram-ledger {
          left: 31.8%;
          top: 13.8%;
          z-index: 5;
          width: 16.0%;
          min-width: 178px;
          height: 57.2%;
          border: 1px solid rgba(255,255,255,0.24);
          background: rgba(255,255,255,0.105);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.16);
          backdrop-filter: blur(17px);
          -webkit-backdrop-filter: blur(17px);
        }
        .cost-diagram-ledger p {
          display: grid;
          grid-template-columns: 30px minmax(0, 1fr);
          grid-template-rows: auto auto;
          gap: 2px 10px;
          align-content: center;
          min-height: 16.666%;
          margin: 0;
          border-bottom: 1px solid rgba(255,255,255,0.14);
          padding: 0 13px;
          color: rgba(255,253,250,0.90);
        }
        .cost-diagram-ledger p:last-child {
          border-bottom: 0;
        }
        .cost-diagram-ledger span {
          grid-row: 1 / span 2;
          color: rgba(255,253,250,0.64);
          font-family: var(--font-oswald);
          font-size: clamp(17px, 1.25vw, 24px);
          font-weight: 400;
        }
        .cost-diagram-ledger strong {
          font-size: clamp(10px, 0.76vw, 13px);
          font-weight: 900;
          line-height: 1.35;
        }
        .cost-diagram-ledger em {
          color: rgba(255,253,250,0.62);
          font-size: clamp(9px, 0.66vw, 11px);
          font-style: normal;
          font-weight: 800;
          line-height: 1.35;
        }
        .cost-diagram-major {
          left: 43.2%;
          top: 13.8%;
          width: 24.2%;
          height: 60.5%;
          z-index: 4;
        }
        .cost-diagram-sheet,
        .cost-diagram-document {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.28);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.20), rgba(255,255,255,0.05)),
            rgba(255,255,255,0.08);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.22),
            0 28px 76px -54px rgba(0,0,0,0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .cost-diagram-sheet {
          width: 86%;
          height: 84%;
        }
        .cost-diagram-sheet-1 { left: 0; top: 2%; opacity: 0.30; }
        .cost-diagram-sheet-2 { left: 6%; top: 8%; opacity: 0.42; }
        .cost-diagram-sheet-3 { left: 12%; top: 14%; opacity: 0.36; }
        .cost-diagram-sheet-4 { left: 18%; top: 20%; opacity: 0.30; }
        .cost-diagram-document {
          color: rgba(24,23,20,0.90);
          text-align: center;
        }
        .cost-diagram-document-major {
          left: 20%;
          top: 8%;
          z-index: 3;
          width: 65%;
          height: 86%;
          background:
            linear-gradient(180deg, rgba(248,244,235,0.84), rgba(224,219,207,0.70)),
            rgba(238,235,226,0.74);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.18),
            0 34px 86px -58px rgba(0,0,0,0.92),
            inset 0 1px 0 rgba(255,255,255,0.30);
          padding: 10% 7% 7%;
        }
        .cost-diagram-document p {
          margin: 0;
          font-family: var(--font-shippori);
          font-size: clamp(14px, 1.12vw, 20px);
          letter-spacing: 0.08em;
        }
        .cost-diagram-document strong {
          display: block;
          margin-top: 5%;
          font-family: var(--font-shippori);
          font-size: clamp(18px, 1.38vw, 27px);
          font-weight: 600;
          line-height: 1.32;
          letter-spacing: 0;
        }
        .cost-diagram-document > span {
          display: block;
          margin-top: 4%;
          color: rgba(24,23,20,0.58);
          font-size: 11px;
          font-weight: 900;
          line-height: 1.55;
        }
        .cost-diagram-lines {
          display: grid;
          gap: 8px;
          width: 70%;
          margin: 9% auto 0;
        }
        .cost-diagram-lines i {
          height: 1px;
          background: rgba(24,23,20,0.20);
        }
        .cost-diagram-document figure {
          position: relative;
          overflow: hidden;
          width: 82%;
          aspect-ratio: 16 / 9;
          margin: 9% auto 0;
          border: 1px solid rgba(24,23,20,0.16);
        }
        .cost-diagram-plan {
          width: 82%;
          height: 21%;
          margin: 7% auto 0;
          border: 1px solid rgba(24,23,20,0.16);
          background:
            linear-gradient(90deg, rgba(24,23,20,0.16) 0, rgba(24,23,20,0.16) 1px, transparent 1px),
            linear-gradient(180deg, rgba(24,23,20,0.14) 0, rgba(24,23,20,0.14) 1px, transparent 1px);
          background-size: 22px 22px;
          opacity: 0.42;
        }
        .cost-diagram-badge {
          left: 66.6%;
          top: 25.2%;
          z-index: 8;
          display: grid;
          place-items: center;
          width: 9.4%;
          min-width: 124px;
          min-height: 88px;
          border: 1px solid rgba(75,205,158,0.56);
          border-radius: 16px;
          background:
            radial-gradient(circle at 62% 28%, rgba(255,255,255,0.28), transparent 34%),
            rgba(19,83,61,0.66);
          color: rgba(255,253,250,0.94);
          font-weight: 900;
          line-height: 1.42;
          text-align: center;
          box-shadow:
            0 0 38px rgba(124,252,194,0.22),
            0 0 92px rgba(220,250,214,0.10),
            inset 0 1px 0 rgba(255,255,255,0.20);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .cost-diagram-badge span {
          font-size: 12px;
          letter-spacing: 0.08em;
          opacity: 0.76;
        }
        .cost-diagram-badge strong {
          display: block;
          font-size: clamp(12px, 0.86vw, 15px);
        }
        .cost-diagram-peels {
          left: 66.8%;
          top: 40.0%;
          width: 9.0%;
          height: 31%;
          z-index: 6;
        }
        .cost-diagram-peels span {
          position: absolute;
          display: block;
          width: 112px;
          height: 66px;
          border: 1px solid rgba(255,255,255,0.38);
          background:
            radial-gradient(circle at 36% 28%, rgba(255,255,255,0.46), transparent 40%),
            linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.06));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.34),
            0 18px 48px -34px rgba(0,0,0,0.86);
          transform: skewX(-20deg) rotate(-18deg);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .cost-diagram-peels span:nth-child(1) { left: 10%; top: 0; }
        .cost-diagram-peels span:nth-child(2) { left: -6%; top: 34%; transform: skewX(-20deg) rotate(-24deg); }
        .cost-diagram-peels span:nth-child(3) { left: 13%; top: 68%; transform: skewX(-20deg) rotate(-14deg); }
        .cost-diagram-yamato {
          right: 4.2%;
          top: 14.8%;
          width: 24.2%;
          height: 61.5%;
          z-index: 5;
        }
        .cost-diagram-document-yamato {
          left: 0;
          top: 8%;
          width: 67%;
          height: 86%;
          background: rgba(245,239,228,0.82);
          box-shadow:
            0 0 0 1px rgba(226,184,100,0.18),
            0 36px 96px -54px rgba(0,0,0,0.92),
            0 0 86px rgba(226,184,100,0.16),
            inset 0 1px 0 rgba(255,255,255,0.28);
          padding: 9% 6% 7%;
        }
        .cost-diagram-document-yamato strong {
          color: ${P.green};
        }
        .cost-diagram-document-yamato figure {
          width: 86%;
          margin-top: 8%;
        }
        .cost-diagram-values {
          position: absolute;
          right: 0;
          top: 15%;
          display: grid;
          gap: 22px;
          width: 49%;
        }
        .cost-diagram-values p {
          position: relative;
          display: grid;
          grid-template-columns: 46px minmax(0, 1fr);
          align-items: center;
          gap: 10px;
          margin: 0;
          color: #e3c26f;
          font-size: clamp(11px, 0.82vw, 14px);
          font-weight: 900;
          line-height: 1.25;
        }
        .cost-diagram-values p::before {
          content: "";
          position: absolute;
          left: -54px;
          top: 50%;
          width: 58px;
          height: 1px;
          background: rgba(224,194,111,0.70);
        }
        .cost-diagram-values span {
          display: grid;
          place-items: center;
          width: 46px;
          aspect-ratio: 1;
          border: 1px solid rgba(224,194,111,0.60);
          border-radius: 999px;
          background: rgba(224,194,111,0.08);
          box-shadow: 0 0 22px rgba(224,194,111,0.12);
        }
        .cost-diagram-values svg {
          color: #e3c26f;
        }
        .cost-diagram-yamato-note,
        .cost-diagram-major-note {
          color: rgba(255,253,250,0.82);
          font-size: clamp(12px, 0.92vw, 15px);
          font-weight: 900;
          line-height: 1.9;
          text-align: center;
          text-shadow: 0 2px 20px rgba(0,0,0,0.62);
        }
        .cost-diagram-yamato-note {
          position: absolute;
          left: -6%;
          bottom: -2%;
          width: 82%;
        }
        .cost-diagram-major-note {
          left: 42.2%;
          top: 72.2%;
          width: 24.5%;
        }
        .cost-diagram-bottom {
          left: 15.5%;
          right: 5.2%;
          bottom: 3.8%;
          z-index: 11;
          display: grid;
          grid-template-columns: minmax(300px, 1.08fr) repeat(3, minmax(144px, 0.72fr));
          align-items: center;
          gap: 24px;
          min-height: 78px;
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 16px;
          background: rgba(255,255,255,0.07);
          padding: 16px 34px;
          color: rgba(255,253,250,0.76);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .cost-diagram-bottom p {
          margin: 0;
          color: #e3c26f;
          font-size: clamp(12px, 0.98vw, 16px);
          font-weight: 900;
          line-height: 1.6;
        }
        .cost-diagram-bottom span {
          border-left: 1px solid rgba(255,255,255,0.28);
          padding-left: 24px;
          font-size: clamp(11px, 0.82vw, 14px);
          font-weight: 900;
          line-height: 1.55;
        }
        .cost-vision-scroll {
          overflow: visible;
        }
        .cost-vision-stage {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          aspect-ratio: 1693 / 929;
          border: 1px solid rgba(255,255,255,0.18);
          background:
            radial-gradient(circle at 67% 35%, rgba(238,207,137,0.18), transparent 19%),
            radial-gradient(circle at 80% 68%, rgba(25,88,66,0.22), transparent 27%),
            radial-gradient(circle at 52% 48%, rgba(255,255,255,0.10), transparent 25%),
            rgba(7,7,6,0.94);
          box-shadow:
            0 52px 150px -88px rgba(0,0,0,0.92),
            inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .cost-vision-stage::before,
        .cost-vision-stage::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .cost-vision-stage::before {
          z-index: 1;
          background:
            linear-gradient(90deg, rgba(6,5,4,0.88) 0%, rgba(6,5,4,0.52) 27%, rgba(6,5,4,0.08) 49%, rgba(6,5,4,0.30) 100%),
            radial-gradient(circle at 54% 48%, rgba(255,255,255,0.14), transparent 29%),
            radial-gradient(circle at 73% 47%, rgba(255,227,154,0.18), transparent 23%),
            radial-gradient(circle at 66% 50%, rgba(122,238,190,0.13), transparent 18%);
        }
        .cost-vision-stage::after {
          z-index: 2;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.055) 0, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.05) 0, transparent 1px);
          background-size: 112px 112px;
          opacity: 0.10;
          mix-blend-mode: screen;
        }
        .cost-vision-copy,
        .cost-vision-pill,
        .cost-vision-ledger,
        .cost-vision-major,
        .cost-vision-badge,
        .cost-vision-peels,
        .cost-vision-yamato,
        .cost-vision-major-note,
        .cost-vision-bottom {
          position: absolute;
          z-index: 3;
        }
        .cost-vision-copy {
          left: 3.95%;
          top: 8.9%;
          width: 29.2%;
          color: ${P.white};
          z-index: 9;
        }
        .cost-vision-copy::before {
          content: "";
          position: absolute;
          inset: -32px -104px -40px -28px;
          z-index: 0;
          background:
            linear-gradient(90deg, rgba(5,5,4,0.99), rgba(5,5,4,0.95) 66%, rgba(5,5,4,0.18)),
            radial-gradient(circle at 38% 46%, rgba(0,0,0,0.76), transparent 60%);
          filter: blur(4px);
        }
        .cost-vision-copy > * {
          position: relative;
          z-index: 1;
        }
        .cost-vision-copy h2 {
          margin-top: clamp(24px, 2.8vw, 48px);
          font-family: var(--font-shippori);
          font-size: clamp(36px, 3.4vw, 64px);
          font-weight: 500;
          line-height: 1.42;
          letter-spacing: 0;
          text-shadow: 0 2px 30px rgba(0,0,0,0.70);
        }
        .cost-vision-copy p {
          margin: clamp(24px, 2.4vw, 42px) 0 0;
          color: rgba(255,253,250,0.84);
          font-size: clamp(13px, 1.05vw, 17px);
          font-weight: 800;
          line-height: 2.05;
          text-shadow: 0 2px 22px rgba(0,0,0,0.58);
        }
        .cost-vision-link {
          display: inline-flex;
          width: fit-content;
          margin-top: clamp(24px, 2.55vw, 42px);
          border: 1px solid rgba(226,184,100,0.80);
          background: rgba(18,12,7,0.34);
          padding: 12px 30px;
          color: #e9cb78;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-decoration: none;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.18),
            0 20px 52px -42px rgba(226,184,100,0.9);
        }
        .cost-vision-quiet {
          display: none;
          grid-template-columns: 2px minmax(0, 1fr);
          gap: 18px;
          align-items: start;
          margin-top: clamp(22px, 2.4vw, 36px) !important;
          color: rgba(255,253,250,0.82) !important;
          font-size: clamp(13px, 1vw, 16px) !important;
          line-height: 1.9 !important;
        }
        .cost-vision-quiet::before {
          content: "";
          display: block;
          width: 2px;
          height: 100%;
          min-height: 54px;
          background: #e0b665;
        }
        .cost-vision-pill {
          display: none;
          top: 6.1%;
          display: grid;
          place-items: center;
          min-width: 190px;
          min-height: 44px;
          border: 1px solid rgba(255,255,255,0.30);
          border-radius: 999px;
          background: rgba(255,255,255,0.10);
          color: rgba(255,253,250,0.92);
          font-size: 17px;
          font-weight: 900;
          letter-spacing: 0.10em;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .cost-vision-pill-major {
          left: 42.2%;
          transform: translateX(-50%);
        }
        .cost-vision-pill-yamato {
          right: 8.7%;
          min-width: 205px;
          border-color: rgba(71,205,154,0.44);
          background: rgba(12,77,55,0.42);
        }
        .cost-vision-ledger {
          display: none;
          left: 32.8%;
          top: 13.1%;
          width: 13.8%;
          height: 57.7%;
          border: 1px solid rgba(255,255,255,0.24);
          background: rgba(255,255,255,0.08);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.16);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }
        .cost-vision-ledger p {
          display: grid;
          grid-template-columns: 32px minmax(0, 1fr);
          gap: 10px;
          align-items: center;
          min-height: 16.666%;
          margin: 0;
          border-bottom: 1px solid rgba(255,255,255,0.14);
          padding: 0 14px;
          color: rgba(255,253,250,0.82);
          font-size: clamp(10px, 0.82vw, 14px);
          font-weight: 900;
          line-height: 1.45;
        }
        .cost-vision-ledger p:last-child {
          border-bottom: 0;
        }
        .cost-vision-ledger span {
          color: rgba(255,253,250,0.66);
          font-family: var(--font-oswald);
          font-size: clamp(18px, 1.4vw, 26px);
          font-weight: 400;
        }
        .cost-vision-major {
          display: none;
          left: 37.4%;
          top: 13.8%;
          width: 28.4%;
          height: 57.5%;
          z-index: 4;
        }
        .cost-vision-sheet,
        .cost-vision-document {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.26);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.045)),
            rgba(255,255,255,0.08);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.20),
            0 28px 76px -54px rgba(0,0,0,0.88);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        .cost-vision-sheet {
          width: 88%;
          height: 86%;
        }
        .cost-vision-sheet.sheet-1 { left: 0; top: 2%; opacity: 0.28; }
        .cost-vision-sheet.sheet-2 { left: 6%; top: 8%; opacity: 0.40; }
        .cost-vision-sheet.sheet-3 { left: 12%; top: 14%; opacity: 0.34; }
        .cost-vision-sheet.sheet-4 { left: 18%; top: 20%; opacity: 0.26; }
        .cost-vision-document {
          color: rgba(24,23,20,0.90);
          text-align: center;
        }
        .cost-vision-document-major {
          left: 21%;
          top: 8%;
          z-index: 3;
          width: 64%;
          height: 86%;
          background:
            linear-gradient(180deg, rgba(248,244,235,0.84), rgba(224,219,207,0.70)),
            rgba(238,235,226,0.74);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.18),
            0 34px 86px -58px rgba(0,0,0,0.92),
            inset 0 1px 0 rgba(255,255,255,0.30);
        }
        .cost-vision-document p {
          margin: 0;
          padding-top: 12%;
          font-family: var(--font-shippori);
          font-size: clamp(14px, 1.2vw, 21px);
          letter-spacing: 0.12em;
        }
        .cost-vision-document strong {
          display: block;
          margin-top: 4%;
          font-family: var(--font-oswald);
          font-size: clamp(28px, 2.1vw, 39px);
          font-weight: 300;
          letter-spacing: 0.04em;
        }
        .cost-vision-document > span {
          display: block;
          margin-top: 1%;
          font-size: 12px;
          font-weight: 900;
          opacity: 0.58;
        }
        .cost-vision-document i {
          display: block;
          width: 66%;
          height: 1px;
          margin: 5% auto 0;
          background: rgba(24,23,20,0.18);
        }
        .cost-vision-document figure {
          position: relative;
          overflow: hidden;
          width: 76%;
          aspect-ratio: 16 / 9;
          margin: 6% auto 0;
          border: 1px solid rgba(24,23,20,0.16);
        }
        .cost-vision-document em {
          display: block;
          width: 76%;
          height: 20%;
          margin: 5% auto 0;
          border: 1px solid rgba(24,23,20,0.16);
          background:
            linear-gradient(90deg, rgba(24,23,20,0.16) 0, rgba(24,23,20,0.16) 1px, transparent 1px),
            linear-gradient(180deg, rgba(24,23,20,0.14) 0, rgba(24,23,20,0.14) 1px, transparent 1px);
          background-size: 22px 22px;
          opacity: 0.42;
        }
        .cost-vision-badge {
          left: 65.0%;
          top: 20.8%;
          z-index: 8;
          display: grid;
          place-items: center;
          width: 8.0%;
          min-height: 88px;
          border: 1px solid rgba(75,205,158,0.56);
          border-radius: 16px;
          background:
            radial-gradient(circle at 62% 28%, rgba(255,255,255,0.28), transparent 34%),
            rgba(19,83,61,0.62);
          color: rgba(255,253,250,0.94);
          font-weight: 900;
          line-height: 1.42;
          text-align: center;
          box-shadow:
            0 0 38px rgba(124,252,194,0.22),
            0 0 92px rgba(220,250,214,0.10),
            inset 0 1px 0 rgba(255,255,255,0.20);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .cost-vision-badge span {
          font-size: 12px;
          letter-spacing: 0.08em;
          opacity: 0.76;
        }
        .cost-vision-badge strong {
          display: block;
          font-size: clamp(13px, 0.92vw, 16px);
        }
        .cost-vision-peels {
          display: none;
          left: 64.2%;
          top: 37.0%;
          width: 8.2%;
          height: 29%;
          z-index: 6;
        }
        .cost-vision-peels span {
          position: absolute;
          display: block;
          width: 96px;
          height: 62px;
          border: 1px solid rgba(255,255,255,0.36);
          background:
            radial-gradient(circle at 36% 28%, rgba(255,255,255,0.44), transparent 40%),
            linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.05));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.34),
            0 18px 48px -34px rgba(0,0,0,0.86);
          transform: skewX(-20deg) rotate(-18deg);
          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
        }
        .cost-vision-peels span:nth-child(1) { left: 8%; top: 0; }
        .cost-vision-peels span:nth-child(2) { left: -4%; top: 34%; transform: skewX(-20deg) rotate(-24deg); }
        .cost-vision-peels span:nth-child(3) { left: 12%; top: 68%; transform: skewX(-20deg) rotate(-14deg); }
        .cost-vision-yamato {
          right: 3.9%;
          top: 17.9%;
          width: 20.4%;
          height: 48%;
          z-index: 5;
        }
        .cost-vision-document-yamato {
          display: none;
          left: 0;
          top: 0;
          width: 72%;
          height: 100%;
          background: rgba(245,239,228,0.82);
          box-shadow:
            0 0 0 1px rgba(226,184,100,0.16),
            0 36px 96px -54px rgba(0,0,0,0.92),
            0 0 86px rgba(226,184,100,0.16),
            inset 0 1px 0 rgba(255,255,255,0.28);
        }
        .cost-vision-document-yamato figure {
          width: 80%;
          margin-top: 7%;
        }
        .cost-vision-values {
          display: none;
          position: absolute;
          right: 0;
          top: 8%;
          display: grid;
          gap: 22px;
          width: 52%;
        }
        .cost-vision-values p {
          position: relative;
          display: grid;
          grid-template-columns: 46px minmax(0, 1fr);
          align-items: center;
          gap: 10px;
          margin: 0;
          color: #e3c26f;
          font-size: clamp(11px, 0.85vw, 14px);
          font-weight: 900;
          line-height: 1.25;
        }
        .cost-vision-values p::before {
          content: "";
          position: absolute;
          left: -54px;
          top: 50%;
          width: 58px;
          height: 1px;
          background: rgba(224,194,111,0.70);
        }
        .cost-vision-values span {
          display: grid;
          place-items: center;
          width: 46px;
          aspect-ratio: 1;
          border: 1px solid rgba(224,194,111,0.60);
          border-radius: 999px;
          background: rgba(224,194,111,0.08);
          box-shadow: 0 0 22px rgba(224,194,111,0.12);
        }
        .cost-vision-values svg {
          color: #e3c26f;
        }
        .cost-vision-yamato-note,
        .cost-vision-major-note {
          color: rgba(255,253,250,0.80);
          font-size: clamp(12px, 0.96vw, 15px);
          font-weight: 900;
          line-height: 1.9;
          text-align: center;
          text-shadow: 0 2px 20px rgba(0,0,0,0.62);
        }
        .cost-vision-yamato-note {
          position: absolute;
          display: none;
          left: -28%;
          bottom: -26%;
          width: 112%;
        }
        .cost-vision-major-note {
          display: none;
          left: 38.8%;
          top: 69.7%;
          width: 26%;
        }
        .cost-vision-bottom {
          left: 24.2%;
          right: 5.6%;
          bottom: 1.9%;
          z-index: 11;
          display: grid;
          grid-template-columns: minmax(270px, 1.08fr) repeat(3, minmax(138px, 0.72fr));
          align-items: center;
          gap: 24px;
          min-height: 78px;
          border: 1px solid rgba(255,255,255,0.24);
          border-radius: 16px;
          background: rgba(255,255,255,0.07);
          padding: 16px 34px;
          color: rgba(255,253,250,0.76);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.18);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .cost-vision-bottom p {
          margin: 0;
          color: #e3c26f;
          font-size: clamp(12px, 0.98vw, 16px);
          font-weight: 900;
          line-height: 1.6;
        }
        .cost-vision-bottom span {
          border-left: 1px solid rgba(255,255,255,0.28);
          padding-left: 24px;
          font-size: clamp(11px, 0.82vw, 14px);
          font-weight: 900;
          line-height: 1.55;
        }
        .cost-poster-frame {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          aspect-ratio: 1693 / 929;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(9,8,6,0.56);
          box-shadow:
            0 48px 150px -88px rgba(0,0,0,0.90),
            inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .cost-poster-frame::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(8,7,5,0.16) 0%, rgba(8,7,5,0.08) 26%, transparent 54%),
            radial-gradient(circle at 69% 33%, rgba(251,221,146,0.16), transparent 18%);
        }
        .cost-poster-image {
          object-fit: cover;
          filter: saturate(0.96) contrast(1.02);
        }
        .cost-poster-copy {
          position: absolute;
          left: 4.15%;
          top: 10.6%;
          z-index: 3;
          width: min(32%, 490px);
          color: ${P.white};
        }
        .cost-poster-copy::before {
          content: "";
          position: absolute;
          inset: -28px -92px -34px -26px;
          z-index: 0;
          background: linear-gradient(90deg, rgba(7,6,4,0.98), rgba(7,6,4,0.94) 74%, rgba(7,6,4,0.30));
          filter: blur(6px);
        }
        .cost-poster-copy > * {
          position: relative;
          z-index: 1;
        }
        .cost-poster-copy h2 {
          margin-top: clamp(24px, 2.55vw, 42px);
          font-family: var(--font-shippori);
          font-size: clamp(34px, 3.1vw, 56px);
          font-weight: 500;
          line-height: 1.34;
          letter-spacing: 0;
          text-shadow: 0 2px 26px rgba(0,0,0,0.55);
        }
        .cost-poster-copy p {
          margin-top: clamp(20px, 2vw, 34px);
          color: rgba(255,253,250,0.86);
          font-size: clamp(12px, 0.96vw, 15px);
          font-weight: 800;
          line-height: 1.95;
          text-shadow: 0 2px 20px rgba(0,0,0,0.48);
        }
        .cost-poster-link {
          display: inline-flex;
          width: fit-content;
          margin-top: clamp(20px, 2.1vw, 34px);
          border: 1px solid rgba(224,182,101,0.82);
          background: rgba(22,15,8,0.34);
          padding: 11px 24px;
          color: #e5c779;
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-decoration: none;
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.16),
            0 16px 42px -34px rgba(224,182,101,0.85);
        }
        .cost-poster-free {
          position: absolute;
          left: 64.1%;
          top: 22.9%;
          z-index: 4;
          display: grid;
          place-items: center;
          width: 8.9%;
          min-width: 108px;
          min-height: 84px;
          border: 1px solid rgba(75,205,158,0.50);
          border-radius: 16px;
          background:
            radial-gradient(circle at 62% 28%, rgba(255,255,255,0.26), transparent 32%),
            rgba(20,82,62,0.58);
          color: rgba(255,253,250,0.94);
          font-weight: 900;
          line-height: 1.45;
          text-align: center;
          box-shadow:
            0 0 34px rgba(120,245,190,0.14),
            inset 0 1px 0 rgba(255,255,255,0.18);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .cost-poster-free span {
          font-size: 12px;
          letter-spacing: 0.08em;
          opacity: 0.76;
        }
        .cost-poster-free strong {
          display: block;
          font-size: clamp(13px, 0.9vw, 16px);
          letter-spacing: 0.02em;
        }
        .cost-replica {
          position: relative;
          display: none;
          aspect-ratio: 16 / 9;
          min-height: min(56vw, 820px);
          grid-template-columns: minmax(320px, 0.34fr) minmax(740px, 0.66fr);
          gap: clamp(20px, 2.6vw, 46px);
          align-items: stretch;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.16);
          background:
            radial-gradient(circle at 14% 36%, rgba(255,255,255,0.08), transparent 24%),
            radial-gradient(circle at 72% 48%, rgba(255,214,142,0.10), transparent 34%),
            linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)),
            rgba(7,8,7,0.32);
          box-shadow:
            0 42px 140px -86px rgba(0,0,0,0.88),
            inset 0 1px 0 rgba(255,255,255,0.12);
          padding: clamp(30px, 4.2vw, 58px);
        }
        .cost-replica::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(0,0,0,0.38), transparent 44%, rgba(0,0,0,0.18)),
            url("/images/works-parts/living/living-03.webp");
          background-position: center;
          background-size: cover;
          opacity: 0.22;
          filter: saturate(0.72) contrast(1.05);
        }
        .cost-replica::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(180deg, rgba(255,255,255,0.07) 0, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 118px 118px;
          opacity: 0.18;
        }
        .cost-replica-copy,
        .cost-replica-diagram,
        .cost-replica-bottom {
          position: relative;
          z-index: 1;
        }
        .cost-replica-copy {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-right: clamp(8px, 1.6vw, 24px);
          padding-bottom: clamp(92px, 9vw, 132px);
        }
        .cost-replica-copy h2 {
          margin-top: clamp(28px, 3vw, 44px);
          color: ${P.white};
          font-family: var(--font-shippori);
          font-size: clamp(38px, 3.75vw, 68px);
          font-weight: 500;
          line-height: 1.36;
          letter-spacing: 0;
        }
        .cost-replica-copy p {
          margin-top: clamp(24px, 2vw, 34px);
          max-width: 460px;
          color: rgba(255,253,250,0.82);
          font-size: clamp(14px, 1.12vw, 17px);
          font-weight: 800;
          line-height: 2.05;
        }
        .cost-replica-link {
          display: inline-flex;
          width: fit-content;
          margin-top: clamp(26px, 2.6vw, 40px);
          border: 1px solid rgba(224,182,101,0.70);
          background: rgba(25,18,10,0.24);
          padding: 12px 28px;
          color: #e5c779;
          font-size: 15px;
          font-weight: 900;
          letter-spacing: 0.12em;
          text-decoration: none;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.16);
        }
        .cost-replica-statement {
          display: none;
          grid-template-columns: 2px minmax(0, 1fr);
          gap: 18px;
          margin-top: clamp(34px, 4.4vw, 62px);
          padding-top: 0;
        }
        .cost-replica-statement span {
          width: 2px;
          background: #e0b665;
        }
        .cost-replica-statement p {
          margin: 0;
          color: rgba(255,253,250,0.78);
          font-size: 15px;
          line-height: 1.9;
        }
        .cost-replica-diagram {
          min-height: 0;
          position: relative;
        }
        .cost-side-label {
          position: absolute;
          top: 0;
          z-index: 5;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.08);
          padding: 9px 44px;
          color: rgba(255,253,250,0.88);
          font-size: 16px;
          font-weight: 900;
          letter-spacing: 0.12em;
          border-radius: 999px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .cost-side-label-major {
          left: 9%;
        }
        .cost-side-label-yamato {
          right: 9%;
          border-color: rgba(54,187,139,0.36);
          background: rgba(25,88,66,0.26);
        }
        .cost-major-panel {
          position: absolute;
          left: 0;
          top: 62px;
          width: 47%;
          height: 68%;
        }
        .cost-major-list {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 35%;
          border: 1px solid rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          padding: 18px 14px;
        }
        .cost-major-list p {
          display: grid;
          grid-template-columns: 24px minmax(0, 1fr);
          gap: 8px;
          align-items: center;
          margin: 0;
          min-height: 48px;
          border-bottom: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,253,250,0.78);
          font-size: 11px;
          font-weight: 900;
          line-height: 1.45;
        }
        .cost-major-list p:last-child {
          border-bottom: 0;
        }
        .cost-major-list span {
          color: rgba(255,253,250,0.60);
          font-family: var(--font-oswald);
          font-size: 18px;
          font-weight: 400;
        }
        .cost-estimate-stack i,
        .cost-estimate-card {
          position: absolute;
          border: 1px solid rgba(255,255,255,0.24);
          background: rgba(255,255,255,0.10);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.16),
            0 24px 70px -54px rgba(0,0,0,0.78);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
        }
        .cost-estimate-stack i {
          left: 30%;
          top: 8%;
          width: 64%;
          height: 78%;
        }
        .cost-estimate-stack i:nth-child(1) { transform: translate(-28px, -12px); opacity: 0.32; }
        .cost-estimate-stack i:nth-child(2) { transform: translate(-10px, 6px); opacity: 0.44; }
        .cost-estimate-stack i:nth-child(3) { transform: translate(10px, 24px); opacity: 0.38; }
        .cost-estimate-stack i:nth-child(4) { transform: translate(28px, 42px); opacity: 0.30; }
        .cost-estimate-card {
          left: 43%;
          top: 21%;
          z-index: 2;
          width: 53%;
          min-height: 310px;
          padding: 28px 20px 20px;
          text-align: center;
        }
        .cost-estimate-card p,
        .cost-yamato-card p {
          margin: 0;
          color: rgba(24,23,20,0.84);
          font-family: var(--font-shippori);
          font-size: 19px;
          line-height: 1.2;
        }
        .cost-estimate-card strong,
        .cost-yamato-card strong {
          display: block;
          margin-top: 10px;
          color: rgba(24,23,20,0.92);
          font-family: var(--font-oswald);
          font-size: clamp(26px, 2.05vw, 36px);
          font-weight: 300;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .cost-estimate-card > span,
        .cost-yamato-card > span {
          color: rgba(24,23,20,0.58);
          font-size: 12px;
          font-weight: 800;
        }
        .cost-estimate-lines {
          display: grid;
          gap: 8px;
          margin: 24px auto 16px;
          width: 76%;
        }
        .cost-estimate-lines em {
          height: 1px;
          background: rgba(24,23,20,0.20);
        }
        .cost-estimate-photo,
        .cost-yamato-photo {
          position: relative;
          overflow: hidden;
          margin-top: 16px;
          aspect-ratio: 16 / 9;
          border: 1px solid rgba(24,23,20,0.16);
        }
        .cost-peel {
          position: absolute;
          left: 43%;
          top: 31%;
          z-index: 6;
          width: 18%;
          height: 34%;
        }
        .cost-peel strong {
          position: absolute;
          left: 12%;
          top: -8%;
          z-index: 3;
          display: grid;
          place-items: center;
          width: 124px;
          min-height: 68px;
          border: 1px solid rgba(54,187,139,0.42);
          background: rgba(25,88,66,0.38);
          color: rgba(255,253,250,0.88);
          font-size: 14px;
          font-weight: 900;
          line-height: 1.55;
          text-align: center;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .cost-peel-sheet {
          position: absolute;
          display: block;
          width: 132px;
          height: 64px;
          border: 1px solid rgba(255,255,255,0.28);
          background: linear-gradient(135deg, rgba(255,255,255,0.34), rgba(255,255,255,0.06));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.32);
          transform: skewX(-18deg) rotate(-16deg);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .cost-peel-sheet-1 { left: 52%; top: 30%; }
        .cost-peel-sheet-2 { left: 38%; top: 58%; transform: skewX(-18deg) rotate(-22deg); }
        .cost-peel-sheet-3 { left: 66%; top: 86%; transform: skewX(-18deg) rotate(-12deg); }
        .cost-yamato-panel {
          position: absolute;
          right: 0;
          top: 62px;
          width: 42%;
          height: 70%;
        }
        .cost-yamato-card {
          position: absolute;
          left: 4%;
          top: 8%;
          width: 66%;
          min-height: 400px;
          border: 1px solid rgba(255,255,255,0.30);
          background: rgba(255,255,255,0.22);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.24),
            0 28px 80px -58px rgba(0,0,0,0.82);
          padding: 30px 22px 20px;
          text-align: center;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .cost-yamato-photo {
          margin-top: 22px;
        }
        .cost-yamato-plan {
          margin: 18px auto 0;
          width: 82%;
          height: 58px;
          border: 1px solid rgba(24,23,20,0.16);
          background:
            linear-gradient(90deg, rgba(24,23,20,0.18) 0, rgba(24,23,20,0.18) 1px, transparent 1px),
            linear-gradient(180deg, rgba(24,23,20,0.16) 0, rgba(24,23,20,0.16) 1px, transparent 1px);
          background-size: 22px 22px;
          opacity: 0.42;
        }
        .cost-yamato-values {
          position: absolute;
          right: -2px;
          top: 13%;
          display: grid;
          gap: 24px;
        }
        .cost-yamato-values p {
          position: relative;
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0;
          color: #e3c26f;
          font-size: 13px;
          font-weight: 900;
        }
        .cost-yamato-values p::before {
          content: "";
          width: 58px;
          height: 1px;
          background: rgba(224,194,111,0.68);
        }
        .cost-yamato-values span {
          display: grid;
          place-items: center;
          width: 48px;
          aspect-ratio: 1;
          border: 1px solid rgba(224,194,111,0.52);
          border-radius: 999px;
          background: rgba(224,194,111,0.08);
        }
        .cost-yamato-note {
          position: absolute;
          left: 12%;
          bottom: 7%;
          color: rgba(255,253,250,0.78);
          font-size: 14px;
          font-weight: 900;
          line-height: 1.85;
          text-align: center;
        }
        .cost-replica-bottom {
          position: absolute;
          left: 11.5%;
          right: 6.5%;
          bottom: 24px;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(220px, 1fr) repeat(3, auto);
          gap: clamp(18px, 2.2vw, 44px);
          align-items: center;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.07);
          padding: 18px 26px;
          color: rgba(255,253,250,0.76);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .cost-replica-bottom p {
          margin: 0;
          color: #e3c26f;
          font-size: 14px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }
        .cost-replica-bottom span {
          border-left: 1px solid rgba(255,255,255,0.28);
          padding-left: clamp(16px, 1.8vw, 34px);
          font-size: 13px;
          font-weight: 900;
          line-height: 1.55;
        }
        .cost-main-title {
          font-size: clamp(36px, 4.7vw, 72px);
          letter-spacing: 0;
        }
        .cost-claim {
          max-width: 610px;
          color: ${P.green};
          font-size: clamp(24px, 2.45vw, 38px);
          letter-spacing: 0;
        }
        .cost-lead {
          color: rgba(24,23,20,0.64);
        }
        .cost-head {
          display: grid;
          grid-template-columns: minmax(0, 0.98fr) minmax(360px, 0.72fr);
          gap: clamp(34px, 6vw, 92px);
          align-items: end;
          padding-bottom: clamp(32px, 4.8vw, 62px);
          border-bottom: 1px solid rgba(24,23,20,0.13);
        }
        .cost-main-title {
          white-space: nowrap;
        }
        .cost-stage {
          position: relative;
          min-height: clamp(620px, 50vw, 760px);
          border: 1px solid rgba(255,255,255,0.62);
          background:
            radial-gradient(circle at 50% 48%, rgba(255,255,255,0.78), transparent 24%),
            radial-gradient(circle at 50% 48%, rgba(25,88,66,0.15), transparent 46%),
            linear-gradient(135deg, rgba(255,255,255,0.46), rgba(255,255,255,0.12)),
            rgba(255,253,250,0.20);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.72),
            0 40px 120px -86px rgba(24,23,20,0.80);
          overflow: hidden;
          backdrop-filter: blur(22px) saturate(1.06);
          -webkit-backdrop-filter: blur(22px) saturate(1.06);
        }
        .cost-stage::before {
          content: "";
          position: absolute;
          inset: 9%;
          border: 1px solid rgba(25,88,66,0.13);
          background:
            linear-gradient(90deg, rgba(25,88,66,0.12) 0, rgba(25,88,66,0.04) 1px, transparent 1px),
            linear-gradient(180deg, rgba(25,88,66,0.10) 0, rgba(25,88,66,0.03) 1px, transparent 1px);
          background-size: 86px 86px;
          opacity: 0.36;
        }
        .cost-stage::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(46vw, 520px);
          aspect-ratio: 1.25;
          transform: translate(-50%, -50%) rotate(-2deg);
          border: 1px solid rgba(25,88,66,0.20);
          background:
            linear-gradient(135deg, transparent 48%, rgba(25,88,66,0.15) 49%, rgba(25,88,66,0.15) 51%, transparent 52%),
            linear-gradient(45deg, transparent 48%, rgba(166,107,72,0.12) 49%, rgba(166,107,72,0.12) 51%, transparent 52%);
          opacity: 0.45;
          clip-path: polygon(50% 0, 100% 34%, 100% 100%, 0 100%, 0 34%);
        }
        .cost-house-core {
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          display: grid;
          width: min(42vw, 450px);
          min-height: 300px;
          place-items: center;
          transform: translate(-50%, -50%);
          border: 1px solid rgba(25,88,66,0.30);
          background:
            radial-gradient(circle at 50% 0%, rgba(255,255,255,0.74), transparent 54%),
            linear-gradient(135deg, rgba(231,247,239,0.70), rgba(255,255,255,0.22)),
            rgba(255,255,255,0.18);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.76),
            0 28px 80px -58px rgba(25,88,66,0.78);
          padding: clamp(24px, 3vw, 42px);
          text-align: center;
          backdrop-filter: blur(26px) saturate(1.12);
          -webkit-backdrop-filter: blur(26px) saturate(1.12);
        }
        .cost-house-core span,
        .cost-orbit-card span {
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 0.16em;
          color: ${P.rust};
          text-transform: uppercase;
        }
        .cost-house-core strong {
          margin-top: 10px;
          color: ${P.green};
          font-family: var(--font-shippori);
          font-size: clamp(36px, 4vw, 62px);
          font-weight: 500;
          line-height: 1.08;
          letter-spacing: 0;
        }
        .cost-house-core p {
          margin-top: 18px;
          color: rgba(24,23,20,0.62);
          font-size: 14px;
          font-weight: 850;
          line-height: 1.8;
        }
        .cost-house-core div {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
        }
        .cost-house-core em {
          display: inline-flex;
          align-items: center;
          min-height: 32px;
          border: 1px solid rgba(25,88,66,0.18);
          background: rgba(255,255,255,0.38);
          padding: 0 11px;
          color: ${P.green};
          font-size: 12px;
          font-style: normal;
          font-weight: 900;
        }
        .cost-orbit {
          position: absolute;
          inset: 0;
          z-index: 3;
        }
        .cost-orbit-card {
          position: absolute;
          width: min(23vw, 290px);
          border: 1px solid rgba(255,255,255,0.60);
          background:
            radial-gradient(circle at 14% 8%, rgba(255,255,255,0.60), transparent 38%),
            linear-gradient(135deg, rgba(255,255,255,0.42), rgba(255,255,255,0.13)),
            rgba(255,253,250,0.14);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.72),
            0 22px 70px -58px rgba(24,23,20,0.70);
          padding: 18px 20px 20px;
          backdrop-filter: blur(18px) saturate(1.08);
          -webkit-backdrop-filter: blur(18px) saturate(1.08);
        }
        .cost-orbit-card::before {
          content: "";
          position: absolute;
          left: 14px;
          right: 14px;
          top: 0;
          height: 2px;
          background: rgba(25,88,66,0.48);
        }
        .cost-orbit-card h3 {
          margin-top: 9px;
          color: ${P.ink};
          font-family: var(--font-shippori);
          font-size: clamp(19px, 1.45vw, 25px);
          font-weight: 500;
          line-height: 1.34;
          letter-spacing: 0;
        }
        .cost-orbit-card p {
          margin-top: 12px;
          color: ${P.green};
          font-size: 13px;
          font-weight: 900;
          line-height: 1.65;
        }
        .cost-orbit-card-1 {
          left: 5%;
          top: 9%;
        }
        .cost-orbit-card-2 {
          right: 5%;
          top: 10%;
        }
        .cost-orbit-card-3 {
          left: 3%;
          top: 40%;
        }
        .cost-orbit-card-4 {
          right: 3%;
          top: 40%;
        }
        .cost-orbit-card-5 {
          left: 10%;
          bottom: 9%;
        }
        .cost-orbit-card-6 {
          right: 10%;
          bottom: 9%;
        }
        .cost-stage-note {
          position: absolute;
          left: 50%;
          bottom: 36px;
          z-index: 4;
          width: min(58vw, 640px);
          transform: translateX(-50%);
          border-top: 1px solid rgba(25,88,66,0.30);
          padding-top: 16px;
          text-align: center;
        }
        .cost-stage-note p {
          color: rgba(24,23,20,0.52);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }
        .cost-stage-note strong {
          display: block;
          margin-top: 6px;
          color: ${P.green};
          font-size: clamp(17px, 1.4vw, 22px);
          line-height: 1.55;
        }
        .cost-proof-strip {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 24px;
          align-items: center;
          border: 1px solid rgba(255,255,255,0.58);
          background: rgba(255,253,250,0.52);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.70),
            0 22px 70px -62px rgba(24,23,20,0.68);
          padding: 22px clamp(20px, 3vw, 34px);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }
        .cost-proof-strip p {
          margin: 0;
          color: ${P.mute};
          font-size: 14px;
          font-weight: 850;
          line-height: 1.85;
        }
        .cost-principle {
          border-color: ${P.green};
        }
        .cost-principle p:first-child {
          color: ${P.rust};
        }
        .cost-principle p:nth-child(2) {
          color: ${P.ink};
        }
        .cost-principle span {
          display: block;
          margin-top: 14px;
          color: rgba(24,23,20,0.58);
          font-size: 13px;
          font-weight: 800;
          line-height: 1.8;
        }
        .cost-free-visual {
          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(138px, 0.42fr) minmax(0, 1fr);
          gap: clamp(12px, 1.5vw, 20px);
          min-height: 390px;
          border: 1px solid rgba(255,255,255,0.64);
          background:
            radial-gradient(circle at 18% 12%, rgba(255,255,255,0.62), transparent 28%),
            radial-gradient(circle at 78% 82%, rgba(25,88,66,0.12), transparent 34%),
            linear-gradient(135deg, rgba(255,255,255,0.48), rgba(255,255,255,0.14)),
            rgba(255,253,250,0.24);
          box-shadow:
            0 38px 110px -78px rgba(24,23,20,0.78),
            0 28px 74px -62px rgba(25,88,66,0.60),
            inset 0 1px 0 rgba(255,255,255,0.78);
          padding: clamp(18px, 2.2vw, 30px);
          overflow: hidden;
          backdrop-filter: blur(22px) saturate(1.08);
          -webkit-backdrop-filter: blur(22px) saturate(1.08);
        }
        .cost-free-visual::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            linear-gradient(90deg, rgba(25,88,66,0.12) 0, rgba(25,88,66,0.03) 1px, transparent 1px),
            linear-gradient(180deg, rgba(166,107,72,0.11), transparent 30%);
          background-size: 120px 100%, 100% 100%;
          opacity: 0.32;
        }
        .cost-plan-card,
        .cost-free-declare {
          position: relative;
          z-index: 1;
        }
        .cost-plan-card {
          display: flex;
          min-height: 326px;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(255,255,255,0.58);
          background:
            linear-gradient(135deg, rgba(255,255,255,0.50), rgba(255,255,255,0.12)),
            rgba(255,255,255,0.13);
          padding: clamp(18px, 2.2vw, 26px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.72),
            0 20px 60px -52px rgba(24,23,20,0.72);
        }
        .cost-plan-card p {
          margin: 0;
          font-size: 12px;
          font-weight: 950;
          letter-spacing: 0.14em;
          color: rgba(24,23,20,0.50);
        }
        .cost-plan-card strong {
          display: block;
          margin-top: 18px;
          max-width: 320px;
          font-family: var(--font-shippori);
          font-size: clamp(24px, 2.35vw, 34px);
          font-weight: 500;
          line-height: 1.32;
          letter-spacing: 0;
        }
        .cost-hidden-stack,
        .cost-home-value-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 24px;
        }
        .cost-hidden-stack span,
        .cost-home-value-grid span {
          display: inline-flex;
          align-items: center;
          min-height: 34px;
          border: 1px solid rgba(255,255,255,0.52);
          padding: 0 11px;
          font-size: 12px;
          font-weight: 900;
          line-height: 1;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .cost-hidden-stack span {
          position: relative;
          background: rgba(255, 239, 225, 0.26);
          color: rgba(24,23,20,0.58);
        }
        .cost-hidden-stack span::after {
          content: "";
          position: absolute;
          left: 9px;
          right: 9px;
          top: 50%;
          height: 1px;
          background: rgba(166,107,72,0.66);
          transform: rotate(-4deg);
        }
        .cost-home-value-grid span {
          background: rgba(233, 247, 240, 0.38);
          color: ${P.green};
        }
        .cost-plan-card-major strong {
          color: rgba(24,23,20,0.70);
        }
        .cost-plan-card-yamato {
          border-color: rgba(25,88,66,0.22);
          background:
            radial-gradient(circle at 18% 12%, rgba(255,255,255,0.72), transparent 36%),
            linear-gradient(135deg, rgba(236,248,242,0.58), rgba(255,255,255,0.14)),
            rgba(255,255,255,0.14);
        }
        .cost-plan-card-yamato p,
        .cost-plan-card-yamato strong {
          color: ${P.green};
        }
        .cost-free-declare {
          display: grid;
          place-items: center;
          align-self: center;
          min-height: 176px;
          border: 1px solid rgba(25,88,66,0.30);
          background:
            radial-gradient(circle at 50% 0%, rgba(255,255,255,0.62), transparent 52%),
            linear-gradient(135deg, rgba(25,88,66,0.16), rgba(255,255,255,0.18));
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.68),
            0 18px 48px -36px rgba(25,88,66,0.70);
          color: ${P.green};
          text-align: center;
        }
        .cost-free-declare::before,
        .cost-free-declare::after {
          content: "";
          position: absolute;
          top: 50%;
          width: clamp(16px, 2vw, 26px);
          height: 1px;
          background: rgba(25,88,66,0.44);
        }
        .cost-free-declare::before {
          right: 100%;
        }
        .cost-free-declare::after {
          left: 100%;
        }
        .cost-free-declare span {
          display: block;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .cost-free-declare strong {
          display: block;
          margin-top: 7px;
          font-family: var(--font-shippori);
          font-size: clamp(24px, 2.45vw, 36px);
          font-weight: 500;
          line-height: 1.12;
        }
        .cost-free-row.flow-reveal {
          transform: translate3d(0, 20px, 0);
        }
        .cost-free-row {
          min-height: 214px;
          border-color: rgba(255,255,255,0.58);
          background:
            radial-gradient(circle at 10% 8%, rgba(255,255,255,0.54), transparent 38%),
            linear-gradient(135deg, rgba(255,255,255,0.36), rgba(255,255,255,0.12)),
            rgba(255,253,250,0.16);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.68),
            0 20px 62px -54px rgba(24,23,20,0.68);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .cost-free-row::before {
          content: "";
          position: absolute;
          left: 14px;
          right: 14px;
          top: 0;
          height: 2px;
          transform: scaleX(0);
          transform-origin: left center;
          background: rgba(25, 88, 66, 0.46);
          transition: transform 920ms cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: calc(var(--reveal-delay, 0ms) + 120ms);
        }
        .cost-free-row.is-visible::before {
          transform: scaleX(1);
        }
        .cost-free-row-body {
          margin-top: -2px;
        }
        .cost-note {
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.74),
            0 22px 70px -60px rgba(24,23,20,0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }
        .reason-editorial {
          color: ${P.ink};
        }
        .reason-kicker,
        .reason-title-block,
        .reason-lead-wrap,
        .reason-row,
        .reason-action {
          opacity: 0;
          transform: translate3d(0, 22px, 0);
          transition:
            opacity 720ms cubic-bezier(0.2, 0.82, 0.18, 1),
            transform 720ms cubic-bezier(0.2, 0.82, 0.18, 1);
          transition-delay: var(--reason-delay, 0ms);
          will-change: opacity, transform;
        }
        .reason-kicker.is-visible,
        .reason-title-block.is-visible,
        .reason-lead-wrap.is-visible,
        .reason-row.is-visible,
        .reason-action.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
        .reason-head {
          position: relative;
          padding-bottom: clamp(38px, 5vw, 72px);
        }
        .reason-head::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          transform: scaleX(0);
          transform-origin: left;
          background: ${P.line};
          animation: reason-rule-in 900ms cubic-bezier(0.2, 0.82, 0.18, 1) 180ms forwards;
        }
        .reason-overline {
          margin-bottom: 18px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }
        .reason-title {
          max-width: 780px;
          font-size: clamp(38px, 5.4vw, 86px);
          line-height: 1.08;
          letter-spacing: 0;
        }
        .reason-lead-wrap {
          max-width: 690px;
          justify-self: end;
        }
        .reason-lead {
          font-size: clamp(15px, 1.28vw, 18px);
          font-weight: 700;
          line-height: 2.05;
          color: ${P.mute};
        }
        .reason-cta {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-top: 28px;
          padding-bottom: 5px;
          border-bottom: 1px solid;
          font-size: 14px;
          font-weight: 800;
          text-decoration: none;
          transition: gap 180ms ease, opacity 180ms ease;
        }
        .reason-cta:hover {
          gap: 18px;
          opacity: 0.72;
        }
        .reason-body {
          display: grid;
          grid-template-columns: minmax(160px, 0.34fr) minmax(0, 0.66fr);
          gap: clamp(42px, 6vw, 96px);
          margin-top: clamp(44px, 6vw, 86px);
          align-items: start;
        }
        .reason-side {
          position: sticky;
          top: 120px;
          min-height: 420px;
          color: rgba(24, 23, 20, 0.08);
          font-family: var(--font-inter);
          font-size: clamp(54px, 8vw, 128px);
          font-weight: 800;
          letter-spacing: 0.04em;
          line-height: 0.9;
          writing-mode: vertical-rl;
          transform: translateX(-0.12em);
        }
        .reason-list {
          border-top: 1px solid ${P.line};
          border-bottom: 1px solid ${P.line};
        }
        .reason-row {
          position: relative;
          display: grid;
          grid-template-columns: 62px minmax(118px, 150px) minmax(0, 1fr);
          gap: clamp(20px, 3vw, 44px);
          padding: clamp(26px, 3.4vw, 46px) 0;
          border-top: 1px solid ${P.line};
        }
        .reason-row:first-child {
          border-top: 0;
        }
        .reason-row::before {
          content: "";
          position: absolute;
          left: 0;
          top: -1px;
          width: 0;
          height: 1px;
          background: rgba(25, 88, 66, 0.58);
          transition: width 980ms cubic-bezier(0.2, 0.82, 0.18, 1);
          transition-delay: calc(var(--reason-delay, 0ms) + 120ms);
        }
        .reason-row.is-visible::before {
          width: min(320px, 46%);
        }
        .reason-index {
          font-size: clamp(24px, 2.2vw, 38px);
          font-weight: 300;
          line-height: 1;
        }
        .reason-category {
          padding-right: 22px;
          border-right: 1px solid ${P.line};
        }
        .reason-category-label,
        .reason-voice-label,
        .reason-answer-label {
          margin-bottom: 10px;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 0.16em;
        }
        .reason-category h3 {
          margin: 0;
          font-size: clamp(17px, 1.35vw, 22px);
          font-weight: 800;
          line-height: 1.4;
        }
        .reason-copy {
          max-width: 820px;
        }
        .reason-voice {
          margin: 0;
          font-size: clamp(19px, 1.55vw, 25px);
          font-weight: 650;
          line-height: 1.58;
          color: ${P.ink};
        }
        .reason-answer {
          position: relative;
          margin-top: 22px;
          padding-left: clamp(18px, 2vw, 28px);
        }
        .reason-answer::before {
          content: "";
          position: absolute;
          left: 0;
          top: 4px;
          bottom: 3px;
          width: 2px;
          transform: scaleY(0);
          transform-origin: top;
          background: ${P.green};
          transition: transform 760ms cubic-bezier(0.2, 0.82, 0.18, 1);
          transition-delay: calc(var(--reason-delay, 0ms) + 260ms);
        }
        .reason-row.is-visible .reason-answer::before {
          transform: scaleY(1);
        }
        .reason-answer p:last-child {
          margin: 0;
          max-width: 760px;
          color: ${P.green};
          font-size: clamp(18px, 1.62vw, 25px);
          font-weight: 800;
          line-height: 1.72;
        }
        .reason-action {
          display: grid;
          grid-template-columns: minmax(0, 1fr) auto;
          gap: 28px;
          align-items: center;
          padding: 30px 0 2px;
          border-top: 1px solid ${P.line};
        }
        .reason-action p {
          max-width: 700px;
          color: ${P.mute};
          font-size: 15px;
          font-weight: 800;
          line-height: 1.9;
        }
        .reason-action span {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: ${P.rust};
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
        }
        @keyframes reason-rule-in {
          to {
            transform: scaleX(1);
          }
        }
        @media (max-width: 767px) {
          .blueprint-layer {
            background-size: 980px auto;
          }
          .truth-interactive {
            min-height: 0;
            padding: 96px 18px 76px;
          }
          .truth-bg {
            inset: -5%;
            background-position: 58% center;
            transform: scale(1.04);
          }
          .truth-depth {
            display: none;
          }
          .truth-stage {
            padding: 24px 18px 22px;
            border-radius: 22px;
          }
          .truth-head {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .truth-title {
            margin-top: 16px;
            font-size: clamp(24px, 6.6vw, 30px);
            line-height: 1.12;
            white-space: normal;
          }
          .truth-lead {
            font-size: 14px;
            line-height: 1.9;
          }
          .truth-slider-wrap {
            grid-template-columns: 1fr;
            gap: 18px;
            margin-top: 24px;
          }
          .truth-slider-copy {
            min-height: 0;
            padding: 18px;
            border-radius: 18px;
          }
          .truth-slider-copy span {
            display: none;
          }
          .truth-category-rail {
            display: flex;
            gap: 8px;
            margin-top: 16px;
            overflow-x: auto;
            padding: 0 2px 4px;
            scrollbar-width: none;
          }
          .truth-category-rail::-webkit-scrollbar {
            display: none;
          }
          .truth-category-rail button {
            flex: 0 0 auto;
            grid-template-columns: 26px max-content;
            min-height: 36px;
            padding: 4px 12px 4px 4px;
          }
          .truth-category-rail em {
            width: 26px;
            height: 26px;
            font-size: 13px;
          }
          .truth-category-rail b {
            font-size: 11px;
            letter-spacing: 0.06em;
          }
          .truth-track {
            display: grid;
            grid-auto-flow: column;
            grid-auto-columns: minmax(286px, 86%);
            gap: 14px;
            min-height: 0;
            overflow-x: auto;
            overscroll-behavior-x: contain;
            scroll-snap-type: x mandatory;
            padding: 4px 2px 18px;
            perspective: none;
            transform: none;
          }
          .truth-card {
            position: relative;
            top: auto;
            left: auto;
            width: auto;
            scroll-snap-align: center;
            min-height: 304px;
            padding: 22px 20px 24px;
            border-radius: 20px;
            opacity: 1;
            pointer-events: auto;
            transform: none;
            filter: none;
          }
          .truth-card--active,
          .truth-card--next,
          .truth-card--prev,
          .truth-card--far {
            opacity: 1;
            transform: none;
            filter: none;
          }
          .truth-voice-block {
            margin-top: 28px;
          }
          .truth-voice-block h3 {
            font-size: clamp(24px, 7.1vw, 32px);
            line-height: 1.34;
          }
          .truth-answer-block {
            margin-top: 32px;
            padding-left: 18px;
          }
          .truth-answer-block h4 {
            font-size: 16px;
            line-height: 1.72;
          }
          .truth-bottom {
            align-items: flex-start;
            flex-direction: column;
            gap: 18px;
            margin-top: 18px;
          }
          .truth-controls {
            width: 100%;
            justify-content: space-between;
          }
          .reason-section {
            padding-bottom: 92px;
          }
          .reason-glass {
            min-height: 0;
            padding: 24px 20px 28px;
          }
          .reason-glass::before {
            inset: 12px;
          }
          .reason-glass-head {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .reason-glass-title {
            margin-top: 16px;
            font-size: clamp(31px, 9.2vw, 42px);
            line-height: 1.18;
          }
          .reason-glass-lead {
            font-size: 14px;
            line-height: 1.85;
          }
          .reason-map {
            display: grid;
            gap: 12px;
            min-height: 0;
            margin-top: 26px;
          }
          .reason-map-lines {
            display: none;
          }
          .reason-core,
          .reason-node,
          .reason-node-1,
          .reason-node-2,
          .reason-node-3,
          .reason-node-4,
          .reason-node-5 {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            bottom: auto;
            width: 100%;
            transform: none;
          }
          .reason-core {
            aspect-ratio: auto;
            min-height: 168px;
          }
          .reason-node {
            padding: 16px 17px 18px;
          }
          .reason-node h3 {
            font-size: 20px;
          }
          .reason-glass-action {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 22px;
          }
          .reason-head {
            padding-bottom: 36px;
          }
          .reason-title {
            font-size: clamp(34px, 11vw, 52px);
          }
          .reason-lead {
            line-height: 1.9;
          }
          .reason-body {
            display: block;
            margin-top: 38px;
          }
          .reason-side {
            position: relative;
            top: auto;
            min-height: 0;
            margin-bottom: 18px;
            writing-mode: horizontal-tb;
            font-size: 42px;
            line-height: 1;
          }
          .reason-row {
            grid-template-columns: 48px minmax(0, 1fr);
            gap: 14px 20px;
            padding: 26px 0;
          }
          .reason-category {
            border-right: 0;
            padding-right: 0;
          }
          .reason-copy {
            grid-column: 2;
          }
          .reason-voice {
            font-size: 19px;
          }
          .reason-answer p:last-child {
            font-size: 18px;
          }
          .reason-action {
            grid-template-columns: 1fr;
          }
          .payment-main-title {
            font-size: clamp(31px, 8vw, 34px);
            white-space: normal;
          }
          .cost-reason-section {
            padding-top: 72px;
            padding-bottom: 72px;
          }
          .cost-clarity-stage {
            border-radius: 0;
            padding: 26px 18px 24px;
          }
          .cost-clarity-head {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .cost-clarity-head h2 {
            font-size: clamp(29px, 8.2vw, 37px);
            line-height: 1.22;
            white-space: normal;
          }
          .cost-clarity-head p {
            font-size: 14px;
            line-height: 1.9;
          }
          .cost-clarity-layout {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 24px;
          }
          .cost-clarity-copy {
            min-height: 0;
            border-radius: 16px;
            padding: 18px;
          }
          .cost-clarity-copy h3 {
            font-size: clamp(27px, 7.4vw, 34px);
            line-height: 1.32;
          }
          .cost-clarity-copy p {
            font-size: 14px;
            line-height: 1.9;
          }
          .cost-clarity-mechanisms {
            margin-top: 20px;
          }
          .cost-clarity-board {
            border-radius: 16px;
          }
          .cost-clarity-board-head {
            display: none;
          }
          .cost-clarity-row {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 0;
          }
          .cost-clarity-row > div {
            padding: 14px 16px;
          }
          .cost-clarity-item {
            gap: 12px;
          }
          .cost-clarity-risk,
          .cost-clarity-answer {
            border-left: 0;
            border-top: 1px solid rgba(120,98,64,0.12);
          }
          .cost-clarity-answer {
            box-shadow: inset 0 3px 0 rgba(25,88,66,0.24);
          }
          .cost-clarity-result {
            grid-template-columns: 1fr;
            gap: 16px;
            margin-top: 16px;
            padding: 18px;
          }
          .cost-clarity-link {
            width: 100%;
            padding-inline: 16px;
            white-space: normal;
          }
          .cost-concept-frame {
            aspect-ratio: 0.72;
            min-height: 620px;
            border-color: rgba(255,255,255,0.16);
          }
          .cost-concept-image {
            object-position: 47% center;
            transform: scale(1.18);
          }
          .cost-mobile-summary {
            display: block;
            margin-top: 18px;
            border: 1px solid rgba(255,255,255,0.18);
            background:
              radial-gradient(circle at 18% 8%, rgba(255,255,255,0.12), transparent 36%),
              linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03));
            padding: 24px 20px;
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,0.14),
              0 18px 70px -54px rgba(0,0,0,0.84);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
          }
          .cost-mobile-summary h2 {
            color: ${P.white};
            font-size: clamp(30px, 9.2vw, 40px);
            letter-spacing: 0;
          }
          .cost-mobile-summary p {
            margin-top: 18px;
            color: rgba(255,253,250,0.78);
            font-size: 14px;
            font-weight: 800;
            line-height: 1.9;
          }
          .cost-mobile-summary div {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 20px;
            margin-bottom: 22px;
          }
          .cost-mobile-summary span {
            display: inline-flex;
            align-items: center;
            min-height: 32px;
            border: 1px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.07);
            padding: 0 10px;
            color: rgba(255,253,250,0.82);
            font-size: 11px;
            font-weight: 900;
          }
          .cost-compare-stage {
            border-radius: 0;
            padding: 26px 18px 24px;
          }
          .cost-compare-head {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .cost-compare-head h2 {
            font-size: clamp(29px, 8.4vw, 38px);
            line-height: 1.22;
            white-space: normal;
          }
          .cost-compare-head p {
            font-size: 14px;
            line-height: 1.9;
          }
          .cost-compare-table {
            display: block;
            margin-top: 26px;
            border-radius: 16px;
          }
          .cost-compare-colhead {
            display: none;
          }
          .cost-compare-row {
            display: grid;
            grid-template-columns: 1fr;
            min-height: 0;
            padding: 0;
          }
          .cost-compare-item {
            gap: 12px;
            padding: 17px 18px 12px;
          }
          .cost-compare-item span {
            font-size: 24px;
          }
          .cost-compare-item strong {
            font-size: 16px;
          }
          .cost-compare-other,
          .cost-compare-yamato {
            display: grid;
            grid-template-columns: 36px minmax(0, 1fr);
            gap: 12px;
            border-left: 0;
            padding: 12px 18px 15px;
            font-size: 13px;
            line-height: 1.75;
          }
          .cost-compare-mark {
            width: 34px;
            font-size: 21px;
          }
          .cost-compare-yamato {
            padding-bottom: 18px;
          }
          .cost-compare-arrow {
            width: 100%;
            min-height: 30px;
            margin-top: 10px;
            padding-right: 24px;
            font-size: 10px;
            line-height: 30px;
          }
          .cost-compare-bottom {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 18px;
          }
          .cost-compare-link {
            width: 100%;
            padding-inline: 16px;
            white-space: normal;
          }
          .cost-voice-grid {
            grid-template-columns: 1fr;
            gap: 18px;
            margin-top: 26px;
          }
          .cost-anxiety-panel,
          .cost-answer-panel {
            border-radius: 16px;
            padding: 18px;
          }
          .cost-voice-list {
            gap: 13px;
            margin-top: 18px;
          }
          .cost-voice-card,
          .cost-voice-card:nth-child(even) {
            grid-template-columns: 46px minmax(0, 1fr);
            gap: 10px;
            transform: translate3d(0, 14px, 0);
          }
          .cost-voice-card:nth-child(even) .cost-voice-avatar,
          .cost-voice-card:nth-child(even) .cost-voice-balloon {
            order: initial;
          }
          .cost-voice-avatar {
            width: 46px;
          }
          .cost-voice-avatar::before {
            inset: 7px 10px auto;
            height: 14px;
          }
          .cost-voice-avatar span {
            left: 14px;
            right: 14px;
            bottom: 9px;
            height: 12px;
          }
          .cost-voice-portrait {
            width: 68px;
            min-width: 68px;
            align-self: center;
          }
          .cost-voice-balloon {
            min-height: 0;
            clip-path: none;
            border-radius: 14px;
            padding: 14px 15px;
          }
          .cost-voice-balloon p {
            font-size: 13px;
            line-height: 1.75;
          }
          .cost-answer-panel h3 {
            font-size: clamp(27px, 7.4vw, 34px);
            line-height: 1.34;
          }
          .cost-zero-grid {
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 20px;
          }
          .cost-zero-card,
          .cost-zero-card:first-child {
            grid-column: auto;
            min-height: 0;
            padding: 15px;
          }
          .cost-zero-card strong {
            margin-top: 11px;
          }
          .cost-zero-card b {
            font-size: 17px;
          }
          .cost-voice-summary {
            margin-top: 14px;
            padding: 15px;
          }
          .cost-voice-bottom {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .cost-two-step-head {
            margin-bottom: 24px;
          }
          .cost-fear-scene,
          .cost-relief-scene {
            grid-template-columns: 1fr;
            gap: 20px;
            border-radius: 16px;
            padding: 18px;
          }
          .cost-fear-scene::before {
            top: 12px;
            right: 18px;
            font-size: 42px;
            opacity: 0.7;
          }
          .cost-fear-scene {
            display: block;
            aspect-ratio: 941 / 1672;
            padding: 0;
          }
          .cost-review-scene-desktop {
            display: none;
          }
          .cost-review-scene-mobile {
            display: block;
          }
          .cost-review-copy {
            padding: 0 9px;
          }
          .cost-review-copy-1 {
            left: 31%;
            top: 17.65%;
            width: 60%;
            height: 8.7%;
          }
          .cost-review-copy-2 {
            left: 7.8%;
            top: 36.55%;
            width: 58%;
            height: 8.8%;
          }
          .cost-review-copy-3 {
            left: 28.5%;
            top: 55.35%;
            width: 58.5%;
            height: 8.8%;
          }
          .cost-review-copy-4 {
            left: 7.8%;
            top: 74.35%;
            width: 57.5%;
            height: 8.9%;
          }
          .cost-review-label {
            font-size: 10.5px;
            letter-spacing: 0.05em;
          }
          .cost-review-copy p {
            margin-top: 3px;
            font-size: clamp(10.5px, 2.95vw, 12px);
            line-height: 1.5;
            letter-spacing: 0.02em;
          }
          .cost-review-copy small {
            margin-top: 4px;
            font-size: 8px;
          }
          .cost-scene-copy h3 {
            font-size: clamp(25px, 7vw, 32px);
            line-height: 1.42;
          }
          .cost-scene-copy p:not(.cost-panel-label),
          .cost-relief-copy p:not(.cost-panel-label) {
            max-width: none;
            font-size: 14px;
            line-height: 1.9;
          }
          .cost-voice-list.cost-voice-review-list {
            grid-template-columns: 1fr;
            margin-top: 0;
          }
          .cost-review-card .cost-voice-balloon {
            min-height: 0;
          }
          .cost-review-card,
          .cost-review-card:nth-child(even) {
            grid-template-columns: 72px minmax(0, 1fr);
            gap: 10px;
          }
          .cost-review-card:nth-child(even) .cost-voice-portrait,
          .cost-review-card:nth-child(even) .cost-voice-balloon {
            order: initial;
          }
          .cost-scene-bridge {
            display: grid;
            gap: 8px;
            justify-items: start;
            margin: 22px 0;
          }
          .cost-scene-bridge::before,
          .cost-scene-bridge::after {
            display: none;
          }
          .cost-scene-bridge span,
          .cost-scene-bridge strong {
            white-space: normal;
          }
          .cost-relief-scene .cost-zero-grid {
            margin-top: 0;
          }
          .cost-diagram-wrap {
            margin-inline: 0;
            overflow: visible;
          }
          .cost-diagram-stage {
            display: grid;
            gap: 16px;
            aspect-ratio: auto;
            min-height: 0;
            padding: 24px 18px 22px;
          }
          .cost-diagram-stage::before {
            background:
              linear-gradient(180deg, rgba(6,5,4,0.88), rgba(6,5,4,0.42) 54%, rgba(6,5,4,0.80)),
              radial-gradient(circle at 70% 34%, rgba(255,227,154,0.14), transparent 32%),
              radial-gradient(circle at 70% 62%, rgba(122,238,190,0.10), transparent 30%);
          }
          .cost-diagram-copy,
          .cost-diagram-pill,
          .cost-diagram-ledger,
          .cost-diagram-major,
          .cost-diagram-badge,
          .cost-diagram-peels,
          .cost-diagram-yamato,
          .cost-diagram-major-note,
          .cost-diagram-bottom {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            bottom: auto;
            width: 100%;
            height: auto;
            transform: none;
          }
          .cost-diagram-copy {
            padding: 0 0 8px;
          }
          .cost-diagram-copy::before {
            inset: -18px -18px -10px;
            background: rgba(5,5,4,0.58);
          }
          .cost-diagram-copy h2 {
            font-size: clamp(32px, 9.2vw, 42px);
            line-height: 1.34;
          }
          .cost-diagram-copy p {
            font-size: 14px;
            line-height: 1.9;
          }
          .cost-diagram-link {
            padding: 10px 15px;
            font-size: 12px;
            letter-spacing: 0.06em;
          }
          .cost-diagram-quiet {
            display: grid;
            font-size: 12px !important;
          }
          .cost-diagram-pill {
            justify-self: start;
            width: fit-content;
            min-width: 0;
            min-height: 34px;
            padding: 0 18px;
            font-size: 12px;
          }
          .cost-diagram-pill-yamato {
            border-color: rgba(71,205,154,0.42);
          }
          .cost-diagram-ledger {
            display: grid;
            grid-template-columns: 1fr;
            min-width: 0;
            border-color: rgba(255,255,255,0.18);
          }
          .cost-diagram-ledger p {
            min-height: 58px;
            padding: 10px 13px;
          }
          .cost-diagram-major {
            order: 4;
            min-height: 420px;
          }
          .cost-diagram-document-major {
            left: 25%;
            top: 9%;
            width: 62%;
            height: 82%;
          }
          .cost-diagram-badge {
            order: 6;
            min-width: 0;
            min-height: 84px;
          }
          .cost-diagram-badge strong {
            font-size: 18px;
          }
          .cost-diagram-peels {
            order: 7;
            display: flex;
            justify-content: center;
            min-height: 84px;
          }
          .cost-diagram-peels span {
            position: relative;
            left: auto !important;
            top: auto !important;
            width: 94px;
            height: 52px;
            margin-inline: -14px;
          }
          .cost-diagram-yamato {
            order: 8;
            display: grid;
            gap: 14px;
          }
          .cost-diagram-document-yamato {
            position: relative;
            left: auto;
            top: auto;
            width: 100%;
            height: auto;
            min-height: 430px;
          }
          .cost-diagram-values {
            position: relative;
            right: auto;
            top: auto;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            width: 100%;
          }
          .cost-diagram-values p {
            grid-template-columns: 28px minmax(0, 1fr);
            border: 1px solid rgba(224,194,111,0.26);
            padding: 10px 9px;
            font-size: 12px;
          }
          .cost-diagram-values p::before {
            display: none;
          }
          .cost-diagram-values span {
            width: 28px;
          }
          .cost-diagram-yamato-note,
          .cost-diagram-major-note {
            font-size: 13px;
          }
          .cost-diagram-yamato-note {
            position: relative;
            left: auto;
            bottom: auto;
            width: 100%;
          }
          .cost-diagram-major-note {
            order: 5;
          }
          .cost-diagram-bottom {
            order: 9;
            grid-template-columns: 1fr;
            gap: 10px;
            min-height: 0;
            padding: 18px;
          }
          .cost-diagram-bottom p {
            font-size: 14px;
          }
          .cost-diagram-bottom span {
            border-left: 0;
            border-top: 1px solid rgba(255,255,255,0.20);
            padding: 10px 0 0;
          }
          .cost-vision-scroll {
            margin-inline: -20px;
            overflow-x: auto;
            overscroll-behavior-x: contain;
            padding: 0 20px 12px;
            scrollbar-width: thin;
            -webkit-overflow-scrolling: touch;
          }
          .cost-vision-stage {
            width: 1120px;
            min-width: 1120px;
            height: 615px;
            aspect-ratio: auto;
          }
          .cost-vision-copy h2 {
            font-size: 39px;
          }
          .cost-vision-copy p {
            font-size: 13px;
          }
          .cost-vision-link {
            padding: 10px 22px;
            font-size: 12px;
          }
          .cost-vision-quiet {
            font-size: 12px !important;
          }
          .cost-vision-bottom {
            min-height: 68px;
            gap: 18px;
            padding: 12px 24px;
          }
          .cost-poster-frame {
            display: none;
          }
          .cost-replica {
            display: block;
            aspect-ratio: auto;
            min-height: 0;
            overflow: visible;
            padding: 24px 18px;
          }
          .cost-replica-copy h2 {
            font-size: clamp(31px, 9.2vw, 43px);
            line-height: 1.28;
          }
          .cost-replica-copy p {
            max-width: none;
            font-size: 14px;
            line-height: 1.9;
          }
          .cost-replica-link {
            padding: 10px 14px;
            font-size: 12px;
            letter-spacing: 0.08em;
          }
          .cost-replica-statement {
            margin-top: 28px;
            padding-top: 0;
          }
          .cost-replica-diagram {
            display: grid;
            gap: 14px;
            min-height: 0;
            margin-top: 30px;
          }
          .cost-side-label,
          .cost-major-panel,
          .cost-peel,
          .cost-yamato-panel,
          .cost-replica-bottom {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            bottom: auto;
            width: 100%;
            height: auto;
            transform: none;
          }
          .cost-side-label {
            justify-self: start;
            padding: 8px 18px;
            font-size: 12px;
          }
          .cost-major-panel,
          .cost-yamato-panel {
            display: grid;
            gap: 12px;
          }
          .cost-major-list {
            position: relative;
            inset: auto;
            width: 100%;
            padding: 14px 14px;
          }
          .cost-major-list p {
            min-height: 38px;
            font-size: 11px;
          }
          .cost-estimate-stack {
            display: none;
          }
          .cost-estimate-card,
          .cost-yamato-card {
            position: relative;
            left: auto;
            top: auto;
            width: 100%;
            min-height: 0;
            padding: 24px 18px 18px;
          }
          .cost-peel {
            min-height: 132px;
          }
          .cost-peel strong {
            left: 50%;
            top: 20px;
            transform: translateX(-50%);
          }
          .cost-peel-sheet {
            width: 104px;
            height: 48px;
          }
          .cost-peel-sheet-1 { left: 8%; top: 62px; }
          .cost-peel-sheet-2 { left: 38%; top: 74px; }
          .cost-peel-sheet-3 { left: 68%; top: 58px; }
          .cost-yamato-values {
            position: relative;
            right: auto;
            top: auto;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .cost-yamato-values p {
            justify-content: center;
            border: 1px solid rgba(224,194,111,0.28);
            padding: 10px 8px;
            text-align: center;
          }
          .cost-yamato-values p::before,
          .cost-yamato-values span {
            display: none;
          }
          .cost-yamato-note {
            position: relative;
            left: auto;
            bottom: auto;
            margin-top: 8px;
            font-size: 13px;
          }
          .cost-replica-bottom {
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 18px;
            padding: 18px;
          }
          .cost-replica-bottom p {
            font-size: 14px;
          }
          .cost-replica-bottom span {
            border-left: 0;
            border-top: 1px solid rgba(255,255,255,0.20);
            padding: 10px 0 0;
          }
          .cost-head {
            display: block;
            padding-bottom: 28px;
          }
          .cost-main-title {
            font-size: clamp(31px, 9.6vw, 42px);
            line-height: 1.16;
            white-space: normal;
          }
          .cost-claim {
            margin-top: 22px;
            font-size: clamp(23px, 7vw, 30px);
            line-height: 1.46;
          }
          .cost-lead {
            font-size: 14px;
            line-height: 1.9;
          }
          .cost-stage {
            display: grid;
            gap: 12px;
            min-height: 0;
            margin-top: 28px;
            border-color: rgba(255,255,255,0.52);
            padding: 16px;
          }
          .cost-stage::before,
          .cost-stage::after {
            display: none;
          }
          .cost-house-core,
          .cost-orbit,
          .cost-orbit-card,
          .cost-stage-note {
            position: relative;
            left: auto;
            right: auto;
            top: auto;
            bottom: auto;
            width: 100%;
            transform: none;
          }
          .cost-house-core {
            min-height: 230px;
            padding: 24px 18px;
          }
          .cost-house-core strong {
            font-size: clamp(34px, 10.5vw, 42px);
          }
          .cost-orbit {
            display: grid;
            gap: 10px;
            inset: auto;
          }
          .cost-orbit-card {
            padding: 16px 17px 18px;
          }
          .cost-orbit-card h3 {
            font-size: 21px;
          }
          .cost-stage-note {
            margin-top: 4px;
            padding: 16px 0 2px;
          }
          .cost-proof-strip {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 20px;
          }
          .cost-principle {
            margin-top: 28px;
            padding-left: 18px;
          }
          .cost-principle p:nth-child(2) {
            font-size: 21px;
            line-height: 1.55;
          }
          .cost-free-visual {
            grid-template-columns: 1fr;
            gap: 14px;
            min-height: 0;
            margin-top: 4px;
            padding: 16px;
          }
          .cost-plan-card {
            min-height: 0;
            padding: 18px;
          }
          .cost-plan-card strong {
            font-size: 24px;
          }
          .cost-free-declare {
            min-height: 118px;
          }
          .cost-free-declare::before,
          .cost-free-declare::after {
            display: none;
          }
          .cost-free-declare strong {
            font-size: 26px;
          }
          .cost-free-row {
            grid-template-columns: 44px minmax(0, 1fr);
            min-height: 0;
            padding: 18px;
          }
          .cost-free-row-body {
            grid-column: 1 / -1;
            margin-top: 0;
            margin-left: 0;
            padding-left: 16px;
          }
          .hero-copy {
            font-size: clamp(31px, 8.6vw, 36px);
            line-height: 1.2;
          }
          .voice-proof-title {
            font-size: clamp(31px, 8vw, 38px);
            line-height: 1.28;
            white-space: normal;
          }
          .voice-proof-board {
            min-height: 940px;
          }
          .marker-disclaimer {
            left: 0;
            right: 0;
            bottom: 56px;
            max-width: none;
            font-size: 10px;
            line-height: 1.6;
          }
          .voice-proof-link {
            right: 0;
            bottom: 0;
            font-size: 13px;
          }
          .voice-annotation {
            width: min(82vw, 330px);
          }
          .voice-annotation::before {
            left: -14px;
            right: -12px;
            top: -12px;
            bottom: -14px;
          }
          .voice-annotation-1 {
            left: 6px;
            top: 18px;
          }
          .voice-annotation-2 {
            right: 0;
            left: auto;
            top: 176px;
          }
          .voice-annotation-3 {
            left: 28px;
            right: auto;
            top: 336px;
          }
          .voice-annotation-4 {
            left: 2px;
            top: 506px;
          }
          .voice-annotation-5 {
            right: 4px;
            left: auto;
            top: 690px;
          }
          .voice-annotation-quote {
            font-size: 19px;
            line-height: 1.46;
          }
        }
        .bplan-rhythm {
          --bp-type-caption: clamp(11px, 0.68rem + 0.04vw, 12px);
          --bp-type-small: clamp(13px, 0.78rem + 0.08vw, 14px);
          --bp-type-body: clamp(15px, 0.93rem + 0.14vw, 17px);
          --bp-type-lead: clamp(16px, 0.98rem + 0.32vw, 20px);
          --bp-type-h3: clamp(22px, 1.32rem + 0.55vw, 28px);
          --bp-type-h2: clamp(30px, 1.82rem + 0.82vw, 42px);
          --bp-type-display: clamp(38px, 4.4vw, 64px);
          --bp-space-xs: 8px;
          --bp-space-sm: 16px;
          --bp-space-md: 24px;
          --bp-space-lg: 48px;
          --bp-space-section: clamp(88px, 8.4vw, 144px);
          --bp-space-section-tight: clamp(72px, 7vw, 120px);
          --bp-gutter: clamp(20px, 4vw, 56px);
          --bp-measure: 42em;
          /* === v2 再設計トークン (2026-05-29) === */
          /* 声量3段階: 数字=shout / 見出し=talk / 添え=whisper（段差1.6倍以上） */
          --bp-voice-shout: clamp(56px, 8vw, 104px);
          --bp-voice-talk: clamp(28px, 1.6rem + 0.8vw, 40px);
          --bp-voice-whisper: clamp(13px, 0.78rem + 0.08vw, 14px);
          /* 背景リズム（明度を波打たせる・意味色） */
          --bp-bg-paper: #f4efe6;
          --bp-bg-white: #fffdfa;
          --bp-bg-smoke: #ece6db;
          --bp-bg-ink: #181714;
          /* 彩度/エネルギーは深緑の濃淡で段差（低彩度暖色は不採用＝検証） */
          --bp-green-deep: #123d2e;
          --bp-green: #195842;
          --bp-green-mid: #3f7d63;
          --bp-green-soft: #cfe0d4;
          /* クライマックス用の呼吸 */
          --bp-space-climax: clamp(120px, 11vw, 180px);
          /* モーション */
          --bp-motion-fast: 240ms;
          --bp-motion-base: 400ms;
          --bp-motion-count: 1200ms;
          --bp-ease: cubic-bezier(0.16, 1, 0.3, 1);
          font-size: var(--bp-type-body);
          letter-spacing: 0.035em;
          line-height: 1.8;
          word-break: auto-phrase;
          line-break: strict;
        }
        .bplan-rhythm h1,
        .bplan-rhythm h2,
        .bplan-rhythm h3 {
          font-feature-settings: "palt" 1;
          letter-spacing: 0.035em;
          text-wrap: balance;
        }
        .bplan-rhythm p,
        .bplan-rhythm li,
        .bplan-rhythm dd {
          letter-spacing: 0.04em;
          line-height: 1.88;
          text-wrap: pretty;
        }
        .bplan-rhythm .hero-copy {
          gap: 0.18em;
          font-size: var(--bp-type-display);
          line-height: 1.22;
          letter-spacing: 0.045em;
        }
        .bplan-rhythm .voice-proof,
        .bplan-rhythm .payment-section,
        .bplan-rhythm .cost-reason-section {
          padding-inline: var(--bp-gutter);
          padding-block: var(--bp-space-section);
        }
        .bplan-rhythm #design,
        .bplan-rhythm #quality,
        .bplan-rhythm #action {
          padding-inline: var(--bp-gutter);
          padding-block: var(--bp-space-section-tight);
        }
        .bplan-rhythm .voice-proof-title,
        .bplan-rhythm .payment-main-title,
        .bplan-rhythm .cost-compare-head h2 {
          font-size: var(--bp-type-h2);
          line-height: 1.42;
          letter-spacing: 0.035em;
        }
        .bplan-rhythm .voice-proof-title,
        .bplan-rhythm .payment-main-title {
          white-space: nowrap;
        }
        .bplan-rhythm .payment-section-lead,
        .bplan-rhythm .cost-compare-head p,
        .bplan-rhythm .cost-compare-bottom p {
          max-width: var(--bp-measure);
          font-size: var(--bp-type-body);
          line-height: 1.92;
          letter-spacing: 0.04em;
        }
        .bplan-rhythm .payment-card {
          padding: clamp(24px, 2.8vw, 40px);
        }
        .bplan-rhythm .payment-case-headline {
          margin-top: var(--bp-space-lg);
          font-size: var(--bp-type-h3);
          line-height: 1.52;
          letter-spacing: 0.035em;
        }
        .bplan-rhythm .payment-breakdown-chip,
        .bplan-rhythm .payment-case-chip,
        .bplan-rhythm .cost-compare-colhead,
        .bplan-rhythm .cost-compare-arrow,
        .bplan-rhythm .cost-compare-link {
          font-size: var(--bp-type-caption);
        }
        .bplan-rhythm .cost-compare-stage {
          padding: clamp(32px, 4.2vw, 64px);
        }
        .bplan-rhythm .cost-compare-table {
          margin-top: var(--bp-space-lg);
        }
        .bplan-rhythm .cost-compare-other,
        .bplan-rhythm .cost-compare-yamato {
          font-size: var(--bp-type-small);
          line-height: 1.68;
        }
        .bplan-rhythm .cost-compare-item strong {
          font-size: var(--bp-type-small);
          letter-spacing: 0.035em;
        }
        .bplan-rhythm .cost-compare-bottom {
          margin-top: var(--bp-space-md);
          padding: var(--bp-space-md) clamp(24px, 3vw, 40px);
        }
        @media (max-width: 767px) {
          .bplan-rhythm {
            --bp-type-caption: 11px;
            --bp-type-small: 13px;
            --bp-type-body: clamp(15px, 3.9vw, 16px);
            --bp-type-lead: clamp(16px, 4.4vw, 18px);
            --bp-type-h3: clamp(20px, 5.8vw, 24px);
            --bp-type-h2: clamp(27px, 7.4vw, 32px);
            --bp-type-display: clamp(32px, 9.4vw, 40px);
            --bp-space-section: clamp(76px, 18vw, 92px);
            --bp-space-section-tight: clamp(68px, 16vw, 84px);
            --bp-gutter: 20px;
            letter-spacing: 0.025em;
          }
          .bplan-rhythm .hero-copy {
            line-height: 1.26;
            letter-spacing: 0.035em;
          }
          .bplan-rhythm .voice-proof-title,
          .bplan-rhythm .payment-main-title {
            line-height: 1.42;
            white-space: normal;
          }
          .bplan-rhythm .cost-compare-head h2 {
            line-height: 1.42;
          }
          .bplan-rhythm .payment-card,
          .bplan-rhythm .cost-compare-stage {
            padding: 24px 20px;
          }
          .bplan-rhythm .payment-case-headline {
            margin-top: 32px;
            line-height: 1.55;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .blueprint-layer {
            animation: none;
          }
          .voice-annotation,
          .voice-annotation::before,
          .voice-annotation::after,
          .voice-annotation-label,
          .voice-annotation-quote {
            animation: none;
            opacity: 1;
            clip-path: none;
          }
          .reason-kicker,
          .reason-title-block,
          .reason-lead-wrap,
          .reason-row,
          .reason-action {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .reason-row::before {
            width: min(320px, 46%);
            transition: none;
          }
          .reason-answer::before {
            transform: scaleY(1);
            transition: none;
          }
          .reason-glass [data-reason-reveal] {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .truth-bg,
          .truth-depth,
          .truth-slider-copy,
          .truth-track {
            transform: none;
            transition: none;
          }
          .truth-stage [data-reason-reveal] {
            opacity: 1;
            transform: none;
            transition: none;
          }
          .flow-reveal,
          .payment-card.flow-reveal,
          .cost-free-row.flow-reveal,
          .cost-orbit-card.flow-reveal {
            opacity: 1;
            transform: none;
            filter: none;
            transition: none;
          }
          .cost-free-row::before {
            transform: scaleX(1);
            transition: none;
          }
        }
      `}</style>
    </div>
  );
}
