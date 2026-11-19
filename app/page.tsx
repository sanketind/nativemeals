import { getWeeklyMenu } from "@/lib/weekly-menu";
import { BrandPromiseSection } from "@/components/home/BrandPromiseSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { WhyNativeMeals } from "@/components/home/WhyNativeMeals";
import { PlansPreview } from "@/components/home/PlansPreview";
import { ServiceAreaChecker } from "@/components/home/ServiceAreaChecker";
import { WeeklyMenu } from "@/components/food/WeeklyMenu";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default async function HomePage() {
  const menu = await getWeeklyMenu();

  return (
    <>
      <HeroSection />
      <BrandPromiseSection />
      <WhyNativeMeals />
      <PlansPreview />
      <Section tone="white">
        <Container>
          <WeeklyMenu menu={menu} />
        </Container>
      </Section>
      <HowItWorks />
      <ServiceAreaChecker />
      <FinalCTA tone="olive" />
    </>
  );
}
