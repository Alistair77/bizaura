import { Wordmark } from "@/components/brand/Wordmark";
import { CinematicPhoto } from "@/components/cinematic/CinematicPhoto";
import { HandArrow } from "@/components/ui/HandArrow";
import { Icon } from "@/components/ui/Icon";
import { TornEdge } from "@/components/ui/TornEdge";
import { CONTACT, PHOTOS } from "@/content/home";
import styles from "./Closing.module.css";
import { EmailCopy } from "./EmailCopy";

const MAILTO = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Starting a conversation with Bizora")}`;

export function LetsBuild() {
  return (
    <section id="lets-build" className={styles.lets} aria-labelledby="lets-heading">
      <div className={styles.letsMedia}>
        <CinematicPhoto photo={PHOTOS.closingStage} sizes="100vw" position="50% 40%" depth={1.2} />
        <div className={styles.letsShade} />
      </div>
      <TornEdge edge="top" fill="var(--color-paper)" rim="#ffffff" seed={77} depth={28} />

      <div className={`container ${styles.letsLayout}`}>
        <div className={styles.letsCopy} data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__num">08</span> Let’s build what’s next <span className="eyebrow__rule" />
          </p>
          <h2 id="lets-heading" className={`display ${styles.letsHeading}`}>
            Let’s build something worth being part of.
          </h2>
          <p className={styles.letsLead}>Ideas. Industries. People. Real outcomes.</p>
          <div className={styles.ctas}>
            <a className="btn btn--yellow" href="#admit-one">
              Start a conversation <Icon name="arrow" size={16} className="btn__arrow" />
            </a>
            <a className="btn btn--outline-light" href="#what-we-build">
              Explore opportunities
            </a>
          </div>
        </div>

        <p className={`hand ${styles.letsNote}`} aria-hidden="true">
          Ideas
          <br />
          People
          <br />
          Opportunities
          <br />
          Outcomes.
          <HandArrow variant="curlDownLeft" className={styles.letsNoteArrow} />
        </p>
      </div>

      <TornEdge edge="bottom" fill="var(--color-paper)" seed={91} depth={26} />
    </section>
  );
}

/** The final physical invitation — deliberately unlike the event tickets. */
function ConversationTicket() {
  return (
    <div className={styles.ticketWrap} data-reveal style={{ "--reveal-delay": "160ms" } as React.CSSProperties}>
      <div className={styles.ticket}>
        <div className={styles.stub} aria-hidden="true">
          <span className={styles.stubText}>Admit one</span>
        </div>
        <div className={styles.ticketBody}>
          <div className={styles.brand}>
            <Wordmark className={styles.brandWordmark} />
            <span className={styles.brandMedia}>Media</span>
          </div>
          <p className={styles.ticketLine}>Your next big idea</p>
          <p className={`hand ${styles.ticketHand}`}>Let’s make it happen.</p>
          <a className={`btn btn--yellow ${styles.ticketCta}`} href={MAILTO}>
            Start a conversation <Icon name="arrow" size={16} className="btn__arrow" />
          </a>
        </div>
      </div>
    </div>
  );
}

export function AdmitOne() {
  return (
    <section id="admit-one" className={styles.admit} aria-labelledby="admit-heading">
      <div className={styles.admitMedia}>
        <CinematicPhoto photo={PHOTOS.admitOne} sizes="(min-width: 900px) 55vw, 100vw" position="50% 45%" depth={1} />
        <div className={styles.admitShade} />
        <TornEdge edge="left" fill="var(--color-paper)" seed={113} depth={30} />
      </div>

      <div className={`container ${styles.admitLayout}`}>
        <div className={styles.admitCopy} data-reveal>
          <p className="eyebrow">
            <span className="eyebrow__num">09</span> Admit one conversation <span className="eyebrow__rule" />
          </p>
          <h2 id="admit-heading" className={`display ${styles.admitHeading}`}>
            Admit one
            <br />
            <span className="accent-text">conversation.</span>
          </h2>
          <p className={styles.admitLead}>
            Have an idea, event or partnership in mind?
          </p>
          <div className={styles.leadRow}>
            <span>We’d love to hear from you.</span>
            <EmailCopy />
          </div>
        </div>

        <ConversationTicket />
      </div>

      <TornEdge edge="bottom" fill="#ffffff" seed={127} depth={22} />
    </section>
  );
}
