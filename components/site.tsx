"use client";

import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Database,
  FileText,
  Gauge,
  Layers3,
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
import type { CSSProperties, ReactNode, SyntheticEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  communityArticles,
  communitySectionMeta,
  getCommunityArticles,
  type CommunityArticle,
} from "@/lib/community-content";

type NavChild = {
  label: string;
  href: string;
  description: string;
};

type NavGroup = {
  label: string;
  href?: string;
  summary: string;
  imageSrc?: string;
  imageAlt?: string;
  children: NavChild[];
};

type HeroVisualKind = "home" | "products" | "company" | "contact" | "community";
type WhatsNewTag = "Blog" | "Newsletter" | "Technology";
type WhatsNewFilter = "All" | WhatsNewTag;

const heroVideoSources = [
  "/assets/hero-landing-intro.mp4",
  "/assets/hero-landing-reverse.mp4",
];

const heroGroupChangeEventName = "siteHeroGroupChange";

const heroVideoDurations = [13.167, 12.243];
const heroVideoAdvanceLeadSeconds = 0.5;

function useHomeRepeatReveal<TElement extends HTMLElement>() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealObservable, setIsRevealObservable] = useState(false);
  const revealRef = useRef<TElement | null>(null);

  useEffect(() => {
    const element = revealRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    setIsRevealObservable(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRevealed(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { isRevealObservable, isRevealed, revealRef };
}

type HeroVideoLayer = {
  sourceIndex: number;
  src: string;
  version: number;
};

type HeroRetiringFrame = {
  src: string;
  version: number;
};

type HeroCopy = {
  eyebrow?: string;
  title: string;
  description: string;
};

const heroVideoCopyGroups: HeroCopy[] = [
  {
    title: "현장의 데이터로 만드는 AI 시스템",
    description:
      "회사별 문서 양식, 승인 흐름, 운영 데이터를 반영해 실제 업무 방식에 맞는 시스템을 구성합니다.",
  },
  {
    title: "반복 업무를 자동으로 처리하는 AI 시스템",
    description:
      "확인, 분류, 정리, 보고, 결재처럼 매일 반복되는 업무를 AI로 전환합니다.",
  },
];

const createHeroVideoLayers = (): [HeroVideoLayer, HeroVideoLayer] => [
  { sourceIndex: 0, src: heroVideoSources[0] ?? "", version: 0 },
  { sourceIndex: -1, src: "", version: 0 },
];

const getHeroVideoCopyGroup = (sourceIndex: number) => (sourceIndex >= 1 ? 1 : 0);

const heroVideoGroupDurations = heroVideoCopyGroups.map((_, groupIndex) =>
  heroVideoDurations.reduce(
    (total, duration, sourceIndex) => (getHeroVideoCopyGroup(sourceIndex) === groupIndex ? total + duration : total),
    0,
  ),
);

const getHeroVideoGroupProgress = (sourceIndex: number, currentTime: number) => {
  const groupIndex = getHeroVideoCopyGroup(sourceIndex);
  const groupDuration = heroVideoGroupDurations[groupIndex] ?? heroVideoDurations[sourceIndex] ?? 1;
  const currentVideoDuration = heroVideoDurations[sourceIndex] ?? groupDuration;
  const elapsedBeforeCurrentVideo = heroVideoDurations.reduce((total, duration, index) => {
    if (index >= sourceIndex) return total;
    return getHeroVideoCopyGroup(index) === groupIndex ? total + duration : total;
  }, 0);
  const safeCurrentTime = Number.isFinite(currentTime) ? Math.max(0, Math.min(currentTime, currentVideoDuration)) : 0;

  return Math.max(0, Math.min(1, (elapsedBeforeCurrentVideo + safeCurrentTime) / groupDuration));
};

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
    label: "Product",
    summary: "데이터 관리와 업무 자동화를 두 AI-Core 제품으로 정리합니다.",
    children: [
      {
        label: "Data-Driven AI-Core",
        href: "/products/data-driven",
        description: "현장 데이터를 기업 맞춤 ERP 구조로 연결하는 제품",
      },
      {
        label: "Automation AI-Core",
        href: "/products/automation",
        description: "반복 업무를 자동 처리 흐름으로 전환하는 제품",
      },
    ],
  },
  {
    label: "Industries",
    summary: "산업별 업무 흐름에 맞춰 AI-Core 적용 가능성을 정리합니다.",
    children: [
      {
        label: "금융",
        href: "/industries/finance",
        description: "심사, 문서 검토, 리포트 흐름",
      },
      {
        label: "제조",
        href: "/industries/manufacturing",
        description: "생산, 재고, 견적, 보고 업무 흐름",
      },
      {
        label: "물류",
        href: "/industries/logistics",
        description: "입출고, 검수, 운영 데이터 정리 흐름",
      },
      {
        label: "건설",
        href: "/industries/construction",
        description: "현장 문서, 안전 기록, 점검 보고 흐름",
      },
    ],
  },
  {
    label: "Community",
    summary: "Newsletter, Blog, Technology 콘텐츠를 통해 AI-Core 소식을 정리합니다.",
    children: [
      {
        label: "Newsletter",
        href: "/community/newsletter",
        description: "산업 AI 인사이트를 구독하는 진입점",
      },
      {
        label: "Blog",
        href: "/community/blog",
        description: "AI-Core와 업무 자동화 글 준비중",
      },
      {
        label: "Technology",
        href: "/community/technology",
        description: "AI-Core 기술 구성과 자동화 아키텍처 글을 준비 중입니다",
      },
    ],
  },
  {
    label: "Company",
    href: "/contact",
    summary: "AI-Core 도입 상담 문의로 바로 연결합니다.",
    children: [
      {
        label: "문의하기",
        href: "/contact",
        description: "AI-Core 도입 상담 문의 폼",
      },
    ],
  },
];

export const industryWordmarks = [
  {
    industry: "제조",
    name: "제조 운영팀",
    note: "생산, 재고, 견적 흐름 검토",
  },
  {
    industry: "금융",
    name: "금융 심사팀",
    note: "심사, 문서 검토, 리포트 정리",
  },
  {
    industry: "건설",
    name: "건설 안전팀",
    note: "안전 문서와 현장 기록 정리",
  },
  {
    industry: "물류 유통",
    name: "물류 운영팀",
    note: "입출고, 검수, 운영 데이터 정리",
  },
];

export const industryImageCards = [
  {
    name: "금융",
    href: "/industries/finance",
    src: "/assets/industries/finance-card.png",
    alt: "도시 전망의 금융 데이터 운영실",
  },
  {
    name: "제조",
    href: "/industries/manufacturing",
    src: "/assets/industries/manufacturing-card.png",
    alt: "자동화 로봇이 배치된 제조 공정",
  },
  {
    name: "물류",
    href: "/industries/logistics",
    src: "/assets/industries/logistics-card.png",
    alt: "컨베이어와 지게차가 움직이는 물류 창고",
  },
  {
    name: "건설",
    href: "/industries/construction",
    src: "/assets/industries/construction-card.png",
    alt: "건설 현장을 검토하는 작업자",
  },
];

const whatsNewFilters: WhatsNewFilter[] = ["All", "Blog", "Newsletter", "Technology"];
const whatsNewPageSize = 3;
const communityPageSize = 9;

const whatsNewItems = [...communityArticles]
  .sort((current, next) => next.date.localeCompare(current.date))
  .map((article) => ({
    title: article.title,
    tag: article.sectionLabel as WhatsNewTag,
    href: article.href,
    imageSrc: article.imageSrc,
    imageAlt: article.imageAlt,
    date: article.date,
  }));

export const clientLogos = [
  {
    name: "한국종합안전(주)",
    src: "/assets/logos/hts.png",
  },
  {
    name: "(주)볼트앤너트",
    src: "/assets/logos/bolt-nut.png",
  },
  {
    name: "AnC 기술사 사무소",
    src: "/assets/logos/anc.svg",
  },
  {
    name: "금융결제원",
    src: "/assets/logos/kftc.png",
  },
  {
    name: "다우데이타",
    src: "/assets/logos/daou-data.png",
  },
  {
    name: "대신자산운용",
    src: "/assets/logos/daishin.png",
  },
  {
    name: "NH투자증권",
    src: "/assets/logos/nh-investment.png",
  },
  {
    name: "LINE FRIENDS",
    src: "/assets/logos/line-friends.png",
  },
  {
    name: "마켓컬리",
    src: "/assets/logos/market-kurly.png",
  },
];

const newsletterItems = getCommunityArticles("newsletter");
const blogItems = getCommunityArticles("blog");
const technologyItems = getCommunityArticles("technology");

export const aiCoreFeatures = [
  {
    icon: Boxes,
    title: "업무 화면 조립",
    text: "입력 폼, 표, 승인, 리포트, 대시보드 단위를 필요한 흐름에 맞춰 묶습니다.",
    example: "폼 / 표 / 알림 / 승인 / 리포트",
  },
  {
    icon: Database,
    title: "ERP형 데이터 구조",
    text: "기존 업무 흐름을 기준으로 고객, 현장, 문서, 결재 데이터를 한 구조로 정리합니다.",
    example: "고객, 현장, 문서, 재고, 결재, 운영 로그",
  },
  {
    icon: ClipboardCheck,
    title: "핵심 업무 선정",
    text: "처음부터 전체 시스템을 만들기보다 효과가 빨리 보이는 업무 하나를 먼저 고릅니다.",
    example: "현장 보고서 / 견적 검토 / 문서 정리",
  },
  {
    icon: Workflow,
    title: "맞춤 시현",
    text: "산업별 용어, 문서 양식, 승인 기준에 맞춰 실제로 볼 수 있는 흐름을 구성합니다.",
    example: "제조 / 금융 / 건설 / 물류 유통",
  },
];

export const toolModules = [
  {
    icon: ClipboardCheck,
    title: "전자서명 / TBM 서명",
    text: "참여자 서명, TBM 확인, 참석 기록을 하나의 업무 흐름으로 묶습니다.",
  },
  {
    icon: FileText,
    title: "사진대지",
    text: "사진, 현장명, 날짜, 설명을 정리해 보고서 형태로 만듭니다.",
  },
  {
    icon: Sparkles,
    title: "문서 정리",
    text: "회의록, 점검표, 견적서, 안전 문서를 필요한 양식에 맞춥니다.",
  },
  {
    icon: BarChart3,
    title: "데이터 변환",
    text: "엑셀과 CSV 데이터를 업무 화면이나 리포트에 맞게 정리합니다.",
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

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="site-page">
      <SiteHeader />
      {children}
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroTopbarGroup, setHeroTopbarGroup] = useState("0");

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 8);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  const closeMenu = () => setOpen(false);
  const isHomeRoute = pathname === "/";
  const transparentHomeTopbarColor = heroTopbarGroup === "1" ? "#000000" : "#ffffff";
  const transparentHomeTopbarStyle =
    isHomeRoute && !scrolled
      ? ({
          "--site-home-topbar-color": transparentHomeTopbarColor,
          "--site-home-topbar-mark-line": transparentHomeTopbarColor,
          color: transparentHomeTopbarColor,
        } as CSSProperties)
      : undefined;

  useEffect(() => {
    if (!isHomeRoute) {
      setHeroTopbarGroup("0");
      return;
    }

    const updateHeroTopbarGroup = (event?: Event) => {
      const eventGroup = (event as CustomEvent<{ group?: string }> | undefined)?.detail?.group;
      setHeroTopbarGroup(eventGroup ?? document.documentElement.dataset.siteHeroGroup ?? "0");
    };

    updateHeroTopbarGroup();
    window.addEventListener(heroGroupChangeEventName, updateHeroTopbarGroup);
    return () => window.removeEventListener(heroGroupChangeEventName, updateHeroTopbarGroup);
  }, [isHomeRoute]);

  return (
    <>
      <header
        className={`site-header${open ? " is-open" : ""}${scrolled ? " is-scrolled" : " is-transparent"}${
          isHomeRoute ? " is-home-route" : ""
        }`}
        data-site-hero-group={isHomeRoute ? heroTopbarGroup : undefined}
        style={transparentHomeTopbarStyle}
      >
        <Link className="site-brand" href="/" onClick={closeMenu}>
          <span className="site-brand-mark" aria-hidden="true">
            <span />
          </span>
          <span>대한산업AI</span>
        </Link>
        <button
          className="site-menu-button"
          type="button"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`site-nav ${open ? "is-open" : ""}`} aria-label="주요 메뉴">
          <div className="site-nav-links">
            {navItems.map((group) => {
              const active =
                (group.href && (pathname === group.href || pathname.startsWith(`${group.href}/`))) ||
                group.children.some((child) => child.href && pathname.startsWith(child.href));

              return (
                <div className={`site-nav-group ${active ? "is-active" : ""}`} key={group.label}>
                  {group.href ? (
                    <Link href={group.href} onClick={closeMenu}>
                      {group.label}
                    </Link>
                  ) : (
                    <button type="button">{group.label}</button>
                  )}
                  <div className="site-dropdown" role="menu" style={open ? mobileDropdownStyle : undefined}>
                    <div className="site-dropdown-media" role="presentation">
                      <img
                        src={group.imageSrc ?? "/assets/industrial-ai-hero.png"}
                        alt={group.imageAlt ?? ""}
                        loading="lazy"
                      />
                    </div>
                    <p className="site-dropdown-summary">{group.summary}</p>
                    <div className="site-dropdown-items" role="presentation">
                      {group.children.map((child) => (
                        <Link key={child.label} href={child.href} role="menuitem" onClick={closeMenu}>
                          <strong>{child.label}</strong>
                          <span className="site-sr-only">{child.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link className="site-nav-cta" href="/contact" onClick={closeMenu}>
            문의하기
          </Link>
        </nav>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-brand">
        <span className="site-brand-mark" aria-hidden="true">
          <span />
        </span>
        <strong>주식회사 대한산업AI</strong>
        <p>AI-Core for Industrial Operations</p>
      </div>
      <nav aria-label="푸터 메뉴">
        <Link href="/products/data-driven">Data-Driven AI-Core</Link>
        <Link href="/products/automation">Automation AI-Core</Link>
        <Link href="/community/newsletter">Community</Link>
        <Link href="/company">Company</Link>
        <Link href="/contact">문의하기</Link>
      </nav>
      <div className="site-footer-info">
        <span>기업 데이터 관리 ERP</span>
        <span>반복 업무 자동화 범위 검토</span>
        <span>koreaindustryai@gmail.com</span>
      </div>
    </footer>
  );
}

export function SiteHero({
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
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  visual?: HeroVisualKind;
  video?: boolean;
}) {
  const isHome = visual === "home";
  const [heroVideoLayers, setHeroVideoLayers] = useState<[HeroVideoLayer, HeroVideoLayer]>(createHeroVideoLayers);
  const [activeVideoLayer, setActiveVideoLayer] = useState<0 | 1>(0);
  const [bufferingVideoLayer, setBufferingVideoLayer] = useState<0 | 1 | null>(null);
  const [retiringVideoLayer, setRetiringVideoLayer] = useState<0 | 1 | null>(null);
  const [retiringHeroFrame, setRetiringHeroFrame] = useState<HeroRetiringFrame | null>(null);
  const [retiringHeroCopyGroup, setRetiringHeroCopyGroup] = useState<number | null>(null);
  const [heroGroupTransition, setHeroGroupTransition] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const activeVideoIndex = heroVideoLayers[activeVideoLayer]?.sourceIndex ?? 0;
  const activeHeroCopyGroup = video && isHome ? getHeroVideoCopyGroup(activeVideoIndex) : 0;
  const activeHeroCopy = video && isHome ? heroVideoCopyGroups[activeHeroCopyGroup] : { eyebrow, title, description };
  const initialHeroProgress = `${Math.round(getHeroVideoGroupProgress(activeVideoIndex, 0) * 1000) / 10}%`;
  const previousHeroCopyGroup = useRef(activeHeroCopyGroup);
  const heroVideoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const heroProgressRef = useRef<HTMLElement | null>(null);
  const retiringFrameVersion = useRef(0);
  const advancingHeroVideoRef = useRef(false);

  const updateHeroGroupProgress = (sourceIndex: number, currentTime: number) => {
    heroProgressRef.current?.style.setProperty(
      "--site-hero-progress",
      `${Math.round(getHeroVideoGroupProgress(sourceIndex, currentTime) * 1000) / 10}%`,
    );
  };

  useEffect(() => {
    setHeroVideoLayers(createHeroVideoLayers());
    setActiveVideoLayer(0);
    setBufferingVideoLayer(null);
    setRetiringVideoLayer(null);
    setRetiringHeroFrame(null);
    setRetiringHeroCopyGroup(null);
    setHeroGroupTransition(false);
    setVideoReady(false);
    setVideoFailed(false);
    advancingHeroVideoRef.current = false;
  }, [video, visual]);

  useEffect(() => {
    advancingHeroVideoRef.current = false;
  }, [activeVideoIndex, activeVideoLayer]);

  useEffect(() => {
    if (retiringVideoLayer === null) return;
    const timeout = window.setTimeout(() => setRetiringVideoLayer(null), 1460);
    return () => window.clearTimeout(timeout);
  }, [retiringVideoLayer]);

  useEffect(() => {
    if (!retiringHeroFrame || retiringVideoLayer === null) return;
    const timeout = window.setTimeout(() => setRetiringHeroFrame(null), 1460);
    return () => window.clearTimeout(timeout);
  }, [retiringHeroFrame, retiringVideoLayer]);

  useLayoutEffect(() => {
    if (!video || !isHome || !videoReady) {
      previousHeroCopyGroup.current = activeHeroCopyGroup;
      setRetiringHeroCopyGroup(null);
      return;
    }

    if (previousHeroCopyGroup.current === activeHeroCopyGroup) return;
    const retiringCopyGroup = previousHeroCopyGroup.current;
    previousHeroCopyGroup.current = activeHeroCopyGroup;

    setRetiringHeroCopyGroup(retiringCopyGroup);
    setHeroGroupTransition(true);
    const timeout = window.setTimeout(() => {
      setHeroGroupTransition(false);
      setRetiringHeroCopyGroup(null);
    }, 1400);
    return () => window.clearTimeout(timeout);
  }, [activeHeroCopyGroup, isHome, video, videoReady]);

  useLayoutEffect(() => {
    if (!video || !isHome) {
      document.documentElement.removeAttribute("data-site-hero-group");
      window.dispatchEvent(new CustomEvent(heroGroupChangeEventName, { detail: { group: "0" } }));
      return;
    }

    const heroGroup = String(activeHeroCopyGroup);
    document.documentElement.dataset.siteHeroGroup = heroGroup;
    window.dispatchEvent(new CustomEvent(heroGroupChangeEventName, { detail: { group: heroGroup } }));
    return () => document.documentElement.removeAttribute("data-site-hero-group");
  }, [activeHeroCopyGroup, isHome, video]);

  useEffect(() => {
    if (!video || !isHome || videoFailed) return;

    let animationFrame = 0;
    const tick = () => {
      const activeVideoElement = heroVideoRefs.current[activeVideoLayer];
      if (activeVideoElement) {
        updateHeroGroupProgress(activeVideoIndex, activeVideoElement.currentTime);
        maybeAdvanceHeroVideoBeforeEnd(activeVideoElement);
      }
      animationFrame = window.requestAnimationFrame(tick);
    };

    animationFrame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [activeVideoIndex, activeVideoLayer, bufferingVideoLayer, isHome, video, videoFailed]);

  const queueHeroVideo = (sourceIndex: number, layerIndex?: 0 | 1) => {
    const targetLayer = layerIndex ?? (activeVideoLayer === 0 ? 1 : 0);
    setBufferingVideoLayer(targetLayer);
    setHeroVideoLayers((layers) => {
      const nextLayers = [...layers] as [HeroVideoLayer, HeroVideoLayer];
      const target = nextLayers[targetLayer];
      nextLayers[targetLayer] = {
        sourceIndex,
        src: heroVideoSources[sourceIndex] ?? "",
        version: target.version + 1,
      };
      return nextLayers;
    });
  };

  const captureHeroVideoFrame = (videoElement: HTMLVideoElement) => {
    if (!videoElement.videoWidth || !videoElement.videoHeight) return null;

    const canvas = document.createElement("canvas");
    const maxFrameWidth = 1920;
    const scale = Math.min(1, maxFrameWidth / videoElement.videoWidth);
    canvas.width = Math.max(1, Math.round(videoElement.videoWidth * scale));
    canvas.height = Math.max(1, Math.round(videoElement.videoHeight * scale));

    const context = canvas.getContext("2d");
    if (!context) return null;

    try {
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL("image/jpeg", 0.92);
    } catch {
      return null;
    }
  };

  const freezeRetiringHeroVideoFrame = (videoElement: HTMLVideoElement) => {
    const retiringFrameSource = captureHeroVideoFrame(videoElement);
    if (!retiringFrameSource) return;

    retiringFrameVersion.current += 1;
    setRetiringHeroFrame({
      src: retiringFrameSource,
      version: retiringFrameVersion.current,
    });
  };

  const goToHeroVideo = (targetIndex: number, options?: { freezeFrame?: boolean }) => {
    if (heroVideoSources.length < 2) return;
    if (bufferingVideoLayer !== null || advancingHeroVideoRef.current || heroGroupTransition) return;

    const currentIndex = heroVideoLayers[activeVideoLayer]?.sourceIndex ?? 0;
    const normalizedTargetIndex = (targetIndex + heroVideoSources.length) % heroVideoSources.length;
    if (normalizedTargetIndex === currentIndex) return;

    const activeVideoElement = heroVideoRefs.current[activeVideoLayer];
    if (options?.freezeFrame && activeVideoElement) freezeRetiringHeroVideoFrame(activeVideoElement);
    advancingHeroVideoRef.current = true;
    queueHeroVideo(normalizedTargetIndex);
  };

  const advanceHeroVideo = (videoElement?: HTMLVideoElement, options?: { freezeFrame?: boolean }) => {
    const currentIndex = heroVideoLayers[activeVideoLayer]?.sourceIndex ?? 0;
    if (options?.freezeFrame && videoElement) freezeRetiringHeroVideoFrame(videoElement);
    goToHeroVideo(currentIndex + 1);
  };

  const handleHeroVideoProgressNavigation = (direction: -1 | 1) => {
    const currentIndex = heroVideoLayers[activeVideoLayer]?.sourceIndex ?? 0;
    goToHeroVideo(currentIndex + direction, { freezeFrame: true });
  };

  const maybeAdvanceHeroVideoBeforeEnd = (videoElement: HTMLVideoElement) => {
    if (!video || !isHome || heroVideoSources.length < 2) return;
    if (bufferingVideoLayer !== null || advancingHeroVideoRef.current || videoElement.ended) return;

    const fallbackDuration = heroVideoDurations[activeVideoIndex] ?? 0;
    const duration = Number.isFinite(videoElement.duration) ? videoElement.duration : fallbackDuration;
    if (duration <= 0) return;

    const remaining = duration - videoElement.currentTime;
    if (remaining > 0 && remaining <= heroVideoAdvanceLeadSeconds) {
      advanceHeroVideo(videoElement);
    }
  };

  const playHeroVideo = (videoElement: HTMLVideoElement) => {
    if (!videoElement.paused) return;
    void videoElement.play().catch(() => undefined);
  };

  const handleHeroVideoPlayable = (layerIndex: 0 | 1, event: SyntheticEvent<HTMLVideoElement>) => {
    if (layerIndex === bufferingVideoLayer && event.type === "loadedmetadata") return;

    if (layerIndex !== bufferingVideoLayer) {
      if (layerIndex === activeVideoLayer) {
        const videoElement = event.currentTarget;
        playHeroVideo(videoElement);
        updateHeroGroupProgress(heroVideoLayers[layerIndex]?.sourceIndex ?? activeVideoIndex, videoElement.currentTime);
        maybeAdvanceHeroVideoBeforeEnd(videoElement);
        setVideoReady(true);
      }
      return;
    }

    const videoElement = event.currentTarget;
    const previousLayer = activeVideoLayer;
    try {
      videoElement.currentTime = 0;
    } catch {
      // Some browsers can reject currentTime changes before metadata is ready.
    }
    playHeroVideo(videoElement);
    updateHeroGroupProgress(heroVideoLayers[layerIndex]?.sourceIndex ?? activeVideoIndex, 0);
    setActiveVideoLayer(layerIndex);
    if (layerIndex !== previousLayer) setRetiringVideoLayer(previousLayer);
    setBufferingVideoLayer(null);
    setVideoReady(true);
  };

  const handleHeroVideoEnded = (event: SyntheticEvent<HTMLVideoElement>) => {
    advanceHeroVideo(event.currentTarget, { freezeFrame: true });
  };

  const handleHeroVideoError = (layerIndex: 0 | 1, sourceIndex: number) => {
    if (sourceIndex < heroVideoSources.length - 1) {
      if (layerIndex === activeVideoLayer) setVideoReady(false);
      queueHeroVideo(sourceIndex + 1, layerIndex);
      return;
    }

    if (layerIndex === activeVideoLayer) {
      setVideoReady(false);
      setVideoFailed(true);
      return;
    }

    setBufferingVideoLayer(null);
  };

  const renderHeroCopy = (copy: HeroCopy, copyGroup: number, state: "active" | "retiring") => {
    const isActiveCopy = state === "active";
    const progressValue = isActiveCopy ? initialHeroProgress : "100%";

    return (
      <div
        className={`site-hero-copy is-${state}`}
        data-copy-group={video && isHome ? String(copyGroup) : undefined}
        key={video && isHome ? `hero-copy-${state}-${copyGroup}` : "hero-copy-static"}
        aria-hidden={isActiveCopy ? undefined : "true"}
      >
        {copy.eyebrow ? <p className="site-eyebrow">{copy.eyebrow}</p> : null}
        {isHome && heroVideoSources.length > 1 ? (
          <div className="site-hero-progress" aria-label="대표 메시지 진행 상태">
            <div className="site-hero-progress-header">
              <button
                className="site-hero-progress-button site-hero-progress-prev"
                type="button"
                aria-label="이전 AI-Core Scene 보기"
                disabled={!isActiveCopy || bufferingVideoLayer !== null || heroGroupTransition}
                onClick={() => handleHeroVideoProgressNavigation(-1)}
                tabIndex={isActiveCopy ? undefined : -1}
              >
                <ChevronLeft size={21} strokeWidth={2.25} />
              </button>
              <span>AI-Core Scene {String(copyGroup + 1).padStart(2, "0")}</span>
              <button
                className="site-hero-progress-button site-hero-progress-next"
                type="button"
                aria-label="다음 AI-Core Scene 보기"
                disabled={!isActiveCopy || bufferingVideoLayer !== null || heroGroupTransition}
                onClick={() => handleHeroVideoProgressNavigation(1)}
                tabIndex={isActiveCopy ? undefined : -1}
              >
                <ChevronRight size={21} strokeWidth={2.25} />
              </button>
            </div>
            <strong
              ref={isActiveCopy ? heroProgressRef : undefined}
              style={{ "--site-hero-progress": progressValue } as CSSProperties}
            />
          </div>
        ) : null}
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
        {primary ? (
          <div className="site-hero-actions">
            <Link className="site-button site-button-primary" href={primary.href} tabIndex={isActiveCopy ? undefined : -1}>
              {primary.label}
              <ArrowRight size={18} />
            </Link>
            {secondary ? (
              <Link className="site-button site-button-secondary" href={secondary.href} tabIndex={isActiveCopy ? undefined : -1}>
                {secondary.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  };

  const renderHeroOverlay = (copyGroup: number, state: "active" | "retiring") => (
    <div
      className={`site-hero-overlay is-${state}`}
      data-overlay-group={String(copyGroup)}
      key={`hero-overlay-${state}-${copyGroup}`}
      aria-hidden="true"
    />
  );

  return (
    <section
      className={`site-hero site-hero-${visual} ${isHome ? "is-home" : "is-subpage"} ${
        videoReady ? "has-video" : "has-image-fallback"
      } ${heroGroupTransition ? "is-group-transitioning" : ""}`}
      data-video-state={videoFailed ? "failed" : videoReady ? "loaded" : "image-fallback"}
      data-video-index={video ? String(activeVideoIndex) : undefined}
      data-video-group={video && isHome ? String(activeHeroCopyGroup) : undefined}
    >
      {video && !videoFailed
        ? <>
            {retiringHeroFrame ? (
              <img
                key={`retiring-frame-${retiringHeroFrame.version}`}
                className="site-hero-video site-hero-video-freeze is-retiring"
                src={retiringHeroFrame.src}
                alt=""
                aria-hidden="true"
              />
            ) : null}
            {heroVideoLayers.map((layer, index) => {
            const layerIndex = index as 0 | 1;
            const isActive = layerIndex === activeVideoLayer;
            const isBuffering = layerIndex === bufferingVideoLayer;
            const isRetiring = layerIndex === retiringVideoLayer;
            const shouldRenderRetiringVideo = isRetiring && !retiringHeroFrame;
            if (!layer.src || (!isActive && !isBuffering && !shouldRenderRetiringVideo)) return null;

            return (
              <video
                key={`${layerIndex}-${layer.version}-${layer.src}`}
                ref={(element) => {
                  heroVideoRefs.current[layerIndex] = element;
                }}
                className={`site-hero-video ${
                  isActive ? "is-active" : isBuffering ? "is-buffering" : "is-retiring"
                }`}
                aria-hidden="true"
                autoPlay={isActive}
                loop={heroVideoSources.length === 1}
                muted
                playsInline
                preload="auto"
                poster={layer.sourceIndex === 0 && !videoReady ? "/assets/hero-video-poster.jpg" : undefined}
                src={layer.src}
                onLoadedMetadata={(event) => handleHeroVideoPlayable(layerIndex, event)}
                onLoadedData={(event) => handleHeroVideoPlayable(layerIndex, event)}
                onCanPlay={(event) => handleHeroVideoPlayable(layerIndex, event)}
                onPlaying={(event) => handleHeroVideoPlayable(layerIndex, event)}
                onTimeUpdate={(event) => handleHeroVideoPlayable(layerIndex, event)}
                onEnded={isActive ? handleHeroVideoEnded : undefined}
                onError={() => handleHeroVideoError(layerIndex, layer.sourceIndex)}
              />
            );
          })}
          </>
        : null}
      {video && isHome ? <div className="site-hero-group-wipe" aria-hidden="true" /> : null}
      {video && isHome ? (
        <>
          {retiringHeroCopyGroup !== null && retiringHeroCopyGroup !== activeHeroCopyGroup
            ? renderHeroOverlay(retiringHeroCopyGroup, "retiring")
            : null}
          {renderHeroOverlay(activeHeroCopyGroup, "active")}
        </>
      ) : (
        <div className="site-hero-overlay" aria-hidden="true" />
      )}
      <div className="site-hero-inner">
        <div className="site-hero-copy-stage">
          {renderHeroCopy(activeHeroCopy, activeHeroCopyGroup, "active")}
          {retiringHeroCopyGroup !== null && retiringHeroCopyGroup !== activeHeroCopyGroup
            ? renderHeroCopy(heroVideoCopyGroups[retiringHeroCopyGroup] ?? activeHeroCopy, retiringHeroCopyGroup, "retiring")
            : null}
        </div>
        {isHome ? null : <SiteHeroVisual kind={visual} />}
      </div>
    </section>
  );
}

function SiteHeroVisual({ kind }: { kind: Exclude<HeroVisualKind, "home"> }) {
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
          ? ["Newsletter", "Blog", "Tech", "News"]
          : ["회사 정보", "업무 문제", "희망 일정", "상담 요청"];

  return (
    <div className={`site-hero-visual site-visual-${kind}`} aria-label={`${visualTitle} 시각화`}>
      <div className="site-visual-top">
        <span />
        <span />
        <span />
        <strong>{visualTitle}</strong>
      </div>
      <div className="site-visual-body">
        <div className="site-visual-sidebar">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="site-visual-main">
          <div className="site-visual-title-row">
            <strong>AI-Core Console</strong>
            <small>Preview</small>
          </div>
          <div className="site-visual-flow">
            {visualItems.map((item, index) => (
              <span key={item} className={index % 2 === 0 ? "is-strong" : ""}>
                {item}
              </span>
            ))}
          </div>
          <div className="site-visual-chart">
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

export function SiteSectionHeading({
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
    <div className={`site-section-heading ${split ? "is-split" : ""}`}>
      <div>
        <p className="site-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {description ? <p>{description}</p> : null}
    </div>
  );
}

export function SiteIndustryWordmarks() {
  return (
    <section className="site-section site-industry-section" aria-label="산업별 워드마크 신뢰 영역">
      <SiteSectionHeading
        eyebrow="Industry"
        title="제조, 금융, 건설, 물류 유통까지 같은 AI-Core로 다르게 조립합니다."
        description="검증 전 고객명을 앞세우기보다 적용 가능한 업무 흐름을 산업별 카드로 먼저 보여줍니다."
        split
      />
      <div className="site-industry-wordmarks">
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

export function SiteIndustryImageSection() {
  const {
    isRevealObservable: isIndustryRevealObservable,
    isRevealed: isIndustryRevealed,
    revealRef: industryRevealRef,
  } = useHomeRepeatReveal<HTMLElement>();

  return (
    <section
      ref={industryRevealRef}
      className={`site-home-industries-section${isIndustryRevealObservable ? " is-observable" : ""}${
        isIndustryRevealed ? " is-revealed" : ""
      }`}
      aria-labelledby="site-home-industries-title"
    >
      <div className="site-home-industries-wrap">
        <h2 id="site-home-industries-title" className="site-home-industries-title site-home-repeat-reveal">
          INDUSTRIES
        </h2>
        <div className="site-home-industries">
          {industryImageCards.map((item, index) => (
            <Link
              className="site-home-industry-card site-home-repeat-reveal"
              href={item.href}
              key={item.name}
              aria-label={`${item.name} 산업 페이지로 이동`}
              style={{ "--site-home-item-reveal-delay": `${150 + index * 120}ms` } as CSSProperties}
            >
              <img src={item.src} alt={item.alt} loading="lazy" />
              <span className="site-home-industry-card-title">{item.name}</span>
              <span className="site-home-industry-card-arrow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteWhatsNewSection() {
  const {
    isRevealObservable: isWhatsNewRevealObservable,
    isRevealed: isWhatsNewRevealed,
    revealRef: whatsNewRevealRef,
  } = useHomeRepeatReveal<HTMLElement>();
  const [activeFilter, setActiveFilter] = useState<WhatsNewFilter>("All");
  const [activePage, setActivePage] = useState(1);
  const filteredItems =
    activeFilter === "All" ? whatsNewItems : whatsNewItems.filter((item) => item.tag === activeFilter);
  const pageCount = Math.max(1, Math.ceil(filteredItems.length / whatsNewPageSize));
  const pageStartIndex = (activePage - 1) * whatsNewPageSize;
  const visibleItems = filteredItems.slice(pageStartIndex, pageStartIndex + whatsNewPageSize);

  const changeFilter = (filter: WhatsNewFilter) => {
    setActiveFilter(filter);
    setActivePage(1);
  };

  return (
    <section
      ref={whatsNewRevealRef}
      className={`site-whats-new-section${isWhatsNewRevealObservable ? " is-observable" : ""}${
        isWhatsNewRevealed ? " is-revealed" : ""
      }`}
      aria-labelledby="site-whats-new-title"
    >
      <div className="site-whats-new-wrap">
        <div className="site-whats-new-header">
          <h2 id="site-whats-new-title" className="site-whats-new-title site-home-repeat-reveal">
            <strong>What&apos;s</strong> New
          </h2>
          <div
            className="site-whats-new-filters site-home-repeat-reveal"
            aria-label="What's New 콘텐츠 필터"
            style={{ "--site-home-item-reveal-delay": "120ms" } as CSSProperties}
          >
            {whatsNewFilters.map((filter) => (
              <button
                className={activeFilter === filter ? "is-active" : ""}
                type="button"
                aria-pressed={activeFilter === filter}
                key={filter}
                onClick={() => changeFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="site-whats-new-grid">
          {visibleItems.map((item, index) => (
            <Link
              className="site-whats-new-card site-home-repeat-reveal"
              href={item.href}
              key={`${item.tag}-${item.title}`}
              style={{ "--site-home-item-reveal-delay": `${210 + index * 120}ms` } as CSSProperties}
            >
              <span className="site-whats-new-image">
                <img src={item.imageSrc} alt={item.imageAlt} loading="lazy" />
                <span className="site-whats-new-image-arrow" aria-hidden="true" />
              </span>
              <span className="site-whats-new-meta">
                <span className="site-whats-new-tag">{item.tag}</span>
              </span>
              <strong>{item.title}</strong>
              <time dateTime={item.date.replaceAll(".", "-").replace(/-$/, "")}>{item.date}</time>
            </Link>
          ))}
        </div>
        {pageCount > 1 ? (
          <nav className="site-whats-new-pagination" aria-label="What's New 페이지">
            <button
              type="button"
              aria-label="이전 페이지"
              disabled={activePage === 1}
              onClick={() => setActivePage((page) => Math.max(1, page - 1))}
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            {Array.from({ length: pageCount }, (_, index) => {
              const page = index + 1;
              return (
                <button
                  className={activePage === page ? "is-active" : ""}
                  type="button"
                  aria-label={`${page}페이지`}
                  aria-current={activePage === page ? "page" : undefined}
                  key={page}
                  onClick={() => setActivePage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              type="button"
              aria-label="다음 페이지"
              disabled={activePage === pageCount}
              onClick={() => setActivePage((page) => Math.min(pageCount, page + 1))}
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}

const formatCommunityDateTime = (date: string) => date.replaceAll(".", "-").replace(/-$/, "");

function SiteCommunityContentPage({
  pageClassName,
  title,
  description,
  items,
}: {
  pageClassName: string;
  title: string;
  description: string;
  items: CommunityArticle[];
}) {
  const [activePage, setActivePage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(items.length / communityPageSize));
  const pageStartIndex = (activePage - 1) * communityPageSize;
  const visibleItems = items.slice(pageStartIndex, pageStartIndex + communityPageSize);
  const featuredItem = visibleItems[0];
  const cardItems = visibleItems.slice(1);
  const titleId = `site-community-${title.toLowerCase()}-title`;
  const listTitleId = `site-community-${title.toLowerCase()}-list-title`;

  return (
    <SiteShell>
      <main className={`site-community-page ${pageClassName}`}>
        <section className="site-community-intro" aria-labelledby={titleId}>
          <div className="site-community-shell">
            <h1 id={titleId}>{title}</h1>
            <p>{description}</p>
          </div>
        </section>

        <section className="site-community-content" aria-labelledby={listTitleId}>
          <div className="site-community-shell">
            <h2 id={listTitleId} className="site-sr-only">
              {title} 콘텐츠 목록
            </h2>

            {featuredItem ? (
              <Link className="site-community-featured-card" href={featuredItem.href}>
                <span className="site-community-featured-image">
                  <img src={featuredItem.imageSrc} alt={featuredItem.imageAlt} />
                </span>
                <div className="site-community-featured-copy">
                  <h3>{featuredItem.title}</h3>
                  <p>{featuredItem.summary}</p>
                  <time dateTime={formatCommunityDateTime(featuredItem.date)}>{featuredItem.date}</time>
                </div>
              </Link>
            ) : (
              <div className="site-community-empty" role="status">
                준비된 콘텐츠가 없습니다.
              </div>
            )}

            {cardItems.length > 0 ? (
              <div className="site-community-grid">
                {cardItems.map((item) => (
                  <Link className="site-community-card" href={item.href} key={item.slug}>
                    <span className="site-community-card-image">
                      <img src={item.imageSrc} alt={item.imageAlt} loading="lazy" />
                    </span>
                    <h3>{item.title}</h3>
                    <time dateTime={formatCommunityDateTime(item.date)}>{item.date}</time>
                  </Link>
                ))}
              </div>
            ) : null}

            {pageCount > 1 ? (
              <nav className="site-whats-new-pagination site-community-pagination" aria-label={`${title} 페이지`}>
                <button
                  type="button"
                  aria-label="이전 페이지"
                  disabled={activePage === 1}
                  onClick={() => setActivePage((page) => Math.max(1, page - 1))}
                >
                  <ChevronLeft size={18} aria-hidden="true" />
                </button>
                {Array.from({ length: pageCount }, (_, index) => {
                  const page = index + 1;
                  return (
                    <button
                      className={activePage === page ? "is-active" : ""}
                      type="button"
                      aria-label={`${page}페이지`}
                      aria-current={activePage === page ? "page" : undefined}
                      key={page}
                      onClick={() => setActivePage(page)}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  type="button"
                  aria-label="다음 페이지"
                  disabled={activePage === pageCount}
                  onClick={() => setActivePage((page) => Math.min(pageCount, page + 1))}
                >
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
              </nav>
            ) : null}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

export function SiteNewsletterPage() {
  const sectionMeta = communitySectionMeta.newsletter;

  return (
    <SiteCommunityContentPage
      pageClassName="site-newsletter-page"
      title={sectionMeta.title}
      description={sectionMeta.description}
      items={newsletterItems}
    />
  );
}

export function SiteBlogPage() {
  const sectionMeta = communitySectionMeta.blog;

  return (
    <SiteCommunityContentPage
      pageClassName="site-blog-page"
      title={sectionMeta.title}
      description={sectionMeta.description}
      items={blogItems}
    />
  );
}

export function SiteTechnologyPage() {
  const sectionMeta = communitySectionMeta.technology;

  return (
    <SiteCommunityContentPage
      pageClassName="site-technology-page"
      title={sectionMeta.title}
      description={sectionMeta.description}
      items={technologyItems}
    />
  );
}

export function SiteTrustStrip() {
  const logoGroups = [0, 1];

  return (
    <section className="site-trust-strip" aria-label="고객사 및 프로젝트 로고">
      <div className="site-trust-marquee">
        <div className="site-trust-track">
          {logoGroups.map((groupIndex) => (
            <div className="site-trust-group" key={groupIndex} aria-hidden={groupIndex > 0}>
              {clientLogos.map((logo) => (
                <div className="site-client-logo" key={`${logo.name}-${groupIndex}`}>
                  <img src={logo.src} alt={groupIndex === 0 ? logo.name : ""} loading="eager" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="site-sr-only" aria-hidden="true">
        {clientLogos.map((logo) => (
          <span key={logo.name}>{logo.name}</span>
        ))}
      </div>
    </section>
  );
}

export function SiteWorkTransitionSection() {
  const solutionOverviewItems = [
    {
      number: "01",
      title: "업무 구조 정리",
      description: "흩어진 문서 양식, 승인 흐름, 운영 데이터를 실제 처리 단위로 정리합니다.",
    },
    {
      number: "02",
      title: "AI-Core 설계",
      description: "데이터 기준, 권한, 화면, 알림, 자동화 조건을 회사 업무 방식에 맞게 조립합니다.",
    },
    {
      number: "03",
      title: "제품 모듈 연결",
      description: "기업 맞춤 AI-Core를 통해 실제 솔루션으로 구현합니다.",
    },
  ];
  const [isRevealed, setIsRevealed] = useState(false);
  const [isRevealObservable, setIsRevealObservable] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    setIsRevealObservable(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsRevealed(Boolean(entry?.isIntersecting));
      },
      { rootMargin: "0px 0px -16% 0px", threshold: 0 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`site-work-transition-section${isRevealObservable ? " is-observable" : ""}${
        isRevealed ? " is-revealed" : ""
      }`}
      aria-labelledby="site-work-transition-title"
    >
      <div className="site-work-transition-intro">
        <div className="site-work-transition-copy">
          <h2 id="site-work-transition-title">기업에 맞춘 AI-Core 솔루션으로 기업 생산성을 혁신합니다.</h2>
          <p>
            기업의 생산성은 기업의 성장력입니다.
            <br />
            대한산업AI는 효율적인 자동화 프로세스로 반복 업무를 줄이고 더 빠른 의사결정과 실행을 돕습니다.
          </p>
        </div>
      </div>
      <div className="site-work-overview" aria-label="AI-Core 솔루션 설계 단계">
        <div className="site-work-overview-grid">
          {solutionOverviewItems.map((item, index) => (
            <article
              className="site-work-overview-card"
              key={item.number}
              style={{ "--site-overview-delay": `${260 + index * 150}ms` } as CSSProperties}
            >
              <small>{item.number}</small>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SiteAiCoreShowcase() {
  return (
    <div className="site-ai-core-panel">
      <div className="site-ai-core-copy">
        <span>Data-Driven AI-Core</span>
        <h3>현장 데이터를 기업 맞춤 ERP 구조로 연결합니다.</h3>
        <p>
          Data-Driven AI-Core는 문서, 운영 데이터, 승인 흐름을 한 구조로 묶어 업무 화면과 리포트에서
          바로 활용할 수 있게 만드는 제품입니다.
        </p>
        <Link className="site-text-link" href="/products/data-driven">
          Data-Driven AI-Core 자세히 보기
          <ArrowRight size={17} />
        </Link>
      </div>
      <div className="site-ai-core-stats" aria-label="AI-Core 핵심 수치">
        <strong>3000</strong>
        <span>Widget Library</span>
        <small>ERP 모듈, 문서, 승인, 리포트, 대시보드를 조립 가능한 단위로 구성합니다.</small>
      </div>
    </div>
  );
}

export function SiteProductShowcase() {
  const productShowcases = [
    {
      title: "Data-Driven AI-Core",
      href: "/products/data-driven",
      ariaLabel: "Data-Driven AI-Core 페이지로 이동",
      lead: "현장의 데이터를 기업 맞춤으로 전환하는 AI 솔루션",
      description:
        "문서, 승인 흐름, 운영 데이터를 기업 맞춤 ERP 구조로 연결해 업무 데이터를 관리하고 활용할 수 있게 합니다.",
      imageSrc: "/assets/datadriven.png",
      ctaLabel: "Data-Driven",
      visualFirst: false,
    },
    {
      title: "Automation AI-Core",
      href: "/products/automation",
      ariaLabel: "Automation AI-Core 페이지로 이동",
      lead: "반복 업무를 자동으로 처리하는 기업 자동화 솔루션",
      description:
        "확인, 분류, 정리, 보고처럼 매일 반복되는 업무를 작은 자동화 흐름으로 시작해 기업 업무 시스템으로 확장합니다.",
      imageSrc: "/assets/automative.png",
      ctaLabel: "Automation",
      visualFirst: true,
    },
  ];
  const [visibleProductRows, setVisibleProductRows] = useState<number[]>([]);
  const productRowRefs = useRef<Array<HTMLElement | null>>([]);
  const {
    isRevealObservable: isProductsHeaderRevealObservable,
    isRevealed: isProductsHeaderRevealed,
    revealRef: productsHeaderRevealRef,
  } = useHomeRepeatReveal<HTMLDivElement>();

  useEffect(() => {
    const rows = productRowRefs.current.filter(Boolean) as HTMLElement[];
    if (rows.length === 0) return;

    const showRow = (index: number) => {
      setVisibleProductRows((currentRows) =>
        currentRows.includes(index) ? currentRows : [...currentRows, index],
      );
    };

    const hideRow = (index: number) => {
      setVisibleProductRows((currentRows) => currentRows.filter((rowIndex) => rowIndex !== index));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      rows.forEach((_, index) => showRow(index));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const rowIndex = Number((entry.target as HTMLElement).dataset.productIndex);
          if (!Number.isFinite(rowIndex)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.28) {
            showRow(rowIndex);
            return;
          }
          hideRow(rowIndex);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: [0, 0.28] },
    );

    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, []);

  const playProductBgVideo = (event: SyntheticEvent<HTMLAnchorElement>) => {
    const videoElement = event.currentTarget.querySelector<HTMLVideoElement>(".site-product-bg-video");
    if (!videoElement) return;
    void videoElement.play().catch(() => undefined);
  };

  const pauseProductBgVideo = (event: SyntheticEvent<HTMLAnchorElement>) => {
    const videoElement = event.currentTarget.querySelector<HTMLVideoElement>(".site-product-bg-video");
    if (!videoElement) return;
    videoElement.pause();
  };

  const renderVisual = (item: (typeof productShowcases)[number], side: "left" | "right") => (
    <Link
      className={`site-product-visual site-product-reveal is-${side}`}
      href={item.href}
      aria-label={item.ariaLabel}
      onMouseEnter={playProductBgVideo}
      onMouseLeave={pauseProductBgVideo}
      onFocus={playProductBgVideo}
      onBlur={pauseProductBgVideo}
    >
      <video className="site-product-bg-video" loop muted playsInline preload="metadata" aria-hidden="true">
        <source src="/assets/kling_20260601_作品____________5338_0.mp4" type="video/mp4" />
      </video>
      <img className="site-product-ui" src={item.imageSrc} alt="" loading="lazy" />
    </Link>
  );

  const renderCopy = (item: (typeof productShowcases)[number], side: "left" | "right") => (
    <div className={`site-product-showcase-copy site-product-reveal is-${side}`}>
      <h3>{item.title}</h3>
      <p className="site-product-showcase-lead">{item.lead}</p>
      <p>{item.description}</p>
      <Link className="site-product-cta" href={item.href} aria-label={item.ariaLabel}>
        {item.ctaLabel}
        <ArrowRight size={17} aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <div className="site-products-showcase">
      <div
        ref={productsHeaderRevealRef}
        className={`site-products-header${isProductsHeaderRevealObservable ? " is-observable" : ""}${
          isProductsHeaderRevealed ? " is-revealed" : ""
        }`}
      >
        <h2 className="site-products-title site-home-repeat-reveal">Products</h2>
      </div>
      <div className="site-product-showcase-list">
        {productShowcases.map((item, index) => {
          const copySide = item.visualFirst ? "right" : "left";
          const visualSide = item.visualFirst ? "left" : "right";

          return (
          <article
            className={`site-product-showcase ${item.visualFirst ? "is-visual-first" : ""} ${
              visibleProductRows.includes(index) ? "is-revealed" : ""
            }`}
            data-product-index={index}
            key={item.title}
            ref={(element) => {
              productRowRefs.current[index] = element;
            }}
          >
            <div className="site-product-showcase-inner">
              {item.visualFirst ? renderVisual(item, visualSide) : renderCopy(item, copySide)}
              {item.visualFirst ? renderCopy(item, copySide) : renderVisual(item, visualSide)}
            </div>
          </article>
          );
        })}
      </div>
    </div>
  );
}

export function SiteToolCta() {
  return (
    <section className="site-section site-tool-cta">
      <div>
        <p className="site-eyebrow">Cross-Industry Tools</p>
        <h2>범 산업 툴은 무료 공개 기능이 아니라 AI-Core에 붙는 쇼케이스 모듈입니다.</h2>
        <p>
          전자서명, TBM 서명, 사진대지, 문서 정리, 데이터 변환은 각각 작은 툴처럼 보이지만 실제 목표는
          고객사의 업무 시스템에 빠르게 조립 가능한 모듈을 보여주는 것입니다.
        </p>
        <Link className="site-button site-button-primary" href="/contact">
          툴 모듈 도입 문의
          <ArrowRight size={18} />
        </Link>
      </div>
      <div className="site-tool-grid">
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

export function SiteDetailFeatureGrid({
  items,
}: {
  items: Array<{ icon?: LucideIcon; title: string; text: string; example?: string }>;
}) {
  return (
    <div className="site-capability-grid">
      {items.map((item) => {
        const Icon = item.icon ?? Sparkles;
        return (
          <article key={item.title}>
            <Icon size={22} />
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            {item.example ? <span className="site-card-example">{item.example}</span> : null}
          </article>
        );
      })}
    </div>
  );
}

export function SiteProcess({ steps }: { steps: string[] }) {
  return (
    <ol className="site-process-list">
      {steps.map((step, index) => (
        <li key={step}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{step}</strong>
        </li>
      ))}
    </ol>
  );
}

export function SiteCtaBand({
  title,
  description,
  href = "/contact",
  label = "5일 도입 문의하기",
  variant = "default",
}: {
  title: string;
  description?: string;
  href?: string;
  label?: string;
  variant?: "default" | "final";
}) {
  const [isTyping, setIsTyping] = useState(false);
  const ctaRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (variant !== "final") return;

    const section = ctaRef.current;
    if (!section) return;

    if (!("IntersectionObserver" in window)) {
      setIsTyping(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setIsTyping(true);
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.35 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [variant]);

  const renderTypingText = (text: string, delay: number, className?: string) => (
    <span
      className={`site-typewriter-text${className ? ` ${className}` : ""}`}
      style={
        {
          "--site-type-delay": `${delay}ms`,
          "--site-type-steps": Math.max([...text].length, 1),
        } as CSSProperties
      }
    >
      {text}
    </span>
  );

  if (variant === "final") {
    return (
      <section
        ref={ctaRef}
        className={`site-cta-band site-final-cta ${isTyping ? "is-typing" : ""}`}
        aria-labelledby="site-final-cta-title"
      >
        <div className="site-final-cta-inner">
          <div className="site-final-cta-copy">
            <h2 id="site-final-cta-title">{renderTypingText(title, 120)}</h2>
            {description ? <p>{renderTypingText(description, 1420)}</p> : null}
            <Link className="site-button site-button-primary" href={href}>
              {label}
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="site-final-cta-empty" aria-hidden="true" />
        </div>
      </section>
    );
  }

  return (
    <section className="site-cta-band">
      <div>
        <p className="site-eyebrow">5-Day Demo</p>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <Link className="site-button site-button-primary" href={href}>
        {label}
        <ArrowRight size={18} />
      </Link>
    </section>
  );
}

export function SiteComingSoonPage({
  eyebrow,
  title,
  description,
  visual = "products",
}: {
  eyebrow: string;
  title: string;
  description: string;
  visual?: Exclude<HeroVisualKind, "home">;
}) {
  return (
    <SiteShell>
      <main>
        <SiteHero
          eyebrow={eyebrow}
          title={title}
          description={description}
          primary={{ label: "문의하기", href: "/contact" }}
          secondary={{ label: "Data-Driven AI-Core 보기", href: "/products/data-driven" }}
          visual={visual}
        />
        <SiteCtaBand
          title="지금은 문의를 통해 먼저 검토합니다."
          description="준비중인 페이지가 열리기 전까지는 반복 업무와 현재 사용하는 도구를 기준으로 첫 시현 범위를 함께 정합니다."
        />
      </main>
    </SiteShell>
  );
}

export function SiteContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      className="site-contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="site-contact-form-intro">
        <p>지금 문의를 남겨주세요.</p>
        <p>업무 맥락을 확인한 뒤 적합한 AI-Core 구성과 상담 일정을 안내드리겠습니다.</p>
      </div>
      <label>
        <span className="site-contact-field-label">
          성함 <span aria-hidden="true">*</span>
        </span>
        <input name="name" required />
      </label>
      <label>
        <span className="site-contact-field-label">
          회사명 <span aria-hidden="true">*</span>
        </span>
        <input name="company" required />
      </label>
      <label>
        <span className="site-contact-field-label">
          업무용 이메일주소 <span aria-hidden="true">*</span>
        </span>
        <input name="email" type="email" required />
      </label>
      <label>
        <span className="site-contact-field-label">
          휴대폰번호 <span aria-hidden="true">*</span>
        </span>
        <input name="phone" type="tel" required />
      </label>
      <label>
        대한산업AI를 어떻게 알게 되셨나요?
        <select name="source" defaultValue="">
          <option value="" disabled>
            선택해 주세요.
          </option>
          <option>검색</option>
          <option>소개</option>
          <option>뉴스레터</option>
          <option>행사 또는 세미나</option>
          <option>기타</option>
        </select>
      </label>
      <label>
        도입 검토 상황을 알려주세요.
        <select name="adoptionStage" defaultValue="">
          <option value="" disabled>
            선택해 주세요.
          </option>
          <option>검토 전입니다</option>
          <option>내부 검토 중입니다</option>
          <option>비교 검토 중입니다</option>
          <option>도입 범위를 확정하고 있습니다</option>
        </select>
      </label>
      <label>
        <span className="site-contact-field-label">
          어떤 솔루션에 관심이 있으신가요? <span aria-hidden="true">*</span>
        </span>
        <select name="interest" defaultValue="" required>
          <option value="" disabled>
            선택해 주세요.
          </option>
          <option>Data-Driven AI-Core</option>
          <option>Automation AI-Core</option>
          <option>산업별 적용</option>
          <option>아직 모르겠습니다</option>
        </select>
      </label>
      <label className="is-wide">
        <span className="site-contact-field-label">
          문의내용 <span aria-hidden="true">*</span>
        </span>
        <textarea
          name="message"
          rows={7}
          placeholder="예: 매주 작성하는 보고서, 승인 흐름, 운영 데이터 정리처럼 자동화하고 싶은 업무를 적어주세요."
          required
        />
      </label>
      <button className="site-button site-button-primary is-wide" type="submit">
        <Send size={17} />
        문의 접수하기
      </button>
      <p className={`site-form-note ${submitted ? "is-success" : ""}`}>
        {submitted ? "문의가 접수되었습니다. 담당자가 확인 후 연락드리겠습니다." : "남겨주신 정보는 상담 검토와 회신 목적으로만 사용합니다."}
      </p>
    </form>
  );
}

export function SiteFaqList() {
  return (
    <div className="site-faq-list">
      {faqItems.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function SiteAutomationDiagram() {
  const inputs = ["ERP", "문서", "엑셀", "현장 사진", "서명", "운영 로그"];
  const outputs = ["업무 화면", "보고서", "대시보드", "승인 요청", "알림", "연동 범위"];

  return (
    <div className="site-architecture-board">
      <div className="site-arch-group">
        <span>01 Input</span>
        {inputs.map((item) => (
          <strong key={item}>{item}</strong>
        ))}
      </div>
      <div className="site-arch-connector is-left" aria-hidden="true">
        <span />
      </div>
      <div className="site-arch-core">
        <small>02 Assemble</small>
        <Layers3 size={30} />
        <strong>AI-Core</strong>
        <span>위젯 선택 / ERP형 데이터 구조 / AI 처리 / 승인 흐름 / 대시보드 조립</span>
      </div>
      <div className="site-arch-connector is-right" aria-hidden="true">
        <span />
      </div>
      <div className="site-arch-group is-output">
        <span>03 Demo</span>
        {outputs.map((item) => (
          <strong key={item}>{item}</strong>
        ))}
      </div>
    </div>
  );
}

export const siteIcons = {
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
