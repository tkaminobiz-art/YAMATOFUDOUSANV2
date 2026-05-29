/*
  brand-facts.ts — canonical brand numbers (TS mirror of BRAND-TRUTH.md)
  ---------------------------------------------------------------
  BRAND-TRUTH.md is the single source of truth (see AGENTS.md
  "Brand facts have one canonical source"). This module mirrors the
  numeric / company facts so the same value is never hand-typed in two
  components and can never silently drift between TOP and /b-plan.

  RULE: if a number here changes, update BRAND-TRUTH.md §2 / §3 FIRST,
  then update this file. Do not edit a value here without the §2/§3 match.

  NOTE: representatives (古谷社長 / 小林専務) and staff count are NOT
  duplicated here — `REPRESENTATIVES` and `TOTAL_PEOPLE` in
  `@/data/staff` are already canonical. Import them from there.
*/

// ── §2 Numbers (canonical) ──────────────────────────────────────
/** 引渡し件数 600棟以上 — 2026-05-03 専務確認 */
export const DELIVERED_HOMES = 600;
/** 分譲実績 90区画以上 — 旧サイト */
export const PARCELS_SOLD = 90;
/** お客様の声 50組以上 — customer detail HTML */
export const CUSTOMER_VOICES = 50;
/** 業歴 14年（2011年11月30日創立）— 公式 */
export const BUSINESS_YEARS = 14;
/** 創立年（2011年11月30日）— 公式 / §3 */
export const FOUNDED_YEAR = 2011;
/** 資金計画作成実績 1,000件以上 — 2026-05-03 専務確認 */
export const FUNDING_PLANS = 1000;
/** 地盤保証 20年 — 公式 */
export const GROUND_WARRANTY_YEARS = 20;
/** しろあり保証 10年 — 公式 */
export const TERMITE_WARRANTY_YEARS = 10;

// ── §3 Company information ───────────────────────────────────────
/** 商号 */
export const COMPANY_NAME = "株式会社やまと不動産";
/** 宅地建物取引業 免許番号 — 国土交通大臣（1）第10516号 */
export const REAL_ESTATE_LICENSE_NO = "国土交通大臣（1）第10516号";
/** 免許種別ラベル */
export const REAL_ESTATE_LICENSE_LABEL = "宅地建物取引業";
