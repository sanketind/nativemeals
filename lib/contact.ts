import { siteConfig } from "@/data/site-config";
import { getPlan } from "@/data/plans";
import { formatInr } from "@/lib/format";
import { quote } from "@/lib/pricing";
import type { EnquiryInput } from "@/lib/validation";

export function digitsOnly(value: string) {
  return value.replace(/\D/g, "");
}

export function phoneHref(phone: string | null) {
  if (!phone) return null;
  const digits = digitsOnly(phone);
  if (!digits) return null;
  const dial = digits.length === 10 ? `91${digits}` : digits;
  return `tel:+${dial}`;
}

export function displayPhone(phone: string | null) {
  if (!phone) return null;
  const digits = digitsOnly(phone);
  if (digits.length === 12 && digits.startsWith("91")) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }
  if (digits.length === 10) return `+91 ${digits.slice(0, 5)} ${digits.slice(5)}`;
  return phone.trim();
}

export function whatsappHref(message?: string) {
  const raw = siteConfig.contact.whatsapp;
  if (!raw) return null;
  const digits = digitsOnly(raw);
  if (!digits) return null;
  const base = `https://wa.me/${digits}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export function enquiryMessage(input: Pick<
  EnquiryInput,
  "type" | "name" | "phone" | "plan" | "diet" | "locality" | "message" | "selection"
>) {
  const estimate = input.selection
    ? quote({ ...input.selection, diet: input.diet })
    : null;
  const planName = estimate
    ? estimate.planName
    : input.plan
      ? (getPlan(input.plan)?.name ?? input.plan)
      : "";
  const dietLabel =
    input.diet === "veg"
      ? "Vegetarian"
      : input.diet === "non-veg"
        ? "Non-vegetarian"
        : input.diet === "either"
          ? "No preference"
          : "";

  const lines = ["Hi Native Meals, I would like to start a meal plan."];
  if (input.type === "serviceability") {
    lines.push("", "Please confirm if you can serve my area.");
  }
  if (input.name) lines.push(`Name: ${input.name}`);
  if (input.phone) lines.push(`Phone: ${input.phone}`);
  if (planName) lines.push(`Plan: ${planName}`);
  if (estimate) {
    lines.push(`Meals: ${estimate.lines.map((line) => line.label).join(", ")}`);
    lines.push(`Duration: ${estimate.durationLabel} (${estimate.days} days)`);
    const caveat =
      estimate.pricingStatus === "draft" ? " (introductory, subject to confirmation)" : "";
    lines.push(`Estimate: ${formatInr(estimate.total)}${caveat}`);
    if (estimate.dietNote) lines.push(estimate.dietNote);
  }
  if (dietLabel) lines.push(`Preference: ${dietLabel}`);
  if (input.locality) lines.push(`Locality: ${input.locality}`);
  if (input.message) lines.push(`Note: ${input.message}`);
  return lines.join("\n");
}

export function enquiryEstimate(input: Pick<EnquiryInput, "selection" | "diet">) {
  if (!input.selection) return null;
  const estimate = quote({ ...input.selection, diet: input.diet });
  if (!estimate) return null;
  return {
    pricingStatus: estimate.pricingStatus,
    plan: estimate.planName,
    duration: estimate.durationLabel,
    days: estimate.days,
    meals: estimate.lines.map((line) => ({
      meal: line.label,
      perMeal: line.perMeal,
    })),
    perDay: estimate.perDay,
    total: estimate.total,
    note: estimate.pricingStatus === "draft" ? estimate.note : "",
  };
}

export function enquiryWhatsappHref(input: Parameters<typeof enquiryMessage>[0]) {
  return whatsappHref(enquiryMessage(input));
}

export function enquiryMailtoHref(input: Parameters<typeof enquiryMessage>[0]) {
  const email = siteConfig.contact.email;
  if (!email) return null;
  const subject =
    input.type === "serviceability"
      ? "Service area check"
      : input.type === "plan"
        ? "Meal plan enquiry"
        : "Enquiry";
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(enquiryMessage(input))}`;
}
