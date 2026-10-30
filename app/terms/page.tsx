import { siteConfig } from "@/data/site-config";
import { pageMeta } from "@/lib/page-meta";
import { WriteToUs } from "@/components/legal/WriteToUs";
import { Container } from "@/components/ui/Container";
import { Note } from "@/components/ui/Note";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { Heading } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";
import { cn } from "@/lib/cn";

export const metadata = pageMeta(
  "Terms",
  "How a Native Meals plan starts. An enquiry is a request. The meals, the price, and the handover are confirmed before the first tiffin.",
);

export default function TermsPage() {
  return (
    <>
      <PageHeader eyebrow="Terms" title="Terms of use.">
        How a plan starts. Updated 29 October 2026.
      </PageHeader>
      <Section>
        <Container className={cn("space-y-10", typeStyles.lead, "text-muted")}>
          <Note className="px-4 py-3">
            Sending a message is a request. The plan starts once we confirm the
            meals, the price, and where the tiffin is handed over.
          </Note>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              The price on the page.
            </Heading>
            <p>
              The figure is the meal price for the meals and length you picked.
              We confirm that total with you before a plan starts. Any delivery
              charge is confirmed then. Nothing is charged on this site.
            </p>
          </article>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              Where the tiffin goes.
            </Heading>
            <p>
              We serve {siteConfig.serviceAreaLine} in {siteConfig.city},
              including {siteConfig.techParkLine}. {siteConfig.delivery.handover}{" "}
              We confirm the address before the first meal. A plan can name the
              office, the home, or both.
            </p>
          </article>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              The menu.
            </Heading>
            <p>
              The menu is what the kitchen has posted for the current week. A
              day with nothing posted is not a meal we have promised. If the
              menu cannot be loaded, the page says so.
            </p>
            <p>
              When a week is labelled as a sample, those dishes show the style
              of food. They are not a promise of that exact plate.
            </p>
          </article>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              Pause, payment, and a missed tiffin.
            </Heading>
            <p>
              {siteConfig.delivery.skipNote} Payment and a missed delivery are
              confirmed with you before the first tiffin.
            </p>
          </article>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              What this is.
            </Heading>
            <p>
              Native Meals sells meals for a working week. The site does not
              offer a medical plan, a weight-loss plan, or nutrition advice.
            </p>
            <WriteToUs />
          </article>
        </Container>
      </Section>
    </>
  );
}
