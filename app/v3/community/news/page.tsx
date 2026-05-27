import type { Metadata } from "next";
import { V3ComingSoonPage } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "News 준비 중 | 대한산업AI",
  description: "대한산업AI 소식 페이지는 준비 중입니다.",
};

export default function NewsPage() {
  return (
    <V3ComingSoonPage
      eyebrow="News"
      title="뉴스 페이지는 준비 중입니다."
      description="대한산업AI의 업데이트와 공지 콘텐츠를 정리한 뒤 공개할 예정입니다."
      visual="community"
    />
  );
}
