"use client";

import { useEffect, useRef, useState } from "react";
import Eyebrow from "../_shared/Eyebrow";
import SectionShell from "../_shared/SectionShell";
import { costCompareRows } from "../_data";

/**
 * S10 — 後から増えない｜要確認費用（FAQ戦場・前半）。
 *
 * 契約: `export default function S10(): JSX.Element`（props 無し・サーバー既定）。
 * row reveal のためファイル全体を 'use client'（default export は props 無しのまま）。
 * surface=base（§3.3 明・記事化）。役割=③信頼。最大の恐怖（後出し費用）を先回り（rulebook Rule5）。
 *
 * 主役（フレームワーク §S S10）:
 *  - t-h3（費用名）＋ t-body。契約前に同じ表で確認する費用一覧（costCompareRows 6件）。
 *  - 不都合開示を「注記」から「主役級」へ格上げ＝各行に sign-red-soft の警告面を独立配置し、
 *    結論（answer）を視線停止点として太く据える。
 *  - sign-red は「点／面」のみ・文字色には使わない（赤文字が要る場合は text-risk-dark）。
 *
 * モーション: row reveal（Y+20→0 / 760ms / IO once / reduced-motion 即時）。叫ばない。CTA なし。
 * 断定OKはこの2つだけ（憲法例外）: 地盤改良費「一切かかりません」/ つなぎ融資「原則発生しません」。
 * 下層: /money#costs。
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

/* ── 要確認費用の一覧（CostDisclosure）──
   行ごとに：費用名（t-h3）／一般的には＝sign-red-soft の警告面（不都合開示を主役級へ）／
   やまとは＝結論（answer）を太く＋根拠（reason）。
   sign-red は警告面（bg-risk-soft）と点（リスト点）でのみ使い、赤文字は text-risk-dark に限定。 */
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
        <span
          aria-hidden
          className="t-eyebrow text-ink-muted/70 tabular-nums"
        >
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

export default function S10() {
  return (
    <SectionShell id="costs" surface="base" aria-label="あとから増えない費用">
      <header className="max-w-3xl">
        <Eyebrow>Costs to Check</Eyebrow>
        <h2 className="t-h2 text-ink">
          あとから増えない費用。
          <br className="hidden sm:block" />
          やまとはこうしています。
        </h2>
        <p className="t-body mt-6 text-ink-muted">
          家づくりで不安になりやすいのは、契約のあとに見えてくる費用です。
          あとから出やすい項目を先にすべて表に出し、含まれるものと別途必要なものを、
          契約の前にお見せします。注記ではなく、主役として確認していただく一覧です。
        </p>
      </header>

      <ul className="mt-12 flex flex-col gap-4">
        {costCompareRows.map((row, i) => (
          <CostDisclosureRow key={row.label} row={row} index={i} />
        ))}
      </ul>

      <div className="mt-10 flex flex-col gap-4 border-t border-[color:var(--color-border)] pt-8 sm:flex-row sm:items-start sm:justify-between">
        <p className="t-body max-w-2xl text-ink-muted">
          地盤改良費は、自社分譲地なら地盤を整えてからお渡しするためかかりません。つなぎ融資も原則、発生しません。
          そのほかの項目も、ご一緒に一枚の表で整えてからご契約に進みます。
        </p>
        <a
          href="/money#costs"
          className="t-eyebrow inline-flex items-center gap-2 self-start text-main underline decoration-from-font underline-offset-4 transition-opacity hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-main"
        >
          費用の内訳を見る
          <span aria-hidden>→</span>
        </a>
      </div>
    </SectionShell>
  );
}
