import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/Button";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <PageHeader
      eyebrow="404"
      title="That page is not on the menu."
      actions={
        <>
          <ButtonLink href="/" variant="accent">
            Back home
          </ButtonLink>
          <ButtonLink href="/meal-plans" variant="inverse">
            See meal plans
          </ButtonLink>
        </>
      }
    >
      The link may be out of date. The menu, the plans and a way to start are
      all still here.
    </PageHeader>
  );
}
