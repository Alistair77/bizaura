import { Plasma } from "@/components/hero/Plasma";
import { Icon } from "@/components/ui/Icon";
import { BUILD_CARDS } from "@/content/home";
import styles from "./WhatWeBuild.module.css";

export function WhatWeBuild() {
  return (
    <section id="what-we-build" className={styles.section} aria-labelledby="build-heading">
      <div className="grain" />
      {/* Faint hero-plasma wash — light, never hyper. */}
      <div className={styles.buildPlasma} aria-hidden="true">
        <Plasma
          speed={0.3}
          direction="pingpong"
          scale={1.5}
          opacity={0.3}
          mouseInteractive={false}
          renderScale={0.35}
          maxDpr={1.2}
          targetFps={24}
          iterations={40}
          lightMode={true}
        />
      </div>
      <div className="container">
        <div className={styles.head}>
          <div data-reveal>
            <p className="eyebrow">
              <span className="eyebrow__num">03</span> What we build <span className="eyebrow__rule" />
            </p>
            <h2 id="build-heading" className={`display ${styles.heading}`}>
              <span>Some we build.</span> <span className={styles.soft}>Some we bring to the markets.</span>{" "}
              <span>Some we build with others.</span> <span className={styles.emphasis}>Some we make happen.</span>
            </h2>
          </div>
          <p className={styles.note} data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
            <span className={styles.tape} aria-hidden="true" />
            Different ways to create what’s next.
          </p>
        </div>

        <ul className={styles.cards}>
          {BUILD_CARDS.map((card, i) => (
            <li
              key={card.num}
              className={styles.card}
              data-accent={card.accent}
              data-reveal
              style={{ "--reveal-delay": `${i * 70}ms` } as React.CSSProperties}
            >
              <div className={styles.cardTop}>
                <span className={styles.pill}>{card.pill}</span>
                <span className={styles.iconBox}>
                  <Icon name={card.icon} size={22} />
                </span>
              </div>
              <div className={styles.cardBottom}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardBody}>
                  {card.body[0]}
                  <br />
                  {card.body[1]}
                </p>
              </div>
              <span className={styles.bigNum} aria-hidden="true">
                {card.num}
              </span>
              <svg className={styles.arc} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
                <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="300 190" />
                <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="120 232" />
              </svg>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
