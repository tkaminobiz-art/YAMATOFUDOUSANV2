"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import { Shield, Bug, Wrench, Phone, ShieldCheck } from "lucide-react";

/*
  GuaranteeSection — 2026-04-15 Phase 2D 強化
  瑕疵担保責任保険（国交省指定の第三者機関による10年保証）を最上位に追加。
  法律で義務付けられた保険だが、明記することで安心感が増す。

  構成：
  - メイン：瑕疵担保責任保険（幅広）
  - サブ：地盤20年 / しろあり10年 / 定期点検5回 / 電話一本

  [要確認] 第三者機関の具体名（ハウスジーメン or 建築テクノ等）は専務確認
*/

const GUARANTEES = [
  {
    icon: Shield,
    num: "20",
    unit: "年",
    title: "地盤保証",
    desc: "地盤調査から保証まで、第三者機関が実施いたします。万一、地盤が沈むようなことがあっても、二十年、お守りいたします。",
  },
  {
    icon: Bug,
    num: "10",
    unit: "年",
    title: "しろあり保証",
    desc: "お引き渡し後、十年のしろあり保証。以降も、有料延長で続けていただけます。",
  },
  {
    icon: Wrench,
    num: "5",
    unit: "回",
    title: "定期点検",
    desc: "お引き渡し後、半年、一年、二年、五年、十年のタイミングで、自社スタッフがお伺いいたします。",
  },
  {
    icon: Phone,
    num: "1",
    unit: "本",
    title: "お電話ひとつで、すぐ対応",
    desc: "お建てしたあとも、ご不具合もご相談も、お電話ひとつで、担当がお伺いいたします。",
  },
] as const;

export default function GuaranteeSection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section className="bg-bg-secondary py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <div className="mb-10 md:mb-14 max-w-[640px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            GUARANTEE
          </p>
          <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
            お建てしたあとの安心まで、お値段に含まれております。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
            お家は、建てて終わりではございません。十年、二十年と住み続けるお家だからこそ、保証とアフターは、手厚く。
          </p>
        </div>

        {/* ===== メイン：瑕疵担保責任保険（幅広カード） ===== */}
        <div className="scroll-in bg-bg-primary rounded-lg p-[clamp(28px,3.5vw,48px)] card-shadow mb-[var(--card-gap)] border-l-4 border-main">
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-center">
            {/* 左：アイコン + 数字 */}
            <div className="flex items-baseline gap-2">
              <ShieldCheck
                className="w-8 h-8 text-main shrink-0"
                strokeWidth={1.5}
              />
              <div className="flex items-baseline gap-1">
                <span
                  className="text-main font-light text-6xl md:text-7xl leading-none"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  10
                </span>
                <span className="text-text-primary text-lg md:text-xl">年</span>
              </div>
            </div>

            {/* 右：タイトル + 説明 */}
            <div>
              <div className="flex items-baseline gap-2 flex-wrap mb-2">
                <h3
                  className="text-text-primary text-lg md:text-xl font-medium"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  建物瑕疵担保責任保険
                </h3>
                <span className="text-accent text-[11px] font-medium tracking-wider">
                  国交省指定・第三者機関
                </span>
              </div>
              <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
                万一の構造不具合や、雨水の浸入に対して、十年間の保証をご用意しております。国土交通大臣指定の第三者機関が引き継ぐ、法定の保険でございます。万が一、当社がなくなりましても、保証は続きます。
              </p>
            </div>
          </div>
        </div>

        {/* ===== サブ：4つの保証 ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--card-gap)]">
          {GUARANTEES.map((g) => (
            <div
              key={g.title}
              className="scroll-in bg-bg-primary rounded-lg p-[var(--card-p)] card-shadow"
            >
              <g.icon
                className="w-6 h-6 text-main mb-4"
                strokeWidth={1.5}
              />
              <div className="flex items-baseline gap-1 mb-2">
                <span
                  className="text-main font-light text-5xl md:text-6xl leading-none"
                  style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                >
                  {g.num}
                </span>
                <span className="text-text-primary text-base md:text-lg">
                  {g.unit}
                </span>
              </div>
              <h3
                className="text-text-primary font-medium text-base mb-2"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {g.title}
              </h3>
              <p className="text-text-secondary text-xs leading-relaxed">
                {g.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
