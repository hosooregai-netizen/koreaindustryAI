import type { Metadata } from "next";
import { SiteComingSoonPage } from "@/components/site";

export const metadata: Metadata = {
  title: "제조 준비 중 | 대한산업AI",
  description: "제조 산업 적용 페이지는 준비 중입니다.",
};

export default function ManufacturingPage() {
  return (
    <SiteComingSoonPage
      eyebrow="Industry"
      title="제조 산업 페이지는 준비 중입니다."
      description="생산, 재고, 견적, 보고 업무의 반복 흐름을 중심으로 AI-Core 적용 가능성을 정리하고 있습니다."
      visual="products"
    />
  );
}
