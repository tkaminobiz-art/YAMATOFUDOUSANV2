import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";
import TrustBar from "@/components/sections/TrustBar";
import ConceptSection from "@/components/sections/ConceptSection";
import FounderQuote from "@/components/sections/FounderQuote";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import MechanismSection from "@/components/sections/MechanismSection";
import StandardSection from "@/components/sections/StandardSection";
import FreedomOfDesign from "@/components/sections/FreedomOfDesign";
import PriceSection from "@/components/sections/PriceSection";
import QualitySection from "@/components/sections/QualitySection";
import GuaranteeSection from "@/components/sections/GuaranteeSection";
import MidCta from "@/components/sections/MidCta";
import VoiceSection from "@/components/sections/VoiceSection";
import WorksSection from "@/components/sections/WorksSection";
import FlowSection from "@/components/sections/FlowSection";
import LotsSection from "@/components/sections/LotsSection";
import StaffStory from "@/components/sections/StaffStory";
import FaqSection from "@/components/sections/FaqSection";
import AccessSection from "@/components/sections/AccessSection";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

/*
  19セクション構成:
  1. Hero          驚き（2,480万）
  2. TrustBar      信頼の数字（マーキー）
  3. Concept       共感
  4. FounderQuote  問い
  5. Mechanism     答え1: 価格の構造（大手 vs やまと）
  6. Zero          答え2: しかも追加費用もゼロ
  7. Standard      答え3: 設備が標準
  8. FreedomOfDesign 完全自由設計（花・風・京は出発点）
  9. Price         具体価格
  9. Quality       品質の裏付け
  10. Guarantee    建てた後の安心
  11. MidCta       行動喚起
  12. Voice        お客様の声
  13. Works        施工事例
  14. Flow         10ステップの流れ
  15. Lots         分譲地（土地の武器）
  16. StaffStory   引き渡しの関係 + 19人
  17. FAQ          残存不安
  18. Access       会社情報
  19. FinalCta     決断

  ※ Instagramセクションは削除（Footerのリンクに集約）
*/

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCatalog />
        <TrustBar />
        <ConceptSection />
        <FounderQuote />
        <MechanismSection />
        <ZeroDeclaration />
        <StandardSection />
        <FreedomOfDesign />
        <PriceSection />
        <QualitySection />
        <GuaranteeSection />
        <MidCta />
        <VoiceSection />
        <WorksSection />
        <FlowSection />
        <LotsSection />
        <StaffStory />
        <FaqSection />
        <AccessSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
