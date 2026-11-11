import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/cn";
import { BrandMark } from "@/components/layout/Wordmark";
import { Container } from "@/components/ui/Container";
import { RuleList } from "@/components/ui/RuleList";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { type as typeStyles } from "@/components/ui/styles";

export function KitchenRules() {
  return (
    <Section id="kitchen-rules" className="overflow-hidden">
      <Container>
        <SectionHeading split eyebrow="Our kitchen rules" title="What our kitchen leaves out.">
          These rules hold for every meal on the menu, veg and non-veg.
        </SectionHeading>
      </Container>

      {/* Decorative: the same rules are listed in full below. */}
      <div aria-hidden="true" className="mt-10 border-y border-olive/15 py-6 md:mt-14 md:py-8">
        <div className="flex w-max motion-safe:animate-marquee">
          {[0, 1].map((copy) => (
            <p key={copy} className={cn(typeStyles.title, "flex shrink-0 items-center text-olive")}>
              {siteConfig.kitchenRules.map((rule) => (
                <span key={rule.title} className="flex items-center whitespace-nowrap">
                  <span className="px-6 md:px-10">{rule.title}</span>
                  <BrandMark className="size-10 shrink-0 md:size-14" />
                </span>
              ))}
            </p>
          ))}
        </div>
      </div>

      <Container>
        <RuleList className="mt-10 md:mt-14" />
      </Container>
    </Section>
  );
}
