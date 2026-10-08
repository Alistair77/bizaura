import styles from "./Hero.module.css";

/**
 * Pencil arrow leaving the handwritten tagline: a short hook that rises off "meet.",
 * curls over and points down toward the headline. Open, slightly uneven head. Drawn on load.
 */
export function HandArrow({ className }: { className?: string }) {
  return (
    <svg
      className={`${styles.handArrow} ${className ?? ""}`}
      viewBox="0 0 60 52"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.drawStroke}
        d="M2 13 C15 3.5, 36 1, 47 13 C53.5 20, 54.5 32, 52.5 46"
        fill="none"
        stroke="#353535"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className={`${styles.drawStroke} ${styles.drawHead}`}
        d="M44.5 38.5 L52.5 47 L58.5 36.5"
        fill="none"
        stroke="#353535"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
