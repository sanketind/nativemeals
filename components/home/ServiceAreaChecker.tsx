import { siteConfig } from "@/data/site-config";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { ButtonLink } from "@/components/ui/Button";

export function ServiceAreaChecker() {
  return (
    <Section id="service-area" tone="sage">
      <Container className="grid gap-10 md:grid-cols-2 md:items-start">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta-ink">
            Service area
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal md:text-5xl">
            Where we serve.
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {siteConfig.serviceAreas.map((area) => (
              <li
                key={area}
                className="rounded-full bg-white px-3 py-1.5 text-sm font-bold text-olive"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-lg leading-relaxed text-charcoal/75">
            Native Meals serves {siteConfig.serviceAreaLine} in {siteConfig.city}.
            Share your locality and we will confirm the address.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-charcoal/60">
            This does not check your address automatically. We confirm it when
            we reply.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <WhatsAppCTA
              variant="secondary"
              message="Hello Native Meals, can you serve my address? My locality is "
            >
              Chat on WhatsApp
            </WhatsAppCTA>
            {!siteConfig.contact.whatsapp ? (
              <ButtonLink href="/contact" variant="secondary">
                Contact us
              </ButtonLink>
            ) : null}
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <EnquiryForm type="serviceability" submitLabel="Check Availability" />
        </div>
      </Container>
    </Section>
  );
}
