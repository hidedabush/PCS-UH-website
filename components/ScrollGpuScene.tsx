"use client";

import dynamic from "next/dynamic";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useSharedScrollProgress } from "@/lib/scroll-context";
import GpuPoster from "@/components/GpuPoster";

const GpuModel = dynamic(() => import("@/components/GpuModel"), {
  ssr: false,
  loading: () => null,
});

/**
 * The 4090 render, mounted once at the page root as a fixed full-viewport
 * layer sitting behind every section. It never remounts between sections —
 * only its pose changes — so the card reads as one continuous presence
 * threaded through the whole scroll, not a hero-only decoration. Near the
 * final CTA it dims to a faint silhouette rather than a hero-only prop.
 *
 * Must be rendered inside a <ScrollProgressProvider> — it reads the shared
 * scroll value rather than starting its own `useScroll()` listener.
 */
export default function ScrollGpuScene() {
  const shared = useSharedScrollProgress();
  const fallback = useMotionValue(0);
  const scrollYProgress = shared ?? fallback;
  const opacity = useTransform(scrollYProgress, [0.82, 1], [1, 0.25]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0"
      style={{ opacity }}
    >
      {/* Ambient atmosphere — a low, localized glow behind the GPU rather
          than a flat solid fill (DESIGN.md § Visual System). Roughly
          centered on the hero pose's lateral offset (GPU sits right of
          center at scroll 0). Static, not scroll-driven — deliberately
          simple so it reads as depth/lighting, not another moving layer. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(52vw 52vw at 62% 42%, rgba(34,197,94,0.07), rgba(10,10,10,0) 60%), radial-gradient(80vw 80vw at 30% 85%, rgba(250,250,250,0.03), rgba(10,10,10,0) 65%)",
        }}
      />
      <div className="absolute inset-0 h-full w-full">
        {/* Sits behind the canvas; shows through until GpuCard's Suspense
            resolves (the canvas is alpha:true and paints nothing while
            pending), and stays the only thing rendered when the viewer
            prefers reduced motion, since GpuModel returns null in that case. */}
        <GpuPoster className="absolute inset-0 h-full w-full" />
        <GpuModel className="absolute inset-0 h-full w-full" scrollProgress={scrollYProgress} />
      </div>
      {/* Light readability scrim only — content now sits beside the card in
          its own columns instead of directly on top of it, so this stays
          minimal and the render reads clean rather than washed out. */}
      <div className="absolute inset-0 bg-ink/18" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-ink/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink/60 to-transparent" />
    </motion.div>
  );
}
