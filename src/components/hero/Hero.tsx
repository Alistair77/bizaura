'use client';

import { useEffect, useRef } from "react";
import { INDUSTRIES } from "@/content/home";
import { Icon } from "@/components/ui/Icon";
import { Connectors } from "./Connectors";
import { GlassCard } from "./GlassCard";
import { HandArrow } from "./HandArrow";
import { HandNote } from "./HandNote";
import { HeroLogo } from "./HeroLogo";
import { Plasma } from "./Plasma";
import styles from "./Hero.module.css";

/**
 * BIZORA landing hero v2 — 1672×941 reference recreation.
 * Navbar overlays from <header>; this section owns the background,
 * left content column, glass cards, connectors and hand note.
 */
export function Hero() {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Static fallback gradient shows ONLY when WebGL actually failed:
  // the Plasma component appends no <canvas> on renderer failure.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const el = wrapRef.current;
      if (el && !el.querySelector("canvas")) el.classList.add(styles.isFallback);
    }, 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.heroBg} aria-hidden="true">
        <div ref={wrapRef} className={styles.plasmaWrap}>
          <Plasma
            speed={0.3}
            direction="pingpong"
            scale={1.2}
            opacity={0.7}
            mouseInteractive={true}
            renderScale={0.55}
            maxDpr={1.5}
            targetFps={50}
            iterations={64}
            lightMode={true}
          />
          <div className={styles.plasmaStatic} />
        </div>
        <div className={styles.wash} />
        <div className={styles.grain} />
      </div>

      <div className={styles.content}>
        <HeroLogo />

        <p className={styles.tagline} aria-label="Where builders, ideas and opportunities meet.">
          <span className={styles.tagText} aria-hidden="true">
            Where builders, ideas
            <br />
            and opportunities meet.
          </span>
          <HandArrow className={styles.tagArrow} />
        </p>

        <h1 id="hero-heading" className={styles.headline}>
          <span className={`${styles.line} ${styles.halo}`}>Where access</span>
          <span className={`${styles.line} ${styles.halo}`}>turns into</span>
          <span className={`${styles.line} ${styles.gradient}`}>outcomes.</span>
        </h1>

        <p className={styles.sub}>
          We bring the right intelligence, with the right media,
          <br />
          to the right people, for the right opportunities.
        </p>

        <div className={styles.ctas}>
          <a className={`${styles.btn} ${styles.primary}`} href="#what-we-build">
            See what we build
            <Icon name="arrow" size={22} strokeWidth={2} className={styles.btnArrow} />
          </a>
          <a className={`${styles.btn} ${styles.secondary}`} href="#admit-one">
            Start a conversation
          </a>
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
          <li className={`${styles.chip} ${styles.chipMore}`}>+ more</li>
        </ul>
      </div>

      <div className={styles.cards} aria-hidden="false">
        <GlassCard
          className={styles.pos1}
          icon="people"
          gradientFrom="#FF9A5A"
          gradientTo="#F2667A"
          iconShadow="rgba(242, 102, 122, 0.35)"
          title="Opportunities"
          lines={["Discover and access", "meaningful opportunities."]}
          href="#what-we-build"
          label="Opportunities — Discover and access meaningful opportunities."
          arrowTop
        />
        <GlassCard
          className={styles.pos2}
          icon="chatDots"
          gradientFrom="#8F7BFF"
          gradientTo="#5A5AE8"
          iconShadow="rgba(90, 90, 232, 0.35)"
          title="Reach"
          lines={["Get in front of the right", "audience and stakeholders."]}
          href="#platforms"
          label="Reach — Get in front of the right audience and stakeholders."
        />
        <GlassCard
          className={styles.pos3}
          icon="sprout"
          gradientFrom="#6EE0A8"
          gradientTo="#2FB57A"
          iconShadow="rgba(47, 181, 122, 0.35)"
          title="Access"
          lines={["Connect with the right", "people, knowledge and resources."]}
          href="#how-we-engage"
          label="Access — Connect with the right people, knowledge and resources."
          arrowTop
        />
      </div>

      <Connectors />
      <HandNote />
    </section>
  );
}
