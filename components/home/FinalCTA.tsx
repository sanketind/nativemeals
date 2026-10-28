import { siteConfig } from "@/data/site-config";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WhatsAppCTA } from "@/components/ui/WhatsAppCTA";
import { cn } from "@/lib/cn";

export function FinalCTA({
  tone = "white",
  title = "Start Monday.",
  body = "Try one lunch first. Tell us your office gate or your locality.",
  primaryHref = "/meal-plans#build",
  primaryLabel = "Start Monday",
  whatsappMessage = "Hi Native Meals, I want to start healthy meals on Monday. My office or locality is ",
}: {
  tone?: "white" | "olive";
  title?: string;
  body?: string;
  primaryHref?: string;
  primaryLabel?: string;
  whatsappMessage?: string;
}) {
  const olive = tone === "olive";
  return (
    <section className={cn("py-12 md:py-24", olive ? "bg-olive text-cream" : "bg-white")}>
      <Container className="max-w-3xl text-center">
        {olive ? (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta">
            Ready when you are
          </p>
        ) : null}
        <h2
          className={cn(
            "font-serif text-3xl leading-tight md:text-5xl",
            olive ? "mt-3 text-cream" : "text-charcoal",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-4 max-w-xl text-base leading-relaxed md:text-lg",
            olive ? "text-cream/80" : "text-charcoal/75",
          )}
        >
          {body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {siteConfig.contact.whatsapp ? (
            <WhatsAppCTA
              variant={olive ? "inverse" : "primary"}
              message={whatsappMessage}
            >
              Start on WhatsApp
            </WhatsAppCTA>
          ) : null}
          <ButtonLink
            href={primaryHref}
            variant={siteConfig.contact.whatsapp ? "secondary" : olive ? "inverse" : "primary"}
            className={
              olive && siteConfig.contact.whatsapp
                ? "border-cream/30 bg-transparent text-cream hover:border-cream"
                : undefined
            }
          >
            {primaryLabel}
          </ButtonLink>
          {siteConfig.contact.whatsapp ? null : (
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
