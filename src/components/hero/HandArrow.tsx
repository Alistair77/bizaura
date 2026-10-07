import styles from "./Hero.module.css";

/**
 * Pencil arrow leaving the handwritten tagline: a shallow curve that lifts toward the
 * plasma with an open, slightly uneven arrowhead. Drawn on load.
 */
export function HandArrow({ className }: { className?: string }) {
  return (
    <svg
      className={`${styles.handArrow} ${className ?? ""}`}
      viewBox="0 0 140 56"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.drawStroke}
        d="M2 50 C38 53, 86 42, 132 7"
        fill="none"
        stroke="#353535"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        className={`${styles.drawStroke} ${styles.drawHead}`}
        d="M113 6.5 L133 6 L125.5 24"
        fill="none"
        stroke="#353535"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
