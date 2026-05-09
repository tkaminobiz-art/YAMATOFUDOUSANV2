import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowRight,
  ChevronDown,
  FileSearch,
  Landmark,
  MapPinned,
  MessageCircle,
  ReceiptText,
  WalletCards,
  type LucideIcon,
} from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

const BRAND = {
  red: "#E84336",
  redDark: "#8F211B",
  redSoft: "#FFF0EE",
  green: "#2F4A2C",
  lime: "#A9D159",
  greenSoft: "#EAF2E8",
  paper: "#CBD2D8",
  ivory: "#F0F2F4",
  ink: "#111315",
  muted: "#56616A",
  border: "#B9C2CA",
  line: "#06C755",
};

const ZERO_ROWS = [
  {
    label: "仲介手数料",
    market: "50〜100万円",
    result: "当社分譲地なら不要",
    body: "宅建会社直営の分譲地なら、仲介会社を挟みません。",
  },
  {
    label: "つなぎ融資",
    market: "30〜80万円",
    result: "原則発生しない",
    body: "土地分譲と建物施工を一体で進め、タイムラグを抑えます。",
  },
  {
    label: "地盤改良費",
    market: "最大150万円",
    result: "当社規定で負担",
    body: "土地の状態を先に確認し、増えやすい費用を契約前に扱います。",
  },
] as const;

const OUTPUTS: Array<{
  icon: LucideIcon;
  title: string;
  body: string;
}> = [
  {
    icon: WalletCards,
    title: "土地込み総額の目安",
    body: "土地・建物・諸費用・外構・引越しまで、ざっくり一枚で確認します。",
  },
  {
    icon: Landmark,
    title: "月々支払いの目安",
    body: "借入額ではなく、家計に残る余白から判断できるようにします。",
  },
  {
    icon: MapPinned,
    title: "予算に合う土地候補",
    body: "奈良・京都南部の自社分譲地を含め、候補を現実的に絞ります。",
  },
  {
    icon: ReceiptText,
    title: "増えやすい費用チェック表",
    body: "仲介、つなぎ、地盤、登記、外構など、後で確認になりやすい項目を先出しします。",
  },
] as const;

const FAQS: Array<{
  no: string;
  question: string;
  answer: ReactNode;
}> = [
  {
    no: "01",
    question: "契約後、見積もりは増えませんか？",
    answer: (
      <>
        <p>
          正直に言うと、途中で「太陽光を追加したい」「収納を増やしたい」など仕様を上げる場合は金額が変わります。
          だからこそ、契約前に「含まれるもの」「別途になるもの」「選ぶと増えるもの」を先に並べます。
        </p>
        <p className="mt-4">
          やまとの資金計画は、安く見せるための見積書ではありません。土地込み総額で、後から確認になりやすい費用を最初に見せるためのものです。
        </p>
      </>
    ),
  },
  {
    no: "02",
    question: "つなぎ融資は本当に発生しないのですか？",
    answer: (
      <p>
        やまとの土地と建物をセットで進める場合、土地購入から建物完成までのタイムラグを抑えられるため、つなぎ融資は原則発生しません。
        ご自身の土地や金融機関の条件がある場合は個別に確認します。
      </p>
    ),
  },
  {
    no: "03",
    question: "土地がまだなくても相談していいですか？",
    answer: (
      <p>
        むしろ土地がない段階で相談してください。土地価格が変わると、建てられる家も月々支払いも変わります。
        やまとは自社分譲地を含めて、土地候補と建物を同時に見ます。
      </p>
    ),
  },
  {
    no: "04",
    question: "年収的に厳しいかどうかも見てもらえますか？",
    answer: (
      <p>
        見ます。借りられる額ではなく、教育費・車・老後資金まで含めて無理が出にくい月々を確認します。
        必要に応じて、独立した立場の提携先FP事務所にもつなげられます。
      </p>
    ),
  },
  {
    no: "05",
    question: "相談したら契約を急かされませんか？",
    answer: (
      <p>
        急かす場ではありません。まずは総額を知るための相談です。
        「今は建てない」という判断になっても大丈夫です。判断材料を持ち帰ってください。
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

function LineAnchor({ children }: { children: ReactNode }) {
  return (
    <a
      href={LINE_ADD_FRIEND_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-[6px] px-6 py-4 text-[14px] font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_-20px_rgba(6,199,85,0.82)]"
      style={{ background: BRAND.line }}
    >
      <MessageCircle className="h-5 w-5" strokeWidth={1.9} fill="currentColor" />
      {children}
    </a>
  );
}

function ZeroDeclaration() {
  return (
    <section className="py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.ink }}>
      <div className="mx-auto grid max-w-[1360px] gap-12 px-[var(--page-px)] lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="money-eyebrow" style={{ color: BRAND.red }}>
            Zero declaration
          </p>
          <h2 className="money-section-title mt-4 text-white">
            見積書の外に
            <br />
            追い出されやすい費用を、
            <br />
            先に潰す。
          </h2>
          <p className="money-body mt-6 max-w-[620px] text-white/66">
            ここは上品にぼかしません。仲介手数料、つなぎ融資、地盤改良費。
            家づくりの不透明さを、契約前に一つずつ処理します。
          </p>
        </div>

        <div className="grid gap-px overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.2)" }}>
          {ZERO_ROWS.map((row) => (
            <article key={row.label} className="grid gap-5 bg-[#15191C] p-5 md:grid-cols-[0.72fr_0.62fr_1fr] md:items-center md:p-7">
              <div>
                <p className="money-eyebrow text-white/52">
                  {row.label}
                </p>
                <p className="money-body-sm mt-2 text-white/56">
                  {row.body}
                </p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-white/42">一般的に上乗せになりやすい目安</p>
                <p className="font-oswald money-number-lg mt-2" style={{ color: BRAND.red }}>
                  {row.market}
                </p>
              </div>
              <div className="border-l-[5px] p-4" style={{ borderColor: BRAND.lime, background: "rgba(169,209,89,0.11)" }}>
                <p className="text-[11px] font-bold text-white/48">やまとの扱い</p>
                <p className="money-card-title mt-2 text-white">
                  {row.result}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ConsultationOutput() {
  return (
    <section className="py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.ivory }}>
      <div className="mx-auto max-w-[1360px] px-[var(--page-px)]">
        <div className="grid gap-12 lg:grid-cols-[0.84fr_1.16fr] lg:items-start">
          <SectionLead
            eyebrow="What you receive"
            title={
              <>
                「問い合わせ」ではなく、
                <br />
                <span style={{ color: BRAND.red }}>自分の場合の答え</span>
                を受け取る。
              </>
            }
            body={
              <>
                人が欲しいのは資料ではなく、自分たちの場合どうなるのかです。
                資金相談の到達点を、入力前から明確にします。
              </>
            }
          />

          <div className="grid gap-px overflow-hidden border md:grid-cols-2" style={{ borderColor: BRAND.border, background: BRAND.border }}>
            {OUTPUTS.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="bg-white p-6 md:p-7">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[6px]"
                    style={{ background: BRAND.redSoft, color: BRAND.red }}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <h3 className="money-card-title mt-5" style={{ color: BRAND.ink }}>
                    {item.title}
                  </h3>
                  <p className="money-body-sm mt-3" style={{ color: BRAND.muted }}>
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaStaircase() {
  return (
    <section className="py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.paper }}>
      <div className="mx-auto grid max-w-[1360px] gap-12 px-[var(--page-px)] lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <SectionLead
            eyebrow="Next step"
            title={
              <>
                いきなり来場予約ではなく、
                <br />
                <span style={{ color: BRAND.green }}>総額だけ先に見る。</span>
              </>
            }
            body="まだ会社を決める段階でなくても大丈夫です。最初の一歩は、土地込み総額と月々支払いを知ることです。"
          />

          <div className="mt-10 grid gap-px overflow-hidden border" style={{ borderColor: BRAND.border, background: BRAND.border }}>
            {[
              ["01", "30秒診断", "月々から土地込み総額の概算を見る。"],
              ["02", "LINEで相談", "希望エリアと予算に合う土地候補を聞く。"],
              ["03", "標準仕様を見る", "モデルハウスで、価格に含まれる設備を確認する。"],
              ["04", "個別相談", "土地・建物・ローンを一枚にして決める。"],
            ].map(([no, title, body]) => (
              <div key={no} className="grid gap-4 bg-white p-5 md:grid-cols-[60px_1fr]">
                <p className="font-oswald money-number-md" style={{ color: no === "01" ? BRAND.red : BRAND.green }}>
                  {no}
                </p>
                <div>
                  <h3 className="money-card-title" style={{ color: BRAND.ink }}>
                    {title}
                  </h3>
                  <p className="money-body-sm mt-1" style={{ color: BRAND.muted }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#diagnosis"
              className="inline-flex min-h-[56px] items-center justify-center gap-2 rounded-[6px] px-6 py-4 text-[14px] font-black text-white transition duration-300 hover:-translate-y-0.5"
              style={{ background: BRAND.red }}
            >
              30秒診断へ
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </a>
            <LineAnchor>LINEで候補を聞く</LineAnchor>
          </div>
        </div>

        <figure className="relative aspect-[4/5] overflow-hidden border" style={{ borderColor: BRAND.border }}>
          <Image
            src="/images/works/case2-living.webp"
            alt="家族が暮らすリビングの施工事例"
            fill
            sizes="(max-width: 1024px) 100vw, 48vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 p-5" style={{ background: "linear-gradient(180deg, rgba(23,20,17,0) 0%, rgba(23,20,17,0.78) 100%)" }}>
            <p className="money-card-title text-white">
              暮らしに必要な広さと予算を、一緒に確認できます。
            </p>
          </div>
        </figure>
      </div>
    </section>
  );
}

function QuestionItem({ item, open = false }: { item: (typeof FAQS)[number]; open?: boolean }) {
  return (
    <details open={open} className="group border bg-white" style={{ borderColor: BRAND.border }}>
      <summary className="grid cursor-pointer list-none grid-cols-[48px_1fr_auto] items-center gap-4 px-5 py-5 md:px-7 md:py-6 [&::-webkit-details-marker]:hidden">
        <span className="font-oswald money-number-sm" style={{ color: item.no === "01" ? BRAND.red : "rgba(23,20,17,0.38)" }}>
          {item.no}
        </span>
        <span className="money-card-title" style={{ color: BRAND.ink }}>
          {item.question}
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-[6px]" style={{ background: BRAND.redSoft, color: BRAND.red }}>
          <ChevronDown className="h-4 w-4 transition duration-300 group-open:rotate-180" strokeWidth={2} />
        </span>
      </summary>
      <div className="money-body-sm border-t px-5 py-6 md:px-7" style={{ borderColor: BRAND.border, color: BRAND.muted }}>
        {item.answer}
      </div>
    </details>
  );
}

function CombatFaq() {
  return (
    <section className="py-[clamp(84px,9vw,170px)]" style={{ background: BRAND.ivory }}>
      <div className="mx-auto max-w-[1120px] px-[var(--page-px)]">
        <SectionLead
          align="center"
          eyebrow="Questions that matter"
          title={
            <>
              最大の不安は、
              <br />
              FAQの奥に隠さない。
            </>
          }
          body="細かな補足ではなく、問い合わせ前に頭の中で起きている不安へ先に答えます。"
        />
        <div className="mt-12 space-y-3">
          {FAQS.map((item, index) => (
            <QuestionItem key={item.no} item={item} open={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DocumentsBand() {
  return (
    <section className="py-[clamp(72px,7vw,130px)]" style={{ background: BRAND.green }}>
      <div className="mx-auto grid max-w-[1180px] gap-7 px-[var(--page-px)] md:grid-cols-[auto_1fr_auto] md:items-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-[6px] bg-white/12 text-white">
          <FileSearch className="h-7 w-7" strokeWidth={1.8} />
        </span>
        <div>
          <p className="money-eyebrow text-white/62">
            Before visiting
          </p>
          <h2 className="money-tool-title mt-2 text-white">
            持ち物なしで大丈夫。今の家賃と希望エリアだけでも、総額の糸口は出せます。
          </h2>
        </div>
        <Link
          href="/lots"
          className="inline-flex min-h-[54px] items-center justify-center gap-2 rounded-[6px] border border-white/70 px-5 py-3 text-[14px] font-black text-white transition duration-300 hover:bg-white hover:text-[#171411]"
        >
          土地候補を見る
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}

export default function MoneyFullSection() {
  return (
    <>
      <ZeroDeclaration />
      <ConsultationOutput />
      <CtaStaircase />
      <CombatFaq />
      <DocumentsBand />
    </>
  );
}
