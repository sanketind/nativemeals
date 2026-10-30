import { FoodImage } from "@/components/ui/FoodImage";
import { Container } from "@/components/ui/Container";
import { PhotoFrame } from "@/components/ui/Photo";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";
import { surface } from "@/components/ui/styles";
import { cn } from "@/lib/cn";

export function PageHeader({
  eyebrow,
  title,
  imageId,
  children,
}: {
  eyebrow: string;
  title: string;
  imageId?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className={cn("overflow-hidden", surface.pageGlow)}>
      <Container
        className={cn(
          "py-10 md:py-20",
          imageId && "grid items-center gap-8 md:grid-cols-2 md:gap-16 md:py-24",
        )}
      >
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <Heading as="h1" size="display" className="mt-3 max-w-3xl">
            {title}
          </Heading>
          {children ? (
            <Text as="div" size="lede" className="mt-5 max-w-2xl">
              {children}
            </Text>
          ) : null}
        </div>
        {imageId ? (
          <PhotoFrame shadow className="aspect-[4/5]">
            <FoodImage
              imageId={imageId}
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </PhotoFrame>
        ) : null}
      </Container>
    </header>
  );
}
