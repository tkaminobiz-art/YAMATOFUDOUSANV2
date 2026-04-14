"use client";

import Image from "next/image";
import { useScrollIn } from "@/hooks/useScrollIn";

type Staff = {
  id: string;
  name: string;
  dept: string;
  career: string;
  license: string;
  highlight?: boolean;
};

const STAFF: readonly Staff[] = [
  { id: "92289", name: "古谷 泰彦", dept: "代表取締役社長", career: "38年", license: "宅地建物取引士・二級施工管理技士", highlight: true },
  { id: "92290", name: "小林 敬昌", dept: "代表取締役専務", career: "25年", license: "宅地建物取引士", highlight: true },
  { id: "100104", name: "田中 信次", dept: "営業本部長", career: "15年", license: "住宅ローンアドバイザー" },
  { id: "157200", name: "山岡 洋一", dept: "京都支店長", career: "14年", license: "" },
  { id: "147195", name: "西口・クロフォード・丈", dept: "営業課長", career: "12年", license: "" },
  { id: "92140", name: "入江 将大", dept: "本社工務部 部長", career: "10年", license: "" },
  { id: "170083", name: "森下 嘉久", dept: "本店土木部 部長", career: "37年", license: "土木1級・2級建築施工管理技術者" },
  { id: "126651", name: "河野 英宣", dept: "開発設計部 部長", career: "30年", license: "2級建築士" },
  { id: "126646", name: "栗野 佑也", dept: "住宅設計部 責任者", career: "12年", license: "2級建築士" },
  { id: "194526", name: "岩佐 篤志", dept: "建築設計部", career: "13年", license: "2級建築士" },
  { id: "159106", name: "稲塚 康員", dept: "本店工務部", career: "6年", license: "" },
  { id: "218450", name: "柏崎 修平", dept: "本店営業部", career: "7年", license: "宅地建物取引士" },
  { id: "258798", name: "三野 雄資", dept: "営業部", career: "3年", license: "" },
  { id: "258809", name: "尾田 洋基", dept: "本社工務部", career: "2年", license: "" },
  { id: "58990", name: "澤 佳純", dept: "本店工務部", career: "2年", license: "栄養士免許" },
  { id: "171880", name: "和田 詩織", dept: "経理", career: "1年", license: "秘書技能検定" },
  { id: "92293", name: "多口 典子", dept: "監査役員", career: "15年", license: "簿記・建設業経理事務士" },
  { id: "218454", name: "イスル サンパツ", dept: "土木部・工務部", career: "", license: "" },
  { id: "258745", name: "久我 英一", dept: "顧問", career: "", license: "" },
];

export default function StaffSection() {
  const sectionRef = useScrollIn<HTMLDivElement>(true);

  return (
    <section id="staff" className="bg-bg-primary py-[var(--section-py)]">
      <div
        ref={sectionRef}
        className="max-w-[1400px] mx-auto px-[var(--page-px)] scroll-in"
      >
        {/* ヘッダー */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10 md:mb-14">
          <div className="max-w-[640px]">
            <p className="font-section-label text-main text-xs md:text-sm mb-3 tracking-[0.15em]">
              STAFF
            </p>
            <h2 className="text-[clamp(24px,3.5vw,40px)] text-text-primary mb-4">
              19人で、お家をつくります。
            </h2>
            <p className="text-text-secondary text-[clamp(15px,1.1vw,17px)] leading-relaxed">
              営業・設計・工務・経理まで、下請けなし・全員自社。打合せから引渡しまで、同じ顔ぶれで対応します。
            </p>
          </div>
          <div
            className="text-right"
            style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}
          >
            <span className="text-main font-light text-6xl md:text-7xl block leading-none">
              19
            </span>
            <span className="text-text-secondary text-xs md:text-sm">人の職人</span>
          </div>
        </div>

        {/* スタッフグリッド */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[var(--card-gap)]">
          {STAFF.map((s) => (
            <div key={s.id} className="scroll-in">
              <div className="relative aspect-[4/5] rounded overflow-hidden mb-3 bg-bg-secondary">
                <Image
                  src={`/images/staff/${s.id}.webp`}
                  alt={s.name}
                  fill
                  className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                />
                {s.highlight && (
                  <span className="absolute top-2 left-2 bg-main text-white text-[10px] font-medium px-2 py-0.5 rounded tracking-wider">
                    代表
                  </span>
                )}
              </div>
              <p
                className="text-text-primary text-sm font-medium mb-0.5"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {s.name}
              </p>
              <p className="text-text-secondary text-xs mb-1">{s.dept}</p>
              {s.career && (
                <p className="text-main text-[10px]" style={{ fontFamily: "var(--font-inter), Inter, sans-serif" }}>
                  経験 {s.career}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
