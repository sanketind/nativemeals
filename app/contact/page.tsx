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
        imageId="dayDinner"
      >
        A name, a phone number and a short note is enough. We reply with what
        is actually available.
      </PageHeader>
      <Section tone="sage">
        <Container className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            <Heading>Reach us directly.</Heading>
            <ul className="mt-5 flex flex-wrap gap-2">
              {siteConfig.serviceAreas.map((area) => (
                <li key={area}>
                  <Chip>{area}</Chip>
                </li>
              ))}
            </ul>
            <Text className="mt-5">
              Office tiffins go to the gate or the security desk.
            </Text>
            {call && phone ? (
              <p className="mt-6 flex items-center gap-2.5">
                <Phone aria-hidden="true" className="size-5 shrink-0 text-olive" />
                <a href={call} className={cn(typeStyles.price, "text-olive hover:text-olive-deep")}>
                  {displayPhone(phone)}
                </a>
              </p>
            ) : null}
            {email ? (
              <p className="mt-3">
                <a href={`mailto:${email}`} className="text-olive hover:underline">
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
