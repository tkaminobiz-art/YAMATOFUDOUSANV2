"use client";

import Image from "next/image";

/**
 * S07 LandMarquee — 自社分譲地の写真マーキー（§4.3 / 純CSS）。
 *
 * 親 S07.tsx の default export は props 無しサーバーコンポーネントのまま。
 * client 化が要るのはこのマーキー子だけ（純CSS でも 'use client' は本来不要だが、
 * S07 のロジック子としてこのファイルに閉じる）。
 *
 * 仕様（フレームワーク §4.3 / S07 ビルドカード）:
 *  - 純CSS・依存なし（Swiper 不要）・2セット複製で translateX(-50%) ループ・CLS=0。
 *  - 速度 PC 36s / SP 44s に一意確定（S03 の 600 を侵さない・FV 主役 NG＝帯のみ）。
 *  - :hover / :focus-within で停止。
 *  - prefers-reduced-motion: animation 停止 ＋ overflow-x:auto（手動閲覧）。
 *  - スタッフではないので平等原則は無関係だが、各カードは均等サイズで特別扱いしない。
 */
export default function LandMarquee({
  photos,
}: {
  photos: { src: string; alt: string }[];
}) {
  // 2セット複製で -50% ループ（途切れ無し）
  const doubled = [...photos, ...photos];

  return (
    <div className="s07-marquee" tabIndex={0} aria-label="自社分譲地の写真">
      <div className="s07-marquee__track">
        {doubled.map((p, i) => (
          <div className="s07-marquee__item" key={`${p.src}-${i}`}>
            <Image
              src={p.src}
              alt={i < photos.length ? p.alt : ""}
              aria-hidden={i >= photos.length ? true : undefined}
              fill
              sizes="(max-width: 768px) 60vw, 320px"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <style>{`
        .s07-marquee {
          overflow: hidden;
          -webkit-mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 5%, #000 95%, transparent);
        }
        .s07-marquee:focus-visible {
          outline: 2px solid var(--color-main);
          outline-offset: 3px;
        }
        .s07-marquee__track {
          display: flex;
          width: max-content;
          gap: clamp(12px, 2vw, 20px);
          will-change: transform;
          animation: s07-marquee-x 36s linear infinite;
        }
        .s07-marquee:hover .s07-marquee__track,
        .s07-marquee:focus-within .s07-marquee__track {
          animation-play-state: paused;
        }
        .s07-marquee__item {
          position: relative;
          flex: 0 0 auto;
          aspect-ratio: 4 / 3;
          width: clamp(220px, 26vw, 340px);
          border-radius: 2px;
          overflow: hidden;
          background: color-mix(in srgb, var(--color-main) 8%, var(--color-paper));
        }
        @keyframes s07-marquee-x {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @media (max-width: 768px) {
          .s07-marquee__track { animation-duration: 44s; }
        }
        @media (prefers-reduced-motion: reduce) {
          .s07-marquee { overflow-x: auto; }
          .s07-marquee__track { animation: none; transform: none; }
        }
      `}</style>
    </div>
  );
}
