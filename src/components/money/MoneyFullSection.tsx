"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Minus,
  Heart,
  Coffee,
  Home as HomeIcon,
  TrendingUp,
} from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  MoneyFullSection — /money 完全版（2026-04-22 v3 リデザイン）
  ------------------------------------------------------------
  v2(編集誌的硬派) → v3: 5人デザイナー会議の総意を反映
    - 質問起点の章タイトル(宣言→疑問形)
    - 5つの財布を「比率バー」で視覚化(羅列→可視化)
    - 月々シミュレーションは「想定モデル」を主役に(表→具体)
    - FP章を「黒の正直さ」から「温かい光の信頼」へ転換
    - 写真を呼吸として2-3箇所挟む
    - 各章の冒頭で「希望」を先出し(損失回避だけに偏らない)

  消費者心理5段階(関心→共感→納得→確信→行動) は v1〜v2 から継承。
  「ポジティブに読める」を最重要に、シビアな数字は誠実に並べつつ
  暮らしの言葉で噛み砕く。
*/

const ACCENT = "#A2C523"; // LIME
const FOREST = "#486B00"; // main green

// ─────────────────────────────────────────────
// データ
// ─────────────────────────────────────────────

// 5つの財布: 比率バー用 + 詳細
const BUCKETS = [
  {
    no: "01",
    label: "建物本体",
    amount: "2,280〜2,480",
    unit: "万円",
    pct: 50,
    color: FOREST,
    body: "京・風・花の3プラン。標準仕様で揃えています。",
    yamato: "やまと: 京 2,280万円〜（税込）",
  },
  {
    no: "02",
    label: "付帯工事",
    amount: "0",
    unit: "円(やまと)",
    pct: 5,
    color: ACCENT,
    body: "地盤改良費(最大150万円)・仲介手数料は当社が負担します。",
    yamato: "他社目安: 別途 100〜300万円",
  },
  {
    no: "03",
    label: "土地代",
    amount: "1,000〜2,500",
    unit: "万円",
    pct: 35,
    color: "#7D4427",
    body: "奈良・京都の自社分譲地のほか、ご希望のエリアもご一緒に探します。",
    yamato: "目安(エリアによる)",
  },
  {
    no: "04",
    label: "諸費用",
    amount: "200〜400",
    unit: "万円",
    pct: 8,
    color: "#9A8978",
    body: "登記・印紙税・ローン手数料・火災保険等。総額の5〜10%が目安です。",
    yamato: "目安",
  },
  {
    no: "05",
    label: "引越し・家具・カーテン",
    amount: "50〜150",
    unit: "万円",
    pct: 2,
    color: "#C7B299",
    body: "暮らしを始めるための分。最初から詰め込まず、暮らしながら整えるご家族も多いです。",
    yamato: "目安",
  },
] as const;

// 月々シミュレーション
const MODEL_FAMILY = {
  who: "30代ご夫婦・お子様1人",
  income: "世帯年収 500万円",
  borrow: "2,500万円",
  monthly: "7.1",
  rate: "金利1.0%・35年・元利均等",
  comment:
    "返済比率は年収の17%前後。生活費・教育費を圧迫しない、ご家族のための「無理しない設計」の一例です。",
} as const;

const RATE_HEADERS = ["1.0%", "1.5%", "2.0%"] as const;
const LOAN_TABLE = [
  { borrow: "2,500", monthly: ["7.1", "7.7", "8.3"] },
  { borrow: "3,000", monthly: ["8.5", "9.2", "9.9"] },
  { borrow: "3,500", monthly: ["9.9", "10.7", "11.6"] },
  { borrow: "4,000", monthly: ["11.3", "12.2", "13.3"] },
] as const;

const RULES = [
  { label: "Rule", t: "月々の返済は、年収の20〜25%が目安。", d: "「借りられる額」ではなく「返せる額」で考えると、生活費・教育費を圧迫しません。" },
  { label: "Check", t: "教育費のピークと、返済のピークを重ねない。", d: "進学時期に合わせて、繰上げ返済の余地を残す設計を一緒に考えます。" },
  { label: "Reserve", t: "生活防衛費は、3〜6ヶ月分残す。", d: "頭金にすべて充てると急な出費に対応できません。手元に残す額も一緒に決めます。" },
] as const;

// 賃貸 vs 持家
// 想定: やまと京プラン(2,280万円) + 奈良市八田町等のお手頃な土地(800万円前後) +
//       諸費用 → 借入3,000万円・1.0%・35年 ≈ 月々8.5万円
const COMPARE = [
  { axis: "30年後の累計支出", rent: "3,060万円", own: "約3,150万円", positive: false },
  { axis: "30年後に残るもの", rent: "なし", own: "持ち家(資産として残る)", positive: true },
  { axis: "老後の住居費", rent: "引き続き家賃", own: "完済後は固定資産税と修繕費のみ", positive: true },
  { axis: "間取り・設備", rent: "原則そのまま", own: "家族の変化に合わせて変えられる", positive: true },
] as const;

const LOAN_TYPES = [
  {
    name: "変動金利型",
    rate: "0.4〜0.7",
    pros: "金利が低い。総返済額を抑えやすい。",
    cons: "金利が上昇すると、月々の支払いが増える可能性。",
    when: "繰上げ返済の余力がある／返済期間が短めの方に。",
  },
  {
    name: "全期間固定型",
    rate: "1.7〜2.0",
    pros: "完済まで月々の額が変わらない。家計設計が立てやすい。",
    cons: "変動より金利が高め。総返済額は大きくなる。",
    when: "教育費・老後資金とのバランスを最優先する方に。",
  },
  {
    name: "固定期間選択型",
    rate: "1.0〜1.5",
    pros: "一定期間の金利を確定でき、変動と固定の中間。",
    cons: "固定期間終了後の金利が読めない。",
    when: "教育費のピークに合わせて期間を区切りたい方に。",
  },
] as const;

const SUPPORTS = [
  {
    name: "住宅ローン控除",
    sub: "(住宅ローン減税)",
    body: "年末ローン残高の0.7%が、最大13年間にわたり所得税(住民税)から控除されます。長期優良住宅・ZEH水準なら控除上限が拡大します。",
  },
  {
    name: "子育てエコホーム支援事業",
    sub: "(最大100万円補助)",
    body: "省エネ基準を満たす新築住宅で、世帯条件により最大100万円の補助。年度ごとに予算枠があるため、早めの確認をおすすめします。",
  },
  {
    name: "GX志向型住宅補助",
    sub: "",
    body: "高断熱・高効率設備を備えた住宅向けの補助制度。条件と申請時期は年度ごとに変わります。",
  },
  {
    name: "贈与税の非課税特例",
    sub: "",
    body: "親・祖父母からの住宅取得資金の贈与に、一定額まで非課税枠があります。条件は時期により変わります。",
  },
] as const;

const FP_PROMISES = [
  {
    icon: Heart,
    title: "売り場のFPではなく、ご家族のFPに。",
    body: "ハウスメーカー直営のFPは、家を売ることが前提です。やまとは、提携FPに「家を建てない選択を含めて、率直に話してほしい」とお願いしています。",
  },
  {
    icon: Coffee,
    title: "ご相談料は、いただきません。",
    body: "ご家族から相談料はお預かりしません。やまとと提携FPの間で取り決めをし、無理のない範囲でお話しできる体制にしています。",
  },
  {
    icon: HomeIcon,
    title: "ご紹介の押しつけは、しません。",
    body: "FPと話したあとに「やっぱり今は建てない」とお決めになっても、それで構いません。あとから連絡を重ねるようなことは、いたしません。",
  },
] as const;

const FLOW_STEPS = [
  {
    k: "01",
    title: "いまの暮らしと、時期のめど",
    body: "ご家族の人数や通勤・通学、引っ越しをいつ頃に考えているか。金額の前に、生活の前提をそろえます。",
    image: "/images/works/case1-living.webp",
  },
  {
    k: "02",
    title: "費用のかたちを、資料でたどる",
    body: "図や資料を見ながら、土地・建物・諸費用の全体像をざっくり追います。細かい確定は、このあとの段階で進められます。",
    image: "/images/works/case2-kitchen.webp",
  },
  {
    k: "03",
    title: "帰るまでに、次の一手を決める",
    body: "持ち帰り資料、家で話し合っておきたいこと、次の面談や現地のご案内など、次に何をするかをはっきりさせます。",
    image: "/images/works/case3-living.webp",
  },
] as const;

const FAQS = [
  {
    q: "住宅ローンの審査、通るかどうか不安です。",
    a: "事前審査は無料で、複数の金融機関(大和信用金庫・奈良中央信用金庫・南都銀行・りそな銀行など)からご状況に合うものをご一緒に整理します。住宅ローンアドバイザー資格を持つスタッフが在籍しています。",
  },
  {
    q: "途中で払えなくなったら、どうなりますか。",
    a: "やまとは「払えなくなる家」をお売りしません。ご相談時に、月々の支払いがご家族の生活費・教育費を圧迫しない範囲を一緒に確認します。万が一に備えた団体信用生命保険も、内容をご一緒に確認します。",
  },
  {
    q: "金利が上がったら、月々の支払いはどうなりますか。",
    a: "変動金利の場合、半年ごとに金利が見直されます。一定期間は急激な上昇を抑えるルール(5年ルール・125%ルール)が一般的です。固定金利と組み合わせて、上昇に備える方も多くいらっしゃいます。",
  },
  {
    q: "途中で離職・収入減になったら、どうなりますか。",
    a: "金融機関への返済条件の見直し相談が可能な場合があります。また、団体信用生命保険(三大疾病特約等)で備える選択肢もあります。ご相談時に、リスクの整理もご一緒に行います。",
  },
  {
    q: "頭金は、いくら必要ですか。",
    a: "「頭金ゼロでも借入可能」ですが、月々の返済比率(年収の2〜3割が目安)とのバランスで決めます。生活防衛費(生活費の3〜6ヶ月分)を残すこともおすすめしています。",
  },
  {
    q: "ハウスメーカーに相談すると、家を売られそうで怖いです。",
    a: "やまとはご相談を「数を取りに行く場」とは考えていません。ご相談後に「やっぱり今は建てない」と判断されても、それで構いません。提携FPも、家を売る前提では話しません。",
  },
] as const;

// ─────────────────────────────────────────────
// 部品
// ─────────────────────────────────────────────

function ChapterHeader({
  no,
  question,
  lead,
  light = false,
  align = "left",
}: {
  no: string;
  question: React.ReactNode;
  lead?: React.ReactNode;
  light?: boolean;
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div className={`mb-12 md:mb-20 ${isCenter ? "text-center mx-auto max-w-[760px]" : "max-w-[840px]"}`}>
      <div className={`flex items-baseline gap-4 mb-6 ${isCenter ? "justify-center" : ""}`}>
        <span
          className="font-oswald tabular-nums leading-none"
          style={{
            fontWeight: 300,
            fontSize: "clamp(28px, 3vw, 44px)",
            color: light ? "rgba(255,255,255,0.45)" : "rgba(43,43,43,0.35)",
          }}
        >
          Q.{no}
        </span>
        <span
          className={`font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-bold ${
            light ? "text-white/55" : "text-text-secondary"
          }`}
        >
          {/* 章番号と並べて読ませる小ラベル */}
          Chapter {no}
        </span>
      </div>
      <h2
        className={`leading-[1.2] tracking-[-0.01em] ${light ? "text-white" : "text-text-primary"}`}
        style={{
          fontWeight: 500,
          fontSize: "clamp(30px, 4.4vw, 60px)",
        }}
      >
        {question}
      </h2>
      {lead ? (
        <p
          className={`mt-6 text-[clamp(14px,1.05vw,16px)] leading-[1.95] ${
            light ? "text-white/75" : "text-text-secondary"
          } ${isCenter ? "mx-auto max-w-[640px]" : "max-w-[640px]"}`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-text-primary/15">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left hover:bg-bg-secondary/50 transition-colors px-2"
        aria-expanded={open}
      >
        <span className="flex items-start gap-4 flex-1">
          <span className="font-inter text-main text-sm md:text-base font-medium mt-0.5 shrink-0">
            Q.{String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-text-primary text-sm md:text-base font-medium">{q}</span>
        </span>
        <span className="shrink-0 text-main">
          {open ? <Minus className="w-5 h-5" strokeWidth={1.5} /> : <Plus className="w-5 h-5" strokeWidth={1.5} />}
        </span>
      </button>
      {open && (
        <div className="pl-[calc(1rem+3.5em)] pr-2 pb-6 -mt-1">
          <p className="text-text-secondary text-sm leading-[1.9] max-w-[760px]">{a}</p>
        </div>
      )}
    </div>
  );
}

// 写真ブリージング
function BreathingImage({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <section className="relative overflow-hidden">
      <div className="relative aspect-[21/9] w-full bg-text-primary">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="100vw"
          style={{ filter: "saturate(0.92) contrast(1.04)" }}
        />
        {caption ? (
          <div className="absolute inset-0 flex items-end pointer-events-none">
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
            />
            <div className="relative max-w-[1400px] mx-auto px-[var(--page-px)] pb-10 md:pb-14 w-full">
              <p
                className="text-white max-w-[600px] leading-[1.55] tracking-[0.04em]"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(18px, 2vw, 28px)",
                  textShadow: "0 2px 16px rgba(0,0,0,0.5)",
                }}
              >
                {caption}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 本体
// ─────────────────────────────────────────────

export default function MoneyFullSection() {
  const r1 = useScrollIn<HTMLDivElement>();
  const r2 = useScrollIn<HTMLDivElement>();
  const r3 = useScrollIn<HTMLDivElement>();
  const r4 = useScrollIn<HTMLDivElement>();
  const r5 = useScrollIn<HTMLDivElement>();
  const r6 = useScrollIn<HTMLDivElement>();
  const r7 = useScrollIn<HTMLDivElement>();
  const r8 = useScrollIn<HTMLDivElement>();

  return (
    <>
      {/* ============================================================
          1. ぜんぶで、いくら？  — 5つの財布 + 比率バー
          ============================================================ */}
      <section id="ch-breakdown" className="relative bg-bg-primary py-[var(--section-py)] scroll-mt-20">
        <div ref={r1} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
          <ChapterHeader
            no="01"
            question={<>家づくりは、<br />ぜんぶでいくらですか？</>}
            lead="桁の見当ではなく、内訳から。やまとは「含まれるもの」と「別途になるもの」を、最初の打ち合わせで全部出します。"
          />

          {/* 比率バー(視覚化) */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-baseline justify-between mb-4 gap-4">
              <p className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold">
                Typical proportion · 一般的な比率
              </p>
              <p className="font-inter text-[10px] md:text-[11px] text-text-secondary tracking-[0.16em]">
                4,500〜5,000万円規模(目安)
              </p>
            </div>
            <div className="flex h-12 md:h-14 w-full overflow-hidden border border-text-primary/15">
              {BUCKETS.map((b) => (
                <div
                  key={b.no}
                  className="relative group flex items-center justify-center transition-opacity hover:opacity-90"
                  style={{ width: `${b.pct}%`, background: b.color }}
                  title={`${b.label} 約${b.pct}%`}
                >
                  <span className="font-inter text-white text-[10px] md:text-[11px] font-bold tracking-[0.1em] truncate px-1">
                    {b.pct >= 5 ? `${b.pct}%` : ""}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
              {BUCKETS.map((b) => (
                <div key={b.no} className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3" style={{ background: b.color }} />
                  <span className="text-[11px] md:text-[12px] text-text-secondary">{b.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5つの詳細(編集誌的フラット縦列) */}
          <div className="border-t border-text-primary/15">
            {BUCKETS.map((b) => (
              <article
                key={b.no}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_minmax(0,260px)] gap-6 md:gap-10 border-b border-text-primary/15 py-7 md:py-9 transition-colors hover:bg-bg-warm/40"
              >
                <div className="flex items-baseline gap-2">
                  <span className="font-oswald text-text-secondary tracking-[-0.02em] text-3xl md:text-4xl" style={{ fontWeight: 300 }}>
                    {b.no}
                  </span>
                  <span
                    className="hidden md:inline-block w-3 h-3 self-center"
                    style={{ background: b.color }}
                    aria-hidden
                  />
                </div>
                <div>
                  <p className="text-text-primary text-[clamp(18px,1.7vw,22px)] font-medium tracking-[0.04em] leading-[1.5]">
                    {b.label}
                  </p>
                  <p className="mt-3 text-[13px] md:text-[14px] leading-[1.95] text-text-secondary max-w-[640px]">
                    {b.body}
                  </p>
                  <p className="mt-3 font-inter text-[10px] md:text-[11px] tracking-[0.16em] text-text-secondary/80">
                    {b.yamato}
                  </p>
                </div>
                <div className="md:text-right">
                  <div className="flex md:justify-end items-baseline gap-1.5">
                    <span
                      className="font-oswald tabular-nums leading-[0.85] text-text-primary"
                      style={{
                        fontWeight: 300,
                        fontSize: "clamp(34px, 3.6vw, 52px)",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {b.amount}
                    </span>
                    {b.unit ? (
                      <span className="text-text-secondary text-sm md:text-base font-medium">{b.unit}</span>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* やまと負担 callout — lime warm */}
          <div
            className="mt-12 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-10 items-center px-6 md:px-10 py-8 md:py-10 border"
            style={{ background: "#EDF2D5", borderColor: "rgba(72,107,0,0.2)" }}
          >
            <ShieldCheck className="h-7 w-7 shrink-0" style={{ color: FOREST }} strokeWidth={1.6} />
            <div>
              <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-bold mb-2" style={{ color: FOREST }}>
                Yamato pays for you · やまとが負担
              </p>
              <p className="text-text-primary text-[clamp(16px,1.6vw,22px)] font-medium leading-[1.55]">
                地盤改良費(最大150万円)・仲介手数料・契約後の追加見積。これらは、当社が負担します。
              </p>
              <p className="mt-2 text-[12px] md:text-[13px] leading-[1.85] text-text-primary/75 max-w-[760px]">
                業界では契約後の増額が8割で発生すると言われますが、やまとは「最初の見積もりから変わらない」を原則にしています。
              </p>
            </div>
            <span
              className="font-inter text-[10px] tracking-[0.18em] uppercase font-bold whitespace-nowrap"
              style={{ color: FOREST }}
            >
              No hidden cost
            </span>
          </div>
        </div>
      </section>

      {/* === BREATHING #1 === */}
      <BreathingImage
        src="/images/newsozai/exterior-terrace-01.webp"
        alt="テラスからの暮らし"
        caption="数字の先にある暮らしを、いつも一緒に見ます。"
      />

      {/* ============================================================
          2. 月々、いくらですか？  — 想定モデル + 早見表
          ============================================================ */}
      <section id="ch-monthly" className="relative bg-bg-primary py-[var(--section-py)] scroll-mt-20">
        <div ref={r2} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
          <ChapterHeader
            no="02"
            question={<>月々のお支払いは、<br />どれくらいですか？</>}
            lead="「いくら借りられるか」より「いくらなら返せるか」。ご家族の暮らしに合う額を、具体的に。"
          />

          {/* 想定モデル(主役) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-px bg-text-primary/10 border border-text-primary/15">
            {/* Left: モデル */}
            <div className="bg-[#FAF8F3] p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: ACCENT }}
                  aria-hidden
                />
                <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-text-secondary font-bold">
                  Model Family · 想定モデル
                </p>
              </div>
              <p className="text-text-primary text-[clamp(18px,1.8vw,24px)] font-medium leading-[1.55]">
                {MODEL_FAMILY.who}
                <br />
                <span className="text-text-secondary text-[clamp(14px,1.2vw,17px)] font-normal">
                  {MODEL_FAMILY.income}
                </span>
              </p>

              <div className="mt-10 flex items-baseline gap-3 flex-wrap">
                <span className="font-inter text-[11px] tracking-[0.18em] uppercase text-text-secondary font-bold">
                  借入 {MODEL_FAMILY.borrow}
                </span>
                <span className="text-text-secondary/50">→</span>
                <span className="font-inter text-[11px] tracking-[0.18em] uppercase text-text-secondary font-bold">
                  月々
                </span>
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span
                  className="font-oswald tabular-nums leading-[0.85] text-text-primary"
                  style={{
                    fontWeight: 300,
                    fontSize: "clamp(72px, 11vw, 160px)",
                    letterSpacing: "-0.04em",
                    color: FOREST,
                  }}
                >
                  {MODEL_FAMILY.monthly}
                </span>
                <span className="text-text-primary text-xl md:text-2xl font-medium">万円</span>
                <span className="text-text-secondary text-sm md:text-base">/月</span>
              </div>
              <p className="font-inter text-[11px] tracking-[0.16em] text-text-secondary mt-2">
                {MODEL_FAMILY.rate}
              </p>

              <p className="mt-8 text-[13px] md:text-[14px] leading-[1.95] text-text-secondary max-w-[480px]">
                {MODEL_FAMILY.comment}
              </p>
            </div>

            {/* Right: 早見表(コンパクト) */}
            <div className="bg-white p-6 md:p-8">
              <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-text-secondary font-bold mb-1">
                Quick Reference · 早見表
              </p>
              <p className="text-[12px] text-text-secondary mb-6">35年・元利均等・ボーナス払いなし</p>

              <div className="border-t border-text-primary/10">
                <div className="grid grid-cols-[1fr_repeat(3,minmax(0,1fr))] py-2 border-b border-text-primary/10">
                  <span className="font-inter text-[10px] tracking-[0.18em] text-text-secondary">借入</span>
                  {RATE_HEADERS.map((r) => (
                    <span key={r} className="font-inter text-[10px] tracking-[0.18em] text-text-secondary text-center">
                      {r}
                    </span>
                  ))}
                </div>
                {LOAN_TABLE.map((row) => (
                  <div
                    key={row.borrow}
                    className="grid grid-cols-[1fr_repeat(3,minmax(0,1fr))] py-3 md:py-4 border-b border-text-primary/10 last:border-b-0 items-baseline"
                  >
                    <span className="font-oswald text-text-primary tabular-nums" style={{ fontWeight: 400, fontSize: "clamp(14px,1.4vw,18px)" }}>
                      {row.borrow}
                      <span className="text-text-secondary text-[11px] ml-1">万</span>
                    </span>
                    {row.monthly.map((m, j) => (
                      <span key={j} className="font-oswald text-text-primary tabular-nums text-center" style={{ fontWeight: 400, fontSize: "clamp(15px,1.5vw,19px)" }}>
                        {m}
                        <span className="text-text-secondary text-[10px] ml-0.5">万</span>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-6 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary max-w-[860px]">
            ※ 上記は試算の一例です。実際の金利は金融機関・商品・審査時期により異なります。月々のお支払いには固定資産税・修繕費が別途かかります。
          </p>

          {/* 3つのルール */}
          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {RULES.map((r, i) => (
              <div key={r.label} className="border-t-[3px] border-text-primary/85 pt-6">
                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    className="font-oswald tabular-nums leading-none text-text-secondary/40"
                    style={{ fontWeight: 300, fontSize: "clamp(28px,2.6vw,40px)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-inter text-[10px] tracking-[0.28em] uppercase text-main font-bold">
                    {r.label}
                  </span>
                </div>
                <p className="text-text-primary text-[clamp(16px,1.4vw,20px)] font-medium leading-[1.55] tracking-[0.03em]">
                  {r.t}
                </p>
                <p className="mt-3 text-[13px] leading-[1.9] text-text-secondary">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. 賃貸と、何が違いますか?
          ============================================================ */}
      <section id="ch-vs" className="relative bg-[#FAF8F3] py-[var(--section-py)] scroll-mt-20">
        <div ref={r3} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
          <ChapterHeader
            no="03"
            question={<>賃貸と、<br />本当は何が違いますか？</>}
            lead="やまとの京プランと奈良市八田町等のお手頃な土地を組み合わせると、月々8.5万円ほどに収まる方が多くいらっしゃいます。同じ月8.5万円で30年、何が残るか。"
          />

          {/* 大きな2カラム比較 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-px md:bg-text-primary/10 md:border md:border-text-primary/15">
            {/* 賃貸 */}
            <div className="bg-white p-8 md:p-12 border md:border-0 border-text-primary/15">
              <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-text-secondary font-bold mb-4">
                Rent · 賃貸
              </p>
              <p
                className="text-text-primary leading-[1.2] tracking-[-0.02em]"
                style={{ fontWeight: 500, fontSize: "clamp(28px, 3.4vw, 48px)" }}
              >
                月8.5万円
              </p>
              <p className="text-text-secondary text-sm mt-2">の家賃を30年</p>
              <div className="mt-8 pt-6 border-t border-text-primary/10">
                <p className="font-inter text-[10px] tracking-[0.18em] uppercase text-text-secondary font-bold">
                  After 30 years
                </p>
                <p
                  className="mt-3 font-oswald tabular-nums text-text-primary"
                  style={{ fontWeight: 300, fontSize: "clamp(40px, 4.4vw, 64px)", letterSpacing: "-0.02em" }}
                >
                  3,060
                  <span className="text-text-secondary text-base ml-1">万円の支出</span>
                </p>
                <p className="mt-3 text-text-secondary text-[13px] leading-[1.85]">
                  資産は、残りません。<br />老後も家賃が続きます。
                </p>
              </div>
            </div>
            {/* 持家 */}
            <div className="p-8 md:p-12 border md:border-0 border-text-primary/15" style={{ background: "#EDF2D5" }}>
              <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-bold mb-4" style={{ color: FOREST }}>
                Own · 持家
              </p>
              <p
                className="text-text-primary leading-[1.2] tracking-[-0.02em]"
                style={{ fontWeight: 500, fontSize: "clamp(28px, 3.4vw, 48px)" }}
              >
                月8.5万円相当
              </p>
              <p className="text-text-primary/70 text-sm mt-2">のローン(借入3,000万円)を30年</p>
              <div className="mt-8 pt-6 border-t" style={{ borderColor: "rgba(72,107,0,0.2)" }}>
                <p className="font-inter text-[10px] tracking-[0.18em] uppercase font-bold" style={{ color: FOREST }}>
                  After 30 years
                </p>
                <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                  <span
                    className="font-oswald tabular-nums"
                    style={{ fontWeight: 300, fontSize: "clamp(40px, 4.4vw, 64px)", letterSpacing: "-0.02em", color: FOREST }}
                  >
                    約3,150
                  </span>
                  <span className="text-text-primary/85 text-base">万円の支出</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" style={{ color: FOREST }} strokeWidth={2} />
                  <p className="text-[13px] font-medium" style={{ color: FOREST }}>
                    家が、資産として残る。
                  </p>
                </div>
                <p className="mt-3 text-text-primary/75 text-[13px] leading-[1.85]">
                  完済後の住居費は、固定資産税と修繕費のみ。<br />
                  老後の家計が、楽になります。
                </p>
              </div>
            </div>
          </div>

          {/* やまと現実シナリオ補足 */}
          <div
            className="mt-8 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-6 items-start px-6 md:px-8 py-5 md:py-6 border"
            style={{ background: "#EDF2D5", borderColor: "rgba(72,107,0,0.2)" }}
          >
            <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase font-bold whitespace-nowrap" style={{ color: FOREST }}>
              Yamato case
            </p>
            <p className="text-text-primary text-[13px] md:text-[14px] leading-[1.95]">
              想定: 京プラン
              <span className="font-oswald tabular-nums mx-1.5" style={{ fontWeight: 400 }}>2,280</span>万円 + 奈良市八田町等のお手頃な土地
              <span className="font-oswald tabular-nums mx-1.5" style={{ fontWeight: 400 }}>800</span>万円前後 +
              諸費用 → 借入
              <span className="font-oswald tabular-nums mx-1.5" style={{ fontWeight: 400 }}>3,000</span>万円・金利1.0%・35年で月々
              <span className="font-oswald tabular-nums mx-1.5" style={{ fontWeight: 400 }}>8.5</span>万円ほど。
              ご家族の状況・土地のエリアによって、もっと抑えられる場合もあります。
            </p>
          </div>

          {/* 4軸比較表 */}
          <div className="mt-10 md:mt-12 overflow-hidden border border-text-primary/15 bg-white">
            {COMPARE.map((row, i) => (
              <div
                key={row.axis}
                className={`grid grid-cols-[minmax(120px,1fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-text-primary/10 last:border-b-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-bg-secondary/15"
                }`}
              >
                <div className="px-4 py-4 md:px-6 md:py-5 text-[13px] md:text-sm text-text-secondary font-medium">
                  {row.axis}
                </div>
                <div className="border-l border-text-primary/10 px-3 py-4 md:px-5 md:py-5 text-center text-[13px] md:text-sm text-text-secondary">
                  {row.rent}
                </div>
                <div
                  className={`border-l border-text-primary/10 px-3 py-4 md:px-5 md:py-5 text-center text-[13px] md:text-sm font-medium ${
                    row.positive ? "text-text-primary" : "text-text-primary"
                  }`}
                  style={{ background: "rgba(162,197,35,0.08)" }}
                >
                  {row.own}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary max-w-[860px]">
            ※ 持家には固定資産税(年10〜15万円目安)・修繕費(10〜15年で50〜100万円目安)が別途かかります。長期で見ると、それでも「資産として残る」「老後の住居費が下がる」ことが大きな違いになります。
          </p>
        </div>
      </section>

      {/* ============================================================
          4. ローンと制度。3分でわかります。
          ============================================================ */}
      <section id="ch-loan" className="relative bg-bg-primary py-[var(--section-py)] scroll-mt-20">
        <div ref={r4} className="relative mx-auto max-w-[1320px] px-[var(--page-px)] scroll-in">
          <ChapterHeader
            no="04"
            question={<>ローンの種類と、<br />使える制度は？</>}
            lead="変動か固定かだけでは決まりません。控除制度・補助金・贈与の特例まで含めて、ご家族の状況に合うかたちを考えます。"
          />

          {/* 3タイプ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/15">
            {LOAN_TYPES.map((t) => (
              <article key={t.name} className="bg-white p-7 md:p-9 flex flex-col">
                <p className="text-text-primary text-[clamp(17px,1.5vw,21px)] font-medium tracking-[0.04em] leading-[1.5]">
                  {t.name}
                </p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span
                    className="font-oswald tabular-nums leading-none"
                    style={{ fontWeight: 300, fontSize: "clamp(40px, 4.4vw, 64px)", color: FOREST, letterSpacing: "-0.02em" }}
                  >
                    {t.rate}
                  </span>
                  <span className="text-text-secondary text-sm font-medium">%</span>
                </div>
                <p className="font-inter text-[10px] tracking-[0.16em] uppercase text-text-secondary mt-1">
                  Reference rate · 2026
                </p>

                <dl className="mt-7 space-y-4 text-[13px] leading-[1.85]">
                  <div>
                    <dt className="font-inter text-[10px] tracking-[0.18em] uppercase text-main font-bold">Pros</dt>
                    <dd className="mt-1 text-text-primary">{t.pros}</dd>
                  </div>
                  <div>
                    <dt className="font-inter text-[10px] tracking-[0.18em] uppercase text-text-secondary font-bold">Cons</dt>
                    <dd className="mt-1 text-text-primary">{t.cons}</dd>
                  </div>
                  <div className="border-t border-text-primary/10 pt-4">
                    <dt className="font-inter text-[10px] tracking-[0.18em] uppercase text-text-secondary font-bold">Best for</dt>
                    <dd className="mt-1 text-text-secondary">{t.when}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          {/* 制度 */}
          <div className="mt-20 md:mt-28">
            <div className="flex items-baseline justify-between gap-4 mb-10 md:mb-14 border-b border-text-primary/15 pb-6">
              <p className="font-inter text-[11px] md:text-[12px] tracking-[0.28em] uppercase text-text-primary font-bold">
                Public Support · 制度・補助金
              </p>
              <p className="font-inter text-[10px] tracking-[0.18em] text-text-secondary">2026 reference</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10">
              {SUPPORTS.map((s, i) => (
                <div key={s.name} className="grid grid-cols-[auto_1fr] gap-x-5">
                  <div className="font-oswald text-text-secondary tracking-[-0.02em] text-2xl md:text-3xl" style={{ fontWeight: 300 }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <p className="text-text-primary text-[15px] md:text-base font-medium leading-[1.6]">
                      {s.name}
                      {s.sub ? <span className="text-text-secondary text-[12px] md:text-[13px] font-normal ml-2">{s.sub}</span> : null}
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.95] text-text-secondary">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary max-w-[860px]">
              ※ 各制度の要件・上限額・申請期間は年度ごとに変わります。最新の条件はご相談時にご案内します。
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. つなぎ融資って、何？
          ============================================================ */}
      <section id="ch-bridge" className="relative bg-[#FAF8F3] py-[var(--section-py)] scroll-mt-20">
        <div ref={r5} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
          <ChapterHeader
            no="05"
            question={<>「つなぎ融資」って、<br />何ですか？</>}
            lead="土地と建物の段取り次第で、ローンの利息は変わります。やまとは段取りの一本化で、負担を抑えられる場合があります。"
          />

          {/* タイムライン図 */}
          <div className="bg-white border border-text-primary/15 p-8 md:p-12">
            <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-text-secondary font-bold mb-8">
              Timeline · 段取りで変わる利息
            </p>

            {/* 他社パターン */}
            <div className="mb-10">
              <p className="text-text-primary text-[13px] md:text-sm font-medium mb-4">
                ❶ 土地と建物を別々に進めた場合
              </p>
              <div className="relative h-12 md:h-16 w-full bg-bg-secondary/40 border border-text-primary/10 flex items-center">
                <div className="h-full w-[35%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium tracking-[0.08em]" style={{ background: "#7D4427" }}>
                  土地購入
                </div>
                <div className="h-full w-[15%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium tracking-[0.08em] bg-text-primary/60">
                  つなぎ融資 ⚠
                </div>
                <div className="h-full w-[50%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium tracking-[0.08em]" style={{ background: FOREST }}>
                  建物着工 → 完成
                </div>
              </div>
              <p className="mt-3 text-[12px] text-text-secondary">
                土地購入から建物完成までの間、つなぎ融資の利息と手数料が上乗せされます。
              </p>
            </div>

            {/* やまとパターン */}
            <div>
              <p className="font-medium mb-4 text-[13px] md:text-sm" style={{ color: FOREST }}>
                ❷ やまと: 土地と建物をまとめて進めた場合
              </p>
              <div className="relative h-12 md:h-16 w-full border flex items-center" style={{ background: "#EDF2D5", borderColor: "rgba(72,107,0,0.25)" }}>
                <div className="h-full w-[40%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium tracking-[0.08em]" style={{ background: "#7D4427" }}>
                  土地・建物を同時に
                </div>
                <div className="h-full w-[60%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium tracking-[0.08em]" style={{ background: FOREST }}>
                  建物着工 → 完成
                </div>
              </div>
              <p className="mt-3 text-[12px] leading-[1.85]" style={{ color: FOREST }}>
                ✓ つなぎ融資が不要になったり、期間を短くできたりするケースがあります。
              </p>
            </div>

            <p className="mt-8 pt-6 border-t border-text-primary/10 text-[12px] leading-[1.85] text-text-secondary">
              やまとは奈良・京都での土地分譲の実績があり、土地と建物の段取りを一本化できる案件が多くあります。内容は金融機関の条件や案件ごとに異なります。
            </p>
          </div>
        </div>
      </section>

      {/* === BREATHING #2 === */}
      <BreathingImage
        src="/images/works/case2-living.webp"
        alt="家族の暮らし"
        caption="家計を整えると、暮らしが軽くなります。"
      />

      {/* ============================================================
          6. FPって、誰のために動く人？  — 温かい光へ転換
          ============================================================ */}
      <section id="ch-fp" className="relative bg-bg-warm py-[var(--section-py)] scroll-mt-20">
        <div ref={r6} className="relative mx-auto max-w-[1320px] px-[var(--page-px)] scroll-in">
          <ChapterHeader
            no="06"
            question={<>FPって、<br />誰のために動く人ですか？</>}
            lead="ハウスメーカーや不動産会社が紹介するFPは、家を売ることが前提になりがちです。やまとが提携しているFPには、ご家族のライフプランを軸に、率直にお話しいただくようお願いしています。"
          />

          {/* 3つの約束 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FP_PROMISES.map((p, i) => {
              const Icon = p.icon;
              return (
                <article
                  key={p.title}
                  className="bg-white border border-text-primary/10 p-7 md:p-9 transition-shadow hover:shadow-[0_18px_40px_-24px_rgba(43,43,43,0.18)]"
                >
                  <div className="flex items-baseline justify-between mb-6">
                    <span
                      className="font-oswald tabular-nums leading-none"
                      style={{ fontWeight: 300, fontSize: "clamp(36px, 3.6vw, 52px)", color: FOREST, letterSpacing: "-0.02em" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-5 w-5" style={{ color: FOREST }} strokeWidth={1.5} />
                  </div>
                  <p className="font-inter text-[10px] tracking-[0.22em] uppercase text-text-secondary font-bold mb-3">
                    Promise
                  </p>
                  <p className="text-text-primary text-[clamp(16px,1.4vw,20px)] font-medium leading-[1.55] tracking-[0.03em]">
                    {p.title}
                  </p>
                  <p className="mt-4 text-[13px] leading-[1.95] text-text-secondary">{p.body}</p>
                </article>
              );
            })}
          </div>

          {/* やまと社内資格 */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 md:gap-8 items-start border-t border-text-primary/15 pt-8">
            <p className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold">
              In-house Advisor
            </p>
            <div>
              <p className="text-text-primary text-[clamp(15px,1.3vw,19px)] font-medium leading-[1.6]">
                社内にも、住宅ローンアドバイザー資格保有者がいます。
              </p>
              <p className="mt-2 text-[13px] md:text-[14px] leading-[1.95] text-text-secondary max-w-[760px]">
                大和信用金庫・奈良中央信用金庫・南都銀行・りそな銀行など、複数の金融機関の中からご状況に合うものをご一緒に整理します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. はじめての方へ。ご相談のながれ。
          ============================================================ */}
      <section id="ch-flow" className="relative bg-bg-primary py-[var(--section-py)] scroll-mt-20">
        <div ref={r7} className="relative mx-auto max-w-[1320px] px-[var(--page-px)] scroll-in">
          <ChapterHeader
            no="07"
            question={<>はじめての方は、<br />何を持っていけばいいですか？</>}
            lead="持参不要です。資料はお揃いでなくて構いません。気がかりなことを一つずつ整理する時間です。お電話一本でご予約いただけます。"
          />

          {/* 3ステップ — 写真付き横3列 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {FLOW_STEPS.map((s) => (
              <article key={s.k} className="flex flex-col">
                <figure className="relative aspect-[4/3] w-full overflow-hidden border border-text-primary/10">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </figure>
                <div className="pt-6 md:pt-7 border-t-[3px] border-text-primary mt-6">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="font-oswald tabular-nums leading-none text-text-primary"
                      style={{ fontWeight: 300, fontSize: "clamp(40px, 4vw, 56px)", letterSpacing: "-0.02em" }}
                    >
                      {s.k}
                    </span>
                    <span className="font-inter text-[10px] tracking-[0.22em] uppercase text-text-secondary font-bold">
                      Step
                    </span>
                  </div>
                  <p className="text-text-primary text-[clamp(17px,1.5vw,21px)] font-medium leading-[1.5] tracking-[0.04em]">
                    {s.title}
                  </p>
                  <p className="mt-4 text-[13px] md:text-[14px] leading-[1.95] text-text-secondary">
                    {s.body}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* インラインCTA */}
          <div className="mt-14 md:mt-20 flex flex-col sm:flex-row justify-center gap-4">
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

      {/* ============================================================
          8. よくある不安
          ============================================================ */}
      <section id="ch-faq" className="relative bg-[#FAF8F3] py-[var(--section-py)] scroll-mt-20">
        <div ref={r8} className="mx-auto max-w-[1000px] px-[var(--page-px)] scroll-in">
          <ChapterHeader
            no="08"
            question={<>「払えなくなったら」の<br />不安に、先にお答えします。</>}
            lead="ご相談の前に、よくお寄せいただく質問をまとめました。書ききれないことは、ご来場時にお気軽にお尋ねください。"
            align="center"
          />

          <div>
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
