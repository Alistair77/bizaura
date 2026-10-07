import { Belief } from "@/components/belief/Belief";
import { WhatWeBuild } from "@/components/build/WhatWeBuild";
import { AdmitOne, LetsBuild } from "@/components/closing/Closing";
import { HowWeEngage } from "@/components/engage/HowWeEngage";
import { UpcomingEvents } from "@/components/events/UpcomingEvents";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";
import { Platforms } from "@/components/platforms/Platforms";
import { WhoWeWorkWith } from "@/components/roles/WhoWeWorkWith";
import { Spine } from "@/components/spine/Spine";

/** Approved page order — do not reorder without sign-off. */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Spine />
        <UpcomingEvents />
        <WhatWeBuild />
        <Platforms />
        <WhoWeWorkWith />
        <HowWeEngage />
        <Belief />
        <LetsBuild />
        <AdmitOne />
      </main>
      <Footer />
    </>
  );
}
