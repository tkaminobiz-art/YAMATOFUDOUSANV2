"use client";

import Link from "next/link";
import { Handshake, FileCheck, Home, type LucideIcon } from "lucide-react";
import { useScrollIn } from "@/hooks/useScrollIn";

/*
  ZeroTeaser — Plan B 用
  - 8項目→3項目(各章から代表1つずつ)
  - 残り5項目は /zero(将来)へのリンクで吸収
*/

type ZeroItem = {
  num: string;
  chapter: "Before" | "During" | "After";
  title: string;
  desc: string;
  Icon: LucideIcon;
};

const FEATURED_ZEROS: ZeroItem[] = [
  {
    num: "01",
    chapter: "Before",
    title: "仲介手数料",
    desc: "自社分譲のため、仲介会社を挟みません。数十万〜百万円単位の手数料はかかりません。",
    Icon: Handshake,
  },
  {
    num: "06",
    chapter: "During",
    title: "不透明な追加費用",
    desc: "見積もりに載っていない費用が、あとから上乗せされることはありません。一枚の見積もりで全体が分かる形にします。",
    Icon: FileCheck,
  },
  {
    num: "08",
    chapter: "After",
    title: "モデルハウスとのギャップ",
    desc: "モデルハウスでご覧になった設備を、オプションではなく標準仕様として揃えています。",
    Icon: Home,
  },
];

export default function ZeroTeaser() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="relative bg-text-primary text-white py-[var(--section-py)] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.4), rgba(255,255,255,0.4) 1px, transparent 1px, transparent 24px)",
        }}
      />

      <div ref={ref} className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in">
        <div className="max-w-[760px] mb-12 md:mb-16">
          <p
            className="font-section-label text-lime text-xs md:text-sm tracking-[0.2em] mb-4"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            ZERO DECLARATION
          </p>
          <h2
            className="text-[clamp(26px,3.4vw,44px)] font-light leading-[1.4] tracking-[0.04em] mb-5"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            「あとから出る費用」を、
            <br className="md:hidden" />
            ゼロにする宣言。
          </h2>
          <p className="text-[14px] md:text-[15px] leading-[1.95] text-white/70">
            契約前から建築後まで、見積もりの後出しはしません。代表的な3つを下に。残り5項目は別ページで詳しくご覧いただけます。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {FEATURED_ZEROS.map((z) => {
            const Icon = z.Icon;
            return (
              <article
                key={z.num}
                className="relative rounded-2xl border border-white/15 bg-white/[0.04] p-7 md:p-8 backdrop-blur-[2px]"
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="text-[10px] font-semibold tracking-[0.22em] text-white/55"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {z.chapter} · {z.num}
                  </span>
                  <span
                    className="inline-flex items-center border border-lime/40 bg-lime/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] text-lime"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    ¥0
                  </span>
                </div>

                <Icon className="w-7 h-7 mb-5 text-lime" strokeWidth={1.5} />

                <h3
                  className="text-[19px] md:text-[22px] font-light leading-snug mb-3 text-white"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {z.title}
                </h3>

                <p className="text-white/70 text-[13px] leading-[1.85]">{z.desc}</p>
              </article>
            );
          })}
        </div>

        {/* 残り5項目への誘導 */}
        <div className="mt-14 md:mt-20 text-center">
          <p className="text-white/60 text-sm md:text-base mb-6">
            この他にも、「つなぎ融資負担」「地盤改良費」など全8項目を
            <br className="hidden md:inline" />
            別ページで詳しくご紹介しています。
          </p>
          <Link
            href="/zero"
            className="group relative inline-flex items-center gap-3 min-h-[48px] px-7 py-3 text-sm md:text-base font-medium border border-white/40 text-white rounded transition-colors duration-[400ms] hover:text-text-primary overflow-hidden"
          >
            <span
              aria-hidden
              className="absolute inset-0 -translate-x-full bg-white transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
            />
            <span className="relative">8つのゼロ宣言をすべて見る</span>
            <span
              aria-hidden
              className="relative transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <p className="text-white/40 text-xs mt-3 italic">
            (※ /zero ページは未作成・現在はリンク先未設置の prototype 状態)
          </p>
        </div>
      </div>
    </section>
  );
}
