import Image from "next/image";
import type { ReactNode } from "react";

/**
 * PhotoTile — 実写/アートタイル（next/image ラッパ）。
 *
 * 正本: docs/notes/2026-07-02-visual-dashboard-owner-specs.md ◆system §5。
 * - radius は 4px 統一（rounded-[4px]・ガードレール radius≤4px）。影なし。
 * - aspect は 4/3（既定）/ 16/9（横長セル）/ 3/4（縦セル）の3種のみ。
 * - 供給源は BRAND-TRUTH §1 の実写真 allowlist（works-parts / lots / fv/plan-* /
 *   works/case* / staff 等）。数字・日本語コピーを画像に焼かない。
 * - overlay 規則: 文字（caption）を載せる時のみ、ink 系の下部スクリム
 *   （transparent→ink66%）を自動付与。キャプションは必ずライブテキスト。
 *   ※これは可読性スクリムであり装飾グラデ（禁止）ではない。ink 系以外の overlay 禁止。
 * - sizes は必須（レイアウト幅に合わせて呼び出し側が指定）。FV 以外は lazy 既定。
 * - hover ズーム等のモーションは Phase D（◆motion 表: hover:hover 限定 scale1.04）で
 *   別途適用する。本モジュールは静的な器のみ持つ。
 * - サーバーコンポーネント。
 */

const ASPECT = {
  "4/3": "aspect-[4/3]",
  "16/9": "aspect-[16/9]",
  "3/4": "aspect-[3/4]",
} as const;

export default function PhotoTile({
  src,
  alt,
  sizes,
  aspect = "4/3",
  priority = false,
  caption,
  captionBelow,
  className = "",
  imgClassName = "",
}: {
  src: string;
  /** 実写真の内容説明。装飾画像なら "" を明示。 */
  alt: string;
  /** next/image の sizes（必須）。例: "(min-width:768px) 33vw, 100vw" */
  sizes: string;
  aspect?: keyof typeof ASPECT;
  /** FV 等 LCP 候補のみ true（それ以外は lazy 既定）。 */
  priority?: boolean;
  /** on-image キャプション（左下・t-eyebrow text-cream）。指定時のみ ink スクリム付与。 */
  caption?: ReactNode;
  /** タイル下の図版キャプション（DrawingCaption 式・mono 小）。 */
  captionBelow?: ReactNode;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden rounded-[4px] ${ASPECT[aspect]}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
        {caption != null && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                /* overlay は ink 系のみ（新規 hex なし・color-mix でトークン参照）。 */
                background:
                  "linear-gradient(180deg, transparent 55%, color-mix(in srgb, var(--color-ink) 66%, transparent) 100%)",
              }}
            />
            <span className="t-eyebrow absolute bottom-3 left-4 text-cream">
              {caption}
            </span>
          </>
        )}
      </div>
      {captionBelow != null && (
        <figcaption className="mt-2 font-mono text-[11px] leading-relaxed tracking-[0.04em] text-[color:var(--color-ink-muted)]">
          {captionBelow}
        </figcaption>
      )}
    </figure>
  );
}
