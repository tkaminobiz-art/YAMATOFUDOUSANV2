"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, GraduationCap, ShoppingCart, Footprints, ChevronDown } from "lucide-react";
import type { Lot } from "@/data/lots";
import {
  CITY_ACCESS,
  inferLifestyleTags,
  extractWalkMinutes,
} from "@/data/cityAccess";

/*
  LotsBrowser — 2026-04-30
  ---------------------------------------------------------------
  小林専務(2026-04-28)+ 神野(2026-04-30):
  「価格・徒歩・学校・スーパー」のフィルターで一画面検討を可能にする。
  デフォルトソート = 価格の安い順(やまとの "まず安いと思わせたい" 戦略)。

  価格データは段階整備中。未投入の物件はソート時に最下部・表示は "お問い合わせ"。
  学校・スーパーは Overpass API 自動取得(直線距離 80m/min 換算の目安)。
  個別の正確な学区は教育委員会に要確認 → UI下部に注記。
*/

type WalkFilter = "all" | "5" | "10" | "15";
type PriceFilter = "all" | "0-500" | "500-1000" | "1000-2000" | "2000+";
type SortOrder = "price-asc" | "price-desc" | "walk-asc";

const WALK_OPTIONS: Array<{ id: WalkFilter; label: string; max: number | null }> = [
  { id: "all", label: "すべて", max: null },
  { id: "5", label: "5分以内", max: 5 },
  { id: "10", label: "10分以内", max: 10 },
  { id: "15", label: "15分以内", max: 15 },
];

const PRICE_OPTIONS: Array<{
  id: PriceFilter;
  label: string;
  min: number | null;
  max: number | null;
}> = [
  { id: "all", label: "すべて", min: null, max: null },
  { id: "0-500", label: "〜500万", min: 0, max: 500 },
  { id: "500-1000", label: "500-1000万", min: 500, max: 1000 },
  { id: "1000-2000", label: "1000-2000万", min: 1000, max: 2000 },
  { id: "2000+", label: "2000万〜", min: 2000, max: null },
];

const SORT_OPTIONS: Array<{ id: SortOrder; label: string }> = [
  { id: "price-asc", label: "安い順" },
  { id: "price-desc", label: "高い順" },
  { id: "walk-asc", label: "駅近い順" },
];

// ─────────────────────────────────────────────
// アコーディオン式フィルターチップ群(モバイル対応)
// ─────────────────────────────────────────────

function FilterChips<T extends string>({
  label,
  options,
  selected,
  onChange,
}: {
  label: ReactNode;
  options: Array<{ id: T; label: string }>;
  selected: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="text-[10px] tracking-[0.12em] text-text-secondary font-bold">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={`px-2.5 py-1 text-[11px] md:text-[12px] rounded-full border transition-colors ${
              selected === o.id
                ? "bg-main text-white border-main"
                : "bg-bg-primary text-text-primary border-border hover:border-main"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// "ここに住むと" 1行コメント生成
// ─────────────────────────────────────────────
// 暮らしの実感に近い1行を、最寄り施設データから自動生成する。
// 過剰な感情断定(「楽になります」等)は避け、距離の事実+生活シーンに留める。
// 学校 > スーパー > 駅 の優先順(/lotsの主ターゲットが子育て世帯のため)。

function lifestyleComment(lot: Lot, stationWalk: number | null): string | null {
  const ps = lot.amenities?.primarySchool;
  const sm = lot.amenities?.supermarket;

  if (ps && ps.walkMin <= 5) {
    return `小学校徒歩${ps.walkMin}分。朝の通学を、玄関先から見守りやすい区画です。`;
  }
  if (sm && sm.walkMin <= 5) {
    return `スーパー徒歩${sm.walkMin}分。日々のお買い物が、ご近所感覚で済みます。`;
  }
  if (ps && ps.walkMin <= 10) {
    return `小学校徒歩${ps.walkMin}分。徒歩通学が無理なく続く距離です。`;
  }
  if (sm && sm.walkMin <= 10) {
    return `スーパー徒歩${sm.walkMin}分。仕事帰りのお買い物がしやすい立地です。`;
  }
  if (stationWalk !== null && stationWalk <= 5) {
    return `駅まで徒歩${stationWalk}分。朝のご通勤が無理なく続けやすい立地です。`;
  }
  if (stationWalk !== null && stationWalk <= 10) {
    return `駅まで徒歩${stationWalk}分。電車通勤が現実的な距離です。`;
  }
  return null;
}

// ─────────────────────────────────────────────
// 物件カード
// ─────────────────────────────────────────────

function LotCard({
  lot,
  rank,
}: {
  lot: Lot;
  /** 安い順表示時の上位3カードに最安バッジを出す */
  rank?: number;
}) {
  const tags = inferLifestyleTags(lot.city, lot.fields["交通"]);
  const walk = extractWalkMinutes(lot.fields["交通"]);
  const access = CITY_ACCESS[lot.city];
  const showCheapBadge = rank !== undefined && rank < 3 && lot.price;
  const lifestyle = lifestyleComment(lot, walk);

  return (
    <Link
      href={`/lots/${lot.id}`}
      className="group block bg-bg-primary rounded-lg overflow-hidden card-shadow transition-all hover:-translate-y-1 flex flex-col"
    >
      <div className="relative aspect-[4/3] bg-bg-secondary overflow-hidden">
        {lot.photos[0] ? (
          <Image
            src={lot.photos[0]}
            alt={lot.title}
            fill
            className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-text-secondary">
            <MapPin className="w-8 h-8" strokeWidth={1.5} />
          </div>
        )}
        {showCheapBadge && (
          <div className="absolute top-3 left-3 bg-lime text-lime-darker text-[11px] font-bold tracking-wider rounded px-2.5 py-1">
            最安エリア
          </div>
        )}
        {!showCheapBadge && (
          <div className="absolute top-3 left-3 bg-bg-primary/95 backdrop-blur-sm rounded px-2.5 py-1">
            <span className="text-main text-[10px] font-medium tracking-wider">
              {lot.city}
            </span>
          </div>
        )}
        {tags.length > 0 && (
          <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[60%]">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-lime/95 text-lime-darker text-[10px] font-medium tracking-wider rounded px-2 py-0.5 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="p-5 md:p-6 flex flex-col flex-1">
        {showCheapBadge && (
          <span className="text-main text-[10px] font-medium tracking-wider mb-1">
            {lot.city}
          </span>
        )}
        <h2
          className="text-text-primary text-base md:text-lg mb-2 group-hover:text-main transition-colors line-clamp-2"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {lot.title}
        </h2>
        {lot.fields["所在地"] && (
          <p className="text-text-secondary text-xs leading-relaxed mb-2 line-clamp-1">
            {lot.fields["所在地"]}
          </p>
        )}
        {lot.fields["交通"] && (
          <p className="text-text-secondary text-xs leading-relaxed line-clamp-1">
            {lot.fields["交通"]}
          </p>
        )}

        {/* "ここに住むと" 1行コメント — スペック中心の中に暮らしの実感を1点だけ差す */}
        {lifestyle && (
          <p
            className="mt-3 px-3 py-2 rounded text-[12px] leading-[1.65]"
            style={{
              background: "rgba(72,107,0,0.06)",
              color: "#486B00",
              borderLeft: "2px solid #A2C523",
            }}
          >
            <span className="font-bold mr-1">ここに住むと、</span>
            {lifestyle}
          </p>
        )}

        {/* 駅・大阪・京都までの分 */}
        {(walk !== null || access?.toOsaka || access?.toKyoto) && (
          <div className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-border pt-3">
            {walk !== null && (
              <span className="inline-flex items-baseline gap-1 text-text-primary">
                <span className="text-[10px] text-text-secondary tracking-[0.04em]">
                  徒歩
                </span>
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  {walk}
                </span>
                <span className="text-[10px]">分</span>
              </span>
            )}
            {access?.toOsaka && (
              <span className="inline-flex items-baseline gap-1 text-text-primary">
                <span className="text-[10px] text-text-secondary tracking-[0.04em]">
                  大阪
                </span>
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  {access.toOsaka.minutes}
                </span>
                <span className="text-[10px]">分</span>
              </span>
            )}
            {access?.toKyoto && (
              <span className="inline-flex items-baseline gap-1 text-text-primary">
                <span className="text-[10px] text-text-secondary tracking-[0.04em]">
                  京都
                </span>
                <span
                  className="tabular-nums"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontSize: "15px",
                    fontWeight: 500,
                  }}
                >
                  {access.toKyoto.minutes}
                </span>
                <span className="text-[10px]">分</span>
              </span>
            )}
          </div>
        )}

        {/* 学校・スーパー徒歩 */}
        {(lot.amenities?.primarySchool ||
          lot.amenities?.supermarket) && (
          <div className="mt-2 flex flex-col gap-1 text-[11px]">
            {lot.amenities.primarySchool && (
              <span className="inline-flex items-center gap-1.5 text-text-secondary">
                <GraduationCap className="w-3.5 h-3.5" strokeWidth={1.6} />
                <span className="line-clamp-1">
                  {lot.amenities.primarySchool.name}
                </span>
                <span
                  className="tabular-nums text-text-primary ml-auto"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontWeight: 500,
                  }}
                >
                  徒歩{lot.amenities.primarySchool.walkMin}分
                </span>
              </span>
            )}
            {lot.amenities.supermarket && (
              <span className="inline-flex items-center gap-1.5 text-text-secondary">
                <ShoppingCart className="w-3.5 h-3.5" strokeWidth={1.6} />
                <span className="line-clamp-1">
                  {lot.amenities.supermarket.name}
                </span>
                <span
                  className="tabular-nums text-text-primary ml-auto"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontWeight: 500,
                  }}
                >
                  徒歩{lot.amenities.supermarket.walkMin}分
                </span>
              </span>
            )}
          </div>
        )}

        {/* 価格 + 詳細リンク (フッター) */}
        <div className="mt-4 pt-3 border-t border-border flex items-baseline justify-between">
          {lot.price ? (
            <span className="flex items-baseline gap-1 text-text-primary">
              <span
                className="tabular-nums"
                style={{
                  fontFamily: "var(--font-oswald)",
                  fontSize: "26px",
                  fontWeight: 500,
                  color: "var(--color-main)",
                }}
              >
                {lot.price.from.toLocaleString()}
              </span>
              <span className="text-[12px]">万円〜</span>
            </span>
          ) : (
            <span className="text-text-secondary text-[11px]">
              価格はお問い合わせください
            </span>
          )}
          <span className="text-main text-xs font-medium">詳細を見る →</span>
        </div>
      </div>
    </Link>
  );
}

// ─────────────────────────────────────────────
// 本体
// ─────────────────────────────────────────────

export default function LotsBrowser({ lots }: { lots: Lot[] }) {
  const [city, setCity] = useState<string>("all");
  const [walkFilter, setWalkFilter] = useState<WalkFilter>("all");
  const [schoolWalk, setSchoolWalk] = useState<WalkFilter>("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [sort, setSort] = useState<SortOrder>("price-asc");
  const [filterOpen, setFilterOpen] = useState(false);

  const cities = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const l of lots) counts[l.city] = (counts[l.city] || 0) + 1;
    return Object.entries(counts)
      .map(([c, n]) => ({ city: c, count: n }))
      .sort((a, b) => b.count - a.count);
  }, [lots]);

  const filtered = useMemo(() => {
    const walkMax = WALK_OPTIONS.find((o) => o.id === walkFilter)?.max;
    const schoolMax = WALK_OPTIONS.find((o) => o.id === schoolWalk)?.max;
    const priceOpt = PRICE_OPTIONS.find((o) => o.id === priceFilter);

    return lots.filter((lot) => {
      if (city !== "all" && lot.city !== city) return false;

      if (walkMax !== null && walkMax !== undefined) {
        const w = extractWalkMinutes(lot.fields["交通"]);
        if (w === null || w > walkMax) return false;
      }

      if (schoolMax !== null && schoolMax !== undefined) {
        const ps = lot.amenities?.primarySchool;
        if (!ps || ps.walkMin > schoolMax) return false;
      }

      if (priceOpt && priceOpt.min !== null) {
        const p = lot.price;
        if (!p) return false;
        if (priceOpt.min !== null && p.from < priceOpt.min) return false;
        if (priceOpt.max !== null && p.from >= priceOpt.max) return false;
      }

      return true;
    });
  }, [lots, city, walkFilter, schoolWalk, priceFilter]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      if (sort === "price-asc" || sort === "price-desc") {
        const ap = a.price?.from ?? Number.POSITIVE_INFINITY;
        const bp = b.price?.from ?? Number.POSITIVE_INFINITY;
        if (ap === bp) return 0;
        return sort === "price-asc" ? ap - bp : bp - ap;
      }
      if (sort === "walk-asc") {
        const aw = extractWalkMinutes(a.fields["交通"]) ?? 999;
        const bw = extractWalkMinutes(b.fields["交通"]) ?? 999;
        return aw - bw;
      }
      return 0;
    });
    return arr;
  }, [filtered, sort]);

  const activeFilterCount =
    (city !== "all" ? 1 : 0) +
    (walkFilter !== "all" ? 1 : 0) +
    (schoolWalk !== "all" ? 1 : 0) +
    (priceFilter !== "all" ? 1 : 0);

  const reset = () => {
    setCity("all");
    setWalkFilter("all");
    setSchoolWalk("all");
    setPriceFilter("all");
  };

  const cityOptions = useMemo(
    () => [
      { id: "all", label: `すべて (${lots.length})` },
      ...cities.map((c) => ({ id: c.city, label: `${c.city} (${c.count})` })),
    ],
    [cities, lots.length]
  );

  return (
    <div>
      {/* === フィルターバー === */}
      <div className="border-b border-border bg-bg-primary sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)] py-3 md:py-4">
          {/* 上段: トリガー + 結果件数 + ソート */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="inline-flex items-center gap-2 px-3 py-2 border border-border rounded text-[12px] md:text-[13px] hover:border-main transition-colors"
            >
              <span className="font-medium">
                絞り込み
                {activeFilterCount > 0 && (
                  <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 bg-main text-white rounded-full text-[10px]">
                    {activeFilterCount}
                  </span>
                )}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${filterOpen ? "rotate-180" : ""}`}
                strokeWidth={1.6}
              />
            </button>

            <span className="text-text-secondary text-[12px] md:text-[13px] order-3 md:order-2 w-full md:w-auto">
              販売中 {lots.length} 件中 <strong className="text-text-primary tabular-nums">{sorted.length}</strong> 件を表示
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={reset}
                  className="ml-3 text-main hover:underline text-[11px]"
                >
                  リセット
                </button>
              )}
            </span>

            <div className="inline-flex items-center gap-2 order-2 md:order-3">
              <span className="text-text-secondary text-[11px] md:text-[12px] hidden md:inline">
                並び替え
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOrder)}
                className="border border-border rounded px-2 py-1.5 text-[12px] md:text-[13px] bg-bg-primary text-text-primary focus:outline-none focus:border-main"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 下段: 折りたたみフィルター */}
          {filterOpen && (
            <div className="mt-4 pt-4 border-t border-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FilterChips
                label="エリア"
                options={cityOptions}
                selected={city}
                onChange={setCity}
              />
              <FilterChips
                label="価格帯"
                options={PRICE_OPTIONS}
                selected={priceFilter}
                onChange={setPriceFilter}
              />
              <FilterChips
                label={
                  <span className="inline-flex items-center gap-1.5">
                    <Footprints className="w-3 h-3" strokeWidth={1.8} />
                    駅徒歩
                  </span>
                }
                options={WALK_OPTIONS}
                selected={walkFilter}
                onChange={setWalkFilter}
              />
              <FilterChips
                label={
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="w-3 h-3" strokeWidth={1.8} />
                    小学校徒歩
                  </span>
                }
                options={WALK_OPTIONS}
                selected={schoolWalk}
                onChange={setSchoolWalk}
              />
            </div>
          )}
        </div>
      </div>

      {/* === 一覧 === */}
      <section className="py-[var(--section-py)] bg-bg-primary">
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)]">
          {sorted.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-primary text-base mb-3">
                該当する物件がありません。
              </p>
              <button
                type="button"
                onClick={reset}
                className="text-main hover:underline text-sm"
              >
                フィルターをリセット
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--card-gap)]">
              {sorted.map((lot, i) => (
                <LotCard
                  key={lot.id}
                  lot={lot}
                  rank={sort === "price-asc" ? i : undefined}
                />
              ))}
            </div>
          )}

          {/* 注記 */}
          <div className="mt-12 pt-8 border-t border-border max-w-[760px] text-text-secondary text-[11px] md:text-[12px] leading-[1.85] space-y-1.5">
            <p>※ 学校・スーパー等の所要時間は、座標からの直線距離に基づく目安(80m/分)です。実際の徒歩時間は道のりにより前後します。</p>
            <p>※ <strong className="text-text-primary">個別の正確な学区は、転居予定地の市町村教育委員会または当社までお問い合わせください。</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
}
