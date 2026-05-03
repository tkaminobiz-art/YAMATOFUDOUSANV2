"use client";

import { MessageCircle, Lock } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/*
  LineLandFeedCta — 2026-05-03
  ---------------------------------------------------------------
  小林専務承認 A項目「12棟達成の3欠落動線」③:
  「LINE登録者限定・未公開土地先行案内」
  「土地が先に見つかる」が決定打になる層へ静かに刺す動線。

  AT-001 (JPクラフト) 回避のため、Editorial Black バリエーションも用意。
  - default: 白基調の静かな提示
  - editorial: 黒基調の主役級

  禁じ手(memory より):
  - 毎日配信・煽り「今だけ」「残り◯組」 → ブロック30-40%につながる
  - 月2-4通・落ち着いた頻度を運用前提とする
*/

type Variant = "default" | "editorial";

type Props = {
  variant?: Variant;
};

export default function LineLandFeedCta({ variant = "default" }: Props) {
  if (variant === "editorial") {
    return (
      <section className="relative bg-[#0A0A0A] text-white py-[clamp(56px,7vw,120px)] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="relative max-w-[1100px] mx-auto px-[var(--page-px)]">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-5 text-[11px] tracking-[0.22em] uppercase">
                <Lock
                  className="w-3.5 h-3.5"
                  style={{ color: "#A2C523" }}
                  strokeWidth={1.8}
                />
                <span
                  style={{ color: "#A2C523", fontWeight: 600 }}
                >
                  LINE限定 / 未公開土地
                </span>
              </div>
              <h2
                className="text-white leading-[1.3] tracking-[-0.005em]"
                style={{
                  fontWeight: 400,
                  fontSize: "clamp(22px, 2.6vw, 36px)",
                }}
              >
                公開前の分譲地を、
                <br />
                LINEで先にお届けします。
              </h2>
              <p className="mt-5 text-white/65 text-[14px] md:text-[15px] leading-[1.95] max-w-[560px]">
                SUUMO・HOME&apos;S への掲載前に、ご登録の方へお先にご案内します。
                配信は月に数通まで、煽りや催促はいたしません。
              </p>
            </div>
            <a
              href={LINE_ADD_FRIEND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded text-[14px] md:text-[15px] font-medium transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
              style={{ background: "#06C755", color: "#fff" }}
            >
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} fill="currentColor" />
              LINEで友だち追加
            </a>
          </div>
        </div>
      </section>
    );
  }

  // default
  return (
    <section className="bg-white py-[clamp(48px,5vw,80px)] border-y border-border">
      <div className="max-w-[1100px] mx-auto px-[var(--page-px)]">
        <div
          className="rounded-lg p-6 md:p-10 border"
          style={{
            background: "#F0F6D8",
            borderColor: "rgba(72,107,0,0.15)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-3 text-[11px] tracking-[0.18em] uppercase">
                <Lock
                  className="w-3.5 h-3.5"
                  style={{ color: "#486B00" }}
                  strokeWidth={1.8}
                />
                <span style={{ color: "#486B00", fontWeight: 600 }}>
                  LINE限定 / 未公開土地
                </span>
              </div>
              <h3 className="text-text-primary text-[18px] md:text-[22px] font-medium leading-[1.5] mb-3">
                公開前の分譲地を、LINEで先にお届けします。
              </h3>
              <p className="text-text-primary/80 text-[13px] md:text-[14px] leading-[1.95] max-w-[600px]">
                SUUMO・HOME&apos;S への掲載前に、ご登録の方へお先にご案内します。
                配信は月に数通まで、煽りや催促はいたしません。
              </p>
            </div>
            <a
              href={LINE_ADD_FRIEND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded text-[14px] font-medium transition-opacity hover:opacity-90 whitespace-nowrap shrink-0"
              style={{ background: "#06C755", color: "#fff" }}
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.5} fill="currentColor" />
              LINEで友だち追加
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
