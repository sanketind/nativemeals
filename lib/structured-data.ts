import { images } from "@/data/images";
import { type Faq } from "@/data/faqs";
import { nonVegPerMeal, pricing } from "@/data/plans";
import { siteConfig } from "@/data/site-config";

export type JsonLdNode = Record<string, unknown>;

/**
 * Handover windows are deadlines, not hours the kitchen is open, so they are
 * never published as openingHours.
 */
export function foodEstablishment(): JsonLdNode {
  const image = publicPhotoUrl();
  const sameAs = siteConfig.socials.map((social) => social.href);
  const postalCode = siteConfig.address.match(/\b\d{6}\b/)?.[0];

  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: siteConfig.city,
      ...(postalCode ? { postalCode } : {}),
      addressCountry: "IN",
    },
    areaServed: [
      ...siteConfig.serviceAreas.map((name) => ({ "@type": "Place", name })),
      { "@type": "City", name: siteConfig.city },
    ],
    menu: `${siteConfig.url}/#this-week`,
    ...(image ? { image } : {}),
    ...(siteConfig.contact.phone ? { telephone: siteConfig.contact.phone } : {}),
    ...(siteConfig.contact.email ? { email: siteConfig.contact.email } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function faqPage(items: Faq[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Per-meal enquiry prices. Omitted while prices are still a draft, and never marked in stock. */
export function mealPlanOffers(): JsonLdNode | null {
  if (pricing.status !== "confirmed") return null;

  const url = `${siteConfig.url}/meal-plans`;
  const description =
    "Per meal. Sending a message is an enquiry. The total is confirmed before the first meal.";

  function offer(name: string, price: number): JsonLdNode {
    return {
      "@type": "Offer",
      name,
      price: String(price),
      priceCurrency: "INR",
      url,
      description,
      offeredBy: { "@id": `${siteConfig.url}/#business` },
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: `${siteConfig.name} meal plans`,
    itemListElement: [
      offer("Breakfast", pricing.perMeal.breakfast.taste),
      offer("Veg lunch", pricing.perMeal.lunch.taste),
      offer("Non-veg lunch", nonVegPerMeal.lunch),
      offer("Veg dinner", pricing.perMeal.dinner.taste),
      offer("Non-veg dinner", nonVegPerMeal.dinner),
    ],
  };
}

function publicPhotoUrl() {
  const hero = images.heroMain.placeholder ? null : images.heroMain;
  const photo = hero ?? Object.values(images).find((item) => !item.placeholder);
  if (!photo) return null;
  return new URL(photo.src, siteConfig.url).href;
}
