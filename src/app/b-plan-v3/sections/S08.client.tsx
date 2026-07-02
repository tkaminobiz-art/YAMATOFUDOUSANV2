"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useScrollIn } from "@/hooks/useScrollIn";

/**
 * S08ProductCatalog — S08 専用 bespoke 図（このセクションに自己完結）。
 *
 * 商品ライン 花→風→京 の 3 cover card（カタログの潔さ＝均等3カードでなく花にバッジで非対称）。
 * - 順序固定 花→風→京（BRAND-TRUTH §2.1）。
 * - 花=lime tint・価格 lime 強調・「いちばん選ばれています」バッジ（花のみ）。
 * - 京=entry 役・white・lime tint なし（廉価版表現禁止）。
 * - 価格はカウントアップしない（静止表示・t-burn-sub）。
 * - 表記は KYO（MIYAKO 禁止。内部 id/画像名は歴史的経緯で miyako 保持）。
 *
 * モーション:
 * - M6 3カード reveal stagger（Y+16→0/IO once/120ms）= .scroll-in 流用＋transitionDelay。
 * - M7 花バッジ fade-in（パルス/発光禁止/M6+300ms）= バッジも .scroll-in で fade のみ。
 * - reduced-motion 時は useScrollIn が即 .is-visible 付与＋CSS で transition 無効（即表示）。
 *
 * 色は @theme トークンのみ（ink/lime/lime-light/main）。蛍光・新 hex 直書きなし。
 * S08.tsx の default export を props 無しサーバーコンポーネントに保つため、
 * client 化が要るこの図だけを子コンポーネント（Sxx.client.tsx 規約）に切り出している。
 */

type Plan = {
  /** 内部 id（歴史的経緯で miyako 保持） */
  id: "hana" | "kaze" | "miyako";
  /** 和名（花/風/京） */
  jp: string;
  /** display（HANA/KAZE/KYO・MIYAKO 表記禁止） */
  display: string;
  price: string;
  area: string;
  rooms: string;
  fit: string;
  image: string;
  alt: string;
  /** 花のみ true（lime tint・価格 lime 強調・バッジ） */
  featured?: boolean;
};

/** 並び順は 花 → 京 → 風… ではなく 花 → 風 → 京 で固定（BRAND-TRUTH §2.1）。 */
const PLANS: Plan[] = [
  {
    id: "hana",
    jp: "花",
    display: "HANA",
    price: "2,480",
    area: "33坪（109㎡）",
    rooms: "4LDK",
    fit: "ゆとりを持たせたいご家族へ。",
    image: "/images/fv/plan-hana.webp",
    alt: "花モデルの外観（やまと不動産の注文住宅）",
    featured: true,
  },
  {
    id: "kaze",
    jp: "風",
    display: "KAZE",
    price: "2,480",
    area: "30坪",
    rooms: "4LDK",
    fit: "広さと価格のバランスを重視するご家族へ。",
    image: "/images/fv/plan-kaze.webp",
    alt: "風モデルの外観（やまと不動産の注文住宅）",
  },
  {
    id: "miyako",
    jp: "京",
    display: "KYO",
    price: "2,280",
    area: "28坪",
    rooms: "3LDK",
    fit: "総額を抑えやすいご家族へ。",
    image: "/images/fv/plan-miyako.webp",
    alt: "京モデルの外観（やまと不動産の注文住宅）",
  },
];

export default function S08ProductCatalog() {
  const ref = useScrollIn<HTMLDivElement>(true);

  return (
    <div
      ref={ref}
      className="mt-12 grid gap-6 md:mt-14 md:grid-cols-3 md:gap-7"
    >
      {PLANS.map((plan, i) => (
        <PlanCard key={plan.id} plan={plan} delay={i * 120} />
      ))}
    </div>
  );
}

function PlanCard({ plan, delay }: { plan: Plan; delay: number }) {
  const featured = plan.featured === true;

  return (
    <article
      className={`scroll-in flex flex-col overflow-hidden rounded-[4px] border ${
        featured
          ? "border-main/30 bg-lime-light"
          : "border-[color:var(--color-border)] bg-paper"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* cover 写真（実写真 allowlist・/images/fv/plan-*.webp） */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
        <Image
          src={plan.image}
          alt={plan.alt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
        {/* M7 花バッジ（花のみ・fade のみ・パルス/発光禁止）。色だけに頼らず文言で伝える。 */}
        {featured && (
          <span
            className="scroll-in absolute left-4 top-4 inline-flex items-center rounded-full bg-lime px-3.5 py-1.5 text-[12px] font-bold tracking-wide text-lime-darker"
            style={{ transitionDelay: `${delay + 300}ms` }}
          >
            いちばん選ばれています
          </span>
        )}
      </div>

      {/* カタログ本文 */}
      <div className="flex flex-1 flex-col px-6 py-7 md:px-7">
        {/* モデル名: 和名 t-h3 ＋ display caps（KYO 表記） */}
        <div className="flex items-baseline gap-3">
          <h3 className="t-h3 text-ink">{plan.jp}</h3>
          <span className="t-eyebrow text-ink-muted">{plan.display}</span>
        </div>

        <p className="t-body mt-1.5 text-[13px] text-ink-muted">{plan.fit}</p>

        {/* 価格（静止表示・カウントアップしない）。花のみ lime 強調＝lime 面上は暗文字。 */}
        <div className="mt-6 flex items-end gap-1.5">
          <span
            className={`t-burn-sub ${featured ? "text-lime-deep" : "text-ink"}`}
          >
            {plan.price}
          </span>
          <span className="t-body pb-1 text-[14px] text-ink-muted">万円〜</span>
        </div>

        {/* 仕様（坪数・間取り） */}
        <dl className="mt-4 flex gap-6 border-t border-[color:var(--color-border)] pt-4">
          <div>
            <dt className="t-eyebrow text-ink-muted">広さ</dt>
            <dd className="t-body mt-1 text-[14px] text-ink">{plan.area}</dd>
          </div>
          <div>
            <dt className="t-eyebrow text-ink-muted">間取り</dt>
            <dd className="t-body mt-1 text-[14px] text-ink">{plan.rooms}</dd>
          </div>
        </dl>

        {/* 静かな tertiary（text-link）。下層は /money（全17項目の標準仕様・総額） */}
        <Link
          href="/money"
          className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-[14px] font-bold text-main"
        >
          土地込みの総額で見る
          <ArrowRight
            className="h-4 w-4 transition group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </article>
  );
}
