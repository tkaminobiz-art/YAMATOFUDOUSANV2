"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calculator,
  Home,
  Wallet,
  MapPin,
  CheckCircle2,
  PencilLine,
  Zap,
  ArrowRight,
  Phone,
  ShieldCheck,
  HandHeart,
  Lock,
} from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  FinalCta — 2026-05-03 v4 (診断主役・参考デザイン準拠)
  ---------------------------------------------------------------
  v3: 来場/資料/電話 の3カード並列。並列ゆえに主従がなく、CV 取れず。
  v4: 「無料総額診断」を主役カードに格上げ、来場・電話を脇に置く。
      右側に LDK 写真+実績フローティングカード、最下部に信頼ストリップ。
      参考画像準拠の構成で「ここから動くべき理由」が一目で伝わる導線へ。

  数字スワップゾーン:
    STAT_FACTS の値はやまと公式データ(reference_yamato_official_data.md)から引用。
    資金計画の実数(◯◯件作成 / 満足度 ◯%)が確認でき次第、ここを差し替えること。
*/

const STAT_FACTS = [
  { label: "創業からの歩み", value: "14", unit: "年" },
  { label: "お客様の声", value: "50", unit: "件" },
] as const;

const DIAGNOSIS_FEATURES = [
  { Icon: Calculator, label: "月々いくらなら\n無理がないか" },
  { Icon: Home, label: "土地込みで\n総額いくら必要か" },
  { Icon: Wallet, label: "自己資金が少なくても\n建てられるか" },
  { Icon: MapPin, label: "どのエリアが\n現実的か" },
] as const;

const BUTTON_TRUST = [
  "営業電話なし",
  "相談無料",
  "1分で送信",
  "土地なしOK",
] as const;

const FOOTER_TRUST = [
  {
    Icon: ShieldCheck,
    title: "しつこい営業なし",
    body: "ご相談後の営業電話や\n訪問は一切いたしません。",
  },
  {
    Icon: HandHeart,
    title: "相談だけでもOK",
    body: "まだ検討段階の方も\nお気軽にご利用ください。",
  },
  {
    Icon: Lock,
    title: "秘密は厳守します",
    body: "いただいた情報は\n適切に管理いたします。",
  },
] as const;

export default function FinalCta() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-white border-t border-border py-[clamp(72px,7vw,140px)]">
      <div
        ref={ref}
        className="max-w-[1180px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* === ヘッダー === */}
        <p className="font-section-label text-main text-xs md:text-sm text-center mb-3">
          GET IN TOUCH
        </p>
        <h2 className="text-[clamp(24px,3.2vw,42px)] text-text-primary text-center leading-[1.45] tracking-[0.02em] mb-5">
          家づくりの総額を、<br className="md:hidden" />無料で見える化しませんか。
        </h2>
        <p className="text-text-secondary text-sm md:text-[15px] leading-[1.95] text-center max-w-[720px] mx-auto mb-12 md:mb-14">
          土地探し・住宅ローン・月々の支払いまで、あなたの条件で無理のない予算を整理します。
          <br className="hidden md:inline" />
          しつこい営業はしません。まだ何も決まっていなくても大丈夫です。
        </p>

        {/* === メインカード === 左:診断パネル / 右:写真+実績 */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-4 lg:gap-0 lg:relative">
          {/* 左:診断パネル */}
          <div className="relative z-10 bg-white border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_-32px_rgba(72,107,0,0.18)] lg:mr-[-32px] lg:my-6">
            {/* バッジ列 */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-main text-white text-[11px] font-semibold px-3 py-1.5"
                style={{ letterSpacing: "0.04em" }}
              >
                <Zap className="w-3 h-3" strokeWidth={2.5} fill="currentColor" />
                たった30秒で完了！
              </span>
              <span className="inline-flex items-center rounded-full border border-main/40 text-main text-[10px] font-bold px-2.5 py-1 tracking-[0.08em]">
                完全無料
              </span>
            </div>

            {/* 大見出し */}
            <h3
              className="text-lime-deep font-bold text-[clamp(26px,3.4vw,40px)] leading-[1.15] tracking-[0.06em] mb-3"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              無料資金計画診断
            </h3>
            <p className="text-text-secondary text-[13px] md:text-sm leading-[1.7] mb-7">
              あなたの場合の目安をまとめてご提案します。
            </p>

            {/* 4つの特徴アイコン */}
            <ul className="grid grid-cols-4 gap-2 sm:gap-3 mb-7">
              {DIAGNOSIS_FEATURES.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex flex-col items-center text-center"
                >
                  <span
                    aria-hidden
                    className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full mb-2"
                    style={{ background: "rgba(162,197,35,0.16)" }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-main"
                      strokeWidth={1.5}
                    />
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-text-secondary leading-[1.5] whitespace-pre-line">
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* メインCTA */}
            <Link
              href="/money"
              className="group relative inline-flex items-center justify-center w-full overflow-hidden bg-lime text-lime-darker rounded-full border-b-[3px] border-lime-hover min-h-[64px] px-6 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-lime-hover hover:border-lime-deep hover:shadow-[0_18px_44px_-10px_rgba(162,197,35,0.55)] mb-5"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
              />
              <span className="relative inline-flex items-center gap-3">
                <PencilLine className="w-5 h-5" strokeWidth={2} />
                <span className="font-bold text-[15px] sm:text-[17px] tracking-[0.04em]">
                  無料で総額診断をする
                </span>
                <Zap className="w-4 h-4 -ml-1" strokeWidth={2} fill="currentColor" />
              </span>
              <ArrowRight
                className="relative w-5 h-5 ml-auto transition-transform duration-[400ms] group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </Link>

            {/* 信頼バッジ列 */}
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {BUTTON_TRUST.map((t) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] text-text-secondary"
                >
                  <CheckCircle2
                    className="w-3.5 h-3.5 text-main"
                    strokeWidth={2}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* 右:写真+フローティング実績カード */}
          <div className="relative rounded-2xl overflow-hidden lg:my-0 min-h-[280px] sm:min-h-[360px] lg:min-h-[unset]">
            <Image
              src="/images/sections/hope-living.webp"
              alt="やまと不動産が手がけたモデルハウスのLDK"
              fill
              sizes="(max-width: 1024px) 100vw, 560px"
              className="object-cover"
            />
            {/* 写真の下部にだけ柔らかい白フェード(カード可読性) */}
            <div
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-white/45 to-transparent pointer-events-none"
            />

            {/* フローティング実績カード */}
            <div className="absolute left-4 right-4 bottom-4 sm:left-auto sm:right-6 sm:bottom-6 sm:w-[320px] bg-white/95 backdrop-blur-[6px] rounded-xl shadow-[0_18px_50px_-18px_rgba(0,0,0,0.25)] border border-white/80 p-4 sm:p-5">
              <p className="text-[11px] sm:text-[12px] text-text-secondary text-center mb-3">
                多くのお客様にご利用いただいています
              </p>
              <dl className="grid grid-cols-2 divide-x divide-border">
                {STAT_FACTS.map((s) => (
                  <div key={s.label} className="text-center px-2">
                    <dt className="text-[10px] sm:text-[11px] text-text-secondary mb-1">
                      {s.label}
                    </dt>
                    <dd className="text-main">
                      <span
                        className="font-bold tabular-nums leading-none"
                        style={{
                          fontFamily: "var(--font-oswald)",
                          fontSize: "clamp(28px, 3.4vw, 38px)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {s.value}
                      </span>
                      <span className="text-[12px] sm:text-[13px] font-semibold ml-0.5">
                        {s.unit}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="text-[9px] sm:text-[10px] text-text-secondary/80 text-center mt-2">
                ※2026年4月時点・自社調べ
              </p>
            </div>
          </div>
        </div>

        {/* === セカンダリ2カード === モデルハウス / 電話 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-5">
          <Link
            href="/reserve"
            className="group flex items-center gap-4 sm:gap-5 bg-bg-secondary/60 hover:bg-bg-secondary border border-border rounded-xl p-5 sm:p-6 transition-colors"
          >
            <span
              aria-hidden
              className="shrink-0 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white"
            >
              <Home className="w-6 h-6 sm:w-7 sm:h-7 text-main" strokeWidth={1.5} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] sm:text-[15px] font-semibold text-text-primary mb-1">
                モデルハウスを見てみる
              </p>
              <p className="text-[11px] sm:text-[12px] text-text-secondary leading-[1.7] mb-2.5">
                実際の建物を見ながら、家づくりのイメージを具体的にしてみませんか？
              </p>
              <span className="inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] text-main font-semibold border border-main/30 rounded-full px-3 py-1.5 group-hover:bg-main group-hover:text-white group-hover:border-main transition-colors">
                モデルハウスの空き枠を見る
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </span>
            </div>
          </Link>

          <a
            href="tel:0742361123"
            className="group flex items-center gap-4 sm:gap-5 bg-bg-secondary/60 hover:bg-bg-secondary border border-border rounded-xl p-5 sm:p-6 transition-colors"
          >
            <span
              aria-hidden
              className="shrink-0 inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white"
            >
              <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-main" strokeWidth={1.5} />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] sm:text-[15px] font-semibold text-text-primary mb-1">
                お電話でのご相談はこちら
              </p>
              <p className="text-[11px] sm:text-[12px] text-text-secondary leading-[1.7] mb-1.5">
                急ぎの方や直接相談したい方は、お気軽にお電話ください。
              </p>
              <p
                className="text-text-primary tabular-nums"
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontWeight: 500,
                  fontSize: "clamp(22px, 2.4vw, 30px)",
                  letterSpacing: "-0.01em",
                  lineHeight: 1,
                }}
              >
                0742-36-1123
              </p>
              <p className="text-[10px] sm:text-[11px] text-text-secondary mt-1">
                営業時間 9:00〜19:00（火・水定休）
              </p>
            </div>
          </a>
        </div>

        {/* === 信頼ストリップ === */}
        <div className="mt-8 md:mt-10 bg-lime-light/70 border border-lime-light rounded-2xl px-5 sm:px-8 lg:px-10 py-7 sm:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 lg:gap-8 items-center">
            {/* 左: 家族イラスト */}
            <div className="hidden sm:flex shrink-0 items-end justify-center lg:w-[110px]">
              <FamilyMark />
            </div>

            {/* 中央: メインメッセージ */}
            <div className="text-center lg:text-left">
              <p className="text-[15px] sm:text-[17px] font-semibold text-text-primary mb-2 leading-[1.5]">
                家づくりは、人生で一度の大きな決断。
              </p>
              <p className="text-[12px] sm:text-[13px] text-text-secondary leading-[1.85]">
                だからこそ、納得いくまで一緒に考えたいと思っています。
                <br className="hidden sm:inline" />
                どうぞ、安心してご相談ください。
              </p>
            </div>

            {/* 右: 3バッジ */}
            <ul className="grid grid-cols-3 gap-3 sm:gap-4 lg:flex lg:gap-5 lg:shrink-0">
              {FOOTER_TRUST.map(({ Icon, title, body }) => (
                <li key={title} className="flex flex-col items-center lg:items-start text-center lg:text-left lg:max-w-[150px]">
                  <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold text-main mb-1">
                    <Icon className="w-3.5 h-3.5" strokeWidth={2} />
                    {title}
                  </span>
                  <p className="text-[10px] sm:text-[11px] text-text-secondary leading-[1.65] whitespace-pre-line">
                    {body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 家族(3人)ミニマル線画 — Lucide風1.5pxストロークで揃える */
function FamilyMark() {
  return (
    <svg
      viewBox="0 0 110 80"
      width="110"
      height="80"
      fill="none"
      stroke="#486B00"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {/* 父 */}
      <circle cx="28" cy="22" r="7" />
      <path d="M18 78 V52 a10 10 0 0 1 20 0 V78" />
      {/* 母 */}
      <circle cx="78" cy="24" r="6.5" />
      <path d="M68 78 V52 a10 10 0 0 1 20 0 V78" />
      {/* 子 */}
      <circle cx="55" cy="40" r="5" />
      <path d="M48 78 V60 a7 7 0 0 1 14 0 V78" />
    </svg>
  );
}
