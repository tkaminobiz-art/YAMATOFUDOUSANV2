"use client";

import { useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Check,
  ChevronDown,
  Footprints,
  GraduationCap,
  MapPin,
  SlidersHorizontal,
  ShoppingCart,
  Train,
} from "lucide-react";
import type { Lot } from "@/data/lots";
import {
  CITY_ACCESS,
  extractWalkMinutes,
  inferLifestyleTags,
} from "@/data/cityAccess";

type WalkFilter = "all" | "5" | "10" | "15";
type PriceFilter = "all" | "0-500" | "500-1000" | "1000-2000" | "2000+";
type SortOrder = "featured" | "price-asc" | "price-desc" | "walk-asc";
type IntentFilter = "all" | "station" | "school" | "osaka" | "kyoto" | "last";

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
  { id: "500-1000", label: "500〜1000万", min: 500, max: 1000 },
  { id: "1000-2000", label: "1000〜2000万", min: 1000, max: 2000 },
  { id: "2000+", label: "2000万〜", min: 2000, max: null },
];

const SORT_OPTIONS: Array<{ id: SortOrder; label: string }> = [
  { id: "featured", label: "おすすめ順" },
  { id: "price-asc", label: "価格が低い順" },
  { id: "price-desc", label: "価格が高い順" },
  { id: "walk-asc", label: "駅に近い順" },
];

const INTENT_OPTIONS: Array<{ id: IntentFilter; label: string; short: string }> = [
  { id: "all", label: "すべて", short: "All" },
  { id: "station", label: "駅徒歩10分", short: "駅近" },
  { id: "school", label: "小学校10分", short: "子育て" },
  { id: "osaka", label: "大阪通勤", short: "大阪" },
  { id: "kyoto", label: "京都通勤", short: "京都" },
  { id: "last", label: "最終1区画", short: "希少" },
];

function compactTitle(title: string) {
  return title
    .replace(/～/g, "〜")
    .replace(/おかげ様で.*/, "")
    .replace(/第\d期.*/, "")
    .replace(/残りわずか.*/, "")
    .replace(/最終販売です！！/, "")
    .trim();
}

function hasLastLotSignal(lot: Lot) {
  return /最終|残り1|残り１|1区画|１区画/.test(lot.title);
}

function projectScale(lot: Lot) {
  const raw = lot.fields["総区画数"] || lot.title;
  const match = raw.match(/(\d+|[０-９]+|[一二三四五六七八九十]+)[\s　]*区画/);
  if (!match) return null;
  return match[0].replace(/[０-９]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) - 0xfee0)
  );
}

function getSchoolWalk(lot: Lot) {
  return lot.amenities?.primarySchool?.walkMin ?? null;
}

function getSuperWalk(lot: Lot) {
  return lot.amenities?.supermarket?.walkMin ?? null;
}

function editorialScore(lot: Lot) {
  const walk = extractWalkMinutes(lot.fields["交通"]);
  const school = getSchoolWalk(lot);
  const superWalk = getSuperWalk(lot);
  const access = CITY_ACCESS[lot.city];
  let score = 0;
  if (lot.price) score += Math.max(0, 2200 - lot.price.from) / 40;
  if (walk !== null) score += Math.max(0, 18 - walk) * 4;
  if (school !== null) score += Math.max(0, 15 - school) * 3;
  if (superWalk !== null) score += Math.max(0, 15 - superWalk) * 2;
  if (access?.toOsaka && access.toOsaka.minutes <= 35) score += 18;
  if (access?.toKyoto && access.toKyoto.minutes <= 35) score += 14;
  if (hasLastLotSignal(lot)) score += 10;
  return score;
}

function lifestyleComment(lot: Lot, stationWalk: number | null): string {
  const ps = lot.amenities?.primarySchool;
  const sm = lot.amenities?.supermarket;

  if (ps && ps.walkMin <= 5) return `小学校徒歩${ps.walkMin}分。朝の通学を見守りやすい距離。`;
  if (sm && sm.walkMin <= 5) return `スーパー徒歩${sm.walkMin}分。毎日の買い物が近所で完結。`;
  if (ps && ps.walkMin <= 10) return `小学校徒歩${ps.walkMin}分。徒歩通学が無理なく続く立地。`;
  if (sm && sm.walkMin <= 10) return `スーパー徒歩${sm.walkMin}分。仕事帰りにも寄りやすい距離。`;
  if (stationWalk !== null && stationWalk <= 10) return `駅まで徒歩${stationWalk}分。通勤を現実的に組み立てやすい。`;
  return "土地・建物・資金計画をまとめて相談できる候補地です。";
}

function formatPrice(lot: Lot) {
  if (!lot.price) return "価格相談";
  return `${lot.price.from.toLocaleString()}万円〜`;
}

function osmTile(lat: number, lng: number, zoom = 14) {
  const scale = 2 ** zoom;
  const x = ((lng + 180) / 360) * scale;
  const latRad = (lat * Math.PI) / 180;
  const y =
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) *
    scale;
  const tileX = Math.floor(x);
  const tileY = Math.floor(y);
  const maxTile = scale - 1;

  return {
    tiles: [-1, 0, 1].flatMap((dy) =>
      [-1, 0, 1].map((dx) => {
        const wrappedX = (tileX + dx + scale) % scale;
        const clampedY = Math.max(0, Math.min(maxTile, tileY + dy));
        return {
          key: `${dx}:${dy}`,
          url: `https://tile.openstreetmap.org/${zoom}/${wrappedX}/${clampedY}.png`,
        };
      })
    ),
    xPercent: (((x - tileX + 1) / 3) * 100).toFixed(4),
    yPercent: (((y - tileY + 1) / 3) * 100).toFixed(4),
  };
}

function LocationThumb({ lot, large = false }: { lot: Lot; large?: boolean }) {
  if (!lot.coord) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,#E6E1D6_0%,#D9D4C9_52%,#B5B1A8_100%)] text-[#7B766A]">
        <MapPin className={large ? "h-10 w-10" : "h-8 w-8"} strokeWidth={1.4} />
      </div>
    );
  }

  const tile = osmTile(lot.coord.lat, lot.coord.lng);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#E6E1D6]">
      <div
        aria-label={`${lot.city}の所在地周辺地図`}
        role="img"
        className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-[0.72]"
        style={{ filter: "grayscale(0.2) saturate(0.68) contrast(0.94)" }}
      >
        {tile.tiles.map((mapTile) => (
          <div
            key={mapTile.key}
            className="bg-cover bg-center"
            style={{ backgroundImage: `url(${mapTile.url})` }}
          />
        ))}
      </div>
      <div
        className="absolute h-5 w-5 -translate-x-1/2 -translate-y-full rounded-full bg-[#1F2D14] shadow-[0_8px_20px_rgba(31,29,22,0.24)] ring-4 ring-white/85"
        style={{ left: `${tile.xPercent}%`, top: `${tile.yPercent}%` }}
      >
        <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
        <span className="absolute left-1/2 top-full h-2 w-2 -translate-x-1/2 -translate-y-1 rotate-45 bg-[#1F2D14]" />
      </div>
      <div className="absolute bottom-3 left-3 rounded bg-[#FCFBF7]/92 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.12em] text-[#31461B] backdrop-blur">
        所在地周辺
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/16 via-transparent to-white/10" />
    </div>
  );
}

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
    <div>
      <div className="mb-2 text-[10px] font-semibold tracking-[0.14em] text-[#777267]">
        {label}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            className={`rounded border px-2.5 py-1.5 text-[11px] transition-colors md:text-[12px] ${
              selected === o.id
                ? "border-[#1F2D14] bg-[#1F2D14] text-white"
                : "border-[#D7D2C6] bg-[#FCFBF7] text-[#25251E] hover:border-[#1F2D14]/45"
            }`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 border-t border-[#E2DED3] py-2">
      <span className="shrink-0 text-main">{icon}</span>
      <span className="min-w-0 text-[10px] font-semibold tracking-[0.08em] text-[#777267]">
        {label}
      </span>
      <span className="ml-auto truncate text-[12px] font-semibold text-[#25251E]">
        {value}
      </span>
    </div>
  );
}

function StatusBadges({ lot }: { lot: Lot }) {
  const tags = inferLifestyleTags(lot.city, lot.fields["交通"]);
  const scale = projectScale(lot);
  const badges = [
    hasLastLotSignal(lot) ? "最終1区画" : null,
    scale,
    ...tags.slice(0, 2),
  ].filter(Boolean) as string[];

  return (
    <div className="flex flex-wrap gap-1.5">
      {badges.slice(0, 3).map((badge) => (
        <span
          key={badge}
          className="rounded bg-[#F2F0E8]/95 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-[#31461B] backdrop-blur"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}

function FeaturedLotCard({ lot }: { lot: Lot }) {
  const walk = extractWalkMinutes(lot.fields["交通"]);
  const school = getSchoolWalk(lot);
  const superWalk = getSuperWalk(lot);
  const access = CITY_ACCESS[lot.city];

  return (
    <Link
      href={`/lots/${lot.id}`}
      className="group grid overflow-hidden rounded-[8px] border border-[#D7D2C6] bg-[#FCFBF7] shadow-[0_18px_60px_rgba(31,29,22,0.08)] transition-transform hover:-translate-y-1 lg:grid-cols-[0.96fr_1.04fr]"
    >
      <div className="relative min-h-[280px] overflow-hidden bg-[#E8E3D8]">
        <LocationThumb lot={lot} large />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
        <div className="absolute left-4 top-4">
          <StatusBadges lot={lot} />
        </div>
        <p className="absolute bottom-4 left-4 rounded bg-white/92 px-3 py-2 text-[11px] font-semibold text-[#1F2D14]">
          注目物件
        </p>
      </div>

      <div className="flex flex-col p-6 md:p-8">
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-main">
          {lot.city}
        </p>
        <h2 className="mb-3 text-[clamp(22px,2.4vw,34px)] leading-[1.32] text-[#191A16] [font-family:var(--font-zen-old)]">
          {compactTitle(lot.title)}
        </h2>
        <p className="mb-5 text-[13px] leading-[1.9] text-[#625E53]">
          {lifestyleComment(lot, walk)}
        </p>

        <div className="mb-6 grid grid-cols-2 gap-x-5">
          <Metric
            icon={<Building2 className="h-3.5 w-3.5" strokeWidth={1.7} />}
            label="価格"
            value={formatPrice(lot)}
          />
          <Metric
            icon={<Train className="h-3.5 w-3.5" strokeWidth={1.7} />}
            label="駅徒歩"
            value={walk !== null ? `${walk}分` : "要確認"}
          />
          <Metric
            icon={<GraduationCap className="h-3.5 w-3.5" strokeWidth={1.7} />}
            label="小学校"
            value={school !== null ? `${school}分` : "要確認"}
          />
          <Metric
            icon={<ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.7} />}
            label="買い物"
            value={superWalk !== null ? `${superWalk}分` : "要確認"}
          />
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-[#D7D2C6] pt-5">
          <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-[#4D4B43]">
            {access?.toOsaka && <span>大阪 {access.toOsaka.minutes}分目安</span>}
            {access?.toKyoto && <span>京都 {access.toKyoto.minutes}分目安</span>}
          </div>
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-main">
            詳細を見る
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function LotCard({ lot, rank }: { lot: Lot; rank?: number }) {
  const walk = extractWalkMinutes(lot.fields["交通"]);
  const school = getSchoolWalk(lot);
  const superWalk = getSuperWalk(lot);
  const access = CITY_ACCESS[lot.city];

  return (
    <Link
      href={`/lots/${lot.id}`}
      className="group flex h-full flex-col overflow-hidden rounded-[8px] border border-[#D7D2C6] bg-[#FCFBF7] transition-all hover:-translate-y-1 hover:border-[#1F2D14]/35 hover:shadow-[0_16px_50px_rgba(31,29,22,0.08)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#E8E3D8]">
        <LocationThumb lot={lot} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        <div className="absolute left-3 top-3">
          <StatusBadges lot={lot} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-main">
            {lot.city}
          </p>
          {rank !== undefined && rank < 3 && (
            <span className="rounded bg-[#E8F0C8] px-2 py-1 text-[10px] font-semibold text-[#1F2D14]">
              価格注目
            </span>
          )}
        </div>
        <h2 className="mb-2 line-clamp-2 min-h-[3.2em] text-[17px] leading-[1.6] text-[#191A16] transition-colors group-hover:text-main">
          {compactTitle(lot.title)}
        </h2>
        <p className="mb-4 line-clamp-2 text-[12px] leading-[1.75] text-[#625E53]">
          {lifestyleComment(lot, walk)}
        </p>

        <div className="mb-4 grid grid-cols-2 gap-x-4">
          <Metric
            icon={<Building2 className="h-3.5 w-3.5" strokeWidth={1.7} />}
            label="価格"
            value={formatPrice(lot)}
          />
          <Metric
            icon={<Train className="h-3.5 w-3.5" strokeWidth={1.7} />}
            label="駅"
            value={walk !== null ? `${walk}分` : "確認"}
          />
          <Metric
            icon={<GraduationCap className="h-3.5 w-3.5" strokeWidth={1.7} />}
            label="学校"
            value={school !== null ? `${school}分` : "確認"}
          />
          <Metric
            icon={<ShoppingCart className="h-3.5 w-3.5" strokeWidth={1.7} />}
            label="買物"
            value={superWalk !== null ? `${superWalk}分` : "確認"}
          />
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-[#D7D2C6] pt-4">
          <div className="min-w-0 text-[11px] leading-[1.6] text-[#777267]">
            {access?.toOsaka && <span className="mr-2">大阪 {access.toOsaka.minutes}分</span>}
            {access?.toKyoto && <span>京都 {access.toKyoto.minutes}分</span>}
          </div>
          <span className="shrink-0 text-[12px] font-semibold text-main">見る</span>
        </div>
      </div>
    </Link>
  );
}

export default function LotsBrowser({ lots }: { lots: Lot[] }) {
  const [city, setCity] = useState<string>("all");
  const [walkFilter, setWalkFilter] = useState<WalkFilter>("all");
  const [schoolWalk, setSchoolWalk] = useState<WalkFilter>("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("all");
  const [intent, setIntent] = useState<IntentFilter>("all");
  const [sort, setSort] = useState<SortOrder>("featured");
  const [filterOpen, setFilterOpen] = useState(false);

  const cities = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const lot of lots) counts[lot.city] = (counts[lot.city] || 0) + 1;
    return Object.entries(counts)
      .map(([c, n]) => ({ city: c, count: n }))
      .sort((a, b) => b.count - a.count);
  }, [lots]);

  const filtered = useMemo(() => {
    const walkMax = WALK_OPTIONS.find((o) => o.id === walkFilter)?.max;
    const schoolMax = WALK_OPTIONS.find((o) => o.id === schoolWalk)?.max;
    const priceOpt = PRICE_OPTIONS.find((o) => o.id === priceFilter);

    return lots.filter((lot) => {
      const walk = extractWalkMinutes(lot.fields["交通"]);
      const school = getSchoolWalk(lot);
      const access = CITY_ACCESS[lot.city];

      if (city !== "all" && lot.city !== city) return false;
      if (walkMax !== null && walkMax !== undefined && (walk === null || walk > walkMax)) return false;
      if (schoolMax !== null && schoolMax !== undefined && (school === null || school > schoolMax)) return false;

      if (priceOpt && priceOpt.min !== null) {
        const p = lot.price;
        if (!p) return false;
        if (p.from < priceOpt.min) return false;
        if (priceOpt.max !== null && p.from >= priceOpt.max) return false;
      }

      if (intent === "station" && (walk === null || walk > 10)) return false;
      if (intent === "school" && (school === null || school > 10)) return false;
      if (intent === "osaka" && (!access?.toOsaka || access.toOsaka.minutes > 35)) return false;
      if (intent === "kyoto" && (!access?.toKyoto || access.toKyoto.minutes > 35)) return false;
      if (intent === "last" && !hasLastLotSignal(lot)) return false;

      return true;
    });
  }, [lots, city, walkFilter, schoolWalk, priceFilter, intent]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      if (sort === "featured") return editorialScore(b) - editorialScore(a);
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

  const featuredLot = sorted.find((lot) => Boolean(lot.coord)) ?? sorted[0];
  const cardLots = featuredLot
    ? sorted.filter((lot) => lot.id !== featuredLot.id)
    : sorted;

  const activeFilterCount =
    (city !== "all" ? 1 : 0) +
    (walkFilter !== "all" ? 1 : 0) +
    (schoolWalk !== "all" ? 1 : 0) +
    (priceFilter !== "all" ? 1 : 0) +
    (intent !== "all" ? 1 : 0);

  const reset = () => {
    setCity("all");
    setWalkFilter("all");
    setSchoolWalk("all");
    setPriceFilter("all");
    setIntent("all");
  };

  const cityOptions = useMemo(
    () => [
      { id: "all", label: `すべて (${lots.length})` },
      ...cities.map((c) => ({ id: c.city, label: `${c.city} (${c.count})` })),
    ],
    [cities, lots.length]
  );

  return (
    <section id="lots-browser" className="scroll-mt-20 bg-[#F8F7F2]">
      <div className="sticky top-0 z-30 border-b border-[#DCD8CC] bg-[#F8F7F2]/96 backdrop-blur">
        <div className="max-w-[1500px] mx-auto px-[var(--page-px)] py-4">
          <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
            {INTENT_OPTIONS.map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setIntent(o.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded border px-3.5 py-2 text-[12px] font-semibold transition-colors ${
                  intent === o.id
                    ? "border-[#1F2D14] bg-[#1F2D14] text-white"
                    : "border-[#D7D2C6] bg-[#FCFBF7] text-[#25251E] hover:border-[#1F2D14]/45"
                }`}
              >
                {intent === o.id && <Check className="h-3.5 w-3.5" strokeWidth={2} />}
                <span className="hidden sm:inline">{o.label}</span>
                <span className="sm:hidden">{o.short}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className="inline-flex items-center gap-2 rounded border border-[#D7D2C6] bg-[#FCFBF7] px-3.5 py-2 text-[12px] font-semibold text-[#25251E] transition-colors hover:border-[#1F2D14]/45"
            >
              <SlidersHorizontal className="h-4 w-4" strokeWidth={1.8} />
              詳細条件
              {activeFilterCount > 0 && (
                <span className="inline-flex h-5 min-w-5 items-center justify-center rounded bg-main px-1.5 text-[10px] text-white">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${filterOpen ? "rotate-180" : ""}`}
                strokeWidth={1.7}
              />
            </button>

            <p className="order-3 w-full text-[12px] text-[#625E53] md:order-2 md:w-auto">
              {lots.length}件中 <strong className="tabular-nums text-[#191A16]">{sorted.length}</strong> 件を表示
              {activeFilterCount > 0 && (
                <button type="button" onClick={reset} className="ml-3 font-semibold text-main hover:underline">
                  リセット
                </button>
              )}
            </p>

            <label className="order-2 inline-flex items-center gap-2 text-[12px] text-[#625E53] md:order-3">
              並び替え
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOrder)}
                className="rounded border border-[#D7D2C6] bg-[#FCFBF7] px-3 py-2 text-[12px] font-semibold text-[#25251E] focus:border-main focus:outline-none"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {filterOpen && (
            <div className="mt-4 grid gap-4 border-t border-[#DCD8CC] pt-4 md:grid-cols-2 lg:grid-cols-4">
              <FilterChips label="エリア" options={cityOptions} selected={city} onChange={setCity} />
              <FilterChips label="価格帯" options={PRICE_OPTIONS} selected={priceFilter} onChange={setPriceFilter} />
              <FilterChips
                label={
                  <span className="inline-flex items-center gap-1.5">
                    <Footprints className="h-3 w-3" strokeWidth={1.8} />
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
                    <GraduationCap className="h-3 w-3" strokeWidth={1.8} />
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

      <div className="max-w-[1500px] mx-auto px-[var(--page-px)] py-[clamp(44px,6vw,96px)]">
        <div className="mb-7 grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-main">
              Curated Lots
            </p>
            <h2 className="text-[clamp(24px,3vw,42px)] leading-[1.35] text-[#191A16] [font-family:var(--font-zen-old)]">
              条件で絞って、暮らしで比べる。
            </h2>
          </div>
        </div>

        {sorted.length === 0 ? (
          <div className="rounded-[8px] border border-[#D7D2C6] bg-[#FCFBF7] px-6 py-16 text-center">
            <p className="mb-3 text-base text-[#191A16]">該当する分譲地がありません。</p>
            <button type="button" onClick={reset} className="text-sm font-semibold text-main hover:underline">
              条件をリセットする
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {featuredLot && <FeaturedLotCard lot={featuredLot} />}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {cardLots.map((lot, i) => (
                <LotCard key={lot.id} lot={lot} rank={sort === "price-asc" ? i : undefined} />
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 max-w-[820px] border-t border-[#D7D2C6] pt-7 text-[11px] leading-[1.9] text-[#777267] md:text-[12px]">
          <p>※ 学校・スーパー等の所要時間は、座標からの直線距離に基づく目安(80m/分)です。実際の徒歩時間は道のりにより前後します。</p>
          <p>※ 個別の正確な学区は、転居予定地の市町村教育委員会または当社までお問い合わせください。</p>
        </div>
      </div>
    </section>
  );
}
