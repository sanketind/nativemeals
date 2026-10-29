import { getPlan } from "@/data/plans";
import { addIsoDays, indiaTodayIso, isValidIsoDate } from "@/lib/dates";
import {
  isDurationId,
  isMealSlot,
  quote,
  type MealSlot,
  type PlanSelection,
} from "@/lib/pricing";

export type EnquiryType = "plan" | "contact" | "serviceability";
export type DietChoice = "" | "veg" | "non-veg" | "either";
export type HandoverChoice = "" | "office" | "home" | "both";

export type EnquiryInput = {
  type: EnquiryType;
  name: string;
  phone: string;
  plan: string;
  diet: DietChoice;
  locality: string;
  /** Office, home, or both. Required for a plan enquiry. */
  handover: HandoverChoice;
  /** Office address, home address, or the office when both are set. */
  address: string;
  /** Home address when handover is both. */
  homeAddress: string;
  /** Preferred first tiffin, YYYY-MM-DD. Required for a plan enquiry. */
  startDate: string;
  message: string;
  /** Set by the plan picker. The server recomputes the price from this. */
  selection: PlanSelection | null;
  /** Honeypot. Must stay empty. */
  company: string;
};

export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g;

export function clean(value: unknown, max: number) {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL, "").trim().slice(0, max);
}

export function normalizePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const local =
    digits.length === 12 && digits.startsWith("91")
      ? digits.slice(2)
      : digits.length === 11 && digits.startsWith("0")
        ? digits.slice(1)
        : digits;
  if (!/^[6-9]\d{9}$/.test(local)) return null;
  return local;
}

export function emptyEnquiry(type: EnquiryType, plan = ""): EnquiryInput {
  return {
    type,
    name: "",
    phone: "",
    plan,
    diet: "",
    locality: "",
    handover: "",
    address: "",
    homeAddress: "",
    startDate: "",
    message: "",
    selection: null,
    company: "",
  };
}

function parseSelection(value: unknown): PlanSelection | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const rawMeals = Array.isArray(record.meals) ? record.meals : [];
  const meals: MealSlot[] = [];
  for (const meal of rawMeals) {
    if (typeof meal !== "string" || !isMealSlot(meal) || meals.includes(meal)) {
      return null;
    }
    meals.push(meal);
  }
  const duration = clean(record.duration, 20);
  if (!isDurationId(duration) || meals.length === 0) return null;
  return { meals, duration };
}

export function validateEnquiry(input: EnquiryInput): FieldErrors {
  const errors: FieldErrors = {};
  const nameRequired = input.type !== "serviceability";
  const localityRequired = input.type !== "contact";
  const messageRequired = input.type === "contact";

  if (nameRequired && input.name.length < 2) {
    errors.name = "Please add your name.";
  } else if (input.name && input.name.length < 2) {
    errors.name = "Name looks too short.";
  }

  if (!normalizePhone(input.phone)) {
    errors.phone = "Enter a 10-digit Indian mobile number.";
  }

  if (input.type === "plan") {
    if (input.selection) {
      if (!quote(input.selection)) {
        errors.plan = "Choose at least one meal and a duration.";
      }
    } else if (!getPlan(input.plan)) {
      errors.plan = "Choose a meal plan.";
    }
  }

  if (input.diet && !["veg", "non-veg", "either"].includes(input.diet)) {
    errors.diet = "Choose a preference.";
  }

  if (localityRequired && input.locality.length < 2) {
    errors.locality = "Tell us your locality so we can check.";
  }

  if (input.type === "plan") {
    if (input.handover !== "office" && input.handover !== "home" && input.handover !== "both") {
      errors.handover = "Choose office, home, or both.";
    } else if (input.address.length < 8) {
      errors.address = "Add the building, gate, or flat.";
    }
    if (input.handover === "both" && input.homeAddress.length < 8) {
      errors.homeAddress = "Add the home address too.";
    }

    const today = indiaTodayIso();
    if (!isValidIsoDate(input.startDate)) {
      errors.startDate = "Choose the day you want to start.";
    } else if (input.startDate < today) {
      errors.startDate = "Choose today or a later day.";
    } else if (input.startDate > addIsoDays(today, 180)) {
      errors.startDate = "Choose a day in the next six months.";
    }
  }

  if (messageRequired && input.message.length < 2) {
    errors.message = "Add a short note so we know how to help.";
  }

  return errors;
}

export function parseEnquiryBody(body: unknown): EnquiryInput | null {
  if (!body || typeof body !== "object") return null;
  const record = body as Record<string, unknown>;
  const type = record.type;
  if (type !== "plan" && type !== "contact" && type !== "serviceability") {
    return null;
  }
  const diet = clean(record.diet, 20);
  const handover = clean(record.handover, 10);
  let selection: PlanSelection | null = null;
  if ("selection" in record && record.selection != null) {
    // An unreadable selection must fail validation, not fall through to the plan id.
    selection = parseSelection(record.selection) ?? { meals: [], duration: "trial" };
  }
  return {
    type,
    name: clean(record.name, 80),
    phone: clean(record.phone, 20),
    plan: clean(record.plan, 40),
    diet: diet === "veg" || diet === "non-veg" || diet === "either" ? diet : "",
    locality: clean(record.locality, 120),
    handover: handover === "office" || handover === "home" || handover === "both" ? handover : "",
    address: clean(record.address, 200),
    homeAddress: clean(record.homeAddress, 200),
    startDate: clean(record.startDate, 10),
    message: clean(record.message, 1000),
    selection,
    company: clean(record.company, 80),
  };
}
