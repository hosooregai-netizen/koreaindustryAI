import type { Metadata } from "next";
import {
  V3AutomationDiagram,
  V3CtaBand,
  V3DetailFeatureGrid,
  V3Hero,
  V3Process,
  V3SectionHeading,
  V3Shell,
  V3ToolCta,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "AI-Core | 대한산업AI",
  description: "3000개 위젯과 ERP 모듈 조립으로 고객 맞춤 업무 시스템을 5일 안에 시현하는 AI-Core 상세 페이지입니다.",
};

const features = [
  {
    title: "3000개 위젯",
    text: "입력 폼, 카드, 테이블, 승인, 알림, 리포트, 대시보드까지 업무에 필요한 UI 단위를 조합합니다.",
    example: "화면 단위 조립",
  },
  {
    title: "ERP 모듈 구성",
    text: "고객, 현장, 문서, 재고, 결재, 운영 로그처럼 실제 업무의 데이터 구조를 묶습니다.",
    example: "업무 데이터 모델링",
  },
  {
    title: "핵심 아이템 선정",
    text: "처음부터 모든 기능을 만들지 않고 효과가 가장 빨리 보이는 업무 하나를 먼저 정합니다.",
    example: "첫 시현 범위 결정",
  },
  {
    title: "고객 맞춤 SI",
    text: "산업별 용어, 문서 양식, 승인 기준, 담당자 역할에 맞춰 화면과 자동화 흐름을 구성합니다.",
    example: "제조 / 금융 / 건설 / 물류 유통",
  },
];

const steps = ["업무 인터뷰", "핵심 아이템 선정", "위젯과 데이터 구조 조립", "AI 처리 흐름 연결", "5일 시현과 도입 판단"];

export default function AiCorePage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="AI-Core"
          title="모듈을 조립해 고객 맞춤 ERP형 시스템을 5일 안에 보여줍니다."
          description="AI-Core는 앱 하나를 파는 방식이 아니라 고객사의 실제 업무에 맞춰 화면, 데이터, 승인, 리포트 모듈을 조립하는 산업 AI 도입 방식입니다."
          primary={{ label: "5일 도입 문의", href: "/v3/contact" }}
          secondary={{ label: "제품 Overview", href: "/v3/products" }}
          visual="products"
        />

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="What It Does"
            title="AI-Core는 핵심 업무를 먼저 고르고, 조립하고, 실제로 움직이게 보여줍니다."
            description="도입 상담에서 가장 중요한 것은 큰 비전보다 담당자가 매일 줄이고 싶은 반복 업무입니다."
            split
          />
          <V3DetailFeatureGrid items={features} />
        </section>

        <section className="v3-section v3-dark">
          <V3SectionHeading eyebrow="Flow" title="입력, 처리, 결과물을 하나의 업무 흐름으로 묶습니다." />
          <V3AutomationDiagram />
        </section>

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="5-Day Demo"
            title="도입과 사용 흐름은 Hero → 설명 → 도입/사용 → CTA 구조로 유지합니다."
            description="제품 상세의 구조를 통일해 이후 AI Apps나 Tools가 확장되더라도 같은 템플릿으로 이어갈 수 있습니다."
            split
          />
          <V3Process steps={steps} />
        </section>

        <V3ToolCta />

        <V3CtaBand
          title="AI-Core로 조립할 첫 업무를 정해보세요."
          description="업무 샘플을 보내주시면 5일 안에 시현 가능한 화면, 자동화 흐름, 도입 범위를 정리해드립니다."
        />
      </main>
    </V3Shell>
  );
}
