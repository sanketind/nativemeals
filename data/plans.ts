import type { Diet, MealType } from "@/data/menu";
import type { ImageId } from "@/data/images";

export type PlanId = "lunch" | "dinner" | "everyday";

export type PricingTier = {
  label: string;
  /** Null until that duration has a confirmed price. */
  price: number | null;
};

export const durationIds = ["trial", "weekly", "biweekly", "monthly"] as const;
export type DurationId = (typeof durationIds)[number];

/**
 * Draft per-meal prices, in rupees. Longer plans cost less per meal.
 * TODO: Replace every number with the confirmed price before launch, then set
 * status to "confirmed" so the draft note disappears.
 * `days` assumes six delivery days a week: 3, 6, 12 and 24.
 * Veg and non-veg use the same rate.
 */
export const pricing = {
  status: "draft" as "draft" | "confirmed",
  note: "Introductory pricing, subject to confirmation.",
  durations: [
    { id: "trial", label: "3 days", days: 3 },
    { id: "weekly", label: "Weekly", days: 6 },
    { id: "biweekly", label: "2 weeks", days: 12 },
    { id: "monthly", label: "Monthly", days: 24 },
  ] as const satisfies readonly { id: DurationId; label: string; days: number }[],
  perMeal: {
    breakfast: { trial: 129, weekly: 119, biweekly: 109, monthly: 99 },
    lunch: { trial: 189, weekly: 179, biweekly: 169, monthly: 159 },
    dinner: { trial: 189, weekly: 179, biweekly: 169, monthly: 159 },
  } satisfies Record<MealType, Record<DurationId, number>>,
};

export type MealPlan = {
  id: PlanId;
  name: string;
  summary: string;
  description: string;
  imageId: ImageId;
  /** Meals this card is priced from. */
  meals: MealType[];
  /** "meal" for a single meal, "day" when the price is all selected meals. */
  priceUnit: "meal" | "day";
  /** Headline price at the monthly rate. Null until confirmed. */
  price: number | null;
  /** Short line under the price, for example "on a monthly plan". */
  priceNote: string | null;
  /**
   * Per-meal (or per-day) price at each duration.
   * Null until real prices exist. Do not fill with guessed numbers.
   */
  pricingTiers: PricingTier[] | null;
  /** TODO: Confirmed meal count or days per week. */
  frequency: string | null;
  /** TODO: Confirmed subscription length. */
  duration: string | null;
  /** TODO: What a confirmed plan actually includes. */
  includes: string[] | null;
  /** TODO: Delivery or collection terms, once decided. */
  deliveryTerms: string | null;
  /**
   * Set only when this plan genuinely offers a veg / non-veg choice.
   * Null hides the indicator.
   */
  dietOptions: Diet[] | null;
  availability: "enquiry";
};

function rate(meals: MealType[], duration: DurationId) {
  return meals.reduce((sum, meal) => sum + pricing.perMeal[meal][duration], 0);
}

function tiersFor(meals: MealType[]): PricingTier[] {
  return pricing.durations.map((duration) => ({
    label: duration.label,
    price: rate(meals, duration.id),
  }));
}

const monthlyNote = "on a monthly plan";

const planSeeds: Omit<MealPlan, "price" | "priceNote" | "pricingTiers" | "priceUnit">[] = [
  {
    id: "lunch",
    name: "Lunch Plan",
    summary: "For customers who want an easier midday meal.",
    description:
      "A lunch you can count on through the week. The days, dishes and price are confirmed with you before anything starts.",
    imageId: "planLunch",
    meals: ["lunch"],
    frequency: null,
    duration: null,
    includes: null,
    deliveryTerms: null,
    dietOptions: ["veg", "non-veg"],
    availability: "enquiry",
  },
  {
    id: "dinner",
    name: "Dinner Plan",
    summary: "For customers who want a dependable meal at the end of the day.",
    description:
      "Dinner taken care of, so the evening does not start with deciding what to cook. We confirm the details with you first.",
    imageId: "planDinner",
    meals: ["dinner"],
    frequency: null,
    duration: null,
    includes: null,
    deliveryTerms: null,
    dietOptions: ["veg", "non-veg"],
    availability: "enquiry",
  },
  {
    id: "everyday",
    name: "All-day Plan",
    summary: "Breakfast, lunch and dinner, on one plan.",
    description:
      "Breakfast, lunch and dinner, or any mix of them. Tell us what your routine looks like and we will confirm what we can offer.",
    imageId: "planEveryday",
    meals: ["breakfast", "lunch", "dinner"],
    frequency: null,
    duration: null,
    includes: null,
    deliveryTerms: null,
    dietOptions: ["veg", "non-veg"],
    availability: "enquiry",
  },
];

export const plans: MealPlan[] = planSeeds.map((plan) => {
  const single = plan.meals.length === 1;
  return {
    ...plan,
    priceUnit: single ? "meal" : "day",
    price: rate(plan.meals, "monthly"),
    priceNote: single ? monthlyNote : `all three meals, ${monthlyNote}`,
    pricingTiers: tiersFor(plan.meals),
  };
});

export function getPlan(id: string) {
  return plans.find((plan) => plan.id === id);
}

/** Lowest per-meal rate across meals and durations. */
export function lowestPlanPrice() {
  const prices = Object.values(pricing.perMeal).flatMap((rates) =>
    Object.values(rates),
  );
  if (prices.length === 0) return null;
  return Math.min(...prices);
}
