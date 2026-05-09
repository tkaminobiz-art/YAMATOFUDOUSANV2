import type { Metadata } from "next";
import Header from "@/components/Header";
import StandardEquipment from "@/components/sections/StandardEquipment";
import FinalCta from "@/components/sections/FinalCta";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

export const metadata: Metadata = {
  title: "標準仕様 | やまと不動産",
  description:
    "やまと不動産の標準仕様。キッチン、水回り、窓・玄関、外壁、断熱、制震、保証など、価格に含まれる主な仕様をご確認いただけます。",
};

export default function StandardPage() {
  return (
    <>
      <Header />
      <main className="pb-[72px] md:pb-0">
        <StandardEquipment />
        <FinalCta />
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
