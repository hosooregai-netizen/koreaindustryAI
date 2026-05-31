import type { Metadata } from "next";
import { SiteComingSoonPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Technology 준비 중 | 대한산업AI",
  description: "대한산업AI 기술 콘텐츠 페이지는 준비 중입니다.",
};

export default function TechnologyPage() {
  return (
    <SiteComingSoonPage
      eyebrow="Technology"
      title="기술 콘텐츠 페이지는 준비 중입니다."
      description="AI-Core 구성, 자동화 아키텍처, 업무 데이터 흐름에 관한 글을 준비하고 있습니다."
      visual="community"
    />
  );
}
