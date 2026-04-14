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
import StaffSection from "@/components/sections/StaffSection";
import FaqSection from "@/components/sections/FaqSection";
import AccessSection from "@/components/sections/AccessSection";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

/*
  背景リズム（色味の単調さ対策）:
  Hero(画像) → Concept(warm) → Quote(dark) → Zero(primary) →
  Standard(secondary) → Price(primary) → Quality(secondary) →
  Quote2(main-light) → MidCta(warm) → Voice(warm) → Works(primary) →
  Staff(primary) → FAQ(primary) → Access(secondary) → FinalCta(primary)
  → 5段階（白・薄グレー・クリーム・ダーク・薄緑）の背景リズム
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
        <StaffSection />
        <FaqSection />
        <AccessSection />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
