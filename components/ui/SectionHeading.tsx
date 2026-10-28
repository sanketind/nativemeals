import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  tone = "default",
  as = "h2",
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  as?: "h1" | "h2";
}) {
  const Heading = as;
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "font-mono text-xs uppercase tracking-[0.18em]",
            tone === "inverse" ? "text-terracotta" : "text-terracotta-ink",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "font-serif text-4xl leading-[1.08] tracking-tight md:text-5xl",
          eyebrow && "mt-3",
          tone === "inverse" ? "text-cream" : "text-charcoal",
        )}
      >
        {title}
      </Heading>
      {children ? (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            tone === "inverse" ? "text-cream/80" : "text-charcoal/75",
          )}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}
