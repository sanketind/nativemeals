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
            "font-sans text-[0.78rem] font-bold uppercase tracking-[0.12em]",
            tone === "inverse" ? "text-terracotta" : "text-terracotta-ink",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        className={cn(
          "font-sans text-[clamp(1.95rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-[-0.035em]",
          eyebrow && "mt-3",
          tone === "inverse" ? "text-cream" : "text-olive",
        )}
      >
        {title}
      </Heading>
      {children ? (
        <p
          className={cn(
            "mt-4 text-[1.06rem] font-normal leading-[1.7]",
            tone === "inverse" ? "text-cream/80" : "text-muted",
          )}
        >
          {children}
        </p>
      ) : null}
    </div>
  );
}
