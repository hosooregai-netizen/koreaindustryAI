import type { Metadata } from "next";
import {
  SiteAutomationDiagram,
  SiteCtaBand,
  SiteDetailFeatureGrid,
  SiteHero,
  SiteProcess,
  SiteSectionHeading,
  SiteShell,
  SiteToolCta,
} from "@/components/site";

export const metadata: Metadata = {
  title: "Data-Driven AI-Core | 대한산업AI",
  description: "현장 데이터, 문서, 승인 흐름을 기업 맞춤 ERP 구조로 연결하는 Data-Driven AI-Core 상세 페이지입니다.",
};

const features = [
  {
    title: "업무 데이터 구조화",
    text: "문서, 운영 기록, 승인 흐름을 고객, 현장, 문서, 결재 같은 ERP형 구조로 정리합니다.",
    example: "고객 / 현장 / 문서 / 결재",
  },
  {
    title: "기업 맞춤 화면",
    text: "입력 폼, 테이블, 리포트, 대시보드를 실제 담당자가 쓰는 업무 흐름에 맞춰 구성합니다.",
    example: "입력 / 조회 / 보고 / 대시보드",
  },
  {
    title: "기존 시스템 연결",
    text: "ERP, 엑셀, 문서 저장소, 현장 사진처럼 이미 쓰는 데이터를 유지한 채 연결 범위를 정합니다.",
    example: "ERP / 엑셀 / 문서 / 사진",
  },
  {
    title: "현장 기준 반영",
    text: "산업별 용어, 문서 양식, 승인 기준을 반영해 실제 업무 데이터가 흐르는 방식을 보여줍니다.",
    example: "제조 / 금융 / 건설 / 물류 유통",
  },
];

const steps = ["업무 데이터 확인", "문서와 승인 흐름 정리", "ERP형 데이터 구조 설계", "업무 화면과 리포트 연결", "시현 후 도입 범위 판단"];

export default function DataDrivenPage() {
  return (
    <SiteShell>
      <main>
        <SiteHero
          eyebrow="Data-Driven AI-Core"
          title="현장 데이터를 기업 맞춤 ERP 구조로 연결합니다."
          description="Data-Driven AI-Core는 문서, 승인 흐름, 운영 데이터를 실제 업무 방식에 맞춰 정리하고 화면, 리포트, 대시보드로 활용하게 만드는 제품입니다."
          primary={{ label: "데이터 구조 상담", href: "/contact" }}
          secondary={{ label: "메인으로", href: "/" }}
          visual="products"
        />

        <section className="site-section">
          <SiteSectionHeading
            eyebrow="What It Does"
            title="Data-Driven AI-Core는 흩어진 업무 데이터를 관리 가능한 구조로 바꿉니다."
            description="도입 상담에서 가장 먼저 보는 것은 기업이 이미 사용하는 문서, 승인 기준, 운영 데이터의 실제 흐름입니다."
            split
          />
          <SiteDetailFeatureGrid items={features} />
        </section>

        <section className="site-section site-dark">
          <SiteSectionHeading eyebrow="Flow" title="입력 데이터, 처리 기준, 결과 화면을 하나의 ERP형 흐름으로 묶습니다." />
          <SiteAutomationDiagram />
        </section>

        <section className="site-section">
          <SiteSectionHeading
            eyebrow="Data Mapping"
            title="큰 구축보다 먼저 연결할 데이터와 업무 화면을 정합니다."
            description="상담에서 업무 샘플과 데이터 흐름을 확인하고, 먼저 시현할 수 있는 ERP형 구조와 도입 범위를 정리합니다."
            split
          />
          <SiteProcess steps={steps} />
        </section>

        <SiteToolCta />

        <SiteCtaBand
          title="Data-Driven AI-Core로 연결할 첫 데이터를 정해보세요."
          description="업무 샘플을 보내주시면 시현 가능한 데이터 구조, 화면, 리포트, 도입 범위를 정리해드립니다."
        />
      </main>
    </SiteShell>
  );
}
