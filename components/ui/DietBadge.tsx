import type { Diet } from "@/data/menu";
import { cn } from "@/lib/cn";

const marks = {
  veg: { color: "text-veg", label: "Vegetarian" },
  "non-veg": { color: "text-nonveg", label: "Non-vegetarian" },
} as const;

export function DietBadge({ diet }: { diet: Diet }) {
  const mark = marks[diet];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-charcoal/80">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        aria-hidden="true"
        className={cn("shrink-0", mark.color)}
      >
        <rect
          x="0.8"
          y="0.8"
          width="12.4"
          height="12.4"
          rx="1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <circle cx="7" cy="7" r="2.3" fill="currentColor" />
      </svg>
      <span className="sr-only">{mark.label}</span>
      <span aria-hidden="true">{diet === "veg" ? "Veg" : "Non-veg"}</span>
    </span>
  );
}
