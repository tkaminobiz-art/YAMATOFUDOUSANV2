"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import { Shield, Bug, Wrench, Phone, ShieldCheck } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";

/*
  Standard × Quality（統合）
  - Standard: 標準仕様（写真で見せる）
  - Quality: 施工品質（数字で担保する）
  それぞれを別セクションにすると重複しやすいため、見開きとして一体化する。
*/

const STANDARDS = [
  {
    category: "外壁",
    brand: "ニチハ",
    detail: "窯業系サイディング16mm",
    image: "/images/standard/facility_img_04.webp",
    size: "large",
  },
  {
    category: "屋根",
    brand: "ガルバリウム",
    detail: "高耐久 金属屋根",
    image: "/images/standard/facility_img_07.webp",
    size: "wide",
  },
  {
    category: "窓サッシ",
    brand: "YKK AP",
    detail: "Low-E複層ガラス 樹脂サッシ",
    image: "/images/standard/facility_img_06.webp",
    size: "small",
  },
  {
    category: "玄関ドア",
    brand: "YKK AP",
    detail: "親子ドア＋顔認証（花モデル）",
    image: "/images/standard/facility_img_05.webp",
    size: "small",
  },
  {
    category: "室内ドア",
    brand: "ハイドア",
    detail: "天井まで届くフラット扉が標準",
    image: "/images/standard/facility_img_08.webp",
    size: "small",
  },
  {
    category: "床材",
    brand: "無垢調フローリング",
    detail: "踏み心地にこだわる標準仕様",
    image: "/images/standard/facility_img_09.webp",
    size: "small",
  },
  {
    category: "キッチン",
    brand: "クリナップ",
    detail: "システムキッチン＋食洗機＋IH3口",
    image: "/images/standard/facility_img_01.webp",
    size: "wide",
  },
  {
    category: "浴室",
    brand: "TOTO",
    detail: "ユニットバス 1616 / 保温浴槽",
    image: "/images/standard/facility_img_02.webp",
    size: "small",
  },
  {
    category: "洗面台",
    brand: "TOTO",
    detail: "750サイズ洗面化粧台",
    image: "/images/standard/facility_img_03.webp",
    size: "small",
  },
  {
    category: "外構",
    brand: "石畳アプローチ",
    detail: "門柱・ポスト・表札・外構一式込み",
    image: "/images/standard/facility_img_10.webp",
    size: "small",
  },
  {
    category: "制震装置",
    brand: "住友ゴム MIRAIE",
    detail: "揺れ最大70%低減",
    image: "/images/standard/facility_img_12.webp",
    size: "small",
  },
  {
    category: "照明",
    brand: "LED ダウンライト",
    detail: "主要室すべて標準装備",
    image: "/images/standard/facility_img_13.webp",
    size: "small",
  },
] as const;

const QUALITY_CARDS = [
  {
    number: "10",
    unit: "年",
    title: "外壁メンテの目安",
    desc: "外壁は、10年前後で塗り替えを検討する方が多いと言われます。やまと不動産は、長く保ちやすい仕様を標準にしています。",
  },
  {
    number: "1.2",
    unit: "倍",
    title: "見えない部分の塗布量",
    desc: "推奨量の1.2倍を塗布します。見えない厚みが、年数が経ったときに効いてきます。",
  },
  {
    number: "100",
    unit: "%自社",
    title: "設計から施工まで一貫",
    desc: "工程を外に投げず、最後まで責任が途切れない体制にしています。",
  },
] as const;

const GUARANTEES = [
  {
    icon: Shield,
    num: "20",
    unit: "年",
    title: "地盤保証",
    desc: "地盤調査から保証まで、第三者機関が実施します。万一、地盤が沈むようなことがあっても、20年守ります。",
  },
  {
    icon: Bug,
    num: "10",
    unit: "年",
    title: "しろあり保証",
    desc: "お引き渡し後、10年のしろあり保証。以降も有料延長で続けられます。",
  },
  {
    icon: Wrench,
    num: "5",
    unit: "回",
    title: "定期点検",
    desc: "お引き渡し後、半年・1年・2年・5年・10年のタイミングで、自社スタッフが伺います。",
  },
  {
    icon: Phone,
    num: "1",
    unit: "本",
    title: "お電話ひとつで、すぐ対応",
    desc: "お引き渡し後も、ご不具合もご相談も。お電話ひとつで、担当が伺います。",
  },
] as const;

export default function StandardAndQualitySection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="standard-quality" className="relative overflow-hidden bg-bg-secondary py-[var(--section-py)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.33]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(43,43,43,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,43,43,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />
      <div ref={ref} className="relative max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in">
        <div className="mb-10 md:mb-14 max-w-[760px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            品質と保証
          </p>
          <h2
            className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            10年後の手間まで、含めて考える。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9]">
            外壁は、10年前後で塗り替えを検討する方が多いと言われます。やまと不動産は、仕様と施工の手間を“最初から”揃え、メンテの頻度を抑えやすい家を目指します。さらに、保証で安心まで支えます。
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* 左：標準仕様（写真） */}
          <div className="lg:col-span-8 lg:sticky lg:top-[120px] self-start">
            <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary mb-3">
              外壁・屋根も、標準から（写真は一部）
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-3">
              {STANDARDS.map((item) => {
                const spanClass =
                  item.size === "large"
                    ? "col-span-2 row-span-2"
                    : item.size === "wide"
                      ? "col-span-2 row-span-1"
                      : "col-span-1 row-span-1";

                return (
                  <div
                    key={item.category}
                    className={`scroll-in relative group overflow-hidden rounded ${spanClass}`}
                    style={{
                      aspectRatio:
                        item.size === "large"
                          ? "1 / 1"
                          : item.size === "wide"
                            ? "2 / 1"
                            : "1 / 1",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={`${item.category} - ${item.brand}`}
                      fill
                      className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      sizes={
                        item.size === "large"
                          ? "(max-width: 1024px) 50vw, 33vw"
                          : item.size === "wide"
                            ? "(max-width: 1024px) 50vw, 33vw"
                            : "(max-width: 640px) 50vw, 16vw"
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 lg:p-5">
                      <p className="text-white/80 text-[10px] md:text-xs font-medium tracking-wider mb-0.5">
                        {item.brand}
                      </p>
                      <h3
                        className={`text-white font-medium ${
                          item.size === "large"
                            ? "text-lg md:text-xl"
                            : "text-sm md:text-base"
                        }`}
                        style={{ fontFamily: "var(--font-sans)" }}
                      >
                        {item.category}
                      </h3>
                      {item.size !== "small" ? (
                        <p className="text-white/70 text-xs mt-1 hidden md:block">
                          {item.detail}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-text-secondary text-[11px] mt-6">
              ※ 花モデル（二千四百八十万円）の標準仕様です。風・京は一部仕様が異なります。
            </p>
          </div>

          {/* 右：品質（数字） */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-border bg-bg-primary p-6 md:p-7">
              <p className="text-xs font-semibold tracking-[0.14em] text-main">
                品質（外壁）
              </p>
              <p className="mt-3 text-sm leading-[1.9] text-text-secondary">
                仕上がりは、完成した日に見えます。けれど差が出るのは、住み始めてからです。仕様と施工の積み重ねが、10年後の手間を左右します。
              </p>

              <div className="mt-5 rounded-xl border border-border bg-bg-secondary/60 px-5 py-4">
                <p className="text-[11px] font-semibold tracking-[0.18em] text-text-secondary">
                  目指している状態
                </p>
                <p
                  className="mt-2 text-[15px] font-semibold leading-relaxed tracking-[0.04em] text-text-primary"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  塗り替えの頻度を、できるだけ抑えられる外壁。
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-text-secondary">
                  ※ 立地や日当たりなどの環境条件で、劣化のスピードは変わります。
                </p>
              </div>

              <div className="mt-6 space-y-4">
                {QUALITY_CARDS.map((c) => (
                  <div key={c.title} className="rounded-xl border border-border bg-bg-secondary/60 p-5">
                    <div className="flex items-baseline gap-2">
                      <span
                        className="text-main font-light text-[clamp(34px,4vw,56px)]"
                        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                      >
                        {c.number}
                      </span>
                      <span className="text-text-primary text-sm font-medium">
                        {c.unit}
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-semibold text-text-primary">
                      {c.title}
                    </p>
                    <p className="mt-2 text-[13px] leading-[1.9] text-text-secondary">
                      {c.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <p className="text-[11px] leading-relaxed text-text-secondary">
                  ※ 保証はこの下でまとめてご案内します。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ここから保証（同じトーンで連結） */}
        <div id="guarantee" className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
          <div className="mb-10 md:mb-12 max-w-[760px]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              品質と保証
            </p>
            <h2
              className="text-[clamp(22px,3vw,34px)] text-text-primary mb-4"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              保証は、安心の根拠です。
            </h2>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9]">
              家は、建てて終わりではありません。第三者機関の保険と、年数の保証で、住み続ける時間を支えます。
            </p>
          </div>

          {/* メイン：瑕疵担保責任保険 */}
          <div className="scroll-in bg-bg-primary rounded-2xl p-[clamp(24px,3.2vw,44px)] card-shadow mb-[var(--card-gap)] border-l-4 border-main">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
              <div className="flex items-baseline gap-2">
                <ShieldCheck className="w-8 h-8 text-main shrink-0" strokeWidth={1.5} />
                <div className="flex items-baseline gap-1">
                  <span
                    className="text-main font-light text-6xl md:text-7xl leading-none"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    10
                  </span>
                  <span className="text-text-primary text-lg md:text-xl">年</span>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-2 flex-wrap mb-2">
                  <h3 className="text-text-primary text-lg md:text-xl font-medium" style={{ fontFamily: "var(--font-sans)" }}>
                    建物瑕疵担保責任保険
                  </h3>
                  <span className="text-accent text-[11px] font-medium tracking-wider">
                    国交省指定・第三者機関
                  </span>
                </div>
                <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
                  万一の構造不具合や雨水の浸入に対して、10年間の保証をご用意しています。国土交通大臣指定の第三者機関が引き継ぐ、法定の保険です。万が一、当社がなくなっても保証は続きます。
                </p>
              </div>
            </div>
          </div>

          {/* サブ：4つの保証 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--card-gap)]">
            {GUARANTEES.map((g) => (
              <div key={g.title} className="scroll-in bg-bg-primary rounded-2xl p-[var(--card-p)] card-shadow">
                <g.icon className="w-6 h-6 text-main mb-4" strokeWidth={1.5} />
                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className="text-main font-light text-5xl md:text-6xl leading-none"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {g.num}
                  </span>
                  <span className="text-text-primary text-base md:text-lg">
                    {g.unit}
                  </span>
                </div>
                <h3 className="text-text-primary font-medium text-base mb-2" style={{ fontFamily: "var(--font-sans)" }}>
                  {g.title}
                </h3>
                <p className="text-text-secondary text-xs leading-relaxed">
                  {g.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 md:mt-12 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[52rem] text-[11px] leading-[1.9] text-text-secondary md:text-xs">
              ※ 保証の内容は制度・条件により変わる場合があります。詳細は来場時にご案内します。
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <CtaButton
                href="/reserve"
                variant="primary"
                size="md"
                label="来場予約"
                sublabel="品質と保証をまとめて確認"
              />
              <CtaButton
                href="/contact"
                variant="secondary"
                size="md"
                label="まずは質問だけ"
                sublabel="気になる点をメッセージで"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

