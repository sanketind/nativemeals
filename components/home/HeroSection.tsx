import { CalendarCheck, IndianRupee, MapPin, ShieldCheck, UtensilsCrossed } from "lucide-react";
import { pricing } from "@/data/plans";
import { siteConfig } from "@/data/site-config";
import { formatInr } from "@/lib/format";
import { StartCTA } from "@/components/ui/StartCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";

const trialLunch = pricing.perMeal.lunch.taste;
const monthLunch = pricing.perMeal.lunch["weekdays-month"];

const facts = [
  {
    icon: MapPin,
    label: siteConfig.delivery.lunchBy
      ? `Lunch by ${siteConfig.delivery.lunchBy}`
      : "Office gate or door",
  },
  { icon: CalendarCheck, label: "Mon–Fri plans" },
  { icon: UtensilsCrossed, label: "Veg and non-veg" },
  siteConfig.fssai
    ? { icon: ShieldCheck, label: `FSSAI ${siteConfig.fssai}` }
    : { icon: IndianRupee, label: `Lunch from ${formatInr(monthLunch)}` },
];

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
            Hinjewadi
          </p>
          <h1 className="mt-6 max-w-xl font-serif text-4xl leading-[1.05] tracking-tight text-charcoal sm:text-6xl lg:text-7xl">
            Healthy meals, at your office gate.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-charcoal/80 md:text-lg">
            Breakfast, lunch and dinner, cooked the same morning and handed
            over at your Hinjewadi office gate or your door.
          </p>
          <p className="mt-4 max-w-md text-base font-medium text-olive">
            Try one lunch for {formatInr(trialLunch)}. A Monday to Friday month
            is {formatInr(monthLunch)} a meal.
          </p>
          {siteConfig.kitchenLocality ? (
            <p className="mt-2 text-sm text-charcoal/60">
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
            Healthy meal plans
          </p>
        </div>
      </Container>
    </section>
  );
}
