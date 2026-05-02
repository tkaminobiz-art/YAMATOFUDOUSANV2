"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShieldCheck, Plus, Minus, Heart, Coffee, Home as HomeIcon, Zap, Wrench, Receipt, Flame } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";
import LoanSimulator from "@/components/money/LoanSimulator";

/*
  MoneyFullSection — /money 完全リデザイン v6
  ----------------------------------------------------------------
  v5(9章編集誌・情報詰めすぎ) → v6: 「3スクロールで要点が伝わる」構造へ
    - 常に見える: ThirtyYearAnswer(30年で何が残るか)
    - 詳しく知りたい人だけ: QuestionsAccordion(9問・全て折りたたみ)
    - 最初の Hero / BigNumbers / SellingPoints は page.tsx に
    - JumpNav 撤去(短いページなので不要)

  【フォント方針 — 固定 (page.tsx 参照)】
  和文: ゴシック (Noto Sans JP / 游ゴシック / Hiragino Sans)
  英字ラベル: font-inter
  数字: font-oswald
  禁止: var(--font-serif), font-shippori, 明朝系
*/

const FOREST = "#486B00";
const ACCENT = "#A2C523";

// ─────────────────────────────────────────────
// データ(v5から保持・各Qの中身として再利用)
// ─────────────────────────────────────────────

const BUCKETS = [
  { no: "01", label: "建物本体", amount: "2,280〜2,480", unit: "万円", pct: 50, color: FOREST, body: "京・風・花の3プラン。標準仕様で揃えています。", yamato: "やまと: 京 2,280万円〜（税込）" },
  { no: "02", label: "付帯工事", amount: "0", unit: "円(やまと)", pct: 5, color: ACCENT, body: "地盤改良費(最大150万円)・仲介手数料は当社が負担します。", yamato: "他社目安: 別途 100〜300万円" },
  { no: "03", label: "土地代", amount: "500〜2,500", unit: "万円", pct: 35, color: "#7D4427", body: "やまとは奈良・京都で、現在76区画を公開中（累計90区画以上の分譲実績）。お手頃エリアから利便性重視まで、ご希望の幅でお選びいただけます。", yamato: "区画・エリアによる" },
  { no: "04", label: "諸費用", amount: "200〜400", unit: "万円", pct: 8, color: "#9A8978", body: "登記・印紙税・ローン手数料・火災保険等。", yamato: "目安" },
  { no: "05", label: "引越し・家具", amount: "50〜150", unit: "万円", pct: 2, color: "#C7B299", body: "暮らしを始めるための分。", yamato: "目安" },
] as const;

const MODEL_FAMILY = {
  who: "30代ご夫婦・お子様1人",
  income: "世帯年収 500万円",
  borrow: "2,500万円",
  monthly: "7.1",
  rate: "金利1.0%・35年・元利均等",
  comment: "返済比率は年収の17%前後。生活費・教育費を圧迫しない、無理しない設計の一例です。",
} as const;

// RATE_HEADERS / LOAN_TABLE は v6 で LoanSimulator(動的) に置換し撤去
// 早見表が必要になった場合は LoanSimulator のサブビューとして再追加

const COMPARE = [
  { axis: "30年後の累計支出", rent: "3,060万円", own: "約3,150万円" },
  { axis: "30年後に残るもの", rent: "なし", own: "持ち家(資産として残る)" },
  { axis: "老後の住居費", rent: "引き続き家賃", own: "完済後は固定資産税と修繕費のみ" },
  { axis: "間取り・設備", rent: "原則そのまま", own: "家族の変化に合わせて変えられる" },
] as const;

const LOAN_TYPES = [
  { name: "変動金利型", rate: "0.4〜0.7%", body: "金利が低く総返済を抑えやすい。ただし金利上昇のリスクあり。繰上げ返済の余力がある方に。" },
  { name: "全期間固定型", rate: "1.7〜2.0%", body: "完済まで月々が変わらず家計設計が立てやすい。教育費・老後とのバランスを最優先する方に。" },
  { name: "固定期間選択型", rate: "1.0〜1.5%", body: "一定期間の金利を確定でき、変動と固定の中間。教育費のピークに合わせたい方に。" },
] as const;

const SUPPORTS = [
  { name: "住宅ローン控除", body: "年末ローン残高の0.7%が、最大13年間にわたり所得税(住民税)から控除されます。" },
  { name: "子育てエコホーム支援事業", body: "省エネ基準を満たす新築住宅で、世帯条件により最大100万円の補助。" },
  { name: "GX志向型住宅補助", body: "高断熱・高効率設備を備えた住宅向けの補助制度。" },
  { name: "贈与税の非課税特例", body: "親・祖父母からの住宅取得資金の贈与に、一定額まで非課税枠があります。" },
] as const;

const FP_PROMISES = [
  { icon: Heart, title: "家を売る前に、家計を整えるFP相談を。", body: "住宅購入だけを前提にせず、ご家族の家計全体から考えます。やまとは社内にFPを置かず、独立した提携先のFP事務所にご相談いただけます。" },
  { icon: Coffee, title: "ご相談料は、いただきません。", body: "ご家族から相談料はお預かりしません。やまとと提携先のFP事務所との間で取り決めをしています。" },
  { icon: HomeIcon, title: "ご紹介の押しつけは、しません。", body: "提携FPと話したあとに「やっぱり今は建てない」とお決めになっても、それで構いません。" },
] as const;

const LAND_AREAS = [
  { area: "大和郡山市矢田町", price: "500", unit: "万円台〜", note: "やまとが扱うお手頃エリアの代表例(全17区画)。京プランと組み合わせて月々7万円台から。" },
  { area: "奈良市内 自社分譲地", price: "—", unit: "区画により", note: "やまと本社(大宮町)を中心に、奈良市内で複数区画の分譲実績があります。" },
  { area: "京都・宇治エリア", price: "—", unit: "区画により", note: "京都支店(宇治市小倉町)を起点に、京都南部のエリアもご相談いただけます。" },
] as const;

const FLOW_STEPS = [
  { k: "01", title: "いまの暮らしと、時期のめど", body: "ご家族の人数や引っ越し時期。金額の前に、生活の前提をそろえます。", image: "/images/works/case1-living.webp" },
  { k: "02", title: "費用のかたちを、資料でたどる", body: "図や資料を見ながら、土地・建物・諸費用の全体像をざっくり追います。", image: "/images/works/case2-kitchen.webp" },
  { k: "03", title: "帰るまでに、次の一手を決める", body: "持ち帰り資料、家で話し合っておきたいこと、次の面談を、はっきりさせます。", image: "/images/works/case3-living.webp" },
] as const;

const FAQS = [
  { q: "住宅ローンの審査、通るかどうか不安です。", a: "事前審査は無料で、複数の金融機関(大和信用金庫・奈良中央信用金庫・南都銀行・りそな銀行など)からご状況に合うものをご一緒に整理します。住宅ローンアドバイザー資格を持つスタッフが在籍しています。" },
  { q: "途中で払えなくなったら、どうなりますか。", a: "やまとは「払えなくなる家」をお売りしません。ご相談時に、月々の支払いがご家族の生活費・教育費を圧迫しない範囲を一緒に確認します。万が一に備えた団体信用生命保険も、内容をご一緒に確認します。" },
  { q: "金利が上がったら、月々の支払いはどうなりますか。", a: "変動金利の場合、半年ごとに金利が見直されます。一定期間は急激な上昇を抑えるルール(5年ルール・125%ルール)が一般的です。固定金利と組み合わせて、上昇に備える方も多くいらっしゃいます。" },
  { q: "頭金は、いくら必要ですか。", a: "「頭金ゼロでも借入可能」ですが、月々の返済比率(年収の2〜3割が目安)とのバランスで決めます。生活防衛費(生活費の3〜6ヶ月分)を残すこともおすすめしています。" },
  { q: "ハウスメーカーに相談すると、家を売られそうで怖いです。", a: "やまとはご相談を「数を取りに行く場」とは考えていません。ご相談後に「やっぱり今は建てない」と判断されても、それで構いません。提携FPも、家を売る前提では話しません。" },
] as const;

// ─────────────────────────────────────────────
// 75歳完済シナリオ — 資産として残る図解(常に見える)
// 2026-04-30 専務レビュー反映:
//   旧「30〜45年で残るもの・差700万」→ 新「75歳完済時に資産として残る・約4,500万相当」
//   45年後の支払い差ではなく、"完済後に手元に残るもの" を主役にする
// ─────────────────────────────────────────────

function ThirtyYearAnswer() {
  const ref = useScrollIn<HTMLDivElement>();
  const MAX = 4900;
  const ROWS = [
    { age: "40", years: 0, rent: 0, own: 0, note: "ご契約・建築開始" },
    { age: "55", years: 15, rent: 1530, own: 1530, note: "ほぼ同じ" },
    { age: "65", years: 25, rent: 2550, own: 2550, note: "ほぼ同じ" },
    { age: "75", years: 35, rent: 3570, own: 3570, note: "75歳・完済 ✓ 月々の支払いゼロへ" },
    { age: "85", years: 45, rent: 4590, own: 3700, note: "賃貸はそのまま家賃。持家は固定資産税と修繕のみ" },
  ] as const;

  return (
    <section className="relative bg-bg-primary py-[clamp(80px,8vw,160px)]">
      <div ref={ref} className="mx-auto max-w-[1180px] px-[var(--page-px)] scroll-in">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[12px] md:text-[13px] tracking-[0.06em] font-bold mb-4" style={{ color: FOREST }}>
            75歳に、家は資産として残る。
          </p>
          <h2
            className="text-text-primary leading-[1.2] tracking-[-0.01em]"
            style={{ fontWeight: 500, fontSize: "clamp(28px, 3.6vw, 52px)" }}
          >
            支払うお金は、ほぼ同じ。
            <br className="md:hidden" />
            残るものが、違います。
          </h2>
          <p className="mt-5 max-w-[680px] mx-auto text-[14px] md:text-[15px] leading-[1.95] text-text-secondary">
            40歳でご契約、35年ローン(借入3,000万円・1.0%)・月8.5万円。
            同じ月8.5万円の家賃と並べてみると、
            <strong className="text-text-primary">75歳の節目で景色が変わります。</strong>
          </p>
        </div>

        {/* 凡例 */}
        <div className="flex justify-center gap-6 mb-6 text-[12px] md:text-[13px]">
          <span className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 bg-text-secondary/65" />
            <span className="text-text-secondary">賃貸（家賃）</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-3 h-3" style={{ background: FOREST }} />
            <span style={{ color: FOREST }}>持家（ローン）</span>
          </span>
        </div>

        {/* バーグラフ — X軸を「年齢」に */}
        <div className="bg-white border border-text-primary/15 p-6 md:p-10 space-y-4">
          {ROWS.map((r) => {
            const rentPct = (r.rent / MAX) * 100;
            const ownPct = (r.own / MAX) * 100;
            const isPivot = r.age === "75" || r.age === "85";
            return (
              <div key={r.age} className="grid grid-cols-[60px_1fr] md:grid-cols-[80px_1fr] gap-3 md:gap-5 items-start">
                <div className="pt-1">
                  <div className="flex items-baseline gap-1">
                    <span
                      className="font-oswald tabular-nums leading-none text-text-primary"
                      style={{ fontWeight: 400, fontSize: "clamp(20px, 2vw, 28px)" }}
                    >
                      {r.age}
                    </span>
                    <span className="text-text-secondary text-[11px]">歳</span>
                  </div>
                  {r.years > 0 && (
                    <p className="text-text-secondary text-[10px] mt-0.5">{r.years}年目</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 md:h-4 bg-bg-secondary/40 relative overflow-hidden">
                      <div className="h-full bg-text-secondary/65 transition-[width] duration-700" style={{ width: `${rentPct}%` }} />
                    </div>
                    <span className="font-oswald tabular-nums text-text-primary text-[12px] md:text-[14px] min-w-[58px] text-right" style={{ fontWeight: 400 }}>
                      {r.rent.toLocaleString()}<span className="text-text-secondary text-[10px] ml-0.5">万</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-3 md:h-4 bg-bg-secondary/40 relative overflow-hidden">
                      <div
                        className="h-full transition-[width] duration-700"
                        style={{
                          width: `${ownPct}%`,
                          background: `linear-gradient(90deg, ${FOREST} 0%, ${FOREST} 60%, ${ACCENT} 100%)`,
                        }}
                      />
                    </div>
                    <span className="font-oswald tabular-nums text-text-primary text-[12px] md:text-[14px] min-w-[58px] text-right" style={{ fontWeight: 400 }}>
                      {r.own.toLocaleString()}<span className="text-text-secondary text-[10px] ml-0.5">万</span>
                    </span>
                  </div>
                  <p
                    className={`text-[11px] md:text-[12px] mt-2 leading-[1.7] ${isPivot ? "font-bold" : "text-text-secondary"}`}
                    style={isPivot ? { color: FOREST } : undefined}
                  >
                    {r.note}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* 結論ハイライト — 75歳完済時に手元に残る資産 */}
        <div
          className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-8 items-center px-6 md:px-8 py-7 md:py-9 border-2"
          style={{ background: "#EDF2D5", borderColor: FOREST }}
        >
          <div>
            <p className="text-[11px] md:text-[12px] tracking-[0.06em] font-bold mb-2" style={{ color: FOREST }}>
              75歳完済時、手元に残るもの
            </p>
            <p
              className="text-text-primary leading-[1.4] tracking-[-0.01em]"
              style={{ fontWeight: 500, fontSize: "clamp(18px, 2vw, 28px)" }}
            >
              月々の支払いはゼロへ。
              <br className="md:hidden" />
              土地と建物が、資産として残ります。
            </p>
          </div>
          <div className="md:border-l md:pl-8 md:min-w-[200px]" style={{ borderColor: "rgba(72,107,0,0.3)" }}>
            <div className="flex items-baseline gap-2 whitespace-nowrap">
              <span className="text-text-primary text-[13px] md:text-[14px] font-medium">約</span>
              <span
                className="font-oswald tabular-nums leading-[0.85]"
                style={{ fontWeight: 300, fontSize: "clamp(44px, 5vw, 72px)", letterSpacing: "-0.04em", color: FOREST }}
              >
                4,500
              </span>
              <span className="text-text-primary text-base font-medium">万円相当</span>
            </div>
            <p className="mt-2 text-text-secondary text-[11px] leading-[1.6]">
              土地2,500万 + 建物2,000万を想定
            </p>
          </div>
        </div>
        <p className="mt-4 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary">
          ※ 持家は固定資産税(年10〜15万円)・修繕費(10〜15年で50〜100万円)を含めた概算です。資産価値はエリア・建物の状態・市況により変動します。
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 住宅ローンの、もうひとつの見方(エッセンスとしての金融視点)
// 2026-04-30 専務発言「家買うって投資。住宅ローンはNISAみたいなもん。
//   そのエッセンスを加えてくれたらなお良し」を反映。
//   NISA直接比喩は避け、「長期低金利で借りられる家計設計の手段」という
//   控えめだが芯のあるトーンに。
// ─────────────────────────────────────────────

function LoanAsFinancialTool() {
  const ref = useScrollIn<HTMLDivElement>();

  const POINTS = [
    {
      n: "01",
      title: "金利が、低い。",
      body: "住宅ローンは、低い金利(変動0.4〜0.7% / 全期間固定1.7〜2.0%)で組める、最も身近な長期借入です。同じ金額を別の用途で借りる選択肢は、現実にはほぼありません。",
    },
    {
      n: "02",
      title: "長く、借りられる。",
      body: "35年という長期の返済期間が組めるのは、住居が「暮らしの基盤」だから。月々のご負担を抑えながら、生活の柱を整える設計ができます。",
    },
    {
      n: "03",
      title: "完済の先に、残る。",
      body: "返済が終わった先に、土地と建物が手元に残ります。住居費の負担が軽くなる老後と、将来の家族にも引き継げる資産という、二つの意味があります。",
    },
  ] as const;

  return (
    <section className="relative bg-[#FAF8F3] py-[clamp(64px,7vw,140px)]">
      <div ref={ref} className="mx-auto max-w-[1180px] px-[var(--page-px)] scroll-in">
        <div className="mb-10 md:mb-14 max-w-[760px]">
          <p
            className="text-[12px] md:text-[13px] tracking-[0.06em] font-bold mb-4"
            style={{ color: FOREST }}
          >
            住宅ローンの、もうひとつの見方
          </p>
          <h2
            className="text-text-primary leading-[1.3] tracking-[-0.01em]"
            style={{ fontWeight: 500, fontSize: "clamp(22px, 2.8vw, 36px)" }}
          >
            家のお金は、ご家族の家計設計を支える、長期の手段でもあります。
          </h2>
          <p className="mt-5 text-text-secondary text-[14px] md:text-[15px] leading-[1.95]">
            やまとは「払えなくなる家」をお売りしません。だからこそ、
            <br className="hidden md:block" />
            住宅ローンを「重い借金」としてではなく、
            <strong className="text-text-primary">長期で計画的に整えられる家計の手段</strong>
            として、ご一緒に考えます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/15">
          {POINTS.map((p) => (
            <div key={p.n} className="bg-white p-6 md:p-7">
              <span
                className="font-oswald tabular-nums leading-none block mb-3"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(28px, 2.6vw, 40px)",
                  color: FOREST,
                }}
              >
                {p.n}
              </span>
              <p className="text-text-primary text-[15px] md:text-[16px] font-medium leading-[1.5] mb-3">
                {p.title}
              </p>
              <p className="text-[12px] md:text-[13px] leading-[1.95] text-text-secondary">
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary max-w-[760px]">
          ※ 金利は2026年4月時点の参考値で、金融機関・お申込時期により変わります。借入は無理のない範囲(返済比率20〜25%以内)で組むのが原則です。
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// アコーディオン1問
// ─────────────────────────────────────────────

function QItem({
  no,
  q,
  teaser,
  defaultOpen = false,
  children,
}: {
  no: string;
  q: string;
  teaser: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`border bg-white transition-[border-color,box-shadow] duration-[300ms] ${
        open
          ? "border-text-primary/30 shadow-[0_12px_32px_-20px_rgba(43,43,43,0.18)]"
          : "border-text-primary/15 hover:border-text-primary/25"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 md:gap-6 px-5 md:px-7 py-5 md:py-6 text-left transition-colors hover:bg-bg-secondary/30"
        aria-expanded={open}
      >
        <span
          className="font-oswald tabular-nums leading-none shrink-0 transition-colors duration-300"
          style={{
            fontWeight: 300,
            fontSize: "clamp(22px, 2vw, 30px)",
            color: open ? FOREST : "rgba(43,43,43,0.4)",
            letterSpacing: "-0.02em",
          }}
        >
          {no}
        </span>
        <div className="flex-1 min-w-0">
          <p className="text-text-primary text-[15px] md:text-[17px] font-medium leading-[1.5]">
            {q}
          </p>
          <p className="mt-1 text-[12px] md:text-[13px] text-text-secondary truncate">
            {teaser}
          </p>
        </div>
        <span
          className="shrink-0 transition-transform duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
          style={{
            color: open ? FOREST : "var(--color-main)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          {open ? <Minus className="w-5 h-5" strokeWidth={1.5} /> : <Plus className="w-5 h-5" strokeWidth={1.5} />}
        </span>
      </button>

      {/* グリッド行展開アニメ — max-heightトリックではなく grid-rows */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="overflow-hidden">
          <div className="px-5 md:px-7 pb-7 md:pb-9 pt-3 border-t border-text-primary/10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// QuestionsAccordion
// ─────────────────────────────────────────────

function QuestionsAccordion() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section id="ch-questions" className="relative bg-[#FAF8F3] py-[clamp(80px,8vw,160px)] scroll-mt-20">
      <div ref={ref} className="mx-auto max-w-[1100px] px-[var(--page-px)] scroll-in">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-[12px] md:text-[13px] tracking-[0.06em] font-bold mb-4" style={{ color: FOREST }}>
            もっと知りたい方へ
          </p>
          <h2
            className="text-text-primary leading-[1.2] tracking-[-0.01em]"
            style={{ fontWeight: 500, fontSize: "clamp(28px, 3.6vw, 52px)" }}
          >
            気になるところから、どうぞ。
          </h2>
          <p className="mt-5 max-w-[560px] mx-auto text-[14px] md:text-[15px] leading-[1.95] text-text-secondary">
            クリック（タップ）で開きます。9つの質問を、ご家族でお読みください。
          </p>
        </div>

        <div className="space-y-3 md:space-y-4">
          {/* Q1: ぜんぶでいくら? */}
          <QItem no="01" q="家のお金、ぜんぶでいくらですか?" teaser="土地+建物+諸費用 約3,000万円〜（5つの内訳）">
            <p className="text-[13px] md:text-[14px] leading-[1.95] text-text-secondary mb-6 max-w-[760px]">
              桁の見当ではなく、内訳から。やまとは「含まれるもの」と「別途になるもの」を、最初の打ち合わせで全部出します。
            </p>

            {/* 比率バー */}
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.06em] text-text-secondary font-bold mb-2">一般的な比率（4,500〜5,000万円規模）</p>
              <div className="flex h-10 md:h-12 w-full overflow-hidden border border-text-primary/15">
                {BUCKETS.map((b) => (
                  <div key={b.no} className="flex items-center justify-center" style={{ width: `${b.pct}%`, background: b.color }}>
                    <span className="font-inter text-white text-[10px] md:text-[11px] font-bold tracking-[0.1em] truncate px-1">
                      {b.pct >= 5 ? `${b.pct}%` : ""}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
                {BUCKETS.map((b) => (
                  <div key={b.no} className="flex items-center gap-1.5">
                    <span className="inline-block w-2.5 h-2.5" style={{ background: b.color }} />
                    <span className="text-[11px] md:text-[12px] text-text-secondary">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5つの財布の詳細(コンパクト) */}
            <div className="border-t border-text-primary/10">
              {BUCKETS.map((b) => (
                <div key={b.no} className="grid grid-cols-[auto_1fr_auto] gap-4 md:gap-6 border-b border-text-primary/10 py-4 items-baseline">
                  <span className="font-oswald tabular-nums text-text-secondary text-lg" style={{ fontWeight: 300 }}>{b.no}</span>
                  <div>
                    <p className="text-text-primary text-[14px] md:text-[15px] font-medium">{b.label}</p>
                    <p className="mt-1 text-[12px] md:text-[13px] leading-[1.85] text-text-secondary">{b.body}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-oswald tabular-nums text-text-primary leading-none" style={{ fontWeight: 400, fontSize: "clamp(18px,1.6vw,24px)" }}>
                      {b.amount}
                    </span>
                    <span className="text-text-secondary text-xs ml-1">{b.unit}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* やまと負担 callout */}
            <div className="mt-6 px-5 md:px-6 py-4 md:py-5 border" style={{ background: "#EDF2D5", borderColor: "rgba(72,107,0,0.2)" }}>
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 mt-0.5 shrink-0" style={{ color: FOREST }} strokeWidth={1.8} />
                <div>
                  <p className="text-text-primary text-[14px] md:text-[15px] font-medium leading-[1.55]">
                    やまとが負担: 地盤改良費(最大150万円)・仲介手数料・契約後の追加見積。
                  </p>
                  <p className="mt-1 text-[12px] md:text-[13px] leading-[1.85] text-text-primary/75">
                    「最初の見積もりから変わらない」を原則にしています。
                  </p>
                </div>
              </div>
            </div>
          </QItem>

          {/* Q2: 月々いくら? */}
          <QItem no="02" q="月々のお支払いは、どれくらいですか?" teaser="想定モデル(年収500万)で月7.1万円から">
            {/* シミュレーター(動的) */}
            <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-3">あなたの場合は、いくら？</p>
            <LoanSimulator />

            {/* 想定モデル */}
            <div className="mt-8 mb-6 px-5 md:px-7 py-5 md:py-6 border" style={{ background: "#FAF8F3", borderColor: "rgba(72,107,0,0.15)" }}>
              <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-3">想定モデル</p>
              <p className="text-text-primary text-[15px] md:text-[16px] font-medium">
                {MODEL_FAMILY.who}（{MODEL_FAMILY.income}）／借入 {MODEL_FAMILY.borrow}
              </p>
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-text-primary text-[13px] md:text-[14px] font-medium">月々</span>
                <span
                  className="font-oswald tabular-nums leading-none"
                  style={{ fontWeight: 300, fontSize: "clamp(48px, 5vw, 80px)", letterSpacing: "-0.04em", color: FOREST }}
                >
                  {MODEL_FAMILY.monthly}
                </span>
                <span className="text-text-primary text-base md:text-lg font-medium">万円</span>
              </div>
              <p className="mt-2 text-[12px] text-text-secondary">{MODEL_FAMILY.rate}</p>
              <p className="mt-3 text-[12px] md:text-[13px] leading-[1.85] text-text-secondary max-w-[560px]">
                {MODEL_FAMILY.comment}
              </p>
            </div>

            {/* 建てた後にもかかる費用 — ライフサイクルコスト */}
            <div className="mt-8">
              <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-3">
                建てた後にも、こんな費用がかかります
              </p>
              <p className="text-[12px] md:text-[13px] leading-[1.95] text-text-secondary mb-4 max-w-[760px]">
                住宅ローンだけで終わりではありません。下記は標準的なご家族の年間目安です。資金計画に最初から織り込んでおくと安心です。
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-text-primary/10 border border-text-primary/15">
                {[
                  { icon: Receipt, label: "固定資産税", amount: "10〜15", unit: "万円/年", note: "建物・土地の評価額により" },
                  { icon: Zap, label: "光熱費", amount: "12〜20", unit: "万円/年", note: "電気・ガス・水道(家族構成・季節で変動)" },
                  { icon: Wrench, label: "メンテナンス", amount: "50〜100", unit: "万円/10〜15年", note: "外壁塗装・水回り更新等" },
                  { icon: Flame, label: "火災・地震保険", amount: "1〜3", unit: "万円/年", note: "補償内容により" },
                ].map((c) => {
                  const Icon = c.icon;
                  return (
                    <div key={c.label} className="bg-white p-4 md:p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="h-4 w-4 text-main" strokeWidth={1.6} />
                        <span className="text-[11px] md:text-[12px] text-text-secondary font-medium">{c.label}</span>
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-oswald tabular-nums text-text-primary leading-none" style={{ fontWeight: 400, fontSize: "clamp(20px,2vw,28px)", color: FOREST }}>
                          {c.amount}
                        </span>
                        <span className="text-text-secondary text-[10px] md:text-[11px]">{c.unit}</span>
                      </div>
                      <p className="mt-2 text-[10px] md:text-[11px] leading-[1.7] text-text-secondary">{c.note}</p>
                    </div>
                  );
                })}
              </div>
              <p className="mt-3 text-[10px] md:text-[11px] leading-[1.85] text-text-secondary">
                ※ 一般的な目安です。やまとは「修繕積立的な月割り換算」もご相談時にご一緒に整理します。
              </p>
            </div>

            <p className="mt-6 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary">
              「借りられる額」より「返せる額」を、年収の20〜25%以内で。
            </p>
          </QItem>

          {/* Q3: 賃貸と比べて? */}
          <QItem no="03" q="賃貸と比べて、何が違いますか?" teaser="同じ月額で、30年後の暮らしの軽さが違います">
            <p className="text-[13px] md:text-[14px] leading-[1.95] text-text-secondary mb-6 max-w-[760px]">
              ページ上の「30年で残るもの」グラフが、答えの全体像です。ここでは項目ごとに、もう一段詳しく並べます。
            </p>
            <div className="overflow-hidden border border-text-primary/15 bg-white">
              {COMPARE.map((row, i) => (
                <div key={row.axis} className={`grid grid-cols-[minmax(120px,1fr)_minmax(0,1fr)_minmax(0,1fr)] border-b border-text-primary/10 last:border-b-0 ${i % 2 === 0 ? "bg-white" : "bg-bg-secondary/15"}`}>
                  <div className="px-3 py-3 md:px-5 md:py-4 text-[12px] md:text-[13px] text-text-secondary font-medium">{row.axis}</div>
                  <div className="border-l border-text-primary/10 px-2 py-3 md:px-4 md:py-4 text-center text-[12px] md:text-[13px] text-text-secondary">{row.rent}</div>
                  <div className="border-l border-text-primary/10 px-2 py-3 md:px-4 md:py-4 text-center text-[12px] md:text-[13px] font-medium text-text-primary" style={{ background: "rgba(162,197,35,0.08)" }}>
                    {row.own}
                  </div>
                </div>
              ))}
            </div>
          </QItem>

          {/* Q4: つなぎ融資 */}
          <QItem no="04" q="「つなぎ融資」って、何ですか？やまとはゼロ円って本当?" teaser="本当です。30〜80万円が、家計に戻ります">
            <p className="text-[13px] md:text-[14px] leading-[1.95] text-text-secondary mb-6 max-w-[760px]">
              つなぎ融資 = 注文住宅で、土地購入から建物完成までの間に発生する一時的な借入。金利2〜4%・事務手数料・印紙代で、一般的に30〜80万円の上乗せになります。
            </p>

            {/* やまとの売り結論ボックス */}
            <div className="mb-6 px-6 md:px-8 py-6 md:py-8 border-2" style={{ background: "#EDF2D5", borderColor: FOREST }}>
              <p className="text-[12px] tracking-[0.06em] font-bold mb-3" style={{ color: FOREST }}>やまとの売り</p>
              <h3 className="text-text-primary leading-[1.3] tracking-[-0.01em]" style={{ fontWeight: 500, fontSize: "clamp(22px,2.4vw,32px)" }}>
                やまとなら、つなぎ融資は<span style={{ color: FOREST }}>発生しません</span>。
              </h3>
              <p className="mt-3 text-[13px] md:text-[14px] leading-[1.95] text-text-primary/85 max-w-[560px]">
                土地分譲と建物施工を、すべて自社で進めるから。土地購入と建物着工のタイムラグを埋める必要がなく、利息と手数料はそのまま家計に残ります。
              </p>
            </div>

            {/* 比較ダイアグラム */}
            <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-3">なぜ発生しないか — 段取りの比較</p>
            <div className="space-y-5">
              <div>
                <p className="text-[12px] md:text-[13px] text-text-primary font-medium mb-2">❶ 一般的な進め方</p>
                <div className="relative h-10 md:h-12 w-full bg-bg-secondary/40 border border-text-primary/10 flex items-center">
                  <div className="h-full w-[35%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium" style={{ background: "#7D4427" }}>土地購入</div>
                  <div className="h-full w-[15%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium bg-text-primary/70">つなぎ融資 ⚠</div>
                  <div className="h-full w-[50%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium" style={{ background: FOREST }}>建物着工 → 完成</div>
                </div>
              </div>
              <div>
                <p className="text-[12px] md:text-[13px] font-medium mb-2" style={{ color: FOREST }}>❷ やまと: 自社一貫</p>
                <div className="relative h-10 md:h-12 w-full border-2 flex items-center" style={{ background: "#EDF2D5", borderColor: FOREST }}>
                  <div className="h-full w-[40%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium" style={{ background: "#7D4427" }}>土地・建物 まとめて</div>
                  <div className="h-full w-[60%] flex items-center justify-center text-white text-[10px] md:text-xs font-medium" style={{ background: FOREST }}>建物着工 → 完成</div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary">
              ※ ご家族が独自にお持ちの土地で建てる場合や、特殊な金融機関の条件下では別途ご相談となるケースがあります。
            </p>
          </QItem>

          {/* Q5: 自社の土地は? */}
          <QItem no="05" q="自社の土地って、どこにありますか?" teaser="矢田町ほか、奈良・京都のお手頃エリア">
            <p className="text-[13px] md:text-[14px] leading-[1.95] text-text-secondary mb-6 max-w-[760px]">
              やまと不動産は、宅地分譲が事業の柱の一つです。中間業者を挟まないので、お手頃な価格で、段取りも一本にまとめられます。
            </p>

            {/* 3メリット */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/15 mb-6">
              {[
                { no: "01", t: "仲介手数料、ゼロ", b: "宅建会社直営の分譲地。仲介会社を挟みません。" },
                { no: "02", t: "段取りが、一本", b: "土地と建物を同じやまとで。打ち合わせも一度で済みます。" },
                { no: "03", t: "地盤改良費、ゼロ", b: "造成済みの分譲地。地盤改良費は当社が負担します。" },
              ].map((m) => (
                <div key={m.no} className="bg-white p-5 md:p-6">
                  <span className="font-oswald tabular-nums leading-none block mb-3" style={{ fontWeight: 300, fontSize: "clamp(28px,2.6vw,40px)", color: FOREST }}>{m.no}</span>
                  <p className="text-text-primary text-[14px] md:text-[15px] font-medium leading-[1.5]">{m.t}</p>
                  <p className="mt-2 text-[12px] md:text-[13px] leading-[1.9] text-text-secondary">{m.b}</p>
                </div>
              ))}
            </div>

            {/* エリア例 */}
            <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-3">取り扱いエリアの例</p>
            <div className="border-t border-text-primary/15">
              {LAND_AREAS.map((row) => (
                <div key={row.area} className="grid grid-cols-[1fr_auto] gap-4 border-b border-text-primary/15 py-4 items-baseline">
                  <div>
                    <p className="text-text-primary text-[14px] md:text-[15px] font-medium">{row.area}</p>
                    <p className="mt-1 text-[12px] md:text-[13px] leading-[1.85] text-text-secondary max-w-[440px]">{row.note}</p>
                  </div>
                  <div className="text-right">
                    {row.price === "—" ? (
                      <span className="text-text-secondary text-[12px] md:text-[13px]">{row.unit}</span>
                    ) : (
                      <>
                        <span className="font-oswald tabular-nums text-text-primary" style={{ fontWeight: 400, fontSize: "clamp(20px,1.8vw,28px)" }}>{row.price}</span>
                        <span className="text-text-secondary text-[11px] md:text-[12px] ml-1">{row.unit}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Link href="/lots" className="text-[13px] md:text-[14px] text-main font-medium hover:text-main-dark underline">
                すべての分譲区画を見る →
              </Link>
            </div>
          </QItem>

          {/* Q6: ローンと制度 */}
          <QItem no="06" q="住宅ローンの種類と、使える制度は?" teaser="変動・固定・固定期間 + 4つの制度・補助金">
            <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-3">金利のタイプ（2026年4月時点）</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {LOAN_TYPES.map((t) => (
                <div key={t.name} className="border border-text-primary/15 bg-white p-5">
                  <p className="text-text-primary text-[15px] md:text-[16px] font-medium leading-[1.5]">{t.name}</p>
                  <p className="mt-2 font-oswald tabular-nums" style={{ fontWeight: 400, fontSize: "clamp(20px,2vw,28px)", color: FOREST }}>{t.rate}</p>
                  <p className="mt-3 text-[12px] md:text-[13px] leading-[1.85] text-text-secondary">{t.body}</p>
                </div>
              ))}
            </div>

            <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-3">使える制度・補助金</p>
            <div className="border-t border-text-primary/10">
              {SUPPORTS.map((s, i) => (
                <div key={s.name} className="grid grid-cols-[auto_1fr] gap-4 border-b border-text-primary/10 py-4 items-baseline">
                  <span className="font-oswald tabular-nums text-text-secondary text-lg" style={{ fontWeight: 300 }}>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-text-primary text-[14px] md:text-[15px] font-medium">{s.name}</p>
                    <p className="mt-1 text-[12px] md:text-[13px] leading-[1.9] text-text-secondary">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary">※ 各制度の要件・上限額・申請期間は年度ごとに変わります。</p>
          </QItem>

          {/* Q7: FPって? */}
          <QItem no="07" q="FP(ファイナンシャルプランナー)って、誰のために動く人?" teaser="やまと社内ではなく、独立した提携先のFP事務所">
            <p className="text-[13px] md:text-[14px] leading-[1.95] text-text-secondary mb-6 max-w-[760px]">
              ファイナンシャルプランナー(FP)は、家計やライフプランの整理を手伝う専門家です。やまと不動産にはFPは在籍していません。代わりに独立した提携先のFP事務所と組み、ご家族のライフプランを軸に率直にお話しいただきます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {FP_PROMISES.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="border border-text-primary/15 bg-white p-5">
                    <div className="flex items-baseline justify-between mb-3">
                      <span className="font-oswald tabular-nums" style={{ fontWeight: 300, fontSize: "clamp(28px,2.6vw,40px)", color: FOREST }}>{String(i + 1).padStart(2, "0")}</span>
                      <Icon className="h-5 w-5" style={{ color: FOREST }} strokeWidth={1.5} />
                    </div>
                    <p className="text-text-primary text-[14px] md:text-[15px] font-medium leading-[1.55]">{p.title}</p>
                    <p className="mt-2 text-[12px] md:text-[13px] leading-[1.9] text-text-secondary">{p.body}</p>
                  </div>
                );
              })}
            </div>
            <div className="px-5 md:px-6 py-4 md:py-5 border" style={{ background: "#FAF8F3", borderColor: "rgba(72,107,0,0.15)" }}>
              <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-1">社内体制(ご参考)</p>
              <p className="text-text-primary text-[13px] md:text-[14px] leading-[1.85]">
                社内には、住宅ローンアドバイザー資格保有者がおります(FPとは別)。複数の金融機関(大和信用金庫・奈良中央信用金庫・南都銀行・りそな銀行など)からご状況に合うものをご一緒に整理します。
              </p>
            </div>
          </QItem>

          {/* Q8: はじめての相談 + 家づくり全体の流れ */}
          <QItem no="08" q="はじめての相談、何を持っていけばいいですか?" teaser="持参不要。お電話1本でご予約いただけます">
            <p className="text-[13px] md:text-[14px] leading-[1.95] text-text-secondary mb-6 max-w-[760px]">
              資料はお揃いでなくて構いません。気がかりなことを一つずつ整理する時間です。お子様連れも歓迎です。
            </p>

            {/* 初回相談の3ステップ */}
            <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-3">初回相談の流れ</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {FLOW_STEPS.map((s) => (
                <article key={s.k} className="flex flex-col">
                  <figure className="relative aspect-[4/3] w-full overflow-hidden border border-text-primary/10">
                    <Image src={s.image} alt={s.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </figure>
                  <div className="pt-4">
                    <span className="font-oswald tabular-nums leading-none text-text-primary" style={{ fontWeight: 300, fontSize: "clamp(28px,2.6vw,40px)" }}>{s.k}</span>
                    <p className="mt-2 text-text-primary text-[14px] md:text-[15px] font-medium leading-[1.5]">{s.title}</p>
                    <p className="mt-2 text-[12px] md:text-[13px] leading-[1.9] text-text-secondary">{s.body}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* 家づくり全体の流れ — 3フェーズ */}
            <div className="mt-12 pt-8 border-t border-text-primary/15">
              <p className="text-[12px] tracking-[0.06em] text-text-secondary font-bold mb-3">家づくり全体の流れ</p>
              <p className="text-[12px] md:text-[13px] leading-[1.95] text-text-secondary mb-5 max-w-[760px]">
                ご相談から引き渡し後まで、3つのフェーズに分けてご案内します。お金のことは、各フェーズでご一緒に整えてまいります。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-text-primary/10 border border-text-primary/15">
                {[
                  {
                    label: "Phase A",
                    title: "購入前",
                    duration: "1〜3ヶ月",
                    items: ["初回相談・資金計画", "土地のご紹介", "住宅ローン事前審査", "間取りのたたき台"],
                  },
                  {
                    label: "Phase B",
                    title: "建築中",
                    duration: "4〜6ヶ月",
                    items: ["設計・仕様の決定", "住宅ローン本申込", "着工・上棟", "中間支払い"],
                  },
                  {
                    label: "Phase C",
                    title: "引渡し後",
                    duration: "ずっと",
                    items: ["お引き渡し・入居", "アフターメンテナンス", "固定資産税・住宅ローン控除", "10年・15年の節目点検"],
                  },
                ].map((p) => (
                  <div key={p.label} className="bg-white p-5 md:p-6">
                    <p className="text-[10px] tracking-[0.18em] uppercase font-bold mb-1" style={{ color: FOREST }}>{p.label}</p>
                    <p className="text-text-primary text-[15px] md:text-[16px] font-medium leading-[1.5]">{p.title}</p>
                    <p className="text-text-secondary text-[11px] mt-1">目安: {p.duration}</p>
                    <ul className="mt-4 space-y-1.5">
                      {p.items.map((it) => (
                        <li key={it} className="text-[12px] md:text-[13px] text-text-secondary leading-[1.7] flex items-start gap-2">
                          <span className="mt-1 w-1 h-1 rounded-full shrink-0" style={{ background: FOREST }} aria-hidden />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <CtaButton href="/reserve" variant="primary" size="md" label="初回相談を予約する" sublabel="ご相談・事前審査は無料" icon="calendar" />
              <CtaButton href="/contact" variant="secondary" size="md" label="まずは質問だけ" sublabel="メッセージで気軽にどうぞ" />
            </div>
          </QItem>

          {/* Q9: 払えなくなったら? */}
          <QItem no="09" q="途中で払えなくなったら、どうなりますか?" teaser="代表的なご不安への答えを5つ用意しました">
            <p className="text-[13px] md:text-[14px] leading-[1.95] text-text-secondary mb-6 max-w-[760px]">
              やまとは「払えなくなる家」をお売りしません。万が一の備えを含めて、よくお寄せいただく不安を5つまとめました。
            </p>
            <div>
              {FAQS.map((f, i) => (
                <div key={i} className="border-b border-text-primary/15 py-4 md:py-5 last:border-b-0">
                  <p className="text-text-primary text-[14px] md:text-[15px] font-medium leading-[1.5] mb-2">
                    <span className="text-main mr-2 font-bold">Q.{String(i + 1).padStart(2, "0")}</span>
                    {f.q}
                  </p>
                  <p className="text-[12px] md:text-[13px] leading-[1.95] text-text-secondary max-w-[760px] pl-12 md:pl-14">{f.a}</p>
                </div>
              ))}
            </div>
          </QItem>

          {/* Q10: お金の用語集 */}
          <QItem no="10" q="お金の用語、わからない言葉が出てきたら?" teaser="住宅ローンの基本用語を、やさしく解説します">
            <p className="text-[13px] md:text-[14px] leading-[1.95] text-text-secondary mb-6 max-w-[760px]">
              ご相談で出てきがちな言葉を、ひと言ずつ。「これってどういう意味?」のひと手間を、ここで解消できます。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-text-primary/10 border border-text-primary/15">
              {[
                { term: "元利均等返済", body: "毎月の返済額が一定。家計が立てやすい代わりに、初期は利息の比率が高め。最も一般的。" },
                { term: "元金均等返済", body: "毎月返済する元金が一定。総返済額は元利均等より少ないが、初期の月々負担が大きい。" },
                { term: "変動金利", body: "半年ごとに金利が見直されるタイプ。当初の金利が低いが、上昇すると月々支払いが増える可能性。" },
                { term: "全期間固定金利", body: "完済まで金利が変わらないタイプ。変動より金利は高めだが、家計設計が確実に立てられる。" },
                { term: "フラット35", body: "住宅金融支援機構と民間金融機関が提供する全期間固定の代表的なローン。長期で家計を安定させたい方向け。" },
                { term: "団信(団体信用生命保険)", body: "ローン契約者が万一亡くなった/重度障害になった際、ローン残高がゼロになる保険。多くの住宅ローンで加入が必須または推奨。" },
                { term: "つなぎ融資", body: "土地→建物完成までの間に発生する一時借入。やまとは土地+建物セットで原則発生しません(Q.04参照)。" },
                { term: "返済比率", body: "年収に対する年間返済額の割合。25%以下が無理のない目安。30%超は要見直し。" },
                { term: "頭金 / 自己資金", body: "借入を減らす手元資金。生活防衛費(3〜6ヶ月)を残した上で充てるのが安心。" },
                { term: "諸費用", body: "登記費用・印紙税・ローン手数料・火災保険等の総称。総額の5〜10%が目安(Q.01参照)。" },
                { term: "住宅ローン控除", body: "年末ローン残高の0.7%が、最大13年間にわたり所得税(住民税)から控除される制度。長期優良住宅等で枠が拡大。" },
                { term: "事前審査(仮審査)", body: "本契約前に金融機関が借入可能性を判断する審査。やまとでは無料で複数行へ並行依頼可。" },
              ].map((t) => (
                <div key={t.term} className="bg-white px-4 py-4 md:px-5 md:py-5">
                  <p className="text-text-primary text-[14px] md:text-[15px] font-medium mb-1.5">{t.term}</p>
                  <p className="text-[12px] md:text-[13px] leading-[1.95] text-text-secondary max-w-[680px]">{t.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[11px] md:text-[12px] leading-[1.85] text-text-secondary">
              ※ ご相談時には、これらの用語をご一緒に整理しながらお話しします。わからない言葉のままで進むことはありません。
            </p>
          </QItem>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// 本体: ThirtyYearAnswer + QuestionsAccordion
// ─────────────────────────────────────────────

export default function MoneyFullSection() {
  return (
    <>
      <ThirtyYearAnswer />
      <LoanAsFinancialTool />
      <QuestionsAccordion />
    </>
  );
}
