"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const HEADER_OFFSET = -88;

/**
 * Page-wide motion plumbing:
 * - Lenis inertial smooth scroll (skipped for reduced motion / touch, where native is better)
 * - one IntersectionObserver that reveals every [data-reveal] element once
 */
export function ExperienceShell() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let lenis: Lenis | null = null;
    if (!reduce && fine) {
      lenis = new Lenis({
        lerp: 0.11,
        smoothWheel: true,
        anchors: { offset: HEADER_OFFSET },
        autoRaf: true,
      });
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      lenis?.destroy();
    };
  }, []);

  return null;
}
