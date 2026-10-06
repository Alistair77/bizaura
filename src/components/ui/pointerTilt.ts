import type { PointerEvent } from "react";

/**
 * Pointer-proximity tilt for physical objects (tickets, strips).
 * Writes --tilt-x / --tilt-y on the element; CSS owns the transform + easing,
 * so the motion stays on the compositor and reduced-motion is handled in CSS.
 */
export function pointerTilt(maxDeg: number) {
  return {
    onPointerMove(e: PointerEvent<HTMLElement>) {
      if (e.pointerType !== "mouse" || e.buttons) return;
      const r = e.currentTarget.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      e.currentTarget.style.setProperty("--tilt-y", `${(nx * maxDeg).toFixed(2)}deg`);
      e.currentTarget.style.setProperty("--tilt-x", `${(-ny * maxDeg).toFixed(2)}deg`);
    },
    onPointerLeave(e: PointerEvent<HTMLElement>) {
      e.currentTarget.style.setProperty("--tilt-x", "0deg");
      e.currentTarget.style.setProperty("--tilt-y", "0deg");
    },
  };
}
