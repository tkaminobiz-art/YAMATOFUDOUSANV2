import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorksScrollA from "@/components/works/WorksScrollA";

export const metadata: Metadata = { title: "施工事例 DEMO A（左右スワップ）| やまと不動産" };

export default function WorksDemoAPage() {
  return (
    <>
      <Header />
      <main className="bg-paper text-noir">
        <div className="mx-auto w-[min(100%-32px,1200px)] pb-8 pt-12">
          <p className="font-mono text-[11px] tracking-[0.18em] text-signal">施工事例 / WORKS ― DEMO A（左右スワップ）</p>
          <h1 className="mt-4 text-[clamp(26px,4vw,44px)] font-bold leading-[1.3]">部位ごとに、住まいをめくる。</h1>
          <p className="mt-3 font-mono text-[11px] leading-[1.9] text-slate">
            ↓ スクロールで写真とテキストが左右入れ替わります（±6%スライド）。
            <br />
            <Link href="/works-demo-b" className="text-signal underline">B案（sticky差し替え）を見る →</Link>
          </p>
        </div>
        <WorksScrollA />
      </main>
      <Footer />
    </>
  );
}
