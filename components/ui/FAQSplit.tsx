import type { Faq } from "@/data/faqs";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FAQSplit({
  eyebrow = "Helpful answers",
  title,
  intro,
  items,
  action,
  tone = "default",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  items: Faq[];
  action?: React.ReactNode;
  tone?: "default" | "inverse";
}) {
  return (
    <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
      <div>
        <SectionHeading eyebrow={eyebrow} title={title} tone={tone}>
          {intro}
        </SectionHeading>
        {action ? <div className="mt-6">{action}</div> : null}
      </div>
      <FAQAccordion items={items} />
    </div>
  );
}
