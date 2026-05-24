import type { Metadata } from "next";
import { V3ContactForm, V3Hero, V3SectionHeading, V3Shell } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "문의하기 | 대한산업AI v3",
  description: "대한산업AI 자동화 상담 문의.",
};

export default function ContactPage() {
  return (
    <V3Shell>
      <main>
        <V3Hero
          eyebrow="Contact"
          title="자동화가 필요한 업무를 알려주세요."
          description="지금 쓰는 프로그램, 반복 문서, 현장 보고 흐름을 알려주시면 도입 가능 범위를 검토해 연락드리겠습니다."
          primary={{ label: "문의 작성", href: "#contact-form" }}
          secondary={{ label: "MVP 보기", href: "/v3/mvp" }}
          visual="contact"
        />

        <section className="v3-section v3-contact-split" id="contact-form">
          <div>
            <p className="v3-eyebrow">Contact Form</p>
            <h2>현재 업무가 정리되어 있지 않아도 괜찮습니다.</h2>
            <p>
              사용하는 프로그램과 반복 업무만 알려주시면 방문 또는 원격 미팅으로 자동화 가능 범위를 함께
              확인합니다.
            </p>
          </div>
          <V3ContactForm />
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading eyebrow="Before Contact" title="문의 전 알아두면 좋은 것" />
          <div className="v3-reason-grid">
            <article>현재 업무 흐름이 완벽히 정리되어 있지 않아도 됩니다.</article>
            <article>반복 문서, 사용 프로그램, 담당자 흐름만 알려주셔도 검토할 수 있습니다.</article>
            <article>필요 시 방문 또는 원격 미팅으로 업무를 함께 확인합니다.</article>
          </div>
        </section>
      </main>
    </V3Shell>
  );
}
