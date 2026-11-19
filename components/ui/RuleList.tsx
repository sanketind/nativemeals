import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/cn";
import { Text } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";

/** The kitchen rules in two columns, each under a heavy olive rule. For a light band. */
export function RuleList({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-x-12 gap-y-10 sm:grid-cols-2 md:gap-y-14", className)}>
      {siteConfig.kitchenRules.map((rule) => (
        <li key={rule.title} className="border-t-2 border-olive pt-6">
          <h3 className={cn(typeStyles.label, "text-olive")}>{rule.title}</h3>
          <Text className="mt-3 max-w-md">{rule.body}</Text>
        </li>
      ))}
    </ul>
  );
}
