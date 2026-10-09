import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import { EventsPage } from "@/components/events-page/EventsPage";

export const metadata: Metadata = {
  title: "Events — Bizora Media",
  description:
    "Curated events, meaningful connections and real opportunities for India's business community.",
  alternates: { canonical: "/events/" },
};

/** Editorial serif for the Events page only — the homepage type system is untouched. */
const eventsSerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-events-serif",
  display: "swap",
});

export default function EventsRoute() {
  return (
    <div className={eventsSerif.variable}>
      <EventsPage />
    </div>
  );
}
