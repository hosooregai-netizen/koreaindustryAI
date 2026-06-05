import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { IndustryScrollReveal } from "@/components/industry-scroll-reveal";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "제조 생산성 AI-Core 솔루션 | 대한산업AI",
  description: "생산 계획, 공정, 품질, 설비 데이터를 ERP, MES, APS와 연결해 제조 의사결정과 실행을 돕는 AI-Core 솔루션입니다.",
};

const manufacturing = {
  name: "제조",
  title: "제조 생산성 AI-Core 솔루션",
  description:
    "제조의 생산성은 계획과 현장이 같은 속도로 움직일 때 높아집니다.\n대한산업AI는 ERP·MES·APS 데이터를 정리해 반복 점검을 줄이고 빠른 생산 의사결정을 돕습니다.",
  image: "/assets/industries/manufacturing-card.png",
  imageAlt: "자동화 로봇이 배치된 제조 공정",
  systems: "ERP·MES·APS",
  automation: "공정/품질/설비 예측",
  result: "생산 계획, 품질 이상, 설비 상태를 예측 가능한 운영 화면으로 연결합니다.",
} as const;

const overviewCards = [
  {
    number: "01",
    title: "업무 시스템 연결",
    text: `${manufacturing.systems}와 현장 문서, 생산 데이터를 하나의 업무 흐름으로 정리합니다.`,
  },
  {
    number: "02",
    title: "제조 운영 설계",
    text: "생산 기준, 품질 조건, 설비 상태, 알림, 보고 화면을 제조 현장 방식에 맞춰 설계합니다.",
  },
  {
    number: "03",
    title: "예측 자동화",
    text: `${manufacturing.automation}을 업무 화면, 대시보드, 알림, 보고 흐름으로 자동화합니다.`,
  },
  {
    number: "04",
    title: "성과 추적",
    text: `${manufacturing.result} 품질, 설비, 생산 지표를 기준으로 개선 지점을 확인합니다.`,
  },
] as const;

const insightSection = {
  title: '"생산 흐름은 연결될 때 빨라집니다"',
  image: "/assets/industrial-ai-hero.png",
  imageAlt: "AI-Core가 제조 운영 데이터를 연결하는 업무 구조 화면",
} as const;



export default function ManufacturingPage() {
  return (
    <SiteShell>
      <main className="site-industry-detail-page site-industry-manufacturing-page">
        <IndustryScrollReveal />
        <section className="site-industry-hero" aria-labelledby="site-manufacturing-hero-title">
          <img src={manufacturing.image} alt={manufacturing.imageAlt} />
          <div className="site-industry-hero-shade" aria-hidden="true" />
          <div className="site-industry-hero-copy">
            <h1 id="site-manufacturing-hero-title">{manufacturing.title}</h1>
          </div>
        </section>

        <section className="site-industry-structure" aria-labelledby="site-manufacturing-structure-title">
          <div className="site-industry-structure-copy">
            <h2 id="site-manufacturing-structure-title">{insightSection.title}</h2>
            <p>{manufacturing.description}</p>
          </div>
          <figure className="site-industry-structure-visual">
            <img src={insightSection.image} alt={insightSection.imageAlt} loading="lazy" />
          </figure>
        </section>

        <section className="site-industry-overview" aria-labelledby="site-manufacturing-overview-title">
          <div className="site-industry-section-head">
            <h2 id="site-manufacturing-overview-title">Overview</h2>
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

        <SiteCtaBand
          title="제조 운영, AI-Core로 연결하세요."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
