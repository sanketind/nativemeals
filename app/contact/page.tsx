import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { displayPhone, phoneHref, whatsappHref } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a healthy meal plan in Hinjewadi, Wakad or nearby Pune. Share your locality and whether you want veg or non-veg.",
};

export default function ContactPage() {
  const phone = siteConfig.contact.phone;
  const email = siteConfig.contact.email;
  const whatsapp = whatsappHref();
  const call = phoneHref(phone);

  return (
    <>
      <PageHeader eyebrow="Contact" title="Tell us what your days look like.">
        A name, a phone number and a short note is enough. We reply with what
        is actually available.
      </PageHeader>
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-serif text-3xl text-charcoal">Reach us directly.</h2>
            <p className="mt-3 text-sm text-charcoal/70">
              Serving {siteConfig.serviceAreaShort}, {siteConfig.city}. Office
              tiffins go to the gate or the security desk.
            </p>
            <ul className="mt-6 space-y-3 text-lg">
              {call ? (
                <li>
                  <a href={call} className="text-olive hover:underline">
                    {displayPhone(phone)}
                  </a>
                </li>
              ) : null}
              {email ? (
                <li>
                  <a href={`mailto:${email}`} className="text-olive hover:underline">
                    {email}
                  </a>
                </li>
              ) : null}
              {whatsapp ? (
                <li>
                  <a
                    href={whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-olive hover:underline"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : null}
            </ul>
            {!call && !email && !whatsapp ? (
              <p className="mt-4 leading-relaxed text-charcoal/70">
                Use the form and we will reply on your phone.
              </p>
            ) : null}
          </div>
          <div className="rounded-3xl bg-white p-6 md:p-8">
            <EnquiryForm type="contact" submitLabel="Send message" />
          </div>
        </Container>
      </Section>
    </>
  );
}
