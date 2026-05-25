import type { Metadata } from "next";
import { V3CtaBand, V3DetailFeatureGrid, V3Hero, V3Process, V3SectionHeading, V3Shell } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "회사 소개 | 대한산업AI",
  description: "대한산업AI의 슬로건, 목표, 5일 도입 철학을 소개합니다.",
};

const goals = [
  {
    title: "현장 업무를 먼저 이해합니다",
    text: "툴을 먼저 정하지 않고 담당자의 화면, 문서, 승인 기준, 반복 입력 지점을 확인합니다.",
    example: "방문 진단 / 원격 미팅",
  },
  {
    title: "기존 시스템을 존중합니다",
    text: "ERP와 사내 시스템을 교체하기보다 앞뒤 반복 업무를 줄이는 자동화 레이어를 설계합니다.",
    example: "ERP / 메일 / 문서 연동",
  },
  {
    title: "작게 검증하고 확장합니다",
    text: "첫 도입은 반복 업무 하나로 시작하고, 효과가 확인되면 운영 범위를 넓힙니다.",
    example: "5일 도입 / MVP 검증",
  },
];

const steps = ["업무 흐름 확인", "문서와 데이터 샘플 정리", "자동화 가능 범위 제안", "5일 도입 검증", "운영 확장 범위 결정"];

export default function CompanyPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Company"
          title="대한산업AI는 기업 업무 자동화를 구현하는 기술 파트너입니다."
          description="우리는 멋진 데모보다 실제 담당자가 매일 줄일 수 있는 시간을 중요하게 봅니다. 기존 업무를 자세히 보고, 작게 검증하고, 운영 가능한 자동화로 확장합니다."
          primary={{ label: "5일 도입 문의", href: "/v3/contact" }}
          secondary={{ label: "AI-Core 보기", href: "/v3/products/ai-core" }}
          visual="company"
        />

        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Slogan"
            title="AI는 새 시스템이 아니라 이미 돌아가는 업무 위에 붙는 실행력이어야 합니다."
            description="대한산업AI는 반복 업무를 줄이는 데 필요한 설계, 구현, 검증을 하나의 흐름으로 제공합니다."
            split
          />
          <V3DetailFeatureGrid items={goals} />
        </section>

        <section className="v3-section v3-dark">
          <V3SectionHeading eyebrow="How We Work" title="5일 도입은 이렇게 진행합니다." />
          <V3Process steps={steps} />
        </section>

        <V3CtaBand
          title="회사 소개를 보셨다면, 이제 우리 업무에 맞는 첫 지점을 찾아볼 차례입니다."
          description="자동화가 가능한지 확신이 없어도 괜찮습니다. 반복되는 업무와 현재 사용하는 도구만 알려주세요."
        />
      </main>
    </V3Shell>
  );
}
