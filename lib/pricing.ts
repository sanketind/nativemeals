import type { MealType } from "@/data/menu";
import {
  getPlan,
  nonVegPerMeal,
  pricing,
  type DurationId,
  type PlanId,
} from "@/data/plans";
import { formatInr } from "@/lib/format";

export const mealSlots = ["breakfast", "lunch", "dinner"] as const;
export type MealSlot = (typeof mealSlots)[number];

export type PlanSelection = {
  meals: MealSlot[];
  duration: DurationId;
};

const mealLabels: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export function isMealSlot(value: string): value is MealSlot {
  return (mealSlots as readonly string[]).includes(value);
}

export function isDurationId(value: string): value is DurationId {
  return pricing.durations.some((duration) => duration.id === value);
}

/** Lunch only and dinner only map to those plans. Any other mix is Everyday. */
export function planIdForMeals(meals: MealSlot[]): PlanId {
  if (meals.length === 1 && meals[0] === "lunch") return "lunch";
  if (meals.length === 1 && meals[0] === "dinner") return "dinner";
  return "everyday";
}

/** Meals preselected by `?plan=`. An unknown id starts on lunch. */
export function defaultMealsForPlan(id: string): MealSlot[] {
  if (id === "dinner") return ["dinner"];
  if (id === "everyday") return ["breakfast", "lunch", "dinner"];
  return ["lunch"];
}

export type QuoteLine = {
  meal: MealSlot;
  label: string;
  perMeal: number;
};

export type Quote = {
  meals: MealSlot[];
  durationId: DurationId;
  durationLabel: string;
  days: number;
  planId: PlanId;
  planName: string;
  lines: QuoteLine[];
  perDay: number;
  total: number;
  pricingStatus: "draft" | "confirmed";
  note: string;
  /** Set when the quote uses veg rates and a meal has a higher non-veg price. */
  dietNote: string;
};

export type PriceDiet = "" | "veg" | "non-veg" | "either";

export function mealRate(meal: MealSlot, diet: PriceDiet | undefined) {
  if (diet === "non-veg") return nonVegPerMeal[meal];
  return pricing.perMeal[meal].taste;
}

function orderedMeals(meals: MealType[]): MealSlot[] | null {
  if (meals.length === 0) return null;
  const unique = mealSlots.filter((slot) => meals.includes(slot));
  if (unique.length !== meals.length) return null;
  return unique;
}

export function formatDuration(label: string, days: number) {
  if (days === 1) return label;
  if (label === `${days} days`) return label;
  return `${label} · ${days} days`;
}

export function quote(input: {
  meals: MealSlot[];
  duration: string;
  diet?: PriceDiet;
}): Quote | null {
  const meals = orderedMeals(input.meals);
  if (!meals) return null;
  const duration = pricing.durations.find((item) => item.id === input.duration);
  if (!duration) return null;

  const lines = meals.map((meal) => ({
    meal,
    label: mealLabels[meal],
    perMeal: mealRate(meal, input.diet),
  }));
  const perDay = lines.reduce((sum, line) => sum + line.perMeal, 0);
  const planId = planIdForMeals(meals);
  const hasMain = meals.some((meal) => meal === "lunch" || meal === "dinner");
  const dietNote =
    input.diet === "non-veg" || !hasMain
      ? ""
      : `Non-veg lunch and dinner are ${formatInr(nonVegPerMeal.lunch)} each.`;

  return {
    meals,
    durationId: duration.id,
    durationLabel: duration.label,
    days: duration.days,
    planId,
    planName: getPlan(planId)?.name ?? "All-day Plan",
    lines,
    perDay,
    total: perDay * duration.days,
    pricingStatus: pricing.status,
    note: pricing.note,
    dietNote,
  };
}
