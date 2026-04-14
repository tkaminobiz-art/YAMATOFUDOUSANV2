"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Calendar } from "lucide-react";

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-bg-primary/95 backdrop-blur-sm border-t border-border py-2 px-[var(--page-px)] md:hidden">
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto">
        <a
          href="tel:0742361123"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[44px] flex-1 rounded bg-bg-secondary py-2 text-text-primary transition-colors"
        >
          <Phone className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-[10px]">電話</span>
        </a>
        <a
          href="https://line.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[44px] flex-1 rounded py-2 text-white transition-colors"
          style={{ backgroundColor: "#06C755" }}
        >
          <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-[10px]">LINE</span>
        </a>
        <a
          href="/reserve"
          className="flex flex-col items-center justify-center gap-0.5 min-h-[44px] flex-1 rounded bg-accent py-2 text-white transition-colors"
        >
          <Calendar className="w-4 h-4" strokeWidth={1.5} />
          <span className="text-[10px]">来店予約</span>
        </a>
      </div>
    </div>
  );
}
