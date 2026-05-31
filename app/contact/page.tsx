import type { Metadata } from "next";
import { SiteContactForm, SiteFaqList, SiteHero, SiteSectionHeading, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "고객 문의 | 대한산업AI",
  description: "대한산업AI의 자주 묻는 질문과 AI-Core 도입 상담 문의 폼입니다.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <main>
        <SiteHero
          eyebrow="Contact"
          title="자동화하고 싶은 업무를 알려주세요."
          description="현재 사용하는 시스템, 반복 작성 문서, 담당자가 매일 확인하는 기준을 알려주시면 5일 도입 가능 범위를 검토해드립니다."
          primary={{ label: "문의 작성", href: "#contact-form" }}
          secondary={{ label: "FAQ 보기", href: "#faq" }}
          visual="contact"
        />

        <section className="site-section site-soft" id="faq">
          <SiteSectionHeading eyebrow="FAQ" title="자주 묻는 질문" />
          <SiteFaqList />
        </section>

        <section className="site-section site-contact-split" id="contact-form">
          <div>
            <p className="site-eyebrow">Contact Form</p>
            <h2>정리되지 않은 상태여도 괜찮습니다.</h2>
            <p>
              사용하는 프로그램과 반복 업무만 적어주셔도 됩니다. 필요하면 방문 또는 원격 미팅으로 실제 업무 흐름을 함께 확인합니다.
            </p>
            <div className="site-contact-assist">
              <span>현재 시스템</span>
              <span>반복 문서</span>
              <span>도입 목표</span>
              <span>상담 방식</span>
            </div>
          </div>
          <SiteContactForm />
        </section>
      </main>
    </SiteShell>
  );
}
