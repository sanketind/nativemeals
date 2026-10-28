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
    "Answers about Native Meals: where we serve in Pune, vegetarian and non-vegetarian meals, plans, delivery and pricing.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHeader eyebrow="FAQs" title="The useful questions.">
        If a detail is still being decided, the answer says that plainly.
      </PageHeader>
      <Section>
        <Container className="max-w-3xl">
          <FAQAccordion items={faqs} />
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
