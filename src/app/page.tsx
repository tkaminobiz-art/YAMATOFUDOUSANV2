import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";
import ConceptSection from "@/components/sections/ConceptSection";
import FounderQuote from "@/components/sections/FounderQuote";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import StandardSection from "@/components/sections/StandardSection";
import PriceSection from "@/components/sections/PriceSection";
import QualitySection from "@/components/sections/QualitySection";
import MidCta from "@/components/sections/MidCta";
import VoiceSection from "@/components/sections/VoiceSection";
import WorksSection from "@/components/sections/WorksSection";
import StaffStory from "@/components/sections/StaffStory";
import FaqSection from "@/components/sections/FaqSection";
import AccessSection from "@/components/sections/AccessSection";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

/*
  構成（物語の流れ）:
  Hero          → 価格の驚き
  Concept       → 共感
  FounderQuote  → 問い「なぜ2,480万で？」
  Zero          → 答え1: 追加費用ゼロ
  Standard      → 答え2: 設備が標準
  Price         → 具体的な価格
  Quality       → 安さの裏付け
  MidCTA        → 一度行動喚起
  Voice         → 建てた人の声
  Works         → 実際の事例
  StaffStory    → 引き渡し後の関係 + 19人の物語（統合）
  FAQ           → 残った不安を解消
  Access        → 会社情報
  FinalCTA      → 決断
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
        <MidCta />
        <VoiceSection />
        <WorksSection />
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
