import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Draft privacy notice for Native Meals enquiries.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy policy.">
        Draft for review. This is not final legal text and should be replaced
        before launch.
      </PageHeader>
      <Section>
        <Container className="max-w-3xl space-y-6 leading-relaxed text-charcoal/80">
          <p className="rounded-2xl bg-sage px-4 py-3 text-sm text-olive">
            Draft. Have this reviewed before the site is published.
          </p>
          <p>
            If you send an enquiry, we ask for your name, phone number, the
            meal plan you are interested in, a dietary preference, your
            locality, and an optional message. The service-area check asks for
            a locality and a phone number, and a name if you want to leave one.
          </p>
          <p>
            We use those details only to reply about meals, plans and whether
            we can serve your address. The form is sent to an enquiry inbox
            when one is connected. If it is not, the site offers a WhatsApp or
            email link that contains the same details, and you choose whether
            to send it.
          </p>
          <p>
            You do not need an account to enquire. We do not ask for payment
            details on this site. This draft does not describe a final
            retention period or a legal basis. Add those before launch.
          </p>
        </Container>
      </Section>
    </>
  );
}
