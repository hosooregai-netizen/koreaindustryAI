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
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useState } from "react";

type NavChild = {
  label: string;
  href?: string;
  description: string;
  modal?: true;
};

type NavGroup = {
  label: string;
  href?: string;
  children: NavChild[];
};

type HeroVisualKind = "home" | "products" | "company" | "contact" | "community";

const mobileDropdownStyle: CSSProperties = {
  position: "static",
  width: "100%",
  opacity: 1,
  pointerEvents: "auto",
  transform: "none",
  visibility: "visible",
  boxShadow: "none",
};

export const navItems: NavGroup[] = [
  {
    label: "Products",
    href: "/v3/products",
    children: [
      {
        label: "AI-Core",
        href: "/v3/products/ai-core",
        description: "3000개 위젯을 조립해 ERP형 업무 시스템을 5일 안에 시현",
      },
    ],
  },
  {
    label: "Community",
    children: [
      {
        label: "Newsletter",
        href: "/v3/community/newsletter",
        description: "블로그와 스레드 인사이트를 한 번에 받아보기",
      },
      {
        label: "Blog",
        href: "/v3/community/blog",
        description: "AI-Core, 업무 자동화, 산업별 적용 사례 글",
      },
      {
        label: "Threads",
        href: "/v3/community/threads",
        description: "짧은 실무 메모와 제품 제작 기록",
      },
      {
        label: "YouTube",
        description: "제품 데모 영상은 준비 중입니다",
        modal: true,
      },
    ],
  },
  {
    label: "Company",
    href: "/v3/company",
    children: [
      {
        label: "회사 소개",
        href: "/v3/company",
        description: "슬로건, 목표, 5일 도입 방식",
      },
      {
        label: "고객 문의",
        href: "/v3/contact",
        description: "자주 묻는 질문과 문의하기 폼",
      },
    ],
  },
];

export const industryWordmarks = [
  {
    industry: "제조",
    name: "볼넛",
    note: "생산, 재고, 견적 업무 자동화",
  },
  {
    industry: "금융",
    name: "K-Finance",
    note: "심사, 문서, 리포트 흐름 검토",
  },
  {
    industry: "건설",
    name: "한국종합안전 ANC",
    note: "안전 문서와 현장 기록 자동화",
  },
  {
    industry: "물류 유통",
    name: "마켓컬리",
    note: "입출고, 검수, 운영 데이터 정리",
  },
];

export const productGroups = [
  {
    icon: Layers3,
    title: "AI-Core",
    href: "/v3/products/ai-core",
    description:
      "ERP, 문서, 승인, 대시보드에 필요한 모듈을 레고처럼 조립해 고객 맞춤 업무 시스템을 빠르게 시현합니다.",
    points: ["3000개 위젯", "ERP 모듈 조립", "5일 시현"],
  },
];

export const aiCoreFeatures = [
  {
    icon: Boxes,
    title: "3000개 위젯 기반",
    text: "입력 폼, 카드, 표, 승인, 리포트, 대시보드 같은 업무 단위를 모듈화해 빠르게 조합합니다.",
    example: "폼 / 카드 / 테이블 / 알림 / 승인 / 리포트",
  },
  {
    icon: Database,
    title: "ERP처럼 구성 가능",
    text: "고객사의 기존 업무 흐름에 맞춰 필요한 화면과 데이터 구조를 ERP처럼 묶습니다.",
    example: "고객, 현장, 문서, 재고, 결재, 운영 로그",
  },
  {
    icon: ClipboardCheck,
    title: "핵심 아이템 선정",
    text: "처음부터 전체 시스템을 만들지 않고 5일 안에 효과를 확인할 수 있는 업무 하나를 먼저 고릅니다.",
    example: "현장 보고서 / 견적 검토 / 문서 정리",
  },
  {
    icon: Workflow,
    title: "고객 맞춤 SI",
    text: "산업별 언어, 문서 양식, 승인 기준, 담당자 역할에 맞춰 AI-Core를 조립합니다.",
    example: "제조 / 금융 / 건설 / 물류 유통",
  },
];

export const toolModules = [
  {
    icon: ClipboardCheck,
    title: "전자서명 / TBM 서명",
    text: "현장 참여자 서명, TBM 확인, 참석 기록을 AI-Core 안에 붙일 수 있는 모듈로 보여줍니다.",
  },
  {
    icon: FileText,
    title: "사진대지",
    text: "사진 업로드, 현장명, 날짜, 설명을 정리해 보고서형 결과물로 조립합니다.",
  },
  {
    icon: Sparkles,
    title: "문서 정리",
    text: "회의록, 점검표, 견적서, 안전 문서를 지정한 양식에 맞춰 정리합니다.",
  },
  {
    icon: BarChart3,
    title: "데이터 변환",
    text: "엑셀, CSV, 복사한 데이터를 업무 화면이나 리포트에 넣기 좋은 형태로 바꿉니다.",
  },
];

export const blogPosts = [
  {
    category: "AI-Core",
    title: "3000개 위젯을 조립해 5일 안에 업무 시스템을 시현하는 방식",
    excerpt: "모든 기능을 새로 개발하기보다 검증된 화면 단위와 데이터 흐름을 조합해 첫 시연 속도를 높입니다.",
    date: "2026.05.26",
  },
  {
    category: "산업 적용",
    title: "건설 안전 문서 자동화를 AI-Core로 접근하는 방법",
    excerpt: "현장 사진, 점검 기록, 서명, 보고서를 하나의 흐름으로 묶어 담당자의 반복 입력을 줄입니다.",
    date: "2026.05.24",
  },
  {
    category: "제품 기록",
    title: "범 산업 Tool은 무료 공개 기능이 아니라 조립 가능한 쇼케이스 모듈입니다",
    excerpt: "전자서명, 사진대지, 문서 정리 같은 작은 도구를 고객 맞춤 시스템에 붙는 모듈로 설명합니다.",
    date: "2026.05.22",
  },
];

export const threadPosts = [
  {
    title: "5일 도입의 핵심은 완성품이 아니라 실제 시현입니다",
    text: "고객이 매일 보는 화면, 문서, 승인 기준 중 하나를 고르고 AI-Core 모듈로 작동 흐름을 먼저 보여줍니다.",
    tag: "5일 시현",
  },
  {
    title: "툴을 랜딩에서 바로 쓰게 하는 것보다 쇼케이스로 보여주는 편이 더 선명합니다",
    text: "사이트의 목표가 온보딩이라면 '이런 모듈을 조립할 수 있습니다'라는 메시지가 더 잘 맞습니다.",
    tag: "Tool CTA",
  },
  {
    title: "산업별 로고는 v1에서 워드마크 카드로 시작합니다",
    text: "제조, 금융, 건설, 물류 유통을 한 화면에서 보여주되 공식 로고 자산은 추후 교체합니다.",
    tag: "Industry",
  },
];

export const faqItems = [
  {
    question: "5일 만에 실제 시스템을 완성하나요?",
    answer:
      "전체 시스템을 완제품으로 끝낸다는 뜻은 아닙니다. 핵심 업무 하나를 고르고 AI-Core 모듈을 조립해 실제 작동 흐름을 시현합니다.",
  },
  {
    question: "기존 ERP나 사내 시스템을 교체해야 하나요?",
    answer:
      "아닙니다. 기존 시스템은 유지하고, 필요한 화면과 데이터 흐름을 AI-Core로 먼저 시현한 뒤 연동 범위를 정합니다.",
  },
  {
    question: "전자서명이나 사진대지 같은 툴을 바로 사용할 수 있나요?",
    answer:
      "이번 사이트에서는 무료 공개 툴이 아니라 조립 가능한 모듈 쇼케이스로 소개합니다. 실제 사용은 도입 문의 후 업무에 맞춰 구성합니다.",
  },
  {
    question: "어떤 산업부터 적용할 수 있나요?",
    answer:
      "제조, 금융, 건설, 물류 유통처럼 문서, 승인, 리포트, 운영 데이터가 반복되는 산업부터 적용하기 좋습니다.",
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
  const [modal, setModal] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className={`v3-header ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
        <Link className="v3-brand" href="/v3" onClick={closeMenu}>
          <span className="v3-brand-mark" aria-hidden="true">
            <span />
          </span>
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
        <nav className={`v3-nav ${open ? "is-open" : ""}`} aria-label="주요 메뉴">
          <div className="v3-nav-links">
            {navItems.map((group) => {
              const active =
                (group.href && (pathname === group.href || pathname.startsWith(`${group.href}/`))) ||
                group.children.some((child) => child.href && pathname.startsWith(child.href));

              return (
                <div className={`v3-nav-group ${active ? "is-active" : ""}`} key={group.label}>
                  {group.href ? (
                    <Link href={group.href} onClick={closeMenu}>
                      {group.label}
                    </Link>
                  ) : (
                    <button type="button">{group.label}</button>
                  )}
                  <div className="v3-dropdown" role="menu" style={open ? mobileDropdownStyle : undefined}>
                    {group.children.map((child) =>
                      child.modal ? (
                        <button
                          key={child.label}
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            closeMenu();
                            setModal(child.label);
                          }}
                        >
                          <strong>{child.label}</strong>
                          <span>{child.description}</span>
                        </button>
                      ) : (
                        <Link key={child.label} href={child.href ?? "/v3"} role="menuitem" onClick={closeMenu}>
                          <strong>{child.label}</strong>
                          <span>{child.description}</span>
                        </Link>
                      ),
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="v3-nav-cta"
            type="button"
            onClick={() => {
              closeMenu();
              setModal("시작하기");
            }}
          >
            시작하기
          </button>
        </nav>
      </header>
      <V3ComingSoonModal
        open={modal !== null}
        title={modal === "YouTube" ? "YouTube 콘텐츠를 준비하고 있어요" : "MVP 시작하기 페이지를 준비하고 있어요"}
        description={
          modal === "YouTube"
            ? "AI-Core 제작 과정과 제품 데모 영상은 곧 공개할 예정입니다."
            : "MVP 페이지는 AI-Core 빌더와 툴 모듈 구성이 정리되면 연결합니다. 지금은 5일 도입 문의로 바로 상담할 수 있습니다."
        }
        onClose={() => setModal(null)}
      />
    </>
  );
}

export function V3ComingSoonModal({
  open,
  title,
  description,
  onClose,
}: {
  open: boolean;
  title: string;
  description: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="v3-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="v3-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="v3-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="v3-modal-close" type="button" aria-label="모달 닫기" onClick={onClose}>
          <X size={18} />
        </button>
        <p className="v3-eyebrow">Coming Soon</p>
        <h2 id="v3-modal-title">{title}</h2>
        <p>{description}</p>
        <Link className="v3-button v3-button-primary" href="/v3/contact" onClick={onClose}>
          5일 도입 문의하기
          <ArrowRight size={18} />
        </Link>
      </section>
    </div>
  );
}

export function V3Footer() {
  return (
    <footer className="v3-footer">
      <div className="v3-footer-brand">
        <span className="v3-brand-mark" aria-hidden="true">
          <span />
        </span>
        <strong>대한산업AI 주식회사</strong>
        <p>AI-Core for Industrial Operations</p>
      </div>
      <nav aria-label="푸터 메뉴">
        <Link href="/v3/products">Products</Link>
        <Link href="/v3/community/newsletter">Community</Link>
        <Link href="/v3/company">Company</Link>
        <Link href="/v3/contact">고객 문의</Link>
      </nav>
      <div className="v3-footer-info">
        <span>AI-Core 기반 업무 시스템 조립</span>
        <span>5일 시현 및 도입 범위 검토</span>
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
  visual = "products",
  video = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  visual?: HeroVisualKind;
  video?: boolean;
}) {
  const isHome = visual === "home";
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <section
      className={`v3-hero v3-hero-${visual} ${isHome ? "is-home" : "is-subpage"} ${
        videoReady ? "has-video" : "has-image-fallback"
      }`}
      data-video-state={videoReady ? "loaded" : "image-fallback"}
    >
      {video ? (
        <video
          className="v3-hero-video"
          aria-hidden="true"
          autoPlay
          muted
          loop
          playsInline
          poster="/v3/industrial-ai-hero.png"
          onCanPlay={() => setVideoReady(true)}
          onError={() => {
            setVideoFailed(true);
            setVideoReady(false);
          }}
        >
          {!videoFailed ? <source src="/v3/hero-video.mp4" type="video/mp4" /> : null}
        </video>
      ) : null}
      <div className="v3-hero-overlay" aria-hidden="true" />
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
          {isHome ? (
            <div className="v3-hero-progress" aria-label="대표 메시지 진행 상태">
              <span>01</span>
              <strong />
              <span>02</span>
            </div>
          ) : null}
        </div>
        {isHome ? null : <V3HeroVisual kind={visual} />}
      </div>
    </section>
  );
}

function V3HeroVisual({ kind }: { kind: Exclude<HeroVisualKind, "home"> }) {
  const visualTitle =
    kind === "products"
      ? "AI-Core 구조"
      : kind === "company"
        ? "5일 도입"
        : kind === "community"
          ? "콘텐츠 피드"
          : "문의 흐름";

  const visualItems =
    kind === "products"
      ? ["Widget", "ERP", "AI", "Dashboard"]
      : kind === "company"
        ? ["진단", "조립", "시현", "확장"]
        : kind === "community"
          ? ["Newsletter", "Blog", "Threads", "YouTube"]
          : ["회사 정보", "업무 문제", "희망 일정", "상담 요청"];

  return (
    <div className={`v3-hero-visual v3-visual-${kind}`} aria-label={`${visualTitle} 시각화`}>
      <div className="v3-visual-top">
        <span />
        <span />
        <span />
        <strong>{visualTitle}</strong>
      </div>
      <div className="v3-visual-body">
        <div className="v3-visual-sidebar">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="v3-visual-main">
          <div className="v3-visual-title-row">
            <strong>AI-Core Console</strong>
            <small>Preview</small>
          </div>
          <div className="v3-visual-flow">
            {visualItems.map((item, index) => (
              <span key={item} className={index % 2 === 0 ? "is-strong" : ""}>
                {item}
              </span>
            ))}
          </div>
          <div className="v3-visual-chart">
            {["모듈", "조립", "시현"].map((item) => (
              <i key={item}>
                <span>{item}</span>
              </i>
            ))}
          </div>
        </div>
      </div>
    </div>
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

export function V3IndustryWordmarks() {
  return (
    <section className="v3-section v3-industry-section" aria-label="산업별 워드마크 신뢰 영역">
      <V3SectionHeading
        eyebrow="Industry"
        title="제조, 금융, 건설, 물류 유통까지 같은 AI-Core로 다르게 조립합니다."
        description="공식 로고 자산이 없는 v1에서는 실명 워드마크 카드로 산업 적용 범위를 먼저 보여줍니다."
        split
      />
      <div className="v3-industry-wordmarks">
        {industryWordmarks.map((item) => (
          <article key={item.name}>
            <span>{item.industry}</span>
            <strong>{item.name}</strong>
            <p>{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function V3TrustStrip() {
  return (
    <section className="v3-trust-strip" aria-label="신뢰 워드마크">
      <span>Industry Wordmarks</span>
      <div>
        {industryWordmarks.map((item) => (
          <strong key={item.name}>{item.name}</strong>
        ))}
      </div>
    </section>
  );
}

export function V3AiCoreShowcase() {
  return (
    <div className="v3-ai-core-panel">
      <div className="v3-ai-core-copy">
        <span>AI-Core</span>
        <h3>3000개 위젯을 조립해 고객 맞춤 ERP형 시스템을 빠르게 시현합니다.</h3>
        <p>
          AI-Core는 단일 SaaS가 아니라 업무 화면, 데이터, 승인, 리포트, 대시보드 모듈을 조합하는 시작
          방식입니다. 핵심 아이템을 먼저 고르고 5일 안에 눈으로 확인할 수 있는 흐름을 만듭니다.
        </p>
        <Link className="v3-text-link" href="/v3/products/ai-core">
          AI-Core 자세히 보기
          <ArrowRight size={17} />
        </Link>
      </div>
      <div className="v3-ai-core-stats" aria-label="AI-Core 핵심 수치">
        <strong>3000</strong>
        <span>Widget Library</span>
        <small>ERP 모듈, 문서, 승인, 리포트, 대시보드를 조립 가능한 단위로 구성합니다.</small>
      </div>
    </div>
  );
}

export function V3ProductCards() {
  return (
    <div className="v3-product-grid">
      {productGroups.map((product) => {
        const Icon = product.icon;
        return (
          <article className="v3-product-card" key={product.title}>
            <Icon size={24} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <ul>
              {product.points.map((item) => (
                <li key={item}>
                  <CheckCircle2 size={15} />
                  {item}
                </li>
              ))}
            </ul>
            <Link className="v3-text-link" href={product.href}>
              자세히 보기
              <ArrowRight size={16} />
            </Link>
          </article>
        );
      })}
    </div>
  );
}

export function V3ToolCta() {
  return (
    <section className="v3-section v3-tool-cta">
      <div>
        <p className="v3-eyebrow">Cross-Industry Tools</p>
        <h2>범 산업 툴은 무료 공개 기능이 아니라 AI-Core에 붙는 쇼케이스 모듈입니다.</h2>
        <p>
          전자서명, TBM 서명, 사진대지, 문서 정리, 데이터 변환은 각각 작은 툴처럼 보이지만 실제 목표는
          고객사의 업무 시스템에 빠르게 조립 가능한 모듈을 보여주는 것입니다.
        </p>
        <Link className="v3-button v3-button-primary" href="/v3/contact">
          툴 모듈 도입 문의
          <ArrowRight size={18} />
        </Link>
      </div>
      <div className="v3-tool-grid">
        {toolModules.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title}>
              <Icon size={22} />
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function V3DetailFeatureGrid({
  items,
}: {
  items: Array<{ icon?: LucideIcon; title: string; text: string; example?: string }>;
}) {
  return (
    <div className="v3-capability-grid">
      {items.map((item) => {
        const Icon = item.icon ?? Sparkles;
        return (
          <article key={item.title}>
            <Icon size={22} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.example ? <span className="v3-card-example">{item.example}</span> : null}
          </article>
        );
      })}
    </div>
  );
}

export function V3Process({ steps }: { steps: string[] }) {
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

export function V3CtaBand({
  title,
  description,
  href = "/v3/contact",
  label = "5일 도입 문의하기",
}: {
  title: string;
  description: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="v3-cta-band">
      <div>
        <p className="v3-eyebrow">5-Day Demo</p>
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

export function V3NewsletterForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="v3-newsletter-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <label>
        이메일
        <input name="email" type="email" placeholder="name@company.com" required />
      </label>
      <label>
        관심 주제
        <select name="topic" defaultValue="">
          <option value="" disabled>
            선택해주세요
          </option>
          <option>AI-Core</option>
          <option>5일 시현</option>
          <option>산업별 적용</option>
          <option>Tool 모듈</option>
        </select>
      </label>
      <button className="v3-button v3-button-primary" type="submit">
        연락받기
        <Mail size={17} />
      </button>
      <p className={`v3-form-note ${submitted ? "is-success" : ""}`}>
        {submitted ? "뉴스레터 신청이 접수되었습니다." : "블로그와 스레드 업데이트를 정리해 보내드립니다."}
      </p>
    </form>
  );
}

export function V3ContactForm() {
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
        <input name="company" placeholder="대한산업AI 도입 검토 기업" required />
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
        관심 영역
        <select name="interest" defaultValue="" required>
          <option value="" disabled>
            선택해주세요
          </option>
          <option>AI-Core</option>
          <option>5일 시현</option>
          <option>Tool 모듈</option>
          <option>산업별 적용</option>
        </select>
      </label>
      <label className="is-wide">
        시현해보고 싶은 업무
        <textarea
          name="message"
          rows={5}
          placeholder="예: 현장 사진과 서명 기록을 기반으로 안전 보고서를 자동 작성하고 싶습니다."
        />
      </label>
      <button className="v3-button v3-button-primary is-wide" type="submit">
        <Send size={17} />
        문의 접수하기
      </button>
      <p className={`v3-form-note ${submitted ? "is-success" : ""}`}>
        {submitted ? "문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다." : "입력하신 내용은 5일 시현 범위 검토에 사용합니다."}
      </p>
    </form>
  );
}

export function V3BlogList() {
  return (
    <div className="v3-resource-list">
      {blogPosts.map((post) => (
        <article key={post.title}>
          <span>{post.category}</span>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <small>{post.date}</small>
        </article>
      ))}
    </div>
  );
}

export function V3ThreadList() {
  return (
    <div className="v3-thread-list">
      {threadPosts.map((post) => (
        <article key={post.title}>
          <span>{post.tag}</span>
          <h3>{post.title}</h3>
          <p>{post.text}</p>
        </article>
      ))}
    </div>
  );
}

export function V3FaqList() {
  return (
    <div className="v3-faq-list">
      {faqItems.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function V3AutomationDiagram() {
  const inputs = ["ERP", "문서", "엑셀", "현장 사진", "서명", "운영 로그"];
  const outputs = ["업무 화면", "보고서", "대시보드", "승인 요청", "알림", "연동 범위"];

  return (
    <div className="v3-architecture-board">
      <div className="v3-arch-group">
        <span>01 Input</span>
        {inputs.map((item) => (
          <strong key={item}>{item}</strong>
        ))}
      </div>
      <div className="v3-arch-connector is-left" aria-hidden="true">
        <span />
      </div>
      <div className="v3-arch-core">
        <small>02 Assemble</small>
        <Layers3 size={30} />
        <strong>AI-Core</strong>
        <span>위젯 선택 / ERP형 데이터 구조 / AI 처리 / 승인 흐름 / 대시보드 조립</span>
      </div>
      <div className="v3-arch-connector is-right" aria-hidden="true">
        <span />
      </div>
      <div className="v3-arch-group is-output">
        <span>03 Demo</span>
        {outputs.map((item) => (
          <strong key={item}>{item}</strong>
        ))}
      </div>
    </div>
  );
}

export const v3Icons = {
  BarChart3,
  Building2,
  ClipboardCheck,
  Database,
  FileText,
  Gauge,
  MonitorCog,
  ShieldCheck,
  Workflow,
};
