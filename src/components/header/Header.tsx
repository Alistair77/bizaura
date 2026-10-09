"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { BASE_PATH, NAV_LINKS, SOCIAL_LINKS } from "@/content/home";
import styles from "./Header.module.css";

type SocialName = (typeof SOCIAL_LINKS)[number]["icon"];

/** Solid social marks as drawn in the hero reference. */
function SocialGlyph({ name }: { name: SocialName }) {
  if (name === "instagram") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" aria-hidden="true" focusable="false">
        <rect x="3" y="3" width="18" height="18" rx="5.2" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (name === "youtube") {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path
          fillRule="evenodd"
          d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9C1.9 8.9 1.9 12 1.9 12s0 3.1.5 4.8a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9c.5-1.7.5-4.8.5-4.8s0-3.1-.5-4.8ZM10 15.1V8.9l5.2 3.1L10 15.1Z"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M6.94 5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.3 8.7h3.4V20H3.3V8.7Zm5.6 0h3.26v1.55h.05c.45-.86 1.57-1.77 3.23-1.77 3.45 0 4.09 2.27 4.09 5.22V20H16.2v-5.53c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92V20H8.9V8.7Z" />
    </svg>
  );
}

/**
 * Minimal control from the hero reference: a black circular menu button (fixed, so the
 * menu is always one tap away) with a compact social row to its left.
 */
export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const toggle = toggleRef.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      toggle?.focus();
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <button
        ref={toggleRef}
        type="button"
        className={`${styles.menuBtn} ${isOpen ? styles.menuOpen : ""}`}
        aria-expanded={isOpen}
        aria-controls="site-menu"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((v) => !v)}
      >
        <span className={styles.burger} aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
      </button>

      <a className={styles.eventsBtn} href={`${BASE_PATH}/events/`}>
        Events
      </a>

      <ul className={styles.social} aria-label="Social media">
        {SOCIAL_LINKS.map((social, i) => (
          <li key={social.label} style={{ "--i": i } as React.CSSProperties}>
            <a className={styles.socialBtn} href={social.href} aria-label={social.label}>
              <SocialGlyph name={social.icon} />
            </a>
          </li>
        ))}
      </ul>

      <div
        id="site-menu"
        ref={sheetRef}
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        hidden={!isOpen}
      >
        <nav aria-label="Main navigation">
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
        <a className={styles.sheetCta} href="#admit-one" onClick={close}>
          Start a conversation
          <Icon name="arrow" size={18} strokeWidth={2} />
        </a>
      </div>
    </header>
  );
}
