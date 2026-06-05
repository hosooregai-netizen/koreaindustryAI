import type { Metadata } from "next";
import { IndustryOverviewScroll } from "@/components/industry-overview-scroll";
import { IndustryScrollReveal } from "@/components/industry-scroll-reveal";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "대한산업 AI",
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
    text: `${manufacturing.systems}와 생산 계획, 품질 기록, 설비 데이터를 같은 기준으로 정리합니다.`,
  },
  {
    number: "02",
    title: "제조 운영 설계",
    text: "생산 기준, 품질 조건, 설비 상태, 알림 조건을 현장 점검 순서에 맞춥니다.",
  },
  {
    number: "03",
    title: "예측 자동화",
    text: "이상 징후 확인, 품질 점검, 설비 알림, 보고서 작성 업무를 자동화합니다.",
  },
  {
    number: "04",
    title: "성과 추적",
    text: "품질·설비·생산 이력을 누적해 반복 점검 기준과 개선 과제를 찾습니다.",
  },
] as const;

const insightSection = {
  title: "제조 산업의 생산성은 데이터 연결과 점검 자동화에서 시작됩니다.",
  image: "/assets/제조 미래.png",
  imageAlt: "제조 공장과 AI 운영 대시보드가 연결된 미래형 운영 이미지",
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

        <IndustryOverviewScroll
          titleId="site-manufacturing-overview-title"
          items={overviewCards}
        />

        <SiteCtaBand
          title="제조 운영, AI-Core로 연결하세요."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
