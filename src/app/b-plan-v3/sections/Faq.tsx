import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Eyebrow from "../_shared/Eyebrow";
import SectionShell from "../_shared/SectionShell";
import FaqAccordion, { type FaqItem } from "./S11.client";

/**
 * Faq — 新13「FAQ」｜営業の戦場（surface-base 明・機能）。現 S11 を新構成へ移設。
 *
 * 役割: 残存疑念の除去（心の段 ③→⑤）。5問・最重要1問は初期 open。id="faq"。
 * 「送信後の流れ」「営業の頻度」を表で開示する（FAQ をアコーディオンに埋めない＝
 * conversion-sales-rulebook「最大の恐怖を表に」）。CTA なし → 10問以上は /faq へ。
 *
 * 受け入れ基準:
 *  ① 最重要1問が初期 open（defaultOpen の Q）
 *  ② <button aria-expanded/aria-controls>・回答 role="region"・最小高48px・focus-visible 2px
 *  ③ grid-template-rows 0fr→1fr 展開（250–350ms / ease-out）＋chevron rotate(0→180deg)
 *  ④ prefers-reduced-motion で transition 無効（S11.client 側 CSS）
 *  ⑤ Q/A は HTML 実テキスト（SVG 画像文字化なし）・感情断定を Q に使わない
 *
 * default export はサーバーコンポーネント・props 無し。展開状態を持つ部分だけ
 * S11.client（'use client'）の <FaqAccordion> に閉じる。
 *
 * FAQ 文言は canonical（reserve「ご希望のない営業電話や訪問はいたしません」/
 * 「1営業日以内に担当よりご連絡」・money「つなぎ融資 原則発生しません」・
 * costCompareRows「地盤改良費 一切かかりません」）と一致させた実テキスト。
 */

const faqItems: FaqItem[] = [
  {
    id: "faq-flow",
    // 最重要1問＝送信後の流れ・営業頻度の開示（初期 open）
    defaultOpen: true,
    question: "問い合わせをしたら、そのあとはどう進みますか。",
    answer: [
      "ご送信から1営業日以内に、担当よりご連絡します。最初にお伺いするのは、ご希望のエリアと、土地・建物・諸費用を合わせた総額の目安です。",
      "こちらからご希望のない営業電話や訪問をすることはありません。",
    ],
  },
  {
    id: "faq-total",
    question: "土地が決まっていなくても、総額を出してもらえますか。",
    answer: [
      "出せます。ご希望のエリアと条件から、土地込みの総額の目安をお示しします。",
    ],
  },
  {
    id: "faq-addcost",
    question: "見積もりに出ていない追加費用が、あとから増えませんか。",
    answer: [
      "増えにくい仕組みにしています。自社分譲地の地盤改良費はかかりません。つなぎ融資も原則発生しません。",
    ],
  },
  {
    id: "faq-budget",
    question: "予算がまだ固まっていない段階でも相談できますか。",
    answer: [
      "もちろんです。ご相談は無料で、資金計画については1,000件以上の実例があります。",
    ],
  },
  {
    id: "faq-visit",
    question: "モデルハウスの見学は、子ども連れでも大丈夫ですか。",
    answer: [
      "お子様連れでの見学も歓迎しています。ご予約なしでもご見学いただけますが、ご予約いただくとお待たせしません。",
    ],
  },
];

export default function Faq() {
  return (
    <SectionShell id="faq" surface="base" aria-label="よくある質問">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* 左: 見出し（機能的・明面） */}
        <header className="lg:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="t-h2 text-ink">
            相談前の不安に、先にお答えします。
          </h2>
          <p className="t-body mt-5 max-w-prose text-ink-muted">
            総額のこと、追加費用のこと、問い合わせのあとの流れまで。
            よく聞かれることを、そのままお見せします。
          </p>

          <Link
            href="/faq"
            className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-main px-5 text-[15px] font-bold text-main transition-colors duration-200 hover:bg-main hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
          >
            よくある質問をすべて見る
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </header>

        {/* 右: アコーディオン（展開状態を持つので client） */}
        <div className="lg:col-span-8">
          <FaqAccordion items={faqItems} />
        </div>
      </div>
    </SectionShell>
  );
}
