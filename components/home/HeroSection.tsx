import { CalendarCheck, IndianRupee, MapPin, UtensilsCrossed } from "lucide-react";
import { nonVegPerMeal, pricing } from "@/data/plans";
import { siteConfig } from "@/data/site-config";
import { formatInr } from "@/lib/format";
import { StartCTA } from "@/components/ui/StartCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";

const vegLunch = pricing.perMeal.lunch.taste;
const nonVegLunch = nonVegPerMeal.lunch;
const breakfast = pricing.perMeal.breakfast.taste;

const facts = [
  {
    icon: MapPin,
    label: siteConfig.delivery.lunchBy
      ? `Lunch by ${siteConfig.delivery.lunchBy}`
      : "Office gate or door",
  },
  { icon: CalendarCheck, label: "Mon–Fri plans" },
  { icon: UtensilsCrossed, label: "Veg and non-veg" },
  { icon: IndianRupee, label: `Lunch ${formatInr(vegLunch)} veg` },
];

export function HeroSection() {
  return (
    <section className="overflow-hidden bg-[radial-gradient(circle_at_92%_15%,rgba(249,216,43,0.18),transparent_26%)]">
      <Container className="grid items-center gap-8 py-10 md:grid-cols-2 md:gap-16 md:py-24">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-olive/15 bg-white/70 px-3 py-1.5 font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-terracotta" />
            Monday to Friday
            <span aria-hidden="true" className="text-olive/30">
              ·
            </span>
            {siteConfig.city}
          </p>
          <h1 className="mt-6 max-w-xl font-sans text-[clamp(2.05rem,5.15vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-olive">
            Daily Healthy Meal Subscription
          </h1>
          <p className="mt-5 max-w-md text-[clamp(1.05rem,1.5vw,1.25rem)] font-normal leading-[1.7] text-muted">
            Breakfast, lunch and dinner, cooked the same morning and handed
            over at your office gate or your door.
          </p>
          <p className="mt-4 max-w-md text-[1.06rem] font-semibold leading-[1.5] text-olive">
            Lunch is {formatInr(vegLunch)} veg or {formatInr(nonVegLunch)}{" "}
            non-veg. Breakfast is {formatInr(breakfast)}.
          </p>
          {siteConfig.kitchenLocality ? (
            <p className="mt-2 text-sm text-muted">
              Kitchen in {siteConfig.kitchenLocality}.
            </p>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <StartCTA />
            <ButtonLink href="#this-week" variant="secondary">
              This week&apos;s menu
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-charcoal/10 pt-6">
            {facts.map((fact) => (
              <li key={fact.label} className="flex items-center gap-2 text-sm font-semibold text-olive">
                <fact.icon aria-hidden="true" className="size-4 shrink-0" />
                {fact.label}
              </li>
            ))}
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
            Cooked the same morning
          </p>
        </div>
      </Container>
    </section>
  );
}
