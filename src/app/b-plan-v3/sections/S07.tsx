import Link from "next/link";
import { ArrowRight, MapPin, MessageCircle } from "lucide-react";
import Eyebrow from "../_shared/Eyebrow";
import SectionShell from "../_shared/SectionShell";
import BurnNumber from "../_shared/BurnNumber";
import { LINE_ADD_FRIEND_URL } from "@/data/line";
import { PARCELS_HELD } from "@/data/brand-facts";
import LandMarquee from "./S07.client";

/**
 * S07 — ★土地から始める｜土地迷子専用（新設）。
 *
 * 契約: `export default function S07(): JSX.Element`（props 無し・サーバーコンポーネント既定）。
 * surface=base（§3.3 中・柔証明）＋ lime 8% ティント overlay（旧セージ翻訳）。
 * 役割=③土地側＝常時150区画程度。段=4。心の段=②→④（T4 欠落補填＝最優先実装・12-rate 動線3の核）。
 *
 * フレームワーク §S S07 ビルドカード:
 *  - 主役: t-h2「土地探しで家づくりを止めない」＋ 150 を主役級バーン
 *    （S03 の 600 とは別軸＝二度打ちでない。叫ぶ M4/M16 制約のため countUp はしない＝静止表示）。
 *  - 写真マーキー（分譲地の規模感・FV主役NG・S07 の帯はOK・純CSS PC36s/SP44s・
 *    hover/focus-within 停止・reduced-motion 静止＋overflow-x:auto）→ S07.client の LandMarquee。
 *  - 運用事実 deep-green 帯＝「未公開土地 ◯区画 動きあり」事実スロット（虚偽煽り禁止）。
 *  - 地図UI（専務② 他府県も含む）。
 *  - CTA: 未公開土地 LINE「土地から相談」（別文脈CTA・LINE_ADD_FRIEND_URL import）。下層=/lots。
 *
 * 数値ドリフト封じ: 本文で「常時150区画程度＝会社全体の常時保有数」「矢田町76区画＝個別分譲地の一例」を
 * 明記し 150 と 76 を混同させない（76 はバーンにしない・本文の文脈語のみ）。
 */

/* ── マーキー用 実写真（自社分譲地 allowlist・public/images/lots/）── */
const LAND_PHOTOS: { src: string; alt: string }[] = [
  { src: "/images/lots/70236294_1.webp", alt: "やまと不動産の自社分譲地（整備された区画）" },
  { src: "/images/lots/53153639_1.webp", alt: "やまと不動産の自社分譲地（造成された宅地）" },
  { src: "/images/lots/48169016_1.webp", alt: "やまと不動産の自社分譲地（住宅地の街並み）" },
  { src: "/images/lots/76342779_1.webp", alt: "やまと不動産の自社分譲地（区画と前面道路）" },
  { src: "/images/lots/70419094_1.webp", alt: "やまと不動産の自社分譲地（更地の宅地）" },
  { src: "/images/lots/61402761_1.webp", alt: "やまと不動産の自社分譲地（分譲地の全景）" },
  { src: "/images/lots/66175475_1.webp", alt: "やまと不動産の自社分譲地（区画割りされた土地）" },
  { src: "/images/lots/58198961_1.webp", alt: "やまと不動産の自社分譲地（住宅用地）" },
];

/* ── 地図UI（専務② 他府県も含む）──
   AI 完成予想図でなく、対応エリアを示す抽象ピン配置（純CSS・実データの枠）。
   奈良市・大和郡山市を中心に、京都南部・近隣府県まで土地をお探しできることを示す。 */
const AREA_PINS: { label: string; x: number; y: number; main?: boolean }[] = [
  { label: "京都南部", x: 58, y: 24 },
  { label: "奈良市", x: 52, y: 46, main: true },
  { label: "大和郡山市", x: 46, y: 58, main: true },
  { label: "生駒・近隣", x: 30, y: 50 },
  { label: "近隣府県", x: 72, y: 64 },
];

function AreaMap() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-main/15 bg-paper">
      {/* eyebrow 帯 */}
      <div className="flex items-center gap-2 border-b border-main/12 px-5 py-4">
        <MapPin className="h-4 w-4 text-main" aria-hidden />
        <span className="t-eyebrow text-main">Service Area</span>
      </div>

      {/* 抽象マップ面（実地図ではなく対応エリアの位置関係を示す図） */}
      <div
        className="relative aspect-[4/3] w-full"
        role="img"
        aria-label="やまと不動産が土地をお探しする対応エリア：奈良市・大和郡山市を中心に、京都南部や近隣府県まで。"
      >
        {/* 背景の柔らかな等高線風グリッド（混色のみ・新hexなし） */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 52%, color-mix(in srgb, var(--color-lime) 18%, transparent), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in srgb, var(--color-main) 10%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--color-main) 10%, transparent) 1px, transparent 1px)",
            backgroundSize: "13% 13%",
          }}
        />
        {/* ピン */}
        {AREA_PINS.map((p) => (
          <div
            key={p.label}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            <div className="flex flex-col items-center gap-1.5">
              <span
                aria-hidden
                className={
                  p.main
                    ? "block h-3.5 w-3.5 rounded-full bg-main ring-4 ring-lime/45"
                    : "block h-2.5 w-2.5 rounded-full bg-main/55"
                }
              />
              <span
                className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-bold tracking-[0.02em] ${
                  p.main
                    ? "bg-main text-cream"
                    : "bg-paper/90 text-ink-muted ring-1 ring-main/15"
                }`}
              >
                {p.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      <p className="t-body border-t border-main/12 px-5 py-4 text-[13px] text-ink-muted">
        奈良市・大和郡山市を中心に、京都南部や近隣府県まで。
        ご希望の通学区・予算・広さに合う土地から、ご一緒にお探しします。
      </p>
    </div>
  );
}

export default function S07() {
  return (
    <SectionShell
      id="land"
      surface="base"
      aria-label="土地から始める"
      className="surface-base"
      innerClassName=""
    >
      {/* lime 8% ティント overlay（旧セージ翻訳・base+lime）。混色のみ・新hexなし。 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "color-mix(in srgb, var(--color-lime) 8%, transparent)",
        }}
      />

      <div className="relative">
        <header className="max-w-3xl">
          <Eyebrow>Land First</Eyebrow>
          <h2 className="t-h2">
            土地探しで、
            <br className="hidden sm:block" />
            家づくりを止めない。
          </h2>
          <p className="t-body mt-6 max-w-2xl text-ink/85">
            「いい土地が見つからない」で家づくりが止まってしまう——
            土地から考える方に、いちばん多いお悩みです。
            やまとは自社で土地を仕入れ、常時たくさんの区画を持っています。
            建物の話と土地の話を、切り離さずにご一緒に整えます。
          </p>
        </header>

        {/* ── 150 主役級バーン（静止・countUp しない＝叫ぶは S03/S05 の2箇所制約）── */}
        <div className="mt-12 grid grid-cols-1 items-end gap-8 border-t border-main/15 pt-10 md:grid-cols-[auto_1fr]">
          <div>
            <p className="t-eyebrow text-main mb-3">Parcels Held</p>
            <BurnNumber
              value={PARCELS_HELD}
              countUp={false}
              suffix={
                <span className="t-burn-sub text-ink-muted">区画程度</span>
              }
              burnClassName="text-main"
              aria-label={`自社分譲地を常時${PARCELS_HELD}区画程度保有`}
            />
            <p className="t-body mt-3 text-[14px] text-ink-muted">
              ＝会社全体で<strong className="font-bold text-ink">常時</strong>持っている区画数の目安です。
            </p>
          </div>

          {/* 数値ドリフト封じ: 150（会社全体・常時保有）と 76（矢田町＝個別分譲地の一例）を分離 */}
          <div className="rounded-sm border border-main/15 bg-paper/70 px-6 py-6">
            <p className="t-body text-[14px] text-ink/85">
              この
              <span className="t-num mx-1 align-baseline text-main">{PARCELS_HELD}</span>
              区画程度は、いま会社が常に持っている土地のストックの目安です。
              たとえば大和郡山市・矢田町の分譲地はその一つで、76区画。
              「常時150区画程度」は会社全体の保有数、「矢田町76区画」は個別の分譲地——
              数え方が違うのでご注意ください。
            </p>
          </div>
        </div>

        {/* ── 写真マーキー（分譲地の規模感・純CSS PC36s/SP44s・hover停止・reduced-motion静止）── */}
        <div className="mt-12">
          <p className="t-eyebrow text-main mb-5">Our Land</p>
          <LandMarquee photos={LAND_PHOTOS} />
        </div>

        {/* ── 地図UI ＋ 運用事実帯 ＋ 未公開土地 LINE ── */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
          <AreaMap />

          <div className="flex flex-col gap-6">
            {/* 運用事実 deep-green 帯（事実スロット・虚偽煽り禁止） */}
            <div className="rounded-sm bg-main-dark px-6 py-6 text-cream">
              <p className="t-eyebrow text-lime mb-3">Now Available</p>
              <p className="t-h3 text-cream">
                サイトに出していない土地も、動いています。
              </p>
              <p className="t-body mt-3 text-cream/80">
                公開前の区画は、条件が合う方へ先にご案内しています。
                「この通学区で」「この予算で」など、ご希望をお預かりしておくと、
                土地が出たタイミングでお知らせできます。
              </p>
            </div>

            {/* 未公開土地 LINE（12-rate 動線3の核・別文脈CTAとして独立カウント） */}
            <div className="rounded-sm border border-main/20 bg-paper px-6 py-6">
              <p className="t-body text-[14px] text-ink-muted">
                土地はこれから、でも大丈夫です。ご希望だけ先にお預かりします。
              </p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={LINE_ADD_FRIEND_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[56px] flex-1 items-center justify-center gap-3 bg-line px-7 text-[15px] font-bold text-white"
                >
                  <MessageCircle className="h-5 w-5" aria-hidden />
                  土地から相談する
                  <ArrowRight
                    className="h-4 w-4 transition group-hover:translate-x-1"
                    aria-hidden
                  />
                </a>
                <Link
                  href="/lots"
                  className="inline-flex min-h-[56px] items-center justify-center gap-2 border border-main px-7 text-[15px] font-bold text-main"
                >
                  自社分譲地を見る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
