import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";
import { Section } from "@/components/ui/Section";

const plates = [
  { id: "dayBreakfast", label: "Breakfast" },
  { id: "dayLunch", label: "Lunch" },
  { id: "dayDinner", label: "Dinner" },
] as const;

export function BrandPromiseSection() {
  return (
    <Section tone="white">
      <Container>
        <h2 className="sr-only">Breakfast, lunch and dinner</h2>
        <ul className="grid gap-4 sm:grid-cols-3">
          {plates.map((plate) => (
            <li key={plate.id}>
              <figure className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sage">
                <FoodImage
                  imageId={plate.id}
                  sizes="(min-width: 640px) 30vw, 100vw"
                />
                <figcaption className="absolute bottom-4 left-4 rounded-2xl bg-white/95 px-3.5 py-2.5 text-sm font-semibold text-olive shadow-lg">
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
