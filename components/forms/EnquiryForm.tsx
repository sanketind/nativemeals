"use client";

import { useId, useState } from "react";
import { plans, pricing, type DurationId } from "@/data/plans";
import { formatInr } from "@/lib/format";
import { formatDuration, quote, type MealSlot } from "@/lib/pricing";
import {
  emptyEnquiry,
  validateEnquiry,
  type DietChoice,
  type EnquiryInput,
  type EnquiryType,
  type FieldErrors,
} from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export type BuilderSelection = {
  meals: MealSlot[];
  duration: DurationId;
  diet: DietChoice;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success" }
  | {
      status: "whatsapp";
      reason: "unconfigured" | "failed";
      whatsappUrl: string;
      emailUrl: string | null;
    }
  | { status: "error"; reason: "unconfigured" | "failed" };

const fieldClass =
  "mt-2 w-full rounded-2xl border border-charcoal/15 bg-white px-4 py-3 text-base text-charcoal outline-none placeholder:text-charcoal/35 focus:border-olive";

export function EnquiryForm({
  type,
  defaultPlan = "",
  submitLabel,
  selection = null,
}: {
  type: EnquiryType;
  defaultPlan?: string;
  submitLabel: string;
  selection?: BuilderSelection | null;
}) {
  const formId = useId();
  const [values, setValues] = useState<EnquiryInput>(() =>
    emptyEnquiry(type, defaultPlan),
  );
  const [errors, setErrors] = useState<FieldErrors>({});
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  function update<K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload: EnquiryInput = {
      ...values,
      diet: selection ? selection.diet : values.diet,
      plan: selection ? "" : values.plan,
      selection: selection
        ? { meals: selection.meals, duration: selection.duration }
        : null,
    };
    const nextErrors = validateEnquiry(payload);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setState({ status: "idle" });
      return;
    }
    setState({ status: "submitting" });
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        fallback?: string;
        reason?: "unconfigured" | "failed";
        whatsappUrl?: string;
        emailUrl?: string | null;
        fields?: FieldErrors;
        error?: string;
      };
      if (data.ok) {
        setState({ status: "success" });
        setValues(emptyEnquiry(type, defaultPlan));
        return;
      }
      if (data.fields) {
        setErrors(data.fields);
        setState({ status: "idle" });
        return;
      }
      if (data.fallback === "whatsapp" && data.whatsappUrl) {
        setState({
          status: "whatsapp",
          reason: data.reason ?? "unconfigured",
          whatsappUrl: data.whatsappUrl,
          emailUrl: data.emailUrl ?? null,
        });
        return;
      }
      setState({
        status: "error",
        reason: data.error === "unavailable" ? "unconfigured" : "failed",
      });
    } catch {
      setState({ status: "error", reason: "failed" });
    }
  }

  const picked = selection ? quote(selection) : null;
  const showPlan = type === "plan" && !picked;
  const showDiet = type === "plan" && !picked;
  const showMessage = type !== "serviceability";
  const nameRequired = type !== "serviceability";
  const localityRequired = type !== "contact";

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor={`${formId}-company`}>Company</label>
        <input
          id={`${formId}-company`}
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
        />
      </div>

      {picked ? (
        <div className="rounded-2xl bg-sage/70 px-4 py-3 text-sm leading-relaxed text-charcoal">
          <p className="font-medium">{picked.planName}</p>
          <p className="mt-1 text-charcoal/75">
            {picked.lines.map((line) => line.label).join(", ")} ·{" "}
            {formatDuration(picked.durationLabel, picked.days)} · {dietLabel(selection?.diet ?? "")}
          </p>
          <p className="mt-2 font-semibold">Estimated total {formatInr(picked.total)}</p>
          {pricing.status === "draft" ? (
            <p className="mt-1 text-charcoal/60">{pricing.note}</p>
          ) : null}
        </div>
      ) : null}
      {errors.plan && !showPlan ? (
        <p className="text-sm text-terracotta-ink">{errors.plan}</p>
      ) : null}

      <Field
        id={`${formId}-name`}
        label="Name"
        required={nameRequired}
        error={errors.name}
      >
        <input
          id={`${formId}-name`}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          className={inputClass(Boolean(errors.name))}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
        />
      </Field>

      <Field
        id={`${formId}-phone`}
        label="Phone"
        required
        error={errors.phone}
      >
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98XXXX XXXX"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          className={inputClass(Boolean(errors.phone))}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${formId}-phone-error` : undefined}
        />
      </Field>

      {showPlan ? (
        <Field id={`${formId}-plan`} label="Preferred meal plan" required error={errors.plan}>
          <select
            id={`${formId}-plan`}
            name="plan"
            value={values.plan}
            onChange={(event) => update("plan", event.target.value)}
            className={inputClass(Boolean(errors.plan))}
            aria-invalid={Boolean(errors.plan)}
            aria-describedby={errors.plan ? `${formId}-plan-error` : undefined}
          >
            <option value="">Select a plan</option>
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.name}
              </option>
            ))}
          </select>
        </Field>
      ) : null}

      {showDiet ? (
        <Field id={`${formId}-diet`} label="Dietary preference" error={errors.diet}>
          <select
            id={`${formId}-diet`}
            name="diet"
            value={values.diet}
            onChange={(event) =>
              update("diet", event.target.value as EnquiryInput["diet"])
            }
            className={inputClass(false)}
          >
            <option value="">No preference yet</option>
            <option value="veg">Vegetarian</option>
            <option value="non-veg">Non-vegetarian</option>
            <option value="either">Either is fine</option>
          </select>
        </Field>
      ) : null}

      <Field
        id={`${formId}-locality`}
        label="Locality"
        required={localityRequired}
        error={errors.locality}
        hint={
          type === "serviceability"
            ? "For example, Wakad, Baner or Hinjewadi."
            : undefined
        }
      >
        <input
          id={`${formId}-locality`}
          name="locality"
          autoComplete="address-level2"
          value={values.locality}
          onChange={(event) => update("locality", event.target.value)}
          className={inputClass(Boolean(errors.locality))}
          aria-invalid={Boolean(errors.locality)}
          aria-describedby={errors.locality ? `${formId}-locality-error` : undefined}
        />
      </Field>

      {showMessage ? (
        <Field
          id={`${formId}-message`}
          label={type === "contact" ? "Message" : "Anything we should know"}
          required={type === "contact"}
          error={errors.message}
        >
          <textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            value={values.message}
            onChange={(event) => update("message", event.target.value)}
            className={inputClass(Boolean(errors.message))}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? `${formId}-message-error` : undefined}
          />
        </Field>
      ) : null}

      <Button type="submit" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Sending…" : submitLabel}
      </Button>

      <div aria-live="polite" className="min-h-6 text-sm leading-relaxed">
        {state.status === "success" ? (
          <p className="text-olive">
            {type === "serviceability"
              ? "Thanks. We will confirm whether we can serve this area."
              : "Thanks. We have your enquiry and will be in touch."}
          </p>
        ) : null}
        {state.status === "whatsapp" ? (
          <div className="rounded-2xl bg-sage/70 p-4 text-charcoal">
            <p>
              {state.reason === "failed"
                ? "We could not send that just now. You can still message us with the same details."
                : "This form is not connected to an inbox yet. Send the same details and we will reply."}
            </p>
            <p className="mt-3 flex flex-wrap gap-4 font-semibold">
              <a
                href={state.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-olive underline-offset-2 hover:underline"
              >
                Send via WhatsApp
              </a>
              {state.emailUrl ? (
                <a href={state.emailUrl} className="text-olive underline-offset-2 hover:underline">
                  Send by email
                </a>
              ) : null}
            </p>
          </div>
        ) : null}
        {state.status === "error" ? (
          <p className="text-terracotta-ink">
            {state.reason === "unconfigured"
              ? "We could not send this yet, because contact details are not set up on the site."
              : "We could not send this. Please try again in a moment."}
          </p>
        ) : null}
      </div>
    </form>
  );
}

function dietLabel(diet: DietChoice) {
  if (diet === "veg") return "Vegetarian";
  if (diet === "non-veg") return "Non-vegetarian";
  if (diet === "either") return "Either is fine";
  return "No preference yet";
}

function inputClass(invalid: boolean) {
  return cn(fieldClass, invalid && "border-terracotta-ink");
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-charcoal">
        {label}
        {required ? <span className="text-terracotta-ink"> *</span> : null}
      </label>
      {hint ? <p className="mt-1 text-sm text-charcoal/55">{hint}</p> : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className="mt-1 text-sm text-terracotta-ink">
          {error}
        </p>
      ) : null}
    </div>
  );
}
