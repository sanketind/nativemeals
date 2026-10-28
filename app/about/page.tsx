import type { Metadata } from "next";
import { siteConfig } from "@/data/site-config";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    `Why Native Meals exists: clean, healthy meals for breakfast, lunch and dinner, serving ${siteConfig.serviceAreaLine}, Pune.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Our story" title="Clean meals, for a busy day.">
        Native Meals is a meal service for people who want to eat well without
        planning, shopping and cooking every day.
      </PageHeader>
      <Section>
        <Container className="grid items-start gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sage md:sticky md:top-24">
            <FoodImage imageId="about" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <div className="space-y-12">
            <article>
              <h2 className="font-serif text-3xl text-charcoal">
                Why Native Meals exists.
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/75">
                Planning, shopping, cooking and cleaning, every single day, is
                a lot to carry on top of a job and a household. Native Meals
                exists so that work is handled: clean, healthy meals for
                breakfast, lunch and dinner. We serve {siteConfig.serviceAreaLine}{" "}
                in {siteConfig.city}.
              </p>
            </article>
            <article>
              <h2 className="font-serif text-3xl text-charcoal">
                What we cook.
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/75">
                Healthy meals for the day. The menu is not locked to one style,
                so a week can include a sandwich, scrambled eggs or oats as well
                as a fuller plate. Vegetarian and non-vegetarian choices both
                belong here. What is actually cooking is on this week&apos;s
                menu.
              </p>
            </article>
            <article>
              <h2 className="font-serif text-3xl text-charcoal">
                Freshness, cleanliness, and consistency.
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/75">
                Meals are cooked fresh the same morning and delivered to your
                desk or your door, with attention to cleanliness and to tasting
                the same from one day to the next. Kitchen details are shared
                when you enquire.
              </p>
            </article>
            <article>
              <h2 className="font-serif text-3xl text-charcoal">
                The name.
              </h2>
              <p className="mt-4 leading-relaxed text-charcoal/75">
                Native is food you can come back to. Meals is breakfast, lunch
                and dinner, on a plan rather than a one-off order.
              </p>
            </article>
            {siteConfig.founderNote ? (
              <article className="rounded-3xl bg-sage/70 p-6">
                <h2 className="font-serif text-3xl text-charcoal">
                  {siteConfig.founderNote.heading}
                </h2>
                <p className="mt-4 leading-relaxed text-charcoal/75">
                  {siteConfig.founderNote.body}
                </p>
              </article>
            ) : null}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container className="flex flex-col items-start gap-4">
          <h2 className="font-serif text-4xl text-charcoal">
            See if a plan fits your week.
          </h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/meal-plans">Explore Meal Plans</ButtonLink>
            <WhatsAppCTA variant="secondary">Chat With Us</WhatsAppCTA>
            {!siteConfig.contact.whatsapp ? (
              <ButtonLink href="/contact" variant="secondary">
                Contact us
              </ButtonLink>
            ) : null}
          </div>
        </Container>
      </Section>
    </>
  );
}
