import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList } from "@/components/ui/StepList";

const steps = [
  {
    number: "01",
    title: "Pick the meals",
    body: "Lunch, dinner, or the full day.",
  },
  {
    number: "02",
    title: "Tell us where it goes",
    body: "The office gate on days you go in, and your door on days you are home, in an eco-friendly box.",
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
        <SectionHeading split tone="inverse" eyebrow="How it works" title="Your meals, made simple.">
          Three steps from choosing your meals to the first tiffin.
        </SectionHeading>
        <StepList steps={steps} className="mt-12 md:mt-16 md:grid-cols-3" />
      </Container>
    </Section>
  );
}
