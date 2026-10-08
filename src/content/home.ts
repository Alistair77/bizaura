/**
 * Homepage content. Approved Bizora copy is kept verbatim.
 * Every factual field Bizora has not supplied yet is a [PLACEHOLDER].
 *
 * Photography: Unsplash placeholders (Unsplash License). They are NOT Bizora work —
 * swap each `photo()` for real Bizora event / team / production photography.
 */

// ponytail: placeholder origin until the production domain is confirmed.
export const SITE_URL = "https://www.bizoramedia.com";

/** Base path the site is served from (GitHub Pages project site). */
export const BASE_PATH = "/bizaura";

export type Accent = "violet" | "pink" | "blue" | "red" | "navy" | "yellow";

export interface Photo {
  src: string;
  alt: string;
}

/** Pre-sized at the CDN so the optimizer never pulls multi-MB originals. Must match next.config. */
export const UNSPLASH_QUERY = "?auto=format&fit=crop&w=1600&q=70";

const photo = (id: string, alt: string): Photo => ({
  src: `https://images.unsplash.com/photo-${id}${UNSPLASH_QUERY}`,
  alt,
});

export const PHOTOS = {
  /** Approved hero background asset: paper field + torn edge + conference photo (local). */
  heroBase: {
    src: `${BASE_PATH}/images/hero-background.jpg`,
    alt: "Bizora conference stage with blue lighting and a speaker at a podium before an audience, revealed past a torn paper edge",
  } as Photo,
  heroStage: photo(
    "1587825140708-dfaf72ae4b04",
    "Wide view of a large conference hall with a speaker on a central stage between two screens",
  ),
  audience: photo(
    "1540575467063-178a50c2df87",
    "Conference audience seen from behind, looking toward a softly lit stage",
  ),
  platforms: photo(
    "1558008258-3256797b43f3",
    "Conference audience in a blue-lit room facing a large presentation screen",
  ),
  /** Approved Section 08 stage photograph (local asset). */
  closingStage: {
    src: `${BASE_PATH}/images/section08-stage.jpg`,
    alt: "Bizora conference stage with blue and purple lighting, speaker and audience before a Bizora screen",
  } as Photo,
  admitOne: photo(
    "1551818255-e6e10975bc17",
    "A large auditorium audience under blue and violet stage lighting",
  ),
} as const;

/**
 * Hero editorial clip: Pexels video 19540281 (free Pexels licence), hotlinked like the
 * Unsplash photos above. 1280×720 (~2.7 MB, 20 s loop): Pexels' "sd_960" file is really
 * 426×240 and goes soft at the ~280px frame on 2× screens.
 */
export const HERO_CLIP = {
  src: "https://videos.pexels.com/video-files/19540281/19540281-hd_1280_720_24fps.mp4",
  poster:
    "https://images.pexels.com/videos/19540281/pexels-photo-19540281.jpeg?auto=compress&cs=tinysrgb&w=720&h=405&fit=crop",
} as const;

export const NAV_LINKS = [
  { label: "Intelligence", href: "#spine" },
  { label: "Forums", href: "#platforms" },
  { label: "Networks", href: "#who-we-work-with" },
  { label: "Access", href: "#how-we-engage" },
  { label: "Events", href: "#events" },
  { label: "About", href: "#belief" },
] as const;

export const INDUSTRIES = [
  "Automotive & Mobility",
  "Technology",
  "Manufacturing",
  "Infrastructure",
] as const;

export const HERO_INSIGHTS = [
  {
    title: "Opportunity",
    line: "Opportunity ignites the idea.",
    accent: "violet",
    icon: "bulb",
    target: "#what-we-build",
  },
  {
    title: "Reach",
    line: "Reach gives it momentum.",
    accent: "pink",
    icon: "chart",
    target: "#spine",
  },
  {
    title: "Access",
    line: "Access gives it the power to scale.",
    accent: "blue",
    icon: "people",
    target: "#events",
  },
] as const;

export interface EventItem {
  month: string;
  day: string;
  year: string;
  name: string;
  city: string;
  category: string;
  image: Photo;
}

/** [PLACEHOLDER] — point at the real events listing once it exists. */
export const EVENTS_INDEX_HREF = "#events";

export const EVENTS: EventItem[] = [
  {
    month: "[MON]",
    day: "[DD]",
    year: "[YYYY]",
    name: "[EVENT NAME]",
    city: "[CITY]",
    category: "[FORMAT / CATEGORY]",
    image: photo("1561489396-888724a1543d", "Placeholder: panel discussion on a round stage"),
  },
  {
    month: "[MON]",
    day: "[DD]",
    year: "[YYYY]",
    name: "[EVENT NAME]",
    city: "[CITY]",
    category: "[FORMAT / CATEGORY]",
    image: photo("1478737270239-2f02b77fc618", "Placeholder: studio microphone"),
  },
  {
    month: "[MON]",
    day: "[DD]",
    year: "[YYYY]",
    name: "[EVENT NAME]",
    city: "[CITY]",
    category: "[FORMAT / CATEGORY]",
    image: photo("1531058020387-3be344556be6", "Placeholder: audience in a historic hall"),
  },
];

export const SPINE_PILLARS = [
  {
    num: "01",
    title: "Right Intelligence",
    body: "Research, insights and industry intelligence that keeps you ahead.",
    accent: "violet",
    image: photo("1551288049-bebda4e38f71", "Analytics dashboard on a tablet screen"),
  },
  {
    num: "02",
    title: "Right Media",
    body: "Video, photo, audio and content that tell your story with impact.",
    accent: "blue",
    image: photo("1475721027785-f74eccf877e2", "Microphone in front of a live audience"),
  },
  {
    num: "03",
    title: "Right People",
    body: "Communities, leaders and industry voices in one place.",
    accent: "pink",
    image: photo("1515169067868-5387ec356754", "Professionals in conversation at an evening event"),
  },
  {
    num: "04",
    title: "Right Opportunities",
    body: "Events, partnerships and market access that create real outcomes.",
    accent: "red",
    image: photo("1561489396-888724a1543d", "Panel discussion on a round stage before an audience"),
  },
] as const;

export const BUILD_CARDS = [
  {
    num: "01",
    pill: "We build",
    title: "Signature Properties",
    body: ["Our own brands.", "Our own platforms."],
    accent: "violet",
    icon: "flag",
  },
  {
    num: "02",
    pill: "We bring to new markets",
    title: "Licensed Brands",
    body: ["Global ideas.", "Local markets."],
    accent: "pink",
    icon: "globe",
  },
  {
    num: "03",
    pill: "We build with others",
    title: "Partner Platforms",
    body: ["Joint ventures.", "Shared growth."],
    accent: "blue",
    icon: "handshake",
  },
  {
    num: "04",
    pill: "We make it happen",
    title: "Strategic Initiatives",
    body: ["Ideas to action.", "Real outcomes."],
    accent: "navy",
    icon: "spark",
  },
] as const;

export const PLATFORM_TIMELINE = [
  { num: "01", text: "Ideas get challenged.", accent: "red", icon: "bulb" },
  { num: "02", text: "Connections get made.", accent: "blue", icon: "handshake" },
  { num: "03", text: "Opportunities take shape.", accent: "pink", icon: "spark" },
] as const;

export const ROLES = [
  {
    role: "Delegate",
    body: "Be part of the right conversations.",
    accent: "blue",
    image: photo("1531058020387-3be344556be6", "Placeholder: delegates seated in a conference hall"),
  },
  {
    role: "Leader",
    body: "Share ideas and shape what’s next.",
    accent: "violet",
    image: photo("1544531586-fde5298cdd40", "Placeholder: speaker addressing a large audience"),
  },
  {
    role: "Partner",
    body: "Collaborate on events, content and communities.",
    accent: "pink",
    image: photo("1515187029135-18ee286d815b", "Placeholder: group discussion in a creative space"),
  },
  {
    role: "Global Brand",
    body: "Enter, expand and build in India.",
    accent: "red",
    image: photo("1582192730841-2a682d7375f9", "Placeholder: conference stage with large screen"),
  },
] as const;

export const ENGAGE_STAGES = [
  {
    num: "01",
    title: "Understand",
    summary: "Your goals and audience.",
    detail: "We start by understanding your business, your markets and the people you want to reach.",
    image: photo("1517245386807-bb43f82c33c4", "Hands and a laptop around a meeting table during a briefing"),
  },
  {
    num: "02",
    title: "Plan",
    summary: "The right format and partners.",
    detail: "We shape the format, the room and the partners that fit what you want to achieve.",
    image: photo("1552664730-d307ca884978", "A team planning in front of a wall of sticky notes"),
  },
  {
    num: "03",
    title: "Create",
    summary: "Events, content and community.",
    detail: "We produce the events, the content and the community moments that carry your story.",
    image: photo("1559523161-0fc0d8b38a7a", "A podcast being recorded with microphones and studio lighting"),
  },
  {
    num: "04",
    title: "Activate",
    summary: "Amplify across your platforms.",
    detail: "We take it live and amplify it across your platforms and ours.",
    image: photo("1544531586-fde5298cdd40", "A speaker addressing a large live audience"),
  },
  {
    num: "05",
    title: "Deliver",
    summary: "Real engagement and access.",
    detail: "We close the loop with real engagement, real introductions and real access.",
    image: photo("1600880292089-90a7e086ee0c", "Colleagues joining hands over a table"),
  },
] as const;

export const BELIEF_STEPS = [
  { text: "One insight", icon: "bulb" },
  { text: "One introduction", icon: "people" },
  { text: "One conversation", icon: "chat" },
  { text: "One opportunity", icon: "star" },
] as const;

export const MISSION = {
  label: "Mission",
  title: "Make business access more meaningful.",
  body: "We bring together the intelligence, people, platforms and opportunities that help businesses move forward.",
};

export const VISION = {
  label: "Vision",
  title: "The future of business is decided in conversation.",
  body: "We want to build the platforms, communities and conversations where those decisions happen.",
};

export const CONTACT = {
  // ponytail: confirm this is still the approved address before launch.
  email: "marketing@bizoramedia.com",
  location: "[LOCATION]",
};

export const FOOTER_COLUMNS = [
  {
    heading: "Explore",
    links: [
      { label: "What We Build", href: "#what-we-build" },
      { label: "Who We Work With", href: "#who-we-work-with" },
      { label: "About Us", href: "#belief" },
      { label: "Blogs", href: "#" },
      { label: "Contact", href: "#admit-one" },
    ],
  },
  {
    heading: "How We Engage",
    links: [
      { label: "Intelligence", href: "#spine" },
      { label: "Forums", href: "#platforms" },
      { label: "Networks", href: "#who-we-work-with" },
      { label: "Access", href: "#how-we-engage" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Cookie Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Instagram", href: "#", icon: "instagram" },
  { label: "YouTube", href: "#", icon: "youtube" },
] as const;
