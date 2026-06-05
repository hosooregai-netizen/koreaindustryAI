import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ProductScrollReveal } from "@/components/product-scroll-reveal";
import {
  ArrowRight,
  BarChart3,
  Bell,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "Automation AI-Core | 대한산업AI",
  description: "반복 업무를 줄이고 담당자가 중요한 판단에 집중하도록 돕는 Automation AI-Core 상세 페이지입니다.",
};

const automationCards = [
  {
    title: "업무 시작을 놓치지 않습니다",
    text: "문서 도착, 상태 변경, 일정 도래를 기준으로 반복 업무가 자동으로 시작됩니다.",
    visual: "detect",
  },
  {
    title: "반복 처리는 AI-Core가 가져갑니다",
    text: "분류, 추출, 정리, 보고 초안처럼 매일 반복되는 작업 시간을 줄입니다.",
    visual: "process",
  },
  {
    title: "사람이 봐야 할 일만 남깁니다",
    text: "애매한 건과 승인 필요한 일만 담당자에게 올려 판단 흐름을 분명하게 만듭니다.",
    visual: "review",
  },
] as const;

const detailRows = [
  {
    title: "반복 업무는 작게 시작해 빠르게 줄입니다",
    text: "가장 많이 반복되는 업무 하나부터 자동화해 효과를 확인하고, 다음 업무로 확장합니다.",
    visual: "flow",
    reverse: false,
    terms: ["요청 접수", "분류", "정리", "보고"],
  },
  {
    title: "AI가 처리하고, 사람은 중요한 것만 봅니다",
    text: "조건이 맞는 일은 자동으로 넘기고, 애매하거나 승인 필요한 일만 담당자에게 올립니다.",
    visual: "layers",
    reverse: true,
    terms: ["자동 처리", "확인 필요", "승인/반려", "이력 기록"],
  },
  {
    title: "처리 결과는 바로 실행으로 이어집니다",
    text: "진행 중인 자동화와 확인 필요한 일을 한 화면에서 보고, 지연과 누락을 줄입니다.",
    visual: "run",
    reverse: false,
    terms: ["대기", "처리 중", "확인 필요", "완료"],
  },
] as const;

export default function AutomationPage() {
  return (
    <SiteShell>
      <main className="site-dd-page site-auto-page">
        <ProductScrollReveal />
        <section className="site-dd-hero site-auto-hero" aria-labelledby="site-auto-hero-title">
          <div className="site-dd-hero-pattern" aria-hidden="true" />
          <div className="site-dd-hero-inner">
            <p className="site-dd-eyebrow">Automation AI-Core</p>
            <h1 id="site-auto-hero-title">반복 업무를 줄이고 실행 속도는 높입니다</h1>
            <p>
              대한산업AI는 확인, 분류, 정리, 보고에 묶인 시간을 줄이고 담당자가 더 빠르게 결정하고 움직이게
              돕습니다.
            </p>
            <div className="site-dd-hero-actions">
              <Link className="site-dd-button site-dd-button-primary" href="/contact">
                자동화 업무 상담
              </Link>
              <Link className="site-dd-button site-dd-button-secondary" href="#automation-structure">
                자동화 방식 보기
              </Link>
            </div>
          </div>
        </section>

        <div className="site-product-sample-section">
          <AutomationHeroSample />
        </div>

        <section
          className="site-dd-section site-dd-card-section"
          id="automation-structure"
          aria-labelledby="site-auto-card-title"
        >
          <div className="site-dd-section-head">
            <h2 id="site-auto-card-title">기업 반복 업무에 맞춘 AI-Core 자동화</h2>
            <p>업무를 바꾸는 게 아니라, 지금 하던 흐름 위에 자동화를 얹어 바로 효과를 만듭니다.</p>
          </div>
          <div className="site-dd-data-grid">
            {automationCards.map((card, index) => (
              <article
                className="site-dd-data-card"
                key={card.title}
                style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
              >
                <AutomationCardVisual kind={card.visual} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-dd-section site-dd-detail-section" aria-label="자동화 연결 상세">
          {detailRows.map((row, index) => (
            <article className={`site-dd-detail-row${row.reverse ? " is-reverse" : ""}`} key={row.title}>
              <div className="site-dd-detail-copy">
                <h2>{row.title}</h2>
                <p>{row.text}</p>
                <div className="site-dd-term-list" aria-label="포함 단계">
                  {row.terms.map((term) => (
                    <span key={term}>{term}</span>
                  ))}
                </div>
              </div>
              <AutomationDetailVisual kind={row.visual} index={index} />
            </article>
          ))}
        </section>

        <SiteCtaBand title="반복 업무를 자동화로 줄이세요." label="도입 문의" variant="final" />
      </main>
    </SiteShell>
  );
}

function AutomationHeroSample() {
  return (
    <figure className="site-product-sample-frame site-product-sample-frame--auto">
      <img src="/assets/automative.png" alt="AI-Core 업무 대시보드 샘플 화면" />
    </figure>
  );
}

function AutomationCardVisual({ kind }: { kind: (typeof automationCards)[number]["visual"] }) {
  if (kind === "process") {
    return (
      <div className="site-dd-card-visual site-product-schematic-card site-auto-card-visual is-process" aria-hidden="true">
        <div className="site-product-schematic-node">
          <FileText size={20} />
          <strong>반복 작업</strong>
        </div>
        <span className="site-product-schematic-arrow">
          <ArrowRight size={18} />
        </span>
        <div className="site-product-schematic-node is-strong">
          <Workflow size={22} />
          <strong>AI-Core</strong>
          <small>자동 처리</small>
        </div>
      </div>
    );
  }

  if (kind === "review") {
    return (
      <div className="site-dd-card-visual site-product-schematic-card site-auto-card-visual is-review" aria-hidden="true">
        <div className="site-product-schematic-node is-strong">
          <CheckCircle2 size={22} />
          <strong>자동 처리</strong>
        </div>
        <span className="site-product-schematic-arrow">
          <ArrowRight size={18} />
        </span>
        <div className="site-product-schematic-node is-alert">
          <Users size={22} />
          <strong>예외만 확인</strong>
          <small>승인 / 반려</small>
        </div>
      </div>
    );
  }

  return (
    <div className="site-dd-card-visual site-product-schematic-card site-auto-card-visual is-detect" aria-hidden="true">
      <div className="site-product-source-grid">
        <span>문서 도착</span>
        <span>상태 변경</span>
        <span>일정 도래</span>
        <span>담당자 요청</span>
      </div>
      <span className="site-product-schematic-arrow">
        <ArrowRight size={18} />
      </span>
      <div className="site-product-schematic-node is-strong">
        <CheckCircle2 size={22} />
        <strong>업무 시작</strong>
      </div>
    </div>
  );
}

function AutomationDetailVisual({ kind, index }: { kind: (typeof detailRows)[number]["visual"]; index: number }) {
  if (kind === "layers") {
    return (
      <div
        className="site-dd-detail-visual is-layers"
        style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
        aria-hidden="true"
      >
        <div className="site-product-branch-map">
          <div className="site-product-schematic-node is-core">
            <Workflow size={24} />
            AI 처리
          </div>
          <div className="site-product-branch-lines">
            <span />
            <span />
          </div>
          <div className="site-product-branch-results">
            <span>
              <CheckCircle2 size={18} />
              자동 완료
            </span>
            <span>
              <Users size={18} />
              사람 확인
            </span>
          </div>
          <div className="site-product-schematic-footer">
            <ShieldCheck size={18} />
            승인과 반려는 담당자가 결정
          </div>
        </div>
      </div>
    );
  }

  if (kind === "run") {
    return (
      <div
        className="site-dd-detail-visual site-auto-run-visual site-product-detail-schematic"
        style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
        aria-hidden="true"
      >
        <div className="site-product-wide-flow is-run">
          <div className="site-product-schematic-node is-core">
            <CheckCircle2 size={28} />
            <strong>처리 결과</strong>
          </div>
          <span className="site-product-schematic-arrow">
            <ArrowRight size={20} />
          </span>
          <div className="site-product-output-row is-vertical">
            <span>
              <BarChart3 size={18} />
              화면
            </span>
            <span>
              <Bell size={18} />
              알림
            </span>
            <span>
              <FileText size={18} />
              보고
            </span>
          </div>
          <span className="site-product-schematic-arrow">
            <ArrowRight size={20} />
          </span>
          <div className="site-product-result-panel">
            <strong>즉시 실행</strong>
            <span>지연 감소</span>
            <span>누락 방지</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="site-dd-detail-visual is-flow site-product-detail-schematic"
      style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
      aria-hidden="true"
    >
      <div className="site-product-wide-flow">
        <div className="site-product-result-panel is-start">
          <strong>반복 업무 1개</strong>
          <span>접수</span>
          <span>분류</span>
          <span>보고</span>
        </div>
        <span className="site-product-schematic-arrow">
          <ArrowRight size={20} />
        </span>
        <div className="site-product-schematic-node is-core">
          <Workflow size={28} />
          <strong>AI-Core</strong>
          <small>먼저 자동화</small>
        </div>
        <span className="site-product-schematic-arrow">
          <ArrowRight size={20} />
        </span>
        <div className="site-product-result-panel">
          <strong>다음 업무 확장</strong>
          <span>정리</span>
          <span>승인</span>
          <span>알림</span>
        </div>
      </div>
    </div>
  );
}
