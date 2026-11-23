import { siteConfig } from "@/data/site-config";
import { plans } from "@/data/plans";
import { formatInr } from "@/lib/format";
import { pageMeta } from "@/lib/page-meta";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { RuleList } from "@/components/ui/RuleList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Heading, Price, Text } from "@/components/ui/Type";

export const metadata = pageMeta(
  "Everyday food in Pune",
  `Why Native Meals exists for people working in ${siteConfig.serviceAreaShort}: everyday food, balanced and healthy, that you can eat every day.`,
);

const weekBeats = [
  {
    title: "Monday to Friday",
    body: "Saturday can be added. Sunday stays off. The kitchen posts the week; you choose veg or non-veg. There is no plate you build yourself.",
  },
  {
    title: "Gate or door",
    body: "Lunch at the office gate or security desk. Dinner at the PG or the flat. Work from home? The meal goes to your door. Keep both addresses when you need them.",
  },
  {
    title: "Cooked for its slot",
    body: "Breakfast, lunch and dinner are each cooked fresh for their own meal. An allergy or something you avoid is mentioned when you start — the kitchen says whether it can do it.",
  },
] as const;

export default function AboutPage() {
  const kitchenLine = [
    siteConfig.kitchenLocality ? `The kitchen is in ${siteConfig.kitchenLocality}.` : null,
    siteConfig.fssai ? `FSSAI ${siteConfig.fssai}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <PageHeader
        eyebrow="Our story"
        title="Everyday food. Balanced better."
        imageId="riceBowl"
      >
        Native Meals cooks for people in {siteConfig.serviceAreaShort} who
        already have a job, and want balanced, healthy food they can eat
        every day.
      </PageHeader>

      <Section tone="white">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow="Why it exists" title="The day already has a job." />
          <div className="mt-8 max-w-2xl space-y-5">
            <Text>
              People working in {siteConfig.serviceAreaLine} already have a full
              day. Planning the next meal, the shop, and the cooking sit on top
              of that. Native Meals is the part that can just arrive.
            </Text>
            <Text>
              The food is everyday food, balanced and healthy — a full plate of
              protein, carbs, vegetables and dal, with calories and macros on
              this week&apos;s menu, and kitchen rules that hold for every meal.
              You should be able to eat it on Monday and still want it on Friday.
            </Text>
            <Text>
              Native is food you come back to. Meals is breakfast, lunch and
              dinner on a plan, not a one-off order. A plan starts when you send
              your details. We confirm the price, the handover spot, and the
              first day before anything begins. Nothing is charged on this site.
            </Text>
          </div>
          {siteConfig.founderNote ? (
            <Card as="article" tone="oat" bordered={false} className="mt-8">
              <Heading as="h2" size="card">
                {siteConfig.founderNote.heading}
              </Heading>
              <Text size="body" className="mt-2">
                {siteConfig.founderNote.body}
              </Text>
            </Card>
          ) : null}
        </Container>
      </Section>

      <Section tone="oat">
        <Container>
          <SectionHeading split eyebrow="A week on the plan" title="How the week actually runs.">
            One rhythm for the office week — meals that arrive where you are,
            without a plate you build yourself.
          </SectionHeading>
          <ul className="mt-8 grid gap-6 md:mt-12 md:grid-cols-3 md:gap-8">
            {weekBeats.map((beat) => (
              <li key={beat.title} className="border-t-2 border-olive pt-5">
                <Heading as="h3" size="card">
                  {beat.title}
                </Heading>
                <Text size="body" className="mt-3">
                  {beat.body}
                </Text>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading split eyebrow="The kitchen" title="What every meal is held to.">
            These rules sit beside the calories and macros on this week&apos;s
            menu. Together they keep the food balanced and healthy, for every
            dish, veg and non-veg.
          </SectionHeading>
          <RuleList className="mt-10 md:mt-14" />
          <Text className="mt-10 max-w-2xl">
            {kitchenLine ? `${kitchenLine} ` : ""}Meals travel in an eco-friendly box.
          </Text>
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading split eyebrow="Where we cook for" title={`Serving ${siteConfig.launchArea}.`}>
            One rate per meal. Three days, two weeks, or four weeks. A locality
            is confirmed with you before the first meal — the site does not
            check an address by itself.
          </SectionHeading>
          <ul className="mt-8 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-5">
            {plans.map((plan) => (
              <Card key={plan.id} as="li" className="h-full">
                <Heading as="h3" size="card">
                  {plan.name}
                </Heading>
                <Text size="body" className="mt-2">
                  {plan.summary}
                </Text>
                {plan.price != null ? (
                  <p className="mt-4">
                    <Price>{formatInr(plan.price)}</Price>
                    <span className="mt-1 block text-sm text-muted">
                      {plan.priceUnit === "day" ? "per day" : "per meal"}
                      {plan.priceNote ? ` ${plan.priceNote}` : ""}
                    </span>
                  </p>
                ) : null}
              </Card>
            ))}
          </ul>
          <EyebrowList label="Neighbourhoods" items={siteConfig.serviceAreas} />
          <EyebrowList label="Tech parks" items={siteConfig.techParks} quiet />
          <Text size="body" className="mt-6 max-w-2xl">
            {siteConfig.delivery.handover}
          </Text>
        </Container>
      </Section>

      <FinalCTA
        tone="olive"
        title="See if a plan fits your week."
        body="Try one lunch first. Tell us your office, your home, and the day you want to start."
        primaryHref="/meal-plans#enquire"
      />
    </>
  );
}

function EyebrowList({
  label,
  items,
  quiet = false,
}: {
  label: string;
  items: readonly string[];
  quiet?: boolean;
}) {
  return (
    <div className="mt-8">
      <Heading as="h3" size="card">
        {label}
      </Heading>
      <ul className="mt-3 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item}>
            <Chip tone={quiet ? "quiet" : "solid"}>{item}</Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}
