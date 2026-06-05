import type { Metadata } from "next";
import { SiteBlogPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Blog | 대한산업AI",
  description: "AI-Core, 업무 자동화, 산업별 적용 글을 모아 보는 대한산업AI 블로그 페이지입니다.",
};

export default function BlogPage() {
  return <SiteBlogPage />;
}
