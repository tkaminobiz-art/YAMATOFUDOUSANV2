"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/* 02 価格のしくみ：比較バー。
   家の本体は同じ高さ。大手はその上に赤い無駄が乗って“総額が高くなる”。下揃えで差を見せる。
   モーションは JS(IntersectionObserver)で時間制御＝順番を全ブラウザで揃える:
     1) ビュー入りで 家の本体(両方)が下から立ち上がる（720ms）
     2) 少し遅れて 大手の赤い無駄が横に伸びる
     3) ライムが完成した瞬間に やまとの総額がフェードインで出る（約880ms後）
   画面外へ完全に出るとリセットし、再入場で最初から再生する（毎回見られる）。
   prefers-reduced-motion: reduce では即・完成状態（モーションなし）。 */

const WASTE = ["広告費", "展示場の維持費", "中間マージン"] as const;
const HATCH: CSSProperties = {
  backgroundImage:
    "repeating-linear-gradient(45deg, var(--color-signal) 0, var(--color-signal) 1px, transparent 1px, transparent 9px)",
};
const VARS = {
  "--cb-house": "clamp(150px,26vw,188px)",
  "--cb-waste": "clamp(92px,16vw,116px)",
} as CSSProperties;
const EASE = "cubic-bezier(0.22,1,0.36,1)";
const HOUSE_MS = 720;
const PRICE_DELAY = 880;

export default function CostBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      setActive(true);
      setShowPrice(true);
      return;
    }
    let timer = 0;
    const playing = { current: false };
    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.intersectionRatio >= 0.45 && !playing.current) {
          // 45%以上見えたら再生（入場のたびに最初から）
          playing.current = true;
          setActive(true);
          if (timer) clearTimeout(timer);
          timer = window.setTimeout(() => setShowPrice(true), PRICE_DELAY);
        } else if (!e.isIntersecting && playing.current) {
          // 完全に画面外へ出たらリセット → 再入場で再び立ち上がる
          playing.current = false;
          setActive(false);
          setShowPrice(false);
          if (timer) {
            clearTimeout(timer);
            timer = 0;
          }
        }
      },
      { threshold: [0, 0.45] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  const houseStyle: CSSProperties = {
    height: "var(--cb-house)",
    clipPath: active ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
    transition: reduce ? "none" : `clip-path ${HOUSE_MS}ms ${EASE}`,
    willChange: "clip-path",
  };
  const wasteStyle: CSSProperties = {
    ...HATCH,
    transformOrigin: "left center",
    transform: active ? "scaleX(1)" : "scaleX(0)",
    transition: reduce ? "none" : `transform 480ms ${EASE} 340ms`,
    willChange: "transform",
  };
  const priceStyle: CSSProperties = {
    opacity: showPrice ? 1 : 0,
    transform: showPrice ? "translateY(0)" : "translateY(10px)",
    transition: reduce ? "none" : `opacity 560ms ease, transform 560ms ${EASE}`,
  };

  const houseLabel = <span className="text-[12px] font-bold text-noir">家の本体・標準仕様</span>;

  return (
    <div ref={ref}>
      <div className="flex items-end gap-5 md:gap-12" style={VARS}>
        {/* 一般的な大手：家の本体 ＋ 赤い無駄（高い） */}
        <figure className="m-0 flex-1">
          <div className="flex flex-col border border-noir" style={{ height: "calc(var(--cb-house) + var(--cb-waste))" }}>
            <div className="flex flex-col" style={{ height: "var(--cb-waste)" }}>
              {WASTE.map((w, i) => (
                <div
                  key={w}
                  className={`relative flex flex-1 items-center px-2 ${i < WASTE.length - 1 ? "border-b border-paper" : ""}`}
                >
                  <span className="absolute inset-0" style={wasteStyle} aria-hidden />
                  <span className="font-mono relative bg-paper px-1 text-[10px] text-noir">{w}</span>
                </div>
              ))}
            </div>
            <div className="flex items-end border-t-2 border-noir bg-hair px-2 pb-2" style={houseStyle}>
              {houseLabel}
            </div>
          </div>
          <figcaption className="mt-3 flex items-baseline gap-2">
            <span className="text-[13px] font-bold text-noir">一般的な大手</span>
            <span className="font-mono text-[10px] text-signal">家＋無駄</span>
          </figcaption>
        </figure>

        {/* やまと：家の本体だけ（低い＝総額が下がる）。本体をライムで“正の色”に */}
        <figure className="m-0 flex-1">
          <div className="relative flex flex-col border border-noir" style={{ height: "var(--cb-house)" }}>
            {/* バー上部の空き（＝大手の無駄ゾーンと同じ高さ）に総額をフェードイン＝ライム完成の瞬間 */}
            <div
              className="pointer-events-none absolute bottom-full left-0 right-0 flex items-end justify-center pb-3"
              style={{ height: "var(--cb-waste)" }}
            >
              <span className="flex flex-col items-center" style={priceStyle}>
                <span className="font-mono text-[10px] tracking-[0.08em] text-slate">総額・京モデル</span>
                <span className="mt-1 flex items-baseline gap-1 whitespace-nowrap text-noir">
                  <span className="num-tnum font-oswald text-[clamp(34px,6.4vw,66px)] font-semibold leading-[0.82]">2,280</span>
                  <span className="font-mono text-[13px] font-bold">万円〜</span>
                </span>
              </span>
            </div>
            <div className="flex items-end bg-lime px-2 pb-2" style={houseStyle}>
              {houseLabel}
            </div>
          </div>
          <figcaption className="mt-3 flex items-baseline gap-2">
            <span className="text-[13px] font-bold text-noir">やまと</span>
            <span className="font-mono text-[10px] text-slate">家だけ</span>
          </figcaption>
        </figure>
      </div>
      <p className="font-mono mt-4 text-[10px] leading-[1.7] text-slate">
        家の本体は同じ。<span className="text-signal">赤い部分が、やまとには乗りません</span>。その分、完成までの費用が下がります。（金額は当社試算・参考値）
      </p>
    </div>
  );
}
