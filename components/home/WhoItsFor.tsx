import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";
import { cn } from "@/lib/cn";

/**
 * Who the service is for, after the day-on-Native photos.
 * Handover detail stays specific; no invented delivery windows.
 */
const rows = [
  {
    title: "You already have a job",
    body: "You do not want planning, shopping and cooking on top of it, and you still want a complete plate.",
  },
  {
    title: "Lunch at the gate",
    body: "Office days go to the gate or the security desk. Work from home? The meal comes to your door.",
  },
  {
    title: "Dinner at the flat",
    body: "After work, at the PG or the flat. Breakfast joins when you want the full day.",
  },
] as const;

export function WhoItsFor() {
  return (
    <Section tone="white">
      <Container>
        <SectionHeading eyebrow="Who it is for" title="Built for the office week.">
          People working and living in Hinjewadi, Wakad and Baner who want
          everyday food that arrives where the day actually is.
        </SectionHeading>
        <ul className="mt-10 max-w-2xl space-y-8 md:mt-12">
          {rows.map((row) => (
            <li key={row.title} className="border-t-2 border-ink pt-5">
              <h3 className={cn(typeStyles.card, "text-ink")}>{row.title}</h3>
              <Text className="mt-2">{row.body}</Text>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
