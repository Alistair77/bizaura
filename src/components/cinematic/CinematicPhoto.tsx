"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import type { Photo } from "@/content/home";

// three.js is only fetched when a cinematic photo actually scrolls into view.
const PhotoShader = dynamic(() => import("./PhotoShader"), { ssr: false });

interface CinematicPhotoProps {
  photo: Photo;
  sizes: string;
  /** CSS object-position, also fed to the shader as its focal point. */
  position?: string;
  /** Pointer parallax strength, 0–1.5. */
  depth?: number;
  /** Hero image: eager + high fetch priority. */
  eager?: boolean;
  className?: string;
}

function parseFocus(position: string): [number, number] {
  const [x = "50%", y = "50%"] = position.split(" ");
  return [parseFloat(x) / 100, parseFloat(y) / 100];
}

function supportsCinematic() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(pointer: fine)").matches) return false;
  try {
    return !!document.createElement("canvas").getContext("webgl2");
  } catch {
    return false;
  }
}

/**
 * A photograph that always renders as an optimised <img> (SSR, LCP-safe), then — on capable
 * desktop devices — upgrades to a WebGL layer with pointer depth, stage-light drift and grain.
 * The WebGL layer only lives while the photo is near the viewport.
 */
export function CinematicPhoto({
  photo,
  sizes,
  position = "50% 50%",
  depth = 1,
  eager = false,
  className,
}: CinematicPhotoProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [textureSrc, setTextureSrc] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);
  const [capable, setCapable] = useState(false);

  useEffect(() => {
    if (!supportsCinematic() || !wrapRef.current) return;
    setCapable(true);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin: "200px 0px",
    });
    io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  const showShader = Boolean(capable && inView && textureSrc);

  useEffect(() => {
    if (!showShader) setReady(false);
  }, [showShader]);

  return (
    <div ref={wrapRef} className={`cine ${ready ? "cine--live" : ""} ${className ?? ""}`}>
      <Image
        className="cine__img"
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        quality={70}
        style={{ objectPosition: position }}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        preload={eager}
        onLoad={(e) => setTextureSrc(e.currentTarget.currentSrc)}
      />
      {showShader && textureSrc && (
        <PhotoShader
          src={textureSrc}
          focus={parseFocus(position)}
          depth={depth}
          trackRef={wrapRef}
          onReady={() => setReady(true)}
        />
      )}
    </div>
  );
}
