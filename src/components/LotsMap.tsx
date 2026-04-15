"use client";

import { useEffect, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon, LatLngBounds, Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Lot, Coord } from "@/data/lots";

/*
  LotsMap — Lots 一覧ページのインタラクティブマップ
  2026-04-15 神野さんの選択: OSM Standard（情報量多）
  - 周辺の学校・駅・スーパーが地図上で見える
  - 緑のカスタムピン（ブランドカラー）
  - 座標取得失敗した物件は非表示（該当区画はリスト側でのみ表示）
*/

type MappableLot = Lot & { coord: Coord };

// やまとブランドの緑ピン
const yamatoPin = new Icon({
  iconUrl:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 36 48">
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.4"/>
        </filter>
        <path filter="url(#shadow)" d="M18 0 C8.06 0 0 8.06 0 18 C0 30.5 18 48 18 48 C18 48 36 30.5 36 18 C36 8.06 27.94 0 18 0 Z" fill="#5A8A4A"/>
        <circle cx="18" cy="18" r="6" fill="#FAFAF7"/>
      </svg>
    `),
  iconSize: [32, 42],
  iconAnchor: [16, 42],
  popupAnchor: [0, -36],
});

// 全ピンが収まるようにフィットさせるヘルパー
function FitToLots({ lots }: { lots: MappableLot[] }) {
  const map = useMap();

  useEffect(() => {
    if (lots.length === 0) return;
    const bounds = new LatLngBounds(
      lots.map((l) => [l.coord.lat, l.coord.lng] as [number, number])
    );
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, lots]);

  return null;
}

export default function LotsMap({ lots }: { lots: MappableLot[] }) {
  const mapRef = useRef<LeafletMap | null>(null);

  // 奈良・京都エリアの中心（概ね）
  const center = useMemo<[number, number]>(() => [34.7, 135.78], []);

  return (
    <div className="relative w-full h-[400px] md:h-[520px] rounded-lg overflow-hidden border border-border card-shadow">
      <MapContainer
        center={center}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitToLots lots={lots} />

        {lots.map((lot) => (
          <Marker
            key={lot.id}
            position={[lot.coord.lat, lot.coord.lng]}
            icon={yamatoPin}
          >
            <Popup>
              <div style={{ width: "220px", padding: "4px 2px" }}>
                {lot.photos[0] && (
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "4/3",
                      borderRadius: "4px",
                      overflow: "hidden",
                      marginBottom: "8px",
                      background: "#F5F5F2",
                    }}
                  >
                    <Image
                      src={lot.photos[0]}
                      alt={lot.title}
                      fill
                      sizes="220px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <p
                  style={{
                    fontSize: "10px",
                    color: "#5A8A4A",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    marginBottom: "2px",
                  }}
                >
                  {lot.city}
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: "#2B2B2B",
                    marginBottom: "8px",
                    lineHeight: 1.4,
                  }}
                >
                  {lot.title.replace(/[〜～].*$/, "")}
                </p>
                <Link
                  href={`/lots/${lot.id}`}
                  style={{
                    display: "inline-block",
                    fontSize: "12px",
                    color: "#5A8A4A",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  詳しく見る →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* 操作ヒント */}
      <div className="absolute bottom-3 left-3 z-[500] bg-bg-primary/95 backdrop-blur-sm rounded px-3 py-1.5 text-[11px] text-text-secondary border border-border pointer-events-none">
        🟢 {lots.length}区画表示中 / ドラッグで移動・ピンタップで詳細
      </div>
    </div>
  );
}
