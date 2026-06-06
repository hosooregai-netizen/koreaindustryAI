"use client";

import { useEffect, useRef, useState } from "react";

export type IndustryOverviewScrollItem = {
  number: string;
  title: string;
  text: string;
};

type IndustryOverviewScrollProps = {
  titleId: string;
  items: readonly IndustryOverviewScrollItem[];
};

const overviewDescription =
  "현재 쓰는 시스템과 문서에서 자동화할 업무를 정하고, 기준·처리·이력까지 운영 단위로 설계합니다.";

export function IndustryOverviewScroll({ titleId, items }: IndustryOverviewScrollProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex] ?? items[0];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || items.length <= 1) return;

    let frame = 0;

    const updateActiveStep = () => {
      frame = 0;

      if (window.matchMedia("(max-width: 900px)").matches) {
        setActiveIndex(0);
        return;
      }

      const rect = track.getBoundingClientRect();
      const scrollableDistance = Math.max(track.offsetHeight - window.innerHeight, 1);
      const currentDistance = Math.min(Math.max(-rect.top + window.innerHeight * 0.2, 0), scrollableDistance);
      const progress = currentDistance / scrollableDistance;
      const nextIndex = Math.min(items.length - 1, Math.max(0, Math.round(progress * (items.length - 1))));

      setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActiveStep);
    };

    updateActiveStep();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [items]);

  return (
    <section className="site-industry-overview site-industry-overview-scroll" aria-labelledby={titleId}>
      <div className="site-industry-overview-scroll-track" ref={trackRef}>
        <div className="site-industry-overview-scroll-sticky">
          <div className="site-industry-overview-scroll-head">
            <h2 id={titleId}>AI-Core 적용 흐름</h2>
            <p>{overviewDescription}</p>
          </div>

          <div className="site-industry-overview-scroll-body">
            <ol className="site-industry-overview-scroll-nav" aria-label="AI-Core 적용 단계">
              {items.map((item, index) => (
                <li
                  aria-current={index === activeIndex ? "step" : undefined}
                  className={index === activeIndex ? "is-active" : ""}
                  key={item.number}
                >
                  <span>
                    {Number.parseInt(item.number, 10)}. {item.title}
                  </span>
                  <i aria-hidden="true" />
                </li>
              ))}
            </ol>

            <div className="site-industry-overview-scroll-copy">
              <div className="site-industry-overview-scroll-copy-inner" data-step={activeItem.number} key={activeItem.number}>
                <span>{activeItem.number}</span>
                <h3>{activeItem.title}</h3>
                <p>{activeItem.text}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="site-industry-overview-mobile-list" aria-label="AI-Core 적용 단계">
          {items.map((item) => (
            <article key={item.number}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
