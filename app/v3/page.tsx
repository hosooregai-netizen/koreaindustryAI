import type { Metadata } from "next";
import {
  V3AiCoreShowcase,
  V3CtaBand,
  V3Hero,
  V3IndustryWordmarks,
  V3ProductCards,
  V3SectionHeading,
  V3Shell,
  V3ToolCta,
  V3TrustStrip,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "대한산업AI | AI-Core 산업 업무 자동화",
  description: "3000개 위젯을 조립해 산업별 업무 시스템을 5일 안에 시현하는 AI-Core 회사 소개 페이지입니다.",
};

export default function V3HomePage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="AI-Core for Industrial Operations"
          title="산업별 업무 시스템을 5일 안에 시현합니다."
          description="대한산업AI는 ERP, 문서, 승인, 대시보드에 필요한 3000개 위젯을 조립해 고객사의 핵심 업무를 빠르게 보여주는 AI-Core를 만듭니다."
          primary={{ label: "5일 도입 문의하기", href: "/v3/contact" }}
          secondary={{ label: "AI-Core 보기", href: "/v3/products/ai-core" }}
          visual="home"
          video
        />
        <V3TrustStrip />
        <V3IndustryWordmarks />

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Products"
            title="우선 제품은 AI-Core 하나에 집중합니다."
            description="AI Apps와 Tools는 별도 제품군으로 나누기보다, 지금은 AI-Core 안에서 조립 가능한 화면과 모듈로 설명합니다."
            split
          />
          <V3ProductCards />
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading
            eyebrow="AI-Core"
            title="핵심 아이템을 고르고, ERP형 모듈을 조립하고, 5일 안에 시현합니다."
            description="회의에서 합의한 방향처럼 v1은 AI-Core를 명확히 보여주는 데 집중합니다."
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
