import { cn } from "@/lib/utils";

type GpuAnnotationProps = {
  /** A real, citable spec string only — never an invented readout. See
   *  docs/design/DESIGN-ANTI-PATTERNS.md's annotation carve-out. */
  label: string;
  /** Positions this instance — pass absolute/inset utilities from the call
   *  site, since placement approximates the GPU's on-screen location per
   *  section rather than tracking it (see DESIGN.md § Content Composition). */
  className?: string;
  /** Which side the leader line extends toward. */
  side?: "left" | "right";
};

/**
 * Small monospace callout + thin leader line pointing toward the GPU — the
 * one deliberate echo of this project's earlier terminal aesthetic,
 * reintroduced narrowly as real information rather than decorative flavor
 * text. Use sparingly (see the "spend boldness in one place" note in the
 * frontend-design guidance) — this is a signature detail, not a UI pattern
 * to sprinkle everywhere the GPU appears.
 */
export default function GpuAnnotation({ label, className, side = "right" }: GpuAnnotationProps) {
  return (
    <div className={cn("absolute hidden items-center gap-2.5 lg:flex", className)}>
      {/* textFaint, not line — line (#1F1F22) is essentially invisible
          against the near-black background; a leader line that can't be
          seen defeats the point of the annotation. */}
      {side === "left" && <span className="h-px w-8 bg-textFaint" aria-hidden />}
      <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.1em] text-textFaint">
        {label}
      </span>
      {side === "right" && <span className="h-px w-8 bg-textFaint" aria-hidden />}
    </div>
  );
}
