import type { CSSProperties } from "react";
import { EyeO } from "./EyeO";
import styles from "./Hero.module.css";

function Letter({ ch, i }: { ch: string; i: number }) {
  return (
    <span className={styles.lIn} style={{ "--i": i } as CSSProperties} aria-hidden="true">
      <span className={styles.lFloat}>{ch}</span>
    </span>
  );
}

/**
 * Hero BIZORA wordmark — "BIZ" + eye-O + "RA" + ®.
 * Reference: Inter Tight 900, 100px, -0.045em, line-height 1, ≈420px wide.
 * Letters ink in one by one like marker strokes, idle with a gentle bounce,
 * and bounce harder under the cursor. The eye keeps its own life.
 */
export function HeroLogo() {
  return (
    <a href="#top" className={styles.logo} aria-label="Bizora home">
      <Letter ch="B" i={0} />
      <Letter ch="I" i={1} />
      <Letter ch="Z" i={2} />
      <span className={styles.lIn} style={{ "--i": 3 } as CSSProperties} aria-hidden="true">
        <EyeO live />
      </span>
      <Letter ch="R" i={4} />
      <Letter ch="A" i={5} />
      <span
        className={`${styles.lIn} ${styles.regWrap}`}
        style={{ "--i": 6 } as CSSProperties}
        aria-hidden="true"
      >
        <span className={styles.reg}>®</span>
      </span>
    </a>
  );
}
