import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Camera,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Layers3,
  Search,
  ShieldCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "Data-Driven AI-Core | 대한산업AI",
  description: "현장 데이터, 문서, 승인 흐름을 기업 맞춤 ERP 구조로 연결하는 Data-Driven AI-Core 상세 페이지입니다.",
};

const dataCards = [
  {
    title: "데이터 입력",
    text: "문서, ERP, 사진, 승인, 운영 데이터를 업무 단위로 모읍니다.",
    visual: "input",
  },
  {
    title: "데이터 매핑",
    text: "회사별 용어, 문서 양식, 승인 기준을 ERP형 데이터 구조로 연결합니다.",
    visual: "mapping",
  },
  {
    title: "업무 출력",
    text: "정리된 데이터를 업무 화면, 보고서, 대시보드, 알림으로 보여줍니다.",
    visual: "output",
  },
] as const;

const detailRows = [
  {
    title: "데이터 정리 걱정 없이 업무에 집중하세요",
    text: "문서와 운영 기록을 사람이 다시 옮겨 적지 않아도, 필요한 항목을 업무 화면에서 바로 확인할 수 있는 구조로 정리합니다.",
    visual: "flow",
    reverse: false,
    terms: ["문서", "ERP", "사진", "승인", "운영 데이터"],
  },
  {
    title: "복잡한 설정은 업무 기준으로 정리합니다.",
    text: "권한, 입력 항목, 승인 조건, 보고 기준을 고객사의 실제 처리 방식에 맞춰 구성합니다.",
    visual: "layers",
    reverse: true,
    terms: ["업무 화면", "규칙", "AI 처리", "데이터 저장소"],
  },
  {
    title: "부서별 데이터도 하나의 기준으로 활용합니다",
    text: "현장, 관리, 결재, 보고 담당자가 같은 데이터를 다른 화면에서 확인할 수 있게 역할별 화면을 구성합니다.",
    visual: "team",
    reverse: false,
    terms: ["현장", "관리", "결재", "보고"],
  },
] as const;

const featureCards: Array<{
  title: string;
  text: string;
  icon: LucideIcon;
  accent: "green" | "blue" | "purple" | "sky" | "amber" | "gray";
}> = [
  {
    title: "문서 수집",
    text: "거래명세서, 보고서, 신청서, 사진 자료를 업무 데이터로 전환할 준비를 합니다.",
    icon: FileText,
    accent: "green",
  },
  {
    title: "승인 흐름",
    text: "검토자, 승인자, 반려 기준, 처리 상태를 회사의 실제 결재 방식에 맞게 구성합니다.",
    icon: ClipboardCheck,
    accent: "blue",
  },
  {
    title: "ERP 매핑",
    text: "고객, 현장, 품목, 계약, 문서 같은 기준 데이터와 연결합니다.",
    icon: Database,
    accent: "purple",
  },
  {
    title: "AI 정리",
    text: "문서에서 필요한 항목을 추출하고 분류해 사람이 확인할 수 있는 형태로 정리합니다.",
    icon: Workflow,
    accent: "sky",
  },
  {
    title: "보고서와 대시보드",
    text: "처리 현황, 누락 항목, 승인 상태, 운영 지표를 한 화면에서 확인합니다.",
    icon: BarChart3,
    accent: "amber",
  },
  {
    title: "알림과 이력",
    text: "처리 지연, 검토 요청, 데이터 변경 이력을 담당자에게 전달하고 기록합니다.",
    icon: Bell,
    accent: "gray",
  },
];

export default function DataDrivenPage() {
  return (
    <SiteShell>
      <main className="site-dd-page">
        <section className="site-dd-hero" aria-labelledby="site-dd-hero-title">
          <div className="site-dd-hero-pattern" aria-hidden="true" />
          <div className="site-dd-hero-inner">
            <p className="site-dd-eyebrow">Data-Driven AI-Core</p>
            <h1 id="site-dd-hero-title">현장 데이터 걱정 없이 AI 업무 시작</h1>
            <p>
              문서, 승인 흐름, 운영 데이터를 기업 맞춤 ERP 구조로 연결해 업무 화면과 보고서로 바로 활용할 수
              있게 합니다.
            </p>
            <div className="site-dd-hero-actions">
              <Link className="site-dd-button site-dd-button-primary" href="/contact">
                데이터 구조 상담
              </Link>
              <Link className="site-dd-button site-dd-button-secondary" href="#data-structure">
                도입 방식 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="site-dd-section site-dd-card-section" id="data-structure" aria-labelledby="site-dd-card-title">
          <div className="site-dd-section-head">
            <h2 id="site-dd-card-title">기업 데이터 흐름에 맞는 AI-Core 구성</h2>
            <p>흩어진 데이터는 그대로 두지 않고, 입력부터 화면까지 이어지는 업무 구조로 정리합니다.</p>
          </div>
          <div className="site-dd-data-grid">
            {dataCards.map((card, index) => (
              <article
                className="site-dd-data-card"
                key={card.title}
                style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
              >
                <DataCardVisual kind={card.visual} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="site-dd-section site-dd-detail-section" aria-label="데이터 연결 상세">
          {detailRows.map((row, index) => (
            <article className={`site-dd-detail-row${row.reverse ? " is-reverse" : ""}`} key={row.title}>
              <div className="site-dd-detail-copy">
                <h2>{row.title}</h2>
                <p>{row.text}</p>
                <div className="site-dd-term-list" aria-label="포함 데이터">
                  {row.terms.map((term) => (
                    <span key={term}>{term}</span>
                  ))}
                </div>
              </div>
              <DetailVisual kind={row.visual} index={index} />
            </article>
          ))}
        </section>

        <section className="site-dd-section site-dd-feature-section" aria-labelledby="site-dd-feature-title">
          <div className="site-dd-section-head">
            <h2 id="site-dd-feature-title">Data-Driven AI-Core 하나로, 업무 데이터의 모든 과정을 연결합니다.</h2>
            <p>입력, 정리, 검토, 화면, 보고, 알림까지 필요한 기능을 기업 업무 방식에 맞춰 조립합니다.</p>
          </div>
          <div className="site-dd-feature-grid">
            {featureCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <article
                  className="site-dd-feature-card"
                  data-accent={card.accent}
                  key={card.title}
                  style={{ "--site-dd-delay": `${index * 70}ms` } as CSSProperties}
                >
                  <div className="site-dd-feature-visual">
                    <div className="site-dd-feature-window">
                      <Icon size={36} strokeWidth={2.4} aria-hidden="true" />
                      <span />
                      <span />
                    </div>
                  </div>
                  <h3>{card.title}</h3>
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

function DataCardVisual({ kind }: { kind: (typeof dataCards)[number]["visual"] }) {
  if (kind === "mapping") {
    return (
      <div className="site-dd-card-visual is-mapping" aria-hidden="true">
        <div className="site-dd-map-grid">
          <span />
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="site-dd-search-pill">
          <Search size={22} />
          <strong>데이터 기준 연결</strong>
          <span>
            <ArrowRight size={18} />
          </span>
        </div>
      </div>
    );
  }

  if (kind === "output") {
    return (
      <div className="site-dd-card-visual is-output" aria-hidden="true">
        <div className="site-dd-output-tile">
          <FileText size={34} />
        </div>
        <div className="site-dd-output-tile">
          <BarChart3 size={38} />
        </div>
        <div className="site-dd-output-tile">
          <Bell size={35} />
        </div>
      </div>
    );
  }

  return (
    <div className="site-dd-card-visual is-input" aria-hidden="true">
      <span className="site-dd-orbit is-one" />
      <span className="site-dd-orbit is-two" />
      <div className="site-dd-core-mark">AI</div>
      <span className="site-dd-orbit-icon is-file">
        <FileText size={19} />
      </span>
      <span className="site-dd-orbit-icon is-camera">
        <Camera size={18} />
      </span>
      <span className="site-dd-orbit-icon is-db">
        <Database size={18} />
      </span>
      <span className="site-dd-orbit-icon is-check">
        <CheckCircle2 size={18} />
      </span>
      <span className="site-dd-orbit-icon is-flow">
        <Workflow size={18} />
      </span>
    </div>
  );
}

function DetailVisual({ kind, index }: { kind: (typeof detailRows)[number]["visual"]; index: number }) {
  if (kind === "layers") {
    return (
      <div
        className="site-dd-detail-visual is-layers"
        style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
        aria-hidden="true"
      >
        <div className="site-dd-layer-stack">
          <div>
            <span>업무 화면</span>
          </div>
          <div>
            <span>규칙</span>
          </div>
          <div>
            <span>AI 처리</span>
          </div>
          <div>
            <span>데이터 저장소</span>
          </div>
        </div>
        <ul>
          <li>입력 항목</li>
          <li>승인 조건</li>
          <li>보고 기준</li>
          <li>권한 범위</li>
        </ul>
      </div>
    );
  }

  if (kind === "team") {
    return (
      <div
        className="site-dd-detail-visual is-team"
        style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
        aria-hidden="true"
      >
        <div className="site-dd-form-panel">
          <strong>역할별 화면 구성</strong>
          <p>같은 데이터, 다른 업무 화면</p>
          <label>
            담당 역할
            <span>현장 관리자</span>
          </label>
          <label>
            데이터 범위
            <span>보고 / 결재 / 이력</span>
          </label>
          <div className="site-dd-role-row">
            <Users size={20} />
            <ShieldCheck size={20} />
            <Bell size={20} />
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
      <div className="site-dd-flow-board">
        <div className="site-dd-flow-column">
          <span>
            <FileText size={18} />
            문서
          </span>
          <span>
            <Database size={18} />
            ERP
          </span>
          <span>
            <Camera size={18} />
            사진
          </span>
          <span>
            <ClipboardCheck size={18} />
            승인
          </span>
        </div>
        <div className="site-dd-flow-core">
          <Layers3 size={28} />
          <strong>AI-Core</strong>
          <small>업무 기준 정렬</small>
        </div>
        <div className="site-dd-flow-column is-output">
          <span>업무 화면</span>
          <span>보고서</span>
          <span>대시보드</span>
          <span>알림</span>
        </div>
      </div>
    </div>
  );
}
