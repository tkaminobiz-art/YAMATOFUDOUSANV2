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
};

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
    subtitle: "設計 — 間取り・仕様の打合せ",
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
              契約した日よりも、引き渡しの日のほうが、仲がいい。
            </p>
          </blockquote>
          <p className="text-text-secondary text-sm md:text-base">
            19人で、この関係をつくっています。
          </p>
        </div>
      </div>

      {/* === Story: 4つのフェーズ === */}
      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto px-[var(--page-px)] py-[var(--section-py)] scroll-in"
      >
        <div className="mb-10 md:mb-14">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            STAFF
          </p>
          <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary max-w-[640px] mb-4">
            この19人で、お家をつくります。
          </h2>
        </div>

        {/* フェーズ連続表示 */}
        <div className="space-y-16 md:space-y-24">
          {PHASES.map((phase, phaseIndex) => (
            <div key={phase.num} className="scroll-in">
              {/* フェーズヘッダー */}
              <div className="flex items-baseline gap-4 mb-6 md:mb-8">
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

              {/* 繋がりライン + スタッフカード */}
              <div className="relative pl-[calc(1rem+1.5em)] md:pl-[calc(1rem+2em)] ml-2">
                {/* 縦の繋がりライン（次のフェーズへ繋ぐ） */}
                {phaseIndex < PHASES.length - 1 && (
                  <div className="absolute left-0 top-0 bottom-[-4rem] md:bottom-[-6rem] w-px bg-accent/30" />
                )}

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[var(--card-gap)]">
                  {phase.staff.map((s) => (
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
            契約から引き渡しまで、そしてその後も。建てた後も、この19人が一緒です。
          </p>
        </div>
      </div>
    </section>
  );
}
