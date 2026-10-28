import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "What Native Meals asks for when you enquire about a meal plan, and how those details are used.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy policy.">
        What we ask for when you write to us, and what we use it for.
      </PageHeader>
      <Section>
        <Container className="space-y-6 text-[1.06rem] font-normal leading-[1.7] text-muted">
          <p className="rounded-2xl bg-sage px-4 py-3 text-sm text-olive">
            We use your details to reply about a meal plan. We do not ask for
            payment details on this site.
          </p>
          <p>
            If you send an enquiry, we ask for your name, phone number, the
            meal plan you are interested in, a dietary preference, your
            locality, and an optional message. The service-area check asks for
            a locality and a phone number, and a name if you want to leave one.
          </p>
          <p>
            We use those details only to reply about meals, plans and whether
            we can serve your address. You can also send the same details on
            WhatsApp or by email.
          </p>
          <p>
            You do not need an account to enquire. We do not ask for payment
            details on this site. We keep what you send so we can reply about
            your plan.
          </p>
        </Container>
      </Section>
    </>
  );
}
