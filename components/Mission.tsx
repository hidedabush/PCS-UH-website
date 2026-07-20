"use client";

import Heading from "@/components/Heading";
import Reveal from "@/components/Reveal";

const pillars = [
  {
    number: "01",
    title: "Learn",
    description:
      "Hands-on workshops in CUDA, GPU architecture, and systems thinking.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "Real projects that turn concepts into portfolio-ready technical work.",
  },
  {
    number: "03",
    title: "Connect",
    description:
      "Industry talks, recruiter access, alumni support, and mentorship.",
  },
];

export default function Mission() {
  return (
    <section
      id="mission"
      className="relative border-t border-line py-24 md:py-32"
      aria-label="Mission"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Heading
                eyebrow="Mission"
                title="Why parallel computing"
                subtitle="UH PCS closes the gap between traditional CS/ECE education and the real-world demand for GPU computing, parallel systems, and performance-focused engineering."
                titleFont="display"
              />
            </Reveal>
          </div>

          {/* Borderless per DESIGN.md § Content Composition — Mission is a
              GPU-adjacent narrative section, not a grid/list card context,
              so no box around this content. Numbers kept: Learn→Build→
              Connect is a real, meaningful sequence, not a decorative
              01/02/03 label. */}
          <div className="mt-8 lg:col-span-7 lg:mt-0">
            <ul className="space-y-8 sm:space-y-10">
              {pillars.map((pillar, i) => (
                <Reveal key={pillar.number} delay={i * 0.06} as="li">
                  <div className="group flex items-start gap-6">
                    <span className="font-mono text-sm text-textFaint">
                      {pillar.number}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-white transition-colors group-hover:text-accent">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-textMuted">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
