import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

/*
  HeroEditorial — 2026-05-08 v1
  ---------------------------------------------------------------
  ユーザー (アートディレクター) の基準カンプを忠実に React/CSS で再現する版。
  方針:
  - 写真主役の建築誌・エディトリアル Hero
  - フルブリード写真 + 左側ペーパー白グラデーションオーバーレイ
  - 写真は画面の 60〜70% を占める印象
  - 価格は主役にしない (細い罫線で区切った静かな情報として配置)
  - CTA は 2 つまで (深緑フィル / 黒線アウトライン、両方とも直角コーナー)
  - 実績数字は本コンポーネント外 (TrustMetricsEditorial 側で Hero 直下に配置)

  禁止 (再発防止のため明示):
  - 50/50 の左右分割に戻す
  - 大きな価格カード
  - 角丸 / 強い影 / SaaS 風 UI
  - 葉アイコン (ロゴのブランドマーク以外)
  - 生成画像内の日本語をそのまま使う

  写真パス:
  - 暫定: /images/newsozai/interior-ldk-01.webp (許可済アセット)
  - 最終: 実写施工写真へ差し替え予定 (BRAND-TRUTH §1 Photo allowlist 内のみ)
*/

const HERO_PHOTO = {
  src: "/images/newsozai/interior-ldk-01.webp",
  alt: "やまと不動産の住まい — 自然光の差し込む LDK",
};

export default function HeroEditorial() {
  return (
    <section
      aria-labelledby="hero-editorial-heading"
      className="relative w-full bg-[#F4EFE6] md:min-h-[720px] lg:min-h-[760px]"
    >
      {/* 写真ゾーン:
          mobile = 上部に aspect-[16/10] で積む
          md+    = フルブリード背景 + 左側にペーパー白グラデーションを乗せる */}
      <div className="relative aspect-[16/10] w-full md:absolute md:inset-0 md:aspect-auto md:h-full">
        <Image
          src={HERO_PHOTO.src}
          alt={HERO_PHOTO.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover md:object-right"
        />
        {/* デスクトップのみ: 左 → 右のペーパー白グラデーション (テキストの可読性確保) */}
        <div
          aria-hidden
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #F4EFE6 0%, #F4EFE6 28%, rgba(244,239,230,0.92) 40%, rgba(244,239,230,0.55) 50%, rgba(244,239,230,0) 60%)",
          }}
        />
      </div>

      {/* テキストコンテンツ */}
      <div className="relative md:absolute md:inset-0 md:flex md:items-center">
        <div className="mx-auto w-full max-w-[1400px] px-[var(--page-px)] py-12 md:py-20">
          <div className="max-w-[560px]">
            {/* eyebrow: 編集誌的セクションラベル — 唯一の深緑アクセント */}
            <p
              className="text-[10px] tracking-[0.32em] uppercase text-[#3E5538]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="inline-block border-b border-[#3E5538] pb-1">
                01 — HOUSES
              </span>
            </p>

            {/* H1: 明朝大見出し / 編集誌スケール */}
            <h1
              id="hero-editorial-heading"
              className="mt-7 md:mt-8 text-[#1A1815]"
              style={{
                fontFamily: "var(--font-shippori)",
                fontSize: "clamp(38px, 5.4vw, 60px)",
                fontWeight: 500,
                letterSpacing: "0.02em",
                lineHeight: 1.35,
              }}
            >
              土地を読み、
              <br />
              暮らしを建てる。
            </h1>

            {/* Subcopy: 短く・読みやすく */}
            <p
              className="mt-6 md:mt-7 text-[14px] md:text-[15px] text-[#5E5A50]"
              style={{ lineHeight: 2 }}
            >
              奈良・京都南部で、土地探しから資金計画、建物まで。
              <br />
              総額で見える家づくりを、地域密着で支えます。
            </p>

            {/* 細い罫線 — 価格を「静かな情報」として区切る */}
            <div aria-hidden className="mt-8 md:mt-9 h-px w-14 bg-[#1A1815]/35" />

            {/* 価格 (カード化しない・控えめなインライン情報) */}
            <div className="mt-5">
              <div className="flex items-baseline gap-3 text-[#1A1815]">
                <span className="text-[12.5px] tracking-[0.04em]">京モデル</span>
                <span
                  className="font-light"
                  style={{
                    fontFamily: "var(--font-oswald)",
                    fontSize: "clamp(28px, 3.6vw, 36px)",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                  }}
                >
                  2,280
                </span>
                <span className="text-[14px]">万円〜</span>
              </div>
              <p className="mt-1.5 text-[11.5px] tracking-[0.03em] text-[#5E5A50]/85">
                税込・建物本体＋標準付帯工事込み
              </p>
            </div>

            {/* CTA — 2 つまで / 直角コーナー / 影なし */}
            <div className="mt-7 md:mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/money"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2 px-7 bg-[#2F4A2C] text-white text-[14px] tracking-[0.04em] font-medium transition-colors duration-300 hover:bg-[#1F3A1C]"
              >
                総額の目安を相談する
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
              <Link
                href="/reserve"
                className="group inline-flex min-h-[52px] items-center justify-center gap-2 px-7 border border-[#1A1815] text-[#1A1815] text-[14px] tracking-[0.04em] font-medium transition-colors duration-300 hover:bg-[#1A1815] hover:text-white"
              >
                モデルハウスを見学する
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
