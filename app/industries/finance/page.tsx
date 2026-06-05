import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { BarChart3, ClipboardCheck, Database, Gauge, ShieldCheck, Workflow } from "lucide-react";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "금융 운영 자동화 | 대한산업AI",
  description: "RegTech, AML/KYC, FDS 기반 금융 업무와 내부통제, 증권 시스템을 AI-Core로 연결하는 산업 상세 페이지입니다.",
};

const finance = {
  name: "금융",
  label: "AI 기반 산업 운영 자동화",
  title: "금융 운영 자동화",
  description: "RegTech·AML/KYC·FDS 기반 업무와 내부통제/증권 시스템을 AI-Core로 연결합니다.",
  image: "/assets/industries/finance-card.png",
  imageAlt: "도시 전망의 금융 데이터 운영실",
  systems: "RegTech·AML/KYC·FDS",
  automation: "내부통제/증권 시스템",
  result: "검토, 탐지, 보고, 내부통제 흐름을 기록 가능한 업무 체계로 연결합니다.",
} as const;

const overviewCards = [
  {
    number: "01",
    title: "업무 시스템 연결",
    text: `${finance.systems}와 심사 문서, 거래 데이터를 하나의 업무 흐름으로 정리합니다.`,
  },
  {
    number: "02",
    title: "AI-Core 운영 설계",
    text: "규제 기준, 고객확인, 이상거래 탐지, 승인, 보고 화면을 금융 업무 방식에 맞춰 설계합니다.",
  },
  {
    number: "03",
    title: "자동화 적용",
    text: `${finance.automation}을 업무 화면, 대시보드, 알림, 보고 흐름으로 구현합니다.`,
  },
  {
    number: "04",
    title: "성과 추적",
    text: `${finance.result} 검토 이력과 이상 신호를 기준으로 개선 지점을 확인합니다.`,
  },
] as const;

const featureCards = [
  {
    key: "Key Feature 01",
    title: "연결 시스템",
    icon: Database,
    bullets: ["RegTech·AML/KYC·FDS 업무 데이터 연결", "고객확인, 거래 탐지, 증권 업무 상태 통합 관리", "심사 문서와 내부통제 기록을 같은 구조로 정리"],
  },
  {
    key: "Key Feature 02",
    title: "자동화 범위",
    icon: Workflow,
    bullets: ["내부통제 기준과 검토 항목 자동 정리", "AML/KYC 검토 항목과 FDS 이상 신호 분류", "반복 보고와 담당자 알림 자동화"],
  },
  {
    key: "Key Feature 03",
    title: "운영 결과",
    icon: Gauge,
    bullets: ["검토, 탐지, 보고 흐름 추적", "이상 항목과 확인 필요 항목 빠른 파악", "금융 운영과 내부통제를 위한 대시보드 구성"],
  },
] as const;

const signalItems = [
  { label: "규제 대응", value: "RegTech", icon: ShieldCheck },
  { label: "고객확인", value: "AML/KYC", icon: ClipboardCheck },
  { label: "이상탐지", value: "FDS", icon: BarChart3 },
] as const;

export default function FinancePage() {
  return (
    <SiteShell>
      <main className="site-industry-detail-page site-industry-finance-page">
        <section className="site-industry-hero" aria-labelledby="site-finance-hero-title">
          <img src={finance.image} alt={finance.imageAlt} />
          <div className="site-industry-hero-shade" aria-hidden="true" />
          <div className="site-industry-hero-copy">
            <p>{finance.label}</p>
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
            <p>{finance.name} 업무에서 자주 연결되는 시스템과 자동화 범위를 AI-Core 적용 단위로 정리합니다.</p>
          </div>

          <div className="site-industry-signal-row" aria-label="금융 운영 연결 기준">
            {signalItems.map((item) => {
              const Icon = item.icon;

              return (
                <div className="site-industry-signal" key={item.label}>
                  <Icon size={22} aria-hidden="true" />
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              );
            })}
          </div>

          <div className="site-industry-feature-grid">
            {featureCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <article
                  className="site-industry-feature-card"
                  key={card.key}
                  style={{ "--site-industry-delay": `${index * 90}ms` } as CSSProperties}
                >
                  <span>{card.key}</span>
                  <div className="site-industry-feature-title">
                    <Icon size={28} aria-hidden="true" />
                    <h3>{card.title}</h3>
                  </div>
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
          title="금융 업무, AI-Core로 연결하세요."
          description="RegTech, AML/KYC, FDS 데이터를 기준으로 어떤 검토 흐름을 연결하고 어떤 반복 업무부터 자동화할지 함께 정리합니다."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
