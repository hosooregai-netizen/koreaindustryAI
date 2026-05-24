import type { Metadata } from "next";
import {
  V3AutomationDiagram,
  V3CtaBand,
  V3Hero,
  V3ProductGrid,
  V3SectionHeading,
  V3Shell,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "제품 | 대한산업AI v3",
  description: "ERP 연동, 업무 자동화, 문서 자동화, 대시보드 구현을 포함한 대한산업AI 제품군.",
};

const packages = [
  {
    title: "건설 안전 / 감리 법인",
    items: ["현장 방문 일정", "사진 / 점검 데이터 정리", "안전지도 보고서 생성", "안전보건 대장 반영", "관리자 대시보드"],
  },
  {
    title: "제조업",
    items: ["입출고 데이터 정리", "재고 현황 대시보드", "부족 재고 알림", "보고서 자동 생성", "ERP 반영"],
  },
];

const steps = ["기존 업무 확인", "데이터 출처 연결", "자동화 규칙 설계", "문서 / 대시보드 생성", "운영 피드백 반영"];

export default function ProductsPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Products"
          title="기업 내부 시스템에 바로 붙는 AI 자동화 제품군"
          description="새 시스템을 강요하지 않습니다. 이미 쓰고 있는 ERP, 메일, 웹하드, 문서 양식 위에 필요한 자동화 흐름을 설계합니다."
          primary={{ label: "MVP 상담하기", href: "/v3/mvp" }}
          secondary={{ label: "문의하기", href: "/v3/contact" }}
          visual="architecture"
        />

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="System Map"
            title="입력부터 산출물까지 하나의 흐름으로 설계합니다."
            description="데이터 수집, 분류, AI 문서 생성, 규칙 엔진, 승인 알림을 연결해 업무 산출물을 만듭니다."
            split
          />
          <V3AutomationDiagram />
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading eyebrow="Modules" title="제품 모듈" />
          <V3ProductGrid />
        </section>

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Packages"
            title="우선 적용 산업 패키지"
            description="현재는 건설 안전 / 감리 법인과 제조업을 우선 대상으로 설계합니다."
            split
          />
          <div className="v3-package-grid">
            {packages.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <ul>
                  {item.items.map((text) => (
                    <li key={text}>{text}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="v3-section v3-dark">
          <V3SectionHeading eyebrow="How It Works" title="작동 방식" />
          <ol className="v3-horizontal-steps">
            {steps.map((step, index) => (
              <li key={step}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </li>
            ))}
          </ol>
        </section>

        <V3CtaBand
          title="우리 회사 업무에 어떤 자동화가 가능한지 확인해보세요."
          description="가장 효과가 큰 반복 업무부터 MVP로 시작할 수 있습니다."
          href="/v3/mvp"
          label="MVP 상담하기"
        />
      </main>
    </V3Shell>
  );
}
