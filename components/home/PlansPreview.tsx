import { plans, pricing } from "@/data/plans";
import { MealPlanCard } from "@/components/plans/MealPlanCard";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function PlansPreview() {
  return (
    <Section id="plans">
      <Container>
        <SectionHeading
          split
          eyebrow="Meal plans"
          title="One price per meal."
          action={
            <ButtonLink href="/meal-plans#build" variant="secondary">
              Build a plan
            </ButtonLink>
          }
        >
          Pick lunch, dinner, or the full day. Veg or non-veg. The rate stays
          the same at every length.
        </SectionHeading>
        <ul className="mt-8 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {plans.map((plan) => (
            <li key={plan.id}>
              <MealPlanCard plan={plan} compact />
            </li>
          ))}
        </ul>
        {pricing.status === "draft" ? (
          <p className="mt-6 text-sm text-muted">{pricing.note}</p>
        ) : null}
      </Container>
    </Section>
  );
}
