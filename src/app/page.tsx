import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";
import ConceptSection from "@/components/sections/ConceptSection";
import PriceSection from "@/components/sections/PriceSection";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";
import StandardSection from "@/components/sections/StandardSection";
import QualitySection from "@/components/sections/QualitySection";
import MidCta from "@/components/sections/MidCta";
import VoiceSection from "@/components/sections/VoiceSection";
import WorksSection from "@/components/sections/WorksSection";
import AccessSection from "@/components/sections/AccessSection";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCatalog />
        <ConceptSection />
        <PriceSection />
        <ZeroDeclaration />
        <StandardSection />
        <QualitySection />
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
