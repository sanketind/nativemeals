import type { Metadata } from "next";
import { Suspense } from "react";
import { faqsFor } from "@/data/faqs";
import { foodAppLunchRange, plans, pricing } from "@/data/plans";
import { whatsappHref } from "@/lib/contact";
import { formatInr } from "@/lib/format";
import { PlanExperience } from "@/components/plans/PlanExperience";
import { MealPlanCard } from "@/components/plans/MealPlanCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FAQSplit } from "@/components/ui/FAQSplit";
import { Section } from "@/components/ui/Section";

const weekdayMonth = pricing.durations.find((item) => item.id === "weekdays-month");
const lunchMonth = pricing.perMeal.lunch["weekdays-month"];
const lunchTrial = pricing.perMeal.lunch.taste;

export const metadata: Metadata = {
  title: "Healthy meal plans in Hinjewadi",
  description: `Monday to Friday healthy meal plans for Hinjewadi, Wakad and nearby Pune. Try one lunch for ${formatInr(lunchTrial)}, or ${formatInr(lunchMonth)} a meal on a weekday month.`,
};

const flow = [
  { number: "01", label: "Your plan" },
  { number: "02", label: "Your details" },
  { number: "03", label: "We confirm" },
];

const steps = [
  {
    number: "01",
    title: "Choose meals and duration",
    body: "Lunch, dinner, breakfast, or a mix. One meal, Monday to Friday, or a full month.",
  },
  {
    number: "02",
    title: "Share your details",
    body: "Your name, phone, locality, and veg or non-veg. Add a second address if office days and home days differ.",
  },
  {
    number: "03",
    title: "We confirm the start",
    body: "The handover spot, the window and the Monday you start are agreed before the first tiffin.",
  },
  {
    number: "04",
    title: "Meals arrive",
    body: "The tiffin shows up at the office gate or your door. Skip a day on WhatsApp when the week changes.",
  },
];

const talkHref =
  whatsappHref("Hi Native Meals, I have a question about a Monday to Friday plan.") ??
  "/contact";

export default function MealPlansPage() {
  return (
    <>
      <header className="border-b border-charcoal/5 bg-white">
        <Container className="py-10 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta-ink">
            Meal plans
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-[1.08] tracking-tight text-charcoal md:text-6xl">
            Monday to Friday, at the office gate.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/75 md:text-lg">
            Try one lunch for {formatInr(lunchTrial)}, or take a weekday month
            at {formatInr(lunchMonth)} a meal. We confirm the price, the
            handover spot and the start date before anything begins.
          </p>
          <div className="mt-8">
            <ButtonLink href="#build">Start Monday</ButtonLink>
          </div>
          <ul className="mt-10 grid gap-4 border-t border-charcoal/10 pt-6 sm:grid-cols-3">
            <li>
              <p className="font-serif text-xl text-charcoal sm:text-2xl">
                {formatInr(lunchMonth)} lunch
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-charcoal/50">
                weekday month
                {weekdayMonth ? ` · ${formatInr(lunchMonth * weekdayMonth.days)}` : ""}
              </p>
            </li>
            <li>
              <p className="font-serif text-xl text-charcoal sm:text-2xl">1 meal to a month</p>
              <p className="mt-1 text-sm text-charcoal/60">
                Mon–Fri, or six days when you want Saturday
              </p>
            </li>
            <li>
              <p className="font-serif text-xl text-charcoal sm:text-2xl">Veg and non-veg</p>
              <p className="mt-1 text-sm text-charcoal/60">Same price either way</p>
            </li>
          </ul>
          <ol className="mt-8 grid gap-3 sm:grid-cols-3">
            {flow.map((step) => (
              <li key={step.number} className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-olive font-mono text-xs text-cream">
                  {step.number}
                </span>
                <span className="text-sm font-medium text-charcoal">{step.label}</span>
              </li>
            ))}
          </ol>
        </Container>
      </header>

      <Suspense fallback={<Section><Container><p className="text-charcoal/60">Loading the plan builder…</p></Container></Section>}>
        <PlanExperience />
      </Suspense>

      <Section>
        <Container>
          <h2 className="font-serif text-3xl text-charcoal md:text-4xl">Or start from a plan.</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/75">
            Lunch and dinner are priced per meal. The all-day plan is the per-day
            cost of breakfast, lunch and dinner together. A food-app lunch around
            Hinjewadi is often {formatInr(foodAppLunchRange.low)}–{formatInr(foodAppLunchRange.high)} before fees.
          </p>
          {pricing.status === "draft" ? (
            <p className="mt-3 text-sm text-charcoal/60">{pricing.note}</p>
          ) : null}
          <ul className="mt-8 grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.id}>
                <MealPlanCard plan={plan} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <section className="bg-olive py-12 text-cream md:py-24">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta">
            How it works
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight md:text-5xl">
            From a choice to a tiffin at the gate.
          </h2>
          <ol className="mt-8 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number} className="rounded-3xl bg-white p-5 text-charcoal md:p-6">
                <p className="font-mono text-sm tracking-[0.16em] text-terracotta-ink">
                  {step.number}
                </p>
                <h3 className="mt-3 font-serif text-lg md:mt-8 md:text-2xl">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Section tone="white">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta-ink">
              Before you start
            </p>
            <h2 className="mt-3 font-serif text-3xl leading-tight text-charcoal md:text-4xl">
              Your address, schedule and start date are confirmed with you.
            </h2>
          </div>
          <ul className="space-y-4 text-charcoal/80">
            <li className="rounded-2xl bg-cream px-5 py-4">
              We confirm your phase, tech park or locality before the first tiffin.
            </li>
            <li className="rounded-2xl bg-cream px-5 py-4">
              Office tiffins go to the gate or the security desk. Home tiffins go to your door.
            </li>
            <li className="rounded-2xl bg-cream px-5 py-4">
              Skip a day on WhatsApp, pause when you travel, and keep a second address for work-from-home days. A skipped meal carries forward.
            </li>
            <li className="rounded-2xl bg-cream px-5 py-4">
              The price you see is an estimate. We confirm it, and any delivery charge, before you start.
            </li>
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <FAQSplit
            title="Plan questions."
            intro="Areas, skipping a day, what is in each meal, and how the price works."
            items={faqsFor("plans")}
            action={
              <ButtonLink href={talkHref} variant="ghost">
                Talk to us
              </ButtonLink>
            }
          />
        </Container>
      </Section>

      <FinalCTA
        tone="olive"
        title="Start with one lunch, or a Monday to Friday month."
        body="Choose the meals and the length, then send your details. We confirm the handover spot before the first tiffin."
        primaryHref="#build"
        primaryLabel="Start Monday"
        whatsappMessage="Hi Native Meals, I want a Monday to Friday lunch plan. My office or locality is "
      />
    </>
  );
}
