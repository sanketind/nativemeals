import { cacheLife, cacheTag } from "next/cache";
import { getImage } from "@/data/images";
import { siteConfig } from "@/data/site-config";
import { buildSampleWeeklyRows } from "@/data/weekly-menu.sample";
import {
  formatDayMonth,
  formatRange,
  formatWeekday,
  indiaTodayIso,
  isValidIsoDate,
  mondayOf,
  sundayOf,
} from "@/lib/dates";
import type { Diet } from "@/data/menu";

export type WeeklyMeal = "breakfast" | "lunch" | "dinner";

export type WeeklyMenuRow = {
  date: string;
  meal: WeeklyMeal;
  diet: Diet;
  dishes: string;
  note: string;
  imageId: string | null;
};

export type WeeklyMenuDay = {
  date: string;
  weekday: string;
  dateLabel: string;
  isToday: boolean;
  meals: WeeklyMenuRow[];
};

export type WeeklyMenuSource = "sheet" | "sample" | "empty" | "error";

export type WeeklyMenuData = {
  source: WeeklyMenuSource;
  today: string;
  days: WeeklyMenuDay[];
  rangeLabel: string;
  footnote: string;
};

const MEAL_ORDER: WeeklyMeal[] = ["breakfast", "lunch", "dinner"];

export function parseCsv(text: string) {
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          cell += '"';
          i += 1;
        } else {
          inQuotes = false;
        }
      } else {
        cell += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(cell);
      cell = "";
    } else if (char === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (char !== "\r") {
      cell += char;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((entry) => entry.some((value) => value.trim()));
}

function parseDate(value: string) {
  const trimmed = value.trim();
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (iso) {
    const candidate = `${iso[1]}-${iso[2]}-${iso[3]}`;
    return isValidIsoDate(candidate) ? candidate : null;
  }
  const local = /^(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})$/.exec(trimmed);
  if (!local) return null;
  const candidate = `${local[3]}-${local[2].padStart(2, "0")}-${local[1].padStart(2, "0")}`;
  return isValidIsoDate(candidate) ? candidate : null;
}

function parseMeal(value: string): WeeklyMeal | null {
  const meal = value.trim().toLowerCase();
  if (meal.startsWith("break")) return "breakfast";
  if (meal.startsWith("lunch")) return "lunch";
  if (meal.startsWith("dinner")) return "dinner";
  return null;
}

function parseDiet(value: string): Diet | null {
  const diet = value.trim().toLowerCase().replace(/[^a-z]/g, "");
  if (diet === "veg" || diet === "vegetarian") return "veg";
  if (diet === "nonveg" || diet === "nonvegetarian") return "non-veg";
  return null;
}

function isShown(value: string | undefined) {
  if (!value || !value.trim()) return true;
  return !["false", "0", "no", "n", "hide"].includes(value.trim().toLowerCase());
}

export function parseWeeklyCsv(text: string) {
  const table = parseCsv(text);
  if (table.length === 0) return [];
  const header = table[0].map((cell) => cell.trim().toLowerCase());
  const index = (name: string) => header.indexOf(name);
  const dateIndex = index("date");
  const mealIndex = index("meal");
  const dietIndex = index("diet");
  const dishesIndex = index("dishes");
  if (dateIndex < 0 || mealIndex < 0 || dietIndex < 0 || dishesIndex < 0) {
    console.warn("Weekly menu CSV is missing required columns.");
    return [];
  }
  const noteIndex = index("note");
  const imageIndex = index("image");
  const showIndex = index("show");
  const rows: WeeklyMenuRow[] = [];

  table.slice(1).forEach((cells, position) => {
    if (!isShown(showIndex >= 0 ? cells[showIndex] : undefined)) return;
    const date = parseDate(cells[dateIndex] ?? "");
    const meal = parseMeal(cells[mealIndex] ?? "");
    const diet = parseDiet(cells[dietIndex] ?? "");
    const dishes = (cells[dishesIndex] ?? "").trim();
    if (!date || !meal || !diet || !dishes) {
      console.warn(`Skipping weekly menu row ${position + 2}.`);
      return;
    }
    const imageKey = imageIndex >= 0 ? (cells[imageIndex] ?? "").trim() : "";
    rows.push({
      date,
      meal,
      diet,
      dishes,
      note: noteIndex >= 0 ? (cells[noteIndex] ?? "").trim() : "",
      imageId: imageKey && getImage(imageKey) ? imageKey : null,
    });
  });

  return rows;
}

export function assembleWeeklyMenu(
  rows: WeeklyMenuRow[],
  source: Exclude<WeeklyMenuSource, "error">,
  today: string,
): WeeklyMenuData {
  const start = mondayOf(today);
  const end = sundayOf(today);
  const inWeek = rows.filter((row) => row.date >= start && row.date <= end);
  const byDate = new Map<string, WeeklyMenuRow[]>();

  for (const row of inWeek) {
    const list = byDate.get(row.date) ?? [];
    list.push(row);
    byDate.set(row.date, list);
  }

  const days = [...byDate.keys()]
    .sort()
    .map((date) => ({
      date,
      weekday: formatWeekday(date),
      dateLabel: formatDayMonth(date),
      isToday: date === today,
      meals: (byDate.get(date) ?? []).sort(
        (a, b) => MEAL_ORDER.indexOf(a.meal) - MEAL_ORDER.indexOf(b.meal),
      ),
    }));

  return {
    source: days.length === 0 && source === "sheet" ? "empty" : source,
    today,
    days,
    rangeLabel: days.length
      ? formatRange(days[0].date, days[days.length - 1].date)
      : "",
    footnote: siteConfig.weeklyMenu.footnote,
  };
}

function unavailableMenu(today: string): WeeklyMenuData {
  return {
    source: "error",
    today,
    days: [],
    rangeLabel: "",
    footnote: siteConfig.weeklyMenu.footnote,
  };
}

/** Absolute http(s) URL, or null when the setting is missing or not a URL. */
function weeklyMenuUrl() {
  const raw = process.env.WEEKLY_MENU_CSV_URL?.trim();
  if (!raw) return null;

  const candidate = raw
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/^['"]+|['"]+$/g, "")
    .replace(/\s+/g, "")
    .replace(/^WEEKLY_MENU_CSV_URL=/, "");

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return parsed.href;
  } catch {
    return null;
  }
}

async function loadWeeklyMenu(): Promise<WeeklyMenuData> {
  "use cache";
  cacheTag("weekly-menu");
  cacheLife({ stale: 300, revalidate: 900, expire: 60 * 60 * 24 });

  const today = indiaTodayIso();
  const configured = Boolean(process.env.WEEKLY_MENU_CSV_URL?.trim());
  const url = weeklyMenuUrl();

  if (!configured) {
    return assembleWeeklyMenu(buildSampleWeeklyRows(today), "sample", today);
  }

  if (!url) {
    console.error("WEEKLY_MENU_CSV_URL is set, but it is not a valid http(s) URL.");
    return unavailableMenu(today);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weekly menu request failed (${response.status}).`);
    }
    const rows = parseWeeklyCsv(await response.text());
    return assembleWeeklyMenu(rows, "sheet", today);
  } catch (error) {
    console.error("Weekly menu could not be loaded.", error);
    return unavailableMenu(today);
  }
}

export async function getWeeklyMenu(): Promise<WeeklyMenuData> {
  return loadWeeklyMenu();
}

export function upcomingDays(menu: WeeklyMenuData, count = 3) {
  return menu.days.filter((day) => day.date >= menu.today).slice(0, count);
}
