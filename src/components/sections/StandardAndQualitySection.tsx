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
      className={`scroll-in relative group overflow-hidden rounded-lg border border-border bg-bg-primary ${IMAGE_TILE_SPAN[item.size]}`}
    >
      <Image
        src={item.image}
        alt={`${item.category}の標準仕様 - ${item.brand} | やまと不動産`}
        fill
        priority={priority}
        className="object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        sizes={IMAGE_SIZES[item.size]}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
        <p className="text-white/75 text-[10px] md:text-[11px] tracking-wider mb-0.5">
          {item.brand}
        </p>
        <h3
          className={`text-white font-medium ${item.size === "2x2" ? "text-base md:text-lg" : "text-sm"}`}
          style={{ fontFamily: "var(--font-sans)" }}
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
      className={`scroll-in relative flex flex-col justify-between overflow-hidden rounded-lg border border-border bg-bg-primary p-5 md:p-6 ${NUMBER_TILE_SPAN[tile.size]}`}
    >
      {/* 上段: アイコン or 余白 */}
      <div className="flex items-start justify-between">
        {Icon ? (
          <Icon
            className={`text-main ${isLarge ? "w-7 h-7" : "w-5 h-5"}`}
            strokeWidth={1.5}
          />
        ) : (
          <span />
        )}
        {tile.chip ? (
          <span className="text-[10px] md:text-[11px] text-text-secondary tracking-wider">
            {tile.chip}
          </span>
        ) : null}
      </div>

      {/* 中段: 巨大数字 */}
      <div className="flex items-baseline gap-1 md:gap-2">
        <span
          className={`text-text-primary font-light leading-none ${
            isLarge
              ? "text-[clamp(72px,10vw,140px)]"
              : "text-[clamp(48px,6vw,88px)]"
          }`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {tile.num}
        </span>
        <span
          className={`text-text-primary font-light ${isLarge ? "text-xl md:text-2xl" : "text-base md:text-lg"}`}
          style={{ fontFamily: "var(--font-serif)" }}
        >
          {tile.unit}
        </span>
      </div>

      {/* 下段: 項目名と説明 */}
      <div>
        <h3
          className={`text-text-primary font-medium ${isLarge ? "text-lg md:text-xl" : "text-sm md:text-base"}`}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {tile.title}
        </h3>
        <p
          className={`mt-1.5 text-text-secondary leading-[1.8] ${isLarge ? "text-sm md:text-base" : "text-[12px] md:text-[13px]"}`}
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
    <div className="col-span-2 sm:col-span-4 lg:col-span-8 flex items-baseline gap-4 mt-8 md:mt-12 mb-2">
      <span
        className="text-main font-medium text-xs md:text-sm tracking-[0.3em]"
        style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
      >
        {step}
      </span>
      <span className="flex-1 h-px bg-border" />
      <span
        className="text-text-primary text-sm md:text-base tracking-[0.08em]"
        style={{ fontFamily: "var(--font-sans)" }}
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
      className="relative overflow-hidden bg-bg-secondary py-[var(--section-py)]"
    >
      {/* 背景: 72pxグリッド */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.33]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(43,43,43,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(43,43,43,0.04) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div
        ref={ref}
        className="relative max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ヘッダ */}
        <div className="mb-10 md:mb-14 max-w-[760px]">
          <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.18em]">
            QUALITY / WARRANTY
          </p>
          <h2
            className="text-[clamp(28px,4vw,52px)] text-text-primary mb-5 font-light leading-[1.3]"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            事実だけ、並べます。
          </h2>
          <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-[1.9]">
            標準仕様。品質の数字。保証。
            <br />
            全部、名前と数字で置きます。
          </p>
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
