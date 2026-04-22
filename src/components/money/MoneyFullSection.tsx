"use client";

import Image from "next/image";
import {
  Wallet,
  Home,
  Hammer,
  FileText,
  Truck,
  ShieldCheck,
  Check,
  Plus,
  Minus,
  HeartHandshake,
  ClipboardList,
  BookOpen,
  Scale,
  Landmark,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  MoneyFullSection — /money 完全版（2026-04-22 リビルド）
  ------------------------------------------------------------
  消費者心理5段階モデル（関心→共感→納得→確信→行動）に沿って
  TOPから引き剥がした資金計画を、独立ページで深く語る。

  構成:
    1. 総額の見える化（5つの財布の内訳）
    2. 月々シミュレーション早見表（静的）
    3. 賃貸 vs 持家（同じ月額で残るもの）
    4. 住宅ローンの選び方（変動/固定 + 控除/補助金）
    5. つなぎ融資（旧コンテンツを継承拡張）
    6. 提携FPの中立性宣言（HM最大の不信ポイントを正面突破）
    7. 初回相談の流れ（旧3ステップを継承拡張）
    8. よくある不安 Q&A

  心理トリガー:
    - 透明性アンカリング: 内訳を全開示し、他社の不透明な見積を相対化
    - 損失回避: 「払えなくなる家を売らない」誠実宣言
    - 権威の中立化: 中立FP・住宅ローンアドバイザー資格で HM=売る側 を逆手に
    - ダークパターン排除: 偽希少性・Confirmshaming・隠れコスト誘導を一切使わない
*/

// ─────────────────────────────────────────────
// データ定義
// ─────────────────────────────────────────────

const COST_BUCKETS = [
  {
    icon: Home,
    label: "建物本体",
    yamato: "2,280〜2,480万円",
    detail: "京・風・花の3プラン。標準仕様で揃えています。",
    note: "やまと: 京 2,280万円〜（税込）",
  },
  {
    icon: Hammer,
    label: "付帯工事",
    yamato: "建物価格に含む",
    detail: "地盤改良費(最大150万円)・仲介手数料は当社が負担します。",
    note: "他社目安: 別途 100〜300万円",
  },
  {
    icon: Landmark,
    label: "土地代",
    yamato: "別途",
    detail: "奈良・京都の自社分譲地のほか、ご希望のエリアもご一緒に探します。",
    note: "目安: 1,000〜2,500万円(エリアによる)",
  },
  {
    icon: FileText,
    label: "諸費用",
    yamato: "別途",
    detail: "登記・印紙税・ローン手数料・火災保険等。総額の5〜10%が目安です。",
    note: "目安: 200〜400万円",
  },
  {
    icon: Truck,
    label: "引越し・家具・カーテン",
    yamato: "別途",
    detail: "新居でのスタートに必要な分。最初から詰め込まず、暮らしながら整えるご家族も多いです。",
    note: "目安: 50〜150万円",
  },
] as const;

// 月々返済額早見表(元利均等・35年返済・ボーナス払いなし)
// PMT計算: P * r(1+r)^n / ((1+r)^n - 1)
const RATE_HEADERS = ["1.0%", "1.5%", "2.0%"] as const;
const LOAN_TABLE = [
  { borrow: "2,500万円", monthly: ["7.1万円", "7.7万円", "8.3万円"] },
  { borrow: "3,000万円", monthly: ["8.5万円", "9.2万円", "9.9万円"] },
  { borrow: "3,500万円", monthly: ["9.9万円", "10.7万円", "11.6万円"] },
  { borrow: "4,000万円", monthly: ["11.3万円", "12.2万円", "13.3万円"] },
] as const;

const RENT_VS_OWN = [
  {
    axis: "30年後の累計支出",
    rent: "3,600万円",
    own: "約3,700万円",
    note: "ローン金利込み・概算",
  },
  {
    axis: "30年後に残るもの",
    rent: "なし",
    own: "持ち家（資産として残る）",
    note: "—",
  },
  {
    axis: "老後の住居費",
    rent: "引き続き家賃が発生",
    own: "完済後は固定資産税と修繕費のみ",
    note: "—",
  },
  {
    axis: "間取り・設備",
    rent: "原則そのまま",
    own: "家族の変化に合わせて変えられる",
    note: "—",
  },
] as const;

const LOAN_TYPES = [
  {
    name: "変動金利型",
    rate: "0.4〜0.7%（2026年時点)",
    pros: "金利が低い。総返済額を抑えやすい。",
    cons: "金利が上昇すると、月々の支払いが増える可能性。",
    when: "繰上げ返済の余力がある／返済期間が短めの方に。",
  },
  {
    name: "全期間固定型（フラット35等）",
    rate: "1.7〜2.0%（2026年時点)",
    pros: "完済まで月々の額が変わらない。家計設計が立てやすい。",
    cons: "変動より金利が高め。総返済額は大きくなる。",
    when: "教育費・老後資金とのバランスを最優先する方に。",
  },
  {
    name: "固定期間選択型",
    rate: "1.0〜1.5%（10年固定の例)",
    pros: "一定期間の金利を確定でき、変動と固定の中間。",
    cons: "固定期間終了後の金利が読めない。",
    when: "教育費のピークに合わせて期間を区切りたい方に。",
  },
] as const;

const SUPPORTS = [
  {
    name: "住宅ローン控除（住宅ローン減税）",
    body: "年末ローン残高の0.7%が、最大13年間にわたり所得税(住民税)から控除されます。新築の長期優良住宅・ZEH水準なら控除上限が拡大します。",
  },
  {
    name: "子育てエコホーム支援事業",
    body: "省エネ基準を満たす新築住宅で、世帯条件により最大100万円の補助。年度ごとに予算枠があるため、早めの確認をおすすめします。",
  },
  {
    name: "GX志向型住宅補助",
    body: "高断熱・高効率設備を備えた住宅向けの補助制度。条件と申請時期は年度ごとに変わります。",
  },
  {
    name: "贈与税の非課税特例",
    body: "親・祖父母からの住宅取得資金の贈与に、一定額まで非課税枠があります。条件は時期により変わります。",
  },
] as const;

const FP_NEUTRALITY = [
  {
    title: "売り場のFPではなく、ご家族のFPに。",
    body: "ハウスメーカー直営のFPは、家を売ることが前提です。やまとは、提携FPに「家を建てない選択を含めて、率直に話してほしい」とお願いしています。",
  },
  {
    title: "ご相談料は、いただきません。",
    body: "ご家族から相談料はお預かりしません。やまとと提携FPの間で取り決めをし、無理のない範囲でお話しできる体制にしています。",
  },
  {
    title: "ご紹介の押しつけは、しません。",
    body: "FPと話したあとに「やっぱり今は建てない」とお決めになっても、それで構いません。あとから連絡を重ねるようなことは、いたしません。",
  },
] as const;

const FLOW_STEPS = [
  {
    k: "01",
    title: "いまの暮らしと、時期のめど",
    body: "ご家族の人数や通勤・通学、引っ越しをいつ頃に考えているか。金額の前に、生活の前提をそろえます。",
    Icon: HeartHandshake,
  },
  {
    k: "02",
    title: "費用のかたちを、資料でたどる",
    body: "図や資料を見ながら、土地・建物・諸費用の全体像をざっくり追います。細かい確定は、このあとの段階で進められます。",
    Icon: BookOpen,
  },
  {
    k: "03",
    title: "帰るまでに、次の一手を決める",
    body: "持ち帰り資料、家で話し合っておきたいこと、次の面談や現地のご案内など、次に何をするかをはっきりさせます。",
    Icon: ClipboardList,
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.18em]">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[clamp(24px,3.4vw,40px)] text-text-primary leading-[1.45] tracking-[0.04em] font-light"
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </h2>
  );
}

function SectionLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 max-w-[680px] text-[clamp(14px,1.05vw,16px)] leading-[1.95] text-text-secondary">
      {children}
    </p>
  );
}

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left hover:bg-bg-secondary/40 transition-colors px-2"
        aria-expanded={open}
      >
        <span className="flex items-start gap-4 flex-1">
          <span
            className="text-main text-sm md:text-base font-medium mt-0.5 shrink-0"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            Q.{String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-text-primary text-sm md:text-base font-medium">
            {q}
          </span>
        </span>
        <span className="shrink-0 text-main">
          {open ? (
            <Minus className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Plus className="w-5 h-5" strokeWidth={1.5} />
          )}
        </span>
      </button>
      {open && (
        <div className="pl-[calc(1rem+3.5em)] pr-2 pb-6 -mt-1">
          <p className="text-text-secondary text-sm leading-[1.9] max-w-[760px]">
            {a}
          </p>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// 本体
// ─────────────────────────────────────────────

export default function MoneyFullSection() {
  const breakdownRef = useScrollIn<HTMLDivElement>();
  const simRef = useScrollIn<HTMLDivElement>();
  const compareRef = useScrollIn<HTMLDivElement>();
  const loanRef = useScrollIn<HTMLDivElement>();
  const tsunagiRef = useScrollIn<HTMLDivElement>();
  const fpRef = useScrollIn<HTMLDivElement>();
  const flowRef = useScrollIn<HTMLDivElement>();
  const faqRef = useScrollIn<HTMLDivElement>();

  return (
    <>
      {/* ============================================================
          1. 総額の見える化 — 透明性アンカリング
          ============================================================ */}
      <section className="relative bg-bg-primary py-[var(--section-py)]">
        <div ref={breakdownRef} className="mx-auto max-w-[1180px] px-[var(--page-px)] scroll-in">
          <SectionLabel>BREAKDOWN — 総額の見える化</SectionLabel>
          <SectionTitle>家づくりの総額には、5つの財布があります。</SectionTitle>
          <SectionLead>
            「ぜんぶで、いくらかかるのか」。最初に必要なのは、桁の見当ではなく、内訳です。
            やまとは、含まれるもの・別途になるものを、最初の打ち合わせで明らかにします。
          </SectionLead>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {COST_BUCKETS.map((b) => {
              const Icon = b.icon;
              return (
                <article
                  key={b.label}
                  className="rounded-2xl border border-border bg-white p-6 shadow-[0_18px_52px_-32px_rgba(43,43,43,0.18)]"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main">
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <p className="text-sm font-semibold tracking-[0.06em] text-text-primary">
                      {b.label}
                    </p>
                  </div>
                  <p
                    className="mt-4 text-[clamp(18px,1.7vw,22px)] font-semibold leading-[1.55] text-text-primary"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {b.yamato}
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.9] text-text-secondary">
                    {b.detail}
                  </p>
                  <p className="mt-3 text-[11px] leading-[1.7] text-text-secondary/80 border-t border-border pt-3">
                    {b.note}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-main/20 bg-main/5 p-6 md:p-7">
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-main mt-0.5 shrink-0" strokeWidth={2} />
              <div>
                <p className="text-sm font-semibold text-text-primary tracking-[0.04em]">
                  やまとが負担しているもの。
                </p>
                <p className="mt-2 text-[13px] leading-[1.95] text-text-secondary">
                  地盤改良費（最大150万円）、仲介手数料、契約後の追加見積。これらは当社が負担、もしくは「最初の見積もりから変わらない」を原則にしています。
                  業界では契約後の増額が8割で発生すると言われますが、やまとはそれをしません。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. 月々シミュレーション早見表 — 静的
          ============================================================ */}
      <section className="relative overflow-hidden bg-bg-warm py-[var(--section-py)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_18%_-10%,rgba(125,68,39,0.08),transparent_62%)]"
        />
        <div ref={simRef} className="relative mx-auto max-w-[1100px] px-[var(--page-px)] scroll-in">
          <SectionLabel>SIMULATION — 月々のお支払いの目安</SectionLabel>
          <SectionTitle>いくら借りるかより、いくらなら返せるか。</SectionTitle>
          <SectionLead>
            借入額・返済期間・金利を組み合わせると、月々の支払いの目安が見えてきます。35年返済(元利均等・ボーナス払いなし)で並べました。ご家族の年収・教育費・老後資金との兼ね合いで、無理のない額を探してまいります。
          </SectionLead>

          <div className="mt-10 md:mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_52px_-32px_rgba(43,43,43,0.16)]">
            <div className="grid grid-cols-[minmax(120px,1.2fr)_repeat(3,minmax(0,1fr))] border-b border-border bg-bg-secondary/60">
              <div className="px-4 py-4 md:px-6 md:py-5 text-[11px] font-semibold tracking-[0.16em] text-text-secondary">
                借入額 / 金利
              </div>
              {RATE_HEADERS.map((r) => (
                <div
                  key={r}
                  className="border-l border-border px-3 py-4 md:px-5 md:py-5 text-center text-[11px] font-semibold tracking-[0.16em] text-text-secondary"
                >
                  {r}
                </div>
              ))}
            </div>
            {LOAN_TABLE.map((row, i) => (
              <div
                key={row.borrow}
                className={`grid grid-cols-[minmax(120px,1.2fr)_repeat(3,minmax(0,1fr))] border-b border-border last:border-b-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-bg-secondary/30"
                }`}
              >
                <div className="px-4 py-4 md:px-6 md:py-5 text-[13px] md:text-sm font-medium text-text-primary">
                  {row.borrow}
                </div>
                {row.monthly.map((m, j) => (
                  <div
                    key={j}
                    className="border-l border-border px-3 py-4 md:px-5 md:py-5 text-center"
                  >
                    <span
                      className="text-[15px] md:text-[17px] font-semibold tabular-nums text-text-primary"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {m}
                    </span>
                    <span className="ml-1 text-[10px] text-text-secondary">/月</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-5 text-[11px] leading-[1.85] text-text-secondary max-w-[820px]">
            ※ 返済期間35年・元利均等返済・ボーナス払いなしで試算した目安です。実際の金利は金融機関・商品・審査時期により異なります。月々の支払いには、固定資産税・修繕費が別途かかります。
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">RULE OF THUMB</p>
              <p
                className="mt-3 text-[15px] font-semibold leading-[1.6] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                月々の返済は、年収の20〜25%が目安。
              </p>
              <p className="mt-2 text-[12px] leading-[1.85] text-text-secondary">
                「借りられる額」ではなく「返せる額」で考えると、生活費・教育費を圧迫しません。
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">CHECK</p>
              <p
                className="mt-3 text-[15px] font-semibold leading-[1.6] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                教育費のピークと、返済額のピークを重ねない。
              </p>
              <p className="mt-2 text-[12px] leading-[1.85] text-text-secondary">
                お子様の進学時期に合わせて、繰上げ返済の余地を残す設計をご一緒に考えます。
              </p>
            </div>
            <div className="rounded-xl border border-border bg-white p-5">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">RESERVE</p>
              <p
                className="mt-3 text-[15px] font-semibold leading-[1.6] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                生活防衛費は、3〜6ヶ月分残す。
              </p>
              <p className="mt-2 text-[12px] leading-[1.85] text-text-secondary">
                頭金にすべて充てると、急な出費に対応できなくなります。手元に残す額もご一緒に決めます。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          3. 賃貸 vs 持家 — 同じ月額で残るもの
          ============================================================ */}
      <section className="relative bg-bg-primary py-[var(--section-py)]">
        <div ref={compareRef} className="mx-auto max-w-[1180px] px-[var(--page-px)] scroll-in">
          <SectionLabel>RENT vs OWN — 同じ月10万円で、残るもの</SectionLabel>
          <SectionTitle>払うお金は同じくらい。残るものが、違います。</SectionTitle>
          <SectionLead>
            賃貸と持家、月々の支払額が同じくらいでも、30年後に家計に残るものが変わります。一方で、持家は固定資産税や修繕費もかかります。両方を並べてご覧ください。
          </SectionLead>

          <div className="mt-10 md:mt-12 overflow-hidden rounded-2xl border border-border bg-white shadow-[0_18px_52px_-32px_rgba(43,43,43,0.14)]">
            <div className="grid grid-cols-[minmax(140px,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border bg-bg-secondary/60">
              <div className="px-4 py-4 md:px-6 md:py-5 text-[11px] font-semibold tracking-[0.16em] text-text-secondary">
                くらべる項目
              </div>
              <div className="border-l border-border px-3 py-4 md:px-5 md:py-5 text-center text-[11px] font-semibold tracking-[0.16em] text-text-secondary">
                賃貸 (月10万円)
              </div>
              <div className="border-l border-border bg-main/8 px-3 py-4 md:px-5 md:py-5 text-center text-[11px] font-semibold tracking-[0.16em] text-main">
                持家 (月10万円相当ローン)
              </div>
            </div>
            {RENT_VS_OWN.map((row, i) => (
              <div
                key={row.axis}
                className={`grid grid-cols-[minmax(140px,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-border last:border-b-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-bg-secondary/25"
                }`}
              >
                <div className="px-4 py-4 md:px-6 md:py-5 text-[13px] md:text-sm font-medium text-text-primary">
                  {row.axis}
                </div>
                <div className="flex items-center justify-center border-l border-border px-3 py-4 md:px-5 md:py-5 text-center text-[13px] text-text-secondary">
                  {row.rent}
                </div>
                <div className="flex items-center justify-center gap-2 border-l border-main/20 bg-main/4 px-3 py-4 md:px-5 md:py-5 text-center text-[13px] font-medium text-text-primary">
                  {row.own}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-border bg-bg-warm/50 px-5 py-4">
            <p className="text-[12px] leading-[1.9] text-text-secondary">
              <span className="font-semibold text-text-primary">補足:</span> 持家には固定資産税(年10〜15万円目安)・修繕費(10〜15年で50〜100万円目安)が別途かかります。それでも「資産として残る」「老後の住居費が下がる」点は、家計の長期設計で大きな違いになります。やまとは、ご家族のライフプランに合わせて両方を並べてご説明します。
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          4. 住宅ローンの選び方 — 変動/固定 + 補助金
          ============================================================ */}
      <section className="relative overflow-hidden bg-bg-warm py-[var(--section-py)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(43,43,43,0.015), rgba(43,43,43,0.015) 1px, transparent 1px, transparent 28px)",
          }}
        />
        <div ref={loanRef} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
          <SectionLabel>LOAN DESIGN — ローンの組み方と、使える制度</SectionLabel>
          <SectionTitle>金利のタイプと、控除・補助金。先に整理しておくと安心です。</SectionTitle>
          <SectionLead>
            住宅ローンは「変動か、固定か」だけでは決まりません。控除制度・補助金・贈与の特例まで含めて、ご家族の状況に合うかたちを一緒に考えます。
          </SectionLead>

          <div className="mt-10 md:mt-14 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {LOAN_TYPES.map((t) => (
              <article
                key={t.name}
                className="rounded-2xl border border-border bg-white p-6 md:p-7 shadow-[0_18px_52px_-32px_rgba(43,43,43,0.16)]"
              >
                <p
                  className="text-[clamp(17px,1.6vw,21px)] font-semibold leading-[1.5] text-text-primary"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {t.name}
                </p>
                <p className="mt-2 text-[12px] tracking-[0.08em] text-main font-semibold">
                  {t.rate}
                </p>
                <dl className="mt-5 space-y-3">
                  <div>
                    <dt className="text-[11px] font-semibold tracking-[0.14em] text-text-secondary">向いている点</dt>
                    <dd className="mt-1 text-[13px] leading-[1.85] text-text-primary">{t.pros}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] font-semibold tracking-[0.14em] text-text-secondary">注意したい点</dt>
                    <dd className="mt-1 text-[13px] leading-[1.85] text-text-primary">{t.cons}</dd>
                  </div>
                  <div className="border-t border-border pt-3">
                    <dt className="text-[11px] font-semibold tracking-[0.14em] text-text-secondary">こんなご家族に</dt>
                    <dd className="mt-1 text-[13px] leading-[1.85] text-text-secondary">{t.when}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>

          <div className="mt-12 md:mt-16">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="h-5 w-5 text-main" strokeWidth={1.8} />
              <p className="text-sm font-semibold tracking-[0.08em] text-text-primary">
                使える可能性のある、制度・補助金
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SUPPORTS.map((s) => (
                <div
                  key={s.name}
                  className="rounded-xl border border-border bg-white p-5 md:p-6"
                >
                  <p
                    className="text-[15px] font-semibold leading-[1.55] text-text-primary"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {s.name}
                  </p>
                  <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary">
                    {s.body}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-5 text-[11px] leading-[1.85] text-text-secondary max-w-[820px]">
              ※ 各制度の要件・上限額・申請期間は年度ごとに変わります。最新の条件は、ご相談時に確認のうえご案内します。
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. つなぎ融資 — 既存内容を継承拡張
          ============================================================ */}
      <section className="relative bg-bg-primary py-[var(--section-py)]">
        <div ref={tsunagiRef} className="mx-auto max-w-[1100px] px-[var(--page-px)] scroll-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionLabel>BRIDGE LOAN — つなぎ融資</SectionLabel>
              <SectionTitle>土地と建物の段取りで、利息は変わります。</SectionTitle>
              <SectionLead>
                土地だけを先に購入し、あとから建物資金につなぐ場合、工事までのあいだに「つなぎ融資」が入ることがあります。利息や手数料が上乗せされ、思ったより総額が膨らむ要因になります。
              </SectionLead>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-border bg-white p-6 md:p-8 shadow-[0_18px_52px_-32px_rgba(43,43,43,0.14)]">
                <div className="flex items-start gap-3">
                  <Wallet className="h-5 w-5 text-main mt-0.5" strokeWidth={1.6} />
                  <div>
                    <p
                      className="text-[clamp(17px,1.6vw,21px)] font-semibold leading-[1.55] text-text-primary"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      土地と建物をまとめて進めると、負担を抑えられる場合があります。
                    </p>
                    <p className="mt-3 text-[13px] leading-[1.9] text-text-secondary">
                      やまとは土地分譲の実績があるため、土地と建物の段取りを一本化できる案件が多くあります。
                      段取り次第で、つなぎ融資が不要になったり、期間を短くできたりするケースがあります。
                    </p>
                    <p className="mt-3 text-[13px] leading-[1.9] text-text-secondary">
                      ※ 内容は金融機関の条件や案件ごとに異なります。状況に合わせてご案内します。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. 提携FPの中立性 — 業界最大の不信ポイントを正面突破
          ============================================================ */}
      <section className="relative overflow-hidden bg-text-primary py-[var(--section-py)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.018), rgba(255,255,255,0.018) 1px, transparent 1px, transparent 28px)",
          }}
        />
        <div ref={fpRef} className="relative mx-auto max-w-[1180px] px-[var(--page-px)] scroll-in">
          <p className="font-section-label text-main/90 text-xs md:text-sm mb-3 tracking-[0.18em]">
            FP NEUTRALITY — 提携FPの、3つの約束
          </p>
          <h2
            className="text-[clamp(24px,3.4vw,40px)] text-white leading-[1.45] tracking-[0.04em] font-light"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            「家を売るためのFP」では、ありません。
          </h2>
          <p className="mt-4 max-w-[740px] text-[clamp(14px,1.05vw,16px)] leading-[1.95] text-white/75">
            ハウスメーカーや不動産会社が紹介するFPは、家を売ることが前提になりがちです。やまとが提携しているFPには、
            ご家族のライフプランを軸に、率直にお話しいただくようお願いしています。
          </p>

          <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-3 gap-5">
            {FP_NEUTRALITY.map((f, i) => (
              <article
                key={f.title}
                className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 md:p-7 backdrop-blur-sm"
              >
                <p
                  className="font-oswald text-[10px] tracking-[0.22em] text-main"
                  style={{ fontWeight: 500 }}
                >
                  PROMISE {String(i + 1).padStart(2, "0")}
                </p>
                <p
                  className="mt-4 text-[clamp(17px,1.5vw,20px)] font-semibold leading-[1.55] text-white"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {f.title}
                </p>
                <p className="mt-3 text-[13px] leading-[1.95] text-white/75">{f.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/15 bg-white/[0.04] p-6 md:p-7">
            <div className="flex items-start gap-3">
              <Scale className="h-5 w-5 text-main mt-0.5 shrink-0" strokeWidth={1.8} />
              <div>
                <p className="text-sm font-semibold tracking-[0.04em] text-white">
                  社内にも、住宅ローンアドバイザー資格保有者がいます。
                </p>
                <p className="mt-2 text-[13px] leading-[1.95] text-white/70">
                  大和信用金庫・奈良中央信用金庫・南都銀行・りそな銀行など、複数の金融機関の中からご状況に合うものをご一緒に整理します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. 初回相談の流れ — 既存3ステップを継承拡張
          ============================================================ */}
      <section className="relative overflow-hidden bg-bg-warm py-[var(--section-py)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_82%_-10%,rgba(125,68,39,0.08),transparent_62%)]"
        />
        <div ref={flowRef} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-5">
              <SectionLabel>FIRST MEETING — はじめての方へ</SectionLabel>
              <SectionTitle>資料は、お揃いでなくて構いません。</SectionTitle>
              <SectionLead>
                初回は、気がかりなことを一つずつ整理する時間です。図面や金融の細部は、必要になった段階で少しずつお話しします。
                持参不要、お電話一本でご予約いただけます。
              </SectionLead>

              <figure className="mt-8 overflow-hidden rounded-2xl border border-border bg-white">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/newsozai/interior-kitchen-01.webp"
                    alt="内観 — 暮らしの中心"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                  />
                </div>
                <figcaption className="px-5 py-4 text-[12px] leading-[1.85] text-text-secondary">
                  図面と仕様の先に、家計があります。月々のお支払いが、この先の暮らしをどう支えるか。ご一緒に、見てまいります。
                </figcaption>
              </figure>
            </div>

            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-2xl border border-border bg-white p-6 md:p-8 shadow-[0_18px_52px_-32px_rgba(43,43,43,0.14)]">
                <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-main via-main/70 to-main/25" aria-hidden />
                <p className="text-xs font-semibold tracking-[0.14em] text-text-secondary">初回面談のながれ</p>
                <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
                  所要時間は内容により前後します。お子様連れも歓迎です。
                </p>

                <div className="mt-6 space-y-6">
                  {FLOW_STEPS.map((s) => {
                    const Icon = s.Icon;
                    return (
                      <div key={s.k} className="grid grid-cols-[auto_1fr] gap-x-4">
                        <div className="flex flex-col items-center">
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-bg-secondary/70 text-[11px] font-semibold tracking-[0.12em] text-text-primary">
                            {s.k}
                          </span>
                          <span className="mt-2 h-full w-px flex-1 bg-border/80" aria-hidden />
                        </div>
                        <div className="min-w-0 pb-2">
                          <div className="flex items-start gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-main/10 text-main shrink-0">
                              <Icon className="h-5 w-5" strokeWidth={1.6} />
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-semibold leading-snug text-text-primary">{s.title}</p>
                              <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary">{s.body}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row">
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
                    sublabel="気になる点をメッセージで"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. よくある不安 Q&A
          ============================================================ */}
      <section className="relative bg-bg-primary py-[var(--section-py)]">
        <div ref={faqRef} className="mx-auto max-w-[1000px] px-[var(--page-px)] scroll-in">
          <SectionLabel>FAQ — よくある、お金まわりの不安</SectionLabel>
          <SectionTitle>「払えなくなったら」の不安に、先にお答えします。</SectionTitle>
          <SectionLead>
            ご相談の前に、よくお寄せいただく質問をまとめました。書ききれないことは、ご来店時にお気軽にお尋ねください。
          </SectionLead>

          <div className="mt-10 md:mt-14">
            {FAQS.map((f, i) => (
              <FaqItem key={i} q={f.q} a={f.a} index={i} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-text-secondary">
              <ShieldCheck className="h-4 w-4 text-main" strokeWidth={2.1} />
              初回相談 無料
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-text-secondary">
              <Check className="h-4 w-4 text-main" strokeWidth={2.1} />
              しつこい営業なし
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-text-secondary">
              <Check className="h-4 w-4 text-main" strokeWidth={2.1} />
              提携FP連携
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-[11px] font-semibold text-text-secondary">
              <Check className="h-4 w-4 text-main" strokeWidth={2.1} />
              事前審査 無料
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
