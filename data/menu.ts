import type { ImageId } from "@/data/images";

export type Diet = "veg" | "non-veg";
export type MealType = "breakfast" | "lunch" | "dinner";
export type Availability = "available" | "coming-soon" | "to-be-confirmed";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  mealTypes: MealType[];
  diet: Diet;
  category: "breakfast" | "vegetarian" | "non-vegetarian" | "rice-curry" | "everyday";
  imageId: ImageId;
  /** Null until a price is confirmed. Never invent one. */
  price: number | null;
  availability: Availability;
  isSample: true;
};

/**
 * SAMPLE MENU. Every item is a stand-in matched to the stock photo on the card.
 * Replace this list with the real menu before launch. Do not add dishes, prices
 * or portion sizes that have not been confirmed.
 */
export const menuItems: MenuItem[] = [
  {
    id: "idli-sambar",
    name: "Idli, vada and sambar",
    description: "Steamed idlis with a vada, sambar and chutney.",
    mealTypes: ["breakfast"],
    diet: "veg",
    category: "breakfast",
    imageId: "breakfast",
    price: null,
    availability: "to-be-confirmed",
    isSample: true,
  },
  {
    id: "roti-thali",
    name: "Roti, sabzi and dal",
    description: "Rotis with a vegetable sabzi and dal.",
    mealTypes: ["lunch", "dinner"],
    diet: "veg",
    category: "everyday",
    imageId: "vegetarian",
    price: null,
    availability: "to-be-confirmed",
    isSample: true,
  },
  {
    id: "vegetable-curry-rice",
    name: "Vegetable curry with rice",
    description:
      "A vegetable curry with peas and cauliflower, eaten with steamed rice.",
    mealTypes: ["lunch", "dinner"],
    diet: "veg",
    category: "rice-curry",
    imageId: "riceCurry",
    price: null,
    availability: "to-be-confirmed",
    isSample: true,
  },
  {
    id: "seasoned-rice",
    name: "Seasoned rice",
    description: "Yellow seasoned rice with herbs, served in a bowl.",
    mealTypes: ["lunch", "dinner"],
    diet: "veg",
    category: "rice-curry",
    imageId: "riceBowl",
    price: null,
    availability: "to-be-confirmed",
    isSample: true,
  },
  {
    id: "pav-bhaji",
    name: "Pav bhaji",
    description: "Soft pav with a spiced vegetable bhaji.",
    mealTypes: ["lunch", "dinner"],
    diet: "veg",
    category: "everyday",
    imageId: "everyday",
    price: null,
    availability: "to-be-confirmed",
    isSample: true,
  },
  {
    id: "chicken-curry-naan",
    name: "Chicken curry with naan",
    description: "A straightforward chicken curry with naan on the side.",
    mealTypes: ["lunch", "dinner"],
    diet: "non-veg",
    category: "non-vegetarian",
    imageId: "nonVegetarian",
    price: null,
    availability: "to-be-confirmed",
    isSample: true,
  },
];

export const foodCategories: {
  id: string;
  label: string;
  imageId: ImageId;
  href: string;
}[] = [
  {
    id: "breakfast",
    label: "Breakfast",
    imageId: "breakfast",
    href: "/#this-week",
  },
  {
    id: "vegetarian",
    label: "Vegetarian Meals",
    imageId: "vegetarian",
    href: "/#this-week",
  },
  {
    id: "non-vegetarian",
    label: "Non-Vegetarian Meals",
    imageId: "nonVegetarian",
    href: "/#this-week",
  },
  {
    id: "rice-curry",
    label: "Rice & Curry",
    imageId: "riceCurry",
    href: "/#this-week",
  },
  {
    id: "everyday",
    label: "Full plates",
    imageId: "vegetarian",
    href: "/#this-week",
  },
];

/** Sample "day" strip. Serving times stay null until the kitchen confirms them. */
export const dayStrip: {
  meal: string;
  itemId: string;
  /** TODO: Set a serving time such as "8:30 am" only when it is real. */
  time: string | null;
}[] = [
  { meal: "Breakfast", itemId: "idli-sambar", time: null },
  { meal: "Lunch", itemId: "roti-thali", time: null },
  { meal: "Dinner", itemId: "chicken-curry-naan", time: null },
];

export function getMenuItem(id: string) {
  return menuItems.find((item) => item.id === id);
}
