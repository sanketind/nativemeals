import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms",
  description: "Draft terms for Native Meals.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Terms" title="Terms of use.">
        Draft for review. This is not final legal text and should be replaced
        before launch.
      </PageHeader>
      <Section>
        <Container className="max-w-3xl space-y-6 leading-relaxed text-charcoal/80">
          <p className="rounded-2xl bg-sage px-4 py-3 text-sm text-olive">
            Draft. Have this reviewed, along with any food-business registration
            details that need to be published, before the site goes live.
          </p>
          <p>
            Sending an enquiry is not an order. A plan starts only after Native
            Meals confirms the meals, the price, and the delivery or collection
            arrangement with you.
          </p>
          <p>
            Prices, menus, service areas, and pause or cancellation terms shown
            as unconfirmed are not an offer. Sample dishes on the site are
            labelled as samples and are not a commitment to serve that dish.
          </p>
          <p>
            Payment, refunds, missed deliveries and changes to a plan will be
            set out here once those policies are decided. Until then, ask us
            and we will explain the current position before you commit.
          </p>
        </Container>
      </Section>
    </>
  );
}
