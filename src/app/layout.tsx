import type { Metadata, Viewport } from "next";
import {
  Covered_By_Your_Grace,
  Inter,
  Inter_Tight,
  Schibsted_Grotesk,
  Shadows_Into_Light_Two,
} from "next/font/google";
import { ExperienceShell } from "@/components/providers/ExperienceShell";
import { CONTACT, SITE_URL } from "@/content/home";
import "@/styles/global.css";

const sans = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
});

const hand = Covered_By_Your_Grace({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-hand-face",
  display: "swap",
  preload: false,
});

// Spec typefaces for the hero: Inter Tight 800/900 display, Inter body.
const tight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-tight",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const script = Shadows_Into_Light_Two({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-script",
  display: "swap",
  preload: false,
});

const TITLE = "Bizora Media — Where Access Turns Into Outcomes";
const DESCRIPTION =
  "Bizora brings the right intelligence, with the right media, to the right people, for the right opportunities.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: { type: "website", url: "/", siteName: "Bizora Media", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

// Static, author-controlled JSON — safe to inline.
const organizationJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Bizora Media",
  url: SITE_URL,
  slogan: "Access turns into outcomes.",
  email: CONTACT.email,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${hand.variable} ${tight.variable} ${body.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        {/* Arms scroll reveals only when JS runs, so no-JS visitors see everything. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: organizationJsonLd }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <ExperienceShell />
      </body>
    </html>
  );
}
