"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Wordmark } from "@/components/brand/Wordmark";
import { Header } from "@/components/header/Header";
import { EditorialVideo } from "@/components/ui/EditorialVideo";
import { Icon } from "@/components/ui/Icon";
import { BASE_PATH } from "@/content/home";
import {
  ALL_EVENTS,
  EVENT_CATEGORIES,
  EVENT_CITIES,
  EVENT_STATS,
  EVENTS_HERO_CLIP,
  EXTRA_CATEGORIES,
  FEATURED_EVENT,
  REGISTER_HREF,
  UPCOMING_EVENTS,
  type DetailedEvent,
} from "@/content/events";
import { EventsFooter } from "./EventsFooter";
import styles from "./EventsPage.module.css";

const HOME_HREF = `${BASE_PATH}/`;
const PARTNER_HREF = `${BASE_PATH}/#admit-one`;

/** Singular tag shown on cards; the filter pills use the plural category. */
const TAG: Record<DetailedEvent["category"], string> = {
  Conferences: "Conference",
  Workshops: "Workshop",
  Networking: "Networking",
  Webinars: "Webinar",
  Community: "Community",
};

const DATE_OPTIONS = Array.from(
  new Map(ALL_EVENTS.map((event) => [`${event.month} ${event.year}`, event])).values(),
).map((event) => ({ value: `${event.month}|${event.year}`, label: `${event.dateLabel.slice(0, 3)} ${event.year}` }));

interface FilterState {
  query: string;
  date: string;
  city: string;
  category: string;
}

const NO_FILTERS: FilterState = { query: "", date: "All dates", city: "All cities", category: "All events" };

function matches(event: DetailedEvent, { query, date, city, category }: FilterState) {
  if (category !== "All events" && event.category !== category) return false;
  if (city !== "All cities" && event.city !== city) return false;
  if (date !== "All dates") {
    const [month, year] = date.split("|");
    if (event.month !== month || event.year !== year) return false;
  }
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return `${event.name} ${event.category} ${event.city} ${event.venue} ${event.description}`.toLowerCase().includes(q);
}

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg className={`${styles.chev} ${open ? styles.chevOpen : ""}`} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/** "Bizora | Events" lockup, top-left, level with the shared header controls. */
function Brand() {
  return (
    <a className={styles.brand} href={HOME_HREF} aria-label="Bizora Media — home">
      <Wordmark variant="small" className={styles.wordmark} />
      <span className={styles.brandDivider} aria-hidden="true" />
      <span className={styles.brandLabel}>Events</span>
    </a>
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
            <br />
            the industry
            <br />
            comes to <span className={styles.gradient}>decide.</span>
          </h1>
          <p className={styles.handNote} aria-hidden="true">
            Real conversations.
            <br />
            Real opportunities.
            <svg className={styles.handArrow} viewBox="0 0 70 60" focusable="false">
              <path d="M3 6 C 30 4, 52 14, 60 46" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M52.5 39.5 L60.5 47.5 L64.5 37" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
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
        <EditorialVideo
          className={styles.heroMedia}
          src={EVENTS_HERO_CLIP.src}
          poster={EVENTS_HERO_CLIP.poster}
          eager
        />
      </div>
    </section>
  );
}

function SearchBar({ filters, onChange }: { filters: FilterState; onChange: (patch: Partial<FilterState>) => void }) {
  return (
    <form className={styles.searchBar} role="search" aria-label="Search and filter events" onSubmit={(e) => e.preventDefault()}>
      <label className={styles.searchQuery}>
        <Icon name="search" size={19} strokeWidth={2} />
        <span className="visually-hidden">Search events, topics or cities</span>
        <input
          type="search"
          placeholder="Search events, topics or cities"
          value={filters.query}
          onChange={(e) => onChange({ query: e.target.value })}
        />
      </label>
      <label className={styles.segment}>
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
        <Chevron />
      </label>
      <label className={styles.segment}>
        <Icon name="pin" size={18} strokeWidth={2} />
        <span className="visually-hidden">Filter by city</span>
        <select value={filters.city} onChange={(e) => onChange({ city: e.target.value })}>
          <option>All cities</option>
          {EVENT_CITIES.map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
        <Chevron />
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
  const extraActive = (EXTRA_CATEGORIES as readonly string[]).includes(active);
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
          className={`${styles.pill} ${extraActive ? styles.pillActive : ""}`}
          aria-expanded={showMore}
          aria-haspopup="true"
          onClick={onToggleMore}
        >
          More
          <Chevron open={showMore} />
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
    </div>
  );
}

function SectionHead({ id, title, onSeeAll }: { id: string; title: string; onSeeAll: () => void }) {
  return (
    <div className={styles.sectionHead}>
      <h2 id={id} className={styles.sectionTitle}>
        {title}
      </h2>
      <button type="button" className={styles.seeAll} onClick={onSeeAll}>
        See all events
        <Icon name="arrow" size={15} strokeWidth={2.2} />
      </button>
    </div>
  );
}

function DateBlock({ event, className }: { event: DetailedEvent; className: string }) {
  return (
    <div className={className} aria-label={`Event date: ${event.dateLabel}`}>
      <span className={styles.dateMonth}>{event.month}</span>
      <span className={styles.dateDay}>{event.day}</span>
      <span className={styles.dateYear}>{event.year}</span>
    </div>
  );
}

function Facts({ event, className }: { event: DetailedEvent; className: string }) {
  return (
    <ul className={className}>
      <li>
        <Icon name="pin" size={15} strokeWidth={2} />
        {event.venue}
      </li>
      <li>
        <Icon name="people" size={15} strokeWidth={2} />
        {event.attendees}
      </li>
    </ul>
  );
}

function FeaturedCard() {
  const event = FEATURED_EVENT;
  return (
    <article className={styles.featured} id={event.slug} aria-labelledby={`${event.slug}-title`}>
      <div className={styles.featuredMedia}>
        <Image src={event.image.src} alt={event.image.alt} width={900} height={600} sizes="(max-width: 1023px) 100vw, 36vw" />
      </div>
      <DateBlock event={event} className={styles.featuredDate} />
      <div className={styles.featuredBody}>
        <p className={styles.tag}>{TAG[event.category]}</p>
        <h3 id={`${event.slug}-title`} className={styles.featuredTitle}>
          {event.name}
        </h3>
        <p className={styles.featuredDesc}>{event.description}</p>
        <Facts event={event} className={styles.featuredFacts} />
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
          height={220}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1023px) 50vw, 33vw"
        />
      </div>
      <div className={styles.cardBody}>
        <DateBlock event={event} className={styles.cardDate} />
        <div className={styles.cardMain}>
          <p className={styles.tag}>{TAG[event.category]}</p>
          <h3 id={`${event.slug}-title`} className={styles.cardTitle}>
            {event.name}
          </h3>
          <p className={styles.cardDesc}>{event.description}</p>
          <Facts event={event} className={styles.cardFacts} />
          <a className={`${styles.btnPrimary} ${styles.btnSmall}`} href={REGISTER_HREF} aria-label={`Register for ${event.name}`}>
            Register now
            <Icon name="arrow" size={15} strokeWidth={2.2} />
          </a>
        </div>
      </div>
    </article>
  );
}

function PartnerBanner() {
  return (
    <section className={styles.partner} aria-labelledby="partner-title">
      <div className={styles.partnerCopy}>
        <p className={styles.partnerEyebrow}>Partner with us</p>
        <h2 id="partner-title" className={styles.partnerTitle}>
          Want your brand
          <br />
          <span className={styles.gradient}>in the room?</span>
        </h2>
      </div>
      <span className={styles.partnerDivider} aria-hidden="true" />
      <p className={styles.partnerText}>
        Partner with Bizora Events to connect with decision-makers, build meaningful relationships and generate real
        opportunities.
      </p>
      <a className={styles.btnLight} href={PARTNER_HREF}>
        Explore partnership
        <Icon name="arrow" size={17} strokeWidth={2.2} />
      </a>
    </section>
  );
}

export function EventsPage() {
  const [filters, setFilters] = useState<FilterState>(NO_FILTERS);
  const [showMore, setShowMore] = useState(false);

  const patch = (p: Partial<FilterState>) => setFilters((f) => ({ ...f, ...p }));
  const results = useMemo(() => UPCOMING_EVENTS.filter((event) => matches(event, filters)), [filters]);
  const reset = () => setFilters(NO_FILTERS);
  const isFiltering = JSON.stringify(filters) !== JSON.stringify(NO_FILTERS);

  return (
    <div id="top" className={styles.page}>
      <Header variant="back" />
      <div className={`container ${styles.brandBar}`}>
        <Brand />
      </div>
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
          <SectionHead id="upcoming-title" title="Upcoming events" onSeeAll={reset} />
          <FeaturedCard />
        </section>

        <section className={`container ${styles.also}`} aria-labelledby="also-title">
          <SectionHead id="also-title" title="Also upcoming events" onSeeAll={reset} />
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
      <EventsFooter />
    </div>
  );
}
