"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "솔루션", href: "#solutions" },
  { label: "적용 사례", href: "#cases" },
  { label: "도입 프로세스", href: "#process" },
  { label: "회사소개", href: "#company" },
];

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", isOpen);
    return () => document.body.classList.remove("nav-open");
  }, [isOpen]);

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <a className="brand" href="#top" aria-label="대한산업AI 홈" onClick={() => setIsOpen(false)}>
        <span className="brand-mark" aria-hidden="true">
          <span />
        </span>
        <span>대한산업AI</span>
      </a>
      <button
        className="nav-toggle"
        type="button"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <nav className={`site-nav ${isOpen ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
            {item.label}
          </a>
        ))}
        <a className="nav-cta" href="#contact" onClick={() => setIsOpen(false)}>
          문의하기
        </a>
      </nav>
    </header>
  );
}
