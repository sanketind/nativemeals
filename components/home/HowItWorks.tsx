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
    body: "We confirm the price and the handover spot. Skip a day on WhatsApp when the week changes.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-olive py-12 text-cream md:py-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta">
          How it works
        </p>
        <h2 className="mt-3 max-w-2xl font-serif text-3xl leading-tight md:text-5xl">
          Your meals, made simple.
        </h2>
        <ol className="mt-8 grid gap-3 md:mt-12 md:grid-cols-3 md:gap-4">
          {steps.map((step) => (
            <li key={step.number} className="rounded-3xl bg-white p-5 text-charcoal md:p-6">
              <p className="font-mono text-sm tracking-[0.16em] text-terracotta-ink">
                {step.number}
              </p>
              <h3 className="mt-3 font-serif text-lg md:mt-8 md:text-2xl">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-charcoal/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
