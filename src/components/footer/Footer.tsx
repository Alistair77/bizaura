import { Wordmark } from "@/components/brand/Wordmark";
import { Icon } from "@/components/ui/Icon";
import { CONTACT, FOOTER_COLUMNS, SOCIAL_LINKS } from "@/content/home";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.brandCol}>
          <a href="#top" className={styles.brand} aria-label="Bizora Media — back to top">
            <Wordmark className={styles.wordmark} />
            <span className={styles.media} aria-hidden="true">
              Media
            </span>
          </a>
          <p className={styles.tagline}>Where access turns into outcomes.</p>
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
