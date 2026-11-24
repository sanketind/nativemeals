import { cn } from "@/lib/cn";

export const type = {
  eyebrow: "font-sans text-eyebrow uppercase",
  eyebrowCompact: "font-sans text-eyebrow-compact uppercase md:text-eyebrow",
  display: "font-sans text-display",
  poster: "font-sans text-poster",
  closing: "font-sans text-closing",
  title: "font-sans text-title",
  numeral: "font-sans text-numeral",
  label: "font-sans text-label",
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
  card: "rounded-card border border-ink/10 bg-white",
  panel: "rounded-card bg-white p-6 shadow-sm md:p-8",
  note: "rounded-control bg-mist text-sm leading-relaxed text-ink",
  noteSoft: "rounded-control bg-mist/70 text-sm leading-relaxed text-ink",
  photo: "relative overflow-hidden rounded-photo bg-mist",
  badge: "rounded-control px-3.5 py-2.5 shadow-float",
  row: "rounded-control bg-stone px-5 py-4",
  brandPattern: "bg-brand-pattern",
};

export const control =
  "mt-2 w-full rounded-control border border-ink/15 bg-white px-4 py-3 text-base text-ink outline-none placeholder:text-ink/35 focus:border-ink";

export function controlClass(invalid?: boolean) {
  return cn(control, invalid && "border-error");
}

export const fieldLabel = "text-sm font-medium text-ink";
export const fieldHint = "mt-1 text-sm text-muted";
export const fieldError = "mt-1 text-sm text-error";

export const button = {
  base: "inline-flex items-center justify-center gap-2 rounded-control font-semibold tracking-normal transition-colors disabled:cursor-not-allowed disabled:opacity-60",
  sizes: {
    md: "px-6 py-3.5 text-base",
    sm: "px-4 py-2 text-sm",
  },
  variants: {
    /* The one chili action on a screen: starting a plan or sending the form. */
    accent: "bg-accent text-ink hover:bg-accent-deep",
    primary: "bg-ink text-stone hover:bg-field",
    secondary: "border border-ink/40 bg-transparent text-ink hover:bg-mist",
    /* The secondary action inside a field band. */
    inverse: "border border-stone/35 text-stone hover:bg-stone/10",
    ghost: "text-ink hover:bg-mist",
  },
};

export const priceMark =
  "mt-1 block rounded-control bg-accent px-2.5 py-1 text-center font-sans text-lg font-extrabold leading-none text-ink";

const choiceBase = "transition-colors";

export function choiceClass(selected: boolean, shape: "pill" | "tile" | "card" = "pill") {
  if (shape === "card") {
    return cn(
      choiceBase,
      "rounded-control bg-white px-4 py-4 text-left ring-1",
      selected ? "ring-ink" : "ring-ink/10 hover:ring-ink/40",
    );
  }
  if (shape === "tile") {
    return cn(
      choiceBase,
      "rounded-control px-3 py-3.5 text-center text-sm font-semibold whitespace-nowrap",
      selected
        ? "bg-ink text-stone"
        : "bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/40",
    );
  }
  return cn(
    choiceBase,
    "rounded-control px-4 py-2 text-sm font-medium",
    selected
      ? "bg-ink text-white"
      : "bg-white text-ink ring-1 ring-ink/10 hover:ring-ink/30",
  );
}
