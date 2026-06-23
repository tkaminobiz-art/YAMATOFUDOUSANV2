import type { ReactNode } from "react";

/**
 * Architectural Line: 一貫構造プロセス図（土地→分譲地→設計→施工→販売 + 3バッジ）
 * 埋没していた文章3項を線画プロセスに翻訳。深緑ヘアライン・実寸固定・塗りなし。
 */

const S = { green: "#195842", ink: "#181714", rust: "#8a5232", line: "rgba(24,23,20,0.16)" };

const ico = {
  strokeWidth: 1.5,
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

function Pin() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...ico}>
      <path d="M12 21s6.5-5.2 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.8 12 21 12 21z" />
      <circle cx="12" cy="10.3" r="2.3" />
    </svg>
  );
}
function Plots() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...ico}>
      <rect x="4" y="6" width="16" height="12" rx="1" />
      <path d="M12 6v12M4 12h16" />
    </svg>
  );
}
function Ruler() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...ico}>
      <rect x="3" y="9" width="18" height="6" rx="1" />
      <path d="M7 9v2.5M11 9v2.5M15 9v2.5M19 9v2.5" />
    </svg>
  );
}
function Frame() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...ico}>
      <path d="M4 11l8-5.5 8 5.5" />
      <path d="M6 11v8h12v-8M12 11v8" />
    </svg>
  );
}
function KeyI() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" {...ico}>
      <circle cx="8.5" cy="12" r="4" />
      <path d="M12.5 12H21M17.5 12v3.5M20.5 12v2.5" />
    </svg>
  );
}

const STEPS: { label: string; icon: ReactNode }[] = [
  { label: "土地探し", icon: <Pin /> },
  { label: "自社分譲地", icon: <Plots /> },
  { label: "設計", icon: <Ruler /> },
  { label: "施工", icon: <Frame /> },
  { label: "販売", icon: <KeyI /> },
];

const BADGES = ["つなぎ融資は発生しない", "展示場の維持費を乗せない", "仲介マージンなし"];

export default function ProcessFlow() {
  return (
    <figure className="my-12 md:my-14" aria-label="当社の一貫構造：土地探しから販売まで自社でつなぐ">
      <div className="flex items-start" style={{ color: S.green }}>
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex flex-1 items-start">
            <div className="flex flex-1 flex-col items-center text-center">
              <span
                className="flex h-[58px] w-[58px] items-center justify-center rounded-full md:h-[68px] md:w-[68px]"
                style={{ border: `1.25px solid ${S.green}`, backgroundColor: "rgba(25,88,66,0.05)" }}
              >
                {s.icon}
              </span>
              <span
                className="mt-3 text-[12px] font-medium tracking-[0.04em] md:text-[13px]"
                style={{ fontFamily: "var(--font-shippori)", color: S.ink }}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <span
                aria-hidden
                className="mx-1 mt-[28px] h-px flex-1 self-start md:mt-[33px]"
                style={{
                  background: `linear-gradient(to right, ${S.green} 60%, transparent 0)`,
                  backgroundSize: "8px 1px",
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-9 flex flex-wrap justify-center gap-2.5">
        {BADGES.map((b) => (
          <span
            key={b}
            className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[12px] font-bold"
            style={{ border: `1px solid ${S.line}`, color: S.ink }}
          >
            <span style={{ color: S.rust }}>—</span>
            {b}
          </span>
        ))}
      </div>
    </figure>
  );
}
