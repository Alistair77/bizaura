"use client";

import { useEffect, useState, type RefObject } from "react";
import { Icon } from "./Icon";
import styles from "./ScrollArrows.module.css";

type Props = {
  /** The horizontally scrolling list; it steps one `li` at a time. */
  targetRef: RefObject<HTMLElement | null>;
  label: string;
  className?: string;
};

/** Edge tolerance so sub-pixel scroll positions still count as "at the end". */
const EDGE_PX = 4;

/**
 * Prev / next buttons for a swipeable card strip. Phones only (the strips are grids or
 * drag-rails on desktop); disabled at either end so the affordance never lies.
 */
export function ScrollArrows({ targetRef, label, className }: Props) {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;
    const update = () => {
      setIsAtStart(el.scrollLeft <= EDGE_PX);
      setIsAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - EDGE_PX);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [targetRef]);

  const step = (dir: 1 | -1) => {
    const el = targetRef.current;
    if (!el) return;
    const [first, second] = el.querySelectorAll<HTMLElement>("li");
    const distance = first && second ? second.offsetLeft - first.offsetLeft : el.clientWidth * 0.8;
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * distance, behavior: smooth ? "smooth" : "auto" });
  };

  return (
    <div className={`${styles.arrows} ${className ?? ""}`} role="group" aria-label={label}>
      <button type="button" className={styles.btn} aria-label="Previous" disabled={isAtStart} onClick={() => step(-1)}>
        <Icon name="arrowLeft" size={20} strokeWidth={2.2} />
      </button>
      <button type="button" className={styles.btn} aria-label="Next" disabled={isAtEnd} onClick={() => step(1)}>
        <Icon name="arrow" size={20} strokeWidth={2.2} />
      </button>
    </div>
  );
}
