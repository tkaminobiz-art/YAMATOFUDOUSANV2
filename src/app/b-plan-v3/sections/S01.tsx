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
 *   2. その直下に Phase2 ステートメント（標準装備＝高水準 × 現実総額）を挿入。小林専務 sign-off 済。
 *
 * 構成:
 *   ① 動画ヒーロー（フルブリード・h-[88vh]・下端を ink へ溶かして②へ接続）。前景テキストは載せない。
 *   ② ステートメント（surface-ink）= h1「標準装備が、とにかくすごい。」＋ 証拠リード ＋ 標準グレード帯
 *      （耐震「3」一点支配＝Oswald 600・120px＜S03 の 132px）＋ 橋 ＋「2,280」降格バーン(96px) ＋ sub ＋ 注記 ＋ CTA×2。
 *
 * 厳守:
 *   - コピーは BRAND-TRUTH §6（2026-06-26 Phase2・専務 sign-off）が正本。「低価格/安い」禁止（憲法4.1）→「現実の総額/家そのものの値段」。
 *   - 標準仕様は全モデル共通項目のみ・実在ブランドは plain text（他社ロゴ画像不使用）。耐震は「対応する構造」（「取得」と断言しない＝景表）。
 *   - 色は @theme 実働トークン（ink/cream/lime/main/line）。蛍光・新 hex 直書きなし。
 *   - 実績4数字レールは置かない（=S03 へ集約・二度打ち禁止 / 専務③。FV 主役数字は「3」と「2,280」のみ）。
 *   - 動画は実写真allowlist由来（外観は空/時間帯のみAIレタッチ・建物保持を1対1照合済）。
 *     出典トレーサビリティ: docs/notes/2026-06-26-fv-montage-assets.md。
 *
 * 背景①＝FV案Bのループ動画モンタージュ。A/B比較（静止 vs 動画）の結果、
 *   **動画を本採用**（2026-06-26 神野さん決定「絶対動画だ」）。比較用Aルートは撤去済み。
 *
 * サーバーコンポーネント。video の reduced-motion 出し分けのみ client 子。
 */
export default function S01() {
  return (
    <>
      {/* ① 動画ヒーロー（ループ・フルブリード・写真は脇役の地） */}
      <section
        id="hero"
        aria-label="やまと不動産が手がけた住まいの風景"
        className="relative h-[88vh] min-h-[520px] w-full overflow-hidden bg-ink"
      >
        <div aria-hidden className="absolute inset-0 z-0">
          <S01HeroMovie />
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

      {/* ② 直下ステートメント = 標準装備=高水準 × 現実総額（Phase2・専務sign-off済 2026-06-26）
          主役h1「とにかくすごい」を、耐震「3」と実在ブランド（全モデル共通＋S06確定facts）で即証明。
          「低価格/安い」は憲法4.1で禁止→「現実の総額/家そのものの値段」へ翻訳。実績600はS03専管。 */}
      <section
        aria-label="やまとの標準装備"
        className="surface-ink relative px-5 py-16 md:px-10 md:py-20 lg:py-24 xl:px-14"
      >
        <div className="mx-auto max-w-[1380px]">
          <Eyebrow light>standard, not optional</Eyebrow>

          {/* 主役見出し（案B・ご指示「とにかくすごい」の語感そのまま・lime下線は点） */}
          <h1 className="t-display mt-4 text-cream">
            標準装備が、
            <br className="hidden sm:block" />
            とにかく
            <span className="relative whitespace-nowrap">
              すごい
              <span aria-hidden className="absolute -bottom-1 left-0 h-[3px] w-full bg-lime" />
            </span>
            。
          </h1>

          {/* 証拠リード（h1直下に密着＝主観「すごい」を即客観化・S06逐語） */}
          <p className="mt-5 max-w-[660px] t-body text-cream/75">
            耐震等級3に対応する構造。制震ダンパーは全モデル標準。標準で、ここまで入っています。
          </p>

          {/* 標準グレード帯（実在ブランド・全モデル共通／均等テーブル禁止＝役割で大小を割る） */}
          <div className="mt-10 overflow-hidden rounded-[6px] border border-cream/15">
            {/* 段1: 権威（耐震「3」一点支配 ＋ 外壁 ＋ 制震） */}
            <div className="grid border-b border-cream/12 md:grid-cols-[1.25fr_1fr_1fr]">
              <div className="flex flex-col justify-center gap-1 p-6 md:p-8">
                <span className="t-eyebrow text-cream/55">耐震</span>
                <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-cream">
                  <span className="t-h3 text-cream">等級</span>
                  <span
                    className="font-oswald font-semibold leading-[0.8] tabular-nums text-cream"
                    style={{ fontSize: "clamp(72px, 13vw, 120px)" }}
                  >
                    3
                  </span>
                  <span className="t-h3 text-cream">に対応する構造</span>
                </p>
              </div>
              <div className="flex flex-col justify-center gap-1.5 border-t border-cream/12 p-6 md:border-l md:border-t-0 md:p-8">
                <span className="t-eyebrow text-cream/55">外壁</span>
                <p className="t-h3 text-cream">
                  旭化成<br />ヘーベルパワーボード
                </p>
              </div>
              <div className="flex flex-col justify-center gap-1.5 border-t border-cream/12 p-6 md:border-l md:border-t-0 md:p-8">
                <span className="t-eyebrow text-cream/55">制震</span>
                <p className="t-h3 text-cream">ミライエ</p>
                <p className="t-body text-[13px] text-cream/70">制震ダンパー・全モデル標準</p>
              </div>
            </div>
            {/* 段2: 住設・保証（従属サイズ・ブランド名 plain text） */}
            <div className="grid md:grid-cols-4">
              {[
                ["キッチン", "クリナップ"],
                ["浴室・洗面・トイレ", "ＴＯＴＯ"],
                ["窓・玄関", "ＹＫＫ ＡＰ"],
                ["保証", "地盤20年・しろあり10年"],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="border-t border-cream/12 p-5 md:border-l md:border-t-0 md:p-6 md:first:border-l-0"
                >
                  <p className="t-eyebrow text-cream/55">{k}</p>
                  <p className="t-body mt-1.5 font-bold text-cream">{v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 橋コピー（高水準→現実総額の落とし所・「大手の高い水準を」は目標方向の表明） */}
          <p className="mt-10 t-h3 text-cream">大手の高い水準を、はじめから標準に。</p>

          {/* 価格バーン（降格＝3より小・上限96px）＋ 翻訳句（低価格→現実の総額） */}
          <div className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="t-eyebrow text-cream/70">京モデル</span>
            <span
              className="font-oswald font-semibold leading-[0.86] tabular-nums text-cream"
              style={{ fontSize: "clamp(52px, 8vw, 96px)", letterSpacing: "0.005em" }}
            >
              2,280
            </span>
            <span className="t-h3 text-cream">万円〜</span>
          </div>
          <p className="mt-2 t-body text-cream/80">この水準を、家そのものの値段で。</p>

          {/* sub — §6 確定 */}
          <p className="mt-5 max-w-[560px] t-body text-cream/70">
            土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。
          </p>

          {/* 注記（景表・全モデル共通＋価格条件） */}
          <p className="mt-3 max-w-[700px] text-[12px] leading-[1.7] tracking-[0.02em] text-cream/50">
            ※標準仕様は全モデル共通項目を掲載。花・風・京で一部仕様が異なります。価格は税込・建物本体＋付帯工事込み。登記費用などは別途発生します。
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
          <p className="mt-3 t-body text-[13px] text-cream/55">実物の質感は、モデルハウスで。</p>
        </div>
      </section>
    </>
  );
}
