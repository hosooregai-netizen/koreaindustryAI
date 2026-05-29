import type { Metadata } from "next";
import {
  V3AiCoreShowcase,
  V3CtaBand,
  V3Hero,
  V3IndustryImageSection,
  V3ProductShowcase,
  V3SectionHeading,
  V3Shell,
  V3ToolCta,
  V3TrustStrip,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "대한산업AI | AI-Core 산업 업무 자동화",
  description: "회사별 문서 양식, 승인 흐름, 운영 데이터를 반영해 실제 업무 방식에 맞는 AI-Core 시스템을 구성합니다.",
};

export default function V3HomePage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="AI-Core for Industrial Operations"
          title="현장의 데이터로 만드는 AI 시스템"
          description="회사별 문서 양식, 승인 흐름, 운영 데이터를 반영해 실제 업무 방식에 맞는 시스템을 구성합니다."
          primary={{ label: "AI-Core", href: "/v3/products/ai-core" }}
          visual="home"
          video
        />
        <V3TrustStrip />

        <section className="v3-section v3-product-section">
          <V3ProductShowcase />
        </section>

        <V3IndustryImageSection />

        <section className="v3-section v3-soft">
          <V3SectionHeading
            eyebrow="AI-Core"
            title="핵심 아이템을 고르고, ERP형 모듈을 조립하고, 5일 안에 시현합니다."
            description="큰 구축을 약속하기보다 반복 업무 하나를 실제 화면과 흐름으로 먼저 보여줍니다."
            split
          />
          <V3AiCoreShowcase />
        </section>

        <V3ToolCta />

        <V3CtaBand
          title="반복 업무 하나를 골라 5일 안에 자동화 가능성을 확인하세요."
          description="업무 화면, 문서 샘플, 처리 기준을 공유해주시면 AI-Core로 시현할 수 있는 범위와 첫 도입 흐름을 정리해드립니다."
        />
      </main>
    </V3Shell>
  );
}
