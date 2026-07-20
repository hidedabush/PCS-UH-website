import { cn } from "@/lib/utils";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
};

/**
 * Flat bordered panel — the one surface treatment used everywhere on the
 * site. No blur, no glow, no corner brackets: just a border that lightens
 * on hover. Deliberately plain.
 */
export default function Card({ children, className, as: Tag = "div" }: CardProps) {
  return (
    <Tag
      className={cn(
        "border border-line bg-panel transition-colors duration-200",
        "hover:border-textFaint hover:bg-panelHover",
        className
      )}
    >
      {children}
    </Tag>
  );
}
