/**
 * When the page last scrolled, shared by every WebGL layer (plasmas, photo shaders) so they
 * can hold their frame while the user scrolls: the GPU goes to the scroll, and the slow,
 * faint backgrounds resume once scrolling settles.
 */
let lastScrollAt = -Infinity;

if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => (lastScrollAt = performance.now()), { passive: true });
}

/** ponytail: fixed idle window; raise it if layers visibly restart mid-glide. */
const SCROLL_IDLE_MS = 160;

export const isScrolling = (now: number) => now - lastScrollAt < SCROLL_IDLE_MS;
