import type { Metadata } from "next";
import { V3CtaBand, V3Hero, V3SectionHeading, V3Shell } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "AI Apps 준비 중 | 대한산업AI",
  description: "AI Apps는 현재 AI-Core 안의 조립 가능한 앱 모듈로 정리하고 있습니다.",
};

export default function AiAppsPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="AI Apps"
          title="AI Apps는 AI-Core 안의 앱 모듈로 정리 중입니다."
          description="지금은 상단 메뉴에서 별도 제품으로 노출하지 않고, 고객 업무에 맞춰 조립되는 AI-Core 구성 요소로 다룹니다."
          primary={{ label: "AI-Core 보기", href: "/v3/products/ai-core" }}
          secondary={{ label: "5일 도입 문의", href: "/v3/contact" }}
          visual="products"
        />
        <section className="v3-section">
          <V3SectionHeading
            eyebrow="Roadmap"
            title="앱과 웹앱 버전은 실제 도입 사례가 쌓이면 별도 제품군으로 확장합니다."
            description="현재는 고객 맞춤 시현을 우선하고, 반복되는 앱 패턴이 확인되면 AI Apps 페이지를 다시 열겠습니다."
            split
          />
        </section>
        <V3CtaBand title="앱 형태가 필요해도 시작점은 AI-Core입니다." description="필요한 화면과 사용자 흐름을 알려주시면 앱 모듈로 조립 가능한 범위를 검토합니다." />
      </main>
    </V3Shell>
  );
}
