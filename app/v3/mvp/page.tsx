import type { Metadata } from "next";
import { V3CtaBand, V3Hero, V3SectionHeading, V3Shell } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "MVP 준비 중 | 대한산업AI",
  description: "대한산업AI MVP 페이지는 준비 중입니다.",
};

export default function MvpPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="MVP"
          title="MVP 시작하기 페이지는 준비 중입니다."
          description="상단 시작하기 버튼은 현재 준비중 모달로 안내합니다. 실제 MVP 빌더는 AI-Core 도입 흐름이 정리되면 연결할 예정입니다."
          primary={{ label: "5일 도입 문의", href: "/v3/contact" }}
          secondary={{ label: "AI-Core 보기", href: "/v3/products/ai-core" }}
          visual="products"
        />
        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Coming Soon"
            title="지금은 문의 폼을 통해 첫 시현 범위를 함께 정합니다."
            description="MVP 페이지가 열리기 전까지는 고객 문의에서 업무 샘플과 도입 목표를 받아 검토합니다."
            split
          />
        </section>
        <V3CtaBand title="MVP가 없어도 5일 도입 상담은 바로 시작할 수 있습니다." description="반복 업무 하나를 알려주시면 AI-Core로 어떤 화면을 만들 수 있는지 정리해드립니다." />
      </main>
    </V3Shell>
  );
}
