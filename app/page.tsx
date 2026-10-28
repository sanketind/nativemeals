import { faqsFor } from "@/data/faqs";
import { getWeeklyMenu } from "@/lib/weekly-menu";
import { AboutPreview } from "@/components/home/AboutPreview";
import { BrandPromiseSection } from "@/components/home/BrandPromiseSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { KitchenCommitments } from "@/components/home/KitchenCommitments";
import { PlansPreview } from "@/components/home/PlansPreview";
import { WhoItIsFor } from "@/components/home/WhoItIsFor";
import { ServiceAreaChecker } from "@/components/home/ServiceAreaChecker";
import { WeeklyMenu } from "@/components/food/WeeklyMenu";
import { Container } from "@/components/ui/Container";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default async function HomePage() {
  const menu = await getWeeklyMenu();

  return (
    <>
      <HeroSection />
      <Section>
        <Container>
          <WeeklyMenu menu={menu} />
        </Container>
      </Section>
      <BrandPromiseSection />
      <WhoItIsFor />
      <PlansPreview />
      <KitchenCommitments />
      <HowItWorks />
      <AboutPreview />
      <ServiceAreaChecker />
      <Section tone="white">
        <Container>
          <SectionHeading eyebrow="FAQs" title="Before you enquire.">
            Straight answers. Where something is not decided yet, we say so.
          </SectionHeading>
          <div className="mt-10">
            <FAQAccordion items={faqsFor("home")} />
          </div>
        </Container>
      </Section>
      <FinalCTA />
    </>
  );
}
