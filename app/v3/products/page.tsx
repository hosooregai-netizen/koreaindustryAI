import type { Metadata } from "next";
import {
  V3AiCoreShowcase,
  V3AutomationDiagram,
  V3CtaBand,
  V3DetailFeatureGrid,
  V3Hero,
  V3Process,
  V3SectionHeading,
  V3Shell,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "Products | 대한산업AI",
  description: "대한산업AI의 제품군은 우선 AI-Core 하나에 집중합니다.",
};

const overviewItems = [
  {
    title: "하나의 제품 메시지",
    text: "드롭다운과 제품 상세는 AI-Core를 중심으로 정리하고, 앱과 툴은 AI-Core 안의 조립 가능한 모듈로 설명합니다.",
    example: "AI-Core 단일 노출",
  },
  {
    title: "업무 시스템 조립",
    text: "고객사의 문서, 승인, 데이터, 대시보드를 위젯 단위로 묶어 ERP처럼 작동하는 화면을 만듭니다.",
    example: "ERP 모듈 / 문서 / 승인 / 리포트",
  },
  {
    title: "5일 시현",
    text: "전체 구축보다 핵심 업무 하나를 먼저 고르고 작동 가능한 흐름을 빠르게 보여줍니다.",
    example: "진단 → 조립 → 시현",
  },
];

const steps = ["핵심 업무 선정", "데이터와 문서 샘플 정리", "AI-Core 위젯 조립", "5일 시현", "도입 범위 확정"];

export default function ProductsPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Products"
          title="AI-Core 하나로 산업별 업무 시스템을 조립합니다."
          description="대한산업AI의 v1 제품 페이지는 AI-Core를 중심으로 구성합니다. 3000개 위젯, ERP 모듈 조립, 고객 맞춤 SI, 5일 시현을 한 흐름으로 설명합니다."
          primary={{ label: "AI-Core 자세히 보기", href: "/v3/products/ai-core" }}
          secondary={{ label: "5일 도입 문의", href: "/v3/contact" }}
          visual="products"
        />

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Overview"
            title="제품을 넓게 펼치기보다, 첫 메시지는 AI-Core로 선명하게 갑니다."
            description="AI Apps와 Tools는 추후 확장 가능하지만 현재 상단 메뉴에서는 제외하고 AI-Core 안의 모듈로 다룹니다."
            split
          />
          <V3DetailFeatureGrid items={overviewItems} />
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading eyebrow="AI-Core Preview" title="업무 화면과 데이터 흐름을 조립하는 방식" />
          <V3AiCoreShowcase />
        </section>

        <section className="v3-section v3-dark">
          <V3SectionHeading
            eyebrow="Architecture"
            title="입력부터 결과물까지 하나의 업무 흐름으로 연결합니다."
            description="ERP, 문서, 엑셀, 현장 사진, 서명 같은 입력을 AI-Core에서 묶고 실제 사용 가능한 화면과 보고서로 시현합니다."
            split
          />
          <V3AutomationDiagram />
        </section>

        <section className="v3-section">
          <V3SectionHeading eyebrow="Adoption" title="도입 흐름은 단순하게 유지합니다." />
          <V3Process steps={steps} />
        </section>

        <V3CtaBand
          title="AI-Core로 먼저 보여줄 업무 하나를 함께 고르겠습니다."
          description="반복 빈도, 입력 데이터, 결과물을 기준으로 첫 시현 범위를 정하고 5일 안에 눈으로 확인할 수 있게 만듭니다."
        />
      </main>
    </V3Shell>
  );
}
