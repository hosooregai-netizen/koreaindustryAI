import type { Metadata } from "next";
import {
  V3AutomationDiagram,
  V3CapabilityGrid,
  V3CtaBand,
  V3Hero,
  V3IndustryCards,
  V3MetricStrip,
  V3ProductShowcase,
  V3SectionHeading,
  V3Shell,
  V3StoryCards,
  V3TrustStrip,
  V3UseCasePreview,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "대한산업AI v3 | 기업 자동화 솔루션",
  description:
    "ERP, 사내 시스템, 문서, 보고서, 대시보드를 연결하는 대한산업AI의 기업 AI 자동화 솔루션 랜딩 페이지입니다.",
};

const problems = [
  "수작업 보고서 작성",
  "메일 / 웹하드 확인",
  "ERP 중복 입력",
  "현장 사진 정리",
  "대장 업데이트 누락",
  "운영 현황 파악 지연",
];

export default function V3HomePage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Enterprise AI Automation"
          title="AI로 기업의 생산성을 혁신하는 자동화 솔루션"
          description="ERP, 사내 시스템, 문서, 메일, 웹하드, 대시보드까지 반복 업무를 하나의 자동화 흐름으로 연결합니다."
          primary={{ label: "MVP 상담하기", href: "/v3/mvp" }}
          secondary={{ label: "제품 보기", href: "/v3/products" }}
        />
        <V3TrustStrip />

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Products"
            title="업무 현장에 바로 붙는 자동화 제품군"
            description="도입 설명보다 먼저, 실제로 무엇이 자동화되는지 보이도록 제품 구조를 화면 중심으로 배치했습니다."
            split
          />
          <V3ProductShowcase />
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading
            eyebrow="Problem"
            title="반복 업무가 많고, AI 도입 욕구가 있는 기업을 먼저 봅니다."
            description="처음부터 거대한 시스템을 바꾸기보다, 지금 쓰는 도구 위에서 반복되는 업무를 빠르게 줄입니다."
            split
          />
          <div className="v3-problem-list">
            {problems.map((problem, index) => (
              <article key={problem}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{problem}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Industries"
            title="건설 안전에서 제조 현장까지, 반복되는 운영 업무를 자동화합니다."
          />
          <V3IndustryCards />
        </section>

        <section className="v3-section v3-dark">
          <V3SectionHeading
            eyebrow="Automation Layer"
            title="기존 시스템 위에 자동화 레이어를 붙입니다."
            description="입력 자료를 수집하고, AI로 정리하고, 보고서·대장·ERP·대시보드로 다시 내보내는 흐름입니다."
            split
          />
          <V3AutomationDiagram />
        </section>

        <section className="v3-section">
          <V3SectionHeading eyebrow="Use Cases" title="현재 바로 설명 가능한 적용 장면" />
          <V3UseCasePreview />
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading eyebrow="Story" title="대한산업AI의 이야기를 만나보세요." />
          <V3StoryCards />
        </section>

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Company"
            title="방문했을 때 ‘제대로 된 업체’라는 신뢰를 주는 기술 파트너"
            description="법인 고객의 실제 업무 화면, 문서 양식, 시스템 권한을 기준으로 자동화 범위를 설계합니다."
            split
          />
          <V3MetricStrip />
          <V3CapabilityGrid />
        </section>

        <V3CtaBand
          title="자동화가 필요한 업무를 알려주세요."
          description="현재 사용하는 프로그램과 반복 업무를 알려주시면 도입 가능 범위를 검토해 연락드리겠습니다."
        />
      </main>
    </V3Shell>
  );
}
