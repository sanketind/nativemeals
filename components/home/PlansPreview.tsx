import { plans, pricing } from "@/data/plans";
import { MealPlanCard } from "@/components/plans/MealPlanCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PlansPreview() {
  return (
    <Section id="plans" tone="white">
      <Container>
        <SectionHeading eyebrow="Meal plans" title="A plan for healthy meals.">
          Choose a meal routine that works for your day.
        </SectionHeading>
        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.id}>
              <MealPlanCard plan={plan} />
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-charcoal/60">
          {pricing.status === "draft" ? `${pricing.note} ` : null}
          Delivery terms are confirmed with you when you enquire.
        </p>
      </Container>
    </Section>
  );
}
