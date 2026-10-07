"use client";

import { useEffect, useRef, useState } from "react";
import AmourSunrisePreloader from "@/components/ui/amour-sunrise-preloader";
import styles from "./Footer.module.css";

/**
 * Footer brand banner: the BIZORA wordmark hand-inked stroke by stroke
 * over a rising cobalt sun (Amour poster, showcase loop).
 * Mounts only once the footer scrolls near the viewport.
 */
export function FooterAmour() {
  const ref = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setLive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLive(true);
          io.disconnect();
        }
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
          word="BIZORA"
          caption="where access turns into outcomes"
          palette={{ paper: "#ffffff" }}
          height="320px"
        />
      ) : null}
    </div>
  );
}
