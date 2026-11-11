import { cn } from "@/lib/cn";

export const type = {
  eyebrow: "font-sans text-eyebrow uppercase",
  eyebrowCompact: "font-sans text-eyebrow-compact uppercase md:text-eyebrow",
  display: "font-sans text-display uppercase",
  poster: "font-sans text-poster uppercase",
  closing: "font-sans text-closing uppercase",
  title: "font-sans text-title uppercase",
  numeral: "font-sans text-numeral",
  label: "font-sans text-label uppercase",
  stat: "font-sans text-stat",
  card: "font-sans text-card",
  lede: "text-lede",
  lead: "text-lead",
  body: "text-body",
  price: "font-sans text-price",
  priceLg: "font-sans text-price-lg",
  caption: "font-sans text-caption",
  hint: "font-sans text-hint",
  wordmark: "font-sans text-wordmark sm:text-wordmark-lg",
  nav: "text-nav",
};

export const surface = {
  card: "rounded-card border border-charcoal/10 bg-white",
  panel: "rounded-card bg-white p-6 shadow-sm md:p-8",
  note: "rounded-control bg-oat text-sm leading-relaxed text-olive",
  noteSoft: "rounded-control bg-oat/70 text-sm leading-relaxed text-olive",
  photo: "relative overflow-hidden rounded-photo bg-oat",
  badge: "rounded-control px-3.5 py-2.5 shadow-float",
  row: "rounded-control bg-cream px-5 py-4",
  brandPattern: "bg-brand-pattern",
};

export const control =
  "mt-2 w-full rounded-control border border-charcoal/15 bg-white px-4 py-3 text-base text-charcoal outline-none placeholder:text-charcoal/35 focus:border-olive";

export function controlClass(invalid?: boolean) {
  return cn(control, invalid && "border-error");
}

export const fieldLabel = "text-sm font-medium text-charcoal";
export const fieldHint = "mt-1 text-sm text-muted";
export const fieldError = "mt-1 text-sm text-error";

export const button = {
  base: "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-normal transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  sizes: {
    md: "px-6 py-3.5 text-base",
    sm: "px-4 py-2 text-sm",
  },
  variants: {
    /* The one sunflower action on a screen: starting a plan or sending the form. */
    accent: "bg-sunflower text-olive hover:bg-sunflower-deep",
    primary: "bg-olive text-cream hover:bg-olive-deep",
    secondary: "border border-olive/55 bg-transparent text-olive hover:bg-oat",
    /* The secondary action inside an olive band. */
    inverse: "border border-cream/40 text-cream hover:bg-cream/10",
    ghost: "text-olive hover:bg-oat",
  },
};

export const priceMark =
  "mt-1 block rounded-full bg-sunflower px-2.5 py-1 text-center font-sans text-lg font-extrabold leading-none text-olive";

const choiceBase = "transition-colors";

export function choiceClass(selected: boolean, shape: "pill" | "tile" | "card" = "pill") {
  if (shape === "card") {
    return cn(
      choiceBase,
      "rounded-control bg-white px-4 py-4 text-left ring-1",
      selected ? "ring-olive" : "ring-charcoal/10 hover:ring-olive/40",
    );
  }
  if (shape === "tile") {
    return cn(
      choiceBase,
      "rounded-control px-3 py-3.5 text-center text-sm font-semibold whitespace-nowrap",
      selected
        ? "bg-olive text-cream"
        : "bg-white text-olive ring-1 ring-charcoal/10 hover:ring-olive/40",
    );
  }
  return cn(
    choiceBase,
    "rounded-full px-4 py-2 text-sm font-medium",
    selected
      ? "bg-olive text-white"
      : "bg-white text-olive ring-1 ring-charcoal/10 hover:ring-olive/30",
  );
}
