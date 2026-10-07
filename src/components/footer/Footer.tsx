import { Wordmark } from "@/components/brand/Wordmark";
import { Icon } from "@/components/ui/Icon";
import { CONTACT, FOOTER_COLUMNS, SOCIAL_LINKS } from "@/content/home";
import { FooterAmour } from "./FooterAmour";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.amourBand}`}>
        <FooterAmour />
      </div>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <a href="#top" className={styles.brand} aria-label="Bizora Media — back to top">
            <Wordmark className={styles.wordmark} />
            <span className={styles.media} aria-hidden="true">
              Media
            </span>
          </a>
          {/* Hand-inked sunrise mark in the Amour poster style. */}
          <svg
            className={styles.sunMark}
            viewBox="0 0 104 68"
            data-reveal
            aria-hidden="true"
            focusable="false"
          >
            <path
              className={styles.drawAmr}
              d="M30 52 A22 22 0 0 1 74 52"
              fill="none"
              stroke="#2F5FE0"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              className={styles.drawAmr}
              d="M52 12 C52 17, 52 20, 52 24 M30 20 C32 24, 33 27, 34 30 M74 20 C72 24, 71 27, 70 30 M16 34 C20 36, 23 38, 26 40 M88 34 C84 36, 81 38, 78 40"
              fill="none"
              stroke="#7A3FE6"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              className={styles.drawAmr}
              d="M4 54 C30 51, 72 56, 100 52"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className={styles.tagline}>Where access turns into outcomes.</p>
          <svg
            className={styles.squiggle}
            viewBox="0 0 180 20"
            data-reveal
            aria-hidden="true"
            focusable="false"
          >
            <path
              className={styles.drawAmr}
              d="M4 12 C40 6, 70 16, 105 10 S160 8, 176 12"
              fill="none"
              stroke="#2F5FE0"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {FOOTER_COLUMNS.map((col) => (
          <nav key={col.heading} aria-label={col.heading} className={styles.col}>
            <h2 className={styles.colHead}>{col.heading}</h2>
            <ul className={styles.links}>
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

        <div className={`${styles.col} ${styles.contactCol}`}>
          <h2 className={styles.colHead}>Contact</h2>
          <ul className={styles.links}>
            <li className={styles.contactLine}>
              <Icon name="pin" size={16} />
              {CONTACT.location}
            </li>
            <li>
              <a className={`${styles.link} ${styles.contactLine}`} href={`mailto:${CONTACT.email}`}>
                <Icon name="mail" size={16} />
                {CONTACT.email}
              </a>
            </li>
          </ul>
          <ul className={styles.social} aria-label="Social media">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a className={styles.socialLink} href={social.href} aria-label={social.label}>
                  <Icon name={social.icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>© {year} Bizora Media. All rights reserved.</p>
      </div>
    </footer>
  );
}
