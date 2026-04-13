import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";
import ConceptSection from "@/components/sections/ConceptSection";
import FounderQuote from "@/components/sections/FounderQuote";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import StandardSection from "@/components/sections/StandardSection";
import PriceSection from "@/components/sections/PriceSection";
import QualitySection from "@/components/sections/QualitySection";
import FounderQuote2 from "@/components/sections/FounderQuote2";
import MidCta from "@/components/sections/MidCta";
import VoiceSection from "@/components/sections/VoiceSection";
import WorksSection from "@/components/sections/WorksSection";
import AccessSection from "@/components/sections/AccessSection";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

/*
  ナラティブ（B案・問い→答え→具体）:

  1. Hero         → 2,480万円（フック）
  2. Concept      → 「うちの年収じゃ無理」と思っていませんか（共感）
  3. FounderQuote → なぜ2,480万で建つのか（問い）
  4. Zero         → 追加費用が全部ゼロだから（答え1）
  5. Standard     → しかもこの設備が全部標準（答え2）
  6. Price        → 具体的にいくら？（3モデル比較）
  7. Quality      → 品質の裏付け
  8. Quote2       → 契約した日より、引き渡しの日の方が仲がいい（感情）
  9. MidCTA       → 行動喚起
  10. Voice       → お客様の声（社会的証明）
  11. Works       → 施工事例（実感）
  12. Access      → 会社情報
  13. FinalCTA    → 決断

  レイアウトパターン配列:
  フル幅 → 非対称 → フルブリード/ダーク → 均等グリッド → Bento →
  中央テーブル → 非対称sticky → フルブリード/薄緑 → 中央 →
  2列カード → 非対称交互 → 2列+テーブル → 中央
  → 同一パターンの連続なし
*/

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCatalog />
        <ConceptSection />
        <FounderQuote />
        <ZeroDeclaration />
        <StandardSection />
        <PriceSection />
        <QualitySection />
        <FounderQuote2 />
        <MidCta />
        <VoiceSection />
        <WorksSection />
        <AccessSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
