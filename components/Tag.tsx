import { cn } from "@/lib/utils";

type TagProps = {
  label: string;
  tone?: "neutral" | "accent" | "red";
  /** small static square before the label — no pulse/animation */
  dot?: boolean;
  className?: string;
};

const toneStyles: Record<NonNullable<TagProps["tone"]>, string> = {
  neutral: "text-textMuted border-line",
  accent: "text-accent border-accent/40",
  red: "text-uhred border-uhred/40",
};

const dotStyles: Record<NonNullable<TagProps["tone"]>, string> = {
  neutral: "bg-textMuted",
  accent: "bg-accent",
  red: "bg-uhred",
};

/** Small rectangular metadata/status tag — no pill shape, no pulse animation. */
export default function Tag({ label, tone = "neutral", dot = false, className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em]",
        toneStyles[tone],
        className
      )}
    >
      {dot ? <span className={cn("h-1.5 w-1.5", dotStyles[tone])} aria-hidden /> : null}
      {label}
    </span>
  );
}
