import type { Metadata } from "next";
import { SiteComingSoonPage } from "@/components/site";

export const metadata: Metadata = {
  title: "Automation AI-Core 준비 중 | 대한산업AI",
  description: "대한산업AI Automation AI-Core 페이지는 준비 중입니다.",
};

export default function AutomationPage() {
  return (
    <SiteComingSoonPage
      eyebrow="Automation AI-Core"
      title="Automation AI-Core 페이지는 준비 중입니다."
      description="큰 구축 전에 작은 반복 업무 자동화로 시작하는 흐름을 정리하고 있습니다. 먼저 자동화하고 싶은 업무 하나를 알려주시면 적용 가능 범위를 검토합니다."
      visual="products"
    />
  );
}
