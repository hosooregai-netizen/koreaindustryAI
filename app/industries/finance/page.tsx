import type { Metadata } from "next";
import { IndustryOverviewScroll } from "@/components/industry-overview-scroll";
import { IndustryScrollReveal } from "@/components/industry-scroll-reveal";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "대한산업 AI",
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
    text: `${finance.systems}와 고객확인 문서, 거래 신호, 보고 데이터를 검토 단위로 정리합니다.`,
  },
  {
    number: "02",
    title: "검토 프로세스 설계",
    text: "규제 기준, 심사 항목, 이상거래 신호, 승인·보고 조건을 금융 업무 절차에 맞춥니다.",
  },
  {
    number: "03",
    title: "탐지·보고 자동화",
    text: "반복 검토, 이상 신호 분류, 보고서 초안, 담당자 알림을 자동화합니다.",
  },
  {
    number: "04",
    title: "처리 이력 관리",
    text: "검토 근거와 처리 결과를 이력으로 남겨 감사 대응과 운영 개선에 활용합니다.",
  },
] as const;

const insightSection = {
  title: "금융 산업의 효율화는 규제 준수와 검토 자동화에서 시작됩니다.",
  image: "/assets/금융미래.png",
  imageAlt: "금융 심사와 데이터 분석 흐름이 연결된 미래형 운영 이미지",
} as const;



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
          </div>
        </section>

        <section className="site-industry-structure" aria-labelledby="site-finance-structure-title">
          <div className="site-industry-structure-copy">
            <h2 id="site-finance-structure-title">{insightSection.title}</h2>
            <p>{finance.description}</p>
          </div>
          <figure className="site-industry-structure-visual">
            <img src={insightSection.image} alt={insightSection.imageAlt} loading="lazy" />
          </figure>
        </section>

        <IndustryOverviewScroll
          titleId="site-finance-overview-title"
          items={overviewCards}
        />

        <SiteCtaBand
          title="금융 업무 자동화, AI-Core로 연결하세요."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
