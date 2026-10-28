import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Terms",
  description: "How a Native Meals meal plan starts, and what a sample menu means.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Terms" title="Terms of use.">
        How a plan starts, and what a sample menu means.
      </PageHeader>
      <Section>
        <Container className="max-w-3xl space-y-6 text-[1.06rem] font-normal leading-[1.7] text-muted">
          <p className="rounded-2xl bg-sage px-4 py-3 text-sm text-olive">
            Sending a message is a request. The plan starts once we confirm the
            meals, the price and where the tiffin is handed over.
          </p>
          <p>
            The price on the page is confirmed with you before a plan
            starts. Sample dishes are labelled as samples and describe the
            style of food, rather than a promise of that exact dish.
          </p>
          <p>
            {siteConfig.delivery.skipNote} You can keep an office-gate address
            and a home address. Payment and missed deliveries are confirmed
            with you before the first tiffin.
          </p>
        </Container>
      </Section>
    </>
  );
}
