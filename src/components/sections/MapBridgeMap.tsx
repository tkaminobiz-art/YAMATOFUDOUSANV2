"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { DivIcon, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMappableLots } from "@/data/lots";

/*
  MapBridgeMap — MapBridge 内部の leaflet 実装。
  MapBridge.tsx から dynamic import (ssr: false) されることを前提とする。

  デザイン: ARM (arm-a.com) オマージュ — グレートーン基調 + 深緑ピン。
  ピン: 12×12 円形 / 深緑 #143426 / 白枠 / 影あり。建築誌的な"刻印"マーカー。

  2026-05-09: タイルを CartoDB Positron (英語ラベル) → 国土地理院 淡色地図
  (日本語ラベル) に変更。地名・道路名が日本語で表示される。
  pale (淡色) は GSI のミニマル系で、Positron に最も近いグレートーン。
*/

// 国土地理院 淡色地図 — 日本語ラベルのミニマルグレートーン
// (出典: https://maps.gsi.go.jp/development/ichiran.html)
const TILE_URL =
  "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png";
const TILE_ATTRIBUTION =
  '<a href="https://maps.gsi.go.jp/development/ichiran.html" target="_blank" rel="noopener">国土地理院</a>';
// GSI タイルの最大ズームは 18
const TILE_MAX_ZOOM = 18;

// やまとサービスエリアの中心 (奈良市〜京田辺市の中間あたり)
const FALLBACK_CENTER: [number, number] = [34.73, 135.77];
const FALLBACK_ZOOM = 10;

// ピン: 12×12 深緑円形 + 白枠 + ソフト影
const yamatoPin = new DivIcon({
  className: "yamato-map-pin",
  html: `<div style="
    width:12px;height:12px;border-radius:50%;
    background:#143426;border:2px solid #FFFFFF;
    box-shadow:0 1px 4px rgba(0,0,0,0.25);
  "></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

function FitBoundsToLots({ coords }: { coords: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length === 0) return;
    const bounds = new LatLngBounds(coords);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 11 });
  }, [coords, map]);
  return null;
}

export default function MapBridgeMap() {
  const lots = getMappableLots();
  const coords: [number, number][] = lots.map((l) => [l.coord.lat, l.coord.lng]);

  return (
    <MapContainer
      center={FALLBACK_CENTER}
      zoom={FALLBACK_ZOOM}
      scrollWheelZoom={false}
      zoomControl={true}
      className="h-full w-full"
      style={{ background: "#EDEAE3" }}
    >
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} maxZoom={TILE_MAX_ZOOM} />
      {lots.map((lot) => (
        <Marker
          key={lot.id}
          position={[lot.coord.lat, lot.coord.lng]}
          icon={yamatoPin}
        />
      ))}
      <FitBoundsToLots coords={coords} />
    </MapContainer>
  );
}
