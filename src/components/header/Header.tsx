"use client";

import { useEffect, useRef, useState } from "react";
import { EyeO } from "@/components/hero/EyeO";
import { Icon } from "@/components/ui/Icon";
import styles from "./Header.module.css";

const LINKS = [
  { label: "Home", href: "#top", current: true },
  { label: "About", href: "#belief", current: false },
  { label: "Opportunities", href: "#what-we-build", current: false },
  { label: "Contact", href: "#admit-one", current: false },
] as const;

/**
 * Navbar — absolute over the hero, transparent, 80px tall.
 * Reference 1672×941: logo x75, centred links, CTA pill right.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [isOpen]);

  return (
    <header className={styles.header}>
      <nav className={styles.bar} aria-label="Main navigation">
        <a href="#top" className={styles.brand} aria-label="Bizora home">
          <span aria-hidden="true">BIZ</span>
          <EyeO />
          <span aria-hidden="true">RA</span>
          <span className={styles.reg} aria-hidden="true">
            ®
          </span>
        </a>

        <ul className={styles.links}>
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={styles.link}
                {...(link.current ? { "aria-current": "page" as const } : {})}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <a className={styles.cta} href="#admit-one">
            Get Involved
            <Icon name="arrow" size={18} strokeWidth={2} className={styles.ctaArrow} />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={styles.menuBtn}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((v) => !v)}
          >
            <Icon name={isOpen ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`${styles.sheet} ${isOpen ? styles.sheetOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.sheetList}>
            {LINKS.map((link) => (
              <li key={link.label}>
                <a
                  className={styles.sheetLink}
                  href={link.href}
                  {...(link.current ? { "aria-current": "page" as const } : {})}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className={styles.cta} href="#admit-one" onClick={() => setIsOpen(false)}>
          Get Involved
          <Icon name="arrow" size={18} strokeWidth={2} className={styles.ctaArrow} />
        </a>
      </div>
    </header>
  );
}
