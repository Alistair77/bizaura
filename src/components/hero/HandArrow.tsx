import styles from "./Hero.module.css";

/**
 * Long hand-drawn arrow trailing the left tagline.
 * Near-straight shallow rise with an open V head, drawn on load.
 */
export function HandArrow({ className }: { className?: string }) {
  return (
    <svg
      className={`${styles.handArrow} ${className ?? ""}`}
      viewBox="0 0 190 56"
      aria-hidden="true"
      focusable="false"
    >
      <path
        className={styles.drawStroke}
        d="M5 46 C58 44, 112 30, 170 9"
        fill="none"
        stroke="#3E3E44"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        className={styles.drawStroke}
        d="M149 3 L171 8 L156 27"
        fill="none"
        stroke="#3E3E44"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
