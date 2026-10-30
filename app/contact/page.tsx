import { Phone } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { pageMeta } from "@/lib/page-meta";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
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
            <h2 className="font-sans text-[clamp(1.95rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.035em] text-olive">
              Reach us directly.
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
            <p className="mt-5 text-[1.06rem] font-normal leading-[1.7] text-muted">
              Office tiffins go to the gate or the security desk.
            </p>
            {call && phone ? (
              <p className="mt-6 flex items-center gap-2.5 font-sans text-[clamp(1.5rem,2.4vw,2rem)] font-bold leading-none tracking-[-0.03em] text-olive">
                <Phone aria-hidden="true" className="size-5 shrink-0 text-olive" />
                <a href={call} className="hover:text-olive-deep">
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
              <p className="mt-6 text-[0.94rem] leading-[1.65] text-muted">
                Use the form and we will reply on your phone.
              </p>
            ) : null}
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm md:p-8">
            <EnquiryForm type="contact" submitLabel="Send message" />
          </div>
        </Container>
      </Section>
    </>
  );
}
