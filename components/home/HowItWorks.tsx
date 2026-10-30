import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, StepIndex, Text } from "@/components/ui/Type";

const steps = [
  {
    number: "01",
    title: "Pick the meals",
    body: "Lunch, dinner, or the full day.",
  },
  {
    number: "02",
    title: "Tell us where it goes",
    body: "Veg or non-veg, at the office gate or your door.",
  },
  {
    number: "03",
    title: "Start your plan",
    body: "We confirm the price and the handover spot.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="olive" className="text-cream">
      <Container>
        <Eyebrow tone="sunflower">How it works</Eyebrow>
        <Heading size="title" tone="inverse" className="mt-3 max-w-2xl">
          Your meals, made simple.
        </Heading>
        <ol className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          {steps.map((step) => (
            <Card key={step.number} as="li" bordered={false} className="text-charcoal">
              <StepIndex>{step.number}</StepIndex>
              <Heading as="h3" size="card" className="mt-4">
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
  );
}
