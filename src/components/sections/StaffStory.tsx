"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import {
  FLAT_STAFF,
  REPRESENTATIVES,
  PHOTO_FILTER,
  type Representative,
  type Staff,
} from "@/data/staff";

/*
  【KEY PEOPLE】トップページ版 ─ 2026-04-20 圧縮リデザイン
  方針:
  - トップでは「19人いる」という事実と「代表2名の言葉」だけを伝える
  - 一人ひとりの3つの思いなど詳細は /staff に切り出す
  - 写真モザイクで厚みを出しつつ、縦方向は約1/3〜1/2に短縮
*/

function MiniStaffTile({ staff }: { staff: Staff }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded bg-bg-secondary">
      <Image
        src={`/images/staff/${staff.id}.webp`}
        alt={`${staff.name} | ${staff.role}`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 12vw"
        style={{ filter: PHOTO_FILTER }}
      />
      {/* 氏名は hover 時のみ表示(邪魔せず厚みだけ出す) */}
      <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p
          className="text-white text-[10px] md:text-[11px] font-light leading-tight truncate"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {staff.name}
        </p>
      </div>
    </div>
  );
}

function CompactRepresentative({ rep }: { rep: Representative }) {
  return (
    <article className="scroll-in flex gap-5 md:gap-6 items-start">
      {/* 写真(小) */}
      <div className="relative w-24 h-32 md:w-28 md:h-36 lg:w-32 lg:h-40 shrink-0 overflow-hidden rounded bg-bg-secondary">
        <Image
          src={`/images/staff/${rep.id}.webp`}
          alt={`${rep.role} ${rep.name} | やまと不動産`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 96px, 128px"
          style={{ filter: PHOTO_FILTER }}
        />
      </div>

      {/* 右: テキスト */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[10px] md:text-[11px] tracking-[0.2em] text-text-secondary mb-1"
          style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
        >
          {rep.roleEn.toUpperCase()}
        </p>
        <p className="text-text-secondary text-[12px] md:text-[13px] mb-2">
          {rep.role}
        </p>
        <h3
          className="text-text-primary text-lg md:text-xl font-light leading-tight mb-3"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {rep.name}
        </h3>
        <blockquote
          className="text-text-primary text-[13px] md:text-[15px] leading-[1.8]"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          「{rep.quote}」
        </blockquote>
      </div>
    </article>
  );
}

export default function StaffStory() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="staff" className="bg-bg-primary">
      {/* === イントロ === */}
      <div className="bg-main-light">
        <div className="max-w-[900px] mx-auto px-[var(--page-px)] py-[clamp(56px,calc(32px+5vw),140px)] text-center">
          <p
            className="font-section-label text-main text-xs md:text-sm tracking-[0.2em] mb-5"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            THE TEAM
          </p>
          <h2
            className="text-[clamp(22px,3vw,38px)] text-text-primary leading-[1.5] tracking-[0.03em] mb-6 font-light"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            家を建てるのは、この十九人です。
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
            営業・設計・工務・経営。
            <br />
            それぞれの手が重なって、一軒の家になります。
          </p>
        </div>
      </div>

      {/* === 17人の写真モザイク + 代表2名 + CTA === */}
      <div ref={sectionRef}>
        <div className="mx-auto max-w-[1400px] px-[var(--page-px)] py-[var(--section-py)]">
          {/* 17人のモザイク(一気見せ) */}
          <div className="scroll-in group grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-9 gap-2 md:gap-3">
            {FLAT_STAFF.map((s) => (
              <MiniStaffTile key={s.id} staff={s} />
            ))}
          </div>

          {/* 代表2名(小・横並び) */}
          <div className="mt-16 md:mt-24 pt-10 md:pt-14 border-t border-border">
            <div className="mb-8 md:mb-10 max-w-[640px]">
              <p
                className="font-section-label text-main text-xs md:text-sm tracking-[0.2em] mb-3"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                REPRESENTATIVES
              </p>
              <h3
                className="text-[clamp(20px,2.4vw,28px)] text-text-primary leading-[1.5] font-light"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                そして、この二人で会社を背負っています。
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {REPRESENTATIVES.map((rep) => (
                <CompactRepresentative key={rep.id} rep={rep} />
              ))}
            </div>
          </div>

          {/* CTA: /staff へ */}
          <div className="mt-14 md:mt-20 text-center">
            <p className="text-text-secondary text-sm md:text-base leading-[1.9] mb-6 max-w-[560px] mx-auto">
              一人ひとりの、家づくりの考え方・お客様への言葉・信条を
              <br className="hidden md:inline" />
              紹介ページに綴りました。
            </p>
            <Link
              href="/staff"
              className="group relative inline-flex items-center gap-3 min-h-[48px] px-7 py-3 text-sm md:text-base font-medium border border-text-primary text-text-primary rounded transition-colors duration-[400ms] hover:text-white overflow-hidden"
            >
              <span
                aria-hidden
                className="absolute inset-0 -translate-x-full bg-text-primary transition-transform duration-[500ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0"
              />
              <span className="relative">十九人の紹介を読む</span>
              <span
                aria-hidden
                className="relative transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
