import Header from "@/components/Header";
import HeroMagazine from "@/components/sections/HeroMagazine";
import {
  FONT_VARIANTS,
  BODY_VARIANTS,
} from "@/components/sections/HeroMagazine.fonts";
import TrustStrip from "@/components/sections/TrustStrip";
import ScaleBanner from "@/components/sections/ScaleBanner";
import MechanismEnhanced from "@/components/sections/MechanismEnhanced";
import StandardEquipment from "@/components/sections/StandardEquipment";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import PriceSection from "@/components/sections/PriceSection";
import MiniSimulator from "@/components/sections/MiniSimulator";
import LotsSection from "@/components/sections/LotsSection";
import WorksSection from "@/components/sections/WorksSection";
import VoiceSection from "@/components/sections/VoiceSection";
import MidCta from "@/components/sections/MidCta";
import FaqSection from "@/components/sections/FaqSection";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

// 2026-04-24 確定: Z(Noto Sans JP catalog) + IV(Industrial: Oswald + Noto Sans JP 500)
const HERO_HEADLINE_VARIANT =
  FONT_VARIANTS.find((v) => v.id === "noto-sans") ?? FONT_VARIANTS[0];
const HERO_BODY_VARIANT =
  BODY_VARIANTS.find((v) => v.id === "industrial-bold") ?? BODY_VARIANTS[0];

/*
  TOP 構成 — 2026-05-03 v3 (参考画像準拠・Progressive Disclosure 適用)

  v2(17セクション・線形展開) → v3(12セクション・段階的開示)
  ユーザー方針: 「全部見せず、興味あるものだけ引き出せる構成」

  【フック・権威】
  1. HeroMagazine          写真主役 + 価格 + CTA
  2. ScaleBanner           4実績(アイコン付き) — バーン

  【理屈・証拠】
  3. MechanismEnhanced     坪単価比較 + 3つの仕組み
  4. ZeroDeclaration       8項目¥0テーブル(既に整理済み)
  5. PriceSection          3プラン価格

  【商品魅力(縮減・能動性)】
  6. MiniSimulator         3項目入力で概算建築費(新規・自分ごと化)
  7. LotsSection           AREAマップ+チップ(刷新・対応エリア訴求)
  ---
  ※ 2026-05-06: PerformanceGrid を撤去。同情報は StandardEquipment v2 の
    Bento + 性能ピル行に統合(design-critic 指摘#2 「標準装備が2回出る」)。

  【社会的証明(カルーセル化)】
  9. WorksSection          施工事例カルーセル
  10. VoiceSection         お客様の声カルーセル(シネマグラフ含む)

  【行動】
  11. MidCta               中間CTA
  12. FaqSection           2列折りたたみFAQ
  13. FinalCta             3カード締め(来場/資料/電話)

  --- 削除済(段階3で整理) ---
  - PhotoBreath ×2: 呼吸帯、現状のスクロール量を考えると過剰
  - StandardAndQualitySection: PerformanceGrid に役割吸収(12商品グリッドは
    別途別ページに移管予定 or 将来の /standards ページ)
  - FreedomOfDesign: PerformanceGrid に統合
  - FlowSection: /money の Q.08 に同等情報あり、TOPからは外す
  - AccessSection: フッターに本社住所があり、TOPでの再掲は dilution
*/

export default function Home() {
  return (
    <>
      <Header />
      <main className="pb-[72px] md:pb-0">
        {/* フック・権威 */}
        <HeroMagazine
          variant={HERO_HEADLINE_VARIANT}
          bodyVariant={HERO_BODY_VARIANT}
        />
        <TrustStrip />
        <ScaleBanner />

        {/* 理屈・証拠 */}
        <MechanismEnhanced />
        <StandardEquipment />
        <ZeroDeclaration />
        <PriceSection />

        {/* 商品魅力(能動性) */}
        <MiniSimulator />
        <LotsSection />

        {/* 社会的証明(カルーセル) */}
        <WorksSection />
        <VoiceSection />

        {/* 行動 */}
        <MidCta />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
