import { Container } from "@/components/ui/Container";

const steps = [
  {
    number: "01",
    title: "Choose your plan",
    body: "Select a meal schedule that suits your routine.",
  },
  {
    number: "02",
    title: "Tell us your preferences",
    body: "Share your food preferences and service location.",
  },
  {
    number: "03",
    title: "Enjoy your meals",
    body: "Follow the confirmed ordering and delivery or collection arrangement.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-olive py-16 text-cream md:py-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta">
          How it works
        </p>
        <h2 className="mt-3 max-w-2xl font-serif text-4xl leading-tight md:text-5xl">
          Your meals, made simple.
        </h2>
        <ol className="mt-12 grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="rounded-3xl bg-white p-6 text-charcoal">
              <p className="font-mono text-sm tracking-[0.16em] text-terracotta-ink">
                {step.number}
              </p>
              <h3 className="mt-8 font-serif text-2xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-charcoal/75">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
