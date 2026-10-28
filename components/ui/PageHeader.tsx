import { FoodImage } from "@/components/ui/FoodImage";
import { Container } from "@/components/ui/Container";
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
    <header className="border-b border-charcoal/5 bg-white">
      <Container
        className={cn(
          "py-14 md:py-20",
          imageId && "grid items-center gap-10 md:grid-cols-2",
        )}
      >
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta-ink">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-serif text-3xl leading-[1.08] tracking-tight text-charcoal md:text-6xl">
            {title}
          </h1>
          {children ? (
            <div className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal/75 md:text-lg">
              {children}
            </div>
          ) : null}
        </div>
        {imageId ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-sage">
            <FoodImage
              imageId={imageId}
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
            />
          </div>
        ) : null}
      </Container>
    </header>
  );
}
