import type { Metadata } from "next";
import { V3Hero, V3SectionHeading, V3Shell, V3ThreadList } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "Threads | 대한산업AI",
  description: "대한산업AI의 짧은 실무 메모와 스레드 목록입니다.",
};

export default function ThreadsPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Threads"
          title="짧은 실무 메모를 스레드 형식으로 봅니다."
          description="현장에서 자주 나오는 질문, AI 도입 메모, 자동화 설계 기준을 짧은 글로 정리합니다."
          primary={{ label: "뉴스레터 받기", href: "/v3/community/newsletter" }}
          secondary={{ label: "Blog 보기", href: "/v3/community/blog" }}
          visual="community"
        />
        <section className="v3-section">
          <V3SectionHeading eyebrow="Thread Feed" title="스레드 피드" />
          <V3ThreadList />
        </section>
      </main>
    </V3Shell>
  );
}
