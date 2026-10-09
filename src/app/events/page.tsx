import type { Metadata } from "next";
import { EventsPage } from "@/components/events-page/EventsPage";

export const metadata: Metadata = {
  title: "Events — Bizora Media",
  description:
    "Curated events, meaningful connections and real opportunities for India's business community.",
  alternates: { canonical: "/events/" },
};

export default function EventsRoute() {
  return <EventsPage />;
}
