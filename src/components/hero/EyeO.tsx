"use client";

import { useEffect, useId, useRef, useState } from "react";
import styles from "./EyeO.module.css";

/** Iris striations: 12 thin lighter lines radiating from the pupil.
 * Rounded so server and browser serialise identical attributes (no hydration drift). */
const round = (v: number) => Math.round(v * 100) / 100;
const STRIATIONS = Array.from({ length: 12 }, (_, i) => {
  const a = (i * Math.PI) / 6;
  return {
    key: i,
    x1: round(52 + Math.cos(a) * 9),
    y1: round(37 + Math.sin(a) * 9),
    x2: round(52 + Math.cos(a) * 20),
    y2: round(37 + Math.sin(a) * 20),
  };
});

interface EyeOProps {
  /** Explicit rendered height in px. Omit for em sizing (1.04em × 0.74em,
   * driven by the parent wordmark font-size: 100px hero → 104×74). */
  size?: number;
  /** Enable the pupil's mouse-follow. Defaults to false (static contexts). */
  live?: boolean;
  className?: string;
}

/**
 * The BIZORA eye-"O": thick black elliptical ring, white almond, gradient
 * iris, pupil, specular highlights. Reference: 104×74 at 100px wordmark.
 */
export function EyeO({ size, live = false, className }: EyeOProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const irisId = `eyeo-iris-${uid}`;
  const shadeId = `eyeo-shade-${uid}`;
  const almondId = `eyeo-almond-${uid}`;

  useEffect(() => {
    if (!live) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      setOffset({ x: current.x, y: current.y });
      if (Math.abs(target.x - current.x) > 0.01 || Math.abs(target.y - current.y) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      // Up to 3 viewBox units (≈3px at hero scale).
      target.x = Math.max(-1, Math.min(1, nx)) * 3;
      target.y = Math.max(-1, Math.min(1, ny)) * 3;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [live]);

  return (
    <svg
      ref={ref}
      className={`${styles.o} ${className ?? ""}`}
      style={size ? { width: (size * 104) / 74, height: size } : undefined}
      viewBox="0 0 104 74"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id={irisId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3A4FE6" />
          <stop offset="45%" stopColor="#5B6CFF" />
          <stop offset="75%" stopColor="#9E8BFF" />
          <stop offset="100%" stopColor="#E6D9FF" />
        </radialGradient>
        <radialGradient id={shadeId} cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#E6E8F5" stopOpacity="0" />
          <stop offset="100%" stopColor="#E6E8F5" stopOpacity="0.9" />
        </radialGradient>
        <clipPath id={almondId}>
          <path d="M16 37 Q52 9, 88 37 Q52 65, 16 37 Z" />
        </clipPath>
      </defs>

      <g>
        {/* Sclera */}
        <path d="M16 37 Q52 9, 88 37 Q52 65, 16 37 Z" fill="#FFFFFF" />
        <path d="M16 37 Q52 9, 88 37 Q52 65, 16 37 Z" fill={`url(#${shadeId})`} />

        {/* Iris + pupil ride together for the mouse-follow. */}
        <g transform={`translate(${offset.x.toFixed(2)} ${offset.y.toFixed(2)})`}>
          <circle cx="52" cy="37" r="21" fill={`url(#${irisId})`} />
          <g clipPath={`url(#${almondId})`} opacity="0.25">
            {STRIATIONS.map(({ key, ...line }) => (
              <line key={key} {...line} stroke="#FFFFFF" strokeWidth="1" />
            ))}
          </g>
          <circle cx="52" cy="37" r="21" fill="none" stroke="#3B2FA8" strokeWidth="1.5" />
          <circle cx="52" cy="37" r="8.5" fill="#05050A" />
          {/* Highlights */}
          <circle cx="45" cy="30" r="3" fill="#FFFFFF" opacity="0.95" />
          <circle cx="58.5" cy="43" r="1.25" fill="#FFFFFF" opacity="0.6" />
        </g>
      </g>

      {/* Thick black ring over the almond edges. */}
      <ellipse cx="52" cy="37" rx="45" ry="30" fill="none" stroke="#0B0B0F" strokeWidth="14" />
    </svg>
  );
}
