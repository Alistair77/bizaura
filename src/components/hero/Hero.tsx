import Image from "next/image";
import { HandArrow } from "@/components/ui/HandArrow";
import { Icon } from "@/components/ui/Icon";
import { TornEdge } from "@/components/ui/TornEdge";
import { INDUSTRIES, PHOTOS } from "@/content/home";
import { HeroInsightStack } from "./HeroInsightStack";
import { HeroLogo } from "./HeroLogo";
import styles from "./Hero.module.css";

/**
 * HERO — built on the approved background asset: warm paper field on the
 * left, organic torn edge, cinematic conference photo on the right.
 * The asset IS the paper/tear/photo composition; HTML owns type, CTAs, cards.
 */
export function Hero() {
  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.base}>
        <Image
          className={styles.baseImg}
          src={PHOTOS.heroBase.src}
          alt={PHOTOS.heroBase.alt}
          fill
          sizes="100vw"
          quality={85}
          priority
          fetchPriority="high"
        />
        <div className={styles.baseShade} />
        <p className={`hand ${styles.noteRight}`} aria-hidden="true">
          Real
          <br />
          People
          <br />
          Real
          <br />
          Conversations.
          <HandArrow variant="curlDownLeft" className={styles.noteRightArrow} />
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.copy}>
          <TornEdge edge="top" fill="var(--color-paper)" rim="#ffffff" seed={23} depth={26} className={styles.tearStacked} />
          <HeroLogo />

          <h1 id="hero-heading" className={`display ${styles.headline}`}>
            <span className={styles.line}>Where access</span>
            <span className={styles.line}>turns into</span>
            <span className={`${styles.line} ${styles.outcomes}`}>outcomes.</span>
          </h1>
          <p className={`hand ${styles.noteLeft}`} aria-hidden="true">
            Ideas
            <br />
            People
            <br />
            Industries
            <br />
            Opportunities.
            <HandArrow variant="curlDownLeft" className={styles.noteLeftArrow} />
          </p>

          <p className={styles.lead}>
            We bring the right intelligence, with the right media, to the right people, for the right
            opportunities.
          </p>

          <div className={styles.ctas}>
            <a className={`btn ${styles.primary}`} href="#what-we-build">
              See what we build <Icon name="arrow" size={18} className="btn__arrow" />
            </a>
            <a className={`btn ${styles.secondary}`} href="#admit-one">
              Start a conversation
            </a>
          </div>

          <ul className={styles.chips} aria-label="Industries we work across">
            {INDUSTRIES.map((industry) => (
              <li key={industry} className={styles.chip}>
                {industry}
              </li>
            ))}
            <li className={`${styles.chip} ${styles.chipMore}`}>+ more</li>
          </ul>
        </div>

        <HeroInsightStack />
      </div>

      <TornEdge edge="bottom" fill="var(--color-navy)" seed={19} depth={30} />
    </section>
  );
}
