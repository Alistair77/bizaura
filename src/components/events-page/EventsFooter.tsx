import { Wordmark } from "@/components/brand/Wordmark";
import { Icon } from "@/components/ui/Icon";
import { BASE_PATH, CONTACT, SOCIAL_LINKS } from "@/content/home";
import styles from "./EventsFooter.module.css";

const HOME = `${BASE_PATH}/`;

const COLUMNS = [
  {
    heading: "Quick links",
    links: [
      { label: "Events", href: "#top" },
      { label: "Experiences", href: `${HOME}#platforms` },
      { label: "For Organizers", href: `${HOME}#admit-one` },
      { label: "Resources", href: `${HOME}#spine` },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
] as const;

// ponytail: location from the approved Events reference; confirm before launch.
const LOCATION = ["Mumbai, Maharashtra", "India"];

/** Compact Events footer: brand + tagline + socials, link columns, contact, legal line. */
export function EventsFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <a href={HOME} className={styles.brand} aria-label="Bizora Media — home">
            <Wordmark variant="small" className={styles.wordmark} />
          </a>
          <p className={styles.tagline}>Building meaningful connections for India&rsquo;s business community.</p>
          <ul className={styles.social} aria-label="Social media">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a className={styles.socialBtn} href={social.href} aria-label={social.label}>
                  <Icon name={social.icon} size={15} strokeWidth={2} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.links}>
          {COLUMNS.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className={styles.col}>
              <h2 className={styles.colHead}>{col.heading}</h2>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a className={styles.link} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.contact}>
          <h2 className={styles.colHead}>Get in touch</h2>
          <a className={styles.email} href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
            <Icon name="arrow" size={14} strokeWidth={2.2} />
          </a>
          <p className={styles.location}>
            {LOCATION[0]}
            <br />
            {LOCATION[1]}
          </p>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>&copy; 2026 Bizora. All rights reserved.</p>
        <p>India&rsquo;s Business Events Platform</p>
      </div>
    </footer>
  );
}
