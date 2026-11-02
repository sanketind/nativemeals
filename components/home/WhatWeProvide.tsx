import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Heading, Text } from "@/components/ui/Type";

const points = [
  {
    title: "Healthy ingredients",
    body: "No potatoes and no maida. No preservatives. Rotis are millet or multigrain flour.",
  },
  {
    title: "A menu that changes",
    body: "The kitchen posts the week. You choose veg or non-veg. There is no custom plate.",
  },
  {
    title: "Office days and home days",
    body: "The gate when you go in. Your door when you work from home. You can keep both.",
  },
  {
    title: "Cooked fresh",
    body: "Breakfast, lunch and dinner are cooked fresh, each for its own meal.",
  },
];

export function WhatWeProvide() {
  return (
    <Section tone="sage">
      <Container>
        <SectionHeading eyebrow="What we provide" title="Before the first tiffin.">
          What is in the food, what the week looks like, where it goes, and
          that it is cooked fresh.
        </SectionHeading>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12">
          {points.map((point) => (
            <Card key={point.title} as="li" className="h-full">
              <Heading as="h3" size="card">
                {point.title}
              </Heading>
              <Text size="body" className="mt-2">
                {point.body}
              </Text>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
