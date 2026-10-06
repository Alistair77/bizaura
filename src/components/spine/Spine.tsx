"use client";

import { useState } from "react";
import Image from "next/image";
import { HandArrow } from "@/components/ui/HandArrow";
import { Icon } from "@/components/ui/Icon";
import { BASE_PATH, SPINE_PILLARS } from "@/content/home";
import styles from "./Spine.module.css";

/**
 * Supplied bottom background (blurred crowd, stage glow).
 * Place the file at public/images/spine-crowd.jpg.
 */
const CROWD_SRC = `${BASE_PATH}/images/spine-crowd.jpg`;

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
} as const;

type Accent = keyof typeof ICONS;

const JOURNEY = [
  { label: "Right decisions", sub: "Better decisions", accent: "violet", top: 52 },
  { label: "Right stories", sub: "Stronger stories", accent: "blue", top: 36 },
  { label: "Right networks", sub: "Bigger networks", accent: "pink", top: 54 },
  { label: "Right outcomes", sub: "Real outcomes", accent: "violet", top: 35 },
] as const;

export function Spine() {
  const [crowdOk, setCrowdOk] = useState(true);

  return (
    <section id="spine" className={styles.section} aria-labelledby="spine-heading" data-reveal>
      <div className={styles.dust} aria-hidden="true" />
      <div className={styles.tornTL} aria-hidden="true" />

      <div className={`container ${styles.layout}`}>
        <div className={styles.intro}>
          <p className={`eyebrow ${styles.kicker}`}>
            <span className="eyebrow__num">02</span> Our spine <span className="eyebrow__rule" />
          </p>
          <h2 id="spine-heading" className={`display ${styles.heading}`}>
            <span className={styles.hLine}>
              <span className={styles.rightFx}>Right</span> things.
            </span>
            <span className={styles.hLine}>
              In the <span className={styles.rightFx}>right</span>
            </span>
            <span className={`${styles.hLine} ${styles.hOrder}`}>order.</span>
          </h2>
          <p className={styles.lead}>
            Intelligence, media, people and opportunities — working together to create real outcomes across
            industries.
          </p>
          <a className={styles.approach} href="#how-we-engage">
            <span className={styles.circle}>
              <Icon name="arrow" size={18} className={styles.circleArrow} />
            </span>
            <span className={styles.approachText}>Explore our approach</span>
            <span className={styles.approachTail} aria-hidden="true">
              →
            </span>
          </a>
          <span className={styles.spineRule} aria-hidden="true" />
        </div>

        <div className={styles.stage}>
          <ol className={styles.pillars}>
            {SPINE_PILLARS.map((pillar, i) => {
              const [first, ...rest] = pillar.title.split(" ");
              return (
                <li
                  key={pillar.num}
                  className={styles.pillar}
                  data-accent={pillar.accent}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <Image
                    className={styles.pillarImg}
                    src={pillar.image.src}
                    alt={pillar.image.alt}
                    fill
                    sizes="(min-width: 900px) 22vw, 100vw"
                    quality={70}
                    loading={i === 0 ? "eager" : "lazy"}
                  />
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
                      <br />
                      {rest.join(" ")}
                    </h3>
                    <p className={styles.pillarBody}>{pillar.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>

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
            <span className={styles.finishTag}>The right finish →</span>
          </div>

          {/* Vertical journey for small screens (horizontal wave hidden). */}
          <ol className={styles.journeyV} aria-label="Journey milestones">
            {JOURNEY.map((node) => (
              <li key={node.label} className={styles.nodeV} data-accent={node.accent}>
                <span className={styles.dotV} />
                <span className={styles.nodeLabelV}>
                  {node.label}
                  <span className={styles.nodeSub}>{node.sub}</span>
                </span>
              </li>
            ))}
          </ol>

          <p className={`hand ${styles.note}`} aria-hidden="true">
            <span className={styles.startTag}>Start right</span>
            Ideas.
            <br />
            People.
            <br />
            Industries.
            <br />
            Opportunities.
            <span className={styles.noteUnderline} />
            <HandArrow variant="flickRight" className={styles.noteArrow} />
          </p>
        </div>
      </div>

      <div className={styles.photoBand}>
        {crowdOk && (
          <Image
            src={CROWD_SRC}
            alt="Blurred conference crowd seen from behind facing a glowing stage"
            fill
            sizes="100vw"
            quality={75}
            loading="lazy"
            className={styles.crowdImg}
            onError={() => setCrowdOk(false)}
          />
        )}
        <div className={styles.crowdWash} aria-hidden="true" />
        <div className={styles.crowdShade} aria-hidden="true" />
      </div>
      <span className={styles.tornBR} aria-hidden="true" />
    </section>
  );
}
