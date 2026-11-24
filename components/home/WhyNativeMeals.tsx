import { Flame, Soup, Sprout, Wheat } from "lucide-react";
import { StartCTA } from "@/components/ui/StartCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Heading, Text } from "@/components/ui/Type";

/**
 * The one homepage place that explains Everyday food. Balanced better.
 * The four kitchen practices live here in plain words. The About page keeps
 * the shorter rule list. Do not add a second homepage band that repeats them.
 */
const points = [
  {
    icon: Wheat,
    title: "Millet and multigrain rotis",
    body: "Every roti is millet or multigrain flour — never maida. Whole grains carry the carbs and minerals of the plate.",
  },
  {
    icon: Sprout,
    title: "Sabzi without potato bulk",
    body: "Potatoes are not used as filler or as a side. The vegetable dish is the meal, so the plate stays balanced.",
  },
  {
    icon: Soup,
    title: "Chutneys cooked here",
    body: "Chutneys are made in our kitchen for that meal. No mayo. No preservatives from a jar.",
  },
  {
    icon: Flame,
    title: "Cooked fresh, in steel",
    body: "Breakfast, lunch and dinner are each cooked for their own meal. Every pot and pan is steel.",
  },
];

export function WhyNativeMeals() {
  return (
    <Section id="balanced-better" tone="oat">
      <Container>
        <SectionHeading split eyebrow="Everyday food. Balanced better." title="How we make it.">
          A complete everyday meal — protein, carbs, fats, vegetables and dal —
          cooked carefully to the kitchen rules, with calories and macros on
          this week&apos;s menu.
        </SectionHeading>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:mt-12">
          {points.map((point) => (
            <Card key={point.title} as="li" bordered={false} className="h-full md:p-8">
              <span className="grid size-12 place-items-center rounded-full bg-olive text-cream">
                <point.icon aria-hidden="true" className="size-6" />
              </span>
              <Heading as="h3" size="card" className="mt-6">
                {point.title}
              </Heading>
              <Text className="mt-2">{point.body}</Text>
            </Card>
          ))}
        </ul>
        <div className="mt-10 grid gap-6 border-t-2 border-olive pt-8 md:mt-14 md:grid-cols-[minmax(0,1.4fr)_auto] md:items-end md:gap-10">
          <Text>
            Familiar food, prepared carefully — tasty, familiar, healthy. Those
            grains, dals and vegetables carry the micronutrients too. Open this
            week&apos;s menu for the calories and macros on each plate.
          </Text>
          <div className="flex flex-wrap gap-3">
            <StartCTA />
            <ButtonLink href="#this-week" variant="secondary">
              This week&apos;s menu
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
