"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { RoomTourVideo } from "@/data/works";

/*
  RoomTourPlayer — 2026-04-30
  ---------------------------------------------------------------
  小林専務(2026-04-28):
  「お客さんごとの良い間取りを載せて、ルームツアー動画を流せたり」

  YouTube / 直接mp4 の両対応。
  ポスター画像があればそれを起点に、クリックで動画を読み込む(LCP配慮)。
*/

type Props = {
  video: RoomTourVideo;
  /** タイトル(コンポーネント外から流し込む) */
  title: string;
};

export default function RoomTourPlayer({ video, title }: Props) {
  const [playing, setPlaying] = useState(false);

  const youTubeEmbed =
    video.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.src}?autoplay=1&rel=0&modestbranding=1`
      : null;

  return (
    <figure className="relative aspect-[16/9] w-full overflow-hidden border border-text-primary/10 bg-text-primary">
      {!playing && video.poster && (
        <Image
          src={video.poster}
          alt={`${title} ルームツアー動画`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      )}

      {!playing && (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="absolute inset-0 flex items-center justify-center group bg-black/15 hover:bg-black/25 transition-colors"
          aria-label={`${title} のルームツアー動画を再生`}
        >
          <span className="flex items-center gap-3 px-5 py-3 bg-white/95 backdrop-blur-sm rounded-full shadow-lg group-hover:scale-105 transition-transform">
            <Play className="w-5 h-5 text-main-dark" strokeWidth={2} fill="currentColor" />
            <span className="text-text-primary text-sm font-medium tracking-[0.06em]">
              ルームツアーを見る
            </span>
            {video.durationSec && (
              <span className="text-text-secondary text-xs tabular-nums">
                {Math.floor(video.durationSec / 60)}:
                {String(video.durationSec % 60).padStart(2, "0")}
              </span>
            )}
          </span>
        </button>
      )}

      {playing && video.kind === "youtube" && youTubeEmbed && (
        <iframe
          src={youTubeEmbed}
          title={`${title} ルームツアー動画`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0"
        />
      )}

      {playing && video.kind === "mp4" && (
        <video
          src={video.src}
          poster={video.poster}
          autoPlay
          controls
          playsInline
          className="absolute inset-0 w-full h-full object-cover bg-black"
        />
      )}

      {video.caption && (
        <figcaption className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent text-white text-[12px] md:text-[13px] px-4 py-3 pointer-events-none">
          {video.caption}
        </figcaption>
      )}
    </figure>
  );
}
