import type { Metadata } from "next";
import { SiteComingSoonPage } from "@/components/site";

export const metadata: Metadata = {
  title: "회사 소개 준비 중 | 대한산업AI",
  description: "대한산업AI 회사 소개 페이지는 준비 중입니다.",
};

export default function CompanyPage() {
  return (
    <SiteComingSoonPage
      eyebrow="Company"
      title="회사 소개 페이지는 준비 중입니다."
      description="법인 신뢰, 작업 방식, 도입 사례를 정리한 뒤 공개할 예정입니다. 지금은 문의를 통해 먼저 상담할 수 있습니다."
      visual="company"
    />
  );
}
