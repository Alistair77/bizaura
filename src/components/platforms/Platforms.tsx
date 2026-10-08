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
          renderScale={0.28}
          maxDpr={1.2}
          targetFps={30}
          iterations={32}
          lightMode={true}
        />
      </div>

      <div className={`container ${styles.layout}`}>
        <div className={styles.story} data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__num">04</span> Bespoke experiences <span className="eyebrow__rule" />
          </p>
          <h2 id="platforms-heading" className={`display ${styles.heading}`}>
            We create platforms where things <span className="accent-text">happen.</span>
          </h2>
          <a className="btn" href="#admit-one">
            Get in the room <Icon name="arrow" size={16} className="btn__arrow" />
          </a>
        </div>

        <ol className={styles.steps} aria-label="What happens in the room">
          {PLATFORM_TIMELINE.map((step, i) => (
            <li
              key={step.num}
              className={styles.step}
              data-accent={step.accent}
              data-reveal
              style={{ "--reveal-delay": `${i * 120}ms` } as React.CSSProperties}
            >
              <div className={styles.stepHead}>
                <span className={styles.stepIcon} aria-hidden="true">
                  <Icon name={step.icon} size={22} />
                </span>
                <span className={styles.stepLabel}>In the room · {step.num}</span>
              </div>
              <p className={styles.stepText}>{step.text}</p>
              <svg className={styles.stepArc} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="90 300" />
              </svg>
            </li>
          ))}
          <li
            className={`${styles.step} ${styles.closing}`}
            data-reveal
            style={{ "--reveal-delay": `${PLATFORM_TIMELINE.length * 120}ms` } as React.CSSProperties}
          >
            <div className={styles.stepHead}>
              <span className={styles.stepIcon} aria-hidden="true">
                <Icon name="arrow" size={22} />
              </span>
              <span className={styles.stepLabel}>Where things happen</span>
            </div>
            <p className={styles.closingText}>
              We like putting interesting people in <em>interesting rooms</em>. Because that’s where things happen.
            </p>
          </li>
        </ol>
      </div>
    </section>
  );
}
