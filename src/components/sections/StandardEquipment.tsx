"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import {
  Utensils,
  Bath,
  ShowerHead,
  Home,
  AppWindow,
  ShieldCheck,
  Building2,
  Lightbulb,
  ClipboardList,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

/*
  StandardEquipment — 2026-05-04 (参考画像準拠 4×2 写真カードグリッド)
  ---------------------------------------------------------------
  目的: 「価格は抑えているが、標準装備で暮らしに必要なものは整っている」
       を価格メカニズム直後に配置して、"安かろう悪かろう" の不安を消す。

  挿入位置: MechanismEnhanced(価格理由) と ZeroDeclaration(¥0項目) の間。
  写真: /images/standard/facility_img_*.webp(StandardAndQualitySection と共通)。
  CTA: 詳細ページが未作成のため、モデルハウス予約導線に集約。
*/

type Item = {
  no: string;
  title: string;
  image: string;
  Icon: LucideIcon;
  body: string;
};

const ITEMS: readonly Item[] = [
  {
    no: "01",
    title: "キッチン・カップボード",
    image: "/images/standard/facility_img_01.webp",
    Icon: Utensils,
    body: "使いやすさと収納力に配慮したキッチンを標準で。毎日の家事を快適にします。",
  },
  {
    no: "02",
    title: "システムバス",
    image: "/images/standard/facility_img_02.webp",
    Icon: Bath,
    body: "保温性や掃除のしやすさに配慮した浴室を標準で。ゆったりくつろげる空間です。",
  },
  {
    no: "03",
    title: "洗面化粧台・トイレ",
    image: "/images/standard/facility_img_03.webp",
    Icon: ShowerHead,
    body: "収納力や清掃性に配慮した設備で、家族みんなが気持ちよく使える水まわりに。",
  },
  {
    no: "04",
    title: "外壁材",
    image: "/images/standard/facility_img_04.webp",
    Icon: Home,
    body: "耐久性・断熱性・遮音性に配慮した外壁材を採用。長く住む家を、外から守ります。",
  },
  {
    no: "05",
    title: "サッシ・断熱材",
    image: "/images/standard/facility_img_06.webp",
    Icon: AppWindow,
    body: "高性能サッシと断熱材で、夏は涼しく冬は暖かい快適な住まいを目指します。",
  },
  {
    no: "06",
    title: "構造・防蟻対策",
    image: "/images/standard/facility_img_11.webp",
    Icon: ShieldCheck,
    body: "見えない部分こそ、住まいの安心を支える大切な場所。構造や防蟻対策まで丁寧に行います。",
  },
  {
    no: "07",
    title: "制震ダンパー MIRAIE",
    image: "/images/standard/facility_img_12.webp",
    Icon: Building2,
    body: "地震の揺れを吸収し、建物へのダメージを軽減。繰り返す揺れにも強い住まいに。",
  },
  {
    no: "08",
    title: "オール電化・照明・給湯器など",
    image: "/images/standard/facility_img_13.webp",
    Icon: Lightbulb,
    body: "オール電化やLED照明、給湯設備など、暮らしを支える設備も標準で整えています。",
  },
];

export default function StandardEquipment() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-white py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1280px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ===== ヘッダー ===== */}
        <div className="relative text-center mb-12 md:mb-16">
          {/* 装飾ラベル */}
          <p
            className="inline-flex items-center gap-3 text-main mb-4 text-[12px] sm:text-[13px] tracking-[0.08em]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            <span aria-hidden className="text-main/70 text-[14px]">＼</span>
            <span>この価格で、ここまで標準。</span>
            <span aria-hidden className="text-main/70 text-[14px]">／</span>
          </p>

          <h2
            className="text-text-primary leading-[1.4] tracking-[0.02em] mb-5"
            style={{
              fontWeight: 500,
              fontSize: "clamp(22px, 3.2vw, 38px)",
            }}
          >
            標準装備で、ここまで整えています。
          </h2>

          <p className="text-text-secondary text-[13px] sm:text-[14.5px] leading-[1.95] max-w-[780px] mx-auto">
            やまと不動産では、暮らしやすさと安心に関わる設備・性能を標準仕様として大切にしています。
            <br className="hidden sm:inline" />
            毎日使う設備から、見えない部分の性能まで。住んでからの快適さを支える標準装備です。
          </p>

          {/* 右上の丸バッジ(LG以上) */}
          <div
            aria-hidden
            className="hidden lg:flex absolute top-0 right-0 w-[124px] h-[124px] rounded-full flex-col items-center justify-center text-center"
            style={{
              background: "rgba(245,238,226,0.7)",
              border: "1.5px dashed rgba(72,107,0,0.35)",
            }}
          >
            <p className="text-[9.5px] text-text-secondary tracking-[0.04em] mb-1.5 leading-tight">
              追加費用の不安を
              <br />
              減らす
            </p>
            <p
              className="text-text-primary text-[14px] tracking-[0.06em] leading-[1.35] mb-1.5"
              style={{ fontWeight: 600 }}
            >
              明確な
              <br />
              標準仕様
            </p>
            <Home className="w-4 h-4 text-main" strokeWidth={1.5} />
          </div>
        </div>

        {/* ===== カードグリッド 4×2 ===== */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {ITEMS.map((item) => {
            const ItemIcon = item.Icon;
            return (
              <li
                key={item.no}
                className="group flex flex-col bg-white border border-border rounded-[10px] overflow-hidden transition-shadow hover:shadow-[0_14px_36px_-18px_rgba(0,0,0,0.18)]"
              >
                {/* 番号+タイトル帯 */}
                <div className="flex items-center gap-2.5 px-4 sm:px-5 pt-4 sm:pt-5 pb-3">
                  <span
                    className="inline-flex items-center justify-center w-[26px] h-[26px] rounded-full text-text-primary text-[10.5px] tabular-nums shrink-0"
                    style={{
                      background: "rgba(245,238,226,0.85)",
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {item.no}
                  </span>
                  <h3 className="text-text-primary text-[14px] sm:text-[15px] tracking-[0.02em] leading-[1.4] font-medium">
                    {item.title}
                  </h3>
                </div>

                {/* 写真 */}
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
                  <Image
                    src={item.image}
                    alt={`やまと不動産の標準仕様 - ${item.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </div>

                {/* アイコン+本文 */}
                <div className="flex gap-3 px-4 sm:px-5 py-4 sm:py-5 flex-1">
                  <span
                    aria-hidden
                    className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full mt-0.5"
                    style={{
                      background: "rgba(162,197,35,0.16)",
                      color: "#486B00",
                    }}
                  >
                    <ItemIcon className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                  <p className="text-text-secondary text-[12px] sm:text-[12.5px] leading-[1.85]">
                    {item.body}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* ===== 下部CTAストリップ ===== */}
        <div
          className="mt-10 md:mt-14 rounded-[10px] px-5 sm:px-7 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{
            background: "rgba(245,238,226,0.6)",
            border: "1px solid rgba(245,238,226,1)",
          }}
        >
          <div className="flex items-center gap-3 sm:gap-4 text-center sm:text-left">
            <ClipboardList
              className="w-5 h-5 sm:w-6 sm:h-6 text-main shrink-0"
              strokeWidth={1.5}
            />
            <p className="text-text-primary text-[13px] sm:text-[14.5px] leading-[1.7]">
              実物の質感や使い勝手は、モデルハウスでご確認いただけます。
            </p>
          </div>
          <Link
            href="/reserve"
            className="inline-flex items-center gap-2 bg-text-primary text-white rounded-full px-6 py-3 text-[13px] sm:text-[14px] font-medium hover:bg-main transition-colors whitespace-nowrap shrink-0"
          >
            モデルハウス見学を予約する
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
