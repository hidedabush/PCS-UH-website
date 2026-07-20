"use client";

import {
  Cpu,
  CircuitBoard,
  Boxes,
  Network,
  type LucideIcon,
} from "lucide-react";
import Heading from "@/components/Heading";
import OfferNode from "@/components/OfferNode";
import Reveal from "@/components/Reveal";
import { offerings } from "@/data/offerings";

const icons: Record<string, LucideIcon> = {
  cpu: Cpu,
  circuit: CircuitBoard,
  boxes: Boxes,
  network: Network,
};

export default function Offerings() {
  return (
    <section
      id="offer"
      className="relative border-t border-line py-24 md:py-32"
      aria-label="What we offer"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <Heading
            eyebrow="What we offer"
            title="Programs"
            subtitle="From first CUDA kernel to portfolio-ready systems."
          />
        </Reveal>

        <ul className="grid gap-4 sm:grid-cols-2">
          {offerings.map((offering, i) => (
            <OfferNode
              key={offering.title}
              icon={icons[offering.icon] ?? Cpu}
              title={offering.title}
              description={offering.description}
              chips={offering.chips}
              delay={(i % 2) * 0.08}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
