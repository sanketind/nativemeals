import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { surface, type as typeStyles } from "@/components/ui/styles";

const plates = [
  { id: "dayBreakfast", label: "Breakfast" },
  { id: "dayLunch", label: "Lunch" },
  { id: "dayDinner", label: "Dinner" },
] as const;

export function BrandPromiseSection() {
  return (
    <Section>
      <Container>
        <SectionHeading split eyebrow="Every day" title="Breakfast, lunch and dinner.">
          Each one cooked fresh, for its own meal.
        </SectionHeading>
        <ul className="mt-8 grid gap-4 sm:grid-cols-3 md:mt-12">
          {plates.map((plate) => (
            <li key={plate.id}>
              <figure className={cn(surface.photo, "aspect-[4/5]")}>
                <FoodImage imageId={plate.id} sizes="(min-width: 640px) 30vw, 100vw" />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-olive-deep/85 to-transparent"
                />
                <figcaption className={cn(typeStyles.label, "absolute bottom-6 left-6 text-cream")}>
                  {plate.label}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
