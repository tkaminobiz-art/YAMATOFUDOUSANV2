import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";
import ConceptSection from "@/components/sections/ConceptSection";
import PriceSection from "@/components/sections/PriceSection";
import ZeroDeclaration from "@/components/sections/ZeroDeclaration";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCatalog />
        <ConceptSection />
        <PriceSection />
        <ZeroDeclaration />
        {/* 以降のセクションは後続指示書で追加 */}
      </main>
    </>
  );
}
