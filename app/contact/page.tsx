import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { pageMeta } from "@/lib/page-meta";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Panel } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Heading, Text } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";
import { cn } from "@/lib/cn";
import { displayPhone, phoneHref } from "@/lib/contact";

export const metadata = pageMeta(
  "Start a meal plan",
  `Ask about a meal plan in ${siteConfig.serviceAreaShort}, Pune. Share your locality and whether you want veg or non-veg.`,
);

export default function ContactPage() {
  const phone = siteConfig.contact.phone;
  const email = siteConfig.contact.email;
  const call = phone ? phoneHref(phone) : null;

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us what your days look like."
        imageId="breakfast"
      >
        Locality, veg or non-veg, a lunch trial or a full week. A name, a
        phone number and a short note is enough. We reply with what is actually
        available.
      </PageHeader>
      <Section tone="mist">
        <Container className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <Heading>Everyday food in {siteConfig.serviceAreaShort}.</Heading>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siteConfig.serviceAreas.map((area) => (
                <li key={area}>
                  <Chip>{area}</Chip>
                </li>
              ))}
            </ul>
            <Text className="mt-5">
              Lunch at the office gate or security desk. Dinner at your door.
              We confirm the handover before the first tiffin.
            </Text>
            {call && phone ? (
              <p className="mt-6 flex items-center gap-2.5">
                <Phone aria-hidden="true" className="size-5 shrink-0 text-ink" />
                <a href={call} className={cn(typeStyles.price, "text-ink hover:text-ink")}>
                  {displayPhone(phone)}
                </a>
              </p>
            ) : null}
            {email ? (
              <p className="mt-3">
                <a href={`mailto:${email}`} className="text-ink hover:underline">
                  {email}
                </a>
              </p>
            ) : null}
            {!call && !email ? (
              <Text size="body" className="mt-6">
                Use the form and we will reply on your phone.
              </Text>
            ) : null}
          </div>
          <Panel>
            <EnquiryForm type="contact" submitLabel="Send message" />
          </Panel>
        </Container>
      </Section>
    </>
  );
}
