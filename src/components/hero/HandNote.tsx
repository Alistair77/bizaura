import styles from "./Hero.module.css";

/**
 * Pencil note under the hero video: "Real people, real conversations."
 * Rotated with the writing, with an underline swoosh.
 */
export function HandNote() {
  return (
    <div className={styles.note} role="note" aria-label="Real people, real conversations.">
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
