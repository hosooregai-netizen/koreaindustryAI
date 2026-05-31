import type { Metadata } from "next";
import { SiteComingSoonPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Blog 준비 중 | 대한산업AI",
  description: "대한산업AI 블로그 페이지는 준비 중입니다.",
};

export default function BlogPage() {
  return (
    <SiteComingSoonPage
      eyebrow="Blog"
      title="블로그 페이지는 준비 중입니다."
      description="AI-Core, 업무 자동화, 산업별 적용 글은 검토 후 공개할 예정입니다. 지금은 문의로 먼저 상담할 수 있습니다."
      visual="community"
    />
  );
}
