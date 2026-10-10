"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ticket from "@/components/events/UpcomingEvents.module.css";
import { HandArrow } from "@/components/ui/HandArrow";
import { TornEdge } from "@/components/ui/TornEdge";
import { BRAND_NETWORK } from "@/content/home";
import styles from "./BrandNetwork.module.css";

type Brand = (typeof BRAND_NETWORK)[number];

/** Tickets per marquee copy; short brand lists repeat to fill it (each copy ≥ a wide screen). */
const MIN_TICKETS = 8;

/** Same ticket as Upcoming Events (perforation, notches, grain), carrying the brand's logo. */
function BrandTicket({ brand }: { brand: Brand }) {
  return (
    <li className={styles.slot}>
      <article className={ticket.ticketShadow}>
        <div className={`${ticket.ticket} ${styles.brandTicket}`}>
          <div className={styles.logoCell}>
            <Image
              className={styles.logo}
              src={brand.logo.src}
              alt={brand.logo.alt}
              width={brand.logo.width}
              height={brand.logo.height}
              sizes="260px"
            />
          </div>
          <span className={styles.stub} aria-hidden="true" />
        </div>
      </article>
    </li>
  );
}

/**
 * "Our network" — brands we work with, as an endless ticket marquee. One copy of the list
 * (repeated up to MIN_TICKETS) renders twice; the track slides by exactly one copy, so the
 * loop is seamless. Pauses on hover and while off-screen.
 */
export function BrandNetwork() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      el.dataset.paused = entry.isIntersecting ? "false" : "true";
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const repeats = Math.max(1, Math.ceil(MIN_TICKETS / BRAND_NETWORK.length));
  const items = Array.from({ length: repeats }, () => BRAND_NETWORK).flat();

  const list = (copy: number) => (
    <ul className={styles.list} aria-hidden={copy > 0 || undefined}>
      {items.map((brand, i) => (
        <BrandTicket key={`${copy}-${i}`} brand={brand} />
      ))}
    </ul>
  );

  return (
    <section id="network" className={ticket.section} aria-labelledby="network-heading">
      <div className={`container ${ticket.layout}`}>
        <div className={ticket.tab} data-reveal>
          <TornEdge edge="left" fill="var(--color-blue-deep)" seed={57} depth={22} className={ticket.tabTear} />
          <h2 id="network-heading" className={`hand ${ticket.tabTitle}`}>
            Our
            <br />
            network
          </h2>
          <HandArrow variant="flickRight" className={ticket.tabArrow} />
        </div>

        <div
          ref={marqueeRef}
          className={styles.marquee}
          role="region"
          aria-label="Brands in the Bizora network"
          data-reveal
          style={{ "--reveal-delay": "140ms", "--reveal-x": "36px", "--reveal-y": "0px" } as React.CSSProperties}
        >
          <div className={styles.track}>
            {list(0)}
            {list(1)}
          </div>
        </div>
      </div>
    </section>
  );
}
