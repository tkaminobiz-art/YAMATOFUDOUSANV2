"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { MessageCircle, Calendar } from "lucide-react";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/*
  モバイルフッター固定CTA
  2026-05-05: LINE主導線化に合わせて 3ボタン → 2ボタン (LINE / 見学予約) へ。
  2026-05-09 conversion-sales-rulebook §4 準拠:
    LINE 文言「LINEで相談」→「LINEで総額診断」に変更。
    rulebook「LINE が primary の場合も CTA は具体的な answer を約束する。
    曖昧な『相談』にしない」(§4 末尾) に従い、押した先で何が得られるかを明示。
*/
export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="font-murecho fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/95 backdrop-blur-md border-t border-border py-2 px-[var(--page-px)] md:hidden">
      <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
        <a
          href={LINE_ADD_FRIEND_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 min-h-[48px] flex-1 rounded text-white transition-all duration-300 hover:scale-[1.02]"
          style={{ backgroundColor: "#06C755" }}
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
          <span className="text-[12px] font-bold tracking-[0.04em]">LINEで総額診断</span>
        </a>
        <Link
          href="/reserve"
          className="group relative flex items-center justify-center gap-1.5 min-h-[48px] flex-1 rounded overflow-hidden bg-lime text-lime-darker border-b-[2px] border-lime-hover transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-hover hover:shadow-[0_8px_20px_-4px_rgba(162,197,35,0.5)]"
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
          />
          <Calendar className="relative w-4 h-4" strokeWidth={1.75} />
          <span className="relative text-[12px] font-bold tracking-[0.04em]">見学予約</span>
        </Link>
      </div>
    </div>
  );
}
