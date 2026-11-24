import { cn } from "@/lib/cn";
import { Heading, Text } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";

export type Step = { number: string; title: string; body: string };

/** Large stone step numbers over a thin rule. For a field band. */
export function StepList({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-12 md:gap-8", className)}>
      {steps.map((step, index) => (
        <li
          key={step.number}
          className={cn(
            "border-t border-stone/20 pt-8 motion-safe:animate-fade-up",
            index === 1 && "motion-safe:[animation-delay:70ms]",
            index === 2 && "motion-safe:[animation-delay:140ms]",
            index === 3 && "motion-safe:[animation-delay:210ms]",
          )}
        >
          {/* Decorative: the list is already ordered. */}
          <p aria-hidden="true" className={cn(typeStyles.numeral, "text-stone")}>
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
