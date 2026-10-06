"use client";

import { useEffect, useId, useRef } from "react";

/** Max pupil travel in CSS px — spec: ±6px horizontal, ±3px vertical. */
const MAX_X_PX = 6;
const MAX_Y_PX = 3;
/** Pointer distance (px) at which the eye reaches full deflection. */
const FULL_REACH_PX = 420;
/** Critically-damped follow rate (1/s): fast, low amplitude, no bounce. */
const FOLLOW_RATE = 14;
const SETTLE_EPSILON = 0.01;

const ALMOND = "M16 50 C30 29 70 29 84 50 C70 71 30 71 16 50 Z";

interface BizoraEyeProps {
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function BizoraEye({ interactive = false, className, style }: BizoraEyeProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pupilRef = useRef<SVGGElement>(null);
  const clipId = `eye${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  useEffect(() => {
    if (!interactive) return;
    const canTrack =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canTrack) return;

    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;

    // Frame-rate independent exponential follow; the loop sleeps once settled.
    const tick = (now: number) => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const k = 1 - Math.exp(-dt * FOLLOW_RATE);
      current = { x: current.x + (target.x - current.x) * k, y: current.y + (target.y - current.y) * k };
      pupilRef.current?.setAttribute("transform", `translate(${current.x.toFixed(2)} ${current.y.toFixed(2)})`);
      const settled =
        Math.abs(target.x - current.x) < SETTLE_EPSILON && Math.abs(target.y - current.y) < SETTLE_EPSILON;
      if (settled) {
        raf = 0;
        last = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
    };

    const onMove = (e: PointerEvent) => {
      const el = svgRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, dist / FULL_REACH_PX);
      const unitsPerPx = 100 / r.width; // viewBox is 100 units wide
      target = {
        x: (dx / dist) * reach * MAX_X_PX * unitsPerPx,
        y: (dy / dist) * reach * MAX_Y_PX * unitsPerPx,
      };
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [interactive]);

  return (
    <svg ref={svgRef} className={className} style={style} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={clipId}>
          <path d={ALMOND} />
        </clipPath>
      </defs>
      {/* Spec: red outer eye shape, white inner area, black pupil — crisp and centred. */}
      <path d={ALMOND} fill="#e0231f" />
      <g clipPath={`url(#${clipId})`}>
        <ellipse cx="50" cy="50" rx="26" ry="17.5" fill="#fff" />
        <g ref={pupilRef}>
          <circle cx="50" cy="50" r="8.5" fill="#0a0a0a" />
          <circle cx="52.8" cy="47.2" r="2.4" fill="#fff" />
        </g>
      </g>
    </svg>
  );
}
