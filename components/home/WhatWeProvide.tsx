import { Building2, CalendarCheck, CalendarDays, Flame } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Heading, Text } from "@/components/ui/Type";

const points = [
  {
    icon: CalendarCheck,
    title: "Start with three days",
    body: "Three of each meal you pick, at the same rate per meal as a longer plan. Then stay for two or four weeks.",
  },
  {
    icon: CalendarDays,
    title: "A menu that changes",
    body: "The kitchen posts the week. You choose veg or non-veg. There is no custom plate.",
  },
  {
    icon: Building2,
    title: "Office days and home days",
    body: "The gate when you go in. Your door when you work from home. You can keep both.",
  },
  {
    icon: Flame,
    title: "Cooked fresh",
    body: "Breakfast, lunch and dinner are cooked fresh, each for its own meal.",
  },
];

export function WhatWeProvide() {
  return (
    <Section tone="oat">
      <Container>
        <SectionHeading split eyebrow="What we provide" title="Before the first tiffin.">
          How to start, what the week looks like, where it goes, and that it
          is cooked fresh.
        </SectionHeading>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
          {points.map((point) => (
            <Card key={point.title} as="li" bordered={false} className="h-full md:p-8">
              <span className="grid size-12 place-items-center rounded-full bg-olive text-cream">
                <point.icon aria-hidden="true" className="size-6" />
              </span>
              <Heading as="h3" size="card" className="mt-6">
                {point.title}
              </Heading>
              <Text className="mt-2">{point.body}</Text>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
