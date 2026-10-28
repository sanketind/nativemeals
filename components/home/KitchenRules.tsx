import { siteConfig } from "@/data/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function KitchenRules() {
  return (
    <Section id="kitchen-rules">
      <Container>
        <SectionHeading eyebrow="Our kitchen rules" title="What our kitchen leaves out.">
          These rules hold for every meal on the menu, veg and non-veg.
        </SectionHeading>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 md:gap-4 lg:grid-cols-3">
          {siteConfig.kitchenRules.map((rule) => (
            <li
              key={rule.title}
              className="rounded-3xl border border-charcoal/10 bg-white p-5 md:p-6"
            >
              <h3 className="font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">{rule.title}</h3>
              <p className="mt-1.5 text-[0.94rem] font-normal leading-[1.65] text-muted">{rule.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
