import styles from "./Hero.module.css";

/**
 * Thin hand-drawn connector strokes between the glass cards.
 * Reference 1672×941 coords, scaled with the hero via viewBox.
 */
export function Connectors() {
  return (
    <svg
      className={styles.connectors}
      viewBox="0 0 1672 941"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Card 1 → card 2: gentle convex bow outward right. */}
      <path
        className={styles.connectorDraw}
        d="M1305 335 C1325 360, 1338 388, 1345 418"
        fill="none"
        stroke="#2A2A30"
        strokeWidth="1.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
      {/* Card 2 → card 3: curving down-left. */}
      <path
        className={styles.connectorDraw}
        d="M1447 600 C1438 618, 1426 638, 1413 655"
        fill="none"
        stroke="#2A2A30"
        strokeWidth="1.4"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
