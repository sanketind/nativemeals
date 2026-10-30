import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";
import { PhotoBadge, PhotoFrame } from "@/components/ui/Photo";
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
              <figure>
                <PhotoFrame className="aspect-[4/5]">
                  <FoodImage
                    imageId={plate.id}
                    sizes="(min-width: 640px) 30vw, 100vw"
                  />
                  <PhotoBadge as="figcaption" tone="white" className="bottom-4 left-4">
                    {plate.label}
                  </PhotoBadge>
                </PhotoFrame>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
