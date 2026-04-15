"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

/*
  MapLabClient — Leaflet + OpenStreetMap デモ
  神野さん用: 地図スタイル選定・インタラクティブマップのPoC

  構成:
  - 3つの地図スタイル切替（CartoDB Positron / Stamen Toner Lite / OSM標準）
  - 6件の物件をカスタム緑ピンで表示
  - ピンクリックでポップアップに物件カード

  デモ用: 6件の緯度経度は手動で設定。本番実装時はNominatim or手動ジオコーディング。
*/

// デモ用: 6件の物件データ（座標は各エリア中心の概算）
const DEMO_LOTS = [
  {
    id: "65744643",
    title: "京田辺市田辺勇田 第3期",
    city: "京田辺市",
    price: "780万〜",
    area: "47区画",
    photo: "/images/lots/65744643_1.webp",
    lat: 34.8131,
    lng: 135.7683,
  },
  {
    id: "miyamaki",
    title: "三山木 全24区画",
    city: "京田辺市",
    price: "850万〜",
    area: "24区画",
    photo: "/images/works/works-02.webp",
    lat: 34.8007,
    lng: 135.7650,
  },
  {
    id: "ikoma",
    title: "生駒市中菜畑",
    city: "生駒市",
    price: "1,980万〜",
    area: "3区画",
    photo: "/images/works/works-01.webp",
    lat: 34.6914,
    lng: 135.7007,
  },
  {
    id: "naramachi",
    title: "奈良市大宮町",
    city: "奈良市",
    price: "2,280万〜",
    area: "5区画",
    photo: "/images/works/works-03.webp",
    lat: 34.6851,
    lng: 135.8048,
  },
  {
    id: "koriyama",
    title: "大和郡山市矢田町",
    city: "大和郡山市",
    price: "1,580万〜",
    area: "8区画",
    photo: "/images/works/works-04.webp",
    lat: 34.6491,
    lng: 135.7810,
  },
  {
    id: "ikaruga",
    title: "斑鳩町興留",
    city: "斑鳩町",
    price: "1,280万〜",
    area: "6区画",
    photo: "/images/works/works-05.webp",
    lat: 34.6097,
    lng: 135.7459,
  },
];

// CartoDB Positron: 明るくミニマルな地図（推奨）
// Stamen Toner Lite: モノクロミニマル
// OSM Standard: 標準カラフル
const TILE_STYLES = {
  positron: {
    name: "CartoDB Positron（明るくミニマル・推奨）",
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  toner: {
    name: "Stamen Toner Lite（モノクロミニマル）",
    url: "https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; <a href="https://stamen.com/">Stamen Design</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  voyager: {
    name: "CartoDB Voyager（バランス型）",
    url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
  },
  osm: {
    name: "OSM Standard（情報量多）",
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
} as const;

type StyleKey = keyof typeof TILE_STYLES;

// やまとブランドカラー（緑）のカスタムピンアイコン（SVG DataURI）
const yamatoPin = new Icon({
  iconUrl:
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="48" viewBox="0 0 36 48">
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.35"/>
        </filter>
        <path filter="url(#shadow)" d="M18 0 C8.06 0 0 8.06 0 18 C0 30.5 18 48 18 48 C18 48 36 30.5 36 18 C36 8.06 27.94 0 18 0 Z" fill="#5A8A4A"/>
        <circle cx="18" cy="18" r="6" fill="#FAFAF7"/>
      </svg>
    `),
  iconSize: [36, 48],
  iconAnchor: [18, 48],
  popupAnchor: [0, -40],
});

export default function MapLabClient() {
  const [style, setStyle] = useState<StyleKey>("positron");

  // 奈良・京都エリアの中心（概ね）
  const center: [number, number] = [34.7, 135.76];

  return (
    <main className="bg-bg-primary min-h-screen pb-20">
      {/* ヘッダー */}
      <div className="bg-text-primary text-white">
        <div className="max-w-[1400px] mx-auto px-[var(--page-px)] py-10 md:py-14">
          <p className="font-section-label text-accent text-xs md:text-sm mb-3 tracking-[0.2em]">
            MAP LAB
          </p>
          <h1 className="text-[clamp(28px,4vw,48px)] mb-3 leading-[1.3]">
            地図スタイル選定ラボ
          </h1>
          <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-[640px]">
            Leaflet + OpenStreetMap の地図スタイルを比較できます。デモ用に6件の物件をピン表示しています。
          </p>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-[var(--page-px)] pt-8 md:pt-10">
        {/* スタイル切替 */}
        <div className="mb-6">
          <p className="font-section-label text-text-secondary text-xs mb-3 tracking-[0.15em]">
            地図スタイルを切り替え
          </p>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(TILE_STYLES) as StyleKey[]).map((key) => {
              const active = style === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setStyle(key)}
                  className={`min-h-[40px] px-4 py-2 text-sm rounded border transition-colors ${
                    active
                      ? "border-main bg-main text-white"
                      : "border-border bg-bg-primary text-text-primary hover:border-main"
                  }`}
                >
                  {TILE_STYLES[key].name}
                </button>
              );
            })}
          </div>
        </div>

        {/* マップコンテナ */}
        <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-lg overflow-hidden card-shadow border border-border bg-bg-secondary">
          <MapContainer
            center={center}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution={TILE_STYLES[style].attribution}
              url={TILE_STYLES[style].url}
            />
            {DEMO_LOTS.map((lot) => (
              <Marker key={lot.id} position={[lot.lat, lot.lng]} icon={yamatoPin}>
                <Popup>
                  <div style={{ width: "220px", padding: "4px 2px" }}>
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
                        src={lot.photo}
                        alt={lot.title}
                        fill
                        sizes="220px"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
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
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#2B2B2B",
                        marginBottom: "4px",
                        lineHeight: 1.4,
                      }}
                    >
                      {lot.title}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#6B6B6B",
                        marginBottom: "8px",
                      }}
                    >
                      {lot.area} / {lot.price}
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
        </div>

        {/* 凡例 */}
        <div className="bg-bg-secondary rounded-lg p-5 md:p-6 mt-6">
          <p className="font-section-label text-text-secondary text-xs mb-3 tracking-[0.15em]">
            HOW TO USE
          </p>
          <ul className="text-text-secondary text-sm leading-[1.9] list-disc ml-5 space-y-1">
            <li>上のボタンで地図スタイルを切り替えられます</li>
            <li>緑のピンをクリックすると、物件情報のポップアップが表示されます</li>
            <li>ドラッグ・スクロールで地図の移動・拡大縮小ができます</li>
            <li>選んだスタイルを Lots ページ本番実装に反映します</li>
          </ul>
        </div>

        {/* 実装メモ */}
        <div className="bg-bg-primary rounded-lg p-5 md:p-6 mt-4 border border-border">
          <p className="font-section-label text-text-secondary text-xs mb-3 tracking-[0.15em]">
            IMPLEMENTATION NOTES
          </p>
          <ul className="text-text-secondary text-xs leading-[1.9] list-disc ml-5 space-y-1">
            <li>地図ライブラリ: Leaflet 1.9.4 + React-Leaflet 5.0.0</li>
            <li>タイル: 全て無料・無制限（CartoDB / Stamen / OSM 標準）</li>
            <li>月額コスト: 0円（スケールしても無料）</li>
            <li>座標データ: デモ用に6件手動設定。本番は Nominatim で90件一括ジオコーディング可能</li>
            <li>ピン: SVG インラインでブランドカラー（#5A8A4A）</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
