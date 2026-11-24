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
        Everyday food in {siteConfig.serviceAreaShort}: areas, what is in the
        box, Monday to Friday plans, skipping a day, and how the price works.
      </PageHeader>
      <Section>
        <Container>
          <FAQAccordion items={faqs} />
        </Container>
      </Section>
      <FinalCTA
        tone="field"
        title="Ready for a week that arrives."
        body="Try one lunch first. Tell us your office, your home, and the day you want to start."
        primaryHref="/meal-plans#enquire"
      />
    </>
  );
}
