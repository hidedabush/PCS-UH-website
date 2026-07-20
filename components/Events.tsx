"use client";

import Link from "next/link";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Reveal from "@/components/Reveal";
import { events, type PcsEvent } from "@/data/events";

const levelTone: Record<PcsEvent["level"], "accent" | "neutral"> = {
  Beginner: "accent",
  Intermediate: "neutral",
  "All Levels": "neutral",
};

export default function Events() {
  return (
    <section
      id="events"
      className="relative border-t border-line py-24 md:py-32"
      aria-label="Upcoming events"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <Heading
            eyebrow="Calendar"
            title="Upcoming events"
            subtitle="Workshops, labs, and industry nights, updated every semester."
          />
        </Reveal>

        <ol className="relative space-y-4 border-l border-line pl-6 sm:pl-10">
          {events.map((event, i) => (
            <Reveal key={event.id} delay={i * 0.05} as="li">
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[27px] top-6 h-2 w-2 bg-accent sm:-left-[43px]"
                />
                <Card className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h3 className="text-lg font-semibold text-white sm:text-xl">
                          {event.title}
                        </h3>
                        <Tag label={event.level} tone={levelTone[event.level]} />
                      </div>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-textMuted">
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                          {event.date}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Clock3 className="h-3.5 w-3.5" aria-hidden />
                          {event.time}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" aria-hidden />
                          {event.location}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {event.tags.map((tag) => (
                          <span key={tag} className="border border-line px-2 py-0.5 text-xs text-textMuted">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link
                      href="/membership"
                      className="shrink-0 bg-accent px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accentHover"
                    >
                      RSVP
                    </Link>
                  </div>
                </Card>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.15}>
          <p className="mt-10 max-w-lg text-sm leading-relaxed text-textMuted">
            Events are updated throughout the semester. Join UH PCS to
            receive workshop materials, announcements, and project access.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
