"use client";

import { useRef } from "react";
import Image from "next/image";
import { Plasma } from "@/components/hero/Plasma";
import { ScrollArrows } from "@/components/ui/ScrollArrows";
import { SPINE_PILLARS } from "@/content/home";
import styles from "./Spine.module.css";

const ICONS = {
  violet: (
    <path d="M4 20v-6M10 20V7M16 20v-9M2.5 20h19" />
  ),
  blue: (
    <>
      <rect x="2.5" y="7" width="12" height="10" rx="2" />
      <path d="M14.5 10.5 21.5 7v10l-7-3.5" />
    </>
  ),
  pink: (
    <path d="M15.5 19v-1.2a3.2 3.2 0 0 0-3.2-3.2H7.2a3.2 3.2 0 0 0-3.2 3.2V19M9.7 10.4a3.3 3.3 0 1 0 0-6.6 3.3 3.3 0 0 0 0 6.6ZM18.5 19v-1.2a3.2 3.2 0 0 0-2.3-3.1M15 4.1a3.3 3.3 0 0 1 0 6.2" />
  ),
  red: (
    <path d="M3 10.5 7 7l4.5 1.8L16.5 7l4.5 3.5-3.5 4.5-2.8-1.8-2.2 1.8-2.2-1.8-1.8 1.8L3 10.5Z" />
  ),
  navy: (
    <path d="M3 10.5 7 7l4.5 1.8L16.5 7l4.5 3.5-3.5 4.5-2.8-1.8-2.2 1.8-2.2-1.8-1.8 1.8L3 10.5Z" />
  ),
} as const;

type Accent = keyof typeof ICONS;

const JOURNEY = [
  { label: "Right decisions", sub: "Better decisions", accent: "violet", top: 52 },
  { label: "Right stories", sub: "Stronger stories", accent: "blue", top: 36 },
  { label: "Right networks", sub: "Bigger networks", accent: "pink", top: 54 },
  { label: "Right outcomes", sub: "Real outcomes", accent: "violet", top: 35 },
] as const;

/**
 * Phone journey: the desktop wave turned on its side — a zig-zag in a 100×100 box whose
 * turning points are the nodes (x 18% / 82%, y in ZIG_Y), so each dot sits on a crest.
 */
const ZIG_Y = [8, 36, 64, 92] as const;
const ZIGZAG = "M 18 8 C 18 22, 82 22, 82 36 C 82 50, 18 50, 18 64 C 18 78, 82 78, 82 92";

export function Spine() {
  const pillarsRef = useRef<HTMLOListElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  return (
    <section id="spine" className={styles.section} aria-labelledby="spine-heading" data-reveal>
      {/* Faint hero-plasma wash — light, never hyper. */}
      <div className={styles.spinePlasma} aria-hidden="true">
        <Plasma
          speed={0.3}
          direction="pingpong"
          scale={1.5}
          opacity={0.3}
          mouseInteractive={false}
          renderScale={0.28}
          maxDpr={1.2}
          targetFps={30}
          iterations={32}
          lightMode={true}
        />
      </div>
      <div className={styles.dust} aria-hidden="true" />

      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <h2 id="spine-heading" className={`display ${styles.heading}`}>
            <span className={styles.hLine}>
              Everything in the right <span className={styles.hOrder}>order.</span>
            </span>
          </h2>
          <p className={styles.lead}>
            Intelligence, media, people and opportunities — working together to create real outcomes across
            industries.
          </p>
          <span className={styles.spineRule} aria-hidden="true" />
        </div>

        <div className={styles.stage}>
          <ol ref={pillarsRef} className={styles.pillars}>
            {SPINE_PILLARS.map((pillar, i) => {
              const [first, ...rest] = pillar.title.split(" ");
              const remainder = rest.join(" ");
              return (
                <li
                  key={pillar.num}
                  className={styles.pillar}
                  data-accent={pillar.accent}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <div className={styles.pillarImgWrap}>
                    <Image
                      className={styles.pillarImg}
                      src={pillar.image.src}
                      alt={pillar.image.alt}
                      fill
                      sizes="(min-width: 900px) 22vw, 100vw"
                      quality={70}
                      loading={i === 0 ? "eager" : "lazy"}
                    />
                  </div>
                  <span className={styles.num} aria-hidden="true">
                    {pillar.num}
                  </span>
                  <div className={styles.pillarText}>
                    <span className={styles.badge} aria-hidden="true">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        {ICONS[pillar.accent as Accent]}
                      </svg>
                    </span>
                    <h3 className={styles.pillarTitle}>
                      <span className={styles.rightFx}>{first}</span>
                      {remainder ? (
                        <>
                          <br />
                          {remainder}
                        </>
                      ) : null}
                    </h3>
                    <p className={styles.pillarBody}>{pillar.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <ScrollArrows targetRef={pillarsRef} continueRef={journeyRef} label="Browse the four pillars" />

          <div className={styles.journey} aria-hidden="true">
            <svg className={styles.path} viewBox="0 0 1000 200" preserveAspectRatio="none">
              <defs>
                <linearGradient id="spineJourney" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0" stopColor="#7B3FF2" />
                  <stop offset="0.38" stopColor="#2563FF" />
                  <stop offset="0.68" stopColor="#FF2E93" />
                  <stop offset="1" stopColor="#7B3FF2" />
                </linearGradient>
              </defs>
              <path
                className={styles.pathLine}
                d="M -12 152 C 55 142, 85 118, 125 105 C 175 88, 225 58, 295 60 C 335 61, 352 66, 375 72 C 430 82, 485 60, 548 82 C 592 95, 608 103, 625 108 C 688 120, 735 58, 802 57 C 838 56, 856 63, 875 70 C 918 82, 962 54, 1012 58"
                fill="none"
                stroke="url(#spineJourney)"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
              />
            </svg>
            {/* Pulse lives in its own filter-free layer: animating it inside the glowing
                (drop-shadow) SVG repainted the whole filtered line every frame. */}
            <svg className={styles.pulse} viewBox="0 0 1000 200" preserveAspectRatio="none" aria-hidden="true">
              {/* Live pulse travelling the journey, independent of scroll. */}
              <path
                className={styles.flowPulse}
                d="M -12 152 C 55 142, 85 118, 125 105 C 175 88, 225 58, 295 60 C 335 61, 352 66, 375 72 C 430 82, 485 60, 548 82 C 592 95, 608 103, 625 108 C 688 120, 735 58, 802 57 C 838 56, 856 63, 875 70 C 918 82, 962 54, 1012 58"
                fill="none"
                stroke="#ffffff"
                strokeWidth="3"
                strokeLinecap="round"
                pathLength={1}
                aria-hidden="true"
              />
            </svg>
            <ul className={styles.nodes}>
              {JOURNEY.map((node, i) => (
                <li
                  key={node.label}
                  className={styles.node}
                  data-accent={node.accent}
                  style={{ "--i": i, "--ny": `${node.top}%` } as React.CSSProperties}
                >
                  <span className={styles.connector} />
                  <span className={styles.dot}>
                    <span className={styles.halo} />
                  </span>
                  <span className={styles.nodeLabel}>
                    <span className={styles.rightFx}>{node.label.split(" ")[0]}</span>{" "}
                    {node.label.split(" ").slice(1).join(" ")}
                    <span className={styles.nodeSub}>{node.sub}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Phone journey: zig-zag wave with the same glowing nodes (horizontal wave hidden). */}
          <div ref={journeyRef} className={styles.journeyV}>
            <svg className={styles.pathV} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <linearGradient id="spineJourneyV" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7B3FF2" />
                  <stop offset="0.38" stopColor="#2563FF" />
                  <stop offset="0.68" stopColor="#FF2E93" />
                  <stop offset="1" stopColor="#7B3FF2" />
                </linearGradient>
              </defs>
              <path
                d={ZIGZAG}
                fill="none"
                stroke="url(#spineJourneyV)"
                strokeWidth="3"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <ol className={styles.nodesV} aria-label="Journey milestones">
              {JOURNEY.map((node, i) => (
                <li
                  key={node.label}
                  className={styles.nodeV}
                  data-accent={node.accent}
                  data-side={i % 2 === 0 ? "left" : "right"}
                  style={{ "--i": i, "--ny": `${ZIG_Y[i]}%` } as React.CSSProperties}
                >
                  <span className={styles.dotV}>
                    <span className={styles.halo} />
                  </span>
                  <span className={styles.nodeLabelV}>
                    <span>
                      <span className={styles.rightFx}>{node.label.split(" ")[0]}</span>{" "}
                      {node.label.split(" ").slice(1).join(" ")}
                    </span>
                    <span className={styles.nodeSub}>{node.sub}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
