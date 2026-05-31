import type { Metadata } from "next";
import { SiteComingSoonPage } from "@/components/site";

export const metadata: Metadata = {
  title: "건설 준비 중 | 대한산업AI",
  description: "건설 산업 적용 페이지는 준비 중입니다.",
};

export default function ConstructionPage() {
  return (
    <SiteComingSoonPage
      eyebrow="Industry"
      title="건설 산업 페이지는 준비 중입니다."
      description="현장 문서, 안전 기록, 점검 보고 흐름을 중심으로 AI-Core 적용 가능성을 정리하고 있습니다."
      visual="products"
    />
  );
}
