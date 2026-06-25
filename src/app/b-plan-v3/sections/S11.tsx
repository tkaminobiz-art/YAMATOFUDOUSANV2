import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Eyebrow from "../_shared/Eyebrow";
import SectionShell from "../_shared/SectionShell";
import FaqAccordion, { type FaqItem } from "./S11.client";

/**
 * S11 — FAQ｜営業の戦場（§S build card / surface-base 明・機能）。
 *
 * 役割: 残存疑念の除去（心の段 ③→⑤）。5問・最重要1問は初期 open。
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
      "送信いただくと、1営業日以内に担当からご連絡します。最初にお伺いするのは、ご希望のエリアと、土地・建物・諸費用を合わせた総額の目安です。",
      "こちらからご希望のない営業電話や訪問をすることはありません。ご連絡のペースや方法（電話・LINE・メール）は、ご希望に合わせて整えます。",
    ],
  },
  {
    id: "faq-total",
    question: "土地が決まっていなくても、総額を出してもらえますか。",
    answer: [
      "出せます。ご希望のエリアと広さから土地の目安を置き、建物・諸費用まで含めた総額と月々の支払いを一緒に組み立てます。",
      "自社分譲地も扱っているため、土地と建物と月々を一本でご相談いただけます。",
    ],
  },
  {
    id: "faq-addcost",
    question: "見積もりに出ていない追加費用が、あとから増えませんか。",
    answer: [
      "外構・登記・ローン費用や、追加になりやすい仕様まで、契約前に同じ表でご確認いただきます。含まれるものと別途必要なものを、最初にお見せします。",
      "地盤改良費は一切かかりません。つなぎ融資も、自社分譲地と建物を一体で進めるため原則発生しません。",
    ],
  },
  {
    id: "faq-budget",
    question: "予算がまだ固まっていない段階でも相談できますか。",
    answer: [
      "相談は無料です。予算が固まっていなくても大丈夫です。今のお住まいの家賃や、無理のない月々から逆算して、届く総額をご一緒に整えます。",
      "資金計画のご相談は1,000件以上の実例があります。まずは目安を見るところから始められます。",
    ],
  },
  {
    id: "faq-visit",
    question: "モデルハウスの見学は、子ども連れでも大丈夫ですか。",
    answer: [
      "お子様連れでの見学も歓迎しています。ご予約なしでもご見学いただけますが、ご予約いただくと待ち時間なくご案内できます。",
      "標準装備を実物でご確認いただいたうえで、変えたい部分だけをオプションでお選びいただけます。",
    ],
  },
];

export default function S11() {
  return (
    <SectionShell id="faq" surface="base" aria-label="よくある質問">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* 左: 見出し（機能的・明面） */}
        <header className="lg:col-span-4">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="t-h2 text-ink">
            気になることは、
            <br className="hidden sm:block" />
            先にお答えします。
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
