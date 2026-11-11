import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/cn";
import { Heading, Text } from "@/components/ui/Type";

/** The kitchen rules as columns under a heavy olive rule. For a light band. */
export function RuleList({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10", className)}>
      {siteConfig.kitchenRules.map((rule) => (
        <li key={rule.title} className="border-t-2 border-olive pt-5">
          <Heading as="h3" size="card">
            {rule.title}
          </Heading>
          <Text className="mt-2">{rule.body}</Text>
        </li>
      ))}
    </ul>
  );
}
