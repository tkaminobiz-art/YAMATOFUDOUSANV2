"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { Lot, Coord } from "@/data/lots";

/*
  LotsMap — 純粋 Leaflet 実装（React 19 + Next.js 16 安定動作）
  react-leaflet を避け、useEffect で動的 import + 直接 DOM 操作。
  SSR 時は一切実行されないので、ssr:false ラッパーも不要。
*/

type MappableLot = Lot & { coord: Coord };

const YAMATO_PIN_SVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 36 48">
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.4"/>
    </filter>
    <path filter="url(#shadow)" d="M18 0 C8.06 0 0 8.06 0 18 C0 30.5 18 48 18 48 C18 48 36 30.5 36 18 C36 8.06 27.94 0 18 0 Z" fill="#5A8A4A"/>
    <circle cx="18" cy="18" r="6" fill="#FAFAF7"/>
  </svg>
`;

function popupHtml(lot: MappableLot): string {
  const photo = lot.photos[0];
  const cleanTitle = lot.title.replace(/[〜～].*$/, "");
  return `
    <div style="width:220px;padding:4px 2px;font-family:var(--font-sans),sans-serif;">
      ${
        photo
          ? `<div style="position:relative;width:100%;aspect-ratio:4/3;border-radius:4px;overflow:hidden;margin-bottom:8px;background:#F5F5F2;">
              <img src="${photo}" alt="${cleanTitle}" style="width:100%;height:100%;object-fit:cover;display:block;" />
            </div>`
          : ""
      }
      <p style="font-size:10px;color:#5A8A4A;font-weight:600;letter-spacing:0.05em;margin:0 0 2px;">${lot.city}</p>
      <p style="font-size:13px;font-weight:500;color:#2B2B2B;margin:0 0 8px;line-height:1.4;">${cleanTitle}</p>
      <a href="/lots/${lot.id}" style="display:inline-block;font-size:12px;color:#5A8A4A;font-weight:500;text-decoration:none;">詳しく見る →</a>
    </div>
  `;
}

export default function LotsMap({ lots }: { lots: MappableLot[] }) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!mapRef.current || initializedRef.current) return;
    initializedRef.current = true;

    let mapInstance: import("leaflet").Map | null = null;

    // 動的 import で SSR を完全回避
    (async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current) return;

      mapInstance = L.map(mapRef.current, {
        center: [34.7, 135.78],
        zoom: 10,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(mapInstance);

      const yamatoIcon = L.icon({
        iconUrl:
          "data:image/svg+xml;utf8," + encodeURIComponent(YAMATO_PIN_SVG),
        iconSize: [32, 42],
        iconAnchor: [16, 42],
        popupAnchor: [0, -36],
      });

      const bounds = L.latLngBounds([]);
      for (const lot of lots) {
        const marker = L.marker([lot.coord.lat, lot.coord.lng], {
          icon: yamatoIcon,
        }).addTo(mapInstance);
        marker.bindPopup(popupHtml(lot), { maxWidth: 260 });
        bounds.extend([lot.coord.lat, lot.coord.lng]);
      }

      if (lots.length > 0 && bounds.isValid()) {
        mapInstance.fitBounds(bounds, { padding: [40, 40] });
      }
    })();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }
      initializedRef.current = false;
    };
  }, [lots]);

  return (
    <div className="relative w-full h-[400px] md:h-[520px] rounded-lg overflow-hidden border border-border card-shadow">
      <div
        ref={mapRef}
        className="h-full w-full bg-bg-secondary"
        style={{ zIndex: 0 }}
      />
      <div className="pointer-events-none absolute bottom-3 left-3 z-[500] rounded border border-border bg-bg-primary/95 backdrop-blur-sm px-3 py-1.5 text-[11px] text-text-secondary">
        🟢 {lots.length}区画表示中 / ドラッグで移動・ピンタップで詳細
      </div>
    </div>
  );
}
