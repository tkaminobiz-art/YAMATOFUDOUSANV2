import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, MessageCircle } from "lucide-react";

import Eyebrow from "../_shared/Eyebrow";
import S01HeroMovie from "./S01Hero.client";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/**
 * S01 — FV（ファーストビュー）｜ループ動画 ＋ 直下にステートメント
 * ------------------------------------------------------------------
 * 神野さん指示（2026-06-26）:
 *   1. FV案B のモンタージュ動画をファーストビューにし、ループ再生（写真は脇役の"地"）。
 *   2. その直下に Phase1（C3）のステートメントを挿入。
 *
 * 構成:
 *   ① 動画ヒーロー（フルブリード・h-[88vh]・下端を ink へ溶かして②へ接続）。前景テキストは載せない。
 *   ② ステートメント（surface-ink）= §6 確定コピーのゴシック h1 ＋「2,280」を独立巨大バーンに解放
 *      （Oswald・clamp 上限 116px＝S03 権威バーン 132px 未満＝専務③二度打ち回避）＋ sub ＋ CTA×2。
 *
 * 厳守:
 *   - §6 Hero 確定コピーは 1 字も変えない（Gate B 前のため中心概念は使わない）。
 *   - 色は @theme 実働トークン（ink/cream/lime/main/line）。蛍光・新 hex 直書きなし。
 *   - 実績4数字レールは置かない（=S03 へ集約・二度打ち禁止 / 専務③）。
 *   - 動画は実写真allowlist由来（外観は空/時間帯のみAIレタッチ・建物保持を1対1照合済）。
 *     出典トレーサビリティ: docs/notes/2026-06-26-fv-montage-assets.md。
 *
 * A/B 並走（FV案B計画）: 前景（ステートメント②）は完全同一で、背景①だけを入れ替える。
 *   variant="b"（既定 /b-plan-v3）= ループ動画モンタージュ。
 *   variant="a"（/b-plan-v3-a）   = 同一ポスターの静止背景（動きなし）。
 *   ＝「動画背景は静止背景よりFV効果が高いか」をクリーンに比較するための1変数化。
 *
 * サーバーコンポーネント。video の reduced-motion 出し分けのみ client 子。
 */
export default function S01({ variant = "b" }: { variant?: "a" | "b" } = {}) {
  return (
    <>
      {/* ① ヒーロー背景（フルブリード・写真は脇役の地）。A=静止 / B=ループ動画 */}
      <section
        id="hero"
        aria-label="やまと不動産が手がけた住まいの風景"
        className="relative h-[88vh] min-h-[520px] w-full overflow-hidden bg-ink"
      >
        <div aria-hidden className="absolute inset-0 z-0">
          {variant === "a" ? (
            // A案: 静止背景（B案の動画と同一ポスター=三山木 夕暮れ）。動きなし。
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/videos/fv/yamato-fv-montage-poster.webp"
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
            />
          ) : (
            // B案: ループ動画モンタージュ
            <S01HeroMovie />
          )}
          {/* 上端: 固定ヘッダーの可読性確保 / 下端: ink へ溶かして②ステートメントへ継ぎ目なく接続 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(29,29,24,0.42) 0%, rgba(29,29,24,0.06) 22%, rgba(29,29,24,0.04) 52%, rgba(29,29,24,0.6) 84%, var(--color-ink) 100%)",
            }}
          />
        </div>

        {/* スクロール誘導（前景の主役は②へ譲る） */}
        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
          <span className="flex flex-col items-center gap-1.5 text-cream/70">
            <span className="t-eyebrow text-[10px]">scroll</span>
            <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
          </span>
        </div>
      </section>

      {/* ② 直下ステートメント = §6確定コピー ＋ 2,280巨大バーン ＋ CTA */}
      <section
        aria-label="奈良・京都南部で、土地から考える家づくり"
        className="surface-ink relative px-5 py-16 md:px-10 md:py-20 lg:py-24 xl:px-14"
      >
        <div className="mx-auto max-w-[1380px]">
          <Eyebrow light>total cost first</Eyebrow>

          {/* h1 — §6 確定・1字も変えない（lime 下線は「点」・蛍光なし） */}
          <h1 className="t-display mt-4 text-cream">
            奈良・京都南部で、
            <br className="hidden sm:block" />
            土地から考える
            <span className="relative whitespace-nowrap">
              家づくり
              <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-lime" />
            </span>
            。
          </h1>

          {/* 「2,280」を独立ブロックで巨大バーンに解放（Oswald 600・上限116px＜S03の132px） */}
          <div className="mt-9 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="t-eyebrow text-cream/70">京モデル</span>
            <span
              className="font-oswald font-semibold leading-[0.86] tabular-nums text-cream"
              style={{ fontSize: "clamp(60px, 12vw, 116px)", letterSpacing: "0.005em" }}
            >
              2,280
            </span>
            <span className="t-h3 text-cream">万円〜</span>
          </div>

          {/* sub — §6 確定（本文） */}
          <p className="mt-6 max-w-[560px] t-body text-cream/80">
            土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。
          </p>

          {/* 注記（最小・景表） */}
          <p className="mt-3 text-[12px] leading-[1.7] tracking-[0.02em] text-cream/55">
            ※一部、登記費用などは別途発生します。
          </p>

          {/* CTA — 最大2。P=LINEで相談（bg-line）/ S=モデルハウスを見学する（cream outline） */}
          <div className="mt-9 flex w-full max-w-[520px] flex-col gap-3 sm:flex-row">
            <a
              href={LINE_ADD_FRIEND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[56px] flex-1 items-center justify-center gap-3 bg-line px-7 text-[15px] font-bold text-ink"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              LINEで相談
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
            </a>
            <Link
              href="/reserve"
              className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-3 border border-cream/40 px-7 text-[15px] font-bold text-cream"
            >
              <CalendarDays className="h-5 w-5" aria-hidden />
              モデルハウスを見学する
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
