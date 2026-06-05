import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IndustryScrollReveal } from "@/components/industry-scroll-reveal";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "건설 문서 자동화 AI-Core 솔루션 | 대한산업AI",
  description: "도면, RFI, 제출 문서, 안전·품질 기록을 BIM, RFI, Submittal 흐름과 연결해 현장 문서 대응을 돕는 AI-Core 솔루션입니다.",
};

const construction = {
  name: "건설",
  title: "건설 문서 자동화 AI-Core 솔루션",
  description:
    "건설의 실행력은 현장 정보가 일정·안전·품질 흐름과 함께 움직일 때 높아집니다.\n대한산업AI는 BIM·RFI·Submittal 흐름을 정리해 문서 누락을 줄이고 승인·보고 실행을 돕습니다.",
  image: "/assets/industries/construction-card.png",
  imageAlt: "건설 현장을 검토하는 작업자",
  systems: "BIM·RFI·Submittal",
  automation: "규제/안전/품질 문서 자동화",
  result: "현장 문서와 승인 흐름을 정리해 규제, 안전, 품질 대응을 돕습니다.",
} as const;

const overviewCards = [
  {
    number: "01",
    title: "업무 시스템 연결",
    text: `${construction.systems}과 현장 문서, 승인 데이터를 하나의 업무 흐름으로 정리합니다.`,
  },
  {
    number: "02",
    title: "문서 흐름 설계",
    text: "도면 기준, RFI 흐름, 제출 문서, 안전 점검, 품질 기록을 현장 업무 방식에 맞춰 설계합니다.",
  },
  {
    number: "03",
    title: "문서 자동화",
    text: `${construction.automation}를 업무 화면, 대시보드, 알림, 보고 흐름으로 자동화합니다.`,
  },
  {
    number: "04",
    title: "문서 이력 관리",
    text: `${construction.result} 누락 문서와 승인 이력을 기준으로 개선 지점을 확인합니다.`,
  },
] as const;

const featureCards = [
  {
    key: "Key Feature 01",
    title: "연결 시스템",
    bullets: ["BIM·RFI·Submittal 업무 데이터 연결", "도면, 질의, 제출 문서, 승인 상태 통합 관리", "현장 기록과 문서 기준을 같은 구조로 정리"],
  },
  {
    key: "Key Feature 02",
    title: "자동화 범위",
    bullets: ["규제 문서와 제출 흐름 자동 정리", "안전 점검과 품질 기록 자동 분류", "반복 보고와 담당자 알림 자동화"],
  },
  {
    key: "Key Feature 03",
    title: "운영 결과",
    bullets: ["현장 문서와 승인 흐름 추적", "누락 문서와 확인 필요 항목 빠른 파악", "규제, 안전, 품질 대응을 위한 대시보드 구성"],
  },
] as const;


export default function ConstructionPage() {
  return (
    <SiteShell>
      <main className="site-industry-detail-page site-industry-construction-page">
        <IndustryScrollReveal />
        <section className="site-industry-hero" aria-labelledby="site-construction-hero-title">
          <img src={construction.image} alt={construction.imageAlt} />
          <div className="site-industry-hero-shade" aria-hidden="true" />
          <div className="site-industry-hero-copy">
            <h1 id="site-construction-hero-title">{construction.title}</h1>
            <span>{construction.description}</span>
          </div>
        </section>

        <section className="site-industry-overview" aria-labelledby="site-construction-overview-title">
          <div className="site-industry-section-head">
            <h2 id="site-construction-overview-title">Overview</h2>
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

        <section className="site-industry-features" aria-labelledby="site-construction-feature-title">
          <div className="site-industry-feature-head">
            <h2 id="site-construction-feature-title">
              <strong>{construction.name}</strong> Key Feature
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
          title="건설 문서 업무, AI-Core로 연결하세요."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
