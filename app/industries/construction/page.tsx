import type { Metadata } from "next";
import { IndustryOverviewScroll } from "@/components/industry-overview-scroll";
import { IndustryScrollReveal } from "@/components/industry-scroll-reveal";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "대한산업 AI",
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
    text: `${construction.systems}과 현장 문서, 승인 요청을 한곳에서 확인할 수 있게 정리합니다.`,
  },
  {
    number: "02",
    title: "문서 흐름 설계",
    text: "도면 기준, RFI 답변, 제출 문서, 안전·품질 점검 기준을 실제 승인 순서에 맞춥니다.",
  },
  {
    number: "03",
    title: "문서 자동화",
    text: "누락 확인, 문서 초안, 승인 알림, 보고서 작성처럼 반복되는 문서 업무를 자동화합니다.",
  },
  {
    number: "04",
    title: "문서 이력 관리",
    text: "누가 요청하고 검토했는지, 어떤 문서가 지연됐는지 남겨 다음 현장 기준을 개선합니다.",
  },
] as const;

const insightSection = {
  title: "건설 산업의 생산성은 문서 생성과 검토 자동화에서 시작됩니다.",
  image: "/assets/건설미래형.png",
  imageAlt: "건설 현장 문서와 AI 업무 흐름이 연결된 미래형 운영 이미지",
} as const;



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
          </div>
        </section>

        <section className="site-industry-structure" aria-labelledby="site-construction-structure-title">
          <div className="site-industry-structure-copy">
            <h2 id="site-construction-structure-title">{insightSection.title}</h2>
            <p>{construction.description}</p>
          </div>
          <figure className="site-industry-structure-visual">
            <img src={insightSection.image} alt={insightSection.imageAlt} loading="lazy" />
          </figure>
        </section>

        <IndustryOverviewScroll
          titleId="site-construction-overview-title"
          items={overviewCards}
        />

        <SiteCtaBand
          title="건설 문서 업무, AI-Core로 연결하세요."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
