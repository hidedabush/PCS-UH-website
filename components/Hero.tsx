"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github } from "lucide-react";
import { GITHUB_URL } from "@/data/nav";
import GpuAnnotation from "@/components/GpuAnnotation";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

/**
 * Editorial hero, restructured after a reference pass (Dogstudio/Dept-
 * style): oversized stacked display type is allowed to overlap the GPU
 * directly, instead of staying confined to its own column — see DESIGN.md
 * § Hero. The GPU (ScrollGpuScene, fixed page-root layer) sits behind
 * everything here; this component only lays out the foreground.
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-between gap-8 pb-12 pt-28 sm:pb-16 sm:pt-32"
      aria-label="Introduction"
    >
      {/* Thin diagonal accent lines — a structural device, not chrome.
          Low-contrast (textFaint), never uhred (that stays a ≤5%
          micro-accent per DESIGN-ANTI-PATTERNS.md). */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        aria-hidden
        preserveAspectRatio="none"
      >
        <line x1="0%" y1="8%" x2="38%" y2="62%" stroke="#5C5C63" strokeWidth="1" />
        <line x1="82%" y1="18%" x2="58%" y2="78%" stroke="#5C5C63" strokeWidth="1" />
      </svg>

      <div className="relative z-10 mx-auto w-full max-w-site px-4 sm:px-6 lg:px-10">
        <motion.a
          href="#offer"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 text-sm font-medium text-textMuted transition-colors hover:text-white"
        >
          <ArrowRight className="h-3.5 w-3.5 -rotate-45 text-accent" aria-hidden />
          View Workshops
        </motion.a>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-site px-4 sm:px-6 lg:px-10"
      >
        <motion.p variants={item} className="mb-2 text-sm font-medium text-textMuted">
          University of Houston Parallel Computing Society
        </motion.p>

        <h1 className="font-display font-semibold leading-[0.95] tracking-tight text-white">
          <motion.span
            variants={item}
            className="block text-6xl sm:text-7xl md:text-8xl xl:text-[7.5rem]"
          >
            The future
          </motion.span>
          <motion.span
            variants={item}
            className="block text-6xl sm:text-7xl md:text-8xl xl:text-[7.5rem]"
          >
            of computing
          </motion.span>
          <motion.span
            variants={item}
            className="block text-6xl text-accent sm:text-7xl md:text-8xl xl:text-[7.5rem]"
          >
            is parallel.
          </motion.span>
        </h1>
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-site px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-md"
        >
          <p className="text-base leading-relaxed text-textMuted">
            A student-led community for GPU computing, CUDA, and
            high-performance systems.
          </p>
          <p className="mt-2 text-sm text-textFaint">
            No prior GPU experience required.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link
              href="/membership"
              className="group inline-flex items-center gap-2 bg-accent px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-accentHover"
            >
              Join PCS
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-line px-5 py-3 text-sm font-medium text-white transition-colors hover:border-textFaint"
            >
              <Github className="h-4 w-4" aria-hidden />
              Explore GitHub
            </a>
          </div>
        </motion.div>
      </div>

      <GpuAnnotation
        label="24GB GDDR6X"
        side="left"
        className="right-[6%] top-[24%] -translate-y-1/2"
      />
    </section>
  );
}
