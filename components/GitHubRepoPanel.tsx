"use client";

import Link from "next/link";
import { GitBranch, ArrowUpRight, Star, GitFork } from "lucide-react";
import Heading from "@/components/Heading";
import Card from "@/components/Card";
import Tag from "@/components/Tag";
import Reveal from "@/components/Reveal";
import { projects, type Project } from "@/data/projects";
import { GITHUB_URL } from "@/data/nav";

const statusTone: Record<Project["status"], "accent" | "neutral"> = {
  Deployed: "accent",
  "Workshop Ready": "neutral",
  Optimizing: "neutral",
  Prototype: "neutral",
};

/** Deterministic fake stars/forks so numbers don't shift between renders. */
function fakeStats(id: string) {
  const seed = id.charCodeAt(id.length - 1);
  return { stars: 12 + (seed % 40), forks: 3 + (seed % 10) };
}

export default function GitHubRepoPanel() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section
      id="github"
      className="relative border-t border-line py-24 md:py-32"
      aria-label="GitHub repositories"
    >
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
        <Reveal>
          <Heading
            eyebrow="Open source"
            title="Repositories"
            subtitle="PCS projects are built to be studied, forked, improved, and shown."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <Card className="overflow-hidden">
            <ul className="divide-y divide-line">
              {featured.map((project) => {
                const stats = fakeStats(project.id);
                return (
                  <li
                    key={project.id}
                    className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <GitBranch className="h-4 w-4 shrink-0 text-textFaint" aria-hidden />
                        <h3 className="text-base font-semibold text-white sm:text-lg">
                          {project.name}
                        </h3>
                        <Tag label={project.status} tone={statusTone[project.status]} />
                      </div>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-textMuted">
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
                    </div>

                    <div className="flex shrink-0 items-center gap-5 text-sm text-textFaint">
                      <span className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5" aria-hidden />
                        {stats.stars}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GitFork className="h-3.5 w-3.5" aria-hidden />
                        {stats.forks}
                      </span>
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 text-white transition-colors hover:border-textFaint"
                      >
                        View
                        <ArrowUpRight className="h-3 w-3" aria-hidden />
                      </a>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line px-5 py-4 sm:px-6">
              <p className="font-mono text-xs text-textFaint">
                git clone uh-pcs/future-of-computing
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accentHover"
                >
                  View GitHub
                </a>
                <Link
                  href="/projects#submit"
                  className="border border-line px-4 py-2 text-sm font-medium text-white transition-colors hover:border-textFaint"
                >
                  Submit a Project
                </Link>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
