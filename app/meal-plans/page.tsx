import type { Metadata } from "next";
import { Suspense } from "react";
import { faqsFor } from "@/data/faqs";
import { lowestPlanPrice, plans, pricing } from "@/data/plans";
import { whatsappHref } from "@/lib/contact";
import { formatInr } from "@/lib/format";
import { PlanExperience } from "@/components/plans/PlanExperience";
import { MealPlanCard } from "@/components/plans/MealPlanCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FAQSplit } from "@/components/ui/FAQSplit";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Meal Plans",
  description:
    "Build a Native Meals plan for breakfast, lunch and dinner in Pune. Per-meal prices fall the longer you stay, and we confirm the total before you start.",
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
    body: "Breakfast, lunch, dinner, or a mix. Three days, a week, two weeks, or a month.",
  },
  {
    number: "02",
    title: "Share your details",
    body: "Your name, phone, locality and whether you want vegetarian or non-vegetarian food.",
  },
  {
    number: "03",
    title: "We confirm the start",
    body: "Address, schedule and start date are agreed with you before the first meal.",
  },
  {
    number: "04",
    title: "Meals arrive",
    body: "You follow the ordering and delivery or collection arrangement we confirmed.",
  },
];

const fromPrice = lowestPlanPrice();
const talkHref =
  whatsappHref("Hello Native Meals, I have a question about meal plans.") ?? "/contact";

export default function MealPlansPage() {
  return (
    <>
      <header className="border-b border-charcoal/5 bg-white">
        <Container className="py-14 md:py-20">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta-ink">
            Meal plans
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.08] tracking-tight text-charcoal md:text-6xl">
            A routine that fits the day you actually have.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-charcoal/75">
            Pick the meals and how long you want them. We confirm the price,
            the address and the start date before anything begins.
          </p>
          <div className="mt-8">
            <ButtonLink href="#build">Build your plan</ButtonLink>
          </div>
          <ul className="mt-10 grid gap-4 border-t border-charcoal/10 pt-6 sm:grid-cols-3">
            <li>
              <p className="font-serif text-2xl text-charcoal">
                {fromPrice !== null ? `From ${formatInr(fromPrice)}` : "Pricing on enquiry"}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-charcoal/50">
                per meal, monthly
              </p>
            </li>
            <li>
              <p className="font-serif text-2xl text-charcoal">3 days to monthly</p>
              <p className="mt-1 text-sm text-charcoal/60">Longer plans cost less per meal</p>
            </li>
            <li>
              <p className="font-serif text-2xl text-charcoal">Veg and non-veg</p>
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
          <h2 className="font-serif text-4xl text-charcoal">Or start from a plan.</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-charcoal/75">
            Lunch and dinner are priced per meal. Everyday is the per-day cost of
            breakfast, lunch and dinner together. You can change the mix in the builder.
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

      <section className="bg-olive py-16 text-cream md:py-24">
        <Container>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta">
            How it works
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
            From a choice to a meal at the door.
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <li key={step.number} className="rounded-3xl bg-white p-6 text-charcoal">
                <p className="font-mono text-sm tracking-[0.16em] text-terracotta-ink">
                  {step.number}
                </p>
                <h3 className="mt-8 font-serif text-2xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-charcoal/75">{step.body}</p>
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
            <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal">
              Your address, schedule and start date are confirmed with you.
            </h2>
          </div>
          <ul className="space-y-4 text-charcoal/80">
            <li className="rounded-2xl bg-cream px-5 py-4">
              We confirm whether we serve your locality before anything starts.
            </li>
            <li className="rounded-2xl bg-cream px-5 py-4">
              Delivery or collection is agreed with you. Fixed delivery times are not published yet.
            </li>
            <li className="rounded-2xl bg-cream px-5 py-4">
              Pause and change terms are still being finalised. We explain them before you commit.
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
            intro="The practical answers. If a policy is still being decided, it says so."
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
        title="Build a meal plan that fits your routine."
        body="Choose the meals and the length, then send your details. We reply with what we can confirm."
        primaryHref="#build"
        primaryLabel="Build your plan"
      />
    </>
  );
}
