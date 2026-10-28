import { siteConfig } from "@/data/site-config";

export type FaqPage = "faqs" | "plans";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  pages: FaqPage[];
};

const cutoff = siteConfig.delivery.skipCutoff
  ? `before ${siteConfig.delivery.skipCutoff}`
  : "before the day's cutoff";

/**
 * Answers a customer can act on. Sample-menu and draft-price lines stay
 * until the live sheet and confirmed prices replace them.
 */
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
      `We serve ${siteConfig.serviceAreaLine} in Pune, including ${siteConfig.techParkLine}. Office tiffins are handed over at the gate or the security desk. Share your phase, tech park or locality and we will confirm the address.`,
    pages: ["faqs", "plans"],
  },
  {
    id: "veg-non-veg",
    question: "Do you offer vegetarian and non-vegetarian meals?",
    answer:
      "Yes, at the same price. Tell us which you want when you start, and the day's menu shows what is cooking.",
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
      `Yes. Message us on WhatsApp ${cutoff} to skip a meal, or pause the plan when you travel or go on leave. A skipped meal carries forward. You can keep two addresses: the office gate on days you go in, and your home on work-from-home days.`,
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
      "Each meal has its own price, and a longer plan costs less per meal. One meal is the short trial. Monday to Friday is priced for office weeks, so Saturday is a separate choice. We confirm the total, and any delivery charge, before you start. The prices on the Meal Plans page are introductory.",
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
