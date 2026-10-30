"use client";

import { useEffect, useId, useState } from "react";
import { plans, pricing, type LengthId, type ScheduleId } from "@/data/plans";
import { addIsoDays, indiaTodayIso } from "@/lib/dates";
import { formatInr } from "@/lib/format";
import { formatSelection, quote, type MealSlot } from "@/lib/pricing";
import {
  emptyEnquiry,
  validateEnquiry,
  type DietChoice,
  type EnquiryInput,
  type EnquiryType,
  type FieldErrors,
  type HandoverChoice,
} from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import { Choice, Field, TextInput } from "@/components/ui/Field";
import { Note } from "@/components/ui/Note";
import { controlClass, fieldError, fieldHint, fieldLabel } from "@/components/ui/styles";

export type BuilderSelection = {
  meals: MealSlot[];
  schedule: ScheduleId;
  length: LengthId;
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

const handoverChoices: { id: Exclude<HandoverChoice, "">; label: string }[] = [
  { id: "office", label: "Office" },
  { id: "home", label: "Home" },
  { id: "both", label: "Both" },
];

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
  const [today, setToday] = useState<string | null>(null);

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
        ? { meals: selection.meals, schedule: selection.schedule, length: selection.length }
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
  const showStart = type === "plan";
  const nameRequired = type !== "serviceability";
  const localityRequired = type !== "contact";

  useEffect(() => {
    if (!showStart) return;
    setToday(indiaTodayIso());
  }, [showStart]);

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4">
      <div className="absolute left-0 top-0 h-px w-px overflow-hidden" aria-hidden="true">
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
        <Note tone="soft" className="px-4 py-3">
          <p className="font-semibold">{picked.planName}</p>
          <p className="mt-1 text-muted">
            {picked.lines.map((line) => line.label).join(", ")} ·{" "}
            {formatSelection(picked)} · {dietLabel(selection?.diet ?? "")}
          </p>
          <p className="mt-2 font-semibold">Estimated total {formatInr(picked.total)}</p>
          {pricing.status === "draft" ? (
            <p className="mt-1 text-muted">{pricing.note}</p>
          ) : null}
        </Note>
      ) : null}
      {errors.plan && !showPlan ? (
        <p className="text-sm text-error">{errors.plan}</p>
      ) : null}

      <Field
        id={`${formId}-name`}
        label="Name"
        required={nameRequired}
        error={errors.name}
      >
        <TextInput
          id={`${formId}-name`}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${formId}-name-error` : undefined}
        />
      </Field>

      <Field
        id={`${formId}-phone`}
        label="Phone"
        required
        error={errors.phone}
      >
        <TextInput
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="98XXXX XXXX"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          invalid={Boolean(errors.phone)}
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
            className={controlClass(Boolean(errors.plan))}
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
            className={controlClass(false)}
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
            ? "For example, Hinjewadi, Wakad or Baner."
            : undefined
        }
      >
        <TextInput
          id={`${formId}-locality`}
          name="locality"
          autoComplete="address-level2"
          value={values.locality}
          onChange={(event) => update("locality", event.target.value)}
          invalid={Boolean(errors.locality)}
          aria-describedby={errors.locality ? `${formId}-locality-error` : undefined}
        />
      </Field>

      {showStart ? (
        <fieldset>
          <legend className={fieldLabel}>
            Where it goes
            <span className="text-error"> *</span>
          </legend>
          <p className={fieldHint}>Office days, home, or both.</p>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="radiogroup"
            aria-invalid={Boolean(errors.handover)}
          >
            {handoverChoices.map((choice) => {
              const selected = values.handover === choice.id;
              return (
                <Choice
                  key={choice.id}
                  selected={selected}
                  role="radio"
                  aria-checked={selected}
                  onClick={() => update("handover", choice.id)}
                >
                  {choice.label}
                </Choice>
              );
            })}
          </div>
          {errors.handover ? (
            <p id={`${formId}-handover-error`} className={fieldError}>
              {errors.handover}
            </p>
          ) : null}
        </fieldset>
      ) : null}

      {showStart && values.handover ? (
        <Field
          id={`${formId}-address`}
          label={values.handover === "home" ? "Home address" : "Office address"}
          required
          error={errors.address}
          hint={
            values.handover === "home"
              ? "Building and flat."
              : "Building and gate, or the tech park."
          }
        >
          <TextInput
            id={`${formId}-address`}
            name="address"
            autoComplete="street-address"
            value={values.address}
            onChange={(event) => update("address", event.target.value)}
            invalid={Boolean(errors.address)}
            aria-describedby={errors.address ? `${formId}-address-error` : undefined}
          />
        </Field>
      ) : null}

      {showStart && values.handover === "both" ? (
        <Field
          id={`${formId}-home`}
          label="Home address"
          required
          error={errors.homeAddress}
          hint="For work-from-home days."
        >
          <TextInput
            id={`${formId}-home`}
            name="homeAddress"
            autoComplete="street-address"
            value={values.homeAddress}
            onChange={(event) => update("homeAddress", event.target.value)}
            invalid={Boolean(errors.homeAddress)}
            aria-describedby={errors.homeAddress ? `${formId}-home-error` : undefined}
          />
        </Field>
      ) : null}

      {showStart ? (
        <Field
          id={`${formId}-start`}
          label="Start date"
          required
          error={errors.startDate}
          hint="The day you want the first tiffin. We confirm it before we start."
        >
          <TextInput
            id={`${formId}-start`}
            name="startDate"
            type="date"
            min={today ?? undefined}
            max={today ? addIsoDays(today, 180) : undefined}
            value={values.startDate}
            onChange={(event) => update("startDate", event.target.value)}
            invalid={Boolean(errors.startDate)}
            aria-describedby={errors.startDate ? `${formId}-start-error` : undefined}
          />
        </Field>
      ) : null}

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
            className={controlClass(Boolean(errors.message))}
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
          <Note tone="soft" className="p-4">
            <p>
              {state.reason === "failed"
                ? "We could not send that just now. You can still message us with the same details."
                : "Your details are ready. Send them on WhatsApp or by email and we will reply. Nothing goes out until you tap."}
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
          </Note>
        ) : null}
        {state.status === "error" ? (
          <p className="text-error">
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

