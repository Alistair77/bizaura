import { EyeO } from "./EyeO";
import styles from "./Hero.module.css";

/**
 * Hero BIZORA wordmark — "BIZ" + eye-O + "RA" + ®.
 * Reference: Inter Tight 900, 100px, -0.045em, line-height 1, ≈420px wide.
 */
export function HeroLogo() {
  return (
    <a href="#top" className={styles.logo} aria-label="Bizora home">
      <span aria-hidden="true">BIZ</span>
      <EyeO live />
      <span aria-hidden="true">RA</span>
      <span className={styles.reg} aria-hidden="true">
        ®
      </span>
    </a>
  );
}
