import { cn } from "@/lib/cn";

export const type = {
  eyebrow: "font-sans text-eyebrow uppercase",
  eyebrowCompact: "font-sans text-eyebrow-compact uppercase md:text-eyebrow",
  display: "font-sans text-display",
  closing: "font-sans text-closing",
  title: "font-sans text-title",
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
  step: "font-sans text-5xl font-extrabold leading-none tracking-step md:text-6xl",
};

export const surface = {
  card: "rounded-card border border-charcoal/10 bg-white",
  panel: "rounded-card bg-white p-6 shadow-sm md:p-8",
  note: "rounded-control bg-sage text-sm leading-relaxed text-olive",
  noteSoft: "rounded-control bg-sage/70 text-sm leading-relaxed text-olive",
  photo: "relative overflow-hidden rounded-photo bg-sage",
  badge: "rounded-control px-3.5 py-2.5 shadow-float",
  row: "rounded-control bg-cream px-5 py-4",
  pageGlow: "bg-page-glow",
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
    primary: "bg-olive text-white hover:bg-olive-deep",
    secondary: "border border-olive/55 bg-white text-olive hover:bg-sage",
    inverse: "bg-cream text-olive hover:bg-white",
    ghost: "text-olive hover:bg-sage",
  },
};

export const priceMark =
  "mt-1 block rounded-full bg-terracotta px-2.5 py-1 text-center font-sans text-lg font-extrabold leading-none text-olive";

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
