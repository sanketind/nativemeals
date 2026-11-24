import { StartCTA } from "@/components/ui/StartCTA";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Type";

/**
 * Why Native exists. Opens the homepage story before the day-on-Native photos.
 * Keep to the purpose in docs/business.md. No invented claims.
 */
export function WhyItExists() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading eyebrow="Why Native" title="The busy week made the plate incomplete.">
          Traditional everyday meals used to be a full plate. Work leaves little
          time to plan, shop and cook carefully every day. Something drops.
        </SectionHeading>
        <Text className="mt-6 max-w-2xl">
          Native Meals brings that balance back. The same familiar food, prepared
          carefully: tasty, familiar, healthy. So the meal is complete without
          asking you to become the kitchen.
        </Text>
        <div className="mt-7">
          <StartCTA />
        </div>
      </Container>
    </Section>
  );
}
