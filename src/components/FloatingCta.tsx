"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, MessageCircle, Calendar } from "lucide-react";

/*
  モバイルフッター固定CTA
  3分割ピル型・色で役割を分ける（電話=黒/LINE=緑/予約=黒系solid）
  Headerと同様にPrimaryは黒系で統一しつつ、LINEだけブランド色を残す
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
          className="group relative flex flex-col items-center justify-center gap-0.5 min-h-[48px] flex-1 rounded overflow-hidden bg-text-primary text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
        >
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-[700ms] ease-out group-hover:translate-x-full"
          />
          <Calendar className="relative w-4 h-4" strokeWidth={1.5} />
          <span className="relative text-[10px] font-medium">来場予約</span>
        </Link>
      </div>
    </div>
  );
}
