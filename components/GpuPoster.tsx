/**
 * Static stand-in for the 4090 render, shown behind the WebGL canvas until
 * the model has actually drawn a frame (the canvas is `alpha: true`, so
 * while `GpuCard`'s Suspense boundary is still pending, the canvas paints
 * nothing and this shows straight through) — and shown *instead of* the
 * canvas entirely when the viewer prefers reduced motion, so that path
 * never pays for WebGL/JS at all. See MOTION-SPEC.md and TASK.md.
 *
 * Deliberately abstract, not a photo: no image asset ships with the repo,
 * and faking a product photo here would be more misleading than an
 * honest placeholder. Roughly matches the hero pose's framing (slightly
 * right of center) so the transition into the live render doesn't jump.
 * Swap this out for a real compressed product photo/render crop (WebP/
 * AVIF) before shipping, sized to the same framing.
 *
 * Deliberately has no hard edge (no border/rectangle): a real screenshot
 * showed the model's actual silhouette never fully covers a rectangular
 * area (it's a thin card at an angle, not a filled box), so an earlier
 * bordered-box version stayed visible as a ghost outline behind the live
 * render indefinitely, not just during loading. A soft, edgeless glow has
 * nothing left to "ghost" once real geometry is on screen.
 */
export default function GpuPoster({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden>
      <div className="relative h-full w-full overflow-hidden bg-ink">
        <div
          className="absolute left-1/2 top-1/2 h-[46vmin] w-[62vmin] -translate-x-1/2 -translate-y-1/2 translate-x-[8vmin]"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 45%, rgba(34,197,94,0.09), rgba(10,10,10,0) 72%)",
          }}
        />
      </div>
    </div>
  );
}
