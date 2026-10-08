"use client";

import { useEffect, useRef } from "react";
import { isScrolling } from "@/lib/scrollActivity";
import styles from "./EditorialVideo.module.css";

/** How often to re-check for a scroll pause before starting playback. */
const START_RETRY_MS = 120;

interface EditorialVideoProps {
  src: string;
  poster: string;
  className?: string;
  /** Above the fold: fetch and start right away. Otherwise nothing loads until it nears view. */
  eager?: boolean;
}

/** Muted, looping editorial clip. Plays only while near the viewport; holds its poster for reduced motion. */
export function EditorialVideo({ src, poster, className, eager = false }: EditorialVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    // Off-screen clips neither decode nor download. A clip that comes into view mid-scroll
    // waits for the scroll to settle before starting: decoder start-up mid-scroll drops frames.
    let retry = 0;
    const startWhenSettled = () => {
      window.clearTimeout(retry);
      if (isScrolling(performance.now())) retry = window.setTimeout(startWhenSettled, START_RETRY_MS);
      else video.play().catch(() => undefined);
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startWhenSettled();
        else {
          window.clearTimeout(retry);
          video.pause();
        }
      },
      { rootMargin: "160px" },
    );
    io.observe(video);
    return () => {
      window.clearTimeout(retry);
      io.disconnect();
    };
  }, []);

  return (
    <div className={`${styles.frame} ${className ?? ""}`}>
      <video
        ref={videoRef}
        className={styles.video}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={eager}
        preload={eager ? "auto" : "none"}
        disablePictureInPicture
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
}
