import type { Metadata } from "next";
import {
  SiteCtaBand,
  SiteHero,
  SiteIndustryImageSection,
  SiteProductShowcase,
  SiteShell,
  SiteTrustStrip,
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

        <section className="site-section site-product-section">
          <SiteProductShowcase />
        </section>

        <SiteIndustryImageSection />

        <SiteCtaBand
          title="기업의 문제, 자동화로 해결하세요."
          description="AI-Core는 5일 안에 기업 맞춤형 솔루션을 제공합니다."
          label="5일 도입하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
