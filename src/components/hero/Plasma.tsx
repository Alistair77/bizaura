'use client';

import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';
import styles from './Plasma.module.css';

type Direction = 'forward' | 'reverse' | 'pingpong';

export interface PlasmaProps {
  color?: string;
  speed?: number;
  direction?: Direction;
  scale?: number;
  opacity?: number;
  mouseInteractive?: boolean;
  renderScale?: number;
  maxDpr?: number;
  targetFps?: number;
  iterations?: number;
  lightMode?: boolean;
  respectReducedMotion?: boolean;
  palette?: [string, string, string, string, string];
  /** Seconds added to the shader clock — selects which part of the flow is on screen. */
  timeOffset?: number;
  /**
   * Editorial "silk" light mode (hero): saturated colour ramp driven by the plasma's own
   * colour phase, fine strands traced from its energy field. Independent of `lightMode`.
   */
  silk?: boolean;
  /** Silk colour ramp, cool → warm. */
  ramp?: [string, string, string, string, string];
  /** Strand strength in silk mode, 0–1. */
  fibers?: number;
  /**
   * Ring composition: the column is bent into an elliptical band hugging the viewport,
   * flowing around the content.
   * [ring radius (1 = edges), band width, flow length, seam angle (rad), offset into the column].
   */
  ring?: [number, number, number, number, number];
  /** Render one still frame at this clock value (tuning / stills). */
  freezeAt?: number;
}

const hexToRgb = (hex: string): [number, number, number] => {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!m) return [1, 0.5, 0.2];
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
};

const vertex = `#version 300 es
precision highp float;
in vec2 position;
in vec2 uv;
out vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const ORIGINAL_QUALITY = 60;

const fragment = `#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform vec3 uCustomColor;
uniform float uUseCustomColor;
uniform float uSpeed;
uniform float uDirection;
uniform float uScale;
uniform float uOpacity;
uniform vec2 uMouse;
uniform float uMouseInteractive;
uniform float uQuality;
uniform float uStepScale;
uniform float uLightMode;
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uColC;
uniform vec3 uColD;
uniform vec3 uColE;
uniform float uSilk;
uniform float uFibers;
uniform vec3 uR0;
uniform vec3 uR1;
uniform vec3 uR2;
uniform vec3 uR3;
uniform vec3 uR4;
uniform float uRing;
uniform vec4 uRingP;
uniform float uRingY;
out vec4 fragColor;

float gSeam = 0.0;
float gRingFade = 1.0;

// Ring composition: polar remap around the centre (ellipse fitted to the viewport).
// The column's cross-section becomes radial, its length runs around the content.
vec2 ringCoord(vec2 C) {
  vec2 r = iResolution.xy;
  vec2 c = r * 0.5;
  // Centre sits a little low so the top band rides up behind the logo as light wisps.
  vec2 e = ((C - c) / r.y - vec2(0.0, -0.04)) / vec2(0.5 * r.x / r.y, 0.5);
  // Low-frequency warp bends the band's arcs into diagonal streams (no concentric rings).
  e += 0.09 * vec2(sin(e.y * 3.1 + 1.7), sin(e.x * 2.3 + 0.4));
  float rho = length(e);
  float raw = atan(e.y, e.x);
  float sides = abs(cos(raw)); // 1 at left/right, 0 at top/bottom centre
  float th = mod(raw - uRingP.w + 3.14159265, 6.28318531) - 3.14159265;
  gSeam = smoothstep(2.35, 3.14159265, abs(th));
  // A gentle wobble keeps the band from reading as a perfect ellipse.
  float radius = uRingP.x + 0.07 * sin(2.0 * th + 1.1) + 0.04 * sin(3.0 * th - 0.4);
  // Streams are strongest at the sides and lighter top / bottom; the inner edge dissolves.
  float top = smoothstep(0.0, 1.0, e.y / max(rho, 1e-3)); // 1 straight up, 0 at the sides/below
  gRingFade = mix(0.55 + 0.45 * sides, 0.3, top) * smoothstep(radius - 0.42, radius - 0.12, rho);
  float band = uRingP.y * (1.0 + 0.7 * (1.0 - sides));
  vec2 f = vec2((rho - radius) * band, uRingY + (th / 3.14159265) * uRingP.z);
  return c + f * r.y;
}

vec3 rampColor(float t) {
  t = clamp(t, 0.0, 1.0) * 4.0;
  vec3 c = mix(uR0, uR1, smoothstep(0.0, 1.0, t));
  c = mix(c, uR2, smoothstep(1.0, 2.0, t));
  c = mix(c, uR3, smoothstep(2.0, 3.0, t));
  return mix(c, uR4, smoothstep(3.0, 4.0, t));
}

void mainImage(out vec4 o, vec2 C) {
  vec2 center = iResolution.xy * 0.5;
  if (uRing > 0.5) C = ringCoord(C);
  C = (C - center) / uScale + center;

  vec2 mouseOffset = (uMouse - center) * 0.0002;
  C += mouseOffset * length(C - center) * step(0.5, uMouseInteractive);

  float i, d, z, T = iTime * uSpeed * uDirection;
  vec3 O, p, S;

  for (vec2 r = iResolution.xy, Q; ++i < 60.0; O += o.w/d*o.xyz) {
    p = z*normalize(vec3(C-.5*r,r.y));
    p.z -= 4.;
    S = p;
    d = p.y-T;

    p.x += .4*(1.+p.y)*sin(d + p.x*0.1)*cos(.34*d + p.x*0.05);
    Q = p.xz *= mat2(cos(p.y+vec4(0,11,33,0)-T));
    z += d = (abs(sqrt(length(Q*Q)) - .25*(5.+S.y))/3.+8e-4) * uStepScale;
    o = 1.+sin(S.y+p.z*.5+S.z-length(S-p)+vec4(2,1,0,8));
    if (i >= uQuality) break;
  }

  o.xyz = tanh(O/1e4);
}

bool finite1(float x){ return !(isnan(x) || isinf(x)); }
vec3 sanitize(vec3 c){
  return vec3(
    finite1(c.r) ? c.r : 0.0,
    finite1(c.g) ? c.g : 0.0,
    finite1(c.b) ? c.b : 0.0
  );
}

void main() {
  vec4 o = vec4(0.0);
  mainImage(o, gl_FragCoord.xy);
  vec3 rgb = sanitize(o.rgb);

  float intensity = (rgb.r + rgb.g + rgb.b) / 3.0;
  vec3 customColor = intensity * uCustomColor;
  vec3 finalColor = mix(rgb, customColor, step(0.5, uUseCustomColor));

  float alpha = length(rgb) * uOpacity;

  if (uSilk > 0.5) {
    float energy = clamp(length(rgb) / 1.7320508, 0.0, 1.0);
    vec3 n = rgb / max(rgb.r + rgb.g + rgb.b, 1e-4);
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    // Hue from the plasma's own colour phase, biased diagonally: cool top-left,
    // peach top-right and bottom-left, violet bottom-right.
    float h = 0.45 + (n.r - n.b) * 0.75 + (uv.x - 0.5) * 1.1
            + (1.0 - uv.x) * (1.0 - uv.y) * 0.7 - uv.x * (1.0 - uv.y) * 0.55
            - (1.0 - uv.x) * uv.y * 0.35;
    vec3 pigment = rampColor(h);
    // Strands: iso-lines of the energy field, which run along the flow.
    float strands = 0.5 + 0.5 * sin(energy * 72.0);
    float core = smoothstep(0.02, 0.45, energy);
    float coverage = core * mix(1.0, 0.7 + 0.3 * strands, uFibers) * min(uOpacity, 1.0) * (1.0 - gSeam) * gRingFade;
    pigment = mix(pigment, vec3(1.0), smoothstep(0.86, 1.0, energy) * 0.4);
    fragColor = vec4(mix(vec3(1.0), pigment, coverage), 1.0);
  } else if (uLightMode > 0.5) {
    float energy = clamp(length(rgb) / 1.7320508, 0.0, 1.0);
    vec3 n = rgb / max(rgb.r + rgb.g + rgb.b, 1e-4);

    vec3 pigment = n.r * uColA + n.g * uColB + n.b * uColC;
    pigment = mix(pigment, uColD, smoothstep(0.45, 0.7, n.r) * smoothstep(0.15, 0.35, n.b) * 0.8);
    pigment = mix(pigment, uColE, smoothstep(0.6, 0.85, n.r) * (1.0 - energy) * 0.6);
    pigment = mix(pigment, vec3(0.97, 0.98, 1.0), smoothstep(0.88, 1.0, energy) * 0.75);
    pigment = mix(pigment, uCustomColor, step(0.5, uUseCustomColor) * 0.7);

    float coverage = pow(smoothstep(0.01, 0.5, energy), 0.7) * min(uOpacity, 1.0) * 0.95;
    fragColor = vec4(mix(vec3(1.0), pigment, coverage), 1.0);
  } else {
    fragColor = vec4(finalColor, alpha);
  }
}`;

export const Plasma = ({
  color = '',
  speed = 1,
  direction = 'forward',
  scale = 1,
  opacity = 1,
  mouseInteractive = true,
  renderScale = 0.55,
  maxDpr = 1.5,
  targetFps = 60,
  iterations = 60,
  lightMode = false,
  respectReducedMotion = true,
  palette = ['#FF7A3D', '#9A6BFF', '#4C7BFF', '#FF5FA0', '#FFB27A'],
  timeOffset = 0,
  freezeAt,
  silk = false,
  ramp = ['#3557FF', '#7A55FF', '#C64BE4', '#FF62AC', '#FFAA7C'],
  fibers = 0,
  ring,
}: PlasmaProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const paletteKey = palette.join(',');
  const rampKey = ramp.join(',');
  const ringKey = ring ? ring.join(',') : '';

  useEffect(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;

    const prefersReducedMotion =
      respectReducedMotion &&
      typeof window !== 'undefined' &&
      !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const useCustomColor = color ? 1.0 : 0.0;
    const customColorRgb = color ? hexToRgb(color) : [1, 1, 1];
    const directionMultiplier = direction === 'reverse' ? -1.0 : 1.0;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        webgl: 2,
        alpha: true,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, maxDpr),
      });
    } catch (err) {
      console.warn('[Plasma] Renderer failed to initialise', err);
      return;
    }
    const gl = renderer.gl;
    if (!gl || !(gl as unknown as WebGL2RenderingContext).createVertexArray) {
      console.warn('[Plasma] WebGL2 not available — showing nothing. Check hardware acceleration.');
      return;
    }

    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    containerEl.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uCustomColor: { value: new Float32Array(customColorRgb) },
        uUseCustomColor: { value: useCustomColor },
        uSpeed: { value: speed * 0.4 },
        uDirection: { value: directionMultiplier },
        uScale: { value: scale },
        uOpacity: { value: opacity },
        uMouse: { value: new Float32Array([0, 0]) },
        uMouseInteractive: { value: mouseInteractive ? 1.0 : 0.0 },
        uQuality: { value: iterations },
        uStepScale: { value: ORIGINAL_QUALITY / iterations },
        uLightMode: { value: lightMode ? 1 : 0 },
        uColA: { value: new Float32Array(hexToRgb(palette[0])) },
        uColB: { value: new Float32Array(hexToRgb(palette[1])) },
        uColC: { value: new Float32Array(hexToRgb(palette[2])) },
        uColD: { value: new Float32Array(hexToRgb(palette[3])) },
        uColE: { value: new Float32Array(hexToRgb(palette[4])) },
        uSilk: { value: silk ? 1 : 0 },
        uFibers: { value: fibers },
        uR0: { value: new Float32Array(hexToRgb(ramp[0])) },
        uR1: { value: new Float32Array(hexToRgb(ramp[1])) },
        uR2: { value: new Float32Array(hexToRgb(ramp[2])) },
        uR3: { value: new Float32Array(hexToRgb(ramp[3])) },
        uR4: { value: new Float32Array(hexToRgb(ramp[4])) },
        uRing: { value: ring ? 1 : 0 },
        uRingP: { value: new Float32Array(ring ? ring.slice(0, 4) : [0.9, 1, 0.8, 1.5708]) },
        uRingY: { value: ring ? ring[4] : 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    let pendingMouse: { x: number; y: number } | null = null;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerEl.getBoundingClientRect();
      const sx = gl.drawingBufferWidth / Math.max(rect.width, 1);
      const sy = gl.drawingBufferHeight / Math.max(rect.height, 1);
      pendingMouse = {
        x: (e.clientX - rect.left) * sx,
        y: (rect.height - (e.clientY - rect.top)) * sy,
      };
    };
    if (mouseInteractive) window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let resizePending = false;
    const setSize = () => {
      const rect = containerEl.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) {
        console.warn('[Plasma] Container has no size — give its parent a real width/height.', rect);
      }
      const width = Math.max(1, Math.floor(rect.width * renderScale));
      const height = Math.max(1, Math.floor(rect.height * renderScale));
      renderer.setSize(width, height);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      const res = program.uniforms.iResolution.value as Float32Array;
      res[0] = gl.drawingBufferWidth;
      res[1] = gl.drawingBufferHeight;
    };

    const ro = new ResizeObserver(() => {
      if (resizePending) return;
      resizePending = true;
      requestAnimationFrame(() => {
        resizePending = false;
        setSize();
        if (prefersReducedMotion) renderer.render({ scene: mesh });
      });
    });
    ro.observe(containerEl);
    setSize();

    let raf = 0;
    let contextLost = false;
    let isVisible = true;
    let tabVisible = document.visibilityState !== 'hidden';
    const t0 = performance.now();
    const frameInterval = 1000 / targetFps;
    let lastFrameTime = 0;

    const loop = (t: number) => {
      if (contextLost || !isVisible || !tabVisible) return;
      raf = requestAnimationFrame(loop);
      if (t - lastFrameTime < frameInterval) return;
      lastFrameTime = t;

      if (pendingMouse) {
        const m = program.uniforms.uMouse.value as Float32Array;
        m[0] = pendingMouse.x;
        m[1] = pendingMouse.y;
        pendingMouse = null;
      }

      const timeValue = (t - t0) * 0.001;
      if (direction === 'pingpong') {
        const dur = 10;
        const seg = timeValue % dur;
        const fwd = Math.floor(timeValue / dur) % 2 === 0;
        const u = seg / dur;
        const smooth = u * u * (3 - 2 * u);
        program.uniforms.uDirection.value = 1.0;
        program.uniforms.iTime.value = timeOffset + (fwd ? smooth * dur : (1 - smooth) * dur);
      } else {
        program.uniforms.iTime.value = timeOffset + timeValue;
      }
      renderer.render({ scene: mesh });
    };

    const start = () => {
      cancelAnimationFrame(raf);
      lastFrameTime = 0;
      raf = requestAnimationFrame(loop);
    };

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      contextLost = true;
      cancelAnimationFrame(raf);
    };
    const handleContextRestored = () => {
      contextLost = false;
      if (isVisible && tabVisible && !prefersReducedMotion) start();
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    const io = new IntersectionObserver(
      ([entry]) => {
        const was = isVisible;
        isVisible = entry.isIntersecting;
        if (isVisible && !was && !contextLost && tabVisible && !prefersReducedMotion) start();
      },
      { threshold: 0 }
    );
    io.observe(containerEl);

    const handleVisibilityChange = () => {
      tabVisible = document.visibilityState !== 'hidden';
      if (tabVisible && isVisible && !contextLost && !prefersReducedMotion) start();
      else cancelAnimationFrame(raf);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (freezeAt !== undefined) {
      program.uniforms.iTime.value = freezeAt;
      renderer.render({ scene: mesh });
    } else if (prefersReducedMotion) {
      program.uniforms.iTime.value = timeOffset + 2.5;
      renderer.render({ scene: mesh });
    } else {
      start();
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      if (mouseInteractive) window.removeEventListener('mousemove', handleMouseMove);
      try {
        containerEl.removeChild(canvas);
      } catch {
        /* already removed */
      }
      (gl.getExtension('WEBGL_lose_context') as { loseContext?: () => void } | null)?.loseContext?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, speed, direction, scale, opacity, mouseInteractive, renderScale, maxDpr, targetFps, iterations, lightMode, respectReducedMotion, paletteKey, timeOffset, freezeAt, silk, rampKey, fibers, ringKey]);

  return <div ref={containerRef} className={styles.container} />;
};

export default Plasma;
