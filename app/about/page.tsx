import { siteConfig } from "@/data/site-config";
import { plans } from "@/data/plans";
import { formatInr } from "@/lib/format";
import { pageMeta } from "@/lib/page-meta";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Heading, Price, Text } from "@/components/ui/Type";

export const metadata = pageMeta(
  "Everyday food in Pune",
  `Why Native Meals exists for people working in ${siteConfig.serviceAreaShort}: everyday food, balanced and healthy, that you can eat every day.`,
);

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
        imageId="about"
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
              Lunch is for the office, handed over at the gate or the security
              desk. Dinner is for the PG or the flat after work. On a day you
              work from home, the meal goes to your door. You can keep both
              addresses, and use each on the days it fits.
            </Text>
            <Text>
              The food is everyday food, balanced and healthy. You should be able
              to eat it on Monday and still want it on Friday. The balance
              comes from what the kitchen leaves out.
            </Text>
            <Text>
              The kitchen posts the week. You choose veg or non-veg. There is
              no plate you build yourself. An allergy, or something you avoid,
              is mentioned when you start, and the kitchen says whether it can
              do it. Breakfast, lunch and dinner are cooked fresh, each for its
              own meal.
            </Text>
            <Text>
              Native is food you come back to. Meals is breakfast, lunch and
              dinner on a plan, not a one-off order. A plan starts when you
              send your details. We confirm the price, the handover spot, and
              the first day before anything begins. Nothing is charged on this
              site.
            </Text>
          </div>
          {siteConfig.founderNote ? (
            <Card as="article" tone="sage" bordered={false} className="mt-8">
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

      <Section tone="sage">
        <Container>
          <SectionHeading eyebrow="The kitchen" title="What every meal is held to.">
            These rules are how the food stays balanced and healthy. They hold
            for every dish on the menu, veg and non-veg.
          </SectionHeading>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12">
            {siteConfig.kitchenRules.map((rule) => (
              <Card key={rule.title} as="li">
                <Heading as="h3" size="card">
                  {rule.title}
                </Heading>
                <Text size="body" className="mt-2">
                  {rule.body}
                </Text>
              </Card>
            ))}
          </ul>
          {kitchenLine ? (
            <Text size="body" className="mt-6 max-w-2xl">
              {kitchenLine} Meals travel in an eco-friendly box.
            </Text>
          ) : (
            <Text size="body" className="mt-6 max-w-2xl">
              Meals travel in an eco-friendly box.
            </Text>
          )}
        </Container>
      </Section>

      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="The week" title="Monday to Friday, one rate per meal.">
            Saturday can be added. Sunday stays off. Three days is 3 of each
            meal you pick. Two weeks is 10 of that meal on Monday to Friday, or
            12 with Saturday. Four weeks is 20, or 24. The rate per meal is the
            same at every length.
          </SectionHeading>
          <ul className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-5">
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
        </Container>
      </Section>

      <Section tone="cream">
        <Container>
          <SectionHeading eyebrow="Where it goes" title={`Serving ${siteConfig.launchArea}.`}>
            A locality is confirmed with you before the first meal. The site
            does not check an address by itself.
          </SectionHeading>
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
    <div className="mt-6">
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
