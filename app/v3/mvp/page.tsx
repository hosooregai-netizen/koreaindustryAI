import type { Metadata } from "next";
import {
  V3ContactForm,
  V3Hero,
  V3MvpTargets,
  V3Process,
  V3SectionHeading,
  V3Shell,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "MVP | 대한산업AI v3",
  description: "반복 업무 하나부터 시작하는 대한산업AI MVP 자동화 방식.",
};

const reasons = [
  "AI를 도입하고 싶은데 어디부터 시작할지 모르겠다.",
  "사내 시스템을 한 번에 바꾸기는 부담스럽다.",
  "수작업 하나만 먼저 줄여보고 싶다.",
  "실제 효과를 보고 본 구현을 결정하고 싶다.",
];

const outputs = [
  "자동화 데모",
  "관리자 화면",
  "보고서 자동 생성 샘플",
  "대시보드 프로토타입",
  "연동 가능성 검토서",
  "본 구현 제안 범위",
];

export default function MvpPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="MVP"
          title="반복 업무 하나부터 MVP로 검증합니다."
          description="처음부터 전체 시스템을 바꾸지 않습니다. 가장 반복적이고 효과가 큰 업무 하나를 골라 빠르게 자동화 가능성을 검증합니다."
          primary={{ label: "MVP 문의하기", href: "/v3/contact" }}
          secondary={{ label: "제품 보기", href: "/v3/products" }}
          visual="mvp"
        />

        <section className="v3-section v3-soft">
          <V3SectionHeading eyebrow="When" title="이런 상황이라면 MVP가 맞습니다." />
          <div className="v3-reason-grid">
            {reasons.map((reason) => (
              <article key={reason}>{reason}</article>
            ))}
          </div>
        </section>

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Targets"
            title="MVP 대상 업무"
            description="작게 시작해도 효과를 확인하기 쉬운 반복 업무부터 선택합니다."
            split
          />
          <V3MvpTargets />
        </section>

        <section className="v3-section v3-dark">
          <V3SectionHeading eyebrow="Process" title="MVP 진행 방식" />
          <V3Process />
        </section>

        <section className="v3-section">
          <V3SectionHeading eyebrow="Deliverables" title="MVP 산출물" />
          <div className="v3-target-grid">
            {outputs.map((output) => (
              <span key={output}>{output}</span>
            ))}
          </div>
        </section>

        <section className="v3-section v3-contact-split">
          <div>
            <p className="v3-eyebrow">MVP Contact</p>
            <h2>자동화하고 싶은 반복 업무 하나를 알려주세요.</h2>
            <p>MVP로 가능한 범위를 먼저 확인하고, 효과가 명확하면 본 구현으로 확장합니다.</p>
            <div className="v3-mvp-scope">
              <strong>1개 업무</strong>
              <strong>샘플 데이터 기준</strong>
              <strong>데모 / 프로토타입</strong>
              <strong>본 구현 제안</strong>
            </div>
          </div>
          <V3ContactForm mvp />
        </section>
      </main>
    </V3Shell>
  );
}
