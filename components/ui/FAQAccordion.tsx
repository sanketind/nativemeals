import type { Faq } from "@/data/faqs";
import { Text } from "@/components/ui/Type";

export function FAQAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item) => (
        <details key={item.id} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-base font-semibold text-olive focus-visible:outline-none [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <span
              aria-hidden="true"
              className="font-sans text-xl font-bold leading-none text-terracotta-ink transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <Text size="body" className="max-w-3xl pb-5 pr-8">
            {item.answer}
          </Text>
        </details>
      ))}
    </div>
  );
}
