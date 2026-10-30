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
  tone?: "white" | "olive";
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  const olive = tone === "olive";
  return (
    <Section tone={olive ? "olive" : "white"} className={olive ? "text-cream" : undefined}>
      <Container className="text-center">
        {olive ? <Eyebrow tone="sunflower">Ready when you are</Eyebrow> : null}
        <Heading
          size={olive ? "closing" : "title"}
          className={olive ? "mt-3" : undefined}
        >
          {title}
        </Heading>
        <Text
          tone={olive ? "inverse" : "default"}
          className="mx-auto mt-4 max-w-xl"
        >
          {body}
        </Text>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryHref} variant={olive ? "inverse" : "primary"}>
            {primaryLabel}
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
