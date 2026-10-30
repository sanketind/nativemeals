import { CookingPot, Flame, Leaf, WheatOff } from "lucide-react";
import { pricing } from "@/data/plans";
import { siteConfig, type HeroFactIcon } from "@/data/site-config";
import { formatInr } from "@/lib/format";
import { StartCTA } from "@/components/ui/StartCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";
import { PhotoBadge, PhotoFrame } from "@/components/ui/Photo";
import { Caption, Heading, PriceMark, Text } from "@/components/ui/Type";
import { surface } from "@/components/ui/styles";

const factIcons: Record<HeroFactIcon, typeof Leaf> = {
  cooked: Flame,
  maida: WheatOff,
  fresh: Leaf,
  steel: CookingPot,
};

export function HeroSection() {
  return (
    <section className={`overflow-hidden ${surface.pageGlow}`}>
      <Container className="grid items-center gap-8 py-10 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <Chip tone="area" size="compact">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-terracotta" />
            {siteConfig.launchArea}
          </Chip>
          <Heading as="h1" size="display" className="mt-6 max-w-xl">
            Daily Healthy Meal Subscription
          </Heading>
          <Text size="lede" className="mt-5 max-w-md">
            Breakfast, lunch and dinner, cooked the same morning and handed
            over at your office gate or your door.
          </Text>
          <div className="mt-8 flex flex-wrap gap-3">
            <StartCTA />
            <ButtonLink href="#this-week" variant="secondary">
              This week&apos;s menu
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-charcoal/10 pt-6">
            {siteConfig.heroFacts.map((fact) => {
              const Icon = factIcons[fact.icon];
              return (
                <li key={fact.label} className="flex items-center gap-2 text-sm font-semibold text-olive">
                  <Icon aria-hidden="true" className="size-4 shrink-0" />
                  {fact.label}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-lg md:max-w-none">
          <PhotoFrame shadow className="aspect-[4/5]">
            <FoodImage
              imageId="heroMain"
              priority
              sizes="(min-width: 768px) 46vw, 100vw"
            />
          </PhotoFrame>
          <div className="absolute bottom-4 left-4 aspect-square w-28 overflow-hidden rounded-control border-4 border-cream shadow-float sm:w-36 md:bottom-6 md:left-6 md:w-44">
            <FoodImage
              imageId="heroInset"
              sizes="(min-width: 768px) 11rem, 7rem"
            />
          </div>
          <PhotoBadge className="left-4 top-4">
            <Caption tone="olive">Lunch from</Caption>
            <PriceMark>{formatInr(pricing.perMeal.lunch)}</PriceMark>
          </PhotoBadge>
          <PhotoBadge tone="white" className="right-4 top-4">
            Cooked the same morning
          </PhotoBadge>
        </div>
      </Container>
    </section>
  );
}
