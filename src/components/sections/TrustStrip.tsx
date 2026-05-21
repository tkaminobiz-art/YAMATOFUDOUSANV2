import { Repeat, MonitorSmartphone, PhoneOff, type LucideIcon } from "lucide-react";

/*
  TrustStrip — 2026-05-04
  ---------------------------------------------------------------
  参考: やまと家計設計LP の FV 直下「3バッジ不安解消」セット。
  目的: Hero の CTA で動かなかった見込み客に対し、ScaleBanner の数字訴求に入る前に
       「ご相談時の摩擦は低い」ことを一行で先回りして伝える。

  Hero CTA sublabel にない情報を載せる:
    - 何度でも (Repeat)
    - オンライン対応 (MonitorSmartphone)
    - 営業電話なし (PhoneOff)

  ScaleBanner の "バーン" を阻害しないよう、極薄一行・無見出し・控えめトーンに留める。
*/

type Trust = { Icon: LucideIcon; label: string };

const TRUST: readonly Trust[] = [
  { Icon: Repeat, label: "何度でも相談無料" },
  { Icon: MonitorSmartphone, label: "オンラインでもご相談いただけます" },
  { Icon: PhoneOff, label: "ご希望のない営業はいたしません" },
];

export default function TrustStrip() {
  return (
    <section
      aria-label="ご相談時のお約束"
      className="font-murecho bg-bg-primary border-b border-[var(--color-border)]"
    >
      <div className="max-w-[1180px] mx-auto px-[var(--page-px)] py-4 md:py-5">
        <ul className="flex flex-wrap items-center justify-center gap-x-7 sm:gap-x-12 lg:gap-x-20 gap-y-2.5">
          {TRUST.map(({ Icon, label }) => (
            <li
              key={label}
              className="inline-flex items-center gap-2 text-text-secondary"
            >
              <Icon
                className="w-[15px] h-[15px] text-main shrink-0"
                strokeWidth={1.75}
              />
              <span className="text-[12.5px] sm:text-[13.5px] tracking-[0.04em]">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
