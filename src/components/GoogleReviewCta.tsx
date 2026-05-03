"use client";

import { Star, ExternalLink } from "lucide-react";
import { GOOGLE_REVIEW_URL, GOOGLE_MAPS_URL } from "@/data/google";

/*
  GoogleReviewCta — 2026-05-03
  ---------------------------------------------------------------
  小林専務承認 A項目「12棟達成の3欠落動線」より、GBP 口コミ動線を整備:
  - 引渡し時・1年点検時の OB 50組への口コミ依頼の受け皿
  - 「奈良 注文住宅」マップ枠最上位を狙う(星4.5以上×30件超)
  - 広告費ゼロで最大ROI の動線

  バリエーション:
   - default: お客様の声ページなどコンテンツ末尾用(静かに置く)
   - inline: 引渡し記念ページ・お礼ページ用(主役級)
   - footer: 全ページ末に置く軽量版(将来用、今はoptional)
*/

type Variant = "default" | "inline" | "footer";

type Props = {
  variant?: Variant;
  /** 「お客様の声をお寄せいただいた方へ」など、状況に応じた文言上書き */
  headline?: string;
  description?: string;
};

export default function GoogleReviewCta({
  variant = "default",
  headline,
  description,
}: Props) {
  if (variant === "footer") {
    return (
      <a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-text-secondary hover:text-main text-[12px] transition-colors"
      >
        <Star className="w-3.5 h-3.5" strokeWidth={1.5} />
        Googleで口コミを書く
        <ExternalLink className="w-3 h-3" strokeWidth={1.5} />
      </a>
    );
  }

  if (variant === "inline") {
    return (
      <a
        href={GOOGLE_REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-flex items-center gap-3 px-6 py-3 bg-white border border-text-primary/20 rounded hover:border-main transition-colors"
      >
        <span
          aria-hidden
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#4285F4]/10"
        >
          <Star
            className="w-4 h-4 text-[#FBBC04]"
            strokeWidth={1.5}
            fill="currentColor"
          />
        </span>
        <span className="flex flex-col items-start">
          <span className="text-text-primary text-[14px] font-medium">
            Googleで口コミを書く
          </span>
          <span className="text-text-secondary text-[11px]">
            ご家族の体験を、これから検討される方へ
          </span>
        </span>
        <ExternalLink
          className="w-3.5 h-3.5 text-text-secondary ml-2"
          strokeWidth={1.5}
        />
      </a>
    );
  }

  // default
  return (
    <section className="bg-bg-secondary/40 border border-border rounded-lg p-6 md:p-8">
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 md:items-center">
        <div
          aria-hidden
          className="shrink-0 inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white border border-border"
        >
          <Star
            className="w-7 h-7 md:w-8 md:h-8 text-[#FBBC04]"
            strokeWidth={1.5}
            fill="currentColor"
          />
        </div>
        <div className="flex-1">
          <p
            className="text-[10px] tracking-[0.18em] uppercase mb-1.5"
            style={{ color: "#486B00", fontWeight: 600 }}
          >
            Google Reviews
          </p>
          <h3 className="text-text-primary text-[17px] md:text-[19px] font-medium leading-[1.4] mb-2">
            {headline || "Googleで口コミを書きませんか。"}
          </h3>
          <p className="text-text-secondary text-[13px] md:text-[14px] leading-[1.85] mb-4">
            {description ||
              "これから検討される方への参考に、やまとで建てた感想をひと言。短くて構いません。"}
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-main text-white text-[13px] md:text-[14px] font-medium rounded hover:opacity-90 transition-opacity"
            >
              <Star className="w-4 h-4" strokeWidth={1.5} fill="currentColor" />
              Googleで口コミを書く
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-white text-text-primary text-[13px] md:text-[14px] font-medium rounded hover:border-main transition-colors"
            >
              他の方の口コミを見る
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
