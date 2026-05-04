"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import {
  Search,
  Calculator,
  HeartHandshake,
  Home as HomeIcon,
  Coins,
  Mountain,
  ClipboardList,
  Truck,
  ParkingSquare,
  PencilLine,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
  ZeroDeclaration — 2026-05-04 v7 (費用リスク・ダッシュボード型)
  ---------------------------------------------------------------
  v6: 8項目縦並び二列領収書 + 「他社 vs やまと(¥0連打)」
      → ユーザーレビューで離脱率/攻撃感を指摘
        ・8項目縦長で読む前に疲れる
        ・¥0が多すぎて広告臭/誤解リスク
        ・「他社」比較が攻撃的
  v7: 「契約前に見える化する会社」のポジショニングに転換
      ・上段: 結論カード(最大約430万円分・3つの信頼ピル)
      ・中段: 2タイミング分類(契約前 / 工事中) で4項目ずつ
      ・各項目: 一般的な目安 → やまとは [対応]
        全項目を「不要」にせず「当社負担/事前説明/見積提示」と分ける
      ・下段: 3つの仕組みカード(分譲地 / ワンストップ / 標準明確化)
      ・最下段: 写真 + 相談CTA
*/

const FOREST = "#486B00";
const ACCENT = "#A2C523";

type FeeItem = {
  Icon: LucideIcon;
  label: string;
  desc: string;
  market: string;
  yamato: string;
};

const FEES_BEFORE: readonly FeeItem[] = [
  {
    Icon: HomeIcon,
    label: "仲介手数料",
    desc: "土地購入時にかかる手数料",
    market: "50〜100万円",
    yamato: "当社分譲地なら不要",
  },
  {
    Icon: Coins,
    label: "つなぎ融資",
    desc: "土地と建物の決済のタイミング差で\n必要になる融資手数料・利息",
    market: "30〜80万円",
    yamato: "原則不要",
  },
  {
    Icon: Mountain,
    label: "地盤改良費",
    desc: "地盤改良工事が必要な場合の費用",
    market: "最大150万円",
    yamato: "最大150万円まで\n当社負担",
  },
  {
    Icon: ClipboardList,
    label: "標準仕様との差額",
    desc: "標準仕様から変更した場合の差額",
    market: "数十万円〜",
    yamato: "標準仕様を明確に提示",
  },
] as const;

const FEES_DURING: readonly FeeItem[] = [
  {
    Icon: Truck,
    label: "追加の搬入費",
    desc: "重機や資材の搬入経路による追加費用",
    market: "10〜30万円",
    yamato: "事前に確認・ご説明",
  },
  {
    Icon: ParkingSquare,
    label: "工事車両の駐車代",
    desc: "近隣の駐車場を利用する場合の費用",
    market: "10〜20万円",
    yamato: "必要な場合も\n事前にご説明",
  },
  {
    Icon: PencilLine,
    label: "契約後の追加見積り",
    desc: "仕様変更や追加工事による費用",
    market: "数十万円〜",
    yamato: "変更前に\n見積りをご提示",
  },
  {
    Icon: HelpCircle,
    label: "見積書にない費用",
    desc: "見落としやすい細かな諸費用",
    market: "数十万円〜",
    yamato: "内訳を明確に提示",
  },
] as const;

const TRUST_PILLS = [
  { Icon: Search, label: "事前に\nしっかり説明" },
  { Icon: Calculator, label: "契約前に\n総額を把握" },
  { Icon: HeartHandshake, label: "追加費用も\n事前に確認" },
] as const;

const MECHANISMS = [
  {
    no: "01",
    Icon: HomeIcon,
    title: "当社分譲地だから\n仲介手数料が不要",
    body: "自社で土地を仕入れ・販売することで、土地購入時の仲介手数料がかかりません。",
  },
  {
    no: "02",
    Icon: Users,
    title: "土地と建物をまとめて\nワンストップ対応",
    body: "土地と建物を一体でご提案・契約するため、つなぎ融資などの費用負担を抑えやすくなります。",
  },
  {
    no: "03",
    Icon: ClipboardList,
    title: "標準仕様と費用を\n事前に明確化",
    body: "標準仕様を分かりやすくご提示し、追加が発生する場合も事前にご説明します。",
  },
] as const;

// ────────────────────────────────────────────────
// FeeRow — 1行(横長チップ)
// ────────────────────────────────────────────────

function FeeRow({ fee }: { fee: FeeItem }) {
  const { Icon } = fee;
  return (
    <li className="scroll-in grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_auto_auto] gap-x-3 sm:gap-x-5 gap-y-2 items-center px-4 sm:px-5 py-4 sm:py-5 border-b border-text-primary/10 last:border-b-0">
      {/* Icon */}
      <span
        aria-hidden
        className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 shrink-0"
        style={{ color: FOREST }}
      >
        <Icon className="w-5 h-5 sm:w-[22px] sm:h-[22px]" strokeWidth={1.5} />
      </span>

      {/* Label + desc */}
      <div className="min-w-0">
        <p className="text-text-primary text-[14px] sm:text-[15px] font-bold leading-[1.45] mb-0.5">
          {fee.label}
        </p>
        <p className="text-text-secondary text-[11px] sm:text-[12px] leading-[1.7] whitespace-pre-line">
          {fee.desc}
        </p>
      </div>

      {/* Market amount(目安) — sm: 別行/desktop: 同一行 */}
      <div className="col-start-2 sm:col-start-3 sm:text-right">
        <p className="text-[10px] sm:text-[11px] text-text-secondary leading-tight mb-0.5">
          一般的な目安
        </p>
        <p className="text-text-primary text-[12px] sm:text-[13px] font-medium tabular-nums">
          {fee.market}
        </p>
      </div>

      {/* Arrow + Yamato response */}
      <div className="col-start-2 sm:col-start-4 flex items-start gap-2 sm:gap-3">
        <ArrowRight
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 shrink-0 text-text-secondary"
          strokeWidth={1.5}
        />
        <div>
          <p className="text-[10px] sm:text-[11px] text-text-secondary leading-tight mb-0.5">
            やまとは
          </p>
          <p
            className="text-[12px] sm:text-[13px] font-bold leading-[1.45] whitespace-pre-line"
            style={{ color: FOREST }}
          >
            {fee.yamato}
          </p>
        </div>
      </div>
    </li>
  );
}

// ────────────────────────────────────────────────
// FeeColumn — タイミング別カラム
// ────────────────────────────────────────────────

function FeeColumn({
  Icon,
  title,
  total,
  unit,
  items,
}: {
  Icon: LucideIcon;
  title: string;
  total: string;
  unit: string;
  items: readonly FeeItem[];
}) {
  return (
    <div className="bg-white border border-text-primary/12 rounded-2xl overflow-hidden shadow-[0_4px_20px_-12px_rgba(43,43,43,0.08)]">
      {/* ヘッダー */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 sm:px-6 py-4 sm:py-5 border-b border-text-primary/10">
        <div className="flex items-center gap-3">
          <span
            className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full"
            style={{ background: FOREST, color: "#fff" }}
            aria-hidden
          >
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.7} />
          </span>
          <p className="text-text-primary text-[14px] sm:text-[15px] font-bold leading-tight">
            {title}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] sm:text-[11px] text-text-secondary leading-tight mb-0.5">
            最大およそ
          </p>
          <p
            className="font-oswald tabular-nums leading-none"
            style={{
              fontWeight: 400,
              fontSize: "clamp(22px, 2.4vw, 30px)",
              color: FOREST,
              letterSpacing: "-0.01em",
            }}
          >
            {total}
            <span
              className="ml-1 text-[12px] sm:text-[13px] font-medium"
              style={{ color: FOREST, fontFamily: "var(--font-sans)" }}
            >
              {unit}
            </span>
          </p>
        </div>
      </div>

      {/* 4 items */}
      <ul>
        {items.map((it) => (
          <FeeRow key={it.label} fee={it} />
        ))}
      </ul>
    </div>
  );
}

// ────────────────────────────────────────────────
// メイン
// ────────────────────────────────────────────────

export default function ZeroDeclaration() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="zero"
      className="relative overflow-hidden bg-bg-primary text-text-primary py-[var(--section-py)]"
    >
      {/* === 装飾: 葉影 + 淡いグラデーション === */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 100% 0%, rgba(162,197,35,0.06) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 0% 100%, rgba(125,68,39,0.04) 0%, transparent 55%)",
        }}
      />
      <svg
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-32 w-[420px] h-[420px] opacity-[0.06] hidden md:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        <path
          d="M100 30 C 60 30, 30 60, 30 100 C 30 140, 60 170, 100 170 C 80 140, 70 110, 100 30 Z"
          fill="#486B00"
        />
        <path d="M100 30 C 95 80, 90 130, 100 170" stroke="#486B00" strokeWidth="1.5" />
      </svg>

      <div
        ref={ref}
        className="relative max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ===== 上段: ヘッダー(左) + 結論カード(右) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,540px)] gap-8 lg:gap-12 items-center mb-14 md:mb-20">
          {/* 左: 見出し + サブコピー */}
          <header className="max-w-[520px]">
            <h2
              className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
              style={{ fontSize: "clamp(26px, 3.4vw, 44px)" }}
            >
              後から増えやすい費用を、<br className="md:hidden" />
              契約前に見える化します。
            </h2>
            <p className="mt-5 md:mt-6 text-text-primary/80 text-[clamp(13px,1vw,15px)] leading-[1.95]">
              家づくりでは、建物価格以外にも費用が増えることがあります。
              <br />
              やまと不動産では、土地・建物・付帯工事に関わる費用を事前に整理し、
              <br />
              「後から思ったより増えた」を防ぎやすい資金計画を大切にしています。
            </p>
            <aside className="mt-5 pl-3 border-l-2 border-text-primary/15 text-text-secondary text-[12px] md:text-[12.5px] leading-[1.95]">
              <span className="block font-bold text-text-secondary/80 text-[10px] md:text-[11px] tracking-[0.18em] uppercase mb-1">
                Note
              </span>
              当社試算による参考金額です。土地条件・仕様・工法・エリアにより異なります。
            </aside>
          </header>

          {/* 右: 結論カード */}
          <div className="bg-white border border-text-primary/12 rounded-2xl px-6 sm:px-8 py-7 sm:py-9 shadow-[0_18px_44px_-24px_rgba(72,107,0,0.18)]">
            <div className="flex items-center gap-3 mb-4">
              <span aria-hidden className="flex-1 h-px" style={{ background: FOREST }} />
              <p
                className="text-[11px] md:text-[12px] tracking-[0.12em] font-bold whitespace-nowrap"
                style={{ color: FOREST }}
              >
                建物価格以外で増えやすい費用
              </p>
              <span aria-hidden className="flex-1 h-px" style={{ background: FOREST }} />
            </div>
            <div className="flex items-baseline justify-center gap-2 mb-1 flex-wrap">
              <span
                className="text-text-primary text-[14px] md:text-[16px] font-bold"
                style={{ color: FOREST }}
              >
                最大 約
              </span>
              <span
                className="font-oswald tabular-nums leading-none"
                style={{
                  fontWeight: 300,
                  fontSize: "clamp(40px, 6vw, 76px)",
                  letterSpacing: "-0.03em",
                  color: FOREST,
                }}
              >
                430
              </span>
              <span className="text-text-primary text-[14px] md:text-[16px] font-bold">
                万円分
              </span>
            </div>
            <p className="text-center text-text-primary/85 text-[13px] md:text-[14px] leading-[1.7] font-medium">
              を、契約前に見える化します。
            </p>

            {/* 3 trust pills */}
            <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
              {TRUST_PILLS.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center text-center px-1 py-2"
                >
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full mb-2"
                    style={{ background: "rgba(162,197,35,0.16)" }}
                  >
                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} style={{ color: FOREST }} />
                  </span>
                  <p className="text-[11px] sm:text-[12px] text-text-secondary leading-[1.45] whitespace-pre-line">
                    {label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ===== 中段: H3 + 2カラム(契約前 / 工事中) ===== */}
        <div className="mb-14 md:mb-20">
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
            <span aria-hidden style={{ color: ACCENT, fontSize: 14 }}>
              ✦
            </span>
            <h3
              className="font-sans font-bold text-text-primary text-center leading-[1.5] tracking-[0.02em]"
              style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
            >
              よくある「後から増える費用」と、やまとの考え方
            </h3>
            <span aria-hidden style={{ color: ACCENT, fontSize: 14 }}>
              ✦
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5">
            <FeeColumn
              Icon={ClipboardList}
              title="契約前に増えやすい費用"
              total="330"
              unit="万円"
              items={FEES_BEFORE}
            />
            <FeeColumn
              Icon={Truck}
              title="工事中に増えやすい費用"
              total="100"
              unit="万円"
              items={FEES_DURING}
            />
          </div>

          <p className="mt-6 text-text-secondary text-[12px] md:text-[12.5px] text-center leading-[1.95]">
            ※ 上記は一例です。敷地条件やご計画の内容により、金額は変わります。
          </p>
        </div>

        {/* ===== 下段: 3つの仕組み ===== */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-8 md:mb-10">
            <span aria-hidden style={{ color: ACCENT, fontSize: 14 }}>
              ✦
            </span>
            <h3
              className="font-sans font-bold text-text-primary text-center leading-[1.5] tracking-[0.02em]"
              style={{ fontSize: "clamp(16px, 1.6vw, 20px)" }}
            >
              費用を抑えやすくする、3つの仕組み
            </h3>
            <span aria-hidden style={{ color: ACCENT, fontSize: 14 }}>
              ✦
            </span>
          </div>

          <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
            {MECHANISMS.map(({ no, Icon, title, body }) => (
              <li
                key={no}
                className="bg-white border border-text-primary/12 rounded-2xl px-6 sm:px-7 py-6 sm:py-7"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="font-oswald tabular-nums leading-none shrink-0"
                    style={{
                      fontWeight: 300,
                      fontSize: "clamp(28px, 2.6vw, 36px)",
                      color: "rgba(43,43,43,0.30)",
                      letterSpacing: "-0.02em",
                    }}
                    aria-hidden
                  >
                    {no}
                  </span>
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full"
                    style={{ background: "rgba(162,197,35,0.16)", color: FOREST }}
                  >
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </span>
                </div>
                <p className="text-text-primary text-[14px] sm:text-[15px] font-bold leading-[1.55] tracking-[0.01em] mb-2.5 whitespace-pre-line">
                  {title}
                </p>
                <p className="text-text-secondary text-[12px] sm:text-[13px] leading-[1.85]">
                  {body}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* ===== CTA: 写真 + 相談誘導 ===== */}
        <div className="bg-white border border-text-primary/12 rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-[minmax(0,300px)_1fr_auto] items-stretch shadow-[0_18px_44px_-24px_rgba(43,43,43,0.12)]">
          <div className="relative aspect-[16/9] lg:aspect-auto lg:h-full min-h-[180px]">
            <Image
              src="/images/sections/hope-living.webp"
              alt="やまと不動産が手がけたモデルハウスのLDK"
              fill
              sizes="(max-width: 1024px) 100vw, 300px"
              className="object-cover"
            />
          </div>
          <div className="px-6 sm:px-8 py-6 sm:py-7 flex flex-col justify-center">
            <p className="text-text-primary text-[16px] sm:text-[17px] font-bold leading-[1.55] mb-2">
              「自分たちはいくらになる？」を一緒に整理します。
            </p>
            <p className="text-text-secondary text-[12px] sm:text-[13px] leading-[1.85]">
              土地の有無やご希望エリアに合わせて、総額の目安をご案内します。
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              {["相談無料", "営業電話なし", "土地なしOK"].map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] text-text-secondary"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2} style={{ color: FOREST }} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="px-6 sm:px-8 pb-6 sm:pb-7 lg:py-7 flex items-center justify-start lg:justify-end lg:border-l border-text-primary/10">
            <Link
              href="/money"
              className="group inline-flex items-center gap-2 text-white text-[14px] sm:text-[15px] font-bold rounded-full px-6 sm:px-7 py-3.5 sm:py-4 transition-all duration-300 hover:opacity-90 whitespace-nowrap"
              style={{ background: FOREST }}
            >
              無料で総額を相談する
              <ArrowRight
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
