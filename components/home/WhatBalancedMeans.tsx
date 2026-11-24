import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";
import { cn } from "@/lib/cn";

/**
 * What “balanced” means on this site: a complete everyday plate.
 * Kitchen rules stay in How we make it; this band only defines the plate.
 */
const beats = [
  {
    title: "A full plate",
    body: "Protein, carbs, fats, vegetables and dal. Familiar food prepared carefully.",
  },
  {
    title: "Macros on the menu",
    body: "Calories and macros from kitchen calculations, on this week's menu.",
  },
  {
    title: "Every day",
    body: "Food you can eat on Monday and still want on Friday. Not a diet plan.",
  },
] as const;

export function WhatBalancedMeans() {
  return (
    <Section tone="field" className="text-stone">
      <Container>
        <SectionHeading
          tone="inverse"
          eyebrow="Everyday food. Balanced better."
          title="A complete meal. Every day."
        >
          Balanced means a complete meal. Not gym food, not clinic food, not
          exotic health food. Tasty, familiar, healthy.
        </SectionHeading>
        <ul className="mt-10 grid gap-8 sm:grid-cols-3 md:mt-14 md:gap-10">
          {beats.map((beat) => (
            <li key={beat.title} className="border-t border-stone/25 pt-5">
              <h3 className={cn(typeStyles.card, "text-stone")}>{beat.title}</h3>
              <Text tone="inverse" className="mt-3 max-w-xs">
                {beat.body}
              </Text>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
