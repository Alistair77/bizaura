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
 * Letters rise in staggered, idle with a gentle bounce,
 * and pop under the cursor. The eye keeps its own life.
 */
export function HeroLogo() {
  return (
    <a href="#top" className={styles.logo} aria-label="Bizora home">
      <Letter ch="B" i={0} />
      <Letter ch="I" i={1} />
      <Letter ch="Z" i={2} />
      <span className={styles.lIn} style={{ "--i": 3 } as CSSProperties} aria-hidden="true">
        <EyeO live className={styles.logoEye} />
      </span>
      <Letter ch="R" i={4} />
      <Letter ch="A" i={5} />
      <span className={styles.reg} aria-hidden="true">
        ®
      </span>
    </a>
  );
}
