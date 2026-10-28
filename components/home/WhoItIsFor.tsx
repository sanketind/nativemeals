import { Briefcase, House, Moon, Utensils } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const audience = [
  {
    title: "Working professionals",
    body: "A midday or evening meal when the day does not leave room to cook.",
    icon: Briefcase,
  },
  {
    title: "Busy households",
    body: "One less thing to plan when everyone gets home at different times.",
    icon: House,
  },
  {
    title: "Eating on a schedule",
    body: "Clean meals when you want the day handled, not another decision.",
    icon: Moon,
  },
  {
    title: "Tired of deciding",
    body: "The same question every day, answered before you have to ask it.",
    icon: Utensils,
  },
];

export function WhoItIsFor() {
  return (
    <Section>
      <Container>
        <h2 className="max-w-2xl font-serif text-4xl text-charcoal md:text-5xl">
          Who it is for.
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {audience.map((item) => (
            <li key={item.title} className="rounded-3xl border border-charcoal/10 bg-white p-6">
              <item.icon aria-hidden="true" className="size-5 text-olive" />
              <h3 className="mt-4 font-serif text-2xl text-charcoal">{item.title}</h3>
              <p className="mt-2 leading-relaxed text-charcoal/75">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
