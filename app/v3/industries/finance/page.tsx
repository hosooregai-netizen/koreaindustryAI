import type { Metadata } from "next";
import { V3ComingSoonPage } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "금융 준비 중 | 대한산업AI",
  description: "금융 산업 적용 페이지는 준비 중입니다.",
};

export default function FinancePage() {
  return (
    <V3ComingSoonPage
      eyebrow="Industry"
      title="금융 산업 페이지는 준비 중입니다."
      description="심사, 문서 검토, 리포트 흐름을 중심으로 AI-Core 적용 가능성을 정리하고 있습니다."
      visual="products"
    />
  );
}
