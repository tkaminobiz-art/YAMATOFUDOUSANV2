"use client";

import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import { Calendar, FileText, Phone } from "lucide-react";

/*
  FinalCta — 2026-05-03 v3 (3カード型・段階的開示の終端)
  ---------------------------------------------------------------
  v2: 2ボタン + LINE + 電話 の縦スタック構成
  v3: 来場予約 / 資料請求 / 電話 を3カードで並列、参考画像準拠
      → 各動線が等価に並び、お客様が自分の温度感に合う動線を選べる
*/

const FOREST = "#486B00";

type Card = {
  href: string;
  Icon: typeof Calendar;
  label: string;
  primaryLine: string;
  sub: string;
  external?: boolean;
};

const CARDS: readonly Card[] = [
  {
    href: "/reserve",
    Icon: Calendar,
    label: "来場予約",
    primaryLine: "モデルハウスを見学する",
    sub: "ご予約なしでも見学可・無料",
  },
  {
    href: "/contact",
    Icon: FileText,
    label: "資料請求(無料)",
    primaryLine: "詳しい資料をお届け",
    sub: "1分で完了・しつこい連絡はしません",
  },
  {
    href: "tel:0742361123",
    Icon: Phone,
    label: "お電話でのお問い合わせ",
    primaryLine: "0742-36-1123",
    sub: "営業時間 9:00〜19:00(火・水定休)",
  },
];

export default function FinalCta() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-white border-t border-border py-[clamp(64px,7vw,140px)]">
      <div
        ref={ref}
        className="max-w-[1100px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <p
          className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-3 text-center"
          style={{ color: FOREST, fontWeight: 600 }}
        >
          Get in touch
        </p>
        <h2 className="text-[clamp(22px,2.8vw,36px)] text-text-primary text-center leading-[1.4] mb-4">
          ご相談・資料請求はこちらから。
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-[1.9] text-center max-w-[640px] mx-auto mb-12 md:mb-14">
          土地探しや資金計画も、まとめてご相談ください。
          強引な勧誘はしません。
        </p>

        {/* 3カード */}
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
          {CARDS.map((c) => {
            const Icon = c.Icon;
            const isPhone = c.href.startsWith("tel:");
            const isExternal = c.external;
            const className =
              "scroll-in group flex flex-col items-center text-center bg-white border border-border rounded-lg p-6 md:p-7 lg:p-8 transition-[border-color,transform,box-shadow] duration-[400ms] hover:-translate-y-1 hover:border-main hover:shadow-[0_20px_40px_-24px_rgba(72,107,0,0.18)]";

            const inner = (
              <>
                <span
                  aria-hidden
                  className="inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full mb-5 transition-colors"
                  style={{
                    background: "rgba(162, 197, 35, 0.14)",
                    color: FOREST,
                  }}
                >
                  <Icon
                    className="w-5 h-5 md:w-6 md:h-6"
                    strokeWidth={1.6}
                  />
                </span>
                <span
                  className="text-[11px] md:text-[12px] tracking-[0.18em] uppercase mb-2"
                  style={{ color: FOREST, fontWeight: 600 }}
                >
                  {c.label}
                </span>
                <span
                  className={
                    isPhone
                      ? "text-text-primary tabular-nums leading-none mb-2"
                      : "text-text-primary text-[15px] md:text-[17px] font-medium leading-[1.4] mb-2"
                  }
                  style={
                    isPhone
                      ? {
                          fontFamily: "var(--font-oswald)",
                          fontWeight: 400,
                          fontSize: "clamp(26px, 3vw, 40px)",
                          letterSpacing: "-0.01em",
                        }
                      : undefined
                  }
                >
                  {c.primaryLine}
                </span>
                <span className="text-text-secondary text-[11px] md:text-[12px] leading-[1.7]">
                  {c.sub}
                </span>
              </>
            );

            if (isPhone || isExternal) {
              return (
                <li key={c.href}>
                  <a
                    href={c.href}
                    className={className}
                    {...(isExternal
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {inner}
                  </a>
                </li>
              );
            }
            return (
              <li key={c.href}>
                <Link href={c.href} className={className}>
                  {inner}
                </Link>
              </li>
            );
          })}
        </ul>

        <p className="text-text-secondary text-[11px] md:text-[12px] mt-10 text-center">
          ご相談・お問い合わせは無料です。
        </p>
      </div>
    </section>
  );
}
