import type { ImageId } from "@/data/images";
import type { Diet, MealType } from "@/data/menu";
import { siteConfig } from "@/data/site-config";
import { formatInr } from "@/lib/format";

export type PlanId = "lunch" | "dinner" | "everyday";

export type PricingTier = {
  label: string;
  /** Per meal, or per day when the card prices every meal together. */
  price: number | null;
  /** Tiffins on Monday to Friday. Three days is 3 either way. */
  weekdays: number;
  /** Tiffins when Saturday is included. */
  withSaturday: number;
};

export const scheduleIds = ["weekdays", "saturday"] as const;
export type ScheduleId = (typeof scheduleIds)[number];

export const lengthIds = ["trial", "two-weeks", "four-weeks"] as const;
export type LengthId = (typeof lengthIds)[number];

export const schedules = [
  {
    id: "weekdays",
    label: "Mon–Fri",
    spoken: "Monday to Friday",
    perWeek: 5,
  },
  {
    id: "saturday",
    label: "Mon–Sat",
    spoken: "Monday to Saturday",
    perWeek: 6,
  },
] as const satisfies readonly {
  id: ScheduleId;
  label: string;
  spoken: string;
  perWeek: number;
}[];

export const lengths = [
  { id: "trial", label: "3 days", weeks: 0 },
  { id: "two-weeks", label: "2 weeks", weeks: 2 },
  { id: "four-weeks", label: "4 weeks", weeks: 4 },
] as const satisfies readonly {
  id: LengthId;
  label: string;
  weeks: number;
}[];

/** Tiffins of each selected meal. A 3-day try is 3. Longer lengths follow the chosen week. */
export function deliveryDays(schedule: ScheduleId, length: LengthId) {
  if (length === "trial") return 3;
  const chosen = schedules.find((item) => item.id === schedule);
  const span = lengths.find((item) => item.id === length);
  return (chosen?.perWeek ?? 5) * (span?.weeks ?? 0);
}

/**
 * Confirmed per-meal prices, in rupees. The rate does not change with length.
 * `perMeal` is the veg rate. Lunch and dinner cost more for non-veg.
 * Breakfast is the same either way.
 */
export const pricing = {
  status: "confirmed" as "draft" | "confirmed",
  note: "We confirm the total before you start.",
  perMeal: {
    breakfast: 149,
    lunch: 229,
    dinner: 229,
  } satisfies Record<MealType, number>,
};

/** Lunch and dinner for non-veg. Breakfast matches the veg rate. */
export const nonVegPerMeal = {
  breakfast: 149,
  lunch: 249,
  dinner: 249,
} satisfies Record<MealType, number>;

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
  /** Headline per-meal or per-day rate. Null until confirmed. */
  price: number | null;
  /** Short line under the price, for example "veg". */
  priceNote: string | null;
  /**
   * Per-meal (or per-day) price at each length, with both day counts.
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

function rate(meals: MealType[]) {
  return meals.reduce((sum, meal) => sum + pricing.perMeal[meal], 0);
}

function nonVegRate(meals: MealType[]) {
  return meals.reduce((sum, meal) => sum + nonVegPerMeal[meal], 0);
}

function tiersFor(meals: MealType[]): PricingTier[] {
  const price = rate(meals);
  return lengths.map((length) => ({
    label: length.label,
    price,
    weekdays: deliveryDays("weekdays", length.id),
    withSaturday: deliveryDays("saturday", length.id),
  }));
}

const monthlyNote = "veg";

const planSeeds: Omit<MealPlan, "price" | "priceNote" | "pricingTiers" | "priceUnit">[] = [
  {
    id: "lunch",
    name: "Lunch Plan",
    summary: "A healthy lunch at the office gate, Monday to Friday.",
    description:
      "Lunch for office weeks. Three days to try it, or two or four weeks for the days you are in.",
    imageId: "planLunch",
    meals: ["lunch"],
    frequency: "Monday to Friday, or with Saturday",
    duration: "3 days, 2 weeks, or 4 weeks",
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
    frequency: "Monday to Friday, or with Saturday",
    duration: "3 days, 2 weeks, or 4 weeks",
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
    frequency: "Monday to Friday, or with Saturday",
    duration: "3 days, 2 weeks, or 4 weeks",
    includes: [
      "Breakfast, lunch and dinner from the weekly menu",
      "Cooked that morning",
      siteConfig.delivery.skipNote,
    ],
    deliveryTerms: "Office gate on work days, your door on the others",
    dietOptions: ["veg", "non-veg"],
    availability: "enquiry",
  },
];

export const plans: MealPlan[] = planSeeds.map((plan) => {
  const single = plan.meals.length === 1;
  const veg = rate(plan.meals);
  const nonVeg = nonVegRate(plan.meals);
  return {
    ...plan,
    priceUnit: single ? "meal" : "day",
    price: veg,
    priceNote: single
      ? `${monthlyNote} · non-veg ${formatInr(nonVeg)}`
      : `${monthlyNote} · non-veg ${formatInr(nonVeg)} a day`,
    pricingTiers: tiersFor(plan.meals),
  };
});

export function getPlan(id: string) {
  return plans.find((plan) => plan.id === id);
}

/** Lowest per-meal rate. */
export function lowestPlanPrice() {
  const prices = Object.values(pricing.perMeal);
  if (prices.length === 0) return null;
  return Math.min(...prices);
}
