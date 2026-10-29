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
    `Healthy meals from Native Meals for ${siteConfig.serviceAreaShort}, Pune. Breakfast, lunch and dinner, cooked the same morning.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="Our story" title="Healthy meals, for a working week.">
        Native Meals cooks healthy meals for people in {siteConfig.serviceAreaShort} who
        want to eat well without planning, shopping and cooking every day.
      </PageHeader>
      <Section>
        <Container className="grid items-start gap-12 md:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sage md:sticky md:top-24">
            <FoodImage imageId="about" sizes="(min-width: 768px) 40vw, 100vw" />
          </div>
          <div className="space-y-12">
            <article>
              <h2 className="font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">
                Why Native Meals exists.
              </h2>
              <p className="mt-4 text-[0.94rem] font-normal leading-[1.65] text-muted">
                Planning, shopping, cooking and cleaning, every single day, is
                a lot to carry on top of a job. Native Meals exists so that
                work is handled: healthy breakfast, lunch and dinner, across{" "}
                {siteConfig.serviceAreaShort} in {siteConfig.city}.
              </p>
            </article>
            <article>
              <h2 className="font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">
                What we cook.
              </h2>
              <p className="mt-4 text-[0.94rem] font-normal leading-[1.65] text-muted">
                Healthy meals, planned across the week so the days balance out.
                Vegetarian and non-vegetarian are both on the menu. Lunch and
                dinner cost more for non-veg. Breakfast is the same either way.
                What is actually cooking is on this week&apos;s menu.
              </p>
            </article>
            <article>
              <h2 className="font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">
                Freshness, cleanliness, and consistency.
              </h2>
              <p className="mt-4 text-[0.94rem] font-normal leading-[1.65] text-muted">
                Meals are cooked the same morning and handed over at your office
                gate, the security desk, or your door, with attention to
                cleanliness and to tasting the same from one day to the next.
                {siteConfig.kitchenLocality
                  ? ` The kitchen is in ${siteConfig.kitchenLocality}.`
                  : " Kitchen details are shared when you start."}
                {siteConfig.fssai ? ` FSSAI ${siteConfig.fssai}.` : ""}
              </p>
            </article>
            <article>
              <h2 className="font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">
                The name.
              </h2>
              <p className="mt-4 text-[0.94rem] font-normal leading-[1.65] text-muted">
                Native is food you can come back to. Meals is breakfast, lunch
                and dinner, on a plan rather than a one-off order.
              </p>
            </article>
            {siteConfig.founderNote ? (
              <article className="rounded-3xl bg-sage/70 p-6">
                <h2 className="font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">
                  {siteConfig.founderNote.heading}
                </h2>
                <p className="mt-4 text-[0.94rem] font-normal leading-[1.65] text-muted">
                  {siteConfig.founderNote.body}
                </p>
              </article>
            ) : null}
          </div>
        </Container>
      </Section>
      <Section tone="white">
        <Container className="flex flex-col items-start gap-4">
          <h2 className="font-sans text-[clamp(1.95rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.035em] text-olive">
            See if a plan fits your week.
          </h2>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/meal-plans#enquire">Start your plan</ButtonLink>
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
