"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";
import Image from "next/image";
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

const ZERO_HERO = {
  src: "/images/newsozai/exterior-night-01.webp",
  alt: "外観（夜景）— 住まいの空気感",
} as const;

const CHAPTERS: Chapter[] = [
  {
    label: "Before",
    title: "契約前の不透明を、ゼロに。",
    intro:
      "仲介や別会社を挟まず、最初から費用の全体をお見せします。",
    zeros: [
      {
        num: "01",
        title: "仲介手数料",
        desc: "自社分譲のため、仲介会社を挟みません。数十万〜百万円単位の仲介手数料はかかりません。",
        Icon: Handshake,
      },
      {
        num: "02",
        title: "つなぎ融資の負担",
        desc: "土地を先行で購入する流れでは、つなぎ融資が発生することがあります。土地と建物をまとめて進められると、条件次第でその負担を抑えられる場合があります。",
        Icon: Banknote,
      },
      {
        num: "03",
        title: "地盤改良費",
        desc: "最大百五十万円かかる地盤改良費は、当社が負担します。お客様のお見積もりには含めません。",
        Icon: Layers,
      },
    ],
  },
  {
    label: "During",
    title: "建築中の追加請求を、ゼロに。",
    intro:
      "現場の都合で、価格が上がることはありません。",
    zeros: [
      {
        num: "04",
        title: "余計な搬入費用",
        desc: "工事車両がスムーズに入れるように、分譲地を整えています。追加の資材搬入コストは、お客様には請求しません。",
        Icon: Truck,
      },
      {
        num: "05",
        title: "工事車両の駐車場代",
        desc: "自社分譲地だからこそ、工事車両の駐車スペースも確保できます。駐車代の追加請求はありません。",
        Icon: Car,
      },
      {
        num: "06",
        title: "不透明な追加費用",
        desc: "見積もりに載っていない費用が、あとから上乗せされることはありません。見積もりは一枚で全体が分かる形にします。",
        Icon: FileCheck,
      },
    ],
  },
  {
    label: "After",
    title: "建築後のズレを、ゼロに。",
    intro:
      "打ち合わせで決めた内容は、最後までそのままお届けします。",
    zeros: [
      {
        num: "07",
        title: "打合せ後の追加費用",
        desc: "はじめから標準仕様を揃えています。打ち合わせを重ねても、価格が上がっていくことはありません。",
        Icon: MessageCircle,
      },
      {
        num: "08",
        title: "モデルハウスとのギャップ",
        desc: "モデルハウスでご覧になった設備を、オプションではなく標準仕様として揃えています。",
        Icon: Home,
      },
    ],
  },
];

function ZeroStamp() {
  return (
    <span
      className="inline-flex items-center border border-white/20 bg-white/[0.06] px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-white/90"
      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
    >
      ¥0
    </span>
  );
}

function BigProofCard({ item }: { item: Zero }) {
  const Icon = item.Icon;
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/14 bg-white/[0.05] p-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.55)] backdrop-blur-[2px] md:p-8"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 -right-2 text-[clamp(4.5rem,14vw,9rem)] font-semibold leading-none text-white/[0.08] transition-opacity duration-500 group-hover:text-white/[0.11]"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {item.num}
      </span>
      <div
        className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-accent via-accent/70 to-accent/25"
        aria-hidden
      />
      <div className="relative flex flex-col gap-5 pl-4 md:pl-5">
        <div className="flex flex-wrap items-center gap-2">
          <ZeroStamp />
          <span
            className="text-[11px] font-medium tracking-[0.14em] text-white/55"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            DECLARATION {item.num}
          </span>
          <span
            className="ml-auto hidden rounded-full border border-white/14 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-white/70 md:inline-flex"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            EVIDENCE
          </span>
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 bg-white/[0.04]">
            <Icon className="h-6 w-6 text-white/85" strokeWidth={1.35} />
          </div>
          <div className="min-w-0">
            <h4
              className="text-[clamp(18px,2.2vw,28px)] font-medium leading-snug tracking-wide text-white"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {item.title}
            </h4>
            <p className="mt-3 text-sm leading-[1.95] text-white/70 md:text-[15px]">
              {item.desc}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ReceiptRow({ item }: { item: Zero }) {
  const Icon = item.Icon;
  return (
    <div className="flex flex-col gap-3 py-4 md:flex-row md:items-start md:gap-5 md:py-5">
      <div className="flex items-center gap-3">
        <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
          <Icon className="h-5 w-5 text-white/75" strokeWidth={1.35} />
        </div>
        <div className="min-w-0">
          <p
            className="text-[11px] font-semibold tracking-[0.18em] text-white/45"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            DECLARATION {item.num}
          </p>
          <p className="mt-1 text-base font-medium leading-snug text-white">
            {item.title}
          </p>
        </div>
      </div>
      <p className="text-sm leading-[1.9] text-white/65 md:flex-1 md:pt-[2px]">
        {item.desc}
      </p>
      <div className="flex justify-end md:pl-4 md:pt-[2px] md:text-right">
        <span
          className="inline-flex items-center justify-center rounded-full border border-white/16 bg-white/[0.05] px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-white/85"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          ¥0
        </span>
      </div>
    </div>
  );
}

function ChapterProof({ chapter, index }: { chapter: Chapter; index: number }) {
  const roman = ["Ⅰ", "Ⅱ", "Ⅲ"][index] ?? String(index + 1);
  const big =
    chapter.label === "Before"
      ? chapter.zeros.find((z) => z.num === "03")
      : chapter.label === "During"
        ? chapter.zeros.find((z) => z.num === "06")
        : chapter.zeros.find((z) => z.num === "08");

  const receipts = chapter.zeros.filter((z) => z !== big);

  return (
    <div className="scroll-in">
      <div className="mb-7 flex flex-col gap-5 md:mb-9 md:flex-row md:items-end md:justify-between">
        <div className="relative">
          <p
            className="text-[11px] font-semibold tracking-[0.28em] text-accent-light/80"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            CHAPTER {roman} — {chapter.label}
          </p>
          <h3
            className="mt-3 text-[clamp(20px,2.6vw,30px)] font-medium leading-snug tracking-wide text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {chapter.title}
          </h3>
          <p
            aria-hidden
            className="pointer-events-none absolute -left-1 top-1/2 hidden -translate-y-1/2 text-[clamp(4rem,12vw,7rem)] font-light text-white/[0.06] md:block"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            {roman}
          </p>
        </div>
        <p className="max-w-[42rem] text-sm leading-[1.95] text-white/65 md:text-base">
          {chapter.intro}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          {big ? <BigProofCard item={big} /> : null}
        </div>
        <div className="rounded-2xl border border-white/12 bg-white/[0.04] px-5 py-5 md:px-7 md:py-6 lg:col-span-5">
          <p
            className="text-[11px] font-semibold tracking-[0.22em] text-white/55"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            OTHER PROOFS
          </p>
          <div className="mt-2 divide-y divide-white/10">
            {receipts.map((z) => (
              <ReceiptRow key={z.num} item={z} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ZeroDeclaration() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="relative overflow-hidden border-y border-white/[0.08] bg-[#121212] py-[var(--section-py)]">
      {/* 紙の筋：極薄い対角シーム */} 
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, transparent, transparent 1px, rgba(255,255,255,0.06) 1px, rgba(255,255,255,0.06) 2px)",
          backgroundSize: "100% 100%",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div ref={sectionRef} className="relative mx-auto max-w-[1400px] px-[var(--page-px)]">
        <div className="scroll-in">
          <SectionHeaderCentered
            label="ZERO DECLARATION"
            title="家づくりの費用を、八つゼロに。"
            ghostText="ZERO"
            lead="家づくりの途中で増えがちな費用があります。やまとでは、その八つをゼロにしています。契約前・建築中・その後の時間軸で、順にお見せします。"
            theme="dark"
          />
        </div>

        {/* Hero image — 証拠ボードの“空気”を一枚で固定 */}
        <div className="scroll-in mx-auto mb-14 max-w-[1200px] md:mb-20">
          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-black/40">
            <div className="relative aspect-[16/9] md:aspect-[21/9]">
              <Image
                src={ZERO_HERO.src}
                alt={ZERO_HERO.alt}
                fill
                className="object-cover opacity-[0.92]"
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/25"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_35%_20%,rgba(255,255,255,0.16)_0%,transparent_60%)]"
              />
            </div>

            <div className="relative grid gap-6 px-6 py-7 md:grid-cols-[1.1fr_0.9fr] md:items-end md:px-10 md:py-9">
              <div>
                <p
                  className="text-[11px] font-semibold tracking-[0.28em] text-white/55"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  PROOF BOARD
                </p>
                <p
                  className="mt-3 text-[clamp(18px,2.2vw,26px)] font-medium leading-snug text-white"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  お見積もりが、最終の価格です。
                  <span className="text-white/65">（後出しは、いたしません）</span>
                </p>
                <p className="mt-3 max-w-[40rem] text-sm leading-[1.9] text-white/65 md:text-[15px]">
                  契約前、建築中、その後まで。費用も仕様も、動かしません。お約束として、書き出しました。
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-start gap-2 md:justify-end">
                <span className="inline-flex items-center rounded-full border border-white/18 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-white">
                  ¥0 追加請求
                </span>
                <span className="inline-flex items-center rounded-full border border-white/18 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-white">
                  ¥0 仲介手数料
                </span>
                <span className="inline-flex items-center rounded-full border border-white/18 bg-white/[0.06] px-4 py-2 text-[11px] font-semibold tracking-[0.18em] text-white">
                  ¥0 地盤改良費
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 8項目の道しるべ（均等カードではなく一行のインデックス） */}
        <div className="scroll-in mx-auto mb-16 max-w-[980px] md:mb-24">
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
            {CHAPTERS.flatMap((ch) => ch.zeros).map((z) => (
              <span
                key={z.num}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/14 bg-white/[0.04] px-2.5 py-1 text-[10px] text-white/65 md:px-3 md:text-[11px]"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                <span className="font-semibold text-white/90">{z.num}</span>
                <span className="max-w-[7.5rem] truncate md:max-w-none">{z.title}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-20 md:space-y-28">
          {CHAPTERS.map((chapter, i) => (
            <ChapterProof key={chapter.label} chapter={chapter} index={i} />
          ))}
        </div>

        {/* 締め — 証言に近いトーン */}
        <div className="scroll-in mt-16 md:mt-24">
          <div className="relative overflow-hidden rounded-2xl border border-white/14 bg-white/[0.05] px-6 py-8 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.55)] md:px-12 md:py-12">
            <div
              className="pointer-events-none absolute -right-8 top-1/2 h-[min(120%,480px)] w-48 -translate-y-1/2 rounded-full bg-white/[0.06] blur-3xl"
              aria-hidden
            />
            <p
              className="relative text-xs font-semibold tracking-[0.2em] text-white/70 md:text-sm"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              WHY WE CAN PROMISE THIS
            </p>
            <p
              className="relative mt-4 max-w-[720px] text-lg font-medium leading-snug text-white md:text-xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              なぜ、これだけゼロにできるのか。
            </p>
            <p className="relative mt-5 max-w-[720px] text-sm leading-[1.95] text-white/65 md:text-base md:leading-[2]">
              専用の展示場を持たず、自社の分譲地に建てた家をそのままモデルハウスにしています。展示と販売を一軒で兼ねるので、維持費が見積もりに乗りません。設計から施工まで、すべて自社で。間に入る会社がないので、仲介のマージンもかかりません。原価は、変わりません。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
