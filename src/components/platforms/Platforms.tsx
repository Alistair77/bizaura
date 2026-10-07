import { CinematicPhoto } from "@/components/cinematic/CinematicPhoto";
import { Plasma } from "@/components/hero/Plasma";
import { Icon } from "@/components/ui/Icon";
import { PHOTOS, PLATFORM_TIMELINE } from "@/content/home";
import styles from "./Platforms.module.css";

export function Platforms() {
  return (
    <section id="platforms" className={styles.section} aria-labelledby="platforms-heading">
      <div className={styles.media}>
        <CinematicPhoto photo={PHOTOS.platforms} sizes="100vw" position="62% 50%" depth={1} />
        <div className={styles.shade} />
      </div>
      {/* Whisper of hero plasma — the photograph stays the priority. */}
      <div className={styles.platformsPlasma} aria-hidden="true">
        <Plasma
          speed={0.3}
          direction="pingpong"
          scale={1.5}
          opacity={0.28}
          mouseInteractive={false}
          renderScale={0.35}
          maxDpr={1.2}
          targetFps={24}
          iterations={40}
          lightMode={true}
        />
      </div>

      <div className={`container ${styles.layout}`}>
        <div className={styles.story} data-reveal>
          <p className={styles.label}>Bespoke experiences</p>
          <h2 id="platforms-heading" className={`display ${styles.heading}`}>
            <span className={styles.row}>We create</span>
            <span className={`${styles.row} ${styles.violet}`}>platforms</span>
            <span className={styles.row}>where things</span>
            <span className={`${styles.row} ${styles.pink}`}>happen.</span>
          </h2>
          <a className="btn" href="#admit-one">
            Get in the room <Icon name="arrow" size={16} className="btn__arrow" />
          </a>
        </div>

        <ol className={styles.timeline} data-reveal aria-label="What happens in the room">
          {PLATFORM_TIMELINE.map((step, i) => (
            <li
              key={step.num}
              className={styles.step}
              data-accent={step.accent}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span className={styles.node} aria-hidden="true">
                {step.num}
              </span>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
          <li className={`${styles.step} ${styles.closing}`} style={{ "--i": PLATFORM_TIMELINE.length } as React.CSSProperties}>
            <span className={styles.node} aria-hidden="true">
              →
            </span>
            <p className={styles.closingText}>
              We like putting interesting people in <em>interesting rooms</em>. Because that’s where things happen.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
