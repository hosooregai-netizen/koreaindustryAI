import type { Metadata } from "next";
import { V3ComingSoonPage } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "MVP 준비 중 | 대한산업AI",
  description: "대한산업AI MVP 시작 페이지는 준비 중입니다.",
};

export default function MvpPage() {
  return (
    <V3ComingSoonPage
      eyebrow="MVP"
      title="MVP 시작 패키지는 준비 중입니다."
      description="큰 구축 전에 작은 자동화로 시작하는 흐름을 정리하고 있습니다. 먼저 반복 업무 하나를 알려주시면 AI-Core 기준으로 검토합니다."
      visual="products"
    />
  );
}
