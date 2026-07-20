import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import Reveal from "@/components/Reveal";
import Events from "@/components/Events";

export const metadata: Metadata = {
  title: "Events — UH PCS",
  description: "Upcoming UH PCS workshops, hackathons, and info sessions.",
};

export default function EventsPage() {
  return (
    <SiteChrome>
      <section className="relative pb-8 pt-36 md:pt-44">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="mb-4 text-sm font-medium text-textMuted">Events</p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Plan your semester.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-textMuted">
              Workshops, hackathons, and industry nights — updated every
              semester.
            </p>
          </Reveal>
        </div>
      </section>

      <Events />
    </SiteChrome>
  );
}
