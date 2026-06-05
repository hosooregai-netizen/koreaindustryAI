import type { Metadata } from "next";
import { SiteTechnologyPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Technology | 대한산업AI",
  description: "AI-Core 기술 구조, 자동화 아키텍처, 데이터 처리 방식을 정리한 대한산업AI 기술 콘텐츠 페이지입니다.",
};

export default function TechnologyPage() {
  return <SiteTechnologyPage />;
}
