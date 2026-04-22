"use client";

import Image from "next/image";
import { useState } from "react";
import {
  ShieldCheck,
  Plus,
  Minus,
  Scale,
} from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  MoneyFullSection — /money 完全版（2026-04-22 v2 リビルド）
  ------------------------------------------------------------
  v1(serif多用) → v2: TOPと地続きの編集誌的トーンに統一
    - 和文は全て Noto Sans JP(ゴシック・default)
    - 数字は font-oswald(Oswald Light) で巨大表示
    - 欧文ラベルは font-inter(Inter UPPERCASE)
    - 非対称グリッド(1.4fr:1fr)・border-t-[3px]・大きなジャンプ率
    - PriceSection / MechanismEnhanced と同じ視覚秩序

  消費者心理5段階(関心→共感→納得→確信→行動) は v1 から継承。
  内容は変更なし。表現のみ刷新。
*/

const ACCENT = "#A2C523"; // LIME - PriceSectionと統一

// ─────────────────────────────────────────────
// データ
// ─────────────────────────────────────────────

const COST_BUCKETS = [
  {
    no: "01",
    label: "建物本体",
    amount: "2,280〜2,480",
    unit: "万円",
    body: "京・風・花の3プラン。標準仕様で揃えています。",
    sub: "やまと: 京 2,280万円〜（税込）",
  },
  {
    no: "02",
    label: "付帯工事",
    amount: "0",
    unit: "円(やまと)",
    body: "地盤改良費(最大150万円)・仲介手数料は当社が負担します。",
    sub: "他社目安: 別途 100〜300万円",
  },
  {
    no: "03",
    label: "土地代",
    amount: "別途",
    unit: "",
    body: "奈良・京都の自社分譲地のほか、ご希望のエリアもご一緒に探します。",
    sub: "目安: 1,000〜2,500万円(エリアによる)",
  },
  {
    no: "04",
    label: "諸費用",
    amount: "別途",
    unit: "",
    body: "登記・印紙税・ローン手数料・火災保険等。総額の5〜10%が目安です。",
    sub: "目安: 200〜400万円",
  },
  {
    no: "05",
    label: "引越し・家具・カーテン",
    amount: "別途",
    unit: "",
    body: "暮らしを始めるための分。最初から詰め込まず、暮らしながら整えるご家族も多いです。",
    sub: "目安: 50〜150万円",
  },
] as const;

const RATE_HEADERS = ["1.0%", "1.5%", "2.0%"] as const;
const LOAN_TABLE = [
  { borrow: "2,500", monthly: ["7.1", "7.7", "8.3"] },
  { borrow: "3,000", monthly: ["8.5", "9.2", "9.9"] },
  { borrow: "3,500", monthly: ["9.9", "10.7", "11.6"] },
  { borrow: "4,000", monthly: ["11.3", "12.2", "13.3"] },
] as const;

const RULES = [
  { label: "RULE", t: "月々の返済は、年収の20〜25%が目安。", d: "「借りられる額」ではなく「返せる額」で考えると、生活費・教育費を圧迫しません。" },
  { label: "CHECK", t: "教育費のピークと、返済額のピークを重ねない。", d: "お子様の進学時期に合わせて、繰上げ返済の余地を残す設計をご一緒に考えます。" },
  { label: "RESERVE", t: "生活防衛費は、3〜6ヶ月分残す。", d: "頭金にすべて充てると、急な出費に対応できなくなります。手元に残す額もご一緒に決めます。" },
] as const;

const RENT_VS_OWN = [
  { axis: "30年後の累計支出", rent: "3,600万円", own: "約3,700万円" },
  { axis: "30年後に残るもの", rent: "なし", own: "持ち家(資産として残る)" },
  { axis: "老後の住居費", rent: "引き続き家賃が発生", own: "完済後は固定資産税と修繕費のみ" },
  { axis: "間取り・設備", rent: "原則そのまま", own: "家族の変化に合わせて変えられる" },
] as const;

const LOAN_TYPES = [
  {
    name: "変動金利型",
    rate: "0.4〜0.7",
    rateUnit: "%",
    pros: "金利が低い。総返済額を抑えやすい。",
    cons: "金利が上昇すると、月々の支払いが増える可能性。",
    when: "繰上げ返済の余力がある／返済期間が短めの方に。",
  },
  {
    name: "全期間固定型(フラット35等)",
    rate: "1.7〜2.0",
    rateUnit: "%",
    pros: "完済まで月々の額が変わらない。家計設計が立てやすい。",
    cons: "変動より金利が高め。総返済額は大きくなる。",
    when: "教育費・老後資金とのバランスを最優先する方に。",
  },
  {
    name: "固定期間選択型",
    rate: "1.0〜1.5",
    rateUnit: "%",
    pros: "一定期間の金利を確定でき、変動と固定の中間。",
    cons: "固定期間終了後の金利が読めない。",
    when: "教育費のピークに合わせて期間を区切りたい方に。",
  },
] as const;

const SUPPORTS = [
  {
    name: "住宅ローン控除(住宅ローン減税)",
    body: "年末ローン残高の0.7%が、最大13年間にわたり所得税(住民税)から控除されます。長期優良住宅・ZEH水準なら控除上限が拡大します。",
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

const FP_PROMISES = [
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
  },
  {
    k: "02",
    title: "費用のかたちを、資料でたどる",
    body: "図や資料を見ながら、土地・建物・諸費用の全体像をざっくり追います。細かい確定は、このあとの段階で進められます。",
  },
  {
    k: "03",
    title: "帰るまでに、次の一手を決める",
    body: "持ち帰り資料、家で話し合っておきたいこと、次の面談や現地のご案内など、次に何をするかをはっきりさせます。",
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
// 編集誌的セクション見出し（PriceSection と同型・非対称）
// ─────────────────────────────────────────────

function EditorialHeader({
  kicker,
  title,
  leadStrong,
  leadBody,
}: {
  kicker: string;
  title: React.ReactNode;
  leadStrong: React.ReactNode;
  leadBody?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end mb-16 md:mb-24">
      <div>
        <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
          {kicker}
        </p>
        <h2
          className="text-text-primary leading-[1.05] tracking-[-0.02em]"
          style={{
            fontWeight: 500,
            fontSize: "clamp(36px, 6.4vw, 96px)",
          }}
        >
          {title}
        </h2>
      </div>

      <aside className="lg:pt-4">
        <div className="border-t-[3px] border-text-primary pt-6">
          <p className="font-medium text-[clamp(18px,1.9vw,28px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
            {leadStrong}
          </p>
          {leadBody ? (
            <p className="mt-5 text-[clamp(14px,1vw,16px)] leading-[1.95] max-w-[480px] text-text-secondary">
              {leadBody}
            </p>
          ) : null}
        </div>
      </aside>
    </div>
  );
}

function CenteredHeader({
  kicker,
  title,
  lead,
  light = false,
}: {
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <p
        className={`font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase mb-6 font-bold ${
          light ? "text-white/70" : "text-text-secondary"
        }`}
      >
        {kicker}
      </p>
      <h2
        className={`leading-[1.1] tracking-[-0.01em] ${light ? "text-white" : "text-text-primary"}`}
        style={{
          fontWeight: 500,
          fontSize: "clamp(32px, 5vw, 72px)",
        }}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`mt-6 max-w-[680px] text-[clamp(14px,1.05vw,16px)] leading-[1.95] ${
            light ? "text-white/70" : "text-text-secondary"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}

// ─────────────────────────────────────────────
// FAQ アイテム(FaqSection と同様の作り)
// ─────────────────────────────────────────────

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(index === 0);
  return (
    <div className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left hover:bg-bg-secondary/50 transition-colors px-2"
        aria-expanded={open}
      >
        <span className="flex items-start gap-4 flex-1">
          <span
            className="font-inter text-main text-sm md:text-base font-medium mt-0.5 shrink-0"
          >
            Q.{String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-text-primary text-sm md:text-base font-medium">
            {q}
          </span>
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
          1. BREAKDOWN — 総額の見える化
          ============================================================ */}
      <section className="relative bg-[#FAF8F3] py-[var(--section-py)]">
        <div ref={r1} className="relative mx-auto max-w-[1320px] px-[var(--page-px)] scroll-in">
          <EditorialHeader
            kicker="Breakdown / 総額の見える化"
            title={<>家づくりの総額には、<br />5つの財布があります。</>}
            leadStrong={<>「ぜんぶで、いくら」。<br />最初に必要なのは、桁の見当ではなく、内訳です。</>}
            leadBody="やまとは、含まれるもの・別途になるものを、最初の打ち合わせで明らかにします。"
          />

          {/* 5つの財布 — 編集誌的フラット縦列(カード羅列を排除) */}
          <div className="border-t border-text-primary/15">
            {COST_BUCKETS.map((b) => (
              <article
                key={b.no}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_minmax(0,260px)] gap-6 md:gap-10 border-b border-text-primary/15 py-7 md:py-10 transition-colors hover:bg-white/40"
              >
                <div className="font-oswald text-text-secondary tracking-[-0.02em] text-3xl md:text-4xl" style={{ fontWeight: 300 }}>
                  {b.no}
                </div>
                <div>
                  <p className="text-text-primary text-[clamp(18px,1.7vw,22px)] font-medium tracking-[0.04em] leading-[1.5]">
                    {b.label}
                  </p>
                  <p className="mt-3 text-[13px] md:text-[14px] leading-[1.95] text-text-secondary max-w-[640px]">
                    {b.body}
                  </p>
                  <p className="mt-3 font-inter text-[10px] md:text-[11px] tracking-[0.16em] text-text-secondary/80">
                    {b.sub}
                  </p>
                </div>
                <div className="md:text-right">
                  <div className="flex md:justify-end items-baseline gap-1.5">
                    <span
                      className="font-oswald tabular-nums leading-[0.85] text-text-primary"
                      style={{
                        fontWeight: 300,
                        fontSize: "clamp(36px, 4vw, 56px)",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {b.amount}
                    </span>
                    {b.unit ? (
                      <span className="text-text-secondary text-sm md:text-base font-medium">
                        {b.unit}
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* やまと負担 callout */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:gap-12 items-center border-t-[3px] border-text-primary pt-8 md:pt-10">
            <div>
              <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-main mb-3 font-bold">
                Yamato pays for you
              </p>
              <p className="text-text-primary text-[clamp(18px,1.9vw,26px)] font-medium leading-[1.55] tracking-[0.04em]">
                やまとが負担しているもの。
              </p>
              <p className="mt-3 text-[13px] md:text-[14px] leading-[1.95] text-text-secondary max-w-[760px]">
                地盤改良費(最大150万円)、仲介手数料、契約後の追加見積。これらは当社が負担、もしくは「最初の見積もりから変わらない」を原則にしています。
                業界では契約後の増額が8割で発生すると言われますが、やまとはそれをしません。
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <ShieldCheck className="h-5 w-5 text-main" strokeWidth={2} />
              <span className="font-inter text-[11px] tracking-[0.18em] uppercase text-main font-bold">No hidden cost</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          2. SIMULATION — 月々の早見表
          ============================================================ */}
      <section className="relative bg-bg-primary py-[var(--section-py)]">
        <div ref={r2} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
          <CenteredHeader
            kicker="Simulation / 月々のお支払い"
            title={<>いくら借りるかより、<br />いくらなら返せるか。</>}
            lead="借入額・期間・金利を組み合わせると、月々のお支払いの目安が見えてきます。35年返済(元利均等・ボーナス払いなし)で並べました。ご家族の年収・教育費・老後資金との兼ね合いで、無理のない額を探してまいります。"
          />

          {/* テーブル */}
          <div className="overflow-hidden border border-text-primary/15 bg-white">
            <div className="grid grid-cols-[minmax(120px,1fr)_repeat(3,minmax(0,1fr))] border-b border-text-primary/15 bg-bg-secondary/50">
              <div className="px-4 py-4 md:px-6 md:py-5 font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold">
                借入 / 金利
              </div>
              {RATE_HEADERS.map((r) => (
                <div
                  key={r}
                  className="border-l border-text-primary/15 px-3 py-4 md:px-5 md:py-5 text-center font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold"
                >
                  {r}
                </div>
              ))}
            </div>
            {LOAN_TABLE.map((row, i) => (
              <div
                key={row.borrow}
                className={`grid grid-cols-[minmax(120px,1fr)_repeat(3,minmax(0,1fr))] border-b border-text-primary/10 last:border-b-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-bg-secondary/20"
                }`}
              >
                <div className="px-4 py-5 md:px-6 md:py-7 flex items-baseline gap-1.5">
                  <span
                    className="font-oswald tabular-nums text-text-primary leading-none"
                    style={{ fontWeight: 300, fontSize: "clamp(20px, 2vw, 28px)" }}
                  >
                    {row.borrow}
                  </span>
                  <span className="text-text-secondary text-[11px] md:text-xs font-medium">万円</span>
                </div>
                {row.monthly.map((m, j) => (
                  <div
                    key={j}
                    className="border-l border-text-primary/10 px-3 py-5 md:px-5 md:py-7 flex items-baseline justify-center gap-1.5"
                  >
                    <span
                      className="font-oswald tabular-nums text-text-primary leading-none"
                      style={{ fontWeight: 400, fontSize: "clamp(22px, 2.4vw, 34px)", letterSpacing: "-0.02em" }}
                    >
                      {m}
                    </span>
                    <span className="text-text-secondary text-[11px] md:text-xs font-medium">万円/月</span>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="mt-6 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary max-w-[860px]">
            ※ 返済期間35年・元利均等返済・ボーナス払いなしで試算した目安です。実際の金利は金融機関・商品・審査時期により異なります。月々のお支払いには、固定資産税・修繕費が別途かかります。
          </p>

          {/* 3つのルール */}
          <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/10">
            {RULES.map((r) => (
              <div key={r.label} className="bg-white p-7 md:p-9">
                <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-main font-bold">
                  {r.label}
                </p>
                <p className="mt-5 text-text-primary text-[clamp(16px,1.4vw,20px)] font-medium leading-[1.55] tracking-[0.04em]">
                  {r.t}
                </p>
                <p className="mt-3 text-[13px] leading-[1.9] text-text-secondary">{r.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          3. RENT vs OWN — 比較
          ============================================================ */}
      <section className="relative bg-[#FAF8F3] py-[var(--section-py)]">
        <div ref={r3} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
          <EditorialHeader
            kicker="Rent vs Own / 比較"
            title={<>払うお金は同じくらい。<br />残るものが、違います。</>}
            leadStrong={<>賃貸と持家。<br />同じ月10万円で、30年後に何が残るか。</>}
            leadBody="持家には固定資産税や修繕費もかかります。両方を並べてご覧ください。"
          />

          <div className="overflow-hidden border border-text-primary/15 bg-white">
            <div className="grid grid-cols-[minmax(140px,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-text-primary/15 bg-bg-secondary/50">
              <div className="px-4 py-4 md:px-6 md:py-5 font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold">
                くらべる項目
              </div>
              <div className="border-l border-text-primary/15 px-3 py-4 md:px-5 md:py-5 text-center font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-text-secondary font-bold">
                Rent / 賃貸
              </div>
              <div
                className="border-l border-text-primary/15 px-3 py-4 md:px-5 md:py-5 text-center font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase font-bold"
                style={{ background: ACCENT, color: "#1A2A00" }}
              >
                Own / 持家
              </div>
            </div>
            {RENT_VS_OWN.map((row, i) => (
              <div
                key={row.axis}
                className={`grid grid-cols-[minmax(140px,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-text-primary/10 last:border-b-0 ${
                  i % 2 === 0 ? "bg-white" : "bg-bg-secondary/15"
                }`}
              >
                <div className="px-4 py-5 md:px-6 md:py-7 text-[13px] md:text-sm font-medium text-text-primary">
                  {row.axis}
                </div>
                <div className="flex items-center justify-center border-l border-text-primary/10 px-3 py-5 md:px-5 md:py-7 text-center text-[13px] md:text-sm text-text-secondary">
                  {row.rent}
                </div>
                <div
                  className="flex items-center justify-center border-l border-text-primary/10 px-3 py-5 md:px-5 md:py-7 text-center text-[13px] md:text-sm font-medium text-text-primary"
                  style={{ background: "rgba(162,197,35,0.08)" }}
                >
                  {row.own}
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary max-w-[860px]">
            ※ 持家には固定資産税(年10〜15万円目安)・修繕費(10〜15年で50〜100万円目安)が別途かかります。それでも「資産として残る」「老後の住居費が下がる」点は、家計の長期設計で大きな違いになります。
          </p>
        </div>
      </section>

      {/* ============================================================
          4. LOAN DESIGN — 金利タイプ + 制度
          ============================================================ */}
      <section className="relative bg-bg-primary py-[var(--section-py)]">
        <div ref={r4} className="relative mx-auto max-w-[1320px] px-[var(--page-px)] scroll-in">
          <CenteredHeader
            kicker="Loan Design / ローンの組み方"
            title={<>金利のタイプと、<br />使える制度。先に整理します。</>}
            lead="住宅ローンは「変動か、固定か」だけでは決まりません。控除制度・補助金・贈与の特例まで含めて、ご家族の状況に合うかたちを一緒に考えます。"
          />

          {/* 3タイプ */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/10">
            {LOAN_TYPES.map((t) => (
              <article key={t.name} className="bg-white p-7 md:p-9 flex flex-col">
                <p className="text-text-primary text-[clamp(17px,1.5vw,21px)] font-medium tracking-[0.04em] leading-[1.5]">
                  {t.name}
                </p>
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span
                    className="font-oswald tabular-nums text-text-primary leading-none"
                    style={{ fontWeight: 300, fontSize: "clamp(40px, 4.4vw, 64px)", color: ACCENT, letterSpacing: "-0.02em" }}
                  >
                    {t.rate}
                  </span>
                  <span className="text-text-secondary text-sm font-medium">{t.rateUnit}</span>
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
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.95] text-text-secondary">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary max-w-[860px]">
              ※ 各制度の要件・上限額・申請期間は年度ごとに変わります。最新の条件は、ご相談時に確認のうえご案内します。
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          5. BRIDGE LOAN — つなぎ融資
          ============================================================ */}
      <section className="relative bg-[#FAF8F3] py-[var(--section-py)]">
        <div ref={r5} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end">
            <div>
              <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
                Bridge Loan / つなぎ融資
              </p>
              <h2
                className="text-text-primary leading-[1.05] tracking-[-0.02em]"
                style={{ fontWeight: 500, fontSize: "clamp(34px, 5.6vw, 84px)" }}
              >
                土地と建物の段取りで、
                <br />
                利息は変わります。
              </h2>
            </div>
            <aside className="lg:pt-4">
              <div className="border-t-[3px] border-text-primary pt-6">
                <p className="font-medium text-[clamp(17px,1.7vw,24px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                  土地と建物をまとめて進めると、負担を抑えられる場合があります。
                </p>
                <p className="mt-5 text-[13px] md:text-[14px] leading-[1.95] max-w-[480px] text-text-secondary">
                  土地だけを先に購入し、あとから建物資金につなぐ場合、工事までのあいだに「つなぎ融資」が入ることがあります。利息や手数料が上乗せされ、思ったより総額が膨らむ要因になります。
                </p>
                <p className="mt-4 text-[13px] md:text-[14px] leading-[1.95] max-w-[480px] text-text-secondary">
                  やまとは奈良・京都での土地分譲の実績があり、土地と建物の段取りを一本化できる案件が多くあります。段取り次第で、つなぎ融資が不要になったり、期間を短くできたりするケースがあります。
                </p>
                <p className="mt-4 font-inter text-[11px] tracking-[0.16em] text-text-secondary">
                  ※ 内容は金融機関の条件や案件ごとに異なります。
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============================================================
          6. FP NEUTRALITY — 黒背景・3つの約束
          ============================================================ */}
      <section className="relative overflow-hidden bg-text-primary py-[var(--section-py)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.018), rgba(255,255,255,0.018) 1px, transparent 1px, transparent 28px)",
          }}
        />
        <div ref={r6} className="relative mx-auto max-w-[1320px] px-[var(--page-px)] scroll-in">
          <CenteredHeader
            light
            kicker="FP Neutrality / 提携FPの3つの約束"
            title={<>「家を売るためのFP」では、<br />ありません。</>}
            lead="ハウスメーカーや不動産会社が紹介するFPは、家を売ることが前提になりがちです。やまとが提携しているFPには、ご家族のライフプランを軸に、率直にお話しいただくようお願いしています。"
          />

          {/* 3つの約束 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {FP_PROMISES.map((p, i) => (
              <article key={p.title} className="bg-text-primary p-7 md:p-9">
                <div className="flex items-baseline gap-3">
                  <span
                    className="font-oswald text-white/90 leading-none"
                    style={{ fontWeight: 300, fontSize: "clamp(40px, 4vw, 56px)", color: ACCENT, letterSpacing: "-0.02em" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-inter text-[10px] tracking-[0.22em] uppercase text-white/55 font-bold">
                    Promise
                  </span>
                </div>
                <p className="mt-6 text-white text-[clamp(17px,1.5vw,21px)] font-medium leading-[1.55] tracking-[0.04em]">
                  {p.title}
                </p>
                <p className="mt-3 text-[13px] leading-[1.95] text-white/70">{p.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 lg:gap-10 items-start border-t border-white/15 pt-10">
            <Scale className="h-6 w-6 text-white/85" strokeWidth={1.6} />
            <div>
              <p className="text-white text-[clamp(15px,1.3vw,19px)] font-medium leading-[1.6] tracking-[0.04em]">
                社内にも、住宅ローンアドバイザー資格保有者がいます。
              </p>
              <p className="mt-3 text-[13px] md:text-[14px] leading-[1.95] text-white/70 max-w-[760px]">
                大和信用金庫・奈良中央信用金庫・南都銀行・りそな銀行など、複数の金融機関の中からご状況に合うものをご一緒に整理します。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          7. FIRST MEETING — 初回相談の流れ
          ============================================================ */}
      <section className="relative bg-bg-primary py-[var(--section-py)]">
        <div ref={r7} className="relative mx-auto max-w-[1320px] px-[var(--page-px)] scroll-in">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 lg:gap-20 items-start">
            {/* Left: コピー + 写真 */}
            <div>
              <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
                First Meeting / はじめての方へ
              </p>
              <h2
                className="text-text-primary leading-[1.1] tracking-[-0.02em]"
                style={{ fontWeight: 500, fontSize: "clamp(32px, 4.8vw, 64px)" }}
              >
                資料は、お揃いでなくて構いません。
              </h2>
              <p className="mt-6 text-[13px] md:text-[14px] leading-[1.95] text-text-secondary max-w-[480px]">
                初回は、気がかりなことを一つずつ整理する時間です。図面や金融の細部は、必要になった段階で少しずつお話しします。
                持参不要、お電話一本でご予約いただけます。
              </p>

              <figure className="mt-10 overflow-hidden border border-text-primary/10">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/newsozai/interior-kitchen-01.webp"
                    alt="内観 — 暮らしの中心"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 45vw"
                  />
                </div>
              </figure>
            </div>

            {/* Right: 3 ステップ + CTA */}
            <div>
              <div className="border-t-[3px] border-text-primary pt-8">
                <p className="font-inter text-[10px] md:text-[11px] tracking-[0.28em] uppercase text-text-secondary mb-2 font-bold">
                  Flow · 初回面談のながれ
                </p>
                <p className="text-[12px] leading-relaxed text-text-secondary">
                  所要時間は内容により前後します。お子様連れも歓迎です。
                </p>

                <div className="mt-10 space-y-10">
                  {FLOW_STEPS.map((s) => (
                    <div key={s.k} className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-8 border-b border-text-primary/10 pb-10 last:border-b-0">
                      <span
                        className="font-oswald text-text-primary tracking-[-0.02em] leading-none"
                        style={{ fontWeight: 300, fontSize: "clamp(40px, 4vw, 56px)" }}
                      >
                        {s.k}
                      </span>
                      <div>
                        <p className="text-text-primary text-[clamp(17px,1.5vw,21px)] font-medium leading-[1.5] tracking-[0.04em]">
                          {s.title}
                        </p>
                        <p className="mt-3 text-[13px] md:text-[14px] leading-[1.95] text-text-secondary">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-3">
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
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          8. FAQ
          ============================================================ */}
      <section className="relative bg-[#FAF8F3] py-[var(--section-py)]">
        <div ref={r8} className="mx-auto max-w-[1000px] px-[var(--page-px)] scroll-in">
          <CenteredHeader
            kicker="FAQ / お金まわりの不安"
            title={<>「払えなくなったら」の<br />不安に、先にお答えします。</>}
            lead="ご相談の前に、よくお寄せいただく質問をまとめました。書ききれないことは、ご来店時にお気軽にお尋ねください。"
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
