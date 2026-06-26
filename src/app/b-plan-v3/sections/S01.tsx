import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircle } from "lucide-react";

import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import S01HeroVideo from "./S01Hero.client";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/**
 * S01 — Hero｜状況提示＋中心概念（確定フレームワーク §S / S01 ビルドカード）
 * ------------------------------------------------------------------
 * 役割: 状況提示＋中心概念（段=1 / 心の段=①反射）。
 * 主役: 巨大ゴシック h1（.t-display）＋京2,280 の数字1発（.t-burn-sub）。
 *   実績4数字レールは置かない（=S03 へ集約・二度打ち禁止 / 専務③）。
 * 背景: 実写映像の帯のみ（物件写真を主役にしない＝専務①）。surface=ink。
 * CTA: 最大2 — P=「LINEで相談」（bg-line）/ S=「モデルハウスを見学する」（deep-green outline・canonical default）。
 *
 * コピーは §6 確定文字列を一字も変えない（中心概念「大手の理想を、現実の総額に。」は
 * BRAND-TRUTH §6 未更新＝ゲートB 前のため FV に採用しない）。
 * 京モデル 2,280 は §6 確定 lead 文字列の一部（数字のみ Oswald 600 tabular）。
 *
 * モーション（§4.2）:
 *   M1 h1/lead fade+translateY（Y+12→0 / 600ms / ease(.16,1,.3,1)）= 純CSS mount。
 *   M3 背景帯のみ Ken Burns（既存 .hero-ken-burns / 18–28s）。カウントアップ無し。
 * SSR/JS無効/reduced-motion でも h1/lead/sub/2,280/CTA2本が実数で可視
 *   （opacity:0 を JS 依存で焼かない・mount アニメは終端可視）。
 *
 * サーバーコンポーネント（props 無し）。video は autoPlay/muted/loop/playsInline で
 * client 化不要。
 */
export default function S01() {
  return (
    <SectionShell
      id="hero"
      surface="ink"
      inner={false}
      aria-label="奈良・京都南部で、土地から考える家づくり"
      className="!px-0 !py-0"
    >
      {/* 背景帯: 実映像（物件写真を主役にしない／専務①）。poster でフォールバック。
          reduced-motion 時は client 子が動画を出さず poster 静止画のみ描画（WCAG 2.2.2）。 */}
      <div aria-hidden className="absolute inset-0 z-0">
        <S01HeroVideo />
        {/* ink overlay: 文字可読性のため左から灼き込む（surface-ink と同系・蛍光なし） */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(105deg, rgba(29,29,24,0.94) 0%, rgba(29,29,24,0.86) 38%, rgba(29,29,24,0.55) 68%, rgba(29,29,24,0.28) 100%)",
          }}
        />
      </div>

      {/* 主役コンテンツ */}
      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-[1380px] flex-col justify-center px-5 py-24 md:px-10 lg:py-28 xl:px-14">
        <div className="s01-rise max-w-[760px]">
          <Eyebrow light>total cost first</Eyebrow>

          {/* h1 — §6 確定・1字も変えない（lime 下線は「点」で・蛍光なし） */}
          <h1 className="t-display text-cream">
            奈良・京都南部で、
            <br className="hidden sm:block" />
            土地から考える
            <span className="relative whitespace-nowrap">
              家づくり
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 h-[3px] w-full bg-lime"
              />
            </span>
            。
          </h1>

          {/* lead — §6 確定。数字「2,280」のみ Oswald 600 tabular（.t-burn-sub） */}
          <p className="mt-8 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-medium text-cream">
            <span className="t-lead text-cream">京モデル</span>
            <span className="t-burn-sub text-cream">2,280</span>
            <span className="t-lead text-cream">万円〜。</span>
          </p>

          {/* sub — §6 確定（本文） */}
          <p className="mt-5 max-w-[520px] t-body text-cream/80">
            土地代も、建物代も、後からかかる費用も、はじめにわかりやすく。
          </p>

          {/* 注記（t-small 相当・small は v3 未定義のため text-cream/60 の最小本文で表現） */}
          <p className="mt-3 text-[12px] leading-[1.7] tracking-[0.02em] text-cream/55">
            ※一部、登記費用などは別途発生します。
          </p>

          {/* CTA — 最大2。P=LINEで相談（bg-line）/ S=モデルハウスを見学する（deep-green outline） */}
          <div className="mt-10 flex w-full max-w-[520px] flex-col gap-3 sm:flex-row">
            <a
              href={LINE_ADD_FRIEND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[56px] flex-1 items-center justify-center gap-3 bg-line px-7 text-[15px] font-bold text-ink"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              LINEで相談
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden
              />
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
      </div>

      {/*
        M1 mount アニメ（純CSS・JS 非依存）。
        終端が可視なので JS 無効でもコピーは常に表示される（acceptance ①）。
        reduced-motion は globals.css のグローバル安全網で transform/opacity を解除。
      */}
      <style>{`
        .s01-rise {
          animation: s01-rise 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: 60ms;
        }
        @keyframes s01-rise {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .s01-rise { animation: none; opacity: 1; transform: none; }
        }
        @media (scripting: none) {
          .s01-rise { opacity: 1; transform: none; }
        }
      `}</style>
    </SectionShell>
  );
}
