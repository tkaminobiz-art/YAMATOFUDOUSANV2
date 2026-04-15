"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

type Staff = {
  id: string;
  name: string;
  dept: string;
  career: string;
};

type Phase = {
  num: string;
  title: string;
  subtitle: string;
  staff: Staff[];
  highlight?: boolean; // 特別扱いするフェーズ
  note?: string; // 補足メッセージ
};

/** キーマンは上部で大きく見せ、フェーズグリッドからは除外 */
const KEY_STAFF_IDS = new Set(["92289", "126646", "92140"]);

const KEY_STAFF = [
  {
    id: "92289",
    name: "古谷 泰彦",
    role: "代表取締役社長",
    quote: "お引き渡しの日からが、本当のお付き合いの始まりです。",
  },
  {
    id: "126646",
    name: "栗野 佑也",
    role: "住宅設計部 責任者",
    quote: "図面の一枚一枚に、家族の暮らしを重ねていきます。",
  },
  {
    id: "92140",
    name: "入江 将大",
    role: "本社工務部 部長",
    quote: "現場で体感する、木の温度と精度を大切にしています。",
  },
] as const;

const PHASES: Phase[] = [
  {
    num: "01",
    title: "最初に、お話を伺う。",
    subtitle: "営業 — ご相談からご契約まで",
    staff: [
      { id: "100104", name: "田中 信次", dept: "営業本部長", career: "15年" },
      { id: "147195", name: "西口・クロフォード・丈", dept: "営業課長", career: "12年" },
      { id: "157200", name: "山岡 洋一", dept: "京都支店長", career: "14年" },
      { id: "218450", name: "柏崎 修平", dept: "本店営業部", career: "7年" },
      { id: "258798", name: "三野 雄資", dept: "営業部", career: "3年" },
    ],
  },
  {
    num: "02",
    title: "理想を、図面にする。",
    subtitle: "設計 — 初回の打ち合わせから同席する、自社設計士",
    highlight: true,
    note: "営業担当だけじゃなく、プロの設計士がはじめの打ち合わせから同席します。間取りを1から組み、3ヶ月かけて何度でもプランを磨き上げます。",
    staff: [
      { id: "126651", name: "河野 英宣", dept: "開発設計部 部長", career: "30年" },
      { id: "126646", name: "栗野 佑也", dept: "住宅設計部 責任者", career: "12年" },
      { id: "194526", name: "岩佐 篤志", dept: "建築設計部", career: "13年" },
    ],
  },
  {
    num: "03",
    title: "実際に、建てる。",
    subtitle: "土木・工務 — 土地造成から竣工まで",
    staff: [
      { id: "170083", name: "森下 嘉久", dept: "本店土木部 部長", career: "37年" },
      { id: "92140", name: "入江 将大", dept: "本社工務部 部長", career: "10年" },
      { id: "159106", name: "稲塚 康員", dept: "本店工務部", career: "6年" },
      { id: "58990", name: "澤 佳純", dept: "本店工務部", career: "2年" },
      { id: "258809", name: "尾田 洋基", dept: "本社工務部", career: "2年" },
      { id: "218454", name: "イスル サンパツ", dept: "土木部・工務部", career: "" },
    ],
  },
  {
    num: "04",
    title: "全体を、支える。",
    subtitle: "経営・管理 — 会社の土台",
    staff: [
      { id: "92289", name: "古谷 泰彦", dept: "代表取締役社長", career: "38年" },
      { id: "92290", name: "小林 敬昌", dept: "代表取締役専務", career: "25年" },
      { id: "92293", name: "多口 典子", dept: "監査役員", career: "15年" },
      { id: "171880", name: "和田 詩織", dept: "経理", career: "1年" },
      { id: "258745", name: "久我 英一", dept: "顧問", career: "" },
    ],
  },
];

export default function StaffStory() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="staff" className="bg-bg-primary">
      {/* === ブリッジ: 引用 === */}
      <div className="bg-main-light relative">
        <div className="max-w-[900px] mx-auto px-[var(--page-px)] py-[clamp(64px,calc(32px+6vw),180px)] text-center">
          <blockquote>
            <p
              className="text-[clamp(20px,3vw,36px)] text-text-primary leading-[1.6] tracking-[0.04em] mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              お引き渡しの日からが、本当のお付き合いの始まりです。
            </p>
          </blockquote>
          <p className="text-text-secondary text-sm md:text-base">
            ご家族のお家を、この19人でずっと見守ります。
          </p>
        </div>
      </div>

      {/* === キーマン + フェーズ（同一 viewport で stagger） === */}
      <div ref={sectionRef}>
      <div className="border-b border-border bg-bg-primary">
        <div className="mx-auto max-w-[1400px] px-[var(--page-px)] py-[clamp(48px,calc(32px+4vw),120px)]">
          <div className="scroll-in mb-10 md:mb-12">
            <p className="font-section-label mb-3 text-xs tracking-[0.15em] text-main md:text-sm">
              KEY PEOPLE
            </p>
            <h3
              className="max-w-[720px] text-[clamp(20px,2.4vw,28px)] leading-snug text-text-primary"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              設計・現場・経営。家づくりの核になる人たちです。
            </h3>
          </div>

          <div className="scroll-in mb-12 grid items-center gap-8 md:mb-16 md:grid-cols-2 md:gap-12 lg:gap-16">
            <div className="relative aspect-[4/5] max-h-[min(72vh,560px)] w-full overflow-hidden rounded-sm bg-bg-secondary md:max-h-none">
              <Image
                src={`/images/staff/${KEY_STAFF[0].id}.webp`}
                alt={KEY_STAFF[0].name}
                fill
                className="object-cover grayscale-[15%]"
                sizes="(max-width: 768px) 100vw, 45vw"
                priority
              />
            </div>
            <div>
              <p className="mb-1 text-xs font-medium tracking-wider text-main md:text-sm">
                {KEY_STAFF[0].role}
              </p>
              <p
                className="mb-6 text-2xl text-text-primary md:text-3xl lg:text-4xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {KEY_STAFF[0].name}
              </p>
              <blockquote
                className="text-lg leading-[1.75] text-text-primary md:text-xl lg:text-2xl"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                {KEY_STAFF[0].quote}
              </blockquote>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
            {KEY_STAFF.slice(1).map((k) => (
              <div key={k.id} className="scroll-in flex flex-col gap-5 sm:flex-row sm:items-stretch md:gap-6">
                <div className="relative aspect-[3/4] w-full shrink-0 overflow-hidden rounded-sm bg-bg-secondary sm:aspect-auto sm:h-auto sm:w-[38%] sm:max-w-[220px]">
                  <Image
                    src={`/images/staff/${k.id}.webp`}
                    alt={k.name}
                    fill
                    className="object-cover grayscale-[15%]"
                    sizes="(max-width: 640px) 100vw, 220px"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <p className="mb-1 text-[11px] font-medium tracking-wider text-main md:text-xs">
                    {k.role}
                  </p>
                  <p
                    className="mb-3 text-lg text-text-primary md:text-xl"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {k.name}
                  </p>
                  <blockquote
                    className="text-sm leading-relaxed text-text-secondary md:text-base md:leading-relaxed"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {k.quote}
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] bg-bg-primary px-[var(--page-px)] py-[var(--section-py)]">
        <div className="scroll-in mb-10 md:mb-14">
          <p className="font-section-label mb-3 text-xs tracking-[0.15em] text-main md:text-sm">
            STAFF
          </p>
          <h2 className="mb-4 max-w-[640px] text-[clamp(24px,3.5vw,40px)] text-text-primary">
            この19人で、お家をつくります。
          </h2>
        </div>

        {/* フェーズ連続表示 */}
        <div className="space-y-16 md:space-y-24">
          {PHASES.map((phase, phaseIndex) => (
            <div
              key={phase.num}
              className={`scroll-in ${
                phase.highlight
                  ? "bg-main-light rounded-lg p-[clamp(24px,3vw,40px)] -mx-[clamp(24px,3vw,40px)]"
                  : ""
              }`}
            >
              {/* フェーズヘッダー */}
              <div className="flex items-baseline gap-4 mb-4 md:mb-6">
                <span
                  className="text-main/30 font-light text-5xl md:text-7xl leading-none shrink-0"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {phase.num}
                </span>
                <div>
                  <h3
                    className="text-text-primary text-xl md:text-2xl mb-1"
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {phase.title}
                  </h3>
                  <p className="text-text-secondary text-xs md:text-sm">
                    {phase.subtitle}
                  </p>
                </div>
              </div>

              {/* 特別扱いフェーズの補足メッセージ（設計士など） */}
              {phase.note && (
                <div className="mb-6 md:mb-8 pl-[calc(1rem+1.5em)] md:pl-[calc(1rem+2em)] ml-2">
                  <p className="text-text-primary text-sm md:text-base leading-[1.9] max-w-[720px]">
                    {phase.note}
                  </p>
                </div>
              )}

              {/* 繋がりライン + スタッフカード */}
              <div className="relative pl-[calc(1rem+1.5em)] md:pl-[calc(1rem+2em)] ml-2">
                {/* 縦の繋がりライン（次のフェーズへ繋ぐ） */}
                {phaseIndex < PHASES.length - 1 && !phase.highlight && (
                  <div className="absolute left-0 top-0 bottom-[-4rem] md:bottom-[-6rem] w-px bg-accent/30" />
                )}

                <div className="grid grid-cols-2 gap-[var(--card-gap)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {phase.staff
                    .filter((s) => !KEY_STAFF_IDS.has(s.id))
                    .map((s) => (
                    <div key={s.id}>
                      <div className="relative aspect-[4/5] rounded overflow-hidden mb-3 bg-bg-secondary">
                        <Image
                          src={`/images/staff/${s.id}.webp`}
                          alt={s.name}
                          fill
                          className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                        />
                      </div>
                      <p
                        className="text-text-primary text-sm font-medium mb-0.5"
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {s.name}
                      </p>
                      <p className="text-text-secondary text-xs mb-1">
                        {s.dept}
                      </p>
                      {s.career && (
                        <p
                          className="text-main text-[10px]"
                          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                        >
                          経験 {s.career}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 締め */}
        <div className="mt-16 md:mt-24 pt-10 border-t border-border text-center">
          <p className="text-text-secondary text-sm md:text-base leading-[1.9] max-w-[640px] mx-auto">
            契約から引き渡しまで、そして建てた後も。この19人が、一緒です。
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
