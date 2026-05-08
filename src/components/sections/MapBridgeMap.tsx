"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { DivIcon, LatLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import { getMappableLots } from "@/data/lots";

/*
  MapBridgeMap — MapBridge 内部の leaflet 実装。
  MapBridge.tsx から dynamic import (ssr: false) されることを前提とする。

  デザイン: ARM (arm-a.com) オマージュ — CartoDB Positron グレーストーンタイル + 深緑ピン。
  ピン: 12×12 円形 / 深緑 #143426 / 白枠 / 影あり。建築誌的な"刻印"マーカー。
*/

// CartoDB Positron — ARM ライクなミニマルグレースケールタイル
const TILE_URL =
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
const TILE_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>';

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
      <TileLayer url={TILE_URL} attribution={TILE_ATTRIBUTION} />
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
