import type { Metadata } from "next";
import { SiteContactForm, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "고객 문의 | 대한산업AI",
  description: "대한산업AI의 AI-Core 도입 상담 문의 폼입니다.",
};

export default function ContactPage() {
  return (
    <SiteShell>
      <main className="site-contact-page">
        <section className="site-contact-intake" id="contact-form" aria-labelledby="site-contact-title">
          <div className="site-contact-copy">
            <h1 id="site-contact-title">산업 AI 전문가에게 문의하기</h1>
            <div className="site-contact-lede">
              <p>
                반복 보고, 승인 흐름, 운영 데이터처럼{" "}
                <br />
                매일 붙잡고 있는 업무를 남겨주세요.
              </p>
              <p>
                대한산업AI가 현장 맥락을 확인하고 AI-Core로 연결할 수 있는{" "}
                <br />
                데이터 구조와 자동화 범위를 정리해드립니다.
              </p>
            </div>
            <p className="site-contact-hint">
              상담 전 자료가 완벽하지 않아도 괜찮습니다. 현재 쓰는 문서, 시스템, 반복 업무만 편하게 적어주세요.
            </p>
          </div>
          <SiteContactForm />
        </section>
      </main>
    </SiteShell>
  );
}
