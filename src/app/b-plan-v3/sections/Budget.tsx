"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import BurnNumber from "../_shared/BurnNumber";
import { paymentCases, type PaymentCase } from "../_data";

/**
 * Budget — 新6「予算・月々」｜クライマックス（14セクション新構成）。
 *
 * 現S05の分割の前半。相互証明矢印バー＋見出し＋paymentCasesカード（月々バーン）＋
 * 試算前提注記＋運用事実 deep-green帯を移植。投資哲学エッセンス（家賃 vs ローン）は
 * 分割の後半 RentVsLoan.tsx に譲るため本ファイルには持ち込まない。
 *
 * surface=ink（暗面）／id="payment"。役割=③数字→月々の意味へ翻訳・段=頂点。
 * 主役: Case月々を BurnNumber countUp で巨大表示（叫ぶ②）。総額/内訳/返済比率は静止（countUpなし）。
 *
 * 二度打ち規律: countUp を使うのは本ファイルの「月々」だけ。RentVsLoan.tsx では countUp を使わない。
 * countUp が要るためファイル全体を 'use client' 化（page.tsx は props 無しで import 済）。
 * 反復CTAは page.tsx 側で本セクション直後に RepeatCtaBlock を挟むため、内部には置かない。
 * 詳細導線は /money#payment-examples の text-link のみ。
 *
 * 契約: `export default function Budget(): JSX.Element`（props 無し）。
 * 実データ（顧客名・年収・総額・月々・内訳・返済比率）は改変禁止。
 */

// 内訳セグメント（深緑濃淡の段積みバー）。色は @theme トークンのみ。
const SEG_META = [
  { key: "建物", pick: (p: PaymentCase) => p.parts.building, cls: "bg-main-dark text-cream" },
  { key: "土地", pick: (p: PaymentCase) => p.parts.land, cls: "bg-main text-cream" },
  { key: "諸費用", pick: (p: PaymentCase) => p.parts.fee, cls: "bg-main-light text-lime-darker" },
] as const;

function PaymentCard({ item }: { item: PaymentCase }) {
  const total = item.parts.building + item.parts.land + item.parts.fee;

  return (
    <article className="overflow-hidden rounded-[6px] border border-cream/15 bg-white/[0.03]">
      <div className="grid lg:grid-cols-[1.16fr_0.84fr]">
        <div className="p-6 md:p-9 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="t-num inline-flex border border-cream/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
              {item.no}
            </span>
            <span className="t-body text-[12px] leading-[1.6] text-cream/65">
              {item.customer}
            </span>
          </div>

          <p className="t-body mt-4 text-[14px] leading-[1.9] text-cream/85">
            {item.concern}
          </p>

          {/* 月々＝クライマックスの主役（カウントアップ＝叫ぶ②）。deep-green結論帯で視線停止点に */}
          <div className="mt-7 flex flex-col gap-4 rounded-[6px] bg-main px-6 py-6 sm:flex-row sm:items-end">
            <div>
              <p className="t-eyebrow text-cream/80">monthly payment</p>
              <p className="mt-2 flex items-baseline gap-2 text-cream">
                <BurnNumber
                  value={item.monthlyNum}
                  countUp
                  duration={1400}
                  burnClassName="!text-[clamp(46px,8vw,82px)] leading-none"
                  suffix="円 / 月"
                  suffixClassName="text-[15px] font-bold"
                  aria-label={`月々の返済目安 ${item.monthly}円`}
                />
              </p>
            </div>
            <p className="t-body ml-auto pb-1 text-left text-[12px] leading-[1.7] text-cream/80 sm:text-right">
              土地込み総額 {item.total}万円
              <br />
              返済比率 {item.ratio}
            </p>
          </div>

          {/* 内訳＝深緑濃淡の段積みバー（価格は静止・カウントしない） */}
          <div className="mt-6">
            <div className="flex h-9 w-full overflow-hidden rounded-[4px]">
              {SEG_META.map((s) => {
                const v = s.pick(item);
                const ratio = v / total;
                return (
                  <div
                    key={s.key}
                    className={`flex items-center justify-center text-[11px] font-bold ${s.cls}`}
                    style={{ width: `${(ratio * 100).toFixed(1)}%` }}
                  >
                    {ratio > 0.13 ? s.key : ""}
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
              {SEG_META.map((s) => (
                <span key={s.key} className="t-body inline-flex items-center gap-1.5 text-[12px] text-cream/85">
                  <span
                    className={`inline-block h-2.5 w-2.5 rounded-[2px] ${s.cls.split(" ")[0]}`}
                    aria-hidden
                  />
                  {s.key} {s.pick(item).toLocaleString("ja-JP")}万円
                </span>
              ))}
            </div>
          </div>

          <p className="t-h3 mt-7 max-w-[640px] text-[17px] leading-[1.7] text-cream md:text-[19px]">
            {item.headline}
          </p>

          <div className="mt-7 grid grid-cols-3 gap-px border border-cream/15 bg-cream/15">
            {[
              ["家族", item.family],
              ["年収", item.income],
              ["プラン", item.plan],
            ].map(([label, value]) => (
              <div key={label} className="bg-ink p-3.5">
                <p className="t-eyebrow text-cream/60">{label}</p>
                <p className="t-body mt-1.5 text-[12px] leading-[1.5] text-cream">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <figure className="relative min-h-[240px] lg:min-h-full">
          <Image
            src={item.image}
            alt={`${item.customer}の住まいの実例`}
            fill
            className="object-cover"
            sizes="(min-width:1024px) 38vw, 100vw"
          />
        </figure>
      </div>
    </article>
  );
}

export default function Budget() {
  return (
    <SectionShell id="payment" surface="ink" aria-label="年収ではなく月々の無理なさで考える予算と月々の目安">
      {/* 相互証明矢印（土地→建物→総額→月々の導入図・蛍光なし・deep-green/lime点） */}
      <div
        className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2 text-cream/75"
        aria-hidden
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-1.5 text-[12px] font-bold tracking-[0.04em]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
          土地
        </span>
        <ArrowLeftRight className="h-4 w-4 text-cream/50" />
        <span className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-4 py-1.5 text-[12px] font-bold tracking-[0.04em]">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-lime" />
          建物
        </span>
        <ArrowRight className="h-4 w-4 text-main-light/70" />
        <span className="inline-flex items-center gap-2 rounded-full border border-main bg-main px-4 py-1.5 text-[12px] font-bold tracking-[0.04em] text-cream">
          土地込み総額
        </span>
        <ArrowRight className="h-4 w-4 text-main-light/70" />
        <span className="inline-flex items-center gap-2 rounded-full border border-main bg-main px-4 py-1.5 text-[12px] font-bold tracking-[0.04em] text-cream">
          月々
        </span>
      </div>

      <div className="max-w-[980px]">
        <Eyebrow light>total &amp; monthly payment</Eyebrow>
        <h2 className="t-h2 text-cream">
          年収ではなく、月々の無理なさで考える。
        </h2>
        <p className="t-body mt-6 max-w-[820px] text-[16px] leading-[1.95] text-cream/85">
          家を建てられるかどうかは、建物価格だけでは判断できません。大切なのは、土地込み総額で見たときに、毎月の支払いが無理なく続けられるかどうか。ご家族の年収、暮らし方、希望エリアに合わせて、現実的な資金計画をご一緒に確認します。
        </p>
        <Link
          href="/money#payment-examples"
          className="group mt-7 inline-flex items-center gap-3 border-b border-cream/40 pb-1 text-[14px] font-bold text-cream transition hover:border-cream"
        >
          詳しい試算の例を見る
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>

      {/* 3事例（月々カウントアップ・価格静止） */}
      <div className="mt-12 flex flex-col gap-7 md:mt-16 lg:gap-9">
        {paymentCases.map((item) => (
          <PaymentCard key={item.no} item={item} />
        ))}
      </div>

      {/* 試算前提注記（必須・常設・煽り無し・景表） */}
      <p className="t-body mt-8 max-w-[920px] text-[11px] leading-[1.85] tracking-[0.06em] text-cream/60">
        ※表示は試算用に金利1.0%・35年・元利均等・ボーナス払いなしで計算した一例です。実際の適用金利・審査条件・土地条件によって変わります。
      </p>

      {/* 運用事実 deep-green帯（虚偽煽り禁止・事実スロット）。概算入力ツールは枠のみ＝後日承認後に中身を追加 */}
      <div className="mt-10 flex flex-col gap-4 rounded-[6px] bg-main px-6 py-6 text-cream md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <span className="t-eyebrow text-cream/80">今ご確認いただけること</span>
          <span className="t-body text-[13px] font-bold text-cream">
            土地込み総額の試算 ・ 月々の目安 ・ 諸費用まで含めたお見積り
          </span>
        </div>
        {/* 自分ごと化の概算入力ツール＝承認後追加（初期は枠／データスロットのみ） */}
        <div
          data-slot="quick-estimate-input"
          className="hidden"
          aria-hidden
        />
      </div>
    </SectionShell>
  );
}
