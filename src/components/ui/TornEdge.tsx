/**
 * Deterministic torn-paper edge. Seeded multi-octave value noise + per-point fibre jitter,
 * so server and client render identical paths and no two seeds tear alike.
 * Rendered as a static SVG (no runtime filter cost); the rim layer fakes the exposed paper core.
 *
 * Place it inside the torn element. It sits on `edge` and paints `fill` (the colour of the
 * neighbouring surface) outward of the tear line, so the element appears ripped.
 */
import styles from "./TornEdge.module.css";

type Edge = "top" | "bottom" | "left" | "right";

interface TornEdgeProps {
  edge: Edge;
  fill: string;
  /** Lighter fibrous rim colour; omit for no rim. */
  rim?: string;
  seed?: number;
  /** Depth of the tear band in px. */
  depth?: number;
  className?: string;
}

const LENGTH = 1440;
const STEP = 6;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function valueNoise(rand: () => number, period: number) {
  const knots = Array.from({ length: Math.ceil(LENGTH / period) + 2 }, rand);
  return (x: number) => {
    const i = Math.floor(x / period);
    const t = (1 - Math.cos((x / period - i) * Math.PI)) / 2;
    return knots[i] * (1 - t) + knots[i + 1] * t;
  };
}

/** Offsets in [0,1] along the tear, one per STEP units. */
function tearProfile(seed: number, jitter: number) {
  const rand = mulberry32(seed);
  const octaves = [
    { fn: valueNoise(rand, 260), amp: 0.42 },
    { fn: valueNoise(rand, 70), amp: 0.3 },
    { fn: valueNoise(rand, 18), amp: 0.18 },
  ];
  const out: number[] = [];
  for (let x = 0; x <= LENGTH; x += STEP) {
    let v = 0;
    for (const o of octaves) v += o.fn(x) * o.amp;
    v += (rand() - 0.5) * jitter;
    out.push(Math.min(1, Math.max(0, v)));
  }
  return out;
}

/** Tear line near the start of the depth axis, fill toward its end. */
function pathFor(profile: number[], depth: number, inset: number, vertical: boolean) {
  const pts = profile.map((v, i) => {
    const d = Math.round(inset + v * (depth - inset) * 0.8);
    return vertical ? `${d},${i * STEP}` : `${i * STEP},${d}`;
  });
  return vertical
    ? `M${depth},0 L${pts.join(" L")} L${depth},${LENGTH} Z`
    : `M0,${depth} L${pts.join(" L")} L${LENGTH},${depth} Z`;
}

export function TornEdge({ edge, fill, rim, seed = 1, depth = 28, className }: TornEdgeProps) {
  const vertical = edge === "left" || edge === "right";
  const rimPath = rim ? pathFor(tearProfile(seed, 0.22), depth, 0, vertical) : null;
  const mainPath = pathFor(tearProfile(seed + 101, 0.12), depth, rim ? depth * 0.2 : 0, vertical);

  return (
    <svg
      className={`${styles.edge} ${styles[edge]} ${className ?? ""}`}
      style={vertical ? { width: depth } : { height: depth }}
      viewBox={vertical ? `0 0 ${depth} ${LENGTH}` : `0 0 ${LENGTH} ${depth}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {rimPath && <path d={rimPath} fill={rim} />}
      <path d={mainPath} fill={fill} />
    </svg>
  );
}

/**
 * Data-URI mask for a paper strip torn on its left and right ends (slightly rough top/bottom).
 * Use as `mask-image` so shadows (drop-shadow on a parent) follow the real silhouette.
 */
export function tornStripMask(seed: number): string {
  const rand = mulberry32(seed);
  const W = 1000;
  const H = 100;
  const EDGE = 16; // tear depth in viewBox units (x is stretched to the element width)
  const ROUGH = 3;
  const edge = (from: number, to: number, step: number, at: (t: number, r: number) => string) => {
    const pts: string[] = [];
    for (let t = from; from < to ? t <= to : t >= to; t += step) pts.push(at(t, rand()));
    return pts;
  };
  const top = edge(EDGE, W - EDGE, 48, (x, r) => `${x},${Math.round(r * ROUGH)}`);
  const right = edge(0, H, 5, (y, r) => `${Math.round(W - r * EDGE)},${y}`);
  const bottom = edge(W - EDGE, EDGE, -48, (x, r) => `${x},${Math.round(H - r * ROUGH)}`);
  const left = edge(H, 0, -5, (y, r) => `${Math.round(r * EDGE)},${y}`);
  const d = `M${[...top, ...right, ...bottom, ...left].join(" L")} Z`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><path d="${d}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
