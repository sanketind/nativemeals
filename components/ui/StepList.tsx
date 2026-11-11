import { cn } from "@/lib/cn";
import { Heading, Text } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";

export type Step = { number: string; title: string; body: string };

/** Large cream step numbers over a thin rule. For an olive band. */
export function StepList({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-12 md:gap-8", className)}>
      {steps.map((step) => (
        <li key={step.number} className="border-t border-cream/20 pt-8">
          {/* Decorative: the list is already ordered. */}
          <p aria-hidden="true" className={cn(typeStyles.numeral, "text-cream")}>
            {step.number}
          </p>
          <Heading as="h3" size="card" tone="inverse" className="mt-8">
            {step.title}
          </Heading>
          <Text tone="inverse" className="mt-2 max-w-xs">
            {step.body}
          </Text>
        </li>
      ))}
    </ol>
  );
}
