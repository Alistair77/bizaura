import Image from "next/image";
import { Wordmark } from "@/components/brand/Wordmark";
import { Plasma } from "@/components/hero/Plasma";
import { HandArrow } from "@/components/ui/HandArrow";
import { Icon } from "@/components/ui/Icon";
import { TornEdge } from "@/components/ui/TornEdge";
import { ROLES } from "@/content/home";
import styles from "./WhoWeWorkWith.module.css";

const QR_SIZE = 9;

/** Badge rotation per role — subtle, hand-placed. */
const BADGE_ROT = ["-4deg", "2deg", "-2deg", "3deg"];
/** Backing paper rotation per role. */
const PAPER_ROT = ["-2deg", "2deg", "-1deg", "2deg"];
/** Vertical stagger per role — organised but not grid-rigid. */
const DROP = ["0px", "30px", "12px", "42px"];

/** Decorative, deterministic QR-like pattern (not a real code). */
function qrCells(seed: string) {
  let h = 2166136261;
  for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  const cells: [number, number][] = [];
  const isFinder = (x: number, y: number) => (x < 3 && y < 3) || (x > 5 && y < 3) || (x < 3 && y > 5);
  for (let y = 0; y < QR_SIZE; y++) {
    for (let x = 0; x < QR_SIZE; x++) {
      if (isFinder(x, y)) continue;
      h = Math.imul(h ^ (h >>> 13), 1274126177);
      if ((h >>> 0) % 2) cells.push([x, y]);
    }
  }
  return cells;
}

function PassQr({ seed }: { seed: string }) {
  const finder = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width="3" height="3" fill="currentColor" />
      <rect x={x + 0.6} y={y + 0.6} width="1.8" height="1.8" fill="#fff" />
      <rect x={x + 1.1} y={y + 1.1} width="0.8" height="0.8" fill="currentColor" />
    </g>
  );
  return (
    <svg className={styles.qr} viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} aria-hidden="true" focusable="false">
      {finder(0, 0)}
      {finder(6, 0)}
      {finder(0, 6)}
      {qrCells(seed).map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="currentColor" />
      ))}
    </svg>
  );
}

export function WhoWeWorkWith() {
  return (
    <section id="who-we-work-with" className={styles.section} aria-labelledby="roles-heading">
      <div className="grain" aria-hidden="true" />
      {/* Hero plasma carried down — slightly deeper than the Engage band. */}
      <div className={styles.rolesPlasma} aria-hidden="true">
        <Plasma
          speed={0.3}
          direction="pingpong"
          scale={1.5}
          opacity={0.4}
          mouseInteractive={false}
          renderScale={0.28}
          maxDpr={1.25}
          targetFps={30}
          iterations={32}
          lightMode={true}
        />
      </div>
      {/* Dark charcoal sheet behind the passes — part of the paper collage. */}
      <div className={styles.darkSheet} aria-hidden="true">
        <TornEdge edge="left" fill="#ffffff" seed={41} depth={44} />
      </div>

      <div className="container">
        <p className={`eyebrow ${styles.marker}`} data-reveal>
          <span className="eyebrow__num">05</span> Who we work with <span className="eyebrow__rule" />
        </p>

        <div className={styles.layout}>
          <div className={styles.editorial}>
            <div data-reveal style={{ "--reveal-delay": "100ms" } as React.CSSProperties}>
              <h2 id="roles-heading" className={`display ${styles.heading}`}>
                <span className={styles.hLine}>Different</span>
                <span className={styles.hLine}>roles.</span>
                <span className={`${styles.hLine} accent-text`}>A shared</span>
                <span className={`${styles.hLine} accent-text`}>purpose.</span>
              </h2>
              <p className={styles.lead}>
                Different passes.
                <br />A shared purpose.
              </p>
            </div>
            <p
              className={`hand ${styles.note}`}
              aria-hidden="true"
              data-reveal
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              Same room.
              <br />
              Different roles.
              <br />
              Bigger outcomes.
              <HandArrow variant="sweepDownRight" className={styles.noteArrow} />
            </p>
          </div>

          <ul className={styles.passes} aria-label="Roles at Bizora">
            {ROLES.map((item, i) => (
              <li
                key={item.role}
                className={styles.passWrap}
                data-accent={item.accent}
                data-reveal
                style={
                  {
                    "--rot": BADGE_ROT[i % BADGE_ROT.length],
                    "--paper-rot": PAPER_ROT[i % PAPER_ROT.length],
                    "--drop": DROP[i % DROP.length],
                    "--reveal-delay": `${300 + i * 100}ms`,
                  } as React.CSSProperties
                }
              >
                {/* Coloured backing paper — secondary layer, mostly covered. */}
                <div className={styles.paper} aria-hidden="true" />
                {/* Branded fabric lanyard running off above the badge. */}
                <div className={styles.lanyard} aria-hidden="true">
                  <span className={styles.lanyardText}>Bizora · Bizora · Bizora · Bizora ·&nbsp;</span>
                </div>
                <span className={styles.ring} aria-hidden="true" />

                <article className={styles.badge} aria-label={`${item.role} pass`}>
                  <div className={styles.badgeHead}>
                    <Wordmark className={styles.badgeBrand} />
                  </div>
                  <div className={styles.photo}>
                    <Image
                      src={item.image.src}
                      alt=""
                      fill
                      sizes="200px"
                      quality={70}
                      loading="lazy"
                    />
                  </div>
                  <p className={styles.roleStrip}>{item.role}</p>
                  <p className={styles.desc}>{item.body}</p>
                  <div className={styles.badgeFoot}>
                    <PassQr seed={item.role} />
                    <p className={styles.access}>
                      Access
                      <br />
                      Connections
                      <br />
                      Opportunities
                    </p>
                    <Icon name="arrow" size={20} className={styles.footArrow} />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
