import { addIsoDays, mondayOf } from "@/lib/dates";
import type { WeeklyMenuRow } from "@/lib/weekly-menu";

/**
 * Stand-in week used only when WEEKLY_MENU_CSV_URL is not set.
 * Dates follow the current India week so the layout can be reviewed any day.
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
      dishes: "Idli with chutney",
      note: "Sample",
      imageId: null,
    },
    {
      date: monday,
      meal: "lunch",
      diet: "veg",
      dishes: "Vegetable curry, steamed rice",
      note: "Sample",
      imageId: null,
    },
    {
      date: monday,
      meal: "lunch",
      diet: "non-veg",
      dishes: "Chicken curry, naan",
      note: "Sample",
      imageId: null,
    },
    {
      date: monday,
      meal: "dinner",
      diet: "veg",
      dishes: "Seasoned rice",
      note: "Sample",
      imageId: null,
    },
    {
      date: tuesday,
      meal: "breakfast",
      diet: "veg",
      dishes: "Idli with chutney",
      note: "Sample",
      imageId: null,
    },
    {
      date: tuesday,
      meal: "lunch",
      diet: "veg",
      dishes: "Vegetable curry, steamed rice",
      note: "Sample",
      imageId: null,
    },
    {
      date: tuesday,
      meal: "dinner",
      diet: "non-veg",
      dishes: "Chicken curry, naan",
      note: "Sample",
      imageId: null,
    },
    {
      date: wednesday,
      meal: "lunch",
      diet: "veg",
      dishes: "Seasoned rice",
      note: "Sample",
      imageId: null,
    },
    {
      date: wednesday,
      meal: "dinner",
      diet: "veg",
      dishes: "Vegetable curry, steamed rice",
      note: "Sample",
      imageId: null,
    },
  ];
}
