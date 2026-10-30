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
        <SectionHeading eyebrow="Meal plans" title="One price per meal." />
        <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
          {plans.map((plan) => (
            <li key={plan.id}>
              <MealPlanCard plan={plan} compact />
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ButtonLink href="/meal-plans#build" variant="secondary">
            Build a plan
          </ButtonLink>
          {pricing.status === "draft" ? (
            <p className="text-sm text-muted">{pricing.note}</p>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
