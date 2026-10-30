import { siteConfig } from "@/data/site-config";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Heading, Text } from "@/components/ui/Type";

export function KitchenRules() {
  return (
    <Section id="kitchen-rules">
      <Container>
        <SectionHeading eyebrow="Our kitchen rules" title="What our kitchen leaves out.">
          These rules hold for every meal on the menu, veg and non-veg.
        </SectionHeading>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {siteConfig.kitchenRules.map((rule) => (
            <Card key={rule.title} as="li">
              <Heading as="h3" size="card">
                {rule.title}
              </Heading>
              <Text size="body" className="mt-1.5">
                {rule.body}
              </Text>
            </Card>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
