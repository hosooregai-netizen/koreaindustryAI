"use client";

import {
  ArrowRight,
  Boxes,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Database,
  FileText,
  Gauge,
  Layers3,
  Mail,
  Menu,
  Send,
  ShieldCheck,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "솔루션", href: "#v2-solutions" },
  { label: "적용 사례", href: "#v2-cases" },
  { label: "도입 프로세스", href: "#v2-process" },
  { label: "회사소개", href: "#v2-company" },
];

const problemItems = [
  { title: "수작업 입력", description: "같은 데이터를 엑셀, ERP, 문서에 반복 입력합니다." },
  { title: "자료 확인", description: "메일과 웹하드의 파일을 매번 사람이 찾아 정리합니다." },
  { title: "보고서 작성", description: "현장별 양식과 사진을 모아 보고서를 반복 생성합니다." },
  { title: "현황 파악", description: "대장, 일정, 처리 상태가 흩어져 관리자 확인이 늦어집니다." },
];

const inputNodes = ["ERP", "웹메일", "웹하드", "엑셀", "현장 사진", "문서 양식"];
const outputNodes = ["보고서", "안전보건 대장", "ERP 반영", "대시보드", "재고 알림", "승인 요청"];

const solutions: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  points: string[];
}> = [
  {
    icon: Database,
    title: "ERP / 사내 시스템 연동",
    description: "기존 ERP, 웹메일, 웹하드, DB, 외부 API를 업무 흐름에 맞춰 연결합니다.",
    points: ["기존 시스템 유지", "데이터 자동 수집", "연동 범위 단계 확장"],
  },
  {
    icon: Workflow,
    title: "업무 자동화",
    description: "반복 입력, 확인, 분류, 알림, 승인 요청을 자동 처리 흐름으로 전환합니다.",
    points: ["수작업 병목 제거", "승인/알림 자동화", "담당자별 규칙 적용"],
  },
  {
    icon: FileText,
    title: "문서 자동화",
    description: "안전보건 대장, 점검표, 견적서, 보고서를 기존 양식에 맞춰 자동 생성합니다.",
    points: ["기존 양식 유지", "사진/데이터 삽입", "보고서 이력 관리"],
  },
  {
    icon: Gauge,
    title: "대시보드 / 운영 관리",
    description: "관리자가 처리 현황, 누락, 일정, 재고, 보고서 상태를 한 화면에서 봅니다.",
    points: ["현황 시각화", "누락 항목 추적", "월간/현장별 리포트"],
  },
];

const caseData = {
  safety: {
    label: "건설 안전지도",
    eyebrow: "Construction Safety",
    title: "현장 자료에서 안전지도 보고서까지 자동화",
    description:
      "방문 일정, 점검 항목, 사진 자료를 정리해 안전지도 보고서와 현장별 이력으로 연결합니다.",
    flow: ["현장 정보", "사진/점검", "보고서", "대장 반영"],
    metrics: ["현장 12", "보고서 34", "누락 0"],
  },
  ledger: {
    label: "안전보건 대장",
    eyebrow: "Safety Ledger",
    title: "대장 업데이트와 누락 체크를 자동화",
    description:
      "현장별 안전보건 자료를 양식에 맞춰 정리하고, 누락 항목과 월별 이력을 관리합니다.",
    flow: ["자료 수집", "양식 매핑", "누락 체크", "월별 관리"],
    metrics: ["대장 8", "항목 128", "검토 6"],
  },
  erp: {
    label: "ERP/보고서",
    eyebrow: "ERP Automation",
    title: "웹메일·웹하드·ERP를 보고서 흐름으로 연결",
    description:
      "메일 첨부파일과 웹하드 자료를 수집하고, 보고서 생성과 ERP 반영까지 이어갑니다.",
    flow: ["메일 수신", "파일 정리", "보고 생성", "ERP 반영"],
    metrics: ["메일 128", "파일 42", "승인 17"],
  },
  inventory: {
    label: "제조 재고",
    eyebrow: "Manufacturing",
    title: "입출고 데이터와 재고 알림을 한 화면으로",
    description:
      "품목별 입출고 기록을 정리하고 부족 재고, 발주 필요 항목, 현황 리포트를 자동화합니다.",
    flow: ["입출고", "재고 기준", "부족 알림", "리포트"],
    metrics: ["품목 486", "부족 9", "입고 32"],
  },
};

type CaseKey = keyof typeof caseData;

const processSteps = [
  {
    title: "방문 진단",
    description: "실제 업무 화면, 문서 양식, 담당자 흐름을 확인합니다.",
  },
  {
    title: "업무 흐름 분석",
    description: "반복 업무와 병목 구간을 자동화 후보로 정리합니다.",
  },
  {
    title: "자동화 설계",
    description: "연동 범위, 자동화 규칙, 산출물, 관리자 화면을 정의합니다.",
  },
  {
    title: "빠른 구축",
    description: "핵심 업무부터 작게 구축해 바로 쓸 수 있는 상태로 전환합니다.",
  },
  {
    title: "운영 개선",
    description: "현장 피드백을 기준으로 화면, 규칙, 대시보드를 고도화합니다.",
  },
];

const proofItems = [
  "현장 기반 업무 분석",
  "ERP/사내 시스템 연동",
  "문서 자동화 구축",
  "운영 대시보드 개발",
  "기존 프로그램 개선",
  "맞춤형 웹앱 구축",
];

function V2HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const nodes = [
      { x: 0.11, y: 0.22 },
      { x: 0.28, y: 0.62 },
      { x: 0.44, y: 0.32 },
      { x: 0.62, y: 0.7 },
      { x: 0.78, y: 0.28 },
      { x: 0.9, y: 0.56 },
    ];
    let frame = 0;
    let width = 0;
    let height = 0;
    let raf = 0;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const animate = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#07111f");
      gradient.addColorStop(0.55, "#0a2137");
      gradient.addColorStop(1, "#06101d");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(255,255,255,0.055)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 44) {
        ctx.beginPath();
        ctx.moveTo(x + ((frame * 0.15) % 44), 0);
        ctx.lineTo(x + ((frame * 0.15) % 44), height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 44) {
        ctx.beginPath();
        ctx.moveTo(0, y + ((frame * 0.15) % 44));
        ctx.lineTo(width, y + ((frame * 0.15) % 44));
        ctx.stroke();
      }

      ctx.strokeStyle = "rgba(33,199,217,0.26)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      nodes.forEach((node, index) => {
        const x = node.x * width;
        const y = node.y * height;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      nodes.forEach((node, index) => {
        const x = node.x * width;
        const y = node.y * height;
        const pulse = Math.sin(frame * 0.04 + index) * 0.5 + 0.5;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, 52);
        glow.addColorStop(0, `rgba(33,199,217,${0.24 + pulse * 0.18})`);
        glow.addColorStop(1, "rgba(33,199,217,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, 52, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = index % 2 === 0 ? "#21c7d9" : "#b8e64a";
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      raf = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="v2-hero-canvas" ref={canvasRef} aria-hidden="true" />;
}

function V2Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 18);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <header className={`v2-header ${scrolled ? "is-scrolled" : ""}`}>
      <a className="v2-brand" href="#v2-top" onClick={() => setOpen(false)}>
        <span className="v2-brand-mark" />
        <span>대한산업AI</span>
      </a>
      <button
        className="v2-menu-button"
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`v2-nav ${open ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="v2-nav-cta" href="#v2-contact" onClick={() => setOpen(false)}>
          문의하기
        </a>
      </nav>
    </header>
  );
}

function V2CasePanel() {
  const [active, setActive] = useState<CaseKey>("safety");
  const selected = caseData[active];

  return (
    <div className="v2-case-panel">
      <div className="v2-case-tabs" role="tablist" aria-label="적용 사례">
        {(Object.keys(caseData) as CaseKey[]).map((key) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active === key}
            className={active === key ? "is-active" : ""}
            onClick={() => setActive(key)}
          >
            {caseData[key].label}
          </button>
        ))}
      </div>
      <div className="v2-case-content">
        <div className="v2-case-copy">
          <p className="v2-eyebrow">{selected.eyebrow}</p>
          <h3>{selected.title}</h3>
          <p>{selected.description}</p>
          <div className="v2-case-metrics">
            {selected.metrics.map((metric) => (
              <span key={metric}>{metric}</span>
            ))}
          </div>
        </div>
        <div className="v2-flow-screen" aria-label={`${selected.label} 자동화 흐름`}>
          <div className="v2-flow-top">
            <span />
            <span />
            <span />
            <strong>{selected.label}</strong>
          </div>
          <div className="v2-flow-body">
            {selected.flow.map((item, index) => (
              <div className="v2-flow-step" key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item}</strong>
              </div>
            ))}
          </div>
          <div className="v2-screen-lines">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </div>
  );
}

function V2ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="v2-contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label>
        회사명
        <input name="company" placeholder="대한건설안전 주식회사" required />
      </label>
      <label>
        담당자명
        <input name="name" placeholder="홍길동" required />
      </label>
      <label>
        연락처
        <input name="contact" placeholder="이메일 또는 전화번호" required />
      </label>
      <label>
        산업 분야
        <select name="industry" defaultValue="" required>
          <option value="" disabled>
            선택해주세요
          </option>
          <option>건설 안전/감리</option>
          <option>제조</option>
          <option>기타 기업 업무</option>
        </select>
      </label>
      <label>
        관심 영역
        <select name="interest" defaultValue="" required>
          <option value="" disabled>
            선택해주세요
          </option>
          <option>건설 안전지도 자동화</option>
          <option>안전보건 대장 자동화</option>
          <option>ERP/사내 시스템 연동</option>
          <option>문서/보고서 자동화</option>
          <option>제조/재고 관리</option>
          <option>기타 업무 자동화</option>
        </select>
      </label>
      <label>
        현재 사용 중인 시스템
        <input name="system" placeholder="ERP, 웹메일, 웹하드, 엑셀 등" />
      </label>
      <label className="is-wide">
        자동화하고 싶은 업무
        <textarea
          name="message"
          rows={5}
          placeholder="예: 현장 사진과 점검 내용을 기반으로 안전지도 보고서를 자동 생성하고 싶습니다."
        />
      </label>
      <button className="v2-button v2-button-primary is-wide" type="submit">
        <Send size={17} />
        문의 접수하기
      </button>
      <p className={`v2-form-note ${submitted ? "is-success" : ""}`}>
        {submitted
          ? "문의 내용이 준비되었습니다. 실제 접수 연동은 다음 단계에서 연결하면 됩니다."
          : "문의 정보 연동은 추후 연결 예정입니다."}
      </p>
    </form>
  );
}

export function V2Landing() {
  return (
    <div className="v2-page" id="v2-top">
      <V2Header />

      <main>
        <section className="v2-hero">
          <V2HeroNetwork />
          <div className="v2-hero-shade" />
          <div className="v2-hero-inner">
            <div className="v2-hero-copy">
              <p className="v2-eyebrow">Enterprise AI Automation Partner</p>
              <h1>AI로 기업의 생산성을 혁신하는 자동화 솔루션</h1>
              <p>
                ERP, 사내 시스템, 문서, 메일, 웹하드, 대시보드까지 기업의 반복 업무를
                하나의 자동화 흐름으로 연결합니다.
              </p>
              <div className="v2-hero-actions">
                <a className="v2-button v2-button-primary" href="#v2-contact">
                  도입 문의
                  <ArrowRight size={18} />
                </a>
                <a className="v2-button v2-button-secondary" href="#v2-cases">
                  적용 사례 보기
                </a>
              </div>
            </div>

            <div className="v2-ops-panel" aria-label="자동화 운영 화면 예시">
              <div className="v2-panel-top">
                <span />
                <span />
                <span />
                <strong>DAEHAN AI OPS</strong>
              </div>
              <div className="v2-ops-grid">
                <div className="v2-ops-card is-wide">
                  <p>업무 흐름</p>
                  <div className="v2-mini-pipeline">
                    <span>
                      <Mail size={18} />
                      메일
                    </span>
                    <i />
                    <span>
                      <FileText size={18} />
                      문서
                    </span>
                    <i />
                    <span>
                      <Database size={18} />
                      ERP
                    </span>
                  </div>
                </div>
                <div className="v2-ops-card">
                  <p>자동 처리</p>
                  <strong>87건</strong>
                  <small>오늘 생성된 보고서</small>
                </div>
                <div className="v2-ops-card">
                  <p>연동 상태</p>
                  <div className="v2-status-bars">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
                <div className="v2-ops-card is-map">
                  <p>현장 대시보드</p>
                  <div className="v2-mini-map">
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="v2-logo-strip" aria-label="고객사 로고 영역">
          <span>Trusted by teams like</span>
          <strong>Samsung Electronics</strong>
          <strong>SK hynix</strong>
          <strong>Hyundai E&C</strong>
          <strong>Confidential Manufacturing Co.</strong>
        </section>

        <section className="v2-section v2-problems">
          <div className="v2-section-heading">
            <p className="v2-eyebrow">Manual Bottlenecks</p>
            <h2>자동화는 거대한 AI 프로젝트가 아니라, 반복 업무를 줄이는 것에서 시작합니다.</h2>
          </div>
          <div className="v2-problem-grid">
            {problemItems.map((item, index) => (
              <article className="v2-problem-card" key={item.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="v2-section v2-architecture">
          <div className="v2-section-heading is-centered">
            <p className="v2-eyebrow">Automation Architecture</p>
            <h2>흩어진 업무를 하나의 자동화 흐름으로 연결합니다.</h2>
          </div>
          <div className="v2-architecture-board">
            <div className="v2-arch-column">
              <span className="v2-column-label">입력 데이터</span>
              {inputNodes.map((node) => (
                <div className="v2-arch-node" key={node}>
                  {node}
                </div>
              ))}
            </div>
            <div className="v2-arch-core">
              <div className="v2-core-ring">
                <Layers3 size={28} />
                <strong>대한산업AI</strong>
                <span>Automation Layer</span>
              </div>
              <div className="v2-core-list">
                <span>업무 규칙 분석</span>
                <span>AI 문서 생성</span>
                <span>승인/알림 자동화</span>
                <span>시스템 연동</span>
              </div>
            </div>
            <div className="v2-arch-column is-output">
              <span className="v2-column-label">출력 결과</span>
              {outputNodes.map((node) => (
                <div className="v2-arch-node" key={node}>
                  {node}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="v2-section v2-solutions" id="v2-solutions">
          <div className="v2-section-heading is-split">
            <div>
              <p className="v2-eyebrow">Solutions</p>
              <h2>기업 내부 시스템에 바로 붙는 자동화 솔루션</h2>
            </div>
            <p>
              새 시스템을 강요하기보다, 이미 쓰고 있는 ERP·웹메일·웹하드·문서 양식 위에
              필요한 자동화 레이어를 설계합니다.
            </p>
          </div>
          <div className="v2-solution-grid">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <article className="v2-solution-card" key={solution.title}>
                  <Icon size={24} />
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <ul>
                    {solution.points.map((point) => (
                      <li key={point}>
                        <CheckCircle2 size={15} />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="v2-section v2-cases" id="v2-cases">
          <div className="v2-section-heading">
            <p className="v2-eyebrow">Use Cases</p>
            <h2>현장에서 바로 이해되는 적용 사례</h2>
          </div>
          <V2CasePanel />
        </section>

        <section className="v2-section v2-featured">
          <div className="v2-featured-copy">
            <p className="v2-eyebrow">Featured Solution</p>
            <h2>수작업 보고 업무를 자동화된 현장 관리 시스템으로 전환합니다.</h2>
            <p>
              건설 안전지도 업무를 기준으로 현장 방문 일정, 사진/점검 데이터, 보고서,
              안전보건 대장, 관리자 대시보드를 하나의 흐름으로 묶습니다.
            </p>
          </div>
          <div className="v2-featured-board">
            {[
              { icon: Building2, title: "현장 방문 일정" },
              { icon: ClipboardCheck, title: "사진/점검 데이터" },
              { icon: FileText, title: "보고서 자동 생성" },
              { icon: ShieldCheck, title: "대장/대시보드 반영" },
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div className="v2-feature-step" key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={22} />
                  <strong>{item.title}</strong>
                </div>
              );
            })}
          </div>
        </section>

        <section className="v2-section v2-process" id="v2-process">
          <div className="v2-section-heading is-split">
            <div>
              <p className="v2-eyebrow">Implementation</p>
              <h2>방문 진단부터 운영 개선까지</h2>
            </div>
            <p>
              실제 업무를 보는 자리에서 병목을 찾고, 작게 시작해 운영 가능한 자동화로
              확장합니다.
            </p>
          </div>
          <ol className="v2-process-list">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{step.title}</strong>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="v2-section v2-company" id="v2-company">
          <div className="v2-company-panel">
            <div>
              <p className="v2-eyebrow">Company</p>
              <h2>대한산업AI 주식회사</h2>
              <p>
                건설 안전지도·감리 법인의 반복 행정부터 제조 현장의 재고·보고 업무까지,
                산업 현장에 필요한 자동화 시스템을 설계하고 구축합니다.
              </p>
            </div>
            <div className="v2-proof-grid">
              {proofItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="v2-section v2-contact" id="v2-contact">
          <div className="v2-contact-copy">
            <p className="v2-eyebrow">Contact</p>
            <h2>자동화가 필요한 업무를 알려주세요</h2>
            <p>
              지금 쓰고 있는 프로그램, 반복 문서, 현장 보고 흐름을 남겨주시면 도입 가능
              범위를 검토해 연락드리겠습니다.
            </p>
          </div>
          <V2ContactForm />
        </section>
      </main>

      <footer className="v2-footer">
        <div>
          <strong>대한산업AI 주식회사</strong>
          <span>AI Automation for Industrial Operations</span>
        </div>
        <div>
          <span>주소 입력 예정</span>
          <span>사업자등록번호 입력 예정</span>
          <span>contact@koreaindustry.ai</span>
        </div>
      </footer>
    </div>
  );
}
