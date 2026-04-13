"use client";

import { useScrollIn } from "@/hooks/useScrollIn";
import { MapPin, Clock, Phone } from "lucide-react";

export default function AccessSection() {
  const sectionRef = useScrollIn<HTMLDivElement>();

  return (
    <section id="access" className="bg-bg-secondary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto px-[var(--page-px)] scroll-in"
      >
        <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
          ACCESS
        </p>
        <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-10 md:mb-14">
          店舗情報
        </h2>

        {/* 非対称: 左に情報 / 右にマップ */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">
          {/* 左: 店舗情報 */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-main shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-text-primary font-medium text-sm mb-1" style={{ fontFamily: "var(--font-sans)" }}>
                  やまと不動産株式会社
                </p>
                <p className="text-text-secondary text-sm leading-relaxed">
                  〒639-1007<br />
                  奈良県大和郡山市南郡山町527-13
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-main shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-text-secondary text-sm leading-relaxed">
                  営業時間: 10:00〜18:00<br />
                  定休日: 水曜日
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-main shrink-0 mt-0.5" strokeWidth={1.5} />
              <a
                href="tel:0742361123"
                className="text-text-primary font-medium text-sm hover:text-main transition-colors"
                style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
              >
                0742-36-1123
              </a>
            </div>

            <div className="mt-2">
              <a
                href="https://maps.google.com/?q=奈良県大和郡山市南郡山町527-13"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-main text-sm font-medium hover:underline"
              >
                Google Maps で開く →
              </a>
            </div>
          </div>

          {/* 右: 地図埋め込み */}
          <div className="relative aspect-[4/3] lg:aspect-[3/2] rounded-lg overflow-hidden card-shadow">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.42!2d135.78!3d34.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5aWI6Imv55yM5aSn5ZKM6YOh5bGx5biC5Y2X6YOh5bGx55S6NTI3LTEz!5e0!3m2!1sja!2sjp!4v1"
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="やまと不動産 地図"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
