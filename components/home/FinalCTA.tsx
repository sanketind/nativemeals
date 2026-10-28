import { siteConfig } from "@/data/site-config";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { cn } from "@/lib/cn";

export function FinalCTA({
  tone = "white",
  title = "Make room for healthier meals.",
  body = "Tell us what your day looks like, and we'll help you explore a clean meal plan.",
  primaryHref = "/meal-plans",
  primaryLabel = "Explore Meal Plans",
}: {
  tone?: "white" | "olive";
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
}) {
  const olive = tone === "olive";
  return (
    <section className={cn("py-16 md:py-24", olive ? "bg-olive text-cream" : "bg-white")}>
      <Container className="max-w-3xl text-center">
        {olive ? (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta">
            Ready when you are
          </p>
        ) : null}
        <h2
          className={cn(
            "font-serif text-4xl leading-tight md:text-5xl",
            olive ? "mt-3 text-cream" : "text-charcoal",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-4 max-w-xl text-lg leading-relaxed",
            olive ? "text-cream/80" : "text-charcoal/75",
          )}
        >
          {body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={primaryHref} variant={olive ? "inverse" : "primary"}>
            {primaryLabel}
          </ButtonLink>
          {siteConfig.contact.whatsapp ? (
            <WhatsAppCTA
              variant="secondary"
              className={olive ? "border-cream/30 bg-transparent text-cream hover:border-cream" : undefined}
              message="Hello Native Meals, I would like to talk about meal plans."
            >
              Chat With Us
            </WhatsAppCTA>
          ) : (
            <ButtonLink
              href="/contact"
              variant="secondary"
              className={olive ? "border-cream/30 bg-transparent text-cream hover:border-cream" : undefined}
            >
              Contact us
            </ButtonLink>
          )}
        </div>
      </Container>
    </section>
  );
}
