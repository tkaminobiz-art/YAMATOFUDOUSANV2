"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import { CITY_ACCESS, type CityAccess } from "@/data/cityAccess";

/*
  AccessFromCities — 2026-04-30 v2 (ビジュアル刷新)
  ---------------------------------------------------------------
  v1: 一覧表(各市町村×大阪/京都所要時間)。専務指摘「一覧が大きくて見づらい」
  v2 方針:
   - 地図セクションの "下" に配置(地図で場所→ここで距離感、の流れ)
   - 上段: SVG概念図(大阪 ━ やまとエリア ━ 京都 の3点軸)
   - 下段: 横バーチャート(時間に比例した長さで直感的に距離感を伝える)
   - テーブル一覧は廃止
*/

type Props = {
  cities: string[];
};

const FOREST = "#486B00";
const LIME = "#A2C523";
const MUTED = "#9A8978";

// バーチャートの最大値(分)。これを超えると幅100%。
const BAR_MAX = 75;

function timeToBarWidth(minutes: number): number {
  return Math.min((minutes / BAR_MAX) * 100, 100);
}

function timeColor(minutes: number): string {
  // 30分以内=ライム / 60分以内=フォレスト / それ以上=マッド
  if (minutes <= 30) return LIME;
  if (minutes <= 60) return FOREST;
  return MUTED;
}

// ─────────────────────────────────────────────
// SVG概念図 — 大阪 ━ やまとエリア ━ 京都
// ─────────────────────────────────────────────

function ConceptMap({ list }: { list: CityAccess[] }) {
  // 各市町村を中央エリアに均等配置
  // Desktop: 横並び / Mobile: コンパクト3点だけ
  const NODE_AREA_X1 = 280; // 中央エリア左端
  const NODE_AREA_X2 = 920; // 中央エリア右端
  const CENTER_Y = 130;

  const nodes = list.map((access, i) => {
    const t = list.length === 1 ? 0.5 : i / (list.length - 1);
    const x = NODE_AREA_X1 + (NODE_AREA_X2 - NODE_AREA_X1) * t;
    return { access, x, y: CENTER_Y };
  });

  return (
    <div className="relative w-full overflow-hidden">
      <svg
        viewBox="0 0 1200 280"
        className="w-full h-auto"
        role="img"
        aria-label="大阪・京都とやまとの分譲エリアの距離感"
      >
        {/* 背景帯 — やまとエリア(中央) */}
        <rect
          x={NODE_AREA_X1 - 30}
          y={CENTER_Y - 35}
          width={NODE_AREA_X2 - NODE_AREA_X1 + 60}
          height={70}
          rx={4}
          fill={LIME}
          opacity={0.12}
        />

        {/* 大阪エリア(左) */}
        <g>
          <circle cx={120} cy={CENTER_Y} r={48} fill={FOREST} opacity={0.92} />
          <text
            x={120}
            y={CENTER_Y - 4}
            textAnchor="middle"
            fill="#fff"
            fontSize={22}
            fontWeight={700}
            fontFamily="var(--font-sans)"
          >
            大阪
          </text>
          <text
            x={120}
            y={CENTER_Y + 18}
            textAnchor="middle"
            fill="#fff"
            fontSize={11}
            fontFamily="var(--font-sans)"
            opacity={0.85}
          >
            難波 / 天王寺 / 上本町
          </text>
        </g>

        {/* 京都エリア(右) */}
        <g>
          <circle cx={1080} cy={CENTER_Y} r={48} fill={FOREST} opacity={0.92} />
          <text
            x={1080}
            y={CENTER_Y - 4}
            textAnchor="middle"
            fill="#fff"
            fontSize={22}
            fontWeight={700}
            fontFamily="var(--font-sans)"
          >
            京都
          </text>
          <text
            x={1080}
            y={CENTER_Y + 18}
            textAnchor="middle"
            fill="#fff"
            fontSize={11}
            fontFamily="var(--font-sans)"
            opacity={0.85}
          >
            京都駅
          </text>
        </g>

        {/* 中央ラベル */}
        <text
          x={(NODE_AREA_X1 + NODE_AREA_X2) / 2}
          y={CENTER_Y - 50}
          textAnchor="middle"
          fill={FOREST}
          fontSize={13}
          fontWeight={700}
          fontFamily="var(--font-sans)"
          letterSpacing="0.12em"
        >
          やまと不動産の分譲エリア
        </text>

        {/* 各市町村ノード */}
        {nodes.map(({ access, x, y }) => (
          <g key={access.city}>
            {/* 大阪との接続線 */}
            <line
              x1={120 + 48}
              y1={y}
              x2={x}
              y2={y}
              stroke={FOREST}
              strokeOpacity={0.18}
              strokeWidth={1}
              strokeDasharray="2 4"
            />
            {/* 京都との接続線 */}
            <line
              x1={x}
              y1={y}
              x2={1080 - 48}
              y2={y}
              stroke={FOREST}
              strokeOpacity={0.18}
              strokeWidth={1}
              strokeDasharray="2 4"
            />
            {/* ピン */}
            <circle
              cx={x}
              cy={y}
              r={6}
              fill={LIME}
              stroke={FOREST}
              strokeWidth={1.5}
            />
            {/* 市町村名(ピンの上下交互) */}
            <text
              x={x}
              y={y - 14}
              textAnchor="middle"
              fill={FOREST}
              fontSize={11}
              fontWeight={600}
              fontFamily="var(--font-sans)"
            >
              {access.city}
            </text>
            {/* 大阪までの分(ピンの下) */}
            {access.toOsaka && (
              <text
                x={x}
                y={y + 24}
                textAnchor="middle"
                fill="#666"
                fontSize={10}
                fontFamily="var(--font-sans)"
              >
                ←{access.toOsaka.minutes}分 / {access.toKyoto?.minutes ?? "—"}分→
              </text>
            )}
          </g>
        ))}

        {/* 注記 */}
        <text
          x={600}
          y={250}
          textAnchor="middle"
          fill="#999"
          fontSize={10}
          fontFamily="var(--font-sans)"
        >
          ※ 各市町村の代表駅から、平日昼間・最短ルートでの目安(乗換含む概算)
        </text>
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// 横バーチャート — 各市町村の所要時間を視覚化
// ─────────────────────────────────────────────

function TimeBars({ list }: { list: CityAccess[] }) {
  return (
    <div className="space-y-3">
      {/* 凡例 + 軸 */}
      <div className="grid grid-cols-[100px_1fr_100px_1fr] md:grid-cols-[140px_1fr_140px_1fr] gap-2 md:gap-3 text-[10px] md:text-[11px] text-text-secondary tracking-[0.04em] mb-1">
        <span></span>
        <div className="relative">
          <span className="absolute left-0">大阪まで</span>
          <span className="absolute right-0 text-text-secondary/60">75分</span>
        </div>
        <span></span>
        <div className="relative">
          <span className="absolute left-0">京都まで</span>
          <span className="absolute right-0 text-text-secondary/60">75分</span>
        </div>
      </div>

      {list.map((access) => (
        <div
          key={access.city}
          className="grid grid-cols-[100px_1fr_100px_1fr] md:grid-cols-[140px_1fr_140px_1fr] gap-2 md:gap-3 items-center"
        >
          {/* 市町村ラベル */}
          <div>
            <p className="text-text-primary text-[12px] md:text-[13px] font-medium leading-tight">
              {access.city}
            </p>
            <p className="text-text-secondary text-[9px] md:text-[10px] leading-tight mt-0.5">
              {access.representativeStation}駅
            </p>
          </div>

          {/* 大阪までバー */}
          <div className="relative h-7 md:h-8 bg-bg-secondary/60 overflow-hidden rounded-sm">
            {access.toOsaka && (
              <>
                <div
                  className="absolute inset-y-0 left-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: `${timeToBarWidth(access.toOsaka.minutes)}%`,
                    background: timeColor(access.toOsaka.minutes),
                  }}
                />
                <span
                  className="relative h-full flex items-center px-2 md:px-3 text-[10px] md:text-[11px] font-medium tabular-nums"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    color:
                      access.toOsaka.minutes <= 60 ? "#1A2600" : "#fff",
                  }}
                >
                  {access.toOsaka.minutes}
                  <span className="text-[9px] md:text-[10px] ml-0.5 font-sans font-normal opacity-90">
                    分
                  </span>
                  <span className="ml-2 text-[9px] md:text-[10px] font-sans font-normal opacity-70">
                    {access.toOsaka.station}
                  </span>
                </span>
              </>
            )}
          </div>

          {/* 余白 → 京都ラベル空セル */}
          <div></div>

          {/* 京都までバー */}
          <div className="relative h-7 md:h-8 bg-bg-secondary/60 overflow-hidden rounded-sm">
            {access.toKyoto && (
              <>
                <div
                  className="absolute inset-y-0 left-0 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    width: `${timeToBarWidth(access.toKyoto.minutes)}%`,
                    background: timeColor(access.toKyoto.minutes),
                  }}
                />
                <span
                  className="relative h-full flex items-center px-2 md:px-3 text-[10px] md:text-[11px] font-medium tabular-nums"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    color:
                      access.toKyoto.minutes <= 60 ? "#1A2600" : "#fff",
                  }}
                >
                  {access.toKyoto.minutes}
                  <span className="text-[9px] md:text-[10px] ml-0.5 font-sans font-normal opacity-90">
                    分
                  </span>
                  <span className="ml-2 text-[9px] md:text-[10px] font-sans font-normal opacity-70">
                    {access.toKyoto.station}
                  </span>
                </span>
              </>
            )}
          </div>
        </div>
      ))}

      {/* バー色凡例 */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-3 text-[10px] md:text-[11px]">
        <span className="text-text-secondary">所要時間の目安</span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: LIME }}
          />
          <span className="text-text-secondary">30分以内</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: FOREST }}
          />
          <span className="text-text-secondary">60分以内</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block w-3 h-3 rounded-sm"
            style={{ background: MUTED }}
          />
          <span className="text-text-secondary">60分超</span>
        </span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// 本体
// ─────────────────────────────────────────────

export default function AccessFromCities({ cities }: Props) {
  const ref = useScrollIn<HTMLDivElement>();

  const list = cities
    .map((c) => CITY_ACCESS[c])
    .filter((a): a is CityAccess => Boolean(a));

  if (list.length === 0) return null;

  return (
    <section className="py-[clamp(48px,6vw,100px)] bg-bg-primary border-b border-border">
      <div
        ref={ref}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <div className="mb-8 md:mb-10">
          <p className="font-section-label text-lime-deep text-xs md:text-sm mb-2 tracking-[0.18em]">
            ACCESS FROM
          </p>
          <h2 className="text-text-primary text-[clamp(20px,2.4vw,30px)] leading-[1.4] mb-3">
            大阪・京都からの、距離感。
          </h2>
          <p className="text-text-secondary text-[13px] md:text-sm leading-[1.9] max-w-[640px]">
            大阪へも京都へも、思っている以上に近い。各市町村の代表駅から、両都心までの目安時間です。
          </p>
        </div>

        {/* Desktop: SVG概念図 */}
        <div className="hidden md:block bg-bg-secondary/40 rounded-lg p-4 md:p-6 mb-6">
          <ConceptMap list={list} />
        </div>

        {/* バーチャート(全デバイス) */}
        <div className="bg-bg-secondary/40 rounded-lg p-4 md:p-6">
          <TimeBars list={list} />
        </div>

        <p className="text-text-secondary text-[10px] md:text-[11px] mt-4 leading-[1.7]">
          ※ 平日昼間・最短ルート（乗換含む概算）。時間帯やダイヤにより前後します。
        </p>
      </div>
    </section>
  );
}
