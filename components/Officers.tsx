"use client";

import { AtSign } from "lucide-react";
import Card from "@/components/Card";
import Heading from "@/components/Heading";
import Reveal from "@/components/Reveal";
import { officers } from "@/data/officers";

/** Deterministic abstract avatar pattern — no generic stock profile photos. */
function NodeAvatar({ seed }: { seed: number }) {
  const cells = Array.from(
    { length: 25 },
    (_, i) => Math.sin(seed * 37.7 + i * 13.13) * 0.5 + 0.5
  );
  return (
    <svg viewBox="0 0 60 60" className="h-14 w-14" role="img" aria-label="Abstract officer avatar">
      <rect x="1" y="1" width="58" height="58" fill="#0A0A0A" stroke="#1F1F22" />
      {cells.map((v, i) => {
        const x = 8 + (i % 5) * 9.5;
        const y = 8 + Math.floor(i / 5) * 9.5;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="6.5"
            height="6.5"
            fill={v > 0.5 ? "#22C55E" : "#2A2A2E"}
            opacity={v > 0.5 ? 0.9 : 0.6}
          />
        );
      })}
    </svg>
  );
}

export default function Officers() {
  return (
    <section
      id="officers"
      className="relative border-t border-line py-24 md:py-32"
      aria-label="Officers"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <Heading eyebrow="Board" title="Officers" subtitle="The students running UH PCS this year." />
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {officers.map((officer, i) => (
            <Reveal key={officer.id} delay={(i % 3) * 0.06} as="li">
              <Card className="h-full p-6">
                <NodeAvatar seed={i + 1} />
                <h3 className="mt-4 text-lg font-semibold text-white">{officer.name}</h3>
                <p className="text-sm text-accent">{officer.role}</p>
                <dl className="mt-4 space-y-1 border-t border-line pt-4 text-sm text-textMuted">
                  <div className="flex gap-2">
                    <dt className="w-14 shrink-0 text-textFaint">Major</dt>
                    <dd>{officer.major}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="w-14 shrink-0 text-textFaint">Focus</dt>
                    <dd>{officer.focus}</dd>
                  </div>
                </dl>
                <a
                  href={officer.contact}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-textMuted transition-colors hover:text-white"
                >
                  <AtSign className="h-3.5 w-3.5" aria-hidden />
                  Contact
                </a>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
