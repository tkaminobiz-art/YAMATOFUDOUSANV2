"use client";

import { useEffect, useState } from "react";

/**
 * S01HeroMovie — FV 背景のループ再生モンタージュ動画（client 子・v3 配下に閉じる）。
 *
 * FV案B（B-2）の成果物 public/videos/fv/yamato-fv-montage.* をフルブリードで再生。
 * 外観(空・時間帯レタッチ)＋内観/暮らし(実写)の 30 枚モンタージュ＝写真は脇役の"地"。
 *
 * a11y（FV案B計画 §3 準拠）:
 *   - prefers-reduced-motion: reduce / Save-Data 時は動画を出さず poster 静止のみ。
 *     globals.css の CSS 無効化は HTML video の autoPlay に効かないため JS(matchMedia)で出し分け。
 *   - background かつ aria-hidden（代替テキストは前景の見出しが担う）。
 *   - SSR フォールバックは poster 静止画なので JS 無効でも背景は表示される。
 *   ※ ループは神野さん指示。reduced-motion 時は静止のため動き過敏には影響しない。
 */
const POSTER = "/videos/fv/yamato-fv-montage-poster.webp";
const WEBM = "/videos/fv/yamato-fv-montage.webm";
const MP4 = "/videos/fv/yamato-fv-montage.mp4";

type NetworkInfo = { saveData?: boolean };

export default function S01HeroMovie() {
  // 初期値は「動かさない（poster のみ）」。mount 後に条件を満たせば動画へ昇格。
  const [still, setStill] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    const saveData = conn?.saveData === true;
    setStill(mq.matches || saveData);
    const onChange = (e: MediaQueryListEvent) => setStill(e.matches || saveData);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (still) {
    // reduced-motion / Save-Data: 自動再生しない。poster 静止画のみ。
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img src={POSTER} alt="" aria-hidden className="h-full w-full object-cover" />
    );
  }

  return (
    <video
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={POSTER}
    >
      <source src={WEBM} type="video/webm" />
      <source src={MP4} type="video/mp4" />
    </video>
  );
}
