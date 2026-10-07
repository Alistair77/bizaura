import styles from "./Hero.module.css";

/**
 * Upper-right pencil note: "Real people, real conversations."
 * Rotated with the writing, three emphasis strokes and an underline swoosh.
 */
export function HandNote() {
  return (
    <div className={styles.note} role="note" aria-label="Real people, real conversations.">
      <svg className={styles.sparks} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path className={styles.drawStroke} d="M33 4 C33.5 10, 33.2 15, 34 21" />
        <path className={styles.drawStroke} d="M12 12 C16 16, 19 20, 23 25" />
        <path className={styles.drawStroke} d="M2 33 C7 33.5, 12 33, 18 33.6" />
      </svg>
      <p className={styles.noteText} aria-hidden="true">
        <span className={styles.noteLine}>Real people,</span>
        <span className={`${styles.noteLine} ${styles.noteIndent}`}>real conversations.</span>
      </p>
      <svg className={styles.swoosh} viewBox="0 0 220 30" aria-hidden="true" focusable="false">
        <path className={styles.drawStroke} d="M4 26 C60 22, 130 14, 216 3" />
      </svg>
    </div>
  );
}
