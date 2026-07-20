import type { Metadata } from "next";
import SiteChrome from "@/components/SiteChrome";
import Card from "@/components/Card";
import Reveal from "@/components/Reveal";
import Officers from "@/components/Officers";

export const metadata: Metadata = {
  title: "About — UH PCS",
  description:
    "What UH PCS is, why parallel computing matters, and who can join.",
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <section className="relative pb-8 pt-36 md:pt-44">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-10">
          <Reveal>
            <p className="mb-4 text-sm font-medium text-textMuted">About</p>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl">
              Built by students. For students.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-textMuted">
              UH PCS is a student-led technical organization at the
              University of Houston, focused on GPU computing, CUDA,
              high-performance systems, and performance-oriented engineering.
            </p>
          </Reveal>
        </div>
      </section>

      <section
        className="relative border-t border-line py-20 md:py-28"
        aria-label="Why parallel computing matters"
      >
        <div className="mx-auto grid max-w-site gap-4 px-4 sm:px-6 md:grid-cols-2 lg:px-10">
          <Reveal>
            <Card className="h-full p-7 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-textFaint">
                Why it matters
              </p>
              <p className="mt-4 text-base leading-relaxed text-textMuted">
                AI, graphics, robotics, and large-scale data systems all run
                on parallel computation. Most CS/ECE curricula don&apos;t
                teach it — we do.
              </p>
            </Card>
          </Reveal>
          <Reveal delay={0.1}>
            <Card className="h-full p-7 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.1em] text-textFaint">
                Who can join
              </p>
              <p className="mt-4 text-base leading-relaxed text-textMuted">
                Any UH student, any major, any year. No CUDA or GPU
                experience required — curiosity is the only prerequisite.
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      <Officers />
    </SiteChrome>
  );
}
