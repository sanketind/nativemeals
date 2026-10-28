"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { pricing, type DurationId } from "@/data/plans";
import { formatInr } from "@/lib/format";
import {
  defaultMealsForPlan,
  formatDuration,
  quote,
  type MealSlot,
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
  const [duration, setDuration] = useState<DurationId>("monthly");
  const [diet, setDiet] = useState<DietChoice>("either");

  if (seenUrl !== fromUrl) {
    setSeenUrl(fromUrl);
    setMeals(defaultMealsForPlan(requested));
  }

  const estimate = quote({ meals, duration });

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
          <SectionHeading eyebrow="Your plan" title="Build a plan around your day.">
            Pick the meals and how long you want them. The longer you stay, the
            less each meal costs.
          </SectionHeading>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <fieldset>
                <legend className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                  Meals
                </legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {mealChoices.map((choice) => {
                    const selected = meals.includes(choice.id);
                    const rate = estimate
                      ? pricing.perMeal[choice.id][estimate.durationId]
                      : pricing.perMeal[choice.id].monthly;
                    return (
                      <button
                        key={choice.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => toggleMeal(choice.id)}
                        className={cn(
                          "rounded-2xl border px-4 py-4 text-left transition-colors",
                          selected
                            ? "border-olive bg-white"
                            : "border-charcoal/10 bg-white/60 hover:border-olive/40",
                        )}
                      >
                        <span className="block font-medium text-charcoal">{choice.label}</span>
                        <span className="mt-3 block font-serif text-2xl text-charcoal">
                          {formatInr(rate)}
                        </span>
                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-charcoal/50">
                          per meal
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                  Duration
                </legend>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup">
                  {pricing.durations.map((option) => {
                    const selected = duration === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setDuration(option.id)}
                        className={cn(
                          "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                          selected
                            ? "bg-olive text-white"
                            : "bg-white text-charcoal ring-1 ring-charcoal/10 hover:ring-olive/30",
                        )}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                  Dietary preference
                </legend>
                <p className="mt-2 text-sm text-charcoal/60">
                  Veg and non-veg are the same price. Tell us which you want.
                </p>
                <div className="mt-3 flex flex-wrap gap-2" role="radiogroup">
                  {dietChoices.map((option) => {
                    const selected = diet === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setDiet(option.id)}
                        className={cn(
                          "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          selected
                            ? "bg-olive text-white"
                            : "bg-white text-charcoal ring-1 ring-charcoal/10 hover:ring-olive/30",
                        )}
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
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-terracotta">
                  Estimate
                </p>
                <h3 className="mt-3 font-serif text-3xl">{estimate.planName}</h3>
                <dl className="mt-6 space-y-3 text-sm">
                  <Row label="Meals a day" value={String(estimate.lines.length)} />
                  <Row
                    label="Duration"
                    value={formatDuration(estimate.durationLabel, estimate.days)}
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
                  <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-cream/60">
                    Estimated total
                  </span>
                  <span className="mt-1 block font-serif text-4xl">
                    {formatInr(estimate.total)}
                  </span>
                </p>
                {pricing.status === "draft" ? (
                  <p className="mt-3 text-sm text-cream/75">{pricing.note}</p>
                ) : null}
                <p className="mt-2 text-sm text-cream/75">
                  Delivery charges, if any, confirmed before you start.
                </p>
                <Button
                  variant="inverse"
                  className="mt-6 w-full"
                  onClick={() => {
                    document.getElementById("enquire")?.scrollIntoView();
                  }}
                >
                  Continue with these details
                </Button>
              </aside>
            ) : null}
          </div>
        </Container>
      </Section>

      <Section id="enquire" tone="white">
        <Container className="max-w-xl">
          <h2 className="font-serif text-4xl text-charcoal">Your details.</h2>
          <p className="mt-3 leading-relaxed text-charcoal/75">
            Name, phone and locality are enough for us to reply. We confirm the
            price, the address and the start date before anything begins.
            Nothing is charged on this page.
          </p>
          <div className="mt-8">
            <EnquiryForm
              type="plan"
              submitLabel="Send enquiry"
              selection={{ meals, duration, diet }}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-cream/70">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
