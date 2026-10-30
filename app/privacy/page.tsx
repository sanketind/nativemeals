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
  "Privacy Policy",
  "What Native Meals asks for when you enquire about a meal plan, where those details are kept, and how to ask us to correct or delete them.",
);

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy" title="Privacy policy.">
        What we ask for when you write to us, and what we use it for. Updated
        29 October 2026.
      </PageHeader>
      <Section>
        <Container className={cn("space-y-10", typeStyles.lead, "text-muted")}>
          <Note className="px-4 py-3">
            We use your details to reply about a meal plan. We do not ask for
            payment details on this site.
          </Note>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              Who we are.
            </Heading>
            <WriteToUs />
          </article>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              What you send.
            </Heading>
            <p>
              A meal-plan enquiry asks for your name, a 10-digit mobile number,
              the meals and length you picked, whether you want veg, non-veg,
              or either, your locality, whether the tiffin goes to the office, home,
              or both, that address, the day you want the first tiffin, and an
              optional note.
            </p>
            <p>
              A contact message asks for your name, a mobile number, and a
              message. The locality can be left blank.
            </p>
            <p>
              A service-area check asks for a mobile number and a locality. A
              name is optional there.
            </p>
          </article>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              Where it goes.
            </Heading>
            <p>
              When the form can be saved, we store the enquiry in a private
              spreadsheet so we can reply. That spreadsheet is not the weekly
              menu file. The menu file is shared so the site can read the
              dishes. Enquiry rows contain names and phone numbers, so they
              stay in their own file.
            </p>
            <p>
              If that save does not go through, the page offers a WhatsApp
              link, and an email link when we have an address. Nothing is sent
              on those links until you tap one.
            </p>
            <p>
              You can also write to us on WhatsApp or by email without using
              the form.
            </p>
          </article>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              What we use it for.
            </Heading>
            <p>
              We use those details to reply about meals, whether we can hand a
              tiffin over at your address, the price, and the day you start. We
              keep them while we are replying, and while a plan is running.
            </p>
            <p>
              We do not sell the list. You do not need an account. This site
              does not take payment and does not run advertising.
            </p>
          </article>

          <article className="space-y-4">
            <Heading as="h2" size="card">
              Correct or delete.
            </Heading>
            <p>
              Message us and say what to change or remove. We will correct or
              delete the enquiry details we hold.
            </p>
            <WriteToUs />
          </article>
        </Container>
      </Section>
    </>
  );
}
