import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms",
  description: "How a Native Meals meal plan starts, including skipping a day and sample menus.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Terms" title="Terms of use.">
        How a plan starts, how skipping a day works, and what a sample menu means.
      </PageHeader>
      <Section>
        <Container className="max-w-3xl space-y-6 leading-relaxed text-charcoal/80">
          <p className="rounded-2xl bg-sage px-4 py-3 text-sm text-olive">
            Sending a message is a request. The plan starts once we confirm the
            meals, the price and where the tiffin is handed over.
          </p>
          <p>
            Prices shown as introductory are confirmed with you before a plan
            starts. Sample dishes are labelled as samples and describe the
            style of food, rather than a promise of that exact dish.
          </p>
          <p>
            You can skip a meal by messaging us before the cutoff for that day, pause
            while you travel, and carry a skipped meal forward. You can keep an
            office-gate address and a home address. Payment, refunds and missed
            deliveries are confirmed with you before the first tiffin.
          </p>
        </Container>
      </Section>
    </>
  );
}
