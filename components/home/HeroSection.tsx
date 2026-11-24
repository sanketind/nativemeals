import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/cn";
import { StartCTA } from "@/components/ui/StartCTA";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FoodImage } from "@/components/ui/FoodImage";
import { Heading, Text } from "@/components/ui/Type";
import { type as typeStyles } from "@/components/ui/styles";

export function HeroSection() {
  return (
    // Negative margin matches the sticky header so the field runs under it.
    <section className="relative isolate -mt-[4.25rem] flex min-h-[calc(100svh)] flex-col overflow-hidden bg-field pt-[4.25rem] md:-mt-20 md:pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <FoodImage
          imageId="heroMain"
          fit="cover"
          priority
          sizes="100vw"
          className="scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-t from-field via-field/85 to-field/60"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-r from-field/95 via-field/55 to-field/20"
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-16 pt-10 md:pb-24 md:pt-16 lg:pb-28">
        <div className="max-w-2xl motion-safe:animate-fade-up">
          <p className={cn(typeStyles.eyebrow, "text-stone/65")}>
            {siteConfig.launchArea}
          </p>
          <Heading
            as="h1"
            size="poster"
            tone="inverse"
            className="mt-4 text-balance"
          >
            Everyday food. Balanced better.
          </Heading>
          <Text size="lede" tone="inverse" className="mt-5 max-w-md">
            Breakfast, lunch and dinner you can eat every day. Complete,
            familiar meals, cooked fresh and handed over at your office gate
            or your door.
          </Text>
          <div className="mt-8 flex flex-wrap gap-3">
            <StartCTA />
            <ButtonLink href="#this-week" variant="inverse">
              This week&apos;s menu
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
