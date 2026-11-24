import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Type";
import { surface, type as typeStyles } from "@/components/ui/styles";

/**
 * A day on Native: three meals with where each one goes.
 * Kitchen rules live in How we make it, not here.
 */
const plates = [
  {
    id: "dayBreakfast",
    label: "Breakfast",
    handover: "For the morning, before the day runs away.",
  },
  {
    id: "dayLunch",
    label: "Lunch",
    handover: "At the office gate or the security desk.",
  },
  {
    id: "dayDinner",
    label: "Dinner",
    handover: "At your door: the PG or the flat after work.",
  },
] as const;

export function BrandPromiseSection() {
  return (
    <Section>
      <Container>
        <SectionHeading eyebrow="A day on Native" title="Breakfast, lunch and dinner.">
          Each meal cooked for its own slot, then handed over where your day
          actually is.
        </SectionHeading>
        <ul className="mt-8 grid gap-3 sm:grid-cols-3 md:mt-12 md:gap-4">
          {plates.map((plate, index) => (
            <li
              key={plate.id}
              className={cn(
                "motion-safe:animate-rise",
                index === 1 && "motion-safe:[animation-delay:80ms]",
                index === 2 && "motion-safe:[animation-delay:160ms]",
              )}
            >
              <figure className={cn(surface.photo, "aspect-[4/5]")}>
                <FoodImage imageId={plate.id} sizes="(min-width: 640px) 30vw, 100vw" />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-ink/90 to-transparent"
                />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <p className={cn(typeStyles.label, "text-stone")}>{plate.label}</p>
                  <Text size="body" tone="inverse" className="mt-1.5 max-w-[16rem]">
                    {plate.handover}
                  </Text>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
