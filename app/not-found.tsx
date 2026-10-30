import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";
import { surface } from "@/components/ui/styles";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className={surface.pageGlow}>
      <Container className="py-24">
        <Eyebrow>404</Eyebrow>
        <Heading as="h1" size="display" className="mt-3">
          That page is not on the menu.
        </Heading>
        <Text className="mt-4 max-w-md">
          The link may be out of date. The menu, the plans and a way to start
          are all still here.
        </Text>
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
