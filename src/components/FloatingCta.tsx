"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";

/*
  モバイルフッター固定CTA
  3分割ピル型・色で役割を分ける（電話=黒線/LINE=LINE緑/予約=Lime）
  2026-04-24 design-critic: 予約を黒系→Limeに昇格。スクロール中常時Limeが視界に入り、
  サイトの呼吸がLimeに戻る
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/95 backdrop-blur-md border-t border-border py-2 px-[var(--page-px)] md:hidden">
      <div className="flex items-center justify-center gap-2 max-w-md mx-auto">
        <a
          href="tel:0742361123"
          className="group flex flex-col items-center justify-center gap-0.5 min-h-[48px] flex-1 rounded border border-border bg-bg-primary text-text-primary transition-colors duration-300 hover:bg-text-primary hover:text-white hover:border-text-primary"
        >
          <Phone className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">電話</span>
        </a>
        <a
          href="https://line.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[48px] flex-1 rounded text-white transition-all duration-300 hover:scale-[1.02]"
          style={{ backgroundColor: "#06C755" }}
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-[10px] font-medium">LINE</span>
        </a>
        <Link
          href="/reserve"
          className="group relative flex flex-col items-center justify-center gap-0.5 min-h-[48px] flex-1 rounded overflow-hidden bg-lime text-lime-darker border-b-[2px] border-lime-hover transition-all duration-300 hover:-translate-y-0.5 hover:bg-lime-hover hover:shadow-[0_8px_20px_-4px_rgba(162,197,35,0.5)]"
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
          />
          <Calendar className="relative w-4 h-4" strokeWidth={1.75} />
          <span className="relative text-[10px] font-bold">来場予約</span>
        </Link>
      </div>
    </div>
  );
}
