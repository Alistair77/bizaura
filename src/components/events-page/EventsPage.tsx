"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Wordmark } from "@/components/brand/Wordmark";
import { Footer } from "@/components/footer/Footer";
import { Icon } from "@/components/ui/Icon";
import { BASE_PATH, PHOTOS } from "@/content/home";
import {
  ALL_EVENTS,
  EVENT_CATEGORIES,
  EVENT_CITIES,
  EVENT_STATS,
  EXTRA_CATEGORIES,
  FEATURED_EVENT,
  REGISTER_HREF,
  UPCOMING_EVENTS,
  type DetailedEvent,
} from "@/content/events";
import styles from "./EventsPage.module.css";

const HOME_HREF = `${BASE_PATH}/`;
const PARTNER_HREF = `${BASE_PATH}/#admit-one`;

const DATE_OPTIONS = Array.from(
  new Map(ALL_EVENTS.map((event) => [`${event.month} ${event.year}`, event])).values(),
).map((event) => ({ value: `${event.month}|${event.year}`, label: `${event.dateLabel.slice(0, 3)} ${event.year}` }));

function matches(event: DetailedEvent, query: string, date: string, city: string, category: string) {
  if (category !== "All events" && event.category !== category) return false;
  if (city !== "All cities" && event.city !== city) return false;
  if (date !== "All dates") {
    const [month, year] = date.split("|");
    if (event.month !== month || event.year !== year) return false;
  }
  const q = query.trim().toLowerCase();
  if (q) {
    const haystack = `${event.name} ${event.category} ${event.city} ${event.venue} ${event.description}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  return true;
}

function EventsHeader() {
  return (
    <header className={styles.siteHeader}>
      <div className={`container ${styles.siteHeaderInner}`}>
        <a className={styles.brand} href={HOME_HREF} aria-label="Bizora Media — home">
          <Wordmark variant="small" className={styles.wordmark} />
          <span className={styles.divider} aria-hidden="true" />
          <span className={styles.eventsLabel}>Events</span>
        </a>
        <a className={styles.homeLink} href={HOME_HREF}>
          bizoramedia.com
          <Icon name="arrow" size={15} strokeWidth={2.2} />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="events-title">
      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Events that move business forward</p>
          <h1 id="events-title" className={styles.headline}>
            Rooms where
            <br aria-hidden="true" />
            the industry
            <br aria-hidden="true" />
            comes to <span className={styles.gradient}>decide.</span>
          </h1>
          <p className={styles.handNote} aria-hidden="true">
            where the right rooms meet
            <svg className={styles.handArrow} viewBox="0 0 120 60" focusable="false">
              <path
                d="M8 10 C 50 8, 90 14, 104 46 M104 46 l-12 -6 M104 46 l3 -13"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </p>
          <p className={styles.support}>
            Curated events, meaningful connections and real opportunities for India&rsquo;s business community.
          </p>
          <dl className={styles.stats} aria-label="Event statistics">
            {EVENT_STATS.map((stat) => (
              <div key={stat.label} className={styles.stat}>
                <dt className={styles.statLabel}>{stat.label}</dt>
                <dd className={styles.statValue}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <figure className={styles.heroMedia}>
          <Image
            src={PHOTOS.closingStage.src}
            alt={PHOTOS.closingStage.alt}
            width={1671}
            height={941}
            priority
            sizes="(max-width: 900px) 100vw, 46vw"
          />
        </figure>
      </div>
    </section>
  );
}

interface FilterState {
  query: string;
  date: string;
  city: string;
  category: string;
}

function SearchBar({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
}) {
  return (
    <form
      className={styles.searchBar}
      role="search"
      aria-label="Search and filter events"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className={`${styles.searchField} ${styles.searchQuery}`}>
        <Icon name="search" size={19} strokeWidth={2} />
        <span className="visually-hidden">Search events, topics or cities</span>
        <input
          type="search"
          placeholder="Search events, topics or cities"
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
        />
      </label>
      <span className={styles.searchSeparator} aria-hidden="true" />
      <label className={`${styles.searchField} ${styles.searchSelect}`}>
        <Icon name="calendar" size={18} strokeWidth={2} />
        <span className="visually-hidden">Filter by date</span>
        <select value={filters.date} onChange={(e) => onChange({ date: e.target.value })}>
          <option>All dates</option>
          {DATE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg className={styles.chev} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </label>
      <span className={styles.searchSeparator} aria-hidden="true" />
      <label className={`${styles.searchField} ${styles.searchSelect}`}>
        <Icon name="pin" size={18} strokeWidth={2} />
        <span className="visually-hidden">Filter by city</span>
        <select value={filters.city} onChange={(e) => onChange({ city: e.target.value })}>
          <option>All cities</option>
          {EVENT_CITIES.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
        <svg className={styles.chev} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </label>
      <button className={styles.searchGo} type="submit" aria-label="Search events">
        <Icon name="arrow" size={20} strokeWidth={2.4} />
      </button>
    </form>
  );
}

function CategoryPills({
  active,
  showMore,
  onSelect,
  onToggleMore,
}: {
  active: string;
  showMore: boolean;
  onSelect: (category: string) => void;
  onToggleMore: () => void;
}) {
  return (
    <div className={styles.pills} role="group" aria-label="Filter by category">
      {EVENT_CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          className={`${styles.pill} ${active === category ? styles.pillActive : ""}`}
          aria-pressed={active === category}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
      <div className={styles.moreWrap}>
        <button
          type="button"
          className={`${styles.pill} ${EXTRA_CATEGORIES.includes(active as (typeof EXTRA_CATEGORIES)[number]) ? styles.pillActive : ""}`}
          aria-expanded={showMore}
          aria-haspopup="true"
          onClick={onToggleMore}
        >
          More
          <svg
            className={`${styles.chev} ${showMore ? styles.chevOpen : ""}`}
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
        {showMore && (
          <ul className={styles.moreMenu} role="menu" aria-label="More categories">
            {EXTRA_CATEGORIES.map((category) => (
              <li key={category} role="none">
                <button type="button" role="menuitem" onClick={() => onSelect(category)}>
                  {category}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {active !== "All events" && (
        <button type="button" className={styles.clearFilters} onClick={() => onSelect("All events")}>
          Clear ×
        </button>
      )}
    </div>
  );
}

function FeaturedCard() {
  const event = FEATURED_EVENT;
  return (
    <article className={styles.featured} id={event.slug} aria-labelledby={`${event.slug}-title`}>
      <div className={styles.featuredMedia}>
        <Image
          src={event.image.src}
          alt={event.image.alt}
          width={900}
          height={700}
          sizes="(max-width: 900px) 100vw, 34vw"
        />
      </div>
      <div className={styles.featuredDateCol} aria-label={`Event date: ${event.dateLabel}`}>
        <span className={styles.featuredMonth}>{event.month}</span>
        <span className={styles.featuredDay}>{event.day}</span>
        <span className={styles.featuredYear}>{event.year}</span>
      </div>
      <div className={styles.featuredBody}>
        <p className={styles.featuredCat}>{event.category}</p>
        <h3 id={`${event.slug}-title`} className={styles.featuredTitle}>
          {event.name}
        </h3>
        <p className={styles.featuredDesc}>{event.description}</p>
        <ul className={styles.featuredFacts}>
          <li>
            <Icon name="pin" size={16} strokeWidth={2} />
            {event.venue}
          </li>
          <li>
            <Icon name="people" size={16} strokeWidth={2} />
            {event.attendees}
          </li>
        </ul>
      </div>
      <div className={styles.featuredActions}>
        <a className={styles.btnPrimary} href={REGISTER_HREF}>
          Register now
          <Icon name="arrow" size={17} strokeWidth={2.2} />
        </a>
        <a className={styles.textLink} href={event.href}>
          View details
          <Icon name="arrow" size={15} strokeWidth={2.2} />
        </a>
      </div>
    </article>
  );
}

function GridCard({ event }: { event: DetailedEvent }) {
  return (
    <article className={styles.card} id={event.slug} aria-labelledby={`${event.slug}-title`}>
      <div className={styles.cardMedia}>
        <Image
          src={event.image.src}
          alt={event.image.alt}
          width={800}
          height={520}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className={styles.cardTag}>{event.category}</span>
      </div>
      <div className={styles.cardBody}>
        <p className={styles.cardDate}>{event.dateLabel}</p>
        <h3 id={`${event.slug}-title`} className={styles.cardTitle}>
          {event.name}
        </h3>
        <p className={styles.cardPlace}>
          <Icon name="pin" size={15} strokeWidth={2} />
          {event.venue}
        </p>
        <p className={styles.cardMeta}>
          <Icon name="people" size={15} strokeWidth={2} />
          {event.attendees}
        </p>
        <p className={styles.cardDesc}>{event.description}</p>
        <div className={styles.cardActions}>
          <a className={styles.btnPrimary} href={REGISTER_HREF} aria-label={`Register for ${event.name}`}>
            Register
            <Icon name="arrow" size={16} strokeWidth={2.2} />
          </a>
          <a className={styles.textLink} href={event.href} aria-label={`View details for ${event.name}`}>
            View details
            <Icon name="arrow" size={14} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </article>
  );
}

function PartnerBanner() {
  return (
    <section className={styles.partner} aria-labelledby="partner-title">
      <div className={`container ${styles.partnerInner}`}>
        <div className={styles.partnerCopy}>
          <p className={styles.partnerEyebrow}>Partner with us</p>
          <h2 id="partner-title" className={styles.partnerTitle}>
            Want your brand <span className={styles.gradient}>in the room?</span>
          </h2>
        </div>
        <span className={styles.partnerDivider} aria-hidden="true" />
        <p className={styles.partnerText}>
          Partner with Bizora Events to connect with decision-makers, build meaningful relationships and generate
          real opportunities.
        </p>
        <a className={styles.btnLight} href={PARTNER_HREF}>
          Explore partnership
          <Icon name="arrow" size={17} strokeWidth={2.2} />
        </a>
      </div>
    </section>
  );
}

export function EventsPage() {
  const [filters, setFilters] = useState<FilterState>({
    query: "",
    date: "All dates",
    city: "All cities",
    category: "All events",
  });
  const [showMore, setShowMore] = useState(false);

  const patch = (p: Partial<FilterState>) => setFilters((f) => ({ ...f, ...p }));

  const results = useMemo(
    () => UPCOMING_EVENTS.filter((event) => matches(event, filters.query, filters.date, filters.city, filters.category)),
    [filters],
  );

  const reset = () =>
    setFilters({ query: "", date: "All dates", city: "All cities", category: "All events" });

  const isFiltering =
    filters.query.trim() !== "" || filters.date !== "All dates" || filters.city !== "All cities" || filters.category !== "All events";

  return (
    <div id="top" className={styles.page}>
      <EventsHeader />
      <main id="main">
        <Hero />
        <div className={`container ${styles.controls}`}>
          <SearchBar filters={filters} onChange={patch} />
          <CategoryPills
            active={filters.category}
            showMore={showMore}
            onSelect={(category) => {
              patch({ category });
              setShowMore(false);
            }}
            onToggleMore={() => setShowMore((v) => !v)}
          />
        </div>

        <section className={`container ${styles.upcoming}`} aria-labelledby="upcoming-title">
          <div className={styles.sectionHead}>
            <h2 id="upcoming-title" className={styles.sectionTitle}>
              Upcoming events
            </h2>
            <button type="button" className={styles.seeAll} onClick={reset}>
              See all events
              <Icon name="arrow" size={16} strokeWidth={2.2} />
            </button>
          </div>
          <FeaturedCard />
        </section>

        <section className={`container ${styles.also}`} aria-labelledby="also-title">
          <h2 id="also-title" className={styles.sectionTitle}>
            Also upcoming events
          </h2>
          {results.length > 0 ? (
            <ul className={styles.grid}>
              {results.map((event) => (
                <li key={event.slug}>
                  <GridCard event={event} />
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No events match those filters.</p>
              <p className={styles.emptyText}>Try a different search, date or city.</p>
              <button type="button" className={styles.btnPrimary} onClick={reset}>
                Reset filters
                <Icon name="arrow" size={16} strokeWidth={2.2} />
              </button>
            </div>
          )}
          {isFiltering && results.length > 0 && (
            <p className={styles.resultCount} role="status">
              Showing {results.length} of {UPCOMING_EVENTS.length} events
            </p>
          )}
        </section>

        <div className={`container ${styles.partnerWrap}`}>
          <PartnerBanner />
        </div>
      </main>
      <Footer />
    </div>
  );
}
