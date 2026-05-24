"use client";

import {
  ArrowRight,
  BarChart3,
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
  MonitorCog,
  Send,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

type HeroVisualKind = "ops" | "architecture" | "mvp" | "company" | "contact";

export const navItems = [
  { label: "제품", href: "/v3/products" },
  { label: "회사소개", href: "/v3/company" },
  { label: "MVP", href: "/v3/mvp" },
];

export const productModules: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  items: string[];
  example: string;
}> = [
  {
    icon: Database,
    title: "ERP / 사내 시스템 연동",
    description: "ERP, 웹메일, 웹하드, DB, 내부 프로그램을 업무 흐름에 맞춰 연결합니다.",
    items: ["기존 시스템 유지", "데이터 자동 수집", "ERP 반영 자동화"],
    example: "예: 웹하드 파일 감시 후 ERP 처리 상태 반영",
  },
  {
    icon: Workflow,
    title: "업무 자동화",
    description: "반복 입력, 확인, 분류, 알림, 승인 요청처럼 손이 많이 가는 일을 자동 처리합니다.",
    items: ["담당자별 규칙", "승인/알림 흐름", "누락 업무 체크"],
    example: "예: 담당자별 미처리 항목 자동 알림",
  },
  {
    icon: FileText,
    title: "문서 자동화",
    description: "보고서, 대장, 점검표, 견적서를 기존 양식에 맞춰 자동 생성합니다.",
    items: ["기존 양식 유지", "사진/데이터 삽입", "문서 이력 관리"],
    example: "예: 현장 사진 기반 안전지도 보고서 생성",
  },
  {
    icon: Gauge,
    title: "대시보드 / 운영 관리",
    description: "처리 현황, 누락, 일정, 재고, 보고서 상태를 한 화면에서 확인합니다.",
    items: ["현황 시각화", "월간 리포트", "관리자 화면"],
    example: "예: 월별 누락 건수와 처리 현황 집계",
  },
];

export const useCases = [
  {
    title: "건설 안전지도 자동화",
    description: "현장 정보, 사진, 점검 항목을 보고서와 안전보건 대장으로 연결합니다.",
    tag: "Construction",
    flow: ["현장 사진", "점검표", "AI 정리", "보고서", "대장 반영"],
  },
  {
    title: "ERP / 보고서 자동화",
    description: "메일과 웹하드 자료를 수집해 보고서를 만들고 ERP에 반영합니다.",
    tag: "ERP",
    flow: ["메일", "웹하드", "보고서", "ERP 반영"],
  },
  {
    title: "제조 재고 관리",
    description: "입출고 데이터, 재고 기준, 부족 알림, 관리자 대시보드를 구축합니다.",
    tag: "Manufacturing",
    flow: ["입출고", "재고 기준", "부족 알림", "대시보드"],
  },
];

export const mvpTargets = [
  "안전지도 보고서 자동 생성",
  "안전보건 대장 자동 업데이트",
  "메일 첨부파일 자동 분류",
  "웹하드 자료 정리",
  "양식 기반 보고서 자동 생성",
  "재고 부족 알림",
  "관리자 대시보드 프로토타입",
];

export const workProcess = [
  "업무 후보 선정",
  "샘플 데이터 확인",
  "자동화 흐름 설계",
  "MVP 구현",
  "실제 업무 검증",
  "본 구현 범위 결정",
];

export const companyCapabilities = [
  {
    icon: Building2,
    title: "현장 기반 분석",
    text: "실제 화면과 문서 양식을 보고 자동화 후보를 찾습니다.",
    example: "방문 진단, 업무 화면 확인",
  },
  {
    icon: MonitorCog,
    title: "기존 시스템 연동",
    text: "ERP, 웹메일, 웹하드, DB를 필요한 범위만 연결합니다.",
    example: "파일 감시, API, DB 연동",
  },
  {
    icon: FileText,
    title: "문서 자동화",
    text: "보고서, 대장, 점검표를 기존 양식에 맞춰 자동 생성합니다.",
    example: "양식 채움, 사진 삽입",
  },
  {
    icon: BarChart3,
    title: "운영 대시보드",
    text: "관리자가 처리 현황과 누락 항목을 바로 확인하게 합니다.",
    example: "처리율, 누락 건수, 월별 집계",
  },
  {
    icon: Boxes,
    title: "제조 / 재고 관리",
    text: "입출고, 부족 알림, 품목별 현황을 자동화합니다.",
    example: "재고 기준, 부족 알림",
  },
  {
    icon: ShieldCheck,
    title: "건설 안전 업무 이해",
    text: "안전지도, 안전보건 대장, 현장 이력을 업무 흐름으로 봅니다.",
    example: "현장 사진, 점검 항목",
  },
];

export function V3Shell({ children }: { children: ReactNode }) {
  return (
    <div className="v3-page">
      <V3Header />
      {children}
      <V3Footer />
    </div>
  );
}

function V3Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <header className={`v3-header ${scrolled ? "is-scrolled" : ""}`}>
      <Link className="v3-brand" href="/v3" onClick={() => setOpen(false)}>
        <span className="v3-brand-mark" />
        <span>대한산업AI</span>
      </Link>
      <button
        className="v3-menu-button"
        type="button"
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`v3-nav ${open ? "is-open" : ""}`}>
        <div className="v3-nav-links">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                className={active ? "is-active" : ""}
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <Link
          className={`v3-nav-cta ${pathname === "/v3/contact" ? "is-active" : ""}`}
          href="/v3/contact"
          onClick={() => setOpen(false)}
        >
          문의하기
        </Link>
      </nav>
    </header>
  );
}

export function V3Footer() {
  return (
    <footer className="v3-footer">
      <div>
        <strong>대한산업AI 주식회사</strong>
        <span>AI Automation for Industrial Operations</span>
      </div>
      <nav aria-label="푸터 메뉴">
        <Link href="/v3/products">제품</Link>
        <Link href="/v3/company">회사소개</Link>
        <Link href="/v3/mvp">MVP</Link>
        <Link href="/v3/contact">문의하기</Link>
      </nav>
      <div>
        <span>법인 정보 업데이트 예정</span>
        <span>방문 진단 및 원격 상담 가능</span>
        <span>contact@koreaindustry.ai</span>
      </div>
    </footer>
  );
}

export function V3Hero({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  visual = "ops",
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  visual?: HeroVisualKind;
}) {
  const isHome = visual === "ops";

  return (
    <section className={`v3-hero v3-hero-${visual} ${isHome ? "is-home" : "is-subpage"}`}>
      <div className="v3-hero-bg" aria-hidden="true" />
      <div className="v3-hero-inner">
        <div className="v3-hero-copy">
          <p className="v3-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="v3-hero-actions">
            <Link className="v3-button v3-button-primary" href={primary.href}>
              {primary.label}
              <ArrowRight size={18} />
            </Link>
            {secondary ? (
              <Link className="v3-button v3-button-secondary" href={secondary.href}>
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
        <V3HeroVisual kind={visual} />
      </div>
    </section>
  );
}

function V3HeroVisual({ kind }: { kind: HeroVisualKind }) {
  return (
    <div className={`v3-visual v3-visual-${kind}`} aria-label="페이지별 자동화 도식">
      <div className="v3-window-top">
        <span />
        <span />
        <span />
        <strong>DAEHAN AI SYSTEM</strong>
      </div>
      {kind === "ops" ? <OpsVisual /> : null}
      {kind === "architecture" ? <ArchitectureVisual /> : null}
      {kind === "company" ? <CompanyVisual /> : null}
      {kind === "mvp" ? <MvpVisual /> : null}
      {kind === "contact" ? <ContactVisual /> : null}
    </div>
  );
}

function OpsVisual() {
  const inputs = ["ERP", "메일", "웹하드", "엑셀"];
  const outputs = ["보고서", "대장", "대시보드", "알림"];

  return (
    <>
      <div className="v3-hero-map">
        <div className="v3-map-column">
          <small>Input</small>
          {inputs.map((item) => (
            <strong key={item}>{item}</strong>
          ))}
        </div>
        <div className="v3-map-core">
          <Layers3 size={24} />
          <strong>AI 자동화 레이어</strong>
          <span>업무 규칙 분석 · 문서 생성 · 시스템 반영</span>
        </div>
        <div className="v3-map-column is-output">
          <small>Output</small>
          {outputs.map((item) => (
            <strong key={item}>{item}</strong>
          ))}
        </div>
      </div>
      <div className="v3-visual-metrics">
        <div>
          <small>반복 업무 후보</small>
          <strong>12개</strong>
        </div>
        <div>
          <small>자동 처리 예시</small>
          <strong>87건</strong>
        </div>
        <div>
          <small>누락 체크</small>
          <strong>실시간</strong>
        </div>
      </div>
    </>
  );
}

function ArchitectureVisual() {
  const modules = ["ERP 연동", "문서 생성", "대시보드", "알림 / 승인"];

  return (
    <>
      <div className="v3-module-stack">
        <div className="v3-stack-rail">
          <span>데이터 수집</span>
          <span>업무 규칙</span>
          <span>자동 산출</span>
        </div>
        <div className="v3-module-grid">
          {modules.map((module) => (
            <strong key={module}>{module}</strong>
          ))}
        </div>
      </div>
      <div className="v3-visual-note">
        <Database size={18} />
        기존 시스템을 유지한 채 필요한 자동화만 붙입니다.
      </div>
    </>
  );
}

function CompanyVisual() {
  const steps = ["방문 진단", "업무 분석", "연동 설계", "구현"];

  return (
    <>
      <ol className="v3-visual-timeline">
        {steps.map((step, index) => (
          <li key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
            <small>{index === 0 ? "화면·문서 확인" : index === 1 ? "반복 업무 추출" : index === 2 ? "권한·데이터 설계" : "MVP 또는 본 구현"}</small>
          </li>
        ))}
      </ol>
      <div className="v3-visual-note">
        <Building2 size={18} />
        법인 고객의 실제 업무 흐름을 기준으로 설계합니다.
      </div>
    </>
  );
}

function MvpVisual() {
  const stages = [
    { label: "후보 업무", value: "1개" },
    { label: "데모 구현", value: "MVP" },
    { label: "효과 검증", value: "본 구현" },
  ];

  return (
    <>
      <div className="v3-funnel">
        {stages.map((stage) => (
          <div key={stage.label}>
            <span>{stage.label}</span>
            <strong>{stage.value}</strong>
          </div>
        ))}
      </div>
      <div className="v3-visual-note">
        <ClipboardCheck size={18} />
        작게 검증하고 효과가 보이면 확장합니다.
      </div>
    </>
  );
}

function ContactVisual() {
  return (
    <>
      <div className="v3-mini-form">
        <span>회사명</span>
        <strong>건설 안전 / 제조</strong>
        <span>자동화 후보</span>
        <strong>보고서 · ERP · 재고</strong>
        <span>상담 방식</span>
        <strong>방문 또는 원격</strong>
      </div>
      <div className="v3-visual-note">
        <Mail size={18} />
        문의 내용을 기준으로 가능 범위를 먼저 검토합니다.
      </div>
    </>
  );
}

export function V3SectionHeading({
  eyebrow,
  title,
  description,
  split = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  split?: boolean;
}) {
  return (
    <div className={`v3-section-heading ${split ? "is-split" : ""}`}>
      <div>
        <p className="v3-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function V3TrustStrip() {
  return (
    <section className="v3-trust-strip" aria-label="초기 적용 산업 영역">
      <span>우선 적용 영역</span>
      <strong>건설 안전 / 감리</strong>
      <strong>제조 / 재고 관리</strong>
      <strong>ERP / 문서 자동화</strong>
      <strong>방문 진단 가능</strong>
    </section>
  );
}

export function V3AutomationDiagram() {
  const inputs = ["ERP", "웹메일", "웹하드", "엑셀", "현장 사진", "기존 문서"];
  const outputs = ["보고서", "안전보건 대장", "대시보드", "ERP 반영", "재고 알림", "승인 요청"];

  return (
    <div className="v3-architecture-board">
      <div className="v3-arch-group">
        <span>입력</span>
        {inputs.map((item) => (
          <strong key={item}>{item}</strong>
        ))}
      </div>
      <div className="v3-arch-core">
        <Layers3 size={28} />
        <strong>대한산업AI</strong>
        <span>업무 규칙 분석 · AI 문서 생성 · 시스템 연동</span>
      </div>
      <div className="v3-arch-group is-output">
        <span>출력</span>
        {outputs.map((item) => (
          <strong key={item}>{item}</strong>
        ))}
      </div>
    </div>
  );
}

export function V3ProductGrid() {
  return (
    <div className="v3-product-grid">
      {productModules.map((product) => {
        const Icon = product.icon;
        return (
          <article className="v3-product-card" key={product.title}>
            <Icon size={24} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <ul>
              {product.items.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} />
                  {item}
                </li>
              ))}
            </ul>
            <span className="v3-card-example">{product.example}</span>
          </article>
        );
      })}
    </div>
  );
}

export function V3UseCasePreview() {
  return (
    <div className="v3-usecase-grid">
      {useCases.map((item, index) => (
        <article className={`v3-usecase-card ${index === 0 ? "is-featured" : ""}`} key={item.title}>
          <span>{item.tag}</span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="v3-usecase-flow">
            {item.flow.map((step) => (
              <strong key={step}>{step}</strong>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}

export function V3MvpTargets() {
  return (
    <div className="v3-target-grid">
      {mvpTargets.map((target) => (
        <span key={target}>
          <Sparkles size={16} />
          {target}
        </span>
      ))}
    </div>
  );
}

export function V3Process({ steps = workProcess }: { steps?: string[] }) {
  return (
    <ol className="v3-process-list">
      {steps.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}

export function V3ContactForm({ mvp = false }: { mvp?: boolean }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="v3-contact-form"
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
          <option>건설 안전 / 감리</option>
          <option>제조</option>
          <option>기타 기업 업무</option>
        </select>
      </label>
      <label>
        관심 영역
        <select name="interest" defaultValue={mvp ? "MVP 자동화 검토" : ""} required>
          <option value="" disabled>
            선택해주세요
          </option>
          <option>MVP 자동화 검토</option>
          <option>건설 안전지도 자동화</option>
          <option>안전보건 대장 자동화</option>
          <option>ERP / 사내 시스템 연동</option>
          <option>문서 / 보고서 자동화</option>
          <option>제조 / 재고 관리</option>
          <option>기타 업무 자동화</option>
        </select>
      </label>
      <label>
        현재 사용하는 시스템
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
      <label>
        MVP 희망 여부
        <select name="mvp" defaultValue={mvp ? "희망" : ""}>
          <option value="">선택해주세요</option>
          <option>희망</option>
          <option>미정</option>
          <option>본 구현 검토</option>
        </select>
      </label>
      <label>
        방문 상담 희망 여부
        <select name="visit" defaultValue="">
          <option value="">선택해주세요</option>
          <option>희망</option>
          <option>원격 미팅 희망</option>
          <option>추후 결정</option>
        </select>
      </label>
      <button className="v3-button v3-button-primary is-wide" type="submit">
        <Send size={17} />
        문의 접수하기
      </button>
      <p className={`v3-form-note ${submitted ? "is-success" : ""}`}>
        {submitted
          ? "문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다."
          : "입력하신 내용은 자동화 가능 범위 검토에 사용됩니다."}
      </p>
    </form>
  );
}

export function V3CtaBand({
  title,
  description,
  href = "/v3/contact",
  label = "문의하기",
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="v3-cta-band">
      <div>
        <p className="v3-eyebrow">Next Step</p>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <Link className="v3-button v3-button-primary" href={href}>
        {label}
        <ArrowRight size={18} />
      </Link>
    </section>
  );
}

export function V3CapabilityGrid() {
  return (
    <div className="v3-capability-grid">
      {companyCapabilities.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title}>
            <Icon size={22} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <span className="v3-card-example">{item.example}</span>
          </article>
        );
      })}
    </div>
  );
}
