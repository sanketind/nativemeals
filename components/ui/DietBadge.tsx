import type { Diet } from "@/data/menu";

const marks = {
  veg: { color: "#2F6B45", label: "Vegetarian" },
  "non-veg": { color: "#8E4328", label: "Non-vegetarian" },
} as const;

export function DietBadge({ diet }: { diet: Diet }) {
  const mark = marks[diet];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-charcoal/80">
      <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
        <rect
          x="0.8"
          y="0.8"
          width="12.4"
          height="12.4"
          rx="1.5"
          fill="none"
          stroke={mark.color}
          strokeWidth="1.4"
        />
        <circle cx="7" cy="7" r="2.3" fill={mark.color} />
      </svg>
      <span className="sr-only">{mark.label}</span>
      <span aria-hidden="true">{diet === "veg" ? "Veg" : "Non-veg"}</span>
    </span>
  );
}
