import { useId } from "react";
import { LOGO_GLYPHS, LOGO_H, LOGO_O_STOPS } from "@/components/hero/logoGlyphs";

interface WordmarkProps {
  className?: string;
  /** Kept for call-site compatibility; the biz-ora logo has no interactive parts. */
  interactive?: boolean;
  /** Kept for call-site compatibility; every placement now uses the same biz-ora logo. */
  variant?: "display" | "small";
}

const X0 = LOGO_GLYPHS[0].x0;
const X1 = LOGO_GLYPHS[LOGO_GLYPHS.length - 1].x1;

/**
 * The biz-ora brand logo as one inline SVG, sized by the parent's font-size
 * (height 0.8em ≈ the old wordmark's cap height, so existing placements keep their scale).
 */
export function Wordmark({ className }: WordmarkProps) {
  const gradientId = `wordmark-o-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const o = LOGO_GLYPHS.find((g) => g.key === "o");

  return (
    <svg
      className={`wordmark ${className ?? ""}`}
      viewBox={`${X0} 0 ${X1 - X0} ${LOGO_H}`}
      role="img"
      aria-label="Bizora"
    >
      {o ? (
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={o.x0} x2={o.x1} y1="0" y2="0">
            {LOGO_O_STOPS.map((c, i) => (
              <stop key={c} offset={i / (LOGO_O_STOPS.length - 1)} stopColor={c} />
            ))}
          </linearGradient>
        </defs>
      ) : null}
      {LOGO_GLYPHS.map((g) => (
        <path key={g.key} d={g.d} fillRule="evenodd" fill={g.key === "o" ? `url(#${gradientId})` : "currentColor"} />
      ))}
    </svg>
  );
}
