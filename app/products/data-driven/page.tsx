import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Camera,
  ClipboardCheck,
  Database,
  FileText,
  Layers3,
  Search,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { SiteCtaBand, SiteShell } from "@/components/site";

export const metadata: Metadata = {
  title: "Data-Driven AI-Core | 대한산업AI",
  description: "흩어진 현장 데이터를 업무 화면과 의사결정으로 연결하는 Data-Driven AI-Core 상세 페이지입니다.",
};

const dataCards = [
  {
    title: "흩어진 데이터를 모읍니다",
    text: "문서, 사진, ERP, 승인 기록을 AI-Core가 쓸 수 있는 업무 데이터로 묶습니다.",
    visual: "input",
  },
  {
    title: "회사 기준에 맞게 연결합니다",
    text: "양식, 용어, 승인 방식이 달라도 기업의 실제 처리 방식에 맞춰 정리합니다.",
    visual: "mapping",
  },
  {
    title: "화면과 보고서로 바로 씁니다",
    text: "정리된 데이터가 업무 화면, 보고서, 알림으로 이어져 실행에 바로 쓰입니다.",
    visual: "output",
  },
] as const;

const detailRows = [
  {
    title: "현장 데이터가 바로 업무가 됩니다",
    text: "문서와 사진을 다시 옮겨 적는 시간을 줄이고, 필요한 정보가 업무 화면에 바로 올라옵니다.",
    visual: "flow",
    reverse: false,
    terms: ["문서", "ERP", "사진", "승인", "운영 데이터"],
  },
  {
    title: "복잡한 설정도 업무에 맞게 풀어줍니다",
    text: "권한, 입력값, 승인 흐름, 보고 양식을 회사가 일하는 방식에 맞춰 정리합니다.",
    visual: "layers",
    reverse: true,
    terms: ["업무 기준", "권한", "승인 흐름", "보고 기준"],
  },
  {
    title: "부서마다 다른 화면, 기준은 하나로 맞춥니다",
    text: "현장, 관리, 결재, 보고 담당자가 각자 필요한 화면을 쓰면서도 같은 데이터를 기준으로 움직입니다.",
    visual: "team",
    reverse: false,
    terms: ["현장", "관리", "결재", "보고"],
  },
] as const;

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
              대한산업AI는 문서, 승인, 운영 데이터를 AI-Core로 연결해 기업이 더 빠르게 보고 판단하게 합니다.
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

        <div className="site-product-sample-section">
          <DataDrivenHeroSample />
        </div>

        <section className="site-dd-section site-dd-card-section" id="data-structure" aria-labelledby="site-dd-card-title">
          <div className="site-dd-section-head">
            <h2 id="site-dd-card-title">기업 데이터 흐름에 맞는 AI-Core 구성</h2>
            <p>흩어진 데이터를 다시 입력하지 않아도, 현장에서 보고까지 바로 이어지는 구조를 만듭니다.</p>
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

        <SiteCtaBand title="현장 데이터를 AI-Core로 연결하세요." label="도입 문의" variant="final" />
      </main>
    </SiteShell>
  );
}

function DataDrivenHeroSample() {
  return (
    <figure className="site-product-sample-frame site-product-sample-frame--data">
      <img src="/assets/datadriven.png" alt="AI-Core 업무 대시보드 샘플 화면" />
    </figure>
  );
}

function DataCardVisual({ kind }: { kind: (typeof dataCards)[number]["visual"] }) {
  if (kind === "mapping") {
    return (
      <div className="site-dd-card-visual site-product-schematic-card is-mapping" aria-hidden="true">
        <div className="site-product-rule-stack">
          <span>양식</span>
          <span>용어</span>
          <span>승인</span>
        </div>
        <span className="site-product-schematic-arrow">
          <ArrowRight size={18} />
        </span>
        <div className="site-product-schematic-node is-strong">
          <Search size={22} />
          <strong>회사 기준</strong>
          <small>업무 구조 연결</small>
        </div>
      </div>
    );
  }

  if (kind === "output") {
    return (
      <div className="site-dd-card-visual site-product-schematic-card is-output" aria-hidden="true">
        <div className="site-product-schematic-node is-strong">
          <Database size={22} />
          <strong>정리된 데이터</strong>
        </div>
        <span className="site-product-schematic-arrow">
          <ArrowRight size={18} />
        </span>
        <div className="site-product-output-row">
          <span>
            <FileText size={20} />
            화면
          </span>
          <span>
            <BarChart3 size={20} />
            보고서
          </span>
          <span>
            <Bell size={20} />
            알림
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="site-dd-card-visual site-product-schematic-card is-input" aria-hidden="true">
      <div className="site-product-source-grid">
        <span>
          <FileText size={18} />
          문서
        </span>
        <span>
          <Camera size={18} />
          사진
        </span>
        <span>
          <Database size={18} />
          ERP
        </span>
        <span>
          <ClipboardCheck size={18} />
          승인
        </span>
      </div>
      <span className="site-product-schematic-arrow">
        <ArrowRight size={18} />
      </span>
      <div className="site-product-schematic-node is-strong">
        <Layers3 size={22} />
        <strong>업무 데이터</strong>
      </div>
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
        <div className="site-product-wide-flow is-settings">
          <div className="site-product-stack-list">
            <span>권한</span>
            <span>입력값</span>
            <span>승인</span>
            <span>보고</span>
          </div>
          <span className="site-product-schematic-arrow">
            <ArrowRight size={20} />
          </span>
          <div className="site-product-schematic-node is-core">
            <Workflow size={28} />
            <strong>회사 방식</strong>
            <small>업무 기준 적용</small>
          </div>
          <span className="site-product-schematic-arrow">
            <ArrowRight size={20} />
          </span>
          <div className="site-product-result-panel">
            <strong>바로 사용</strong>
            <span>화면</span>
            <span>보고서</span>
          </div>
        </div>
      </div>
    );
  }

  if (kind === "team") {
    return (
      <div
        className="site-dd-detail-visual is-team site-product-detail-schematic"
        style={{ "--site-dd-delay": `${index * 90}ms` } as CSSProperties}
        aria-hidden="true"
      >
        <div className="site-product-role-map">
          <div className="site-product-schematic-node is-core">
            <Database size={28} />
            <strong>같은 데이터</strong>
          </div>
          <div className="site-product-role-lines">
            <span />
            <span />
            <span />
          </div>
          <div className="site-product-role-screens">
            <span>
              <Camera size={18} />
              현장 화면
            </span>
            <span>
              <ShieldCheck size={18} />
              결재 화면
            </span>
            <span>
              <BarChart3 size={18} />
              보고 화면
            </span>
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
        <div className="site-product-stack-list">
          <span>문서</span>
          <span>사진</span>
          <span>ERP</span>
          <span>승인</span>
        </div>
        <span className="site-product-schematic-arrow">
          <ArrowRight size={20} />
        </span>
        <div className="site-product-schematic-node is-core">
          <Layers3 size={28} />
          <strong>AI-Core</strong>
          <small>업무 데이터화</small>
        </div>
        <span className="site-product-schematic-arrow">
          <ArrowRight size={20} />
        </span>
        <div className="site-product-result-panel">
          <strong>업무 화면</strong>
          <span>보고서</span>
          <span>알림</span>
        </div>
      </div>
    </div>
  );
}
