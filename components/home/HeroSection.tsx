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
          quality={90}
          sizes="100vw"
          className="scale-105 object-[center_36%] brightness-[1.12] contrast-[1.08] saturate-[1.2]"
        />
        {/* Thin top wash so the floating header stays clear; plate stays vivid. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-36 bg-linear-to-b from-field/50 to-transparent"
        />
      </div>

      <Container className="relative z-10 flex flex-1 flex-col justify-end pb-16 pt-10 md:pb-24 md:pt-16 lg:pb-28">
        {/* Soft pool behind copy only — not a full-frame dark overlay. */}
        <div className="relative max-w-2xl motion-safe:animate-fade-up">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-6 -inset-y-8 -z-10 bg-[radial-gradient(ellipse_at_left_center,rgb(26_46_36/0.78)_0%,rgb(26_46_36/0.42)_52%,transparent_76%)]"
          />
          <p className={cn(typeStyles.eyebrow, "text-stone/75")}>
            {siteConfig.launchArea}
          </p>
          <Heading
            as="h1"
            size="poster"
            tone="inverse"
            className="mt-4 text-balance drop-shadow-[0_2px_24px_rgb(26_46_36/0.55)]"
          >
            Everyday food. Balanced better.
          </Heading>
          <Text size="lede" tone="inverse" className="mt-5 max-w-md text-stone/90">
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
