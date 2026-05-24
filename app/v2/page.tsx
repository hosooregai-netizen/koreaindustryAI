import type { Metadata } from "next";
import { V2Landing } from "@/components/v2/v2-landing";

export const metadata: Metadata = {
  title: "대한산업AI v2 | 기업 자동화 솔루션",
  description:
    "대한산업AI v2 랜딩 페이지. ERP, 사내 시스템, 문서, 메일, 웹하드, 대시보드를 연결하는 기업 맞춤형 AI 자동화 솔루션.",
};

export default function V2Page() {
  return <V2Landing />;
}
