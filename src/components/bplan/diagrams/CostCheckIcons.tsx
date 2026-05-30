import type { ReactNode } from "react";

/**
 * Architectural Line: 「あとから出てくる金額」を線画アイコン＋要確認タグに翻訳。
 * 6項目を文字グリッドからアイコンセットへ。赤は要確認タグのみ（過剰断定しない＝"かからない"と断定はしない）。
 */
const S = { green: "#195842", ink: "#181714", red: "#ea4b2a", line: "rgba(24,23,20,0.16)", mute: "#716b61" };
const ico = {
  strokeWidth: 1.5, fill: "none", stroke: "currentColor",
  strokeLinecap: "round" as const, strokeLinejoin: "round" as const, vectorEffect: "non-scaling-stroke" as const,
};
const I = (p: ReactNode) => (
  <svg viewBox="0 0 24 24" width="28" height="28" {...ico}>{p}</svg>
);

const ITEMS: { label: string; icon: ReactNode }[] = [
  { label: "つなぎ融資", icon: I(<><circle cx="12" cy="12" r="8" /><path d="M9 9l3 3 3-3M12 12v4M9.5 13.6h5M9.5 15.6h5" /></>) },
  { label: "小運搬費", icon: I(<><rect x="3" y="7" width="11" height="8" rx="1" /><path d="M14 9.5h3.5L21 13v2h-7" /><circle cx="7" cy="17" r="1.6" /><circle cx="17.5" cy="17" r="1.6" /></>) },
  { label: "職人駐車場代", icon: I(<><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 17V8h3.6a2.6 2.6 0 0 1 0 5.2H9" /></>) },
  { label: "地盤改良費", icon: I(<><path d="M3 8c4-2 6 2 9 0s5-2 9 0M3 13c4-2 6 2 9 0s5-2 9 0M4 18h16" /></>) },
  { label: "打合せ追加", icon: I(<><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M4 9.5h16M8 3v4M16 3v4M12 13v4M10 15h4" /></>) },
  { label: "標準との差額", icon: I(<><path d="M12 4v15M6 19h12M5 8h14M5 8l-2.2 4.6a3 3 0 0 0 4.4 0zM19 8l-2.2 4.6a3 3 0 0 0 4.4 0z" /></>) },
];

export default function CostCheckIcons() {
  return (
    <div className="grid grid-cols-2 gap-px border md:grid-cols-3" style={{ borderColor: S.line, backgroundColor: S.line }} aria-label="あとから出てくる金額の要確認項目">
      {ITEMS.map((it) => (
        <div key={it.label} className="flex flex-col gap-3 bg-[#fffdfa] p-5">
          <div className="flex items-center justify-between">
            <span style={{ color: S.green }}>{it.icon}</span>
            <span
              className="text-[10px] font-bold tracking-[0.12em]"
              style={{ color: S.red, border: `1px solid ${S.red}`, borderRadius: 2, padding: "2px 6px", fontFamily: "var(--font-inter)" }}
            >
              要確認
            </span>
          </div>
          <p className="text-[14px] font-bold" style={{ color: S.ink }}>{it.label}</p>
        </div>
      ))}
    </div>
  );
}
