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

/**
 * Events hero clip: speaker on a lit stage (Pexels 20320583, free licence), hotlinked.
 * Verified 1280×720, ~1.1 MB, 7 s loop — sharp at the ~520px hero frame on 2× screens.
 */
export const EVENTS_HERO_CLIP = {
  src: "https://videos.pexels.com/video-files/20320583/20320583-hd_1280_720_60fps.mp4",
  poster:
    "https://images.pexels.com/videos/20320583/pexels-photo-20320583.jpeg?auto=compress&cs=tinysrgb&w=1040&h=623&fit=crop",
} as const;

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
    "1570168007204-dfb528c6958f",
    "The Gateway of India in Mumbai under a pink evening sky",
  ),
  href: eventHref("india-growth-summit-2026"),
};

export const UPCOMING_EVENTS: DetailedEvent[] = [
  {
    slug: "ai-for-business-leaders",
    // ponytail: placeholder name until the real event title is confirmed.
    name: "Autodesk",
    category: "Workshops",
    dateLabel: "DEC 10, 2026",
    month: "DEC",
    day: "10",
    year: "2026",
    city: "Bengaluru",
    venue: "Bengaluru, India",
    attendees: "200+ attendees",
    description: "A hands-on workshop for leaders exploring practical AI adoption in real business contexts.",
    image: photo("1704853241465-3c65c2c90533", "City skyline of tall buildings under a clear sky"),
    href: eventHref("ai-for-business-leaders"),
  },
  {
    slug: "creator-economy-summit",
    // ponytail: placeholder name until the real event title is confirmed.
    name: "Autodesk",
    category: "Conferences",
    dateLabel: "DEC 15, 2026",
    month: "DEC",
    day: "15",
    year: "2026",
    city: "Delhi",
    venue: "New Delhi, India",
    attendees: "300+ attendees",
    description: "Uniting creators, brands and platforms to explore the next wave of opportunities.",
    image: photo("1769755409781-9e8924c57362", "Speaker on a lit stage before a large audience"),
    href: eventHref("creator-economy-summit"),
  },
  {
    slug: "founders-investors-meet",
    // ponytail: placeholder name until the real event title is confirmed.
    name: "Autodesk",
    category: "Networking",
    dateLabel: "JAN 18, 2027",
    month: "JAN",
    day: "18",
    year: "2027",
    city: "Mumbai",
    venue: "Mumbai, India",
    attendees: "150+ attendees",
    description: "An exclusive networking event for early-stage founders and investors.",
    image: photo("1724866976376-4b217d29a462", "Professionals talking at a busy networking event"),
    href: eventHref("founders-investors-meet"),
  },
  {
    slug: "sustainable-business-forum",
    // ponytail: placeholder name until the real event title is confirmed.
    name: "Autodesk",
    category: "Workshops",
    dateLabel: "JAN 25, 2027",
    month: "JAN",
    day: "25",
    year: "2027",
    city: "Hyderabad",
    venue: "Hyderabad, India",
    attendees: "200+ attendees",
    description: "Practical strategies for building sustainable and resilient businesses.",
    image: photo("1573164574572-cb89e39749b4", "Business leaders around a long boardroom table"),
    href: eventHref("sustainable-business-forum"),
  },
  {
    slug: "india-tech-leaders-summit",
    // ponytail: placeholder name until the real event title is confirmed.
    name: "Autodesk",
    category: "Conferences",
    dateLabel: "FEB 12, 2027",
    month: "FEB",
    day: "12",
    year: "2027",
    city: "Pune",
    venue: "Pune, India",
    attendees: "400+ attendees",
    description: "Conversations on innovation, talent and the future of India’s tech ecosystem.",
    image: photo("1762968274962-20c12e6e8ecd", "Speaker presenting on stage under bright screens"),
    href: eventHref("india-tech-leaders-summit"),
  },
  {
    slug: "women-in-business-forum",
    // ponytail: placeholder name until the real event title is confirmed.
    name: "Autodesk",
    category: "Community",
    dateLabel: "FEB 26, 2027",
    month: "FEB",
    day: "26",
    year: "2027",
    city: "Chennai",
    venue: "Chennai, India",
    attendees: "250+ attendees",
    description: "Real stories, real insights and real connections for women shaping India’s future.",
    image: photo("1573167507387-6b4b98cb7c13", "A woman leading a discussion at a conference table"),
    href: eventHref("women-in-business-forum"),
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
