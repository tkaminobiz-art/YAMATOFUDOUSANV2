import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Eyebrow from "../_shared/Eyebrow";
import SectionShell from "../_shared/SectionShell";
import BurnNumber from "../_shared/BurnNumber";
import {
  DELIVERED_HOMES,
  FUNDING_PLANS,
  CUSTOMER_VOICES,
  GROUND_WARRANTY_YEARS,
  TERMITE_WARRANTY_YEARS,
  FOUNDED_YEAR,
  REAL_ESTATE_LICENSE_NO,
} from "@/data/brand-facts";
import { REPRESENTATIVES } from "@/data/staff";

/**
 * S03 — 権威バーン｜数字1発主役級（TrustLedger）。
 *
 * 役割（§S S03 ビルドカード / §3.4 / 専務②③）:
 * - 引渡し600棟以上を `t-burn` 主役級バーンで「1発」。M4＝カウントアップ＝叫ぶ①
 *   （叫ぶのは S03(600) と S05(月々) の2箇所のみ・二度打ち禁止）。
 * - 14年 / 1,000件 / 50組 / 保証20・10年は `t-burn-sub`/`t-h3` で「明確に小さく」従える。
 *   ここで列挙した補助数字は以後再カウントアップしない（受け入れ基準①②）。
 * - 代表2名（REPRESENTATIVES）を完全同格で信頼アンカーとして配置 → /staff（A1）。
 *   公式メッセージは原文厳守・宅建免許番号併記。
 *
 * surface=ivory: 明面（§3.3 の暗面4回限定＝S01/S05/S06/S12 を守るため ink を選ばない）。
 *   ビルドカードは「ivory or ink」を許可。中盤に黒面が密集して黒地が『句読点』から
 *   『デフォルト』に転落するのを避け、専務文法の核である黒白リズムを保つ（明度レビュー対応）。
 *   →「数字バーンが画面を支配」は ivory 上でも ink 文字＋lime 下線で主役級に成立。
 *     600を ink・lime を視線停止点（点/下線）に限定し面塗りしない。
 */

const SUB_STATS: { value: number; suffix: string; label: string }[] = [
  // 業歴15年（2011年創立・AD確定2026-06-26）。正本 brand-facts.ts BUSINESS_YEARS=14 とドリフト中＝v3ローカル上書き。
  { value: 15, suffix: "年", label: "業歴" },
  { value: FUNDING_PLANS, suffix: "件以上", label: "資金計画の作成" },
  { value: CUSTOMER_VOICES, suffix: "組以上", label: "お客様の声" },
];

const WARRANTIES: { value: number; suffix: string; label: string }[] = [
  { value: GROUND_WARRANTY_YEARS, suffix: "年", label: "地盤保証" },
  { value: TERMITE_WARRANTY_YEARS, suffix: "年", label: "しろあり保証" },
];

export default function S03() {
  return (
    <SectionShell
      id="trust"
      surface="ivory"
      aria-label="やまと不動産の実績と代表者"
    >
      {/* ── 権威バーン: 600棟（主役・叫ぶ①） ───────────────────── */}
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-end lg:gap-16">
        <div>
          <Eyebrow>Track Record</Eyebrow>
          <h2 className="t-h2 max-w-[18ch] text-ink">
            15年で、600棟以上の家づくりに立ち会ってきました。
          </h2>

          {/* 巨大数字 600 ＝ M4 カウントアップ（lime 下線を視線停止点に） */}
          <div className="mt-8 inline-block">
            <BurnNumber
              value={DELIVERED_HOMES}
              countUp
              duration={1600}
              suffix={<span className="text-ink">棟以上</span>}
              burnClassName="text-ink"
              className="pb-2 [border-bottom:6px_solid_var(--color-lime)]"
              aria-label={`引渡し${DELIVERED_HOMES}棟以上`}
            />
          </div>

          <p className="t-body mt-6 max-w-[34ch] text-ink-muted">
            この{DELIVERED_HOMES}棟は、{DELIVERED_HOMES}組のご家族が「ここで建てる」と決めた、その判断に立ち会ってきた数です。
          </p>
          <p className="t-body mt-3 text-[12px] text-ink-muted">
            引渡し{DELIVERED_HOMES}棟以上（{FOUNDED_YEAR}年創業〜2026年時点・累計）
          </p>
        </div>

        {/* 従属数字レール（明確に小さく・カウントアップしない） */}
        <div className="border-t border-ink/10 pt-8 lg:border-l lg:border-t-0 lg:pt-0 lg:pl-12">
          <dl className="grid grid-cols-3 gap-x-6 gap-y-8">
            {SUB_STATS.map((s) => (
              <div key={s.label} className="min-w-0">
                <dd className="flex items-baseline gap-1 text-ink">
                  <span className="t-burn-sub tabular-nums">
                    {s.value.toLocaleString("ja-JP")}
                  </span>
                  <span className="t-body text-[13px] text-ink-muted">
                    {s.suffix}
                  </span>
                </dd>
                <dt className="t-body mt-1 text-[12px] text-ink-muted">
                  {s.label}
                </dt>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/10 pt-6">
            {WARRANTIES.map((w) => (
              <div key={w.label} className="flex items-baseline gap-1.5">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-main"
                  aria-hidden
                />
                <span className="t-body text-[13px] text-ink-muted">
                  {w.label}
                </span>
                <span className="t-h3 leading-none text-ink">{w.value}</span>
                <span className="t-body text-[12px] text-ink-muted">
                  {w.suffix}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 信頼アンカー A1: 代表2名（完全同格・原文厳守） ──────────── */}
      <div className="mt-16 border-t border-ink/10 pt-12 lg:mt-20 lg:pt-14">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <Eyebrow className="mb-0">
            Representatives
          </Eyebrow>
          <Link
            href="/staff"
            className="t-body inline-flex items-center gap-1.5 text-[13px] text-main underline-offset-4 hover:text-main-dark hover:underline"
          >
            スタッフ
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-8 grid gap-8 md:grid-cols-2 md:gap-10">
          {REPRESENTATIVES.map((rep) => (
            <li
              key={rep.id}
              className="flex flex-col gap-5 sm:flex-row sm:gap-6"
            >
              <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-ink/5">
                <Image
                  src={`/images/staff/${rep.id}.webp`}
                  alt={`${rep.name}（${rep.role}）`}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <p className="t-body text-[12px] text-ink-muted">{rep.role}</p>
                <p className="t-h3 mt-0.5 text-ink">{rep.name}</p>
                <p className="t-body mt-4 whitespace-pre-line text-[14px] leading-[1.9] text-ink-muted">
                  {rep.quote}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <p className="t-body mt-10 text-[12px] text-ink-muted">
          宅地建物取引業　{REAL_ESTATE_LICENSE_NO}
        </p>
      </div>
    </SectionShell>
  );
}
