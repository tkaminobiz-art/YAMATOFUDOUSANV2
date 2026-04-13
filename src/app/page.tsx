import Header from "@/components/Header";
import HeroCatalog from "@/components/sections/HeroCatalog";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroCatalog />
        {/* 以降のセクションは後続指示書で追加 */}
      </main>
    </>
  );
}
