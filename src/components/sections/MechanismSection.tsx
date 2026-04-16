"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import SectionHeaderCentered from "@/components/SectionHeaderCentered";

// 大手とやまとのコスト構造比較（イメージ図）
const OTHERS = [
  { label: "ブランド代・広告費", pct: 35, color: "bg-text-secondary/50" },
  { label: "展示場・モデルハウス維持費", pct: 10, color: "bg-text-secondary/40" },
  { label: "仲介手数料・中間マージン", pct: 10, color: "bg-text-secondary/30" },
  { label: "原価（素材・施工）", pct: 45, color: "bg-text-secondary/70" },
] as const;

const YAMATO = [
  { label: "原価（素材・施工）", pct: 90, color: "bg-main" },
  { label: "自社運営費", pct: 10, color: "bg-main/50" },
] as const;

export default function MechanismSection() {
  const ref = useScrollIn<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-[#FBF8F2] py-[var(--section-py)]">
      {/* 紙面トーン（CONCEPTのダークから“明るい納得”へ切替） */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_20%_-10%,rgba(196,112,63,0.14)_0%,transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(43,43,43,0.02), rgba(43,43,43,0.02) 1px, transparent 1px, transparent 28px)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div
        ref={ref}
        className="relative mx-auto max-w-[1240px] px-[var(--page-px)] scroll-in"
      >
        <SectionHeaderCentered
          label="MECHANISM"
          ghostText="MECHANISM"
          title="安いのではありません。無駄がないだけです。"
          lead="同じ仕様・同じ品質のまま、なぜ価格が変わるのか。結論からお見せします。"
          align="left"
          className="mb-10 md:mb-12"
        />

        {/* 結論（先に“得”を掴ませる） */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-border bg-white/70 p-6 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.18)] md:p-7">
              <p className="text-xs font-semibold tracking-[0.18em] text-text-secondary">
                結論
              </p>
              <p
                className="mt-4 text-[clamp(18px,2.2vw,26px)] font-semibold leading-[1.55] tracking-[0.05em] text-text-primary"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                家そのものの原価を削らずに、
                <br />
                「家に関係ないお金」を削ります。
              </p>

              <div className="mt-6 rounded-xl border border-border/80 bg-bg-secondary/60 px-5 py-4">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-text-secondary">
                  その結果、この差になります
                </p>
                <div className="mt-3 flex items-end justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-text-secondary">
                      参考：大手
                    </p>
                    <p
                      className="mt-1 text-3xl font-semibold tracking-tight text-text-primary md:text-[40px]"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      4,000
                      <span className="ml-1 text-base font-medium text-text-secondary">
                        万円〜
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] font-medium text-text-secondary">
                      やまと不動産
                    </p>
                    <p
                      className="mt-1 text-3xl font-semibold tracking-tight text-main md:text-[44px]"
                      style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                    >
                      2,480
                      <span className="ml-1 text-base font-semibold text-main-dark">
                        万円〜
                      </span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-main/10 px-4 py-3">
                  <span className="text-sm font-semibold text-text-primary">
                    差額
                  </span>
                  <span
                    className="tabular-nums text-lg font-semibold tracking-tight text-text-primary"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    -1,520万円
                  </span>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-[13px] leading-relaxed text-text-secondary">
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-main" />
                  広告費・展示場維持費・中間マージンを最小化
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-main" />
                  “家そのもの”にお金が戻る構造
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-main" />
                  次の章で、証拠（比較表）を提示します
                </li>
              </ul>
            </div>
          </div>

          {/* 図版（編集図解として見せる） */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-border bg-white/60 p-6 shadow-[0_10px_28px_-18px_rgba(0,0,0,0.16)] md:p-7">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.18em] text-text-secondary">
                    図解
                  </p>
                  <p
                    className="mt-2 text-xl font-semibold tracking-[0.05em] text-text-primary md:text-2xl"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    価格の内訳（イメージ）
                  </p>
                </div>
                <p className="text-[12px] text-text-secondary">
                  ※ 構造を伝えるための概念図です
                </p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* 大手 */}
                <div className="rounded-xl border border-border bg-white/70 px-5 py-5">
                  <p className="text-sm font-semibold text-text-primary">
                    大手ハウスメーカー
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {OTHERS.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-[12px] font-medium text-text-secondary">
                            {item.label}
                          </span>
                          <span
                            className="tabular-nums text-[12px] font-semibold text-text-primary"
                            style={{
                              fontFamily: "var(--font-inter), Inter, sans-serif",
                            }}
                          >
                            {item.pct}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-border/70">
                          <div
                            className={`h-full ${item.color}`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* やまと */}
                <div className="rounded-xl border border-main/25 bg-main/10 px-5 py-5">
                  <p className="text-sm font-semibold text-text-primary">
                    やまと不動産
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {YAMATO.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-baseline justify-between gap-4">
                          <span className="text-[12px] font-semibold text-text-primary">
                            {item.label}
                          </span>
                          <span
                            className="tabular-nums text-[12px] font-semibold text-text-primary"
                            style={{
                              fontFamily: "var(--font-inter), Inter, sans-serif",
                            }}
                          >
                            {item.pct}%
                          </span>
                        </div>
                        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-main/15">
                          <div
                            className={`h-full ${item.color}`}
                            style={{ width: `${item.pct}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-xl border border-border bg-bg-secondary/60 px-5 py-4">
                <p
                  className="text-[clamp(16px,1.6vw,20px)] font-semibold tracking-[0.06em] text-text-primary"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  “家の質”ではなく、“家に関係ないコスト”が削れている。
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] leading-relaxed text-text-secondary">
            次の <span className="font-semibold text-text-primary">COMPARISON</span>{" "}
            では、同じ仕様での比較を「証拠」として提示します。
          </p>
          <a
            href="#comparison"
            className="inline-flex items-center gap-2 text-sm font-semibold text-main underline decoration-main/30 underline-offset-4 hover:text-main-dark hover:decoration-main"
          >
            比較へ進む
            <span aria-hidden className="text-base leading-none">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
