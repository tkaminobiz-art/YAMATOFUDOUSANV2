"use client";

import { useState } from "react";
import HeroMagazine, {
  FONT_VARIANTS,
  BODY_VARIANTS,
  type HeroFontVariant,
  type HeroBodyVariant,
} from "@/components/sections/HeroMagazine";

// 納品前に削除する検証用ページ(本番 page.tsx からは独立)
export default function HeroLabPage() {
  // ユーザー注目: B(Shippori), D(Kaisei)。デフォルトは B
  const [variant, setVariant] = useState<HeroFontVariant>(
    FONT_VARIANTS.find((v) => v.id === "shippori") ?? FONT_VARIANTS[0]
  );
  const [bodyVariant, setBodyVariant] = useState<HeroBodyVariant>(BODY_VARIANTS[0]);

  return (
    <main>
      {/* === タブバー(固定・2段) === */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-2.5 space-y-2">
          {/* 見出しフォント */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-white/45 text-[10px] tracking-[0.18em] uppercase mr-2 shrink-0 w-[110px]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Headline
            </span>
            {FONT_VARIANTS.map((v) => {
              const active = v.id === variant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={`px-3 py-1 text-[11px] md:text-xs rounded transition-colors ${
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
          </div>

          {/* ボディフォント */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-white/45 text-[10px] tracking-[0.18em] uppercase mr-2 shrink-0 w-[110px]"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Body / Number
            </span>
            {BODY_VARIANTS.map((v) => {
              const active = v.id === bodyVariant.id;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => setBodyVariant(v)}
                  className={`px-3 py-1 text-[11px] md:text-xs rounded transition-colors ${
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
          </div>
        </div>
      </div>

      <HeroMagazine variant={variant} bodyVariant={bodyVariant} />

      {/* 下方セクション */}
      <section className="bg-bg-primary py-24 md:py-40 px-[var(--page-px)]">
        <div className="max-w-[1400px] mx-auto space-y-2">
          <p className="text-text-secondary text-xs tracking-[0.15em] uppercase">
            Selected Combination
          </p>
          <p className="text-text-primary text-base md:text-lg leading-[1.9]">
            <strong>Headline:</strong> {variant.label}
            <br />
            <span className="text-text-secondary text-sm">{variant.description}</span>
          </p>
          <p className="text-text-primary text-base md:text-lg leading-[1.9]">
            <strong>Body / Number:</strong> {bodyVariant.label}
            <br />
            <span className="text-text-secondary text-sm">{bodyVariant.description}</span>
          </p>
        </div>
      </section>
    </main>
  );
}
