import { cn } from "@/lib/utils";

type HeadingProps = {
  /** a real word/phrase — not a fake system code like "SEC.01 //" */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
  /** "display" opts into the editorial headline face (DESIGN.md) — pass it
   *  deliberately per section, don't flip the default (most sections still
   *  read fine in font-sans; changing the default changes every call site). */
  titleFont?: "sans" | "display";
};

/** Plain editorial section header — used identically everywhere. */
export default function Heading({
  eyebrow,
  title,
  subtitle,
  className,
  align = "left",
  titleFont = "sans",
}: HeadingProps) {
  return (
    <header className={cn("mb-12 md:mb-16", align === "center" && "text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.16em] text-textMuted">
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl",
          titleFont === "display" ? "font-display" : "font-sans"
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 max-w-xl text-base leading-relaxed text-textMuted",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </header>
  );
}
