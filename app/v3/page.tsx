import type { Metadata } from "next";
import Link from "next/link";
import {
  V3AutomationDiagram,
  V3CapabilityGrid,
  V3CtaBand,
  V3Hero,
  V3ProductGrid,
  V3SectionHeading,
  V3Shell,
  V3TrustStrip,
  V3UseCasePreview,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "대한산업AI v3 | 기업 자동화 솔루션",
  description:
    "대한산업AI v3 공식 랜딩. ERP, 사내 시스템, 문서, 보고서, 대시보드를 연결하는 기업 AI 자동화 솔루션.",
};

const problems = [
  "엑셀 수작업",
  "메일 / 웹하드 확인",
  "ERP 중복 입력",
  "보고서 반복 작성",
  "대장 업데이트 누락",
  "현황 파악 지연",
];

export default function V3HomePage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Enterprise AI Automation Partner"
          title="AI로 기업의 생산성을 혁신하는 자동화 솔루션"
          description="ERP, 사내 시스템, 문서, 메일, 웹하드, 대시보드까지 반복 업무를 하나의 자동화 흐름으로 연결합니다."
          primary={{ label: "MVP 상담하기", href: "/v3/mvp" }}
          secondary={{ label: "제품 보기", href: "/v3/products" }}
        />
        <V3TrustStrip />

        <section className="v3-section v3-soft">
          <V3SectionHeading
            eyebrow="Problem"
            title="업무는 반복되고, 시스템은 서로 끊어져 있습니다."
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
            eyebrow="Automation Layer"
            title="기존 업무 흐름 위에 자동화 레이어를 붙입니다."
            description="새 시스템을 강요하기보다 이미 쓰는 시스템과 문서 양식 위에 필요한 자동화 흐름을 설계합니다."
            split
          />
          <V3AutomationDiagram />
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading
            eyebrow="Products"
            title="대한산업AI 제품군"
            description="제품 페이지에서 각 모듈과 산업별 패키지를 더 자세히 볼 수 있습니다."
            split
          />
          <V3ProductGrid />
          <div className="v3-section-action">
            <Link className="v3-button v3-button-secondary-dark" href="/v3/products">
              제품 자세히 보기
            </Link>
          </div>
        </section>

        <section className="v3-section v3-dark">
          <V3SectionHeading eyebrow="Use Cases" title="현장에서 바로 이해되는 적용 장면" />
          <V3UseCasePreview />
        </section>

        <section className="v3-section v3-mvp-band">
          <div>
            <p className="v3-eyebrow">MVP</p>
            <h2>처음부터 큰 시스템을 만들 필요는 없습니다.</h2>
            <p>
              반복 업무 하나를 골라 MVP로 자동화 가능성을 검증하고, 효과가 확인되면 본 구현으로 확장합니다.
            </p>
          </div>
          <Link className="v3-button v3-button-primary" href="/v3/mvp">
            MVP 방식 보기
            <span>→</span>
          </Link>
        </section>

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Company"
            title="기업 업무 자동화를 구현하는 법인 기술 파트너"
            description="방문 진단, 업무 분석, 시스템 연동, 문서 자동화, 대시보드 구현까지 실제 업무 흐름을 기준으로 움직입니다."
            split
          />
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
