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
        <SectionHeading eyebrow="How we serve" title="Healthy meals, ready for the working day." />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 md:mt-12 md:gap-8 lg:grid-cols-4">
          {siteConfig.promises.map((item) => {
            const Icon = icons[item.icon];
            return (
              <li key={item.title}>
                <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-sage text-olive md:size-12">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-3 font-sans text-[1.17rem] font-bold leading-[1.3] text-olive md:mt-5">{item.title}</h3>
                <p className="mt-1.5 text-[0.94rem] font-normal leading-[1.65] text-muted">{item.body}</p>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}