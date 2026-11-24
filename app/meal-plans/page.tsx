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
import { Container } from "@/components/ui/Container";
import { FAQSplit } from "@/components/ui/FAQSplit";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList } from "@/components/ui/StepList";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";
import { surface } from "@/components/ui/styles";

const vegLunch = pricing.perMeal.lunch;
const nonVegLunch = nonVegPerMeal.lunch;
const breakfast = pricing.perMeal.breakfast;

export const metadata = pageMeta(
  "Monday to Friday Meal Plans",
  `Monday to Friday lunch and dinner in ${siteConfig.serviceAreaShort}, Pune. Veg lunch is ${formatInr(vegLunch)}, breakfast is ${formatInr(breakfast)}. The handover is confirmed before the first meal.`,
);

const steps = [
  {
    number: "01",
    title: "Pick the meals",
    body: "Lunch, dinner, breakfast, or a mix. Three days to four weeks.",
  },
  {
    number: "02",
    title: "Tell us where it goes",
    body: "Your name, phone, locality, office or home, and the day you want to start.",
  },
  {
    number: "03",
    title: "We confirm, then start",
    body: "Price, handover spot, and first day, agreed before the first tiffin.",
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
      <PageHeader
        eyebrow="Meal plans"
        title="Monday to Friday, at the office gate."
        imageId="planLunch"
        actions={
          <ButtonLink href="#build" variant="accent">
            Start your plan
          </ButtonLink>
        }
        facts={[
          { value: `${formatInr(vegLunch)} veg lunch`, label: `Non-veg ${formatInr(nonVegLunch)}` },
          { value: "3 days to 4 weeks", label: "Monday to Friday, or with Saturday" },
          { value: `Breakfast ${formatInr(breakfast)}`, label: "Same for veg and non-veg" },
        ]}
      >
        Lunch is {formatInr(vegLunch)} veg or {formatInr(nonVegLunch)} non-veg.
        Breakfast is {formatInr(breakfast)}. We confirm the handover spot and
        the start date before anything begins.
      </PageHeader>

      <Section tone="mist">
        <Container>
          <SectionHeading
            eyebrow="Everyday food. Balanced better."
            title="A week of meals that arrive."
          >
            Complete, familiar plates, with kitchen rules and macros on the menu.
            Monday to Friday at the gate or your door. An enquiry starts the
            plan. Nothing is charged on this site.
          </SectionHeading>
        </Container>
      </Section>

      <Suspense fallback={<Section><Container><p className="text-muted">Loading the plan builder…</p></Container></Section>}>
        <PlanExperience />
      </Suspense>

      <Section>
        <Container>
          <SectionHeading eyebrow="Plans" title="Or start from a plan.">
            Lunch and dinner are priced per meal. The all-day plan is the per-day
            cost of breakfast, lunch and dinner together.
          </SectionHeading>
          {pricing.status === "draft" ? (
            <p className="mt-4 text-sm text-muted">{pricing.note}</p>
          ) : null}
          <ul className="mt-8 grid gap-5 md:mt-12 lg:grid-cols-3">
            {plans.map((plan) => (
              <li key={plan.id}>
                <MealPlanCard plan={plan} />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="field" className="text-stone">
        <Container>
          <SectionHeading tone="inverse" eyebrow="How it works" title="From a choice to a tiffin.">
            Same path as the homepage, with one more step when the meals arrive.
          </SectionHeading>
          <StepList steps={steps} className="mt-12 md:mt-16 md:grid-cols-2 lg:grid-cols-4" />
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Before you start</Eyebrow>
            <Heading className="mt-3">
              Your address, schedule and start date are confirmed with you.
            </Heading>
          </div>
          <ul className="mt-8 max-w-2xl space-y-4">
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
        tone="field"
        title="Start with three days, or stay for four weeks."
        body="Choose the meals and the length, then send your details. We confirm the handover spot before the first tiffin."
        primaryHref="#build"
        primaryLabel="Start your plan"
      />
    </>
  );
}
