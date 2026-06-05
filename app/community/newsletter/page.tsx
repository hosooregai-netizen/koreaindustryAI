import type { Metadata } from "next";
import { SiteNewsletterPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Newsletter | 대한산업AI",
  description: "대한산업AI의 AI-Core 업데이트와 산업 자동화 인사이트를 받아보는 뉴스레터 페이지입니다.",
};

export default function NewsletterPage() {
  return <SiteNewsletterPage />;
}
