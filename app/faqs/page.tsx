import { faqs } from "@/data/faqs";
import { siteConfig } from "@/data/site-config";
import { pageMeta } from "@/lib/page-meta";
import { faqPage } from "@/lib/structured-data";
import { FinalCTA } from "@/components/home/FinalCTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata = pageMeta(
  "Meal plan questions",
  `Answers for ${siteConfig.serviceAreaShort}, Pune: areas and tech parks, what is in the box, Monday to Friday plans, skipping a day, and pricing.`,
);

export default function FaqsPage() {
  return (
    <>
      <JsonLd data={faqPage(faqs)} />
      <PageHeader eyebrow="FAQs" title="The useful questions." imageId="vegetarian">
        Areas, the meals, Monday to Friday, and how to skip a day.
      </PageHeader>
      <Section>
        <Container>
          <FAQAccordion items={faqs} />
        </Container>
      </Section>
      <FinalCTA tone="olive" />
    </>
  );
}
