'use client';

import { useEffect, useRef } from "react";
import { preload } from "react-dom";
import { BASE_PATH, INDUSTRIES } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { HandArrow } from "./HandArrow";
import { HeroClip } from "./HeroClip";
import { HeroLogo } from "./HeroLogo";
import { LOGO_GLYPHS, LOGO_H, LOGO_O_CENTER, LOGO_O_STOPS } from "./logoGlyphs";
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

/** Load intro pieces cut from the biz-ora logo: "biz-" | O (ring + dot) | "ra". */
const LOGO_X0 = LOGO_GLYPHS[0].x0;
const LOGO_X1 = LOGO_GLYPHS[LOGO_GLYPHS.length - 1].x1;
const INTRO_O_INDEX = LOGO_GLYPHS.findIndex((g) => g.key === "o");
const INTRO_O = LOGO_GLYPHS[INTRO_O_INDEX];
const INTRO_LEFT = LOGO_GLYPHS.slice(0, INTRO_O_INDEX);
const INTRO_RIGHT = LOGO_GLYPHS.slice(INTRO_O_INDEX + 1);
// The O path is outer ring, counter, then the dot: split so the dot can land on its own.
const [oOuter, oCounter, oDot] = INTRO_O.d.split(/(?=M)/);
const INTRO_O_RING = `${oOuter} ${oCounter}`;
const INTRO_O_DOT = oDot;

/** Still frames of the hero plasma (captured from the live canvas at 1440×900 and 375×812). */
const PLASMA_POSTER = {
  desktop: `${BASE_PATH}/images/hero/hero-plasma-desktop.webp`,
  mobile: `${BASE_PATH}/images/hero/hero-plasma-mobile.webp`,
} as const;

/** Design canvas the hero composition is laid out on (scaled evenly to fit on ≥1100px). */
const STAGE_W = 1440;
const STAGE_H = 900;

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  // Same scale as the CSS --s (min of width/height fit), set from JS for browsers without
  // CSS trig and so the page scrollbar is excluded from the width.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const fit = () => {
      const s = Math.min(document.documentElement.clientWidth / STAGE_W, window.innerHeight / STAGE_H);
      hero.style.setProperty("--s", s.toFixed(4));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // A still frame of this exact plasma paints with the HTML (preloaded, ~5–11 KB), so the hero
  // never waits on JS + WebGL; the live canvas fades in over it. Also the no-WebGL fallback.
  preload(PLASMA_POSTER.desktop, { as: "image", media: "(min-width: 761px)", fetchPriority: "high" });
  preload(PLASMA_POSTER.mobile, { as: "image", media: "(max-width: 760px)", fetchPriority: "high" });

  return (
    <>
    {/* Load intro variants, shown only while the head script sets html[data-intro]. */}
    <div className={`${styles.intro} ${styles.introPlasma}`} data-intro-layer aria-hidden="true">
      <div className={styles.introOrb} />
    </div>
    <div className={`${styles.intro} ${styles.introLogo}`} data-intro-layer aria-hidden="true">
      <svg className={styles.introMark} viewBox={`${LOGO_X0} 0 ${LOGO_X1 - LOGO_X0} ${LOGO_H}`}>
        <defs>
          <linearGradient id="intro-o" gradientUnits="userSpaceOnUse" x1={INTRO_O.x0} x2={INTRO_O.x1} y1="0" y2="0">
            {LOGO_O_STOPS.map((c, i) => (
              <stop key={c} offset={i / (LOGO_O_STOPS.length - 1)} stopColor={c} />
            ))}
          </linearGradient>
          {/* A thick stroke sweeping round the ring reveals it as if drawn. */}
          <mask id="intro-o-draw" maskUnits="userSpaceOnUse">
            <circle
              className={styles.introDraw}
              cx={LOGO_O_CENTER.cx}
              cy={LOGO_O_CENTER.cy}
              r="78"
              fill="none"
              stroke="#fff"
              strokeWidth="58"
              pathLength={1}
              transform={`rotate(-90 ${LOGO_O_CENTER.cx} ${LOGO_O_CENTER.cy})`}
            />
          </mask>
        </defs>
        <g className={styles.introBiz}>
          {INTRO_LEFT.map((g) => (
            <path key={g.key} d={g.d} fillRule="evenodd" />
          ))}
        </g>
        <g className={styles.introRa}>
          {INTRO_RIGHT.map((g) => (
            <path key={g.key} d={g.d} fillRule="evenodd" />
          ))}
        </g>
        <g className={styles.introO}>
          <path d={INTRO_O_RING} fillRule="evenodd" fill="url(#intro-o)" mask="url(#intro-o-draw)" />
          <path className={styles.introODot} d={INTRO_O_DOT} fill="url(#intro-o)" />
        </g>
      </svg>
    </div>
    <section ref={heroRef} id="top" className={styles.hero} aria-labelledby="hero-heading">
      {/* z 0–2: living plasma under a soft white falloff — decorative */}
      <div
        className={styles.heroBg}
        aria-hidden="true"
        style={
          {
            "--plasma-poster-d": `url(${PLASMA_POSTER.desktop})`,
            "--plasma-poster-m": `url(${PLASMA_POSTER.mobile})`,
          } as React.CSSProperties
        }
      >
        <div className={styles.plasmaWrap}>
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
        </ul>
      </div>
    </section>
    </>
  );
}
