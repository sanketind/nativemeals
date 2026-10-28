function readPublic(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export type PromiseIcon = "clean" | "fresh" | "easy" | "diet";

export type SocialLink = {
  label: string;
  href: string;
};

const serviceAreas = [
  "Hinjewadi Phase 1",
  "Hinjewadi Phase 2",
  "Hinjewadi Phase 3",
  "Maan",
  "Marunji",
  "Wakad",
  "Tathwade",
  "Punewale",
  "Baner",
  "Aundh",
] as const;

const techParks = [
  "Rajiv Gandhi Infotech Park",
  "Embassy Tech Zone",
  "Quadron Business Park",
  "Blue Ridge",
] as const;

function joinAreas(areas: readonly string[]) {
  if (areas.length <= 1) return areas[0] ?? "";
  return `${areas.slice(0, -1).join(", ")} and ${areas.at(-1)}`;
}

const serviceAreaLine = joinAreas(serviceAreas);
const techParkLine = joinAreas(techParks);

/**
 * Owner-supplied facts. Leave the env var empty until it is real.
 * The site hides each one rather than printing a placeholder.
 */
const fssai = readPublic("NEXT_PUBLIC_FSSAI");
const kitchenLocality = readPublic("NEXT_PUBLIC_KITCHEN_LOCALITY");
const lunchBy = readPublic("NEXT_PUBLIC_LUNCH_BY");
const dinnerBy = readPublic("NEXT_PUBLIC_DINNER_BY");
const skipCutoff = readPublic("NEXT_PUBLIC_SKIP_CUTOFF");

const windowBits = [
  lunchBy ? `lunch by ${lunchBy}` : null,
  dinnerBy ? `dinner by ${dinnerBy}` : null,
].filter((bit): bit is string => Boolean(bit));

const handover =
  windowBits.length > 0
    ? `Handed over at your office gate, security desk, or your door, with ${windowBits.join(" and ")}.`
    : "Handed over at your office gate, security desk, or your door. We confirm the lunch and dinner window before you start.";

export const siteConfig = {
  name: "Native Meals",
  tagline: "Healthy meals in Hinjewadi.",
  description:
    "Healthy breakfast, lunch and dinner for Hinjewadi, Wakad and nearby Pune. Cooked the same morning and handed over at your office gate or your door. Monday to Friday plans.",
  /**
   * TODO: Set NEXT_PUBLIC_SITE_URL to the real domain before launch.
   * Used for metadata, Open Graph and the sitemap.
   */
  url: readPublic("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000",
  city: "Pune",
  serviceAreas: [...serviceAreas],
  /** Full list, for the service-area section and FAQs. */
  serviceAreaLine,
  /** Short form for headlines, the footer and search descriptions. */
  serviceAreaShort: "Hinjewadi, Wakad, Baner and nearby",
  techParks: [...techParks],
  techParkLine,
  /** Full line including the city, for sentences that need both. */
  launchArea: `${serviceAreaLine}, Pune`,
  keywords: [
    "healthy meals Hinjewadi",
    "healthy tiffin service in Hinjewadi",
    "healthy meal subscription Pune",
    "office lunch Hinjewadi",
    "healthy food delivery Wakad",
    "diet meal plan Hinjewadi",
  ],
  contact: {
    /** TODO: Set NEXT_PUBLIC_PHONE, for example +91 98XXXX XXXX. */
    phone: readPublic("NEXT_PUBLIC_PHONE"),
    /**
     * TODO: Set NEXT_PUBLIC_WHATSAPP_NUMBER with country code, digits only
     * or with a plus, for example 9198XXXXXXX.
     */
    whatsapp: readPublic("NEXT_PUBLIC_WHATSAPP_NUMBER"),
    /** TODO: Set NEXT_PUBLIC_EMAIL. */
    email: readPublic("NEXT_PUBLIC_EMAIL"),
  },
  /** FSSAI licence number. Hidden until NEXT_PUBLIC_FSSAI is set. */
  fssai,
  /** Kitchen neighbourhood. Hidden until NEXT_PUBLIC_KITCHEN_LOCALITY is set. */
  kitchenLocality,
  delivery: {
    lunchBy,
    dinnerBy,
    skipCutoff,
    handover,
  },
  /** TODO: Add real profiles when they exist. Leave empty until then. */
  socials: [] as SocialLink[],
  messages: {
    general:
      "Hi Native Meals, I want healthy meals in Hinjewadi. I am looking at a lunch trial.",
    trial:
      "Hi Native Meals, I want to try one lunch. My office or locality is ",
    service:
      "Hi Native Meals, can you deliver to my office gate? My locality is ",
    plans: "Hi Native Meals, I want a Monday to Friday lunch plan in Hinjewadi.",
  },
  nav: [
    { href: "/#this-week", label: "This week's menu" },
    { href: "/meal-plans", label: "Meal Plans" },
    { href: "/about", label: "Our Story" },
    { href: "/faqs", label: "FAQs" },
  ],
  footerNav: [
    { href: "/#this-week", label: "This week's menu" },
    { href: "/meal-plans", label: "Meal Plans" },
    { href: "/about", label: "About" },
    { href: "/faqs", label: "FAQs" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms" },
  ],
  promises: [
    {
      icon: "fresh" as const,
      title: "Cooked the same morning",
      body: "Prepared the morning it goes out. Nothing from yesterday.",
    },
    {
      icon: "clean" as const,
      title: "Planned through the week",
      body: "Each day's meal comes from the weekly menu, balanced across the week.",
    },
    {
      icon: "easy" as const,
      title: "Monday to Friday, at the gate",
      body: "Handed over at your office gate on work days, or at your door.",
    },
    {
      icon: "diet" as const,
      title: "Veg and non-veg",
      body: "Choose either. Both are the same price.",
    },
  ] satisfies { icon: PromiseIcon; title: string; body: string }[],
  /** Confirmed by the kitchen. Add a rule only once it holds for every meal. */
  kitchenRules: [
    {
      title: "No potatoes. In anything.",
      body: "Not as filler and not on the side. No dish on the menu uses them.",
    },
    {
      title: "No maida.",
      body: "Rotis are made from millet or multigrain flour, never refined flour.",
    },
    {
      title: "No plain dal.",
      body: "Every dal is made from mixed pulses or multigrains.",
    },
    {
      title: "No preservatives, no mayo.",
      body: "Sauces and chutneys are made in our own kitchen.",
    },
    {
      title: "No non-stick, no aluminium.",
      body: "Every pot and pan in the kitchen is steel.",
    },
    {
      title: "Eco-friendly packaging.",
      body: "Meals travel to your gate or your door in eco-friendly containers.",
    },
  ] satisfies { title: string; body: string }[],
  /**
   * Optional founder note for the About page. Leave null until there is a
   * real story to tell. Do not invent one.
   */
  founderNote: null as null | { heading: string; body: string },
  weeklyMenu: {
    /**
     * Shown under the weekly menu. Leave empty until it is true.
     * Example, once confirmed: "Sunday is our kitchen's day off."
     */
    footnote: "",
  },
  /** Shows a sample-week note until the live menu sheet is connected. */
  showSampleNotes: true,
};

export type SiteConfig = typeof siteConfig;
