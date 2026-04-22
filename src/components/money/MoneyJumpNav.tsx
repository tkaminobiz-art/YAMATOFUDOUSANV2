"use client";

import { useEffect, useState } from "react";

/*
  MoneyJumpNav — /money 章間ジャンプナビ(sticky)
  - 5章の主要セクションへ即移動
  - 現在位置をハイライト(IntersectionObserver)
  - Headerの下に貼り付き(top-14: 縮小Header高 56px)
*/

const CHAPTERS = [
  { id: "ch-breakdown", label: "総額", num: "01" },
  { id: "ch-monthly", label: "月々", num: "02" },
  { id: "ch-vs", label: "賃貸 vs 持家", num: "03" },
  { id: "ch-loan", label: "ローン", num: "04" },
  { id: "ch-fp", label: "FP", num: "06" },
  { id: "ch-flow", label: "ご相談", num: "07" },
] as const;

export default function MoneyJumpNav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <nav
      aria-label="資金計画ページの章ナビ"
      className="sticky top-14 z-30 bg-bg-primary/92 backdrop-blur-md border-b border-text-primary/10"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        <ul className="flex gap-1 md:gap-2 overflow-x-auto py-3 md:py-4 -mx-1 md:-mx-2 px-1 md:px-2 scrollbar-none">
          {CHAPTERS.map((c) => {
            const isActive = active === c.id;
            return (
              <li key={c.id} className="shrink-0">
                <a
                  href={`#${c.id}`}
                  className={`group inline-flex items-baseline gap-2 px-3 md:px-4 py-2 border transition-colors duration-300 ${
                    isActive
                      ? "border-text-primary bg-text-primary text-white"
                      : "border-text-primary/15 text-text-secondary hover:border-text-primary/40 hover:text-text-primary"
                  }`}
                >
                  <span
                    className={`font-oswald tabular-nums text-[11px] md:text-xs tracking-[0.06em] ${
                      isActive ? "text-white/70" : "text-text-secondary/60"
                    }`}
                    style={{ fontWeight: 400 }}
                  >
                    {c.num}
                  </span>
                  <span className="text-[12px] md:text-[13px] font-medium tracking-[0.04em] whitespace-nowrap">
                    {c.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
