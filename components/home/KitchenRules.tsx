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
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.kitchenRules.map((rule) => (
            <li
              key={rule.title}
              className="rounded-3xl border border-charcoal/10 bg-white p-6"
            >
              <h3 className="font-serif text-xl text-charcoal md:text-2xl">{rule.title}</h3>
              <p className="mt-2 leading-relaxed text-charcoal/75">{rule.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
