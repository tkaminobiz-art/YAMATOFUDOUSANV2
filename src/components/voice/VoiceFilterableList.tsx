"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { VOICE_TAGS, type Voice, type VoiceTag } from "@/data/voices";

/*
  VoiceFilterableList — /voice 一覧 + タグ chip 単一選択 フィルタ
  ----------------------------------------------------------------
  - 上部 chip グループ: 「すべて(N) / 価格(N) / 標準仕様(N) / ...」
  - 単一選択(クリックで toggle、もう一度押すと「すべて」に戻る)
  - URL ?tag=価格 で deep link 可能、共有可能
  - SEO: タグ別ページ URL は作らない(クライアントフィルタのみ)
*/

type VoiceWithExcerpt = Voice & { excerpt: string };

export default function VoiceFilterableList({ voices }: { voices: VoiceWithExcerpt[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initialTag = searchParams.get("tag") as VoiceTag | null;
  const [selectedTag, setSelectedTag] = useState<VoiceTag | null>(
    initialTag && (VOICE_TAGS as readonly string[]).includes(initialTag) ? initialTag : null,
  );

  // URL を「ブラウザの戻る」で同期
  useEffect(() => {
    const t = searchParams.get("tag") as VoiceTag | null;
    setSelectedTag(t && (VOICE_TAGS as readonly string[]).includes(t) ? t : null);
  }, [searchParams]);

  const setTag = useCallback(
    (tag: VoiceTag | null) => {
      setSelectedTag(tag);
      const params = new URLSearchParams(searchParams.toString());
      if (tag) params.set("tag", tag);
      else params.delete("tag");
      const q = params.toString();
      router.replace(`${pathname}${q ? `?${q}` : ""}`, { scroll: false });
    },
    [searchParams, router, pathname],
  );

  // タグごとの件数(全件ベース)
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: voices.length };
    for (const t of VOICE_TAGS) c[t] = 0;
    for (const v of voices) {
      for (const t of v.tags ?? []) c[t] = (c[t] ?? 0) + 1;
    }
    return c;
  }, [voices]);

  const filtered = useMemo(() => {
    if (!selectedTag) return voices;
    return voices.filter((v) => (v.tags ?? []).includes(selectedTag));
  }, [voices, selectedTag]);

  return (
    <>
      {/* === タグ chip グループ === */}
      <div
        className="flex flex-wrap items-center gap-2 mb-8 md:mb-10"
        role="tablist"
        aria-label="お客様の声をタグで絞り込み"
      >
        <ChipButton
          label={`すべて`}
          count={counts.all}
          active={selectedTag === null}
          onClick={() => setTag(null)}
        />
        {VOICE_TAGS.map((tag) => (
          <ChipButton
            key={tag}
            label={tag}
            count={counts[tag] ?? 0}
            active={selectedTag === tag}
            onClick={() => setTag(selectedTag === tag ? null : tag)}
            disabled={(counts[tag] ?? 0) === 0}
          />
        ))}
      </div>

      {/* === 件数表示 === */}
      <p className="text-text-secondary text-[12px] md:text-[13px] mb-5 md:mb-7">
        {selectedTag
          ? `「${selectedTag}」に該当する事例: ${filtered.length}件`
          : `全${filtered.length}件のご家族の声`}
      </p>

      {/* === 一覧 === */}
      {filtered.length === 0 ? (
        <p className="text-text-secondary text-sm py-12 text-center">
          このタグに該当する事例はまだありません。
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[var(--card-gap)]">
          {filtered.map((v) => (
            <Link
              key={v.id}
              href={`/voice/${v.id}`}
              className="group block bg-bg-primary rounded-lg overflow-hidden card-shadow transition-all hover:-translate-y-1"
            >
              {/* カバー画像 */}
              <div className="relative aspect-[3/2] bg-bg-secondary overflow-hidden">
                {v.photos[0] ? (
                  <Image
                    src={v.photos[0]}
                    alt={v.title}
                    fill
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-text-secondary text-xs">
                    写真なし
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-bg-primary/95 backdrop-blur-sm rounded px-2.5 py-1">
                  <span className="text-main text-[10px] font-medium tracking-wider">
                    {v.area || "—"}
                  </span>
                </div>
              </div>

              {/* 本文 */}
              <div className="p-5 md:p-6">
                <h2
                  className="text-text-primary text-base md:text-lg mb-3 group-hover:text-main transition-colors"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {v.title}
                </h2>
                <p className="text-text-secondary text-xs leading-[1.8] mb-3 line-clamp-3">
                  {v.excerpt}
                </p>
                {/* タグチップ(カード内・最大3個) */}
                {v.tags && v.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5 mb-3">
                    {v.tags.slice(0, 3).map((t) => (
                      <li
                        key={t}
                        className="inline-flex items-center px-2 py-0.5 rounded-full bg-bg-warm/60 text-text-secondary text-[10px] border border-text-primary/8"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex items-center justify-between">
                  {v.staff ? (
                    <span className="text-text-secondary text-[10px]">
                      担当: {v.staff}
                    </span>
                  ) : (
                    <span />
                  )}
                  <span className="text-main text-xs font-medium">
                    続きを読む →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

// ── chip ボタン ──
function ChipButton({
  label,
  count,
  active,
  onClick,
  disabled = false,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] md:text-[13px] font-medium transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed ${
        active
          ? "bg-main text-white shadow-[0_4px_12px_-4px_rgba(72,107,0,0.4)]"
          : "bg-bg-secondary/60 text-text-primary hover:bg-bg-secondary border border-text-primary/10"
      }`}
    >
      <span>{label}</span>
      <span
        className={`tabular-nums text-[10px] md:text-[11px] font-normal ${
          active ? "text-white/75" : "text-text-secondary"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
