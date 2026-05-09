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
  MessageCircle,
  Zap,
  ArrowRight,
} from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/*
  FinalCta — 2026-05-05 v5 (無料総額診断はそのまま主役・入口だけLINE化)
  ---------------------------------------------------------------
  v4: 主CTA「無料で総額診断をする」→ /money(フォーム)。CV ハードルは残っていた。
  v5: 「無料総額診断」の資産は壊さず、入口だけ LINE 相談に切り替え。
      主CTA = LINEで無料総額診断を相談する / 副 = 見学 / 補助 = 資料請求。
      4 つの診断特徴アイコンは "LINE で何を聞けるか" の役割で温存。

  STAT_FACTS は 2026-05-03 専務確認済みの実数:
    - 引渡し件数 600件以上
    - 資金計画作成実績 1,000件以上
*/

const STAT_FACTS = [
  { label: "引渡し件数", value: "600", unit: "件以上" },
  { label: "資金計画作成実績", value: "1,000", unit: "件以上" },
] as const;

const DIAGNOSIS_FEATURES = [
  { Icon: Calculator, label: "月々いくらなら\n無理がないか" },
  { Icon: Home, label: "土地込みで\n総額いくら必要か" },
  { Icon: Wallet, label: "自己資金が少なくても\n建てられるか" },
  { Icon: MapPin, label: "どのエリアが\n現実的か" },
] as const;

const BUTTON_TRUST = [
  "ご希望のない営業はいたしません",
  "ご相談無料",
  "1分で送信",
  "土地なしOK",
] as const;

export default function FinalCta() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="font-murecho bg-white border-t border-border py-[clamp(72px,7vw,140px)]">
      <div
        ref={ref}
        className="max-w-[1180px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* === ヘッダー === */}
        {/* 2026-05-06 design-critic: 装飾英語 "GET IN TOUCH" を撤去。
            h2 だけで十分セクションを立てられる(テンプレ感の削除) */}
        <h2
          className="font-zen-old text-[clamp(24px,3.2vw,42px)] text-text-primary text-center leading-[1.4] tracking-[0.02em] mt-2 mb-5"
          style={{ fontWeight: 600 }}
        >
          家づくりの総額を、<br className="md:hidden" />無料で整理しませんか。
        </h2>
        <p className="text-text-secondary text-sm md:text-[15px] leading-[1.95] text-center max-w-[720px] mx-auto mb-12 md:mb-14">
          土地代・建物価格・付帯工事・住宅ローン・月々の支払いを、同じ表で並べます。
          <br className="hidden md:inline" />
          土地がない段階でも、月々の上限から逆算できます。
          ご希望のない営業電話・訪問はいたしません。
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
                約1分で送信できます
              </span>
              <span className="inline-flex items-center rounded-full border border-main/40 text-main text-[10px] font-bold px-2.5 py-1 tracking-[0.08em]">
                ご相談無料
              </span>
            </div>

            {/* 大見出し */}
            <h3
              className="text-lime-deep font-bold text-[clamp(26px,3.4vw,40px)] leading-[1.15] tracking-[0.06em] mb-3"
              style={{ fontFamily: "var(--font-murecho-var)" }}
            >
              無料資金計画診断
            </h3>
            <p className="text-text-secondary text-[13px] md:text-sm leading-[1.7] mb-7">
              ご家族の場合の目安を、まとめてご提案します。
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

            {/* メインCTA — 入口をLINEに。診断ロジックは温存 */}
            <a
              href={LINE_ADD_FRIEND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center w-full overflow-hidden text-white rounded-full border-b-[3px] min-h-[64px] px-6 transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(6,199,85,0.55)] mb-3"
              style={{ backgroundColor: "#06C755", borderBottomColor: "#04A346" }}
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
              />
              <span className="relative inline-flex items-center gap-3">
                <MessageCircle className="w-5 h-5" strokeWidth={2} fill="currentColor" />
                <span className="font-bold text-[15px] sm:text-[17px] tracking-[0.04em]">
                  LINEで土地込み総額を無料診断
                </span>
              </span>
              <ArrowRight
                className="relative w-5 h-5 ml-auto transition-transform duration-[400ms] group-hover:translate-x-1"
                strokeWidth={1.75}
              />
            </a>
            {/* フォーム派・LINE未利用層への補助リンク */}
            <p className="text-center text-[12px] text-text-secondary mb-5">
              LINEを使われない方は、
              <Link
                href="/money"
                className="text-main font-medium underline decoration-main/40 underline-offset-2 hover:decoration-main"
              >
                フォームでも診断できます
              </Link>
              。
            </p>

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

        {/* === セカンダリCTA === 2026-05-06 design-critic 指摘#2 整理:
            LINE主役を立てるため、見学・フォームは控えめなアウトラインに統一。
            電話は "特大" → "小さめ" に降格(下部の補助情報として温存)。 */}
        <div className="mt-6 sm:mt-8">
          <div className="max-w-[680px] mx-auto text-center">
            <p className="text-text-secondary text-[13px] sm:text-sm leading-[1.95] mb-5">
              LINE以外の窓口もご用意しています。
            </p>

            {/* 見学・フォーム — 控えめなアウトラインで横並び */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7 sm:mb-8 max-w-[560px] mx-auto">
              <Link
                href="/reserve"
                className="group inline-flex items-center justify-center gap-2 bg-white text-text-primary border border-text-primary/30 rounded-full min-h-[52px] px-6 transition-colors duration-300 hover:bg-text-primary hover:text-white hover:border-text-primary"
              >
                <Home className="w-4 h-4" strokeWidth={1.75} />
                <span className="font-medium text-[13px] sm:text-[14px] tracking-[0.04em]">
                  モデルハウスを見学する
                </span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-white text-text-primary border border-text-primary/30 rounded-full min-h-[52px] px-6 transition-colors duration-300 hover:bg-text-primary hover:text-white hover:border-text-primary"
              >
                <PencilLine className="w-4 h-4" strokeWidth={1.75} />
                <span className="font-medium text-[13px] sm:text-[14px] tracking-[0.04em]">
                  フォームで診断する
                </span>
              </Link>
            </div>

            {/* 電話 — 下に小さく(高齢層・即時相談派の方向け) */}
            <p className="text-text-secondary text-[11px] sm:text-[12px] tracking-[0.06em] mb-1">
              お電話でも承ります
            </p>
            <a
              href="tel:0742361123"
              className="inline-flex items-baseline gap-2 text-text-primary hover:text-main transition-colors"
            >
              <span
                className="tabular-nums leading-none"
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontWeight: 500,
                  fontSize: "clamp(20px, 2.4vw, 30px)",
                  letterSpacing: "0.01em",
                }}
              >
                0742-36-1123
              </span>
              <span className="text-text-secondary text-[11px] sm:text-[12px]">
                9:00〜19:00／火・水定休
              </span>
            </a>
          </div>
        </div>

        {/* === 信頼ストリップ === 2026-05-06 整理:
            "家づくりは人生で一度の…" 見慣れたコピーを撤去。
            FOOTER_TRUST 3バッジは BUTTON_TRUST と重複していたため撤去。
            家族イラスト + 引き締まった一言だけを残し、空気で締める。 */}
        <div className="mt-8 md:mt-10 bg-lime-light/70 border border-lime-light rounded-2xl px-5 sm:px-8 lg:px-10 py-6 sm:py-7">
          <div className="flex items-center justify-center gap-5 lg:gap-7">
            <div className="hidden sm:flex shrink-0 items-end">
              <FamilyMark />
            </div>
            <p className="text-text-primary text-[13px] sm:text-[15px] leading-[1.85] text-center sm:text-left">
              迷っている段階から、ご相談ください。
              <br className="sm:hidden" />
              <span className="text-text-secondary text-[12px] sm:text-[13px]">
                土地、総額、標準仕様まで、ご家族の条件に合わせて整理します。
              </span>
            </p>
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
