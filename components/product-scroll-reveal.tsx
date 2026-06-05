"use client";

import { useEffect } from "react";

const revealGroups = [
  { selector: ".site-dd-card-section .site-dd-section-head", delay: 0, stagger: 0, motion: "rise" },
  { selector: ".site-dd-card-section .site-dd-data-card", delay: 130, stagger: 120, motion: "lift" },
  { selector: ".site-dd-detail-row:not(.is-reverse) .site-dd-detail-copy", delay: 0, stagger: 0, motion: "slide-left" },
  { selector: ".site-dd-detail-row:not(.is-reverse) .site-dd-detail-visual", delay: 150, stagger: 0, motion: "slide-right" },
  { selector: ".site-dd-detail-row.is-reverse .site-dd-detail-copy", delay: 150, stagger: 0, motion: "slide-right" },
  { selector: ".site-dd-detail-row.is-reverse .site-dd-detail-visual", delay: 0, stagger: 0, motion: "slide-left" },
  { selector: ".site-final-cta", delay: 0, stagger: 0, motion: "settle" },
] as const;

export function ProductScrollReveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".site-dd-page");
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
      element.classList.add("site-product-scroll-reveal");
      element.dataset.productRevealMotion = motion;
      element.style.setProperty("--site-product-reveal-delay", `${delay}ms`);
    });

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealElements.forEach(({ element }) => element.classList.add("is-visible"));
      return;
    }

    root.classList.add("is-product-reveal-enabled");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting && entry.intersectionRatio >= 0.14);
        });
      },
      {
        rootMargin: "-4% 0px -12% 0px",
        threshold: [0, 0.14, 0.28, 0.5, 0.8],
      },
    );

    revealElements.forEach(({ element }) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("is-product-reveal-enabled");
      revealElements.forEach(({ element }) => {
        element.classList.remove("site-product-scroll-reveal", "is-visible");
        element.removeAttribute("data-product-reveal-motion");
        element.style.removeProperty("--site-product-reveal-delay");
      });
    };
  }, []);

  return null;
}
