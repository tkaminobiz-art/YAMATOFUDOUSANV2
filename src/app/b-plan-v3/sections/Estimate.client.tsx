"use client";

import { useEffect, useRef, useState } from "react";
import { costCompareRows } from "../_data";

/**
 * EstimateDisclosure — 新5「明瞭見積もり」の費用開示表（現S10 の CostDisclosure を移植）だけを担う client 子。
 *
 * 現 src/app/b-plan-v3/sections/S10.tsx の CostDisclosureRow / useReveal を無改変ロジックで移植:
 *   行ごとに 費用名（t-h3）／一般的には＝sign-red-soft の警告面（不都合開示を主役級へ）／
 *   やまとは＝結論（answer）を太く＋根拠（reason）。generic table 禁止・役割別・sign-red は面と点のみ。
 * この開示表は Estimate 専管（新10 安さの理由には costCompareRows 開示表を置かない）。
 * モーション: row reveal（Y+20→0 / 760ms / IO once / reduced-motion 即時）。叫ばない。
 */

/* ── reveal: IntersectionObserver で一度だけ可視化（reduced-motion は即時） ── */
function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

function CostDisclosureRow({
  row,
  index,
}: {
  row: { label: string; general: string; answer: string; reason: string };
  index: number;
}) {
  const { ref, shown } = useReveal<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className="grid grid-cols-1 gap-px overflow-hidden rounded-sm border border-[color:var(--color-border)] bg-paper md:grid-cols-[200px_1fr_1fr] md:gap-px md:bg-[color:var(--color-border)]"
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 760ms ease-out, transform 760ms ease-out",
        transitionDelay: `${index * 90}ms`,
      }}
    >
      {/* 費用名（主役 t-h3） */}
      <div className="flex items-center gap-3 bg-paper px-5 py-5 md:px-6">
        <span aria-hidden className="t-eyebrow text-ink-muted/70 tabular-nums">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h3 className="t-h3 text-ink text-[1.08rem] md:text-[1.15rem]">
          {row.label}
        </h3>
      </div>

      {/* 一般的には＝不都合開示を「主役級」に格上げ（sign-red-soft 警告面） */}
      <div className="bg-risk-soft px-5 py-5 md:px-6">
        <p className="t-eyebrow text-risk-dark mb-3 flex items-center gap-2">
          <span
            aria-hidden
            className="inline-block h-2 w-2 shrink-0 rounded-full bg-risk"
          />
          一般的には
        </p>
        <p className="t-body text-ink/80">{row.general}</p>
      </div>

      {/* やまとは＝結論を視線停止点に（answer 太く／reason 補足） */}
      <div className="bg-paper px-5 py-5 md:px-6">
        <p className="t-eyebrow text-main mb-3">やまとは</p>
        <p className="t-h3 text-main text-[1.15rem] leading-snug md:text-[1.25rem]">
          {row.answer}
        </p>
        <p className="t-body mt-2 text-ink-muted">{row.reason}</p>
      </div>
    </li>
  );
}

export default function EstimateDisclosure() {
  return (
    <ul className="mt-12 flex flex-col gap-4">
      {costCompareRows.map((row, i) => (
        <CostDisclosureRow key={row.label} row={row} index={i} />
      ))}
    </ul>
  );
}
