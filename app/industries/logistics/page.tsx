import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { IndustryScrollReveal } from "@/components/industry-scroll-reveal";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "물류 운영 최적화 AI-Core 솔루션 | 대한산업AI",
  description: "입출고, 재고, 배차, 라우팅 흐름을 WMS, TMS, LMS 데이터와 연결해 물류 운영 판단을 돕는 AI-Core 솔루션입니다.",
};

const logistics = {
  name: "물류",
  title: "물류 운영 최적화 AI-Core 솔루션",
  description:
    "물류의 속도는 납기 약속을 지키는 가장 현실적인 경쟁력입니다.\n대한산업AI는 WMS·TMS·LMS 데이터를 정리해 반복 확인을 줄이고 빠른 현장 판단을 돕습니다.",
  image: "/assets/industries/logistics-card.png",
  imageAlt: "컨베이어와 지게차가 움직이는 물류 창고",
  systems: "WMS·TMS·LMS",
  automation: "배차/라우팅/창고 최적화",
  result: "입출고, 이동, 배차 흐름을 한 화면에서 추적하고 최적화합니다.",
} as const;

const overviewCards = [
  {
    number: "01",
    title: "업무 시스템 연결",
    text: `${logistics.systems}와 현장 문서, 운영 데이터를 하나의 업무 흐름으로 정리합니다.`,
  },
  {
    number: "02",
    title: "물류 운영 설계",
    text: "배차 기준, 우선순위, 예외 알림, 보고 화면을 물류 업무 방식에 맞춰 설계합니다.",
  },
  {
    number: "03",
    title: "최적화 자동화",
    text: `${logistics.automation}를 업무 화면, 대시보드, 알림, 보고 흐름으로 자동화합니다.`,
  },
  {
    number: "04",
    title: "성과 추적",
    text: `${logistics.result} 예외 데이터와 성과 지표를 기준으로 개선 지점을 확인합니다.`,
  },
] as const;

const insightSection = {
  title: '"물류 속도는 흐름을 놓치지 않을 때 빨라집니다"',
  image: "/assets/industrial-ai-hero.png",
  imageAlt: "AI-Core가 물류 운영 데이터를 연결하는 업무 구조 화면",
} as const;



export default function LogisticsPage() {
  return (
    <SiteShell>
      <main className="site-industry-detail-page site-industry-logistics-page">
        <IndustryScrollReveal />
        <section className="site-industry-hero" aria-labelledby="site-logistics-hero-title">
          <img src={logistics.image} alt={logistics.imageAlt} />
          <div className="site-industry-hero-shade" aria-hidden="true" />
          <div className="site-industry-hero-copy">
            <h1 id="site-logistics-hero-title">{logistics.title}</h1>
          </div>
        </section>

        <section className="site-industry-structure" aria-labelledby="site-logistics-structure-title">
          <div className="site-industry-structure-copy">
            <h2 id="site-logistics-structure-title">{insightSection.title}</h2>
            <p>{logistics.description}</p>
          </div>
          <figure className="site-industry-structure-visual">
            <img src={insightSection.image} alt={insightSection.imageAlt} loading="lazy" />
          </figure>
        </section>

        <section className="site-industry-overview" aria-labelledby="site-logistics-overview-title">
          <div className="site-industry-section-head">
            <h2 id="site-logistics-overview-title">Overview</h2>
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
          title="물류 운영, AI-Core로 연결하세요."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
