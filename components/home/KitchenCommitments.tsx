import { siteConfig } from "@/data/site-config";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function KitchenCommitments() {
  const items = siteConfig.kitchenCommitments;
  if (items.length === 0) return null;

  return (
    <Section tone="sage">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta-ink">
          In the kitchen
        </p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-charcoal md:text-5xl">
          What we will stand behind.
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={
                index === 0
                  ? "rounded-3xl bg-white p-6 md:col-span-2 md:p-8"
                  : "rounded-3xl bg-white p-6"
              }
            >
              <h3 className="font-serif text-2xl text-charcoal">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-charcoal/75">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
