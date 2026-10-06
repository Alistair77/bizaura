"use client";

import { useEffect, useRef, useState } from "react";
import { BizoraEye } from "./BizoraEye";

interface WordmarkProps {
  className?: string;
  /** Pupil follows the pointer (hero only). */
  interactive?: boolean;
  /** display: giant BIZORA masthead. small: lowercase bizora lockup (header). */
  variant?: "display" | "small";
}

interface EyePlacement {
  left: number;
  top: number;
  width: number;
}

const FALLBACK: Record<string, EyePlacement> = {
  display: { left: 50, top: 47, width: 62 },
  small: { left: 50, top: 56, width: 66 },
};

/**
 * The eye is the visual construction of the O — a black outer letterform with
 * the red/white/black eye embedded and centred inside it. The eye geometry is
 * measured from the rendered font (canvas ink metrics), so it stays centred
 * regardless of typeface metrics. Never a detached symbol between Z and R.
 */
export function Wordmark({ className, interactive = false, variant = "display" }: WordmarkProps) {
  const lower = variant === "small";
  const pre = lower ? "biz" : "BIZ";
  const o = lower ? "o" : "O";
  const post = lower ? "ra" : "RA";

  const oCharRef = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [eye, setEye] = useState<EyePlacement>(FALLBACK[variant]);

  useEffect(() => {
    let cancelled = false;
    const measure = () => {
      const oEl = oCharRef.current;
      const wrapEl = wrapRef.current;
      if (!oEl || !wrapEl || cancelled) return;
      try {
        const cs = getComputedStyle(oEl);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.font = `${cs.fontStyle} ${cs.fontWeight} 100px ${cs.fontFamily}`;
        const m = ctx.measureText(o);
        const aA = m.actualBoundingBoxAscent;
        const aD = m.actualBoundingBoxDescent;
        const aL = m.actualBoundingBoxLeft;
        const aR = m.actualBoundingBoxRight;
        const fA = m.fontBoundingBoxAscent ?? 90;
        const fD = m.fontBoundingBoxDescent ?? 25;
        if (!aA || !aR) return;
        const advance = m.width || aR - aL;
        // Horizontal: ink centre as a fraction of the advance width.
        const left = ((aL + aR) / 2 / advance) * 100;
        // Vertical: baseline sits at halfLeading + fontAscent inside the 1em line box.
        const halfLeading = (100 - (fA + fD)) / 2;
        const baselineFromTop = halfLeading + fA;
        const inkCenterFromBaseline = (aA - aD) / 2;
        const top = ((baselineFromTop - inkCenterFromBaseline) / 100) * 100;
        // Eye spans ~84% of the ink width so the black O ring stays visible.
        const width = (((aR - aL) * 0.84) / advance) * 100;
        setEye({ left, top, width });
      } catch {
        /* keep fallback placement */
      }
    };
    const ready = () => {
      measure();
    };
    measure();
    if (document.fonts) {
      document.fonts.load(`900 100px "Schibsted Grotesk", sans-serif`).catch(() => {});
      document.fonts.ready.then(() => {
        if (!cancelled) requestAnimationFrame(measure);
      });
    }
    window.addEventListener("resize", ready);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", ready);
    };
  }, [o, variant]);

  return (
    <span
      className={`wordmark ${lower ? "wordmark--lower" : ""} ${className ?? ""}`}
      role="img"
      aria-label="Bizora"
    >
      <span aria-hidden="true">{pre}</span>
      <span ref={wrapRef} className="wordmark__o" aria-hidden="true">
        <span ref={oCharRef} className="wordmark__oChar">
          {o}
        </span>
        <BizoraEye
          className="wordmark__oEye"
          interactive={interactive}
          style={{ left: `${eye.left}%`, top: `${eye.top}%`, width: `${eye.width}%` }}
        />
      </span>
      <span aria-hidden="true">{post}</span>
    </span>
  );
}
