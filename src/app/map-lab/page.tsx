"use client";

import dynamic from "next/dynamic";

/*
  /map-lab — 地図スタイル選定用デモ
  神野さん用。納品時に削除予定。

  Leaflet は window に依存するため ssr:false で動的インポート（Next.js 16仕様で
  Client Component 内で実行する必要あり）。
*/

const MapLabClient = dynamic(() => import("./MapLabClient"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary">
      <p className="text-text-secondary">地図を読み込み中...</p>
    </div>
  ),
});

export default function MapLabPage() {
  return <MapLabClient />;
}
