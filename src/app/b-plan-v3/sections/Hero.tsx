import Link from "next/link";
import { ArrowRight, CalendarDays, ChevronDown, MessageCircle } from "lucide-react";

import Eyebrow from "../_shared/Eyebrow";
import HeroMovie from "./Hero.client";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/**
 * 新1 FV（Hero）— 巨大ステートメント型「土地も、建物も、月々も。見えてから決める」
 * ------------------------------------------------------------------
 * 主軸（2026-07-01 神野さん確定）: 総額透明性起点。読者最大の不安「結局いくらか分からない」に一本で刺す。
 * 写真（ループ動画モンタージュ）は厚い ink overlay で沈めた脇役の"地"。その上に巨大メッセージを"ポン"と置く。
 *
 * 厳守:
 *   - 主役は巨大ステートメント。価格 2,280 は巨大バーンにしない（安さ訴求回避＝憲法4.1）。小サイズの控えめアンカーのみ。
 *   - 実績4数字（600棟・150区画・50組・15年）はここに置かない（Trust=新11 専管・二度打ち回避）。
 *   - 標準仕様の詳細は新4（StandardSpec）へ移管。FV では触れず「標準仕様にも妥協しません」の一文のみ。
 *   - コピー正本: 指示書/24_claude_design_top_xmobile指示書.md §10-1。CTA階層は BRAND-TRUTH §5（LINE 主）。
 *   - 色は @theme 実働トークン（ink/cream/lime/line）。蛍光・新 hex 直書きなし。
 *
 * サーバーコンポーネント。動画の reduced-motion 出し分けのみ client 子（HeroMovie）。
 */
export default function Hero() {
  return (
    <section
      id="hero"
      aria-label="土地も、建物も、月々も。見えてから決める家づくり"
      className="relative flex min-h-[92vh] w-full items-center overflow-hidden bg-ink"
    >
      {/* 背景＝ループ動画モンタージュ（写真は脇役の地）。厚い ink overlay で沈めて可読性を確保 */}
      <div aria-hidden className="absolute inset-0 z-0">
        <HeroMovie />
        {/* SP: テキストが全幅に載るため縦グラデで可読性優先（写真は上下で覗かせる） */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(29,29,24,0.66) 0%, rgba(29,29,24,0.82) 22%, rgba(29,29,24,0.82) 66%, rgba(29,29,24,0.5) 100%)",
          }}
        />
        {/* PC: 左（文字帯）は濃く可読性を守り、右は写真を明るく抜く非対称グラデ（AD方針=FVを明るく軽く）。
            左48%まで ≥0.80 で cream 見出しの AA を確保、右へ 0.12 まで開いて写真を主役級に見せる。 */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              "linear-gradient(100deg, rgba(29,29,24,0.90) 0%, rgba(29,29,24,0.82) 48%, rgba(29,29,24,0.44) 72%, rgba(29,29,24,0.12) 100%)",
          }}
        />
      </div>

      {/* 前景＝主役の巨大ステートメント（左寄せ単カラム） */}
      <div className="relative z-10 w-full px-5 py-24 md:px-10 md:py-28 xl:px-14">
        <div className="mx-auto w-full max-w-[1380px]">
          <Eyebrow light>total cost, first</Eyebrow>

          {/* 主役ステートメント（Zen Kaku 900・2行・「見えてから決める」に lime 下線） */}
          {/* 直書き<br>は廃止。maxWidth(14em≒全角14字)＋text-wrap:balance＋nowrap下線句で、
              「土地も、建物も、月々も。」／「見えてから決める家づくり。」を全幅で自然に2行分割。 */}
          <h1
            className="mt-7 text-cream md:mt-9"
            style={{
              fontFamily: "var(--font-zen-kaku-new)",
              fontWeight: 900,
              fontSize: "clamp(34px, 6vw, 82px)",
              lineHeight: 1.16,
              letterSpacing: "-0.01em",
              textWrap: "balance",
              maxWidth: "14em",
            }}
          >
            土地も、建物も、月々も。
            <span className="relative whitespace-nowrap">
              見えてから決める
              <span aria-hidden className="absolute -bottom-1 left-0 h-[4px] w-full bg-lime" />
            </span>
            家づくり。
          </h1>

          {/* サブ（§10-1 逐語・Murecho） */}
          <p
            className="mt-8 max-w-[640px] text-cream/85 md:mt-10"
            style={{
              fontFamily: "var(--font-murecho)",
              fontSize: "clamp(15px, 1.25vw, 19px)",
              lineHeight: 1.85,
              letterSpacing: "0.02em",
              textWrap: "pretty",
              wordBreak: "auto-phrase",
            }}
          >
            奈良・京都南部で、土地探しから資金計画まで。やまと不動産は、土地・建物・外構・諸費用をまとめた「土地込み総額」を先にお見せします。耐震・制震・外壁・設備・保証まで、標準仕様にも妥協しません。
          </p>

          {/* 補助（§10-1 逐語・小） */}
          <p
            className="mt-4 max-w-[560px] text-cream/65"
            style={{
              fontFamily: "var(--font-murecho)",
              fontSize: "clamp(13px, 1vw, 15px)",
              lineHeight: 1.8,
              letterSpacing: "0.02em",
              textWrap: "pretty",
              wordBreak: "auto-phrase",
            }}
          >
            土地がまだなくても、予算が固まっていなくても大丈夫です。まずは、月々いくらで建てられるかをご一緒に確認します。
          </p>

          {/* CTA — 最大2。P=LINEで総額を相談する（bg-line）/ S=モデルハウスを見学する（cream outline） */}
          <div className="mt-8 flex w-full max-w-[560px] flex-col gap-3 sm:flex-row">
            <a
              href={LINE_ADD_FRIEND_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-[56px] flex-1 items-center justify-center gap-3 bg-line px-7 text-[15px] font-bold text-ink"
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              LINEで総額を相談する
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

          {/* 控えめアンカー（京モデル価格・巨大バーンにしない） */}
          <p className="mt-5 flex flex-wrap items-baseline gap-x-2 text-cream/60">
            <span className="t-eyebrow text-cream/50">京モデル</span>
            <span
              style={{
                fontFamily: "var(--font-oswald)",
                fontWeight: 600,
                fontSize: "clamp(20px, 2vw, 28px)",
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "0.01em",
              }}
            >
              2,280
            </span>
            <span className="text-[13px] font-bold">万円〜</span>
            <span className="ml-1 text-[11px] leading-[1.6] text-cream/45">
              税込・建物本体＋付帯工事込み
            </span>
          </p>
        </div>
      </div>

      {/* スクロール誘導 */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="flex flex-col items-center gap-1.5 text-cream/60">
          <span className="t-eyebrow text-[10px]">scroll</span>
          <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden />
        </span>
      </div>
    </section>
  );
}
