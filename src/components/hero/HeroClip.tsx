import { useEffect, useRef } from "react";
import { HERO_CLIP } from "@/content/home";
import { HandNote } from "./HandNote";
import styles from "./Hero.module.css";

/**
 * Right-side editorial group: a tilted video fragment with pencil emphasis strokes, the
 * "Real people, real conversations." note beneath it, and a pencil arrow curving up from
 * the note into the footage. One rigid unit sized in the note's em, so nothing drifts apart.
 */
export function HeroClip() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Ambient loop: hold the poster frame for people who ask for less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) videoRef.current?.pause();
  }, []);

  return (
    <div className={styles.clip}>
      <div className={styles.clipFrame}>
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
      {/* Three pencil emphasis strokes flicking off the video's top-left corner. */}
      <svg className={styles.sparks} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path className={styles.drawStroke} d="M33 4 C33.5 10, 33.2 15, 34 21" />
        <path className={styles.drawStroke} d="M12 12 C16 16, 19 20, 23 25" />
        <path className={styles.drawStroke} d="M2 33 C7 33.5, 12 33, 18 33.6" />
      </svg>
      <svg className={styles.clipArrow} viewBox="0 0 81 57" aria-hidden="true" focusable="false">
        <path className={styles.drawStroke} d="M5 48 C30 50.5, 57 31, 70.5 7.5" />
        <path className={`${styles.drawStroke} ${styles.drawHead}`} d="M60.5 11.5 L71 6.5 L71.5 18" />
      </svg>
      <HandNote />
    </div>
  );
}
