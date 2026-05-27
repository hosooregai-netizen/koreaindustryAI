import type { Metadata } from "next";
import { V3ComingSoonPage } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "Newsletter 준비 중 | 대한산업AI",
  description: "대한산업AI 뉴스레터 페이지는 준비 중입니다.",
};

export default function NewsletterPage() {
  return (
    <V3ComingSoonPage
      eyebrow="Newsletter"
      title="뉴스레터 페이지는 준비 중입니다."
      description="AI-Core 도입, 업무 자동화, 산업별 적용 인사이트를 받을 수 있는 흐름을 준비하고 있습니다."
      visual="community"
    />
  );
}
