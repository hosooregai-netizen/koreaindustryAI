"use client";

import { useState } from "react";

const caseData = {
  safety: {
    tab: "건설 안전지도",
    eyebrow: "Construction Safety",
    title: "건설 안전지도 자동화 솔루션",
    body: "현장 정보, 방문 일정, 점검 항목, 사진 자료를 자동으로 정리해 안전지도 보고서와 안전보건 대장으로 연결합니다.",
    label: "Safety Automation",
    metrics: ["현장 12", "보고서 34", "대장 8"],
  },
  erp: {
    tab: "통합 ERP",
    eyebrow: "Enterprise Workflow",
    title: "웹하드·웹메일·보고서까지 연결되는 통합 ERP",
    body: "사내 웹하드와 메일에서 필요한 파일과 데이터를 수집하고, 보고서 생성·승인·관리자 대시보드까지 자동화합니다.",
    label: "ERP Workspace",
    metrics: ["메일 128", "파일 42", "승인 17"],
  },
  docs: {
    tab: "문서 자동화",
    eyebrow: "Document Automation",
    title: "안전보건 대장과 보고서 자동 생성",
    body: "현장별 양식, 법정 문서, 내부 보고 템플릿을 표준화하고 입력 데이터에 맞춰 문서를 자동 생성합니다.",
    label: "Document Engine",
    metrics: ["양식 21", "자동 생성 64", "검토 대기 6"],
  },
  inventory: {
    tab: "제조 재고",
    eyebrow: "Manufacturing Inventory",
    title: "제조 현장의 재고 관리 자동화",
    body: "입출고 데이터, 재고 기준, 알림 규칙을 연결해 관리자가 필요한 정보를 대시보드에서 바로 확인하게 합니다.",
    label: "Inventory Control",
    metrics: ["품목 486", "부족 9", "입고 32"],
  },
};

type CaseKey = keyof typeof caseData;

export function UseCaseTabs() {
  const [activeCase, setActiveCase] = useState<CaseKey>("safety");
  const selected = caseData[activeCase];

  return (
    <>
      <div className="case-tabs" role="tablist" aria-label="적용 사례 선택">
        {(Object.keys(caseData) as CaseKey[]).map((key) => (
          <button
            className={`case-tab ${activeCase === key ? "is-active" : ""}`}
            key={key}
            type="button"
            role="tab"
            aria-selected={activeCase === key}
            onClick={() => setActiveCase(key)}
          >
            {caseData[key].tab}
          </button>
        ))}
      </div>

      <div className="case-showcase">
        <div className="case-copy">
          <p className="eyebrow">{selected.eyebrow}</p>
          <h3>{selected.title}</h3>
          <p>{selected.body}</p>
        </div>
        <div className="case-visual" aria-label="선택된 적용 사례 도식">
          <div className="screen-shell">
            <div className="screen-top">
              <span />
              <span />
              <span />
              <strong>{selected.label}</strong>
            </div>
            <div className="screen-body">
              <div className="left-rail" />
              <div className="dashboard-main">
                <div className="metric-row">
                  {selected.metrics.map((metric) => (
                    <span key={metric}>{metric}</span>
                  ))}
                </div>
                <div className="visual-map">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
                <div className="report-lines">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
