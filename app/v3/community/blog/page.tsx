import type { Metadata } from "next";
import { V3BlogList, V3Hero, V3SectionHeading, V3Shell } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "Blog | 대한산업AI",
  description: "대한산업AI 블로그 글 목록입니다.",
};

export default function BlogPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Blog"
          title="AI 도입과 업무 자동화에 관한 글을 모았습니다."
          description="초기 버전은 정적 샘플 글 목록으로 구성했습니다. 실제 블로그 연동은 이후 연결합니다."
          primary={{ label: "뉴스레터 받기", href: "/v3/community/newsletter" }}
          secondary={{ label: "Threads 보기", href: "/v3/community/threads" }}
          visual="community"
        />
        <section className="v3-section">
          <V3SectionHeading eyebrow="Articles" title="글 목록" />
          <V3BlogList />
        </section>
      </main>
    </V3Shell>
  );
}
