import type { NextConfig } from "next";

// Static export for GitHub Pages (Alistair77.github.io/bizaura).
// - output/export + unoptimized images: Pages serves static files only.
// - basePath/assetPrefix: project pages live under /<repo>.
const nextConfig: NextConfig = {
  // A stray lockfile in the home directory confuses root inference.
  turbopack: { root: process.cwd() },
  output: "export",
  trailingSlash: true,
  basePath: "/bizaura",
  assetPrefix: "/bizaura/",
  images: {
    unoptimized: true,
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
