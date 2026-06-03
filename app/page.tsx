import type { Metadata } from "next";
import {
  SiteCtaBand,
  SiteHero,
  SiteIndustryImageSection,
  SiteProductShowcase,
  SiteShell,
  SiteTrustStrip,
  SiteWhatsNewSection,
  SiteWorkTransitionSection,
} from "@/components/site";

export const metadata: Metadata = {
  title: "대한산업AI | AI-Core 산업 업무 자동화",
  description: "회사별 문서 양식, 승인 흐름, 운영 데이터를 반영해 실제 업무 방식에 맞는 AI-Core 시스템을 구성합니다.",
};

export default function SiteHomePage() {
  return (
    <SiteShell>
      <main>
        <SiteHero
          eyebrow="AI-Core for Industrial Operations"
          title="현장의 데이터로 만드는 AI 시스템"
          description="회사별 문서 양식, 승인 흐름, 운영 데이터를 반영해 실제 업무 방식에 맞는 시스템을 구성합니다."
          visual="home"
          video
        />
        <SiteTrustStrip />
        <SiteWorkTransitionSection />

        <section className="site-section site-product-section">
          <SiteProductShowcase />
        </section>

        <SiteIndustryImageSection />
        <SiteWhatsNewSection />

        <SiteCtaBand
          title="기업의 문제, 자동화로 해결하세요."
          label="도입 문의"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
