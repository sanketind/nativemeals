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

export type MealSchedules = Partial<Record<MealSlot, ScheduleId>>;

export type PlanSelection = {
  meals: MealSlot[];
  /** One pattern per selected meal. Lunch and dinner may differ. */
  schedules: MealSchedules;
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
  scheduleId: ScheduleId;
  scheduleLabel: string;
  scheduleSpoken: string;
  days: number;
};

export type Quote = {
  meals: MealSlot[];
  /** True when every selected meal uses the same day pattern. */
  samePattern: boolean;
  scheduleId: ScheduleId | null;
  scheduleLabel: string;
  scheduleSpoken: string;
  lengthId: LengthId;
  lengthLabel: string;
  /** Shared count. Null when lunch and dinner use different patterns. */
  days: number | null;
  planId: PlanId;
  planName: string;
  lines: QuoteLine[];
  /** Sum of the plate rates. Null when the patterns differ. */
  perDay: number | null;
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

/** "Mon–Fri, 2 weeks (10 days)". A split week names each meal. */
export function formatSelection(input: Pick<Quote, "samePattern" | "scheduleLabel" | "lengthLabel" | "days" | "lines">) {
  if (!input.samePattern || input.days === null) {
    const parts = input.lines.map((line) => `${line.label} ${line.scheduleLabel}, ${line.days}`);
    return `${input.lengthLabel}: ${parts.join("; ")}`;
  }
  if (input.lengthLabel === `${input.days} days`) {
    return `${input.scheduleLabel}, ${input.lengthLabel}`;
  }
  return `${input.scheduleLabel}, ${input.lengthLabel} (${input.days} days)`;
}

export function quote(input: {
  meals: MealSlot[];
  schedules: Partial<Record<MealSlot, string>>;
  length: string;
  diet?: PriceDiet;
}): Quote | null {
  const meals = orderedMeals(input.meals);
  if (!meals || !isLengthId(input.length)) return null;
  const length = lengths.find((item) => item.id === input.length);
  if (!length) return null;

  const lines: QuoteLine[] = [];
  for (const meal of meals) {
    const raw = input.schedules[meal];
    if (!raw || !isScheduleId(raw)) return null;
    const schedule = schedules.find((item) => item.id === raw);
    if (!schedule) return null;
    lines.push({
      meal,
      label: mealLabels[meal],
      perMeal: mealRate(meal, input.diet),
      scheduleId: schedule.id,
      scheduleLabel: schedule.label,
      scheduleSpoken: schedule.spoken,
      days: deliveryDays(schedule.id, length.id),
    });
  }

  const samePattern = lines.every((line) => line.scheduleId === lines[0]?.scheduleId);
  const shared = samePattern ? lines[0] : undefined;
  const perDay = lines.reduce((sum, line) => sum + line.perMeal, 0);
  const planId = planIdForMeals(meals);
  const hasMain = meals.some((meal) => meal === "lunch" || meal === "dinner");
  const dietNote =
    input.diet === "non-veg" || !hasMain
      ? ""
      : `Non-veg lunch and dinner are ${formatInr(nonVegPerMeal.lunch)} each.`;

  return {
    meals,
    samePattern,
    scheduleId: shared?.scheduleId ?? null,
    scheduleLabel: shared?.scheduleLabel ?? lines.map((line) => `${line.label} ${line.scheduleLabel}`).join(", "),
    scheduleSpoken:
      shared?.scheduleSpoken ?? lines.map((line) => `${line.label} ${line.scheduleSpoken}`).join(", "),
    lengthId: length.id,
    lengthLabel: length.label,
    days: shared?.days ?? null,
    planId,
    planName: getPlan(planId)?.name ?? "All-day Plan",
    lines,
    perDay: samePattern ? perDay : null,
    total: lines.reduce((sum, line) => sum + line.perMeal * line.days, 0),
    pricingStatus: pricing.status,
    note: pricing.note,
    dietNote,
  };
}
