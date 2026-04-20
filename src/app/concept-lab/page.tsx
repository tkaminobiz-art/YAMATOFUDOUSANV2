"use client";

import { useState } from "react";
import HeroMagazine from "@/components/sections/HeroMagazine";
import {
  FONT_VARIANTS,
  BODY_VARIANTS,
} from "@/components/sections/HeroMagazine.fonts";
import ConceptSection from "@/components/sections/ConceptSection";
import MechanismSection from "@/components/sections/MechanismSection";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import PriceSection from "@/components/sections/PriceSection";
import MechanismEnhanced from "@/components/concept-lab/MechanismEnhanced";
import ZeroTeaser from "@/components/concept-lab/ZeroTeaser";
import WhyYamato from "@/components/concept-lab/WhyYamato";

/*
  /concept-lab — Concept→Pricing 区間の圧縮案 比較用ラボ
  納品時削除。
  Plan A(現状) / Plan B(Concept削除+Mechanism主役+Zero teaser) / Plan C(統合 WhyYamato)
*/

const HERO_VARIANT = FONT_VARIANTS.find((v) => v.id === "shippori") ?? FONT_VARIANTS[0];
const HERO_BODY = BODY_VARIANTS.find((v) => v.id === "industrial-bold") ?? BODY_VARIANTS[0];

type PlanKey = "current" | "b" | "c";

const PLAN_INFO: Record<PlanKey, { label: string; description: string; sections: number; lines: string }> = {
  current: {
    label: "Plan A. 現状(4セクション)",
    description: "Concept + Mechanism + Zero(8項目) + Price",
    sections: 4,
    lines: "1,233行",
  },
  b: {
    label: "Plan B. Mechanism主役(3セクション)",
    description: "Concept削除→Mechanism統合 + Zero teaser(3項目) + Price",
    sections: 3,
    lines: "≈ 530行",
  },
  c: {
    label: "Plan C. 統合 WhyYamato(2セクション)",
    description: "Concept+Mechanism+Zero teaser を1セクションに統合 + Price",
    sections: 2,
    lines: "≈ 700行",
  },
};

export default function ConceptLabPage() {
  const [plan, setPlan] = useState<PlanKey>("b");

  return (
    <main>
      {/* ===== タブバー(固定) ===== */}
      <div className="sticky top-0 z-[100] bg-black/85 backdrop-blur-md border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className="text-white/45 text-[10px] tracking-[0.18em] uppercase mr-2"
              style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
            >
              Concept Lab
            </span>
            {(Object.keys(PLAN_INFO) as PlanKey[]).map((p) => {
              const info = PLAN_INFO[p];
              const active = p === plan;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPlan(p)}
                  className={`px-3 py-1.5 text-[11px] md:text-xs rounded transition-colors ${
                    active
                      ? "bg-white text-black"
                      : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
                  }`}
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {info.label}
                </button>
              );
            })}
          </div>
          <p className="text-white/55 text-[11px] md:text-xs">
            <span className="text-white/80">{PLAN_INFO[plan].description}</span>
            <span className="mx-2 text-white/30">·</span>
            <span>{PLAN_INFO[plan].sections} セクション</span>
            <span className="mx-2 text-white/30">·</span>
            <span>{PLAN_INFO[plan].lines}</span>
          </p>
        </div>
      </div>

      {/* ===== Hero(全プラン共通・コンテキスト用) ===== */}
      <HeroMagazine variant={HERO_VARIANT} bodyVariant={HERO_BODY} />

      {/* ===== Plan ごとのコンテンツ ===== */}
      {plan === "current" && (
        <>
          <ConceptSection />
          <MechanismSection />
          <ZeroDeclaration />
          <PriceSection />
        </>
      )}

      {plan === "b" && (
        <>
          <MechanismEnhanced />
          <ZeroTeaser />
          <PriceSection />
        </>
      )}

      {plan === "c" && (
        <>
          <WhyYamato />
          <PriceSection />
        </>
      )}

      {/* ===== 下方説明 ===== */}
      <section className="bg-bg-primary py-16 md:py-24 px-[var(--page-px)]">
        <div className="max-w-[760px] mx-auto">
          <p className="text-text-secondary text-xs tracking-[0.15em] uppercase mb-3">
            Selected Plan
          </p>
          <p className="text-text-primary text-base md:text-lg leading-[1.9] mb-2 font-medium">
            {PLAN_INFO[plan].label}
          </p>
          <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
            {PLAN_INFO[plan].description}
          </p>
          <p className="text-text-secondary text-xs mt-4">
            ※ Plan B/C で「8つのゼロ宣言を全て見る →」のリンクは未設置(/zero ページは未作成)。本決定後に作成します。
          </p>
        </div>
      </section>
    </main>
  );
}
