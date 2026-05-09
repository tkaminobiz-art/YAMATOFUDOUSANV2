"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  ArrowRight,
  Minus,
  PiggyBank,
  Plus,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";
import LoanSimulator from "@/components/money/LoanSimulator";

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

const BUCKETS = [
  { label: "建物本体", amount: "2,280〜2,480万円", body: "京・風・花の3プラン。標準仕様を含めて整理します。" },
  { label: "土地代", amount: "500〜2,500万円", body: "大和郡山市矢田町など、価格を抑えやすい自社分譲地もご相談いただけます。" },
  { label: "諸費用", amount: "200〜400万円", body: "登記・印紙税・ローン手数料・火災保険などの目安です。" },
  { label: "引越し・家具", amount: "50〜150万円", body: "新生活に必要な費用も、最初から計画に入れておきます。" },
] as const;

const FUTURE_ROWS = [
  { age: "40", title: "契約・建築開始", rent: "0", own: "0", note: "ここから月々の住居費を並べて見ます。" },
  { age: "55", title: "15年目", rent: "1,530", own: "1,530", note: "月8.5万円の場合、累計支出はほぼ同じです。" },
  { age: "65", title: "25年目", rent: "2,550", own: "2,550", note: "教育費・老後資金との兼ね合いを確認したい時期です。" },
  { age: "75", title: "35年目", rent: "3,570", own: "3,570", note: "ローン完済の節目。ここから月々の負担の見え方が変わります。" },
  { age: "85", title: "45年目", rent: "4,590", own: "3,700", note: "賃貸は家賃が続き、持ち家は固定資産税と修繕費が中心になります。" },
] as const;

const LOAN_TYPES = [
  { title: "変動金利型", rate: "0.4〜0.7%", body: "当初の月々を抑えやすい一方で、金利上昇時の余力確認が必要です。" },
  { title: "全期間固定型", rate: "1.7〜2.0%", body: "完済まで月々が変わらず、教育費や老後資金の見通しを立てやすい方式です。" },
  { title: "固定期間選択型", rate: "1.0〜1.5%", body: "一定期間の金利を固定し、変動と固定の中間として検討できます。" },
] as const;

const SUPPORTS = [
  "住宅ローン控除",
  "年度ごとの住宅省エネ補助",
  "GX志向型住宅に関する補助制度",
  "贈与税の非課税特例",
] as const;

const FLOW_STEPS = [
  {
    no: "01",
    title: "暮らしの前提をそろえる",
    body: "家族構成、時期、今の住居費、教育費の山。金額の前に生活の輪郭を見ます。",
    image: "/images/works/case1-living.webp",
  },
  {
    no: "02",
    title: "総額と月々を並べる",
    body: "土地・建物・諸費用・住宅ローンを一枚で見て、借りられる額ではなく返せる額へ寄せます。",
    image: "/images/works/case2-kitchen.webp",
  },
  {
    no: "03",
    title: "次に確認する一点を決める",
    body: "金融機関、土地候補、FP相談、見学。次の一歩を小さく決めて持ち帰れます。",
    image: "/images/works/case3-living.webp",
  },
] as const;

const FAQS: Array<{
  no: string;
  question: string;
  teaser: string;
  children: ReactNode;
}> = [
  {
    no: "01",
    question: "家のお金、総額でいくらですか？",
    teaser: "土地・建物・諸費用・引越しまで、内訳で見ます。",
    children: (
      <div className="space-y-6">
        <p>
          大まかな総額だけでなく、内訳から確認します。「含まれるもの」と「別途になるもの」を、最初の打ち合わせでそろえるためです。
        </p>
        <div className="grid gap-px overflow-hidden border md:grid-cols-2" style={{ borderColor: BRAND.border, background: BRAND.border }}>
          {BUCKETS.map((bucket) => (
            <div key={bucket.label} className="bg-white p-5">
              <p className="text-[12px] font-bold tracking-[0.08em]" style={{ color: BRAND.muted }}>
                {bucket.label}
              </p>
              <p className="mt-2 font-oswald text-[28px] leading-none" style={{ color: BRAND.deep, fontWeight: 400 }}>
                {bucket.amount}
              </p>
              <p className="mt-3 text-[12px] leading-[1.8]" style={{ color: BRAND.muted }}>
                {bucket.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    no: "02",
    question: "月々のお支払いは、どれくらいですか？",
    teaser: "借入2,500万円の試算例で、月7.1万円から。",
    children: (
      <div className="space-y-5">
        <p>
          試算例は、30代ご夫婦・お子さま1人、世帯年収500万円、借入2,500万円、金利1.0%、35年です。返済比率は年収の17%前後になります。
        </p>
        <p>
          実際には、固定資産税・修繕費・火災保険・光熱費も含めて、生活費や教育費を圧迫しない範囲を一緒に確認します。
        </p>
      </div>
    ),
  },
  {
    no: "03",
    question: "つなぎ融資って、本当に発生しないのですか？",
    teaser: "自社分譲地と建物をセットで進める場合、原則発生しません。",
    children: (
      <div className="space-y-5">
        <p>
          つなぎ融資は、土地購入から建物完成までの間に発生する一時的な借入です。一般的には金利・事務手数料・印紙代などで30〜80万円程度の上乗せになることがあります。
        </p>
        <div className="border p-5" style={{ borderColor: BRAND.deep, background: "rgba(169,209,89,0.16)" }}>
          <p className="font-bold leading-[1.7]" style={{ color: BRAND.text }}>
            やまとは土地分譲と建物施工を自社で一貫するため、土地購入と建物着工のタイムラグを抑えられます。
          </p>
        </div>
        <p>
          ご自身が所有されている土地で建てる場合や、特殊な金融機関の条件下では個別に確認します。
        </p>
      </div>
    ),
  },
  {
    no: "04",
    question: "住宅ローンの種類と制度は、どう選びますか？",
    teaser: "変動・固定・固定期間選択型と、補助制度を同時に見ます。",
    children: (
      <div className="space-y-7">
        <div className="grid gap-3 md:grid-cols-3">
          {LOAN_TYPES.map((item) => (
            <div key={item.title} className="border bg-white p-5" style={{ borderColor: BRAND.border }}>
              <p className="font-bold" style={{ color: BRAND.text }}>
                {item.title}
              </p>
              <p className="mt-2 font-oswald text-[28px] leading-none" style={{ color: BRAND.deep, fontWeight: 400 }}>
                {item.rate}
              </p>
              <p className="mt-3 text-[12px] leading-[1.8]" style={{ color: BRAND.muted }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
        <div>
          <p className="text-[12px] font-bold tracking-[0.08em]" style={{ color: BRAND.muted }}>
            利用を検討できる制度
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUPPORTS.map((support) => (
              <span key={support} className="border bg-white px-3 py-2 text-[12px]" style={{ borderColor: BRAND.border, color: BRAND.text }}>
                {support}
              </span>
            ))}
          </div>
          <p className="mt-3 text-[11px] leading-[1.8]" style={{ color: BRAND.muted }}>
            ※ 制度の要件・上限額・申請期間は年度・予算により変わります。最新情報を確認してご案内します。
          </p>
        </div>
      </div>
    ),
  },
  {
    no: "05",
    question: "自社の土地は、どこにありますか？",
    teaser: "大和郡山市矢田町ほか、奈良・京都南部でご相談いただけます。",
    children: (
      <div className="space-y-5">
        <p>
          やまと不動産は宅地分譲も事業の柱の一つです。中間業者を挟まないため、土地と建物のご相談をまとめて進めやすくなります。
        </p>
        <div className="grid gap-px overflow-hidden border md:grid-cols-3" style={{ borderColor: BRAND.border, background: BRAND.border }}>
          {[
            ["仲介手数料", "ゼロ", "宅建会社直営の分譲地。仲介会社を挟みません。"],
            ["地盤改良費", "当社負担", "造成済みの分譲地では、地盤改良費を当社が負担します。"],
            ["公開区画", "27区画", "累計分譲実績は90区画以上です。"],
          ].map(([label, value, body]) => (
            <div key={label} className="bg-white p-5">
              <p className="text-[12px] font-bold" style={{ color: BRAND.muted }}>
                {label}
              </p>
              <p className="mt-2 text-[24px] font-bold" style={{ color: BRAND.deep }}>
                {value}
              </p>
              <p className="mt-3 text-[12px] leading-[1.8]" style={{ color: BRAND.muted }}>
                {body}
              </p>
            </div>
          ))}
        </div>
        <Link href="/lots" className="inline-flex items-center gap-1 text-[13px] font-bold" style={{ color: BRAND.deep }}>
          分譲区画を見る
          <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
        </Link>
      </div>
    ),
  },
  {
    no: "06",
    question: "FPは、どのような立場で相談に乗ってくれますか？",
    teaser: "やまと社内ではなく、独立した立場の提携先FP事務所です。",
    children: (
      <div className="space-y-5">
        <p>
          ファイナンシャルプランナーは、家計やライフプランの整理を手伝う専門家です。やまと不動産にはFPは在籍していません。独立した立場の提携先FP事務所にご相談いただけます。
        </p>
        <div className="border p-5" style={{ borderColor: BRAND.border, background: BRAND.base }}>
          <p className="font-bold leading-[1.7]" style={{ color: BRAND.text }}>
            社内には住宅ローンアドバイザー資格保有者がおります。複数の金融機関から、ご状況に合うものを一緒に整理します。
          </p>
        </div>
      </div>
    ),
  },
  {
    no: "07",
    question: "はじめての相談、何を持っていけばいいですか？",
    teaser: "資料がなくても構いません。生活の前提から整理します。",
    children: (
      <p>
        手ぶらでも構いません。現在の家賃、希望エリア、時期、ご家族の人数など、わかる範囲から始めます。住宅ローンの事前審査が必要な場合も、段取りからご案内します。
      </p>
    ),
  },
  {
    no: "08",
    question: "返済が不安になった場合、どうなりますか？",
    teaser: "無理な返済計画になる家づくりはおすすめしません。",
    children: (
      <p>
        ご相談時に、月々の支払いが生活費・教育費を圧迫しない範囲を一緒に確認します。万が一に備えた団体信用生命保険の内容も、金融機関ごとに確認します。
      </p>
    ),
  },
  {
    no: "09",
    question: "用語がわからないまま進みませんか？",
    teaser: "住宅ローンの基本用語も、ひとつずつ確認します。",
    children: (
      <div className="grid gap-px overflow-hidden border md:grid-cols-2" style={{ borderColor: BRAND.border, background: BRAND.border }}>
        {[
          ["元利均等返済", "毎月の返済額が一定で、家計が立てやすい方式です。"],
          ["変動金利", "半年ごとに金利が見直されるタイプです。"],
          ["団信", "契約者に万が一があった場合にローン残高がゼロになる保険です。"],
          ["返済比率", "年収に対する年間返済額の割合。25%以下がひとつの目安です。"],
        ].map(([term, body]) => (
          <div key={term} className="bg-white p-4">
            <p className="font-bold" style={{ color: BRAND.text }}>
              {term}
            </p>
            <p className="mt-2 text-[12px] leading-[1.8]" style={{ color: BRAND.muted }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    no: "10",
    question: "相談したら、契約を急かされませんか？",
    teaser: "今は建てない、という判断も大切にします。",
    children: (
      <p>
        やまとは資金相談を、契約を急かす場とは考えていません。提携FPと話したあとに「やっぱり今は建てない」とお決めになっても、遠慮なくご判断ください。
      </p>
    ),
  },
];

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
    <div className={align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[780px]"}>
      <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em] md:text-[12px]" style={{ color: BRAND.deep }}>
        {eyebrow}
      </p>
      <h2 className="mt-4 text-[clamp(26px,3.2vw,48px)] font-bold leading-[1.3] tracking-[0]" style={{ color: BRAND.text }}>
        {title}
      </h2>
      {body && (
        <p className="mt-5 text-[14px] leading-[1.95] md:text-[15px]" style={{ color: BRAND.muted }}>
          {body}
        </p>
      )}
    </div>
  );
}

function LoanStudio() {
  const ref = useScrollIn<HTMLDivElement>();
  return (
    <section id="loan-studio" className="scroll-mt-24 py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.base }}>
      <div ref={ref} className="scroll-in mx-auto max-w-[1280px] px-[var(--page-px)]">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <SectionLead
              eyebrow="Loan Studio"
              title={
                <>
                  借りられる額より、
                  <br />
                  返せる額へ。
                </>
              }
              body={
                <>
                  住宅ローンは、低い金利で長く借りられる家計設計の手段でもあります。
                  ただし、主役は借入額ではなく、暮らしが続く月々です。
                </>
              }
            />
            <div className="mt-9 grid gap-px overflow-hidden border" style={{ borderColor: BRAND.border, background: BRAND.border }}>
              {[
                [PiggyBank, "返済比率", "25%以下をひとつの目安に、家計の余白を確認します。"],
                [ReceiptText, "建築後の費用", "固定資産税・修繕費・保険・光熱費も月々に織り込みます。"],
                [ShieldCheck, "万が一への備え", "団体信用生命保険や固定金利の選択も含めて確認します。"],
              ].map(([Icon, title, body]) => {
                const LucideIcon = Icon as typeof PiggyBank;
                return (
                  <div key={String(title)} className="flex gap-4 bg-white p-5">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px]" style={{ background: "rgba(169,209,89,0.22)", color: BRAND.deep }}>
                      <LucideIcon className="h-5 w-5" strokeWidth={1.7} />
                    </span>
                    <div>
                      <p className="text-[14px] font-bold" style={{ color: BRAND.text }}>
                        {String(title)}
                      </p>
                      <p className="mt-1 text-[12px] leading-[1.8]" style={{ color: BRAND.muted }}>
                        {String(body)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <LoanSimulator />
        </div>
      </div>
    </section>
  );
}

function FutureTimeline() {
  const ref = useScrollIn<HTMLDivElement>();
  return (
    <section className="py-[clamp(84px,9vw,180px)]" style={{ background: BRAND.ivory }}>
      <div ref={ref} className="scroll-in mx-auto max-w-[1280px] px-[var(--page-px)]">
        <SectionLead
          align="center"
          eyebrow="Future Ledger"
          title={
            <>
              75歳の節目で、
              <br className="sm:hidden" />
              景色が変わります。
            </>
          }
          body={
            <>
              40歳で契約、借入3,000万円・金利1.0%・35年ローン・月8.5万円の概算です。
              同じ月8.5万円の家賃と並べると、完済後に残るものが変わります。
            </>
          }
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-stretch">
          <div className="border bg-white p-5 md:p-8" style={{ borderColor: BRAND.border }}>
            <div className="grid gap-5">
              {FUTURE_ROWS.map((row, index) => {
                const isPivot = row.age === "75" || row.age === "85";
                return (
                  <article key={row.age} className="grid gap-4 border-b pb-5 last:border-b-0 last:pb-0 md:grid-cols-[88px_1fr]" style={{ borderColor: BRAND.border }}>
                    <div>
                      <p className="font-oswald text-[42px] leading-none tracking-[0]" style={{ color: isPivot ? BRAND.deep : BRAND.text, fontWeight: 390 }}>
                        {row.age}
                      </p>
                      <p className="mt-1 text-[11px] font-bold" style={{ color: BRAND.muted }}>
                        歳 / {row.title}
                      </p>
                    </div>
                    <div>
                      <div className="grid grid-cols-[72px_1fr_auto] items-center gap-3">
                        <span className="text-[12px] font-bold" style={{ color: BRAND.muted }}>
                          賃貸
                        </span>
                        <span className="h-2 bg-[#E4DFD2]">
                          <span className="block h-full" style={{ width: `${Math.max(index * 22, 4)}%`, background: "#9A9486" }} />
                        </span>
                        <span className="font-oswald text-[18px] leading-none" style={{ color: BRAND.text, fontWeight: 390 }}>
                          {row.rent}万
                        </span>
                      </div>
                      <div className="mt-2 grid grid-cols-[72px_1fr_auto] items-center gap-3">
                        <span className="text-[12px] font-bold" style={{ color: BRAND.deep }}>
                          持ち家
                        </span>
                        <span className="h-2 bg-[#E4DFD2]">
                          <span className="block h-full" style={{ width: `${Math.max(Math.min(index * 21, 82), 4)}%`, background: BRAND.deep }} />
                        </span>
                        <span className="font-oswald text-[18px] leading-none" style={{ color: BRAND.deep, fontWeight: 390 }}>
                          {row.own}万
                        </span>
                      </div>
                      <p className="mt-3 text-[12px] leading-[1.8]" style={{ color: isPivot ? BRAND.deep : BRAND.muted }}>
                        {row.note}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <aside className="flex flex-col justify-between border p-6" style={{ borderColor: BRAND.deep, background: BRAND.base }}>
            <div>
              <p className="font-inter text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: BRAND.deep }}>
                At 75
              </p>
              <p className="mt-5 text-[18px] font-bold leading-[1.6]" style={{ color: BRAND.text }}>
                月々の支払いはゼロへ。土地と建物が、資産として残ります。
              </p>
            </div>
            <div className="mt-10">
              <p className="flex items-baseline gap-1 whitespace-nowrap">
                <span className="text-[28px] font-bold" style={{ color: BRAND.deep }}>
                  〜
                </span>
                <span className="font-oswald text-[72px] leading-none tracking-[0]" style={{ color: BRAND.deep, fontWeight: 380 }}>
                  4,500
                </span>
                <span className="text-[14px] font-bold" style={{ color: BRAND.text }}>
                  万円相当
                </span>
              </p>
              <p className="mt-4 text-[11px] leading-[1.8]" style={{ color: BRAND.muted }}>
                土地2,500万円 + 建物2,000万円を想定した上限の目安。資産価値はエリア・建物の状態・市況により変動します。
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ConsultationFlow() {
  const ref = useScrollIn<HTMLDivElement>();
  return (
    <section className="py-[clamp(82px,8vw,160px)]" style={{ background: BRAND.base }}>
      <div ref={ref} className="scroll-in mx-auto max-w-[1280px] px-[var(--page-px)]">
        <SectionLead
          eyebrow="First Consultation"
          title={
            <>
              相談は、資料よりも
              <br />
              生活の話から。
            </>
          }
          body="手ぶらで構いません。まずは、ご家族の人数、時期、今の住居費、気になっている一点から始めます。"
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {FLOW_STEPS.map((step) => (
            <article key={step.no}>
              <figure className="relative aspect-[4/3] overflow-hidden border" style={{ borderColor: BRAND.border }}>
                <Image src={step.image} alt={step.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
              </figure>
              <div className="pt-5">
                <p className="font-oswald text-[32px] leading-none" style={{ color: BRAND.deep, fontWeight: 360 }}>
                  {step.no}
                </p>
                <h3 className="mt-3 text-[17px] font-bold leading-[1.55] tracking-[0]" style={{ color: BRAND.text }}>
                  {step.title}
                </h3>
                <p className="mt-2 text-[13px] leading-[1.9]" style={{ color: BRAND.muted }}>
                  {step.body}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaButton href="/reserve" variant="primary" size="md" label="初回相談を予約する" sublabel="ご相談・事前審査は無料" icon="calendar" />
          <CtaButton href="/contact" variant="secondary" size="md" label="まずは質問だけ" sublabel="メッセージで気軽にどうぞ" />
        </div>
      </div>
    </section>
  );
}

function QuestionItem({
  item,
  defaultOpen = false,
}: {
  item: (typeof FAQS)[number];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <article className="border bg-white" style={{ borderColor: open ? BRAND.deep : BRAND.border }}>
      <button
        type="button"
        className="grid w-full grid-cols-[48px_1fr_auto] items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-[#F7F4EC] md:px-7 md:py-6"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="font-oswald text-[24px] leading-none" style={{ color: open ? BRAND.deep : "rgba(29,29,24,0.38)", fontWeight: 360 }}>
          {item.no}
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-bold leading-[1.55] tracking-[0] md:text-[17px]" style={{ color: BRAND.text }}>
            {item.question}
          </span>
          <span className="mt-1 block truncate text-[12px] md:text-[13px]" style={{ color: BRAND.muted }}>
            {item.teaser}
          </span>
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-[6px]" style={{ background: open ? BRAND.deep : BRAND.base, color: open ? "white" : BRAND.deep }}>
          {open ? <Minus className="h-4 w-4" strokeWidth={1.8} /> : <Plus className="h-4 w-4" strokeWidth={1.8} />}
        </span>
      </button>
      <div className={`grid transition-[grid-template-rows,opacity] duration-300 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="border-t px-5 py-6 text-[13px] leading-[1.95] md:px-7 md:text-[14px]" style={{ borderColor: BRAND.border, color: BRAND.muted }}>
            {item.children}
          </div>
        </div>
      </div>
    </article>
  );
}

function QuestionsSection() {
  const ref = useScrollIn<HTMLDivElement>();
  return (
    <section id="ch-questions" className="scroll-mt-24 py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.ivory }}>
      <div ref={ref} className="scroll-in mx-auto max-w-[1120px] px-[var(--page-px)]">
        <SectionLead
          align="center"
          eyebrow="Question Library"
          title="気になるところから、開いてください。"
          body="資金計画の話は、一度で全部わからなくて大丈夫です。必要なところから、一点ずつ確認できます。"
        />
        <div className="mt-12 space-y-3">
          {FAQS.map((item, index) => (
            <QuestionItem key={item.no} item={item} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MoneyFullSection() {
  return (
    <>
      <LoanStudio />
      <FutureTimeline />
      <ConsultationFlow />
      <QuestionsSection />
    </>
  );
}
