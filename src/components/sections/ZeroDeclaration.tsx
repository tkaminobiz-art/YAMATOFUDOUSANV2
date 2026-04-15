"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";
import {
  Handshake,
  Banknote,
  Layers,
  Truck,
  Car,
  FileCheck,
  MessageCircle,
  Home,
  type LucideIcon,
} from "lucide-react";

/*
  ZeroDeclaration — Phase 2E（編集デザイン）
  8項目を「同サイズカードの量産」にしない。
  - 章扉は共通ヘッダー規則に合わせつつ、本文は雑誌の見開きのリズム
  - 章ごとに bento の型を変え、視線が飽きないようにする
  - 数字は背景のウォーターマーク、約束は左アクセントの「証憑」カード
*/

type Zero = {
  num: string;
  title: string;
  desc: string;
  Icon: LucideIcon;
};

type Chapter = {
  label: string;
  title: string;
  intro: string;
  zeros: Zero[];
};

const CHAPTERS: Chapter[] = [
  {
    label: "Before",
    title: "契約前の不透明を、ゼロに。",
    intro:
      "土地から建物まで、当社が一貫して扱うから。仲介や別会社を挟まないので、契約前にかかる「見えない費用」がありません。",
    zeros: [
      {
        num: "01",
        title: "仲介手数料",
        desc: "自社分譲だから仲介会社を挟みません。数十万〜百万円単位の仲介手数料が不要です。",
        Icon: Handshake,
      },
      {
        num: "02",
        title: "つなぎ融資の負担",
        desc: "土地と建物をセットで提供するため、つなぎ融資の金利負担がかかりません。",
        Icon: Banknote,
      },
      {
        num: "03",
        title: "地盤改良費",
        desc: "最大150万円かかる地盤改良費を当社が全額負担。お客様の見積もりには入りません。",
        Icon: Layers,
      },
    ],
  },
  {
    label: "During",
    title: "建築中の追加請求を、ゼロに。",
    intro:
      "自社分譲地と自社施工だから実現できる、現場でのコスト管理。「あとから追加請求」は一切ありません。",
    zeros: [
      {
        num: "04",
        title: "余計な搬入費用",
        desc: "工事車両がスムーズに入れる分譲地をご用意しているため、追加の資材搬入コストはかかりません。",
        Icon: Truck,
      },
      {
        num: "05",
        title: "工事車両の駐車場代",
        desc: "自社分譲地だからこそ、工事車両の駐車スペースも確保できます。お客様に余計な負担は一切おかけしません。",
        Icon: Car,
      },
      {
        num: "06",
        title: "不透明な追加費用",
        desc: "見積もりに載っていない費用が、あとから上乗せされることはありません。お見積もりは超シンプルです。",
        Icon: FileCheck,
      },
    ],
  },
  {
    label: "After",
    title: "建築後の裏切りを、ゼロに。",
    intro:
      "打ち合わせで決めた内容が、最後までそのまま。見積もりから金額も仕様も変わりません。",
    zeros: [
      {
        num: "07",
        title: "打合せ後の追加費用",
        desc: "初めから全部標準。打合せを重ねても金額が上がっていくことはありません。",
        Icon: MessageCircle,
      },
      {
        num: "08",
        title: "モデルハウスとのギャップ",
        desc: "見学して気に入った豪華な設備。オプションではなく、すべて標準仕様としてついてきます。",
        Icon: Home,
      },
    ],
  },
];

function ZeroStamp() {
  return (
    <span
      className="inline-flex items-center border border-main/35 bg-main/8 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-main"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      ¥0
    </span>
  );
}

function ZeroCard({
  item,
  className = "",
  emphasis = false,
}: {
  item: Zero;
  className?: string;
  emphasis?: boolean;
}) {
  const Icon = item.Icon;
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-border/90 bg-bg-primary p-6 card-shadow transition-shadow duration-500 hover:shadow-[0_20px_48px_-24px_rgba(0,0,0,0.12)] md:p-8 ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 -right-2 text-[clamp(4.5rem,14vw,9rem)] font-semibold leading-none text-main/[0.07] transition-opacity duration-500 group-hover:text-main/[0.09]"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {item.num}
      </span>
      <div
        className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-main via-main/70 to-main/30"
        aria-hidden
      />
      <div className="relative flex flex-1 flex-col pl-4 md:pl-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <ZeroStamp />
          <span
            className="text-[11px] font-medium tracking-[0.14em] text-text-secondary"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            DECLARATION {item.num}
          </span>
        </div>
        <Icon
          className={`mb-4 ${emphasis ? "h-8 w-8" : "h-7 w-7"} text-main/85`}
          strokeWidth={1.35}
        />
        <h4
          className={`mb-3 text-text-primary ${emphasis ? "text-xl md:text-2xl" : "text-lg md:text-xl"} font-medium tracking-wide`}
          style={{
            fontFamily: emphasis ? "var(--font-serif)" : "var(--font-sans)",
          }}
        >
          {item.title}
        </h4>
        <p className="relative mt-auto text-sm leading-[1.85] text-text-secondary md:text-[15px]">
          {item.desc}
        </p>
      </div>
    </article>
  );
}

function ChapterSpread({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  const [a, b, c] = chapter.zeros;
  const roman = ["Ⅰ", "Ⅱ", "Ⅲ"][index] ?? String(index + 1);

  return (
    <div className="scroll-in">
      {/* 見開きヘッダ */}
      <div className="mb-8 grid grid-cols-1 gap-8 border-b border-border/80 pb-10 md:mb-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-12 md:pb-12">
        <div className="relative md:pr-8">
          <p
            className="mb-3 text-[11px] font-semibold tracking-[0.28em] text-accent"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            CHAPTER {roman} — {chapter.label}
          </p>
          <h3
            className="text-[clamp(22px,2.8vw,34px)] font-medium leading-snug tracking-wide text-text-primary"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {chapter.title}
          </h3>
          <p
            aria-hidden
            className="pointer-events-none absolute -left-1 top-1/2 hidden -translate-y-1/2 text-[clamp(4rem,12vw,7rem)] font-light text-text-primary/[0.04] md:block"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            {roman}
          </p>
        </div>
        <p className="self-end text-sm leading-[1.95] text-text-secondary md:text-base md:leading-[2]">
          {chapter.intro}
        </p>
      </div>

      {/* 章ごとに bento の型を変える */}
      {chapter.zeros.length === 3 && a && b && c ? (
        index === 0 ? (
          <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12 lg:grid-rows-2">
            <ZeroCard
              item={a}
              emphasis
              className="lg:col-span-7 lg:row-span-2 lg:min-h-[320px]"
            />
            <ZeroCard item={b} className="lg:col-span-5" />
            <ZeroCard item={c} className="lg:col-span-5" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12 lg:grid-rows-2">
            <ZeroCard item={a} className="lg:col-span-5 lg:row-span-2" />
            <ZeroCard item={b} className="lg:col-span-7" />
            <ZeroCard item={c} className="lg:col-span-7" />
          </div>
        )
      ) : chapter.zeros.length === 2 && a && b ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
          <ZeroCard item={a} emphasis className="min-h-[280px] md:min-h-[300px]" />
          <ZeroCard item={b} emphasis className="min-h-[280px] md:min-h-[300px]" />
        </div>
      ) : null}
    </div>
  );
}

export default function ZeroDeclaration() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="border-y border-border/60 bg-bg-warm py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="mx-auto max-w-[1400px] px-[var(--page-px)] scroll-in"
      >
        <SectionHeaderCentered
          label="ZERO DECLARATION"
          title="やまとの家づくり、8つのゼロ宣言。"
          ghostText="ZERO"
          lead="他社では当たり前にかかる費用が、やまとではゼロ。家づくりの時間軸——契約前・建築中・その後——に沿って、約束を並べます。"
          className="scroll-in"
        />

        {/* 8項目の道しるべ（均等カードではなく一行のインデックス） */}
        <div className="scroll-in mx-auto mb-14 max-w-[920px] md:mb-20">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {CHAPTERS.flatMap((ch) => ch.zeros).map((z) => (
              <span
                key={z.num}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-bg-primary/90 px-2.5 py-1 text-[10px] text-text-secondary md:px-3 md:text-[11px]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span className="font-semibold text-main">{z.num}</span>
                <span className="max-w-[7.5rem] truncate md:max-w-none">{z.title}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-20 md:space-y-28">
          {CHAPTERS.map((chapter, i) => (
            <ChapterSpread key={chapter.label} chapter={chapter} index={i} />
          ))}
        </div>

        {/* 締め — 証言に近いトーン */}
        <div className="scroll-in mt-16 md:mt-24">
          <div className="relative overflow-hidden rounded-xl border border-main/20 bg-bg-primary px-6 py-8 card-shadow md:px-12 md:py-12">
            <div
              className="pointer-events-none absolute -right-8 top-1/2 h-[min(120%,480px)] w-48 -translate-y-1/2 rounded-full bg-main/[0.06] blur-3xl"
              aria-hidden
            />
            <p
              className="relative text-xs font-semibold tracking-[0.2em] text-main md:text-sm"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              WHY WE CAN PROMISE THIS
            </p>
            <p
              className="relative mt-4 max-w-[720px] text-lg font-medium leading-snug text-text-primary md:text-xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              なぜ、これだけゼロにできるのか。
            </p>
            <p className="relative mt-5 max-w-[720px] text-sm leading-[1.95] text-text-secondary md:text-base md:leading-[2]">
              設計から施工まで完全自社体制。大量仕入れでコストを抑え、間に入る会社を挟まず、卸先まで直接交渉しています。大手との価格差の正体は、ブランド代と広告費。原価は変わりません。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
