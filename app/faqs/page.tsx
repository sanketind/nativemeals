import type { Metadata } from "next";
import { faqs } from "@/data/faqs";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Native Meals FAQs for Hinjewadi and nearby Pune: areas and tech parks, what is in the box, Monday to Friday plans, skipping a day, and pricing.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader eyebrow="FAQs" title="The useful questions.">
        Areas, the meals, Monday to Friday, and how to skip a day.
      </PageHeader>
      <Section>
        <Container>
          <FAQAccordion items={faqs} />
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
