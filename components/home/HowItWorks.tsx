import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StepList } from "@/components/ui/StepList";

const steps = [
  {
    number: "01",
    title: "Pick the meals",
    body: "Lunch, dinner, breakfast, or a mix — three days to four weeks.",
  },
  {
    number: "02",
    title: "Tell us where it goes",
    body: "Office gate on days you go in; your door when you are home.",
  },
  {
    number: "03",
    title: "We confirm, then start",
    body: "Price, handover spot, and first day — agreed before the first tiffin.",
  },
];

export function HowItWorks() {
  return (
    <Section tone="olive" className="text-cream">
      <Container>
        <SectionHeading split tone="inverse" eyebrow="How it works" title="From a choice to a tiffin.">
          An enquiry starts the plan. Nothing is charged on this site.
        </SectionHeading>
        <StepList steps={steps} className="mt-12 md:mt-16 md:grid-cols-3" />
      </Container>
    </Section>
  );
}
