"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import { MapPin, Clock, Phone, Building2 } from "lucide-react";

export default function AccessSection() {
  const sectionRef = useScrollIn<HTMLDivElement>();

  return (
    <section id="access" className="bg-bg-secondary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
          COMPANY
        </p>
        <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-10 md:mb-14">
          会社情報
        </h2>

        {/* 2店舗: 本社 + 京都支店 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-12">
          {/* === 本社 === */}
          <div>
            <h3
              className="text-text-primary text-lg mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              本社
            </h3>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-main shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-text-primary font-medium text-sm mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                    株式会社やまと不動産
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    〒630-8115<br />
                    奈良県奈良市大宮町1丁目6番21
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-main shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <a
                    href="tel:0742361123"
                    className="text-text-primary font-medium text-sm hover:text-main transition-colors"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    0742-36-1123
                  </a>
                  <p className="text-text-secondary text-xs">FAX: 0742-36-1888</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-main shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-text-secondary text-sm leading-relaxed">
                  営業時間: 9:00〜19:00<br />
                  定休日: 火曜・水曜
                </p>
              </div>
            </div>

            {/* 本社マップ */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden card-shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3280.5!2d135.7924!3d34.6812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60013960a7f6e8d1%3A0x1!2z5aWI6Imv55yM5aWI6Imv5biC5aSn5a6u55S6MeS4geebrjbnlarjga4yMQ!5e0!3m2!1sja!2sjp!4v1"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="やまと不動産 本社"
              />
            </div>
          </div>

          {/* === 京都支店 === */}
          <div>
            <h3
              className="text-text-primary text-lg mb-6"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              京都支店
            </h3>
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-main shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-text-primary font-medium text-sm mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                    株式会社やまと不動産 京都支店
                  </p>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    〒611-0042<br />
                    京都府宇治市小倉町西山67-5
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-main shrink-0 mt-0.5" strokeWidth={1.5} />
                <div>
                  <a
                    href="tel:0774251123"
                    className="text-text-primary font-medium text-sm hover:text-main transition-colors"
                    style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
                  >
                    0774-25-1123
                  </a>
                  <p className="text-text-secondary text-xs">FAX: 0774-25-3131</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-main shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-text-secondary text-sm leading-relaxed">
                  営業時間: 9:00〜19:00<br />
                  定休日: 火曜・水曜
                </p>
              </div>
            </div>

            {/* 京都支店マップ */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden card-shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3275.8!2d135.7680!3d34.9050!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5Lqs6YO95bqc5a6H5rK75biC5bCP5YCJ55S66KW_5bGxNjctNQ!5e0!3m2!1sja!2sjp!4v1"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="やまと不動産 京都支店"
              />
            </div>
          </div>
        </div>

        {/* 会社概要テーブル */}
        <div className="bg-bg-primary rounded-lg p-[var(--card-p)] card-shadow">
          <h3
            className="text-text-primary text-base mb-4"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            会社概要
          </h3>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
            <dt className="text-text-secondary">商号</dt>
            <dd className="text-text-primary">株式会社やまと不動産</dd>

            <dt className="text-text-secondary">代表者</dt>
            <dd className="text-text-primary">
              代表取締役社長 古谷 泰彦<br />
              代表取締役専務 小林 敬昌
            </dd>

            <dt className="text-text-secondary">創立</dt>
            <dd className="text-text-primary">2011年11月30日</dd>

            <dt className="text-text-secondary">資本金</dt>
            <dd className="text-text-primary">900万円</dd>

            <dt className="text-text-secondary">宅建番号</dt>
            <dd className="text-text-primary">国土交通大臣 (1) 第10516号</dd>

            <dt className="text-text-secondary">事業内容</dt>
            <dd className="text-text-primary">宅地分譲・住宅建築・宅地造成・住宅リフォーム・不動産買取り</dd>

            <dt className="text-text-secondary">関連会社</dt>
            <dd className="text-text-primary">やまとグローバル開発、やまと総合技建</dd>
          </dl>
        </div>
      </div>
    </section>
  );
}
