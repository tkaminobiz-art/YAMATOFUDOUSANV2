"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * S11.client — FAQ アコーディオン（M15）。
 *
 * S11.tsx（サーバー・props 無し）から呼ばれる client 子コンポーネント。
 * - <button aria-expanded aria-controls> ＋ 回答 role="region" aria-labelledby。
 * - 展開は grid-template-rows 0fr→1fr（300ms / ease-out）＋chevron rotate(0→180deg)。
 * - 最小タップ高 48px・focus-visible 2px リング。色だけで状態を伝えない（chevron 回転＋aria）。
 * - prefers-reduced-motion で transition を無効化（末尾 styled-jsx）。
 * - sign-red の点はリスク/疑念の記号（§3.3 二分・点のみ・赤文字は使わない）。
 */

export type FaqItem = {
  id: string;
  question: string;
  answer: string[];
  defaultOpen?: boolean;
};

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  // 最重要1問（defaultOpen）を初期 open。無ければ全閉。
  const initial = items.find((it) => it.defaultOpen)?.id ?? null;
  const [openId, setOpenId] = useState<string | null>(initial);

  return (
    <ul className="faq-list divide-y divide-[color:var(--color-border)] border-y border-[color:var(--color-border)]">
      {items.map((item) => (
        <FaqRow
          key={item.id}
          item={item}
          open={openId === item.id}
          onToggle={() =>
            setOpenId((cur) => (cur === item.id ? null : item.id))
          }
        />
      ))}

      <style jsx>{`
        .faq-panel {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 300ms ease-out;
        }
        .faq-panel[data-open="true"] {
          grid-template-rows: 1fr;
        }
        .faq-panel > .faq-panel-inner {
          overflow: hidden;
        }
        .faq-chevron {
          transition: transform 300ms ease-out;
        }
        .faq-chevron[data-open="true"] {
          transform: rotate(180deg);
        }
        @media (prefers-reduced-motion: reduce) {
          .faq-panel,
          .faq-chevron {
            transition: none;
          }
        }
      `}</style>
    </ul>
  );
}

function FaqRow({
  item,
  open,
  onToggle,
}: {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
}) {
  const uid = useId();
  const panelId = `${item.id}-panel-${uid}`;
  const btnId = `${item.id}-btn-${uid}`;

  return (
    <li>
      <h3 className="m-0">
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex min-h-[48px] w-full items-center gap-4 py-5 text-left transition-colors duration-200 hover:bg-lime-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
        >
          {/* sign-red 点＝残存疑念の記号（色だけに頼らず chevron/aria でも状態提示） */}
          <span
            aria-hidden="true"
            className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-risk"
          />
          <span className="t-h3 flex-1 text-[clamp(1.0625rem,2.2vw,1.25rem)] leading-[1.55] text-ink">
            {item.question}
          </span>
          <ChevronDown
            aria-hidden="true"
            data-open={open}
            className="faq-chevron h-5 w-5 shrink-0 text-main"
          />
        </button>
      </h3>

      <div className="faq-panel" data-open={open}>
        <div className="faq-panel-inner">
          <div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            className="pb-7 pl-6"
          >
            {item.answer.map((para, i) => (
              <p
                key={i}
                className={`t-body max-w-prose text-ink-muted ${i > 0 ? "mt-3.5" : ""}`}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </li>
  );
}
