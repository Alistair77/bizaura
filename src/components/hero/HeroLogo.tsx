import type { CSSProperties } from "react";
import { LOGO_GLYPHS, LOGO_H, LOGO_O_STOPS } from "./logoGlyphs";
import styles from "./Hero.module.css";

const O_GRADIENT_ID = "hero-logo-o";

/**
 * Hero biz-ora wordmark. Each glyph is its own inline SVG cropped from the shared artwork,
 * so letters rise in staggered, idle with a gentle bounce and pop under the cursor.
 * Sizes are in em of the logo's font-size: 1em = LOGO_H.
 */
export function HeroLogo() {
  return (
    <a href="#top" className={styles.logo} aria-label="Bizora home">
      {LOGO_GLYPHS.map((g, i) => {
        const prevEnd = i === 0 ? g.x0 : LOGO_GLYPHS[i - 1].x1;
        const width = g.x1 - g.x0;
        const isO = g.key === "o";
        return (
          <span
            key={g.key}
            className={styles.lIn}
            style={{ "--i": i, marginLeft: `${(g.x0 - prevEnd) / LOGO_H}em` } as CSSProperties}
            aria-hidden="true"
          >
            <span className={styles.lFloat}>
              <svg
                className={styles.glyph}
                viewBox={`${g.x0} 0 ${width} ${LOGO_H}`}
                style={{ width: `${width / LOGO_H}em` }}
                focusable="false"
              >
                {isO ? (
                  <defs>
                    <linearGradient id={O_GRADIENT_ID} gradientUnits="userSpaceOnUse" x1={g.x0} x2={g.x1} y1="0" y2="0">
                      {LOGO_O_STOPS.map((c, s) => (
                        <stop key={c} offset={s / (LOGO_O_STOPS.length - 1)} stopColor={c} />
                      ))}
                    </linearGradient>
                  </defs>
                ) : null}
                <path d={g.d} fillRule="evenodd" fill={isO ? `url(#${O_GRADIENT_ID})` : "currentColor"} />
              </svg>
            </span>
          </span>
        );
      })}
    </a>
  );
}
