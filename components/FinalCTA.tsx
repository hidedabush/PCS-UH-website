"use client";

import Link from "next/link";
import { ArrowRight, MessagesSquare, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { DISCORD_URL } from "@/data/nav";

export default function FinalCTA() {
  return (
    <section
      id="join"
      className="relative border-t border-line py-28 md:py-36"
      aria-label="Join UH PCS"
    >
      <div className="mx-auto max-w-site px-4 text-center sm:px-6 lg:px-10">
        <Reveal>
          <p className="mb-4 text-sm font-medium text-textMuted">Get involved</p>
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Start before you feel ready.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-textMuted">
            You do not need CUDA experience to join. PCS is built for
            students who are curious, ambitious, and ready to learn by
            building.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/membership"
              className="group inline-flex items-center gap-2 bg-accent px-6 py-3.5 text-sm font-medium text-black transition-colors hover:bg-accentHover"
            >
              Become a Member
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <a
              href={DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-textFaint"
            >
              <MessagesSquare className="h-4 w-4" aria-hidden />
              Join Discord
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-medium text-textMuted transition-colors hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden />
              Contact Officers
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
