import type { Diet, MealType } from "@/data/menu";
import type { ImageId } from "@/data/images";

export type PlanId = "lunch" | "dinner" | "everyday";

export type PricingTier = {
  label: string;
  /** Null until that duration has a confirmed price. */
  price: number | null;
  days: number;
  /** Shown on the plan card. The builder still lists every duration. */
  onCard: boolean;
};

export const durationIds = [
  "taste",
  "trial",
  "weekdays",
  "weekly",
  "biweekly",
  "weekdays-month",
  "monthly",
] as const;
export type DurationId = (typeof durationIds)[number];

/**
 * Draft per-meal prices, in rupees. Longer plans cost less per meal.
 * TODO: Replace every number with the confirmed price before launch, then set
 * status to "confirmed" so the draft note disappears.
 * Monday to Friday uses the weekly rate for 5 days and the monthly rate for
 * 22 weekdays. The 6-day options stay for people who also want Saturday.
 * A single meal uses the 3-day rate, so the first try is one plate.
 * Veg and non-veg use the same rate.
 */
export const pricing = {
  status: "draft" as "draft" | "confirmed",
  note: "Introductory prices. We confirm the total before you start.",
  durations: [
    { id: "taste", label: "1 meal", days: 1, onCard: true },
    { id: "trial", label: "3 days", days: 3, onCard: false },
    { id: "weekdays", label: "Mon–Fri", days: 5, onCard: true },
    { id: "weekly", label: "6 days", days: 6, onCard: false },
    { id: "biweekly", label: "2 weeks", days: 12, onCard: false },
    { id: "weekdays-month", label: "Weekday month", days: 22, onCard: true },
    { id: "monthly", label: "Monthly", days: 24, onCard: true },
  ] as const satisfies readonly {
    id: DurationId;
    label: string;
    days: number;
    onCard: boolean;
  }[],
  perMeal: {
    breakfast: {
      taste: 129,
      trial: 129,
      weekdays: 119,
      weekly: 119,
      biweekly: 109,
      "weekdays-month": 99,
      monthly: 99,
    },
    lunch: {
      taste: 189,
      trial: 189,
      weekdays: 179,
      weekly: 179,
      biweekly: 169,
      "weekdays-month": 159,
      monthly: 159,
    },
    dinner: {
      taste: 189,
      trial: 189,
      weekdays: 179,
      weekly: 179,
      biweekly: 169,
      "weekdays-month": 159,
      monthly: 159,
    },
  } satisfies Record<MealType, Record<DurationId, number>>,
};

/**
 * Illustrative range for a food-app lunch around Hinjewadi, used only as a
 * comparison next to our own price. It is not a quote from any app.
 */
export const foodAppLunchRange = { low: 200, high: 400 };

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
  /** Headline price at the weekday-month rate. Null until confirmed. */
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
    days: duration.days,
    onCard: duration.onCard,
  }));
}

const monthlyNote = "on a Monday to Friday month";

const planSeeds: Omit<MealPlan, "price" | "priceNote" | "pricingTiers" | "priceUnit">[] = [
  {
    id: "lunch",
    name: "Lunch Plan",
    summary: "A healthy lunch at the office gate, Monday to Friday.",
    description:
      "Lunch for office weeks. Start with one meal, or take Monday to Friday for the days you are in.",
    imageId: "planLunch",
    meals: ["lunch"],
    frequency: "Monday to Friday, or six days",
    duration: "One meal up to a month",
    includes: [
      "The day's lunch from the weekly menu",
      "Cooked that morning",
      "Office gate or your door",
    ],
    deliveryTerms: "Office gate, security desk, or your door",
    dietOptions: ["veg", "non-veg"],
    availability: "enquiry",
  },
  {
    id: "dinner",
    name: "Dinner Plan",
    summary: "Dinner at the PG or the flat, without deciding what to cook.",
    description:
      "Dinner taken care of after work, from the same weekly menu, handed over at your door.",
    imageId: "planDinner",
    meals: ["dinner"],
    frequency: "Monday to Friday, or six days",
    duration: "One meal up to a month",
    includes: [
      "The day's dinner from the weekly menu",
      "Cooked that morning",
      "Your door on the way home",
    ],
    deliveryTerms: "Your door, or the office gate if you leave late",
    dietOptions: ["veg", "non-veg"],
    availability: "enquiry",
  },
  {
    id: "everyday",
    name: "All-day Plan",
    summary: "Breakfast, lunch and dinner, on one plan.",
    description:
      "The full day, or any mix of the three. Useful when both lunch at the office and dinner at home should just show up.",
    imageId: "planEveryday",
    meals: ["breakfast", "lunch", "dinner"],
    frequency: "Monday to Friday, or six days",
    duration: "One meal up to a month",
    includes: [
      "Breakfast, lunch and dinner from the weekly menu",
      "Cooked that morning",
      "Skip a day or pause when you travel",
    ],
    deliveryTerms: "Office gate on work days, your door on the others",
    dietOptions: ["veg", "non-veg"],
    availability: "enquiry",
  },
];

export const plans: MealPlan[] = planSeeds.map((plan) => {
  const single = plan.meals.length === 1;
  return {
    ...plan,
    priceUnit: single ? "meal" : "day",
    price: rate(plan.meals, "weekdays-month"),
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
