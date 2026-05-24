import type { Metadata } from "next";
import { V3ContactForm, V3Hero, V3SectionHeading, V3Shell } from "@/components/v3/v3-site";

export const metadata: Metadata = {
  title: "문의하기 | 대한산업AI v3",
  description: "대한산업AI 자동화 상담 문의 페이지입니다.",
};

const contactHints = ["현재 사용하는 시스템", "반복 작성 문서", "방문 / 원격 상담", "MVP 가능 범위"];

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
              사용하는 프로그램과 반복 업무만 알려주셔도 방문 또는 원격 미팅으로 자동화 가능 범위를 함께 확인합니다.
            </p>
            <div className="v3-contact-assist">
              {contactHints.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <V3ContactForm />
        </section>

        <section className="v3-section v3-soft">
          <V3SectionHeading eyebrow="Before Contact" title="문의 때 알려주면 좋은 것" />
          <div className="v3-reason-grid">
            <article>현재 사용하는 ERP, 웹메일, 웹하드, 엑셀, 내부 프로그램</article>
            <article>반복 작성하는 보고서, 대장, 점검표, 월간 리포트</article>
            <article>자동화하고 싶은 업무와 사람이 자주 확인하는 기준</article>
          </div>
        </section>
      </main>
    </V3Shell>
  );
}
