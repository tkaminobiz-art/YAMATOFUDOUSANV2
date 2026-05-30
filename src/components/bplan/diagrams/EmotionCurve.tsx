/**
 * Architectural Line: 心情カーブ（不安 → 月々がわかる → 納得）
 * 支払い実例セクションの導入に、文章なしで感情の物語を1本の線で示す。
 */
const S = { green: "#195842", ink: "#181714", rust: "#8a5232", mute: "#716b61" };

const POINTS = [
  { label: "不安", sub: "いくら払うのか分からない" },
  { label: "月々がわかる", sub: "土地と建物を合わせて見る" },
  { label: "納得", sub: "自分たちに近い金額で" },
];

export default function EmotionCurve() {
  return (
    <figure className="mx-auto max-w-[820px]" aria-label="不安から納得への心情の変化">
      <svg viewBox="0 0 600 90" className="w-full" style={{ height: "auto", color: S.green }} role="img">
        <path
          d="M14 74 C 150 70, 220 56, 300 46 S 470 22, 586 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {[
          [14, 74],
          [300, 46],
          [586, 14],
        ].map(([cx, cy], i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r="4"
            fill="#f4efe6"
            stroke="currentColor"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <div className="mt-3 flex justify-between">
        {POINTS.map((p, i) => (
          <div
            key={p.label}
            className={i === 0 ? "text-left" : i === POINTS.length - 1 ? "text-right" : "text-center"}
            style={{ flex: "1 1 0" }}
          >
            <p className="text-[13px] font-bold md:text-[15px]" style={{ fontFamily: "var(--font-shippori)", color: i === 2 ? S.green : S.ink }}>
              {p.label}
            </p>
            <p className="mt-1 text-[11px] leading-[1.5]" style={{ color: S.mute }}>{p.sub}</p>
          </div>
        ))}
      </div>
    </figure>
  );
}
