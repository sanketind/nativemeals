function readPublic(name: string) {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

export type PromiseIcon = "clean" | "fresh" | "easy" | "diet";

export type KitchenCommitment = {
  title: string;
  body: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

const serviceAreas = [
  "Wakad",
  "Hinjewadi",
  "Baner",
  "Aundh",
  "Tathwade",
  "Punewale",
] as const;

function joinAreas(areas: readonly string[]) {
  if (areas.length <= 1) return areas[0] ?? "";
  return `${areas.slice(0, -1).join(", ")} and ${areas.at(-1)}`;
}

const serviceAreaLine = joinAreas(serviceAreas);

export const siteConfig = {
  name: "Native Meals",
  tagline: "Clean, healthy meals.",
  description:
    `Cooked fresh the same morning and delivered to your desk or your door. Breakfast, lunch and dinner plans across ${serviceAreaLine}, Pune.`,
  /**
   * TODO: Set NEXT_PUBLIC_SITE_URL to the real domain before launch.
   * Used for metadata, Open Graph and the sitemap.
   */
  url: readPublic("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000",
  city: "Pune",
  serviceAreas: [...serviceAreas],
  /** "Wakad, Hinjewadi, Baner, Aundh, Tathwade and Punewale" */
  serviceAreaLine,
  /** Full line including the city, for sentences that need both. */
  launchArea: `${serviceAreaLine}, Pune`,
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
  /** TODO: Add real profiles when they exist. Leave empty until then. */
  socials: [] as SocialLink[],
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
  heroFacts: ["Freshly prepared", "Breakfast to dinner", "Veg and non-veg", "Pune"],
  promises: [
    {
      icon: "clean" as const,
      title: "Clean and healthy",
      body: "Meals cooked to be fresh and straightforward, the kind you can eat through the week.",
    },
    {
      icon: "fresh" as const,
      title: "Freshly prepared",
      body: "Cooked fresh the same morning, then delivered to your desk or your door.",
    },
    {
      icon: "easy" as const,
      title: "Planned for the day",
      body: "Breakfast, lunch and dinner on a plan, so the daily decision is already made.",
    },
    {
      icon: "diet" as const,
      title: "A wider menu",
      body: "Veg and non-veg. A week can include a sandwich, scrambled eggs or oats as well as a fuller plate.",
    },
  ] satisfies { icon: PromiseIcon; title: string; body: string }[],
  /**
   * Optional. Modelled on a "kitchen rules" band, but only for claims the
   * business has confirmed. Leave empty and the section is not rendered.
   * TODO: Add entries only when they are true.
   */
  kitchenCommitments: [] as KitchenCommitment[],
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
  /** Shows "Sample content" notes on placeholder menu, plans context and the sample week. */
  showSampleNotes: true,
};

export type SiteConfig = typeof siteConfig;
