import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="bg-[radial-gradient(circle_at_92%_15%,rgba(249,216,43,0.18),transparent_26%)]">
    <Container className="py-24">
      <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
        404
      </p>
      <h1 className="mt-3 font-sans text-[clamp(2.05rem,5.15vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-olive">
        That page is not on the menu.
      </h1>
      <p className="mt-4 max-w-md text-[1.06rem] font-normal leading-[1.7] text-muted">
        The link may be out of date. The menu, the plans and a way to start
        are all still here.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Back home</ButtonLink>
        <ButtonLink href="/meal-plans" variant="secondary">
          See meal plans
        </ButtonLink>
      </div>
    </Container>
    </section>
  );
}
