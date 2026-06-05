"use client";

import { useEffect } from "react";

const revealGroups = [
  { selector: ".site-industry-section-head", delay: 0, stagger: 0, motion: "rise" },
  { selector: ".site-industry-overview-card", delay: 120, stagger: 110, motion: "lift" },
  { selector: ".site-industry-feature-head", delay: 0, stagger: 0, motion: "rise" },
  { selector: ".site-industry-feature-card", delay: 120, stagger: 110, motion: "step" },
  { selector: ".site-final-cta", delay: 0, stagger: 0, motion: "settle" },
] as const;

export function IndustryScrollReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".site-industry-detail-page");
    if (!root) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = revealGroups.flatMap(({ selector, delay, stagger, motion }) =>
      Array.from(root.querySelectorAll<HTMLElement>(selector)).map((element, index) => ({
        element,
        delay: delay + index * stagger,
        motion,
      })),
    );

    if (revealElements.length === 0) return;

    revealElements.forEach(({ element, delay, motion }) => {
      element.classList.add("site-scroll-reveal");
      element.dataset.revealMotion = motion;
      element.style.setProperty("--site-reveal-delay", `${delay}ms`);
    });

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach(({ element }) => element.classList.add("is-visible"));
      return;
    }

    root.classList.add("is-reveal-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting && entry.intersectionRatio >= 0.12);
        });
      },
      {
        rootMargin: "-4% 0px -10% 0px",
        threshold: [0, 0.12, 0.28, 0.5, 0.8],
      },
    );

    revealElements.forEach(({ element }) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("is-reveal-enabled");
      revealElements.forEach(({ element }) => {
        element.classList.remove("site-scroll-reveal", "is-visible");
        element.removeAttribute("data-reveal-motion");
        element.style.removeProperty("--site-reveal-delay");
      });
    };
  }, []);

  return null;
}
