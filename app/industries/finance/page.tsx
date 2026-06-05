import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IndustryScrollReveal } from "@/components/industry-scroll-reveal";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "금융 업무 자동화 AI-Core 솔루션 | 대한산업AI",
  description: "RegTech, AML/KYC, FDS 데이터를 연결해 금융 검토·탐지·보고 업무 자동화를 돕는 AI-Core 솔루션입니다.",
};

const finance = {
  name: "금융",
  title: "금융 업무 자동화 AI-Core 솔루션",
  description:
    "금융의 생산성은 반복 검토와 보고 흐름이 빠르게 정리될 때 높아집니다.\n대한산업AI는 RegTech·AML/KYC·FDS 데이터를 연결해 검토·탐지·보고 업무 자동화를 돕습니다.",
  image: "/assets/industries/finance-card.png",
  imageAlt: "도시 전망의 금융 데이터 운영실",
  systems: "RegTech·AML/KYC·FDS",
  automation: "검토/탐지/보고 업무 자동화",
  result: "검토, 탐지, 보고 흐름을 기록 가능한 업무 체계로 연결합니다.",
} as const;

const overviewCards = [
  {
    number: "01",
    title: "업무 데이터 연결",
    text: `${finance.systems}와 고객확인 문서, 거래 신호, 보고 데이터를 하나의 업무 흐름으로 정리합니다.`,
  },
  {
    number: "02",
    title: "검토 프로세스 설계",
    text: "규제 기준, 고객확인 항목, 이상거래 신호, 승인·보고 화면을 금융 업무 방식에 맞춰 설계합니다.",
  },
  {
    number: "03",
    title: "탐지·보고 자동화",
    text: "검토·탐지·보고 업무를 업무 화면, 대시보드, 알림, 보고 흐름으로 자동화합니다.",
  },
  {
    number: "04",
    title: "처리 이력 관리",
    text: `${finance.result} 검토 결과와 처리 이력을 기준으로 개선 지점을 확인합니다.`,
  },
] as const;

const featureCards = [
  {
    key: "Key Feature 01",
    title: "연결 시스템",
    bullets: ["RegTech·AML/KYC·FDS 업무 데이터 연결", "고객확인, 이상거래 탐지, 보고 업무 상태 통합 관리", "심사 문서와 처리 이력을 같은 구조로 정리"],
  },
  {
    key: "Key Feature 02",
    title: "자동화 범위",
    bullets: ["규제 기준과 검토 항목 자동 정리", "AML/KYC 검토 항목과 FDS 이상 신호 분류", "반복 보고와 담당자 알림 자동화"],
  },
  {
    key: "Key Feature 03",
    title: "운영 결과",
    bullets: ["검토, 탐지, 보고 흐름 추적", "확인 필요 항목과 처리 상태 빠른 파악", "금융 업무 자동화를 위한 대시보드 구성"],
  },
] as const;


export default function FinancePage() {
  return (
    <SiteShell>
      <main className="site-industry-detail-page site-industry-finance-page">
        <IndustryScrollReveal />
        <section className="site-industry-hero" aria-labelledby="site-finance-hero-title">
          <img src={finance.image} alt={finance.imageAlt} />
          <div className="site-industry-hero-shade" aria-hidden="true" />
          <div className="site-industry-hero-copy">
            <h1 id="site-finance-hero-title">{finance.title}</h1>
            <span>{finance.description}</span>
          </div>
        </section>

        <section className="site-industry-overview" aria-labelledby="site-finance-overview-title">
          <div className="site-industry-section-head">
            <h2 id="site-finance-overview-title">Overview</h2>
            <p>산업별 운영 데이터를 AI-Core 구조로 정리해 반복 업무와 의사결정 흐름을 연결합니다.</p>
          </div>
          <div className="site-industry-overview-grid">
            {overviewCards.map((card, index) => (
              <article
                className="site-industry-overview-card"
                key={card.number}
                style={{ "--site-industry-delay": `${index * 90}ms` } as CSSProperties}
              >
                <small>{card.number}</small>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-industry-features" aria-labelledby="site-finance-feature-title">
          <div className="site-industry-feature-head">
            <h2 id="site-finance-feature-title">
              <strong>{finance.name}</strong> Key Feature
            </h2>
            <div className="site-industry-feature-nav" aria-hidden="true">
              <span>
                <ChevronLeft size={27} strokeWidth={2.4} />
              </span>
              <span>
                <ChevronRight size={27} strokeWidth={2.4} />
              </span>
            </div>
          </div>

          <div className="site-industry-feature-grid">
            {featureCards.map((card, index) => {
              return (
                <article
                  className="site-industry-feature-card"
                  key={card.key}
                  style={{ "--site-industry-delay": `${index * 90}ms` } as CSSProperties}
                >
                  <span>{card.key}</span>
                  <h3>{card.title}</h3>
                  <ul>
                    {card.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <SiteCtaBand
          title="금융 업무 자동화, AI-Core로 연결하세요."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
