/**
 * Events catalogue for the Bizora Events page (`/events/`).
 *
 * Featured + grid entries reuse the project's existing Unsplash photography
 * (Unsplash License placeholders — swap for real Bizora photography when
 * supplied). Copy for the featured card is the approved Events-page reference.
 */

import { BASE_PATH, UNSPLASH_QUERY, type Photo } from "./home";

const photo = (id: string, alt: string): Photo => ({
  src: `https://images.unsplash.com/photo-${id}${UNSPLASH_QUERY}`,
  alt,
});

export interface DetailedEvent {
  slug: string;
  name: string;
  category: "Conferences" | "Workshops" | "Networking" | "Webinars" | "Community";
  dateLabel: string;
  month: string;
  day: string;
  year: string;
  city: string;
  venue: string;
  attendees: string;
  description: string;
  image: Photo;
  href: string;
  online?: boolean;
}

/** Route pattern for event details (GitHub Pages static export). */
const eventHref = (slug: string) => `${BASE_PATH}/events/#${slug}`;

/** Register-interest route — reuses the existing closing contact section. */
export const REGISTER_HREF = `${BASE_PATH}/#admit-one`;

export const FEATURED_EVENT: DetailedEvent = {
  slug: "india-growth-summit-2026",
  name: "India Growth Summit 2026",
  category: "Conferences",
  dateLabel: "NOV 28, 2026",
  month: "NOV",
  day: "28",
  year: "2026",
  city: "Mumbai",
  venue: "Mumbai, India",
  attendees: "500+ attendees",
  description:
    "Bringing together industry leaders, investors and innovators to discuss what's next for a faster, more inclusive India.",
  image: photo(
    "1561489396-888724a1543d",
    "Panel discussion on a round stage before a conference audience",
  ),
  href: eventHref("india-growth-summit-2026"),
};

export const UPCOMING_EVENTS: DetailedEvent[] = [
  {
    slug: "founders-roundtable-delhi",
    name: "Founders Roundtable: Delhi",
    category: "Networking",
    dateLabel: "DEC 05, 2026",
    month: "DEC",
    day: "05",
    year: "2026",
    city: "Delhi",
    venue: "New Delhi, India",
    attendees: "80+ attendees",
    description: "An invite-only evening of honest conversation for founders scaling in NCR.",
    image: photo("1515187029135-18ee286d815b", "Founders in discussion around a table"),
    href: eventHref("founders-roundtable-delhi"),
  },
  {
    slug: "brand-storytelling-workshop",
    name: "Brand Storytelling Workshop",
    category: "Workshops",
    dateLabel: "DEC 12, 2026",
    month: "DEC",
    day: "12",
    year: "2026",
    city: "Bengaluru",
    venue: "Bengaluru, India",
    attendees: "120+ attendees",
    description: "A hands-on day on narrative, media and the stories that move markets.",
    image: photo("1552664730-d307ca884978", "Team planning in front of a wall of sticky notes"),
    href: eventHref("brand-storytelling-workshop"),
  },
  {
    slug: "india-market-entry-webinar",
    name: "India Market Entry, Live",
    category: "Webinars",
    dateLabel: "DEC 18, 2026",
    month: "DEC",
    day: "18",
    year: "2026",
    city: "Online",
    venue: "Online",
    attendees: "1,000+ attendees",
    description: "What global brands get wrong about India — and how to get it right.",
    image: photo("1544531586-fde5298cdd40", "Speaker addressing a large audience"),
    href: eventHref("india-market-entry-webinar"),
    online: true,
  },
  {
    slug: "media-leaders-meet-mumbai",
    name: "Media Leaders Meet",
    category: "Community",
    dateLabel: "JAN 09, 2027",
    month: "JAN",
    day: "09",
    year: "2027",
    city: "Mumbai",
    venue: "Mumbai, India",
    attendees: "150+ attendees",
    description: "Editors, creators and publishers on the future of business media.",
    image: photo("1475721027785-f74eccf877e2", "Microphone in front of a live audience"),
    href: eventHref("media-leaders-meet-mumbai"),
  },
  {
    slug: "growth-operators-clinic",
    name: "Growth Operators Clinic",
    category: "Workshops",
    dateLabel: "JAN 16, 2027",
    month: "JAN",
    day: "16",
    year: "2027",
    city: "Hyderabad",
    venue: "Hyderabad, India",
    attendees: "90+ attendees",
    description: "Operators trade playbooks on distribution, pricing and partnerships.",
    image: photo("1551288049-bebda4e38f71", "Analytics dashboard on a tablet screen"),
    href: eventHref("growth-operators-clinic"),
  },
  {
    slug: "investor-breakfast-bengaluru",
    name: "Investor Breakfast",
    category: "Networking",
    dateLabel: "JAN 23, 2027",
    month: "JAN",
    day: "23",
    year: "2027",
    city: "Bengaluru",
    venue: "Bengaluru, India",
    attendees: "60+ attendees",
    description: "A quiet morning for investors and the founders they back.",
    image: photo("1515169067868-5387ec356754", "Professionals in conversation at a morning event"),
    href: eventHref("investor-breakfast-bengaluru"),
  },
];

/** Searchable pool: featured first, then the grid. */
export const ALL_EVENTS: DetailedEvent[] = [FEATURED_EVENT, ...UPCOMING_EVENTS];

export const EVENT_CATEGORIES = [
  "All events",
  "Conferences",
  "Workshops",
  "Networking",
  "Webinars",
  "Community",
] as const;

export const EXTRA_CATEGORIES = ["Roundtables", "Expos", "Meetups"] as const;

export const EVENT_CITIES: string[] = Array.from(
  new Set(ALL_EVENTS.map((event) => event.city)),
).sort();

/** Placeholder metrics from the approved Events reference (verify against real data). */
export const EVENT_STATS = [
  { value: "12", label: "Upcoming events" },
  { value: "02", label: "Past events" },
  { value: "08", label: "Cities" },
] as const;
