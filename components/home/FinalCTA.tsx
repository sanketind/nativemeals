import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";

export function FinalCTA({
  tone = "white",
  title = "Start your plan.",
  body = "Try one lunch first. Tell us your office, your home, and the day you want to start.",
  primaryHref = "/meal-plans#enquire",
  primaryLabel = "Start your plan",
}: {
  tone?: "white" | "field";
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  const field = tone === "field";
  return (
    <Section tone={field ? "field" : "white"} className={field ? "text-stone" : undefined}>
      <Container className="text-center motion-safe:animate-fade-up">
        {field ? <Eyebrow tone="accent">Ready when you are</Eyebrow> : null}
        <Heading
          size={field ? "closing" : "title"}
          className={field ? "mt-3" : undefined}
        >
          {title}
        </Heading>
        <Text
          tone={field ? "inverse" : "default"}
          className="mx-auto mt-4 max-w-xl"
        >
          {body}
        </Text>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryHref} variant="accent">
            {primaryLabel}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
