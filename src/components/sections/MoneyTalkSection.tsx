"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import { Calculator, Link2Off, HeartHandshake } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";

/*
  お金の相談セクション
  2026-04-15 神野さんの方針：
  - 数字で脅かさない（月々◯万円の硬いシミュレーションは前面に出さない）
  - FP相談・つなぎ融資なし・「きっと建てられる」の3本柱
  - 「気軽に相談して」のハードル下げが決定打

  配置：Price（料金目安）の直後。
  「価格 → じゃあ払えるか → お金の相談で受け止める」という流れ。

  ファクトチェック（2026-04-15 神野さん確認済み）:
  - ファイナンシャルプランナー → 提携している（外部FPと連携）
  - 「つなぎ融資がない」→ 通常は土地購入資金を先行で借りるため、建物完成までの
    「つなぎ融資」（金利高め・手数料10万円〜・印紙代）が必要。
    やまとは土地も建物も自社で扱うため、そのコストが発生しない。
  - 「きっと建てられます」→ 宣伝文句として使用（具体事例での裏付けはなし）
*/

const PILLARS = [
  {
    icon: HeartHandshake,
    title: "提携のファイナンシャルプランナーに相談できます",
    body: "ご家族の収入・支出・将来設計を踏まえて、無理のない予算を一緒に考えます。",
  },
  {
    icon: Link2Off,
    title: "つなぎ融資は、ありません",
    body: "通常は土地先行の購入時に「つなぎ融資」が発生（金利高め・手数料10万円〜）。当社なら、そのコストがかかりません。",
  },
  {
    icon: Calculator,
    title: "年収・家族構成に応じた、現実的な計画",
    body: "月々の支払いが暮らしを圧迫しないよう、一緒に設計します。",
  },
] as const;

export default function MoneyTalkSection() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="bg-bg-warm py-[var(--section-py)]">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ヘッダー */}
        <div className="mb-12 md:mb-16 max-w-[760px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
            MONEY TALK
          </p>
          <h2
            className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-5 leading-[1.5]"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            お金の話、まず気軽に。
          </h2>
          <p className="text-text-primary text-[clamp(16px,1.3vw,20px)] leading-relaxed mb-2">
            「払っていけるかな」「ローン通るかな」。
          </p>
          <p className="text-text-secondary text-[clamp(14px,1vw,16px)] leading-relaxed">
            その不安、一緒に整理しましょう。やまとには、お金の相談窓口があります。
          </p>
        </div>

        {/* 3つの柱 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[var(--card-gap)] mb-14 md:mb-20">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="scroll-in bg-bg-primary rounded-lg p-[clamp(24px,3vw,36px)] card-shadow"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-main/10 text-main mb-5">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3
                  className="text-text-primary text-base md:text-lg mb-3 leading-[1.5] font-medium"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {p.title}
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-[1.9]">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* 「きっと建てられる」メッセージ */}
        <div className="max-w-[800px] mx-auto text-center mb-10 md:mb-14">
          <blockquote
            className="text-text-primary text-[clamp(20px,2.5vw,30px)] leading-[1.6] mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            大手で諦めかけた方こそ、一度ご相談ください。
            <br />
            やまとなら、建てられる道がきっとあります。
          </blockquote>
          <p className="text-text-secondary text-xs md:text-sm">
            ご相談・事前審査は無料です。気になることがあれば、何でもお聞かせください。
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex">
            <CtaButton
              href="/reserve"
              variant="primary"
              size="md"
              label="お金の相談を予約する"
              sublabel="ご相談・事前審査はすべて無料です"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
