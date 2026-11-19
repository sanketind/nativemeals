import type { MealNutrition } from "@/lib/weekly-menu";

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Compact plate line, e.g. "420 kcal · P 28 g · C 45 g · F 12 g". */
export function formatMealNutrition(nutrition: MealNutrition) {
  const parts = [`${nutrition.kcal} kcal`];
  if (nutrition.proteinG !== null) {
    parts.push(`P ${nutrition.proteinG} g`);
  }
  if (nutrition.carbsG !== null) {
    parts.push(`C ${nutrition.carbsG} g`);
  }
  if (nutrition.fatG !== null) {
    parts.push(`F ${nutrition.fatG} g`);
  }
  return parts.join(" · ");
}
