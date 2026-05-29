"use client";

import {
  ArrowRight,
  BarChart3,
  Boxes,
  Building2,
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

const heroVideoSources = [
  "/v3/hero-landing-intro.mp4",
  "/v3/hero-landing-reverse.mp4",
];

const heroGroupChangeEventName = "v3HeroGroupChange";

const heroVideoDurations = [13.167, 12.243];
const heroVideoAdvanceLeadSeconds = 0.5;

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
    summary: "AI-Core와 MVP 시작 패키지를 제품 진입점으로 정리합니다.",
    children: [
      {
        label: "AI Core",
        href: "/v3/products/ai-core",
        description: "고객 업무 시스템을 빠르게 조립해 시현하는 핵심 제품",
      },
      {
        label: "MVP",
        href: "/v3/mvp",
        description: "큰 구축 전 작은 자동화로 시작하는 준비중 패키지",
      },
    ],
  },
  {
    label: "Industries",
    summary: "산업별 적용 페이지는 준비중이며, 현재는 문의로 먼저 검토합니다.",
    children: [
      {
        label: "건설",
        href: "/v3/industries/construction",
        description: "현장 문서, 안전 기록, 점검 보고 흐름",
      },
      {
        label: "제조",
        href: "/v3/industries/manufacturing",
        description: "생산, 재고, 견적, 보고 업무 흐름",
      },
      {
        label: "물류",
        href: "/v3/industries/logistics",
        description: "입출고, 검수, 운영 데이터 정리 흐름",
      },
      {
        label: "금융",
        href: "/v3/industries/finance",
        description: "심사, 문서 검토, 리포트 흐름",
      },
    ],
  },
  {
    label: "Resources",
    summary: "콘텐츠 페이지는 준비중이며, 우선 AI-Core 메시지를 중심으로 정리합니다.",
    children: [
      {
        label: "News Letter",
        href: "/v3/community/newsletter",
        description: "산업 AI 인사이트를 받을 준비중 진입점",
      },
      {
        label: "Blog",
        href: "/v3/community/blog",
        description: "AI-Core와 업무 자동화 글 준비중",
      },
      {
        label: "Technology",
        href: "/v3/community/technology",
        description: "AI-Core 기술 구성과 자동화 아키텍처 글을 준비 중입니다",
      },
      {
        label: "News",
        href: "/v3/community/news",
        description: "대한산업AI 소식과 업데이트를 준비 중입니다",
      },
    ],
  },
  {
    label: "Company",
    href: "/v3/company",
    summary: "회사 신뢰와 상담 전환을 위한 최소 진입점을 둡니다.",
    children: [
      {
        label: "회사 소개",
        href: "/v3/company",
        description: "법인 신뢰와 작업 방식 준비중",
      },
      {
        label: "문의하기",
        href: "/v3/contact",
        description: "자주 묻는 질문과 문의하기 폼",
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

export const clientLogos = [
  {
    name: "한국종합안전(주)",
    src: "/v3/logos/hts.png",
  },
  {
    name: "(주)볼트앤너트",
    src: "/v3/logos/bolt-nut.png",
  },
  {
    name: "AnC 기술사 사무소",
    src: "/v3/logos/anc.svg",
  },
  {
    name: "마켓컬리",
    src: "/v3/logos/market-kurly.png",
  },
];

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
  const isHomeRoute = pathname === "/v3";
  const transparentHomeTopbarColor = heroTopbarGroup === "1" ? "#000000" : "#ffffff";
  const transparentHomeTopbarStyle =
    isHomeRoute && !scrolled
      ? ({
          "--v3-home-topbar-color": transparentHomeTopbarColor,
          "--v3-home-topbar-mark-line": transparentHomeTopbarColor,
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
      setHeroTopbarGroup(eventGroup ?? document.documentElement.dataset.v3HeroGroup ?? "0");
    };

    updateHeroTopbarGroup();
    window.addEventListener(heroGroupChangeEventName, updateHeroTopbarGroup);
    return () => window.removeEventListener(heroGroupChangeEventName, updateHeroTopbarGroup);
  }, [isHomeRoute]);

  return (
    <>
      <header
        className={`v3-header${open ? " is-open" : ""}${scrolled ? " is-scrolled" : " is-transparent"}${
          isHomeRoute ? " is-home-route" : ""
        }`}
        data-v3-hero-group={isHomeRoute ? heroTopbarGroup : undefined}
        style={transparentHomeTopbarStyle}
      >
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
                    <div className="v3-dropdown-media" role="presentation">
                      <img
                        src={group.imageSrc ?? "/v3/industrial-ai-hero.png"}
                        alt={group.imageAlt ?? ""}
                        loading="lazy"
                      />
                    </div>
                    <p className="v3-dropdown-summary">{group.summary}</p>
                    <div className="v3-dropdown-items" role="presentation">
                      {group.children.map((child) => (
                        <Link key={child.label} href={child.href} role="menuitem" onClick={closeMenu}>
                          <strong>{child.label}</strong>
                          <span className="v3-sr-only">{child.description}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link className="v3-nav-cta" href="/v3/contact" onClick={closeMenu}>
            문의하기
          </Link>
        </nav>
      </header>
    </>
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
        <Link href="/v3/products/ai-core">Product</Link>
        <Link href="/v3/community/newsletter">Resources</Link>
        <Link href="/v3/company">Company</Link>
        <Link href="/v3/contact">문의하기</Link>
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
  const heroCopyGroupCountLabel = String(heroVideoCopyGroups.length).padStart(2, "0");
  const initialHeroProgress = `${Math.round(getHeroVideoGroupProgress(activeVideoIndex, 0) * 1000) / 10}%`;
  const previousHeroCopyGroup = useRef(activeHeroCopyGroup);
  const heroVideoRefs = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);
  const heroProgressRef = useRef<HTMLElement | null>(null);
  const retiringFrameVersion = useRef(0);
  const advancingHeroVideoRef = useRef(false);

  const updateHeroGroupProgress = (sourceIndex: number, currentTime: number) => {
    heroProgressRef.current?.style.setProperty(
      "--v3-hero-progress",
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
      document.documentElement.removeAttribute("data-v3-hero-group");
      window.dispatchEvent(new CustomEvent(heroGroupChangeEventName, { detail: { group: "0" } }));
      return;
    }

    const heroGroup = String(activeHeroCopyGroup);
    document.documentElement.dataset.v3HeroGroup = heroGroup;
    window.dispatchEvent(new CustomEvent(heroGroupChangeEventName, { detail: { group: heroGroup } }));
    return () => document.documentElement.removeAttribute("data-v3-hero-group");
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

  const advanceHeroVideo = (videoElement?: HTMLVideoElement, options?: { freezeFrame?: boolean }) => {
    if (heroVideoSources.length < 2) return;
    if (options?.freezeFrame && videoElement) freezeRetiringHeroVideoFrame(videoElement);
    if (bufferingVideoLayer !== null) return;
    if (advancingHeroVideoRef.current) return;
    advancingHeroVideoRef.current = true;
    const currentIndex = heroVideoLayers[activeVideoLayer]?.sourceIndex ?? 0;
    queueHeroVideo((currentIndex + 1) % heroVideoSources.length);
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
        className={`v3-hero-copy is-${state}`}
        data-copy-group={video && isHome ? String(copyGroup) : undefined}
        key={video && isHome ? `hero-copy-${state}-${copyGroup}` : "hero-copy-static"}
        aria-hidden={isActiveCopy ? undefined : "true"}
      >
        {copy.eyebrow ? <p className="v3-eyebrow">{copy.eyebrow}</p> : null}
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
        <div className="v3-hero-actions">
          <Link className="v3-button v3-button-primary" href={primary.href} tabIndex={isActiveCopy ? undefined : -1}>
            {primary.label}
            <ArrowRight size={18} />
          </Link>
          {secondary ? (
            <Link className="v3-button v3-button-secondary" href={secondary.href} tabIndex={isActiveCopy ? undefined : -1}>
              {secondary.label}
            </Link>
          ) : null}
        </div>
        {isHome && heroVideoSources.length > 1 ? (
          <div className="v3-hero-progress" aria-label="대표 메시지 진행 상태">
            <span>{String(copyGroup + 1).padStart(2, "0")}</span>
            <strong
              ref={isActiveCopy ? heroProgressRef : undefined}
              style={{ "--v3-hero-progress": progressValue } as CSSProperties}
            />
            <span>{heroCopyGroupCountLabel}</span>
          </div>
        ) : null}
      </div>
    );
  };

  const renderHeroOverlay = (copyGroup: number, state: "active" | "retiring") => (
    <div
      className={`v3-hero-overlay is-${state}`}
      data-overlay-group={String(copyGroup)}
      key={`hero-overlay-${state}-${copyGroup}`}
      aria-hidden="true"
    />
  );

  return (
    <section
      className={`v3-hero v3-hero-${visual} ${isHome ? "is-home" : "is-subpage"} ${
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
                className="v3-hero-video v3-hero-video-freeze is-retiring"
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
                className={`v3-hero-video ${
                  isActive ? "is-active" : isBuffering ? "is-buffering" : "is-retiring"
                }`}
                aria-hidden="true"
                autoPlay={isActive}
                loop={heroVideoSources.length === 1}
                muted
                playsInline
                preload="auto"
                poster={layer.sourceIndex === 0 && !videoReady ? "/v3/hero-video-poster.jpg" : undefined}
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
      {video && isHome ? <div className="v3-hero-group-wipe" aria-hidden="true" /> : null}
      {video && isHome ? (
        <>
          {retiringHeroCopyGroup !== null && retiringHeroCopyGroup !== activeHeroCopyGroup
            ? renderHeroOverlay(retiringHeroCopyGroup, "retiring")
            : null}
          {renderHeroOverlay(activeHeroCopyGroup, "active")}
        </>
      ) : (
        <div className="v3-hero-overlay" aria-hidden="true" />
      )}
      <div className="v3-hero-inner">
        <div className="v3-hero-copy-stage">
          {renderHeroCopy(activeHeroCopy, activeHeroCopyGroup, "active")}
          {retiringHeroCopyGroup !== null && retiringHeroCopyGroup !== activeHeroCopyGroup
            ? renderHeroCopy(heroVideoCopyGroups[retiringHeroCopyGroup] ?? activeHeroCopy, retiringHeroCopyGroup, "retiring")
            : null}
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
          ? ["Newsletter", "Blog", "Tech", "News"]
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
        description="검증 전 고객명을 앞세우기보다 적용 가능한 업무 흐름을 산업별 카드로 먼저 보여줍니다."
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
  const logoGroups = [0, 1];

  return (
    <section className="v3-trust-strip" aria-label="고객사 및 프로젝트 로고">
      <div className="v3-trust-marquee">
        <div className="v3-trust-track">
          {logoGroups.map((groupIndex) => (
            <div className="v3-trust-group" key={groupIndex} aria-hidden={groupIndex > 0}>
              {clientLogos.map((logo) => (
                <div className="v3-client-logo" key={`${logo.name}-${groupIndex}`}>
                  <img src={logo.src} alt={groupIndex === 0 ? logo.name : ""} loading="eager" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="v3-sr-only" aria-hidden="true">
        {clientLogos.map((logo) => (
          <span key={logo.name}>{logo.name}</span>
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

export function V3ProductShowcase() {
  return (
    <Link className="v3-product-showcase" href="/v3/products/ai-core" aria-label="AI-Core 페이지로 이동">
      <div className="v3-product-showcase-copy">
        <h2>AI-CORE</h2>
        <p className="v3-product-showcase-lead">현장의 데이터를 기업 맞춤으로 전환하는 AI 솔루션</p>
        <p>
          AI-Core는 산업에서 사용되는 데이터를 기업 맞춤형 ERP로 제공할 수 있는 core로 다양한 시스템과
          결합해 기업의 생산성을 향상하는 AI ERP 입니다.
        </p>
      </div>
      <div className="v3-product-visual" aria-hidden="true">
        <img className="v3-product-ui" src="/v3/ai-core-erp-ui.png" alt="" loading="lazy" />
      </div>
    </Link>
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

export function V3ComingSoonPage({
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
    <V3Shell>
      <main>
        <V3Hero
          eyebrow={eyebrow}
          title={title}
          description={description}
          primary={{ label: "문의하기", href: "/v3/contact" }}
          secondary={{ label: "AI-Core 보기", href: "/v3/products/ai-core" }}
          visual={visual}
        />
        <V3CtaBand
          title="지금은 문의를 통해 먼저 검토합니다."
          description="준비중인 페이지가 열리기 전까지는 반복 업무와 현재 사용하는 도구를 기준으로 첫 시현 범위를 함께 정합니다."
        />
      </main>
    </V3Shell>
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
