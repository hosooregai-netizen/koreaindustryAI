import type { Metadata } from "next";
import {
  V3BlogList,
  V3Hero,
  V3NewsletterForm,
  V3SectionHeading,
  V3Shell,
  V3ThreadList,
} from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "Newsletter | 대한산업AI",
  description: "대한산업AI 블로그와 스레드 인사이트를 통합해 받아보는 뉴스레터입니다.",
};

export default function NewsletterPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Newsletter"
          title="블로그와 스레드 인사이트를 한 번에 받아보세요."
          description="AI-Core 도입, 업무 자동화, 5일 검증 흐름에 관한 글과 짧은 메모를 정리해 보내드립니다."
          primary={{ label: "연락받기", href: "#newsletter-form" }}
          secondary={{ label: "Blog 보기", href: "/v3/community/blog" }}
          visual="community"
        />

        <section className="v3-section v3-contact-split" id="newsletter-form">
          <div>
            <p className="v3-eyebrow">Subscribe</p>
            <h2>필요한 내용만 가볍게 받아볼 수 있게 준비했습니다.</h2>
            <p>초기 버전은 정적 샘플 콘텐츠로 운영하며, 실제 발송 연동은 이후 붙입니다.</p>
          </div>
          <V3NewsletterForm />
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading eyebrow="Blog" title="최근 블로그" />
          <V3BlogList />
        </section>

        <section className="v3-section">
          <V3SectionHeading eyebrow="Threads" title="최근 스레드" />
          <V3ThreadList />
        </section>
      </main>
    </V3Shell>
  );
}
