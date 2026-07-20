"use client";

import { GitBranch, ArrowUpRight } from "lucide-react";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/projects";

const statusTone: Record<Project["status"], "accent" | "neutral"> = {
  Deployed: "accent",
  "Workshop Ready": "neutral",
  Optimizing: "neutral",
  Prototype: "neutral",
};

const difficultyTone: Record<Project["difficulty"], "accent" | "neutral"> = {
  Beginner: "accent",
  Intermediate: "neutral",
  Advanced: "neutral",
};

/** Static (non-animated) generated thumbnail — no image assets needed. */
function ProjectVisual({ visual }: { visual: Project["visual"] }) {
  return (
    <div className="relative h-full min-h-[160px] w-full overflow-hidden border border-line bg-black">
      {visual === "blur" && (
        <div className="absolute inset-0">
          <div className="absolute left-[15%] top-[20%] h-20 w-20 bg-accent/25 blur-xl" />
          <div className="absolute bottom-[18%] right-[20%] h-16 w-16 bg-white/10 blur-lg" />
        </div>
      )}
      {visual === "matrix" && (
        <div className="absolute inset-4 grid grid-cols-6 grid-rows-6 gap-1">
          {Array.from({ length: 36 }).map((_, i) => (
            <span
              key={i}
              className="bg-accent/25"
              style={{ opacity: 0.25 + ((i * 7) % 10) / 16 }}
            />
          ))}
        </div>
      )}
      {visual === "cpu" && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="relative h-16 w-16 border border-line bg-panel">
            <span className="absolute inset-2 border border-line" />
          </div>
        </div>
      )}
      {visual === "particles" && (
        <div className="absolute inset-0 grid grid-cols-6 gap-3 p-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="h-1 w-1 self-start bg-white/25"
              style={{ marginTop: `${(i * 13) % 80}%` }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-line py-24 md:py-32"
      aria-label="Featured projects"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <Heading
            eyebrow="Projects"
            title="Project gallery"
            subtitle="Everything members have built to understand parallel systems from the hardware up."
          />
        </Reveal>

        <ul className="grid gap-4 lg:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 0.08} as="li">
              <Card className="group grid h-full gap-5 p-5 sm:grid-cols-[200px,1fr]">
                <ProjectVisual visual={project.visual} />

                <div className="flex flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-textFaint">{project.type}</p>
                      <h3 className="mt-1 text-lg font-semibold text-white">
                        {project.name}
                      </h3>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <Tag label={project.status} tone={statusTone[project.status]} />
                      <Tag label={project.difficulty} tone={difficultyTone[project.difficulty]} />
                    </div>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-textMuted">
                    {project.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="border border-line px-2 py-0.5 font-mono text-[11px] text-textMuted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* hidden stats revealed on hover */}
                  <div className="mt-3 grid max-h-0 grid-cols-3 gap-2 overflow-hidden opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
                    {project.stats.map((stat) => (
                      <div key={stat.label} className="border border-line p-2">
                        <p className="text-[10px] text-textFaint">{stat.label}</p>
                        <p className="mt-0.5 font-mono text-xs text-accent">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-line pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-textFaint">
                      <GitBranch className="h-3.5 w-3.5" aria-hidden />
                      github.com/uh-pcs
                    </span>
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-medium text-white transition-colors hover:border-textFaint"
                    >
                      View Repository
                      <ArrowUpRight className="h-3 w-3" aria-hidden />
                    </a>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
