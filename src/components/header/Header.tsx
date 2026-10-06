"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/brand/Wordmark";
import { Icon } from "@/components/ui/Icon";
import { NAV_LINKS } from "@/content/home";
import styles from "./Header.module.css";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const toggle = toggleRef.current;
    document.documentElement.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
      <div className={styles.bar}>
        <a href="#top" className={styles.brand} aria-label="Bizora Media — back to top">
          <Wordmark variant="small" className={styles.wordmark} />
          <span className={styles.tagline} aria-hidden="true">
            Where access turns into outcomes.
          </span>
        </a>

        <nav aria-label="Main navigation" className={styles.nav}>
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a className={styles.navLink} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          {/* ponytail: search UI not specified yet; the control is present but inert. */}
          <button
            type="button"
            className={styles.iconBtn}
            aria-label="Search (coming soon)"
            aria-disabled="true"
            title="Search — coming soon"
          >
            <Icon name="search" size={22} strokeWidth={1.75} />
          </button>
          <a className={`btn ${styles.cta}`} href="#admit-one">
            Start a conversation <Icon name="arrow" size={16} className="btn__arrow" />
          </a>
          <a className={`${styles.iconBtn} ${styles.ctaCompact}`} href="#admit-one" aria-label="Start a conversation">
            <Icon name="chat" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((v) => !v)}
          >
            <Icon name={isOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={sheetRef}
        className={`${styles.sheet} ${isOpen ? styles.sheetOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!isOpen}
      >
        <nav aria-label="Mobile navigation">
          <ul className={styles.sheetList}>
            {NAV_LINKS.map((link, i) => (
              <li key={link.label} style={{ "--i": i } as React.CSSProperties}>
                <a className={styles.sheetLink} href={link.href} onClick={close}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a className="btn" href="#admit-one" onClick={close}>
          Start a conversation <Icon name="arrow" size={16} className="btn__arrow" />
        </a>
      </div>
    </header>
  );
}
