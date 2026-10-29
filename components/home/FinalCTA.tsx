import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

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
          <ButtonLink href={primaryHref} variant={olive ? "inverse" : "primary"}>
            {primaryLabel}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
