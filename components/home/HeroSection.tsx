import { ArrowDown, CookingPot, Leaf, Sprout, WheatOff } from "lucide-react";
import { siteConfig, type HeroFactIcon } from "@/data/site-config";
import { cn } from "@/lib/cn";
import { StartCTA } from "@/components/ui/StartCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";
import { Sticker } from "@/components/ui/Sticker";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";
import { surface } from "@/components/ui/styles";

const factIcons: Record<HeroFactIcon, typeof Sprout> = {
  potatoes: Sprout,
  maida: WheatOff,
  preservatives: Leaf,
  cookware: CookingPot,
};

export function HeroSection() {
  return (
    // The negative margin matches the sticky header's height, so the olive runs under it.
    // No bottom padding: the plate runs to the edge and the next band's rounded top covers it.
    // The extra 3rem is that band's overlap, so the first screen is all hero.
    // `isolate` keeps the plate's z-index inside the hero, so the next band still paints over it.
    <section
      className={cn(
        "relative isolate -mt-[4.25rem] overflow-hidden bg-olive pt-[4.25rem] md:-mt-20 md:pt-20 lg:flex lg:min-h-[calc(100svh+3rem)] lg:flex-col",
        surface.brandPattern,
      )}
    >
      <Container className="max-w-[91rem] pt-8 md:pt-12 lg:flex lg:flex-1 lg:flex-col">
        <div className="flex justify-center">
          <Chip tone="inverse" size="compact">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-cream" />
            {siteConfig.launchArea}
          </Chip>
        </div>
        <Heading as="h1" size="poster" tone="inverse" className="mt-5 text-center md:mt-6">
          <span className="block md:whitespace-nowrap">Everyday food.</span>
          <span className="block md:whitespace-nowrap">Balanced better.</span>
        </Heading>

        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:mt-0 lg:flex-1 lg:grid-cols-[1fr_minmax(0,1.6fr)_1fr] lg:items-end lg:gap-10">
          <div className="lg:pb-20">
            <Text size="lede" tone="inverse" className="max-w-sm">
              Breakfast, lunch and dinner you can eat every day — complete,
              familiar meals, cooked fresh and handed over at your office gate
              or your door.
            </Text>
            <div className="mt-7 flex flex-wrap gap-3">
              <StartCTA />
              <ButtonLink href="#this-week" variant="inverse">
                This week&apos;s menu
              </ButtonLink>
            </div>
          </div>

          {/* From lg the plate fills the row's height, whatever the screen, and reaches up into the headline. */}
          <div className="relative z-10 order-last -mx-5 md:col-span-2 md:mx-auto md:w-4/5 lg:order-none lg:col-span-1 lg:mx-0 lg:min-h-[22rem] lg:w-auto lg:self-stretch">
            <div className="relative aspect-[1000/815] drop-shadow-2xl lg:absolute lg:-inset-x-10 lg:-top-14 lg:bottom-0 lg:aspect-auto">
              <FoodImage
                imageId="heroPlate"
                fit="contain"
                priority
                sizes="(min-width: 1024px) 50vw, (min-width: 768px) 80vw, 100vw"
                className="object-bottom"
              />
            </div>
            <Sticker
              id="hero-sticker"
              text="Cooked fresh • Office gate or your door • "
              className="absolute right-3 top-0 w-24 sm:w-28 md:-right-6 md:top-4 md:w-36 lg:right-[6%] lg:-top-6 lg:w-[clamp(8rem,10vw,10rem)]"
            />
          </div>

          <div className="md:justify-self-end lg:pb-20">
            <div className="rounded-card border border-cream/15 bg-olive-deep/50 p-4 md:p-6">
              <Eyebrow tone="sunflower">Our kitchen rules</Eyebrow>
              <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-3 md:grid-cols-1">
                {siteConfig.heroFacts.map((fact) => {
                  const Icon = factIcons[fact.icon];
                  return (
                    <li key={fact.label} className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-cream md:gap-2.5 md:text-lg">
                      <Icon aria-hidden="true" className="size-5 shrink-0 text-cream/70" />
                      {fact.label}
                    </li>
                  );
                })}
              </ul>
              <a
                href="#balanced-better"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-cream underline-offset-4 hover:underline"
              >
                How we make it
                <ArrowDown aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
