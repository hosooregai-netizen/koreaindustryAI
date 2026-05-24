import type { Metadata } from "next";
import {
  V3CapabilityGrid,
  V3CtaBand,
  V3Hero,
  V3SectionHeading,
  V3Shell,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "회사소개 | 대한산업AI v3",
  description: "대한산업AI 주식회사의 기업 업무 자동화 구현 역량과 작업 방식.",
};

const workStyle = [
  "현장 방문 또는 원격 미팅",
  "실제 업무 화면 확인",
  "문서 양식과 반복 업무 분석",
  "자동화 가능 범위 제안",
  "MVP 또는 본 구현 진행",
];

export default function CompanyPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Company"
          title="대한산업AI는 기업 업무 자동화를 구현하는 법인 기술 파트너입니다."
          description="건설 안전지도와 감리 법인의 반복 행정부터 제조 현장의 재고·보고 업무까지, 실제 업무에 맞는 자동화 시스템을 설계하고 구현합니다."
          primary={{ label: "문의하기", href: "/v3/contact" }}
          secondary={{ label: "제품 보기", href: "/v3/products" }}
          visual="company"
        />

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Overview"
            title="대한산업AI 주식회사"
            description="ERP / 사내 시스템 연동, 업무 자동화, 문서 자동화, 운영 대시보드 구현을 중심으로 기업의 반복 업무를 줄입니다."
            split
          />
          <div className="v3-company-summary">
            <div>
              <span>주요 고객 산업</span>
              <strong>건설 안전 / 감리 · 제조</strong>
            </div>
            <div>
              <span>핵심 제공 서비스</span>
              <strong>업무 자동화 · 문서 자동화 · 시스템 연동</strong>
            </div>
            <div>
              <span>작업 방식</span>
              <strong>방문 진단 기반 맞춤 구현</strong>
            </div>
          </div>
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading
            eyebrow="Work Style"
            title="화면을 보고, 문서를 보고, 실제 업무 흐름에서 자동화 지점을 찾습니다."
          />
          <ol className="v3-horizontal-steps is-light">
            {workStyle.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <section className="v3-section">
          <V3SectionHeading eyebrow="Capabilities" title="기술 범위" />
          <V3CapabilityGrid />
        </section>

        <V3CtaBand
          title="현재 업무 흐름부터 함께 확인하겠습니다."
          description="자동화가 필요한 업무가 있다면 방문 또는 원격 미팅으로 먼저 가능 범위를 검토합니다."
        />
      </main>
    </V3Shell>
  );
}
