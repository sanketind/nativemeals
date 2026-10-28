import { CalendarCheck, CookingPot, Leaf, UtensilsCrossed } from "lucide-react";
import { siteConfig, type PromiseIcon } from "@/data/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<PromiseIcon, typeof Leaf> = {
  clean: Leaf,
  fresh: CookingPot,
  easy: CalendarCheck,
  diet: UtensilsCrossed,
};

export function BrandPromiseSection() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading eyebrow="Why Native Meals" title="Healthy meals, ready for the day." />
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.promises.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title}>
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-sage text-olive">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-5 font-serif text-2xl text-charcoal">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-charcoal/75">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}