import Image from "next/image";
import { COMPANY_NAME } from "@/data/brand-facts";

/**
 * V3Footer — /b-plan-v3 ルート専用フッター。
 *
 * 共有 src/components/Footer.tsx は変更しない（このルートに閉じる）。
 * 黒面は ink 一本（#1D1D18 = --color-ink / surface-ink）。
 * 下部 padding は SP固定CTAバー分を確保（BottomCtaBar と同梱で使う前提）。
 */
export default function V3Footer() {
  return (
    <footer className="surface-ink px-5 pb-28 pt-12 md:px-10 md:pb-12 xl:px-14">
      <div className="mx-auto flex max-w-[1380px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <Image
          src="/images/logo.png"
          alt="やまと不動産"
          width={190}
          height={42}
          className="h-8 w-auto bg-white px-2 py-1"
        />
        <p className="t-body text-[12px] leading-relaxed text-cream/55">
          {COMPANY_NAME} / 奈良県奈良市大宮町1丁目6番21 / TEL: 0742-36-1123
        </p>
      </div>
    </footer>
  );
}
