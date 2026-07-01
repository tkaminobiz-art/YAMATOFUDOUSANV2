import Link from "next/link";
import { ArrowRight, CalendarDays, MessageCircle, FileText } from "lucide-react";
import SectionShell from "../_shared/SectionShell";
import Eyebrow from "../_shared/Eyebrow";
import { LINE_ADD_FRIEND_URL } from "@/data/line";

/**
 * FinalCta — 新14「最終CTA」（現S12ベース・14セクション新構成）
 *
 * 役割: 最低摩擦の次の一歩。段=7（決断）。心の段=⑤決断。主タイプ=全。
 * surface=ink（暗面の最後の1つ＝決断マスター）。
 *
 * 主役: 再起動装置＝「まずは、土地込み総額を見てみませんか。」の巨大ゴシック組み（.t-display）を
 *       ink面＋paper白抜きで。煽りでなく総額提示への招待へ。
 *       蛍光なし・動き控えめ・残数/カウントダウンなし・数字ゼロ（1,000件等を置かない）。
 *
 * CTA階段（2段が現実解）: P=LINEで総額を相談する（line-green）＞ S=モデルハウスを見学する（deep-green）
 *       ＞ T=資料請求（tertiary text-link）＞ 電話（footer格・控えめ）。
 * 摩擦除去マイクロコピー（子連れOK・オンライン可・予約なしでも見学可）＋送信後の流れ開示
 *       （「ご希望のペースでご連絡します」＝運用で守れる表現）。
 *
 * モーション: カウントアップしない。M17 CTA hover（矢印 X+4px）のみ。
 *
 * 契約: `export default function FinalCta(): JSX.Element`（props 無し・サーバーコンポーネント既定）。
 */
export default function FinalCta() {
  return (
    <SectionShell
      id="final-cta"
      surface="ink"
      aria-label="次の一歩"
      innerClassName="max-w-[1080px]"
    >
      <Eyebrow light>next step</Eyebrow>

      {/* 再起動装置: 総額提示への招待の巨大組み（paper白抜き）。煽りなし・蛍光なし・静止。 */}
      {/* 直書き<br>は廃止。.t-display の measure＋balance＋auto-phrase で「まずは、」の後を自然改行。 */}
      <h2 className="t-display text-cream">
        まずは、<span className="text-paper">土地込み総額を見てみませんか。</span>
      </h2>

      <p className="mt-7 max-w-[560px] t-body text-cream/80">
        間取り、土地、毎月の支払いを、ばらばらに悩む前に。
        ご希望のエリアと予算から、土地・建物・諸費用をまとめた総額の目安をお見せします。
        土地がまだなくても、予算がまだ固まっていなくても大丈夫です。
      </p>

      {/* CTA階段（LINE ＞ 見学 ＞ 資料 ＞ 電話） */}
      <div className="mt-12">
        {/* 摩擦除去マイクロコピー（CTA直上） */}
        <p className="t-body text-[13px] text-cream/70">
          お子様連れでも、オンラインでもご相談いただけます。ご予約なしでもご見学いただけます。
        </p>

        {/* 第1・第2段: LINE（primary）/ 見学（secondary） */}
        <div className="mt-4 flex w-full flex-col gap-3 sm:flex-row">
          <a
            href={LINE_ADD_FRIEND_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex min-h-[60px] flex-1 items-center justify-center gap-3 bg-line px-7 text-[15px] font-bold text-white"
          >
            <MessageCircle className="h-5 w-5" aria-hidden />
            LINEで総額を相談する
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </a>
          <Link
            href="/reserve"
            className="group inline-flex min-h-[60px] flex-1 items-center justify-center gap-3 border border-cream/40 px-7 text-[15px] font-bold text-cream transition-colors hover:border-cream"
          >
            <CalendarDays className="h-5 w-5" aria-hidden />
            モデルハウスを見学する
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>

        {/* 第3段: 資料請求（tertiary text-link） */}
        <div className="mt-5">
          <Link
            href="/contact"
            className="group inline-flex min-h-[44px] items-center gap-2 text-[14px] font-medium text-cream/75 underline-offset-4 hover:text-cream hover:underline"
          >
            <FileText className="h-4 w-4" aria-hidden />
            資料請求
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </div>

      {/* 送信後の流れ・連絡頻度の開示 ＋ 電話（footer格） */}
      <div className="mt-12 border-t border-cream/15 pt-8">
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="t-eyebrow text-cream/60">after contact</dt>
            <dd className="mt-3 t-body text-[14px] text-cream/80">
              ご連絡をいただいたら、ご希望のペースでお返事します。
              急かすことはありません。まずは総額の目安と次のご案内をお送りします。
            </dd>
          </div>
          <div>
            <dt className="t-eyebrow text-cream/60">by phone</dt>
            <dd className="mt-3 t-body text-[14px] text-cream/80">
              お電話でも承ります。
              <a
                href="tel:0742361123"
                className="ml-1 font-medium text-cream underline-offset-4 hover:underline"
              >
                0742-36-1123
              </a>
              <span className="mt-1 block text-[12px] text-cream/55">
                9:00〜19:00 ／ 火・水定休
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </SectionShell>
  );
}
