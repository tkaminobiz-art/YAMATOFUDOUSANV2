"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useScrollIn } from "@/hooks/useScrollIn";
import { ArrowRight } from "lucide-react";

/*
  MiniSimulator — 2026-05-03 (TOP用簡易シミュレーター・参考画像準拠)
  ---------------------------------------------------------------
  3項目入力(坪数 × エリア × グレード)で概算建築費を即時表示。
  詳細シミュレーションは /money(LoanSimulator)に誘導。

  能動的な体験 = "自分ごと化" の一発。受動的な「読む」TOPから抜け出すための仕掛け。
  /money の本格版とは別物として、ここはシンプル・即時応答に振る。
*/

const FOREST = "#486B00";
const ACCENT = "#A2C523";

// 坪単価の基準値(万円/坪)
// シリーズ毎: 京=76万/坪, 風=82万/坪, 花=90万/坪 — 30坪で京2,280, 風2,460, 花2,700 想定
const TSUBO_RATES = {
  standard: 76, // 京モデル相当
  premium: 82, // 風モデル相当
  luxury: 90, // 花モデル相当
} as const;

const AREA_FACTOR: Record<string, number> = {
  奈良市: 1.0,
  大和郡山市: 1.0,
  生駒市: 1.02,
  橿原市: 1.0,
  天理市: 0.98,
  京田辺市: 1.04,
  京都市: 1.06,
  木津川市: 1.0,
};

type Grade = keyof typeof TSUBO_RATES;

const SIZE_OPTIONS = [25, 28, 30, 33, 36, 40] as const;

export default function MiniSimulator() {
  const ref = useScrollIn<HTMLDivElement>();
  const [tsubo, setTsubo] = useState<number>(30);
  const [area, setArea] = useState<string>("奈良市");
  const [grade, setGrade] = useState<Grade>("standard");

  const result = useMemo(() => {
    const baseRate = TSUBO_RATES[grade];
    const factor = AREA_FACTOR[area] ?? 1.0;
    const total = Math.round(tsubo * baseRate * factor);
    return total;
  }, [tsubo, area, grade]);

  return (
    <section
      ref={ref}
      className="bg-white py-[var(--section-py)] border-y border-border scroll-in"
    >
      <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 items-start">
          {/* 左: コピー */}
          <div>
            <p
              className="text-[10px] md:text-[11px] tracking-[0.22em] uppercase mb-3"
              style={{ color: FOREST, fontWeight: 600 }}
            >
              Simulation · かんたん試算
            </p>
            <h2
              className="text-text-primary leading-[1.3] tracking-[0.005em]"
              style={{
                fontWeight: 500,
                fontSize: "clamp(22px, 2.6vw, 36px)",
              }}
            >
              あなたの条件で、
              <br className="hidden md:block" />
              費用をシミュレーション。
            </h2>
            <p className="mt-5 text-text-secondary text-[clamp(13px,1vw,15px)] leading-[1.95] max-w-[480px]">
              ご希望の条件を入力すると、おおよその建築費が分かります。月々の返済目安や、土地込みの総予算は <Link href="/money" className="text-main hover:underline">資金計画ページ</Link> で詳しくご相談ください。
            </p>

            <Link
              href="/money"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-[13px] md:text-[14px] font-medium rounded transition-opacity hover:opacity-90"
              style={{ background: FOREST, color: "#fff" }}
            >
              詳しい資金計画を見る
              <ArrowRight className="w-4 h-4" strokeWidth={1.6} />
            </Link>
          </div>

          {/* 右: シミュレーター */}
          <div className="bg-bg-secondary/40 border border-border rounded-lg p-6 md:p-8 lg:p-10">
            <p
              className="text-[11px] md:text-[12px] tracking-[0.16em] uppercase mb-6"
              style={{ color: FOREST, fontWeight: 600 }}
            >
              参考プランでのシミュレーション例
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8">
              {/* 坪数 */}
              <div>
                <label
                  htmlFor="sim-tsubo"
                  className="block text-text-secondary text-[11px] md:text-[12px] mb-2"
                >
                  延床面積
                </label>
                <select
                  id="sim-tsubo"
                  value={tsubo}
                  onChange={(e) => setTsubo(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-white border border-border rounded text-text-primary text-[14px] focus:outline-none focus:border-main"
                >
                  {SIZE_OPTIONS.map((n) => (
                    <option key={n} value={n}>
                      {n}坪
                    </option>
                  ))}
                </select>
              </div>

              {/* エリア */}
              <div>
                <label
                  htmlFor="sim-area"
                  className="block text-text-secondary text-[11px] md:text-[12px] mb-2"
                >
                  施工エリア
                </label>
                <select
                  id="sim-area"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-border rounded text-text-primary text-[14px] focus:outline-none focus:border-main"
                >
                  {Object.keys(AREA_FACTOR).map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
              </div>

              {/* グレード */}
              <div>
                <label
                  htmlFor="sim-grade"
                  className="block text-text-secondary text-[11px] md:text-[12px] mb-2"
                >
                  シリーズ
                </label>
                <select
                  id="sim-grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value as Grade)}
                  className="w-full px-3 py-2.5 bg-white border border-border rounded text-text-primary text-[14px] focus:outline-none focus:border-main"
                >
                  <option value="standard">京 (スタンダード)</option>
                  <option value="premium">風 (プレミアム)</option>
                  <option value="luxury">花 (ラグジュアリー)</option>
                </select>
              </div>
            </div>

            {/* 結果 */}
            <div
              className="rounded p-5 md:p-6 border-2"
              style={{
                background: "rgba(162, 197, 35, 0.10)",
                borderColor: ACCENT,
              }}
            >
              <p
                className="text-[10px] md:text-[11px] tracking-[0.16em] uppercase mb-2"
                style={{ color: FOREST, fontWeight: 600 }}
              >
                概算建築費
              </p>
              <div className="flex items-baseline gap-2">
                <span
                  className="tabular-nums leading-none"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontWeight: 300,
                    fontSize: "clamp(48px, 6.5vw, 96px)",
                    color: FOREST,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {result.toLocaleString()}
                </span>
                <span
                  className="text-text-primary text-[16px] md:text-[18px] font-medium"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  万円〜
                </span>
              </div>
              <p className="text-text-secondary text-[11px] md:text-[12px] mt-3 leading-[1.85]">
                ※ 建物本体価格の目安です。土地代・付帯工事費・諸費用は別途。プラン・敷地条件により変動します。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
