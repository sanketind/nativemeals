import { CookingPot, Flame, Leaf, WheatOff } from "lucide-react";
import { pricing } from "@/data/plans";
import { siteConfig, type HeroFactIcon } from "@/data/site-config";
import { formatInr } from "@/lib/format";
import { StartCTA } from "@/components/ui/StartCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";

const factIcons: Record<HeroFactIcon, typeof Leaf> = {
  cooked: Flame,
  maida: WheatOff,
  fresh: Leaf,
  steel: CookingPot,
};

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_92%_15%,rgba(249,216,43,0.18),transparent_26%)]">
      <Container className="grid items-center gap-8 py-10 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <p className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-olive/15 bg-white/70 px-2.5 py-1 font-sans text-[0.65rem] font-bold uppercase tracking-[0.08em] text-terracotta-ink md:gap-2 md:px-3 md:py-1.5 md:text-[0.78rem] md:tracking-[0.12em]">
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-terracotta" />
            {siteConfig.launchArea}
          </p>
          <h1 className="mt-6 max-w-xl font-sans text-[clamp(2.05rem,5.15vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-olive">
            Daily Healthy Meal Subscription
          </h1>
          <p className="mt-5 max-w-md text-[clamp(1.05rem,1.5vw,1.25rem)] font-normal leading-[1.7] text-muted">
            Breakfast, lunch and dinner, cooked the same morning and handed
            over at your office gate or your door.
          </p>
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
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sage shadow-sm">
            <FoodImage
              imageId="heroMain"
              priority
              sizes="(min-width: 768px) 46vw, 100vw"
            />
          </div>
          <div className="absolute bottom-4 left-4 aspect-square w-28 overflow-hidden rounded-2xl border-4 border-cream shadow-lg sm:w-36 md:bottom-6 md:left-6 md:w-44">
            <FoodImage
              imageId="heroInset"
              sizes="(min-width: 768px) 11rem, 7rem"
            />
          </div>
          <p className="absolute left-4 top-4 rounded-2xl bg-cream px-3.5 py-2.5 shadow-lg">
            <span className="font-sans text-[0.72rem] font-bold uppercase tracking-[0.12em] text-olive">
              Lunch from
            </span>
            <span className="mt-1 block rounded-full bg-terracotta px-2.5 py-1 text-center font-sans text-lg font-extrabold leading-none text-olive">
              {formatInr(pricing.perMeal.lunch.taste)}
            </span>
          </p>
          <p className="absolute right-4 top-4 rounded-2xl bg-white/95 px-3.5 py-2.5 text-sm font-semibold text-olive shadow-lg">
            Cooked the same morning
          </p>
        </div>
      </Container>
    </section>
  );
}
