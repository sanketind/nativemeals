export type FaqPage = "home" | "faqs" | "plans";

export type Faq = {
  id: string;
  question: string;
  answer: string;
  pages: FaqPage[];
};

/**
 * Answers stay conservative on purpose. Where a policy is not decided, the
 * copy says so. TODO comments mark lines that must be replaced before launch.
 */
export const faqs: Faq[] = [
  {
    id: "what-is-native-meals",
    question: "What is Native Meals?",
    answer:
      "Native Meals prepares clean, healthy meals for breakfast, lunch and dinner, so you spend less time planning and cooking. We serve Wakad, Hinjewadi, Baner, Aundh, Tathwade and Punewale in Pune. The menu can include a sandwich, scrambled eggs or oats as well as a fuller plate.",
    pages: ["home", "faqs"],
  },
  {
    id: "service-area",
    question: "Which areas do you currently serve?",
    answer:
      "We serve Wakad, Hinjewadi, Baner, Aundh, Tathwade and Punewale in Pune. Share your locality and we will confirm the address.",
    pages: ["home", "faqs", "plans"],
  },
  {
    id: "veg-non-veg",
    question: "Do you offer vegetarian and non-vegetarian meals?",
    answer:
      "Yes. Tell us your preference when you enquire, and we will confirm what is available for the plan you want.",
    pages: ["home", "faqs", "plans"],
  },
  {
    id: "which-plans",
    question: "What meal plans are available?",
    answer:
      "We are setting up a Lunch Plan, a Dinner Plan and an All-day Plan. Share what your day looks like and we will help you explore the option that fits. Nothing is confirmed until we reply.",
    pages: ["home", "faqs", "plans"],
  },
  {
    id: "how-subscriptions-work",
    question: "How do subscriptions work?",
    answer:
      "Choose a plan, tell us your preferences and where you are, and we confirm the ordering and the delivery or collection arrangement with you. This site does not start an automatic subscription or take payment.",
    pages: ["home", "faqs", "plans"],
  },
  {
    id: "pause-or-change",
    question: "Can I pause or change my plan?",
    // TODO: Replace with the confirmed pause, change and cancellation policy.
    answer:
      "Pause, change and cancellation terms are still being finalised. Ask when you enquire and we will explain what is possible before you commit to anything.",
    pages: ["home", "faqs", "plans"],
  },
  {
    id: "delivery",
    question: "How are the meals delivered?",
    // TODO: Replace with the confirmed delivery and collection arrangement.
    answer:
      "Delivery and collection depend on your location and plan. We confirm the arrangement with you when you enquire. We do not publish fixed delivery times yet.",
    pages: ["home", "faqs", "plans"],
  },
  {
    id: "pricing",
    question: "How does pricing work?",
    // TODO: Rewrite once pricing.status in data/plans.ts is "confirmed".
    answer:
      "Each meal has its own price, and a longer plan costs less per meal. The prices on the Meal Plans page are introductory. We confirm the total, and any delivery charge, before you start.",
    pages: ["home", "faqs", "plans"],
  },
  {
    id: "weekly-menu",
    question: "How does this week's menu work?",
    answer:
      "The kitchen posts the week, and the site shows the current Monday to Sunday. A day with nothing posted does not appear. Until that sheet is connected, you will see a week marked as a sample.",
    pages: ["home", "faqs"],
  },
  {
    id: "choose-dishes",
    question: "Can I choose the dishes?",
    answer:
      "This week's menu is what the kitchen is cooking. Tell us what you prefer when you enquire and we will confirm what we can do. There is no build-your-own plate.",
    pages: ["home", "faqs"],
  },
];

export function faqsFor(page: FaqPage) {
  return faqs.filter((faq) => faq.pages.includes(page));
}
