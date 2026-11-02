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
import { Choice } from "@/components/ui/Field";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Caption, Eyebrow, Heading, Price, Text } from "@/components/ui/Type";

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
  const [shared, setShared] = useState<ScheduleId>("weekdays");
  const [lunchDays, setLunchDays] = useState<ScheduleId>("weekdays");
  const [dinnerDays, setDinnerDays] = useState<ScheduleId>("weekdays");
  const [length, setLength] = useState<LengthId>("four-weeks");
  const [diet, setDiet] = useState<DietChoice>("either");

  if (seenUrl !== fromUrl) {
    setSeenUrl(fromUrl);
    setMeals(defaultMealsForPlan(requested));
  }

  const splitDays = meals.includes("lunch") && meals.includes("dinner");
  const mealSchedules = Object.fromEntries(
    meals.map((meal) => [meal, scheduleFor(meal, meals, shared, lunchDays, dinnerDays)]),
  ) as Partial<Record<MealSlot, ScheduleId>>;
  const estimate = quote({ meals, schedules: mealSchedules, length, diet });

  function toggleMeal(meal: MealSlot) {
    const next = meals.includes(meal)
      ? meals.length === 1
        ? meals
        : meals.filter((item) => item !== meal)
      : mealChoices.map((choice) => choice.id).filter((id) => id === meal || meals.includes(id));
    const wasSplit = meals.includes("lunch") && meals.includes("dinner");
    const nowSplit = next.includes("lunch") && next.includes("dinner");
    if (!wasSplit && nowSplit) {
      setLunchDays(shared);
      setDinnerDays(shared);
    }
    if (wasSplit && !nowSplit) {
      setShared(next.includes("dinner") && !next.includes("lunch") ? dinnerDays : lunchDays);
    }
    setMeals(next);
  }

  return (
    <>
      <Section id="build">
        <Container>
          <SectionHeading eyebrow="Your plan" title="Build a plan around your week.">
            Monday to Friday is the office week. Add Saturday if you want it.
            Lunch and dinner can use different days. Three days is 3 of each
            meal you pick, at the same price per meal. Nothing is charged on
            this page.
          </SectionHeading>
          <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <fieldset>
                <Eyebrow as="legend">Meals</Eyebrow>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {mealChoices.map((choice) => {
                    const selected = meals.includes(choice.id);
                    const rate = mealRate(choice.id, diet);
                    const split =
                      choice.id !== "breakfast" && diet !== "non-veg"
                        ? nonVegPerMeal[choice.id]
                        : null;
                    return (
                      <Choice
                        key={choice.id}
                        shape="card"
                        selected={selected}
                        aria-pressed={selected}
                        onClick={() => toggleMeal(choice.id)}
                      >
                        <span className="block font-semibold text-olive">{choice.label}</span>
                        <Price className="mt-3 block">{formatInr(rate)}</Price>
                        <Caption className="mt-1 block">
                          {split ? `veg · non-veg ${formatInr(split)}` : "per meal"}
                        </Caption>
                      </Choice>
                    );
                  })}
                </div>
              </fieldset>

              {splitDays ? (
                <>
                  <DayChoices label="Lunch days" value={lunchDays} onChange={setLunchDays} />
                  <DayChoices label="Dinner days" value={dinnerDays} onChange={setDinnerDays} />
                </>
              ) : (
                <DayChoices label="Days" value={shared} onChange={setShared} />
              )}

              <fieldset>
                <Eyebrow as="legend">Length</Eyebrow>
                <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Length">
                  {lengths.map((option) => {
                    const selected = length === option.id;
                    return (
                      <Choice
                        key={option.id}
                        shape="tile"
                        selected={selected}
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setLength(option.id)}
                      >
                        {option.label}
                      </Choice>
                    );
                  })}
                </div>
                {estimate ? (
                  <p className="mt-3 text-sm text-muted">{resultLine(estimate)}</p>
                ) : null}
              </fieldset>

              <fieldset>
                <Eyebrow as="legend">Dietary preference</Eyebrow>
                <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-label="Dietary preference">
                  {dietChoices.map((option) => {
                    const selected = diet === option.id;
                    return (
                      <Choice
                        key={option.id}
                        shape="tile"
                        selected={selected}
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setDiet(option.id)}
                      >
                        {option.label}
                      </Choice>
                    );
                  })}
                </div>
              </fieldset>
            </div>

            {estimate ? (
              <aside className="rounded-card bg-olive p-6 text-cream lg:sticky lg:top-24">
                <Eyebrow tone="sunflower">Estimate</Eyebrow>
                <Heading as="h3" size="stat" tone="inverse" className="mt-3">
                  {estimate.planName}
                </Heading>
                <dl className="mt-6 space-y-3 text-sm">
                  <Row label="Meals a day" value={String(estimate.lines.length)} />
                  {estimate.samePattern ? (
                    <Row label="Days" value={estimate.scheduleLabel} />
                  ) : (
                    estimate.lines.map((line) => (
                      <Row key={`${line.meal}-days`} label={`${line.label} days`} value={line.scheduleLabel} />
                    ))
                  )}
                  <Row
                    label="Duration"
                    value={
                      estimate.days === null
                        ? estimate.lengthLabel
                        : `${estimate.lengthLabel} · ${estimate.days} days`
                    }
                  />
                  {estimate.lines.map((line) => (
                    <Row
                      key={line.meal}
                      label={line.label}
                      value={`${formatInr(line.perMeal)} / meal · ${line.days}`}
                    />
                  ))}
                  {estimate.perDay !== null ? (
                    <Row label="Per day" value={formatInr(estimate.perDay)} />
                  ) : null}
                </dl>
                <p className="mt-6 border-t border-cream/15 pt-5" aria-live="polite">
                  <Caption tone="inverse" className="block">
                    Estimated total
                  </Caption>
                  <Price size="lg" tone="cream" className="mt-1 block">
                    {formatInr(estimate.total)}
                  </Price>
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
          <Heading>Your details.</Heading>
          <Text className="mt-3">
            Name, phone, locality, where the tiffin goes, and the day you want
            to start. We confirm the price and the handover spot. Nothing is
            charged on this page.
          </Text>
          <div className="mt-8">
            <EnquiryForm
              type="plan"
              submitLabel="Start your plan"
              selection={{ meals, schedules: mealSchedules, length, diet }}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}

function DayChoices({
  label,
  value,
  onChange,
}: {
  label: string;
  value: ScheduleId;
  onChange: (id: ScheduleId) => void;
}) {
  return (
    <fieldset>
      <Eyebrow as="legend">{label}</Eyebrow>
      <div className="mt-3 grid grid-cols-2 gap-2" role="radiogroup" aria-label={label}>
        {schedules.map((option) => {
          const selected = value === option.id;
          return (
            <Choice
              key={option.id}
              shape="tile"
              selected={selected}
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.id)}
            >
              {option.label}
            </Choice>
          );
        })}
      </div>
    </fieldset>
  );
}

function scheduleFor(
  meal: MealSlot,
  meals: MealSlot[],
  shared: ScheduleId,
  lunchDays: ScheduleId,
  dinnerDays: ScheduleId,
): ScheduleId {
  const split = meals.includes("lunch") && meals.includes("dinner");
  if (!split) return shared;
  if (meal === "dinner") return dinnerDays;
  return lunchDays;
}

function resultLine(estimate: Quote) {
  if (!estimate.samePattern || estimate.days === null || estimate.perDay === null) {
    return estimate.lines.map((line) => `${line.label} ${line.scheduleLabel}, ${line.days}`).join(" · ");
  }
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
