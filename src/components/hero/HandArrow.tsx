import styles from "./Hero.module.css";

/**
 * Pencil arrow leaving the handwritten tagline: a short hook off the end of "ideas" that
 * curls up into the BIZORA wordmark above it. Open, slightly uneven head. Drawn on load.
 */
export function HandArrow({ className }: { className?: string }) {
  return (
    <svg
      className={`${styles.handArrow} ${className ?? ""}`}
      viewBox="0 0 64 40"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.drawStroke}
        d="M2 31 C18 34, 40 32.5, 49 24 C53 20, 55 17, 55 12.5"
        fill="none"
        stroke="#353535"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className={`${styles.drawStroke} ${styles.drawHead}`}
        d="M49 19 L55 12 L60.5 19.5"
        fill="none"
        stroke="#353535"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
