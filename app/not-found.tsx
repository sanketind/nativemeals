import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="py-24">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta-ink">
        404
      </p>
      <h1 className="mt-3 font-serif text-5xl text-charcoal">
        That page is not on the menu.
      </h1>
      <p className="mt-4 max-w-md text-lg text-charcoal/70">
        The link may be out of date. The meals, the plans and a way to enquire
        are all still here.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/meal-plans" variant="secondary">
          Explore Meal Plans
        </ButtonLink>
      </div>
    </Container>
  );
}
