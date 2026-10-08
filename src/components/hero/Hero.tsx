'use client';

import { useEffect, useRef } from "react";
import { INDUSTRIES } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { HandArrow } from "./HandArrow";
import { HeroClip } from "./HeroClip";
import { HeroLogo } from "./HeroLogo";
import { Plasma } from "./Plasma";
import styles from "./Hero.module.css";

/**
 * Plasma composition tuned against the 1672×941 hero reference: the raymarched column is
 * bent into a ring around the content, sampling its wide upper part so every edge has
 * ribbons, with the seam hidden at the bottom.
 */
const PLASMA_RING: [number, number, number, number, number] = [0.95, 1.6, 0.5, 1.5708, 0.7];
const PLASMA_TIME_OFFSET = 15;

/** Per-word baseline jitter for the pencil tagline (px, deg) — human, never random per render. */
const TAGLINE: { text: string; dy: number; rot: number }[][] = [
  [
    { text: "Where", dy: 0, rot: -0.6 },
    { text: "builders,", dy: -1, rot: 0.4 },
    { text: "ideas", dy: 0.5, rot: -0.3 },
  ],
  [
    { text: "and", dy: 0.5, rot: 0.3 },
    { text: "opportunities", dy: -0.5, rot: -0.4 },
    { text: "meet.", dy: 1, rot: 0.6 },
  ],
];

export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Static fallback shows ONLY when WebGL failed: Plasma appends no <canvas> then.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const el = wrapRef.current;
      if (el && !el.querySelector("canvas")) el.classList.add(styles.isFallback);
    }, 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      {/* z 0–2: living plasma under a soft white falloff — decorative */}
      <div className={styles.heroBg} aria-hidden="true">
        <div ref={wrapRef} className={styles.plasmaWrap}>
          <Plasma
            silk
            ring={PLASMA_RING}
            fibers={0.3}
            speed={0.3}
            direction="pingpong"
            scale={0.8}
            opacity={1}
            mouseInteractive
            renderScale={0.45}
            maxDpr={1.25}
            targetFps={60}
            iterations={40}
            timeOffset={PLASMA_TIME_OFFSET}
          />
          <div className={styles.plasmaStatic} />
        </div>
        <div className={styles.falloff} />
        <svg className={styles.filters} aria-hidden="true" focusable="false">
          <filter id="hero-pencil" x="-4%" y="-10%" width="108%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="1" seed="7" result="grain" />
            <feDisplacementMap in="SourceGraphic" in2="grain" scale="0.9" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
      </div>

      {/* z 10: left-aligned copy with the video docked on the right */}
      <div className={styles.stack}>
        <div className={styles.copy}>
          <HeroLogo />

          <div className={styles.tagline}>
            <p className={styles.tagText}>
              {TAGLINE.map((line, i) => (
                <span key={i} className={styles.tagLine}>
                  {line.map((word) => (
                    <span
                      key={word.text}
                      className={styles.tagWord}
                      style={{ "--dy": `${word.dy}px`, "--rot": `${word.rot}deg` } as React.CSSProperties}
                    >
                      {word.text}
                    </span>
                  ))}
                </span>
              ))}
            </p>
            <HandArrow className={styles.tagArrow} />
          </div>

          <h1 id="hero-heading" className={styles.headline}>
            <span className={styles.line}>Access</span>{" "}
            <span className={styles.line}>turns into</span>{" "}
            <span className={`${styles.line} ${styles.gradient}`}>outcomes.</span>
          </h1>

          <p className={styles.sub}>
            We bring the right intelligence, with the right media, to the right people, for the right
            opportunities.
          </p>

          <div className={styles.ctas}>
            <a className={`${styles.btn} ${styles.primary}`} href="#what-we-build">
              See what we build
              <Icon name="arrow" size={18} strokeWidth={2} className={styles.btnArrow} />
            </a>
            <a className={`${styles.btn} ${styles.secondary}`} href="#admit-one">
              Start a conversation
            </a>
          </div>
        </div>

        <div className={styles.media}>
          <HeroClip />
        </div>

        <ul className={styles.chips} aria-label="Industries we work across">
          {INDUSTRIES.map((industry, i) => (
            <li
              key={industry}
              className={styles.chip}
              style={{ "--i": i } as React.CSSProperties}
            >
              {industry}
            </li>
          ))}
          <li className={styles.chip}>+ more</li>
        </ul>
      </div>
    </section>
  );
}
