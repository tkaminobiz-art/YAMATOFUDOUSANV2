import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WorksScrollB from "@/components/works/WorksScrollB";

export const metadata: Metadata = { title: "施工事例 DEMO B（sticky差し替え）| やまと不動産" };

export default function WorksDemoBPage() {
  return (
    <>
      <Header />
      <main className="bg-paper text-noir">
        <div className="mx-auto w-[min(100%-32px,1200px)] pb-8 pt-12">
          <p className="font-mono text-[11px] tracking-[0.18em] text-signal">施工事例 / WORKS ― DEMO B（sticky差し替え）</p>
          <h1 className="mt-4 text-[clamp(26px,4vw,44px)] font-bold leading-[1.3]">大きな写真が、めくれていく。</h1>
          <p className="mt-3 font-mono text-[11px] leading-[1.9] text-slate">
            ↓ 左の写真が固定され、スクロールに同期して clip-path で差し替わります。
            <br />
            <Link href="/works-demo-a" className="text-signal underline">A案（左右スワップ）を見る →</Link>
          </p>
        </div>
        <WorksScrollB />
      </main>
      <Footer />
    </>
  );
}
