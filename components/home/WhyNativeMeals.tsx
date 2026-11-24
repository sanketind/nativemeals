import { StartCTA } from "@/components/ui/StartCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";
import { cn } from "@/lib/cn";

/**
 * Kitchen practices in plain words. Concept bands above cover why Native
 * exists, who it is for, and what balanced means. Do not repeat those here.
 * The About page keeps the shorter rule list.
 */
const points = [
  {
    title: "Millet and multigrain rotis",
    body: "Every roti is millet or multigrain flour, never maida. Whole grains carry the carbs and minerals of the plate.",
  },
  {
    title: "Sabzi without potato bulk",
    body: "Potatoes are not used as filler or as a side. The vegetable dish is the meal, so the plate stays balanced.",
  },
  {
    title: "Chutneys cooked here",
    body: "Chutneys are made in our kitchen for that meal. No mayo. No preservatives from a jar.",
  },
  {
    title: "Cooked fresh, in steel",
    body: "Breakfast, lunch and dinner are each cooked for their own meal. Every pot and pan is steel.",
  },
];

export function WhyNativeMeals() {
  return (
    <Section id="balanced-better" tone="mist">
      <Container>
        <SectionHeading eyebrow="Everyday food. Balanced better." title="How we make it.">
          A complete everyday meal: protein, carbs, fats, vegetables and dal,
          cooked carefully to the kitchen rules, with calories and macros on
          this week&apos;s menu.
        </SectionHeading>
        <ul className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2 md:mt-14 md:gap-y-14">
          {points.map((point) => (
            <li key={point.title} className="border-t-2 border-ink pt-6">
              <h3 className={cn(typeStyles.label, "text-ink")}>{point.title}</h3>
              <Text className="mt-3 max-w-md">{point.body}</Text>
            </li>
          ))}
        </ul>
        <div className="mt-10 max-w-2xl border-t-2 border-ink pt-8 md:mt-14">
          <Text>
            Familiar food, prepared carefully. Tasty, familiar, healthy. Those
            grains, dals and vegetables carry the micronutrients too. Open this
            week&apos;s menu for the calories and macros on each plate.
          </Text>
          <div className="mt-6 flex flex-wrap gap-3">
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
