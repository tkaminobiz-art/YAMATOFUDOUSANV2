"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";
import CtaButton from "@/components/ui/CtaButton";

/*
  【What You Get】— 2026-04-24 v4 (案A カタログ + 時間軸ストリップ)
  ---------------------------------------------------------------------------
  v3 で残した "Bento 3タイル + 保証5タイル" に対し、ユーザーより
  「Bentoに限界を感じる」との指摘。v4 は後半を丸ごと時間軸チャートに置換。

  v3→v4 変更:
  - 削除: QTile ×3(塗布量/自社施工/外壁節目)
  - 削除: HakkiTile + WTile ×4(瑕疵担保 + 4保証)
  - 追加: TimelineStrip(引渡し→20年の横軸に 5 保証の帯/ドット/ダッシュ)
  - 品質3ファクトは subtitle の散文(Lime太字数字)に溶かす

  セクション全体の構造:
  [Block1] 12商品 1:1 均質グリッド(据置)
  [Block2] 時間軸ストリップ(品質subtitle + 5保証visual)
*/

// ────────────────────────────────────────────────
// Block1: STANDARDS データ
// ────────────────────────────────────────────────

type StandardItem = {
  category: string;
  brand: string;
  image: string;
};

const STANDARDS: readonly StandardItem[] = [
  { category: "外壁", brand: "ニチハ", image: "/images/standard/facility_img_04.webp" },
  { category: "キッチン", brand: "クリナップ", image: "/images/standard/facility_img_01.webp" },
  { category: "屋根", brand: "ガルバリウム", image: "/images/standard/facility_img_07.webp" },
  { category: "窓サッシ", brand: "YKK AP", image: "/images/standard/facility_img_06.webp" },
  { category: "玄関ドア", brand: "YKK AP", image: "/images/standard/facility_img_05.webp" },
  { category: "床材", brand: "無垢調フローリング", image: "/images/standard/facility_img_09.webp" },
  { category: "室内ドア", brand: "ハイドア", image: "/images/standard/facility_img_08.webp" },
  { category: "浴室", brand: "TOTO", image: "/images/standard/facility_img_02.webp" },
  { category: "洗面台", brand: "TOTO", image: "/images/standard/facility_img_03.webp" },
  { category: "外構", brand: "石畳アプローチ", image: "/images/standard/facility_img_10.webp" },
  { category: "制震装置", brand: "住友ゴム MIRAIE", image: "/images/standard/facility_img_12.webp" },
  { category: "照明", brand: "LED ダウンライト", image: "/images/standard/facility_img_13.webp" },
] as const;

function StandardTile({
  item,
  priority = false,
}: {
  item: StandardItem;
  priority?: boolean;
}) {
  return (
    <article className="scroll-in group">
      <div className="relative aspect-square overflow-hidden bg-bg-secondary">
        <Image
          src={item.image}
          alt={`${item.category}の標準仕様 - ${item.brand} | やまと不動産`}
          fill
          priority={priority}
          className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
      </div>
      <div className="mt-3 md:mt-4">
        <h3 className="font-sans font-bold text-text-primary text-[14px] md:text-[15px] tracking-[0.02em] leading-[1.4]">
          {item.category}
        </h3>
        <p className="mt-0.5 font-inter text-text-secondary text-[10.5px] md:text-[11px] tracking-[0.12em] uppercase">
          {item.brand}
        </p>
      </div>
    </article>
  );
}

// ────────────────────────────────────────────────
// Block2: 時間軸ストリップ データ
// ────────────────────────────────────────────────

const MAX_YEAR = 20;
const AXIS_TICKS_DESKTOP = [0, 1, 2, 5, 10, 15, 20] as const;
const AXIS_TICKS_MOBILE = [0, 10, 20] as const;

type Warranty =
  | {
      id: string;
      type: "bar";
      label: string;
      chip?: string;
      end: number;
      tone: "hero" | "primary";
    }
  | {
      id: string;
      type: "dots";
      label: string;
      points: number[];
      pointLabels: string[];
    }
  | {
      id: string;
      type: "dashed";
      label: string;
      note: string;
    };

const WARRANTIES: readonly Warranty[] = [
  {
    id: "hakki",
    type: "bar",
    label: "建物瑕疵担保責任保険",
    chip: "国交省指定 · 第三者機関",
    end: 10,
    tone: "hero",
  },
  { id: "jiban", type: "bar", label: "地盤保証", end: 20, tone: "primary" },
  { id: "shiroari", type: "bar", label: "しろあり保証", end: 10, tone: "primary" },
  {
    id: "checkup",
    type: "dots",
    label: "定期点検",
    points: [0.5, 1, 2, 5, 10],
    pointLabels: ["半年", "1年", "2年", "5年", "10年"],
  },
  { id: "phone", type: "dashed", label: "電話対応", note: "常時" },
] as const;

// ────────────────────────────────────────────────
// Timeline — 時間軸 + 5保証
// ────────────────────────────────────────────────

function toPct(year: number) {
  return (year / MAX_YEAR) * 100;
}

function Axis({ ticks }: { ticks: readonly number[] }) {
  return (
    <div className="relative h-10 border-b border-text-primary/25">
      {ticks.map((y) => {
        const pct = toPct(y);
        return (
          <div
            key={y}
            className="absolute bottom-0"
            style={{ left: `${pct}%`, transform: "translateX(-50%)" }}
          >
            <span className="block w-px h-2.5 bg-text-primary/30 mx-auto" />
            <span className="block mt-1.5 font-oswald font-light text-[11px] md:text-[12px] text-text-secondary tabular-nums tracking-[0.02em] whitespace-nowrap">
              {y === 0 ? "引渡し" : y === MAX_YEAR ? `${y}年` : `${y}`}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function WarrantyRow({ warranty }: { warranty: Warranty }) {
  const isHero = warranty.type === "bar" && warranty.tone === "hero";

  return (
    <div
      className={`py-5 md:py-6 border-b border-text-primary/10 ${
        isHero ? "bg-bg-secondary/40 -mx-4 px-4 md:-mx-6 md:px-6" : ""
      }`}
    >
      {/* 上段: ラベル + 終年/備考 */}
      <div className="flex items-baseline justify-between gap-3 mb-2.5 md:mb-3">
        <div className="flex items-baseline gap-2 md:gap-3 flex-wrap">
          <span
            className={`font-sans font-bold text-text-primary ${
              isHero ? "text-[15px] md:text-[17px]" : "text-[14px] md:text-[15px]"
            }`}
          >
            {warranty.label}
          </span>
          {warranty.type === "bar" && warranty.chip ? (
            <span className="font-inter text-[10px] md:text-[11px] tracking-[0.22em] uppercase text-lime-deep font-bold">
              {warranty.chip}
            </span>
          ) : null}
        </div>
        <span
          className={`font-oswald font-light tabular-nums shrink-0 ${
            isHero
              ? "text-[22px] md:text-[26px] text-lime-deep"
              : "text-[18px] md:text-[22px] text-text-primary/70"
          }`}
          style={{ letterSpacing: "-0.02em" }}
        >
          {warranty.type === "bar"
            ? `${warranty.end}年`
            : warranty.type === "dashed"
              ? warranty.note
              : ""}
        </span>
      </div>

      {/* 下段: 可視化 */}
      <div className="relative h-3.5 md:h-4">
        {warranty.type === "bar" ? (
          <div
            className={`h-full ${
              isHero ? "bg-lime-deep" : "bg-lime"
            } transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
            style={{ width: `${toPct(warranty.end)}%` }}
            aria-label={`引渡しから${warranty.end}年までの保証`}
          />
        ) : warranty.type === "dots" ? (
          <>
            {/* うっすら ground line */}
            <span
              aria-hidden
              className="absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-text-primary/10"
            />
            {warranty.points.map((p, i) => {
              const pct = toPct(p);
              return (
                <span
                  key={p}
                  className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                  style={{ left: `${pct}%` }}
                >
                  <span className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-lime-deep ring-2 ring-white" />
                  <span className="mt-1 hidden md:block font-inter text-[10px] text-text-secondary whitespace-nowrap">
                    {warranty.pointLabels[i]}
                  </span>
                </span>
              );
            })}
          </>
        ) : (
          <span
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-0 -translate-y-1/2 border-t border-dashed border-lime-deep/70"
          />
        )}
      </div>
    </div>
  );
}

function TimelineStrip() {
  return (
    <div className="relative">
      {/* Desktop 軸 */}
      <div className="hidden md:block mb-6">
        <Axis ticks={AXIS_TICKS_DESKTOP} />
      </div>
      {/* Mobile 軸(3ティックのみ) */}
      <div className="md:hidden mb-6">
        <Axis ticks={AXIS_TICKS_MOBILE} />
      </div>

      {/* 5 rows */}
      <div>
        {WARRANTIES.map((w) => (
          <WarrantyRow key={w.id} warranty={w} />
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────
// メイン
// ────────────────────────────────────────────────

export default function StandardAndQualitySection() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <section
      id="standard-quality"
      className="relative overflow-hidden bg-white py-[var(--section-py)]"
    >
      <div
        ref={ref}
        className="relative max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ========== BLOCK 1: 標準仕様 12 ========== */}
        <header className="mb-12 md:mb-16 max-w-[860px]">
          <h2
            className="font-sans font-black text-text-primary leading-[1.3] tracking-[0.01em]"
            style={{ fontSize: "clamp(28px, 4vw, 56px)" }}
          >
            これが全部、標準です。
          </h2>
          <p className="mt-5 md:mt-6 font-sans text-text-secondary text-[clamp(14px,1.05vw,16px)] leading-[1.95] max-w-[620px]">
            12の素材・設備を、追加費用なしで入れています。
            <br />
            大手がオプションにしているものも、やまとでは最初から。
          </p>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 md:gap-x-4 gap-y-8 md:gap-y-10">
          {STANDARDS.map((item, idx) => (
            <StandardTile key={item.category} item={item} priority={idx === 0} />
          ))}
        </div>

        <p className="mt-6 md:mt-8 font-sans text-text-secondary text-[11px] md:text-[12px] leading-[1.8]">
          ※ 花モデル(2,480万円)の標準仕様です。風・京は一部異なります。
        </p>

        {/* ========== BLOCK 2: 時間軸ストリップ(品質 + 5保証) ========== */}
        <div className="mt-28 md:mt-40">
          <header className="mb-10 md:mb-14 max-w-[960px]">
            <h3
              className="font-sans font-black text-text-primary leading-[1.25] tracking-[0.01em]"
              style={{ fontSize: "clamp(26px, 4vw, 56px)" }}
            >
              20年、<br className="sm:hidden" />やまとが<br className="sm:hidden" />お付き合いします。
            </h3>
            {/* 品質 3 ファクトをインラインに溶かす(Lime太字数字) */}
            <p className="mt-5 md:mt-6 font-sans text-text-primary/80 text-[clamp(14px,1.1vw,17px)] leading-[2.0] max-w-[720px]">
              推奨量の
              <span className="font-bold text-lime-deep nowrap">1.2倍</span>
              で塗る、設計から施工まで
              <span className="font-bold text-lime-deep nowrap">100%自社</span>
              、外壁の節目は
              <span className="font-bold text-lime-deep nowrap">10年</span>
              。
              <br className="hidden md:inline" />
              建てた後に効く 5 つの約束を、時間軸でお見せします。
            </p>
          </header>

          <TimelineStrip />

          <div className="mt-6 md:mt-8 font-sans text-text-secondary text-[11px] md:text-[12px] leading-[1.9]">
            <p>※ 保証の内容は制度・条件により変わる場合があります。詳細は来場時にご案内します。</p>
            <p>※ 立地や日当たりなどの環境条件で、劣化のスピードは変わります。</p>
          </div>
        </div>

        {/* ========== CTA ========== */}
        <div
          id="guarantee"
          className="mt-24 md:mt-32 flex flex-col gap-3 sm:flex-row sm:justify-end"
        >
          <CtaButton
            href="/reserve"
            variant="primary"
            size="md"
            label="来場予約"
            sublabel="モデルハウスでご覧いただけます"
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
