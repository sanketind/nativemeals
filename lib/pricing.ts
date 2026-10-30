import type { MealType } from "@/data/menu";
import {
  deliveryDays,
  getPlan,
  lengths,
  nonVegPerMeal,
  pricing,
  schedules,
  type LengthId,
  type PlanId,
  type ScheduleId,
} from "@/data/plans";
import { formatInr } from "@/lib/format";

export const mealSlots = ["breakfast", "lunch", "dinner"] as const;
export type MealSlot = (typeof mealSlots)[number];

export type PlanSelection = {
  meals: MealSlot[];
  schedule: ScheduleId;
  length: LengthId;
};

const mealLabels: Record<MealSlot, string> = {
  breakfast: "Breakfast",
  lunch: "Lunch",
  dinner: "Dinner",
};

export function isMealSlot(value: string): value is MealSlot {
  return (mealSlots as readonly string[]).includes(value);
}

export function isScheduleId(value: string): value is ScheduleId {
  return schedules.some((schedule) => schedule.id === value);
}

export function isLengthId(value: string): value is LengthId {
  return lengths.some((length) => length.id === value);
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
  scheduleId: ScheduleId;
  scheduleLabel: string;
  scheduleSpoken: string;
  lengthId: LengthId;
  lengthLabel: string;
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
  return pricing.perMeal[meal];
}

function orderedMeals(meals: MealType[]): MealSlot[] | null {
  if (meals.length === 0) return null;
  const unique = mealSlots.filter((slot) => meals.includes(slot));
  if (unique.length !== meals.length) return null;
  return unique;
}

/** "Mon–Fri, 2 weeks (10 days)". A 3-day try already says the count. */
export function formatSelection(input: {
  scheduleLabel: string;
  lengthLabel: string;
  days: number;
}) {
  if (input.lengthLabel === `${input.days} days`) {
    return `${input.scheduleLabel}, ${input.lengthLabel}`;
  }
  return `${input.scheduleLabel}, ${input.lengthLabel} (${input.days} days)`;
}

export function quote(input: {
  meals: MealSlot[];
  schedule: string;
  length: string;
  diet?: PriceDiet;
}): Quote | null {
  const meals = orderedMeals(input.meals);
  if (!meals) return null;
  if (!isScheduleId(input.schedule) || !isLengthId(input.length)) return null;
  const schedule = schedules.find((item) => item.id === input.schedule);
  const length = lengths.find((item) => item.id === input.length);
  if (!schedule || !length) return null;

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
  const days = deliveryDays(schedule.id, length.id);

  return {
    meals,
    scheduleId: schedule.id,
    scheduleLabel: schedule.label,
    scheduleSpoken: schedule.spoken,
    lengthId: length.id,
    lengthLabel: length.label,
    days,
    planId,
    planName: getPlan(planId)?.name ?? "All-day Plan",
    lines,
    perDay,
    total: perDay * days,
    pricingStatus: pricing.status,
    note: pricing.note,
    dietNote,
  };
}
