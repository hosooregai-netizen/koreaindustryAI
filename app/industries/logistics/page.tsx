import type { Metadata } from "next";
import { IndustryOverviewScroll } from "@/components/industry-overview-scroll";
import { IndustryScrollReveal } from "@/components/industry-scroll-reveal";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "대한산업 AI",
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
    text: `${logistics.systems}와 입출고, 재고, 배차 데이터를 운영 단위로 정리합니다.`,
  },
  {
    number: "02",
    title: "물류 운영 설계",
    text: "납기, 우선순위, 재고 기준, 예외 알림 조건을 현장 운영 방식에 맞춥니다.",
  },
  {
    number: "03",
    title: "최적화 자동화",
    text: "지연 감지, 재고 확인, 배차 조정, 보고서 작성처럼 반복 확인 업무를 자동화합니다.",
  },
  {
    number: "04",
    title: "성과 추적",
    text: "지연 사유와 처리 결과를 누적해 SLA, 재고, 배차 기준을 계속 조정합니다.",
  },
] as const;

const insightSection = {
  title: "물류 산업의 운영 개선은 지연과 재고 관리 자동화에서 시작됩니다.",
  image: "/assets/물류미래.png",
  imageAlt: "물류 창고와 배송 운영 데이터가 연결된 미래형 운영 이미지",
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

        <IndustryOverviewScroll
          titleId="site-logistics-overview-title"
          items={overviewCards}
        />

        <SiteCtaBand
          title="물류 운영, AI-Core로 연결하세요."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
