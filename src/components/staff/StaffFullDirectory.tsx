"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import {
  PHASES,
  REPRESENTATIVES,
  THOUGHT_LABELS,
  PHOTO_FILTER,
  PHOTO_FILTER_HOVER,
  type Staff,
  type Representative,
  type SignatureKey,
} from "@/data/staff";

function StaffCard({ staff, deptEn }: { staff: Staff; deptEn: string }) {
  return (
    <article className="scroll-in group">
      <div className="relative aspect-[4/5] overflow-hidden rounded bg-bg-secondary mb-4">
        <Image
          src={`/images/staff/${staff.id}.webp`}
          alt={`${staff.name} | ${staff.role} | やまと不動産`}
          fill
          className="object-cover transition-[filter] duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          style={{ filter: PHOTO_FILTER }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_FILTER_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_FILTER;
          }}
        />
      </div>

      <p
        className="text-[10px] md:text-[11px] tracking-[0.2em] text-text-secondary mb-2"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {deptEn}
        {staff.career ? <span className="mx-2">·</span> : null}
        {staff.career ? <span>{staff.career}</span> : null}
      </p>

      <h2
        className="text-text-primary text-lg md:text-xl font-light leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {staff.name}
      </h2>

      <p
        className="text-text-secondary text-[11px] tracking-[0.08em] mt-0.5"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {staff.nameEn}
      </p>

      <p className="text-text-secondary text-[12px] md:text-[13px] mt-1">
        {staff.role}
      </p>

      <div className="h-px bg-border my-4" />

      <dl className="space-y-3">
        {(Object.keys(THOUGHT_LABELS) as SignatureKey[]).map((key) => {
          const isSignature = staff.signature === key;
          return (
            <div key={key}>
              <dt
                className={`text-[10px] md:text-[11px] tracking-[0.18em] mb-0.5 ${
                  isSignature ? "text-main" : "text-text-secondary"
                }`}
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                {THOUGHT_LABELS[key]}
                {isSignature ? <span className="ml-1.5 text-main">●</span> : null}
              </dt>
              <dd
                className={`leading-[1.75] ${
                  isSignature
                    ? "text-text-primary text-[14px] md:text-[15px]"
                    : "text-text-secondary text-[13px] md:text-[14px]"
                }`}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: isSignature ? 500 : 400,
                }}
              >
                {staff.thoughts[key]}
              </dd>
            </div>
          );
        })}
      </dl>
    </article>
  );
}

function RepresentativeCard({ rep }: { rep: Representative }) {
  return (
    <article className="scroll-in group">
      <div className="relative aspect-[4/5] overflow-hidden rounded bg-bg-secondary mb-5">
        <Image
          src={`/images/staff/${rep.id}.webp`}
          alt={`${rep.role} ${rep.name} | やまと不動産`}
          fill
          className="object-cover transition-[filter] duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ filter: PHOTO_FILTER }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_FILTER_HOVER;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.filter = PHOTO_FILTER;
          }}
        />
      </div>

      <p
        className="text-[10px] md:text-[11px] tracking-[0.2em] text-text-secondary mb-1"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {rep.roleEn.toUpperCase()}
      </p>

      <p className="text-text-secondary text-[13px] md:text-sm mb-3">
        {rep.role} · 経験 {rep.career}
      </p>

      <h2
        className="text-text-primary text-[clamp(22px,2.4vw,32px)] font-light leading-tight"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {rep.name}
      </h2>

      <p
        className="text-text-secondary text-[11px] md:text-xs tracking-[0.15em] mt-1 mb-5"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {rep.nameEn}
      </p>

      <blockquote
        className="text-text-primary text-[clamp(15px,1.4vw,18px)] leading-[1.95] whitespace-pre-line"
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {rep.quote}
      </blockquote>
    </article>
  );
}

export default function StaffFullDirectory() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <div ref={sectionRef}>
      <div className="mx-auto max-w-[1400px] bg-bg-primary px-[var(--page-px)] py-[var(--section-py)]">
        <div className="space-y-20 md:space-y-28">
          {PHASES.map((phase, phaseIndex) => (
            <div key={phase.num} className="scroll-in">
              <div className="mb-10 md:mb-14 flex items-baseline gap-5 md:gap-6">
                <span
                  className="text-main/40 font-light text-4xl md:text-6xl leading-none shrink-0"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {phase.num}
                </span>
                <span className="flex-1 h-px bg-border" />
                <div className="text-right">
                  <p
                    className="text-main text-[10px] md:text-[11px] tracking-[0.2em] mb-0.5"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    {phase.deptEn}
                  </p>
                  <h3
                    className="text-text-primary text-base md:text-xl font-light"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {phase.title}
                  </h3>
                  <p className="text-text-secondary text-[11px] md:text-xs mt-1">
                    {phase.subtitle}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                {phase.staff.map((s) => (
                  <StaffCard key={s.id} staff={s} deptEn={phase.deptEn} />
                ))}
              </div>

              {phaseIndex < PHASES.length - 1 ? (
                <div className="mt-12 md:mt-16 text-center">
                  <span className="inline-block w-px h-10 md:h-14 bg-border" />
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <div className="mt-28 md:mt-40 pt-16 md:pt-24 border-t border-border">
          <div className="mb-12 md:mb-16 max-w-[640px]">
            <p
              className="font-section-label text-main text-xs md:text-sm tracking-[0.2em] mb-4"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              REPRESENTATIVES
            </p>
            <h3
              className="text-[clamp(22px,2.8vw,32px)] text-text-primary leading-[1.5] font-light"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              そして、この二人で会社を背負っています。
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-[1000px]">
            {REPRESENTATIVES.map((rep) => (
              <RepresentativeCard key={rep.id} rep={rep} />
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-28 pt-10 border-t border-border text-center">
          <p className="text-text-secondary text-sm md:text-base leading-[1.9] max-w-[640px] mx-auto">
            ご契約からお引き渡しまで、そしてその先も。この十九人で、お供いたします。
          </p>
        </div>
      </div>
    </div>
  );
}
