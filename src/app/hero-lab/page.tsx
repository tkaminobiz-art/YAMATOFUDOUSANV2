"use client";

import { useState } from "react";
import HeroMagazine, {
  FONT_VARIANTS,
  type HeroFontVariant,
} from "@/components/sections/HeroMagazine";

// 納品前に削除する検証用ページ(本番 page.tsx からは独立)
export default function HeroLabPage() {
  const [variant, setVariant] = useState<HeroFontVariant>(FONT_VARIANTS[0]);

  return (
    <main>
      {/* === タブバー(固定) === */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-2.5">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-white/50 text-[10px] tracking-[0.18em] uppercase mr-2 shrink-0"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Hero Lab — Font
            </span>
            {FONT_VARIANTS.map((v) => {
              const active = v.id === variant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1.5 text-[11px] md:text-xs rounded transition-colors ${
                    active
                      ? "bg-white text-black"
                      : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {v.label}
                </button>
              );
            })}
            <span className="hidden md:inline text-white/40 text-[11px] ml-2 italic">
              {variant.description}
            </span>
          </div>
        </div>
      </div>

      <HeroMagazine variant={variant} />

      {/* 下方セクション */}
      <section className="bg-bg-primary py-24 md:py-40 px-[var(--page-px)]">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-text-secondary text-xs tracking-[0.15em] uppercase mb-4">
            Scroll Test
          </p>
          <p className="text-text-primary text-base md:text-lg leading-[1.9]">
            選択中: <strong>{variant.label}</strong>
            <br />
            <span className="text-text-secondary text-sm">{variant.description}</span>
          </p>
        </div>
      </section>
    </main>
  );
}
