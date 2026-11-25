import { FoodImage } from "@/components/ui/FoodImage";
import { Container } from "@/components/ui/Container";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";
import { surface } from "@/components/ui/styles";
import { cn } from "@/lib/cn";

export type PageFact = { value: string; label: string };

export function PageHeader({
  eyebrow,
  title,
  imageId,
  actions,
  facts,
  children,
}: {
  eyebrow: string;
  title: string;
  imageId?: string;
  actions?: React.ReactNode;
  facts?: PageFact[];
  children?: React.ReactNode;
}) {
  return (
    // Runs up under the sticky header, like the homepage hero. With a photo there is no
    // bottom padding: the photo sits on the edge and the next band's rounded top covers it.
    <header
      className={cn(
        "-mt-[4.25rem] overflow-hidden bg-field pt-[4.25rem] md:-mt-20 md:pt-20",
        surface.brandPattern,
        !imageId && "pb-20 md:pb-28",
      )}
    >
      <Container className="pt-10 text-center md:pt-16">
        <Eyebrow tone="accent">{eyebrow}</Eyebrow>
        <Heading as="h1" size="display" tone="inverse" className="mx-auto mt-4 max-w-5xl text-balance">
          {title}
        </Heading>
        {children ? (
          <Text as="div" size="lede" tone="inverse" className="mx-auto mt-6 max-w-2xl">
            {children}
          </Text>
        ) : null}
        {actions ? <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div> : null}
        {facts?.length ? (
          <dl className="mx-auto mt-10 grid max-w-4xl gap-6 border-t border-stone/15 pt-8 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.value} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-stone/65">{fact.label}</dt>
                <dd className="font-sans text-stat text-stone">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
      {imageId ? (
        <div className="relative mt-12 aspect-[4/3] w-full sm:aspect-[16/9] md:mt-16 md:aspect-[5/2] lg:aspect-[3/1]">
          <FoodImage imageId={imageId} priority sizes="100vw" />
        </div>
      ) : null}
    </header>
  );
}
