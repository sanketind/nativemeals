import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";
import { Section } from "@/components/ui/Section";

export function AboutPreview() {
  return (
    <Section>
      <Container className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sage">
          <FoodImage imageId="about" sizes="(min-width: 768px) 40vw, 100vw" />
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta-ink">
            Our story
          </p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal md:text-5xl">
            Eat well, without the daily decision.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-charcoal/75">
            Native Meals is clean, healthy food for breakfast, lunch and
            dinner. Freshly prepared, on a plan that fits the day.
          </p>
          <div className="mt-8">
            <ButtonLink href="/about" variant="secondary">
              Discover Native Meals
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
