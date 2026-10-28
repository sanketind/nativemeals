import { CookingPot, MapPin, Utensils, UtensilsCrossed } from "lucide-react";
import { siteConfig } from "@/data/site-config";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";

const factIcons = [CookingPot, Utensils, UtensilsCrossed, MapPin] as const;

export function HeroSection() {
  return (
    <section className="overflow-hidden">
      <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-charcoal/10 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-olive">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-terracotta" />
            Healthy meal plans
            <span aria-hidden="true" className="text-charcoal/30">
              ·
            </span>
            Pune
          </p>
          <h1 className="mt-6 max-w-xl font-serif text-5xl leading-[1.02] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
            Clean meals, freshly prepared.
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-charcoal/80">
            Breakfast, lunch and dinner, cooked fresh the same morning and
            delivered to your desk or your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/meal-plans">Explore Meal Plans</ButtonLink>
            <ButtonLink href="#this-week" variant="secondary">
              This week&apos;s menu
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-charcoal/10 pt-6">
            {siteConfig.heroFacts.map((fact, index) => {
              const Icon = factIcons[index] ?? Utensils;
              return (
                <li key={fact} className="flex items-center gap-2 text-sm font-semibold text-olive">
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {fact}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-lg md:max-w-none">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sage shadow-sm">
            <FoodImage
              imageId="heroMain"
              priority
              sizes="(min-width: 768px) 46vw, 100vw"
            />
          </div>
          <p className="absolute bottom-4 right-4 flex items-center gap-2 rounded-2xl bg-white/95 px-3.5 py-2.5 text-sm font-semibold text-olive shadow-lg">
            <CookingPot aria-hidden="true" className="size-4 shrink-0" />
            Cooked this morning
          </p>
        </div>
      </Container>
    </section>
  );
}
