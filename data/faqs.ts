import { siteConfig } from "@/data/site-config";
import { nonVegPerMeal, pricing } from "@/data/plans";
import { formatInr } from "@/lib/format";

export type FaqPage = "faqs" | "plans";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  pages: FaqPage[];
};

/**
 * Answers a customer can act on. The weekly menu stays labelled as a sample
 * until the live sheet replaces it.
 */
const vegLunch = formatInr(pricing.perMeal.lunch.taste);
const nonVegLunch = formatInr(nonVegPerMeal.lunch);
const breakfast = formatInr(pricing.perMeal.breakfast.taste);
export const faqs: Faq[] = [
  {
    id: "what-is-native-meals",
    question: "What is Native Meals?",
    answer:
      `Native Meals serves healthy breakfast, lunch and dinner on a meal plan. Each meal is cooked the same morning and handed over at your office gate or your door. We serve ${siteConfig.serviceAreaShort} in Pune.`,
    pages: ["faqs"],
  },
  {
    id: "service-area",
    question: "Which areas do you currently serve?",
    answer:
      `We serve ${siteConfig.serviceAreaLine} in Pune, including ${siteConfig.techParkLine}. Office tiffins are handed over at the gate or the security desk. Share your locality or tech park and we will confirm the address.`,
    pages: ["faqs", "plans"],
  },
  {
    id: "veg-non-veg",
    question: "Do you offer vegetarian and non-vegetarian meals?",
    answer:
      `Veg lunch and dinner are ${vegLunch}. Non-veg is ${nonVegLunch}. Breakfast is ${breakfast} either way. Tell us which you want when you start, and the day's menu shows what is cooking.`,
    pages: ["faqs", "plans"],
  },
  {
    id: "which-plans",
    question: "What meal plans are available?",
    answer:
      "Lunch, dinner, or breakfast, lunch and dinner together. Most people in Hinjewadi take Monday to Friday. A 6-day week is there if you also want Saturday. You can start with a single meal.",
    pages: ["faqs", "plans"],
  },
  {
    id: "how-subscriptions-work",
    question: "How do subscriptions work?",
    answer:
      "Pick the meals and a length, from one meal up to a month. Tell us veg or non-veg, and whether the tiffin goes to your office gate or your home. We confirm the start date before the first meal. This site does not take payment or start a plan on its own.",
    pages: ["faqs", "plans"],
  },
  {
    id: "pause-or-change",
    question: "Can I pause or change my plan?",
    answer:
      `${siteConfig.delivery.skipNote} You can keep two addresses: the office gate on days you go in, and your home on work-from-home days.`,
    pages: ["faqs", "plans"],
  },
  {
    id: "delivery",
    question: "How are the meals delivered?",
    answer: siteConfig.delivery.handover,
    pages: ["faqs", "plans"],
  },
  {
    id: "pricing",
    question: "How does pricing work?",
    answer:
      `Breakfast is ${breakfast}. Lunch and dinner are ${vegLunch} veg and ${nonVegLunch} non-veg. The price per meal is the same for one meal or a month. Monday to Friday is five days, and Saturday is a separate choice. We confirm the total, and any delivery charge, before you start.`,
    pages: ["faqs", "plans"],
  },
  {
    id: "weekly-menu",
    question: "How does this week's menu work?",
    answer:
      "The menu runs Monday to Sunday. A day with nothing posted is left off. Until the live week is up, the menu you see is a sample of the kind of food, so you can judge the style.",
    pages: ["faqs"],
  },
  {
    id: "choose-dishes",
    question: "Can I choose the dishes?",
    answer:
      "This week's menu is what the kitchen is cooking. Tell us veg or non-veg, and anything you avoid, when you start. There is no build-your-own plate.",
    pages: ["faqs"],
  },
  {
    id: "whats-in-the-box",
    question: "What is in each meal?",
    answer:
      "The day's breakfast, lunch or dinner from the weekly menu, cooked that morning. The menu changes through the week, and veg and non-veg are both on it. Check this week's menu to see what is cooking.",
    pages: ["faqs", "plans"],
  },
];

export function faqsFor(page: FaqPage) {
  return faqs.filter((faq) => faq.pages.includes(page));
}
