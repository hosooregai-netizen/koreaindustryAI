import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  BarChart3,
  CheckCircle2,
  FileText,
  Layers3,
  Search,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "Automation AI-Core | 대한산업AI",
  description: "반복 업무를 자동 처리 흐름으로 구성하고 예외 확인과 실행 이력을 남기는 Automation AI-Core 상세 페이지입니다.",
};

const automationCards = [
  {
    title: "업무 감지",
    text: "문서 도착, 상태 변경, 일정, 담당자 요청처럼 자동화가 시작되는 조건을 정리합니다.",
    visual: "detect",
  },
  {
    title: "자동 처리",
    text: "분류, 추출, 정리, 보고서 생성처럼 반복되는 처리 단계를 자동 흐름으로 연결합니다.",
    visual: "process",
  },
  {
    title: "예외 확인",
    text: "자동 처리 결과 중 확인이 필요한 항목만 담당자에게 알리고 승인 또는 수정 이력을 남깁니다.",
    visual: "review",
  },
] as const;

const detailRows = [
  {
    title: "작은 반복 업무부터 자동화 흐름을 만듭니다",
    text: "처음부터 모든 업무를 자동화하지 않고, 매일 반복되며 기준이 분명한 업무 하나를 먼저 자동 처리 흐름으로 구성합니다.",
    visual: "flow",
    reverse: false,
    terms: ["요청 접수", "분류", "정리", "보고"],
  },
  {
    title: "예외와 승인은 사람 기준으로 남겨둡니다.",
    text: "자동화가 처리할 수 있는 항목과 담당자가 확인해야 하는 항목을 분리해, 승인과 반려 기준이 흐려지지 않게 합니다.",
    visual: "layers",
    reverse: true,
    terms: ["자동 처리", "예외 조건", "담당자 확인", "실행 이력"],
  },
  {
    title: "실행 결과와 이력을 한 화면에서 확인합니다",
    text: "어떤 업무가 자동 처리됐는지, 어디에서 예외가 발생했는지, 누가 확인했는지를 상태와 이력으로 남깁니다.",
    visual: "run",
    reverse: false,
    terms: ["대기", "처리 중", "확인 필요", "완료"],
  },
] as const;

const impactCards = [
  {
    label: "작은 업무부터 실행",
    value: "4",
    unit: "단계 자동화",
    text: "요청 접수, 분류, 정리, 보고처럼 반복되는 처리 단계를 자동화 흐름으로 먼저 구성합니다.",
    icon: Workflow,
    tone: "blue",
  },
  {
    label: "사람 확인 분리",
    value: "3",
    unit: "개 확인",
    text: "확인 필요, 승인, 반려와 수정 흐름을 자동 처리와 분리해 담당자가 판단할 지점을 남깁니다.",
    icon: ShieldCheck,
    tone: "purple",
  },
  {
    label: "실행 이력 관리",
    value: "1",
    unit: "개 화면",
    text: "담당자 확인, 실행 시간, 처리 결과와 예외 상태를 한 화면에서 확인할 수 있게 기록합니다.",
    icon: BarChart3,
    tone: "green",
  },
] as const;

export default function AutomationPage() {
  return (
    <SiteShell>
      <main className="site-dd-page site-auto-page">
        <section className="site-dd-hero site-auto-hero" aria-labelledby="site-auto-hero-title">
          <div className="site-dd-hero-pattern" aria-hidden="true" />
          <div className="site-dd-hero-inner">
            <p className="site-dd-eyebrow">Automation AI-Core</p>
            <h1 id="site-auto-hero-title">반복 업무 걱정 없이 AI 자동화 시작</h1>
            <p>
              확인, 분류, 정리, 보고처럼 매일 반복되는 업무를 자동 처리 흐름으로 구성하고, 필요한 예외만
              사람이 확인할 수 있게 합니다.
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
            <h2 id="site-auto-card-title">반복 업무 흐름에 맞는 AI-Core 자동화 구성</h2>
            <p>작은 반복 업무부터 시작해 조건, 실행, 확인까지 이어지는 자동화 흐름으로 정리합니다.</p>
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

        <section className="site-dd-section site-dd-impact-section" aria-labelledby="site-auto-impact-title">
          <div className="site-dd-impact-head">
            <h2 id="site-auto-impact-title">반복 업무 한계를 넘는 실행력</h2>
          </div>
          <div className="site-dd-impact-grid">
            {impactCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <article
                  className="site-dd-impact-card"
                  data-tone={card.tone}
                  key={card.label}
                  style={{ "--site-dd-delay": `${index * 70}ms` } as CSSProperties}
                >
                  <div className="site-dd-impact-label">
                    <Icon size={24} strokeWidth={2.4} aria-hidden="true" />
                    <span>{card.label}</span>
                  </div>
                  <div className="site-dd-impact-value">
                    <strong>{card.value}</strong>
                    <span>{card.unit}</span>
                  </div>
                  <p>{card.text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <SiteCtaBand title="기업의 문제, 자동화로 해결하세요." label="도입 문의" variant="final" />
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
      <div className="site-dd-card-visual site-auto-card-visual is-process" aria-hidden="true">
        <div className="site-auto-process-flow">
          <span>시작 조건</span>
          <strong>
            <Workflow size={24} />
            AI 처리
          </strong>
          <span>업무 결과</span>
        </div>
      </div>
    );
  }

  if (kind === "review") {
    return (
      <div className="site-dd-card-visual site-auto-card-visual is-review" aria-hidden="true">
        <div className="site-auto-review-panel">
          <div className="site-auto-review-head">
            <strong>확인 필요</strong>
            <span>2건</span>
          </div>
          <div className="site-auto-review-alert">누락 항목 확인</div>
          <div className="site-auto-review-actions">
            <span>승인</span>
            <span>반려</span>
            <span>수정</span>
          </div>
          <div className="site-auto-review-history">실행 이력 기록</div>
        </div>
      </div>
    );
  }

  return (
    <div className="site-dd-card-visual site-auto-card-visual is-detect" aria-hidden="true">
      <div className="site-auto-event-list">
        <span>문서 도착</span>
        <span>상태 변경</span>
        <span>일정 도래</span>
        <span>담당자 요청</span>
      </div>
      <div className="site-auto-trigger-core">
        <CheckCircle2 size={26} />
        <strong>시작 조건</strong>
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
        <div className="site-dd-layer-stack">
          <div>
            <span>자동 처리</span>
          </div>
          <div>
            <span>예외 조건</span>
          </div>
          <div>
            <span>담당자 확인</span>
          </div>
          <div>
            <span>실행 이력</span>
          </div>
        </div>
        <ul>
          <li>처리 가능</li>
          <li>확인 필요</li>
          <li>승인 요청</li>
          <li>이력 기록</li>
        </ul>
      </div>
    );
  }

  if (kind === "run") {
    return (
      <div
        className="site-dd-detail-visual site-auto-run-visual"
        style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
        aria-hidden="true"
      >
        <div className="site-auto-run-panel">
          <strong>자동화 실행 현황</strong>
          <p>확인 필요한 항목만 담당자에게 전달합니다.</p>
          <div className="site-auto-status-row">
            <span>대기</span>
            <span>처리 중</span>
            <span>확인 필요</span>
            <span>완료</span>
          </div>
          <div className="site-auto-run-table">
            <div>
              <span>주문서 분류</span>
              <b className="is-done">완료</b>
              <small>09:12</small>
            </div>
            <div>
              <span>보고서 생성</span>
              <b className="is-progress">처리 중</b>
              <small>09:20</small>
            </div>
            <div>
              <span>누락 항목</span>
              <b className="is-review">확인 필요</b>
              <small>박담당</small>
            </div>
          </div>
          <div className="site-auto-history">
            <span>
              <Users size={18} />
              담당자 확인
            </span>
            <span>
              <ShieldCheck size={18} />
              승인 이력
            </span>
            <span>
              <BarChart3 size={18} />
              처리 결과
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="site-dd-detail-visual is-flow"
      style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
      aria-hidden="true"
    >
      <div className="site-dd-flow-board site-auto-flow-board">
        <div className="site-dd-flow-column">
          <span>
            <FileText size={18} />
            요청 접수
          </span>
          <span>
            <Search size={18} />
            분류
          </span>
          <span>
            <Layers3 size={18} />
            정리
          </span>
          <span>
            <BarChart3 size={18} />
            보고
          </span>
        </div>
        <div className="site-dd-flow-core">
          <Workflow size={28} />
          <strong>AI-Core</strong>
          <small>자동 처리 흐름</small>
        </div>
        <div className="site-dd-flow-column is-output">
          <span>상태 변경</span>
          <span>담당자 알림</span>
          <span>보고 생성</span>
          <span>이력 기록</span>
        </div>
      </div>
    </div>
  );
}
