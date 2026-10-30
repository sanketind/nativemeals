"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  lengths,
  nonVegPerMeal,
  schedules,
  type LengthId,
  type ScheduleId,
} from "@/data/plans";
import { formatInr } from "@/lib/format";
import {
  defaultMealsForPlan,
  mealRate,
  quote,
  type MealSlot,
  type Quote,
} from "@/lib/pricing";
import type { DietChoice } from "@/lib/validation";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";

const mealChoices: { id: MealSlot; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
];

const dietChoices: { id: DietChoice; label: string }[] = [
  { id: "veg", label: "Veg" },
  { id: "non-veg", label: "Non-veg" },
  { id: "either", label: "Either" },
];

export function PlanExperience() {
  const params = useSearchParams();
  const requested = params.get("plan") ?? "";
  const fromUrl = defaultMealsForPlan(requested).join(",");
  const [seenUrl, setSeenUrl] = useState(fromUrl);
  const [meals, setMeals] = useState<MealSlot[]>(() => defaultMealsForPlan(requested));
  const [schedule, setSchedule] = useState<ScheduleId>("weekdays");
  const [length, setLength] = useState<LengthId>("four-weeks");
  const [diet, setDiet] = useState<DietChoice>("either");

  if (seenUrl !== fromUrl) {
    setSeenUrl(fromUrl);
    setMeals(defaultMealsForPlan(requested));
  }

  const estimate = quote({ meals, schedule, length, diet });

  function toggleMeal(meal: MealSlot) {
    setMeals((current) => {
      if (current.includes(meal)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== meal);
      }
      return mealChoices.map((choice) => choice.id).filter(
        (id) => id === meal || current.includes(id),
      );
    });
  }

  return (
    <>
      <Section id="build">
        <Container>
          <SectionHeading eyebrow="Your plan" title="Build a plan around your week.">
            Monday to Friday is the office week. Add Saturday if you want it.
            Three days is the short try. Two weeks and four weeks follow the
            days you picked. The price per meal stays the same.
          </SectionHeading>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <fieldset>
                <legend className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
                  Meals
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {mealChoices.map((choice) => {
                    const selected = meals.includes(choice.id);
                    const rate = mealRate(choice.id, diet);
                    const split =
                      choice.id !== "breakfast" && diet !== "non-veg"
                        ? nonVegPerMeal[choice.id]
                        : null;
                    return (
                      <button
                        key={choice.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleMeal(choice.id)}
                        className={cn(
                          "rounded-2xl bg-white px-4 py-4 text-left ring-1 transition-colors",
                          selected
                            ? "ring-olive"
                            : "ring-charcoal/10 hover:ring-olive/40",
                        )}
                      >
                        <span className="block font-semibold text-olive">{choice.label}</span>
                        <span className="mt-3 block font-sans text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-none tracking-[-0.03em] text-olive">
                          {formatInr(rate)}
                        </span>
                        <span className="mt-1 block font-sans text-[0.72rem] font-bold uppercase tracking-[0.12em] text-muted">
                          {split ? `veg · non-veg ${formatInr(split)}` : "per meal"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
                  Days
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label="Days">
                  {schedules.map((option) => {
                    const selected = schedule === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setSchedule(option.id)}
                        className={choiceClass(selected)}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
                  Length
                </legend>
                <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Length">
                  {lengths.map((option) => {
                    const selected = length === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setLength(option.id)}
                        className={choiceClass(selected)}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
                {estimate ? (
                  <p className="mt-3 text-sm text-muted">{resultLine(estimate)}</p>
                ) : null}
              </fieldset>

              <fieldset>
                <legend className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
                  Dietary preference
                </legend>
                <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Dietary preference">
                  {dietChoices.map((option) => {
                    const selected = diet === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setDiet(option.id)}
                        className={choiceClass(selected)}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            {estimate ? (
              <aside className="rounded-3xl bg-olive p-6 text-cream lg:sticky lg:top-24">
                <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta">
                  Estimate
                </p>
                <h3 className="mt-3 font-sans text-[1.28rem] font-bold leading-[1.3] tracking-[-0.02em] text-cream">{estimate.planName}</h3>
                <dl className="mt-6 space-y-3 text-sm">
                  <Row label="Meals a day" value={String(estimate.lines.length)} />
                  <Row label="Days" value={estimate.scheduleLabel} />
                  <Row
                    label="Duration"
                    value={`${estimate.lengthLabel} · ${estimate.days} days`}
                  />
                  {estimate.lines.map((line) => (
                    <Row
                      key={line.meal}
                      label={line.label}
                      value={`${formatInr(line.perMeal)} / meal`}
                    />
                  ))}
                  <Row label="Per day" value={formatInr(estimate.perDay)} />
                </dl>
                <p className="mt-6 border-t border-cream/15 pt-5" aria-live="polite">
                  <span className="block font-sans text-[0.72rem] font-bold uppercase tracking-[0.12em] text-cream/70">
                    Estimated total
                  </span>
                  <span className="mt-1 block font-sans text-[clamp(1.75rem,3vw,2.55rem)] font-bold leading-none tracking-[-0.03em]">
                    {formatInr(estimate.total)}
                  </span>
                </p>
                {estimate.dietNote ? (
                  <p className="mt-3 text-sm text-cream/75">{estimate.dietNote}</p>
                ) : null}
                <p className="mt-3 text-sm text-cream/75">
                  Any delivery charge is confirmed before you start.
                </p>
                <Button
                  variant="inverse"
                  className="mt-6 w-full"
                  onClick={() => {
                    document.getElementById("enquire")?.scrollIntoView();
                  }}
                >
                  Start your plan
                </Button>
              </aside>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section id="enquire" tone="white">
        <Container className="max-w-xl">
          <h2 className="font-sans text-[clamp(1.95rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.035em] text-olive">Your details.</h2>
          <p className="mt-3 text-[1.06rem] font-normal leading-[1.7] text-muted">
            Name, phone, locality, where the tiffin goes, and the day you want
            to start. We confirm the price and the handover spot. Nothing is
            charged on this page.
          </p>
          <div className="mt-8">
            <EnquiryForm
              type="plan"
              submitLabel="Start your plan"
              selection={{ meals, schedule, length, diet }}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

function choiceClass(selected: boolean) {
  return cn(
    "rounded-2xl px-3 py-3.5 text-center text-sm font-semibold whitespace-nowrap transition-colors",
    selected
      ? "bg-olive text-cream"
      : "bg-white text-olive ring-1 ring-charcoal/10 hover:ring-olive/40",
  );
}

function resultLine(estimate: Quote) {
  const span = `${estimate.lengthLabel}, ${estimate.scheduleSpoken}`;
  if (estimate.lines.length === 1) {
    const line = estimate.lines[0];
    return `${span} · ${estimate.days} ${mealNoun(line.meal, estimate.days)} · ${formatInr(line.perMeal)} each`;
  }
  if (estimate.lengthLabel === `${estimate.days} days`) {
    return `${span} · ${formatInr(estimate.perDay)} a day`;
  }
  return `${span} · ${estimate.days} days · ${formatInr(estimate.perDay)} a day`;
}

function mealNoun(meal: MealSlot, count: number) {
  if (count === 1) return meal;
  if (meal === "lunch") return "lunches";
  if (meal === "dinner") return "dinners";
  return "breakfasts";
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-cream/70">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
