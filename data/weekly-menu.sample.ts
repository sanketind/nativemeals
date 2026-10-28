import { addIsoDays, mondayOf } from "@/lib/dates";
import type { WeeklyMenuRow } from "@/lib/weekly-menu";

/**
 * Stand-in week used only when WEEKLY_MENU_CSV_URL is not set.
 * Dates follow the current India week so the layout can be reviewed any day.
 * Dishes follow the kitchen: clean plates, no potatoes, regular dal or maida chapati.
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
    },
    {
      date: monday,
      meal: "lunch",
      diet: "veg",
      dishes: "Palak paneer, beetroot roti, multigrain dal",
      note: "Sample",
      imageId: null,
    },
    {
      date: monday,
      meal: "lunch",
      diet: "non-veg",
      dishes: "Palak chicken, beetroot roti, multigrain dal",
      note: "Sample",
      imageId: null,
    },
    {
      date: monday,
      meal: "dinner",
      diet: "veg",
      dishes: "Baked hara bhara kebab, multigrain dal",
      note: "Sample",
      imageId: null,
    },
    {
      date: tuesday,
      meal: "breakfast",
      diet: "veg",
      dishes: "Ragi roti",
      note: "Sample",
      imageId: null,
    },
    {
      date: tuesday,
      meal: "lunch",
      diet: "veg",
      dishes: "Palak paneer, beetroot roti, watermelon juice",
      note: "Sample",
      imageId: null,
    },
    {
      date: tuesday,
      meal: "dinner",
      diet: "non-veg",
      dishes: "Chicken soup, ragi roti",
      note: "Sample",
      imageId: null,
    },
    {
      date: wednesday,
      meal: "lunch",
      diet: "veg",
      dishes: "Baked hara bhara kebab, beetroot roti",
      note: "Sample",
      imageId: null,
    },
    {
      date: wednesday,
      meal: "dinner",
      diet: "veg",
      dishes: "Palak paneer, ragi roti, multigrain dal",
      note: "Sample",
      imageId: null,
    },
  ];
}
