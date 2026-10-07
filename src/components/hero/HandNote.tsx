import styles from "./Hero.module.css";

/**
 * Top-right handwritten note: "Real people, real conversations."
 * Rotated −13°, with spark accents and an underline swoosh.
 */
export function HandNote() {
  return (
    <div className={styles.note} aria-label="Real people, real conversations.">
      <svg className={styles.sparks} viewBox="0 0 60 60" aria-hidden="true" focusable="false">
        <path d="M30 52 L40 30" stroke="#2E2E34" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M18 50 L34 32" stroke="#2E2E34" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 44 L30 36" stroke="#2E2E34" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <p className={styles.noteText} aria-hidden="true">
        Real people,
        <br />
        <span className={styles.noteIndent}>real conversations.</span>
      </p>
      <svg className={styles.swoosh} viewBox="0 0 240 80" aria-hidden="true" focusable="false">
        <path
          d="M20 68 C90 62, 170 40, 228 8"
          fill="none"
          stroke="#2E2E34"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
