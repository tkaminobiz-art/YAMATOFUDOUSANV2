"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import type { LucideIcon } from "lucide-react";
import { Shield, Bug, Wrench, Phone, ShieldCheck } from "lucide-react";
import CtaButton from "@/components/ui/CtaButton";

/*
  【品質と保証】セクション ─ 2026-04-16 リニューアル
  方向C「事実のタイル」型（カタログ積層型の完成形）

  設計原則:
  - 語らない。並べる。
  - 同じ粒で刻む。（S-Tile / N-Tile の2種のみ）
  - 時間軸だけ通す。（建てるとき → 住み始めてから → 10年後・その先）

  グリッドシステム: 8列モジュール
  - PC  (lg): grid-cols-8
  - MD  (md): grid-cols-4
  - SP  (sm): grid-cols-2
*/

// ────────────────────────────────────────────────
// データ（時間軸タグ付き）
// ────────────────────────────────────────────────

type TileSize = "1x1" | "2x1" | "2x2" | "4x2";

type StandardItem = {
  category: string;
  brand: string;
  image: string;
  size: TileSize;
};

// 時間軸①「建てるとき」— 12カテゴリの標準仕様
// lg(8列)で綺麗に2行で並ぶよう: 1 × 2x2(=4cells) + 1 × 2x1(=2cells) + 10 × 1x1(=10cells) = 16cells
const STANDARDS: readonly StandardItem[] = [
  { category: "外壁", brand: "ニチハ", image: "/images/standard/facility_img_04.webp", size: "2x2" },
  { category: "キッチン", brand: "クリナップ", image: "/images/standard/facility_img_01.webp", size: "2x1" },
  { category: "屋根", brand: "ガルバリウム", image: "/images/standard/facility_img_07.webp", size: "1x1" },
  { category: "窓サッシ", brand: "YKK AP", image: "/images/standard/facility_img_06.webp", size: "1x1" },
  { category: "玄関ドア", brand: "YKK AP", image: "/images/standard/facility_img_05.webp", size: "1x1" },
  { category: "床材", brand: "無垢調フローリング", image: "/images/standard/facility_img_09.webp", size: "1x1" },
  { category: "室内ドア", brand: "ハイドア", image: "/images/standard/facility_img_08.webp", size: "1x1" },
  { category: "浴室", brand: "TOTO", image: "/images/standard/facility_img_02.webp", size: "1x1" },
  { category: "洗面台", brand: "TOTO", image: "/images/standard/facility_img_03.webp", size: "1x1" },
  { category: "外構", brand: "石畳アプローチ", image: "/images/standard/facility_img_10.webp", size: "1x1" },
  { category: "制震装置", brand: "住友ゴム MIRAIE", image: "/images/standard/facility_img_12.webp", size: "1x1" },
  { category: "照明", brand: "LED ダウンライト", image: "/images/standard/facility_img_13.webp", size: "1x1" },
] as const;

// 時間軸②「住み始めてから」— 品質の数字タイル × 3
type NumberTile = {
  num: string;
  unit: string;
  title: string;
  desc: string;
  size: TileSize;
  icon?: LucideIcon;
  chip?: string;
};

const QUALITY_TILES: readonly NumberTile[] = [
  {
    num: "1.2",
    unit: "倍",
    title: "塗布量",
    desc: "推奨量の1.2倍で塗っています。",
    size: "2x1",
  },
  {
    num: "100",
    unit: "%",
    title: "自社施工",
    desc: "設計から現場まで、外に投げません。",
    size: "2x1",
  },
  {
    num: "10",
    unit: "年",
    title: "外壁の節目",
    desc: "塗り替えを考える人が多い年数です。",
    size: "2x1",
  },
] as const;

// 時間軸③「10年後・その先」— 保証タイル × 5
const HAKKI_TILE: NumberTile = {
  num: "10",
  unit: "年",
  title: "建物瑕疵担保責任保険",
  desc: "国土交通大臣指定の第三者機関が引き継ぐ、法定の保険です。構造の不具合と雨水の浸入を、10年保証します。",
  size: "4x2",
  icon: ShieldCheck,
  chip: "国交省指定 · 第三者機関",
};

const WARRANTY_TILES: readonly NumberTile[] = [
  {
    icon: Shield,
    num: "20",
    unit: "年",
    title: "地盤保証",
    desc: "第三者機関が調査から保証まで担当します。",
    size: "2x1",
  },
  {
    icon: Bug,
    num: "10",
    unit: "年",
    title: "しろあり保証",
    desc: "引き渡し後10年。延長もできます。",
    size: "2x1",
  },
  {
    icon: Wrench,
    num: "5",
    unit: "回",
    title: "定期点検",
    desc: "半年・1年・2年・5年・10年に伺います。",
    size: "2x1",
  },
  {
    icon: Phone,
    num: "1",
    unit: "本",
    title: "電話対応",
    desc: "不具合も相談も、電話一本で担当が伺います。",
    size: "2x1",
  },
] as const;

// ────────────────────────────────────────────────
// タイルのサイズ → Tailwind クラス変換
// ────────────────────────────────────────────────

// 画像タイル用: 写真のフレーミングを優先
const IMAGE_TILE_SPAN: Record<TileSize, string> = {
  "1x1": "col-span-1 row-span-1 aspect-square",
  "2x1": "col-span-2 row-span-1 aspect-[2/1]",
  "2x2": "col-span-2 row-span-2 aspect-square",
  "4x2": "col-span-2 sm:col-span-4 row-span-2 aspect-[2/1]",
} as const;

// 数字タイル用
// モバイル: aspect-[5/3] でコンパクトに。lg: aspect-[4/3] で本文余白確保
const NUMBER_TILE_SPAN: Record<TileSize, string> = {
  "1x1": "col-span-1 row-span-1 aspect-[5/3] lg:aspect-[4/3]",
  "2x1": "col-span-2 row-span-1 aspect-[5/3] lg:aspect-[4/3]",
  "2x2": "col-span-2 row-span-2 aspect-[5/3] lg:aspect-[4/3]",
  "4x2": "col-span-2 sm:col-span-4 row-span-2 aspect-[5/3] lg:aspect-[4/3]",
} as const;

const IMAGE_SIZES: Record<TileSize, string> = {
  "1x1": "(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12.5vw",
  "2x1": "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  "2x2": "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw",
  "4x2": "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 50vw",
} as const;

// ────────────────────────────────────────────────
// S-Tile（画像タイル）
// ────────────────────────────────────────────────

function SImageTile({
  item,
  priority = false,
}: {
  item: StandardItem;
  priority?: boolean;
}) {
  return (
    <div
      className={`scroll-in relative group overflow-hidden border border-text-primary/10 bg-white ${IMAGE_TILE_SPAN[item.size]}`}
    >
      <Image
        src={item.image}
        alt={`${item.category}の標準仕様 - ${item.brand} | やまと不動産`}
        fill
        priority={priority}
        className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        sizes={IMAGE_SIZES[item.size]}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <p className="font-inter text-white/75 text-[10px] md:text-[11px] tracking-[0.18em] mb-1">
          {item.brand}
        </p>
        <h3
          className={`font-shippori text-white ${item.size === "2x2" ? "text-base md:text-lg" : "text-sm"}`}
          style={{ fontWeight: 700 }}
        >
          {item.category}
        </h3>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// N-Tile（数字タイル）
// ────────────────────────────────────────────────

function SNumberTile({ tile }: { tile: NumberTile }) {
  const isLarge = tile.size === "4x2";
  const Icon = tile.icon;

  return (
    <div
      className={`scroll-in group relative flex flex-col justify-between overflow-hidden border border-text-primary/10 bg-white p-5 md:p-6 transition-[border-color,box-shadow] duration-500 hover:border-text-primary/25 hover:shadow-[0_20px_44px_-24px_rgba(0,0,0,0.12)] ${NUMBER_TILE_SPAN[tile.size]}`}
    >
      {/* 上段: アイコン or 余白 */}
      <div className="flex items-start justify-between">
        {Icon ? (
          <Icon
            className={`text-main ${isLarge ? "w-7 h-7" : "w-5 h-5"}`}
            strokeWidth={1.4}
          />
        ) : (
          <span />
        )}
        {tile.chip ? (
          <span className="font-inter text-[10px] md:text-[11px] text-text-secondary tracking-[0.14em]">
            {tile.chip}
          </span>
        ) : null}
      </div>

      {/* 中段: 巨大数字(Oswald Light / Price と統一) */}
      <div className="flex items-baseline gap-1.5 md:gap-2">
        <span
          className={`font-oswald text-text-primary leading-[0.85] tabular-nums ${
            isLarge
              ? "text-[clamp(72px,10vw,140px)]"
              : "text-[clamp(48px,6vw,88px)]"
          }`}
          style={{ fontWeight: 300, letterSpacing: "-0.02em" }}
        >
          {tile.num}
        </span>
        <span
          className={`font-shippori text-text-primary/75 ${isLarge ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}
          style={{ fontWeight: 500 }}
        >
          {tile.unit}
        </span>
      </div>

      {/* 下段: 項目名と説明 */}
      <div>
        <h3
          className={`font-shippori text-text-primary ${isLarge ? "text-lg md:text-xl" : "text-sm md:text-base"}`}
          style={{ fontWeight: 700 }}
        >
          {tile.title}
        </h3>
        <p
          className={`font-shippori mt-1.5 text-text-primary/70 leading-[1.85] ${isLarge ? "text-sm md:text-base" : "text-[12px] md:text-[13px]"}`}
        >
          {tile.desc}
        </p>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// 時間軸ラベル
// ────────────────────────────────────────────────

function TimeAxisLabel({
  step,
  label,
}: {
  step: string;
  label: string;
}) {
  return (
    <div className="col-span-2 sm:col-span-4 lg:col-span-8 flex items-baseline gap-5 mt-10 md:mt-14 mb-3">
      <span
        className="font-oswald text-text-primary/80 leading-none"
        style={{
          fontWeight: 300,
          fontSize: "clamp(28px, 3vw, 44px)",
          letterSpacing: "-0.02em",
        }}
      >
        {step}
      </span>
      <span className="flex-1 h-px bg-text-primary/15" />
      <span
        className="font-shippori text-text-primary text-base md:text-lg tracking-[0.04em]"
        style={{ fontWeight: 500 }}
      >
        {label}
      </span>
    </div>
  );
}

// ────────────────────────────────────────────────
// メインセクション
// ────────────────────────────────────────────────

export default function StandardAndQualitySection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="standard-quality"
      className="relative overflow-hidden bg-[#FAF8F3] py-[var(--section-py)]"
    >
      <div
        ref={ref}
        className="relative max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ================= HEADER (非対称・Mechanism/Zero/Price 継承) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-24 items-end mb-16 md:mb-24">
          <div>
            <p className="font-inter text-[11px] md:text-[12px] tracking-[0.3em] uppercase text-text-secondary mb-6 md:mb-10 font-bold">
              What You Get
            </p>
            <h2
              className="font-shippori text-text-primary leading-[1.05] tracking-[-0.02em]"
              style={{
                fontWeight: 900,
                fontSize: "clamp(44px, 8vw, 120px)",
              }}
            >
              大手と<span style={{ color: "var(--color-lime)" }}>同じ</span>、
              <br />
              中身。
            </h2>
          </div>
          <aside className="lg:pt-4">
            <div className="border-t-[3px] border-text-primary pt-6">
              <p className="font-shippori font-bold text-[clamp(22px,2.2vw,32px)] leading-[1.55] tracking-[0.02em] max-w-[480px] text-text-primary">
                旭化成、TOTO、住友ゴム。
              </p>
              <p className="mt-5 md:mt-6 font-shippori font-medium text-[clamp(17px,1.5vw,22px)] leading-[1.8] max-w-[480px] text-text-primary/90">
                追加費用なしで、
                <br />
                すべて標準装備です。
              </p>
            </div>
          </aside>
        </div>

        {/* タイルグリッド（時間軸ラベルで区切るためdense packingは使わない） */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 md:gap-4">
          {/* 時間軸① 建てるとき */}
          <TimeAxisLabel step="01" label="建てるとき。" />
          {STANDARDS.map((item, idx) => (
            <SImageTile key={item.category} item={item} priority={idx === 0} />
          ))}

          {/* 注記（標準仕様） */}
          <p className="col-span-2 sm:col-span-4 lg:col-span-8 text-text-secondary text-[11px] md:text-[12px] mt-2">
            ※ 花モデル（2,480万円）の標準仕様です。風・京は一部異なります。
          </p>

          {/* 時間軸② 住み始めてから */}
          <TimeAxisLabel step="02" label="住み始めてから。" />
          {QUALITY_TILES.map((tile) => (
            <SNumberTile key={tile.title} tile={tile} />
          ))}

          {/* 時間軸③ 10年後・その先 */}
          <TimeAxisLabel step="03" label="10年後、その先。" />

          {/* 瑕疵担保（大タイル 4x2） */}
          <SNumberTile tile={HAKKI_TILE} />

          {/* 保証4タイル */}
          {WARRANTY_TILES.map((tile) => (
            <SNumberTile key={tile.title} tile={tile} />
          ))}

          {/* 注記（保証） */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-8 mt-2 text-[11px] md:text-[12px] leading-[1.9] text-text-secondary">
            <p>※ 保証の内容は制度・条件により変わる場合があります。詳細は来場時にご案内します。</p>
            <p>※ 立地や日当たりなどの環境条件で、劣化のスピードは変わります。</p>
          </div>
        </div>

        {/* CTA */}
        <div
          id="guarantee"
          className="mt-14 md:mt-20 flex flex-col gap-3 sm:flex-row sm:justify-end"
        >
          <CtaButton
            href="/reserve"
            variant="primary"
            size="md"
            label="来場予約"
            sublabel="モデルハウスで、現物を"
          />
          <CtaButton
            href="/contact"
            variant="secondary"
            size="md"
            label="まずは質問"
            sublabel="LINEでお待ちしています"
          />
        </div>
      </div>
    </section>
  );
}
