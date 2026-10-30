import { cn } from "@/lib/cn";
import { type as typeStyles } from "@/components/ui/styles";

const tones = {
  solid: "bg-white font-semibold text-olive",
  quiet: "border border-charcoal/10 bg-white/70 font-medium text-olive",
  inverse: "bg-cream/10 font-semibold text-cream",
  area: "border border-olive/15 bg-white/70 text-terracotta-ink",
} as const;

export function Chip({
  tone = "solid",
  size = "md",
  className,
  children,
}: {
  tone?: keyof typeof tones;
  size?: "md" | "compact";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center rounded-full",
        size === "compact"
          ? cn("gap-1.5 px-2.5 py-1 md:gap-2 md:px-3 md:py-1.5", typeStyles.eyebrowCompact)
          : "px-3 py-1.5 text-sm",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
