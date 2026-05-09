import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingCta from "@/components/FloatingCta";

export const metadata: Metadata = {
  title: "プライバシーポリシー | やまと不動産",
  description: "株式会社やまと不動産の個人情報保護方針です。",
};

const POLICIES = [
  {
    title: "1. 個人情報保護の方針",
    body: "当社は個人情報保護に関する法令と社会秩序を尊重・厳守し、個人情報の適正な取扱いと保護に努めます。",
  },
  {
    title: "2. 個人情報の定義",
    body: "個人情報とは、お客様の氏名、生年月日、お電話番号、勤務先等の属性情報、E-Mailアドレス、ご住所、連帯保証人予定者の情報、その他お客様から提供を受けた情報において、1つまたは複数を組み合わせることにより、お客様個人を特定することのできる情報をいいます。",
  },
  {
    title: "3. 個人情報の取得、利用、提供",
    body: "個人情報の取得は、適正な手段によって行うとともに、利用目的の公表、通知、明示等をさせていただき、ご本人の同意なく、利用目的の範囲を超えた個人情報の取扱いはいたしません。また、個人情報を第三者へ提供・開示等する場合は、法令の定める手続きに則って行います。",
  },
  {
    title: "4. 個人情報の利用目的",
    body: "不動産の売買、賃貸、仲介、管理等の取引に関する契約の履行、情報・サービスの提供、商品に関する契約の履行、郵便物・電話・電子メール等によるご案内、アンケート、顧客動向分析または商品開発等の調査分析に利用します。情報・サービスの提供は、ご本人からの申出がありましたら取り止めさせていただきます。",
  },
  {
    title: "5. 個人情報の第三者への提供",
    body: "当社が保有する個人情報は、ご本人の同意がある場合、法令の規定に基づく場合、人の生命・身体または財産の保護のため必要がある場合、利用目的の達成に必要な範囲で業務委託先に開示する場合など、法令に則って第三者へ提供されることがあります。",
  },
  {
    title: "6. 個人情報の安全管理措置",
    body: "当社が有する個人情報は適正かつ慎重に管理し、個人情報への不正アクセス、紛失、改ざん、漏えい等を防止するため、必要かつ適切な安全管理措置を講じます。",
  },
  {
    title: "7. 個人情報取扱の委託",
    body: "当社が有する個人情報について、その取扱いを外部に委託する場合があります。その場合は、個人情報の保護に十分な措置が講じている者を選定し、委託先に対し必要かつ適切な監督を行います。",
  },
  {
    title: "8. 個人情報の開示・訂正等の手続き",
    body: "当社が管理する個人情報の開示、訂正、利用停止等に関するご本人からの要請については、本人であることを確認した上で、速やかに、合理的な範囲で必要な対応をします。",
  },
  {
    title: "9. 他のサイトへのリンク",
    body: "当ウェブサイトには第三者のウェブサイトへのリンクがありますが、当社は、これら第三者のウェブサイトにおけるプライバシー保護に関しての責任は負いませんので、予めご了承ください。",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-white py-[clamp(72px,8vw,140px)]">
        <article className="mx-auto max-w-[920px] px-[var(--page-px)]">
          <p className="font-section-label mb-4 text-xs tracking-[0.18em] text-main">
            PRIVACY POLICY
          </p>
          <h1 className="font-zen-old text-[clamp(28px,4vw,48px)] font-semibold leading-[1.35] text-text-primary">
            プライバシーポリシー
          </h1>
          <p className="mt-8 text-sm leading-[2] text-text-secondary">
            株式会社やまと不動産（以下「当社」といいます。）は、個人情報の重要性を認識し、その適正な取扱い保護に関し、次のとおり対応させていただきます。
          </p>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {POLICIES.map((policy) => (
              <section key={policy.title} className="py-7">
                <h2 className="text-base font-bold leading-[1.7] text-text-primary">
                  {policy.title}
                </h2>
                <p className="mt-3 text-sm leading-[2] text-text-secondary">
                  {policy.body}
                </p>
              </section>
            ))}
          </div>

          <section className="mt-10 rounded bg-bg-secondary px-5 py-6 md:px-8">
            <h2 className="text-base font-bold text-text-primary">
              10. 個人情報保護に関する問合せ先
            </h2>
            <p className="mt-3 text-sm leading-[2] text-text-secondary">
              株式会社やまと不動産
              <br />
              所在地：奈良県奈良市大宮町1丁目6番21
              <br />
              代表者名：古谷泰彦　小林敬昌
              <br />
              電話：0742-36-1123
              <br />
              FAX：0742-36-1888
            </p>
          </section>

          <p className="mt-8 text-sm leading-[2] text-text-secondary">
            本基本方針は法令などの制定改廃や情勢の変化により適宜変更します。
          </p>
        </article>
      </main>
      <Footer />
      <FloatingCta />
    </>
  );
}
