"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plasma } from "@/components/hero/Plasma";
import { Icon } from "@/components/ui/Icon";
import { scrollToNextSection } from "@/components/ui/ScrollArrows";
import { ENGAGE_STAGES } from "@/content/home";
import styles from "./HowWeEngage.module.css";

const LAST = ENGAGE_STAGES.length - 1;
/** Pinned scroll length on desktop: ~90vh of scroll per stage. */
const PIN_VH = 460;
const STEP01_ALT = "Five colleagues in a business meeting around a table";

/**
 * Pinned 5-step journey on desktop: the section stays in view while scrolling
 * advances Understand → Deliver, then releases into the next section.
 * Click / keyboard / swipe / dashes all drive the same state by scrolling
 * the pin (or setting the stage directly when unpinned / reduced motion).
 */
export function HowWeEngage() {
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touchX = useRef<number | null>(null);
  const reduceRef = useRef(false);

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(min-width: 1280px)");
    const apply = () => setPinned(mq.matches && !reduceRef.current);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const indexFromScroll = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return 0;
    const vh = window.innerHeight || 1;
    const max = Math.max(1, el.offsetHeight - vh);
    const p = Math.min(1, Math.max(0, (window.scrollY - el.offsetTop) / max));
    return Math.min(LAST, Math.floor(p * ENGAGE_STAGES.length));
  }, []);

  // Scroll drives the stage while pinned (01 on arrival → 05 at release).
  useEffect(() => {
    if (!pinned) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      setActive((prev) => {
        const next = indexFromScroll();
        return prev === next ? prev : next;
      });
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
    };
  }, [pinned, indexFromScroll]);

  const goTo = useCallback(
    (index: number, moveFocus = false) => {
      const clamped = Math.max(0, Math.min(LAST, index));
      const el = wrapRef.current;
      if (pinned && el && !reduceRef.current) {
        const vh = window.innerHeight || 1;
        const max = Math.max(1, el.offsetHeight - vh);
        window.scrollTo({
          top: el.offsetTop + (max * (clamped + 0.5)) / ENGAGE_STAGES.length,
          behavior: "smooth",
        });
      } else {
        setActive(clamped);
      }
      if (moveFocus) tabRefs.current[clamped]?.focus();
    },
    [pinned],
  );

  const handleTabKey = (e: React.KeyboardEvent, index: number) => {
    const keyMap: Record<string, number> = {
      ArrowRight: index === LAST ? 0 : index + 1,
      ArrowLeft: index === 0 ? LAST : index - 1,
      Home: 0,
      End: LAST,
    };
    if (!(e.key in keyMap)) return;
    e.preventDefault();
    goTo(keyMap[e.key], true);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 48) return;
    goTo(active + (dx < 0 ? 1 : -1));
  };

  const stage = ENGAGE_STAGES[active];
  const nextStage = active < LAST ? ENGAGE_STAGES[active + 1] : null;
  const progress = (active + (active < LAST ? 0.5 : 0)) / LAST;

  return (
    <div ref={wrapRef} id="how-we-engage" className={styles.pin} style={pinned ? { height: `${PIN_VH}vh` } : undefined}>
      <section
        className={`${styles.section} ${pinned ? styles.stuck : ""}`}
        aria-labelledby="engage-heading"
        role="region"
        aria-roledescription="carousel"
        aria-label="How we engage"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Hero plasma carried down: quiet silk band behind the journey. */}
        <div className={styles.engagePlasma} aria-hidden="true">
          <Plasma
            speed={0.3}
            direction="pingpong"
            scale={1.4}
            opacity={0.35}
            mouseInteractive={false}
            renderScale={0.28}
            maxDpr={1.25}
            targetFps={30}
            iterations={32}
            lightMode={true}
          />
        </div>
        <div className={styles.grain} aria-hidden="true" />
        <span className={`${styles.dust} ${styles.dustA}`} aria-hidden="true" />
        <span className={`${styles.dust} ${styles.dustB}`} aria-hidden="true" />
        <span className={`${styles.dust} ${styles.dustC}`} aria-hidden="true" />
        <div className={styles.ghostA} aria-hidden="true" />
        <div className={styles.ghostB} aria-hidden="true" />

        <div className={styles.viewport}>
          {/* A. Left column */}
          <p className={styles.brandTitle} data-reveal>
            How we engage
          </p>
          <span className={styles.spine} aria-hidden="true" />
          <div className={styles.copy} data-reveal>
            <h2 id="engage-heading" className={styles.headline}>
              <span className={styles.hLine}>From insight</span>
              <span className={styles.hLine}>to opportunity,</span>
              <span className={styles.hLine}>we help you</span>
              <span className={`${styles.hLine} accent-text`}>go further.</span>
            </h2>
            <p className={styles.para}>
              A structured approach that turns conversations into meaningful engagement and real opportunities.
            </p>
          </div>
          <a className={styles.cta} href="#engage-panel" data-reveal>
            <span className={styles.ctaText}>See how it works</span>
            <Icon name="arrow" size={24} strokeWidth={2} className={styles.ctaArrow} />
          </a>

          {/* B. Stepper */}
          <div className={styles.stepper} role="tablist" aria-label="Engagement stages" data-reveal>
            <span className={styles.track} aria-hidden="true">
              <span className={styles.trackFill} style={{ transform: `scaleX(${progress})` }} />
            </span>
            {ENGAGE_STAGES.map((s, i) => (
              <button
                key={s.num}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`engage-tab-${i}`}
                aria-selected={i === active}
                aria-controls="engage-panel"
                aria-label={`Step ${s.num}: ${s.title}`}
                tabIndex={i === active ? 0 : -1}
                className={styles.node}
                data-state={i < active ? "done" : i === active ? "active" : "todo"}
                style={{ "--x": `${[8.1, 29.6, 51.1, 72.7, 94.3][i]}%` } as React.CSSProperties}
                onClick={() => goTo(i)}
                onKeyDown={(e) => handleTabKey(e, i)}
              >
                <span className={styles.dot}>{s.num}</span>
                <span className={styles.nodeLabel}>{s.title}</span>
              </button>
            ))}
          </div>

          {/* C. Image card */}
          <div className={styles.cardWrap} data-reveal>
            <div className={styles.card}>
              {ENGAGE_STAGES.map((s, i) => (
                <Image
                  key={s.num}
                  className={styles.cardImg}
                  data-active={i === active}
                  src={s.image.src}
                  alt={i === 0 ? STEP01_ALT : s.image.alt}
                  aria-hidden={i !== active}
                  fill
                  sizes="(min-width: 1280px) 30vw, (min-width: 768px) 90vw, 100vw"
                  quality={70}
                  loading={i === 0 || i === active + 1 ? "eager" : "lazy"}
                />
              ))}
              <div className={styles.vignette} aria-hidden="true" />
            </div>
            <button
              type="button"
              className={`${styles.arrowBtn} ${styles.prevBtn}`}
              aria-label="Previous stage"
              disabled={active === 0}
              onClick={() => goTo(active - 1)}
            >
              <Icon name="arrowLeft" size={28} strokeWidth={2} />
            </button>
            {/* Phones: next sits on the card beside prev (the section-level arrow is hidden there). */}
            <button
              type="button"
              className={`${styles.arrowBtn} ${styles.nextBtnCard} ${active === LAST ? styles.arrowDown : ""}`}
              aria-label={active === LAST ? "Continue to the next section" : "Next stage"}
              onClick={(e) => (active === LAST ? scrollToNextSection(e.currentTarget) : goTo(active + 1))}
            >
              <Icon name="arrow" size={28} strokeWidth={2} className={styles.arrowIcon} />
            </button>
          </div>

          {/* D. Step detail */}
          <div id="engage-panel" data-reveal role="tabpanel" aria-labelledby={`engage-tab-${active}`} className={styles.detail}>
            <div key={stage.num} className={styles.detailInner} aria-live="polite">
              <p className={`${styles.bigNum} accent-text`}>{stage.num}</p>
              <h3 className={styles.detailTitle}>{stage.title}</h3>
              <p className={styles.detailSub}>{stage.summary}</p>
              <span className={styles.divider} aria-hidden="true" />
              <p className={styles.detailBody}>{stage.detail}</p>
              {nextStage ? (
                <button type="button" className={styles.nextRow} onClick={() => goTo(active + 1)}>
                  <span className={styles.nextText}>
                    Next: <strong>{nextStage.title}</strong>
                  </span>
                  <span className={styles.nextLine} aria-hidden="true">
                    <svg viewBox="0 0 320 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M0 8 H304 M292 1 L306 8 L292 15" />
                    </svg>
                  </span>
                </button>
              ) : (
                <a className={styles.nextRow} href="#admit-one">
                  <span className={styles.nextText}>
                    Next: <strong>Start a conversation</strong>
                  </span>
                  <span className={styles.nextLine} aria-hidden="true">
                    <svg viewBox="0 0 320 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M0 8 H304 M292 1 L306 8 L292 15" />
                    </svg>
                  </span>
                </a>
              )}
            </div>
          </div>

          {/* E. Next arrow */}
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.nextBtn} ${active === LAST ? styles.arrowDown : ""}`}
            aria-label={active === LAST ? "Continue to the next section" : "Next stage"}
            onClick={(e) => (active === LAST ? scrollToNextSection(e.currentTarget) : goTo(active + 1))}
          >
            <Icon name="arrow" size={28} strokeWidth={2} className={styles.arrowIcon} />
          </button>

          {/* F. Pagination dashes */}
          <div className={styles.dashes} data-reveal role="group" aria-label="Steps">
            {ENGAGE_STAGES.map((s, i) => (
              <button
                key={s.num}
                type="button"
                className={styles.dash}
                data-active={i === active}
                aria-label={`Go to step ${s.num}: ${s.title}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        <TornPaper />
      </section>
    </div>
  );
}

/** G. Hand-torn paper edge with turbulence displacement + grain. */
function TornPaper() {
  return (
    <svg className={styles.torn} viewBox="0 0 1983 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <filter id="engageTorn" x="-5%" y="-30%" width="110%" height="160%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="14" />
        </filter>
        <filter id="engagePaperGrain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="3" result="g" />
          <feColorMatrix in="g" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
      <path
        d="M0,4 C150,2 300,8 400,12 C550,20 700,28 950,40 C1100,44 1250,30 1500,22 C1700,18 1900,16 1983,17 L1983,100 L0,100 Z"
        fill="var(--paper)"
        filter="url(#engageTorn)"
      />
      <path
        d="M0,4 C150,2 300,8 400,12 C550,20 700,28 950,40 C1100,44 1250,30 1500,22 C1700,18 1900,16 1983,17"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.6"
        strokeWidth="1.5"
        transform="translate(0 1.5)"
        filter="url(#engageTorn)"
      />
      <g fill="#8f8f8a" opacity="0.07" filter="url(#engageTorn)">
        <ellipse cx="300" cy="70" rx="180" ry="22" />
        <ellipse cx="1100" cy="60" rx="260" ry="26" />
        <ellipse cx="1750" cy="72" rx="200" ry="20" />
      </g>
      <rect x="0" y="0" width="1983" height="100" filter="url(#engagePaperGrain)" opacity="0.08" />
    </svg>
  );
}
