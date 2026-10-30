import { siteConfig } from "@/data/site-config";
import { pageMeta } from "@/lib/page-meta";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Type";

export const metadata = pageMeta(
  "Healthy meals in Pune",
  `Why Native Meals exists for people working in ${siteConfig.serviceAreaShort}, and the kitchen rules that hold for every meal.`,
);

const points = [
  {
    title: "Why it exists",
    body: `Planning, shopping and cooking every day is a lot on top of a job. Native Meals handles breakfast, lunch and dinner in ${siteConfig.serviceAreaShort}.`,
  },
  {
    title: "What we cook",
    body: "Vegetarian and non-vegetarian, planned across the week. Lunch and dinner cost more for non-veg. Breakfast is the same either way.",
  },
  {
    title: "Cooked that morning",
    body: "Handed over at your office gate, the security desk, or your door.",
  },
  {
    title: "The name",
    body: "Native is food you can come back to. Meals is breakfast, lunch and dinner, on a plan.",
  },
];

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
        title="Healthy meals, for a working week."
        imageId="about"
      >
        Native Meals cooks for people in {siteConfig.serviceAreaShort} who want
        to eat well without planning every meal.
      </PageHeader>
      <Section tone="white">
        <Container>
          <ul className="grid gap-3 sm:grid-cols-2">
            {points.map((point) => (
              <Card key={point.title} as="li" tone="cream">
                <Heading as="h2" size="card">
                  {point.title}
                </Heading>
                <Text size="body" className="mt-2">
                  {point.body}
                  {point.title === "Cooked that morning" && kitchenLine ? ` ${kitchenLine}` : ""}
                </Text>
              </Card>
            ))}
          </ul>
          {siteConfig.founderNote ? (
            <Card as="article" tone="sage" bordered={false} padded={false} className="mt-4 p-6">
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
      <FinalCTA
        tone="olive"
        title="See if a plan fits your week."
        body="Try one lunch first. Tell us your office, your home, and the day you want to start."
        primaryHref="/meal-plans#enquire"
      />
    </>
  );
}
