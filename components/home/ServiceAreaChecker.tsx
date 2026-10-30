import { siteConfig } from "@/data/site-config";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Panel } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";

export function ServiceAreaChecker() {
  return (
    <Section id="service-area" tone="sage">
      <Container className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <Eyebrow>Service area</Eyebrow>
          <Heading className="mt-3">Where we serve.</Heading>
          <ul className="mt-5 flex flex-wrap gap-2">
            {siteConfig.serviceAreas.map((area) => (
              <li key={area}>
                <Chip>{area}</Chip>
              </li>
            ))}
          </ul>
          <Eyebrow className="mt-6">Tech parks</Eyebrow>
          <ul className="mt-3 flex flex-wrap gap-2">
            {siteConfig.techParks.map((park) => (
              <li key={park}>
                <Chip tone="quiet">{park}</Chip>
              </li>
            ))}
          </ul>
          <Text className="mt-4">
            Native Meals serves {siteConfig.serviceAreaShort} in {siteConfig.city}.
            Office tiffins are handed over at the gate or the security desk.
            Share your locality and we will confirm it.
          </Text>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppCTA variant="secondary" message={siteConfig.messages.service}>
              Chat on WhatsApp
            </WhatsAppCTA>
            {!siteConfig.contact.whatsapp ? (
              <ButtonLink href="/contact" variant="secondary">
                Contact us
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <Panel>
          <EnquiryForm type="serviceability" submitLabel="Check my area" />
        </Panel>
      </Container>
    </Section>
  );
}
