import { Suspense } from "react";
import { faqsFor } from "@/data/faqs";
import { siteConfig } from "@/data/site-config";
import { pageMeta } from "@/lib/page-meta";
import { faqPage, mealPlanOffers } from "@/lib/structured-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { nonVegPerMeal, plans, pricing } from "@/data/plans";
import { whatsappHref } from "@/lib/contact";
import { formatInr } from "@/lib/format";
import { PlanExperience } from "@/components/plans/PlanExperience";
import { MealPlanCard } from "@/components/plans/MealPlanCard";
import { FinalCTA } from "@/components/home/FinalCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { FAQSplit } from "@/components/ui/FAQSplit";
import { FoodImage } from "@/components/ui/FoodImage";
import { PhotoBadge, PhotoFrame } from "@/components/ui/Photo";
import { Section } from "@/components/ui/Section";
import { Caption, Eyebrow, Heading, PriceMark, StepIndex, Text } from "@/components/ui/Type";
import { surface } from "@/components/ui/styles";
import { cn } from "@/lib/cn";

const vegLunch = pricing.perMeal.lunch;
const nonVegLunch = nonVegPerMeal.lunch;
const breakfast = pricing.perMeal.breakfast;

export const metadata = pageMeta(
  "Monday to Friday Meal Plans",
  `Monday to Friday lunch and dinner in ${siteConfig.serviceAreaShort}, Pune. Veg lunch is ${formatInr(vegLunch)}, breakfast is ${formatInr(breakfast)}. The handover is confirmed before the first meal.`,
);

const flow = [
  { number: "01", label: "Your plan" },
  { number: "02", label: "Your details" },
  { number: "03", label: "We confirm" },
];

const steps = [
  {
    number: "01",
    title: "Choose meals and duration",
    body: "Lunch, dinner, breakfast, or a mix. Three days, two weeks, or four weeks.",
  },
  {
    number: "02",
    title: "Share your details",
    body: "Your name, phone, locality, office or home, and the day you want to start.",
  },
  {
    number: "03",
    title: "We confirm the start",
    body: "The handover spot and the window are agreed before the first tiffin, including the day you chose.",
  },
  {
    number: "04",
    title: "Meals arrive",
    body: `The tiffin shows up at the office gate or your door. ${siteConfig.delivery.skipNote}`,
  },
];

const talkHref =
  whatsappHref("Hi Native Meals, I have a question about a Monday to Friday plan.") ??
  "/contact";

export default function MealPlansPage() {
  return (
    <>
      <JsonLd data={[faqPage(faqsFor("plans")), mealPlanOffers()]} />
      <header className={cn("overflow-hidden", surface.pageGlow)}>
        <Container className="grid items-center gap-8 py-10 md:grid-cols-2 md:gap-16 md:py-24">
          <div>
          <Eyebrow>Meal plans</Eyebrow>
          <Heading as="h1" size="display" className="mt-3 max-w-3xl">
            Monday to Friday, at the office gate.
          </Heading>
          <Text size="lede" className="mt-5 max-w-2xl">
            Lunch is {formatInr(vegLunch)} veg or {formatInr(nonVegLunch)}{" "}
            non-veg. Breakfast is {formatInr(breakfast)}. We confirm the
            handover spot and the start date before anything begins.
          </Text>
          <div className="mt-8">
            <ButtonLink href="#build">Start your plan</ButtonLink>
          </div>
          <ul className="mt-10 grid gap-4 border-t border-charcoal/10 pt-6">
            <li>
              <Heading as="p" size="stat">
                {formatInr(vegLunch)} veg lunch
              </Heading>
              <Caption className="mt-1 block">
                non-veg {formatInr(nonVegLunch)}
              </Caption>
            </li>
            <li>
              <Heading as="p" size="stat">3 days to 4 weeks</Heading>
              <p className="mt-1 text-sm text-muted">
                Monday to Friday, or with Saturday
              </p>
            </li>
            <li>
              <Heading as="p" size="stat">
                Breakfast {formatInr(breakfast)}
              </Heading>
              <p className="mt-1 text-sm text-muted">Same for veg and non-veg</p>
            </li>
          </ul>
          <ol className="mt-8 grid gap-3">
            {flow.map((step) => (
              <li key={step.number} className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-olive font-sans text-xs font-bold text-cream">
                  {step.number}
                </span>
                <span className="text-sm font-semibold text-olive">{step.label}</span>
              </li>
            ))}
          </ol>
          </div>
          <div className="relative mx-auto w-full max-w-lg md:max-w-none">
            <PhotoFrame shadow className="aspect-[4/5]">
              <FoodImage
                imageId="planLunch"
                priority
                sizes="(min-width: 768px) 46vw, 100vw"
              />
            </PhotoFrame>
            <PhotoBadge className="left-4 top-4">
              <Caption tone="olive">Lunch from</Caption>
              <PriceMark>{formatInr(vegLunch)}</PriceMark>
            </PhotoBadge>
          </div>
        </Container>
      </header>

      <Suspense fallback={<Section><Container><p className="text-muted">Loading the plan builder…</p></Container></Section>}>
        <PlanExperience />
      </Suspense>

      <Section>
        <Container>
          <Heading>Or start from a plan.</Heading>
          <Text className="mt-3 max-w-2xl">
            Lunch and dinner are priced per meal. The all-day plan is the per-day
            cost of breakfast, lunch and dinner together.
          </Text>
          {pricing.status === "draft" ? (
            <p className="mt-3 text-sm text-muted">{pricing.note}</p>
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

      <Section tone="olive" className="text-cream">
        <Container>
          <Eyebrow tone="sunflower">How it works</Eyebrow>
          <Heading tone="inverse" className="mt-3 max-w-2xl">
            From a choice to a tiffin at the gate.
          </Heading>
          <ol className="mt-8 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-4 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.number} as="li" bordered={false} className="text-charcoal">
                <StepIndex>{step.number}</StepIndex>
                <Heading as="h3" size="card" className="mt-3">
                  {step.title}
                </Heading>
                <Text size="body" className="mt-2">
                  {step.body}
                </Text>
              </Card>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="white">
        <Container className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Before you start</Eyebrow>
            <Heading className="mt-3">
              Your address, schedule and start date are confirmed with you.
            </Heading>
          </div>
          <ul className="space-y-4">
            <Text as="li" className={surface.row}>
              We confirm your locality or tech park before the first tiffin.
            </Text>
            <Text as="li" className={surface.row}>
              Office tiffins go to the gate or the security desk. Home tiffins go to your door.
            </Text>
            <Text as="li" className={surface.row}>
              {siteConfig.delivery.skipNote} You can keep a second address for work-from-home days.
            </Text>
            <Text as="li" className={surface.row}>
              The price you see is an estimate. We confirm it, and any delivery charge, before you start.
            </Text>
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
        title="Start with three days, or stay for four weeks."
        body="Choose the meals and the length, then send your details. We confirm the handover spot before the first tiffin."
        primaryHref="#build"
        primaryLabel="Start your plan"
      />
    </>
  );
}
