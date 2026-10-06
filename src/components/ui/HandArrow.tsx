/** Hand-drawn arrows for handwritten annotations. Slightly irregular on purpose. */
const ARROWS = {
  // curls down and to the left
  curlDownLeft: {
    viewBox: "0 0 80 90",
    shaft: "M62 4 C70 26 66 50 48 64 C38 72 26 76 14 78",
    head: "M26 68 L13 78 L27 86",
  },
  // sweeps down and to the right
  sweepDownRight: {
    viewBox: "0 0 90 70",
    shaft: "M6 6 C14 30 34 50 74 58",
    head: "M60 48 L75 58 L60 66",
  },
  // short flick to the right
  flickRight: {
    viewBox: "0 0 90 40",
    shaft: "M4 26 C24 18 50 16 80 20",
    head: "M68 10 L81 20 L68 30",
  },
} as const;

interface HandArrowProps {
  variant: keyof typeof ARROWS;
  className?: string;
}

export function HandArrow({ variant, className }: HandArrowProps) {
  const a = ARROWS[variant];
  return (
    <svg
      className={className}
      viewBox={a.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={a.shaft} />
      <path d={a.head} />
    </svg>
  );
}
