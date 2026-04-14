"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import { Shield, Bug, Wrench, Phone } from "lucide-react";

const GUARANTEES = [
  {
    icon: Shield,
    num: "20",
    unit: "年",
    title: "地盤保証",
    desc: "地盤調査から保証まで第三者機関が実施。万一の不同沈下にも20年対応。",
  },
  {
    icon: Bug,
    num: "10",
    unit: "年",
    title: "しろあり保証",
    desc: "引き渡し後10年のしろあり保証。以降も有料延長で継続可能。",
  },
  {
    icon: Wrench,
    num: "5",
    unit: "回",
    title: "定期点検",
    desc: "引き渡し後、半年・1年・2年・5年・10年のタイミングで自社点検に伺います。",
  },
  {
    icon: Phone,
    num: "1",
    unit: "本",
    title: "電話一本で駆けつけ",
    desc: "建てた後も、不具合や相談はお電話一本で担当が駆けつけます。",
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
            建てた後の、安心まで含めた価格です。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
            家は建てて終わりではありません。10年・20年と住み続ける家だからこそ、保証とアフターは手厚く。
          </p>
        </div>

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
