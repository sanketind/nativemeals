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
      <Container className="text-center">
        {olive ? (
          <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta">
            Ready when you are
          </p>
        ) : null}
        <h2
          className={cn(
            olive
              ? "mt-3 font-sans text-[clamp(2.3rem,5vw,4.4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-cream"
              : "font-sans text-[clamp(1.95rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.035em] text-olive",
          )}
        >
          {title}
        </h2>
        <p
          className={cn(
            "mx-auto mt-4 max-w-xl text-[1.06rem] font-normal leading-[1.7]",
            olive ? "text-cream/80" : "text-muted",
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
