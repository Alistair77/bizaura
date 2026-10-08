import { useEffect, useRef } from "react";
import { HERO_CLIP } from "@/content/home";
import { HandNote } from "./HandNote";
import styles from "./Hero.module.css";

/**
 * Right-side editorial group: the "Real people, real conversations." note, a pencil arrow
 * curling down from it, and a small tilted video fragment. One rigid unit sized in the
 * note's em, so the three never drift apart across viewports.
 */
export function HeroClip() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ambient loop: hold the poster frame for people who ask for less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) videoRef.current?.pause();
  }, []);

  return (
    <div className={styles.clip}>
      <HandNote />
      <svg className={styles.clipArrow} viewBox="0 0 60 96" aria-hidden="true" focusable="false">
        <path className={styles.drawStroke} d="M33 6 C17 17, 8 41, 17 60 C23 72, 32 81, 41 89" />
        <path className={`${styles.drawStroke} ${styles.drawHead}`} d="M29.5 87.5 L41.5 89.5 L42.5 77" />
      </svg>
      <video
        ref={videoRef}
        className={styles.clipVideo}
        src={HERO_CLIP.src}
        poster={HERO_CLIP.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
