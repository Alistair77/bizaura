"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Plasma } from "@/components/hero/Plasma";
import { HandArrow } from "@/components/ui/HandArrow";
import { Icon } from "@/components/ui/Icon";
import { pointerTilt } from "@/components/ui/pointerTilt";
import { TornEdge } from "@/components/ui/TornEdge";
import { EVENTS, EVENTS_INDEX_HREF, type EventItem } from "@/content/home";
import styles from "./UpcomingEvents.module.css";

const tilt = pointerTilt(4);
/** Mouse-drag momentum: velocity decay per frame (0–1). */
const FRICTION = 0.92;
const DRAG_CLICK_THRESHOLD_PX = 6;

function EventTicket({ event }: { event: EventItem }) {
  return (
    <li className={styles.slot}>
      <article className={styles.ticketShadow} {...tilt}>
        <div className={styles.ticket}>
          <div className={styles.stub}>
            <span className={styles.month}>{event.month}</span>
            <span className={styles.day}>{event.day}</span>
            <span className={styles.year}>{event.year}</span>
          </div>
          <div className={styles.body}>
            <h3 className={styles.name}>{event.name}</h3>
            <p className={styles.city}>{event.city}</p>
            <p className={styles.category}>{event.category}</p>
          </div>
          <div className={styles.thumb}>
            <Image src={event.image.src} alt={event.image.alt} fill sizes="88px" quality={70} />
          </div>
          <a className={styles.action} href={EVENTS_INDEX_HREF} aria-label={`View details: ${event.name}`}>
            <Icon name="arrow" size={18} strokeWidth={2.4} />
          </a>
        </div>
      </article>
    </li>
  );
}

/** Native scroll (touch, trackpad, keyboard) + mouse drag with momentum for desktop. */
function useDragScroll(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let velocity = 0;
    let moved = 0;
    let raf = 0;
    let dragging = false;

    const glide = () => {
      velocity *= FRICTION;
      el.scrollLeft -= velocity;
      if (Math.abs(velocity) > 0.4) raf = requestAnimationFrame(glide);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      cancelAnimationFrame(raf);
      dragging = true;
      moved = 0;
      startX = lastX = e.clientX;
      startScroll = el.scrollLeft;
      velocity = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      velocity = e.clientX - lastX;
      lastX = e.clientX;
      moved = Math.max(moved, Math.abs(e.clientX - startX));
      if (moved > DRAG_CLICK_THRESHOLD_PX) {
        el.dataset.dragging = "true";
        el.scrollLeft = startScroll - (e.clientX - startX);
      }
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      delete el.dataset.dragging;
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) raf = requestAnimationFrame(glide);
    };
    // Swallow the click that ends a drag so links don't fire.
    const onClick = (e: MouseEvent) => {
      if (moved > DRAG_CLICK_THRESHOLD_PX) {
        e.preventDefault();
        e.stopPropagation();
        moved = 0;
      }
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, [ref]);
}

export function UpcomingEvents() {
  const railRef = useRef<HTMLDivElement>(null);
  useDragScroll(railRef);

  return (
    <section id="events" className={styles.section} aria-labelledby="events-heading">
      {/* Hero plasma carried down — brighter than the Engage band. */}
      <div className={styles.eventsPlasma} aria-hidden="true">
        <Plasma
          speed={0.3}
          direction="pingpong"
          scale={1.4}
          opacity={0.4}
          mouseInteractive={false}
          renderScale={0.28}
          maxDpr={1.25}
          targetFps={30}
          iterations={32}
          lightMode={true}
        />
      </div>
      <div className={`container ${styles.layout}`}>
        <div className={styles.tab}>
          <TornEdge edge="left" fill="var(--color-blue-deep)" seed={41} depth={22} className={styles.tabTear} />
          <h2 id="events-heading" className={`hand ${styles.tabTitle}`}>
            Upcoming
            <br />
            events
          </h2>
          <HandArrow variant="flickRight" className={styles.tabArrow} />
        </div>

        <div
          ref={railRef}
          className={styles.rail}
          tabIndex={0}
          role="region"
          aria-label="Upcoming events — scroll horizontally"
        >
          <ul className={styles.track}>
            {EVENTS.map((event, i) => (
              <EventTicket key={`${event.name}-${i}`} event={event} />
            ))}
            <li className={styles.seeAllSlot}>
              <a className={styles.seeAll} href={EVENTS_INDEX_HREF}>
                See all events <Icon name="arrow" size={16} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
