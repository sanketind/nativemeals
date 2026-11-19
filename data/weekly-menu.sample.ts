import { addIsoDays, mondayOf } from "@/lib/dates";
import type { WeeklyMenuRow } from "@/lib/weekly-menu";

/**
 * Stand-in week used only when WEEKLY_MENU_CSV_URL is not set.
 * Dates follow the current India week so the layout can be reviewed any day.
 * Dishes follow the kitchen: no potatoes, millet or multigrain rotis, never maida.
 * Nutrition figures are sample kitchen-style numbers for layout only.
 */
export function buildSampleWeeklyRows(today: string): WeeklyMenuRow[] {
  const monday = mondayOf(today);
  const tuesday = addIsoDays(monday, 1);
  const wednesday = addIsoDays(monday, 2);

  return [
    {
      date: monday,
      meal: "breakfast",
      diet: "veg",
      dishes: "Ragi dosa",
      note: "Sample",
      imageId: null,
      nutrition: { kcal: 320, proteinG: 12, carbsG: 48, fatG: 9 },
    },
    {
      date: monday,
      meal: "lunch",
      diet: "veg",
      dishes: "Palak paneer, beetroot roti, multigrain dal",
      note: "Sample",
      imageId: null,
      nutrition: { kcal: 520, proteinG: 28, carbsG: 52, fatG: 18 },
    },
    {
      date: monday,
      meal: "lunch",
      diet: "non-veg",
      dishes: "Palak chicken, beetroot roti, multigrain dal",
      note: "Sample",
      imageId: null,
      nutrition: { kcal: 540, proteinG: 36, carbsG: 48, fatG: 16 },
    },
    {
      date: monday,
      meal: "dinner",
      diet: "veg",
      dishes: "Baked hara bhara kebab, multigrain dal",
      note: "Sample",
      imageId: null,
      nutrition: { kcal: 430, proteinG: 22, carbsG: 44, fatG: 14 },
    },
    {
      date: tuesday,
      meal: "breakfast",
      diet: "veg",
      dishes: "Ragi roti",
      note: "Sample",
      imageId: null,
      nutrition: { kcal: 280, proteinG: 10, carbsG: 42, fatG: 8 },
    },
    {
      date: tuesday,
      meal: "lunch",
      diet: "veg",
      dishes: "Palak paneer, beetroot roti, watermelon juice",
      note: "Sample",
      imageId: null,
      nutrition: { kcal: 500, proteinG: 26, carbsG: 54, fatG: 16 },
    },
    {
      date: tuesday,
      meal: "dinner",
      diet: "non-veg",
      dishes: "Chicken soup, ragi roti",
      note: "Sample",
      imageId: null,
      nutrition: { kcal: 390, proteinG: 32, carbsG: 36, fatG: 12 },
    },
    {
      date: wednesday,
      meal: "lunch",
      diet: "veg",
      dishes: "Baked hara bhara kebab, beetroot roti",
      note: "Sample",
      imageId: null,
      nutrition: { kcal: 450, proteinG: 20, carbsG: 48, fatG: 15 },
    },
    {
      date: wednesday,
      meal: "dinner",
      diet: "veg",
      dishes: "Palak paneer, ragi roti, multigrain dal",
      note: "Sample",
      imageId: null,
      nutrition: { kcal: 510, proteinG: 27, carbsG: 50, fatG: 17 },
    },
  ];
}
