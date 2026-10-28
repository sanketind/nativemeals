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
          "py-10 md:py-20",
          imageId && "grid items-center gap-10 md:grid-cols-2",
        )}
      >
        <div>
          <p className="font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em] text-terracotta-ink">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl font-sans text-[clamp(2.05rem,5.15vw,5rem)] font-extrabold leading-[1.04] tracking-[-0.045em] text-olive">
            {title}
          </h1>
          {children ? (
            <div className="mt-5 max-w-2xl text-[clamp(1.05rem,1.5vw,1.25rem)] font-normal leading-[1.7] text-muted">
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
