import { siteConfig } from "@/data/site-config";
import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Pick the meals",
    body: "Lunch at the office, dinner at home, or the full day. Monday to Friday, or a 6-day week.",
  },
  {
    number: "02",
    title: "Tell us where it goes",
    body: "Veg or non-veg, your office gate, and your home for work-from-home days.",
  },
  {
    number: "03",
    title: "Start Monday",
    body: `We confirm the price and the handover spot. ${siteConfig.delivery.skipNote}`,
  },
];

export function HowItWorks() {
  return (
    <section className="bg-olive py-12 text-cream md:py-24">
      <Container>
        <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta">
          How it works
        </p>
        <h2 className="mt-3 max-w-2xl font-sans text-[clamp(1.95rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.035em] text-cream">
          Your meals, made simple.
        </h2>
        <ol className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          {steps.map((step) => (
            <li key={step.number} className="rounded-3xl bg-white p-5 text-charcoal md:p-6">
              <p className="font-sans text-[0.78rem] font-bold tracking-[0.12em] text-terracotta-ink">
                {step.number}
              </p>
              <h3 className="mt-3 font-sans text-[1.17rem] font-bold leading-[1.3] text-olive">{step.title}</h3>
              <p className="mt-2 text-[0.94rem] font-normal leading-[1.65] text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
