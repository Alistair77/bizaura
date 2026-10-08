"use client";

import { useEffect, useRef, useState } from "react";
import AmourSunrisePreloader from "@/components/ui/amour-sunrise-preloader";
import styles from "./Footer.module.css";

/**
 * Footer brand banner: the BIZORA wordmark hand-inked stroke by stroke
 * over a rising sun in the hero's "outcomes." gradient (Amour poster, showcase loop).
 * Mounts once the footer first nears the viewport; its per-frame loops pause whenever it
 * scrolls away, so it never costs frames elsewhere on the page.
 */
export function FooterAmour() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLive(true);
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting);
        if (entry.isIntersecting) setLive(true);
      },
      { rootMargin: "240px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={styles.amourWrap} aria-label="Bizora — animated brand poster">
      {live ? (
        <AmourSunrisePreloader
          loop
          paused={!near}
          word="BIZ-ORA"
          caption="access turns into outcomes"
          emblem="rings"
          palette={{
            paper: "#ffffff",
            ink: "#111111",
            // Same stops as the hero "outcomes." gradient (--gradient-outcomes).
            sunStops: ["#7b42ff", "#315bff", "#c435ff", "#f02b82"],
            sun: "#7b42ff",
            core: "#3a1a8f",
            glow: "#ffffff",
          }}
          height="320px"
        />
      ) : null}
    </div>
  );
}
