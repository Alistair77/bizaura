"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { isScrolling } from "@/lib/scrollActivity";

/** Must match `.cine__img` scale so the swap from <img> to canvas is seamless. */
const BASE_ZOOM = 1.06;
const POINTER_EASE = 4; // per-second lerp factor
const MAX_DPR = 1.25;
/** Even ~60fps cadence on any refresh rate (every 2nd frame at 120Hz); 3ms slack avoids judder. */
const FRAME_MS = 1000 / 60 - 3;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform sampler2D uTex;
  uniform vec2 uRes;
  uniform vec2 uImg;
  uniform vec2 uFocus;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uDepth;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x),
               mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
  }

  // object-fit: cover + object-position, then a zoom around the focal point
  vec2 coverUv(vec2 uv) {
    float rs = uRes.x / uRes.y;
    float ri = uImg.x / uImg.y;
    vec2 scale = rs > ri ? vec2(1.0, ri / rs) : vec2(rs / ri, 1.0);
    scale /= ${BASE_ZOOM.toFixed(2)};
    vec2 focus = vec2(uFocus.x, 1.0 - uFocus.y);
    return uv * scale + (1.0 - scale) * focus;
  }

  void main() {
    // Fake depth: the foreground (bottom of frame) travels further than the stage (top).
    float near = smoothstep(0.0, 1.0, 1.0 - vUv.y);
    vec2 shift = uPointer * uDepth * (0.004 + 0.012 * near);
    vec2 uv = coverUv(vUv - shift);

    // Gentle lens fringing toward the frame edges.
    vec2 fromCenter = vUv - 0.5;
    float edge = dot(fromCenter, fromCenter);
    vec2 ca = fromCenter * edge * 0.006;
    vec3 col = vec3(
      texture2D(uTex, uv + ca).r,
      texture2D(uTex, uv).g,
      texture2D(uTex, uv - ca).b
    );

    // Stage lights breathe: only highlights shimmer, slowly.
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    float drift = noise(vUv * 3.0 + vec2(uTime * 0.12, uTime * 0.05)) - 0.5;
    col += col * smoothstep(0.5, 1.0, luma) * drift * 0.28;

    // Low atmospheric haze in the brand's stage blue/violet.
    float haze = noise(vUv * vec2(2.0, 3.5) + vec2(uTime * 0.025, 0.0));
    col += vec3(0.33, 0.28, 0.95) * haze * 0.035 * (1.0 - near);

    // Animated film grain.
    col += (hash(vUv * uRes + fract(uTime * 7.0) * 91.0) - 0.5) * 0.045;

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface PhotoShaderProps {
  src: string;
  focus: [number, number];
  depth: number;
  trackRef: RefObject<HTMLElement | null>;
  onReady: () => void;
}

function PhotoPlane({ src, focus, depth, trackRef, onReady }: PhotoShaderProps) {
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);

  // frameloop="demand": request frames ourselves, capped at an even ~60fps.
  useEffect(() => {
    let raf = 0;
    let last = 0;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (isScrolling(t) || t - last < FRAME_MS) return;
      last = t;
      invalidate();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [invalidate]);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;
  const [focusX, focusY] = focus;

  // Built imperatively and passed as `material`: R3F copies a `uniforms` prop into the
  // material's own object, so mutating the original would never reach the GPU.
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTex: { value: null },
          uRes: { value: new THREE.Vector2(1, 1) },
          uImg: { value: new THREE.Vector2(1, 1) },
          uFocus: { value: new THREE.Vector2(focusX, focusY) },
          uPointer: { value: new THREE.Vector2() },
          uTime: { value: 0 },
          uDepth: { value: depth },
        },
        vertexShader,
        fragmentShader,
        depthTest: false,
        depthWrite: false,
      }),
    [focusX, focusY, depth],
  );
  const target = useMemo(() => new THREE.Vector2(), []);

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    let loaded: THREE.Texture | null = null;
    let cancelled = false;
    new THREE.TextureLoader().load(
      src,
      (tex) => {
        if (cancelled) return tex.dispose();
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        loaded = tex;
        setTexture(tex);
      },
      undefined,
      () => {
        // Texture failed: the <img> underneath stays visible, nothing else to do.
      },
    );
    return () => {
      cancelled = true;
      loaded?.dispose();
    };
  }, [src]);

  useEffect(() => {
    if (!texture) return;
    const img = texture.image as HTMLImageElement;
    material.uniforms.uTex.value = texture;
    material.uniforms.uImg.value.set(img.naturalWidth || img.width, img.naturalHeight || img.height);
    onReadyRef.current();
  }, [texture, material]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = trackRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.set(Math.max(-1, Math.min(1, nx)), Math.max(-1, Math.min(1, -ny)));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [trackRef, target]);

  useFrame((_, delta) => {
    const u = material.uniforms;
    // Clamped: after a scroll pause, delta spans the whole pause and would jump the drift.
    u.uTime.value += Math.min(delta, 1 / 30);
    u.uRes.value.set(size.width, size.height);
    u.uPointer.value.lerp(target, Math.min(1, delta * POINTER_EASE));
  });

  // Draw nothing until the texture exists; the transparent canvas shows the <img> beneath.
  if (!texture) return null;

  return (
    <mesh frustumCulled={false} material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

export default function PhotoShader(props: PhotoShaderProps) {
  return (
    <Canvas
      className="cine__canvas"
      dpr={[1, MAX_DPR]}
      frameloop="demand"
      flat
      linear
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      aria-hidden="true"
    >
      <PhotoPlane {...props} />
    </Canvas>
  );
}
