import Link from "next/link";
import { ArrowRight, ArrowLeftRight } from "lucide-react";
import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import RevealGroup from "../_shared/RevealGroup";
import {
  ChipRow,
  DataBar,
  LedgerRow,
  PhotoTile,
  StatCard,
} from "../_shared/bento";
import { paymentCases, type PaymentCase } from "../_data";

/**
 * Budget — 新6「予算・月々」｜クライマックス（Phase A パイロット: スタットボード化）。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆compaction §6 /
 * ◆system / ◆motion / ◆synthesis（裁定4/7・§3監査・AD確定）。
 *
 * 巨大 PaymentCard×3 縦積みを解体し、「行=指標・列=Case」の1枚台帳スタットボードへ:
 * - 列見出し（Case no + customer）→ 写真（PhotoTile 16/9・小）→ 総額/返済比率 →
 *   内訳（DataBar stack + 凡例）→ 家族/年収/プラン（LedgerRow 群）→
 *   headline / concern（ChipRow quote の引用扱い）。
 * - 月々だけ bg-main の結論帯を「行として全幅」に通し（列外・均等カード3枚に見せない）、
 *   3つの StatCard tier="hero"（BurnNumber 内包）で countUp を維持する。
 * - 罫は lg で gap-px 透かし罫（bento-hair-dark）＋外周は上2px/下1pxのみ（左右開放・
 *   radius 0・影なし）。行の hairline が3列を貫く=台帳が主、カードではない。
 *
 * SP（AD確定）: タッチ×motion-safe×lg未満のみ scroll-snap の列スワイプ
 * （84vw・snap-center・次列をのぞかせる）。月々帯・試算前提注記・運用事実 main帯は
 * 列外の全幅で常時可視（景表: 注記をスワイプで隠さない）。非タッチ / reduced-motion は
 * CSS のみで縦積みフォールバック（lg はグリッド3列ボード）。
 *
 * 二度打ち規律: countUp は本ファイルの「月々」3値（StatCard tier="hero"）だけ。
 * 総額・内訳・返済比率は静止。DataBar の伸長は countUp と無関係（RevealGroup の
 * IO once 駆動・reduced-motion/JS無効は静止全表示）。IO はセクションで
 * RevealGroup 1 + countUp 用（useCountUp 内蔵）のみ。
 *
 * 頂点の相互証明矢印ピル列は「フロー専用・現状維持」（◆synthesis 裁定7・既承認実装）。
 * 反復CTAは page.tsx 側で本セクション直後に挟むため内部には置かない。
 * 詳細導線は /money#payment-examples の text-link のみ。
 *
 * 契約: `export default function Budget(): JSX.Element`（props 無し・サーバーコンポーネント。
 * countUp は StatCard→BurnNumber 側の client 境界に封じたため 'use client' 不要）。
 * 実データ（顧客名・年収・総額・月々・内訳・返済比率）は _data.ts paymentCases のみを
 * 参照し改変禁止（本ファイルに数値リテラルを持たない）。
 */

/* 内訳セグメント（深緑濃淡・DataBar stack の入力と凡例）。色は @theme トークンのみ。 */
const SEG_META = [
  {
    key: "建物",
    pick: (p: PaymentCase) => p.parts.building,
    tone: "main-dark",
    swatch: "bg-main-dark",
  },
  {
    key: "土地",
    pick: (p: PaymentCase) => p.parts.land,
    tone: "main",
    swatch: "bg-main",
  },
  {
    key: "諸費用",
    pick: (p: PaymentCase) => p.parts.fee,
    tone: "main-light",
    swatch: "bg-main-light",
  },
] as const;

/**
 * CaseColumn — 1事例=1列。lg では親グリッドの行トラックに subgrid で吸着し、
 * 7行（見出し/写真/総額/内訳/属性/ひとこと/きっかけ）が3列で水平に揃う。
 * SP スワイプ時は 84vw の snap 列。行間は divide-y の hairline（lg は gap-px 罫に交代）。
 */
function CaseColumn({ item }: { item: PaymentCase }) {
  /* SP列スワイプの発火条件（AD確定）: lg未満 × motion-safe × タッチ主体
     （max-lg:pointer-coarse:motion-safe:*）。非タッチ / reduced-motion は
     base の grid 縦積みが残る（CSSのみのフォールバック）。 */
  return (
    <article className="divide-y divide-cream/15 max-lg:pointer-coarse:motion-safe:w-[84vw] max-lg:pointer-coarse:motion-safe:max-w-[440px] max-lg:pointer-coarse:motion-safe:shrink-0 max-lg:pointer-coarse:motion-safe:snap-center lg:row-span-7 lg:grid lg:grid-rows-subgrid lg:divide-y-0">
      {/* 行1: 列見出し（Case no + customer） */}
      <header className="flex flex-wrap items-center gap-3 bg-ink p-[clamp(16px,1.6vw,28px)]">
        <span className="t-num inline-flex border border-cream/30 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
          {item.no}
        </span>
        <span className="t-body text-[12px] leading-[1.6] text-cream/65">
          {item.customer}
        </span>
      </header>

      {/* 行2: 実例写真（小・allowlist の payment-cases） */}
      <PhotoTile
        src={item.image}
        alt={`${item.customer}の住まいの実例`}
        sizes="(min-width:1024px) 30vw, 84vw"
        aspect="16/9"
        className="bg-ink"
      />

      {/* 行3: 総額/返済比率（静止・countUpなし） */}
      <p className="t-body bg-ink px-[clamp(16px,1.6vw,28px)] py-4 text-[12px] leading-[1.7] text-cream/80">
        <span className="block">土地込み総額 {item.total}万円</span>
        <span className="block">返済比率 {item.ratio}</span>
      </p>

      {/* 行4: 内訳＝DataBar stack（価格は静止）＋凡例 */}
      <div className="bg-ink px-[clamp(16px,1.6vw,28px)] py-5">
        <DataBar
          variant="stack"
          segments={SEG_META.map((s) => ({
            label: s.key,
            value: s.pick(item),
            tone: s.tone,
          }))}
        />
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
          {SEG_META.map((s) => (
            <span
              key={s.key}
              className="t-body inline-flex items-center gap-1.5 text-[12px] text-cream/85"
            >
              <span
                className={`inline-block h-2.5 w-2.5 rounded-[2px] ${s.swatch}`}
                aria-hidden
              />
              {s.key} {s.pick(item).toLocaleString("ja-JP")}万円
            </span>
          ))}
        </div>
      </div>

      {/* 行5: 家族/年収/プラン（LedgerRow 群・台帳行） */}
      <dl className="divide-y divide-cream/10 bg-ink px-[clamp(16px,1.6vw,28px)] py-1">
        {(
          [
            ["家族", item.family],
            ["年収", item.income],
            ["プラン", item.plan],
          ] as const
        ).map(([label, value]) => (
          <LedgerRow
            key={label}
            weight="light"
            secondary
            term={<span className="t-eyebrow text-cream/60">{label}</span>}
            description={
              <span className="t-body text-[12px] leading-[1.5] text-cream">
                {value}
              </span>
            }
          />
        ))}
      </dl>

      {/* 行6: ひとこと（headline・引用扱い＝左罫のみ・枠なし） */}
      <div className="bg-ink px-[clamp(16px,1.6vw,28px)] py-5">
        <ChipRow
          variant="quote"
          tone="dark"
          chips={[
            {
              label: (
                <span className="t-h3 text-[15px] leading-[1.75] text-cream md:text-[17px]">
                  {item.headline}
                </span>
              ),
            },
          ]}
        />
      </div>

      {/* 行7: きっかけ（concern・引用扱い・muted） */}
      <div className="bg-ink px-[clamp(16px,1.6vw,28px)] pb-6 pt-4">
        <ChipRow
          variant="quote"
          tone="dark"
          chips={[
            {
              label: (
                <span className="text-[12px] leading-[1.8] text-cream/65">
                  {item.concern}
                </span>
              ),
            },
          ]}
        />
      </div>
    </article>
  );
}

export default function Budget() {
  return (
    <SectionShell id="payment" surface="ink" aria-label="年収ではなく月々の無理なさで考える予算と月々の目安">
      {/* 相互証明矢印（土地→建物→総額→月々の導入図・蛍光なし・deep-green/lime点）
          rounded-full はフロー専用として現状維持（◆synthesis 裁定7） */}
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

      {/* スタットボード（3事例・行=指標の1枚台帳）。外周は上2px/下1pxの開放罫のみ。
          RevealGroup=本セクション唯一の IO（DataBar の .bento-bar-grow 駆動）。 */}
      <RevealGroup>
        <div className="mt-12 border-b border-b-cream/15 border-t-2 border-t-cream/40 md:mt-16">
          <div className="bento-hair bento-hair-dark grid snap-x snap-mandatory grid-cols-1 gap-y-12 scroll-px-5 max-lg:pointer-coarse:motion-safe:-mx-5 max-lg:pointer-coarse:motion-safe:flex max-lg:pointer-coarse:motion-safe:gap-4 max-lg:pointer-coarse:motion-safe:overflow-x-auto max-lg:pointer-coarse:motion-safe:px-5 max-lg:pointer-coarse:motion-safe:pb-3 lg:grid-cols-3 lg:gap-px lg:bg-[color:var(--bento-hair)]">
            {paymentCases.map((item) => (
              <CaseColumn key={item.no} item={item} />
            ))}
          </div>

          {/* 月々＝クライマックスの結論帯（列外・全幅で常時可視）。
              countUp はこの3値のみ（StatCard tier="hero"＝BurnNumber 内包・叫ぶ②）。 */}
          <div className="grid grid-cols-1 divide-y divide-cream/20 bg-main text-cream lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {paymentCases.map((item) => (
              <div key={item.no} className="p-[clamp(16px,1.6vw,28px)]">
                <StatCard
                  tier="hero"
                  tone="dark"
                  label="monthly payment"
                  value={item.monthlyNum}
                  countUp
                  countUpDuration={1400}
                  unit={<span className="text-[15px] font-bold">円 / 月</span>}
                  aria-label={`月々の返済目安 ${item.monthly}円`}
                  /* ◆compaction §6(b) 指定の縮小（帯内3連のため .t-burn 既定より一段下げる） */
                  burnClassName="!text-[clamp(40px,4.5vw,64px)] leading-none"
                />
              </div>
            ))}
          </div>
        </div>
      </RevealGroup>

      {/* 試算前提注記（必須・常設・煽り無し・景表）。列スワイプの外・全幅固定 */}
      <p className="t-body mt-8 max-w-[920px] text-[11px] leading-[1.85] tracking-[0.06em] text-cream/60">
        ※表示は試算用に金利1.0%・35年・元利均等・ボーナス払いなしで計算した一例です。実際の適用金利・審査条件・土地条件によって変わります。
      </p>

      {/* 運用事実 deep-green帯（虚偽煽り禁止・事実スロット・列外全幅）。概算入力ツールは枠のみ＝後日承認後に中身を追加 */}
      <div className="mt-10 flex flex-col gap-4 rounded-[4px] bg-main px-6 py-6 text-cream md:flex-row md:items-center md:justify-between">
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
