import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { BarChart3, Boxes, ClipboardCheck, Database, Gauge, MonitorCog, Workflow } from "lucide-react";
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
  result: "생산 계획, 품질 이슈, 설비 상태를 예측 가능한 운영 화면으로 연결합니다.",
} as const;

const overviewCards = [
  {
    number: "01",
    title: "업무 시스템 연결",
    text: `${manufacturing.systems}와 현장 문서, 생산 데이터를 하나의 업무 흐름으로 정리합니다.`,
  },
  {
    number: "02",
    title: "AI-Core 운영 설계",
    text: "생산 기준, 품질 조건, 설비 상태, 알림, 보고 화면을 제조 업무 방식에 맞춰 설계합니다.",
  },
  {
    number: "03",
    title: "자동화 적용",
    text: `${manufacturing.automation}을 업무 화면, 대시보드, 알림, 보고 흐름으로 구현합니다.`,
  },
  {
    number: "04",
    title: "성과 추적",
    text: `${manufacturing.result} 품질, 설비, 생산 지표를 기준으로 개선 지점을 확인합니다.`,
  },
] as const;

const featureCards = [
  {
    key: "Key Feature 01",
    title: "연결 시스템",
    icon: Database,
    bullets: ["ERP·MES·APS 운영 데이터 연결", "생산 계획, 작업 지시, 설비 상태 통합 관리", "현장 기록과 기준 데이터를 같은 구조로 정리"],
  },
  {
    key: "Key Feature 02",
    title: "자동화 범위",
    icon: Workflow,
    bullets: ["공정 흐름과 작업 기준 자동 정리", "품질 이슈와 설비 상태 예측", "반복 점검과 생산 보고 자동화"],
  },
  {
    key: "Key Feature 03",
    title: "운영 결과",
    icon: Gauge,
    bullets: ["생산 계획과 진행 상태 추적", "품질 이상과 설비 리스크 빠른 확인", "제조 운영 의사결정을 위한 대시보드 구성"],
  },
] as const;

const signalItems = [
  { label: "기준 데이터", value: "ERP", icon: Boxes },
  { label: "공정 실행", value: "MES", icon: MonitorCog },
  { label: "생산 계획", value: "APS", icon: BarChart3 },
] as const;

export default function ManufacturingPage() {
  return (
    <SiteShell>
      <main className="site-industry-detail-page site-industry-manufacturing-page">
        <section className="site-industry-hero" aria-labelledby="site-manufacturing-hero-title">
          <img src={manufacturing.image} alt={manufacturing.imageAlt} />
          <div className="site-industry-hero-shade" aria-hidden="true" />
          <div className="site-industry-hero-copy">
            <h1 id="site-manufacturing-hero-title">{manufacturing.title}</h1>
            <span>{manufacturing.description}</span>
          </div>
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

        <section className="site-industry-features" aria-labelledby="site-manufacturing-feature-title">
          <div className="site-industry-feature-head">
            <h2 id="site-manufacturing-feature-title">
              <strong>{manufacturing.name}</strong> Key Feature
            </h2>
            <p>{manufacturing.name} 업무에서 자주 연결되는 시스템과 자동화 범위를 AI-Core 적용 단위로 정리합니다.</p>
          </div>

          <div className="site-industry-signal-row" aria-label="제조 운영 연결 기준">
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
          title="제조 업무, AI-Core로 연결하세요."
          description="ERP, MES, APS 데이터를 기준으로 어떤 생산 흐름을 연결하고 어떤 반복 업무부터 자동화할지 함께 정리합니다."
          label="산업 업무 상담하기"
          variant="final"
        />
      </main>
    </SiteShell>
  );
}
