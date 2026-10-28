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
          <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
            Service area
          </p>
          <h2 className="mt-3 font-sans text-[clamp(1.95rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.035em] text-olive">
            Where we serve.
          </h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {siteConfig.serviceAreas.map((area) => (
              <li
                key={area}
                className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-olive"
              >
                {area}
              </li>
            ))}
          </ul>
          <p className="mt-6 font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
            Tech parks
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {siteConfig.techParks.map((park) => (
              <li
                key={park}
                className="rounded-full border border-charcoal/10 bg-white/70 px-3 py-1.5 text-sm font-medium text-olive"
              >
                {park}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[1.06rem] font-normal leading-[1.7] text-muted">
            Native Meals serves {siteConfig.serviceAreaShort} in {siteConfig.city}.
            Office tiffins are handed over at the gate or the security desk.
            Share your locality and we will confirm it.
          </p>
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
        <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
          <EnquiryForm type="serviceability" submitLabel="Check my area" />
        </div>
      </Container>
    </Section>
  );
}
