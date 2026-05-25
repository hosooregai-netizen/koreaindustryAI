import type { Metadata } from "next";
import { V3CtaBand, V3Hero, V3Shell, V3ToolCta } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "Tools 준비 중 | 대한산업AI",
  description: "전자서명, 사진대지, 문서 정리, 데이터 변환 툴은 AI-Core 쇼케이스 모듈로 소개합니다.",
};

export default function ToolsPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Tools"
          title="Tools는 무료 공개 툴이 아니라 AI-Core 쇼케이스 모듈입니다."
          description="전자서명, TBM 서명, 사진대지, 문서 정리, 데이터 변환은 고객 맞춤 업무 시스템에 붙일 수 있는 조립 단위로 설명합니다."
          primary={{ label: "AI-Core 보기", href: "/v3/products/ai-core" }}
          secondary={{ label: "도입 문의", href: "/v3/contact" }}
          visual="products"
        />
        <V3ToolCta />
        <V3CtaBand title="필요한 툴을 말해주시면 AI-Core 모듈로 묶어봅니다." description="작은 툴 하나에서 시작해 실제 업무 화면과 승인 흐름까지 확장할 수 있습니다." />
      </main>
    </V3Shell>
  );
}
